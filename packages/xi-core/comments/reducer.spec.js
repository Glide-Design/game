import { comments } from './reducer';
import {
  FETCH_COMMENTS_HIGHLIGHTS_SUCCESS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_ALL_REPLIES_SUCCESS,
  FETCH_REPLIES_BEFORE_REPLY_SUCCESS,
  FETCH_REPLIES_AFTER_REPLY_SUCCESS,
  COMMENT_LIKE_REQUEST,
  COMMENT_UNLIKE_REQUEST,
  CONTENT_COMMENT_SUCCESS,
  REPLY_TO_COMMENT_SUCCESS,
  REPLYING_TO_COMMENT,
  DELETE_COMMENT_SUCCESS,
} from './actions';

describe('comments highlights reducer', () => {
  it('puts comments retrieved from the server into the commentsHighlights state', () => {
    const state = {};
    const action = {
      type: FETCH_COMMENTS_HIGHLIGHTS_SUCCESS,
      contentId: '455d74c5-d7e3-4b4e-b4a0-002acff11a68',
      comments: [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-002acff11a68',
          name: 'Lionel Messi',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'first message',
        },
        {
          externalId: '655d74c5-d7e3-4b4e-b4a0-002acff11a68',
          name: 'Lionel Messi',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'second message',
          importantReplies: [
            {
              externalId: '855d74c5-d7e3-4b4e-b4a0-002acff11a68',
              name: 'Lionel Messi',
              avatarUrl: 'https://someimage.com/x.jpg',
              message: 'this is an important reply',
            },
          ],
        },
        {
          externalId: '755d74c5-d7e3-4b4e-b4a0-002acff11a68',
          name: 'Lionel Messi',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'third message',
        },
      ],
    };
    expect(comments(state, action)).toEqual({
      commentHighlights: {
        '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
          {
            avatarUrl: 'https://someimage.com/x.jpg',
            displayName: '',
            externalId: '555d74c5-d7e3-4b4e-b4a0-002acff11a68',
            initials: '',
            message: 'first message',
            name: 'Lionel Messi',
          },
          {
            avatarUrl: 'https://someimage.com/x.jpg',
            displayName: '',
            externalId: '655d74c5-d7e3-4b4e-b4a0-002acff11a68',
            initials: '',
            message: 'second message',
            name: 'Lionel Messi',
          },
          {
            avatarUrl: 'https://someimage.com/x.jpg',
            displayName: '',
            externalId: '855d74c5-d7e3-4b4e-b4a0-002acff11a68',
            importantReply: true,
            initials: '',
            message: 'this is an important reply',
            name: 'Lionel Messi',
            parent: '655d74c5-d7e3-4b4e-b4a0-002acff11a68',
          },
          {
            avatarUrl: 'https://someimage.com/x.jpg',
            displayName: '',
            externalId: '755d74c5-d7e3-4b4e-b4a0-002acff11a68',
            initials: '',
            message: 'third message',
            name: 'Lionel Messi',
          },
        ],
      },
    });
  });

  it('replaces comments in state with new ones received from the server', () => {
    const state = {
      commentHighlights: {
        '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
          {
            externalId: '555d74c5-d7e3-4b4e-b4a0-002acff11a68',
            name: 'Lionel Messi',
            avatarUrl: 'https://someimage.com/x.jpg',
            message: 'first message',
          },
        ],
      },
    };

    const action = {
      type: FETCH_COMMENTS_HIGHLIGHTS_SUCCESS,
      contentId: '455d74c5-d7e3-4b4e-b4a0-002acff11a68',
      comments: [
        {
          externalId: '655d74c5-d7e3-4b4e-b4a0-002acff11a68',
          name: 'Lionel Messi',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'second message',
          importantReplies: [],
        },
        {
          externalId: '755d74c5-d7e3-4b4e-b4a0-002acff11a68',
          name: 'Lionel Messi',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'horses 🐎🐎🐎🐎🐎🐎🐎🐎',
          importantReplies: [],
        },
      ],
    };
    expect(comments(state, action)).toEqual({
      commentHighlights: {
        '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
          {
            avatarUrl: 'https://someimage.com/x.jpg',
            externalId: '555d74c5-d7e3-4b4e-b4a0-002acff11a68',
            message: 'first message',
            name: 'Lionel Messi',
          },
          {
            externalId: '655d74c5-d7e3-4b4e-b4a0-002acff11a68',
            name: 'Lionel Messi',
            avatarUrl: 'https://someimage.com/x.jpg',
            message: 'second message',
            initials: '',
            displayName: '',
          },
          {
            externalId: '755d74c5-d7e3-4b4e-b4a0-002acff11a68',
            name: 'Lionel Messi',
            avatarUrl: 'https://someimage.com/x.jpg',
            message: 'horses 🐎🐎🐎🐎🐎🐎🐎🐎',
            initials: '',
            displayName: '',
          },
        ],
      },
    });
  });
});

