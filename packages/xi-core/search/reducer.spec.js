import { FETCH_SEARCH_SUCCESS } from 'xi-core/search/actions';
import {} from '../content/actions';
import { search } from './reducer';

describe('search reducer', () => {
  it('defaults to having no search', () => {
    const newState = search(undefined, {});
    expect(newState).toEqual({
      isLoading: false,
      prevSearchTerm: '',
      results: {
        video: [],
        article: [],
        social: [],
        star: [],
      },
      recentSearches: [],
    });
  });

  it('sets the results correctly in state', () => {
    const searchResults = {
      galleryList: [],
      socialList: [],
      articleList: [
        {
          externalId: '123ceac0-48d0-455f-a499-fcb8594cf316',
          contentTypeId: '2',
          contentTypeName: 'Article',
          titleSort:
            "Paris Saint-Germain 3 Atletico Madrid 2: Postolachi's late stunner gives Tuchel first win",
          duration: 0,
          titleBrief:
            "Paris Saint-Germain 3 Atletico Madrid 2: Postolachi's late stunner gives Tuchel first win",
          description:
            'Paris Saint-Germain earned a 3-2 victory over Atletico Madrid in Singapore on Monday thanks to a superb late strike by Virgiliu Postolachi.',
          descriptionBrief:
            'Paris Saint-Germain earned a 3-2 victory over Atletico Madrid in Singapore on Monday thanks to a superb late strike by Virgiliu Postolachi.',
          genres: [],
          contentDates: [],
          creatives: [],
          partners: [],
          contentContributors: [],
          contentExternalReferences: [],
          contentIdentifiers: [],
          contentDynamicMetaDatas: [],
          additionalCategories: [],
          title:
            "Paris Saint-Germain 3 Atletico Madrid 2: Postolachi's late stunner gives Tuchel first win",
          parentalRatings: [],
          contentProducts: [],
          contentPlatforms: [],
        },
      ],
      pollList: [],
      quizList: [],
      videoList: [],
      starList: [],
    };
    const newState = search(undefined, { type: FETCH_SEARCH_SUCCESS, searchResults });
    expect(newState).toEqual({
      isLoading: false,
      prevSearchTerm: '',
      results: {
        video: [],
        article: ['123ceac0-48d0-455f-a499-fcb8594cf316'],
        social: [],
        star: [],
        competition: [],
        'q&a': [],
      },
      recentSearches: [],
    });
  });
});
