import { get } from 'lodash/fp';

export const getVideosResumePoints = state => get('videos.resumePoints', state);

export const getVideoResumePointByContentId = state => contentId => {
  const videosResumePoints = get('videos.resumePoints', state);
  return get(contentId, videosResumePoints);
};

export const getVideoProgressByContentId = state => contentId => {
  const resumePoint = getVideoResumePointByContentId(state)(contentId);
  return get('progress', resumePoint);
};

export const getVideoProgressPercentage = state => contentId => {
  const resumePoint = getVideoResumePointByContentId(state)(contentId);
  if (!resumePoint || resumePoint.watched || !resumePoint.duration) {
    return null;
  }
  return (resumePoint.progress * 100) / resumePoint.duration;
};

export const getVideoEllapsedTime = state => contentId => {
  return get(`videos.ellapsedTimes.${contentId}.ellapsed`)(state);
};
