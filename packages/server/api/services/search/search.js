import { flow, filter, some, includes, split, lowerCase, map, last, trim, uniq } from 'lodash/fp';
import { getSearchResults } from '../../cloudinary/cache';
import { buildStarsResponse } from '../stars/response';
import { getItemsResponse } from '../content/response';

export const buildSearchResponse = async ({ q, language }) => {
  try {
    const stars = await buildStarsResponse({ language });

    const tokens = flow(
      trim,
      split(' '),
      map(lowerCase),
      filter(s => s.length)
    )(q);

    const starList = flow(
      filter(star =>
        some(
          token =>
            includes(token)(lowerCase(star.forename)) ||
            includes(token)(lowerCase(star.surname)) ||
            includes(token)(lowerCase(star.displayName)) ||
            includes(token)(lowerCase(star.seoCode))
        )(tokens)
      )
    )(stars);

    let searchResults = (tokens.length && (await getSearchResults(q, language))) || {};

    const getItemIds = flow(
      map(r => r.folder),
      map(folder => last(split('/')(folder))),
      uniq
    );

    const videoList = await getItemsResponse(getItemIds(searchResults.video), language);
    const articleList = await getItemsResponse(getItemIds(searchResults.article), language);

    return { results: { starList, videoList, articleList } };
  } catch (e) {
    return e;
  }
};
