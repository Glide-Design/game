import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import TitledArea from '../common/TitledArea';
import { Button3 } from '../common/buttons';
import InviteButtonController from '../share/InviteButtonController';
import sectionButtonSpacingCss from './sectionButtonSpacingCss';
import enforceButtonWidthCSS from './enforceButtonWidthCSS';

const InviteButton = styled(Button3)`
  ${sectionButtonSpacingCss};
  ${enforceButtonWidthCSS};
  margin-bottom: 33px;

  width: 100%;
  background: #7c52f6;
  box-shadow: 4px 4px 0px #360fa6;
  color: white;
  border: none;
`;

export default () => (
  <TitledArea
    name={
      <FormattedMessage id="inviteFriends.inviteFriends" defaultMessage="Invite Your Friends" />
    }
    bgColour="#DAAAB0"
    fgColour="#000"
    svgBackground="#DAAAB0"
    description={
      <FormattedMessage
        id="inviteFriends.sectionDescription"
        defaultMessage="Know someone who’d love OTRO? Invite them in."
      />
    }
  >
    <InviteButtonController>
      {({ onClick }) => (
        <InviteButton onClick={onClick} data-test-id="invite-friends">
          <FormattedMessage id="inviteFriends.invite" defaultMessage="INVITE FRIEND" />
        </InviteButton>
      )}
    </InviteButtonController>
  </TitledArea>
);
