// Take care when using this component ensuring that
// more than 1 does not end up on the DOM at the same time.

import React from 'react';
import { connect } from 'react-redux';
import { openNetworkSlowSnackBar, close } from 'xi-core/snackBar/actions';
import styled from 'styled-components';
import { FixedFullScreenContainerAnimated } from './FixedFullScreenContainer';
import LoaderCircularSpinner from './LoaderCircularSpinner';

const LoadingDelay = 750;
const SnackDelay = 4000;

const StyledFixedFullScreenContainerAnimated = styled(FixedFullScreenContainerAnimated)`
  background: rgba(0, 0, 0, 0.5);
`;

class NetworkSlowBase extends React.Component {
  snackDelayTimer = null;
  snackOpened = false;

  componentDidUpdate({ prevPastDelay }) {
    if (this.props.pastDelay && !prevPastDelay) {
      this.snackDelayTimer = setTimeout(() => {
        this.snackOpened = true;
        this.props.openNetworkSlowSnackBar();
      }, SnackDelay);
    }
  }

  componentWillUnmount() {
    if (this.snackDelayTimer) {
      clearTimeout(this.snackDelayTimer);
      this.snackDelayTimer = null;
    }
    if (this.snackOpened) {
      this.props.closeSnack();
    }
  }

  render() {
    return !this.props.pastDelay ? null : (
      <StyledFixedFullScreenContainerAnimated>
        <LoaderCircularSpinner />
      </StyledFixedFullScreenContainerAnimated>
    );
  }
}

const NetworkSlow = connect(
  null,
  dispatch => ({
    openNetworkSlowSnackBar: () => dispatch(openNetworkSlowSnackBar()),
    closeSnack: () => dispatch(close()),
  })
)(NetworkSlowBase);

export default NetworkSlow;

export const LoadableProps = {
  loading: NetworkSlow,
  delay: LoadingDelay,
};
