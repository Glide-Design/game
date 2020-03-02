import { get, getOr, flow, first, map, join, compact, slice, lowerCase } from 'lodash/fp';
import moment from 'moment';
import { messages } from 'xi-core/member/locale';
import { getSignupAgeDefaultYear } from '../config/selectors';
import { ReferralType } from '../app/utm';

export const PLATFORM = {
  WEB: 'crm', // TODO change later to 'stripe'
  APPLE: 'apple',
  GOOGLE: 'google',
};

export const isAuthenticated = state => get('user.isAuthenticated', state);
export const isAuthenticatedAndNewMember = state =>
  isAuthenticated(state) && get('user.isNew', state);

export const isAuthenticatedAndProfileReceived = state =>
  isAuthenticated(state) && get('user.profileAndEntitlementRecieved', state);

export const getReferrerSource = state => get('user.referrerSource', state);
export const getStarReferrerId = state => get('user.starReferrerId', state);
export const getMemberReferrerId = state => get('user.memberReferrerId', state);

export const getTemporaryToken = get('user.temporaryRegistrationToken');
export const getToken = get('user.accessToken');
export const getMemberId = get('user.id');
export const getForename = state => {
  return get('user.forename', state);
};
export const getSurname = get('user.surname');
export const getNickname = get('user.nickname');
export const getBirthday = state => {
  const rawBirthday = get('user.birthday', state);

  if (!rawBirthday) {
    return null;
  }

  try {
    const birthday = new Date(rawBirthday);
    return isNaN(birthday) ? null : birthday;
  } catch (err) {
    console.error('Invalid birthday', rawBirthday);
    return null;
  }
};
const transformBirthdateToAge = birthdate => moment().diff(birthdate, 'years');

export const getAge = flow(
  getBirthday,
  transformBirthdateToAge
);

export const getDefaultBirthday = state => parts => {
  let d = state.user.birthday
    ? new Date(state.user.birthday)
    : new Date(getSignupAgeDefaultYear(state), 0, 1);

  if (!(d instanceof Date && !isNaN(d))) {
    d = new Date(getSignupAgeDefaultYear(state), 0, 1);
  }

  if (!parts) {
    return d;
  } else {
    const dateOfBirthParts = {};
    dateOfBirthParts.day = d.getDate();
    dateOfBirthParts.month = d.getMonth();
    dateOfBirthParts.year = d.getFullYear();
    return dateOfBirthParts;
  }
};

export const getEmail = get('user.email');
export const getLanguage = (state, defaultLanguage = 'en') =>
  getOr(defaultLanguage, 'user.language')(state);
export const getName = state => [getForename(state), getSurname(state)].join(' ');
export const getInitials = state => {
  const names = [getForename(state), getSurname(state)];
  return flow(
    map(first),
    slice(0, 2),
    join('')
  )(names);
};

export const getCreatedDate = state => get('user.createdDate', state);

export const getAboutMe = state => get('user.aboutMe', state);

export const getMyTeams = state =>
  getOr(['Westham Ham United Football Club', 'FC Barcelona', 'England'], 'user.myTeams', state);

export const getAvatar = state => get('user.avatar', state);

// This used to get set in the bootstrap getApiPlatform call. Empty now.
export const getCountry = state => getOr(null, 'user.country', state);

// This used to get set in the bootstrap getApiPlatform call. Empty now.
export const getCurrency = state => getOr(null, 'user.currency', state);

export const getCity = state => getOr(null, 'user.city', state);

export const getFlag = state => getOr('/images/english-flag.svg', 'user.flag', state);

export const getUTMCampaign = get('user.referrerCampaign');
export const getUTMMedium = get('user.referrerMedium');
export const getUTMSource = get('user.referrerSource');
export const getUTMContent = state => {
  const compaign = getUTMCampaign(state);

  switch (compaign) {
    case ReferralType.PLAYER:
      return get('user.starReferrerId', state);
    case ReferralType.MEMBER:
      return get('user.memberReferrerId', state);
    default:
      return undefined;
  }
};

export const getAvatarSignature = state => get('member.avatarSignature', state);
export const getCloudinaryResponse = state => get('member.cloudinaryResponse', state);
export const getAvatarUploading = state => get('member.avatarUploading', state);
export const getIsLoading = state => get('member.isLoading', state);
export const getBookmarks = state => getOr([], 'member.bookmarks', state);

