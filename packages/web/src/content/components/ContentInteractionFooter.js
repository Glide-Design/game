import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import { contentTypes } from 'xi-core/content/contentTypes';
import { getContentItemById } from 'xi-core/content/selectors';
import { setLikeStatus, setBookmarkStatus } from 'xi-core/member/actions';
import { isLiked, isBookmarked, isAuthenticated } from 'xi-core/member/selectors';
import { openComments } from 'xi-core/comments/actions';
import abbreviateNumber from 'xi-core/content/abbreviateNumber';
import { showAuthWizard } from 'xi-core/signup/actions';
import { ROW_HEIGHT_PX, CoreDevices } from '../../common/dimensions';
import { UnstyledButtonLink } from '../../common/buttons';
import Like from '../../common/icons/Like';
import Bookmark from '../../common/icons/Bookmark';
import Comment from '../../common/icons/Comment';
import ShareIcon from '../../common/icons/Share';
import ExpandClickableArea from '../../common/ExpandClickableArea';
import ModalButtonController from '../../share/ModalButtonController';
import ShareModal from '../../share/ShareModal';
import { routes } from '../../App';

const ContentInteraction = styled.div`
  display: flex;
  & a {
    color: inherit;
  }
  & button {
    color: inherit;
  }
`;

const ElementWithButton = styled.div`
  margin-right: 20px;
  &.noRightMargin {
    margin-right: unset;
  }

  ${({ rightHandSide }) => (rightHandSide ? 'margin-left: auto;' : '')};

  svg {
    width: 16px;
  }

  ${({ inset }) =>
    !inset
      ? `
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
      margin-right: 40px;
    }
  `
      : ''};
`;

const ElementButton = styled(UnstyledButtonLink)`
  display: flex;
  align-items: center;
  height: ${ROW_HEIGHT_PX * 2}px;
  & > * {
    height: ${ROW_HEIGHT_PX * 2}px;
  }

  ${({ inset }) =>
    !inset
      ? `
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    height: ${ROW_HEIGHT_PX * 3}px;
    & > * {
      height: ${ROW_HEIGHT_PX * 3}px;
    }
  }
  `
      : ''};

  white-space: nowrap;
  cursor: pointer;

  text-align: left;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  outline: 0;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 24px;
  ${({ inset }) =>
    !inset
      ? `
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
      width: 38px;
    }`
      : ''};
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  svg {
    width: 17px;
    height: 17px;
  }
  ${({ inset }) =>
    !inset
      ? `
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
      svg {
        width: 24px;
        height: 24px;
      }
    }`
      : ''};
`;

const Text = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 100%;
  ${({ inset }) =>
    !inset
      ? `
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
        font-size: 18px;
    }`
      : ''};
