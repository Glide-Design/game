export const creativesWithoutMedia = [
  {
    parentId: 'a69a2994-3ff0-4afc-b020-793c783e4072',
    width: 2304,
    height: 2673,
    format: 'jpg',
  },
];

export const creativesWithSingleMediaEntry = [
  {
    mediaUsageType: 'Artwork',
    parentId: '2b3wf3f69-e705-46be-9cc5-d0969898f266',
    width: 160,
    height: 3840,
    format: 'png',
    media: [
      {
        url: '/img/upload/small/out.png',
        clientPlaybackUrl: 'https://res.cloudinary.com/footycloudtest',
        width: 160,
        height: 3840,
        mediaUsageType: 'Artwork',
        publicId: 'out',
      },
    ],
  },
];

export const creativesWithSingleMediaEntryLessThan100 = [
  {
    mediaUsageType: 'Artwork',
    parentId: '2b3wf3f69-e705-46be-9cc5-d0969898f266',
    width: 99,
    height: 3840,
    format: 'png',
    media: [
      {
        url: '/img/upload/small/out.png',
        clientPlaybackUrl: 'https://res.cloudinary.com/footycloudtest',
        width: 99,
        height: 3840,
        mediaUsageType: 'Artwork',
        publicId: 'out',
      },
    ],
  },
];

export const creativesWithTwoMediaEntriesOneLessThan100 = [
  {
    mediaUsageType: 'Artwork',
    parentId: '2b3wf3f69-e705-46be-9cc5-d0969898f266',
    width: 198,
    height: 3840,
    format: 'png',
    media: [
      {
        url: '/img/upload/small/out.png',
        clientPlaybackUrl: 'https://res.cloudinary.com/footycloudtest',
        width: 99,
        height: 1920,
        mediaUsageType: 'Artwork',
        publicId: 'out',
      },
      {
        url: '/img/upload/large/out.png',
        clientPlaybackUrl: 'https://res.cloudinary.com/footycloudtest',
        width: 198,
        height: 3840,
        mediaUsageType: 'Artwork',
        publicId: 'out',
      },
    ],
  },
];

export const mp4OnlyCreatives = [
  {
    mediaUsageType: 'Artwork',
    parentId: '2b3f4369-e705-46be-9cc5-d0969898f266',
    width: 2160,
    height: 3840,
    format: 'mp4',
    media: [
      {
        url: 'https://res.cloudinary.com/footycloudtest/video/upload/v1527250670/out.mp4',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/video/upload/v1527250670/out.mp4',
        width: 2160,
        height: 3840,
        mediaUsageType: 'Artwork',
        publicId: 'out',
      },
    ],
  },
];

