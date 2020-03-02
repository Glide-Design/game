import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import withRequest from 'xi-core/withRequest';
import { fetchSectionItems } from 'xi-core/content/actions';
import { getSectionItems } from 'xi-core/content/selectors';
import { LIST_ITEM_ASPECT_RATIO } from '../../../common/dimensions';
import List from '../../../common/List';
import getSourcesByRatio from '../../../common/getSourcesByRatio';
import { getTargetDevice } from '../../../state/app/selectors';
import ListItem, { List_item_width_px, List_item_rhs_margin_px } from './ListItem';

const ListOfContentThumbnails = ({
  targetDevice,
  getNextPage,
  saveScrollOffset,
  scrollOffset,
  items = [],
  loaded,
  hideAvatar,
}) => {
  const itemWidth = List_item_width_px[targetDevice] + List_item_rhs_margin_px[targetDevice];

  if (!items.length) {
    return null;
  }

  return (
    <List
      onScrollEnd={saveScrollOffset}
      getNextPage={getNextPage}
      scrollDirection={'horizontal'}
      itemSize={itemWidth}
      scrollOffset={scrollOffset}
      useNavButtons={true}
      items={items.map((item, i) =>
        item ? (
          <ListItem
            externalId={item.externalId}
            contentTypeName={item.contentTypeName}
            href={'/content/' + item.externalId}
            title={item.titleBrief}
            backgroundImgSources={getSourcesByRatio(item.creatives, LIST_ITEM_ASPECT_RATIO)}
            showPublisher={true}
            contributors={item.contributors}
            loaded={loaded}
            hideAvatar={hideAvatar}
            isFree={item.isFree}
            duration={item.duration}
          />
        ) : null
      )}
    />
  );
};

const mapStateToProps = state => {
  return {
    targetDevice: getTargetDevice(state),
  };
};

export default compose(
  connect(mapStateToProps),
  withRequest({
    requestIdAlias: 'sectionId',
    requestAction: fetchSectionItems,
    responseSelector: getSectionItems,
    responseAlias: 'items',
    pageable: true,
    requestCondition: ({ responseData = [] }) => !responseData.length,
  })
)(ListOfContentThumbnails);
