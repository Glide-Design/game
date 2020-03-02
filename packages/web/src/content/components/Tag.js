import React from 'react';
import styled, { css } from 'styled-components';
import { getTagText } from 'xi-core/content/selectors';
import { Grey85, PrimaryGreen, YellowGreen } from 'xi-core/colours';
import { tagTypes } from 'xi-core/content/tagTypes';
import { FontFamily } from '../../common/typography';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: rgba(255, 255, 255, 0.5);
  padding: 2px 12px 2px 12px;
  display: inline-block;

  ${({ whiteBackground }) => whiteBackground && WhiteBackgroundTag}
  ${({ tagType }) => {
    switch (tagType) {
      case tagTypes.NEW:
        return NewContainer;
      case tagTypes.COMING_SOON:
        return ComingSoonContainer;
      default:
        return null;
    }
  }}
`;

const TagText = styled.div`
  ${FontFamily.regular};
  color: ${Grey85};
  font-size: 10px;
  text-align: left;
  text-transform: uppercase;

  ${({ tagType }) => tagType === tagTypes.COMING_SOON && ComingSoonText}
`;

const WhiteBackgroundTag = css`
  background: rgba(227, 227, 227, 0.5);
`;

const ComingSoonContainer = css`
  background: ${Grey85};
`;

const NewContainer = css`
  background-image: linear-gradient(to left, ${YellowGreen}, ${PrimaryGreen});
`;
const ComingSoonText = css`
  color: #ffffff;
`;

const Tag = ({ tagType, className, whiteBackground }) => {
  if (!tagType) {
    return null;
  }

  return (
    <Container tagType={tagType} whiteBackground={whiteBackground} className={className}>
      <TagText tagType={tagType}>{getTagText(tagType)}</TagText>
    </Container>
  );
};

export default Tag;
