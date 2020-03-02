import { getContentTypeFromContent, getVideoSrcsFromContent } from './utils';
import videoContent from './fixtures/video-content';
import imageContent from './fixtures/image-content';
import { CONTENT_TYPES } from './constants';

describe('getContentTypeFromContent', () => {
  it('returns CONTENT_TYPES.VIDEO when the content is a video', () => {
    const contentType = getContentTypeFromContent(videoContent);
    expect(contentType).toEqual(CONTENT_TYPES.VIDEO);
  });
  it('returns CONTENT_TYPES.IMAGE when the content is an image', () => {
    const contentType = getContentTypeFromContent(imageContent);
    expect(contentType).toEqual(CONTENT_TYPES.IMAGE);
  });
});

describe('getVideoSrcsFromContent', () => {
  it("returns an array of all the video's sources", () => {
    const sources = getVideoSrcsFromContent(videoContent);
    expect(sources).toEqual([
      {
        src:
          'https://res.cloudinary.com/our-star-club/video/upload/sp_full_hd/xfqs0uvzjhlqhinx2ucm.m3u8',
        type: 'application/x-mpegURL',
      },
    ]);
  });
});
