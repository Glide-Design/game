import React from 'react';
import { storiesOf } from '@storybook/react';
import backgrounds from '@storybook/addon-backgrounds';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import LocaleProvider from 'xi-core/locale/LocaleProvider';
import fullGallery from 'xi-core/gallery/fixtures/full-gallery';
import store from '../../state/store';
import Timeline from './Timeline';

const bg = backgrounds([{ name: 'Dark Background', value: '#000', default: true }]);

storiesOf('Timeline', module)
  .addDecorator(bg)
  .addDecorator(story => (
    <MemoryRouter>
      <Provider store={store}>
        <LocaleProvider>{story()}</LocaleProvider>
      </Provider>
    </MemoryRouter>
  ))
  .add('Mixed media', () => <Timeline gallery={fullGallery} />);
