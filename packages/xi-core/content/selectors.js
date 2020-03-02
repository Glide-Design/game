import React from 'react';
import { get, has, map, flow, compact, reject, first, set, getOr } from 'lodash/fp';
import { defineMessages, FormattedMessage } from 'react-intl';
import { fixRelativePath } from 'xi-core/creatives/chooseCreativeByRatio';
import { getAssetBaseUrlPrefix, getMemberMinorLessThenAge } from 'xi-core/config/selectors';
import appendQueryParameter from 'xi-core/utils/appendQueryParameter';
import {
  isAuthenticated,
  isPremium,
  ageIsLessThan,
  getStarReferrerId,
  getReferrerSource,
  getLanguage as memberLanguage,
  getBookmarks,
} from 'xi-core/member/selectors';
import { getVideoResumePointByContentId } from '../video/selectors';
import inventoryTypes from './inventoryTypes';
import { contentTypes } from './contentTypes';
import { tagTypes } from './tagTypes';

export const COMPETITION_RESULTS_DATE = 'COMPETITION_RESULTS_DATE';

export const getTypeDisplay = contentTypeName => {
  switch (contentTypeName) {
    case contentTypes.VIDEO:
      return <FormattedMessage id="contentType.video" defaultMessage="Videos" />;
    case contentTypes.SOCIAL:
      return <FormattedMessage id="contentType.social" defaultMessage="Social" />;
    case contentTypes.ARTICLE:
      return <FormattedMessage id="contentType.article" defaultMessage="Articles" />;
    case contentTypes.PLAYER:
      return <FormattedMessage id="contentType.player" defaultMessage="Players" />;
    case contentTypes.Gallery:
      return <FormattedMessage id="contentType.gallery" defaultMessage="Gallery" />;
    default:
      return null;
  }
};

export const getTagType = state => (contentTypeName, contentId) => {
  if (contentTypeName === contentTypes.COMPETITION) {
    if (isCompetitionClosed(state)(contentId)) {
      return tagTypes.CLOSED;
    }
  }

  if (contentTypeName === contentTypes.Q_AND_A) {
    if (
      isCompetitionClosed(state)(contentId) &&
      !hasContentDatePassed(state)(contentId, COMPETITION_RESULTS_DATE)
    ) {
      return tagTypes.CLOSED;
    }
  }

  if (isContentComingSoon(state)(contentId)) {
    return tagTypes.COMING_SOON;
  }

  if (isContentNew(state)(contentId)) {
    return tagTypes.NEW;
  }

  return null;
};

export const getTagText = tagType => {
  switch (tagType) {
    case tagTypes.NEW:
      return <FormattedMessage id="tag.new" defaultMessage="New" />;
    case tagTypes.CLOSED:
      return <FormattedMessage id="tag.closed" defaultMessage="Closed" />;
    case tagTypes.COMING_SOON:
      return <FormattedMessage id="tag.comingSoon" defaultMessage="Coming soon" />;
    default:
      return null;
  }
};

export const getCtaText = state => (contentTypeName, short = false, contentId) => {
  switch (contentTypeName) {
    case contentTypes.VIDEO:
      return getVideoStatusText(state, contentId);
    case contentTypes.ARTICLE:
      return <FormattedMessage id="ctaType.article" defaultMessage="Read more" />;
    case contentTypes.SOCIAL:
      if (short) {
        return <FormattedMessage id="ctaType.socialShort" defaultMessage="view" />;
      } else {
        return <FormattedMessage id="ctaType.social" defaultMessage="view social posts" />;
      }
    case contentTypes.GALLERY:
      return <FormattedMessage id="ctaType.gallery" defaultMessage="See More" />;
    case contentTypes.PLAYER:
      return <FormattedMessage id="ctaType.viewProfile" defaultMessage="view profile" />;
    case contentTypes.COMPETITION:
      return getCompetitionStatusText(state, contentId, contentTypes.COMPETITION);
    case contentTypes.Q_AND_A:
      return getCompetitionStatusText(state, contentId, contentTypes.Q_AND_A);
    default:
      return null;
  }
};

const getCompetitionStatusText = (state, contentId, contentTypeName) => {
  if (
    contentTypeName === contentTypes.Q_AND_A &&
    hasContentDatePassed(state)(contentId, COMPETITION_RESULTS_DATE)
  ) {
    return getVideoStatusText(state, contentId);
  }

  const closedCompetition = isCompetitionClosed(state)(contentId);

  if (closedCompetition) {
    if (contentTypeName === contentTypes.COMPETITION) {
      return <FormattedMessage id="ctaType.competitionClosed" defaultMessage="VIEW ENTRIES" />;
    }
    if (contentTypeName === contentTypes.Q_AND_A) {
      return <FormattedMessage id="ctaType.qAndAClosed" defaultMessage="SEE QUESTIONS" />;
    }
  } else {
    if (contentTypeName === contentTypes.COMPETITION) {
      return <FormattedMessage id="ctaType.competitionOpen" defaultMessage="ENTER NOW" />;
    }
    if (contentTypeName === contentTypes.Q_AND_A) {
      return <FormattedMessage id="ctaType.qAndAOpen" defaultMessage="ASK NOW" />;
    }
  }
};

