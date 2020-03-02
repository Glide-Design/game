import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { onGlobalError } from './actions';

class ErrorBoundary extends React.Component {
  static propTypes = {
    renderError: PropTypes.func.isRequired,
  };

  state = {
    error: false,
  };

  clearError = () => {
    this.setState({
      error: undefined,
    });
  };

  componentDidCatch(error) {
    const { onGlobalError } = this.props;
    this.setState({ error });
    console.error(error);
    onGlobalError(error);
  }

  render() {
    const { error } = this.state;
    const { renderError, children } = this.props;
    return error ? renderError({ error, clearError: this.clearError }) : children;
  }
}

const ConnectedErrorBoundary = connect(
  () => ({}),
  { onGlobalError }
)(ErrorBoundary);

export default ConnectedErrorBoundary;
