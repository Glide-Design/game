import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import queryString from 'query-string';
import { getExternalLink } from 'xi-core/config/selectors';
import { CoreDevices, HelperDevices } from '../../common/dimensions';
import DefaultBackground from '../../content/tiles/components/DefaultBackground';
import { LinearGradient } from '../../content/components/Gradients';
import otroWhiteLogo from '../../common/images/otro-white.svg';
import { SolidGreenButton } from '../../common/buttons/Buttons';
import { FontFamily } from '../../common/typography';
import { getTargetDevice, getOrientation } from '../../state/app/selectors';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const PlayerImageBase = styled.img`
  position: absolute;
  left: 0;
  top: 0%;
  width: 100%;
  height: 100%;
`;

const PlayerImagePortrait = styled(PlayerImageBase)`
  object-fit: cover;
`;

const PlayerImageLandscape = styled(PlayerImageBase)`
  object-fit: contain;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 180px;
  height: 59px;
  margin-top: 58px;

  @media ${CoreDevices.medium} {
    margin-top: 48px;
  }

  @media ${CoreDevices.small} {
    width: 120px;
    height: 39px;
    margin-top: 38px;
  }

  @media ${CoreDevices.tiny} {
    width: 97px;
    height: 31px;
    margin-top: 28px;
  }
`;

const CtaContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSolidGreenButton = styled(SolidGreenButton)`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  ${FontFamily.bold}

  @media ${CoreDevices.large} {
    width: 430px;
    height: 96px;
    font-size: 28px;
  }

  @media ${CoreDevices.medium} {
    width: 323px;
    height: 72px;
    font-size: 21px;
  }

  @media ${HelperDevices.belowMedium} {
    width: 215px;
    height: 48px;
    font-size: 14px;
  }
`;

const Message = styled.div`
  text-align: center;

  @media ${CoreDevices.large} {
    padding: 40px;
    margin-bottom: 106px;
    font-size: 20px;
  }

  @media ${CoreDevices.medium} {
    padding: 30px;
    margin-bottom: 106px;
    font-size: 20px;
  }

  @media ${CoreDevices.small} {
    padding: 20px;
    margin-bottom: 73px;
    font-size: 14px;
  }

  @media ${CoreDevices.tiny} {
    padding: 20px;
    margin-bottom: 43px;
    font-size: 12px;
  }
`;

const PLAYER_ID_PREFIXES = ['TW_', 'FB_', 'IGstory_', 'IG_'];

const getPlayerName = search => {
  const queryParams = queryString.parse(search);
  const playerId = queryParams.c || '';

  for (let prefix of PLAYER_ID_PREFIXES) {
    if (playerId.startsWith(prefix)) {
      return playerId.slice(prefix.length);
    }
  }

  return playerId;
};

const fixQueryParams = search => {
  const queryParams = queryString.parse(search);

  // Some onelinks will forward to app landing without a ‘af_dp’ query parameter
  // and will instead contain an ‘odeeplink' parameter.
  // This 'odeeplink’ parameter should be copied into the CTA link as 'af_dp '
  if (!queryParams.af_dp && queryParams.odeeplink) {
    return `${search}&af_dp=${encodeURIComponent(queryParams.odeeplink)}`;
  }

  return search;
};

const AppLanding = ({ targetDevice, orientation, appLandingLink, location: routerLocation }) => {
  const PlayerImage = orientation === 'landscape' ? PlayerImageLandscape : PlayerImagePortrait;

  const playerName = getPlayerName(routerLocation.search);
  const playerImageSrc = `/images/appLanding/${targetDevice}/${playerName}.jpg`;
  const defaultPlayerImageSrc = `/images/appLanding/${targetDevice}/leomessi.jpg`;

  const fixedQueryParams = fixQueryParams(routerLocation.search);
  const appLandingUrl = appLandingLink + fixedQueryParams;

  return (
    <Container>
      <DefaultBackground />
      <PlayerImage
        alt="PlayerImage"
        src={playerImageSrc}
        crossOrigin="anonymous"
        onError={e => {
          e.target.onerror = null;
          e.target.src = defaultPlayerImageSrc;
        }}
      />
      <LinearGradient />
      <Content>
        <Logo src={otroWhiteLogo} alt="Otro" />
        <CtaContainer>
          <StyledSolidGreenButton
            onClick={() => {
              /* eslint-disable no-restricted-globals */
              location.href = appLandingUrl;
              /* eslint-enable no-restricted-globals */
            }}
          >
            <FormattedMessage id="appLanding.cta" defaultMessage="OPEN IN APP" />
          </StyledSolidGreenButton>
          <Message>
            <FormattedMessage
              id="appLanding.message"
              defaultMessage="Open the OTRO app to view this content."
            />
          </Message>
        </CtaContainer>
      </Content>
    </Container>
  );
};

export default connect(state => ({
  targetDevice: getTargetDevice(state),
  orientation: getOrientation(state),
  appLandingLink: getExternalLink('appLanding')(state),
}))(AppLanding);