describe('content comments reducer', () => {
  it('will add new comments to the state', () => {
    const state = {};
    const action = {
      type: FETCH_COMMENTS_SUCCESS,
      contentId: '455d74c5-d7e3-4b4e-b4a0-002acff11a68',
      parent: 0,
      comments: {
        comments: [
          {
            externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
            forename: 'John',
            surname: 'Smith',
            avatarUrl: 'https://someimage.com/x.jpg',
            message: 'first message',
            importantReplies: [
              {
                externalId: '655d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
                forename: 'John',
                surname: 'Smith',
                avatarUrl: 'https://someimage.com/x.jpg',
                message: 'this is an important reply',
              },
            ],
          },
          {
            externalId: '555d74c5-d7e3-4b4e-b4a0-22222',
            avatarUrl: 'https://someimage.com/x.jpg',
            message: 'first message',
            importantReplies: [],
          },
          {
            externalId: '555d74c5-d7e3-4b4e-b4a0-11111',
            avatarUrl: 'https://someimage.com/x.jpg',
            message: 'first message',
            forename: 'John',
            importantReplies: [],
          },
          {
            externalId: '555d74c5-d7e3-4b4e-b4a0-6666',
            avatarUrl: 'https://someimage.com/x.jpg',
            message: 'first message',
            surname: 'Smith',
            importantReplies: [],
          },
        ],
      },
    };
    expect(comments(state, action)).toEqual({
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          avatarUrl: 'https://someimage.com/x.jpg',
          displayName: 'John Smith',
          externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          initials: 'JS',
          message: 'first message',
          parent: 0,
          surname: 'Smith',
        },
        {
          avatarUrl: 'https://someimage.com/x.jpg',
          displayName: 'John Smith',
          externalId: '655d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          importantReply: true,
          initials: 'JS',
          message: 'this is an important reply',
          parent: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          surname: 'Smith',
        },
        {
          avatarUrl: 'https://someimage.com/x.jpg',
          displayName: '',
          externalId: '555d74c5-d7e3-4b4e-b4a0-22222',
          initials: '',
          message: 'first message',
          parent: 0,
        },
        {
          avatarUrl: 'https://someimage.com/x.jpg',
          displayName: 'John',
          externalId: '555d74c5-d7e3-4b4e-b4a0-11111',
          forename: 'John',
          initials: 'JO',
          message: 'first message',
          parent: 0,
        },
        {
          avatarUrl: 'https://someimage.com/x.jpg',
          displayName: 'Smith',
          externalId: '555d74c5-d7e3-4b4e-b4a0-6666',
          initials: 'SM',
          message: 'first message',
          parent: 0,
          surname: 'Smith',
        },
      ],
    });
  });

  it('will append new comments', () => {
    const state = {
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          surname: 'Smith',
          parent: 0,
          initials: 'JS',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'first message',
          displayName: 'John Smith',
        },
      ],
    };

    const action = {
      type: FETCH_COMMENTS_SUCCESS,
      contentId: '455d74c5-d7e3-4b4e-b4a0-002acff11a68',
      parent: 0,
      comments: {
        comments: [
          {
            externalId: '555d74c5-d7e3-4b4e-b4a0-234234234',
            forename: 'Dave',
            surname: 'Smith',
            avatarUrl: 'https://someimage.com/x.jpg',
            message: 'second message',
            importantReplies: [],
          },
        ],
      },
    };
    expect(comments(state, action)).toEqual({
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          surname: 'Smith',
          parent: 0,
          initials: 'JS',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'first message',
          displayName: 'John Smith',
        },
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-234234234',
          forename: 'Dave',
          surname: 'Smith',
          parent: 0,
          initials: 'DS',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'second message',
          displayName: 'Dave Smith',
        },
      ],
    });
  });
});

