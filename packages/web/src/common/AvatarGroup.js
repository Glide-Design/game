import React from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';
import { CoreDevices } from './dimensions';

const OutterContainer = styled.div`
  display: inline-block;
`;

const Container = styled.div`
  display: inline-block;
  margin-top: -6px;
  z-index: 1;
  position: relative;

  a {
    ${({ length: hasText }) => (hasText > 1 ? 'display: inline-block;' : '')}
    position: relative;
    margin-top: 6px;
    transition: margin 400ms;
    margin-right: -17px;
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
      margin-right: -24px;
    }
  }

  &.expanded a {
    margin-right: 26px;
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
      margin-right: 40px;
    }
  }

  img {
    border-color: rgba(0, 0, 0, 0.3);
    border-width: 0 1px 0 0;
    border-style: solid;
    ${({ expanded, length }) => (expanded || length === 1 ? 'border:none;' : '')} );
    transition: border 200ms;
  }
`;

export default class AvatarGroup extends React.Component {
  state = {
    expanded: false,
  };

  groupToggle = (e, playerName) => {
    const { starIds, starIdsLength = starIds.length, onClick } = this.props;
    const { expanded } = this.state;
    if (!expanded) {
      e.preventDefault();
      this.setState({ expanded: true }, () =>
        setTimeout(
          () => this.setState({ expanded: false }),
          starIdsLength <= 3 ? 1500 : starIdsLength <= 5 ? 2000 : 3000
        )
      );
    } else {
      onClick && onClick(playerName);
    }
  };

  render() {
    const {
      starIds = [],
      starIdsLength = starIds.length,
      className,
      showName,
      onClick,
    } = this.props;

    const nameAvailable = showName && starIdsLength === 1;

    const avatars = starIds.map((id, idx) => (
      <Avatar
        key={`${id} ${idx}`}
        starId={id}
        onClick={(e, playerName) =>
          starIds.length > 1 ? this.groupToggle(e, playerName) : onClick && onClick(playerName)
        }
        textPosition={nameAvailable ? 'right' : null}
        labelHidden={nameAvailable ? false : true}
        zIndex={starIdsLength - idx + 1}
        avatarGroup={true}
      />
    ));

    const { expanded } = this.state;
    return (
      <OutterContainer className={className}>
        <Container className={expanded ? 'expanded' : null} length={starIds.length}>
          {avatars}
        </Container>
      </OutterContainer>
    );
  }
}
