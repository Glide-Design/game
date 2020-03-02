import React from 'react';
import styled from 'styled-components';
import { branch, renderComponent } from 'recompose';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import withRequest from 'xi-core/withRequest';
import { fetchSectionItems, discoveryPageInteraction } from 'xi-core/content/actions';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import withLoadOneByOne from 'xi-core/withLoadOneByOne';
import { getContentIdsBySectionId } from 'xi-core/content/selectors';
import ContentTile from '../tiles/ContentTile';
import MediaCarousel from '../../common/MediaCarousel';
import { CoreDevices } from '../../common/dimensions';
import { NavButton } from '../../common/NavButton';
import ExpandClickableArea from '../../common/ExpandClickableArea';
import PlainSectionContainer from './PlainSectionContainer';

const Dots = styled.div`
  position: absolute;
  bottom: 0px;
  height: 16px;
  width: 100%;
  left: 0;
  @media ${CoreDevices.medium} {
    height: 24px;
  }
  @media ${CoreDevices.large} {
    height: 24px;
  }
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 1;
`;

const Dot = styled.div`
  width: 38px;
  height: 2px;
  border-radius: 2px;
  margin: 0px 11px;
  @media ${CoreDevices.large} {
    width: 57px;
    height: 3px;
    border-radius: 3px;
    margin: 0px 16px;
  }
  cursor: pointer;
  opacity: 0.4;
  background-color: #fff;
`;

const DotSelected = styled.div`
  width: 38px;
  height: 2px;
  border-radius: 2px;
  margin: 0px 11px;
  @media ${CoreDevices.large} {
    width: 57px;
    height: 3px;
    border-radius: 3px;
    margin: 0px 16px;
  }
  background-color: #fff;
`;

const StyledNavButton = styled(NavButton)`
  display: none;
  @media ${CoreDevices.large} {
    display: block;
  }
`;

class HeroSection extends React.Component {
  state = {
    slideIndex: 0,
  };

  moveBackward = () => {
    const { slideIndex } = this.state;

    this.setState({
      ...this.state,
      slideIndex: slideIndex - 1,
    });

    this.props.carouselArrowClicked();
  };

  moveForward = () => {
    const { slideIndex } = this.state;

    this.setState({
      ...this.state,
      slideIndex: slideIndex + 1,
    });

    this.props.carouselArrowClicked();
  };

  render() {
    const { contentIds, oneItemLoaded, hideAvatar, carouselButtonClicked } = this.props;
    const { slideIndex } = this.state;

    return (
      <PlainSectionContainer>
        {contentIds.length > 1 ? (
          <React.Fragment>
            <Dots>
              {contentIds.map((_, index) =>
                index === slideIndex ? (
                  <ExpandClickableArea key={index}>
                    <DotSelected />
                  </ExpandClickableArea>
                ) : (
                  <ExpandClickableArea key={index}>
                    <Dot
                      onClick={() => {
                        this.setState({ slideIndex: index });
                        carouselButtonClicked();
                      }}
                    />
                  </ExpandClickableArea>
                )
              )}
            </Dots>
            <StyledNavButton position="left" onClick={() => this.moveBackward()} />
            <StyledNavButton position="right" onClick={() => this.moveForward()} />
            <MediaCarousel
              carouselProps={{
                withoutControls: true,
                slideIndex: slideIndex,
                dragging: false,
              }}
              afterSlide={slideIndex => {
                this.setState({ slideIndex });
              }}
              autoplay={true}
              items={contentIds.map(id => (
                <ContentTile
                  id={id}
                  key={id}
                  hero={true}
                  hideAvatar={hideAvatar}
                  loaded={oneItemLoaded}
                />
              ))}
              hideTimestamp={true}
            />
          </React.Fragment>
        ) : (
          <ContentTile id={contentIds[0]} hideTimestamp={true} hero={true} loaded={oneItemLoaded} />
        )}
      </PlainSectionContainer>
    );
  }
}

const noContent = ({ contentIds }) => !contentIds || !contentIds.length;

const mapDispatchToProps = dispatch => ({
  carouselArrowClicked: () =>
    dispatch(discoveryPageInteraction(PropertyKeys.DISCOVERY_INTERACTIONS.CAROUSEL_ARROW)),
  carouselButtonClicked: () =>
    dispatch(discoveryPageInteraction(PropertyKeys.DISCOVERY_INTERACTIONS.CAROUSEL_BUTTON)),
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withRequest({
    requestAction: ids => fetchSectionItems(ids, {}, true),
    responseSelector: getContentIdsBySectionId,
    responseAlias: 'contentIds',
  }),
  branch(noContent, renderComponent(PlainSectionContainer)),
  withLoadOneByOne({
    itemsLabel: 'contentIds',
    count: 1,
  })
)(HeroSection);
