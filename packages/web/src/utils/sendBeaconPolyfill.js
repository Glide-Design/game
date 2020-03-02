const MAX_TIMEOUT = 300;

const isBlob = val => val instanceof Blob;
const isString = val => typeof val === 'string';
const isSupported = global => Boolean(global.navigator && global.navigator.sendBeacon);

const installPolyfill = global => {
  const sendBeacon = (global, url, data) => {
    const event = global.event && global.event.type;
    const sync = event === 'unload' || event === 'beforeunload';

    const xhr = new global.XMLHttpRequest();

    xhr.open('POST', url, !sync);
    xhr.timeout = MAX_TIMEOUT;
    xhr.withCredentials = true;
    xhr.setRequestHeader('Accept', '*/*');

    if (isString(data)) {
      xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
      xhr.responseType = 'text/plain';
    } else if (isBlob(data) && data.type) {
      xhr.setRequestHeader('Content-Type', data.type);
    }

    try {
      xhr.send(data);
    } catch (error) {
      return false;
    }

    return true;
  };

  if (isSupported(global)) {
    return undefined;
  }

  if (!global.navigator) {
    global.navigator = {};
  }

  global.navigator.sendBeacon = sendBeacon.bind(global);
};

export default installPolyfill;
