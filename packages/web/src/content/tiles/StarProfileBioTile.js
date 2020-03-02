import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getStarById } from 'xi-core/stars/selectors';
import { Body10, Body1, H1, H10, H14 } from '../../common/typography';
import { ContainerPaddingCss, CoreDevices } from '../../common/dimensions';
import DynamicAspectImage from '../../common/DynamicAspectImage';
import getSourcesByRatio from '../../common/getSourcesByRatio';
import DefaultBackground from './components/DefaultBackground';
import TileContainer from './components/TileContainer';

const BottomElements = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
  margin-left: auto;

  width: 60%;
  @media ${CoreDevices.medium} {
    max-width: 634px;
  }
  @media ${CoreDevices.large} {
    max-width: 734px;
  }

  ${ContainerPaddingCss};
`;

const Bio = styled.div`
  ${Body1};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${Body10};
  }
  text-align: right;

  &::first-letter {
    ${H1};
    @media ${CoreDevices.medium} {
      ${H10};
    }
    @media ${CoreDevices.large} {
      ${H14};
    }
    line-height: 0;
  }
`;

const StyledDynamicAspectImage = styled(DynamicAspectImage)`
  position: relative;
  margin-bottom: 50px;
`;

const Signature = styled.img`
  width: 181px;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    width: 272px;
  }
`;

const StarProfileBioTile = ({
  star: { bio: { creatives, blurb } = {} } = {},
  containerInset,
  loaded,
}) => (
  <Fragment>
    <DefaultBackground />
    <StyledDynamicAspectImage creatives={creatives} usageTypes={['Artwork']} loaded={loaded} />

    <TileContainer>
      <BottomElements>
        <Bio>{blurb}</Bio>
        <Signature
          alt="Signature"
          {...getSourcesByRatio({ creatives, usageTypes: ['Signature'] })}
        />
      </BottomElements>
    </TileContainer>
  </Fragment>
);

const mapStateToProps = (state, { starId }) => ({
  star: getStarById(state)(starId),
});

export default connect(mapStateToProps)(StarProfileBioTile);
