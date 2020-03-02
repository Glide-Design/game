import React from 'react';
import styled from 'styled-components';
import { CoreDevices } from '../../../common/dimensions';

const ContentPartnerLogo = styled.img`
  align-self: flex-start;
  margin-bottom: -10px;
  max-height: 40px;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    max-height: 50px;
  }
`;

export default ({contentPartner}) => <ContentPartnerLogo src={contentPartner.logoUrl} alt={contentPartner.name} />;