export const isContentNew = state => contentId => {
  return checkContentTag(state)(contentId, tagTypes.NEW);
};

export const isContentComingSoon = state => contentId => {
  return checkContentTag(state)(contentId, tagTypes.COMING_SOON);
};

export const isCompetitionClosed = state => contentId => {
  return checkContentTag(state)(contentId, tagTypes.CLOSED);
};

const checkContentTag = state => (contentId, tagType) => {
  const tags = getContentTags(state)(contentId);

  if (tags.includes(tagType)) {
    return true;
  }

  return false;
};

export const hasContentDatePassed = state => (contentId, dateType) => {
  const currentDate = new Date().getTime();
  const contentDate = getContentDate(state)(contentId, dateType);

  if (!contentDate) {
    return false;
  }

  return currentDate > contentDate.startDate;
};

export const getContentDate = state => (contentId, dateType) => {
  let contentDate,
    content = getContentById(state)(contentId);

  if (!!content && content.contentDates) {
    contentDate = content.contentDates.find(date => date.dateType === dateType);
  }

  return !!contentDate ? contentDate : null;
};

export const getContentTags = state => contentId => {
  let content = getContentById(state)(contentId);

  if (!!content && content.tags) {
    return content.tags;
  }

  return [];
};

const getContentById = state => contentId => {
  let content = getContentItemById(state)(contentId);

  if (!content) {
    content = getBookmarks(state).find(content => content.externalId === contentId);
  }

  return !!content ? content : null;
};

const getVideoStatusText = (state, contentId) => {
  const resumePoint = getVideoResumePointByContentId(state)(contentId);

  if (!resumePoint) {
    return <FormattedMessage id="ctaType.video" defaultMessage="Watch Video" />;
  }

  if (resumePoint.progress) {
    return <FormattedMessage id="ctaType.videoResume" defaultMessage="Resume" />;
  }

  if (resumePoint.watched) {
    return <FormattedMessage id="ctaType.videoWatchAgain" defaultMessage="Watch Again" />;
  }

  /*
  This case happens because of the bug in VideoPlayer config
  which causes the video to replay without firing the onEnded 
  event. THIS SHOULD BE REMOVED WHEN THE BUG IS FIXED
  */
  if (resumePoint.progress === 0 && !resumePoint.watched) {
    return <FormattedMessage id="ctaType.videoWatchAgain" defaultMessage="Watch Again" />;
  }
};

export const getContentType = state => contentId =>
  flow(
    getContentItemById(state),
    get('contentTypeName')
  )(contentId);

export const getContentItemById = state => id => {
  return get(`content.byId.${id}`, state);
};

export const getSubtitles = state => id => get(`content.byId.${id}.subtitles`, state);

export const getLanguage = state => id => get(`content.byId.${id}.language`, state);

export const getSectionById = state => sectionId => get(`sections.${sectionId}`, state);

export const getSeasonIdByContentId = state => contentId =>
  get(`content.byId.${contentId}.episodic.seasonExternalId`, state);

export const getSeriesIdByContentId = state => contentId =>
  get(`content.byId.${contentId}.episodic.seriesExternalId`, state);

export const getEpisodeNumber = state => contentId =>
  get('episodic.episodeNumber', getContentItemById(state)(contentId));

export const getContentIdsBySectionId = state => sectionsId =>
  get(`sections.${sectionsId}.content`, state);

export const isFetchingSection = sectionId => has(`sections._fetching.${sectionId}`);

export const getPartner = state => contentId =>
  flow(
    getContentItemById(state),
    get('partners'),
    first
  )(contentId);

export const getSectionsForTemplateId = state => templateId => {
  return flow(
    get(`pages.${templateId}.sections`),
    map(getSectionById(state)),
    compact
  )(state);
};

export const isFetchingSectionsForTemplate = templateId =>
  has(`pages.${templateId}._isFetchingSections`);

export const getSectionItems = state => sectionId =>
  flow(
    get(`sections.${sectionId}.content`),
    map(getContentItemById(state))
  )(state);

export const getSectionsByIds = state => sectionIds =>
  flow(map(sectionId => getSectionById(state)(sectionId)))(sectionIds);

export const getSectionsForSectionId = state => sectionId =>
  flow(
    get(`sections.${sectionId}.sections`),
    map(getSectionById(state)),
    compact
  )(state);

export const isFetchingSectionsForSection = sectionId =>
  has(`sections.${sectionId}._isFetchingSections`);

