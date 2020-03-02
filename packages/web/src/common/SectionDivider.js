import styled from 'styled-components';
import { CoreDevices } from './dimensions';

export default styled.hr`
  position: relative;
  height: 4px;
  color: #fff;
  background: #fff;
  font-size: 0;
  border: 0;
  margin: 0;
  padding: 0;

  @media ${CoreDevices.medium} {
    height: 8px;
  }

  @media ${CoreDevices.large} {
    height: 10px;
  }
`;
