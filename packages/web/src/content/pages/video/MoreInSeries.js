import React from 'react';
import { compose } from 'lodash/fp';
import { FormattedMessage } from 'react-intl';
import { fetchSeriesSeasonEpisodes } from 'xi-core/content/actions';
import { getContentBySeasonId } from 'xi-core/content/selectors';
import withRequest from 'xi-core/withRequest';
import Card from '../../components/Card';
import CardSection from '../../components/CardSection';

const MoreInSeries = ({ episodesInCurrentSeason = [], className }) => {
  if (!episodesInCurrentSeason.length) {
    return null;
  }

  return (
    <CardSection
      className={className}
      title={<FormattedMessage id="moreInSeries.moreSeries" defaultMessage="More in this series" />}
      items={episodesInCurrentSeason.map((item, i) => (
        <Card key={i} item={item} />
      ))}
    />
  );
};

export default compose(
  withRequest({
    requestIdAlias: ['seriesId', 'seasonId'],
    requestAction: fetchSeriesSeasonEpisodes,
    responseSelector: (state, props) => (seriedId, seasonId) =>
      getContentBySeasonId(state)(seasonId, [props.contentId]),
    responseAlias: 'episodesInCurrentSeason',
  })
)(MoreInSeries);
