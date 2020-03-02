import { byId } from './reducer';
// import { CONTENT_CONTRIBUTORS } from '../content/actions';

describe('content byId', () => {
  it('defaults to having no stars', () => {
    const newState = byId(undefined, {});
    expect(newState).toEqual({});
  });

  it('merges contentUrl with meta data into one object', () => {
    const action = {
      type: 'FETCH_CONTENT_ITEM_SUCCESS',
      contentItem: {
        externalId: 'f3df657b-5a96-11e8-a68b-c87b0dd0ed31',
        description: 'Messi - El Classico Track Record',
        descriptionBrief: "The Argentine has played against Barca's ...",
        mainCategory: { id: '4', name: 'Video', description: 'Video' },
        title: 'Reminiscing El Clasico',
      },
    };
    const state = byId({}, action);
    expect(state).toEqual({
      'f3df657b-5a96-11e8-a68b-c87b0dd0ed31': {
        externalId: 'f3df657b-5a96-11e8-a68b-c87b0dd0ed31',
        description: 'Messi - El Classico Track Record',
        descriptionBrief: "The Argentine has played against Barca's ...",
        mainCategory: { id: '4', name: 'Video', description: 'Video' },
        title: 'Reminiscing El Clasico',
        contributors: [],
        publisherId: undefined,
      },
    });

    const streamSuccessAction = {
      type: 'FETCH_CONTENT_ENTITLEMENT_SUCCESS',
      contentId: 'f3df657b-5a96-11e8-a68b-c87b0dd0ed31',
      media: [
        {
          url:
            'https://stream.cloudtvapi.com/ondemand/_definst_/perform/Streaming/17673/XIpromov2-XIpromov2/smil:main.smil/playlist.m3u8',
        },
      ],
      advertisingUrl: 'https://placeholderurl.otro',
    };

    const stateWithStream = byId(state, streamSuccessAction);

    expect(stateWithStream).toEqual({
      'f3df657b-5a96-11e8-a68b-c87b0dd0ed31': {
        externalId: 'f3df657b-5a96-11e8-a68b-c87b0dd0ed31',
        description: 'Messi - El Classico Track Record',
        descriptionBrief: "The Argentine has played against Barca's ...",
        mainCategory: { id: '4', name: 'Video', description: 'Video' },
        title: 'Reminiscing El Clasico',
        contributors: [],
        publisherId: undefined,
        subtitles: [],
        media: [
          {
            url:
              'https://stream.cloudtvapi.com/ondemand/_definst_/perform/Streaming/17673/XIpromov2-XIpromov2/smil:main.smil/playlist.m3u8',
          },
        ],
        advertisingUrl: 'https://placeholderurl.otro',
      },
    });
  });

  it('merges meta data with stream url into one object', () => {
    const streamSuccessAction = {
      type: 'FETCH_CONTENT_ENTITLEMENT_SUCCESS',
      contentId: 'f3df657b-5a96-11e8-a68b-c87b0dd0ed31',
      media: [
        {
          url:
            'https://stream.cloudtvapi.com/ondemand/_definst_/perform/Streaming/17673/XIpromov2-XIpromov2/smil:main.smil/playlist.m3u8',
        },
      ],
      advertisingUrl: 'https://placeholderurl.otro',
    };

    const stateWithStream = byId({}, streamSuccessAction);

    expect(stateWithStream).toEqual({
      'f3df657b-5a96-11e8-a68b-c87b0dd0ed31': {
        media: [
          {
            url:
              'https://stream.cloudtvapi.com/ondemand/_definst_/perform/Streaming/17673/XIpromov2-XIpromov2/smil:main.smil/playlist.m3u8',
          },
        ],
        advertisingUrl: 'https://placeholderurl.otro',
        subtitles: [],
      },
    });

    const action = {
      type: 'FETCH_CONTENT_ITEM_SUCCESS',
      contentItem: {
        externalId: 'f3df657b-5a96-11e8-a68b-c87b0dd0ed31',
        description: 'Messi - El Classico Track Record',
        descriptionBrief: "The Argentine has played against Barca's ...",
        mainCategory: { id: '4', name: 'Video', description: 'Video' },
        title: 'Reminiscing El Clasico',
      },
    };

    const state = byId(stateWithStream, action);
    expect(state).toEqual({
      'f3df657b-5a96-11e8-a68b-c87b0dd0ed31': {
        externalId: 'f3df657b-5a96-11e8-a68b-c87b0dd0ed31',
        description: 'Messi - El Classico Track Record',
        descriptionBrief: "The Argentine has played against Barca's ...",
        mainCategory: { id: '4', name: 'Video', description: 'Video' },
        title: 'Reminiscing El Clasico',
        contributors: [],
        publisherId: undefined,
        media: [
          {
            url:
              'https://stream.cloudtvapi.com/ondemand/_definst_/perform/Streaming/17673/XIpromov2-XIpromov2/smil:main.smil/playlist.m3u8',
          },
        ],
        advertisingUrl: 'https://placeholderurl.otro',
        subtitles: [],
      },
    });
  });

  // it('only keeps https stream and advertising urls', () => {
  //   const streamSuccessAction = {
  //     type: 'FETCH_CONTENT_ENTITLEMENT_SUCCESS',
  //     contentId: 'f3df657b-5a96-11e8-a68b-c87b0dd0ed31',
  //     contentUrl:
  //       'http://stream.cloudtvapi.com/ondemand/_definst_/perform/Streaming/17673/XIpromov2-XIpromov2/smil:main.smil/playlist.m3u8',
  //     advertisingUrl: 'https://placeholderurl.otro',
  //   };

  //   const state = byId(
  //     {
  //       'f3df657b-5a96-11e8-a68b-c87b0dd0ed31': {
  //         title: 'some movie',
  //       },
  //     },
  //     streamSuccessAction
  //   );
  //   expect(state).toEqual({
  //     'f3df657b-5a96-11e8-a68b-c87b0dd0ed31': { title: 'some movie' },
  //   });
  // });

  it('extracts contributorIds', () => {
    const action = {
      type: 'FETCH_CONTENT_ITEM_SUCCESS',
      contentItem: {
        externalId: 'f3df657b-5a96-11e8-a68b-c87b0dd0ed31',
        contentContributors: [
          {
            roleId: 1,
            roleName: 'Publisher',
            starExternalId: 'ae610b12-5a7c-11e8-a68b-c87b0dd0ed31',
            forename: 'Lionnel',
            surname: 'Messi',
            name: 'La Pulga Atomica',
            avatar:
              'https://res.cloudinary.com/footycloudtest/image/upload/v1526650004/Messi/avatar/messi.jpg',
            publisher: true,
          },
          {
            roleId: 2,
            roleName: 'Hero',
            starExternalId: 'd390064b-5a7c-11e8-a68b-c87b0dd0ed31',
            forename: 'Michael',
            surname: 'Jordan',
            name: 'His Airness',
            avatar:
              'https://res.cloudinary.com/footycloudtest/image/upload/v1526653862/General/avatars/MJ.jpg',
            publisher: false,
          },
        ],
      },
    };
    const state = byId({}, action);
    expect(state).toEqual({
      'f3df657b-5a96-11e8-a68b-c87b0dd0ed31': {
        externalId: 'f3df657b-5a96-11e8-a68b-c87b0dd0ed31',
        publisherId: 'ae610b12-5a7c-11e8-a68b-c87b0dd0ed31',
        contributors: [
          'ae610b12-5a7c-11e8-a68b-c87b0dd0ed31',
          'd390064b-5a7c-11e8-a68b-c87b0dd0ed31',
        ],
      },
    });
  });
});
