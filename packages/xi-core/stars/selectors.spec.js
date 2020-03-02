import { getStarById, getStarAvatarUrl, getStarName, getFollowableStars } from './selectors';
import starTypes from './starTypes';

describe('stars selctors', () => {
  const a = {
    order: 1,
    forename: 'Stewart',
    surname: 'Megaw',
    displayName: 'Stewart Megaw',
    avatar: 'https://stewie.megaw.com/prettyFace.jpg',
    starType: starTypes.Footballer,
  };

  const b = {
    order: 0,
    surname: 'Pele',
    displayName: 'Pele',
    starType: starTypes.Footballer,
  };

  const state = {
    stars: {
      a,
      b,
    },
  };

  describe('getFollowableStars', () => {
    it('gets stars in the correct order', () => {
      expect(getFollowableStars(state)).toEqual([b, a]);
    });
  });

  describe('getStarById', () => {
    it('gets a star by id', () => {
      expect(getStarById(state)('a')).toEqual(a);
    });
    it("returns undefined if a star doesn't exist", () => {
      expect(getStarById(state)('z')).toBeUndefined();
    });
  });

  describe('getStarAvatarUrl', () => {
    it('gets a url for a stars avatar', () => {
      expect(getStarAvatarUrl(state)('a')).toEqual('https://stewie.megaw.com/prettyFace.jpg');
    });

    it("returns undefined if a star doesn't have an avatar or doesn't exist", () => {
      expect(getStarAvatarUrl(state)('b')).toEqual(undefined);
      expect(getStarAvatarUrl(state)('z')).toEqual(undefined);
    });
  });

  describe('getStarName', () => {
    it('gets the star name as one string', () => {
      expect(getStarName(state)('a')).toEqual('Stewart Megaw');
    });

    it('gets the star name as one string', () => {
      expect(getStarName(state)('b')).toEqual('Pele');
    });

    it("returns empty string if star doesn't exist", () => {
      expect(getStarName(state)('z')).toEqual('');
    });
  });
});
