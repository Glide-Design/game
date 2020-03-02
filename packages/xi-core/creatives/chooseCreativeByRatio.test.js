import { getSourcesByRatio } from './chooseCreativeByRatio';

import {
  creativesWithoutMedia,
  fullCreatives,
  creativesWithSingleMediaEntry,
  mp4OnlyCreatives,
  creativesWithSingleMediaEntryLessThan100,
  creativesWithTwoMediaEntriesOneLessThan100,
} from './fixtures';
const PLACEHOLDER_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

describe('chooseCreativeByRatio', () => {
  it('should handle empty media', () => {
    expect(getSourcesByRatio({ creatives: creativesWithoutMedia })).toEqual({
      src: PLACEHOLDER_IMAGE,
      srcSet: [],
    });
  });

  it('should handle empty creatives', () => {
    expect(getSourcesByRatio({ creatives: [] })).toEqual({
      src: PLACEHOLDER_IMAGE,
      srcSet: [],
    });
  });

  it('should ignore mp4 creatives by default', () => {
    expect(getSourcesByRatio({ creatives: mp4OnlyCreatives }).src).toEqual(PLACEHOLDER_IMAGE);
  });

  it('should choose mp4 creatives when instructed to do so', () => {
    expect(getSourcesByRatio({ creatives: mp4OnlyCreatives, acceptFormats: ['mp4'] }).src).toEqual(
      'https://res.cloudinary.com/footycloudtest/video/upload/v1527250670/out.mp4'
    );
  });

  describe('relative urls', () => {
    it('should append the clientPlaybackUrl if the src does not start with http', () => {
      expect(getSourcesByRatio({ creatives: creativesWithSingleMediaEntry }).src).toEqual(
        'https://res.cloudinary.com/footycloudtest/img/upload/small/out.png'
      );
    });
    it('should append choose the baseUrlPrefix over the clientPlaybackUrl if passed', () => {
      expect(
        getSourcesByRatio({
          baseUrlPrefix: 'http://myprefix/test',
          creatives: creativesWithSingleMediaEntry,
        }).src
      ).toEqual('http://myprefix/test/img/upload/small/out.png');
    });
  });

  it('should return a source less than 100 width if it is in the only source', () => {
    expect(getSourcesByRatio({ creatives: creativesWithSingleMediaEntryLessThan100 }).src).toEqual(
      'https://res.cloudinary.com/footycloudtest/img/upload/small/out.png'
    );
  });

  it('should return exclude source less than 100 width if there is more than 1 source', () => {
    expect(
      getSourcesByRatio({ creatives: creativesWithTwoMediaEntriesOneLessThan100 }).srcSet.length
    ).toEqual(1);
  });

  describe('src returned', () => {
    it('should pick the median (excluding < 100 width sources) from the closest creative set to default 1x1 ratio', () => {
      expect(getSourcesByRatio({ creatives: fullCreatives }).src).toEqual(
        'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_930/neymarjordan.jpg'
      );
    });

    it('should pick the median from the creative set with closest approximation to passed ratio', () => {
      expect(getSourcesByRatio({ creatives: fullCreatives, targetRatio: 0.042 }).src).toEqual(
        'https://res.cloudinary.com/footycloudtest/img/upload/middle/out.png'
      );
    });

    it('should handle empty media', () => {
      expect(getSourcesByRatio({ creatives: creativesWithoutMedia }).src).toEqual(
        PLACEHOLDER_IMAGE
      );
    });

    it('should handle empty creatives', () => {
      expect(getSourcesByRatio({ creatives: [] }).src).toEqual(PLACEHOLDER_IMAGE);
    });
  });

  describe('srcSet returned', () => {
    it('creates ordered srcSet (excluding sources < 100 width) from the closest creative set to default 1x1 ratio', () => {
      expect(getSourcesByRatio({ creatives: fullCreatives }).srcSet).toEqual([
        {
          clientPlaybackUrl:
            'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_406/neymarjordan.jpg',
          height: 471,
          publicId: 'neymarjordan',
          url:
            'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_406/neymarjordan.jpg',
          width: 406,
        },
        {
          clientPlaybackUrl:
            'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_630/neymarjordan.jpg',
          height: 730,
          publicId: 'neymarjordan',
          url:
            'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_630/neymarjordan.jpg',
          width: 630,
        },
        {
          clientPlaybackUrl:
            'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_797/neymarjordan.jpg',
          height: 924,
          publicId: 'neymarjordan',
          url:
            'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_797/neymarjordan.jpg',
          width: 797,
        },
        {
          clientPlaybackUrl:
            'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_930/neymarjordan.jpg',
          height: 1078,
          publicId: 'neymarjordan',
          url:
            'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_930/neymarjordan.jpg',
          width: 930,
        },
        {
          clientPlaybackUrl:
            'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_1000/neymarjordan.jpg',
          height: 1160,
          publicId: 'neymarjordan',
          url:
            'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_1000/neymarjordan.jpg',
          width: 1000,
        },
        {
          clientPlaybackUrl:
            'https://res.cloudinary.com/footycloudtest/image/upload/v1526462467/neymarjordan.jpg',
          height: 2673,
          publicId: 'neymarjordan',
          url:
            'https://res.cloudinary.com/footycloudtest/image/upload/v1526462467/neymarjordan.jpg',
          width: 2304,
        },
      ]);
    });

    it('creates an ordered srcSet (excluding sources < 100 width) from the creative set with closest approximation to passed ratio', () => {
      expect(
        getSourcesByRatio({ creatives: fullCreatives, targetRatio: 2.2222222222222223 }).srcSet
      ).toEqual([
        {
          clientPlaybackUrl:
            'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_689/neymarjordanlscape.jpg',
          height: 310,
          publicId: 'neymarjordanlscape',
          url:
            'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_689/neymarjordanlscape.jpg',
          width: 689,
        },
        {
          clientPlaybackUrl:
            'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_1000/neymarjordanlscape.jpg',
          height: 450,
          publicId: 'neymarjordanlscape',
          url:
            'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_1000/neymarjordanlscape.jpg',
          width: 1000,
        },
        {
          clientPlaybackUrl:
            'https://res.cloudinary.com/footycloudtest/image/upload/v1526483706/neymarjordanlscape.jpg',
          height: 1728,
          publicId: 'neymarjordanlscape',
          url:
            'https://res.cloudinary.com/footycloudtest/image/upload/v1526483706/neymarjordanlscape.jpg',
          width: 3840,
        },
      ]);
    });
  });
});
