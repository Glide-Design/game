import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grey80, Grey5, GreenGradientStart, GreenGradientEnd } from 'xi-core/colours';
import { getTargetDevice } from '../state/app/selectors';
import { ROW_HEIGHT_PX, CoreDevices, ContainerPaddingCss, HelperDevices } from './dimensions';
import { Body10, Body1, H1, H10, H14, TITLE_FONT_SIZES, TITLE_LINE_HEIGHTS } from './typography';
import TruncateMultiline from './TruncateMultiline';
import DynamicAspectImage from './DynamicAspectImage';

const OutterWrapper = styled.div`
  position: relative;
`;

export const ElementsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  color: ${({ fontColour = 'inherit' }) => fontColour};
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ fullViewportHeight }) => (fullViewportHeight ? '100vh' : '100%')};
  background: ${({ colour = Grey80 }) => colour};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const BackgroundContainerImageWithGradient = styled(BackgroundContainer)`
  background-image: url(${({ image }) => image}); /* fallback if linear-gradient not supported */
  background-image: url(${({ image }) => image}),
    linear-gradient(to right, ${GreenGradientStart}, ${GreenGradientEnd});
`;

const BackgroundContainerImage = styled(BackgroundContainer)`
  background-image: url(${({ image }) => image});
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-top: ${ROW_HEIGHT_PX * 5.5}px;
  @media ${CoreDevices.medium} {
    padding-top: ${ROW_HEIGHT_PX * 6.5}px;
  }

  @media ${CoreDevices.large} {
    padding-top: 62px;
  }
`;

const TitleArrowLink = styled(Link)`
  ${ContainerPaddingCss};
  & img {
    width: 30px;
  }
`;

export const TitleText = styled.span`
  ${ContainerPaddingCss};
  flex-grow: 1;
  @media ${CoreDevices.large} {
    ${H14};
    ${TruncateMultiline({
      linesToShow: 1,
      lineHeight: TITLE_LINE_HEIGHTS.default.large,
      fontSize: `${TITLE_FONT_SIZES.large}px`,
    })};
    text-transform: capitalize;
  }
  @media ${CoreDevices.medium} {
    ${H10};
    ${TruncateMultiline({
      linesToShow: 2,
      lineHeight: TITLE_LINE_HEIGHTS.default.medium,
      fontSize: `${TITLE_FONT_SIZES.medium}px`,
    })};
    text-transform: capitalize;
  }
  @media ${HelperDevices.belowMedium}, ${HelperDevices.belowMediumLandscape} {
    max-width: 75%;
    ${H1};
    ${TruncateMultiline({
      linesToShow: 2,
      lineHeight: TITLE_LINE_HEIGHTS.default.small,
      fontSize: `${TITLE_FONT_SIZES.small}px`,
    })};
    text-transform: capitalize;
  }
`;

export const ItemsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const Description = styled.div`
  ${Body1};
  min-height: 29px;
  margin-top: ${ROW_HEIGHT_PX * 2}px;
  @media ${CoreDevices.medium} {
    ${Body10};
    margin-top: ${ROW_HEIGHT_PX * 2.5}px;
  }
  @media ${CoreDevices.large} {
    ${Body10};
    margin-top: ${ROW_HEIGHT_PX * 3}px;
  }
  ${ContainerPaddingCss};
`;

const chooseBgImageFromLabel = (label = '', targetDevice) => {
  // reuse 'small' images for 'tiny' devices
  targetDevice = targetDevice === 'tiny' ? 'small' : targetDevice;

  switch (label.toLowerCase()) {
    case 'green':
      return `/images/backgrounds/green/${targetDevice}/bg-image.png`;
    case 'green-2':
      return `/images/backgrounds/green/${targetDevice}/bg-image_2.png`;
    case 'black':
      return `/images/backgrounds/black/${targetDevice}/bg-image.png`;
    case 'black-2':
      return `/images/backgrounds/black/${targetDevice}/bg-image_2.png`;
    case 'white':
      return `/images/backgrounds/white/${targetDevice}/bg-image.png`;
    default:
      return null;
  }
};

const getGradient = (label = '') => {
  switch (label.toLowerCase()) {
    case 'green':
      return 'green';
    case 'green-2':
      return 'green';
    default:
      return null;
  }
};

const getColour = (label = '', defaultColor) => {
  switch (label.toLowerCase()) {
    case 'white':
      return Grey5;
    default:
      return defaultColor;
  }
};

const TitledArea = ({
  creatives = [],
  bgColour,
  fgColour,
  svgBackground: backgroundLabel,
  fullViewportHeight,
  name,
  hasChildren,
  description,
  children,
  className,
  targetDevice,
  bgImage,
}) => {
  const bgImageSrc = chooseBgImageFromLabel(backgroundLabel, targetDevice);
  const gradient = getGradient(backgroundLabel);
  const Bg = bgImageSrc
    ? gradient
      ? BackgroundContainerImageWithGradient
      : BackgroundContainerImage
    : BackgroundContainer;
  return (
    <OutterWrapper className={className}>
      <Bg
        gradient={gradient}
        colour={getColour(backgroundLabel, bgColour)}
        image={bgImageSrc}
        fullViewportHeight={fullViewportHeight}
      >
        {creatives.length ? <DynamicAspectImage creatives={creatives} /> : null}
        {bgImage}
      </Bg>

      <ElementsContainer fontColour={fgColour}>
        <TitleContainer>
          <TitleText>
            <span>{name}</span>
          </TitleText>
          {hasChildren ? (
            <TitleArrowLink to={'/'}>
              <img alt="View" src="/images/forward-arrow.svg" />
            </TitleArrowLink>
          ) : null}
        </TitleContainer>
        {description ? <Description>{description}</Description> : null}
        <ItemsContainer>{children}</ItemsContainer>
      </ElementsContainer>
    </OutterWrapper>
  );
};

export default connect(state => ({ targetDevice: getTargetDevice(state) }))(TitledArea);
