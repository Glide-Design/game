import {
  isLoading,
  PLACEHOLDERS,
  getReplyingTo,
  getPinnedComment,
  REPLIES_LOAD_TYPE,
  getCommentsByContentId,
  getRepliesToParentComment,
  getRepliesAfterReplyToComment,
  getRepliesBeforeReplyToComment,
  getCommentHighlightsByContentId,
  getImportantRepliesByContentIdAndCommentId,
} from './selectors';

describe('Top Level Comments', () => {
  it('gets all top level comment by content id', () => {
    const state = {
      comments: {
        a: [
          { externalId: 'x', message: 'parent message', parent: 0 },
          { externalId: 'y', message: 'parent message', parent: 'x', importantReply: true },
        ],
      },
    };

    const items = getCommentsByContentId(state)('a');

    expect(items).toEqual([{ externalId: 'x', message: 'parent message', parent: 0 }]);
  });

  it('gets important replies to top level comment in ascending order from comments', () => {
    const state = {
      comments: {
        a: [
          { externalId: 'x', message: 'parent message', parent: 0 },
          {
            externalId: 'y',
            message: 'reply message',
            parent: 'x',
            importantReply: true,
            postedDateTime: 2,
          },
          {
            externalId: 'z',
            message: 'reply message',
            parent: 'x',
            importantReply: true,
            postedDateTime: 1,
          },
        ],
      },
    };

    const items = getImportantRepliesByContentIdAndCommentId(state)('x', 'a');

    expect(items).toEqual([
      {
        externalId: 'z',
        message: 'reply message',
        parent: 'x',
        importantReply: true,
        postedDateTime: 1,
      },
      {
        externalId: 'y',
        message: 'reply message',
        parent: 'x',
        importantReply: true,
        postedDateTime: 2,
      },
    ]);
  });
});

describe('Comment Highlights', () => {
  it('gets comment hightlights by content id', () => {
    const state = {
      comments: {
        commentHighlights: {
          a: [
            { externalId: 'x', message: 'parent message', parent: 0 },
            { externalId: 'y', message: 'parent message', parent: 'x', importantReply: true },
          ],
        },
      },
    };

    const items = getCommentHighlightsByContentId(state)('a');
    expect(items).toEqual([{ externalId: 'x', message: 'parent message', parent: 0 }]);
  });

  it('gets important replies to comment in ascending order from comment hightlights', () => {
    const state = {
      comments: {
        commentHighlights: {
          a: [
            { externalId: 'x', message: 'parent message', parent: 0 },
            {
              externalId: 'y',
              message: 'reply message',
              parent: 'x',
              importantReply: true,
              postedDateTime: 2,
            },
            {
              externalId: 'z',
              message: 'reply message',
              parent: 'x',
              importantReply: true,
              postedDateTime: 1,
            },
          ],
        },
      },
    };

    const items = getImportantRepliesByContentIdAndCommentId(state)('x', 'a', true);
    expect(items).toEqual([
      {
        externalId: 'z',
        message: 'reply message',
        parent: 'x',
        importantReply: true,
        postedDateTime: 1,
      },
      {
        externalId: 'y',
        message: 'reply message',
        parent: 'x',
        importantReply: true,
        postedDateTime: 2,
      },
    ]);
  });
});

