import React from 'react';
import PropTypes from 'prop-types';
import { getContentTypeFromContent } from 'xi-core/gallery/utils';
import { CONTENT_TYPES, galleryShape } from 'xi-core/gallery/constants';

class TimelineController extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func,
    gallery: galleryShape,
    currentPage: PropTypes.number,
    itemsPerPage: PropTypes.number,
    getNextPage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.initialActiveIndex,
      isDetailOpen: true,
      isDescriptionOpen: false,
      isThumbnailScrolling: false,
      isContentScrolling: false,
    };
  }

  getActiveContent = () => this.props.gallery.content[this.state.activeIndex];

  getCanFullScreen = () => {
    const contentType = getContentTypeFromContent(this.getActiveContent());
    return contentType === CONTENT_TYPES.IMAGE;
  };

  onChangePaging = (startIndex, endIndex) => {
    const { currentPage, itemsPerPage, getNextPage } = this.props;
    const nextPage = Math.floor(endIndex / itemsPerPage);
    if (nextPage > currentPage) {
      getNextPage();
    }
  };

  onChangeActiveIndex = activeIndex => {
    this.setState({ activeIndex });
  };

  closeDescription = e => {
    e.preventDefault();
    this.setState({ isDescriptionOpen: false });
  };

  openDescription = e => {
    e.preventDefault();
    this.setState({ isDescriptionOpen: true });
  };

  closeDetail = e => {
    if (e && e.isDefaultPrevented()) {
      return;
    }
    if (this.getCanFullScreen()) {
      this.setState({ isDetailOpen: false });
    }
  };

  openDetail = () => {
    this.setState({ isDetailOpen: true });
  };

  onThumbnailScrollStart = () => {
    this.setState({ isContentScrollingEnabled: false });
  };

  onContentScrollStart = () => {
    this.setState({ isContentScrollingEnabled: true });
  };

  render() {
    const { children } = this.props;
    const { activeIndex, isDetailOpen, isDescriptionOpen, isContentScrollingEnabled } = this.state;
    const activeContent = this.getActiveContent();

    return children({
      activeIndex,
      activeContent,
      isDetailOpen,
      isDescriptionOpen,
      isContentScrollingEnabled,
      onThumbnailScrollStart: this.onThumbnailScrollStart,
      onContentScrollStart: this.onContentScrollStart,
      onChangePaging: this.onChangePaging,
      onChangeActiveIndex: this.onChangeActiveIndex,
      closeDetail: this.closeDetail,
      openDetail: this.openDetail,
      closeDescription: this.closeDescription,
      openDescription: this.openDescription,
    });
  }
}

export default TimelineController;
