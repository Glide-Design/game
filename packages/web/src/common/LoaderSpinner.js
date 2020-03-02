import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const LoaderWrapper = styled.div``;

export default ({ className }) => (
  <LoaderWrapper className={className}>
    <Loader type="ThreeDots" color="#cbcbcb" height="30" width="30" />
  </LoaderWrapper>
);
