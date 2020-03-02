import React from 'react';
import styled from 'styled-components';
import { Grey5 } from 'xi-core/colours';
import SimpleDivider from '../../common/SimpleDivider';

const DividerIfEmpty = styled.div`
  & > *:not(:first-child) {
    display: none;
  }
`;

export default ({ className, children, hairline = true, withoutMargin }) => (
  <DividerIfEmpty className={className}>
    {children}
    <SimpleDivider hairline={hairline} color={Grey5} withoutMargin={withoutMargin} />
  </DividerIfEmpty>
);
