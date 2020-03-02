import { defineMessages } from 'react-intl';

export const errorMessages = defineMessages({
  something_went_wrong: {
    id: 'error.something_went_wrong',
    defaultMessage: 'Something went wrong.',
  },
  try_again_later: {
    id: 'error.try_again_later',
    defaultMessage: 'Please try again later.',
  },
  problem_persists: {
    id: 'error.problem_persists',
    defaultMessage: 'If the problem still persists contact support.',
  },
  service_unavailable: {
    id: 'service_unavailable',
    defaultMessage:
      'This might be a connection issue or this feature might not be available on your device.',
  },
  already_owned: {
    id: 'already_owned',
    defaultMessage:
      'You already appear to own this item and cannot have multiple products on a single device.',
  },
  device_unable: {
    id: 'device_unable',
    defaultMessage: 'Your device is unable to make in-app purchases.',
  },
});
