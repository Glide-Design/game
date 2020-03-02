import moment from 'moment';
import {
  isPremium,
  premiumExpires,
  ageIsLessThan,
  getBirthday,
  getDefaultBirthday,
} from './selectors';

jest.mock('../config/selectors', () => ({
  ...require.requireActual('../config/selectors'),
  getSignupAgeDefaultYear: () => 1990,
}));

const firstJan2018 = 1514809830000; // 01/01/2018 12:30:30

describe('member selectors', () => {
  describe('isPremium', () => {
    it('returns false if no user found', () => {
      const state = {
        user: {},
      };

      const userIsPremium = isPremium(state);
      const expiryDate = premiumExpires(state);

      expect(userIsPremium).toEqual(false);
      expect(expiryDate).toEqual(-Infinity);
    });

    it('returns false if subscription expired', () => {
      const oneMonthInThePast = moment().add(-1, 'month');
      const state = {
        user: {
          enablement: {
            type: 'SUBSCRIPTION',
            nextPayment: oneMonthInThePast.valueOf(),
            totalCredits: 0,
            creditsUsed: 0,
            contents: [],
          },
        },
      };

      const userIsPremium = isPremium(state);
      const expiryDate = premiumExpires(state);

      expect(userIsPremium).toEqual(false);
      expect(expiryDate).toEqual(oneMonthInThePast.valueOf());
    });
  });

  it('returns false if subscription valid', () => {
    const oneMonthInTheFuture = moment().add(1, 'month');
    const state = {
      user: {
        enablement: {
          type: 'SUBSCRIPTION',
          nextPayment: oneMonthInTheFuture.valueOf(),
          totalCredits: 0,
          creditsUsed: 0,
          contents: [],
        },
      },
    };

    const userIsPremium = isPremium(state);
    const expiryDate = premiumExpires(state);

    expect(userIsPremium).toEqual(true);
    expect(expiryDate).toEqual(oneMonthInTheFuture.valueOf());
  });

  describe('ageIsLessThan', () => {
    const user = {
      birthday: null,
    };
    const state = {
      user,
    };
    describe('checking against 18', () => {
      const today = new Date();
      it('will return null if user has no birthday set', () => {
        expect(ageIsLessThan(state)(18)).toEqual(null);
      });
      it('will return true if user birthday is today', () => {
        user.birthday = today.toISOString();
        expect(ageIsLessThan(state)(18)).toEqual(true);
      });
      it('will return true if the current date is 1 second before their 18th birthday', () => {
        let d = new Date();
        const age = 18;
        const oneSecond = 1000;
        d.setMonth(today.getMonth() - age * 12);
        d.setTime(d.getTime() + oneSecond);
        user.birthday = d.toISOString();
        expect(ageIsLessThan(state)(age)).toEqual(true);
      });
      it('will return false if the current date is a 1/2 second after their 15th birthday', () => {
        let d = new Date();
        const age = 15;
        const halfSecond = 500;
        d.setMonth(today.getMonth() - age * 12);
        d.setTime(d.getTime() - halfSecond);
        user.birthday = d.toISOString();
        expect(ageIsLessThan(state)(age)).toEqual(false);
      });
    });
  });

  describe('getBirthday', () => {
    it('returns null when birthday is invalid', () => {
      const state = {
        user: {
          birthday: '2008-09-15P15:53:00.000+0000',
        },
      };

      expect(getBirthday(state)).toBe(null);
    });

    it('returns null when the birthday is null', () => {
      const state = {
        user: {
          birthday: null,
        },
      };

      expect(getBirthday(state)).toBe(null);
    });

    it('returns a date when birthday a valid date', () => {
      const state = { user: { birthday: firstJan2018 } };

      const birthday = getBirthday(state);
      expect(birthday.toISOString()).toEqual('2018-01-01T12:30:30.000Z');
    });
  });

  describe('getDefaultBirthday', () => {
    describe('with parts false', () => {
      it("returns the user's birthday when available", () => {
        const state = { user: { birthday: firstJan2018 } };

        const defaultBirthday = getDefaultBirthday(state)(false);
        expect(defaultBirthday.toISOString()).toEqual('2018-01-01T12:30:30.000Z');
      });

      it('returns the default date when the birthday is not available', () => {
        const state = { user: { birthday: null } };

        const defaultBirthday = getDefaultBirthday(state)(false);
        expect(defaultBirthday.getFullYear()).toBe(1990);
        expect(defaultBirthday.getMonth()).toBe(0);
        expect(defaultBirthday.getDate()).toBe(1);
        expect(defaultBirthday.getHours()).toBe(0);
        expect(defaultBirthday.getMinutes()).toBe(0);
        expect(defaultBirthday.getMilliseconds()).toBe(0);
      });
    });
    describe('with parts true', () => {
      it("returns the user's birthday when available", () => {
        const state = { user: { birthday: firstJan2018 } };

        const defaultBirthday = getDefaultBirthday(state)(true);
        expect(defaultBirthday).toEqual({ day: 1, month: 0, year: 2018 });
      });

      it('returns the default date when the birthday is not available', () => {
        const state = { user: { birthday: null } };

        const defaultBirthday = getDefaultBirthday(state)(true);
        expect(defaultBirthday).toEqual({ day: 1, month: 0, year: 1990 });
      });
    });
  });
});
