const registerCustomVideoJsEvents = () => {
  window.registerVideoJsEvents = function(player, playerObject, sendEvent) {
    function isAdvert() {
      const ads = playerObject.ads || playerObject.source.ads;
      return ads.playing || false;
    }

    function getAdBreak() {
      if (isAdvert()) {
        const ads = playerObject.ads || playerObject.source.ads;
        return ads.currentAdBreak;
      }
    }

    function decorateWithAds(event) {
      return Object.assign({}, event, {
        isAdvert: isAdvert(),
        currentAdBreak: getAdBreak(),
      });
    }

    player.on(['useractive', 'userinactive'], function(e) {
      // Native show/hide back button
      sendEvent('onUiVisibilityChanged', { visible: e.type === 'useractive' });
    });

    player.on('playing', function(e) {
      sendEvent('onPlaying', decorateWithAds({ currentTime: this.player().currentTime() }));
    });
    player.on('play', function(e) {
      sendEvent('onPlay', decorateWithAds({ currentTime: this.player().currentTime() }));
    });
    player.on('pause', function(e) {
      sendEvent('onPause', decorateWithAds({ currentTime: this.player().currentTime() }));
    });
    player.on('ended', function(e) {
      sendEvent('onEnded', decorateWithAds({ currentTime: this.player().currentTime() }));
    });
    player.on('timeupdate', function(e) {
      sendEvent(
        'onProgress',
        decorateWithAds({
          currentTime: this.player().currentTime(),
          duration: this.player().duration(),
        })
      );
    });
    player.on('seeked', function(e) {
      sendEvent('onSeek', decorateWithAds({ currentTime: this.player().currentTime() }));
    });
    player.on('readystatechange', function(e) {
      sendEvent(
        'onReadystatechange',
        decorateWithAds({
          currentTime: this.player().currentTime(),
          readyState: this.player().readyState(),
        })
      );
    });
  };

  window.postVideoJsEvent = null;
  // In native apps
  if (
    window.player &&
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.userEvent
  ) {
    // iOS
    window.postVideoJsEvent = function(handlerName, eventData) {
      // If we use JSON.stringify, VideoJS auto-unwraps it, and we get a dict in Swift. We need a regular
      // string to be compatible with android, which only accepts strings. So we use a custom encoding
      // format
      window.webkit.messageHandlers.userEvent.postMessage(
        handlerName + ':' + JSON.stringify(eventData)
      );
    };
  } else if (window.player && window.videoplayerAndroid) {
    // Android
    window.postVideoJsEvent = function(handlerName, eventData) {
      window.videoplayerAndroid.sendMessage(
        'userEvent',
        handlerName + ':' + JSON.stringify(eventData)
      );
    };
  }

  // In native apps
  if (window.postVideoJsEvent != null) {
    window.registerVideoJsEvents(window.player, window.postVideoJsEvent);
  }
};

export default registerCustomVideoJsEvents;
