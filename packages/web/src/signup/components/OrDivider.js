import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { AuthenticationRed } from 'xi-core/colours';
import SimpleDivider from '../../common/SimpleDivider';
import { CoreDevices, HelperDevices } from '../../common/dimensions';

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  & ${SimpleDivider} {
    flex-grow: 1;
  }
  & span {
    margin: 0 12px;
    font-family: 'GT-America-Bold', sans-serif;
  }

  @media ${HelperDevices.belowMedium} {
    font-size: 14px;
  }

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    text-transform: uppercase;
  }
`;

export default () => (
  <OrDivider>
    <SimpleDivider color={AuthenticationRed} withoutMargin={true} />
    <span>
      <FormattedMessage id="join.or" defaultMessage="OR" />
    </span>
    <SimpleDivider color={AuthenticationRed} withoutMargin={true} />
  </OrDivider>
);
