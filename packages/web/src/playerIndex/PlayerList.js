import React from 'react';
import styled from 'styled-components';
import { compose, map } from 'lodash/fp';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import withRequest from 'xi-core/withRequest';
import { fetchMemberFollowing, fetchStars } from 'xi-core/stars/actions';
import { getFollowableStars } from 'xi-core/stars/selectors';
import { getMemberId } from 'xi-core/member/selectors';
import getPlayerListOrder from 'xi-core/stars/playerListOrder';
import { NewOrange } from 'xi-core/colours';
import { CoreDevices, SIDE_MARGIN_PX } from '../common/dimensions';
import TitledArea from '../common/TitledArea';
import ListItem from './ListItem';

const ListWrapper = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin-top: 32px;

  margin-bottom: 30px;

  padding: 0 ${SIDE_MARGIN_PX.small - 5.5}px;

  @media ${CoreDevices.medium} {
    padding: 0 ${SIDE_MARGIN_PX.medium - 6.5}px;
  }

  @media ${CoreDevices.large} {
    padding: 0 ${SIDE_MARGIN_PX.large - 16}px;
  }
`;

class PlayerList extends React.Component {
  state = {
    starIdList: [],
  };

  componentDidMount() {
    this.setState({ starIdList: getPlayerListOrder(this.props.stars) });
  }

  componentDidUpdate(props, state) {
    if (props.stars.length !== this.props.stars.length) {
      this.setState({ starIdList: getPlayerListOrder(this.props.stars) });
    }
    if (this.props.isAuthenticated !== props.isAuthenticated) {
      this.props.dispatch(fetchMemberFollowing());
    }
  }

  getStarFrom = (stars, starId) => {
    return stars.find(star => star.starId === starId);
  };

  render() {
    const { starIdList } = this.state;
    return (
      <TitledArea
        bgColour={NewOrange}
        name={<FormattedMessage id="playerList.playerIndex" defaultMessage="Our Team" />}
        description={
          <FormattedMessage
            id="playerList.playerDescription"
            defaultMessage="Tell us who your favourite players are to hear more from them."
          />
        }
      >
        {starIdList.length > 0 ? (
          <ListWrapper>
            {map(
              starId => (
                <ListItem
                  key={starId}
                  star={this.getStarFrom(this.props.stars, starId)}
                  position={starIdList.indexOf(starId) + 1}
                />
              ),
              starIdList
            )}
          </ListWrapper>
        ) : null}
      </TitledArea>
    );
  }
}

const mapStateToProps = state => ({
  memberId: getMemberId(state),
  isAuthenticated: state.user.isAuthenticated,
});

export default compose(
  connect(mapStateToProps),
  withRequest({
    requestIdEmpty: true,
    requestAction: fetchStars,
    responseSelector: state => () => getFollowableStars(state),
    responseAlias: 'stars',
  }),
  withRequest({
    requestIdAlias: 'memberId',
    requestAction: fetchMemberFollowing,
  })
)(PlayerList);
