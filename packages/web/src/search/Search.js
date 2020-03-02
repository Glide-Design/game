import { compose } from 'lodash/fp';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { lifecycle } from 'recompose';
import {
  getIsLoading,
  hasSearchTermChangedFromLastResult,
  isSearchTermEmpty,
} from 'xi-core/search/selectors';
import { loadFromStorage } from 'xi-core/search/actions';
import { CoreDevices } from '../common/dimensions';
import { FixedFullScreenContainerAnimated } from '../common/FixedFullScreenContainer';
import SearchResults from './SearchResults';
import Placeholder from './Placeholder';
import SearchForm from './SearchForm';
import SearchSpinner from './SearchSpinner';

const StyledFixedFullScreenContainerAnimated = styled(FixedFullScreenContainerAnimated)`
  background-color: #fff;
  color: black;
  overflow: auto;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSearchForm = styled(SearchForm)`
  @media ${CoreDevices.large} {
    display: none;
  }
`;

const Search = ({ isLoading, searchTermChangedFromLastResult, searchTermIsEmpty = false }) => (
  <StyledFixedFullScreenContainerAnimated navBarVisible>
    <SearchContainer>
      <StyledSearchForm />
      <SearchSpinner
        isLoading={!searchTermIsEmpty && (isLoading || searchTermChangedFromLastResult)}
      />
      {searchTermIsEmpty ? <Placeholder /> : <SearchResults />}
    </SearchContainer>
  </StyledFixedFullScreenContainerAnimated>
);

const mapStateToProps = state => ({
  searchTermChangedFromLastResult: hasSearchTermChangedFromLastResult(state),
  searchTermIsEmpty: isSearchTermEmpty(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  loadRecentSearches: () => dispatch(loadFromStorage()),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentWillMount() {
      this.props.loadRecentSearches();
      document.title = 'OTRO';
    },
  })
)(Search);
