import axios from 'axios';
import { remove } from 'lodash';
import { LogglyDictionary, RUNTIME_ERR_LABEL } from './logglyConstants';

const shouldUseLogglyForApiRequests = (requestUrl, errCode, state) => {
  try {
    const { pathname } = new URL(requestUrl);

    // Checks every entry of the loggly dictionary and compares it with the url
    for (let i = 0; i < LogglyDictionary.length; i++) {
      // If the API is identified as being whitelisted, the rest of the code becomes redundant
      const { url, whitelistedErrorCodes } = LogglyDictionary(state)[i];
      const urlPathname = new URL(url).pathname;
      const splittedUrl = remove(urlPathname.split('/'), item => item !== '');
      const splittedRequestPathname = remove(pathname.split('/'), item => item !== '');

      let match = true;

      // If the paths look different, that's definitely a no match
      if (splittedUrl.length !== splittedRequestPathname.length) {
        match = false;
      } else {
        for (let j = 0; j < splittedUrl.length; j++) {
          // Covers the case where a path contains a parameter, helps to correctly compare it with the url
          if (splittedUrl[j] !== splittedRequestPathname[j] && splittedUrl[j].indexOf(':') === -1) {
            match = false;
          }
        }
      }

      if (match) {
        // If the path is identified as being whitelisted, checking if the status code is whitelisted
        if (whitelistedErrorCodes.indexOf(errCode) !== -1) {
          return true;
        }
      }
    }

    return false;
  } catch (e) {
    return false;
  }
};

const sendToLoggly = props => {
  const { logglyKey, message, status, devicePlatform, type } = props;
  const id = Math.round(Math.random() * 100000);
  const logglyUrl = `https://logs-01.loggly.com/inputs/${logglyKey}/tag/${type.join(
    ','
  )},${devicePlatform}/`;
  const error = { id, message, status };
  const headers = { 'content-type': 'application/x-www-form-urlencoded' };
  process.env.NODE_ENV !== 'test' && axios.post(logglyUrl, { error }, { headers });
};

export const logToLoggly = ({
  logglyKey,
  message,
  status,
  devicePlatform,
  url,
  type,
  state = {},
}) => {
  const logglyProps = { logglyKey, message, status, devicePlatform, type };
  const isRuntimeErrorType = type.indexOf(RUNTIME_ERR_LABEL) !== -1;
  let shouldLog = false;

  if (isRuntimeErrorType) {
    shouldLog = true;
  } else {
    shouldLog = shouldUseLogglyForApiRequests(url, status, state);
  }

  // For other errors (not request related), skips the whitelabeling check. Can be extended to check for other conditions
  if (shouldLog) {
    sendToLoggly(logglyProps);
  }
};
