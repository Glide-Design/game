import * as React from 'react';
import { Chart, AreaSeries } from '@devexpress/dx-react-chart-bootstrap4';
import { Animation } from '@devexpress/dx-react-chart';
import { curveCatmullRom, area } from 'd3-shape';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';

const data = [
  { time: 0, comments: 0 },
  { time: 1, comments: 89 },
  { time: 2, comments: 107 },
  { time: 3, comments: 20 },
  { time: 4, comments: 5 },
  { time: 5, comments: 60 },
  { time: 6, comments: 10 },
  { time: 7, comments: 111 },
  { time: 8, comments: 12 },
  { time: 9, comments: 10 },
  { time: 10, comments: 120 },
  { time: 11, comments: 160 },
  { time: 12, comments: 0 },
];

const Area = props => (
  <AreaSeries.Path
    {...props}
    path={area()
      .x(({ arg }) => arg)
      .y1(({ val }) => val)
      .y0(({ startVal }) => startVal)
      .curve(curveCatmullRom)}
  />
);

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;
    return (
      <Chart data={chartData} height={this.props.height} style={{ padding: 0 }}>
        <AreaSeries valueField="comments" argumentField="time" seriesComponent={Area} />
        <Animation />
      </Chart>
    );
  }
}

export default Demo;
