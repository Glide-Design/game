import React from 'react';
import styled from 'styled-components';
import { FormattedTime } from 'react-intl';
import GetFormattedRelativeTimeValue from 'xi-core/utils/time';
import { DateDisplayCopyCss } from '../common/typography';

const Container = styled.span`
  ${DateDisplayCopyCss} white-space: nowrap;

  span:first-child > span:first-child {
    text-transform: capitalize;
  }

  div {
    position: relative;
    display: inline-block;
    height: 24px;
    margin: 0 10px;
    width: 1px;
  }
`;

export default ({ timestamp, color, className }) =>
  timestamp ? (
    <Container style={{ color }} className={className}>
      <span>
        {/* The usage of the <FormattedRelative> children prop is to wrap each word in an individual span in order to capitalize properly */}
        <GetFormattedRelativeTimeValue timestamp={timestamp}/>
      </span>
      <div style={{ background: color || 'currentColor' }} />
      <FormattedTime value={timestamp} hour12={false} />
    </Container>
  ) : null;