export const getRelatedContent = state => contentId =>
  flow(
    get(`content.related.${contentId}`),
    map(getContentItemById(state))
  )(state);

export const getPublisherIdForContent = state => contentId =>
  get(`content.byId.${contentId}.publisherId`, state);

export const getTimestamp = state => contentId =>
  get(`content.byId.${contentId}.contentDates[0].startDate`, state);

export const getContentBySeasonId = state => (seasonId, excludeIds = []) =>
  flow(
    get(`content.seasons.${seasonId}`),
    map(getContentItemById(state)),
    reject(item => excludeIds.indexOf(item.externalId) !== -1)
  )(state);

const warnNoHttps = url => {
  if (url && url.slice(0, 5) !== 'https') {
    console.warn(`Url not https (${url})`);
    // return state;
  }
  return url;
};

const fixAssetPath = (state, url) => item =>
  fixRelativePath(getAssetBaseUrlPrefix(state), url, item.clientPlaybackUrl);

export const getContentMedia = state => contentId =>
  flow(
    getContentItemById(state),
    get('media'),
    map(m => set('url', fixAssetPath(state, m.url)(m), m)),
    map(m => set('url', warnNoHttps(m.url), m))
  )(contentId);

export const getContentUrl = state => contentId =>
  flow(
    getContentMedia(state),
    first,
    get('url')
  )(contentId);

export const getMimeType = state => contentId =>
  flow(
    getContentMedia(state),
    first,
    get('mimeType')
  )(contentId);

export const getAdvertisingUrl = state => (contentId, fromGuestPass = false) => {
  const content = getContentItemById(state)(contentId);
  const advertisingUrl = !get('advertisingUrl', content)
    ? null
    : flow(
        fixAssetPath(state, content.advertisingUrl),
        warnNoHttps
      )(content);

  if (!advertisingUrl) {
    return advertisingUrl;
  }

  const memberStatus = isAuthenticated(state)
    ? isPremium(state)
      ? 'premium'
      : 'freemium'
    : 'unregistered';

  const free = isFree(state)(contentId);

  const contentStatus = free ? 'freecontent' : 'premiumcontent';

  const trailer =
    !free && getInventoryType(state)(contentId) === inventoryTypes.preview ? 'trailer' : null;

  const memberMinor =
    ageIsLessThan(state)(getMemberMinorLessThenAge(state)) === true ? 'memberminor' : null;

  const guestPass = fromGuestPass && memberStatus !== 'premium' ? 'guestpass' : null;

  const referrerSource = getReferrerSource(state);

  const starReferrerId = getStarReferrerId(state);

  const language = memberLanguage(state);

  const commericalPartner = getOr('', 'name', getPartner(state)(contentId))
    .toLowerCase()
    .replace(/ /g, '');

  const queryValues = compact([
    memberStatus,
    contentStatus,
    referrerSource,
    starReferrerId,
    memberMinor,
    guestPass,
    trailer,
    language,
    commericalPartner,
  ]);

  return appendQueryParameter(advertisingUrl, ['keywords=' + queryValues.join(',')]);
};

export const getInventoryType = state => contentId =>
  flow(
    getContentItemById(state),
    get('inventoryType')
  )(contentId);

export const isFree = state => contentId =>
  flow(
    getContentItemById(state),
    get('isFree')
  )(contentId);

export const shouldShowGoPremiumSlate = state => contentId =>
  !isFree(state)(contentId) && getInventoryType(state)(contentId) === inventoryTypes.preview;

const contentMessages = defineMessages({
  contentSharingTitle: {
    id: 'app.contentSharingTitle',
    defaultMessage: 'Check out "{title}" on OTRO.',
  },
});

export const getContentSharingTitleById = state => (contentId, intl) => {
  const contentItem = getContentItemById(state)(contentId);
  const title = get('title', contentItem);
  const titleBrief = get('titleBrief', contentItem);

  const sharingTitle = titleBrief || title;

  return intl.formatMessage(contentMessages.contentSharingTitle, { title: sharingTitle });
};

export const getContentSharingUrlById = state => (contentId, baseUrl) => {
  return `${baseUrl}/content/${contentId}`;
};

export const getContentPartner = state => contentId =>
  flow(
    getContentItemById(state),
    get('partners'),
    first
  )(contentId);

export const getGalleryIdBySectionId = state => sectionId =>
  flow(
    get(`sections.${sectionId}.galleries`),
    first
  )(state);

export const guestIsWatchingFreeVideo = state => contentId =>
  getContentType(state)(contentId) === contentTypes.VIDEO &&
  !isAuthenticated(state) &&
  isFree(state)(contentId);

export const isGuestPassAllowed = state => contentId =>
  flow(
    getContentItemById(state),
    get('giftAllowed')
  )(contentId);
