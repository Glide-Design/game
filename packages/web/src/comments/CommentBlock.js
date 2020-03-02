import React from 'react';
import { connect } from 'react-redux';
import { compose, includes } from 'lodash/fp';
import { FormattedMessage } from 'react-intl';
import withRequest from 'xi-core/withRequest';
import { isLoading, REPLIES_LOAD_TYPE } from 'xi-core/comments/selectors';
import styled from 'styled-components';
import navPresenter from 'xi-core/navigation/NavigationPresenter';
import { Grey85 } from 'xi-core/colours';
import { commentsPageInteraction } from 'xi-core/comments/actions';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import LoaderSpinner from '../common/LoaderSpinner';
import Comment, { RepliesInfo, RepliesInfoContainer } from './Comment';

const Container = styled.div`
  position: relative;
  color: ${Grey85};
  background: white;
  padding-top: 20px;
  ${props => (props.isTopLevel ? '' : 'padding-top: 0px')}
`;

const Wrapper = styled.div`
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
`;

const StyledLoaderSpinner = styled(LoaderSpinner)`
  width: 100%;
  text-align: center;
  margin: 10px 0px;
`;

class CommentBlock extends React.Component {
  state = {
    hidden: false,
  };

  componentDidUpdate = prevProps => {
    const { isAnotherPage, contentId, hasReachedEnd } = this.props;
    navPresenter.setCurrentContent(contentId);

    if (hasReachedEnd && !prevProps.hasReachedEnd && isAnotherPage()) {
      this.props.getNextPage();
    }
  };

  hasMorePagesOfReplies = requestType => {
    const { isLoading, loadType, isAnotherPage } = this.props;
    return !isLoading && loadType === requestType && isAnotherPage();
  };

  handleRenderHideRepliesCtaClick = (e, loadType) => {
    e.preventDefault();
    this.setState({ hidden: true });

    const { pageInteraction } = this.props;
    let eventName = '';

    switch (loadType) {
      case REPLIES_LOAD_TYPE.PREVIOUS_REPLIES:
        eventName = PropertyKeys.COMMENTS_PAGE.HIDE_PREVIOUS_REPLIES_CLICKED;
        break;
      case REPLIES_LOAD_TYPE.MORE_REPLIES:
      case REPLIES_LOAD_TYPE.ALL_REPLIES:
        eventName = PropertyKeys.COMMENTS_PAGE.HIDE_REPLIES_CLICKED;
        break;
      default:
        break;
    }

    pageInteraction(eventName);
  };

  renderHideRepliesCta = loadType => {
    const { isTopLevelComment } = this.props;

    let dataTestId = 'hide-replies';
    if (loadType === REPLIES_LOAD_TYPE.PREVIOUS_REPLIES) {
      dataTestId = 'hide-previous-replies';
    }

    return (
      <RepliesInfoContainer isTopLevelComment={isTopLevelComment}>
        <RepliesInfo
          data-test-id={dataTestId}
          onClick={e => this.handleRenderHideRepliesCtaClick(e, loadType)}
        >
          {'- - - - - - - '}
          {loadType === REPLIES_LOAD_TYPE.PREVIOUS_REPLIES && (
            <FormattedMessage
              id="comments.hide_previous_replies"
              defaultMessage="Hide previous replies"
            />
          )}
          {includes(loadType, [REPLIES_LOAD_TYPE.ALL_REPLIES, REPLIES_LOAD_TYPE.MORE_REPLIES]) && (
            <FormattedMessage id="comments.hide_replies" defaultMessage="Hide replies" />
          )}
        </RepliesInfo>
      </RepliesInfoContainer>
    );
  };

  handleRenderViewRepliesCtaClick = (e, loadType, withGetNextPageRequest) => {
    e.preventDefault();
    const { pageInteraction, getNextPage } = this.props;
    withGetNextPageRequest ? getNextPage() : this.setState({ hidden: false });

    let eventName = '';

    switch (loadType) {
      case REPLIES_LOAD_TYPE.PREVIOUS_REPLIES:
        eventName = PropertyKeys.COMMENTS_PAGE.VIEW_PREVIOUS_REPLIES_CLICKED;
        break;
      case REPLIES_LOAD_TYPE.MORE_REPLIES:
        eventName = PropertyKeys.COMMENTS_PAGE.VIEW_MORE_REPLIES_CLICKED;
        break;
      case REPLIES_LOAD_TYPE.ALL_REPLIES:
        eventName = withGetNextPageRequest
          ? PropertyKeys.COMMENTS_PAGE.VIEW_PREVIOUS_REPLIES_CLICKED
          : PropertyKeys.COMMENTS_PAGE.VIEW_REPLIES_CLICKED;
        break;
      default:
        break;
    }

    eventName && pageInteraction(eventName);
  };

