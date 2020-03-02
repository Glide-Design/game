import { reduxForm, SubmissionError } from 'redux-form';
import appMessages from 'xi-core/locale/app';
import appFormValidation from 'xi-core/app/formValidation';
import { inviteEmail } from 'xi-core/member/actions';
import { fetchContentEntitlement } from 'xi-core/content/actions';

const giftFormHoC = reduxForm({
  form: 'gift',
  validate: values => ({
    ...appFormValidation.email('email', values),
  }),
  async onSubmit({ email }, dispatch, { contentId, onCompleted }) {
    try {
      await dispatch(inviteEmail(email, contentId));
      await dispatch(fetchContentEntitlement(contentId));
      onCompleted && onCompleted();
      return true;
    } catch (e) {
      console.error(e.message);
      throw new SubmissionError({ _error: appMessages.submit_error });
    }
  },
});

export default giftFormHoC;
