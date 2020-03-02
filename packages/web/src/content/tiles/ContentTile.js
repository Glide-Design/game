import React from 'react';
import { connect } from 'react-redux';
import { mapValues, compose } from 'lodash/fp';
import Loadable from 'react-loadable';
import { contentTypes } from 'xi-core/content/contentTypes';
import { getContentItemById } from 'xi-core/content/selectors';
import { LoadableProps } from '../../common/NetworkSlow';

const VideoTile = Loadable({
  loader: () => import('./VideoTile'),
  ...LoadableProps,
});

const StarProfileTile = Loadable({
  loader: () => import('./StarProfileTile'),
  ...LoadableProps,
});

const SocialTile = Loadable({
  loader: () => import('./SocialTile'),
  ...LoadableProps,
});

const SocialLinkThroughTile = Loadable({
  loader: () => import('./SocialLinkThroughTile'),
  ...LoadableProps,
});

const CardTile = Loadable({
  loader: () => import('./CardTile'),
  ...LoadableProps,
});

const ArticleTile = Loadable({
  loader: () => import('./ArticleTile'),
  ...LoadableProps,
});

class ContentTile extends React.Component {
  render() {
    const { item, showSocialAsLink = true, ...passedProps } = this.props;
    if (!item) {
      return null;
    }

    item.title = item.titleBrief;
    if (passedProps.hero || passedProps.playerProfile) {
      item.description = item.descriptionBrief;
    }
    const { contentTypeName } = item;
    switch (contentTypeName) {
      case contentTypes.VIDEO:
        return <VideoTile {...item} {...passedProps} hideTimestamp={true} />;

      case contentTypes.SOCIAL:
        switch (showSocialAsLink) {
          case true:
            return <SocialLinkThroughTile {...item} {...passedProps} />;
          case false:
            return <SocialTile {...item} {...passedProps} />;
          default:
            console.error('Unknown condition');
            break;
        }
        break;
      case contentTypes.CARD:
        return <CardTile {...item} {...passedProps} />;

      case contentTypes.ARTICLE:
        return <ArticleTile {...item} {...passedProps} />;

      case contentTypes.PLAYER:
        return <StarProfileTile {...item} {...passedProps} />;

      default:
        console.warn('Unknown content type', contentTypeName);
        return null;
    }
  }
}

const mapStateToProps = (state, { id }) => ({
  item: mapValues(v => v, getContentItemById(state)(id)),
});

export default compose(connect(mapStateToProps))(ContentTile);
