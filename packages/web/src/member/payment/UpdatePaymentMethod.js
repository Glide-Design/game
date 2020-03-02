import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchPaymentMethodsForMember } from 'xi-core/member/paymentMethods/actions';
import { getCurrentPaymentMethod } from 'xi-core/member/paymentMethods/selectors';
import { compose } from 'lodash/fp';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Grey5 } from 'xi-core/colours';
import { getMemberId } from 'xi-core/member/selectors';
import withRequest from 'xi-core/withRequest';
import { addPaymentMethod } from 'xi-core/member/paymentMethods/actions';
import StripePaymentMethodForm from '../../purchases/components/PaymentForm';
import { CoreDevices, NAVBAR_HEIGHT_PX } from '../../common/dimensions';
import ProfileTopIcons from '../../profile/ProfileTopIcons';
import Settings from '../../profile/Settings';
import { SettingsMenuWrapper, SectionsWrapper } from '../styles';
import LoaderSpinner from '../../common/LoaderSpinner';
import { Body2 } from '../../common/typography';
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
  border-top: 1px solid ${Grey5};
  margin-bottom: 20px;
  padding: 22px;
  position: relative;

  ${({ largeDevice }) => (largeDevice ? 'width: 400px;' : '')};
`;

const SectionTitle = styled.div`
  ${Body2};
  margin-bottom: 20px;
`;

class MyAccount extends React.Component {
  handleSubmitPaymentMethod = async paymentMethod => {
    await this.props.addPaymentMethod(paymentMethod);
    this.props.history.push(routes.myAccount.path);
  };

  render() {
    const { targetDevice, paymentMethod = {} } = this.props;
    const largeDevice = targetDevice === 'large';
    const title = (
      <FormattedMessage id="updatePaymentMethod.title" defaultMessage="Update Payment Method" />
    );
    return (
      <Container>
        {!largeDevice && (
          <StyledProfileTopIcons fixedTopBackground={0} hideBackButton={false} fullName={title} />
        )}
        {largeDevice ? (
          <SettingsMenuWrapper>
            <Settings wrapped={true} active="myaccount" />
          </SettingsMenuWrapper>
        ) : null}
        <SectionsWrapper largeDevice={largeDevice}>
          {largeDevice ? <SectionTitle>{title}</SectionTitle> : null}
          <Section largeDevice={largeDevice}>
            {paymentMethod ? (
              <StripePaymentMethodForm
                onSubmitPaymentMethod={this.handleSubmitPaymentMethod}
                initialValues={{
                  name: paymentMethod.cardHolderName,
                }}
                submitLabel={
                  <FormattedMessage id="updatePaymentMethod.update" defaultMessage="Save changes" />
                }
              />
            ) : (
              <LoaderSpinner />
            )}
          </Section>
        </SectionsWrapper>
      </Container>
    );
  }
}

export default compose(
  connect(state => ({
    memberId: getMemberId(state),
  })),
  withRequest({
    requestIdAlias: 'memberId',
    requestAction: fetchPaymentMethodsForMember,
  }),
  connect(
    state => ({
      paymentMethod: getCurrentPaymentMethod(state),
      targetDevice: getTargetDevice(state),
    }),
    { addPaymentMethod }
  ),
  withRouter
)(MyAccount);