export const generateQueryStringUTM = state => (source, mediumType) => {
  const memberId = getMemberId(state);
  const utm_content = memberId ? `utm_content=${memberId}` : null;
  const utm_campaign = 'utm_campaign=member-referral';
  const utm_source = `utm_source=${source}`;
  const utm_medium = `utm_medium=${mediumType}`;
  return compact([utm_content, utm_campaign, utm_medium, utm_source]).join('&');
};

export const isMemberEnablementReceived = get('user.memberEnablementReceived');

export const getEnablement = getOr([], 'user.enablement');

export const premiumExpires = flow(
  getEnablement,
  getOr(-Infinity, 'nextPayment')
);

export const getPurchaseDate = flow(
  getEnablement,
  get('purchaseDate')
);

export const isWithinUnlimitedCoolingOffPeriod = state =>
  moment(getPurchaseDate(state)).diff(new Date(), 'days') <= 14;

export const isPendingCancel = flow(
  getEnablement,
  get('pendingCancel') || get('cancelInProgress')
);

export const isPaymentProcessing = flow(
  getEnablement,
  get('temporary')
);

export const getIsFreeTrial = flow(
  getEnablement,
  get('freeTrial')
);

export const getEligibleForTrial = flow(
  getEnablement,
  get('eligibleForTrial')
);

export const getTechProvider = flow(
  getEnablement,
  get('techProvider'),
  lowerCase
);

export const getEnablementExternalId = flow(
  getEnablement,
  get('enablementExternalId')
);

export const isPremium = state => isVip(state) || premiumExpires(state) >= Date.now();

export const isLiked = state => contentId => {
  return getOr([], 'member.contentStatuses.liked', state).indexOf(contentId) > -1;
};

export const isBookmarked = state => contentId => {
  return getOr([], 'member.contentStatuses.bookmarked', state).indexOf(contentId) > -1;
};

export const getContactPreference = state => preference =>
  getOr([], 'member.contactPreferences', state).indexOf(preference) > -1;

export const ageIsLessThan = state => ageThreshold => {
  const birthday = getBirthday(state);
  if (!birthday) {
    return null;
  }
  const ageInYears = moment().diff(birthday, 'years');

  return ageInYears < ageThreshold;
};

export const getPaymentHistory = state => {
  return getOr([], 'member.payments', state);
};

export const getCookiesStatus = state => {
  return get('member.cookiesStatus', state);
};

export const getZendeskToken = state => get('member.zendesktoken', state);

export const getFetchProductsError = state => get('member.fetchProductsError', state);

export const hasCommentingBlocked = state => getOr(false, 'user.blockedFromCommenting', state);

export const isBlocked = state => getOr(false, 'user.blockedFromPremium', state);

export const isVip = get('user.isVip');

export const isPaymentPlatform = ({ platform, devicePlatform }) =>
  platform.toLowerCase() === devicePlatform.toLowerCase();

const getPlatformMessage = ({ platform, messages }) => {
  const mapMessageToPlatform = {
    [PLATFORM.WEB]: messages.paymentMadeOnWeb,
    [PLATFORM.APPLE]: messages.paymentMadeOnApple,
    [PLATFORM.GOOGLE]: messages.paymentMadeOnGoogle,
  };

  return mapMessageToPlatform[platform.toLowerCase()] || messages.paymentMadeOnWeb; // WEB can be 'crm' or 'stripe'
};

export const myAccountMembership = ({
  isPremium,
  isFreeTrial,
  isPaymentProcessing,
  eligibleForTrial,
  showTrialProduct,
  showStandardProduct,
  openMembership,
}) => {
  let statusMembershipMessage = messages.notSubscribed;
  let actionMembershipMessage = messages.subscribeNow;
  let membershipAction = eligibleForTrial ? showTrialProduct : showStandardProduct;

  if (isPremium) {
    statusMembershipMessage = messages.unlimitedMember;
    actionMembershipMessage = messages.manage;
    membershipAction = openMembership;
  }

  if (isFreeTrial) {
    statusMembershipMessage = messages.freeTrial;
    actionMembershipMessage = messages.manageFreeTrial;
    membershipAction = openMembership;
  }

  if (isPaymentProcessing) {
    statusMembershipMessage = messages.paymentProcessing;
    actionMembershipMessage = messages.manage;
    membershipAction = openMembership;
  }

  return {
    statusMembershipMessage,
    actionMembershipMessage,
    membershipAction,
  };
};

