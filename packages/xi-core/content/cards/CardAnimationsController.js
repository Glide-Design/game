import React from 'react';
import { connect } from 'react-redux';
import { difference } from 'lodash/fp';
import { cardPlay } from './actions';

class CardAnimationsController extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      this.playingItemNoLongerInView() ||
      this.justFinished(prevProps.finished) ||
      this.shouldPlaySomething()
    ) {
      this.playNext();
    }
  }

  justFinished = prevFinished => {
    const { finished } = this.props;
    return finished && prevFinished !== finished;
  };

  playNext = () => {
    const { cardPlaying } = this.props;

    let nextToPlay = null;
    const notPlayedItems = this.notPlayedItems();

    if (notPlayedItems.length) {
      if (cardPlaying) {
        const idx = notPlayedItems.indexOf(cardPlaying);
        if (idx + 1 === notPlayedItems.length) {
          nextToPlay = notPlayedItems[0];
        } else {
          nextToPlay = notPlayedItems[idx + 1];
        }
      } else {
        nextToPlay = notPlayedItems[0];
      }
    }
    this.props.play(nextToPlay);
  };

  playingItemNoLongerInView = () => {
    const { inView, cardPlaying } = this.props;
    return cardPlaying && inView.indexOf(cardPlaying) === -1;
  };

  notPlayedItems = () => difference(this.props.inView, this.props.played);

  shouldPlaySomething = () => {
    const { cardPlaying } = this.props;
    return !cardPlaying && this.notPlayedItems().length;
  };

  render = () => null;
}

export default connect(
  state => {
    const cards = state.content.cards;
    return {
      cardPlaying: cards.cardPlaying,
      finished: cards.finished,
      inView: cards.inView,
      played: cards.played,
    };
  },
  dispatch => ({
    play: id => dispatch(cardPlay(id)),
  })
)(CardAnimationsController);
