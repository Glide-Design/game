import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { set, merge } from 'lodash/fp';
import jwt from 'jwt-simple';
import fetchMiddleware, { fetch, retry } from './fetchMiddleware';
import { getEndPointUrl } from './app/selectors';
import storageMiddleware from './storageMiddleware';
import { REFRESH_TOKEN_SUCCESS } from './member/actions';
import { RetryNumber, DefaultAPIRetryDelay } from './utils/sleep';

jest.mock('axios', () => jest.fn());

const baseState = {
  config: {
    apiGlobalRoot: 'https://example.com',
    apiEdgeRoot: 'https://example.com',
  },
  locale: {
    locale: 'en',
  },
};
const refreshToken = 'aaa';
const getItem = jest.fn(key => (key === 'language' ? 'en' : refreshToken));

const createDummyReducer = initialState => {
  const initialMergedState = merge(baseState, initialState);
  return () => initialMergedState;
};

const testUrl = 'http://www.otro.com';

describe('Fetch middleware', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should call retry 3 times if the call is retriable', async () => {
    const store = createStore(
      createDummyReducer(),
      applyMiddleware(thunk, fetchMiddleware(), storageMiddleware({ getItem }))
    );

    axios.mockImplementation(() =>
      Promise.reject({
        config: {},
      })
    );

    try {
      await store.dispatch(
        fetch(testUrl, {
          retry: {
            active: true,
            count: 1,
          },
        })
      );
    } catch (e) {}

    expect(axios).toBeCalledTimes(RetryNumber);
  });

  it('Should not call dispatch unless the code is executed after 500 ms', async () => {
    const dispatch = jest.fn();

    retry(
      {
        url: testUrl,
        params: {
          retry: {
            active: true,
            count: 1,
          },
        },
      },
      dispatch
    )();

    expect(dispatch).not.toHaveBeenCalled();
  });

  it('Should call dispatch if the code is executed after 500 ms', async () => {
    const timestampBeforeCalling = new Date().getTime();
    const dispatch = jest.fn();

    await retry(
      {
        url: testUrl,
        params: {
          retry: {
            active: true,
            count: 1,
          },
        },
      },
      dispatch
    )();

    const timestampAfterCalling = new Date().getTime();

    /* Checking if the time difference is greater than the defaultApiRetryDelay as there is a 
    small delay introduced while executing the test. The difference should be less than 50ms */
    const isTimeDifferenceEquitable =
      timestampAfterCalling - timestampBeforeCalling < DefaultAPIRetryDelay + 50;

    expect(isTimeDifferenceEquitable).toBe(true);

    expect(dispatch).toHaveBeenCalled();
  });

  it('Should dispatch fetch requests', async () => {
    const store = createStore(
      createDummyReducer(),
      applyMiddleware(thunk, fetchMiddleware(), storageMiddleware({ getItem }))
    );
    await store.dispatch(fetch('https://example.com/path'));
    expect(axios).toBeCalledTimes(1);
    expect(axios).toBeCalledWith('https://example.com/path?language=en', {
      method: 'get',
      headers: {},
      retry: { active: false, count: 1 },
    });
  });

  it('Should dispatch post requests with data', async () => {
    const store = createStore(
      createDummyReducer(),
      applyMiddleware(thunk, fetchMiddleware(), storageMiddleware({ getItem }))
    );
    await store.dispatch(fetch('https://example.com/path', { method: 'post', data: 'hello' }));
    expect(axios).toBeCalledTimes(1);
    expect(axios).toBeCalledWith('https://example.com/path?language=en', {
      method: 'post',
      data: 'hello',
      headers: {},
      retry: { active: false, count: 1 },
    });
  });

  it('Should dispatch requests with headers', async () => {
    const store = createStore(
      createDummyReducer(),
      applyMiddleware(thunk, fetchMiddleware(), storageMiddleware({ getItem }))
    );
    await store.dispatch(fetch('https://example.com/path', { headers: { 'User-Agent': 'test' } }));
    expect(axios).toBeCalledTimes(1);
    expect(axios).toBeCalledWith('https://example.com/path?language=en', {
      method: 'get',
      headers: { 'User-Agent': 'test' },
      retry: { active: false, count: 1 },
    });
  });

  it('Should dispatch requests with access tokens', async () => {
    const accessToken = jwt.encode({ exp: (Date.now() + 1e6) / 1000 }, 'xxx');
    const store = createStore(
      createDummyReducer({ user: { accessToken } }),
      applyMiddleware(
        thunk,
        fetchMiddleware(),
        storageMiddleware({ getItem }),
        storageMiddleware({ getItem })
      )
    );
    await store.dispatch(fetch('https://example.com/path'));
    expect(axios).toBeCalledTimes(1);
    expect(axios).toBeCalledWith('https://example.com/path?language=en', {
      method: 'get',
      headers: { Authorization: `Bearer ${accessToken}` },
      retry: { active: false, count: 1 },
    });
  });

  it('Should refresh expired access tokens', async () => {
    const initialAccessToken = jwt.encode({ exp: (Date.now() - 1e6) / 1000 }, 'xxx');
    const nextAccessToken = jwt.encode({ exp: (Date.now() + 1e6) / 1000 }, 'xxx');

    const reducer = (
      state = merge(baseState, { user: { accessToken: initialAccessToken } }),
      action
    ) => {
      switch (action.type) {
        case REFRESH_TOKEN_SUCCESS:
          return set('user.accessToken', action.accessToken, state);
        default:
          return state;
      }
    };

    const setItem = jest.fn();
    const getItem = jest.fn(key => (key === 'language' ? 'en' : refreshToken));
    const removeItem = jest.fn();
    const multiSet = jest.fn();

    const store = createStore(
      reducer,
      applyMiddleware(
        thunk,
        fetchMiddleware(),
        storageMiddleware({ getItem, setItem, removeItem, multiSet })
      )
    );
    axios.mockImplementationOnce(() => ({
      data: {
        access_token: nextAccessToken,
        refresh_token: 'bbb',
      },
    }));
    await store.dispatch(fetch('https://example.com/path'));
    expect(axios).toBeCalledTimes(2);
    expect(axios).toBeCalledWith(
      `${getEndPointUrl(store.getState())('memberTokenRefresh')}?refresh_token=${refreshToken}`
    );
    expect(axios).toBeCalledWith('https://example.com/path?language=en', {
      method: 'get',
      headers: { Authorization: `Bearer ${nextAccessToken}` },
      retry: { active: false, count: 1 },
    });
  });

  it('Should fail if refreshing token fails', async () => {
    const accessToken = jwt.encode({ exp: (Date.now() + 1e6) / 1000 }, 'xxx');
    const store = createStore(
      createDummyReducer({ user: { accessToken } }),
      applyMiddleware(
        thunk,
        fetchMiddleware(),
        storageMiddleware({ getItem }),
        storageMiddleware({ getItem })
      )
    );
    axios.mockImplementationOnce(() => Promise.reject({ config: {} }));
    try {
      await store.dispatch(fetch('path'));
      expect(true).toBe(false);
    } catch (e) {
      expect(axios).toBeCalledTimes(1);
    }
  });
});
