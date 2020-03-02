import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { isAuthenticated } from 'xi-core/member/selectors';
import { getAvatar } from 'xi-core/member/selectors';
import { userProfileCtaAction } from 'xi-core/member/actions';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import navPresenter from 'xi-core/navigation/NavigationPresenter';
import { transformAvatarUrl } from 'xi-core/utils/cloudinary';
import {
  CoreDevices,
  HelperDevices,
  NAVBAR_HEIGHT_PX,
  ContainerPaddingCss,
} from '../common/dimensions';
import ExpandClickableArea from '../common/ExpandClickableArea';
import PlayersIcon from '../common/icons/Players';
import HomeIcon from '../common/icons/Home';
import SearchIcon from '../common/icons/Search';
import ProfileIcon from '../common/icons/Profile';
import { getTargetDevice } from '../state/app/selectors';
import SettingsIcon from '../common/icons/Settings';
import SearchForm from '../search/SearchForm';
import { routes } from '../App';

const Container = styled.div`
  @media ${CoreDevices.tiny} {
    ${({ isNotchedDevice }) =>
      isNotchedDevice
        ? `height: ${NAVBAR_HEIGHT_PX.tiny + 15}px;`
        : `height: ${NAVBAR_HEIGHT_PX.tiny}px;`};
  }
  @media ${CoreDevices.small} {
    ${({ isNotchedDevice }) =>
      isNotchedDevice
        ? `height: ${NAVBAR_HEIGHT_PX.small + 15}px;`
        : `height: ${NAVBAR_HEIGHT_PX.small}px;`};
  }
  @media ${CoreDevices.medium} {
    ${({ isNotchedDevice }) =>
      isNotchedDevice
        ? `height: ${NAVBAR_HEIGHT_PX.medium + 15}px;`
        : `height: ${NAVBAR_HEIGHT_PX.medium}px;`};
  }
  @media ${CoreDevices.large} {
    height: ${NAVBAR_HEIGHT_PX.large}px;
  }
  background: rgba(255, 255, 255, 1);
`;

const SmallDeviceWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 16px;
  height: 100%;
  max-width: 500px;
  margin: auto;
  @media ${CoreDevices.large} {
    display: none;
  }
`;

const ItemLink = styled(({ isActive, ...rest }) => <Link {...rest} />)`
  text-transform: uppercase;
  font-size: 10px;

  color: white;
  &[aria-current] {
    color: #7c52f6;
  }
  ${({ isActive }) => (isActive ? 'color: #7C52F6;' : 'color: black;')};

  & > * {
    vertical-align: middle;
  }
`;

const LargeDeviceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  ${ContainerPaddingCss};
  @media ${CoreDevices.medium}, ${HelperDevices.belowMedium} {
    display: none;
  }
`;

const StyledLogo = styled.img`
  height: 40px;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 328px;
`;

const StyledSearchForm = styled(SearchForm)`
  height: 40px;
  border: none;
  box-shadow: inset 0px -2px 0px #a3a3a3;
  color: black;
  font-size: 14px;
  padding-left: 54px;
  margin: 0;
  width: 100%;
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  left: 20px;
  top: 10px;
  width: 20px;
  height: 20px;
  color: black;
`;

const BackgroundAvatar = styled.div`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  background: #b2b2b2;
  background-size: cover;
  background-position: center;
`;

const RHSIcons = styled.div`
  width: 120px;
  display: flex;
  justify-content: space-between;
`;

const isActive = section => {
  if (!Array.isArray(section)) {
    section = [section];
  }
  let result = false;
  section.forEach(sectionItem => {
    if (navPresenter.getCurrentRoot() === sectionItem) {
      result = true;
    }
  });
  return result;
};

const NavigationItem = ({ path, isActive, icon, linkLabel, onClick }) => {
  const ariaCurrent = isActive ? { 'aria-current': 'location' } : null;
  return (
    <ExpandClickableArea size={15}>
      <ItemLink
        to={path}
        aria-label={linkLabel}
        data-test-id={`nav-${linkLabel}`}
        {...ariaCurrent}
        onClick={onClick}
      >
        {icon}
      </ItemLink>
    </ExpandClickableArea>
  );
};

class NavBar extends React.Component {
  handleProfileClick = e => {
    const { isAuthenticated, history, accessedProfileViaNavbar, targetDevice } = this.props;
    if (!isAuthenticated) {
      e.preventDefault();
      if (targetDevice === 'large') {
        history.push(routes.join.path);
      } else {
        history.push(routes.settings.path);
      }
    } else {
      navPresenter.setCurrentRoot('profile');
      accessedProfileViaNavbar();
    }
  };

  handleSearchFocus = e => {
    const { history, location } = this.props;
    if (!matchPath(location.pathname, routes.search.path)) {
      history.push(routes.search.path);
    }
  };
  render() {
    const { className, location, isAuthenticated, avatar, isNotchedDevice } = this.props;

    return (
      <Container className={className} isNotchedDevice={isNotchedDevice}>
        <LargeDeviceWrapper>
          <Link to="/" data-test-id="nav-discovery" aria-current={isActive(location, '/')}>
            <StyledLogo src="/images/logo/OTRO-logo-shadowed-black@2x.png" alt="Otro" />
          </Link>
          <SearchWrapper>
            <StyledSearchForm onFocus={this.handleSearchFocus}>
              <StyledSearchIcon />
            </StyledSearchForm>
          </SearchWrapper>
          <RHSIcons>
            <NavigationItem
              path="/stars"
              isActive={isActive('stars')}
              icon={<PlayersIcon />}
              linkLabel="players"
            />
            <NavigationItem
              path="/account"
              isActive={isActive(['myAccount', 'contactPreferences', 'language'])}
              icon={<SettingsIcon />}
              linkLabel="settings"
            />
            <NavigationItem
              path="/profile"
              isActive={isActive(['profile', 'editProfile'])}
              icon={
                isAuthenticated && avatar ? (
                  <BackgroundAvatar
                    style={{
                      backgroundImage: `url("${avatar}")`,
                    }}
                  />
                ) : (
                  <ProfileIcon />
                )
              }
              linkLabel="profile"
              onClick={this.handleProfileClick}
            />
            {/*<NavigationItem
            path="/notifications"
            isActive={isActive(location, '/notifications')}
            icon={<NotificationIcon />}
            linkLabel="notifications"
          />*/}
          </RHSIcons>
        </LargeDeviceWrapper>
        <SmallDeviceWrapper>
          <NavigationItem
            path="/"
            isActive={isActive('discovery')}
            icon={<HomeIcon />}
            linkLabel="discovery"
          />

          <NavigationItem
            path="/stars"
            isActive={isActive('stars')}
            icon={<PlayersIcon />}
            linkLabel="players"
          />

          <NavigationItem
            path="/search"
            isActive={isActive('search')}
            icon={<SearchIcon />}
            linkLabel="search"
          />

          <NavigationItem
            path="/profile"
            isActive={isActive(['profile', 'join'])}
            icon={<ProfileIcon />}
            linkLabel="profile"
            onClick={this.handleProfileClick}
          />
        </SmallDeviceWrapper>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  avatar: transformAvatarUrl(getAvatar(state)),
  isAuthenticated: isAuthenticated(state),
  targetDevice: getTargetDevice(state),
});

const mapDispatchToProps = dispatch => ({
  accessedProfileViaNavbar: () =>
    dispatch(userProfileCtaAction(PropertyKeys.USER_PROFILE_ACTION.MY_PROFILE)),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NavBar);
