import { css } from 'styled-components';

export const Orientation = {
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
};

export const CoreDevices = {
  tiny: '(max-width: 320px)',
  small: '(min-width: 321px) AND (max-width: 699px)',
  medium: '(min-width: 700px) AND (max-width: 1024px)',
  large: '(min-width: 1025px)',
};

export const MediaQueries = {
  tinyPortrait: `${CoreDevices.tiny} AND ${Orientation.portrait}`,
  smallPortrait: `${CoreDevices.small} AND ${Orientation.portrait}`,

  tinyLandscape: `(max-width: 568px) AND ${Orientation.landscape}`,
  smallLandscape: `(min-width: 569px) AND (max-width: 812px) AND ${Orientation.landscape}`,
  mediumLandscape: `(min-width: 813px) AND (max-width: 1024px) AND ${Orientation.landscape}`,
};

export const HelperDevices = {
  belowMedium: CoreDevices.tiny + ', ' + CoreDevices.small,
  belowMediumPortrait: MediaQueries.tinyPortrait + ', ' + MediaQueries.smallPortrait,
  belowMediumLandscape: MediaQueries.tinyLandscape + ', ' + MediaQueries.smallLandscape,
};

export const ROW_HEIGHT_PX = 8;

export const NAVBAR_HEIGHT_PX = { tiny: 61, small: 61, medium: 50, large: 72 };
export const TOOLBAR_HEIGHT_PX = { tiny: 52, small: 52, medium: 52, large: 72 };

export const LIST_ITEM_BORDER_PX = 8;

export const LIST_ITEM_ASPECT_RATIO = 0.77;

export const SIDE_MARGIN_PX = {
  tiny: 21,
  small: 24,
  medium: 42,
  large: 86,
};

export const getViewportDetails = () => {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return {
    width,
    height,
    orientation: width > height ? 'landscape' : 'portrait',
    targetDevice: window.matchMedia(CoreDevices.tiny).matches
      ? 'tiny'
      : window.matchMedia(CoreDevices.small).matches
      ? 'small'
      : window.matchMedia(CoreDevices.medium).matches
      ? 'medium'
      : 'large',
  };
};

export const SECTION_HEIGHT_VH = 80;

/* For position: fixed elements ONLY */
export const posFixedZIndex = {
  navBar: 2,
  // Video player should be above navBar (so it doesn't interfere with fullscreen)
  // and below the fixToolbar so the back button is still available above the player
  videoContainer: 3,
  fixedToolbar: 4,
  fullSreenContainer: 5,
  signupBanner: 6,
  popUp: 7,
  popUpLevel2: 8,
  cookie: 9,
  snackBar: 9,
  progressBar: 9,
  serviceWorkerUpdating: 10, // Should always be last
};

export const ContainerPaddingCss = css`
  padding-left: ${SIDE_MARGIN_PX.tiny}px;
  padding-right: ${SIDE_MARGIN_PX.tiny}px;
  @media ${CoreDevices.small} {
    padding-left: ${SIDE_MARGIN_PX.small}px;
    padding-right: ${SIDE_MARGIN_PX.small}px;
  }
  @media ${CoreDevices.medium} {
    padding-left: ${SIDE_MARGIN_PX.medium}px;
    padding-right: ${SIDE_MARGIN_PX.medium}px;
  }
  @media ${CoreDevices.large} {
    padding-left: ${SIDE_MARGIN_PX.large}px;
    padding-right: ${SIDE_MARGIN_PX.large}px;
  }
`;

export const ContainerTransition = 'opacity 0.2s';
