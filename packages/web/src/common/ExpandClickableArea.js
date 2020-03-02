import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  & > *:first-child {
    position: relative;
  }

  & > *:first-child:after {
    content: '';
    position: absolute;
    top: -${({ size }) => size}px;
    bottom: -${({ size }) => size}px;
    left: -${({ size }) => size}px;
    right: -${({ size }) => size}px;
  }
`;

const ExpandClickableArea = ({ className, size = 10, children }) => (
  <Wrapper size={size} className={className}>
    {children}
  </Wrapper>
);

export default ExpandClickableArea;
