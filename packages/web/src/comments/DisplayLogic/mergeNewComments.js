import { orderBy } from 'lodash/fp';

const MAX_COMMENTS_VISIBLE_ON_VIEWPORT = 6; // Work this out dynamically in future
const MAX_REPLACEMENTS = 2;

const notAlreadyOnScreen = onScreenComments => comments =>
  comments.filter(
    comment =>
      !onScreenComments.some(onScreenComment => onScreenComment.externalId === comment.externalId)
  );

const assignScoreToComments = (comments, { time }) =>
  orderBy(['score'], ['desc'])(
    comments.map((comment, i) => {
      const timeApartFactor = Math.abs(time - comment.time);
      return {
        // Need to use proper criteria
        score: Math.floor(Math.random() * 100 + 1) / timeApartFactor,
        originalIndex: i,
        comment,
      };
    })
  );

const removeScore = comments => comments.map(c => c.comment);

const testForReplacements = (currentCommentsScored, highestNewComments, replacementCallback) => {
  const replacements = [];
  highestNewComments.forEach(_highestNewComment => {
    const replacementIdx = currentCommentsScored.filter(
      _currentComment =>
        _currentComment.score <= _highestNewComment.score &&
        replacements.indexOf(_currentComment.originalIndex) === -1
    );
    if (replacementIdx.length) {
      const originalIndex = replacementIdx[0].originalIndex;
      replacements.push(originalIndex);
      replacementCallback(originalIndex);
    }
  });
};

const mergeNewComments = (_currentComments, _newComments, { time }) => {
  const currentCommentsOnViewPort = _currentComments.slice(0, MAX_COMMENTS_VISIBLE_ON_VIEWPORT);

  const newComments = notAlreadyOnScreen(currentCommentsOnViewPort)(_newComments);

  const spacesLeftOnViewport = MAX_COMMENTS_VISIBLE_ON_VIEWPORT - currentCommentsOnViewPort.length;

  const thereIsRoomToAppendAllNewComments = () => {
    return spacesLeftOnViewport > 0 && newComments.length <= spacesLeftOnViewport;
  };

  if (thereIsRoomToAppendAllNewComments()) {
    return [...currentCommentsOnViewPort, ...newComments];
  }

  const currentCommentsScored = assignScoreToComments(currentCommentsOnViewPort, { time });
  const newCommentsScored = assignScoreToComments(newComments, { time });

  const newCommentsForEmptySpaces = removeScore(newCommentsScored.splice(0, spacesLeftOnViewport));

  let numberReplaced = 0;
  const shouldTestForReplacements = () => MAX_REPLACEMENTS - spacesLeftOnViewport > 0;

  if (shouldTestForReplacements()) {
    const highestNewComments = newCommentsScored.slice(0, MAX_REPLACEMENTS - spacesLeftOnViewport);
    testForReplacements(currentCommentsScored, highestNewComments, idx => {
      currentCommentsOnViewPort[idx] = highestNewComments.pop().comment;
      numberReplaced++;
    });
  }

  if (numberReplaced > 0 || newCommentsForEmptySpaces.length) {
    const remainingNewComments = removeScore(newCommentsScored.slice(numberReplaced));
    return [...currentCommentsOnViewPort, ...newCommentsForEmptySpaces, ...remainingNewComments];
  }

  return [...currentCommentsOnViewPort, ...newComments];
};

export default mergeNewComments;