describe('Comment Replies', () => {
  it('gets all replies to a comment', () => {
    const state = {
      comments: {
        a: [
          { externalId: 'w', message: 'parent message', parent: 0 },
          { externalId: 'x', message: 'reply message 1', parent: 'w', postedDateTime: 1 },
          { externalId: 'y', message: 'reply message 2', parent: 'w', postedDateTime: 2 },
          { externalId: 'z', message: 'reply message 3', parent: 'w', postedDateTime: 3 },
        ],
      },
    };

    const items = getRepliesToParentComment(state)('a', 'w');
    expect(items).toEqual([
      { externalId: 'x', message: 'reply message 1', parent: 'w', postedDateTime: 1 },
      { externalId: 'y', message: 'reply message 2', parent: 'w', postedDateTime: 2 },
      { externalId: 'z', message: 'reply message 3', parent: 'w', postedDateTime: 3 },
    ]);
  });

  it('gets all replies to a comment after reply X', () => {
    const state = {
      comments: {
        a: [
          { externalId: 'w', message: 'parent message', parent: 0 },
          { externalId: 'x', message: 'reply message 1', parent: 'w', postedDateTime: 1 },
          { externalId: 'y', message: 'reply message 2', parent: 'w', postedDateTime: 2 },
          { externalId: 'z', message: 'reply message 3', parent: 'w', postedDateTime: 3 },
        ],
      },
    };

    const items = getRepliesAfterReplyToComment(state)('a', 'w', 'y');
    expect(items).toEqual([
      { externalId: 'z', message: 'reply message 3', parent: 'w', postedDateTime: 3 },
    ]);
  });

  it('gets all replies to a comment before reply X', () => {
    const state = {
      comments: {
        a: [
          { externalId: 'w', message: 'parent message', parent: 0 },
          { externalId: 'x', message: 'reply message 1', parent: 'w', postedDateTime: 1 },
          { externalId: 'y', message: 'reply message 2', parent: 'w', postedDateTime: 2 },
          { externalId: 'z', message: 'reply message 3', parent: 'w', postedDateTime: 3 },
        ],
      },
    };

    const items = getRepliesBeforeReplyToComment(state)('a', 'w', 'y');
    expect(items).toEqual([
      { externalId: 'x', message: 'reply message 1', parent: 'w', postedDateTime: 1 },
    ]);
  });

  it('gets all replies to a comment after reply X and before reply Y', () => {
    const state = {
      comments: {
        a: [
          { externalId: 'w', message: 'parent message', parent: 0 },
          { externalId: 'x', message: 'reply message 1', parent: 'w', postedDateTime: 1 },
          { externalId: 'y', message: 'reply message 2', parent: 'w', postedDateTime: 2 },
          { externalId: 'z', message: 'reply message 3', parent: 'w', postedDateTime: 3 },
        ],
      },
    };

    const items = getRepliesAfterReplyToComment(state)('a', 'w', 'x', 'more', 'z');
    expect(items).toEqual([
      { externalId: 'y', message: 'reply message 2', parent: 'w', postedDateTime: 2 },
    ]);
  });
});

describe('Replying To A Comment', () => {
  it('gets the content id, comment id and display name for a comment member is currently replying to', () => {
    const state = {
      comments: {
        currentlyReplyingTo: {
          contentId: 'x',
          commentId: 'y',
          replyingTo: 'z',
        },
      },
    };

    const currentlyReplyingTo = getReplyingTo(state);

    expect(currentlyReplyingTo).toEqual({
      contentId: 'x',
      commentId: 'y',
      replyingTo: 'z',
    });
  });
});

describe('Pinned Comments', () => {
  it('gets external id for comment that is currently pinned against a contentId', () => {
    const state = {
      comments: {
        pinComment: {
          contentId: 'x',
        },
      },
    };

    const pinnedCommentId = getPinnedComment(state)('contentId');
    expect(pinnedCommentId).toEqual('x');
  });
});

describe('Loading Comments And Replies', () => {
  it('gets whether the top level comments are loading or not', () => {
    const state = {
      comments: {
        loading: {
          contentId: { 'all,x': true },
        },
      },
    };

    const loading = isLoading(state)('contentId', REPLIES_LOAD_TYPE.ALL_REPLIES + ',x');
    expect(loading).toEqual(true);
  });

  it('gets whether replies before reply X are loading', () => {
    const state = {
      comments: {
        loading: {
          contentId: { x: { 'previous,y': true } },
        },
      },
    };

    const loading = isLoading(state)('contentId', 'x', REPLIES_LOAD_TYPE.PREVIOUS_REPLIES + ',y');
    expect(loading).toEqual(true);
  });

  it('gets whether replies after reply X are loading', () => {
    const state = {
      comments: {
        loading: {
          contentId: { x: { 'more,placeholder': true } },
        },
      },
    };

    const loading = isLoading(state)(
      'contentId',
      'x',
      REPLIES_LOAD_TYPE.MORE_REPLIES + ',' + PLACEHOLDERS.NEXT_REPLY_ID
    );
    expect(loading).toEqual(true);
  });

  it('gets whether replies after reply X and before reply Y are loading', () => {
    const state = {
      comments: {
        loading: {
          contentId: { x: { 'more,y': true } },
        },
      },
    };

    const loading = isLoading(state)('contentId', 'x', REPLIES_LOAD_TYPE.MORE_REPLIES + ',y');
    expect(loading).toEqual(true);
  });
});
