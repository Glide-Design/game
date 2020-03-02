import React from 'react';
import styled from 'styled-components';
import { Grey85 } from 'xi-core/colours';
import { CoreDevices, ContainerPaddingCss, posFixedZIndex, TOOLBAR_HEIGHT_PX } from './dimensions';
import { H4, H2 } from './typography';

const TitleContainer = styled.div`
  background-color: ${Grey85};
  color: white;
  width: 100%;
  pointer-events: auto;
  z-index: ${posFixedZIndex.fixedToolbar};
  ${({ position }) => (position ? `position: ${position}` : '')};
  top: 0;

  @media ${CoreDevices.tiny} {
    height: ${TOOLBAR_HEIGHT_PX.tiny}px;
  }
  @media ${CoreDevices.small} {
    height: ${TOOLBAR_HEIGHT_PX.small}px;
  }
  @media ${CoreDevices.medium} {
    height: ${TOOLBAR_HEIGHT_PX.medium}px;
  }
  @media ${CoreDevices.large} {
    height: ${TOOLBAR_HEIGHT_PX.large}px;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  ${ContainerPaddingCss};
  height: 100%;
`;

const Title = styled.h2`
  flex-grow: 1;
  ${H4};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H2};
  }
  text-align: center;
`;

const FixedToolbar = ({ children, position, leftButton, rightButton, title, className }) => (
  <TitleContainer position={position} className={className}>
    <InnerContainer>
      {leftButton ? leftButton : null}
      {title ? <Title>{title}</Title> : null}
      {rightButton ? rightButton : null}
      {children}
    </InnerContainer>
  </TitleContainer>
);

export default FixedToolbar;
