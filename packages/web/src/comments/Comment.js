import React from 'react';
import styled from 'styled-components';
import { withProps } from 'recompose';
import Swipeout from 'rc-swipeout';
import { withRouter } from 'react-router-dom';
import 'rc-swipeout/assets/index.css';
import { compose, head, get } from 'lodash/fp';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import {
  commentSpotlightInteraction,
  commentsPageInteraction,
  commentsDeepLinkInteraction,
} from 'xi-core/comments/actions';
import { Grey20, Grey50, Grey85 } from 'xi-core/colours';
import { showAuthWizard } from 'xi-core/signup/actions';
import {
  getImportantRepliesByContentIdAndCommentId,
  getPinnedComment,
} from 'xi-core/comments/selectors';
import {
  resetReplies,
  setLikeStatus,
  deleteComment,
  reportComment,
  closeComments,
  onReplyComment,
  fetchAllRepliesToComment,
  fetchRepliesAfterReplyToComment,
  fetchRepliesBeforeReplyToComment,
  fetchRepliesInBetweenTwoRepliesToComment,
} from 'xi-core/comments/actions';
import {
  REMOVED_BY,
  PLACEHOLDERS,
  REPLIES_LOAD_TYPE,
  getRepliesToParentComment,
  getRepliesAfterReplyToComment,
  getRepliesBeforeReplyToComment,
} from 'xi-core/comments/selectors';
import { getExternalLink } from 'xi-core/config/selectors';
import { isAuthenticated } from 'xi-core/member/selectors';
import abbreviateNumber from 'xi-core/content/abbreviateNumber';
import { contentDetailPageInteraction } from 'xi-core/content/actions';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import { pushOverlayQueue } from 'xi-core/overlays/actions';
import { PinnedCommentBackgroundColor } from 'xi-core/colours';
import { openCommentReportConfirmationSnackBar } from 'xi-core/snackBar/actions';
import Avatar from '../common/Avatar';
import { InteractionIcon } from '../content/components/ContentInteractionFooter';
import Like from '../common/icons/Like';
import Report from '../common/icons/Report';
import Delete from '../common/icons/Delete';
import { UnstyledButtonLink } from '../common/buttons';
import { CoreDevices } from '../common/dimensions';
import HowLongAgo from '../common/HowLongAgo';
import { FontFamily } from '../common/typography';
import ImportantReplies from './ImportantReplies';
import CommentBlock from './CommentBlock';

const isMobileBrowser = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

const NON_BREAKING_SPACE_CHARACTER = '\u00A0';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
  position: relative;
  .rc-swipeout-actions {
    padding: 1px;
  }
`;

const AvatarFade = styled(Avatar)`
  position: absolute;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  padding: 5px 20px 5px;
  transition: background-color 1s ease;
  ${({ pinnedComment }) =>
    pinnedComment
      ? `background-color:${PinnedCommentBackgroundColor};`
      : 'background-color: rgba(255, 255, 255, 1);'}

  &.noHighlight {
    background-color: rgba(255, 255, 255, 1);
  }

  padding-left: ${({ isTopLevelComment }) => (isTopLevelComment ? '20px' : '94px')};
  @media ${CoreDevices.small}, ${CoreDevices.tiny} {
    padding-left: ${({ isTopLevelComment }) => (isTopLevelComment ? '20px' : '77px')};
  }
`;

const CommentContainer = styled.div`
  flex: 1;
  padding-left: 10px;
  overflow: hidden;
`;

const CommentDisplayName = styled.div`
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  margin-bottom: 5px;
  ${FontFamily.bold};
  text-transform: uppercase;
`;

const StyledCommentText = styled.div`
  &&&& {
    color: ${Grey85};
    line-height: 16px;
    font-size: 12px;
  }
