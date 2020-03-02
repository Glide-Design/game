import TreeModel from 'tree-model';

let webTree = null;
let webRoot = null;

const playerProfileUrlMethod = (model, hash) => {
  let url = '/star/' + model.currentStar;

  if (hash) {
    url += '#' + hash;
  }

  return url;
};

const tree = function() {
  if (!webTree) {
    webTree = new TreeModel();
    webRoot = webTree.parse({
      id: 'app',
      displayMode: 'standard',
      url: () => {
        return '/';
      },
      children: [
        {
          id: 'discovery',
          label: 'Discovery',
          url: () => {
            return '/';
          },
          children: [
            {
              id: 'section',
              label: 'Section',
            },
            {
              id: 'content',
              label: 'Content',
              url: model => {
                return '/content/' + model.currentContent;
              },
            },
            {
              id: 'contentIndex',
              label: 'ContentIndex',
              url: model => {
                return '/content-index/' + model.currentContent;
              },
            },
            {
              id: 'playerProfile',
              label: 'Star',
              url: playerProfileUrlMethod,
              children: [
                {
                  id: 'content',
                  label: 'Content',
                  url: model => {
                    return '/content/' + model.currentContent;
                  },
                },
                {
                  id: 'timeline',
                  label: 'Timeline',
                  hideNavBar: true,
                  url: model => {
                    return '/star/' + model.currentStar + '/timeline/' + model.currentGallery;
                  },
                },
              ],
            },
            {
              id: 'profile',
              label: 'Profile',
              url: model => {
                return '/profile';
              },
            },
          ],
        },
        {
          id: 'stars',
          label: 'Stars',
          url: () => {
            return '/stars';
          },
          children: [
            {
              id: 'playerProfileVanity',
              label: 'Star',
              url: model => {
                return '/star/' + model.currentStar;
              },
            },
            {
              id: 'playerProfile',
              label: 'Star',
              url: playerProfileUrlMethod,
              children: [
                {
                  id: 'content',
                  label: 'Content',
                  url: model => {
                    return '/content/' + model.currentContent;
                  },
                },
                {
                  id: 'timeline',
                  label: 'Timeline',
                  hideNavBar: true,
                  url: model => {
                    return '/star/' + model.currentStar + '/timeline/' + model.currentGallery;
                  },
                },
              ],
            },
          ],
        },
        {
          id: 'search',
          label: 'Search',
          url: () => {
            return '/search';
          },
          children: [
            {
              id: 'content',
              label: 'Content',
              url: model => {
                return '/content/' + model.currentContent;
              },
            },
            {
              id: 'playerProfile',
              label: 'Star',
              url: playerProfileUrlMethod,
              children: [
                {
                  id: 'content',
                  label: 'Content',
                  url: model => {
                    return '/content/' + model.currentContent;
                  },
                },
                {
                  id: 'timeline',
                  label: 'Timeline',
                  hideNavBar: true,
                  url: model => {
                    return '/star/' + model.currentStar + '/timeline/' + model.currentGallery;
                  },
                },
              ],
            },
          ],
        },
        {
          id: 'profile',
          label: 'Profile',
          url: model => {
            return '/profile';
          },
          children: [
            {
              id: 'editProfile',
              label: 'Edit Profile',
            },
            {
              id: 'myLocker',
              label: 'My Locker',
              displayMode: 'standard',
              url: () => {
                return '/locker';
              },
              children: [
                {
                  id: 'content',
                  label: 'Content',
                  url: model => {
                    return '/content/' + model.currentContent;
                  },
                },
              ],
            },
            {
              id: 'settings',
              label: 'Settings',
              url: () => {
                return '/settings';
              },
              children: [
                {
                  id: 'contactPreferences',
                  label: 'Contact Preferences',
                  displayMode: 'standard',
                  url: () => {
                    return '/contact-preferences';
                  },
                },
                {
                  id: 'myAccount',
                  label: 'My Account',
                  displayMode: 'standard',
                  url: () => {
                    return '/account';
                  },
                  // children: [
                  // {
                  //   id: 'membership',
                  //   label: 'Membership',
                  //   displayMode: 'standard',
                  //   url: () => {
                  //     return '/membership';
                  //   },
                  // },
                  // {
                  //   id: 'updatePayment',
                  //   label: 'Update Payment',
                  //   displayMode: 'standard',
                  //   url: () => {
                  //     return '/update-payment';
                  //   },
                  // },
                  // {
                  //   id: 'payments',
                  //   label: 'Payments',
                  //   displayMode: 'standard',
                  //   url: () => {
                  //     return '/payments';
                  //   },
                  // },
                  // ],
                },
                {
                  id: 'language',
                  label: 'Language',
                  displayMode: 'standard',
                  url: () => {
                    return '/language';
                  },
                },
              ],
            },
          ],
        },
        {
          id: 'joinotro',
          label: 'JoinOtro',
          displayMode: 'standard',
        },
        {
          id: 'join',
          label: 'Join',
          displayMode: 'standard',
        },
        {
          id: 'loginCode',
          label: 'LoginCode',
          displayMode: 'standard',
        },
        {
          id: 'signin',
          label: 'SignIn',
          displayMode: 'standard',
        },
        {
          id: 'login',
          label: 'Login',
          displayMode: 'standard',
        },
        {
          id: 'activate',
          label: 'Activate',
          displayMode: 'standard',
        },
        {
          id: 'invite',
          label: 'Invite',
          displayMode: 'standard',
        },
        {
          id: 'help',
          label: 'Help',
          displayMode: 'standard',
        },
        // {
        //   id: 'unlimited',
        //   label: 'unlimited',
        //   displayMode: 'standard',
        // },
        {
          id: 'section',
          label: 'Section',
          forwardDisplayMode: 'standard',
          url: () => {
            return '/content';
          },
          displayMode: 'standard',
        },
        {
          id: 'appLanding',
          label: 'App Landing',
          displayMode: 'standard',
          hideNavBar: true,
          url: () => {
            return '/app-landing';
          },
        },
      ],
    });
  }

  return webRoot;
};

export default tree;
