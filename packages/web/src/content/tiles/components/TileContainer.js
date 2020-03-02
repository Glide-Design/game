import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { CtaButtonHover, CtaButtonActive } from '../../../common/buttons';

const TileContainerCss = css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  flex-flow: column;
`;

export default styled.div`
  ${TileContainerCss};
`;

const DisabledTileContainer = css`
  cursor: default;
`;

export const TileContainerLink = styled(Link)`
  ${TileContainerCss};

  ${({ disabled }) => disabled && DisabledTileContainer}
`;

export const TileContainerLinkHover = styled(Link)`
  ${TileContainerCss};

  &:hover {
    button.ctaButton {
      ${CtaButtonHover}
    }
  }

  &:active {
    button.ctaButton {
      ${CtaButtonActive}
    }
  }

  ${({ disabled }) => disabled && DisabledTileContainer}
`;
