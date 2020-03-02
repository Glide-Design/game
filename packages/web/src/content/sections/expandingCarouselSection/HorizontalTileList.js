import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CoreDevices } from '../../../common/dimensions';
import List from '../../../common/List';
import { getTargetDevice } from '../../../state/app/selectors';
import InsetTileContainer, {
  InsetTileWidth,
  InsetTileMaxHeight,
  InsetTileMargin,
} from '../../tiles/components/InsetTileContainer';
import ContentTile from '../../tiles/ContentTile';
import PlainSectionContainer from '../PlainSectionContainer';

const StyledPlainSectionContainer = styled(PlainSectionContainer)`
  height: ${InsetTileMaxHeight + InsetTileMargin.medium * 2}px;
  padding: 37px 0;
  @media ${CoreDevices.large} {
    height: ${InsetTileMaxHeight + InsetTileMargin.large * 2}px;
    padding: 57px 0;
  }
`;

const HorizontalTileList = ({ itemIds = [], targetDevice, scrollY, loaded }) => {
  if (!itemIds.length) {
    return null;
  }

  return (
    <StyledPlainSectionContainer>
      <List
        scrollDirection={'horizontal'}
        itemSize={InsetTileWidth[targetDevice] + InsetTileMargin[targetDevice] * 2}
        items={itemIds.map((itemId, i) => (
          <InsetTileContainer>
            <ContentTile id={itemId} containerInset={true} scrollY={scrollY} loaded={loaded} />
          </InsetTileContainer>
        ))}
      />
    </StyledPlainSectionContainer>
  );
};

const mapStateToProps = state => {
  return {
    targetDevice: getTargetDevice(state),
  };
};

export default connect(mapStateToProps)(HorizontalTileList);
