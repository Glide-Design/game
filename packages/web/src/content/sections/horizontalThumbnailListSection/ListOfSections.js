import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import withRequest from 'xi-core/withRequest';
import { fetchSectionSections } from 'xi-core/content/actions';
import { getSectionsForSectionId } from 'xi-core/content/selectors';
import List from '../../../common/List';
import getSourcesByRatio from '../../../common/getSourcesByRatio';
import { getTargetDevice } from '../../../state/app/selectors';
import ListItem, { List_item_width_px } from './ListItem';

const LIST_ITEM_RHS_MARGIN_STACKED_PX = {
  small: 70,
  medium: 86,
  large: 140,
};

const ListOfSections = ({
  targetDevice,
  response: sectionData = [],
  getNextPage,
  saveScrollOffset,
  scrollOffset,
  hideAvatar,
}) => {
  const itemWidth =
    List_item_width_px[targetDevice] + LIST_ITEM_RHS_MARGIN_STACKED_PX[targetDevice];

  return (
    <List
      onScrollEnd={saveScrollOffset}
      getNextPage={getNextPage}
      scrollDirection={'horizontal'}
      itemSize={itemWidth}
      scrollOffset={scrollOffset}
      useNavButtons={true}
      items={sectionData.map((item, i) => (
        <ListItem
          stacked
          externalId={item.externalId}
          backgroundImgSources={getSourcesByRatio(item.creatives)}
          title={item.name}
          hideAvatar={hideAvatar}
          href={`/section/${item.externalId}`}
        />
      ))}
    />
  );
};

const mapStateToProps = state => {
  return {
    targetDevice: getTargetDevice(state),
  };
};

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withRequest({
    requestIdAlias: 'sectionId',
    requestAction: fetchSectionSections,
    responseSelector: getSectionsForSectionId,
    pageable: true,
    requestCondition: ({ responseData = [] }) => !responseData.length,
  })
)(ListOfSections);
