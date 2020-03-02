import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import backgrounds from '@storybook/addon-backgrounds';
import LocaleProvider from 'xi-core/locale/LocaleProvider';
import store from '../state/store';
import ErrorPage from './ErrorPage';

const bg = backgrounds([{ name: 'Red Background', value: 'red', default: true }]);

storiesOf('ErrorPage', module)
  .addDecorator(bg)
  .addDecorator(story => (
    <Provider store={store}>
      <LocaleProvider>{story()}</LocaleProvider>
    </Provider>
  ))
  .add('Default view', () => <ErrorPage />);
