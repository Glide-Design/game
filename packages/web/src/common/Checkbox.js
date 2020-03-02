import React from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.label`
  position: relative;
  padding-right: 40px;
  width: 100%;
`;

const CheckboxInput = styled.input`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  opacity: 0;
`;

export const CheckMark = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  height: 25px;
  width: 25px;
  background-color: transparent;
  border: 1px solid white;

  ${Label}:hover & {
    border-color: #999;
  }

  ${({ checked }) =>
    checked
      ? `
    &:after {
      content:'';
      position: relative;
      display:block;
      left: 10px;
      top: 5px;
      width: 3px;
      height: 10px;
      border: solid #00ff00;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    `
      : ''};
`;

class Checkbox extends React.Component {
  state = {
    checked: false,
  };

  render() {
    const { changed, label } = this.props;

    return (
      <CheckboxContainer>
        <Label>
          {label}
          <CheckboxInput
            type="checkbox"
            onChange={e => {
              const checked = e.target.checked;
              this.setState({ checked }, () => changed && changed(checked));
            }}
            value={1}
          />
          <CheckMark checked={this.state.checked} />
        </Label>
      </CheckboxContainer>
    );
  }
}

export default Checkbox;

export const CheckboxReduxForm = ({ input, meta, label, ...custom }) => (
  <CheckboxContainer {...custom}>
    <Label>
      {label}
      <CheckboxInput type="checkbox" {...input} />
      <CheckMark checked={input.value} />
    </Label>
  </CheckboxContainer>
);
