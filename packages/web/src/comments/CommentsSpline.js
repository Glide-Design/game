import * as React from 'react';
import { Chart, BarSeries } from '@devexpress/dx-react-chart-bootstrap4';
import { Animation } from '@devexpress/dx-react-chart';
import { keys, map, flow, uniqBy, orderBy } from 'lodash/fp';
import { connect } from 'react-redux';
import { getCommentsByContentId } from 'xi-core/comments/selectors';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';

const CommentsSpline = ({ comments, height, videoLength }) => {
  const granularity = Math.floor(videoLength / 1000);
  const sampling = [...Array(granularity).keys()];
  const _commments = flow(
    keys,
    map(time => {
      return {
        time: Math.floor(Number(time) / 1000),
        comments: comments[time].length + 1.5 / comments[time].length,
      };
    }),
    c => [...c, ...sampling.map(v => ({ time: v, comments: 0 }))],
    uniqBy('time'),
    orderBy('time', 'asc')
  )(comments);
  console.log(_commments);
  return (
    <Chart data={_commments} height={height} style={{ padding: 0 }}>
      <BarSeries width={10} valueField="comments" argumentField="time" />
      <Animation />
    </Chart>
  );
};

const mapStateToProps = state => {
  return {
    comments: getCommentsByContentId(state)('test-content-id'),
  };
};

export default connect(mapStateToProps)(CommentsSpline);
