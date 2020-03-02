import React from 'react';
import styled from 'styled-components';
import { UnstyledButtonLink } from './buttons';
import Cross from './icons/Cross';
import { HelperDevices } from './dimensions';

const StyledButtonLink = styled(UnstyledButtonLink)`
  position: absolute;
  top: 60px;
  right: 60px;
  @media ${HelperDevices.belowMedium} {
    top: 20px;
    right: 20px;
  }
`;

 const OverlayCloseButton = ({ onClick }) => (
    <StyledButtonLink
        onClick={onClick}
    >
        <Cross />
    </StyledButtonLink>
);

export default OverlayCloseButton;
