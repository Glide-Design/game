import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { CoreDevices, HelperDevices } from '../common/dimensions';
import ExpandableContainer from './ExpandableContainer';

const ExpandableLineHeight = {
  belowMedium: 14 * 1.43,
  other: 20 * 1.4,
};

const DefaultControlElementCss = `
  cursor: pointer;
  font-weight: bold;
  margin: 0 12px;
`;

const DefaultMoreElement = styled.span`
  ${DefaultControlElementCss};
`;

const DefaultLessElement = styled.span`
  ${DefaultControlElementCss};
`;

const StyledExpandableContainer = styled(ExpandableContainer)`
  position: relative;

  .more,
  .less {
    display: none;
  }
  span.more {
    position: absolute;
    right: 0;
    bottom: 0;

    ${({ linesToShow }) =>
      linesToShow > 1 &&
      `
      &:before {
        content: '...';
        display: inline-block;
        font-weight: normal;
        margin-right: 4px;
    }`};
  }

  &.collapsed {
    padding-right: 36px;
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
      padding-right: 45px;
    }
    div.textContainer {
      padding-right: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      ${({ linesToShow }) => linesToShow === 1 && 'white-space: nowrap;'};
    }
    .more {
      display: inline;
    }
  }

  &.expanded {
    .less {
      display: inline;
    }
  }
`;

export default ({
  text,
  lessElement,
  moreElement,
  className,
  linesToShow = 1,
  lineHeight,
  ...props
}) => {
  const collapsedHeight =
    (window.matchMedia(HelperDevices.belowMedium).matches
      ? ExpandableLineHeight.belowMedium
      : lineHeight || ExpandableLineHeight.other) * linesToShow;

  if (!text) {
    return null;
  }

  return (
    <StyledExpandableContainer
      collapsedHeight={collapsedHeight}
      linesToShow={linesToShow}
      className={className}
      {...props}
    >
      <div className="textContainer">
        {text}{' '}
        {lessElement || (
          <DefaultLessElement className="less">
            <FormattedMessage id="expandableText.less" defaultMessage="Less" />
          </DefaultLessElement>
        )}
      </div>
      {moreElement || (
        <DefaultMoreElement className="more">
          <FormattedMessage id="expandableText.more" defaultMessage="More" />
        </DefaultMoreElement>
      )}
    </StyledExpandableContainer>
  );
};
