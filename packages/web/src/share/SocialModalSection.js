import styled from 'styled-components';
import { Body1, Body10 } from '../common/typography';
import { CoreDevices } from '../common/dimensions';

const SocialModalSection = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 0px;
  padding-right: 0px;
  text-align: left;

  @media ${CoreDevices.small} {
    padding-left: 23px;
    padding-right: 23px;
  }

  @media ${CoreDevices.medium} {
    text-align: center;
    padding-left: 70px;
    padding-right: 70px;
  }

  @media ${CoreDevices.large} {
    text-align: center;
    padding-left: 108px;
    padding-right: 108px;
  }

  & p {
    ${Body1};
    @media ${CoreDevices.medium}, ${CoreDevices.large} {
      ${Body10};
    }
  }
`;

export default SocialModalSection;
