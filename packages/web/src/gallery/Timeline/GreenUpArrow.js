import styled from 'styled-components';
import UpArrow from '../../common/icons/UpArrow';

const GreenUpArrow = styled(UpArrow)`
  color: #0f0;
  transition: transform 0.4s ease;
  margin-bottom: 7px;
  transform: ${props => (props.down ? 'rotate(180deg)' : 'none')};
`;

export default GreenUpArrow;
