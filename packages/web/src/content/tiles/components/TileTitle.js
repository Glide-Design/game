import React from 'react';
import styled from 'styled-components';
import { H1, H10, H14 } from '../../../common/typography';
import {
  CoreDevices,
  HelperDevices,
  SIDE_MARGIN_PX,
  ContainerPaddingCss,
} from '../../../common/dimensions';
import LanugageLineHeights from '../../../common/LanguageLineHeights';
import { TITLE_FONT_SIZES, TITLE_LINE_HEIGHTS } from '../../../common/typography';
import TruncateMultiline from '../../../common/TruncateMultiline';

const TitleText = styled.h1`
  ${ContainerPaddingCss};
  flex-grow: 1;
  ${({ hero }) => (hero ? 'text-transform: none' : '')}

  @media ${CoreDevices.large} {
    ${H14};
    ${({ lineHeight = TITLE_LINE_HEIGHTS.default }) =>
      TruncateMultiline({
        linesToShow: 3,
        lineHeight: lineHeight.large,
        fontSize: `${TITLE_FONT_SIZES.large}px`,
      })};
    ${({ hero }) => (hero ? 'text-transform: none' : '')}
  }
  @media ${CoreDevices.medium} {
    ${H10};
    ${({ lineHeight = TITLE_LINE_HEIGHTS.default }) =>
      TruncateMultiline({
        linesToShow: 3,
        lineHeight: lineHeight.medium,
        fontSize: `${TITLE_FONT_SIZES.medium}px`,
      })};
    ${({ hero }) => (hero ? 'text-transform: none' : '')}
  }
  @media ${HelperDevices.belowMedium}, ${HelperDevices.belowMediumLandscape} {
    ${H1};
    ${({ lineHeight = TITLE_LINE_HEIGHTS.default }) =>
      TruncateMultiline({
        linesToShow: 3,
        lineHeight: lineHeight.small,
        fontSize: `${TITLE_FONT_SIZES.small}px`,
      })};

    ${({ hero }) => (hero ? 'text-transform: none' : '')}
  }
`;

const TitleInset = styled(TitleText)`
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H1};
    padding: 0 ${SIDE_MARGIN_PX.small}px 0;
    ${({ lineHeight }) =>
      TruncateMultiline({
        linesToShow: 3,
        lineHeight: lineHeight.large,
        fontSize: `${TITLE_FONT_SIZES.small}px`,
      })};
    ${({ hero }) => (hero ? 'text-transform: none' : '')}
  }
`;

export default ({ children, className, inset, hero }) => (
  <LanugageLineHeights lineHeights={TITLE_LINE_HEIGHTS}>
    {({ lineHeight }) =>
      inset ? (
        <TitleInset className={className} lineHeight={lineHeight} hero={hero}>
          {children}
        </TitleInset>
      ) : (
        <TitleText className={className} lineHeight={lineHeight} hero={hero}>
          {children}
        </TitleText>
      )
    }
  </LanugageLineHeights>
);
