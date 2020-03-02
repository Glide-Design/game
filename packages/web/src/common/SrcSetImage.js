import React from 'react';
import { TRANSPARENT_IMG_PLACEHOLDER } from 'xi-core/creatives/chooseCreativeByRatio';

const FallBackImageSrc = TRANSPARENT_IMG_PLACEHOLDER;

const devicePixelRatio = window.devicePixelRatio;

class SrcSetImage extends React.Component {
  imageStatus = null;

  getImageRef = ref => {
    if (!this.imageRef && ref) {
      this.imageRef = ref;
      this.forceUpdate();
    }
    return this.imageRef;
  };

  onLoad = e => {
    if (this.imageStatus === null) {
      this.imageStatus = true;
      const { loaded } = this.props;
      loaded && loaded();
    }
  };

  onError = e => {
    if (this.imageStatus === null) {
      this.imageStatus = false;
      e.target.src = FallBackImageSrc;
      const { loaded } = this.props;
      loaded && loaded();
    }
  };

  render() {
    const { imgSources, className, alt = '', onClick, width, height } = this.props;

    const sources = {};
    if (this.imageRef) {
      Object.assign(sources, imgSources);
      sources.sizes = this.imageRef.clientWidth
        ? this.imageRef.clientWidth / devicePixelRatio + 'px'
        : null;
    }

    /* crossorigin="anonymous" drasticially reduces the img size in cache
       https://stackoverflow.com/questions/39109789/what-limitations-apply-to-opaque-responses */

    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
    return (
      <img
        className={className}
        {...sources}
        ref={this.getImageRef}
        alt={alt}
        onClick={onClick}
        width={width}
        height={height}
        onLoad={this.onLoad}
        onError={this.onError}
        crossOrigin="anonymous"
      />
    );
  }
}

export default SrcSetImage;
