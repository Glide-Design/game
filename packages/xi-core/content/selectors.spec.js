import {
  getContentItemById,
  getRelatedContent,
  getSectionById,
  getSectionsForTemplateId,
  getSectionsForSectionId,
  isFetchingSection,
  isFetchingSectionsForSection,
  isFetchingSectionsForTemplate,
  getPublisherIdForContent,
  shouldShowGoPremiumSlate,
  getSectionItems,
  getContentTags,
  isContentNew,
  getTagType,
  getContentDate,
  isCompetitionClosed,
  isContentComingSoon,
  COMPETITION_RESULTS_DATE,
  hasContentDatePassed,
} from './selectors';

import { tagTypes } from './tagTypes';
import { contentTypes } from './contentTypes';

describe('content selectors', () => {
  describe('getSectionItems', () => {
    it('gets feed items', () => {
      const state = {
        content: {
          byId: {
            a: { externalId: 'a', title: 'content item a' },
            b: { externalId: 'b', title: 'content item b' },
            c: { externalId: 'c', title: 'content item c' },
          },
        },
        sections: {
          x: {
            content: ['a', 'c', 'b'],
          },
        },
      };

      const items = getSectionItems(state)('x');

      expect(items).toEqual([
        { externalId: 'a', title: 'content item a' },
        { externalId: 'c', title: 'content item c' },
        { externalId: 'b', title: 'content item b' },
      ]);
    });
  });

  describe('getContentItemById', () => {
    const state = {
      content: {
        byId: {
          a: { externalId: 'a', title: 'content item a' },
          b: { externalId: 'b', title: 'content item b' },
          c: { externalId: 'c', title: 'content item c' },
        },
      },
    };

    it('returns a single content item', () => {
      const contentItem = getContentItemById(state)('b');
      expect(contentItem).toEqual({ externalId: 'b', title: 'content item b' });
    });

    it('returns undefined when no object present', () => {
      const contentItem = getContentItemById(state)('d');
      expect(contentItem).toBeUndefined();
    });
  });

  describe('getRelatedContent', () => {
    const state = {
      content: {
        byId: {
          a: { externalId: 'a', title: 'content item a' },
          b: { externalId: 'b', title: 'content item b' },
          c: { externalId: 'c', title: 'content item c' },
        },
        related: {
          b: ['c', 'a'],
          c: [],
        },
      },
    };

    it('returns an array of related content items', () => {
      const relatedItems = getRelatedContent(state)('b');
      expect(relatedItems).toEqual([
        { externalId: 'c', title: 'content item c' },
        { externalId: 'a', title: 'content item a' },
      ]);
    });

    it("returns an empty array when there aren't any related content links", () => {
      const relatedItems = getRelatedContent(state)('c');
      expect(relatedItems).toEqual([]);
    });

    it("returns an empty array when there aren't any related content links", () => {
      const relatedItems = getRelatedContent(state)('a');
      expect(relatedItems).toEqual([]);
    });
  });

  describe('getSectionById', () => {
    const state = {
      sections: {
        a: { externalId: 'a', name: 'section item a' },
        b: { externalId: 'b', name: 'section item b' },
        c: { externalId: 'c', name: 'section item c' },
      },
    };

    it('returns a section', () => {
      const section = getSectionById(state)('b');
      expect(section).toEqual({ externalId: 'b', name: 'section item b' });
    });

    it('returns undefined for unknown sections', () => {
      const section = getSectionById(state)('d');
      expect(section).toBeUndefined();
    });
  });

  describe('getSectionsForTemplateId', () => {
    const state = {
      pages: {
        g: {
          sections: ['b', 'c', 'b'],
        },
        h: {
          sections: ['x', 'y', 'z'],
        },
      },
      sections: {
        a: { externalId: 'a', name: 'section item a' },
        b: { externalId: 'b', name: 'section item b' },
        c: { externalId: 'c', name: 'section item c' },
      },
    };

    it('returns a set of sections for a given templateId', () => {
      const sections = getSectionsForTemplateId(state)('g');
      expect(sections).toEqual([
        { externalId: 'b', name: 'section item b' },
        { externalId: 'c', name: 'section item c' },
        { externalId: 'b', name: 'section item b' },
      ]);
    });

    it('returns an empty array if no sections defined', () => {
      const sections = getSectionsForTemplateId(state)('f');
      expect(sections).toEqual([]);
    });

    it('returns an empty array if section data is not available', () => {
      const sections = getSectionsForTemplateId(state)('h');
      expect(sections).toEqual([]);
    });
  });

  describe('getSectionsForSectionId', () => {
    const state = {
      sections: {
        a: { externalId: 'a', name: 'section item a' },
        b: { externalId: 'b', name: 'section item b' },
        c: { externalId: 'c', name: 'section item c' },
        g: {
          sections: ['b', 'c', 'b'],
        },
        h: {
          sections: ['x', 'y', 'z'],
        },
      },
    };

    it('returns a set of sections for a given templateId', () => {
      const sections = getSectionsForSectionId(state)('g');
      expect(sections).toEqual([
        { externalId: 'b', name: 'section item b' },
        { externalId: 'c', name: 'section item c' },
        { externalId: 'b', name: 'section item b' },
      ]);
    });

    it('returns an empty array if no sections defined', () => {
      const sections = getSectionsForSectionId(state)('f');
      expect(sections).toEqual([]);
    });

    it('returns an empty array if section data is not available', () => {
      const sections = getSectionsForSectionId(state)('h');
      expect(sections).toEqual([]);
    });
  });

  describe('isFetchingSection', () => {
    const state = {
      sections: {
        _fetching: {
          a: true,
        },
      },
    };

    it('returns truthy when key set', () => {
      expect(isFetchingSection('a')(state)).toBeTruthy();
    });

    it('returns falsy when key set', () => {
      expect(isFetchingSection('b')(state)).toBeFalsy();
    });
  });

  describe('isFetchingSectionsForTemplate', () => {
    const state = {
      pages: {
        a: {
          _isFetchingSections: true,
        },
      },
    };

    it('returns truthy when key set', () => {
      expect(isFetchingSectionsForTemplate('a')(state)).toBeTruthy();
    });

    it('returns falsy when key set', () => {
      expect(isFetchingSectionsForTemplate('b')(state)).toBeFalsy();
    });
  });

  describe('isFetchingSectionsForSection', () => {
    const state = {
      sections: {
        a: {
          _isFetchingSections: true,
        },
      },
    };

    it('returns truthy when key set', () => {
      expect(isFetchingSectionsForSection('a')(state)).toBeTruthy();
    });

    it('returns falsy when key set', () => {
      expect(isFetchingSectionsForSection('b')(state)).toBeFalsy();
    });
  });

  describe('getPublisherIdForContent', () => {
    const state = {
      content: {
        byId: {
          a: { externalId: 'a', title: 'content item a', publisherId: 'x' },
          b: { externalId: 'b', title: 'content item b' },
        },
      },
    };

    it('returns publisherId when set', () => {
      expect(getPublisherIdForContent(state)('a')).toEqual('x');
    });

    it('returns undefined when not set', () => {
      expect(getPublisherIdForContent(state)('b')).toBeUndefined();
    });
  });

  describe('shouldShowGoPremiumSlate', () => {
    const state = {
      content: {
        byId: {
          a: { free: true },
          b: { free: false, inventoryType: 'default' },
          c: { free: false, inventoryType: 'preview' },
        },
      },
    };
    it('returns false for all free content', () => {
      expect(shouldShowGoPremiumSlate(state)('a')).toEqual(false);
    });

    it('returns false for not free but default inventory types', () => {
      expect(shouldShowGoPremiumSlate(state)('b')).toEqual(false);
    });

    it('returns true for not free and preview inventory types', () => {
      expect(shouldShowGoPremiumSlate(state)('c')).toEqual(true);
    });
  });
});

