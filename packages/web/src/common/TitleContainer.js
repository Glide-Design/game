import React from 'react';
import styled from 'styled-components';
import { FontFamily } from './typography';
import { CoreDevices, HelperDevices } from './dimensions';

const StyledTitleContainer = styled.div`
  ${FontFamily.bold}
  text-align: center;
  text-transform: uppercase;

  @media ${HelperDevices.belowMedium} {
    font-size: 24px;
    margin-top: 76px;
  }
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    font-size: 48px;
    margin-top: 148px;
  }
`;

export default class TitleContainer extends React.Component {

    render() {
        const { children } = this.props;

        return (
            <StyledTitleContainer>
                {children}
            </StyledTitleContainer>
        );
    }
}
