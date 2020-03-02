import React from 'react';
import { storiesOf } from '@storybook/react';
import backgrounds from '@storybook/addon-backgrounds';
import { withKnobs, object } from '@storybook/addon-knobs';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import imageContent from 'xi-core/gallery/fixtures/image-content';
import videoContent from 'xi-core/gallery/fixtures/video-content';
import store from '../../state/store';
import TimelineContent from './TimelineContent';

const bg = backgrounds([{ name: 'Dark Background', value: '#000', default: true }]);

const stories = storiesOf('TimelineContent', module)
  .addDecorator(bg)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MemoryRouter>
      <Provider store={store}>{story()}</Provider>
    </MemoryRouter>
  ));

stories.add('Image example', () => <TimelineContent content={object('Object', imageContent)} />);
stories.add('Video example', () => <TimelineContent content={object('Object', videoContent)} />);
