import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Grey85 } from 'xi-core/colours';
import { ContainerPaddingCss, CoreDevices } from '../../common/dimensions';
import { H2, H3 } from '../../common/typography';
import Bookmark from '../../common/icons/Bookmark';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  background: #fff;
  color: ${Grey85};
  ${ContainerPaddingCss};
`;

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.h1`
  ${H2};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H3};
  }
`;

const Message = styled.p``;

const BookmarkIcon = styled(Bookmark)`
  width: 36px;
  height: auto;
  margin-bottom: 12px;
`;

export default () => (
  <Container>
    <Wrapper>
      <BookmarkIcon />
      <Header>
        <FormattedMessage
          id="myLocker.noBookmarksHeader"
          defaultMessage="Nothing to see here (yet)"
        />
      </Header>
      <Message>
        <FormattedMessage
          id="myLocker.noBookmarksText"
          defaultMessage="Use the bookmark icon to save stuff to your locker and watch it any time you're connected."
        />
      </Message>
    </Wrapper>
  </Container>
);
