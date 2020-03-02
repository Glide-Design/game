import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import LocaleProvider from 'xi-core/locale/LocaleProvider';
import { Grey85 } from 'xi-core/colours';
import { posFixedZIndex, CoreDevices } from '../common/dimensions';
import FixedFullScreenContainer from '../common/FixedFullScreenContainer';
import UpdatingIcon from '../common/icons/Updating';
import { Body1, H3, H1 } from '../common/typography';
import { TopLogo } from '../discovery/Discovery';

const StyledFixedFullScreenContainer = styled(FixedFullScreenContainer)`
  z-index: ${posFixedZIndex.serviceWorkerUpdating};
  background: ${Grey85};
  color: white;
  display: none;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  & > * {
    margin-bottom: 40px;
  }
`;

const StyledLogo = styled.img`
  display: none;
  height: 58px;
  margin-bottom: 100px;
  @media ${CoreDevices.large} {
    display: block;
  }
`;

const TopLogoContainer = styled.div`
  height: 100px;
  @media ${CoreDevices.large} {
    display: none;
  }
`;

const TitleText = styled.span`
  text-align: center;
  ${H3};
  @media ${CoreDevices.large} {
    ${H1};
  }
`;

const Updating = styled.span`
  ${Body1};
`;

export default () => (
  <LocaleProvider>
    <StyledFixedFullScreenContainer id="serviceWorkerUpdatingScreen">
      <TopLogoContainer>
        <TopLogo />
      </TopLogoContainer>
      <Container>
        <StyledLogo src="/images/logo/otro-logo@3x.png" alt="Otro" />
        <UpdatingIcon />
        <TitleText>
          <FormattedMessage
            id="appUpdating.becameBetter"
            defaultMessage="We're improving your experience."
          />
        </TitleText>
        <Updating>
          <FormattedMessage id="appUpdating.updating" defaultMessage="Loading..." />
        </Updating>
      </Container>
    </StyledFixedFullScreenContainer>
  </LocaleProvider>
);
