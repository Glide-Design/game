import React from 'react';
import styled from 'styled-components';
import { CoreDevices, ContainerPaddingCss } from '../../common/dimensions';
import { BodySmall } from '../../common/typography';
import ContentInteractionFooter from '../components/ContentInteractionFooter';
import Partner from '../components/Partner';

const ContentDetails = styled.div`
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 18px;
  padding-bottom: 18px;

  @media ${CoreDevices.medium} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  @media ${CoreDevices.large} {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  ${ContainerPaddingCss};
`;

const IconPartnerRow = styled.div`
  position: relative;
`;

const StyledPartner = styled(Partner)`
  position: absolute;
  right: 0;
  top: 0;
  max-width: 150px;
  ${BodySmall};
`;

export default ({
  tag,
  icon,
  title,
  contentPartnerName,
  description,
  timestamp,
  className,
  contentId,
  partner = {},
  isFree = true,
  shareClicked,
}) => (
  <ContentDetails className={className}>
    {timestamp}
    <IconPartnerRow>
      {icon}
      {partner.creatives ? (
        <StyledPartner
          creatives={partner.creatives}
          alt={partner.titleBrief}
          url={partner.websiteUrl}
          contentDetail
        />
      ) : null}
    </IconPartnerRow>
    {tag}
    {title}
    {contentPartnerName}
    {description}
    <ContentInteractionFooter contentId={contentId} shareClicked={shareClicked} />
  </ContentDetails>
);
