import React from 'react';
import styled, { css } from 'styled-components';
import LanguageLineHeights from '../../common/LanguageLineHeights';
import TruncateMultiline from '../../common/TruncateMultiline';
import { H2, H3 } from '../../common/typography';
import { CoreDevices } from '../../common/dimensions';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
  position: absolute;
  bottom: 0;
  height: 40px;
  width: 100%;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    height: 50px;
    padding-top: 16px;
    padding-bottom: 16px;
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
    small: 1.1,
    large: 1.2,
  },
};

export const TitleHoverStyle = css`
  color: rgba(255, 255, 255, 0.8);
`;

export const TitleActiveStyle = css`
  span {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Title = styled.div`
  ${H2};
  ${({ lineHeight = LINE_HEIGHTS.default }) =>
    TruncateMultiline({ linesToShow: 3, lineHeight: lineHeight.small, fontSize: '12px' })};
  flex-grow: 1;
  margin: 0 ${({ compact }) => (compact ? 7 : 16)}px;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H3};
    ${({ lineHeight = LINE_HEIGHTS.default }) =>
      TruncateMultiline({ linesToShow: 3, lineHeight: lineHeight.large, fontSize: '14px' })};
  }

  &:hover {
    ${TitleHoverStyle}
  }

  &:active {
    ${TitleActiveStyle}
  }
`;

export default ({ children, compact = false }) => (
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
