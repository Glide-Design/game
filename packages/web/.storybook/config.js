/**
 * @file Contains config for the storybook library
 * @author Stewart Megaw
 */

import { configure } from '@storybook/react';

const req = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
  require('../stories/index.js');
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