describe('getContentTags', () => {
  const state = {
    content: {
      byId: {
        a: { externalId: 'a', tags: [tagTypes.NEW] },
        b: { externalId: 'b', tags: [] },
        c: { externalId: 'c' },
      },
    },
    member: {
      contentStatuses: {
        bookmarked: ['d', 'e'],
      },
      bookmarks: [{ externalId: 'd', tags: [tagTypes.NEW] }, { externalId: 'e', tags: [] }],
    },
  };

  it('returns tags when tags exist', () => {
    expect(getContentTags(state)('a')).toEqual([tagTypes.NEW]);
  });

  it('returns empty list when tags prop exist, but there are no tags', () => {
    expect(getContentTags(state)('b')).toEqual([]);
  });

  it('returns empty list when the tags prop does not exist', () => {
    expect(getContentTags(state)('c')).toEqual([]);
  });

  it('return tags in case of bookmarks, when tags exist', () => {
    expect(getContentTags(state)('d')).toEqual([tagTypes.NEW]);
  });

  it('returns empty list in case of bookmarks without tags', () => {
    expect(getContentTags(state)('e')).toEqual([]);
  });

  it('returns empty list when the content does not exist', () => {
    expect(getContentTags(state)('f')).toEqual([]);
  });
});

describe('getContentDate', () => {
  const state = {
    content: {
      byId: {
        a: {
          externalId: 'a',
          contentDates: [
            {
              startDate: '1545138013000',
              dateType: COMPETITION_RESULTS_DATE,
            },
          ],
        },
        b: { externalId: 'b', contentDates: [] },
        c: { externalId: 'c' },
      },
    },
    member: {
      contentStatuses: {
        bookmarked: ['d', 'e'],
      },
      bookmarks: [
        {
          externalId: 'd',
          contentDates: [
            {
              startDate: '1545138013000',
              dateType: COMPETITION_RESULTS_DATE,
            },
          ],
        },
        { externalId: 'e', contentDates: [] },
      ],
    },
  };

  it('returns the requested date when dates exist', () => {
    expect(getContentDate(state)('a', COMPETITION_RESULTS_DATE)).toEqual({
      startDate: '1545138013000',
      dateType: COMPETITION_RESULTS_DATE,
    });
  });

  it('returns null when contentDates prop exists, but the requested date does not exist', () => {
    expect(getContentDate(state)('b', COMPETITION_RESULTS_DATE)).toBeNull();
  });

  it('returns null when the contentDates prop does not exist', () => {
    expect(getContentDate(state)('c', COMPETITION_RESULTS_DATE)).toBeNull();
  });

  it('return the requested date in case of bookmarks, when the date exists', () => {
    expect(getContentDate(state)('d', COMPETITION_RESULTS_DATE)).toEqual({
      startDate: '1545138013000',
      dateType: COMPETITION_RESULTS_DATE,
    });
  });

  it('returns null in case of bookmarks without contentDates', () => {
    expect(getContentDate(state)('e')).toBeNull();
  });

  it('returns null when the content does not exist', () => {
    expect(getContentDate(state)('f')).toBeNull();
  });
});

