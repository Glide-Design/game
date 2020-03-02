import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { uploadAvatarSign, uploadCloudinary } from 'xi-core/member/actions';
import {
  getAvatar,
  getCloudinaryResponse,
  getAvatarUploading,
  getAvatarSignature,
} from 'xi-core/member/selectors';
import {
  initialAvatarState,
  onDeleteAvatar,
  onUpdateAvatar,
} from 'xi-core/member/editProfile/helpers';
import { Grey85 } from 'xi-core/colours';
import CameraIcon from '../../common/icons/Camera';
import Cross from '../../common/icons/Cross';
import Loader from '../../common/Loader';
import ProfileAvatar, { AVATAR_WIDTH_PX } from '../../profile/ProfileAvatar';

const UploadAvatarWrapper = styled.div`
  color: ${Grey85};
  position: relative;
`;

const ProfileAvatarBlurred = styled.div`
  filter: blur(1px);
  opacity: 0.2;
`;

const StyledProfileAvatar = styled(ProfileAvatar)`
  margin-top: 0;
  margin-bottom: 0;
`;

const UploadOverlay = styled.label`
  border-radius: 50%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: ${AVATAR_WIDTH_PX}px;
  height: ${AVATAR_WIDTH_PX}px;
  cursor: pointer;
  text-align: center;
`;

const UploadText = styled.div`
  margin-top: 3px;
`;

// hide the standard HTML input UI for a file upload
const InputUpload = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const DeleteAvatar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

class UploadProfileAvatar extends React.Component {
  state = initialAvatarState(this.props.initialAvatar);

  onChange = event => {
    const { signUpload } = this.props;

    if (event.target.files[0]) {
      this.setState({ file: event.target.files[0] });
      // get the Cloudinary API signature/apiKey for a new file
      signUpload(event.target.files[0]);
    }
  };

  onDeleteAvatar = event => {
    event.preventDefault();
    const tempAvatar = onDeleteAvatar(this.props);
    this.setState({ tempAvatar });
  };

  componentDidUpdate(prevProps) {
    const tempAvatar = onUpdateAvatar({
      prevProps,
      props: this.props,
      file: this.state.file,
    });

    if (tempAvatar) {
      this.setState({ tempAvatar });
    }
  }

  render() {
    const { uploading } = this.props;
    const { tempAvatar } = this.state;

    return (
      <React.Fragment>
        <UploadAvatarWrapper>
          <ProfileAvatarBlurred>
            <StyledProfileAvatar disablePremium overrideAvatar={tempAvatar} />
          </ProfileAvatarBlurred>
          <UploadOverlay htmlFor="uploadProfileAvatar">
            <CameraIcon />
            <UploadText>
              <FormattedMessage
                id="edit_profile.uploadAvatar"
                defaultMessage="Add a profile picture"
              />
            </UploadText>
            <InputUpload
              id="uploadProfileAvatar"
              type="file"
              onChange={this.onChange}
              disabled={uploading}
              accept="image/*"
            />
            {tempAvatar !== null && (
              <DeleteAvatar onClick={this.onDeleteAvatar}>
                <Cross />
              </DeleteAvatar>
            )}
          </UploadOverlay>
        </UploadAvatarWrapper>
        {uploading && <Loader height="3" />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  avatarSignature: getAvatarSignature(state),
  cloudinaryResponse: getCloudinaryResponse(state),
  initialAvatar: getAvatar(state),
  uploading: getAvatarUploading(state),
});

const mapDispatchToProps = dispatch => ({
  signUpload: file => dispatch(uploadAvatarSign(file)),
  uploadCloudinary: dispatch(uploadCloudinary),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadProfileAvatar);
