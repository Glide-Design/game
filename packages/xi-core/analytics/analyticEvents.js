export const AnalyticsEvents = {
  app: {
    OPEN: 'App Open',
  },
  member: {
    LOGIN: 'Log In',
    LOGOUT: 'Log Out',
    SIGN_UP_REGISTRATION: 'Sign Up Registration',
    USER_PROFILE_ACTION: 'User Profile Action',
  },
  star: {
    TIMELINE_STARTED: 'Timeline Started',
    PLAYER_INDEX_ACTION: 'Player Index Interaction',
  },
  content: {
    START: 'Start Content',
    PAUSE: 'Pause Content',
    RESUME: 'Resume Content',
    END: 'End Content',
    PROGRESS: percent => `View ${percent}% Content`,
  },
  page: {
    VIEW_CONTENT_DETAIL: 'View Content Detail Page',
    VIEW_PLAYER_PROFILE: 'View Player Profile Page',
    PRODUCT_INTERACTIONS: 'Product Page Interactions',
    DISCOVERY_INTERACTIONS: 'Discovery Page Interactions',
    COMMENTS_INTERACTIONS: 'Comments Interactions',
    CONTENT_DETAIL_INTERACTIONS: 'Content Detail Page Interaction',
  },
  deepLinks: {
    COMMENT_DEEP_LINK_CLICKED: 'Comment deep link clicked',
  },
  share: {
    SEND_SHARE: 'Send Share',
    SEND_GUEST_PASS: 'Send Guest Pass',
  },
  purchase: {
    SIGN_UP_COMPLETE: 'Sign Up Complete',
    CANCEL_INTENT: 'Cancel Premium',
  },
  search: {
    SEARCH: 'Search Results',
  },
};

export const PropertyKeys = {
  USER_PROFILE_ACTION: {
    MY_PROFILE: 'My Profile',
    ENTER_LOCKER: 'Enter Locker',
    TERMS: 'Terms',
    PRIVACY_POLICY: 'Privacy Prolicy',
    HELP: 'Help',
    MANAGE_SUB: 'Manage Subscription',
    INVITE: 'Invite',
    EDIT_PROFILE: 'Edit Profile',
  },
  COMMON_AUTH_ACTION: {
    REGISTRATION: 'Registration',
    CREATE_ACCOUNT: 'Create Account',
    WELCOME_BACK: 'Welcome Back',
    EMAIL_SENT: 'Email Sent',
    EMAIL_RESENT: 'Email Resent',
  },
  LOGIN: {
    LOGIN_CODE_SUCCESS: 'Login Code Success',
    FACEBOOK_SUCCESS: 'Facebook Login Success',
  },
  SIGN_UP_REGISTRATION: {
    MAGIC_LINK_CLICKED: 'Email Magic Link Clicked',
    FACEBOOK_SUCCESS: 'Facebook Registration Success',
  },
  SIGN_UP_COMPLETE: {
    CLOSED_PURCHASE_POPOP: 'Closed purchase popup',
    SUBSCRIPTION_TYPE: 'Subscription Type',
    OPENED_HELP: 'Opened Help',
  },
  PRODUCT_INTERACTIONS: {
    PRODUCTS_LOADED: 'Products Loaded',
    SCROLLED: 'Scrolled',
    TERMS_USE: 'Terms of Use opened',
    PRIVACY_POLICY: 'Privacy Policy opened',
    HELP: 'Help opened',
    BUY_CTA_CLICKED: 'Buy CTA clicked',
    USER_CANCEL: 'User cancelled',
    CLOSED_PAGE: 'Closed page',
    CLOSED_PAGE_BACK_BTN: 'Closed Page Via Back Button',
    APP_STATE: 'App state changed',
    TRY_VERIFY: 'Try verify receipt',
    ERROR_BUYING: 'Error buying',
    ERROR_FETCHING: 'Error fetching products',
    ERROR_VERIFY: 'Error verifying history',
    PAGE: 'Page',
  },
  PLAYER_INDEX_ACTION: {
    TYPE: 'Type',
    POSITION: 'Position',
    PLAYER: 'Player',
  },
  DISCOVERY_INTERACTIONS: {
    SIGN_POST_CTA: 'Sign Post CTA',
    CAROUSEL_ARROW: 'Carousel Arrow',
    SECTION_ARROW: 'Section Arrow',
    CAROUSEL_BUTTON: 'Carousel Button',
  },
  COMMENT_SPOTLIGHT: {
    NUMBER_OF_LIKES_CLICKED: 'Number of likes clicked',
    SEE_TRANSLATION_CLICKED: 'See translation clicked',
    SEE_ORIGINAL_CLICKED: 'See original clicked',
    ADD_A_COMMENT_CLICKED: 'Add a comment clicked',
    COMMENT_UNLIKED: 'Comment unliked',
    VIEW_ALL_COMMENTS_CLICKED: 'View all comments clicked',
  },
  COMMENTS_PAGE: {
    VIEW_REPLIES_CLICKED: 'View replies clicked',
    VIEW_PREVIOUS_REPLIES_CLICKED: 'View previous replies clicked',
    VIEW_MORE_REPLIES_CLICKED: 'View more replies clicked',
    HIDE_REPLIES_CLICKED: 'Hide replies clicked',
    HIDE_PREVIOUS_REPLIES_CLICKED: 'Hide previous replies clicked',
    GREEN_HIGHLIGHT_PRESENT: 'Green highlight present',
  },
  CONTENT_DETAIL_INTERACTIONS: {
    PLAYER_AVATAR_CLICKED: 'Player Avatar Clicked',
    PLAYER_NAME: 'Player Name',
    PLAYER_CLICKED_IN_COMMENTS: 'Player clicked in comments',
    SECONDARY_CTA: 'Secondary CTA',
    SCROLL_DEPTH: 'Scroll depth',
    UP_NEXT_WINDOW_LAUNCHED: 'Up next window launched',
    UP_NEXT_CONTENT_CLICK: 'Up next content click',
    UP_NEXT_WINDOWN_HIDE: 'Up next window hide',
    UP_NEXT_WINDOW_REVEAL: 'Up next window reveal',
    FIRST_TO_COMMENT_CTA: 'First to comment CTA',
  },
};

export const PropertyKeyValues = {
  PRODUCT_INTERACTIONS: {
    APP_STATE: {
      LOST_FOCUS: 'Window lost focus',
    },
    PAGE: {
      PRODUCTS: 'Choose product',
      PAYMENT: 'Payment',
    },
  },
  PLAYER_INDEX_ACTION: {
    TYPE: {
      CLICK: 'Profile click',
    },
  },
};
