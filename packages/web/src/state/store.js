import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import fetchMiddleware from 'xi-core/fetchMiddleware';
import storageMiddleware from 'xi-core/storageMiddleware';
import analyticsMiddleware from 'xi-core/analytics/analyticsMiddleware';
import localeMiddleware from 'xi-core/locale/asyncMiddleware';
import * as content from 'xi-core/content/reducer';
import { lists, app } from 'xi-core/app/reducer';
import { locale } from 'xi-core/locale/reducer';
import { user, signup } from 'xi-core/signup/reducer';
import { comments } from 'xi-core/comments/reducer';
import { stars } from 'xi-core/stars/reducer';
import { galleries } from 'xi-core/gallery/reducer';
import { member } from 'xi-core/member/reducer';
import { products } from 'xi-core/products/reducer';
import { config } from 'xi-core/config/reducer';
import { snackBar } from 'xi-core/snackBar/reducer';
import { search } from 'xi-core/search/reducer';
import { cards } from 'xi-core/content/cards/reducer';
import { paymentMethods } from 'xi-core/member/paymentMethods/reducer';
import { purchases } from 'xi-core/purchases/reducer';
import { videos } from 'xi-core/video/reducer';
import * as webApp from './app/reducer';

const reducers = combineReducers({
  app,
  content: combineReducers({
    byId: content.byId,
    related: content.related,
    series: content.series,
    seasons: content.seasons,
    cards,
  }),
  sections: content.sections,
  pages: content.pages,
  user,
  locale,
  comments,
  stars,
  galleries,
  member,
  products,
  locationInfo: webApp.locationInfo,
  viewport: webApp.viewport,
  overlayQueue: webApp.overlayQueue,
  lists,
  form: formReducer,
  config,
  purchases,
  signup,
  snackBar,
  search,
  paymentMethods,
  videos,
});

/* eslint-disable no-underscore-dangle, no-undef */
const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunk,
      storageMiddleware({
        getItem: key => localStorage.getItem(key),
        setItem: (key, value) => localStorage.setItem(key, value),
        removeItem: key => localStorage.removeItem(key),
        multiGet: keys => keys.map(key => localStorage.getItem(key)),
        multiSet: tuples => tuples.forEach(([key, value]) => localStorage.setItem(key, value)),
        multiRemove: keys => keys.forEach(key => localStorage.removeItem(key)),
      }),
      fetchMiddleware({ devicePlatform: 'web' }),
      analyticsMiddleware,
      localeMiddleware
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : compose
  )
);
/* eslint-enable */

export default store;
