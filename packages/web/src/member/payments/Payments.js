import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, getOr } from 'lodash/fp';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { getMemberId, isAuthenticated, getPaymentHistory } from 'xi-core/member/selectors';
import { isPaymentProcessing } from 'xi-core/member/selectors';
import { fetchPaymentHistory } from 'xi-core/member/actions';
import withRequest from 'xi-core/withRequest';
import { Grey5, Grey15 } from 'xi-core/colours';
import { CoreDevices, NAVBAR_HEIGHT_PX } from '../../common/dimensions';
import { Body2 } from '../../common/typography';
import ProfileTopIcons from '../../profile/ProfileTopIcons';
import Settings from '../../profile/Settings';
import Price from '../../purchases/components/Price';
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
  position: relative;

  ${({ largeDevice }) => (largeDevice ? 'width: 400px;' : '')};
`;

const PaymentLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  padding: 22px;
  border-bottom: 1px solid ${Grey5};
`;

const Detail = styled.div`
  flex: 1;
`;
const PriceArea = styled.div`
  flex: 1;
  padding-left: 10px;
  text-align: right;
`;
const DateArea = styled.div`
  color: ${Grey15};
  margin-top: 10px;
`;

const SectionTitle = styled.div`
  ${Body2};
  margin-bottom: 20px;
`;

class MyAccount extends React.Component {
  componentDidMount() {
    const { history, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      history.replace(routes.settings.path);
    }
  }

  render() {
    const { targetDevice, payments, isPaymentProcessing } = this.props;

    const largeDevice = targetDevice === 'large';

    const paymentHistory = (
      <FormattedMessage id="payments.PaymentHistory" defaultMessage="Payment History" />
    );

    const paymentIsProcessing = (
      <FormattedMessage id="membership.paymentProcessing" defaultMessage="Processing..." />
    );

    return (
      <Container>
        {!largeDevice && (
          <StyledProfileTopIcons
            fixedTopBackground={0}
            hideBackButton={false}
            fullName={paymentHistory}
          />
        )}
        {largeDevice ? (
          <SettingsMenuWrapper>
            <Settings wrapped={true} active="myaccount" />
          </SettingsMenuWrapper>
        ) : null}
        <SectionsWrapper largeDevice={largeDevice}>
          <Section largeDevice={largeDevice}>
            {largeDevice ? <SectionTitle>{paymentHistory}</SectionTitle> : null}
            {isPaymentProcessing
              ? paymentIsProcessing
              : payments.map(payment => (
                  <PaymentLine>
                    <Detail>
                      {getOr('', 'product.offers[0].name', payment)}
                      <DateArea>
                        {payment.paymentOn ? moment(payment.paymentOn).format('DD/MM/YYYY') : null}
                      </DateArea>
                    </Detail>
                    <PriceArea>
                      <Price
                        price={{
                          price: payment.grossPricePaid,
                          iso4127CurrencyCode: payment.currencyCode,
                        }}
                      />
                    </PriceArea>
                  </PaymentLine>
                ))}
          </Section>
        </SectionsWrapper>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  memberId: getMemberId(state),
  targetDevice: getTargetDevice(state),
  isAuthenticated: isAuthenticated(state),
  payments: getPaymentHistory(state),
  isPaymentProcessing: isPaymentProcessing(state),
});

export default compose(
  withRequest({
    requestAction: fetchPaymentHistory,
    requestIdEmpty: true,
  }),
  connect(mapStateToProps),
  withRouter
)(MyAccount);
