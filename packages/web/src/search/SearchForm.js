import { compose } from 'lodash/fp';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter, matchPath } from 'react-router-dom';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { search } from 'xi-core/search/actions';
import { INPUT_DEBOUNCE } from 'xi-core/search/constants';
import { Grey20, Grey85 } from 'xi-core/colours';
import { TextFieldReduxForm } from '../common/TextField';
import { routes } from '../App';

const BorderedTextField = styled(TextFieldReduxForm)`
  -webkit-appearance: none;
  padding: 14px;
  border: solid 1px ${Grey20};
  color: ${Grey85};
  margin: 23px;
  height: unset;
  width: calc(100% - 46px) !important;
`;

const SearchField = ({ className, children, doSearch, onFocus, location }) => (
  <React.Fragment>
    <FormattedMessage id="search.search_placeholder" defaultMessage="Search">
      {placeholder => (
        <Field
          className={className}
          name="searchTerm"
          type="search"
          placeholder={placeholder}
          component={BorderedTextField}
          onChange={(event, searchTerm) => doSearch(searchTerm)}
          onFocus={onFocus}
          autoFocus={matchPath(location.pathname, routes.search.path)}
          aria-label={placeholder}
        />
      )}
    </FormattedMessage>
    {children}
  </React.Fragment>
);

const mapDispatchToProps = dispatch => ({
  doSearch: debounce(term => {
    dispatch(search(term));
  }, INPUT_DEBOUNCE),
});

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  ),
  reduxForm({
    form: 'search',
    destroyOnUnmount: false,
  })
)(SearchField);
