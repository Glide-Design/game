import React from 'react';
import styled from 'styled-components';
import { Body10, Body1 } from '../../common/typography';
import { CoreDevices } from '../../common/dimensions';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #e4253f;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  color: white;
`;

const ContentsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  overscroll-behavior: contain;
  ${Body1};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${Body10};
  }
`;

const SignInContainer = ({ children }) => (
  <Wrapper>
    <ContentsContainer>{children}</ContentsContainer>
  </Wrapper>
);

export default SignInContainer;