`;

const CommentFooter = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const CommentFooterItem = styled.div`
  font-size: 12px;
  color: #a3a3a3;
  ${FontFamily.bold};
  text-transform: uppercase;
  margin-right: ${props => (props.seeTranslation ? '0px' : '18px')};

  @media ${CoreDevices.tiny} {
    font-size: 10px;
    margin-right: ${props => (props.seeTranslation ? '0px' : '9px')};
  }
`;

const CommentFooterItemTime = styled(CommentFooterItem)`
  margin-left: auto;
  margin-right: 0;
  transition: color 1s;

  &.active {
    color: #7c52f6;
  }
`;

const CommentInteractionContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 0px;
  display: flex;
  flex-direction: row;
`;

export const CommentChildren = styled.div``;

export const RepliesInfoContainer = styled.div`
  text-align: left;
  padding-left: ${({ isTopLevelComment }) => (isTopLevelComment ? '94px' : '169px')};
  padding-bottom: 20px;
  @media ${CoreDevices.small}, ${CoreDevices.tiny} {
    padding-left: ${({ isTopLevelComment }) => (isTopLevelComment ? '77px' : '134px')};
  }
`;

export const RepliesInfo = styled(UnstyledButtonLink)`
  font-size: 12px;
  ${FontFamily.bold};
  color: #a3a3a3;
  text-transform: uppercase;
`;

const StyledHowLongAgo = styled(HowLongAgo)`
  margin-right: 8px;
  margin-top: 2px;
  font-size: 10px;
  color: ${Grey50};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    margin-top: 4px;
  }
`;

const SwipeIconWrapper = styled.div`
  background-color: #ff2f4b;
  color: #fff;
  svg {
    width: 60px;
  }
`;

const ReportDeleteDesktopHolder = styled.div`
  display: ${isMobileBrowser ? 'none' : 'block'};
  bottom: 15px;
  right: 15px;
  @media ${CoreDevices.large} {
    display: block;
    bottom: 0px;
    right: 20px;
  }
  position: absolute;
  color: #000;
  svg {
    cursor: pointer;
  }
`;

const DeleteWrapper = styled.div`
  cursor: pointer;
`;

const TranslateArea = styled.div`
  margin-left: auto;
  @media ${CoreDevices.large} {
    margin-right: 25px;
  }
`;

const DisplayNameWrapper = styled.div`
  line-height: 17px;
  margin-bottom: 10px;
  position: relative;
  max-width: 75%; /* This is to make sure that interaction icon is clickable */
`;

const DisplayName = styled.span`
  font-weight: bold;
  ${props =>
    props.removed
      ? `
    color: ${Grey50};
    font-weight: normal;`
      : `
    color: ${Grey85};
    font-weight: bold`};
`;

const GreyedText = styled.div`
  color: ${Grey20};

  .guideline-link {
    text-decoration: underline;
  }
`;

const StyledLikeInteractionIcon = styled(InteractionIcon)`
  @media ${CoreDevices.medium} {
    margin-right: 10px;
  }

  @media ${CoreDevices.large} {
    margin-right: 20px;
  }
`;

class AnimatedText extends React.Component {
  state;

  async Animate(initText, nextText) {
    const numReplacement = Math.min(initText.length || nextText.length);
    const iterations = Math.max(Math.min(Math.floor(nextText.length / 2), 6), 16);
    const numCharactersPerIteration = Math.floor(numReplacement / iterations);
    let currentText = initText;
    const sleep = () => new Promise(accept => setTimeout(accept, 400 / iterations));
    for (let i = 0; i < iterations; i++) {
      for (let j = 0; j < numCharactersPerIteration; j++) {
        const characterPosition = i + numCharactersPerIteration * j;
        const newCharacter = nextText[characterPosition] || ' ';
        currentText =
          currentText.slice(0, characterPosition) +
          newCharacter +
          currentText.slice(characterPosition + 1);
      }
      this.setState({ animatedText: currentText });
      await sleep();
    }
    this.setState({ animatedText: nextText });
  }

  constructor(props) {
    super(props);
    this.state = { animatedText: props.oldText };
  }

