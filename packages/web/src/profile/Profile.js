import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { withRouter } from 'react-router';
import withRequest from 'xi-core/withRequest';
import { fetchMemberProfile } from 'xi-core/member/actions';
import { lifecycle } from 'recompose';
import { getMemberId, getName, isAuthenticated } from 'xi-core/member/selectors';
import SectionDivider from '../common/SectionDivider';
import { getTargetDevice } from '../state/app/selectors';
import { routes } from '../App.js';
import ProfileSummary from './ProfileSummary';
import MyLockerPromo from './MyLockerPromo';
import InviteFriends from './InviteFriends';
import ProfileTopIcons from './ProfileTopIcons';

class Profile extends React.Component {
  componentDidMount() {
    const { history, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      history.replace(routes.discovery.path);
    }
  }

  render() {
    const { name, targetDevice } = this.props;

    return (
      <Fragment>
        {targetDevice !== 'large' && <ProfileTopIcons hideBackButton={false} fullName={name} />}
        <ProfileSummary />
        <MyLockerPromo />
        <SectionDivider />
        <InviteFriends />
        <SectionDivider />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  memberId: getMemberId(state),
  name: getName(state),
  targetDevice: getTargetDevice(state),
  isAuthenticated: isAuthenticated(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps),
  lifecycle({
    componentWillMount: () => (document.title = 'OTRO'),
  }),
  withRequest({
    requestIdAlias: 'memberId',
    requestAction: fetchMemberProfile,
  })
)(Profile);
