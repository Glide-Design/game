import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { close, IconTypes } from 'xi-core/snackBar/actions';
import { getSnackBar } from 'xi-core/snackBar/selectors';
import { Grey85 } from 'xi-core/colours';
import styled from 'styled-components';
import { posFixedZIndex } from '../common/dimensions';
import { UnstyledButtonLink } from '../common/buttons';
import { Body1, H2 } from '../common/typography';
import ExpandClickableArea from '../common/ExpandClickableArea';
import InfoIcon from '../common/icons/Info';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  color: ${Grey85};
  z-index: ${posFixedZIndex.snackBar};
  display: flex;
  align-items: center;
  padding: 20px 0;
  ${Body1};
`;

const LeftIcon = styled.div`
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TickIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #b2b2b2;
  border: solid 4px #e7e7e7;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 15px;
  }
`;

const StyledInfoIcon = styled(InfoIcon)`
  width: 20px;
  height: 20px;
`;

const Title = styled.div`
  font-size: 12px;
  margin-bottom: 4px;
`;

const Message = styled.div`
  ${H2};
`;

const StyledExpandClickableArea = styled(ExpandClickableArea)`
  margin-left: auto;
  margin-right: 20px;
  * {
    vertical-align: middle;
  }
`;

const getIcon = type => {
  switch (type) {
    case IconTypes.TICK:
      return (
        <TickIcon>
          <img src="/images/tick-icon.svg" alt="Tick" />
        </TickIcon>
      );
    case IconTypes.INFO:
      return <StyledInfoIcon />;
    case IconTypes.ARROW_RIGHT:
      return <img src="/images/forward-arrow.svg" alt="Close" />;
    default:
      return null;
  }
};

const SnackBar = ({ visible, title, message, closeSnackBar, leftIconType, closeIconType }) => {
  if (!visible) {
    return null;
  }
  return (
    <Container>
      <LeftIcon>{getIcon(leftIconType)}</LeftIcon>
      <div>
        {title && <Title>{title.id ? <FormattedMessage {...title} /> : title}</Title>}
        <Message>{message.id ? <FormattedMessage {...message} /> : message}</Message>
      </div>
      {closeIconType ? (
        <StyledExpandClickableArea>
          <UnstyledButtonLink onClick={closeSnackBar}>{getIcon(closeIconType)}</UnstyledButtonLink>
        </StyledExpandClickableArea>
      ) : null}
    </Container>
  );
};

const mapStateToProps = getSnackBar;

const mapDispatchToProps = dispatch => ({
  closeSnackBar: () => dispatch(close()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackBar);
