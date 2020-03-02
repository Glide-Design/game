import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { CoreDevices } from './dimensions';
import { Input } from './typography';

const TextField = styled.input`
  height: 47px;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  border-bottom: solid 1px #ffffff;
  color: white;
  padding: 0;
  ${Input}
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    font-size: 14px;
  }

  &:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: white !important;
  }

  &.asyncValidating {
    background-color: gray;
  }

  :disabled {
    color: rgba(255, 255, 255, 0.64);
  }
`;
export default TextField;

export const ErrorMsg = styled.div`
  margin-top: 10px !important;
  font-size: 12px;
  color: #fff;
  text-align: left;
`;

export const FieldWrapper = styled.div`
  input {
    width: 100%;
  }
`;

export const TextFieldReduxForm = ({
  className,
  input,
  meta,
  InputComponent = TextField,

  ...custom
}) => {
  return (
    <React.Fragment>
      <FieldWrapper id={input.name}>
        <InputComponent
          {...input}
          className={[className, meta.asyncValidating && 'asyncValidating']
            .filter(Boolean)
            .join(' ')}
          disabled={meta.asyncValidating || meta.submitting}
          {...custom}
        />
        {meta.touched && meta.invalid && meta.error && (
          <ErrorMsg>
            {meta.error.id != null ? <FormattedMessage {...meta.error} /> : meta.error}
          </ErrorMsg>
        )}
      </FieldWrapper>
    </React.Fragment>
  );
};
