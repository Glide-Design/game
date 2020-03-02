import React from 'react';
import PropTypes from 'prop-types';
import { createMockStore } from 'redux-test-utils';
// import { mountWithIntl } from '../tests/helpers/intl-enzyme-test-helper';
import GiftForm from './GiftForm';

const storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
});

describe('<GiftForm />', () => {
  function getWrapper(props) {
    const store = createMockStore({});

    // return mountWithIntl(<GiftForm {...props} />, {
    //   context: { store },
    //   childContextTypes: { store: storeShape },
    // });
    return null;
  }

  it.skip('should submit', () => {
    const mockHandleSubmit = jest.fn(() => true);
    const wrapper = getWrapper({ handleSubmit: mockHandleSubmit });
    wrapper.find('form').simulate('submit');
    expect(mockHandleSubmit).toBeCalledTimes(1);
  });
});
