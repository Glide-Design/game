import axios from 'axios';
import nock from 'nock';
import { mockStore, LocalStorageMock } from '../testHelpers';
import Analytics from '../analytics/Analytics';
import {
  isAuthenticated,
  getMemberId,
  getForename,
  getSurname,
  getNickname,
  getEmail,
} from '../member/selectors';
import { endPoints } from '../app/endPoints';
import {
  authenticateWithFacebook,
  restoreLogin,
  setCollectedDetails,
  sendRegistrationEmail,
  registerUser,
  sendLoginEmail,
  NEW_USER,
} from './actions';
import registerWithFacebookApiResponse from './fixtures/api-facebook-registration-response';
import loginWithFacebookApiResponse from './fixtures/api-facebook-login-response';
import getMemberResponse from './fixtures/api-get-member-response';
import emailRegistrationResponse from './fixtures/api-email-registration-response';

axios.defaults.adapter = require('axios/lib/adapters/http');

const dummyAPI = 'https://api.osc.com';

const withLanguageQueryString = (params = {}) => Object.assign({}, params, { language: 'en' });

describe('Signup state', () => {
  afterAll(() => nock.cleanAll());

  let store;

  describe('registerWithFacebook()', () => {
    beforeEach(() => {
      store = mockStore({ dummyAPI }).store;
    });

    describe('when a user is new', () => {
      it('successfully registers the user', async () => {
        const fakeFacebookAuthToken = 'abc123';
        const { memberData } = registerWithFacebookApiResponse;
        const { first_name: forename, last_name: surname, email } = memberData;

        nock(dummyAPI)
          .post(endPoints.memberAuth(), {
            regType: 'FACEBOOK',
            accessToken: fakeFacebookAuthToken,
          })
          .query(withLanguageQueryString())
          .reply(200, registerWithFacebookApiResponse);

        const loginResponse = await store.dispatch(authenticateWithFacebook(fakeFacebookAuthToken));

        const state = store.getState();

        expect(loginResponse).toEqual(NEW_USER);
        expect(getEmail(state)).toEqual(email);
        expect(getForename(state)).toEqual(forename);
        expect(getSurname(state)).toEqual(surname);
      });
    });

    describe('when a user is not new', () => {
      it('successfully logs in the user', async () => {
        const fakeFacebookAuthToken = 'abc123';
        const { externalId, memberData } = loginWithFacebookApiResponse;
        const { first_name: forename, last_name: surname } = memberData;
        const nickname = `${forename}${surname}`;

        nock(dummyAPI)
          .post(endPoints.memberAuth(), {
            regType: 'FACEBOOK',
            accessToken: fakeFacebookAuthToken,
          })
          .query(withLanguageQueryString())
          .reply(200, loginWithFacebookApiResponse);

        nock(dummyAPI)
          .get(endPoints.memberProfile())
          .query(withLanguageQueryString())
          .reply(200, getMemberResponse);

        nock(dummyAPI)
          .get(endPoints.fetchMemberEnablement())
          .query(true)
          .reply(200, {});

        nock(dummyAPI)
          .get(endPoints.fetchMemberContent({ id: 'b6569469-11ca-4fb2-b889-64871ccdc0ab' }))
          .query(true)
          .reply(200, {});

        await store.dispatch(authenticateWithFacebook(fakeFacebookAuthToken));

        const state = store.getState();

        expect(isAuthenticated(state)).toEqual(true);
        expect(getMemberId(state)).toEqual(externalId);
        expect(getForename(state)).toEqual(forename);
        expect(getSurname(state)).toEqual(surname);
        expect(getNickname(state)).toEqual(nickname);
      });
    });
  });

  describe('restoreLogin()', () => {
    let localStorage;

    beforeEach(() => {
      localStorage = new LocalStorageMock();
      store = mockStore({ dummyAPI, localStorage }).store;
    });

    describe('when localstorage contains an access token', () => {
      beforeEach(() => {
        const { access_token: accessToken } = loginWithFacebookApiResponse;
        localStorage.setItem('accessToken', accessToken);
      });

      it('logs the user in', async () => {
        const { externalId, forename, surname, nickname } = getMemberResponse;

        nock(dummyAPI)
          .get(endPoints.memberProfile())
          .query(withLanguageQueryString())
          .reply(200, getMemberResponse);

        nock(dummyAPI)
          .get(endPoints.fetchMemberEnablement())
          .query(true)
          .reply(200, {});

        nock(dummyAPI)
          .get(endPoints.fetchMemberContent({ id: 'b6569469-11ca-4fb2-b889-64871ccdc0ab' }))
          .query(true)
          .reply(200, {});

        await store.dispatch(restoreLogin());

        const state = store.getState();

        expect(isAuthenticated(state)).toEqual(true);
        expect(getMemberId(state)).toEqual(externalId);
        expect(getForename(state)).toEqual(forename);
        expect(getSurname(state)).toEqual(surname);
        expect(getNickname(state)).toEqual(nickname);
      });
    });

    describe('when localstorage does not contain an access token', () => {
      it('does not log the user in', async () => {
        await store.dispatch(restoreLogin());

        const state = store.getState();

        expect(isAuthenticated(state)).toEqual(false);
        expect(getMemberId(state)).toEqual(null);
        expect(getForename(state)).toEqual(null);
        expect(getSurname(state)).toEqual(null);
        expect(getNickname(state)).toEqual(null);
      });
    });
  });

  describe('sendRegistrationEmail()', () => {
    describe('when the user has not already sent an email', () => {
      beforeEach(() => {
        store = mockStore({ dummyAPI }).store;
      });

      it('sends a registration email', async () => {
        const birthday = Date.now();
        const email = 'foo@bar.com';
        const marketingEmailConsent = true;
        const allowPartnerConsent = false;

        await store.dispatch(
          setCollectedDetails({ birthday, email, marketingEmailConsent, allowPartnerConsent })
        );

        const sendEmailRequest = nock(dummyAPI)
          .post(endPoints.memberOutbound(), {
            birthday,
            email,
            marketingEmailConsent,
            allowPartnerConsent,
          })
          .query(
            withLanguageQueryString({
              returnUrl: encodeURIComponent('/'),
              shortcode: true,
              referrerId: '',
            })
          )
          .reply(200);

        await store.dispatch(sendRegistrationEmail());

        const { isRegisteringWithEmailSent } = store.getState().user;

        expect(sendEmailRequest.isDone()).toEqual(true);
        expect(isRegisteringWithEmailSent).toEqual(true);
      });
    });

    describe('when the user has already sent an email', () => {
      beforeEach(() => {
        store = mockStore({
          dummyAPI,
          preloadedState: {
            /*
             `isRegisteringWithEmail` is set during the sending flow, we need to set it here to
             test the API call is *not* made when that flag is true.
              */
            user: { isRegisteringWithEmail: true },
          },
        }).store;
      });

      it('does not send a registration email', async () => {
        const birthday = Date.now();
        const email = 'foo@bar.com';
        const marketingEmailConsent = true;

        const sendEmailRequest = nock(dummyAPI)
          .post(endPoints.memberOutbound(), { birthday, email, marketingEmailConsent })
          .query(withLanguageQueryString({ returnUrl: encodeURIComponent('/') }))
          .reply(200);

        await store.dispatch(sendRegistrationEmail());

        // Assert the request was never called.
        expect(sendEmailRequest.isDone()).toEqual(false);
      });
    });
  });

  describe('registerUser()', () => {
    describe('when the user does not currently have an email send in progress (the API request is still pending)', () => {
      const { access_token: accessToken, externalId } = emailRegistrationResponse;
      const user = {
        birthday: -1185148800000,
        email: 'test_jzsbefi_user@tfbnw.net',
        marketingEmailConsent: false,
        allowPartner: false,
        forename: 'Test',
        nickname: 'TestUser',
        surname: 'User',
        id: externalId,
        temporaryRegistrationToken: accessToken,
        country: 'GB',
      };

      beforeEach(() => {
        store = mockStore({
          dummyAPI,
          preloadedState: { user },
        }).store;
      });

      it('succesfully registers the user', async () => {
        const {
          birthday,
          email,
          marketingEmailConsent,
          forename,
          surname,
          nickname,
          country,
        } = user;

        nock(dummyAPI)
          .post(endPoints.memberRegistration(), {
            birthday,
            email,
            marketingEmailConsent,
            forename,
            surname,
            nickname,
            location: {
              iso3166CountryCode: country,
            },
            platformExternalId: '',
            tracking: {},
            referrerId: '',
          })
          .query(withLanguageQueryString({ token: accessToken }))
          .reply(200, emailRegistrationResponse);

        nock(dummyAPI)
          .get(endPoints.memberProfile())
          .query(withLanguageQueryString())
          .reply(200, getMemberResponse);

        nock(dummyAPI)
          .get(endPoints.fetchMemberEnablement())
          .query(true)
          .reply(200, {});

        window.location.reload = jest.fn();

        await store.dispatch(registerUser({ registeringWithEmail: true }));

        const state = store.getState();

        expect(getForename(state)).toEqual(user.forename);
        expect(getSurname(state)).toEqual(user.surname);
        expect(getNickname(state)).toEqual(user.nickname);
      });
    });

    /*
      Not exactly sure why the `user.isRegisteringWithEmail` guard is necessary for this action, but this is testing it just in case ;)
     */
    describe('when the user has an email send API request *in progress*', () => {
      const { access_token: accessToken, externalId } = emailRegistrationResponse;
      const user = {
        birthday: -1185148800000,
        email: 'philipisapain+29aug01@gmail.com',
        marketingEmailConsent: false,
        forename: 'Philip',
        nickname: 'philipisapain+29aug01',
        surname: 'Spain',
        id: externalId,
        temporaryRegistrationToken: accessToken,
      };

      beforeEach(() => {
        store = mockStore({
          dummyAPI,
          preloadedState: {
            user: { ...user, isRegisteringWithEmail: true, isAuthenticated: false },
          },
        }).store;
      });

      it('does not register the user', async () => {
        const { birthday, email, marketingEmailConsent, forename, surname, nickname } = user;

        const emailRegistrationRequest = nock(dummyAPI)
          .post(endPoints.memberRegistration(), {
            birthday,
            email,
            marketingEmailConsent,
            externalId,
            forename,
            surname,
            nickname,
          })
          .query(withLanguageQueryString({ token: accessToken }))
          .reply(200, emailRegistrationResponse);

        await store.dispatch(registerUser({ registeringWithEmail: false }));

        const state = store.getState();

        expect(emailRegistrationRequest.isDone()).toEqual(false);
        expect(isAuthenticated(state)).toEqual(false);
      });
    });
  });

  describe('sendLoginEmail()', () => {
    describe('when the user has not already sent an email', () => {
      beforeEach(() => {
        store = mockStore({ dummyAPI }).store;
      });

      it('sends a login email', async () => {
        const email = 'foo@bar.com';

        await store.dispatch(setCollectedDetails({ email }));

        const data = { email, marketingEmailConsent: false, allowPartnerConsent: false };

        const sendEmailRequest = nock(dummyAPI)
          .post(endPoints.memberOutbound(), data)
          .query(withLanguageQueryString({ returnUrl: encodeURIComponent('/'), shortcode: true }))
          .reply(200);

        await store.dispatch(sendLoginEmail());

        expect(sendEmailRequest.isDone()).toEqual(true);
      });
    });

    describe('when the user has an email send API request *in progress*', () => {
      beforeEach(() => {
        store = mockStore({
          dummyAPI,
          preloadedState: {
            user: { isRegisteringWithEmail: true },
          },
        }).store;
      });

      it('does not send an email', async () => {
        const email = 'foo@bar.com';

        await store.dispatch(setCollectedDetails({ email }));

        const sendEmailRequest = nock(dummyAPI)
          .post(endPoints.memberOutbound(), { email })
          .query(withLanguageQueryString({ returnUrl: encodeURIComponent('/') }))
          .reply(200);

        await store.dispatch(sendLoginEmail());

        expect(sendEmailRequest.isDone()).toEqual(false);
      });
    });
  });
});