  componentDidMount() {
    const { oldText, newText } = this.props;
    if (oldText && oldText !== newText) {
      this.Animate(oldText, newText);
    } else {
      this.setState({ animatedText: newText });
    }
  }
  render() {
    return <React.Fragment>{this.props.children(this.state.animatedText)}</React.Fragment>;
  }
}

const CommentContent = ({
  comment,
  guidelinesLink,
  showTranslation,
  commentBeingReplaced = comment,
}) =>
  comment.removed ? (
    comment.removedBy === REMOVED_BY.MODERATOR ? (
      <GreyedText>
        <FormattedHTMLMessage
          id="comments.removedByModerator"
          defaultMessage={
            'This comment was removed by our moderator as it does not abide by our <a class="guideline-link" href="{guidelinesLink}">Community Guidelines</a>.'
          }
          values={{ guidelinesLink }}
        />
      </GreyedText>
    ) : (
      <GreyedText>
        <FormattedMessage
          id="comments.removedByMember"
          defaultMessage="This comment was removed by member."
        />
      </GreyedText>
    )
  ) : (
    <StyledCommentText>
      {showTranslation ? (
        comment.translation
      ) : (
        <AnimatedText oldText={commentBeingReplaced.comment} newText={comment.comment}>
          {animatedText => <React.Fragment>{animatedText}</React.Fragment>}
        </AnimatedText>
      )}
    </StyledCommentText>
  );

class Comment extends React.Component {
  state = {
    showTranslation: false,
    showChildren: false,
    removeLastAvatar: false,
  };

  componentDidMount = () => {
    const { pinnedCommentId, comment, deepLinkInteraction } = this.props;
    if (this.isPinnedComment(pinnedCommentId, comment)) {
      setTimeout(() => {
        this.setState({ contentWrapperClassName: 'noHighlight' });
      }, 3000);
      deepLinkInteraction(PropertyKeys.COMMENTS_PAGE.GREEN_HIGHLIGHT_PRESENT);
    }
    this.setState({ removeLastAvatar: true });
  };

  showAuthOverlay = contentId => {
    const {
      pushOverlayQueue,
      closeTheComments,
      history,
      discussionHighlights,
      showAuthWizard,
    } = this.props;

    if (discussionHighlights) {
      showAuthWizard({ history });
    } else {
      pushOverlayQueue({ type: 'signup' });
      pushOverlayQueue({ type: 'comments', contentId });
      closeTheComments(history);
    }
  };

  handleReportPress = () => {
    const { reportComment, comment, contentId } = this.props;

    reportComment(comment, contentId);
    this.props.openCommentReportConfirmationSnackBar();
  };

  handleRenderViewRepliesCtaClick = (e, loadType) => {
    e.preventDefault();
    this.setState({ showChildren: true });

    const { pageInteraction } = this.props;
    let eventName = '';

    switch (loadType) {
      case REPLIES_LOAD_TYPE.PREVIOUS_REPLIES:
        eventName = PropertyKeys.COMMENTS_PAGE.VIEW_PREVIOUS_REPLIES_CLICKED;
        break;
      case REPLIES_LOAD_TYPE.MORE_REPLIES:
        eventName = PropertyKeys.COMMENTS_PAGE.VIEW_MORE_REPLIES_CLICKED;
        break;
      case REPLIES_LOAD_TYPE.ALL_REPLIES:
        eventName = PropertyKeys.COMMENTS_PAGE.VIEW_REPLIES_CLICKED;
        break;
      default:
        break;
    }

    pageInteraction(eventName);
  };

