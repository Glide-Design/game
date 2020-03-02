import styled from 'styled-components';
import { Grey20 } from 'xi-core/colours';
import { CoreDevices, SIDE_MARGIN_PX } from '../common/dimensions';

export default styled.hr`
  height: 1px;
  color: ${({ color = Grey20 }) => color};
  background: ${({ color = Grey20 }) => color};
  font-size: 0;
  border: 0;
  margin: 0;
  padding: 0;

  ${({ withoutMargin = false }) =>
    !withoutMargin &&
    `
    margin-left: ${SIDE_MARGIN_PX.small}px;
    margin-right: ${SIDE_MARGIN_PX.small}px;

    @media ${CoreDevices.medium} {
      margin-left: ${SIDE_MARGIN_PX.medium}px;
      margin-right: ${SIDE_MARGIN_PX.medium}px;
    }
    @media ${CoreDevices.large} {
      margin-left: ${SIDE_MARGIN_PX.large}px;
      margin-right: ${SIDE_MARGIN_PX.large}px;
    }
  `};

  ${({ hairline = true }) =>
    !hairline &&
    `
    height: 5px;
    @media ${CoreDevices.medium} {
      height: 8px;
    }
    @media ${CoreDevices.large} {
      height: 10px;
    }
    `};
`;
