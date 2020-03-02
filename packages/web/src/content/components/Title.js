import styled from 'styled-components';
import { CoreDevices } from '../../common/dimensions';
import { H1, H3 } from '../../common/typography';
import TruncateMultiline from '../../common/TruncateMultiline';

export const LINE_HEIGHTS = {
  pt: {
    small: 1.14,
    large: 1.16,
  },
  tr: {
    small: 1.14,
    large: 1.16,
  },
  default: {
    small: 0.94,
    large: 0.92,
  },
};

export default styled.div`
  ${H3};
  ${({ lineHeight = LINE_HEIGHTS.default, truncate = true }) =>
    truncate &&
    TruncateMultiline({ linesToShow: 1, lineHeight: lineHeight.small, fontSize: '32px' })};
  margin: 14px 0 0;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H1};
    ${({ lineHeight = LINE_HEIGHTS.default, truncate = true }) =>
      truncate &&
      TruncateMultiline({ linesToShow: 1, lineHeight: lineHeight.large, fontSize: '48px' })};
    margin-top: 28px;
  }
`;
