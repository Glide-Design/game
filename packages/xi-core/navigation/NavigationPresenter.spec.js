import TreeModel from 'tree-model';
import navPresenter from './NavigationPresenter';

describe('navigation presenter', () => {
  beforeEach(() => {
    const tree = function() {
      let webTree = new TreeModel();
      let webRoot = webTree.parse({
        id: 'app',
        displayMode: 'standard',
        children: [
          {
            id: 'discovery',
            label: 'Discover',
          },
          {
            id: 'stars',
            label: 'Stars',
            url: () => {
              return '/stars';
            },
            children: [
              {
                id: 'star',
                label: 'Star',
                url: model => {
                  return '/star/' + model.currentStar;
                },
                children: [
                  {
                    id: 'content',
                    label: 'Content',
                    actionIfHistory: 'GO_BACK',
                    children: [
                      {
                        id: 'comments',
                        label: 'Comments',
                        hideNavBar: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'profile',
            label: 'Profile',
            displayMode: 'standard',
          },
          {
            id: 'join',
            label: 'Join',
            displayMode: 'standard',
          },
          {
            id: 'section',
            label: 'Section',
            forwardDisplayMode: 'standard',
            url: () => {
              return '/content';
            },
            displayMode: 'standard',
          },
        ],
      });
      return webRoot;
    };
    navPresenter.setTree(tree);
  });

  describe('convertAppRoutes()', () => {
    it('will convert the routes correctly', () => {
      const importedRoutes = {
        discovery: {
          path: '/',
        },
        activate: {
          path: '/activate',
        },
        login: {
          path: '/login',
        },
      };
      navPresenter.convertAppRoutes(importedRoutes);

      expect(navPresenter.appRoutes.length).toEqual(3);
      expect(navPresenter.appRoutes[0].path).toEqual('/');
      expect(navPresenter.appRoutes[0].section).toEqual('discovery');
    });
  });

  describe('selectCorrectSectionFromLocation()', () => {
    it('will set the correct section given a known path', () => {
      const importedRoutes = {
        discovery: {
          path: '/',
        },
        star: {
          path: '/star/:id',
        },
        login: {
          path: '/login',
        },
      };
      navPresenter.convertAppRoutes(importedRoutes);
      navPresenter.selectCorrectSectionFromLocation({ pathname: '/star/12324' });

      expect(navPresenter.vm.currentLocation).toEqual('star');
    });
  });

  describe('moveback()', () => {
    beforeEach(() => {
      const importedRoutes = {
        discovery: {
          path: '/',
        },
        stars: {
          path: '/stars',
        },
        content: {
          path: '/content/:id',
        },
        star: {
          path: '/star/:id',
        },
        login: {
          path: '/login',
        },
      };
      navPresenter.convertAppRoutes(importedRoutes);
    });

    it('will return the correct return URL', () => {
      navPresenter.selectCorrectSectionFromLocation({ pathname: '/star/12345' });
      expect(navPresenter.moveBack()).toEqual('/stars');
    });

    it('will compose URL correctly for a star page', () => {
      navPresenter.selectCorrectSectionFromLocation({ pathname: '/content/45678' });
      navPresenter.vm.currentStar = '12345';
      expect(navPresenter.moveBack()).toEqual('/star/12345');
    });

    it('will give instruct to go back in history if there is a force action if history exists', () => {
      const importedRoutes = {
        discovery: {
          path: '/',
        },
        star: {
          path: '/star/:id',
        },
        login: {
          path: '/login',
        },
      };
      navPresenter.convertAppRoutes(importedRoutes);
      navPresenter.selectCorrectSectionFromLocation({ pathname: '/star/12324' });
      navPresenter.selectCorrectSectionFromLocation({ pathname: '/content/12324' });
    });
  });

  describe('isMenuHidden()', () => {
    it('will return the false if flag is not set', () => {
      navPresenter.vm.currentLocation = 'star';
      expect(navPresenter.isMenuHidden()).toEqual(false);
    });

    it('will return the true if flag is set', () => {
      navPresenter.vm.currentLocation = 'comments';
      expect(navPresenter.isMenuHidden()).toEqual(true);
    });
  });
});