describe('isContentNew', () => {
  const state = {
    content: {
      byId: {
        a: { externalId: 'a', tags: [tagTypes.NEW] },
        b: { externalId: 'b', tags: [] },
        c: { externalId: 'c' },
      },
    },
    member: {
      contentStatuses: {
        bookmarked: ['d', 'e'],
      },
      bookmarks: [{ externalId: 'd', tags: [tagTypes.NEW] }, { externalId: 'e', tags: [] }],
    },
  };

  it('returns truthy when editors_pick is present', () => {
    expect(isContentNew(state)('a')).toBeTruthy();
  });

  it('returns falsy when editors_pick is not present', () => {
    expect(isContentNew(state)('b')).toBeFalsy();
  });

  it('returns falsy when the tags do not exist', () => {
    expect(isContentNew(state)('c')).toBeFalsy();
  });

  it('returns truthy in case of bookmarks with editors_pick', () => {
    expect(isContentNew(state)('d')).toBeTruthy();
  });

  it('returns falsy in case of bookmarks without editors_pick', () => {
    expect(isContentNew(state)('e')).toBeFalsy();
  });

  it('returns falsy when the content does not exist', () => {
    expect(isContentNew(state)('f')).toBeFalsy();
  });
});

describe('isContentComingSoon', () => {
  const state = {
    content: {
      byId: {
        a: { externalId: 'a', tags: [tagTypes.COMING_SOON] },
        b: { externalId: 'b', tags: [] },
        c: { externalId: 'c' },
      },
    },
    member: {
      contentStatuses: {
        bookmarked: ['d', 'e'],
      },
      bookmarks: [{ externalId: 'd', tags: [tagTypes.COMING_SOON] }, { externalId: 'e', tags: [] }],
    },
  };

  it('returns truthy when the coming_soon tag is present', () => {
    expect(isContentComingSoon(state)('a')).toBeTruthy();
  });

  it('returns falsy when the coming_soon tag is not present', () => {
    expect(isContentComingSoon(state)('b')).toBeFalsy();
  });

  it('returns falsy when the tags array does not exist', () => {
    expect(isContentComingSoon(state)('c')).toBeFalsy();
  });

  it('returns truthy in case of bookmarks with the coming_soon tag', () => {
    expect(isContentComingSoon(state)('d')).toBeTruthy();
  });

  it('returns falsy in case of bookmarks without the coming_soon tag', () => {
    expect(isContentComingSoon(state)('e')).toBeFalsy();
  });

  it('returns falsy when the content does not exist', () => {
    expect(isContentComingSoon(state)('f')).toBeFalsy();
  });
});