describe('content replies reducer', () => {
  it('will append all replies', () => {
    const state = {
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          surname: 'Smith',
          parent: 0,
          initials: 'JS',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'first message',
          displayName: 'John Smith',
        },
      ],
    };

    const action = {
      type: FETCH_ALL_REPLIES_SUCCESS,
      contentId: '455d74c5-d7e3-4b4e-b4a0-002acff11a68',
      parent: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
      comments: {
        comments: [
          {
            externalId: '555d74c5-d7e3-4b4e-b4a0-234234234',
            forename: 'Dave',
            surname: 'Smith',
            avatarUrl: 'https://someimage.com/x.jpg',
            message: 'second message',
            importantReplies: [],
          },
        ],
      },
    };
    expect(comments(state, action)).toEqual({
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          surname: 'Smith',
          parent: 0,
          initials: 'JS',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'first message',
          displayName: 'John Smith',
        },
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-234234234',
          forename: 'Dave',
          surname: 'Smith',
          parent: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          initials: 'DS',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'second message',
          displayName: 'Dave Smith',
        },
      ],
    });
  });

  it('will append replies before a reply', () => {
    const state = {
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          surname: 'Smith',
          parent: 0,
          initials: 'JS',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'parent message',
          displayName: 'John Smith',
        },
      ],
    };

    const action = {
      type: FETCH_REPLIES_BEFORE_REPLY_SUCCESS,
      contentId: '455d74c5-d7e3-4b4e-b4a0-002acff11a68',
      parent: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
      comments: {
        comments: [
          {
            externalId: '555d74c5-d7e3-4b4e-b4a0-234234234',
            forename: 'Dave',
            surname: 'Smith',
            avatarUrl: 'https://someimage.com/x.jpg',
            message: 'reply message',
            importantReplies: [],
          },
        ],
      },
    };
    expect(comments(state, action)).toEqual({
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          surname: 'Smith',
          parent: 0,
          initials: 'JS',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'parent message',
          displayName: 'John Smith',
        },
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-234234234',
          forename: 'Dave',
          surname: 'Smith',
          parent: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          initials: 'DS',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'reply message',
          displayName: 'Dave Smith',
        },
      ],
    });
  });

  it('will append replies after a reply', () => {
    const state = {
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          surname: 'Smith',
          parent: 0,
          initials: 'JS',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'parent message',
          displayName: 'John Smith',
        },
      ],
    };

    const action = {
      type: FETCH_REPLIES_AFTER_REPLY_SUCCESS,
      contentId: '455d74c5-d7e3-4b4e-b4a0-002acff11a68',
      parent: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
      comments: {
        comments: [
          {
            externalId: '555d74c5-d7e3-4b4e-b4a0-234234234',
            forename: 'Dave',
            surname: 'Smith',
            avatarUrl: 'https://someimage.com/x.jpg',
            message: 'reply message',
            importantReplies: [],
          },
        ],
      },
    };
    expect(comments(state, action)).toEqual({
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          surname: 'Smith',
          parent: 0,
          initials: 'JS',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'parent message',
          displayName: 'John Smith',
        },
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-234234234',
          forename: 'Dave',
          surname: 'Smith',
          parent: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          initials: 'DS',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'reply message',
          displayName: 'Dave Smith',
        },
      ],
    });
  });
});

describe('comment like reducer', () => {
  it('will increase like count and set likedByMe to true on correct comment', () => {
    const state = {
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          surname: 'Smith',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'first message',
          likedByMe: false,
          numberOfLikes: 1000,
        },
      ],
    };
    const action = {
      type: COMMENT_LIKE_REQUEST,
      contentId: '455d74c5-d7e3-4b4e-b4a0-002acff11a68',
      commentId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
    };
    expect(comments(state, action)).toEqual({
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          surname: 'Smith',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'first message',
          likedByMe: true,
          numberOfLikes: 1001,
        },
      ],
    });
  });
});

