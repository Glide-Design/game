import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'lodash/fp';
import { isAuthenticated } from 'xi-core/member/selectors';
import { showAuthWizard, closeAuthWizard } from 'xi-core/signup/actions';
import { routes } from '../../App';
import AuthenticationWizard from '../AuthenticationWizard';

class Join extends React.Component {
  componentDidMount() {
    const { isAuthenticated, closeAuthWizard } = this.props;
    isAuthenticated ? closeAuthWizard(true) : this.show();
  }

  componentDidUpdate() {
    this.show();
  }

  show = () => {
    const { showAuthWizard, open } = this.props;

    if (!open) {
      showAuthWizard();
    }
  };

  render = () => {
    return null;
  };
}

export default compose(
  withRouter,
  connect(
    state => ({ isAuthenticated: isAuthenticated(state) }),
    (dispatch, { history, locationState = null, urlRedirect = null }) => ({
      showAuthWizard: () => {
        return dispatch(showAuthWizard({ history, historyAction: 'replace', locationState }));
      },
      closeAuthWizard: open => {
        if (urlRedirect) {
          window.location = urlRedirect;
        } else if (open) {
          dispatch(closeAuthWizard(history));
          history.replace(routes.discovery.path);
        }
      },
    })
  ),
  AuthenticationWizard
)(Join);
