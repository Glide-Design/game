import React, { Fragment } from 'react';
import styled from 'styled-components';
import { CoreDevices, HelperDevices, SIDE_MARGIN_PX } from '../../common/dimensions';
import SectionDivider from '../../common/SectionDivider';
import InsetTileContainer, { InsetTileMargin } from '../tiles/components/InsetTileContainer';

const Container = styled.div`
  @media ${HelperDevices.belowMediumLandscape},
    ${CoreDevices.medium},
    ${CoreDevices.large} {
    margin: -100px auto 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    max-width: calc(100vw - ${SIDE_MARGIN_PX.small * 2}px + ${InsetTileMargin.medium * 2}px);
  }

  @media ${CoreDevices.medium} {
    margin: -100px auto 0;
    max-width: calc(100vw - ${SIDE_MARGIN_PX.medium * 2}px + ${InsetTileMargin.medium * 2}px);
  }

  @media ${CoreDevices.large} {
    margin: -72px auto 0;
    max-width: calc(100vw - ${SIDE_MARGIN_PX.large * 2}px + ${InsetTileMargin.large * 2}px);
  }
`;

const FillerItem = styled.div`
  @media ${HelperDevices.belowMediumPortrait} {
    display: none;
  }

  @media ${HelperDevices.belowMediumLandscape}, ${CoreDevices.medium} {
    height: 0;
    width: 334px;
    margin: 8px;
  }

  @media ${CoreDevices.large} {
    width: 400px;
    margin: 16px;
  }
`;

const StyledSectionDivider = styled(SectionDivider)`
  @media ${HelperDevices.belowMediumLandscape},
    ${CoreDevices.medium},
    ${CoreDevices.large} {
    display: none;
  }
`;

export default ({ tiles, className }) => (
  <Container className={className}>
    {tiles.map((tile, i) => (
      <Fragment key={i}>
        <InsetTileContainer key={i}>{tile}</InsetTileContainer>
        {i < tiles.length - 1 ? <StyledSectionDivider key={i + 'SSD'} /> : null}
      </Fragment>
    ))}
    {new Array(6).map((v, i) => <FillerItem key={'FI' + i} />)}
  </Container>
);
