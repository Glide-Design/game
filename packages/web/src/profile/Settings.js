import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { compose } from 'lodash/fp';
import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';
import { logoutMember } from 'xi-core/member/actions';
import { isAuthenticated } from 'xi-core/member/selectors';
import { Grey5, Grey85 } from 'xi-core/colours';
import { showAuthWizard } from 'xi-core/signup/actions';
import { isOpen } from 'xi-core/signup/selectors';
import { Body10 } from '../common/typography';
import { UnstyledButtonLink } from '../common/buttons';
import UserIcon from '../common/icons/User';
import LanguageIcon from '../common/icons/Language';
import NotificationIcon from '../common/icons/Notification';
import HelpIcon from '../common/icons/HelpAndInfo';
import { routes } from '../App';
import { getTargetDevice } from '../state/app/selectors';
import ProfileTopIcons from './ProfileTopIcons';

const Items = styled.div`

  ${({ wrapped }) =>
    wrapped
      ? 'padding-top: 0px;'
      : 'margin-top: 52px; padding: 32px 24px; height:100vh;'} color: ${Grey85};
  ${Body10};
  a {
    color: inherit;
  }
  ${({ wrapped }) => (wrapped ? '' : 'background-color: #fff;')};
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  * {
    vertical-align: middle;
  }

  &:first-of-type {
    margin-top: 0;
  }
  ${({ wrapped }) =>
    wrapped
      ? 'padding-left: 100px; padding-top: 20px; padding-bottom: 20px;'
      : 'margin-top: 26px;'} ${({ active }) =>
    active
      ? `font-weight: bold; width: calc(100% + 1px); background-color: #fff;border-top: 1px solid ${Grey5};border-bottom: 1px solid ${Grey5};`
      : ''};
`;

const ButtonLink = styled(UnstyledButtonLink)`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const IconCss = css`
  width: 24px;
  margin-right: 16px;
  display: inline-block;
`;

const Icon = styled.div`
  ${IconCss};
  display: flex;
  align-items: center;
  ${({ active }) => (active ? 'color: #7C52F6;' : `color: ${Grey85};`)};
`;

const StyledProfileTopIcons = styled(ProfileTopIcons)`
  // background: #000;
`;

class Settings extends React.Component {
  componentDidMount() {
    const { history, isAuthenticated, wrapped, targetDevice } = this.props;

    if (targetDevice === 'large') {
      if (!wrapped) {
        isAuthenticated
          ? history.replace(routes.myAccount.path)
          : history.replace(routes.help.path);
      }
    }
  }

  componentDidUpdate() {
    const { authWizardOpen, isAuthenticated, wrapped, history, targetDevice } = this.props;

    if (!authWizardOpen && targetDevice === 'large') {
      // if (!isAuthenticated && wrapped) {
      //   history.replace(routes.help.path);
      // }

      if (isAuthenticated && !wrapped) {
        history.replace(routes.myAccount.path);
      }
    }
  }

  logoutHandler = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { isAuthenticated, showAuthWizard, wrapped, active } = this.props;

    /* eslint-enable no-restricted-globals */

    return (
      <Fragment>
        {!wrapped && (
          <StyledProfileTopIcons
            fixedTopBackground={0}
            hideBackButton={false}
            fullName={<FormattedMessage id="settings.settings" defaultMessage="Settings" />}
          />
        )}
        <Items wrapped={wrapped}>
          <Item active={active === 'language'} wrapped={wrapped}>
            <StyledLink to={routes.language.path}>
              <Icon active={active === 'language'}>
                <LanguageIcon />
              </Icon>
              <FormattedMessage id="settings.language" defaultMessage="Language" />
            </StyledLink>
          </Item>
          {isAuthenticated ? (
            <React.Fragment>
              <Item active={active === 'myaccount'} wrapped={wrapped}>
                <StyledLink to={routes.myAccount.path} data-test-id="my-account">
                  <Icon active={active === 'myaccount'}>
                    <UserIcon />
                  </Icon>
                  <FormattedMessage id="settings.myAccount" defaultMessage="My Account" />
                </StyledLink>
              </Item>
              <Item active={active === 'contactprefs'} wrapped={wrapped}>
                <StyledLink to={routes.contactPreferences.path}>
                  <Icon active={active === 'contactprefs'}>
                    <NotificationIcon />
                  </Icon>
                  <FormattedMessage
                    id="settings.notifications"
                    defaultMessage="Notification Preferences"
                  />
                </StyledLink>
              </Item>
            </React.Fragment>
          ) : null}
          <Item active={active === 'helpAndInfo'} wrapped={wrapped}>
            <StyledLink to={routes.help.path}>
              <Icon active={active === 'helpAndInfo'}>
                <HelpIcon />
              </Icon>
              <FormattedMessage id="settings.help" defaultMessage="Help and Information" />
            </StyledLink>
          </Item>
          {isAuthenticated ? (
            <Item wrapped={wrapped}>
              <ButtonLink type="button" onClick={this.logoutHandler} data-test-id="sign-out">
                <Icon>
                  <img src="/images/sign-out-icon.svg" alt="Sign out" />
                </Icon>
                <FormattedMessage id="settings.signOut" defaultMessage="Sign out" />
              </ButtonLink>
            </Item>
          ) : (
            <Item wrapped={wrapped}>
              <ButtonLink
                type="button"
                onClick={() => showAuthWizard()}
                data-test-id="sign-in-help"
              >
                <Icon>
                  <img src="/images/sign-out-icon.svg" alt="Sign in" />
                </Icon>
                <FormattedMessage id="settings.signIn" defaultMessage="Sign in" />
              </ButtonLink>
            </Item>
          )}
        </Items>
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  connect(
    state => ({
      isAuthenticated: isAuthenticated(state),
      targetDevice: getTargetDevice(state),
      authWizardOpen: isOpen(state),
    }),
    (dispatch, { history }) => ({
      logout: () => dispatch(logoutMember()),
      showAuthWizard: () => dispatch(showAuthWizard({ history })),
    })
  )
)(Settings);
