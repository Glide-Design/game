import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
// import styled from 'styled-components';
import { withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import withRequest from 'xi-core/withRequest';
import { addToViewCount } from 'xi-core/member/actions';
import navPresenter from 'xi-core/navigation/NavigationPresenter';
import { fetchRelatedContentSection } from 'xi-core/content/actions';
import { getRelatedContent, getPublisherIdForContent } from 'xi-core/content/selectors';
import { FixedFullScreenContainerWithNavWithToolbar } from '../../../common/FixedFullScreenContainer';
import { NAVBAR_HEIGHT_PX, TOOLBAR_HEIGHT_PX } from '../../../common/dimensions';
import LazyGrid from '../../../common/LazyGrid';
import FixedToolbar from '../../../common/FixedToolbar';
import BackButton from '../../../common/BackButton';
import { getTargetDevice, getViewportHeight } from '../../../state/app/selectors';
import ContentTile from '../../tiles/ContentTile';

class SocialList extends React.Component {
  state = {
    itemIds: [],
    contentInViewRecord: [],
  };

  componentDidMount() {
    this.setItemsIds();
  }

  componentDidUpdate(prevProps) {
    const { starId, related = [] } = this.props;
    navPresenter.setCurrentStar(starId);
    if (prevProps.related.length !== related.length) {
      this.setItemsIds();
    }
  }

  setItemsIds = () => {
    const { related = [], contentId } = this.props;
    this.setState({
      itemIds: [contentId].concat(related.map(item => item.externalId)),
    });
  };

  tileInView = id => {
    if (this.state.contentInViewRecord.indexOf(id) === -1) {
      this.props.addToViewCount(id);
      this.setState(prevState => ({ contentInViewRecord: [...prevState.contentInViewRecord, id] }));
    }
  };

  getContainerHeight = () => {
    const { targetDevice, viewportHeight } = this.props;
    if (targetDevice === 'large') {
      return viewportHeight - NAVBAR_HEIGHT_PX.large;
    }
    return viewportHeight - NAVBAR_HEIGHT_PX[targetDevice] - TOOLBAR_HEIGHT_PX[targetDevice];
  };

  renderTile = id => (
    <ContentTile
      id={id}
      containerInset={true}
      hideAvatar={true}
      showSocialAsLink={false}
      inView={() => this.tileInView(id)}
    />
  );

  render() {
    const { targetDevice } = this.props;
    const largeDevice = targetDevice === 'large';
    return (
      <Fragment>
        {!largeDevice ? (
          <FixedToolbar
            leftButton={<BackButton />}
            position="fixed"
            title={<FormattedMessage id="social.title" defaultMessage="What I've been up to" />}
          />
        ) : null}
        <FixedFullScreenContainerWithNavWithToolbar>
          <LazyGrid
            items={this.state.itemIds}
            renderTile={this.renderTile}
            getNextPage={this.props.getNextPage}
            containerHeight={this.getContainerHeight()}
          />
        </FixedFullScreenContainerWithNavWithToolbar>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, { contentId }) => {
  return {
    starId: getPublisherIdForContent(state)(contentId),
    targetDevice: getTargetDevice(state),
    viewportHeight: getViewportHeight(state),
  };
};

const mapDispatchToProps = dispatch => ({
  addToViewCount: id => dispatch(addToViewCount(id)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRequest({
    requestIdAlias: 'contentId',
    requestAction: fetchRelatedContentSection,
    responseSelector: getRelatedContent,
    responseAlias: 'related',
    pageable: true,
    itemsPerPage: 10,
  }),
  withRouter,
  withProps(({ match }) => ({ contentId: match.params.contentId }))
)(SocialList);
