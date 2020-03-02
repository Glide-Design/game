import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import ExpandClickableArea from '../common/ExpandClickableArea';
import FixedToolbarOnScroll from '../common/FixedToolbarOnScroll';
import SettingsIcon from '../common/icons/Settings';

const SettingsIconClickableArea = styled(ExpandClickableArea)`
  margin-left: auto;
  color: #000;
  svg {
    fill: currentColor;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: inherit;
  &.active {
    color: #7c52f6;
  }
`;

const ProfileTopIcons = ({ className, location, fullName, fixedTopBackground, theme }) => (
  <FixedToolbarOnScroll
    className={className}
    title={fullName}
    fixedTopBackground={fixedTopBackground}
    foreColor={'#000'}
    backgroundColor={'#FFF'}
  >
    <SettingsIconClickableArea>
      <StyledNavLink
        to="/settings"
        activeClassName="active"
        onClick={e => {
          if (location.pathname.startsWith('/settings')) {
            e.preventDefault();
          }
        }}
      >
        <SettingsIcon />
      </StyledNavLink>
    </SettingsIconClickableArea>
  </FixedToolbarOnScroll>
);

export default withRouter(ProfileTopIcons);
