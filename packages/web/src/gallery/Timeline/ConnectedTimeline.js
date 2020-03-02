import { compose, lifecycle, withProps } from 'recompose';
import ConnectedTimelineHoC from 'xi-core/gallery/timeline/connectedTimelineHoC';
import navPresenter from 'xi-core/navigation/NavigationPresenter';
import Timeline from './Timeline';

const updateNavigationState = ({ starId, galleryId }) => {
  navPresenter.setCurrentGallery(galleryId);
  navPresenter.setCurrentStar(starId);
};

const ConnectedTimeline = compose(
  withProps(({ match }) => ({
    starId: match.params.starId,
    galleryId: match.params.galleryId,
  })),
  ConnectedTimelineHoC,
  lifecycle({
    componentDidMount() {
      updateNavigationState(this.props);
    },
    componentDidUpdate() {
      updateNavigationState(this.props);
    },
  })
)(Timeline);

export default ConnectedTimeline;
