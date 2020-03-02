import * as React from 'react';
import { connect } from 'react-redux';

import { dispatchPlayerProfilePageLoaded } from 'xi-core/app/actions';

function starHasChanged(previousStar, currentStar) {
  const hasJustLoadedStar = !previousStar && currentStar;
  const starsArePresent = previousStar && currentStar;
  const starsAreNotTheSame = starsArePresent && previousStar.starId !== currentStar.starId;
  return hasJustLoadedStar || starsAreNotTheSame;
}

export default WrappedComponent => {
  class WithPlayerProfileLoadedEvent extends React.Component {
    componentDidMount() {
      const { star, dispatchPlayerProfilePageLoaded } = this.props;
      if (star && star.starId) {
        dispatchPlayerProfilePageLoaded(star.starId);
      }
    }

    componentDidUpdate = prevProps => {
      const { star, dispatchPlayerProfilePageLoaded } = this.props;
      if (starHasChanged(prevProps.star, star)) {
        dispatchPlayerProfilePageLoaded(star.starId);
      }
    };

    render() {
      // Filter out extra props that are specific to this HOC and shouldn't be
      // passed through
      const { dispatchPlayerProfilePageLoaded, ...passThroughProps } = this.props;

      return <WrappedComponent {...passThroughProps} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    dispatchPlayerProfilePageLoaded: starId => dispatch(dispatchPlayerProfilePageLoaded(starId)),
  });

  return connect(
    null,
    mapDispatchToProps
  )(WithPlayerProfileLoadedEvent);
};
