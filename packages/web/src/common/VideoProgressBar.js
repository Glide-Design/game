import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import styled from 'styled-components';
import { PrimaryViola } from 'xi-core/colours';
import { getVideoProgressPercentage } from 'xi-core/video/selectors';

const Container = styled.div`
  height: 4px;
  width: 100%;
  background-color: rgba(216, 216, 216, 0.2);
`;

const Progress = styled.div`
  height: 100%;
  background: ${PrimaryViola};
`;

class VideoProgressBar extends React.Component {
  render() {
    const { videoProgress } = this.props;

    if (!videoProgress) {
      return null;
    }

    const progressBarWidth = `${videoProgress}%`;

    return (
      <Container>
        <Progress style={{ width: progressBarWidth }} />
      </Container>
    );
  }
}

const mapStateToProps = (state, { externalId }) => ({
  videoProgress: getVideoProgressPercentage(state)(externalId),
});

export default compose(connect(mapStateToProps))(VideoProgressBar);
