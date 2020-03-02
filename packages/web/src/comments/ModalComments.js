import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { clearContentComments } from 'xi-core/comments/actions';
import { currentOpenComments } from 'xi-core/comments/selectors';
import Overlay from '../common/overlay';
import Comments from './Comments';

class ModalComments extends React.Component {
  state = {
    renderComments: false,
    memoryContentId: null,
    finishedClosing: false,
  };

  currentContentId = null;

  componentDidMount() {
    const { contentId } = this.props;
    if (!this.state.memoryContentId && contentId) {
      this.setState({
        memoryContentId: contentId,
      });
    }
  }

  componentDidUpdate(oldProps) {
    const { contentId, showComments, onOpen } = this.props;

    if (!this.state.memoryContentId && contentId && oldProps.contentId !== contentId) {
      this.setState({
        memoryContentId: contentId,
      });
    }

    if (!showComments && this.state.renderComments) {
      setTimeout(() => this.setState({ renderComments: false }), 1000);
    }

    if (showComments && !this.state.renderComments) {
      if (onOpen) {
        onOpen();
      }
      this.setState({ renderComments: true });
    }
  }

  render() {
    const { clearContentComments, showComments } = this.props;

    const contentId = showComments;

    return (
      <Overlay
        open={!!showComments}
        finishedClosing={() => clearContentComments(this.state.memoryContentId)}
        memory={contentId}
        userExperience="sidePanel"
      >
        {({ memory }) => this.state.renderComments && <Comments contentId={memory} />}
      </Overlay>
    );
  }
}

const mapStateToProps = state => ({
  showComments: currentOpenComments(state),
});

const mapDispatchToProps = {
  clearContentComments,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ModalComments);
