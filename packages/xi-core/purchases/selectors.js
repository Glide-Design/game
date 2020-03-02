import { get } from 'lodash/fp';

export const isOpen = state => (getStep(state) ? true : false);
export const getStep = state => get('purchases.step', state);
export const getIsDuringCreation = state => get('purchases.duringCreation', state);
