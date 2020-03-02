import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { Grey85 } from 'xi-core/colours';
import { errorMessages } from 'xi-core/errors/messages';
import Alert from '../common/icons/Alert';
import { H2 } from '../common/typography';
import { Button3 } from '../common/buttons';

let localStorageAvailable = true;
// As per https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available
try {
  const test = 'olctest';
  localStorage.setItem(test, test);
  localStorage.removeItem(test);
} catch (e) {
  localStorageAvailable = false;
}

const isIOSSafari = (() => {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  return iOS && webkit && !ua.match(/CriOS/i);
})();

const ErrorContainer = styled.div`
  background-color: ${Grey85};
  color: white;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25px;
  text-align: center;
`;

const Title = styled.div`
  ${H2};
`;

const HomeButton = styled(Button3)`
  margin-top: 25px;
`;

const safariLocalStorageIOSCheck =
  !localStorageAvailable && isIOSSafari ? (
    <h3>
      <br />
      <FormattedMessage
        id="error.unblockSafariCookies"
        defaultMessage="Please visit your Safari settings and allow cookies."
      />
    </h3>
  ) : null;

class ErrorPage extends React.Component {
  handleClickHome = () => {
    const { clearError } = this.props;
    clearError && clearError();
    window.location.href = window.location.origin;
  };

  render() {
    return (
      <IntlProvider locale="en">
        <ErrorContainer>
          <Alert />
          <TitleContainer>
            {/*<Title>
            <FormattedMessage id="error.oops" defaultMessage="Oops" />
          </Title>*/}
            <Title>
              <FormattedMessage {...errorMessages.something_went_wrong} />
            </Title>

            {safariLocalStorageIOSCheck}
          </TitleContainer>
          <HomeButton onClick={this.handleClickHome}>
            <FormattedMessage id="error.button_message" defaultMessage="Retry" />
          </HomeButton>
        </ErrorContainer>
      </IntlProvider>
    );
  }
}
export default ErrorPage;
