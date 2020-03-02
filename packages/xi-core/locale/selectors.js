const { get } = require('lodash/fp');

export const getLocale = get('locale.locale');
export const getLanguage = state => getLocale(state).split('-')[0];
export const getMessages = get('locale.messages');
