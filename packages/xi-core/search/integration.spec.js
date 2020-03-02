import axios from 'axios';
import nock from 'nock';
import { LocalStorageMock, mockStore } from '../testHelpers';
import { clearRecent, loadFromStorage, search, resultClicked } from './actions';
import {
  getRecentSearches,
  getArticleSearchResults,
  getVideoSearchResults,
  getSocialSearchResults,
  getStarsSearchResults,
} from './selectors';
import parisAPIResponse from './fixtures/api-search-paris';
import beckhamSearchResponse from './fixtures/api-search-response-beckham';

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Search state', () => {
  afterEach(() => nock.cleanAll());

  let store;
  const dummyAPI = 'https://api.osc.com';
  describe('recent searches', () => {
    beforeEach(() => {
      store = mockStore({ dummyAPI }).store;
      nock(dummyAPI)
        .persist()
        .get('/search/all')
        .query(true)
        .reply(200, beckhamSearchResponse);
    });

    it('gets recent searches from storage', async () => {
      await store.dispatch(search('be'));

      expect(getRecentSearches(store.getState())).toEqual([]);

      const starResult = getStarsSearchResults(store.getState())[0];
      await store.dispatch(resultClicked(starResult));
      expect(getRecentSearches(store.getState())).toEqual([starResult]);

      const articleResult = getArticleSearchResults(store.getState())[0];
      await store.dispatch(resultClicked(articleResult));
      expect(getRecentSearches(store.getState())).toEqual([articleResult, starResult]);
    });

    it('places recent searches at the front of the list', async () => {
      expect(getRecentSearches(store.getState())).toEqual([]);

      await store.dispatch(search('be'));

      const starResult = getStarsSearchResults(store.getState())[0];
      const articleResult = getArticleSearchResults(store.getState())[0];
      await store.dispatch(resultClicked(starResult));
      await store.dispatch(resultClicked(articleResult));

      expect(getRecentSearches(store.getState())).toEqual([articleResult, starResult]);
      await store.dispatch(resultClicked(starResult));
      expect(getRecentSearches(store.getState())).toEqual([starResult, articleResult]);
    });

    it('clears recent searches', async () => {
      expect(getRecentSearches(store.getState())).toEqual([]);

      await store.dispatch(search('be'));

      const starResult = getStarsSearchResults(store.getState())[0];
      const articleResult = getArticleSearchResults(store.getState())[0];
      await store.dispatch(resultClicked(starResult));
      await store.dispatch(resultClicked(articleResult));

      expect(getRecentSearches(store.getState())).toEqual([articleResult, starResult]);
      await store.dispatch(clearRecent());
      expect(getRecentSearches(store.getState())).toEqual([]);
    });

    it('reloads from localstorage', async () => {
      const localStorage = new LocalStorageMock();
      const persistentStore = mockStore({ dummyAPI, localStorage }).store;

      expect(getRecentSearches(persistentStore.getState())).toEqual([]);
      await persistentStore.dispatch(search('be'));
      const starResult = getStarsSearchResults(persistentStore.getState())[0];
      await persistentStore.dispatch(resultClicked(starResult));
      expect(getRecentSearches(persistentStore.getState())).toEqual([starResult]);

      const reinitialisedStore = mockStore({ dummyAPI, localStorage }).store;
      await reinitialisedStore.dispatch(loadFromStorage());
      expect(getRecentSearches(reinitialisedStore.getState())).toEqual([starResult]);
    });
  });

  describe('searches', () => {
    beforeEach(() => {
      store = mockStore({ dummyAPI }).store;
    });

    it('should return search results', async () => {
      nock(dummyAPI)
        .get('/search/all')
        .query({ language: 'en', q: 'paris' })
        .reply(200, parisAPIResponse);

      await store.dispatch(search('paris'));

      expect(getArticleSearchResults(store.getState())).toEqual([
        {
          additionalCategories: [],
          contentDates: [],
          contentDynamicMetaDatas: [],
          contentExternalReferences: [],
          contentIdentifiers: [],
          contentPlatforms: [],
          contentProducts: [],
          contentTypeId: '2',
          contentTypeName: 'Article',
          contributors: [],
          creatives: [],
          description:
            'Paris Saint-Germain earned a 3-2 victory over Atletico Madrid in Singapore on Monday thanks to a superb late strike by Virgiliu Postolachi.',
          descriptionBrief:
            'Paris Saint-Germain earned a 3-2 victory over Atletico Madrid in Singapore on Monday thanks to a superb late strike by Virgiliu Postolachi.',
          duration: 0,
          externalId: '123ceac0-48d0-455f-a499-fcb8594cf316',
          genres: [],
          parentalRatings: [],
          partners: [],
          publisherId: undefined,
          title:
            "Paris Saint-Germain 3 Atletico Madrid 2: Postolachi's late stunner gives Tuchel first win",
          titleBrief:
            "Paris Saint-Germain 3 Atletico Madrid 2: Postolachi's late stunner gives Tuchel first win",
          titleSort:
            "Paris Saint-Germain 3 Atletico Madrid 2: Postolachi's late stunner gives Tuchel first win",
        },
      ]);

      expect(getVideoSearchResults(store.getState())).toEqual([]);
      expect(getSocialSearchResults(store.getState())).toEqual([]);
    });
  });
});
