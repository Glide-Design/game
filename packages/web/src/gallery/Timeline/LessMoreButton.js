import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { UnstyledButtonLink } from '../../common/buttons';
import { ROW_HEIGHT_PX } from '../../common/dimensions';
import GreenUpArrow from './GreenUpArrow';

const DetailButtonContainer = styled(UnstyledButtonLink)`
  flex-shrink: 0;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  font-weight: bold;
  z-index: 1;
  padding: ${1 * ROW_HEIGHT_PX}px;
`;

const LessMoreButton = ({ isOpen, onClose, onOpen }) => (
  <DetailButtonContainer onClick={isOpen ? onClose : onOpen}>
    <GreenUpArrow down={isOpen} />
    {isOpen ? (
      <FormattedMessage id="timeline.less" defaultMessage="LESS" />
    ) : (
      <FormattedMessage id="timeline.more" defaultMessage="MORE" />
    )}
  </DetailButtonContainer>
);

LessMoreButton.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
};

export default LessMoreButton;
