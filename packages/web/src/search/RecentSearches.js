import React from 'react';
import { map } from 'lodash/fp';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { clearRecent, removeRecent } from 'xi-core/search/actions';
import { getRecentSearches } from 'xi-core/search/selectors';
import { getTypeDisplay } from 'xi-core/content/selectors';
import getSourcesByRatio from '../common/getSourcesByRatio';
import { Body1, Body10 } from '../common/typography';
import { CoreDevices, LIST_ITEM_ASPECT_RATIO, ContainerPaddingCss } from '../common/dimensions';
import TruncateMultiline from '../common/TruncateMultiline';
import ExpandClickableArea from '../common/ExpandClickableArea';
import { UnstyledButtonLink } from '../common/buttons';
import Cross from '../common/icons/Cross';
import Thumbnail from '../content/thumbnails';
import CardSection from '../content/components/CardSection';

const RecentSearchContainer = styled.div`
  ${Body1};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${Body10};
  }
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ClearRecentWrapper = styled.div`
  ${ContainerPaddingCss};
  margin-bottom: 40px;
`;
const ClearRecentSearches = styled(UnstyledButtonLink)`
  ${Body1};
  @media ${CoreDevices.medium} {
    ${Body10};
  }
  @media ${CoreDevices.large} {
    ${Body10};
  }
`;

const StyledLink = styled(Link)`
  display: block;
  color: inherit;
`;

const StyledThumbnail = styled(Thumbnail)`
  width: 44px;
  height: 56px;
  border-width: 2px;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    width: 54px;
    height: 72px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 14px;

  @media ${CoreDevices.medium}, @media ${CoreDevices.large} {
    margin: 0 16px;
  }
`;

const Title = styled.div`
  ${Body1};
  ${TruncateMultiline({ linesToShow: 1, lineHeight: 1.43, fontSize: '14px' })};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${Body10};
    ${TruncateMultiline({ linesToShow: 1, lineHeight: 1.4, fontSize: '20px' })};
  }
`;

const Type = styled.span`
  color: #adadad;
`;

const StyledCross = styled(Cross)`
  height: 13px;
  width: 13px;
`;

const getType = (contentTypeName, starType) => {
  if (contentTypeName) {
    return getTypeDisplay(contentTypeName);
  } else if (starType) {
    return <FormattedMessage id="recentSearches.player" defaultMessage="Players" />;
  }
  return null;
};

const RecentSearch = ({
  result: { title, displayName, contentTypeName, starType, creatives },
  href,
  removeRecent,
}) => (
  <StyledLink to={href}>
    <RecentSearchContainer data-test-id={`recent-${title}`}>
      <span>
        <StyledThumbnail
          backgroundImgSources={getSourcesByRatio(creatives, LIST_ITEM_ASPECT_RATIO)}
        />
      </span>
      <Details>
        <Title>{title || displayName}</Title>
        <Type>{getType(contentTypeName, starType)}</Type>
      </Details>
      <ExpandClickableArea>
        <UnstyledButtonLink
          data-test-id="remove-recent-search"
          onClick={e => {
            removeRecent();
            e.preventDefault();
          }}
        >
          <StyledCross />
        </UnstyledButtonLink>
      </ExpandClickableArea>
    </RecentSearchContainer>
  </StyledLink>
);

const RecentSearches = ({ recentSearches, clearRecentSearches, removeRecent }) => {
  const items = map(
    result => (
      <RecentSearch
        result={result}
        href={result.starId ? `/star/${result.starId}` : `/content/${result.externalId}`}
        removeRecent={() => removeRecent(result)}
      />
    ),
    recentSearches
  );

  return (
    <React.Fragment>
      <CardSection
        title={<FormattedMessage id="search.recent_searches" defaultMessage="Recent Searches" />}
        items={items}
      />
      <ClearRecentWrapper>
        <ClearRecentSearches onClick={clearRecentSearches} data-test-id="clear-recent">
          <FormattedMessage
            id="search.clear_recent_searches"
            defaultMessage="Clear Recent Searches"
          />
        </ClearRecentSearches>
      </ClearRecentWrapper>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  recentSearches: getRecentSearches(state),
});

const mapDispatchToProps = dispatch => ({
  clearRecentSearches: () => dispatch(clearRecent()),
  removeRecent: result => dispatch(removeRecent(result)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentSearches);