export const membershipStatus = ({
  isPremium,
  isFreeTrial,
  pendingCancel,
  platform = '',
  devicePlatform = '',
  purchaseDate,
  nextPayment,
  isPaymentProcessing,
  appLink,
  cancelAction,
  manageSubscriptionAction,
  reactivateAction,
}) => {
  const isDevicePaymentPlatform = isPaymentPlatform({
    platform,
    devicePlatform,
  });

  // intitialise with isFreeTrial && !pendingCancel
  let headerMessage = messages.yourSubscription;
  let firstMessage = messages.freeTrialFirstText;
  let firstMessageValues = {
    purchaseDate: moment(purchaseDate).format('Do MMMM YYYY'),
    nextPayment: moment(nextPayment).format('Do MMMM YYYY'),
  };
  let secondMessage = messages.freeTrialSecondText;
  let secondMessageValues = {
    nextPayment: moment(nextPayment).format('Do MMMM YYYY'),
  };
  let buttonMessage = messages.cancelMembership;
  let buttonAction = cancelAction;
  let differentPlatformMessage = null;
  let differentPlatformValues = { url: appLink.replace(/https?:\/\//i, '') };

  if (isFreeTrial && pendingCancel) {
    firstMessage = messages.canceledFreeTrialFirstText;
    firstMessageValues = {
      nextPayment: moment(nextPayment).format('Do MMMM YYYY'),
      purchaseDate: moment(purchaseDate).format('Do MMMM YYYY'),
    };
    secondMessage = messages.canceledFreeTrialSecondText;
    secondMessageValues = {
      nextPayment: moment(nextPayment).format('Do MMMM YYYY'),
      purchaseDate: moment(purchaseDate).format('Do MMMM YYYY'),
    };
    // buttonMessage = messages.reactivate; // TODO bring back once reactivate ready
    buttonMessage = null;
    buttonAction = reactivateAction;
  }

  if (isPremium && !isFreeTrial && !pendingCancel) {
    firstMessage = messages.memberFirstText;
    firstMessageValues = {
      purchaseDate: moment(purchaseDate).format('Do MMMM YYYY'),
      nextPayment: moment(nextPayment).format('Do MMMM YYYY'),
    };
    secondMessage = messages.memberSecondText;
    secondMessageValues = {};
  }

  if (isPremium && !isFreeTrial && pendingCancel) {
    firstMessage = messages.canceledSubscriptionFirstText;
    firstMessageValues = {
      purchaseDate: moment(purchaseDate).format('Do MMMM YYYY'),
    };
    secondMessage = messages.canceledSubscriptionSecondText;
    secondMessageValues = {
      nextPayment: moment(nextPayment).format('Do MMMM YYYY'),
    };
    // buttonMessage = messages.reactivate; // TODO bring back once reactivate ready
    buttonMessage = null;
    buttonAction = reactivateAction;
  }

  if (isPaymentProcessing) {
    firstMessage = messages.paymentProcessing;
    secondMessage = '';
    buttonMessage = null;
  }

  // for native don't display any cancel/reactivate buttons but redirect to native store
  if (devicePlatform === PLATFORM.APPLE || devicePlatform === PLATFORM.GOOGLE) {
    buttonMessage = null;

    if (!isDevicePaymentPlatform) {
      differentPlatformMessage = getPlatformMessage({ platform, messages });
      // don't provide URL for Google Play help
      if (platform.toLowerCase() === PLATFORM.GOOGLE) {
        differentPlatformValues = {};
      }
    } else {
      buttonMessage =
        devicePlatform === PLATFORM.APPLE
          ? messages.manageAppleSubscription
          : messages.manageGoogleSubscription;
      buttonAction = manageSubscriptionAction;
      firstMessage = getPlatformMessage({ platform, messages });
      secondMessage = null;
      differentPlatformMessage = null;
    }
  }
  return {
    headerMessage,
    firstMessage,
    firstMessageValues,
    secondMessage,
    secondMessageValues,
    buttonMessage,
    differentPlatformMessage,
    differentPlatformValues,
    buttonAction,
  };
};

export const isJoinNowBannerVisible = state => get('purchases.isJoinNowBannerVisible', state);
