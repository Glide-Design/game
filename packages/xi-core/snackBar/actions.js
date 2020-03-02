import { defineMessages } from 'react-intl';

import { getForename } from '../member/selectors';

export const SNACKBAR_OPEN = 'SNACKBAR/OPEN';
export const SNACKBAR_CLOSE = 'SNACKBAR/CLOSE';

export const IconTypes = {
  TICK: 'tick',
  INFO: 'info',
  ARROW_RIGHT: 'arrow_right',
};

const open = ({ title, message, leftIconType }) => ({
  type: SNACKBAR_OPEN,
  title,
  message,
  leftIconType,
});

export const close = () => ({
  type: SNACKBAR_CLOSE,
});

const messages = defineMessages({
  networkSlow: {
    id: 'app.network_slow',
    defaultMessage: 'Network Slow',
  },
  orderCompleteEnjoy: {
    id: 'app.welcomeToUnlimited',
    defaultMessage: 'Welcome to Unlimited, {forename}',
  },
  commentReportConfirmation: {
    id: 'comment.report_confirmation',
    defaultMessage: 'Thanks for reporting. We will investigate now.',
  },
});

export const openOrderCompleteSnackBar = (snackBarLingerTime = 3500) => (dispatch, getState) => {
  const state = getState();
  const forename = getForename(state);
  dispatch(
    open({
      message: { ...messages.orderCompleteEnjoy, values: { forename } },
      leftIconType: IconTypes.TICK,
      closeIconType: IconTypes.ARROW_RIGHT,
    })
  );
  setTimeout(() => dispatch(close()), snackBarLingerTime);
};

export const openNetworkSlowSnackBar = () => dispatch => {
  dispatch(open({ message: messages.networkSlow, leftIconType: IconTypes.INFO }));
};

export const openCommentReportConfirmationSnackBar = (snackBarLingerTime = 3500) => dispatch => {
  dispatch(
    open({
      message: messages.commentReportConfirmation,
      leftIconType: IconTypes.INFO, 
    })
  );
  setTimeout(() => dispatch(close()), snackBarLingerTime);
};
