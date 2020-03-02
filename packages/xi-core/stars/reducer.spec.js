import { CONTENT_CONTRIBUTORS } from '../content/actions';
import { FETCH_STARS_SUCCESS } from './actions';
import { stars } from './reducer';

describe('stars reducer', () => {
  it('defaults to having no stars', () => {
    const newState = stars(undefined, {});
    expect(newState).toEqual({});
  });

  // it('keys stars by id', () => {
  //   const state = {};
  //   const action = {
  //     type: CONTENT_CONTRIBUTORS,
  //     contributors: [
  //       {
  //         roleId: 2,
  //         roleName: 'Hero',
  //         starExternalId: '2a79ef2b-5f72-11e8-95ee-b59ff90324ac',
  //         forename: 'Mohamed',
  //         surname: 'Salah',
  //         name: '',
  //         avatar: '',
  //         publisher: false,
  //       },
  //       {
  //         roleId: 2,
  //         roleName: 'Hero',
  //         starExternalId: 'd390064b-5a7c-11e8-a68b-c87b0dd0ed31',
  //         forename: 'Michael',
  //         surname: 'Jordan',
  //         name: 'His Airness',
  //         avatar:
  //           'https://res.cloudinary.com/footycloudtest/image/upload/v1526653862/General/avatars/MJ.jpg',
  //         publisher: false,
  //       },
  //       {
  //         roleId: 1,
  //         roleName: 'Publisher',
  //         starExternalId: '9ed6ed96-5a7c-11e8-a68b-c87b0dd0ed31',
  //         forename: 'Junior',
  //         surname: 'Neymar',
  //         name: 'Joia',
  //         avatar:
  //           'https://res.cloudinary.com/footycloudtest/image/upload/v1526650131/Neymar/avatar/neymar.jpg',
  //         publisher: true,
  //       },
  //     ],
  //   };
  //   expect(stars(state, action)).toEqual({
  //     '9ed6ed96-5a7c-11e8-a68b-c87b0dd0ed31': {
  //       forename: 'Junior',
  //       surname: 'Neymar',
  //       avatar:
  //         'https://res.cloudinary.com/footycloudtest/image/upload/v1526650131/Neymar/avatar/neymar.jpg',
  //       starId: '9ed6ed96-5a7c-11e8-a68b-c87b0dd0ed31',
  //     },
  //     'd390064b-5a7c-11e8-a68b-c87b0dd0ed31': {
  //       forename: 'Michael',
  //       surname: 'Jordan',
  //       avatar:
  //         'https://res.cloudinary.com/footycloudtest/image/upload/v1526653862/General/avatars/MJ.jpg',
  //       starId: 'd390064b-5a7c-11e8-a68b-c87b0dd0ed31',
  //     },
  //     '2a79ef2b-5f72-11e8-95ee-b59ff90324ac': {
  //       forename: 'Mohamed',
  //       surname: 'Salah',
  //       avatar: '',
  //       starId: '2a79ef2b-5f72-11e8-95ee-b59ff90324ac',
  //     },
  //   });
  // });

  // it('merges multiple stars by id', () => {
  //   const state = {};
  //   const action = {
  //     type: CONTENT_CONTRIBUTORS,
  //     contributors: [
  //       {
  //         roleId: 2,
  //         roleName: 'Hero',
  //         starExternalId: 'd390064b-5a7c-11e8-a68b-c87b0dd0ed31',
  //         forename: 'Michael',
  //         surname: 'Jordan',
  //         name: 'His Airness',
  //         avatar:
  //           'https://res.cloudinary.com/footycloudtest/image/upload/v1526653862/General/avatars/MJ.jpg',
  //         publisher: false,
  //       },
  //       {
  //         roleId: 1,
  //         roleName: 'Publisher',
  //         starExternalId: '9ed6ed96-5a7c-11e8-a68b-c87b0dd0ed31',
  //         forename: 'Junior',
  //         surname: 'Neymar',
  //         name: 'Joia',
  //         avatar:
  //           'https://res.cloudinary.com/footycloudtest/image/upload/v1526650131/Neymar/avatar/neymar.jpg',
  //         publisher: true,
  //       },
  //     ],
  //   };

  //   const interimState = stars(state, action);
  //   expect(interimState).toEqual({
  //     '9ed6ed96-5a7c-11e8-a68b-c87b0dd0ed31': {
  //       forename: 'Junior',
  //       surname: 'Neymar',
  //       avatar:
  //         'https://res.cloudinary.com/footycloudtest/image/upload/v1526650131/Neymar/avatar/neymar.jpg',
  //       starId: '9ed6ed96-5a7c-11e8-a68b-c87b0dd0ed31',
  //     },
  //     'd390064b-5a7c-11e8-a68b-c87b0dd0ed31': {
  //       forename: 'Michael',
  //       surname: 'Jordan',
  //       avatar:
  //         'https://res.cloudinary.com/footycloudtest/image/upload/v1526653862/General/avatars/MJ.jpg',
  //       starId: 'd390064b-5a7c-11e8-a68b-c87b0dd0ed31',
  //     },
  //   });

  //   const secondAction = {
  //     type: CONTENT_CONTRIBUTORS,
  //     contributors: [
  //       {
  //         roleId: 2,
  //         roleName: 'Hero',
  //         starExternalId: '2a79ef2b-5f72-11e8-95ee-b59ff90324ac',
  //         forename: 'Mohamed',
  //         surname: 'Salah',
  //         name: '',
  //         avatar: '',
  //         publisher: false,
  //       },
  //       {
  //         roleId: 2,
  //         roleName: 'Hero',
  //         starExternalId: 'd390064b-5a7c-11e8-a68b-c87b0dd0ed31',
  //         forename: 'Michael',
  //         surname: 'Jordan',
  //         name: 'His Airness',
  //         avatar:
  //           'https://res.cloudinary.com/footycloudtest/image/upload/v1526653862/General/avatars/MJ.jpg',
  //         publisher: false,
  //       },
  //     ],
  //   };

  //   const endState = stars(interimState, secondAction);
  //   expect(endState).toEqual({
  //     '9ed6ed96-5a7c-11e8-a68b-c87b0dd0ed31': {
  //       forename: 'Junior',
  //       surname: 'Neymar',
  //       avatar:
  //         'https://res.cloudinary.com/footycloudtest/image/upload/v1526650131/Neymar/avatar/neymar.jpg',
  //       starId: '9ed6ed96-5a7c-11e8-a68b-c87b0dd0ed31',
  //     },
  //     'd390064b-5a7c-11e8-a68b-c87b0dd0ed31': {
  //       forename: 'Michael',
  //       surname: 'Jordan',
  //       avatar:
  //         'https://res.cloudinary.com/footycloudtest/image/upload/v1526653862/General/avatars/MJ.jpg',
  //       starId: 'd390064b-5a7c-11e8-a68b-c87b0dd0ed31',
  //     },
  //     '2a79ef2b-5f72-11e8-95ee-b59ff90324ac': {
  //       forename: 'Mohamed',
  //       surname: 'Salah',
  //       avatar: '',
  //       starId: '2a79ef2b-5f72-11e8-95ee-b59ff90324ac',
  //     },
  //   });
  // });
  it('will add order attribute to object', () => {
    const state = {};
    const action = {
      type: FETCH_STARS_SUCCESS,
      stars: [
        {
          nickname: 'Joia',
          forename: 'Neymar',
          displayName: 'Neymar Jr',
          surname: 'Jr',
          externalId: '9ed6ed96-5a7c-11e8-a68b-c87b0dd0ed31',
          avatarUrl:
            'https://res.cloudinary.com/footycloudtest/image/upload/v1526650131/Neymar/avatar/neymar.jpg',
          starType: 'Footballer',
          creatives: [],
        },
        {
          nickname: 'La Pulga Atomica',
          forename: 'Lionel',
          displayName: 'Messi',
          surname: 'Messi',
          externalId: 'ae610b12-5a7c-11e8-a68b-c87b0dd0ed31',
          avatarUrl:
            'https://res.cloudinary.com/footycloudtest/image/upload/v1526650004/Messi/avatar/messi.jpg',
          starType: 'Footballer',
          creatives: [],
        },
      ],
    };
    expect(stars(state, action)).toEqual({
      'ae610b12-5a7c-11e8-a68b-c87b0dd0ed31': {
        forename: 'Lionel',
        displayName: 'Messi',
        surname: 'Messi',
        starId: 'ae610b12-5a7c-11e8-a68b-c87b0dd0ed31',
        avatar:
          'https://res.cloudinary.com/footycloudtest/image/upload/v1526650004/Messi/avatar/messi.jpg',
        starType: 'Footballer',
        creatives: [],
        order: 1,
        bio: {
          blurb: undefined,
          creatives: undefined,
        },
      },
      '9ed6ed96-5a7c-11e8-a68b-c87b0dd0ed31': {
        forename: 'Neymar',
        displayName: 'Neymar Jr',
        surname: 'Jr',
        starId: '9ed6ed96-5a7c-11e8-a68b-c87b0dd0ed31',
        avatar:
          'https://res.cloudinary.com/footycloudtest/image/upload/v1526650131/Neymar/avatar/neymar.jpg',
        starType: 'Footballer',
        creatives: [],
        order: 0,
        bio: {
          blurb: undefined,
          creatives: undefined,
        },
      },
    });
  });
});
