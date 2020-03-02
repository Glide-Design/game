import jwt from 'jwt-simple';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { HostLabels } from './app/endPoints';
import { app as appReducer } from './app/reducer';
import { setConfig } from './config/actions';
import { config as configReducer } from './config/reducer';
import fetchMiddleware from './fetchMiddleware';
import { locale as localeReducer } from './locale/reducer';
import { products as productsReducer } from './products/reducer';
import { search as searchReducer } from './search/reducer';
import { AUTHENTICATE_USER_SUCCESS } from './signup/actions';
import { user as userReducer } from './signup/reducer';
import { stars as starsReducer } from './stars/reducer';
import { galleries as galleriesReducer } from './gallery/reducer';
import { paymentMethods as paymentMethodsReducer } from './member/paymentMethods/reducer';
import * as content from './content/reducer';
import storageMiddleware from './storageMiddleware';

export class LocalStorageMock {
  constructor() {
    this.store = Object.create(null);
  }

  clear() {
    this.store = Object.create(null);
  }

  getItem(key) {
    return key in this.store ? this.store[key] : null;
  }

  setItem(key, value) {
    if (typeof value !== 'string') {
      throw new Error('Cannot set non-string value');
    }
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }

  multiGet(keys) {
    return keys.map(key => this.getItem(key));
  }

  multiSet(tuples) {
    tuples.forEach(([key, value]) => this.setItem(key, value));
  }

  multiRemove(keys) {
    keys.forEach(key => this.removeItem(key));
  }
}

export const mockStore = ({
  authenticateAsMemberId,
  dummyAPI,
  localStorage = new LocalStorageMock(),
  preloadedState = {},
} = {}) => {
  const token = jwt.encode(
    {
      sub: authenticateAsMemberId,
      identityId: 'clarkie@tojs.io',
      devices: 4,
      concurrent: 2,
      exp: new Date().getTime() / 1000 + 500,
    },
    'xxx'
  );

  const reducer = combineReducers({
    app: appReducer,
    products: productsReducer,
    config: configReducer,
    locale: localeReducer,
    user: userReducer,
    stars: starsReducer,
    galleries: galleriesReducer,
    search: searchReducer,
    paymentMethods: paymentMethodsReducer,
    content: combineReducers({
      byId: content.byId,
    }),
  });
  const middleware = applyMiddleware(thunk, fetchMiddleware(), storageMiddleware(localStorage));
  const store = createStore(reducer, preloadedState, middleware);

  for (let label in HostLabels) {
    store.dispatch(setConfig({ [`api${HostLabels[label]}Root`]: dummyAPI }));
  }

  if (authenticateAsMemberId) {
    store.dispatch({
      type: AUTHENTICATE_USER_SUCCESS,
      user: {
        accessToken: token,
        refreshToken: 'undefined',
        id: authenticateAsMemberId,
      },
    });
  }

  return { store, token };
};
