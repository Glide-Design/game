import React from 'react';
import { get } from 'lodash/fp';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { getEpisodeNumber, getTagType, isContentComingSoon } from 'xi-core/content/selectors';
import durationFromSeconds from 'xi-core/content/durationFromSeconds';
import { getCtaText } from 'xi-core/content/selectors';
import { CoreDevices } from '../../common/dimensions';
import { Body1, Body10, H4, H3 } from '../../common/typography';
import LanguageLineHeights from '../../common/LanguageLineHeights';
import Avatar from '../../common/Avatar';
import TruncateMultiline from '../../common/TruncateMultiline';
import CardThumbnail from './CardThumbnail';
import Tag from './Tag';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media ${CoreDevices.large} {
    height: 176px;
  }
`;

const CoveringLink = styled(Link)`
  height: 100%;
  position: absolute;
  width: 100%;
  color: inherit;
  top: 0;
  ${({ disabled }) => disabled && DisabledLink}
`;

const DisabledLink = css`
  cursor: default;
`;

const Details = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  position: relative;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    padding-left: 20px;
  }
`;

const LINE_HEIGHTS = {
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
    large: 0.94,
  },
};

const Title = styled.h3`
  ${H4};
  ${({ lineHeight = LINE_HEIGHTS.default }) =>
    TruncateMultiline({ linesToShow: 1, lineHeight: lineHeight.small, fontSize: '20px' })};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H3};
    ${({ lineHeight = LINE_HEIGHTS.default }) =>
      TruncateMultiline({ linesToShow: 1, lineHeight: lineHeight.large, fontSize: '32px' })};
  }
`;

const Description = styled.div`
  ${Body1};
  @media ${CoreDevices.tiny} {
    ${TruncateMultiline({ linesToShow: 2, lineHeight: 1.43, fontSize: '14px' })};
  }

  @media ${CoreDevices.small} {
    ${TruncateMultiline({ linesToShow: 3, lineHeight: 1.43, fontSize: '14px' })};
  }

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${Body10};
    ${TruncateMultiline({ linesToShow: 3, lineHeight: 1.4, fontSize: '20px' })};
  }

  margin-top: 6px;
`;

const StyledAvatar = styled(Avatar)`
  margin-bottom: 9px;
  img {
    width: 30px;
    height: 30px;
  }

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    margin-bottom: 18px;
    img {
      width: 40px;
      height: 40px;
    }
  }
`;

const Duration = styled.div`
  background: rgba(0, 0, 0, 0.5);
  height: 11px;
  text-align: center;
  line-height: 11px;
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 0 4px;
  font-size: 6px;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    font-size: 8px;
  }
`;

const StyledTag = styled(Tag)`
  align-self: flex-start;
  margin: 0 auto 14px 0;
`;

const Card = ({
  episodeNumber,
  item: {
    creatives,
    externalId,
    title,
    description,
    duration,
    contributors = [],
    contentTypeName,
  } = {},
  onClick,
  editMode,
  isSelected,
  onSelectClick,
  getCtaText,
  tagType,
  comingSoonContent,
}) => {
  const durationText = durationFromSeconds(duration);
  const href = '/content/' + externalId;

  return (
    <Wrapper>
      <CardThumbnail
        creatives={creatives}
        externalId={externalId}
        duration={duration}
        contentTypeName={contentTypeName}
        editMode={editMode}
        isSelected={isSelected}
        onSelectClick={onSelectClick}
        title={getCtaText()}
        comingSoonContent={comingSoonContent}
        onClick={onClick}
      />
      <Details>
        <CoveringLink
          to={href}
          data-test-id="content-details"
          onClick={e => {
            if (comingSoonContent) {
              e.preventDefault();
            } else {
              onClick();
            }
          }}
          disabled={comingSoonContent}
        >
          {false && durationText && <Duration>{durationText}</Duration>}
        </CoveringLink>

        {contributors.length && get('avatarUrl', contributors[0]) ? (
          <StyledAvatar starId={contributors[0]} labelHidden={false} textPosition={'right'} />
        ) : null}
        <StyledTag whiteBackground tagType={tagType} />
        <LanguageLineHeights lineHeights={LINE_HEIGHTS}>
          {({ lineHeight }) => (
            <Title lineHeight={lineHeight}>
              {episodeNumber != null ? (
                <FormattedMessage
                  id="content_list_item.title_with_episode"
                  defaultMessage="{episodeNumber}. {titleBrief}"
                  values={{ episodeNumber, title }}
                />
              ) : (
                title
              )}
            </Title>
          )}
        </LanguageLineHeights>
        <Description>{description}</Description>
      </Details>
    </Wrapper>
  );
};

const mapStateToProps = (state, { item: { contentTypeName, externalId } = {} }) => ({
  episodeNumber: getEpisodeNumber(state)(externalId),
  getCtaText: () => getCtaText(state)(contentTypeName, true, externalId),
  tagType: getTagType(state)(contentTypeName, externalId),
  comingSoonContent: isContentComingSoon(state)(externalId),
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Card);
