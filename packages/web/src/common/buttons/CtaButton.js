import React from 'react';
import styled, { css } from 'styled-components';
import { contentTypes } from 'xi-core/content/contentTypes';
import { Grey50 } from 'xi-core/colours';
import { CoreDevices, HelperDevices } from '../dimensions';
import { CommonButtonCss } from '.';

export const CtaButtonHover = css`
  span {
    color: rgba(255, 255, 255, 0.7);
  }
  img {
    filter: grayscale(100%) contrast(100);
  }
`;

export const CtaButtonActive = css`
  span {
    color: rgba(255, 255, 255, 0.7);
  }
  img {
    filter: grayscale(100%) contrast(100);
  }
`;
const StyledCta = styled.button`
  ${CommonButtonCss};
  display: flex;
  height: 40px;
  border: none;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0);
  padding: 0;

  span {
    color: rgba(255, 255, 255, 0.9);
  }

  img {
    filter: grayscale(100%) contrast(100);
  }

  &:hover {
    ${CtaButtonHover}
  }

  &:active {
    ${CtaButtonActive}
  }

  ${({ inset }) =>
    inset
      ? ''
      : `
          @media ${CoreDevices.medium}, ${CoreDevices.large} {
            height: 48px;
          } 
        `};

  ${({ disabled }) =>
    disabled
      ? `
          color: ${Grey50};
          pointer-events: none;
        `
      : ''};
`;

const CtaIcon = styled.img`
  ${({ right }) => (right ? 'margin-left: 14px;' : 'margin-right: 14px;')}

  width: 26px;
  height: 26px;

  @media ${CoreDevices.medium} {
    width: 20px;
    height: 25px;
    ${({ right }) => (right ? 'margin-left: 14px;' : 'margin-right: 14px;')}
  }

  @media ${HelperDevices.belowMedium} {
    ${({ right }) => (right ? 'margin-left: 8px;' : 'margin-right: 14px;')}
    width: 13px;
    height: 17px;
  }
`;

const ChildrenContainer = styled.div`
  font-size: 15px;
  color: white;
  text-align: center;

  ${({ inset }) =>
    inset
      ? ''
      : `
          @media ${CoreDevices.medium}, ${CoreDevices.large} {
            font-size: 18px;
          }
        `};
`;

export const CtaButton = ({ contentType, iconSide = 'left', children, className }) => {
  const getIconSource = () => {
    switch (contentType) {
      case contentTypes.VIDEO:
        return '/images/play-icon.svg';
      default:
        return '/images/right-arrow.svg';
    }
  };

  return (
    <StyledCta className={className}>
      {iconSide === 'left' ? <CtaIcon src={getIconSource()} alt="" /> : null}
      <ChildrenContainer>{children}</ChildrenContainer>
      {iconSide === 'right' ? <CtaIcon src={getIconSource()} alt="" right={true} /> : null}
    </StyledCta>
  );
};
