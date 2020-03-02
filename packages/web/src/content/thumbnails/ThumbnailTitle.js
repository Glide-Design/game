import React from 'react';
import styled from 'styled-components';
import LanguageLineHeights from '../../common/LanguageLineHeights';
import TruncateMultiline from '../../common/TruncateMultiline';
import { H2, H3 } from '../../common/typography';
import { CoreDevices } from '../../common/dimensions';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
  position: relative;
  text-align: center;
  width: 100%;

  @media ${CoreDevices.medium} {
    margin: 15px 0;
  }

  @media ${CoreDevices.small}, ${CoreDevices.tiny} {
    margin: 5px 0;
  }
`;

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
    small: 1.01,
    large: 0.94,
  },
};

const Title = styled.div`
  ${H2};
  ${({ lineHeight = LINE_HEIGHTS.default }) =>
    TruncateMultiline({ linesToShow: 3, lineHeight: lineHeight.small, fontSize: '24px' })};
  flex-grow: 1;
  margin: 0 ${({ compact }) => (compact ? 7 : 16)}px;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H3};
    ${({ lineHeight = LINE_HEIGHTS.default }) =>
      TruncateMultiline({ linesToShow: 4, lineHeight: lineHeight.large, fontSize: '32px' })};
  }
`;

export default ({ children, stacked = false, compact = false }) => (
  <TitleContainer>
    <LanguageLineHeights lineHeights={LINE_HEIGHTS}>
      {({ lineHeight }) => (
        <Title compact={compact} lineHeight={lineHeight}>
          {children}
        </Title>
      )}
    </LanguageLineHeights>
  </TitleContainer>
);
