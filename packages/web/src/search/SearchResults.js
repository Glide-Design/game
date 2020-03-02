import { map, isEmpty, every, compose } from 'lodash/fp';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { renderComponent, branch } from 'recompose';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import {
  getSocialSearchResults,
  getStarsSearchResults,
  getVideoSearchResults,
  getArticleSearchResults,
  getCompetitionSearchResults,
  getQAndASearchResults,
} from 'xi-core/search/selectors';
import { resultClicked } from 'xi-core/search/actions';
import { Grey5 } from 'xi-core/colours';
import ContentCard from '../content/components/Card';
import Section from '../content/components/CardSection';
import SimpleDivider from '../common/SimpleDivider';
import PlayerResults from './PlayerResults';
import PlayerResult from './PlayerResult';
import EmptyResults from './EmptyResults';

const divider = <SimpleDivider hairline={false} color={Grey5} withoutMargin />;

const SearchResults = ({ videos, social, stars, articles, competitions, qAndA, resultClicked }) => {
  const contentResults = map(item => (
    <ContentCard
      key={item.externalId}
      item={item}
      starId={item.publisherId}
      onClick={() => resultClicked(item)}
    />
  ));
  const VideoResults = contentResults(videos);
  const SocialResults = contentResults(social);
  const ArticleResults = contentResults(articles);
  const CompetitionResults = contentResults(competitions);
  const QAndAResults = contentResults(qAndA);
  const StarResults = map(
    star => <PlayerResult key={star.starId} star={star} onClick={() => resultClicked(star)} />,
    stars
  );

  return (
    <React.Fragment>
      <PlayerResults
        title={<FormattedMessage id="search.players" defaultMessage="Players" />}
        items={StarResults}
      />
      {StarResults.length ? divider : null}
      <Section
        title={<FormattedMessage id="search.videos" defaultMessage="Videos" />}
        items={VideoResults}
      />
      {VideoResults.length ? divider : null}
      <Section
        title={<FormattedMessage id="search.social_posts" defaultMessage="Social Posts" />}
        items={SocialResults}
      />
      {SocialResults.length ? divider : null}
      <Section
        title={<FormattedMessage id="search.articles" defaultMessage="Articles" />}
        items={ArticleResults}
      />
      {ArticleResults.length ? divider : null}
      <Section
        title={<FormattedMessage id="search.competitions" defaultMessage="Competitions" />}
        items={CompetitionResults}
      />
      {CompetitionResults.length ? divider : null}
      <Section
        title={<FormattedMessage id="search.qAndA" defaultMessage="Q&A" />}
        items={QAndAResults}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  videos: getVideoSearchResults(state),
  social: getSocialSearchResults(state),
  stars: getStarsSearchResults(state),
  articles: getArticleSearchResults(state),
  competitions: getCompetitionSearchResults(state),
  qAndA: getQAndASearchResults(state),
});

const mapDispatchToProps = dispatch => ({
  resultClicked: result => {
    dispatch(resultClicked(result));
    dispatch(reset('search'));
  },
});

const noResultsFound = ({ videos, social, stars, articles, competitions, qAndA }) =>
  every(isEmpty, [videos, social, stars, articles, competitions, qAndA]);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  branch(noResultsFound, renderComponent(EmptyResults))
)(SearchResults);
