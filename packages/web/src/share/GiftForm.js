import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import giftFormHoC from 'xi-core/share/giftFormHoC';
import TextField, { TextFieldReduxForm } from '../common/TextField';
import GoButton from '../common/icons/GoButton';
import { UnstyledButtonLink } from '../common/buttons';
import Loader from '../common/Loader';
import Tick from '../common/icons/Tick';

const StyledTextField = styled(TextField)`
  border: none;
  box-sizing: border-box;
  padding: 0 4%;
  flex-grow: 1;
  color: black;
  background-color: #f7f7f7;
  &:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: black !important;
  }
  ${props =>
    props.submitting
      ? `
    pointer-events: none;
    opacity: 0.5;
  `
      : 'border-bottom: solid 1px #d8d8d8;'};
`;

const EmailFieldWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin: 10px 0;
`;

const SendButton = styled(UnstyledButtonLink)`
  background: #f7f7f7;
  padding: 0 8px;
  display: flex;
  align-items: center;
  ${props =>
    props.submitting
      ? `
    pointer-events: none;
    opacity: 0.5;
  `
      : 'border-bottom: solid 1px #d8d8d8;'};
`;

const EmailField = ({ sendSuccess, submitting, ...props }) => (
  <EmailFieldWrapper>
    <StyledTextField {...props} submitting={submitting} data-test-id="invite-email-input" />
    <SendButton
      type="submit"
      disabled={sendSuccess}
      submitting={submitting}
      data-test-id="invite-email-button"
    >
      {sendSuccess ? <Tick /> : <GoButton />}
    </SendButton>
  </EmailFieldWrapper>
);

const EmailFieldReduxForm = props => (
  <TextFieldReduxForm
    InputComponent={EmailField}
    sendSuccess={props.sendSuccess}
    submitting={props.submitting}
    {...props}
  />
);

class GiftForm extends React.Component {
  state = {
    sendSuccess: false,
  };

  statefulHandleSubmit = async values => {
    const { handleSubmit } = this.props;

    // reset submission status on every submit
    this.setState({ sendSuccess: false });

    // save the submission status in the state; cast the handleSubmit to a boolean
    // as it return an object on validation error
    this.setState({ sendSuccess: (await handleSubmit(values)) === true });
  };

  componentDidUpdate(prevProps, prevState) {
    const { closeModal } = this.props;
    const { sendSuccess } = this.state;

    if (sendSuccess && !prevState.sendSuccess) {
      // close the pop up after successful submission
      setTimeout(closeModal, 500);
    }
  }

  render() {
    const { error, submitting } = this.props;
    const { sendSuccess } = this.state;

    return (
      <form onSubmit={this.statefulHandleSubmit}>
        <FormattedMessage id="share.enter_email" defaultMessage="Friend's email address">
          {placeholder => (
            <Field
              name="email"
              type="text"
              placeholder={placeholder}
              sendSuccess={sendSuccess}
              component={EmailFieldReduxForm}
            />
          )}
        </FormattedMessage>
        {submitting && <Loader height={1} />}
        {error && (
          <ErrorMessage>
            <FormattedMessage
              id="share.invite_email.error"
              defaultMessage="There was a problem with sending the Guest Pass. Please try again."
            />
          </ErrorMessage>
        )}
      </form>
    );
  }
}

export default giftFormHoC(GiftForm);