`;

export const InteractionIcon = ({
  inset,
  text,
  icon,
  onClick,
  label,
  testId,
  rightHandSide,
  className,
  iconComponent = <Icon inset={inset}>{icon}</Icon>,
}) => (
  <ElementWithButton inset={inset} rightHandSide={rightHandSide} className={className}>
    <ExpandClickableArea>
      <ElementButton
        inset={inset}
        onClick={onClick ? onClick : e => false}
        aria-label={label}
        data-test-id={testId}
      >
        {text ? (
          <IconContainer inset={inset}>{iconComponent}</IconContainer>
        ) : (
          <React.Fragment>{iconComponent}</React.Fragment>
        )}
        {text ? <Text inset={inset}>{text}</Text> : null}
      </ElementButton>
    </ExpandClickableArea>
  </ElementWithButton>
);

const DivHackModalButtonCtrlHasBug = styled.div``;

class ContentInteractionFooter extends React.Component {
  handleCommentsClick = () => {
    const { contentId, openContentComments, contentItem, history } = this.props;
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
    openContentComments(contentId);
  };

  render() {
    const {
      className,
      isLiked,
      setLikeStatus,
      inset = false,
      contentId,
      contentItem,
      isBookmarked,
      setBookmarkStatus,
      isAuthenticated,
      showAuthWizard,
      shareClicked,
      intl,
      hideComments,
      hideLikes,
    } = this.props;

    let numComments = 0;
    let numLikes = 0;

    if (contentItem) {
      numComments = contentItem.comments || 20000000;
      numLikes = contentItem.likes || 5700000000;
    }

    numComments = 20000000;
    numLikes = 5700000000;

    return (
      <ContentInteraction className={className} inset={inset}>
        {!hideComments && (
          <InteractionIcon
            inset={inset}
            text={abbreviateNumber(numComments)}
            icon={<Comment />}
            onClick={e => {
              e.preventDefault();
              this.handleCommentsClick();
            }}
            label={
              <FormattedMessage
                id="comments.title"
                defaultMessage="{numComments} COMMENTS"
                values={{ numComments: numComments }}
              />
            }
            testId="open-content-comments"
          />
        )}
        {!hideLikes && (
          <InteractionIcon
            inset={inset}
            text={abbreviateNumber(numLikes)}
            icon={<Like filled={isLiked} />}
            onClick={e => {
              e.preventDefault();
              isAuthenticated ? setLikeStatus(!isLiked) : showAuthWizard();
            }}
            label={
              isLiked
                ? intl.formatMessage({ id: 'accessibility.unlike', defaultMessage: 'Unlike' })
                : intl.formatMessage({ id: 'accessibility.like', defaultMessage: 'Like' })
            }
            testId="like-content"
          />
        )}
        <InteractionIcon
          inset={inset}
          icon={<Bookmark filled={isBookmarked} />}
          onClick={e => {
            e.preventDefault();
            isAuthenticated ? setBookmarkStatus(!isBookmarked) : showAuthWizard();
          }}
          label={
            isBookmarked
              ? intl.formatMessage({ id: 'accessibility.unbookmark', defaultMessage: 'Unbookmark' })
              : intl.formatMessage({ id: 'accessibility.bookmark', defaultMessage: 'Bookmark' })
          }
          testId="bookmark-content"
          rightHandSide
        />
        <DivHackModalButtonCtrlHasBug
          onClick={e => {
            e.preventDefault();
          }}
        >
          <ModalButtonController
            renderModal={modalProps => <ShareModal contentId={contentId} {...modalProps} />}
          >
            {({ onClick }) => (
              <InteractionIcon
                inset={inset}
                icon={<ShareIcon />}
                onClick={e => {
                  e.preventDefault();
                  shareClicked && shareClicked();
                  onClick(e);
                }}
                label={intl.formatMessage({
                  id: 'share.share_link',
                  defaultMessage: 'Share content',
                })}
                testId="share-content"
                className={'noRightMargin'}
              />
            )}
          </ModalButtonController>
        </DivHackModalButtonCtrlHasBug>
      </ContentInteraction>
    );
  }
}

const mapDispatchToProps = (dispatch, { contentId, history }) => ({
  setLikeStatus: isLiked => dispatch(setLikeStatus(contentId, isLiked)),
  setBookmarkStatus: isBookmarked => dispatch(setBookmarkStatus(contentId, isBookmarked)),
  openContentComments: contentId => dispatch(openComments(contentId, history)),
  showAuthWizard: () => dispatch(showAuthWizard({ history })),
});

const mapStateToProps = (state, { contentId }) => {
  return {
    isAuthenticated: isAuthenticated(state),
    isLiked: isLiked(state)(contentId),
    isBookmarked: isBookmarked(state)(contentId),
    contentItem: {
      externalId: 'dybala-my-shirts',
      contentContributors: [
        {
          forename: 'Paulo',
          seoCode: 'paulodybala',
          surname: 'Dybala',
          mediaGroup: [
            {
              usage: 'PROFILE',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--UFVP3ITo--/v1561386276/app/stars/paulodybala/player-index/player-index-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--PYqrjhyB--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--omVyPq1x--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O8pwhSyp--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--RJsRgoTR--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---WEiGhDa--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Rj4wLy4g--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--NcORKOTo--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--VmScKwlJ--/v1561386274/app/stars/paulodybala/player-index/player-index-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ktepon8K--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--T8bw45Ky--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--w31M59U2--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--c1zcVQlB--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--uKoY5q89--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_jloW88O--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XaE169xg--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--cyWkZuYV--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-2',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--rBVX3x0B--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_IgeYBOk--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xc5D_NqC--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Qs-BDG00--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--osyv-qux--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r7XPoMyv--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--q4spcb6j--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Cff2KjJi--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vvX-XH0x--/c_scale,w_3839/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--P966A23d--/c_scale,w_1920/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--pI2Q4AE3--/c_scale,w_960/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--riogy0jw--/c_scale,w_480/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--3Wb1rnOy--/c_scale,w_240/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UeO0tCCc--/c_scale,w_120/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--okY8yuOe--/c_scale,w_60/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                  ],
                },
              ],
            },
            {
              usage: 'BIO',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--fkGJvJdz--/v1561386272/app/stars/paulodybala/bio-background/bio-background-paulodybala-5.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--hNexAXHB--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kZmy-Vgy--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kBiVrv9S--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--lj3tasyI--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--icC2aigW--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r_NgvEWz--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--iOs9urG0--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--8deYo15Z--/v1561386270/app/stars/paulodybala/bio-background/bio-background-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--TCbBv8lE--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--nbhqjDvp--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vo57bFra--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--fzCG5iOA--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--cEJVT6cE--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--BYN8rYih--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XUgnS3v3--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Ycq4OTYZ--/v1561386269/app/stars/paulodybala/bio-background/bio-background-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eKsUIK_6--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XVoS3SED--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ffE2mMY0--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O1sAzewc--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UXxukzem--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4gwVpkKS--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--k8ubPyMc--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--zOPbIWsG--/v1561386268/app/stars/paulodybala/bio-background/bio-background-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eQvcSAa9--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--GfAOQfz8--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kNF5AOEN--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4yzd5fNz--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Nbm2VxGE--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---KmtotUO--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--I11FP2s0--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Sg7f68xZ--/v1561386267/app/stars/paulodybala/bio-background/bio-background-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--zxZQqAX7--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--44EUg7Df--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--QYrdfya2--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kj-2j_Q6--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--wDB6AbJr--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--drDPCeB0--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--CH6RxPEp--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Signature',
                  width: 400,
                  height: 400,
                  format: 'png',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--9qGlnRGo--/v1561386266/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1.png',
                  public_id: 'app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                  media: [
                    {
                      width: 399,
                      height: 399,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ojTLJ81q--/c_scale,w_399/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 200,
                      height: 200,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--AXfFNkin--/c_scale,w_200/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 100,
                      height: 100,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--KJmHxBjP--/c_scale,w_100/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 50,
                      height: 50,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xkyIgZ-6--/c_scale,w_50/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                  ],
                },
              ],
            },
          ],
          starType: 'Footballer',
          externalId: 'paulodybala',
          bio:
            "I wanted to quit football when I was just 15. I had lost my dad to cancer and it felt like the end of the world. I kept going to make up for all the sacrifices he had made for me, and now every time I score I point to the sky to say thank you. When you're a footballer, people judge you without knowing who you really are. I want to change that.",
          avatar:
            'https://res.cloudinary.com/our-star-club/image/authenticated/s--0d043K3P--/v1/app/stars/paulodybala/avatar/avatar-paulodybala',
          starExternalId: 'paulodybala',
        },
      ],
      description:
        'Paulo Dybala rummages through his vast collection of football shirts, revisiting some poignant moments, and revealing the team-mates and opponents that have influenced him most.',
      descriptionBrief:
        'Paulo Dybala rummages through his vast collection of football shirts, revisiting some poignant moments, and revealing the team-mates and opponents that have influenced him most.',
      title: 'Dybala: My Shirts',
      titleBrief: 'My Shirts',
      language: 'en',
      tags: [],
      creatives: [
        {
          mediaUsageType: 'Artwork',
          width: 1600,
          height: 750,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--rjkZBnSl--/v1565879408/app/content/dybala-my-shirts/dybala-my-shirts-8.jpg',
          public_id: 'app/content/dybala-my-shirts/dybala-my-shirts-8',
          media: [
            {
              width: 1599,
              height: 750,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--yUI_m7_L--/c_scale,w_1599/v1/app/content/dybala-my-shirts/dybala-my-shirts-8',
            },
            {
              width: 800,
              height: 375,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Hr4X8RMv--/c_scale,w_800/v1/app/content/dybala-my-shirts/dybala-my-shirts-8',
            },
            {
              width: 400,
              height: 188,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--YhdGURNR--/c_scale,w_400/v1/app/content/dybala-my-shirts/dybala-my-shirts-8',
            },
            {
              width: 200,
              height: 94,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--GmA6Afdb--/c_scale,w_200/v1/app/content/dybala-my-shirts/dybala-my-shirts-8',
            },
            {
              width: 100,
              height: 47,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ENxnELnz--/c_scale,w_100/v1/app/content/dybala-my-shirts/dybala-my-shirts-8',
            },
            {
              width: 50,
              height: 24,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--CoANd9oC--/c_scale,w_50/v1/app/content/dybala-my-shirts/dybala-my-shirts-8',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1920,
          height: 1080,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--b7o_ONM4--/v1565879408/app/content/dybala-my-shirts/dybala-my-shirts-5.jpg',
          public_id: 'app/content/dybala-my-shirts/dybala-my-shirts-5',
          media: [
            {
              width: 1919,
              height: 1079,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--W5J_FP2G--/c_scale,w_1919/v1/app/content/dybala-my-shirts/dybala-my-shirts-5',
            },
            {
              width: 960,
              height: 540,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--aB-84TEV--/c_scale,w_960/v1/app/content/dybala-my-shirts/dybala-my-shirts-5',
            },
            {
              width: 480,
              height: 270,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--9gZ8jUY0--/c_scale,w_480/v1/app/content/dybala-my-shirts/dybala-my-shirts-5',
            },
            {
              width: 240,
              height: 135,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--YtkdvmGu--/c_scale,w_240/v1/app/content/dybala-my-shirts/dybala-my-shirts-5',
            },
            {
              width: 120,
              height: 68,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--_54akHff--/c_scale,w_120/v1/app/content/dybala-my-shirts/dybala-my-shirts-5',
            },
            {
              width: 60,
              height: 34,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ECHLGYNw--/c_scale,w_60/v1/app/content/dybala-my-shirts/dybala-my-shirts-5',
            },
            {
              width: 30,
              height: 17,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--axVVeQhD--/c_scale,w_30/v1/app/content/dybala-my-shirts/dybala-my-shirts-5',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1920,
          height: 1080,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--YkY9qGGM--/v1565879408/app/content/dybala-my-shirts/dybala-my-shirts-2.jpg',
          public_id: 'app/content/dybala-my-shirts/dybala-my-shirts-2',
          media: [
            {
              width: 1919,
              height: 1079,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--p9YiOQ6Y--/c_scale,w_1919/v1/app/content/dybala-my-shirts/dybala-my-shirts-2',
            },
            {
              width: 960,
              height: 540,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--8wdYha0P--/c_scale,w_960/v1/app/content/dybala-my-shirts/dybala-my-shirts-2',
            },
            {
              width: 480,
              height: 270,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--pq1raZOn--/c_scale,w_480/v1/app/content/dybala-my-shirts/dybala-my-shirts-2',
            },
            {
              width: 240,
              height: 135,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--VZd831kn--/c_scale,w_240/v1/app/content/dybala-my-shirts/dybala-my-shirts-2',
            },
            {
              width: 120,
              height: 68,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--caUbUa_U--/c_scale,w_120/v1/app/content/dybala-my-shirts/dybala-my-shirts-2',
            },
            {
              width: 60,
              height: 34,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--bGOffNeB--/c_scale,w_60/v1/app/content/dybala-my-shirts/dybala-my-shirts-2',
            },
            {
              width: 30,
              height: 17,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--MKUqJwvB--/c_scale,w_30/v1/app/content/dybala-my-shirts/dybala-my-shirts-2',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1920,
          height: 1080,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--_U906Vtv--/v1565879408/app/content/dybala-my-shirts/dybala-my-shirts-1.jpg',
          public_id: 'app/content/dybala-my-shirts/dybala-my-shirts-1',
          media: [
            {
              width: 1919,
              height: 1079,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--2g_E7F4l--/c_scale,w_1919/v1/app/content/dybala-my-shirts/dybala-my-shirts-1',
            },
            {
              width: 960,
              height: 540,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--jksjyRPB--/c_scale,w_960/v1/app/content/dybala-my-shirts/dybala-my-shirts-1',
            },
            {
              width: 480,
              height: 270,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--lzbJDe1u--/c_scale,w_480/v1/app/content/dybala-my-shirts/dybala-my-shirts-1',
            },
            {
              width: 240,
              height: 135,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--LP88HDFO--/c_scale,w_240/v1/app/content/dybala-my-shirts/dybala-my-shirts-1',
            },
            {
              width: 120,
              height: 68,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--v1ODveQW--/c_scale,w_120/v1/app/content/dybala-my-shirts/dybala-my-shirts-1',
            },
            {
              width: 60,
              height: 34,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Bp7pGXMC--/c_scale,w_60/v1/app/content/dybala-my-shirts/dybala-my-shirts-1',
            },
            {
              width: 30,
              height: 17,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--pBxFyDG5--/c_scale,w_30/v1/app/content/dybala-my-shirts/dybala-my-shirts-1',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 735,
          height: 957,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--YwfV2YxF--/v1565879408/app/content/dybala-my-shirts/dybala-my-shirts-9.jpg',
          public_id: 'app/content/dybala-my-shirts/dybala-my-shirts-9',
          media: [
            {
              width: 734,
              height: 956,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--kLnFmPv---/c_scale,w_734/v1/app/content/dybala-my-shirts/dybala-my-shirts-9',
            },
            {
              width: 367,
              height: 478,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--S3lEMzBr--/c_scale,w_367/v1/app/content/dybala-my-shirts/dybala-my-shirts-9',
            },
            {
              width: 184,
              height: 239,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--WVZelhUv--/c_scale,w_184/v1/app/content/dybala-my-shirts/dybala-my-shirts-9',
            },
            {
              width: 92,
              height: 120,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--5qDFHJzb--/c_scale,w_92/v1/app/content/dybala-my-shirts/dybala-my-shirts-9',
            },
            {
              width: 46,
              height: 60,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ofm3FNOY--/c_scale,w_46/v1/app/content/dybala-my-shirts/dybala-my-shirts-9',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1600,
          height: 900,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--jQimOklC--/v1565879408/app/content/dybala-my-shirts/dybala-my-shirts-7.jpg',
          public_id: 'app/content/dybala-my-shirts/dybala-my-shirts-7',
          media: [
            {
              width: 1599,
              height: 899,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--y8rAcH_z--/c_scale,w_1599/v1/app/content/dybala-my-shirts/dybala-my-shirts-7',
            },
            {
              width: 800,
              height: 450,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--aSV1_O9_--/c_scale,w_800/v1/app/content/dybala-my-shirts/dybala-my-shirts-7',
            },
            {
              width: 400,
              height: 225,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--5YNvUeEg--/c_scale,w_400/v1/app/content/dybala-my-shirts/dybala-my-shirts-7',
            },
            {
              width: 200,
              height: 113,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--nFogUWoN--/c_scale,w_200/v1/app/content/dybala-my-shirts/dybala-my-shirts-7',
            },
            {
              width: 100,
              height: 57,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--spd7DfmJ--/c_scale,w_100/v1/app/content/dybala-my-shirts/dybala-my-shirts-7',
            },
            {
              width: 50,
              height: 29,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--0UJ_AGcK--/c_scale,w_50/v1/app/content/dybala-my-shirts/dybala-my-shirts-7',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1920,
          height: 1080,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--GlfmP47F--/v1565879408/app/content/dybala-my-shirts/dybala-my-shirts-4.jpg',
          public_id: 'app/content/dybala-my-shirts/dybala-my-shirts-4',
          media: [
            {
              width: 1919,
              height: 1079,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--q4jKaQSh--/c_scale,w_1919/v1/app/content/dybala-my-shirts/dybala-my-shirts-4',
            },
            {
              width: 960,
              height: 540,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--eO7TO2DI--/c_scale,w_960/v1/app/content/dybala-my-shirts/dybala-my-shirts-4',
            },
            {
              width: 480,
              height: 270,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--lnuKLhba--/c_scale,w_480/v1/app/content/dybala-my-shirts/dybala-my-shirts-4',
            },
            {
              width: 240,
              height: 135,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--22tvFtwg--/c_scale,w_240/v1/app/content/dybala-my-shirts/dybala-my-shirts-4',
            },
            {
              width: 120,
              height: 68,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--WTICSk2y--/c_scale,w_120/v1/app/content/dybala-my-shirts/dybala-my-shirts-4',
            },
            {
              width: 60,
              height: 34,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--hPFgPyBs--/c_scale,w_60/v1/app/content/dybala-my-shirts/dybala-my-shirts-4',
            },
            {
              width: 30,
              height: 17,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--tLmQpk0J--/c_scale,w_30/v1/app/content/dybala-my-shirts/dybala-my-shirts-4',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1920,
          height: 1080,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--kcWGTWgf--/v1565879408/app/content/dybala-my-shirts/dybala-my-shirts-6.jpg',
          public_id: 'app/content/dybala-my-shirts/dybala-my-shirts-6',
          media: [
            {
              width: 1919,
              height: 1079,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--8MZPmB6---/c_scale,w_1919/v1/app/content/dybala-my-shirts/dybala-my-shirts-6',
            },
            {
              width: 960,
              height: 540,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--nQqMtZtG--/c_scale,w_960/v1/app/content/dybala-my-shirts/dybala-my-shirts-6',
            },
            {
              width: 480,
              height: 270,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--eFi7BvhX--/c_scale,w_480/v1/app/content/dybala-my-shirts/dybala-my-shirts-6',
            },
            {
              width: 240,
              height: 135,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--2Mr1XKFH--/c_scale,w_240/v1/app/content/dybala-my-shirts/dybala-my-shirts-6',
            },
            {
              width: 120,
              height: 68,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--VXWEvrQ---/c_scale,w_120/v1/app/content/dybala-my-shirts/dybala-my-shirts-6',
            },
            {
              width: 60,
              height: 34,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--TplcZzGv--/c_scale,w_60/v1/app/content/dybala-my-shirts/dybala-my-shirts-6',
            },
            {
              width: 30,
              height: 17,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--uxnTlfcl--/c_scale,w_30/v1/app/content/dybala-my-shirts/dybala-my-shirts-6',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1920,
          height: 1080,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--ySqwRBWk--/v1565879408/app/content/dybala-my-shirts/dybala-my-shirts-3.jpg',
          public_id: 'app/content/dybala-my-shirts/dybala-my-shirts-3',
          media: [
            {
              width: 1919,
              height: 1079,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Zh-8x8DF--/c_scale,w_1919/v1/app/content/dybala-my-shirts/dybala-my-shirts-3',
            },
            {
              width: 960,
              height: 540,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--h20w6K2A--/c_scale,w_960/v1/app/content/dybala-my-shirts/dybala-my-shirts-3',
            },
            {
              width: 480,
              height: 270,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--6_lh-lwQ--/c_scale,w_480/v1/app/content/dybala-my-shirts/dybala-my-shirts-3',
            },
            {
              width: 240,
              height: 135,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--0269nfaR--/c_scale,w_240/v1/app/content/dybala-my-shirts/dybala-my-shirts-3',
            },
            {
              width: 120,
              height: 68,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--5IYlCZLI--/c_scale,w_120/v1/app/content/dybala-my-shirts/dybala-my-shirts-3',
            },
            {
              width: 60,
              height: 34,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--sZBOXvGk--/c_scale,w_60/v1/app/content/dybala-my-shirts/dybala-my-shirts-3',
            },
            {
              width: 30,
              height: 17,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--nN_-pnD5--/c_scale,w_30/v1/app/content/dybala-my-shirts/dybala-my-shirts-3',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 830,
          height: 830,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--5UDCDl5p--/v1565879408/app/content/dybala-my-shirts/dybala-my-shirts-11.jpg',
          public_id: 'app/content/dybala-my-shirts/dybala-my-shirts-11',
          media: [
            {
              width: 829,
              height: 829,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--9YLNsHRI--/c_scale,w_829/v1/app/content/dybala-my-shirts/dybala-my-shirts-11',
            },
            {
              width: 415,
              height: 415,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--sWaceiCS--/c_scale,w_415/v1/app/content/dybala-my-shirts/dybala-my-shirts-11',
            },
            {
              width: 208,
              height: 208,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--pzw-YjjX--/c_scale,w_208/v1/app/content/dybala-my-shirts/dybala-my-shirts-11',
            },
            {
              width: 104,
              height: 104,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--UcgOZ3MU--/c_scale,w_104/v1/app/content/dybala-my-shirts/dybala-my-shirts-11',
            },
            {
              width: 52,
              height: 52,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ZulxTE_2--/c_scale,w_52/v1/app/content/dybala-my-shirts/dybala-my-shirts-11',
            },
            {
              width: 26,
              height: 26,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--BMScK7PH--/c_scale,w_26/v1/app/content/dybala-my-shirts/dybala-my-shirts-11',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 672,
          height: 957,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--fhwbwFmg--/v1565879408/app/content/dybala-my-shirts/dybala-my-shirts-10.jpg',
          public_id: 'app/content/dybala-my-shirts/dybala-my-shirts-10',
          media: [
            {
              width: 671,
              height: 956,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--rKSkRAIV--/c_scale,w_671/v1/app/content/dybala-my-shirts/dybala-my-shirts-10',
            },
            {
              width: 336,
              height: 478,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--qM2gczd1--/c_scale,w_336/v1/app/content/dybala-my-shirts/dybala-my-shirts-10',
            },
            {
              width: 168,
              height: 239,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--5pqmGba---/c_scale,w_168/v1/app/content/dybala-my-shirts/dybala-my-shirts-10',
            },
            {
              width: 84,
              height: 120,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--vdCYHfCw--/c_scale,w_84/v1/app/content/dybala-my-shirts/dybala-my-shirts-10',
            },
            {
              width: 42,
              height: 60,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--AFOA4UvF--/c_scale,w_42/v1/app/content/dybala-my-shirts/dybala-my-shirts-10',
            },
          ],
        },
      ],
      contentTypeName: 'Video',
      duration: 472.96,
      views: 0,
      bookmarks: 0,
      comments: 0,
      likes: 0,
    },
    // contentItem: getContentItemById(state)(contentId),
  };
};

export default compose(
  injectIntl,
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ContentInteractionFooter);
