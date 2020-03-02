import React, { Fragment } from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { H6, H1, H14 } from '../common/typography';
import { CoreDevices, ContainerPaddingCss } from '../common/dimensions';
import SimpleDivider from '../common/SimpleDivider';

const TitleRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  margin-bottom: 15px;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    margin-bottom: 25px;
  }
`;

const Title = styled.h1`
  ${H1};
  font-size: 56px;
  box-sizing: border-box;

  @media ${CoreDevices.medium} {
    ${H14};
  }
  @media ${CoreDevices.large} {
    ${H14};
  }
  ${ContainerPaddingCss};
`;

// const AboutMe = styled(Link)`
//   position: relative;
//   top: -4px;
//   ${H6};
//   white-space: nowrap;
//   color: inherit;
//   line-height: 20px;

//   @media ${CoreDevices.small} {
//     margin-right: ${SIDE_MARGIN_PX.small}px;
//   }
//   @media ${CoreDevices.medium} {
//     margin-right: ${SIDE_MARGIN_PX.medium}px;
//     font-size: 20px;
//   }
//   @media ${CoreDevices.large} {
//     margin-right: ${SIDE_MARGIN_PX.large}px;
//     font-size: 20px;
//     line-height: 30px;
//   }

//   img {
//     margin-left: 8px;
//     width: 20px;
//     vertical-align: middle;
//     @media ${CoreDevices.medium} {
//       width: 24px;
//     }
//     @media ${CoreDevices.large} {
//       width: 30px;
//     }
//   }
// `;

// const StyledExpandClickableArea = styled(ExpandClickableArea)`
//   margin-left: auto;
// `;

// const FollowingImage = styled.img`
//   width: 22px;

//   @media ${CoreDevices.medium}, ${CoreDevices.large} {
//     width: 48px;
//   }
// `;

const TabContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  @media ${CoreDevices.medium} {
  }
  @media ${CoreDevices.large} {
    max-width: 616px;
  }
  ${ContainerPaddingCss};
`;

const Tab = styled(Link).attrs({
  exact: 'true',
  replace: true,
})`
  ${H6};
  flex: 1;
  border-bottom: 6px solid transparent;
  padding: 21px 0;
  margin-bottom: 0px;
  text-align: center;
  color: white;
  opacity: 0.5;
  font-size: 20px;

  @media ${CoreDevices.small} {
    padding: 12px 0;
  }

  &.active {
    border-color: white;
    opacity: 1;
  }
`;

const StyledSimpleDivider = styled(SimpleDivider)`
  position: relative;
  top: -1px;
  z-index: 1;
`;

const Headline = ({ starId, forename, surname, location } = {}) => {
  const nameArray = [forename, surname].filter(v => v);

  return starId ? (
    <Fragment key={starId}>
      {/*
        <ExpandClickableArea>
          <IconButton type="button" onClick={() => alert('Soon')}>
            <FollowingImage src="/images/tick-icon.svg" alt="" />
          </IconButton>
        </ExpandClickableArea>
      */}
      <TitleRow>
        <Title>
          {nameArray.map((word, i) => (
            <span key={i}>
              {word}
              {i < nameArray.length - 1 ? <br /> : null}
            </span>
          ))}
        </Title>
        {/*<StyledExpandClickableArea>
            <AboutMe to={'/star/' + starId}>
              ABOUT ME <img src="/images/next-arrow.svg" alt="" />
            </AboutMe>
          </StyledExpandClickableArea>*/}
      </TitleRow>
      <TabContainer>
        <Tab
          to={`/star/${starId}`}
          className={!location.hash ? 'active' : ''}
          data-test-id="player-tab-feed"
        >
          <FormattedMessage id="player_profile.tab_feed" defaultMessage="What's new" />
        </Tab>
        <Tab
          to={`/star/${starId}#about`}
          className={location.hash === '#about' ? 'active' : ''}
          data-test-id="player-tab-about"
        >
          <FormattedMessage id="player_profile.tab_about" defaultMessage="About me" />
        </Tab>
      </TabContainer>
      <StyledSimpleDivider />
    </Fragment>
  ) : null;
};

export default withRouter(Headline);
