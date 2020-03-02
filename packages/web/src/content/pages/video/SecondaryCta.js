import React, { Fragment } from 'react';
import { compose } from 'lodash/fp';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { matchPath } from 'react-router';
import { Grey5 } from 'xi-core/colours';
import { openComments, commentSpotlightInteraction } from 'xi-core/comments/actions';
import { contentDetailPageInteraction } from 'xi-core/content/actions';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import { getContentItemById } from 'xi-core/content/selectors';
import { contentTypes } from 'xi-core/content/contentTypes';
import { transformAvatarUrl } from 'xi-core/utils/cloudinary';
import { getAvatar, getInitials, isAuthenticated } from 'xi-core/member/selectors';
import { showAuthWizard } from 'xi-core/signup/actions';
import { FontFamily } from '../../../common/typography';
import { UnstyledButtonLink } from '../../../common/buttons';
import { CoreDevices, HelperDevices } from '../../../common/dimensions';
import { routes } from '../../../App';

const ViewCommentsButtonLink = styled(UnstyledButtonLink)`
  ${FontFamily.bold}
  z-index: 1;
  width: 100%;
  position: relative;
  font-size: 20px;
  padding: 24px;

  @media ${CoreDevices.medium} {
    padding: 20px;
    font-size: 16px;
  }

  @media ${HelperDevices.belowMedium}, ${HelperDevices.belowMediumLandscape} {
    padding: 16px;
    font-size: 14px;
  }
`;
const Divider = styled.div`
  background: ${Grey5};
  height: 1px;
`;

const BoldDivider = styled.div`
  background: ${Grey5};
  height: 4px;
  @media ${CoreDevices.large} {
    height: 8px;
  }
`;

const AddCommentButtonLink = styled(UnstyledButtonLink)`
  z-index: 1;
  position: relative;
  width: 100%;
  font-size: 14px;
  padding: 8px 0 8px 24px;
  text-align: left;
  color: #808080;
  display: flex;
  flex-direction: row;
  @media ${CoreDevices.medium} {
    ${({ isAuthenticated }) => (!isAuthenticated ? 'padding-left:0px;' : 'padding-left:42px;')}
  }
  @media ${CoreDevices.large} {
    ${({ isAuthenticated }) => (!isAuthenticated ? 'padding-left:0px;' : 'padding-left:86px;')}
  }
  ${({ isAuthenticated }) =>
    !isAuthenticated ? 'justify-content: center; align-items:center;padding-left:0px' : ''}
`;

const MemberAvatar = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: #b2b2b2;
  background-size: cover;
  background-position: center;
`;

const AddCommentText = styled.div`
  line-height: 30px;
  ${({ isAuthenticated }) => (!isAuthenticated ? 'margin-left:0px;' : 'margin-left:20px;')}
`;

const Initials = styled.h1`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: #b2b2b2;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 1.9;
`;

const SecondaryCta = ({
  contentId,
  contentItem,
  history,
  openContentComments,
  avatar,
  initials,
  isAuthenticated,
  showAuthWizard,
  spotLightInteraction,
  contentDetailPageInteraction,
}) => {
  const handleCommentsClick = ({ focusTextArea = false }) => {
    switch (contentItem.contentTypeName) {
      case contentTypes.VIDEO:
      case contentTypes.ARTICLE:
        if (!matchPath(history.location.pathname, routes.content)) {
          history.push(routes.content.path.replace(':contentId', contentId), {
            openComments: true,
          });
          return;
        }
        break;
      default:
        break;
    }
    openContentComments(contentId, focusTextArea);
  };

  let numComments = 0;
  if (contentItem) {
    numComments = contentItem.comments || 0;
  }

  return (
    <Fragment>
      <Divider />
      <AddCommentButtonLink
        isAuthenticated={isAuthenticated}
        type="button"
        data-test-id={numComments > 0 ? 'add-a-comment' : 'be-first-to-comment'}
        onClick={() => {
          if (numComments > 0) {
            spotLightInteraction(PropertyKeys.COMMENT_SPOTLIGHT.ADD_A_COMMENT_CLICKED);
          } else {
            contentDetailPageInteraction(
              PropertyKeys.CONTENT_DETAIL_INTERACTIONS.FIRST_TO_COMMENT_CTA
            );
          }

          if (isAuthenticated) {
            handleCommentsClick({ focusTextArea: true });
          } else {
            showAuthWizard();
          }
        }}
      >
        {isAuthenticated ? (
          avatar ? (
            <MemberAvatar
              style={{
                backgroundImage: `url("${avatar}")`,
              }}
            />
          ) : (
            <Initials>{initials}</Initials>
          )
        ) : null}
        <AddCommentText isAuthenticated={isAuthenticated}>
          {numComments === 0 ? (
            <FormattedMessage
              id="comments.be_the_first_to_comment"
              defaultMessage="Be the first to comment"
            />
          ) : (
            <FormattedMessage id="comments.add_a_comment" defaultMessage="Add a comment" />
          )}
        </AddCommentText>
      </AddCommentButtonLink>
      {numComments > 0 ? (
        <Fragment>
          <Divider />
          <ViewCommentsButtonLink
            type="button"
            data-test-id="view-all-comments"
            onClick={() => {
              spotLightInteraction(PropertyKeys.COMMENT_SPOTLIGHT.VIEW_ALL_COMMENTS_CLICKED);
              handleCommentsClick({ focusTextArea: false });
              contentDetailPageInteraction(PropertyKeys.CONTENT_DETAIL_INTERACTIONS.SECONDARY_CTA);
            }}
          >
            <FormattedMessage
              id="unlockedVideoContent.viewAllComments"
              defaultMessage="VIEW ALL {numComments} COMMENTS"
              values={{
                numComments: numComments,
              }}
            />
          </ViewCommentsButtonLink>
        </Fragment>
      ) : null}
      <BoldDivider />
    </Fragment>
  );
};

const mapStateToProps = (state, { contentId }) => ({
  contentItem: getContentItemById(state)(contentId),
  avatar: transformAvatarUrl(getAvatar(state)),
  initials: getInitials(state),
  isAuthenticated: isAuthenticated(state),
});

const mapDispatchToProps = (dispatch, { history }) => ({
  openContentComments: (contentId, focusTextArea) =>
    dispatch(openComments(contentId, history, focusTextArea)),
  showAuthWizard: () => dispatch(showAuthWizard({ history })),
  spotLightInteraction: action => dispatch(commentSpotlightInteraction(action)),
  contentDetailPageInteraction: action =>
    dispatch(
      contentDetailPageInteraction({
        [action]: true,
      })
    ),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SecondaryCta);
