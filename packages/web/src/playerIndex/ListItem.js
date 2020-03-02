import React from 'react';
import { compose } from 'lodash/fp';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setFollowingStatus, playerIndexInteraction } from 'xi-core/stars/actions';
import { getOr } from 'lodash/fp';
import { isAuthenticated } from 'xi-core/member/selectors';
import { showAuthWizard } from 'xi-core/signup/actions';
import ExpandClickableArea from '../common/ExpandClickableArea';
import { H2, H3 } from '../common/typography';
import { UnstyledButtonLink } from '../common/buttons';
import Thumbnail from '../content/thumbnails';
import { getTargetDevice } from '../state/app/selectors';
import {
  CoreDevices,
  HelperDevices,
  SIDE_MARGIN_PX,
  LIST_ITEM_ASPECT_RATIO,
} from '../common/dimensions';
import getSourcesByRatio from '../common/getSourcesByRatio';

export const Player_item_aspect_ratios = {
  small: LIST_ITEM_ASPECT_RATIO,
  medium: 1.49,
  large: 1.79,
};

const StyledThumbnail = styled(Thumbnail)`
  height: calc(
    (((100vw - ${SIDE_MARGIN_PX.small * 2}px) / 2) / ${Player_item_aspect_ratios.small})
  );
  width: 50%;
  padding: 5.5px;

  @media ${CoreDevices.large} {
    height: calc(
      ((100vw - ${SIDE_MARGIN_PX.large * 2}px) / 3) / ${Player_item_aspect_ratios.large}
    );
    width: 33%;
    padding: 16px;
  }

  @media ${CoreDevices.medium} {
    height: calc(
      ((100vw - ${SIDE_MARGIN_PX.medium * 2}px) / 2) / ${Player_item_aspect_ratios.medium}
    );
    width: 50%;
    padding: 6.5px;
  }

  @media ${HelperDevices.belowMediumLandscape} {
    height: calc(
      ((100vw - ${SIDE_MARGIN_PX.small * 2}px) / 2) / ${Player_item_aspect_ratios.medium}
    );
  }

  overflow: hidden;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  color: inherit;
  width: 100%;
  position: relative;
  padding: 16px;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    padding: 32px;
  }
`;

const TitleContainer = styled.div`
  margin-top: auto;
  width: 100%;
`;

const Title = styled.div`
  ${H2};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H3};
  }
  word-break: break-word;
  word-spacing: 10000px;
  margin: 0;
`;

const IconContainer = styled.div`
    align-self: flex-end;
  }
`;

const ListItem = ({
  star: { starId, forename, surname, creatives, seoCode },
  setFollowingStatus,
  following,
  isAuthenticated,
  targetDevice,
  onClick,
  playerProfileLink,
  showAuthWizard,
}) => (
  <StyledThumbnail
    backgroundImgSources={getSourcesByRatio(creatives, Player_item_aspect_ratios[targetDevice])}
    hideLinearGradient
  >
    <StyledLink
      to={'/star/' + (seoCode || starId)}
      data-test-id={`player-index-list-item-${starId}`}
      onClick={() => {
        playerProfileLink();
        onClick && onClick();
      }}
    >
      <IconContainer>
        <ExpandClickableArea>
          <UnstyledButtonLink
            data-test-id={following ? 'unfollow-player' : 'follow-player'}
            type="button"
            onClick={e => {
              isAuthenticated ? setFollowingStatus(!following) : showAuthWizard();
              e.preventDefault();
            }}
          >
            {following ? (
              <img src="/images/tick-icon.svg" alt="" />
            ) : (
              <img src="/images/plus-icon.svg" alt="" />
            )}
          </UnstyledButtonLink>
        </ExpandClickableArea>
      </IconContainer>
      <TitleContainer>
        <Title>
          {forename} {surname}
        </Title>
      </TitleContainer>
    </StyledLink>
  </StyledThumbnail>
);

const mapStateToProps = (state, { star: { starId } }) => ({
  following: getOr(false, `stars.${starId}.following`, state),
  isAuthenticated: isAuthenticated(state),
  targetDevice: getTargetDevice(state),
});

const mapDispatchToProps = (dispatch, { star: { seoCode, starId }, position, history }) => ({
  setFollowingStatus: status => dispatch(setFollowingStatus(starId, status, 'Player Index')),
  playerProfileLink: () =>
    dispatch(playerIndexInteraction({ starId: seoCode || starId, position })),
  showAuthWizard: () => dispatch(showAuthWizard({ history })),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ListItem);
