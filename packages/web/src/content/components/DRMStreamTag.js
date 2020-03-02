import {
  isWinPhone,
  isIOS,
  isChrome,
  osVersion,
  isMobile,
  isMobileSafari,
  isSafari,
  isAndroid,
  isFirefox,
  isEdge,
  isIE,
} from 'react-device-detect';

import * as compareVersions from 'compare-version'; // to semantic versions compare
import { StreamTag, Implementation } from 'xi-core/content/drmSupport';
/**
 * Check browser and platform to detect supported tag
 *
 * Below table presents dependency between Platform browser and Codec
 *
 * To have full references please @see: https://support.theoplayer.com/hc/en-us/articles/208340469-Support-Matrix
 *
 * FP - FairPlay
 * PR - PlayReady
 * WV - WideVine
 *
 * Platform                        Browser       DRM    Codec
 *
 * iOS 11+                         Safari        FP     hevc, h264, * hevc on older devices is more cpu consuming and can performance issues
 * iOS <11                         Safari        FP     h264
 *
 * MacOS 10.13(High Sierra)+       Safari        FP     hevc, h264, * hevc on older devices is more cpu consuming and can performance issues
 * MacOS <10.13(High Sierra)       Safari        FP     h264
 * MacOS                           Chrome, FF    WV     VP9, h264, * needs detection if VP9 in mp4 container is supported on device. Thins should be clarified by TheOPlayer.
 *
 * Android                         Chrome        WV     VP9, h264, * needs detection if VP9 in mp4 container is supported on device. Thins should be clarified by TheOPlayer.
 *
 * Win PC                          IE11, Win8.1+ PR     not supported, no PlayReady in OSC stack.
 * Win PC                          Edge, Win10+  PR     not supported, no PlayReady in OSC stack.
 *
 * Win PC                          Chrome, FF    WV     VP9, h264, * needs detection if VP9 in mp4 container is supported on device. Thins should be clarified by TheOPlayer.
 *
 * Linux PC                        Chrome, FF    WV     VP9, h264, * needs detection if VP9 in mp4 container is supported on device. Thins should be clarified by TheOPlayer.
 *
 *
 * @returns {string | null} // null in case when any strategy doesn't fit
 */
export function detectSupportedTag() {
  // Please be noticed that below code is POC, containing many gaps and probably bugs. This is just to show how detection looks like.
  // The best idea is to implement each Platform/Browser case by case to return properly codec

  if (isIOS) {
    // Apple mobile devices

    // On mobile Chrome is supported only H264
    if (isMobile && isChrome) {
      // to exclude wearable
      return StreamTag.H264;
    }

    // On mobile safari supported codecs depends on OS version
    if (isMobileSafari) {
      if (compareVersions(osVersion, '11') >= 0) {
        // semantic version compare
        // return StreamTag.HEVC;
        return StreamTag.H264;
      } else {
        return StreamTag.H264;
      }
    }
    return null; // probably wearable, not supported
  }

  // on desktop Safari, supported codec depends from OS version
  if (isSafari) {
    if (compareVersions(osVersion, '10.13') >= 0) {
      // return StreamTag.HEVC;
      return StreamTag.H264;
    } else {
      return StreamTag.H264;
    }
  }

  // next case we are on android device and chrome browser
  if (isAndroid && isChrome) {
    return StreamTag.H264; // @todo need to clarify how to use TheOPlayer to detect VP9 support
  }

  // above android and apple mobiles were handled, below this comment we are probably on desktop devices

  if (!isIOS && !isAndroid && !isWinPhone && (isChrome || isFirefox)) {
    // desktop platform win on mac
    return StreamTag.H264; // @todo need to clarify how to use TheOPlayer to detect VP9 support, then for chrome we can return VP9 and for firefox H264
  }

  if (isEdge || isIE) {
    return StreamTag.H264;
  }

  // Windows + Edge is not supported, this is ongoing, and in the future should be covered

  // Windows + Edge is not supported because lack of PlayReady in DRM stack
  return null;
}

export function supportedImplemention() {
  if (isIOS) {
    return Implementation.FAIRPLAY;
  }

  if (isSafari) {
    return Implementation.FAIRPLAY;
  }

  if (isEdge || isIE) {
    return Implementation.PLAYREADY;
  }

  return Implementation.WIDEVINE;
}
