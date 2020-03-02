import { css } from 'styled-components';
import { CoreDevices, SIDE_MARGIN_PX } from '../common/dimensions';

export default css`
  margin: 20px ${SIDE_MARGIN_PX.small}px;

  @media ${CoreDevices.medium} {
    margin: 30px ${SIDE_MARGIN_PX.medium}px;
  }

  @media ${CoreDevices.large} {
    margin: 30px ${SIDE_MARGIN_PX.large}px;
  }

  align-self: flex-start;
`;