  renderViewRepliesCta = loadType => {
    let dataTestId = '';
    if (loadType === REPLIES_LOAD_TYPE.ALL_REPLIES) {
      dataTestId = 'view-all-replies';
    } else if (loadType === REPLIES_LOAD_TYPE.MORE_REPLIES) {
      dataTestId = 'view-more-replies';
    } else if (loadType === REPLIES_LOAD_TYPE.PREVIOUS_REPLIES) {
      dataTestId = 'view-previous-replies';
    }

    return (
      <RepliesInfo
        data-test-id={dataTestId}
        onClick={e => this.handleRenderViewRepliesCtaClick(e, loadType)}
      >
        {'- - - - - - - '}
        {loadType === REPLIES_LOAD_TYPE.PREVIOUS_REPLIES && (
          <FormattedMessage
            id="comments.view_previous_replies"
            defaultMessage="View previous replies"
          />
        )}
        {loadType === REPLIES_LOAD_TYPE.MORE_REPLIES && (
          <FormattedMessage id="comments.view_more_replies" defaultMessage="View more replies" />
        )}
        {loadType === REPLIES_LOAD_TYPE.ALL_REPLIES && (
          <FormattedMessage id="comments.view_all_replies" defaultMessage="View all replies" />
        )}
      </RepliesInfo>
    );
  };

  renderCommentLikesAndReplyButton = () => {
    const {
      comment,
      isAuthenticated,
      contentId,
      focusTextArea,
      onReplyComment,
      onLikesClick,
      spotLightInteraction,
      discussionHighlights,
    } = this.props;

    console.log(this.props.time, this.props.comment.time);

    return (
      <React.Fragment>
        <CommentFooterItem
          style={{ cursor: onLikesClick && 'pointer' }}
          data-test-id={discussionHighlights ? 'number-likes-show-reel' : 'number-likes'}
          onClick={e => {
            e.preventDefault();
            if (discussionHighlights) {
              onLikesClick && onLikesClick();
              spotLightInteraction(PropertyKeys.COMMENT_SPOTLIGHT.NUMBER_OF_LIKES_CLICKED);
            }
          }}
        >
          <FormattedMessage
            id="comments.likes"
            defaultMessage="{numberOfLikes} {numberOfLikes, plural, one {LIKE} other {LIKES}}"
            values={{ numberOfLikes: comment.numberOfLikes }}
          />
        </CommentFooterItem>
        <CommentFooterItem
          style={{ cursor: 'pointer' }}
          data-test-id={discussionHighlights ? 'reply-show-reel' : 'reply'}
          onClick={e => {
            if (isAuthenticated) {
              e.preventDefault();
              onReplyComment(contentId, comment.externalId, comment.displayName);
              focusTextArea();
            } else {
              this.showAuthOverlay(contentId);
            }
          }}
        >
          <FormattedMessage id="comments.reply" defaultMessage="REPLY" />
        </CommentFooterItem>
        <CommentFooterItemTime
          className={
            this.props.time > this.props.comment.time &&
            this.props.time - 1000 < this.props.comment.time
              ? 'active'
              : null
          }
        >
          {this.millisToMinutesAndSeconds(this.props.comment.time)}
        </CommentFooterItemTime>
      </React.Fragment>
    );
  };

  handleRenderCommentTranslateButtonClick = e => {
    e.preventDefault();

    const { spotLightInteraction } = this.props;
    const { showTranslation } = this.state;

    this.setState(state => ({
      showTranslation: !state.showTranslation,
    }));

    spotLightInteraction(
      showTranslation
        ? PropertyKeys.COMMENT_SPOTLIGHT.SEE_ORIGINAL_CLICKED
        : PropertyKeys.COMMENT_SPOTLIGHT.SEE_TRANSLATION_CLICKED
    );
  };

  renderCommentTranslateButton = () => {
    const { showTranslation } = this.state;
    return (
      <TranslateArea onClick={e => this.handleRenderCommentTranslateButtonClick(e)}>
        <CommentFooterItem seeTranslation={true}>
          {showTranslation ? (
            <FormattedMessage id="comments.see_original" defaultMessage="See original" />
          ) : (
            <FormattedMessage id="comments.see_translation" defaultMessage="See translation" />
          )}
        </CommentFooterItem>
      </TranslateArea>
    );
  };

  isTopLevelComment = () => !this.props.comment.parent;