describe('isCompetitionClosed', () => {
  const state = {
    content: {
      byId: {
        a: { externalId: 'a', tags: [tagTypes.CLOSED] },
        b: { externalId: 'b', tags: [] },
        c: { externalId: 'c' },
      },
    },
    member: {
      contentStatuses: {
        bookmarked: ['d', 'e'],
      },
      bookmarks: [{ externalId: 'd', tags: [tagTypes.CLOSED] }, { externalId: 'e', tags: [] }],
    },
  };

  it('returns truthy when the qa_closed tag is present', () => {
    expect(isCompetitionClosed(state)('a')).toBeTruthy();
  });

  it('returns falsy when the qa_closed tag is not present', () => {
    expect(isCompetitionClosed(state)('b')).toBeFalsy();
  });

  it('returns falsy when the tags array does not exist', () => {
    expect(isCompetitionClosed(state)('c')).toBeFalsy();
  });

  it('returns truthy in case of bookmarks with the qa_closed tag', () => {
    expect(isCompetitionClosed(state)('d')).toBeTruthy();
  });

  it('returns falsy in case of bookmarks without the qa_closed tag', () => {
    expect(isCompetitionClosed(state)('e')).toBeFalsy();
  });

  it('returns falsy when the content does not exist', () => {
    expect(isCompetitionClosed(state)('f')).toBeFalsy();
  });
});

describe('hasContentDatePassed', () => {
  const state = {
    content: {
      byId: {
        a: {
          externalId: 'a',
          contentDates: [
            {
              startDate: '1545138013000',
              dateType: COMPETITION_RESULTS_DATE,
            },
          ],
        },
        b: {
          externalId: 'b',
          contentDates: [
            {
              startDate: '1608296413000',
              dateType: COMPETITION_RESULTS_DATE,
            },
          ],
        },
        c: { externalId: 'c' },
      },
    },
    member: {
      contentStatuses: {
        bookmarked: ['d', 'e'],
      },
      bookmarks: [
        {
          externalId: 'd',
          contentDates: [
            {
              startDate: '1545138013000',
              dateType: COMPETITION_RESULTS_DATE,
            },
          ],
        },
        { externalId: 'e', contentDates: [] },
      ],
    },
  };

  it('returns truthy when the date is in the past', () => {
    expect(hasContentDatePassed(state)('a', COMPETITION_RESULTS_DATE)).toBeTruthy();
  });

  it('returns falsy when the date is in the future', () => {
    expect(hasContentDatePassed(state)('b', COMPETITION_RESULTS_DATE)).toBeFalsy();
  });

  it('returns falsy when the date does not exist', () => {
    expect(hasContentDatePassed(state)('c', COMPETITION_RESULTS_DATE)).toBeFalsy();
  });

  it('return truthy in case of bookmarks, when the date is in the past', () => {
    expect(hasContentDatePassed(state)('d', COMPETITION_RESULTS_DATE)).toBeTruthy();
  });

  it('returns falsy in case of bookmarks, when the date does not exist', () => {
    expect(hasContentDatePassed(state)('e')).toBeFalsy();
  });

  it('returns falsy when the content does not exist', () => {
    expect(hasContentDatePassed(state)('f')).toBeFalsy();
  });
});

