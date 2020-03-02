import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { CoreDevices } from './dimensions';
import { Input } from './typography';

const TextArea = styled.textarea`
  height: 47px;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  border-bottom: solid 1px #ffffff;
  color: #fff;
  padding: 0;
  ${Input}
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    font-size: 18px;
  }

  &:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: white !important;
  }
`;
export default TextArea;

const ErrorMsg = styled.div`
  margin-top: 10px !important;
  font-size: 12px;
  color: red;
`;

export const TextAreaReduxForm = ({ input, meta, ...custom }) => {
  return (
    <React.Fragment>
      <TextArea {...input} {...custom} />
      {meta.touched &&
        meta.invalid &&
        meta.error && (
          <ErrorMsg>
            {meta.error.id != null ? <FormattedMessage {...meta.error} /> : meta.error}
          </ErrorMsg>
        )}
    </React.Fragment>
  );
};
