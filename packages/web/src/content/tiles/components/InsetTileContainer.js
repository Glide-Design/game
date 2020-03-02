import styled from 'styled-components';
import { CoreDevices, HelperDevices } from '../../../common/dimensions';

export const InsetTileMargin = {
  medium: 8,
  large: 16,
};

export const InsetTileWidth = {
  medium: 334,
  large: 400,
};

export const InsetTileMaxHeight = 534;

export default styled.div`
  height: 80vh;
  position: relative;
  overflow: hidden;
  max-height: ${InsetTileMaxHeight}px;
  box-sizing: border-box;

  @media ${HelperDevices.belowMediumLandscape}, ${CoreDevices.medium} {
    border: solid ${InsetTileMargin.medium}px transparent;
    width: ${InsetTileWidth.medium}px;
    height: ${InsetTileMaxHeight}px;
  }

  @media ${CoreDevices.large} {
    border: solid ${InsetTileMargin.large}px transparent;
    width: ${InsetTileWidth.large}px;
    height: ${InsetTileMaxHeight}px;
  }
`;
