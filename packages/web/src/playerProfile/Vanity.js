import React from 'react';
import NoMatch from '../app/NoMatch';
import PlayerProfile from './PlayerProfile';

export default ({ ...props }) => {
  if (window.is404) {
    return <NoMatch />;
  } else {
    return <PlayerProfile {...props} />;
  }
};
