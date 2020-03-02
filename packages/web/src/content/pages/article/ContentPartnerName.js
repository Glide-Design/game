import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CoreDevices } from '../../../common/dimensions';
import { Body1, Body10 } from '../../../common/typography';

const ContentPartnerContainer = styled.div`
  ${Body1};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${Body10};
  }
  margin-bottom: 15px;
`;

const ContentPartner = styled.span`
  font-weight: bold;
`;

const ContentPartnerLink = styled(Link)`
  color: inherit;
`;

export default ({ contentPartner }) =>
  contentPartner.name ? (
    <ContentPartnerContainer>
      <ContentPartner>
        {contentPartner.websiteUrl ? (
          <ContentPartnerLink to={contentPartner.websiteUrl} target="_blank">
            {contentPartner.name}
          </ContentPartnerLink>
        ) : (
          contentPartner.name
        )}
        {contentPartner.description ? ' - ' : null}
      </ContentPartner>
      {contentPartner.description}
    </ContentPartnerContainer>
  ) : null;
