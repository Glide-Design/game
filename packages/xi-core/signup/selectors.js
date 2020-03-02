import { get } from 'lodash/fp';

export const isRestoringLogin = get('user.isRestoringLogin');

export const hasAttemptedToRestoreLogin = get('user.hasAttemptedToRestoreLogin');

export const getLoginProvider = get('user.provider');

export const getGuestFreeVideoWatchCount = get('user.guestFreeVideoWatchCount');

export const isOpen = state => (getStep(state) ? true : false);

export const isBlockedUserOpen = get('user.blockedUserOpen');

export const getStep = state => get('signup.step', state);

export const getErrorBody = state => get('user.errorBody', state);