  renderViewRepliesCta = ({ loadType, withGetNextPageRequest = false }) => {
    const { isTopLevelComment } = this.props;

    let dataTestId = '';
    if (loadType === REPLIES_LOAD_TYPE.ALL_REPLIES) {
      dataTestId = 'view-all-replies';
    } else if (loadType === REPLIES_LOAD_TYPE.MORE_REPLIES) {
      dataTestId = 'view-more-replies';
    } else if (loadType === REPLIES_LOAD_TYPE.PREVIOUS_REPLIES) {
      dataTestId = 'view-previous-replies';
    }

    return (
      <RepliesInfoContainer isTopLevelComment={isTopLevelComment}>
        <RepliesInfo
          data-test-id={dataTestId}
          onClick={e => this.handleRenderViewRepliesCtaClick(e, loadType, withGetNextPageRequest)}
        >
          {'- - - - - - - '}
          {loadType === REPLIES_LOAD_TYPE.ALL_REPLIES && withGetNextPageRequest && (
            <FormattedMessage
              id="comments.view_previous_replies"
              defaultMessage="View previous replies"
            />
          )}
          {loadType === REPLIES_LOAD_TYPE.ALL_REPLIES && !withGetNextPageRequest && (
            <FormattedMessage id="comments.view_all_replies" defaultMessage="View all replies" />
          )}
          {loadType === REPLIES_LOAD_TYPE.PREVIOUS_REPLIES && (
            <FormattedMessage
              id="comments.view_previous_replies"
              defaultMessage="View previous replies"
            />
          )}
          {loadType === REPLIES_LOAD_TYPE.MORE_REPLIES && (
            <FormattedMessage id="comments.view_more_replies" defaultMessage="View more replies" />
          )}
        </RepliesInfo>
      </RepliesInfoContainer>
    );
  };

  render = () => {
    const {
      comments,
      contentId,
      focusTextArea,
      isLoading,
      parentId,
      loadType,
      replyId,
    } = this.props;

    const { hidden } = this.state;

    return (
      <Container isTopLevel={!parentId ? true : false}>
        {includes(loadType, [REPLIES_LOAD_TYPE.ALL_REPLIES, REPLIES_LOAD_TYPE.PREVIOUS_REPLIES]) ? (
          isLoading ? (
            <StyledLoaderSpinner />
          ) : this.hasMorePagesOfReplies(loadType) ? (
            this.renderViewRepliesCta({ loadType: loadType, withGetNextPageRequest: true })
          ) : !hidden ? (
            this.renderHideRepliesCta(loadType)
          ) : (
            this.renderViewRepliesCta({ loadType: loadType, withGetNextPageRequest: false })
          )
        ) : null}

        <Wrapper hidden={hidden}>
          {comments.map(comment => {
            return comment.externalId !== replyId ? (
              <Comment
                key={comment.externalId}
                comment={comment}
                contentId={contentId}
                focusTextArea={focusTextArea}
              />
            ) : null;
          })}
        </Wrapper>

        {isLoading && !parentId && <StyledLoaderSpinner />}

        {loadType === REPLIES_LOAD_TYPE.MORE_REPLIES ? (
          isLoading ? (
            <StyledLoaderSpinner />
          ) : this.hasMorePagesOfReplies(loadType) ? (
            this.renderViewRepliesCta({ loadType: loadType, withGetNextPageRequest: true })
          ) : !hidden ? (
            this.renderHideRepliesCta(loadType)
          ) : (
            this.renderViewRepliesCta({ loadType: loadType, withGetNextPageRequest: false })
          )
        ) : null}
      </Container>
    );
  };
}

const mapStateToProps = (state, { contentId, parentId, loadType, replyId }) => {
  return {
    isLoading: isLoading(state)(contentId, parentId, loadType ? loadType + ',' + replyId : null),
  };
};

const mapDispatchToProps = dispatch => ({
  pageInteraction: action => dispatch(commentsPageInteraction(action)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRequest({
    pageable: true,
  })
)(CommentBlock);
