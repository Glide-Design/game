import styled from 'styled-components';
import LoaderSpinner from '../../common/LoaderSpinner';

export default styled(LoaderSpinner)`
  height: 100%;
  position: relative;
  & svg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
`;
