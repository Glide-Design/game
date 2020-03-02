import {
  getOr,
  get,
  map,
  flow,
  mergeWith,
  reject,
  entries,
  fromPairs,
  last,
  cond,
  constant,
  compact,
  isEmpty,
  identity as partners,
  stubTrue as defaultCase,
  isFunction,
  isNil,
} from 'lodash/fp';

import { getStarNames } from '../stars/selectors';

const getEntryPoint = get('locationInfo.entryPoint');
const wrapInArrayIfExists = value => (value ? [value] : undefined);
const getPartners = flow(
  map('name'),
  cond([[isEmpty, constant(undefined)], [defaultCase, partners]])
);
const mergeStrategy = (oldValue, newValue) =>
  isFunction(newValue) ? newValue(oldValue) : newValue;

function decorateWithContentInfo(contentId, state, dataToDecorate) {
  const {
    externalId,
    title,
    contentTypeName,
    publisherId,
    contributors: contributorIds = [],
    partners,
    likes,
    isFree,
    comments,
  } = getOr({}, `content.byId.${contentId}`, state);

  // PropsCleaner removes undefined props
  const propsUpdater = flow(
    mergeWith(mergeStrategy, {
      'Content ID': externalId,
      'Content Name': title,
      'Content Type': contentTypeName,
      'Content Publisher IDs': wrapInArrayIfExists(publisherId),
      'Content Partners': getPartners(partners),
      'Content Contributor IDs': compact([publisherId, ...contributorIds]).join(','),
      'Content Contributors': compact(getStarNames(state)([publisherId, ...contributorIds])).join(
        ','
      ),
      'Content Genre': contentTypeName,
      'Premium Content': !isFree,
      // 'Content Category': categoryName,
      // 'Brand Partners': [],
      'Entry Point': getEntryPoint(state),
      '# of Likes': likes, // # at time of viewing the page
      '# of Comments': comments, // # at time of viewing the page
    }),
    entries,
    reject(
      flow(
        last,
        isNil
      )
    ),
    fromPairs
  );

  return propsUpdater(dataToDecorate);
}

export { decorateWithContentInfo };
