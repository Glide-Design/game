import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { currentOpenComments } from 'xi-core/comments/selectors';
import { isOpen as purchasesWizardOpen } from 'xi-core/purchases/selectors';
import { isOpen as authWizardOpen } from 'xi-core/signup/selectors';
import { shiftOverlayQueue } from 'xi-core/overlays/actions';

class OverlaysQueueController extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.overlayJustClosed(prevProps)) {
      this.props.shiftOverlayQueue();
    }
  }

  overlayJustClosed = prevProps => {
    const { purchasesWizardOpen, authWizardOpen, commentsOpen } = this.props;
    return (
      (prevProps.purchasesWizardOpen && !purchasesWizardOpen) ||
      (prevProps.authWizardOpen && !authWizardOpen) ||
      (prevProps.commentsOpen && !commentsOpen)
    );
  };

  render() {
    return null;
  }
}

export default withRouter(
  connect(
    state => ({
      commentsOpen: currentOpenComments(state),
      purchasesWizardOpen: purchasesWizardOpen(state),
      authWizardOpen: authWizardOpen(state),
    }),
    (dispatch, { history }) => ({
      shiftOverlayQueue: () => dispatch(shiftOverlayQueue(history)),
    })
  )(OverlaysQueueController)
);
