var MissingChunkForceReload = 'chunkMFR';

function hasScriptRunRecently() {
  try {
    var lastReloadStringValue = localStorage.getItem(MissingChunkForceReload);
    if (lastReloadStringValue) {
      var now = Date.now();
      var lastReloadTime = Number(lastReloadStringValue);
      var sixtySeconds = 1000 * 60;
      if (now - lastReloadTime < sixtySeconds) {
        return true;
      }
      return false;
    }
  } catch (e) {
    return null;
  }
}

function storeCurrentTime() {
  try {
    var time = Date.now();
    localStorage.setItem(MissingChunkForceReload, time.toString());
  } catch (e) {}
}

function showUpdatingScreenAndReload() {
  var refreshDestination = window.location.href;
  var hasQuery = refreshDestination.indexOf('?') > -1;
  refreshDestination = refreshDestination + (hasQuery ? '&' : '?') + 'cb=' + Date.now();

  var serviceWorkerUpdatingScreen = document.getElementById('serviceWorkerUpdatingScreen');
  if (serviceWorkerUpdatingScreen) {
    serviceWorkerUpdatingScreen.style.display = 'flex';
    setTimeout(() => {
      window.location = refreshDestination;
    }, 2500);
  } else {
    window.location = refreshDestination;
  }
}

if (!hasScriptRunRecently()) {
  storeCurrentTime();
  showUpdatingScreenAndReload();
}
