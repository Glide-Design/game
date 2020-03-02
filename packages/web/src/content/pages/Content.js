import React from 'react';
import { compose, get, omit } from 'lodash/fp';
import { connect } from 'react-redux';
import { withProps, lifecycle, branch, renderComponent } from 'recompose';
import { withRouter } from 'react-router-dom';
import { fetchContentItem } from 'xi-core/content/actions';
import { getContentItemById } from 'xi-core/content/selectors';
import withContentPageSession from 'xi-core/content/withContentPageSession';
import withRequest from 'xi-core/withRequest';
import { contentTypes } from 'xi-core/content/contentTypes';
import { openComments } from 'xi-core/comments/actions';
import ModalComments from '../../comments/ModalComments';
import NoMatch from '../../app/NoMatch';
import Video from './video';
import Article from './article';
import Social from './social';
import Gallery from './gallery';

class Content extends React.Component {
  constructor(props) {
    super(props);
    if (
      this.shouldOpenComments() ||
      (this.isCommentsDeepLink() && this.isValidCommentsDeepLink())
    ) {
      const { history, openComments } = props;
      history.replace(history.location.pathname, omit('openComments', history.location.state));
      this.noAutoPlay = true;
      openComments();
    }
  }

  isCommentsDeepLink = () => get('history.location.pathname', this.props).endsWith('/comments');

  isValidCommentsDeepLink = returnUrl => {
    const regex = /\/content\/([A-Za-z0-9-_]+)\/comments/;
    return get('history.location.pathname', this.props).match(regex);
  };

  shouldOpenComments = () => get('state.openComments', this.props.history.location);

  noAutoPlay = false;

  render() {
    const { content, requestId } = this.props;

    const commonProps = {
      contentTypeName: contentTypes.VIDEO,
      contentId: 'test-content-id',
      content: { content },
    };

    return [
      <Video key={'video'} {...commonProps} noAutoPlay={true} />,
      <ModalComments key={'modalcomments'} contentId={'test-content-id'} />,
    ];

    // if (!content) {
    //   return null;
    // }

    // const { contentTypeName } = content;

    // const commonProps = {
    //   contentTypeName: contentTypeName,
    //   contentId: requestId,
    //   content: content,
    // };

    // switch (contentTypeName) {
    //   case contentTypes.GALLERY:
    //     return [
    //       <Gallery key={'gallery'} {...commonProps} />,
    //       <ModalComments key={'modalcomments'} contentId={requestId} />,
    //     ];
    //   case contentTypes.VIDEO:
    //     return [
    //       <Video key={'video'} {...commonProps} noAutoPlay={this.noAutoPlay} />,
    //       <ModalComments key={'modalcomments'} contentId={requestId} />,
    //     ];
    //   case contentTypes.ARTICLE:
    //     return [
    //       <Article key={'article'} {...commonProps} />,
    //       <ModalComments key={'modalcomments'} contentId={requestId} />,
    //     ];
    //   case contentTypes.SOCIAL:
    //     return [
    //       <Social key={'social'} {...commonProps} />,
    //       <ModalComments key={'modalcomments'} />,
    //     ];
    //   default:
    //     console.warn('Unknown content type', contentTypeName);
    //     return null;
    // }
  }
}

export default compose(
  withRouter,
  withProps(({ match }) => ({ requestId: match.params.contentId })),
  // withRequest({
  //   requestAction: ids => {
  //     return fetchContentItem(ids, { includeCounters: true });
  //   },
  //   responseSelector: getContentItemById,
  //   responseAlias: 'content',
  // }),
  connect(
    null,
    (dispatch, { requestId, history }) => ({
      openComments: () => dispatch(openComments(requestId, history)),
    })
  ),
  lifecycle({
    shouldComponentUpdate: ({ content: { title } = {} } = {}) => {
      if (title && title !== document.title) {
        document.title = title;
      }
      return true;
    },
  }),
  withContentPageSession,
  branch(() => window.is404, renderComponent(NoMatch))
)(Content);
