import styled from 'styled-components';
import { TextFieldReduxForm } from '../../common/TextField';

export default styled(TextFieldReduxForm)`
  box-sizing: border-box;
  border-bottom: 1px solid rgba(255, 255, 255, 0.64);
  ::placeholder {
    color: rgba(255, 255, 255, 0.64);
    text-transform: capitalize;
  }
`;
