import React from 'react';
import styled from 'styled-components';
import { compose, get } from 'lodash/fp';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {
  getCommentsByContentId,
  getReplyingTo,
  getCommentError,
  getErrorMessages,
  ERRORS,
} from 'xi-core/comments/selectors';
import { getContentItemById } from 'xi-core/content/selectors';
import { closeComments, clearCommentError } from 'xi-core/comments/actions';
import {
  isAuthenticated,
  hasCommentingBlocked,
  getAvatar,
  getInitials,
} from 'xi-core/member/selectors';
import { Grey5, Grey50, Grey85 } from 'xi-core/colours';
import {
  fetchCommentsForContent,
  addComment,
  onReplyComment,
  clearContentComments,
} from 'xi-core/comments/actions';
import { transformAvatarUrl } from 'xi-core/utils/cloudinary';
import { pushOverlayQueue } from 'xi-core/overlays/actions';
import { browserIsIOSSafari } from 'xi-core/utils/browser';
import ScrollLock from '../common/ScrollLock';
import FixedToolbar from '../common/FixedToolbar';
import Cross from '../common/icons/Cross';
import BackArrow from '../common/icons/BackArrow';
import GoButton from '../common/icons/GoButton';
import { UnstyledButtonLink } from '../common/buttons';
import Avatar from '../common/Avatar';
import CloseReplyTo from '../common/icons/CloseReplyTo';
import ExpandClickableArea from '../common/ExpandClickableArea';
import { SIDE_MARGIN_PX, CoreDevices } from '../common/dimensions';
import { FontFamily, Input } from '../common/typography';
import { getTargetDevice } from '../state/app/selectors';
import CommentBlock from './CommentBlock';
import abbreviateNumber from 'xi-core/content/abbreviateNumber';

const Container = styled.div`
  position: relative;
  color: ${Grey85};
  background: white;
  ${({ isSmallDevice }) => (isSmallDevice ? 'padding-top: 52px;' : 'padding-top: 72px;')};
  ${({ isSmallDevice }) =>
    isSmallDevice ? 'height: calc(100% - 52px);' : 'height: calc(100% - 72px);'};
`;

const CommentsWrapper = styled.div`
  // padding-bottom: 110px;
  min-height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  ${({ isSmallDevice, sideMargin }) =>
    isSmallDevice ? 'height: calc(100% - 132px);' : 'height: calc(100% - 172px);'};
`;

const CommentContainer = styled.div`
  display: flex;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-top: 1px solid #ccc;
  padding: 20px 10px 0px 20px;
`;

const StyledFixedToolbar = styled(FixedToolbar)`
  background: ${Grey5};
  color: #000;
`;

const StyledTextArea = styled.textarea`
  border: none;
  background-color: #fff;
  width: calc(100% - 90px);
  margin-top: 8px;
  padding-right: 40px;
  outline: none;
  color: ${Grey50};
  ${FontFamily.regular};
  ${Input};
  appearance: none;
  border-radius: 0;
`;

const BlockedCommenting = styled(StyledTextArea.withComponent('div'))`
  height: 46px;
  span {
    line-height: 46px;
  }
`;

const ReplyingToArea = styled.div`
  position: absolute;
  top: 0px;
  left: 85px;
  height: 20px;
  line-height: 20px;
  font-weight: bold;
  background-color: #eee;
  ${FontFamily.bold};
  text-transform: uppercase;
  display: flex;

  @media ${CoreDevices.small}, ${CoreDevices.tiny} {
    max-width: 80%; /* to keep extra large names in the container */
    left: 70px;
  }
`;

const ReplyingToAreaText = styled.div`
  margin-left: 5px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media ${CoreDevices.small}, ${CoreDevices.tiny} {
    width: 88%; /* to keep extra large names in the container */
  }
`;

const CloseReplyingTo = styled(UnstyledButtonLink)`
  margin-left: 10px;
  padding-right: 5px;
  margin-top: -4px;
`;

const GoButtonHolder = styled(UnstyledButtonLink)`
  display: ${props => (props.show ? 'flex' : 'none')};
  position: absolute;
  right: 10px;
  bottom: 20px;
  font-size: 10px;
  color: ${Grey50};
  z-index: 1; /* fixes Safari rendering on iPad */
`;

