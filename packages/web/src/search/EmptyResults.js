import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
  getIsLoading,
  getSearchTerm,
  hasSearchTermChangedFromLastResult,
} from 'xi-core/search/selectors';
import { PlaceholderContainer } from './Placeholder';

const EmptyResults = ({ isLoading, searchTerm, searchTermChangedFromLastResult }) => (
  <React.Fragment>
    {!searchTermChangedFromLastResult && !isLoading && (
      <PlaceholderContainer>
        <h1>
          <FormattedMessage
            id="search.no_results"
            defaultMessage={'No results found for "{searchTerm}"'}
            values={{ searchTerm }}
          />
        </h1>
        <span>
          <FormattedMessage
            id="search.no_results_hint"
            defaultMessage="No matches. Please check your spelling or try with different words."
          />
        </span>
      </PlaceholderContainer>
    )}
  </React.Fragment>
);

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  searchTermChangedFromLastResult: hasSearchTermChangedFromLastResult(state),
  searchTerm: getSearchTerm(state),
});

export default connect(mapStateToProps)(EmptyResults);
