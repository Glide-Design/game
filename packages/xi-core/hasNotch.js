import { get } from 'lodash/fp';

export const hasNotchNative = ({ state, isIOS }) => {
  const orientation = get('viewport.orientation', state);
  const screenHeight =
    orientation === 'portrait' ? get('viewport.height', state) : get('viewport.width', state);

  return (
    isIOS &&
    (screenHeight === 812 || screenHeight === 896 || screenHeight === 1218 || screenHeight === 1344)
  );
};

function hasNotch() {
  try {
    return (
      (/iphone/i.test(window.navigator.userAgent) && window.screen.height === 812) ||
      window.screen.height === 896 ||
      window.screen.height === 1218 ||
      window.screen.height === 1344
    );
  } catch (e) {
    return false;
  }
}

export default hasNotch;
