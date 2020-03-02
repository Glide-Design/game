import { css } from 'styled-components';
import { CoreDevices } from '../common/dimensions';

export default css`
  width: 180px;
  white-space: nowrap;
  overflow: hidden;

  @media ${CoreDevices.medium} {
    min-width: 200px;
  }

  @media ${CoreDevices.large} {
    min-width: 220px;
  }
`;