const SignInCTA = styled(UnstyledButtonLink)`
  color: ${Grey50};
  ${FontFamily.regular};
  width: 100%;
  ${Input};
  padding-bottom: 14px;
  padding-left: 4px;
  ${({ isAuthenticated }) =>
    isAuthenticated ? 'text-align: left;' : 'text-align: center;padding-left:0px;'}
`;

const StyledBackButtonContainer = styled(ExpandClickableArea)`
  position: absolute;
  left: 20px;
`;

const StyledCloseButtonContainer = styled(ExpandClickableArea)`
  position: absolute;
  right: 20px;
`;

const StyledButtonLink = styled(UnstyledButtonLink)`
  position: relative;
  top: 2px;
`;

class Comments extends React.Component {
  state = {
    newComment: '',
    isTextAreaFocused: false,
  };
  currentContentId = null;
  textAreaRef = React.createRef();

  constructor(props) {
    super(props);
    this.clearComments();
  }

  componentDidMount() {
    this.clearComments();

    const { history } = this.props;
    const focusTextArea = get('location.state.focusTextArea', history);

    /* Because safari messes with the fixed positioned elements 
    it causes text area to not appear in view port , until there's
    a better fix  / solution for this we will not open the keyboard 
    in iOS safari if requested from showreel */
    if (focusTextArea && !browserIsIOSSafari) {
      this.focusTextArea();
    }
  }

  componentDidUpdate() {
    const { commentError, clearCommentError, intl } = this.props;
    if (commentError) {
      const messages = getErrorMessages(intl);
      clearCommentError();
      NotificationManager.error(messages[ERRORS.ERROR], messages[commentError], 5000);
    }
  }

  clearComments() {
    const { clearContentComments, contentId } = this.props;
    if (this.currentContentId !== contentId) {
      clearContentComments(contentId);
      this.currentContentId = contentId;
    }
  }

  focusTextArea = () => {
    this.textAreaRef.current && this.textAreaRef.current.focus();
  };

  sendTheComment = () => {
    const { contentId, replyingTo, onReplyComment, addComment } = this.props;
    const { newComment } = this.state;

    if (newComment.trim().length) {
      addComment(contentId, newComment, replyingTo);
      this.setState({ newComment: '' });
      onReplyComment();
    }
  };

  handleKeyUp = event => {
    if (event.keyCode === 13) {
      this.sendTheComment();
    }
  };

  handleOnChange = event => {
    this.setState({ newComment: event.target.value });
  };

  onTextAreaFocus = () => {
    this.setState({ isTextAreaFocused: true });
  };

  onTextAreaBlur = () => {
    if (this.state.newComment.length === 0) {
      this.setState({ isTextAreaFocused: false });
    }
  };

  getTextArea = placeholder => (
    <StyledTextArea
      innerRef={this.textAreaRef}
      placeholder={placeholder}
      value={this.state.newComment}
      onKeyUp={this.handleKeyUp}
      onChange={this.handleOnChange}
      data-test-id="add-comment-input"
      onFocus={this.onTextAreaFocus}
      onBlur={this.onTextAreaBlur}
    />
  );

  handleCancelReplyTo = e => {
    e.preventDefault();

    const { onReplyComment } = this.props;
    const { newComment } = this.state;

    onReplyComment();

    if (newComment.length > 0) {
      this.focusTextArea();
    }
  };

