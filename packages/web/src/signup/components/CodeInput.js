import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { compose, get } from 'lodash/fp';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Grey30 } from 'xi-core/colours';
import { SIGNIN_CODE_LENGTH, loginWithCode } from 'xi-core/signup/actions';
import { getEmail } from 'xi-core/member/selectors';
import { logglyRuntimeError } from 'xi-core/app/actions';
import signupFormValidation from 'xi-core/signup/formValidation';
import { FontFamily, Input as InputCss } from '../../common/typography';
import LoaderCircularSpinner from '../../common/LoaderCircularSpinner';

let codeValidated = false;

const StyledInput = styled.input`
  border: none;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid #d8d8d8;
  ::placeholder {
    color: ${Grey30};
  }
  padding-left: 10px;

  height: 48px;
  text-align: center;
  box-sizing: border-box;
  color: white;
  width: 100%;
  &:focus {
    outline-width: 0;
  }
  &::placeholder {
    color: #aaa;
  }
  ${InputCss};

  ${({ value }) =>
    !value
      ? ''
      : `
      font-size: 28px;
      ${FontFamily.bold};
      letter-spacing: 10px;
  `};
`;

const ErrorMsg = styled.div`
  margin-top: 10px !important;
  font-size: 12px;
  color: red;
  text-align: center;
`;

class Input extends React.Component {
  state = {
    value: '',
  };

  focus = () => this.input && this.input.focus();

  render() {
    const { className, input, meta, ...custom } = this.props;

    return (
      <React.Fragment>
        <FormattedMessage id="codeInput.enterCode" defaultMessage="Enter code">
          {placeholder => (
            <StyledInput
              innerRef={ref => {
                this.input = ref;
              }}
              className={className}
              type="text"
              placeholder={placeholder}
              {...input}
              {...custom}
              disabled={meta.submitting}
            />
          )}
        </FormattedMessage>
        {meta.error && !meta.submitting ? (
          <ErrorMsg>
            {meta.error.id != null ? <FormattedMessage {...meta.error} /> : meta.error}
          </ErrorMsg>
        ) : null}
      </React.Fragment>
    );
  }
}

class CodeInput extends React.Component {
  componentDidUpdate = prevProps => {
    const { code = '', submit } = this.props;
    if (prevProps.code !== code && code.length === SIGNIN_CODE_LENGTH) {
      codeValidated = true;

      /* Not happy with the current implementation, but this was the only way making the code work as expected.
      Needed to workaround as the submit method was not working as intended if it was not delayed with 1ms. 
      It was not calling the async method defined on line 152. In order to support the redux-form async validation in the most correct way, 
      a good aproach which might solve the issue could be this: https://redux-form.com/6.0.0-alpha.4/examples/asyncvalidation/ */

      setTimeout(() => {
        submit();
      }, 1);
    }
    this.codeInput.focus();
  };

  codeInputRef = ref => {
    if (ref && !this.codeInput) {
      this.codeInput = ref.getRenderedComponent();
      if (this.props.focusOnMount) {
        this.codeInput.focus();
      }
    }
  };

  render() {
    const { submitting } = this.props;
    return (
      <React.Fragment>
        <Field
          name="code"
          component={Input}
          withRef={true}
          ref={ref => this.codeInputRef(ref)}
          normalize={v => v.trim()}
          className={this.props.className}
        />
        {submitting && <LoaderCircularSpinner />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  code: get('form.joinOptionsCode.values.code', state),
  email: getEmail(state),
});

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'joinOptionsCode',
    onSubmit: async ({ code }, dispatch, { email }) => {
      try {
        await dispatch(loginWithCode(code, email));
      } catch (e) {
        if (get('errors.code.id', e) !== 'invalid_login_code') {
          dispatch(
            logglyRuntimeError({
              message: get('errors.code.defaultMessage', e),
            })
          );
        }
        throw e;
      }
    },
    validate: values => ({
      ...signupFormValidation.emailCode('code', values, codeValidated),
    }),
  })
)(CodeInput);
