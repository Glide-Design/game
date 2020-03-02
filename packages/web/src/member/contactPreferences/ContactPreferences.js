import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Switch from 'react-switch';
import {
  fetchUserNotificationPrefs,
  addNotificationPref,
  removeNotificationPref,
} from 'xi-core/member/actions';
import { registerDeviceForPush } from 'xi-core/app/actions';
import { Grey5, Grey20, PrimaryGreen } from 'xi-core/colours';
import { getContactPreference, isAuthenticated } from 'xi-core/member/selectors';
import withRequest from 'xi-core/withRequest';
import { CoreDevices, NAVBAR_HEIGHT_PX, TOOLBAR_HEIGHT_PX } from '../../common/dimensions';
import ProfileTopIcons from '../../profile/ProfileTopIcons';
import Settings from '../../profile/Settings';
import { SettingsMenuWrapper, SectionsWrapper } from '../styles';
import { routes } from '../../App';
import { sendDeviceId } from '../../app/WebBootstrap';
import { getTargetDevice } from '../../state/app/selectors';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  color: #000;
  box-sizing: border-box;
  width: 100%;

  @media ${CoreDevices.tiny} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.tiny}px);
    padding-top: ${TOOLBAR_HEIGHT_PX.tiny}px;
  }

  @media ${CoreDevices.small} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.small}px);
    padding-top: ${TOOLBAR_HEIGHT_PX.small}px;
  }

  @media ${CoreDevices.medium} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.medium}px);
    padding-top: ${TOOLBAR_HEIGHT_PX.medium}px;
  }

  @media ${CoreDevices.large} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.large}px);
    padding-top: 0;
  }
`;

const StyledProfileTopIcons = styled(ProfileTopIcons)`
  // background: #000;
`;

const Section = styled.div`
  border-top: 1px solid ${Grey5};
  margin-bottom: 20px;
  padding: 22px;
  position: relative;

  ${({ largeDevice }) => (largeDevice ? 'width: 400px;' : '')};
`;
const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const SwitchRow = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const LabelHolder = styled.div`
  flex: 1;
`;

const SwitchHolder = styled.div`
  width: 120px;
  text-align: right;
`;

class ContactPreferences extends React.Component {
  onToggleChange = (item, value) => {
    const { addNotificationPref, removeNotificationPref, registerDeviceForPush } = this.props;

    if (value) {
      addNotificationPref(item);
      if (item === 'PUSH') {
        window.appboy.registerAppboyPushMessages(() => sendDeviceId(registerDeviceForPush));
      }
    } else {
      removeNotificationPref(item);
    }
  };

  componentDidMount() {
    const { history, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      history.replace(routes.settings.path);
    }
  }

  render() {
    const { targetDevice, otroEmail, partnerEmail } = this.props;

    const largeDevice = targetDevice === 'large';

    return (
      <Container>
        {!largeDevice && (
          <StyledProfileTopIcons
            fixedTopBackground={0}
            hideBackButton={false}
            fullName={
              <FormattedMessage
                id="contactPrefs.contactPrefs"
                defaultMessage="Communication Preferences"
              />
            }
          />
        )}
        {largeDevice ? (
          <SettingsMenuWrapper>
            <Settings wrapped={true} active="contactprefs" />
          </SettingsMenuWrapper>
        ) : null}
        <SectionsWrapper largeDevice={largeDevice}>
          <Section largeDevice={largeDevice}>
            <SectionTitle>
              <FormattedMessage
                id="contactPrefs.title"
                defaultMessage="Communication Preferences"
              />
            </SectionTitle>
            {/* <SwitchRow>
              <LabelHolder>
                <FormattedMessage id="contactPrefs.push" defaultMessage="Push" />
              </LabelHolder>
              <SwitchHolder>
                <label htmlFor="push">
                  <Switch
                    id="push"
                    offColor={Grey20}
                    onColor={PrimaryGreen}
                    checked={!!push}
                    onChange={() => this.onToggleChange('PUSH', !push)}
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                </label>
              </SwitchHolder>
            </SwitchRow> */}
            <SwitchRow>
              <LabelHolder>
                <FormattedMessage id="contactPrefs.otro_emails" defaultMessage="Otro Emails" />
              </LabelHolder>
              <SwitchHolder>
                <label htmlFor="email">
                  <Switch
                    id="otro_email"
                    offColor={Grey20}
                    onColor={PrimaryGreen}
                    checked={!!otroEmail}
                    onChange={() => this.onToggleChange('EMAIL', !otroEmail)}
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                </label>
              </SwitchHolder>
            </SwitchRow>
            <SwitchRow>
              <LabelHolder>
                <FormattedMessage
                  id="contactPrefs.partner_emails"
                  defaultMessage="Partner Emails"
                />
              </LabelHolder>
              <SwitchHolder>
                <label htmlFor="email">
                  <Switch
                    id="partner_email"
                    offColor={Grey20}
                    onColor={PrimaryGreen}
                    checked={!!partnerEmail}
                    onChange={() => this.onToggleChange('PARTNER_EMAIL', !partnerEmail)}
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                </label>
              </SwitchHolder>
            </SwitchRow>
          </Section>
        </SectionsWrapper>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  targetDevice: getTargetDevice(state),
  otroEmail: getContactPreference(state)('EMAIL'),
  partnerEmail: getContactPreference(state)('PARTNER_EMAIL'),
  push: getContactPreference(state)('PUSH'),
  isAuthenticated: isAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
  addNotificationPref: value => dispatch(addNotificationPref(value)),
  removeNotificationPref: value => dispatch(removeNotificationPref(value)),
  registerDeviceForPush: deviceId => dispatch(registerDeviceForPush(deviceId)),
});

export default compose(
  withRouter,
  withRequest({
    requestIdEmpty: true,
    responseAlias: 'preferences',
    requestAction: fetchUserNotificationPrefs,
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ContactPreferences);
