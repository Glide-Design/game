export const SEND_SHARE = 'share/SEND_SHARE';

export const sendShare = (shareType, shareProvider) => dispatch => {
  dispatch({
    type: SEND_SHARE,
    shareType,
    shareProvider,
  });
};
