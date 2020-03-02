import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { isGuestPassAllowed } from 'xi-core/content/selectors';
import { Grey20 } from 'xi-core/colours';
import ExpandClickableArea from '../../common/ExpandClickableArea';
import Ticket from '../../common/icons/Ticket';
import BackArrow from '../../common/icons/BackArrow';
import { Body1, Body10, H2, H3 } from '../../common/typography';
import { UnstyledButtonLink } from '../../common/buttons';
import { CoreDevices, ContainerPaddingCss } from '../../common/dimensions';
import ModalButtonController from '../../share/ModalButtonController';
import GiftModal from '../../share/GiftModal';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  ${ContainerPaddingCss};
  color: ${({ alreadyUsed }) => (alreadyUsed ? `${Grey20}` : 'inherit')};
`;

const SizedTicket = styled(Ticket)`
  height: 28px;
  padding: 14px 14px 14px 0px;
`;

const ForwardArrow = styled(BackArrow)`
  transform: rotate(180deg);
`;

const ShareText = styled.div`
  display: flex;
  flex: 1;
  margin-right: auto;

  @media ${CoreDevices.tiny} {
    flex-direction: column;
  }

  @media ${CoreDevices.small} {
    flex-direction: column;
  }
`;

const Title = styled.div`
  ${H2};
  margin-right: 12px;

  @media ${CoreDevices.tiny} {
    margin-bottom: 12px;
  }

  @media ${CoreDevices.small} {
    margin-bottom: 12px;
  }

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H3};
  }
`;

const Body = styled.div`
  ${Body1};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${Body10};
  }
`;

const GuestPass = ({ contentId, alreadyUsed }) => (
  <ModalButtonController
    renderModal={modalProps => <GiftModal {...modalProps} contentId={contentId} />}
  >
    {({ onClick }) => (
      <Container alreadyUsed={alreadyUsed}>
        <SizedTicket />
        <ShareText>
          <Title>
            <FormattedMessage id="share.gift_header" defaultMessage="GUEST PASS" />
          </Title>
          <Body>
            <FormattedMessage
              id="share.unlimited_short"
              defaultMessage="Share this exclusive content with one friend for free"
            />
            {alreadyUsed ? (
              <Fragment>
                {' '}
                <FormattedMessage id="share.alreadyUsed" defaultMessage="(Already Used)" />
              </Fragment>
            ) : null}
          </Body>
        </ShareText>
        {!alreadyUsed ? (
          <ExpandClickableArea>
            <UnstyledButtonLink onClick={onClick}>
              <ForwardArrow />
            </UnstyledButtonLink>
          </ExpandClickableArea>
        ) : null}
      </Container>
    )}
  </ModalButtonController>
);

export default connect((state, { contentId }) => ({
  alreadyUsed: !isGuestPassAllowed(state)(contentId),
}))(GuestPass);
