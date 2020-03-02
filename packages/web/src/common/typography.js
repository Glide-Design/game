import { css } from 'styled-components';

export const TITLE_FONT_SIZES = {
  small: 30,
  medium: 50,
  large: 50,
};

// Different line heights for specific locales
// to accomodate accented characters.
export const TITLE_LINE_HEIGHTS = {
  pt: {
    small: 1.14,
    medium: 1.15,
    large: 1.16,
  },
  tr: {
    small: 1.14,
    medium: 1.15,
    large: 1.16,
  },
  default: {
    small: 1.1,
    medium: 1.14,
    large: 1.15,
  },
};

export const BodySmall = css`
  font-size: 10px;
  line-height: 1.2;
`;

export const Body4 = css`
  font-size: 11px;
  line-height: 1.2;
`;

export const Body5 = css`
  font-size: 9px;
  line-height: 1.2;
`;

export const DateDisplayCopyCss = css`
  ${BodySmall};
`;

export const Body3 = css`
  font-size: 10px;
  line-height: 1.2;
  font-weight: bold;
`;
export const AvatarCopyCss = css`
  ${Body3};
  text-transform: uppercase;
`;
export const Input = css`
  font-size: 14px;
  line-height: 20px;
`;
export const Body1 = css`
  font-size: 14px;
  line-height: 1.43;
`;
export const Body2 = css`
  font-size: 14px;
  line-height: 1.14;
  font-weight: bold;
`;
export const BodyBold14 = css`
  font-size: 16px;
  line-height: 1;
  font-weight: bold;
`;
export const Body10 = css`
  font-size: 20px;
  line-height: 1.4;
`;
export const Body11 = css`
  font-size: 20px;
  line-height: 1;
  font-weight: bold;
`;

export const FontFamily = {
  bold: "font-family: 'GT-America-Bold', sans-serif;",
  regular: "font-family: 'GT-America', sans-serif;",
};

const CommonHeaderCss = `
  text-transform: uppercase;
  ${FontFamily.bold};
`;

export const H6 = css`
  font-size: 14px;
  line-height: 1;
  ${CommonHeaderCss};
`;
export const H4 = css`
  font-size: 20px;
  line-height: 1.1;
  ${CommonHeaderCss};
`;
export const H16 = css`
  font-size: 22px;
  line-height: 1;
  ${CommonHeaderCss};
`;
export const H2 = css`
  font-size: 24px;
  line-height: 1.01;
  ${CommonHeaderCss};
`;
export const H3 = css`
  font-size: 32px;
  line-height: 0.94;
  ${CommonHeaderCss};
`;
export const H13 = css`
  font-size: 36px;
  line-height: 1;
  ${CommonHeaderCss};
`;
export const H1 = css`
  font-size: 48px;
  line-height: 0.92;
  ${CommonHeaderCss};
`;
export const H5 = css`
  font-size: 56px;
  line-height: 0.86;
  ${CommonHeaderCss};
`;
export const H10 = css`
  font-size: 80px;
  line-height: 0.9;
  ${CommonHeaderCss};
`;
export const H17 = css`
  font-size: 72px;
  line-height: 0.89;
  ${CommonHeaderCss};
`;
export const H14 = css`
  font-size: 88px;
  line-height: 0.82;
  ${CommonHeaderCss};
`;
export const H7 = css`
  font-size: 96px;
  line-height: 1;
  ${CommonHeaderCss};
`;