  hasImportantReplies = () => this.props.importantReplies.length > 0;

  getCommentBlockLoadType = isImportantReply =>
    this.isTopLevelComment() && this.hasImportantReplies()
      ? REPLIES_LOAD_TYPE.PREVIOUS_REPLIES
      : !this.isTopLevelComment() && isImportantReply
      ? REPLIES_LOAD_TYPE.MORE_REPLIES
      : REPLIES_LOAD_TYPE.ALL_REPLIES;

  getCommentBlockReplyId = (comment, importantReplies) =>
    this.isTopLevelComment() && this.hasImportantReplies()
      ? head(importantReplies).externalId
      : comment.externalId;

  getCommentBlockRequestIdAlias = () => [
    'contentId',
    'parentId',
    'replyId',
    'loadType',
    'nextImportantReplyId',
  ];

  getCommentBlockRequestAction = nextImportantReplyId =>
    this.isTopLevelComment()
      ? this.hasImportantReplies()
        ? fetchRepliesBeforeReplyToComment
        : fetchAllRepliesToComment
      : !nextImportantReplyId
      ? fetchRepliesAfterReplyToComment
      : fetchRepliesInBetweenTwoRepliesToComment;

  getCommentBlockResponseSelector = () =>
    this.isTopLevelComment()
      ? this.hasImportantReplies()
        ? getRepliesBeforeReplyToComment
        : getRepliesToParentComment
      : getRepliesAfterReplyToComment;

  isPinnedComment = (pinnedCommentId, comment) => pinnedCommentId === comment.externalId;

