import styled from 'styled-components';

export const NavButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #7c52f6;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
  :hover {
    background-color: #7c52f6;
  }
  ${({ position }) => (position === 'left' ? 'left: 10px;' : 'right: 10px')};
  z-index: 1;
  &:after {
    content: '';
    border: solid #fff;
    border-width: 0 2px 2px 0;
    padding: 4px;
    ${({ position }) =>
      position === 'left' ? 'transform: rotate(135deg);' : 'transform: rotate(315deg);'};
    ${({ position }) => (position === 'left' ? 'right: 14px;' : 'left: 14px;')};
    top: 16px;
    position: absolute;
    pointer-events: none;
  }
`;
