import { orderBy, uniqBy } from 'lodash/fp';

const MAX_COMMENTS_VISIBLE_ON_VIEWPORT = 6; // Work this out dynamically in future
const MAX_REPLACEMENTS = 2;

const filterCommentsAlreadyOnScreen = onScreenComments => comments =>
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
  highestNewComments.forEach((_highestNewComment, i) => {
    const currentCommentsWithLowerScores = orderBy(['score'], ['asc'])(
      currentCommentsScored.filter(
        _currentComment =>
          _currentComment.score <= _highestNewComment.score &&
          replacements.indexOf(_currentComment.originalIndex) === -1
      )
    );
    if (currentCommentsWithLowerScores.length) {
      const originalIndex = currentCommentsWithLowerScores[0].originalIndex;
      replacements.push(originalIndex);
      replacementCallback(originalIndex, i);
    }
  });
};

const mergeNewComments = (_currentComments, _newComments, { time }) => {
  const currentCommentsOnViewPort = _currentComments.slice(0, MAX_COMMENTS_VISIBLE_ON_VIEWPORT);

  const currentCommentsNotOnViewPort =
    _currentComments.length > MAX_COMMENTS_VISIBLE_ON_VIEWPORT
      ? _currentComments.slice(MAX_COMMENTS_VISIBLE_ON_VIEWPORT)
      : [];

  const newComments = filterCommentsAlreadyOnScreen(currentCommentsOnViewPort)(_newComments);

  const spacesLeftOnViewport = MAX_COMMENTS_VISIBLE_ON_VIEWPORT - currentCommentsOnViewPort.length;

  const thereIsRoomToAppendAllNewComments = () => {
    return spacesLeftOnViewport > 0 && newComments.length <= spacesLeftOnViewport;
  };

  if (thereIsRoomToAppendAllNewComments()) {
    return uniqBy('externalId')([
      ...currentCommentsOnViewPort,
      ...newComments,
      ...currentCommentsNotOnViewPort,
    ]);
  }

  const currentCommentsScored = assignScoreToComments(currentCommentsOnViewPort, { time });
  const newCommentsScored = assignScoreToComments(newComments, { time });

  const newCommentsForEmptySpaces = removeScore(newCommentsScored.splice(0, spacesLeftOnViewport));

  let numberReplaced = 0;
  const shouldTestForReplacements = () => MAX_REPLACEMENTS - spacesLeftOnViewport > 0;

  if (shouldTestForReplacements()) {
    const highestNewComments = newCommentsScored.slice(0, MAX_REPLACEMENTS - spacesLeftOnViewport);
    testForReplacements(
      currentCommentsScored,
      highestNewComments,
      (currentCommentIdx, newCommentIdx) => {
        currentCommentsOnViewPort[currentCommentIdx] = highestNewComments[newCommentIdx].comment;
        numberReplaced++;
      }
    );
  }

  if (numberReplaced > 0 || newCommentsForEmptySpaces.length) {
    const remainingNewComments = removeScore(newCommentsScored.slice(numberReplaced));
    return uniqBy('externalId')([
      ...currentCommentsOnViewPort,
      ...newCommentsForEmptySpaces,
      ...remainingNewComments,
      ...currentCommentsNotOnViewPort,
    ]);
  }

  return uniqBy('externalId')([
    ...currentCommentsOnViewPort,
    ...newComments,
    ...currentCommentsNotOnViewPort,
  ]);
};

export default mergeNewComments;
