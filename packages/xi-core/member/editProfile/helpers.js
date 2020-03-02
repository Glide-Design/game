export const initialAvatarState = initialAvatar => ({
  file: null,
  tempAvatar: initialAvatar, // initially show the current user's avatar
});

export const onDeleteAvatar = ({ onFieldChange }) => {
  onFieldChange(null);

  return null;
};

export const onUpdateAvatar = ({ prevProps, props, file }) => {
  const prevSignature = prevProps.avatarSignature;
  const { avatarSignature: signature, cloudinaryResponse, onFieldChange, uploadCloudinary } = props;
  const successfulSignature = (signature, prevSignature) => signature !== prevSignature;
  const successfulUpload = (prevResponse, response) => prevResponse !== response;

  if (successfulSignature(prevSignature.data.signature, signature.data.signature)) {
    if (!signature.error) {
      uploadCloudinary(file, signature.data);
    }
  }

  if (successfulUpload(prevProps.cloudinaryResponse, cloudinaryResponse)) {
    if (!cloudinaryResponse.error) {
      onFieldChange(cloudinaryResponse.data.secureUrl);
      return cloudinaryResponse.data.secureUrl;
    }
  }
};
