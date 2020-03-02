import styled from 'styled-components';
import { H2, H3 } from '../common/typography';
import { CoreDevices } from '../common/dimensions';

const SocialModalTitle = styled.div`
  ${H2};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${CoreDevices.tiny} {
    padding-left: 23px;
    padding-right: 23px;
  }

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H3};
    flex-direction: column-reverse;
  }
`;

export default SocialModalTitle;
