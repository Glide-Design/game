import { get, getOr } from 'lodash/fp';

export const getTemplateId = label => get(`config.${label}TemplateId`);
export const getFacebookAppId = get('config.facebookAppId');

export const getAssetBaseUrlPrefix = getOr('', 'config.assetBaseUrlPrefix');
export const getGuestFreeVideoLimit = state =>
  Number(getOr(0, 'config.guestFreeVideoLimit')(state));
export const getMemberMinorLessThenAge = state =>
  Number(getOr(0, 'config.memberMinorAgeLessThan')(state));
export const getSignupRestrictionLessThanAge = state =>
  Number(getOr(0, 'config.signupRestrictionAgeLessThan')(state));
export const getSignupAgeDefaultYear = state =>
  Number(getOr(1990, 'config.signupAgeDefaultYear', state));
export const getClientAppBaseUrl = get('config.clientAppBaseUrl');
export const getJoinUrl = state => `${getClientAppBaseUrl(state)}/join`;
export const getConsoleLogFetch = state => get('config.consoleLogFetch')(state) === 'true';
export const getDRMLicenseAquisitionUrl = state => get('config.drmLicenseAcquisitionUrl', state);
export const getDRMCertificateAquisitionUrlFairplay = state =>
  get('config.drmCertificateAcquisitionUrlFairplay', state);
export const getDRMTicketAcquisitionURL = state => get('config.drmTicketAcquisitionUrl', state);

export const getExternalLink = linkId => state => get(`config.externalLinks.${linkId}`, state);
export const getFirebaseSenderId = state => get('config.firebaseSenderId', state);

export const getLogglyKey = state => get('config.logglyKey', state);

export const getFEVersion = state => get('config.feVersion', state);
export const getAppsFlyerId = state => get('config.appsFlyerId', state);
export const getiOSAppId = state => get('config.iOSAppId', state);
export const getAndroidBundleId = state => get('config.androidBundleId', state);
export const getPwaPaymentProvider = get('config.paymentProvider');

export const getKinesisStream = get('config.kinesisStream');
export const getMetricsEndPoint = get('config.metricsEndPoint');
