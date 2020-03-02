import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get, compose } from 'lodash/fp';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { userProfileCtaAction } from 'xi-core/member/actions';
import { getZendeskToken } from 'xi-core/member/selectors';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import { getExternalLink, getFEVersion } from 'xi-core/config/selectors';
import { Grey15, Grey5 } from 'xi-core/colours';
import { BodySmall } from '../../common/typography';
import { CoreDevices, NAVBAR_HEIGHT_PX, TOOLBAR_HEIGHT_PX } from '../../common/dimensions';
import { UnstyledButtonLink } from '../../common/buttons';
import ProfileTopIcons from '../../profile/ProfileTopIcons';
import Settings from '../../profile/Settings';
import { SettingsMenuWrapper, SectionsWrapper } from '../styles';
import { routes } from '../../App';
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

  & > * {
    display: block;
    margin-bottom: 30px;
  }

  ${({ largeDevice }) => (largeDevice ? 'width: 400px;' : '')};
`;

const FEVersion = styled.div`
  color: ${Grey15};
  ${BodySmall};
  margin-top: 100px;
`;

class Help extends React.Component {
  handHelpButtonClick = () => {
    const { helpLink, ctaClicked } = this.props;

    ctaClicked(PropertyKeys.USER_PROFILE_ACTION.HELP);

    /* eslint-disable no-restricted-globals */
    location.href = helpLink;
  };

  render() {
    const {
      targetDevice,
      zendeskToken,
      appUrl,
      helpSSOLink,
      termsLink,
      privacyLink,
      frontEndVersion,
      ctaClicked,
    } = this.props;
    const largeDevice = targetDevice === 'large';

    if (zendeskToken) {
      location.href =
        helpSSOLink + '?jwt=' + zendeskToken + '&return_to=' + appUrl + routes.settings;
      return null;
    }

    return (
      <Container>
        {!largeDevice && (
          <StyledProfileTopIcons
            fixedTopBackground={0}
            hideBackButton={false}
            fullName={
              <FormattedMessage id="help.helpAndInfo" defaultMessage="Help and Information" />
            }
          />
        )}
        {largeDevice ? (
          <SettingsMenuWrapper>
            <Settings wrapped={true} active="helpAndInfo" />
          </SettingsMenuWrapper>
        ) : null}
        <SectionsWrapper largeDevice={largeDevice}>
          <Section largeDevice={largeDevice}>
            <UnstyledButtonLink onClick={this.handHelpButtonClick}>
              <FormattedMessage id="helpAndInfo.helpCentre" defaultMessage="Help" />
            </UnstyledButtonLink>
            <a
              href={termsLink}
              target="_blank"
              onClick={() => ctaClicked(PropertyKeys.USER_PROFILE_ACTION.TERMS)}
            >
              <FormattedMessage id="helpAndInfo.termsOfUse" defaultMessage="Terms of Use" />
            </a>
            <a
              href={privacyLink}
              target="_blank"
              onClick={() => ctaClicked(PropertyKeys.USER_PROFILE_ACTION.PRIVACY_POLICY)}
            >
              <FormattedMessage id="helpAndInfo.dataPolicy" defaultMessage="Privacy Policy" />
            </a>
            {frontEndVersion ? <FEVersion>{frontEndVersion}</FEVersion> : null}
          </Section>
        </SectionsWrapper>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  targetDevice: getTargetDevice(state),
  appUrl: get('config.clientAppBaseUrl', state),
  zendeskToken: getZendeskToken(state),
  helpSSOLink: getExternalLink('helpSSO')(state),
  helpLink: getExternalLink('help')(state),
  termsLink: getExternalLink('termsConditions')(state),
  privacyLink: getExternalLink('privacyPolicy')(state),
  frontEndVersion: getFEVersion(state),
});

const mapDispatchToProps = dispatch => ({
  ctaClicked: async key => await dispatch(userProfileCtaAction(key)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Help);
