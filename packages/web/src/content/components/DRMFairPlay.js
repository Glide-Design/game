import {
  getDRMLicenseAquisitionUrl,
  getDRMCertificateAquisitionUrlFairplay,
} from 'xi-core/config/selectors';
import store from '../../state/store';
/*
This class has been created from an xtream example
*/

export default ({ player, source, drmId, accessToken }) => {
  let state = store.getState();
  let licenseAcquisitionURL = getDRMLicenseAquisitionUrl(state);
  let certificateAcquisitionURL = getDRMCertificateAquisitionUrlFairplay(state);

  let licenseUrlFromTicket;

  source.sources[0].contentProtection = {
    fairplay: {
      licenseAcquisitionURL: licenseAcquisitionURL,
      certificateURL: certificateAcquisitionURL,
    },
  };

  player.source = source;

  // adding interceptors to manipulate license requests and responses.
  player.network.addRequestInterceptor(
    fairplayRequestInterceptor.bind(this, drmId, accessToken || '')
  );
  player.network.addResponseInterceptor(fairplayResponseInterceptor);

  console.warn('Fetch will not work in IE11');

  // verify if url is is from license or ticket requests
  function isLicenseRequest(url) {
    return url === licenseAcquisitionURL || url === licenseUrlFromTicket;
  }
  // verify if url is is from certificate requests
  function isCertificateRequest(url) {
    return url === certificateAcquisitionURL;
  }
  // parse query string to json
  function queryStringToParams(queryString) {
    return queryString
      .replace(/(^\?)/, '')
      .split('&')
      .map(
        function(n) {
          n = n.split('=');
          this[n[0]] = n[1];
          return this;
        }.bind({})
      )[0];
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
      drmType: 'fairplay',
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

      // parse oryginal request
      var orygReqParams = queryStringToParams(request.body);

      // create the wrapped request structure.
      var wrapped = {
        spc: decodeURIComponent(orygReqParams.spc), // spc from oryginal request
        ticket: ticket,
      };
      // encode the wrapped request as JSON.
      var wrappedJson = JSON.stringify(wrapped);
      // convert the JSON string back into a Uint8Array to replace the request body.
      var body = new Uint8Array(wrappedJson.length);
      for (let i = 0; i < wrappedJson.length; ++i) {
        body[i] = wrappedJson.charCodeAt(i);
      }
      // redirect THEOplayer license request to xstream license url.
      // use prepared body, including spc and ticket
      request.redirect({
        url: LicenseReqUrl,
        body: body,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      console.warn(e);
    }
  }

  function fairplayRequestInterceptor(streamId, sessionToken, request) {
    // verify if request concerns license obtaining
    if (isLicenseRequest(request.url)) {
      // if so, manipulate request by calling getTicket
      // getTicket will call callback method passed to it as param.
      return request.waitUntil(getTicket.bind(this, streamId, sessionToken, request)); // before each license call ticket must be refreshed

      // verify if request concerns certificate obtaining
    } else if (isCertificateRequest(request.url)) {
      // change method from GET to POST for certificate request
      return request.redirect({
        url: request.url,
        method: 'POST',
      });
    }
  }

  function fairplayResponseInterceptor(response) {
    // verify if request concerns license obtaining
    if (isLicenseRequest(response.url)) {
      // parse the JSON string into an object.
      var wrappedLR = JSON.parse(response.body);
      // this is a base64-encoded version of the raw certificate.
      var rawLicenseBase64LR = wrappedLR.licence;
      // replace request response with prepared data
      response.respondWith({ body: rawLicenseBase64LR });

      // verify if request concerns certificate obtaining
    } else if (isCertificateRequest(response.url)) {
      // this is the wrapped certtificate response.
      var wrappedArray = new Uint8Array(response.body);
      // convert it to a string.
      var wrappedString = String.fromCharCode.apply(null, wrappedArray);
      // parse the JSON string into an object.
      var wrappedCR = JSON.parse(wrappedString);
      // this is a base64-encoded version of the raw certificate.
      var rawLicenseBase64CR = wrappedCR.certificate;
      // decode it to a string.
      var rawLicenseString = atob(rawLicenseBase64CR);
      // convert that string into a Uint8Array and replace the response data meet THEOPlayer format
      var body = new Uint8Array(rawLicenseString.length);
      for (let i = 0; i < rawLicenseString.length; ++i) {
        body[i] = rawLicenseString.charCodeAt(i);
      }
      // replace request response with prepared data
      response.respondWith({ body: body });
    }
  }
};
