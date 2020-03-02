import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
// import navPresenter from 'xi-core/navigation/NavigationPresenter';
import ExpandClickableArea from '../common/ExpandClickableArea';
import { CoreDevices } from '../common/dimensions';
import BackArrow from './icons/BackArrow';

const StyledBackArrow = styled(BackArrow)`
  width: 15px;
  height: 15px;
  vertical-align: middle;
  @media ${CoreDevices.medium} {
    width: 24px;
    height: 24px;
  }
  @media ${CoreDevices.large} {
    width: 32px;
    height: 32px;
  }
`;

const StyledAnchor = styled.a`
  color: inherit;
`;

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
const BackButton = ({ history, className = null, onClick = null }) => {
  this.logicalBack = () => {
    // Navigation back is temporarily disabled while some issues with it are fixed
    // see branch fix/navigation-player-profile-back
    // const where = navPresenter.moveBack();
    // const historyBack = where === 'GO_BACK';
    // if (historyBack) {
    history.goBack();
    // } else {
    //   history.push(where);
    // }
  };

  return (
    <ExpandClickableArea>
      <StyledAnchor
        href="javascript:;"
        onClick={onClick ? onClick : this.logicalBack}
        className={className}
        data-test-id="back-button"
      >
        <StyledBackArrow />
      </StyledAnchor>
    </ExpandClickableArea>
  );
};
/* eslint-enable jsx-a11y/anchor-is-valid */
/* eslint-enable no-script-url */

export default withRouter(BackButton);
