import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  ${({ hideFade }) =>
    !hideFade &&
    `&:after {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    background: rgba(19, 67, 120, 0.3);

    mix-blend-mode: darken;
  }`}
`;

export const LinearGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 40%;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #000000);
`;

export default ({ children, hideLinearGradient, hideFade }) => (
  <Container hideFade={hideFade}>
    {children}
    {!hideLinearGradient && <LinearGradient />}
  </Container>
);
