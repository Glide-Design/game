import React from 'react';
import { branch, renderComponent } from 'recompose';
import { compose } from 'lodash/fp';
import withRequest from 'xi-core/withRequest';
import { fetchSectionItems } from 'xi-core/content/actions';
import { getContentIdsBySectionId } from 'xi-core/content/selectors';
import MediaCarousel from '../../../common/MediaCarousel';
import { HelperDevices } from '../../../common/dimensions';
import ContentTile from '../../tiles/ContentTile';
import PlainSectionContainer from '../PlainSectionContainer';
import HorizontalTileList from './HorizontalTileList';

class ExpandingCarouselSection extends React.Component {
  state = {
    carouselIndex: 0,
    scrollY: null,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.scrolling);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrolling);
  }

  scrolling = () => this.setState({ scrollY: window.scrollY });

  render() {
    const { carouselIndex, scrollY } = this.state;
    const { contentIds, loaded } = this.props;
    const smallDevice = window.matchMedia(HelperDevices.belowMedium).matches;

    return smallDevice ? (
      <PlainSectionContainer>
        {contentIds.length > 1 ? (
          <MediaCarousel
            afterSlide={carouselIndex => this.setState({ carouselIndex })}
            items={contentIds.map((id, idx) => (
              <ContentTile
                id={id}
                key={id}
                inCarousel={true}
                isCurrentCarouselItem={carouselIndex === idx}
                scrollY={scrollY}
                loaded={loaded}
              />
            ))}
          />
        ) : (
          <ContentTile id={contentIds[0]} scrollY={scrollY} loaded={loaded} />
        )}
      </PlainSectionContainer>
    ) : (
      <HorizontalTileList itemIds={contentIds} scrollY={scrollY} loaded={loaded} />
    );
  }
}

const noContent = ({ contentIds }) => !contentIds || !contentIds.length;

export default compose(
  withRequest({
    requestAction: fetchSectionItems,
    responseSelector: getContentIdsBySectionId,
    responseAlias: 'contentIds',
    requestCondition: ({ responseData = [] }) => !responseData.length,
  }),
  branch(noContent, renderComponent(PlainSectionContainer))
)(ExpandingCarouselSection);
