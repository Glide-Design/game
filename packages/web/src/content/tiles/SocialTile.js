import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl';
import { get, getOr, first } from 'lodash/fp';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import inViewport from 'in-viewport';
import { Grey85 } from 'xi-core/colours';
import withLoadedFlag from 'xi-core/withLoadedFlag';
import DayAndTime from '../../common/DayAndTime';
import getSourcesByRatio from '../../common/getSourcesByRatio';
import MediaCarousel from '../../common/MediaCarousel';
import SrcSetImage from '../../common/SrcSetImage';
import { SIDE_MARGIN_PX, ContainerPaddingCss, CoreDevices, ROW_HEIGHT_PX } from '../../common/dimensions';
import { BodySmall } from '../../common/typography';
import ExpandClickableArea from '../../common/ExpandClickableArea';
import ExpandableText from '../../common/ExpandableText';
import PlayIcon from '../../common/icons/Play';
import { posFixedZIndex } from '../../common/dimensions';
import ContentInteractionFooter from '../components/ContentInteractionFooter';

import TileDescription from './components/TileDescription';
import SocialIcon from './components/SocialIcon';

const TILE_IN_VIEW_DEBOUNCE_MS = 500;
const TILE_IN_VIEW_THRESHOLD_PX = -250;

export const StyledSocialIcon = styled(SocialIcon)`
  width: 32px;
  position: absolute;
  top: 23px;
  right: 23px;
`;

const Container = styled.div`
  background-color: ${Grey85};
  height: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
`;
const Fullscreen = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
  content: url('/images/fullscreen.svg');
  cursor: pointer;
`;

const StyledSrcSetImage = styled(SrcSetImage)`
  position: absolute;
  width: 100% !important;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
`;

const StyledSrcSetImageModal = styled(SrcSetImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: black;
`;

const PositionedDayAndTime = styled(DayAndTime)`
  position: absolute;
  margin-left: ${SIDE_MARGIN_PX.small}px;
  color: #fff;
  z-index: 1;
`;

const ExpandableTextWrapper = styled.div`
  margin: 20px 0;
  ${ContainerPaddingCss};
  ${({ inset }) =>
    inset
      ? `
  @media ${CoreDevices.medium} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
  }
  @media ${CoreDevices.large} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
  }`
      : ''};
`;

const TranslationWrapper = styled(ExpandableTextWrapper)`
  cursor: pointer;
  margin: 0 0 27px;
  ${BodySmall};
  font-weight: bold;
  letter-spacing: 0.4px;
`;

const VideoContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
`;

const Video = styled.video`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const StyledPlayIcon = styled(PlayIcon)`
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  width: 48px;
  height: 48px;
`;

const StyledContentInteractionFooter = styled(ContentInteractionFooter)`
  ${ContainerPaddingCss};
  margin-bottom: ${ROW_HEIGHT_PX * 3}px;

  @media ${CoreDevices.medium} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
  }

  @media ${CoreDevices.large} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
  }
`;

const TranslationOptions = ({ showOriginal, toggleTranslation }) => (
  <ExpandClickableArea>
    <TranslationWrapper onClick={toggleTranslation}>
      {showOriginal ? (
        <FormattedMessage id="social.seeTranslation" defaultMessage="See translation" />
      ) : (
        <FormattedMessage id="social.seeOriginal" defaultMessage="See original" />
      )}
    </TranslationWrapper>
  </ExpandClickableArea>
);

class TextOnlyPost extends React.Component {
  state = { showOriginal: false };

  toggleTranslation = () => this.setState(state => ({ showOriginal: !state.showOriginal }));

  render() {
    const { description, contentDates, containerInset, original } = this.props;
    const { showOriginal } = this.state;
    return (
      <Fragment>
        <PositionedDayAndTime
          timestamp={getOr(new Date().getTime(), '[0].startDate', contentDates)}
          color="black"
        />
        <TileDescription inset={containerInset}>
          {showOriginal ? original.description : description}
        </TileDescription>
        {get('description', original) && (
          <TranslationOptions
            showOriginal={showOriginal}
            toggleTranslation={this.toggleTranslation}
          />
        )}
        <StyledContentInteractionFooter />
      </Fragment>
    );
  }
}

const stripVideos = creatives => {
  return creatives.filter(creative => creative.format !== 'mp4');
};

const stripImages = creatives => {
  return creatives.filter(creative => creative.format === 'mp4');
};

