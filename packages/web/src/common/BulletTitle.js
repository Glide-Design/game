import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, H10, H14 } from './typography';
import TruncateMultiline from './TruncateMultiline';
import { CoreDevices, SIDE_MARGIN_PX, ROW_HEIGHT_PX, ContainerPaddingCss } from './dimensions';

const TitleContainer = styled.div`
  // height: ${ROW_HEIGHT_PX * 12}px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const ICON_CLICKABLE_PADDING_PX = 12;
const TitleArrow = styled.img`
  margin-right: ${SIDE_MARGIN_PX.small - ICON_CLICKABLE_PADDING_PX}px;
  margin-top: ${17 - ICON_CLICKABLE_PADDING_PX}px;
  padding: ${ICON_CLICKABLE_PADDING_PX}px; // Larger clickable area
  @media ${CoreDevices.medium} {
    margin-right: ${SIDE_MARGIN_PX.medium - ICON_CLICKABLE_PADDING_PX}px;
  }
  @media ${CoreDevices.large} {
    width: 30px;
    margin-right: ${SIDE_MARGIN_PX.large - ICON_CLICKABLE_PADDING_PX}px;
  }
`;

export const TitleText = styled.span`
  ${H1};
  ${ContainerPaddingCss};
  ${TruncateMultiline({ linesToShow: 2, lineHeight: 0.92, fontSize: '48px' })};
  flex-grow: 1;
  @media ${CoreDevices.medium} {
    ${H10};
    ${TruncateMultiline({ linesToShow: 2, lineHeight: 0.9, fontSize: '80px' })};
  }
  @media ${CoreDevices.large} {
    ${H14};
    ${TruncateMultiline({ linesToShow: 2, lineHeight: 0.82, fontSize: '88px' })};
  }
`;

const LargeTitleText = styled.h1`
  ${H1};
  ${ContainerPaddingCss};
  ${TruncateMultiline({ linesToShow: 3, lineHeight: 0.92, fontSize: '48px' })};
  flex-grow: 1;

  @media ${CoreDevices.medium} {
    ${H14};
    ${TruncateMultiline({ linesToShow: 3, lineHeight: 0.82, fontSize: '88px' })};
  }
  @media ${CoreDevices.large} {
    ${H14};
    ${TruncateMultiline({ linesToShow: 2, lineHeight: 0.82, fontSize: '88px' })};

    // Title gets clipped when the line-height is less than 0.9
    // Offsetting the inner span fixes this
    span {
      position: relative;
      top: 4px;
    }
  }
`;

export const BulletTitleContainer = ({
  colour = '#FFF',
  children,
  arrowLink = null,
  className,
}) => (
  <TitleContainer className={className}>
    {children}
    {arrowLink ? (
      <Link to={arrowLink}>
        <TitleArrow src="/images/forward-arrow.svg" />
      </Link>
    ) : null}
  </TitleContainer>
);

export default ({ children, colour = '#FFF', className, arrowLink = null, largeText }) => (
  <BulletTitleContainer colour={colour} arrowLink={arrowLink} className={className}>
    {largeText ? (
      <LargeTitleText>
        <span>{children}</span>
      </LargeTitleText>
    ) : (
      <TitleText>
        <span>{children}</span>
      </TitleText>
    )}
  </BulletTitleContainer>
);