  render() {
    const {
      contentId,
      replyingTo,
      isAuthenticated,
      closeTheComments,
      history,
      targetDevice,
      pushOverlayQueue,
      hasCommentingBlocked,
      contentItem,
      memberAvatar,
      memberInitials,
    } = this.props;

    const isSmallDevice = targetDevice === 'small' || targetDevice === 'tiny';
    const sideMargin = SIDE_MARGIN_PX[targetDevice];
    const isLargeDevice = targetDevice === 'large';

    let numComments = 0;
    if (contentItem) {
      numComments = contentItem.comments || 0;
    }

    numComments = 20000000;

    return (
      <Container isSmallDevice={isSmallDevice}>
        <NotificationContainer />
        <StyledFixedToolbar
          position="absolute"
          leftButton={
            !isLargeDevice && (
              <StyledBackButtonContainer>
                <StyledButtonLink onClick={() => closeTheComments(history)}>
                  <BackArrow style={{ width: 17, height: 13 }} />
                </StyledButtonLink>
              </StyledBackButtonContainer>
            )
          }
          title={
            <FormattedMessage
              id="comments.title"
              defaultMessage="{numComments} COMMENTS"
              values={{ numComments: abbreviateNumber(numComments) }}
            />
          }
          rightButton={
            isLargeDevice && (
              <StyledCloseButtonContainer>
                <StyledButtonLink onClick={() => closeTheComments(history)}>
                  <Cross style={{ width: 17, height: 13 }} />
                </StyledButtonLink>
              </StyledCloseButtonContainer>
            )
          }
        />
        <ScrollLock active={targetDevice === 'large'}>
          {(scrollLockRef, hasReachedEnd) => (
            <CommentsWrapper
              innerRef={scrollLockRef}
              replyingTo={replyingTo}
              isSmallDevice={isSmallDevice}
              sideMargin={sideMargin}
            >
              <CommentBlock
                responseAlias="comments"
                requestIdAlias="contentId"
                contentId={contentId}
                requestAction={fetchCommentsForContent}
                responseSelector={getCommentsByContentId}
                itemsPerPage={15}
                parentId={0}
                focusTextArea={this.focusTextArea}
                hasReachedEnd={hasReachedEnd}
                loadType={null}
              />
            </CommentsWrapper>
          )}
        </ScrollLock>
        <CommentContainer>
          {isAuthenticated ? (
            hasCommentingBlocked ? (
              <BlockedCommenting>
                <FormattedMessage
                  id="comment.commentingBlocked"
                  defaultMessage="You have been blocked from commenting"
                />
              </BlockedCommenting>
            ) : (
              <React.Fragment>
                <Avatar src={memberAvatar} initials={memberInitials} />
                <GoButtonHolder
                  onClick={e => {
                    e.preventDefault();
                    this.sendTheComment();
                  }}
                  data-test-id="send-comment"
                  show={this.state.isTextAreaFocused}
                >
                  <GoButton />
                </GoButtonHolder>
                {replyingTo ? (
                  <ReplyingToArea>
                    <ReplyingToAreaText>@{replyingTo.replyingTo}</ReplyingToAreaText>
                    <CloseReplyingTo
                      onClick={this.handleCancelReplyTo}
                      data-test-id="cancel-comment-reply"
                    >
                      <CloseReplyTo />
                    </CloseReplyingTo>
                  </ReplyingToArea>
                ) : null}
                <FormattedMessage id="comments.add_a_comment" defaultMessage="Add a comment">
                  {placeholder => this.getTextArea(placeholder)}
                </FormattedMessage>
              </React.Fragment>
            )
          ) : (
            <SignInCTA
              onClick={e => {
                pushOverlayQueue({ type: 'signup' });
                pushOverlayQueue({ type: 'comments', contentId });
                closeTheComments(history);
              }}
              isAuthenticated={isAuthenticated}
              data-test-id="sign-in-to-comment"
            >
              <FormattedMessage id="comments.add_a_comment" defaultMessage="Add a comment" />
            </SignInCTA>
          )}
        </CommentContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state, { contentId }) => {
  return {
    replyingTo: getReplyingTo(state),
    isAuthenticated: isAuthenticated(state),
    targetDevice: getTargetDevice(state),
    commentError: getCommentError(state),
    hasCommentingBlocked: hasCommentingBlocked(state),
    contentItem: getContentItemById(state)(contentId),
    memberAvatar: transformAvatarUrl(getAvatar(state)),
    memberInitials: getInitials(state),
  };
};

const mapDispatchToProps = dispatch => ({
  addComment: (contentId, newComment, replyingTo) =>
    dispatch(addComment(contentId, newComment, replyingTo)),
  onReplyComment: () => dispatch(onReplyComment()),
  clearContentComments: contentId => dispatch(clearContentComments(contentId)),
  closeTheComments: history => dispatch(closeComments(history)),
  clearCommentError: () => dispatch(clearCommentError()),
  pushOverlayQueue: data => dispatch(pushOverlayQueue(data)),
});

export default compose(
  injectIntl,
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Comments);
