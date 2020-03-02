import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import lottie from 'lottie-web';
import inViewport from 'in-viewport';
import { compose } from 'lodash/fp';
import withRequest from 'xi-core/withRequest';
import { getContentItemById } from 'xi-core/content/selectors';
import {
  cardInView,
  cardNotInView,
  cardFinished,
  fetchAnimationData,
} from 'xi-core/content/cards/actions';
import withLoadedFlag from 'xi-core/withLoadedFlag';
import getSourcesByRatio from '../../common/getSourcesByRatio';
import { Body1, Body10 } from '../../common/typography';
import { ROW_HEIGHT_PX, CoreDevices, SIDE_MARGIN_PX } from '../../common/dimensions';
import Gradients from '../components/Gradients';
import TruncateMultiline from '../../common/TruncateMultiline';
import DynamicAspectImage from '../../common/DynamicAspectImage';
import TileTitle from './components/TileTitle';
import DefaultBackground from './components/DefaultBackground';

// TODO - Get this from API
const AssetsPath = 'https://res.cloudinary.com/otro-content/image/upload/v1540909849/flashcard/';

const Container = styled.div`
  position: absolute;
  left: 0;
  bottom: 80px;
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  ${Body1};
  ${TruncateMultiline({ width: '69%', linesToShow: 3, lineHeight: 1.43, fontSize: '14px' })};
  margin-top: ${ROW_HEIGHT_PX}px;
  padding: 0 ${SIDE_MARGIN_PX.small}px;

  @media ${CoreDevices.medium} {
    margin-top: ${ROW_HEIGHT_PX * 2}px;
    padding: 0 ${SIDE_MARGIN_PX.medium}px;
    ${Body10};
    ${TruncateMultiline({ width: '69%', linesToShow: 3, lineHeight: 1.4, fontSize: '20px' })};
  }
  @media ${CoreDevices.large} {
    margin-top: ${ROW_HEIGHT_PX * 3}px;
    padding: 0 ${SIDE_MARGIN_PX.large}px;
    ${Body10};
    ${TruncateMultiline({ width: '69%', linesToShow: 3, lineHeight: 1.4, fontSize: '20px' })};
  }
`;

const DescriptionInset = styled(Description)`
  @media ${CoreDevices.medium} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
    ${Body1};
  }
  @media ${CoreDevices.large} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
    ${Body1};
  }
`;

const SvgContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Video = styled.video`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const getContent = (containerInset, title, description) => {
  if (containerInset) {
    return (
      <Fragment>
        <TileTitle inset>{title}</TileTitle>

        <DescriptionInset>{description}</DescriptionInset>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <TileTitle>{title}</TileTitle>

        <Description>{description}</Description>
      </Fragment>
    );
  }
};

class CardTile extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.hasVisibiltyChange(prevProps.inView)) {
      this.updateVisiblity(!prevProps.inView);
    }

    if (this.shouldPlay(prevProps.play) && this.animationInstance) {
      this.animationInstance.play();
    }
  }

  componentWillUnmount() {
    if (this.animationInstance) {
      this.animationInstance.destroy();
    }
  }

  shouldPlay = prevPlay => this.props.play && !prevPlay;

  animationInstance = null;
  animationNode = null;

  animationRef(ref, animationData) {
    if (ref && !this.animationNode) {
      this.animationNode = ReactDOM.findDOMNode(ref);
      this.animationInstance = lottie.loadAnimation({
        container: this.animationNode,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: animationData,
        assetsPath: AssetsPath,
      });

      if (this.props.played) {
        this.animationInstance.goToAndStop(this.animationInstance.getDuration(true), true);
      }

      this.animationInstance.addEventListener('complete', () => this.props.cardFinished());

      if (this.getVisibility()) {
        this.updateVisiblity(true);
      }
    }
  }

  checkCarousel = () => !this.props.inCarousel || this.props.isCurrentCarouselItem;

  getVisibility = () => inViewport(this.animationNode) && this.checkCarousel();

  hasVisibiltyChange = prevInView => this.animationNode && this.getVisibility() !== prevInView;

  updateVisiblity = visible => {
    const { cardInView, cardNotInView } = this.props;
    if (visible) {
      cardInView();
    } else {
      cardNotInView();
    }
  };

  render() {
    const {
      creatives,
      containerInset,
      title,
      description,
      externalId,
      animationData,
      videoUrl,
      loaded,
      loadingComplete,
    } = this.props;

    return (
      <Fragment key={externalId}>
        <DefaultBackground />
        <Gradients>
          <DynamicAspectImage creatives={creatives} loaded={loaded} />
          {loadingComplete && !animationData && videoUrl ? (
            <Video loop autoPlay={'autoplay'}>
              <source src={videoUrl} type="video/mp4" />
            </Video>
          ) : null}
        </Gradients>
        {loadingComplete && animationData ? (
          <SvgContainer ref={ref => this.animationRef(ref, animationData)} />
        ) : null}

        {loadingComplete ? (
          <Container>{getContent(containerInset, title, description)}</Container>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, { externalId }) => {
  const contentItem = getContentItemById(state)(externalId);
  const cards = state.content.cards;
  return {
    ...contentItem,
    inView: cards.inView.indexOf(externalId) > -1,
    play: cards.cardPlaying === externalId,
    played: cards.played.indexOf(externalId) > -1,
    videoUrl: getSourcesByRatio({ creatives: contentItem.creatives, acceptFormats: ['mp4'] }).src,
  };
};

const mapDispatchToProps = (dispatch, { externalId }) => ({
  cardInView: () => dispatch(cardInView(externalId)),
  cardNotInView: () => dispatch(cardNotInView(externalId)),
  cardFinished: () => dispatch(cardFinished(externalId)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRequest({
    requestIdAlias: 'externalId',
    requestAction: fetchAnimationData,
  }),
  withLoadedFlag()
)(CardTile);