const hasVideos = creatives => {
  return creatives.filter(creative => creative.format === 'mp4').length > 0;
};

const ImageSlide = ({ creatives, open, setPopupSources, partner }) => {
  let sources = getSourcesByRatio(stripVideos(creatives), 1);
  let sourcesForPopup;

  if (hasVideos(creatives)) {
    sourcesForPopup = getSourcesByRatio({
      creatives: stripImages(creatives),
      acceptFormats: ['mp4'],
      targetRatio: stripImages(creatives)[0].width / stripImages(creatives)[0].height,
    }).src;
  } else {
    sourcesForPopup = sources;
  }

  const localOpen = () => {
    setPopupSources(sourcesForPopup);
    open();
  };

  return (
    <ImageContainer onClick={localOpen}>
      {hasVideos(creatives) ? <StyledPlayIcon /> : null}
      <StyledSrcSetImage
        imgSources={sources}
        onClick={localOpen}
        data-test-id="social-post-expand"
      />
      <StyledSocialIcon partner={partner} />
      <Fullscreen onClick={localOpen} />
    </ImageContainer>
  );
};
class PostWithImage extends Component {
  state = { open: false, creatives: null, currentSources: null, showOriginal: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  toggleTranslation = () => this.setState(state => ({ showOriginal: !state.showOriginal }));

  render() {
    const {
      description,
      contentDates,
      containerInset,
      externalId,
      original,
      partners,
    } = this.props;
    const { open, currentSources, showOriginal } = this.state;

    let creatives = this.props.creatives;

    if (!Array.isArray(creatives)) {
      creatives = [creatives];
    }

    return (
      <Fragment>
        <PositionedDayAndTime
          timestamp={getOr(new Date().getTime(), '[0].startDate', contentDates)}
        />
        {stripVideos(creatives).length === 1 ? (
          <ImageSlide
            creatives={creatives}
            open={this.open}
            setPopupSources={passedIn => {
              this.setState({ currentSources: passedIn });
            }}
            partner={first(partners)}
          />
        ) : (
          <MediaCarousel
            items={stripVideos(creatives).map(creative => (
              <ImageSlide
                creatives={[creative]}
                open={this.open}
                setPopupSources={() => {
                  this.setState({ currentSources: getSourcesByRatio([creative], 1) });
                }}
                partner={first(partners)}
              />
            ))}
          />
        )}
        <ExpandableTextWrapper inset={containerInset}>
          <ExpandableText text={showOriginal ? original.description : description} />
        </ExpandableTextWrapper>
        {get('description', original) && (
          <TranslationOptions
            showOriginal={showOriginal}
            toggleTranslation={this.toggleTranslation}
          />
        )}
        <StyledContentInteractionFooter contentId={externalId} />
        {open ? (
          <ReactModal
            isOpen={true}
            parentSelector={() => document.getElementById('root')}
            style={{
              overlay: { zIndex: posFixedZIndex.popUp, backgroundColor: 'rgba(0, 0, 0, 0.6)' },
              content: {
                background: 'black',
                border: 0,
                borderRadius: 0,
                padding: 0,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
            }}
          >
            {hasVideos(creatives) ? (
              <VideoContainer>
                <Video loop autoPlay={'autoplay'} onClick={this.close}>
                  <source src={currentSources} type="video/mp4" />
                </Video>
              </VideoContainer>
            ) : (
              <StyledSrcSetImageModal imgSources={currentSources} onClick={this.close} />
            )}
          </ReactModal>
        ) : null}
      </Fragment>
    );
  }
}

const hasImage = ({ creatives }) => creatives && creatives.length;

class SocialTile extends Component {
  containerRef = ref => {
    if (ref && !this.container) {
      this.container = ref;
      const { inView } = this.props;
      if (inView) {
        inViewport(
          ReactDOM.findDOMNode(ref),
          {
            debounce: TILE_IN_VIEW_DEBOUNCE_MS,
            failsafe: false,
            offset: TILE_IN_VIEW_THRESHOLD_PX,
          },
          inView
        );
      }
    }
  };

  render() {
    return (
      <Container innerRef={ref => this.containerRef(ref)}>
        {hasImage(this.props) ? (
          <PostWithImage {...this.props} />
        ) : (
          <TextOnlyPost {...this.props} />
        )}
      </Container>
    );
  }
}

export default withLoadedFlag({ onMount: true })(SocialTile);
