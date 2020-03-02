import React from 'react';
import styled from 'styled-components';
import { Grey85, PrimaryGreen } from 'xi-core/colours';

const Container = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  height: ${props => props.height || '3'}px;
  background-color: ${Grey85};
`;

const Bar = styled.div`
  content: "";
  display: inline;
  position: absolute;
  width: 0;
  height: 100%;
  left: 50%;
  text-align: center;
}

&:nth-child(1) {
  background-color: ${PrimaryGreen};
  animation: loading 2s linear infinite;
}

&:nth-child(2) {
  background-color: ${Grey85};
  animation: loading 2s linear 1s infinite;
}

@keyframes loading {
  from {left: 50%; width: 0; z-index: 5;}
  50% {left: 0; width: 100%; z-index: 4;}
  to {left: 0; width: 100%;}
}
`;

export default ({ className, height }) => (
  <Container className={className} height={height}>
    <Bar />
    <Bar />
  </Container>
);
