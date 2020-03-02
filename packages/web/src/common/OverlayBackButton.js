import React from 'react';
import styled from 'styled-components';
import { CoreDevices, SIDE_MARGIN_PX } from './dimensions';
import BackButton from './BackButton';

const StyledBackButton = styled(BackButton)`
  color: white;
  position: absolute !important;
  top: 30px;
  left: ${SIDE_MARGIN_PX.small}px;

  @media ${CoreDevices.medium} {
    top: 40px;
    left: ${SIDE_MARGIN_PX.medium}px;
  }

  @media ${CoreDevices.large} {
    top: 40px;
    left: ${SIDE_MARGIN_PX.large}px;
  }
`;

const OverlayBackButton = ({ onClick, className }) => (
  <StyledBackButton onClick={onClick} className={className} />
);

export default OverlayBackButton;
