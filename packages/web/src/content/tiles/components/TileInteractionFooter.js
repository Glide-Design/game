import React from 'react';
import styled from 'styled-components';
import ContentInteractionFooter from '../../components/ContentInteractionFooter';

const StyledContentInteractionFooter = styled(ContentInteractionFooter)``;

const StyledContentInteractionFooterInset = styled(StyledContentInteractionFooter)``;

export default ({ inset, className, ...props }) =>
  inset ? (
    <StyledContentInteractionFooterInset className={className} inset {...props} />
  ) : (
    <StyledContentInteractionFooter className={className} {...props} />
  );
