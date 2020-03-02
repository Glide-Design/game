import { matchPath } from 'react-router-dom';
import { find, flow, uniq, map, isEqual } from 'lodash/fp';

class NavigationPresenter {
  constructor() {
    this.vm = {
      buttonType: 'text',
      buttonText: '',
      currentLocation: '',
      currentStar: null,
      currentGallery: null,
      routeTracking: [],
      sectionTracking: [],
      currentContent: null,
    };
  }

  convertAppRoutes(routes) {
    let keys = Object.keys(routes);
    let convertedRoutes = [];
    keys.forEach(section => {
      let path = routes[section];
      convertedRoutes.push({
        path: path.path,
        section: section,
      });
    });
    this.appRoutes = convertedRoutes;
  }

  setTree(tree) {
    this.tree = tree;
  }

  getCurrentRoot() {
    return this.vm.sectionTracking[0];
  }

  setCurrentRoot(root) {
    this.vm.sectionTracking = [];
    this.vm.sectionTracking.push(root);
  }

  selectCorrectSectionFromLocation(location) {
    const matchedRoute = find(routeMatch => {
      routeMatch.exact = true;
      if (matchPath(location.pathname, { ...routeMatch })) {
        return routeMatch;
      }
    }, this.appRoutes);

    if (matchedRoute) {
      if (this.vm.routeTracking[this.vm.routeTracking.length - 1] !== location.pathname) {
        this.vm.routeTracking.push(location.pathname);
      }
      this.vm.currentLocation = matchedRoute.section;

      let tree = this.tree();
      let currentNode = tree.first(node => {
        return node.model.id === matchedRoute.section;
      });

      if (currentNode.parent.model.id === 'app') {
        this.vm.sectionTracking = [];
      }

      const currentSection = matchedRoute.section + (location.hash || '');
      const lastSection = this.vm.sectionTracking[this.vm.sectionTracking.length - 1];
      if (lastSection !== currentSection) {
        this.vm.sectionTracking.push(currentSection);
      }
    }
  }

  removeHash(section) {
    return section.split('#')[0];
  }

  extractHash(section) {
    if (!section) {
      return '';
    }
    let parts = section.split('#');

    return parts.length > 1 ? parts[1] : '';
  }

  moveBack() {
    let tree = this.tree();

    let currentSection = this.vm.sectionTracking.pop();
    if (currentSection === this.vm.sectionTracking[this.vm.sectionTracking.length - 1]) {
      return 'GO_BACK';
    }

    let previousHash = this.extractHash(
      this.vm.sectionTracking[this.vm.sectionTracking.length - 1]
    );

    if (this.vm.sectionTracking.length > 0) {
      const sectionIds = flow(
        map(this.removeHash),
        uniq
      )(this.vm.sectionTracking);

      const parentNode = tree.first(node => {
        // our section ids never include the root but getPath will
        const pathWithoutRoot = node.getPath().slice(1);
        const pathIds = map(node => node.model.id, pathWithoutRoot);

        return isEqual(pathIds, sectionIds);
      });
      return parentNode.model.url(this.vm, previousHash ? previousHash : '');
    } else {
      const currentNode = tree.first(node => {
        return node.model.id === this.removeHash(currentSection);
      });
      return currentNode.parent.model.url(this.vm, previousHash ? previousHash : '');
    }
  }

  setCurrentStar(starId) {
    this.vm.currentStar = starId;
  }

  setCurrentContent(contentId) {
    this.vm.currentContent = contentId;
  }

  setCurrentGallery(galleryId) {
    this.vm.currentGallery = galleryId;
  }

  isMenuHidden() {
    let tree = this.tree();
    let currentNode = tree.first(node => {
      return node.model.id === this.vm.currentLocation;
    });
    return currentNode ? !!currentNode.model.hideNavBar : false;
  }
}

export default new NavigationPresenter();