describe('comment unlike reducer', () => {
  it('will decrease like count and set likedByMe to false on correct comment', () => {
    const state = {
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          surname: 'Smith',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'first message',
          likedByMe: true,
          numberOfLikes: 1000,
        },
      ],
    };
    const action = {
      type: COMMENT_UNLIKE_REQUEST,
      contentId: '455d74c5-d7e3-4b4e-b4a0-002acff11a68',
      commentId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
    };
    expect(comments(state, action)).toEqual({
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          surname: 'Smith',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'first message',
          likedByMe: false,
          numberOfLikes: 999,
        },
      ],
    });
  });
});

describe('add comment to content reducer', () => {
  it('will add the comment with the correct data to content comments', () => {
    const state = {
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [],
    };
    const action = {
      type: CONTENT_COMMENT_SUCCESS,
      contentId: '455d74c5-d7e3-4b4e-b4a0-002acff11a68',
      newComment: {
        externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
        forename: 'John',
        surname: 'Smith',
        avatarUrl: 'https://someimage.com/x.jpg',
        message: 'first message',
      },
    };
    expect(comments(state, action)).toEqual({
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          forename: 'John',
          surname: 'Smith',
          initials: 'JS',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'first message',
          parent: 0,
          displayName: 'John Smith',
        },
      ],
    });
  });
});

describe('add reply to comment on content reducer', () => {
  it('will add the reply as comment with the correct data', () => {
    const state = {
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-002acff11a68',
          forename: 'John',
          surname: 'Smith',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'parent comment',
          initials: 'JS',
          parent: 0,
          displayName: 'John Smith',
        },
      ],
    };
    const action = {
      type: REPLY_TO_COMMENT_SUCCESS,
      contentId: '455d74c5-d7e3-4b4e-b4a0-002acff11a68',
      commentId: '555d74c5-d7e3-4b4e-b4a0-002acff11a68',
      newComment: {
        externalId: '655d74c5-d7e3-4b4e-b4a0-002acff11a68',
        forename: 'Dave',
        surname: 'Smith',
        avatarUrl: 'https://someimage.com/x.jpg',
        message: 'reply to parent comment',
      },
    };
    expect(comments(state, action)).toEqual({
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          avatarUrl: 'https://someimage.com/x.jpg',
          displayName: 'Dave Smith',
          externalId: '655d74c5-d7e3-4b4e-b4a0-002acff11a68',
          forename: 'Dave',
          importantReply: true,
          initials: 'DS',
          message: 'reply to parent comment',
          parent: '555d74c5-d7e3-4b4e-b4a0-002acff11a68',
          surname: 'Smith',
        },
        {
          avatarUrl: 'https://someimage.com/x.jpg',
          displayName: 'John Smith',
          externalId: '555d74c5-d7e3-4b4e-b4a0-002acff11a68',
          forename: 'John',
          initials: 'JS',
          message: 'parent comment',
          parent: 0,
          surname: 'Smith',
        },
      ],
    });
  });
});

describe('replying to reducer', () => {
  it('will set which comment is currently being replied to', () => {
    const state = {};
    const action = {
      type: REPLYING_TO_COMMENT,
      contentId: '455d74c5-d7e3-4b4e-b4a0-002acff11a68',
      commentId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
      replyingTo: 'John Smith',
    };
    expect(comments(state, action)).toEqual({
      currentlyReplyingTo: {
        contentId: '455d74c5-d7e3-4b4e-b4a0-002acff11a68',
        commentId: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
        replyingTo: 'John Smith',
      },
    });
  });
});

describe('delete comment reducer', () => {
  it('will remove the correct comment from the stack', () => {
    const state = {
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [
        {
          externalId: '555d74c5-d7e3-4b4e-b4a0-123343434',
          forename: 'John',
          surname: 'Smith',
          avatarUrl: 'https://someimage.com/x.jpg',
          message: 'first message',
          initials: 'JS',
          parent: '555d74c5-d7e3-4b4e-b4a0-rdfsdfdsffd',
          numberOfReplies: 0,
          expandable: false,
        },
      ],
    };
    const action = {
      type: DELETE_COMMENT_SUCCESS,
      commentId: '555d74c5-d7e3-4b4e-b4a0-123343434',
      contentId: '455d74c5-d7e3-4b4e-b4a0-002acff11a68',
    };
    expect(comments(state, action)).toEqual({
      '455d74c5-d7e3-4b4e-b4a0-002acff11a68': [],
    });
  });
});
