import React from 'react';
import styled from 'styled-components';
import LoaderSpinner from '../common/LoaderSpinner';

const StyledLoaderSpinner = styled(LoaderSpinner)`
  margin: auto;
  position: relative;
  & > * {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
`;

const SearchSpinner = ({ isLoading = false }) => (isLoading ? <StyledLoaderSpinner /> : null);

export default SearchSpinner;
