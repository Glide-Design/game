import { contentTypes } from '../content/contentTypes';

export const ReferralType = {
  // Campaign type
  PLAYER: 'player-referral',
  MEMBER: 'member-referral',
};

export const ReferralSource = {
  OTRO: 'otro',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  WHATSAPP: 'whatsapp',
};

export const ReferralMedium = {
  INVITE: 'invite',
  VIDEO: 'video',
  ARTICLE: 'article',
  CARD: 'card',
  SOCIAL: 'social',
};

export const ContentTypeReferralMediumMapping = {
  [contentTypes.VIDEO]: ReferralMedium.VIDEO,
  [contentTypes.ARTICLE]: ReferralMedium.ARTICLE,
  [contentTypes.CARD]: ReferralMedium.CARD,
  [contentTypes.SOCIAL]: ReferralMedium.SOCIAL,
};
