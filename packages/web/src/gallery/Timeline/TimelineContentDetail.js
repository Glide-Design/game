import React from 'react';
import styled from 'styled-components';
import { contentShape } from 'xi-core/gallery/constants';
import { CoreDevices, SIDE_MARGIN_PX } from '../../common/dimensions';
import { H1, H10, H17 } from '../../common/typography';

const TimelineContentDetailContainer = styled.div`
  box-sizing: border-box;
  overflow: hidden;

  @media ${CoreDevices.small}, ${CoreDevices.tiny} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
    width: 100%;
  }
  @media ${CoreDevices.medium} {
    padding: 0 ${SIDE_MARGIN_PX.medium}px;
    width: 70%;
  }
  @media ${CoreDevices.large} {
    padding: 0 ${SIDE_MARGIN_PX.large}px;
    width: 50%;
  }
`;

const Year = styled.h1`
  ${H1};
  color: #00ff00;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H10};
  }
`;

const Title = styled.h1`
  ${H1};
  color: #ffffff;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H17};
  }
`;

/**
 * Shows the year and a title for a piece of gallery content
 */
class TimelineContentDetail extends React.Component {
  static propTypes = {
    content: contentShape,
  };

  render() {
    const { content, className } = this.props;

    return content ? (
      <TimelineContentDetailContainer className={className}>
        <Year>{content.date}</Year>

        <Title>{content.title}</Title>
      </TimelineContentDetailContainer>
    ) : (
      <div className={className} />
    );
  }
}

export default TimelineContentDetail;
