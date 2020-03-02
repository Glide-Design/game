import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { userProfileCtaAction } from 'xi-core/member/actions';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import { Button1 } from '../common/buttons';
import TitledArea from '../common/TitledArea';
import sectionButtonSpacingCss from './sectionButtonSpacingCss';
import enforceButtonWidthCSS from './enforceButtonWidthCSS';

const StyledButton1 = styled(Button1)`
  ${sectionButtonSpacingCss};
  ${enforceButtonWidthCSS};

  width: 100%;
  background: #7c52f6;
  box-shadow: 4px 4px 0px #360fa6;
  color: white;
  border: none;
`;

const MyLockerPromo = ({ history, ctaClicked }) => (
  <TitledArea
    name={<FormattedMessage id="myLocker.myLocker" defaultMessage="My locker" />}
    fgColour="#000"
    svgBackground="#B6FCCB"
    bgColour="#B6FCCB"
    description={
      <FormattedMessage id="myLocker.content" defaultMessage="Watch all your bookmarked content" />
    }
  >
    <StyledButton1
      onClick={() => {
        history.push('/locker');
        ctaClicked();
      }}
      defaultMargins
      data-test-id="enter-locker"
    >
      <FormattedMessage id="myLocker.button" defaultMessage="Enter locker" />
    </StyledButton1>
  </TitledArea>
);

export default compose(
  withRouter,
  connect(
    null,
    dispatch => ({
      ctaClicked: () =>
        dispatch(userProfileCtaAction(PropertyKeys.USER_PROFILE_ACTION.ENTER_LOCKER)),
    })
  )
)(MyLockerPromo);
