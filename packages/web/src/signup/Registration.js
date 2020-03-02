import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { authCtaAction } from 'xi-core/signup/actions';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import { Grey85, AuthenticationRed } from 'xi-core/colours';
import { authenticationSteps } from 'xi-core/signup/constants';
import { HelperDevices, CoreDevices } from '../common/dimensions';
import Cross from '../common/icons/Cross';
import { FontFamily } from '../common/typography';
import { UnstyledButtonLink, ViolaButton } from '../common/buttons';
import ExpandClickableArea from '../common/ExpandClickableArea';

const OverlayBG = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.66);

  @media ${CoreDevices.large}, ${CoreDevices.medium}, ${HelperDevices.belowMediumLandscape} {
    flex-direction: row;
  }
`;

const Content = styled.div`
  position: relative;
  display: inline-block;
  height: 100%;
  width: 100%;
  background-color: ${AuthenticationRed};

  @media ${CoreDevices.large}, ${CoreDevices.medium}, ${HelperDevices.belowMediumLandscape} {
    max-width: 750px;
    max-height: 464px;
    display: flex;
    margin: 24px;
  }
`;

const LogoContainer = styled.div`
  z-index: 1;
  height: 50px;
  background-color: ${AuthenticationRed};
  width: 100%;
  text-align: center;

  @media ${CoreDevices.large}, ${CoreDevices.medium}, ${HelperDevices.belowMediumLandscape} {
    display: none;
  }
`;

const DesktopLogoContainer = styled.div`
  z-index: 1;
  height: 40px;
  background-color: ${AuthenticationRed};
  width: 100%;
  text-align: center;

  @media ${HelperDevices.belowMedium} {
    display: none;
  }
`;

const Logo = styled.img`
  z-index: 1;
  height: 19px;
  margin-top: 34px;

  @media ${CoreDevices.large}, ${CoreDevices.medium}, ${HelperDevices.belowMediumLandscape} {
    height: 40px;
    margin: 0px;
  }
`;

const MobileHero = styled.img`
  border-top: 8px solid white;
  margin-top: 20px;

  @media ${HelperDevices.belowMedium} {
    position: relative;
    left: 0;
    right: 0;
    width: 100%;
  }

  @media ${CoreDevices.large}, ${CoreDevices.medium}, ${HelperDevices.belowMediumLandscape} {
    display: none;
  }
`;

const DesktopHero = styled.img`
  @media ${HelperDevices.belowMedium} {
    display: none;
  }

  @media ${CoreDevices.large}, ${CoreDevices.medium}, ${HelperDevices.belowMediumLandscape} {
    position: relative;
    left: 0;
    right: 0;
  }
`;

export const LinearGradient = styled.div`
  background-image: linear-gradient(to bottom, rgba(35, 35, 35, 0), ${Grey85});

  @media ${HelperDevices.belowMedium} {
    position: absolute;
    left: 0;
    top: 175px;
    right: 0;
    width: 100%;
    height: 200px;
  }

  @media ${CoreDevices.large}, ${CoreDevices.medium}, ${HelperDevices.belowMediumLandscape} {
    display: none;
  }
`;

export const Ctas = styled.div`
  display: flex;
  padding: 24px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: ${AuthenticationRed};

  @media ${HelperDevices.belowMedium} {
    left: 0;
    bottom: 0;
    right: 0;
  }

  @media ${CoreDevices.tiny} {
    padding-bottom: 20px;
  }

  @media ${CoreDevices.large}, ${CoreDevices.medium} {
    width: 50%;
  }

  @media ${HelperDevices.belowMediumLandscape} {
    left: auto;
    right: 0;
    width: 40%;
    margin-bottom: 0px;
    padding-bottom: 10px;
  }
`;

const Description = styled.div`
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  margin-top: 24px;
  text-align: center;
  ${FontFamily.regular}
`;

const CreateAccountCtaContainer = styled.div`
  margin-top: 24px;
  padding: 0px 24px;
  text-align: center;
  width: 100%;
`;

const StyledViolaButton = styled(ViolaButton)`
  padding: 16px;
  width: 100%;
  font-size: 14px;

  @media ${CoreDevices.large}, ${CoreDevices.medium}, ${HelperDevices.belowMediumLandscape} {
    padding: 10px;
  }
`;

const LoginLink = styled.div`
  color: #fff;
  text-align: center;
  margin-top: 36px;
  text-transform: uppercase;
  ${FontFamily.bold}
  font-size: 14px;
  cursor: pointer;
`;

const StyledCloseButtonContainer = styled(ExpandClickableArea)`
  position: absolute;
  right: 28px;
  top: 28px;

  @media ${HelperDevices.belowMedium} {
    display: none;
  }

  @media ${CoreDevices.large}, ${CoreDevices.medium}, ${HelperDevices.belowMediumLandscape} {
    display: block;
  }
`;

const BackButtonContainer = styled.div`
  z-index: 2;

  @media ${HelperDevices.belowMedium} {
    display: block;
  }

  @media ${CoreDevices.large}, ${CoreDevices.medium}, ${HelperDevices.belowMediumLandscape} {
    display: none;
  }
`;

class Registration extends React.Component {
  render() {
    const { backButton, closeWizard, changeStep } = this.props;
    return (
      <OverlayBG>
        <LogoContainer>
          <Logo src="/images/logo/otro-logo@2x.png" alt="Otro" />
        </LogoContainer>

        <Content>
          <StyledCloseButtonContainer>
            <UnstyledButtonLink onClick={closeWizard} data-test-id="close">
              <Cross />
            </UnstyledButtonLink>
          </StyledCloseButtonContainer>

          <MobileHero
            alt="RegistrationImage"
            src="/images/hero-join-mobile.svg"
            crossOrigin="anonymous"
          />

          <DesktopHero
            alt="RegistrationImage"
            src="/images/hero-join-desktop.svg"
            crossOrigin="anonymous"
          />

          <Ctas>
            <DesktopLogoContainer>
              <Logo src="/images/logo/otro-logo@3x.png" alt="Otro" />
            </DesktopLogoContainer>

            <Description>
              <FormattedMessage
                id="registration.description"
                defaultMessage="Sign up now for full and unrestricted access to the latest videos giving you the inside track on modern football"
              />
            </Description>

            <CreateAccountCtaContainer>
              <StyledViolaButton
                onClick={() => {
                  authCtaAction();
                  changeStep(authenticationSteps.JoinOptions);
                }}
                data-test-id="registration-signup-cta"
              >
                <FormattedMessage
                  id="registration.createAccount"
                  defaultMessage="Create Your Free Account"
                />
              </StyledViolaButton>
            </CreateAccountCtaContainer>

            <LoginLink
              onClick={() => {
                authCtaAction();
                changeStep(authenticationSteps.SignInWithEmail);
              }}
              data-test-id="registration-login-cta"
            >
              <FormattedMessage
                id="registration.login"
                defaultMessage="Already have an account? - Log in"
              />
            </LoginLink>
          </Ctas>
        </Content>
        <BackButtonContainer>{backButton}</BackButtonContainer>
      </OverlayBG>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authCtaAction: () => dispatch(authCtaAction(PropertyKeys.COMMON_AUTH_ACTION.REGISTRATION)),
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(Registration);
