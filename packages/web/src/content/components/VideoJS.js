import React from 'react';
import videojs from 'video.js';
import { map } from 'lodash';
import qualityLevels from 'videojs-contrib-quality-levels';
import hlsQualitySelector from 'videojs-hls-quality-selector';
import { browserIsIOSSafari, browserIsIOSChrome } from 'xi-core/utils/browser';

/* eslint-disable */
// Disabling eslint because it does not recognize the dynamically generated tracks
export default class VideoPlayer extends React.Component {
  componentDidMount = () => {
    // instantiate Video.js and register plugins for quality selector
    const { props, videoNode } = this;
    if (
      typeof videojs.getPlugin('qualityLevels') === 'undefined' &&
      typeof videojs.getPlugin('hlsQualitySelector') === 'undefined'
    ) {
      videojs.registerPlugin('qualityLevels', qualityLevels);
      videojs.registerPlugin('hlsQualitySelector', hlsQualitySelector);
    }
    videojs.options.hls.overrideNative = true;
    videojs.options.html5.nativeTextTracks = browserIsIOSSafari || browserIsIOSChrome;
    this.player = videojs(
      this.videoNode,
      {
        ...props,
        plugins: {
          qualityLevels: {},
          hlsQualitySelector: {},
        },
        hls: {
          overrideNative: true,
        },
      },
      function onPlayerReady() {
        props.onInit(videoNode, this);
      }
    );

    // Wiring custom timeupdate event to match existing implementations
    this.player.on('timeupdate', e => {
      const event = {};
      event.currentTime = this.player.currentTime();
      event.duration = this.player.duration();
      props.onTimeUpdate(event);
    });
  };

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={node => {
              this.videoNode = node;
            }}
            className="video-js"
            playsInline={true}
          >
            {map(this.props.textTracks, (track, index) => (
              <track
                key={index}
                kind={track.kind}
                src={track.src}
                srcLang={track.srclang}
                label={track.label}
                default={track.default}
              />
            ))}
          </video>
          {this.props.spline}
        </div>
      </div>
    );
  }
}
