import React from 'react';
import styled from 'styled-components';
import { Grey40 } from 'xi-core/colours';
import { posFixedZIndex, CoreDevices } from './dimensions';

const Wrapper = styled.div`
  ${({ position }) => `position: ${position};`}
  z-index: ${posFixedZIndex.progressBar};
  top: 34px;
  left: 0;
  width: 100%;
  height: 4px;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    top: 49px;
  }
`;

const Inner = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  height: 4px;
`;

const Step = styled.div`
  height: 4px;
  ${({ selected }) => (selected ? 'background-color: #fff;' : `background-color: ${Grey40};`)}
  margin: 5px 4px;
  flex: 1;
`;

class Progress extends React.Component {
  render() {
    const { stepCount = 4, currentStep = 1, position = 'absolute' } = this.props;
    const steps = Array.from(Array(stepCount));

    return (
      <Wrapper position={position}>
        <Inner>
          {steps.map((item, idx) => (
            <Step count={stepCount} selected={idx + 1 === currentStep} />
          ))}
        </Inner>
      </Wrapper>
    );
  }
}

export default Progress;
