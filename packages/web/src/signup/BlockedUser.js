import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { getExternalLink } from 'xi-core/config/selectors';
import { isBlockedUserOpen } from 'xi-core/signup/selectors';
import { hideBlockedUser } from 'xi-core/signup/actions';
import { logoutMember } from 'xi-core/member/actions';
import TitledArea, {
  TitleText,
  TitleContainer,
  ItemsContainer,
  ElementsContainer,
} from '../common/TitledArea';
import OverlayCloseButton from '../common/OverlayCloseButton';
import Overlay from '../common/overlay';
import { Button3 } from '../common/buttons';
import { CoreDevices } from '../common/dimensions';

const StyledTitledArea = styled(TitledArea)`
  pheight: 100%;

  & ${TitleText} {
    text-align: center;
    max-width: 100%;
    @media ${CoreDevices.tiny} {
      font-size: 24px;
      padding-top: 30px;
    }
    @media ${CoreDevices.small} {
      font-size: 24px;
      padding-top: 38px;
    }
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
      font-size: 48px;
      padding-top: 72px;
    }
  }

  & ${TitleContainer} {
    @media ${CoreDevices.tiny} {
      font-size: 24px;
      padding-top: 30px;
    }
    @media ${CoreDevices.small} {
      padding-top: 38px;
    }
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
      padding-top: 72px;
    }
  }

  & ${ItemsContainer} {
    flex: 1;
    justify-content: center;
  }

  & ${ElementsContainer} {
    overflow: auto;
  }
`;

const Description = styled.div`
  max-width: 555px;
  margin: auto;
  margin-top: 16px;
  text-align: center;
  font-size: 12px;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    font-size: 18px;
  }
`;

class BlockedUser extends React.Component {
  componentDidMount() {
    window.addEventListener('beforeunload', this.handleClose);
  }

  handleClose = () => {
    const { open, hideBlockedUser, logout } = this.props;

    if (open) {
      hideBlockedUser();
      logout();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleClose);
  }

  render() {
    const { helpLink, open } = this.props;

    return (
      <Overlay open={open} fullScreen>
        {() => (
          <StyledTitledArea
            svgBackground="black"
            name={
              <FormattedMessage
                id="blockedUser.sorry_not_this_time"
                defaultMessage="Sorry, not this time"
              />
            }
            description={
              <Description>
                <FormattedMessage
                  id="blockedUser.account_blocked"
                  defaultMessage="Account blocked, please contact help."
                />
              </Description>
            }
          >
            <OverlayCloseButton onClick={this.handleClose} />
            <Button3 data-test-id="sign-in-email-send-magic-li" type="submit">
              <a href={helpLink}>
                <FormattedMessage
                  id="membership.questionsContactUs"
                  defaultMessage="GO TO OUR FAQs"
                />
              </a>
            </Button3>
          </StyledTitledArea>
        )}
      </Overlay>
    );
  }
}

const mapStateToProps = state => ({
  open: isBlockedUserOpen(state),
  helpLink: getExternalLink('help')(state),
});

const mapActionsToProps = dispatch => ({
  hideBlockedUser: () => dispatch(hideBlockedUser()),
  logout: () => dispatch(logoutMember()),
});

export default compose(
  connect(
    mapStateToProps,
    mapActionsToProps
  )
)(BlockedUser);
