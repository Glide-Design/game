import {
  flow,
  split,
  map,
  last,
  first,
  uniq,
  set,
  pick,
  concat,
  lowerCase,
  filter,
  clone,
  get,
  reduce,
} from 'lodash/fp';
import sanitizeEnvVars from 'xi-core/utils/sanitizeEnvVars';
import { getSourcesByRatio } from 'xi-core/creatives/chooseCreativeByRatio';
import { searchContentForSitemap, getContentResources } from '../../cloudinary/cache';
import { getVideoUrl } from '../../cloudinary/cloudinary';
import { buildStarsResponse } from '../stars/response';
import { getItemResponse } from '../content/content';

export const getDataForSitemap = async () => {
  try {
    const language = 'en';
    const videoFormats = ['mp4', 'mov'];

    const getItemIds = flow(
      map(r => r.folder),
      map(folder => last(split('/')(folder))),
      uniq
    );

    const generateContentUrlsForSitemap = map(id => ({
      url: '/content/' + id,
      changefreq: 'monthly',
      priority: 0.7,
    }));

    const generateStarUrlsForSitemap = map(id => ({
      url: '/star/' + id,
      changefreq: 'monthly',
      priority: 0.7,
    }));

    const envVars = sanitizeEnvVars(process.env);

    const videoUrl = (format, mimeType) => resource =>
      flow(
        set('mimeType', mimeType),
        set(
          'url',
          getVideoUrl(
            resource.public_id,
            {
              format,
              resource_type: 'video',
              streaming_profile: 'full_hd',
            },
            null
          )
        )
      )(resource);

    const starList = await buildStarsResponse({ language });
    const searchResults = await searchContentForSitemap();

    const articleIds = getItemIds(searchResults.article);
    const starIds = map(star => star.seoCode)(starList);
    const videoIds = getItemIds(searchResults.video);

    console.log('Total Video Content => ', videoIds.length);
    let videoUrls = [];

    for (let i = 0; i < videoIds.length; i++) {
      const resources = await getContentResources(videoIds[i]);

      const entitlements = reduce((formats, resource) => {
        formats.push(get('context.entitlement')(resource));
        return formats;
      }, [])(resources);

      if (entitlements.indexOf('archive-free') !== -1) {
        try {
          //The content is archive-free, adding video details
          //to the sitemap's url object
          const item = await getItemResponse(videoIds[i], resources, 'en');
          let mediaResources = flow(
            filter(
              resource =>
                videoFormats.indexOf(resource.format) !== -1 &&
                lowerCase(get('context.usage')(resource)) === 'broadcast'
            ),
            map(videoUrl('m3u8', 'application/x-mpegURL')),
            arr => concat(arr, map(videoUrl('mpd', 'application/dash+xml'))(clone(arr))),
            map(pick(['url', 'mimeType']))
          )(resources);

          videoUrls.push({
            url: '/content/' + videoIds[i],
            priority: 0.7,
            changefreq: 'monthly',
            video: [
              {
                title: item.title,
                duration: item.duration,
                description: item.description,
                family_friendly: 'yes',
                thumbnail_loc: getSourcesByRatio({
                  creatives: item.creatives,
                  targetRatio: 16 / 9,
                }).src,
                player_loc: `${envVars.clientAppBaseUrl}/content/${videoIds[i]}`,
                content_loc: first(mediaResources).url,
              },
            ],
          });
        } catch (e) {
          console.log('Error while create a videoItem in sitemap for item', videoIds[i]);
          console.log(e.message);
          videoUrls.push({
            url: '/content/' + videoIds[i],
            priority: 0.7,
            changefreq: 'monthly',
          });
        }
      } else {
        //When the content is not archive-free we leave the video details
        //out of sitemap's url object
        videoUrls.push({
          url: '/content/' + videoIds[i],
          priority: 0.7,
          changefreq: 'monthly',
        });
      }
    }

    console.log('sitemap urls created = ', videoUrls.length);

    return {
      urls: [].concat(
        videoUrls,
        generateContentUrlsForSitemap(articleIds),
        generateStarUrlsForSitemap(starIds)
      ),
    };
  } catch (e) {
    return e;
  }
};
