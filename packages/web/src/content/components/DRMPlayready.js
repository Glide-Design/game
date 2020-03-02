import { getDRMLicenseAquisitionUrl } from 'xi-core/config/selectors';
import store from '../../state/store';

/*
This class has been created from an xtream example
*/

export default ({ player, source, drmId, accessToken }) => {
  let state = store.getState();
  let licenseAcquisitionURL = getDRMLicenseAquisitionUrl(state);
  let licenseUrlFromTicket;

  source.sources[0].contentProtection = {
    playready: {
      licenseAcquisitionURL: licenseAcquisitionURL,
    },
  };
  player.source = source;

  // adding interceptors to manipulate license requests and responses.
  player.network.addRequestInterceptor(
    playreadyLicenseRequestInterceptor.bind(this, drmId, accessToken || '')
  );
  console.warn('Fetch will not work in IE11');

  // verify if url is is from license or ticket requests
  function isLicenseRequest(url) {
    return url === licenseAcquisitionURL || url === licenseUrlFromTicket;
  }

  function reportError(error) {
    console.error('Error:', error);
  }
  // obtain drm ticket from xstream
  function getTicket(streamId, sessionToken, request, callback) {
    // prepare request body for ticket request
    var reqParams = {
      drmType: 'playready',
      licenseType: 'non-persistent',
      streamId: streamId,
    };

    // best idea is to use http request library instead of raw xmlhttprequest object.
    var req = new XMLHttpRequest();
    req.open('POST', request.url, true);
    req.setRequestHeader('Content-Type', 'application/json');

    if (sessionToken.length > 0) {
      req.setRequestHeader('XSSESSION', sessionToken);
    }

    req.onreadystatechange = function(payload) {
      if (req.readyState === 4) {
        if (req.status >= 200 && req.status < 400) {
          var resp = JSON.parse(payload.target.response);
          // when received response from ticket request, manipulate license request
          getLicense(resp.ticket, resp.licenseServerUrl, request);
          callback();
        } else {
          reportError();
        }
      }
    };
    req.send(JSON.stringify(reqParams));
  }

  // manipulate license request to pass xstream requirements
  function getLicense(ticket, LicenseReqUrl, request) {
    // make sure using https!
    LicenseReqUrl = LicenseReqUrl.replace('http://', 'https://');
    // save license acquisition url for future url checking
    licenseUrlFromTicket = LicenseReqUrl;
    // redirect THEOplayer license request to xstream license url.
    // use received ticket to pass it in header, and force text/xml content type.
    request.redirect({
      url: LicenseReqUrl,
      headers: {
        Ticket: ticket,
        'Content-Type': 'text/xml',
      },
    });
  }

  // interceptor for REQUESTS
  function playreadyLicenseRequestInterceptor(streamId, sessionToken, request) {
    // verify if request concerns license obtaining
    if (!isLicenseRequest(request.url)) {
      return;
    }
    // if so, manipulate request by calling getTicket
    // getTicket will call callback method passed to it as param.
    return request.waitUntil(getTicket.bind(this, streamId, sessionToken, request)); // before each license call ticket must be refreshed
  }
};