describe('getTagType', () => {
  const state = {
    content: {
      byId: {
        a: { externalId: 'a', tags: [tagTypes.NEW] },
        b: {
          externalId: 'b',
          tags: [tagTypes.COMING_SOON],
        },
        c: {
          externalId: 'c',
          tags: [tagTypes.NEW, tagTypes.COMING_SOON],
        },
        d: {
          externalId: 'd',
          contentType: contentTypes.COMPETITION,
          tags: [],
        },
        e: {
          externalId: 'e',
          contentType: contentTypes.COMPETITION,
          tags: [tagTypes.CLOSED],
        },
        f: {
          externalId: 'f',
          contentType: contentTypes.Q_AND_A,
          tags: [tagTypes.CLOSED, tagTypes.NEW],
          contentDates: [
            {
              startDate: '1558358082000',
              dateType: COMPETITION_RESULTS_DATE,
            },
          ],
        },
        g: {
          externalId: 'g',
          contentType: contentTypes.Q_AND_A,
          tags: [tagTypes.CLOSED, tagTypes.NEW],
          contentDates: [
            {
              startDate: '1905513282000',
              dateType: COMPETITION_RESULTS_DATE,
            },
          ],
        },
        h: {
          externalId: 'f',
          contentType: contentTypes.Q_AND_A,
          tags: [tagTypes.CLOSED],
          contentDates: [
            {
              startDate: '1558358082000',
              dateType: COMPETITION_RESULTS_DATE,
            },
          ],
        },
        i: { externalId: 'j' },
      },
    },
  };

  it('returns NEW when editors_pick is present', () => {
    expect(getTagType(state)('contentType', 'a')).toEqual(tagTypes.NEW);
  });

  it('returns COMING SOON when COMING SOON/PUBLISH date are set', () => {
    expect(getTagType(state)('contentType', 'b')).toEqual(tagTypes.COMING_SOON);
  });

  it('returns COMING SOON tag, as it overrides the NEW tag', () => {
    expect(getTagType(state)(contentTypes.COMPETITION, 'c')).toEqual(tagTypes.COMING_SOON);
  });
  it('returns null when the content is an open competition and there are no other tags', () => {
    expect(getTagType(state)(contentTypes.COMPETITION, 'd')).toBeNull();
  });
  it('returns CLOSED tag when the content is a closed competition', () => {
    expect(getTagType(state)(contentTypes.COMPETITION, 'e')).toEqual(tagTypes.CLOSED);
  });
  it('returns NEW in case of Q&As when results_date < current date and editors pick is present', () => {
    expect(getTagType(state)(contentTypes.Q_AND_A, 'f')).toEqual(tagTypes.NEW);
  });
  it('returns CLOSED in case of Q&As when end_date < current date < results_date, even even though editors pick is present', () => {
    expect(getTagType(state)(contentTypes.Q_AND_A, 'g')).toEqual(tagTypes.CLOSED);
  });
  it('returns null in case of Q&As when results results_date < current date and editors pick is not present', () => {
    expect(getTagType(state)(contentTypes.Q_AND_A, 'h')).toBeNull();
  });
  it('returns null when there are no tags/contentDates so no tag will be displayed', () => {
    expect(getTagType(state)('contentType', 'i')).toBeNull();
  });
});
