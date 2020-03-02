import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import withLoadingFlag from 'xi-core/withLoadedFlag';
import { CoreDevices } from '../../common/dimensions';
import Gradients from '../components/Gradients';
import SrcSetImage from '../../common/SrcSetImage';

const PlaceholderSrc = '/images/place_holder.png';

const ListItemContainer = styled.div`
  position: relative;
  color: #fff;
  box-sizing: border-box;
`;

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  height: 100%;
`;

const StackedWrapper = styled(Wrapper)`
  box-shadow: 0 3px 12px 3px rgba(0, 0, 0, 0.25), 30px 0px 0px -22px black, 30px 0px 0px -14px white,
    61px 0px 0px -38px black, 61px 0px 0px -30px white;
`;

const Label = styled.div`
  position: absolute;
  top: -4px;
  left: 16px;
  width: auto;
  padding: 0 10px;
  height: 22px;
  color: #000;
  background: #fff;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  line-height: 22px;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    font-size: 16px;
    height: 24px;
    top: 0;
    padding: 2px 10px;
  }
`;

const ImgCss = css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledSrcSetImage = styled(SrcSetImage)`
  ${ImgCss};
`;

const Placeholder = styled.img`
  ${ImgCss};
`;

const getWrapper = (stacked, content) => {
  return stacked ? <StackedWrapper>{content}</StackedWrapper> : <Wrapper>{content}</Wrapper>;
};

const Thumbnail = ({
  stacked,
  backgroundImgSources,
  className,
  label,
  children,
  loaded,
  loadingComplete,
  hideLinearGradient,
}) => {
  return (
    <ListItemContainer className={className}>
      {getWrapper(
        stacked,
        <Fragment>
          {!loadingComplete ? <Placeholder alt="placeholder" src={PlaceholderSrc} /> : null}
          <Gradients hideLinearGradient={hideLinearGradient} >
            <StyledSrcSetImage imgSources={backgroundImgSources} loaded={loaded} />
          </Gradients>
          {label ? <Label>{label}</Label> : null}
          {children}
        </Fragment>
      )}
    </ListItemContainer>
  );
};

export default withLoadingFlag()(Thumbnail);

const StyledRoundContainer = styled(ListItemContainer)`
  border-radius: 50%;
  overflow: hidden;
`;

export const ThumbnailRound = ({ backgroundImgSources, className, children, loaded }) => {
  return (
    <StyledRoundContainer className={className}>
      <Gradients>
        <StyledSrcSetImage imgSources={backgroundImgSources} loaded={loaded} />
      </Gradients>
      {children}
    </StyledRoundContainer>
  );
};
