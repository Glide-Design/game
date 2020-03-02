import React from 'react';
import styled from 'styled-components';
import { contentShape } from 'xi-core/gallery/constants';
import { CoreDevices, SIDE_MARGIN_PX } from '../../common/dimensions';
import { Body10, Body1 } from '../../common/typography';

const Description = styled.p`
  ${Body1};
  color: #ffffff;
  box-sizing: border-box;

  @media ${CoreDevices.small}, ${CoreDevices.tiny} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
    width: 100%;
  }
  @media ${CoreDevices.medium} {
    ${Body10};
    padding: 0 ${SIDE_MARGIN_PX.medium}px;
    width: 80%;
  }
  @media ${CoreDevices.large} {
    ${Body10};
    padding: 0 ${SIDE_MARGIN_PX.large}px;
    width: 60%;
  }
`;

/**
 * Shows the description for a particular piece of content
 */
class TimelineContentDescription extends React.Component {
  static propTypes = {
    content: contentShape,
  };

  render() {
    const { content, className } = this.props;

    return content ? <Description className={className}>{content.description}</Description> : null;
  }
}

export default TimelineContentDescription;
