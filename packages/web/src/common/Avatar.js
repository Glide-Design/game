import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { getStarAvatarUrl, getStarName } from 'xi-core/stars/selectors';
import { Grey85 } from 'xi-core/colours';
import { transformAvatarUrl } from 'xi-core/utils/cloudinary';
import { AvatarCopyCss } from './typography';
import { CoreDevices } from './dimensions';
import VerifiedPlayer from './icons/VerifiedPlayer';
import VerifiedVip from './icons/VerifiedVip';

const StylableLink = ({ to, dataTestId, className, children, onClick }) => (
  <Link to={to} className={className} data-test-id={dataTestId} onClick={onClick}>
    {children}
  </Link>
);

const AvatarMainStyle = css`
  display: flex;
  color: inherit;

  ${({ textPosition }) =>
    textPosition === 'bottom'
      ? `
    flex-direction: column;
  `
      : `
    flex-direction: row;
    align-items: center;
  `};

  span {
    ${AvatarCopyCss};
    display: inline-block;

    ${({ textPosition }) =>
      textPosition === 'bottom'
        ? `
          margin-top: 8px;
          max-width: 60px; // Break words
        `
        : `
          width: 10px;
          margin-left: 8px;
        `};
  }

  ${({ zIndex }) => (zIndex ? `z-index:${zIndex};` : '')}
`;

const ContainerLink = styled(StylableLink)`
  ${AvatarMainStyle};
`;

const ContainerNonLink = styled.div`
  ${AvatarMainStyle};
`;

const Img = styled.img`
  border-radius: 50%;
  align-self: flex-start;
  width: 40px;
  height: 40px;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    width: 56px;
    height: 56px;
  }
`;

const Initials = styled.div`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: ${props => (props.discussionHighlights ? '14px' : '24px')};
  text-transform: uppercase;
  background-color: ${Grey85};
  color: #fff;
  border-radius: 50%;
  line-height: 40px;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    width: 56px;
    height: 56px;
    line-height: 56px;
  }
`;

const AvatarContainer = styled.div`
  ${props =>
    !props.discussionHighlights
      ? `flex: 0 0 47px;
        position: relative;
        @media ${CoreDevices.medium}, ${CoreDevices.large} {
          flex: 0 0 64px;
        }`
      : `flex: 0 0 38px;
        position: relative;`}
`;

const IconHolder = styled.span`
  top: -6px;
  right: 0;
  position: absolute;
  margin-top: 0px;
  svg {
    width: 16px;
    height: 16px;
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
      width: ${props => (props.discussionHighlights ? '16px' : '22px')};
      height: ${props => (props.discussionHighlights ? '16px' : '22px')};
    }
  }
`;

const Avatar = ({
  className,
  link,
  src,
  text,
  textPosition = 'bottom',
  labelHidden = true,
  initials,
  onClick,
  starId,
  intl,
  displayName = '',
  zIndex,
  imageAndInitialsStyle = {},
  star = false,
  vip = false,
  showVerifiedTick = false,
  discussionHighlights = false,
  avatarGroup = false,
  owner = false,
}) => {
  const isStar = !!starId;
  const altText = name =>
    intl.formatMessage(
      {
        id: 'accessibility.avatarImage',
        defaultMessage: 'Avatar image of {name}',
      },
      { name }
    );

  if (isStar && !avatarGroup) {
    return (
      <AvatarContainer discussionHighlights={discussionHighlights}>
        <ContainerLink
          className={className}
          to={link}
          textPosition={textPosition}
          onClick={e => onClick && onClick(e, text)}
          dataTestId="player-avatar"
          zIndex={zIndex}
        >
          {src ? (
            <Img src={src} alt={altText(text)} style={imageAndInitialsStyle} />
          ) : (
            <Initials style={imageAndInitialsStyle} discussionHighlights={discussionHighlights}>
              {initials}
            </Initials>
          )}
          {!labelHidden && text && <span>{text.toUpperCase()}</span>}
          {showVerifiedTick ? (
            <IconHolder
              discussionHighlights={discussionHighlights}
              data-test-id={discussionHighlights ? 'player-icon-show-reel' : 'player-icon'}
            >
              <VerifiedPlayer />
            </IconHolder>
          ) : null}
        </ContainerLink>
      </AvatarContainer>
    );
  }

  if (isStar && avatarGroup) {
    return (
      <ContainerLink
        className={className}
        to={link}
        textPosition={textPosition}
        onClick={e => onClick && onClick(e, text)}
        dataTestId="player-avatar"
        zIndex={zIndex}
      >
        {src ? (
          <Img src={src} alt={altText(text)} style={imageAndInitialsStyle} />
        ) : (
          <Initials style={imageAndInitialsStyle} discussionHighlights={discussionHighlights}>
            {initials}
          </Initials>
        )}
        {!labelHidden && text && <span>{text.toUpperCase()}</span>}
      </ContainerLink>
    );
  }

  if (!owner) {
    return (
      <AvatarContainer discussionHighlights={discussionHighlights}>
        <ContainerNonLink
          className={className}
          textPosition={textPosition}
          dataTestId="player-avatar"
          zIndex={zIndex}
        >
          {src ? (
            <Img src={src} alt={altText(`"${displayName}"`)} style={imageAndInitialsStyle} />
          ) : (
            <Initials style={imageAndInitialsStyle} discussionHighlights={discussionHighlights}>
              {initials}
            </Initials>
          )}
          {!labelHidden && text && <span>{text.toUpperCase()}</span>}
          {showVerifiedTick && vip ? (
            <IconHolder
              discussionHighlights={discussionHighlights}
              data-test-id={discussionHighlights ? 'verified-icon-show-reel' : 'verified-icon'}
            >
              <VerifiedVip />
            </IconHolder>
          ) : null}
        </ContainerNonLink>
      </AvatarContainer>
    );
  }

  if (owner) {
    return (
      <AvatarContainer discussionHighlights={discussionHighlights}>
        <ContainerLink
          className={className}
          to={'/profile'}
          textPosition={textPosition}
          onClick={e => onClick && onClick(e, text)}
          dataTestId="self-avatar"
          zIndex={zIndex}
        >
          {src ? (
            <Img src={src} alt={altText(`"${displayName}"`)} style={imageAndInitialsStyle} />
          ) : (
            <Initials style={imageAndInitialsStyle} discussionHighlights={discussionHighlights}>
              {initials}
            </Initials>
          )}
          {!labelHidden && text && <span>{text.toUpperCase()}</span>}
          {showVerifiedTick && vip ? (
            <IconHolder
              discussionHighlights={discussionHighlights}
              data-test-id={discussionHighlights ? 'verified-icon-show-reel' : 'verified-icon'}
            >
              <VerifiedVip />
            </IconHolder>
          ) : null}
        </ContainerLink>
      </AvatarContainer>
    );
  }

  return (
    <ContainerNonLink
      className={className}
      textPosition={textPosition}
      dataTestId="player-avatar"
      zIndex={zIndex}
    >
      {src ? <Img src={src} alt={altText(`"${displayName}"`)} /> : <Initials>{initials}</Initials>}
      {!labelHidden && text && <span>{text.toUpperCase()}</span>}
    </ContainerNonLink>
  );
};

const mapStateToProps = (state, { starId, src }) => ({
  src: transformAvatarUrl(!starId && src ? src : getStarAvatarUrl(state)(starId)),
  text: getStarName(state)(starId),
  link: `/star/${starId}`,
});

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(Avatar);
