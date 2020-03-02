import { unescape, map, isEmpty, trim } from 'lodash/fp';
import supportedHtmlTags from './supportedHtmlTags';

const isTextNode = tagName => !tagName;

const replaceTextNode = (components, textContent, textReplacement) => childKey => {
  if (!textReplacement) {
    console.warn("'text' function is missing from replacements");
  } else {
    components.push(textReplacement(textContent)(childKey));
  }
  return components;
};

const supportedTags = Object.keys(supportedHtmlTags);
const isTagSupported = tagName => {
  for (let supportedTag of supportedTags) {
    if (tagName === supportedTag) {
      return true;
    }
  }

  return false;
};

const isAttributeSupported = (supportedAttributes, testAttribute) => {
  return supportedAttributes.some(supportedAttribute => {
    if (testAttribute.name === supportedAttribute) {
      return true;
    }
  });
};

const getAttributes = (tagName, attributes) => {
  const successfulAttributes = {};
  const supportedAttributes = supportedHtmlTags[tagName];
  map(testAttribute => {
    if (isAttributeSupported(supportedAttributes, testAttribute)) {
      successfulAttributes[testAttribute.name] = testAttribute.value;
    }
  }, attributes);

  return successfulAttributes;
};

export default (htmlString, parser, replacements = {}) => {
  if (typeof htmlString !== 'string' || !htmlString) {
    return null;
  }

  const doc = parser.parseFromString(unescape(htmlString), 'text/html');
  const documentElements = doc.body ? doc.body.childNodes : doc.childNodes;

  const getChildComponents = childNodes => {
    let childKey = 0;
    return map(childNode => getComponent([], childNode, ++childKey), childNodes).filter(
      components => components.length
    );
  };

  const getComponent = (
    components,
    { tagName, childNodes, textContent, attributes = [] },
    childKey
  ) => {
    if (isTextNode(tagName)) {
      if (isEmpty(trim(textContent))) {
        return components;
      }
      return replaceTextNode(components, textContent, replacements.text)(childKey);
    } else {
      const sanitizedTagName = tagName.toLowerCase();
      if (!isTagSupported(sanitizedTagName)) {
        console.warn(`Node '${tagName}' not supported`);
        return components;
      }

      const tagReplacement = replacements[sanitizedTagName];
      if (!tagReplacement) {
        console.warn(`Node '${tagName}' replacement function is missing`);
        return components;
      }

      const filteredAttributes = getAttributes(sanitizedTagName, attributes);

      if (childNodes.length) {
        components.push(
          tagReplacement(getChildComponents(childNodes), filteredAttributes)(childKey)
        );
      } else {
        components.push(tagReplacement(null, filteredAttributes)(childKey));
      }

      return components;
    }
  };

  return getChildComponents(documentElements);
};
