import decode from 'jwt-decode';

export const decodeAccessToken = token => {
  // console.warn('jwtValidator: using unsafe `decode` instead of `verify` on JWT.');
  return decode(token);
};

export const mapConfirmationEmailDecodedPropsFromJWT = (decodedObject = {}) => ({
  temporaryRegistrationId: decodedObject.sub,
  email: decodedObject.identityId,
  birthday: decodedObject.birthday,
  marketingEmailConsent: decodedObject.marketingEmailConsent || false,
});
