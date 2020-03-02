import React from 'react';
import { connect } from 'react-redux';
import { withProps, branch } from 'recompose';
import { compose, first, isEqual } from 'lodash/fp';
import { getTotalElements, getFetching, getScrollOffset, getPage } from './app/selectors';
import { saveScrollPosition } from './app/actions';

const DEFAULT_ITEMS_PER_PAGE = 20; // Nice and big for large devices

const RequestDefaultArgumentKey = 'requestId';
const RequestAliasArgumentKey = 'requestIdAlias';
const RequestHasNoArgumentsKey = 'requestIdEmpty';

const prepareArguments = value => {
  if (Array.isArray(value)) {
    const oneOrMoreValuesEmpty = value.some(v => !v);
    return oneOrMoreValuesEmpty ? [] : value;
  } else if (value) {
    return [value];
  }

  return [];
};

const getArgumentValuesFromAlias = props => {
  const aliasKey = props[RequestAliasArgumentKey];
  if (Array.isArray(aliasKey)) {
    return aliasKey.map(key => props[key]);
  } else if (props[aliasKey]) {
    return props[aliasKey];
  }
};

const getRequestArguments = props => {
  let argumentValues = null;

  if (props[RequestAliasArgumentKey]) {
    argumentValues = getArgumentValuesFromAlias(props);
  } else if (props[RequestDefaultArgumentKey]) {
    argumentValues = props[RequestDefaultArgumentKey];
  }

  return prepareArguments(argumentValues);
};

export default (extraProps = {}) => WrappedComponent => {
  class withRequest extends React.Component {
    componentDidMount() {
      if (this.requestCondition() && (this.requestHasNoArguments() || this.readyToRequest())) {
        this.props.makeRequest();
      }
    }

    componentDidUpdate(prevProps) {
      if (this.shouldRequestOnUpdate(prevProps)) {
        this.props.makeRequest();
      }
    }

    requestCondition = () =>
      !this.props.requestCondition || this.props.requestCondition(this.props);

    requestHasNoArguments = () => this.props[RequestHasNoArgumentsKey];

    readyToRequest = () => getRequestArguments(this.props).length > 0;

    shouldRequestOnUpdate = prevProps => {
      if (!this.requestCondition() || this.requestHasNoArguments()) {
        return false;
      }

      const prevRequestArgs = getRequestArguments(prevProps);
      const currentRequestArgs = getRequestArguments(this.props);
      if (!isEqual(prevRequestArgs, currentRequestArgs)) {
        return true;
      }

      return false;
    };

    render() {
      // Filter out extra props that are specific to this HOC and shouldn't be
      // passed through

      const {
        responseData,
        makeRequest,
        globalState,
        requestIdAlias,
        requestAction,
        responseAlias,
        responseSelector,
        makeRequestAlias,
        ...passThroughProps
      } = this.props;

      let responseObject;

      if (typeof responseAlias === 'function') {
        responseObject = responseAlias(
          responseData,
          globalState,
          ...getRequestArguments(this.props)
        );
      } else {
        responseObject = {
          [responseAlias || 'response']: responseData,
        };
      }

      const injectedProps = {
        ...responseObject,
        [makeRequestAlias || 'makeRequest']: makeRequest,
      };

      return <WrappedComponent {...injectedProps} {...passThroughProps} />;
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const responseSelector = ownProps.responseSelector;
    const requestArgs = getRequestArguments(ownProps);
    const responseData = responseSelector
      ? responseSelector(state, ownProps)(...requestArgs)
      : null;

    return {
      responseData,
      globalState: state,
    };
  };

  const mapDispatchToProps = (dispatch, ownProps) => {
    const requestAction = ownProps.requestAction;
    const requestArgs = getRequestArguments(ownProps);
    return {
      makeRequest: () => {
        dispatch(requestAction(...requestArgs));
      },
    };
  };

  // Set display name to ease debugging
  // https://reactjs.org/docs/higher-order-components.html
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  withRequest.displayName = `withRequest(${componentName})`;

  return compose(
    withProps(p => extraProps),
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    branch(({ pageable }) => pageable, withPaging)
  )(withRequest);
};

const withPaging = WrappedComponent => {
  class withPaging extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        initialScrollOffset: props.scrollOffset,
        newScrollOffset: null,
      };
    }

    componentDidUpdate(prevProps) {
      if (prevProps.scrollOffset === null && this.props.scrollOffset) {
        this.setState({ initialScrollOffset: this.props.scrollOffset });
      }
    }

    componentWillUnmount() {
      const { newScrollOffset } = this.state;
      if (newScrollOffset !== null) {
        this.props.saveScrollPosition(newScrollOffset);
      }
    }

    isAnotherPage = pageNumber => {
      const { totalElements, itemsPerPage, page } = this.props;
      const nextPage = pageNumber || page + 1;

      return totalElements && totalElements > itemsPerPage * nextPage;
    };

    getNextPage = pageNumber => {
      const { _fetching = false, page, itemsPerPage, makePageableRequest } = this.props;
      if (!_fetching) {
        const nextPage = pageNumber || page + 1;
        if (this.isAnotherPage(pageNumber)) {
          makePageableRequest(nextPage, itemsPerPage);
        }
      }
    };

    getPage = pageNumber => {
      this.getNextPage(pageNumber);
    };

    saveScrollOffset = scrollOffset => {
      this.setState({ newScrollOffset: scrollOffset });
    };

    getFirstPage = () => {
      const { itemsPerPage, makePageableRequest } = this.props;

      makePageableRequest(0, itemsPerPage);
    };

    render() {
      // Filter out extra props that are specific to this HOC and shouldn't be
      // passed through
      const {
        makePageableRequest,
        makeRequest,
        saveScrollPosition,
        itemsPerPage,
        totalElements,
        _fetching,
        page,
        concatResults,
        ...passThroughProps
      } = this.props;

      const injectedProps = {
        getNextPage: this.getNextPage,
        saveScrollOffset: this.saveScrollOffset,
        scrollOffset: this.state.initialScrollOffset,
        makeRequest: () => makePageableRequest(page, itemsPerPage),
        totalElements: totalElements,
        isAnotherPage: this.isAnotherPage,
        currentPage: page,
        getPage: this.getPage,
        getFirstPage: this.getFirstPage,
      };

      return <WrappedComponent {...injectedProps} {...passThroughProps} />;
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const requestArgs = getRequestArguments(ownProps);

    return {
      itemsPerPage: ownProps.itemsPerPage || DEFAULT_ITEMS_PER_PAGE,
      totalElements: getTotalElements(requestArgs.join(','))(state),
      _fetching: getFetching(requestArgs.join(','))(state),
      scrollOffset: getScrollOffset(requestArgs.join(','))(state),
      page: getPage(requestArgs.join(','))(state),
    };
  };

  const mapDispatchToProps = (dispatch, ownProps) => {
    const requestArgs = getRequestArguments(ownProps);

    return {
      makePageableRequest: (page, itemsPerPage) =>
        dispatch(ownProps.requestAction(...requestArgs, { page, size: itemsPerPage })),
      saveScrollPosition: position => dispatch(saveScrollPosition(first(requestArgs), position)),
    };
  };

  // Set display name to ease debugging
  // https://reactjs.org/docs/higher-order-components.html
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  withPaging.displayName = `withPaging(${componentName})`;

  return compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(withPaging);
};