export const fullCreatives = [
  {
    parentId: 'a69a2994-3ff0-4afc-b020-793c783e4072',
    width: 2304,
    height: 2673,
    format: 'jpg',
    media: [
      {
        url: 'https://res.cloudinary.com/footycloudtest/image/upload/v1526462467/neymarjordan.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/v1526462467/neymarjordan.jpg',
        width: 2304,
        height: 2673,
        publicId: 'neymarjordan',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_1000/neymarjordan.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_1000/neymarjordan.jpg',
        width: 1000,
        height: 1160,
        publicId: 'neymarjordan',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_930/neymarjordan.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_930/neymarjordan.jpg',
        width: 930,
        height: 1078,
        publicId: 'neymarjordan',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_797/neymarjordan.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_797/neymarjordan.jpg',
        width: 797,
        height: 924,
        publicId: 'neymarjordan',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_630/neymarjordan.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_630/neymarjordan.jpg',
        width: 630,
        height: 730,
        publicId: 'neymarjordan',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_406/neymarjordan.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_406/neymarjordan.jpg',
        width: 406,
        height: 471,
        publicId: 'neymarjordan',
      },
      {
        url: 'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_50/neymarjordan.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_50/neymarjordan.jpg',
        width: 50,
        height: 58,
        publicId: 'neymarjordan',
      },
    ],
  },
  {
    parentId: '494674b1-4b3c-4f34-b2b0-427547d56ffd',
    width: 3840,
    height: 1728,
    format: 'jpg',
    media: [
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/v1526483706/neymarjordanlscape.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/v1526483706/neymarjordanlscape.jpg',
        width: 3840,
        height: 1728,
        publicId: 'neymarjordanlscape',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_50/neymarjordanlscape.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_50/neymarjordanlscape.jpg',
        width: 50,
        height: 22,
        publicId: 'neymarjordanlscape',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_1000/neymarjordanlscape.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_1000/neymarjordanlscape.jpg',
        width: 1000,
        height: 450,
        publicId: 'neymarjordanlscape',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_689/neymarjordanlscape.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_689/neymarjordanlscape.jpg',
        width: 689,
        height: 310,
        publicId: 'neymarjordanlscape',
      },
    ],
  },
  {
    parentId: '0d6bc16e-e6cf-4aa0-86b7-a067ae6eaebf',
    width: 1125,
    height: 1602,
    format: 'jpg',
    media: [
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/v1526554398/neymarjordonmobile.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/v1526554398/neymarjordonmobile.jpg',
        width: 1125,
        height: 1602,
        publicId: 'neymarjordonmobile',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_50/neymarjordonmobile.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_50/neymarjordonmobile.jpg',
        width: 50,
        height: 71,
        publicId: 'neymarjordonmobile',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_341/neymarjordonmobile.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_341/neymarjordonmobile.jpg',
        width: 341,
        height: 485,
        publicId: 'neymarjordonmobile',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_964/neymarjordonmobile.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_964/neymarjordonmobile.jpg',
        width: 964,
        height: 1372,
        publicId: 'neymarjordonmobile',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_1000/neymarjordonmobile.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_1000/neymarjordonmobile.jpg',
        width: 1000,
        height: 1424,
        publicId: 'neymarjordonmobile',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_656/neymarjordonmobile.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_656/neymarjordonmobile.jpg',
        width: 656,
        height: 934,
        publicId: 'neymarjordonmobile',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_869/neymarjordonmobile.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_869/neymarjordonmobile.jpg',
        width: 869,
        height: 1237,
        publicId: 'neymarjordonmobile',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_516/neymarjordonmobile.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_516/neymarjordonmobile.jpg',
        width: 516,
        height: 734,
        publicId: 'neymarjordonmobile',
      },
      {
        url:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_777/neymarjordonmobile.jpg',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/image/upload/c_scale,w_777/neymarjordonmobile.jpg',
        width: 777,
        height: 1106,
        publicId: 'neymarjordonmobile',
      },
    ],
  },
  {
    mediaUsageType: 'Artwork',
    parentId: '2b3wf3f69-e705-46be-9cc5-d0969898f266',
    width: 160,
    height: 3840,
    format: 'png',
    media: [
      {
        url: 'https://res.cloudinary.com/footycloudtest/img/upload/small/out.png',
        clientPlaybackUrl: 'https://res.cloudinary.com/footycloudtest/img/upload/small/out.png',
        width: 160,
        height: 3840,
        mediaUsageType: 'Artwork',
        publicId: 'out',
      },
      {
        url: 'https://res.cloudinary.com/footycloudtest/img/upload/large/out.png',
        clientPlaybackUrl: 'https://res.cloudinary.com/footycloudtest/img/upload/large/out.png',
        width: 640,
        height: 15360,
        mediaUsageType: 'Artwork',
        publicId: 'out',
      },
      {
        url: 'https://res.cloudinary.com/footycloudtest/img/upload/middle/out.png',
        clientPlaybackUrl: 'https://res.cloudinary.com/footycloudtest/img/upload/middle/out.png',
        width: 320,
        height: 7680,
        mediaUsageType: 'Artwork',
        publicId: 'out',
      },
    ],
  },
  {
    mediaUsageType: 'Artwork',
    parentId: '2b3f4369-e705-46be-9cc5-d0969898f266',
    width: 2160,
    height: 3840,
    format: 'mp4',
    media: [
      {
        url: 'https://res.cloudinary.com/footycloudtest/video/upload/v1527250670/out.mp4',
        clientPlaybackUrl:
          'https://res.cloudinary.com/footycloudtest/video/upload/v1527250670/out.mp4',
        width: 2160,
        height: 3840,
        mediaUsageType: 'Artwork',
        publicId: 'out',
      },
    ],
  },
];
