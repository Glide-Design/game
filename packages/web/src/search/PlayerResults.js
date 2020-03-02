import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Grey85 } from 'xi-core/colours';
import Title from '../content/components/Title';
import { BulletTitleContainer } from '../common/BulletTitle';
import { ContainerPaddingCss } from '../common/dimensions';

const StyledTitleContainer = styled(BulletTitleContainer)`
  height: auto;
  position: relative;
  margin-bottom: 25px;
  ${ContainerPaddingCss};
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  ${ContainerPaddingCss};
`;

const ItemWrapper = styled.div`
  margin-right: 24px;
  padding: 4px 0 24px;
`;

export default ({ title, items = [] }) =>
  items.length ? (
    <Fragment>
      <StyledTitleContainer colour={Grey85}>
        <Title>{title}</Title>
      </StyledTitleContainer>
      <ItemsContainer>
        {items.map((item, i) => <ItemWrapper key={i}>{item}</ItemWrapper>)}
      </ItemsContainer>
    </Fragment>
  ) : null;
