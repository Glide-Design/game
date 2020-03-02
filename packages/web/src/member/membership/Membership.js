import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose, isEmpty } from 'lodash/fp';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  getMemberId,
  isAuthenticated,
  getEnablement,
  getCreatedDate,
  isPendingCancel,
  isWithinUnlimitedCoolingOffPeriod,
  isPremium,
  membershipStatus,
  PLATFORM,
  getIsFreeTrial,
  getTechProvider,
  getPurchaseDate,
  premiumExpires,
  getEnablementExternalId,
  isPaymentProcessing,
} from 'xi-core/member/selectors';
import { cancelMembership, CANCEL_PREMIUM_INTENT } from 'xi-core/member/actions';
import { validationMessages } from 'xi-core/locale/purchases';
import { getClientAppBaseUrl, getExternalLink } from 'xi-core/config/selectors';
import { CoreDevices, NAVBAR_HEIGHT_PX } from '../../common/dimensions';
import ProfileTopIcons from '../../profile/ProfileTopIcons';
import Settings from '../../profile/Settings';
import { SettingsMenuWrapper, SectionsWrapper } from '../styles';
import { Body1, H4 } from '../../common/typography';
import { Button1 } from '../../common/buttons/Buttons';
import { SolidGreenButton } from '../../common/buttons';
import { getTargetDevice } from '../../state/app/selectors';
import { routes } from '../../App';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  color: #000;
  box-sizing: border-box;
  width: 100%;

  @media ${CoreDevices.tiny} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.tiny}px);
    padding-top: ${NAVBAR_HEIGHT_PX.tiny}px;
  }

  @media ${CoreDevices.small} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.small}px);
    padding-top: ${NAVBAR_HEIGHT_PX.small}px;
  }

  @media ${CoreDevices.medium} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.medium}px);
    padding-top: ${NAVBAR_HEIGHT_PX.medium}px;
  }

  @media ${CoreDevices.large} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.large}px);
    padding-top: 0;
  }
`;

const StyledProfileTopIcons = styled(ProfileTopIcons)`
  background: #000;
`;

const Section = styled.div`
  margin-bottom: 20px;
  padding: 22px;
  position: relative;

  ${({ largeDevice }) => (largeDevice ? 'width: 400px;' : '')};
`;

const Header = styled.h2`
  ${H4};
  margin-bottom: 30px;
`;

const Message = styled.p`
  ${Body1};
`;

const DifferentPlatformLink = styled(Link)``;

const StyledSolidGreenButton = styled(SolidGreenButton)`
  margin-top: 20px;
  width: 214px;
  flex-basis: 40px;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.5px;
  height: 48px;
  margin-bottom: 20px;
`;

const StyledButton1 = styled(Button1)`
  width: 214px;
  height: 48px;
  display: block;
`;

class Membership extends React.Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
  };

  state = {
    userJustCanceled: false,
  };

  componentDidMount() {
    const { history, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      history.replace(routes.settings.path);
    }
  }

  cancelMembershipConfirm = () => {
    const { cancelMembership, cancelMembershipIntent, enablementExternalId } = this.props;
    /* eslint-disable no-restricted-globals */
    const canContinue = confirm(this.props.intl.formatMessage(validationMessages.confirmCancel));
    /* eslint-enable no-restricted-globals */
    if (canContinue) {
      cancelMembership(enablementExternalId);
      cancelMembershipIntent(true);
      this.setState({
        userJustCanceled: true,
      });
    } else {
      cancelMembershipIntent(false);
    }
  };

  render() {
    const {
      targetDevice,
      isFreeTrial,
      appLink,
      helpLink,
      isPremium,
      pendingCancel,
      techProvider,
      purchaseDate,
      nextPayment,
      isPaymentProcessing,
    } = this.props;
    const { userJustCanceled } = this.state;

    const largeDevice = targetDevice === 'large';

    const {
      headerMessage,
      firstMessage,
      firstMessageValues,
      secondMessage,
      secondMessageValues,
      buttonMessage,
      differentPlatformMessage,
      differentPlatformValues,
      buttonAction,
    } = membershipStatus({
      isPremium,
      isFreeTrial,
      isPaymentProcessing,
      pendingCancel,
      platform: techProvider,
      devicePlatform: PLATFORM.WEB,
      purchaseDate,
      nextPayment,
      appLink,
      cancelAction: this.cancelMembershipConfirm,
      reactivateAction: () => {
        // TODO waiting for an API implementation
      },
    });

    return (
      <Container>
        {!largeDevice ? (
          <StyledProfileTopIcons
            fixedTopBackground={0}
            hideBackButton={false}
            fullName={<FormattedMessage id="membership.Membership" defaultMessage="Membership" />}
          />
        ) : (
          <SettingsMenuWrapper>
            <Settings wrapped={true} active="myaccount" />
          </SettingsMenuWrapper>
        )}
        <SectionsWrapper largeDevice={largeDevice}>
          <Section largeDevice={largeDevice}>
            <Header>
              <FormattedMessage {...headerMessage}>{text => text.toUpperCase()}</FormattedMessage>
            </Header>

            <Message>
              <FormattedMessage {...firstMessage} values={firstMessageValues} />
            </Message>
            {!isEmpty(secondMessage) && (
              <Message>
                <FormattedMessage {...secondMessage} values={secondMessageValues} />
              </Message>
            )}

            {isPaymentProcessing ? null : (
              <StyledSolidGreenButton
                onClick={() => {
                  /* eslint-disable no-restricted-globals */
                  location.href = helpLink;
                  /* eslint-enable no-restricted-globals */
                }}
                data-test-id="membership-help"
              >
                <FormattedMessage
                  id="membership.questionsContactUs"
                  defaultMessage="GO TO OUR FAQs"
                />
              </StyledSolidGreenButton>
            )}

            {!isEmpty(buttonMessage) && (
              <StyledButton1 onClick={buttonAction} disabled={userJustCanceled}>
                <FormattedMessage {...buttonMessage} />
              </StyledButton1>
            )}

            {!isEmpty(differentPlatformMessage) && (
              <DifferentPlatformLink href="">
                <FormattedMessage {...differentPlatformMessage} values={differentPlatformValues} />
              </DifferentPlatformLink>
            )}
          </Section>
        </SectionsWrapper>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  memberId: getMemberId(state),
  isAuthenticated: isAuthenticated(state),
  targetDevice: getTargetDevice(state),
  enablement: getEnablement(state),
  createdDate: getCreatedDate(state),
  isPremium: isPremium(state),
  pendingCancel: isPendingCancel(state),
  inCoolingOffPeriod: () => isWithinUnlimitedCoolingOffPeriod(state),
  isFreeTrial: getIsFreeTrial(state),
  isPaymentProcessing: isPaymentProcessing(state),
  techProvider: getTechProvider(state),
  purchaseDate: getPurchaseDate(state),
  nextPayment: premiumExpires(state),
  enablementExternalId: getEnablementExternalId(state),
  appLink: getClientAppBaseUrl(state),
  helpLink: getExternalLink('help')(state),
});

const mapDispatchToProps = (dispatch, { history }) => ({
  cancelMembership: enablementId => dispatch(cancelMembership(enablementId)),
  cancelMembershipIntent: outcome => dispatch({ type: CANCEL_PREMIUM_INTENT, outcome }),
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Membership);