  millisToMinutesAndSeconds = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  render() {
    const {
      comment,
      commentBeingReplaced = comment,
      contentId,
      setLikeStatus,
      deleteComment,
      isAuthenticated,
      focusTextArea,
      guidelinesLink,
      pinnedCommentId,
      importantReplies,
      isImportantReply = false,
      nextImportantReplyId = null,
      discussionHighlights = false,
      contentDetailPageInteraction,
    } = this.props;

    const { showTranslation, showChildren } = this.state;

    comment.numberOfLikes = abbreviateNumber(comment.numberOfLikes, 2);

    const openCloseSwipeout = e => {
      e.preventDefault();
      e.stopPropagation();
      const swipe = this.refs.swipeout;
      swipe.open(-swipe.btnsRightWidth, false, true);
      if (!swipe.coverClickHandler) {
        swipe.cover.onclick = e => {
          swipe.close();
        };
        swipe.coverClickHandler = true;
      }
    };

    return (
      <Wrapper pinned={!discussionHighlights && this.isPinnedComment(pinnedCommentId, comment)}>
        <Swipeout
          ref="swipeout"
          autoClose={true}
          disabled={comment.removed || (!comment.owner && comment.reportCleared)}
          right={[
            {
              text: (
                <SwipeIconWrapper>
                  {comment.owner ? (
                    <Delete width="24" height="34" data-test-id="delete-comment" />
                  ) : (
                    <Report width="40" height="34" data-test-id="report-comment" />
                  )}
                </SwipeIconWrapper>
              ),
              onPress: () =>
                comment.owner ? deleteComment(comment, contentId) : this.handleReportPress(),
              style: { backgroundColor: '#ff2f4b', color: 'white', cursor: 'pointer' },
            },
          ]}
        >
          <ContentWrapper
            pinnedComment={!discussionHighlights && this.isPinnedComment(pinnedCommentId, comment)}
            className={this.state.contentWrapperClassName}
            isTopLevelComment={this.isTopLevelComment()}
          >
            {/* {!comment.removed && (
              <ReportDeleteDesktopHolder>
                {comment.owner ? (
                  <DeleteWrapper
                    onClick={openCloseSwipeout}
                    data-test-id="open-close-comment-swipe"
                  >
                    <Delete width="14" height="34" />
                  </DeleteWrapper>
                ) : (
                  !comment.reportCleared && (
                    <DeleteWrapper
                      onClick={e =>
                        isAuthenticated ? openCloseSwipeout(e) : this.showAuthOverlay(contentId)
                      }
                      data-test-id="open-close-comment-swipe"
                    >
                      <Report width="14" height="34" />
                    </DeleteWrapper>
                  )
                )}
              </ReportDeleteDesktopHolder>
            )} */}
            <CommentInteractionContainer>
              <StyledHowLongAgo timestamp={comment.postedDateTime} />
              <StyledLikeInteractionIcon
                onClick={e => {
                  e.preventDefault();
                  isAuthenticated
                    ? setLikeStatus(
                        comment.likedByMe,
                        contentId,
                        comment.externalId,
                        discussionHighlights
                      )
                    : this.showAuthOverlay(contentId);
                }}
                testId="like-comment"
                icon={<Like filled={comment.likedByMe} />}
                style={{}}
              />
            </CommentInteractionContainer>

            <Avatar
              src={comment.avatarUrl}
              initials={comment.initials}
              displayName={comment.displayName}
              starId={comment.starId}
              star={comment.star}
              vip={comment.vip}
              showVerifiedTick={true}
              owner={comment.owner}
              onClick={(e, playerName) =>
                !!comment.starId &&
                contentDetailPageInteraction({
                  [PropertyKeys.CONTENT_DETAIL_INTERACTIONS.PLAYER_AVATAR_CLICKED]: true,
                  [PropertyKeys.CONTENT_DETAIL_INTERACTIONS.PLAYER_NAME]: playerName,
                  [PropertyKeys.CONTENT_DETAIL_INTERACTIONS.PLAYER_CLICKED_IN_COMMENTS]: true,
                })
              }
            />

            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear={false}
              transitionLeave={true}
              style={{ position: 'absolute' }}
            >
              {this.state.removeLastAvatar ? null : (
                <Avatar
                  key={`${commentBeingReplaced.starId}-fade`}
                  src={commentBeingReplaced.avatarUrl}
                  initials={commentBeingReplaced.initials}
                  displayName={commentBeingReplaced.displayName}
                  starId={commentBeingReplaced.starId}
                  star={commentBeingReplaced.star}
                  vip={commentBeingReplaced.vip}
                  showVerifiedTick={true}
                  owner={commentBeingReplaced.owner}
                  onClick={(e, playerName) =>
                    !!commentBeingReplaced.starId &&
                    contentDetailPageInteraction({
                      [PropertyKeys.CONTENT_DETAIL_INTERACTIONS.PLAYER_AVATAR_CLICKED]: true,
                      [PropertyKeys.CONTENT_DETAIL_INTERACTIONS.PLAYER_NAME]: playerName,
                      [PropertyKeys.CONTENT_DETAIL_INTERACTIONS.PLAYER_CLICKED_IN_COMMENTS]: true,
                    })
                  }
                />
              )}
            </ReactCSSTransitionGroup>

            <CommentContainer>
              <CommentDisplayName>
                <DisplayNameWrapper>
                  <DisplayName removed={comment.removed}>
                    <AnimatedText
                      oldText={
                        `${commentBeingReplaced.forename} ${commentBeingReplaced.surname}` ||
                        NON_BREAKING_SPACE_CHARACTER
                      }
                      newText={
                        `${comment.forename} ${comment.surname}` || NON_BREAKING_SPACE_CHARACTER
                      }
                    >
                      {animatedText => <React.Fragment>{animatedText}</React.Fragment>}
                    </AnimatedText>
                  </DisplayName>
                </DisplayNameWrapper>
              </CommentDisplayName>

              <CommentContent
                comment={comment}
                guidelinesLink={guidelinesLink}
                showTranslation={showTranslation}
                commentBeingReplaced={this.props.commentBeingReplaced}
              />

              <CommentFooter>
                {!comment.removed && this.renderCommentLikesAndReplyButton()}
                {comment.translation && this.renderCommentTranslateButton()}
              </CommentFooter>
            </CommentContainer>
          </ContentWrapper>
        </Swipeout>

        {comment.expandAfter && !showChildren && !discussionHighlights ? (
          <RepliesInfoContainer isTopLevelComment={this.isTopLevelComment()}>
            {this.isTopLevelComment() &&
              !this.hasImportantReplies() &&
              this.renderViewRepliesCta(REPLIES_LOAD_TYPE.ALL_REPLIES)}

            {this.isTopLevelComment() &&
              this.hasImportantReplies() &&
              this.renderViewRepliesCta(REPLIES_LOAD_TYPE.PREVIOUS_REPLIES)}

            {isImportantReply && this.renderViewRepliesCta(REPLIES_LOAD_TYPE.MORE_REPLIES)}
          </RepliesInfoContainer>
        ) : null}

        {showChildren ? (
          <CommentChildren isTopLevelComment={this.isTopLevelComment()}>
            <CommentBlock
              isTopLevelComment={this.isTopLevelComment()}
              itemsPerPage={3}
              contentId={contentId}
              responseAlias="comments"
              focusTextArea={focusTextArea}
              requestIdAlias={this.getCommentBlockRequestIdAlias()}
              responseSelector={this.getCommentBlockResponseSelector()}
              loadType={this.getCommentBlockLoadType(isImportantReply)}
              replyId={this.getCommentBlockReplyId(comment, importantReplies)}
              requestAction={this.getCommentBlockRequestAction(nextImportantReplyId)}
              parentId={this.isTopLevelComment() ? comment.externalId : comment.parent}
              nextImportantReplyId={
                nextImportantReplyId ? nextImportantReplyId : PLACEHOLDERS.NEXT_REPLY_ID
              }
              time={this.props.time}
            />
          </CommentChildren>
        ) : null}

        {true && (
          <React.Fragment>
            {importantReplies && importantReplies.length > 0 ? (
              <CommentChildren isTopLevelComment={this.isTopLevelComment()}>
                <ImportantReplies
                  importantReplies={importantReplies}
                  contentId={contentId}
                  focusTextArea={focusTextArea}
                  discussionHighlights={discussionHighlights}
                />
              </CommentChildren>
            ) : null}
          </React.Fragment>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, { comment, contentId, discussionHighlights = false, time }) => {
  return {
    isAuthenticated: isAuthenticated(state),
    pinnedCommentId: getPinnedComment(state)(contentId),
    guidelinesLink: getExternalLink('communityGuidelines')(state),
    importantReplies: getImportantRepliesByContentIdAndCommentId(state)(
      comment.externalId,
      contentId,
      discussionHighlights,
      Math.floor(time)
    ),
  };
};

const mapDispatchToProps = dispatch => ({
  resetReplies: () => dispatch(resetReplies()),
  setLikeStatus: (likedByMe, contentId, externalId, discussionHighlights) =>
    dispatch(setLikeStatus(likedByMe, contentId, externalId, discussionHighlights)),
  onReplyComment: (contentId, externalId, displayName) =>
    dispatch(onReplyComment(contentId, externalId, displayName)),
  deleteComment: (comment, contentId) => dispatch(deleteComment(comment, contentId)),
  reportComment: (comment, contentId) => dispatch(reportComment(comment, contentId)),
  pushOverlayQueue: data => dispatch(pushOverlayQueue(data)),
  closeTheComments: history => dispatch(closeComments(history)),
  openCommentReportConfirmationSnackBar: () => dispatch(openCommentReportConfirmationSnackBar()),
  spotLightInteraction: action => dispatch(commentSpotlightInteraction(action)),
  pageInteraction: action => dispatch(commentsPageInteraction(action)),
  deepLinkInteraction: action => dispatch(commentsDeepLinkInteraction(action)),
  showAuthWizard: data => dispatch(showAuthWizard(data)),
  contentDetailPageInteraction: data => dispatch(contentDetailPageInteraction(data)),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Comment);
