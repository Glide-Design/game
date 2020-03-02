/* eslint-disable react/style-prop-object */
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import GetFormattedRelativeTimeValue from 'xi-core/utils/time';
import { DateDisplayCopyCss } from '../common/typography';

const Container = styled.span`
  ${DateDisplayCopyCss}

  ${props =>
    props.discussionHighlights ? '' : 'white-space: nowrap;'}

  span:first-child > span:first-child {
    text-transform: ${props => (props.discussionHighlights ? 'none' : 'capitalize')};
  }

  div {
    position: relative;
    display: inline-block;
    height: 24px;
    margin: 0 10px;
    width: 1px;
  }
`;

export default ({ timestamp, color, className, discussionHighlights = false, isReply = false }) => {
  return timestamp ? (
    <Container
      style={{ color, textTransform: 'lowercase' }}
      className={className}
      discussionHighlights={discussionHighlights}
    >
      {!discussionHighlights ? (
        <GetFormattedRelativeTimeValue timestamp={timestamp} />
      ) : isReply ? (
        <FormattedMessage
          id="discussionHighlights.repliedToAComment"
          defaultMessage="replied to a comment {timeago}"
          values={{
            timeago: <FormattedRelative value={timestamp} />,
          }}
        />
      ) : (
        <FormattedMessage
          id="discussionHighlights.postedAComment"
          defaultMessage="posted a comment {timeago}"
          values={{
            timeago: <FormattedRelative value={timestamp} />,
          }}
        />
      )}
    </Container>
  ) : null;
};
