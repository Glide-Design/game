import * as React from 'react';
import { connect } from 'react-redux';
import { dispatchContentPageLoaded } from '../app/actions';
import { updateGuestFreeVideoWatchCount } from '../signup/actions';
import { guestIsWatchingFreeVideo, isFree } from '../content/selectors';

function contentHasChanged(previousContentItem, currentContentItem) {
  const hasJustLoadedAContentItem = !previousContentItem && currentContentItem;
  const contentItemsArePresent = previousContentItem && currentContentItem;
  const currentContentItemIsContent = currentContentItem && currentContentItem.externalId;
  const contentItemsAreNotTheSame =
    contentItemsArePresent && previousContentItem.externalId !== currentContentItem.externalId;
  return (hasJustLoadedAContentItem && currentContentItemIsContent) || contentItemsAreNotTheSame;
}

export default WrappedComponent => {
  class WithContentPageSession extends React.Component {
    componentDidMount = () => {
      const { content, dispatchContentPageLoaded } = this.props;

      if (content && content.externalId) {
        dispatchContentPageLoaded(content.externalId);
        this.checkFreeVideoStatus();
      }
    };

    componentDidUpdate = prevProps => {
      const { content, dispatchContentPageLoaded } = this.props;

      const contentChanged = contentHasChanged(prevProps.content, content);

      if (contentChanged) {
        dispatchContentPageLoaded(content.externalId);
      }

      if (contentChanged || this.contentEntitlementHasChanged(prevProps)) {
        this.checkFreeVideoStatus();
      }
    };

    checkFreeVideoStatus = () => {
      const { guestIsWatchingFreeVideo, guestWatchedFreeVideo } = this.props;
      if (guestIsWatchingFreeVideo) {
        guestWatchedFreeVideo();
      }
    };

    contentEntitlementHasChanged = prevProps => prevProps.isFree !== this.props.isFree;

    render() {
      // Filter out extra props that are specific to this HOC and shouldn't be
      // passed through
      const { dispatchContentPageLoaded, ...passThroughProps } = this.props;

      return <WrappedComponent {...passThroughProps} />;
    }
  }

  const mapStateToProps = (state, { content: { externalId } = {} }) => ({
    isFree: isFree(state)(externalId),
    guestIsWatchingFreeVideo: guestIsWatchingFreeVideo(state)(externalId),
  });

  const mapDispatchToProps = dispatch => ({
    dispatchContentPageLoaded: contentId => dispatch(dispatchContentPageLoaded(contentId)),
    guestWatchedFreeVideo: () => dispatch(updateGuestFreeVideoWatchCount()),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithContentPageSession);
};
