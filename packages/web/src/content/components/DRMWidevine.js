import { getDRMLicenseAquisitionUrl } from 'xi-core/config/selectors';
import store from '../../state/store';

/*
This class has been created from an xtream example
*/

export default ({ player, source, drmId, accessToken }) => {
  let state = store.getState();
  let licenseAcquisitionURL = getDRMLicenseAquisitionUrl(state);
  console.log(licenseAcquisitionURL);
  let licenseUrlFromTicket;

  source.sources[0].contentProtection = {
    widevine: {
      licenseAcquisitionURL: licenseAcquisitionURL,
    },
  };
  player.source = source;

  // adding interceptors to manipulate license requests and responses.
  player.network.addRequestInterceptor(
    widevineLicenseRequestInterceptor.bind(this, drmId, accessToken || '')
  );

  player.network.addResponseInterceptor(widevineLicenseResponseInterceptor);

  console.warn('Fetch will not work in IE11');

  // verify if url is is from license or ticket requests
  function isLicenseRequest(url) {
    return url === licenseAcquisitionURL || url === licenseUrlFromTicket;
  }

  function asJson(response) {
    return response.json();
  }
  function reportError(error) {
    console.error('Error:', error);
  }

  // obtain drm ticket from xstream
  function getTicket(streamId, sessionToken, request, callback) {
    // prepare request body for ticket request
    var reqParams = {
      drmType: 'widevine_modular',
      licenseType: 'non-persistent',
      streamId: streamId,
    };
    // prepare headers for ticket request
    var reqHeaders = {
      'Content-Type': 'application/json',
    };
    // if session token is provided, include it in ticket header.
    if (sessionToken.length > 0) {
      reqHeaders['XSSESSION'] = sessionToken;
    }

    // make ticket request
    fetch(request.url, {
      method: 'POST',
      body: JSON.stringify(reqParams),
      headers: reqHeaders,
    })
      .then(asJson)
      .catch(reportError)
      .then(function(resp) {
        // when received response from ticket request, manipulate license request
        getLicense(resp.ticket, resp.licenseServerUrl, request);
        callback();
      });
  }

  // manipulate license request to pass xstream requirements
  function getLicense(ticket, LicenseReqUrl, request) {
    try {
      // make sure using https!
      LicenseReqUrl = LicenseReqUrl.replace('http://', 'https://');
      // save license acquisition url for future url checking
      licenseUrlFromTicket = LicenseReqUrl;

      var rawLicenseRequest = new Uint8Array(request.body);
      // create the wrapped request structure.
      var wrapped = {
        payload: null,
        ticket: null,
      };
      // encode the raw license request in base64.
      // the server we are using in this tutorial expects this field and this
      // encoding for the raw request.
      wrapped.payload = btoa(String.fromCharCode.apply(null, rawLicenseRequest));

      // include ticket required by xstream license server
      wrapped.ticket = ticket;
      // encode the wrapped request as JSON.
      var wrappedJson = JSON.stringify(wrapped);
      // convert the JSON string back into a Uint8Array to replace the request body.
      var body = new Uint8Array(wrappedJson.length);
      for (let i = 0; i < wrappedJson.length; ++i) {
        body[i] = wrappedJson.charCodeAt(i);
      }
      // redirect THEOplayer license request to xstream license url.
      // use prepared body, including payload and ticket
      request.redirect({
        url: LicenseReqUrl,
        body: body,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      console.warn(e);
    }
  }

  // interceptor for REQUESTS
  function widevineLicenseRequestInterceptor(streamId, sessionToken, request) {
    // verify if request concerns license obtaining
    if (!isLicenseRequest(request.url)) {
      return;
    }

    // if so, manipulate request by calling getTicket
    // getTicket will call callback method passed to it as param.
    return request.waitUntil(getTicket.bind(this, streamId, sessionToken, request)); // before each license call ticket must be refreshed
  }

  // interceptor for RESPONSES
  function widevineLicenseResponseInterceptor(response) {
    // verify if response concerns license obtaining
    if (!isLicenseRequest(response.url)) {
      return;
    }

    // this is the wrapped license.
    var wrappedArray = new Uint8Array(response.body);
    // convert it to a string.
    var wrappedString = String.fromCharCode.apply(null, wrappedArray);
    // parse the JSON string into an object.
    var wrapped = JSON.parse(wrappedString);
    // this is a base64-encoded version of the raw license.
    var rawLicenseBase64 = wrapped.license;
    // decode it to a string.
    var rawLicenseString = atob(rawLicenseBase64);
    // convert that string into a Uint8Array and replace the response data to feed it to the Widevine CDM.
    var body = new Uint8Array(rawLicenseString.length);
    for (let i = 0; i < rawLicenseString.length; ++i) {
      body[i] = rawLicenseString.charCodeAt(i);
    }
    response.respondWith({ body: body });
  }
};
