import { isEmpty } from 'lodash/fp';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getRecentSearches } from 'xi-core/search/selectors';
import SearchIcon from '../common/icons/Search';
import RecentSearches from './RecentSearches';

export const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50vh;
  justify-content: center;
  padding: 24px;
  text-align: center;
`;

const StyledSearchIcon = styled(SearchIcon)`
  height: 44px;
  width: 44px;
  margin-bottom: 10px;
`;

const Placeholder = ({ recentSearches }) =>
  isEmpty(recentSearches) ? (
    <PlaceholderContainer>
      <StyledSearchIcon alt="search" />
      <h1>
        <FormattedMessage
          id="search.find_what_you_are_looking_for"
          defaultMessage="What are you looking for?"
        />
      </h1>
      <span>
        <FormattedMessage
          id="search.search_by"
          defaultMessage="Search by player, keyword, subject..."
        />
      </span>
    </PlaceholderContainer>
  ) : (
    <RecentSearches />
  );

const mapStateToProps = state => ({
  recentSearches: getRecentSearches(state),
});

export default connect(mapStateToProps)(Placeholder);
