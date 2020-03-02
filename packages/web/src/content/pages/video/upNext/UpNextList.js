import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { contentDetailPageInteraction } from 'xi-core/content/actions';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import List from '../../../../common/List';
import CardThumbnail, {
  LIST_ITEM_WIDTH,
  LIST_ITEM_RHS_MARGIN,
} from '../../../components/CardThumbnail';
import { getTargetDevice } from '../../../../state/app/selectors';

const UpNextList = ({ className, items = [], targetDevice, upNextContentClicked }) => {
  const itemSize = LIST_ITEM_WIDTH[targetDevice] + LIST_ITEM_RHS_MARGIN[targetDevice];

  return (
    <List
      className={className}
      onScrollEnd={null}
      getNextPage={() => {}}
      scrollDirection={'horizontal'}
      itemSize={itemSize}
      useNavButtons={true}
      items={items.map((item, i) =>
        item ? (
          <CardThumbnail
            externalId={item.externalId}
            contentTypeName={item.contentTypeName}
            title={item.titleBrief}
            creatives={item.creatives}
            onClick={() => upNextContentClicked()}
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

const mapDispatchToProps = dispatch => ({
  upNextContentClicked: () =>
    dispatch(
      contentDetailPageInteraction({
        [PropertyKeys.CONTENT_DETAIL_INTERACTIONS.UP_NEXT_CONTENT_CLICK]: true,
      })
    ),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UpNextList);
