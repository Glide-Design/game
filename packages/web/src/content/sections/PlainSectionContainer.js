import styled from 'styled-components';
import { HelperDevices, SECTION_HEIGHT_VH } from '../../common/dimensions';

export default styled.div`
  height: ${SECTION_HEIGHT_VH}vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  min-height: 340px;
  @media ${HelperDevices.belowMediumPortrait} {
    max-height: 550px;
  }
`;
