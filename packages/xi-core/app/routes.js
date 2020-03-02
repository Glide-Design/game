export default ({ paramStyle = 'web' } = {}) => {
  const createParam = param => {
    if (paramStyle === 'web') {
      return `:${param}`;
    } else if (paramStyle === 'node') {
      return `{${param}}`;
    } else {
      throw new Error('Unkown route param style');
    }
  };

  return {
    discovery: {
      path: '/',
    },
    activate: {
      path: '/activate',
    },
    login: {
      path: '/login',
    },
    loginCode: {
      path: '/login-code',
    },
    joinotro: {
      path: '/joinotro',
    },
    join: {
      path: '/join',
    },
    signin: {
      path: '/signin',
    },
    profile: {
      path: '/profile',
    },
    editProfile: {
      path: '/edit-profile',
    },
    playerProfile: {
      path: `/star/${createParam('starId')}`,
    },
    timeline: {
      path: `/star/${createParam('starId')}/timeline/${createParam('galleryId')}/`,
    },
    content: {
      path: `/content/${createParam('contentId')}`,
    },
    settings: {
      path: '/settings',
    },
    search: {
      path: '/search',
    },
    myLocker: {
      path: '/locker',
    },
    stars: {
      path: '/stars',
    },
    myAccount: {
      path: '/account',
    },
    // updatePayment: {
    //   path: '/update-payment',
    // },
    contactPreferences: {
      path: '/contact-preferences',
    },
    // membership: {
    //   path: '/membership',
    // },
    // payments: {
    //   path: '/payments',
    // },
    language: {
      path: '/language',
    },
    help: {
      path: '/help',
    },
    invite: {
      path: '/invite',
    },
    // unlimited: {
    //   path: '/unlimited',
    // },
    appLanding: {
      path: '/app-landing',
    },
    playerProfileVanity: {
      path: `/${createParam('starId')}`,
    },
    contentIndex: {
      path: `/content-index/${createParam('contentIndexId')}`,
    },
  };
};
