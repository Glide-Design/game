import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getInitials, getAvatar } from 'xi-core/member/selectors';
import { transformAvatarUrl, transformation } from 'xi-core/utils/cloudinary';
import { CoreDevices } from '../common/dimensions';

export const AVATAR_WIDTH_PX = 141;

const Avatar = styled.div`
  // border: ${({ isPremium }) => isPremium && '5px solid #7aff00'};
  border-radius: 50%;
  box-sizing: border-box;
  width: ${AVATAR_WIDTH_PX}px;
  height: ${AVATAR_WIDTH_PX}px;
  background: #b2b2b2;
  background-size: cover;
  background-position: center;
  color: #fff;
  line-height: 141px;
  text-align: center;
  margin: 88px 0 25px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    margin: 90px 0 50px;
  }
`;

const Initials = styled.h1`
  vertical-align: middle;
  font-size: 90px;
  letter-spacing: 10px;
  padding-left: 10px;
  white-space: nowrap;
`;

const ProfileAvatar = ({ className, avatar, disablePremium, initials, overrideAvatar = false }) => {
  avatar = transformAvatarUrl(
    overrideAvatar === false ? avatar : overrideAvatar,
    transformation.PROFILE
  );

  return (
    <Avatar
      className={className}
      isPremium={!disablePremium}
      style={{
        backgroundImage: `url("${avatar}")`,
      }}
    >
      {!avatar && <Initials>{initials}</Initials>}
    </Avatar>
  );
};

const mapStateToProps = state => ({
  initials: getInitials(state),
  avatar: getAvatar(state),
});

export default connect(mapStateToProps)(ProfileAvatar);
