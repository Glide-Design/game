import styled, { css } from 'styled-components';
import { DarkerGreen, Grey20, Grey50, Grey85, PrimaryGreen, YellowGreen } from 'xi-core/colours';
import { CoreDevices } from '../dimensions';
import { FontFamily } from '../typography';

export const UnstyledButtonLink = styled.button.attrs({ type: 'button' })`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  color: inherit;
  cursor: pointer;
  outline: none;
`;

export const CommonButtonCss = css`
  ${FontFamily.bold};
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 0.5px;
  outline: none;
`;

export const Button1Hover = css`
  border: 1px solid ${DarkerGreen};
  color: ${Grey20};
  background: rgba(255, 255, 255, 0.8);
`;

export const Button1 = styled.button`
  ${CommonButtonCss};
  font-size: 14px;
  border: 1px solid ${PrimaryGreen};
  height: 40px;
  padding: 0 30px;
  color: ${Grey85};
  background: rgba(255, 255, 255, 0.5);

  &:hover {
    ${Button1Hover};
  }

  ${({ inset }) =>
    inset
      ? ''
      : `
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    font-size: 16px;
    height: 48px;
    padding: 0 40px;
  }
  `};

  ${({ disabled }) =>
    disabled
      ? `
    border: 1px solid ${Grey20} !important;
    color: ${Grey20} !important;
    pointer-events: none;
    `
      : ''};
`;

export const Button2Hover = css`
  background: rgba(0, 0, 0, 0.2);
`;

export const Button2 = styled.button`
  ${CommonButtonCss};
  font-size: 14px;
  border: 1px solid white;
  height: 40px;
  padding: 0 30px;
  color: ${Grey85};
  background: rgba(0, 0, 0, 0.1);

  &:hover {
    ${Button2Hover};
  }

  ${({ inset }) =>
    inset
      ? ''
      : `
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
      font-size: 16px;
      height: 48px;
      padding: 0 40px;
    }
  `};

  ${({ disabled }) =>
    disabled
      ? `
    border: 1px solid ${Grey85} !important;
    pointer-events: none;
    `
      : ''};
`;

export const Button3Hover = css`
  border: 1px solid white;
  background: rgba(0, 0, 0, 0.6);
`;

export const Button3 = styled.button`
  ${CommonButtonCss};
  font-size: 14px;
  border: 1px solid ${PrimaryGreen};
  height: 40px;
  padding: 0 30px;
  color: white;
  background: rgba(0, 0, 0, 0.3);

  &:hover {
    ${Button3Hover};
  }

  ${({ inset }) =>
    inset
      ? ''
      : `
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
      font-size: 16px;
      height: 48px;
      padding: 0 40px;
    }
    `};

  ${({ disabled }) =>
    disabled
      ? `
    border: 1px solid ${Grey50} !important;
    color: ${Grey50};
    pointer-events: none;
    `
      : ''};
`;

export const Button9 = styled.button`
  ${CommonButtonCss};
  font-size: 10px;
  border: 1px solid ${PrimaryGreen};
  height: 22px;
  color: white;
  background: rgba(0, 0, 0, 0.3);

  @media ${CoreDevices.tiny} {
    font-size: 10px;
    height: 22px;
  }

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    font-size: 12px;
    height: 30px;
  }
`;

export const Button12 = styled.button`
  ${CommonButtonCss};
  ${FontFamily.regular};
  text-transform: none;
  letter-spacing: normal;
  cursor: pointer;
  font-size: 14px;
  border: 1px solid white;
  height: 48px;
  color: white;
  background: rgba(0, 0, 0, 0.3);
  padding: 0 20px;
  outline: none;

  @media ${CoreDevices.medium} {
    font-size: 18px;
    height: 54px;
    padding: 0 30px;
  }

  @media ${CoreDevices.large} {
    font-size: 20px;
    height: 64px;
    padding: 0 30px;
  }
`;

export const SolidGreenButton = styled.button`
  ${CommonButtonCss};
  color: ${Grey85};
  border: none;
  background-image: linear-gradient(
    to right,
    ${PrimaryGreen},
    ${YellowGreen},
    ${YellowGreen},
    ${PrimaryGreen}
  );
  background-size: 400%;
  transition-property: background-position, color;
  transition-duration: 1.5s, 0.2s;

  &:hover {
    background-position: 100%;
    color: black;
  }

  font-size: 14px;
  line-height: 12.8px;
  letter-spacing: 0.4px;
  width: 170px;
  flex-basis: 40px;
  @media ${CoreDevices.small} {
    width: 214px;
    flex-basis: 40px;
    line-height: 16px;
    letter-spacing: 0.5px;
  }
  @media ${CoreDevices.medium} {
    width: 214px;
    flex-basis: 48px;
    line-height: 16px;
    letter-spacing: 0.5px;
  }
  @media ${CoreDevices.large} {
    width: 428px;
    flex-basis: 96px;
    font-size: 28px;
    line-height: 32px;
    letter-spacing: 1px;
  }
`;

export const ViolaButton = styled(SolidGreenButton)`
  border: none;
  background: #7c52f6;
  box-shadow: 4px 4px 0px #360fa6;
  color: #ffffff;
`;
