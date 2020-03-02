/**
 * Supported stream types
 *
 * @type {{HEVC: string, H264: string, VP9: string}}
 */
export const StreamTag = {
  HEVC: 'hevc', // h265
  H264: 'h264',
  VP9: 'vp9',
};

export const Implementation = {
  FAIRPLAY: 'fairplay',
  WIDEVINE: 'widevine',
  PLAYREADY: 'playready',
};
