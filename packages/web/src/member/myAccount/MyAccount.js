import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { get, compose } from 'lodash/fp';
import moment from 'moment';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import {
  getMemberId,
  getForename,
  getSurname,
  getBirthday,
  getEmail,
  isAuthenticated,
  // isPremium,
  // getIsFreeTrial,
  isVip,
  // isPaymentProcessing,
} from 'xi-core/member/selectors';
import { getStep } from 'xi-core/signup/selectors';
import appMessages from 'xi-core/locale/app';
import appFormValidation from 'xi-core/app/formValidation';
import signupFormValidation from 'xi-core/signup/formValidation';
import { getSignupRestrictionLessThanAge } from 'xi-core/config/selectors';
// import { showPurchaseWizard } from 'xi-core/purchases/actions';
import { updateMemberProfile, userProfileCtaAction } from 'xi-core/member/actions';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import { Grey1, Grey5, Grey30, Grey50, Grey85 } from 'xi-core/colours';
import { TextFieldReduxForm } from '../../common/TextField';
import { CoreDevices, NAVBAR_HEIGHT_PX, TOOLBAR_HEIGHT_PX } from '../../common/dimensions';
import ProfileTopIcons from '../../profile/ProfileTopIcons';
import Settings from '../../profile/Settings';
import { SettingsMenuWrapper, SectionsWrapper } from '../styles';
import { Button1 } from '../../common/buttons/Buttons';
import { routes } from '../../App';
import { getTargetDevice } from '../../state/app/selectors';
// import CurrentPaymentMethod from '../payment/CurrentPaymentMethod';

const BIRTHDAY_DATE_FORMAT = 'DDMMYYYY';

const defaultBirthday = minAge =>
  moment()
    .subtract(minAge, 'year')
    .format(BIRTHDAY_DATE_FORMAT);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  color: #000;
  box-sizing: border-box;
  width: 100%;

  @media ${CoreDevices.tiny} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.tiny}px);
    padding-top: ${TOOLBAR_HEIGHT_PX.tiny}px;
  }

  @media ${CoreDevices.small} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.small}px);
    padding-top: ${TOOLBAR_HEIGHT_PX.small}px;
  }

  @media ${CoreDevices.medium} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.medium}px);
    padding-top: ${TOOLBAR_HEIGHT_PX.medium}px;
  }

  @media ${CoreDevices.large} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.large}px);
    padding-top: 0;
  }
`;

const StyledProfileTopIcons = styled(ProfileTopIcons)`
  // background: #000;
`;

const Section = styled.div`
  border-top: 1px solid ${Grey5};
  margin-bottom: 20px;
  padding: 22px;
  position: relative;

  ${({ largeDevice }) => (largeDevice ? 'width: 400px;' : '')};
`;

const SectionEditButton = styled.div`
  position: absolute;
  top: 22px;
  right: 22px;
  font-size: 16px;
  color: ${Grey50};
  cursor: pointer;
`;

const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: normal;
  color: ${Grey85};
  display: flex;
`;

const PreEditValue = styled.div`
  font-size: 16px;
  color: ${Grey30};
  margin-bottom: 20px;
`;

// const StyledLink = styled(Link)`
//   color: ${Grey30};
// `;

// const Manage = styled.span`
//   color: ${Grey30};
//   cursor: pointer;
// `;

const EditContainer = styled.div`
  width: calc(100% - 22px);
`;

const StyledTextFieldReduxForm = styled(TextFieldReduxForm)`
  font-size: 16px;
  background-color: ${Grey1};
  border: none;
  border-bottom: 1px solid #d8d8d8;
  color: ${Grey85};
  display: block;
  height: inherit;
  padding: 10px;
  outline: none;
  margin-top: 10px;

  &:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: ${Grey85} !important;
  }
`;

const StyledButton1 = styled(Button1)`
  margin-top: 10px;
`;

const SettingRow = styled.div`
  display: flex;
  margin-bottom: 0px;
`;

const LabelHolder = styled.div`
  flex: 1;
  margin-bottom: 20px;
`;

// const ValueHolder = styled.div`
//   width: 120px;
//   text-align: right;
// `;

class MyAccount extends React.Component {
  state = {
    editMode: false,
  };

  onEditClick = resetForm => event => {
    const { reset, editProfileClicked } = this.props;
    resetForm && reset();
    event && event.preventDefault();
    this.setState(
      state => ({ editMode: !state.editMode }),
      () => this.state.editMode && editProfileClicked()
    );
  };

  componentDidMount() {
    const { history, isAuthenticated, signupStep } = this.props;

    if (!isAuthenticated && signupStep === null) {
      history.replace(routes.settings.path);
    }
  }

  // openManage = () => {
  //   const { history, manageMembershipClicked } = this.props;

  //   manageMembershipClicked();
  //   history.replace(routes.membership.path);
  // };

  handleSubmit = async () => {
    const { handleSubmit } = this.props;
    const errors = await handleSubmit();

    if (!errors) {
      this.onEditClick()(); // exit edit mode
    }
  };

  render() {
    const {
      targetDevice,
      forename,
      surname,
      email,
      // isPremium,
      // isFreeTrial,
      isVip,
      // eligibleForTrial,
      // showPurchaseWizard,
      asyncValidating,
      submitting,
      valid,
      // isPaymentProcessing,
      isAuthenticated,
    } = this.props;

    const { editMode } = this.state;
    const largeDevice = targetDevice === 'large';

    // const {
    //   statusMembershipMessage,
    //   actionMembershipMessage,
    //   membershipAction,
    // } = myAccountMembership({
    //   isPremium,
    //   isFreeTrial,
    //   isPaymentProcessing,
    //   eligibleForTrial,
    //   showTrialProduct: showPurchaseWizard,
    //   showStandardProduct: showPurchaseWizard,
    //   openMembership: this.openManage,
    // });

    return (
      <Container>
        {!largeDevice && (
          <StyledProfileTopIcons
            fixedTopBackground={0}
            hideBackButton={false}
            fullName={<FormattedMessage id="myAccount.myAccount" defaultMessage="My Account" />}
          />
        )}
        {largeDevice ? (
          <SettingsMenuWrapper>
            <Settings wrapped={true} active="myaccount" />
          </SettingsMenuWrapper>
        ) : null}
        {isAuthenticated && (
          <SectionsWrapper largeDevice={largeDevice}>
            <Section largeDevice={largeDevice}>
              <SectionEditButton
                onClick={this.onEditClick(editMode)}
                data-test-id={editMode ? 'cancel' : 'edit'}
              >
                {editMode ? (
                  <FormattedMessage id="myAccount.cancel" defaultMessage="Cancel" />
                ) : (
                  <FormattedMessage id="myAccount.edit" defaultMessage="Edit" />
                )}
              </SectionEditButton>
              <SectionTitle>
                <FormattedMessage
                  id="myAccount.personalInformation"
                  defaultMessage="Personal information "
                />
              </SectionTitle>
              {editMode ? (
                <EditContainer>
                  <FormattedMessage id="edit_profile.forename" defaultMessage="First name">
                    {placeholder => (
                      <Field
                        name="forename"
                        type="text"
                        placeholder={placeholder}
                        component={StyledTextFieldReduxForm}
                        data-test-id="first-name"
                      />
                    )}
                  </FormattedMessage>
                  <FormattedMessage id="edit_profile.surname" defaultMessage="Last name">
                    {placeholder => (
                      <Field
                        name="surname"
                        type="text"
                        placeholder={placeholder}
                        component={StyledTextFieldReduxForm}
                        data-test-id="last-name"
                      />
                    )}
                  </FormattedMessage>
                  <FormattedMessage id="edit_profile.email" defaultMessage="Email">
                    {placeholder => (
                      <Field
                        name="email"
                        type="text"
                        placeholder={placeholder}
                        component={StyledTextFieldReduxForm}
                      />
                    )}
                  </FormattedMessage>
                  <StyledButton1
                    onClick={this.handleSubmit}
                    disabled={!valid || asyncValidating !== false || submitting}
                    data-test-id="save"
                  >
                    Save
                  </StyledButton1>
                </EditContainer>
              ) : (
                <Fragment>
                  <div>
                    <Label>
                      <FormattedMessage id="myAccount.firstName" defaultMessage="First Name" />
                    </Label>
                    <PreEditValue>{forename}</PreEditValue>
                  </div>
                  <div>
                    <Label>
                      <FormattedMessage id="myAccount.lastName" defaultMessage="Last Name" />
                    </Label>
                    <PreEditValue>{surname}</PreEditValue>
                  </div>
                  <div>
                    <Label>
                      <FormattedMessage id="myAccount.email" defaultMessage="Email" />
                    </Label>
                    <PreEditValue>{email}</PreEditValue>
                  </div>
                </Fragment>
              )}
            </Section>
            <Section largeDevice={largeDevice}>
              <SectionTitle>
                <FormattedMessage id="myAccount.membership" defaultMessage="My membership" />
              </SectionTitle>
              <SettingRow>
                <LabelHolder>
                  {isVip ? (
                    <FormattedMessage id="myAccount.vipUser" defaultMessage="VIP Member" />
                  ) : (
                    <FormattedMessage id="myAccount.member" defaultMessage="Member" />
                  )}
                  {/* <Fragment>
                       <LabelHolder>
                         <FormattedMessage {...statusMembershipMessage} />
                       </LabelHolder>
                       <ValueHolder>
                         <PreEditValue>
                           <Manage onClick={membershipAction} data-test-id="subscribe-now-link">
                             <FormattedMessage {...actionMembershipMessage} />
                           </Manage>
                         </PreEditValue>
                       </ValueHolder>
                     </Fragment> */}
                </LabelHolder>
              </SettingRow>
              {/* {isPremium ? (
                  <Fragment>
                    <SettingRow>
                      <LabelHolder>
                        <FormattedMessage
                          id="myAccount.payments"
                          defaultMessage="Payment history"
                        />
                      </LabelHolder>
                      <ValueHolder>
                        <PreEditValue>
                          <StyledLink to="/payments">
                            <FormattedMessage id="myAccount.view" defaultMessage="View" />
                          </StyledLink>
                        </PreEditValue>
                      </ValueHolder>
                    </SettingRow>
                    <SettingRow>
                      <LabelHolder>
                        <FormattedMessage
                          id="membership.paymentMethod"
                          defaultMessage="Payment method"
                        />
                        <CurrentPaymentMethod />
                      </LabelHolder>
                      <ValueHolder>
                        <PreEditValue>
                          <StyledLink to={routes.updatePayment.path}>
                            <FormattedMessage id="myAccount.edit" defaultMessage="Edit" />
                          </StyledLink>
                        </PreEditValue>
                      </ValueHolder>
                    </SettingRow>
                  </Fragment>
                ) : (
                  <Button1 onClick={showPurchaseWizard} data-test-id="explore-unlimited-button">
                    <FormattedMessage
                      id="goPremiumButton.explorePremium"
                      defaultMessage="Explore Unlimited"
                    />
                  </Button1>
                )} */}
            </Section>
          </SectionsWrapper>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userId: get('user.id', state),
  memberId: getMemberId(state),
  targetDevice: getTargetDevice(state),
  forename: getForename(state),
  surname: getSurname(state),
  birthday: getBirthday(state),
  email: getEmail(state),
  isAuthenticated: isAuthenticated(state),
  // isPremium: isPremium(state),
  // isFreeTrial: getIsFreeTrial(state),
  // isPaymentProcessing: isPaymentProcessing(state),
  isVip: isVip(state),
  initialValues: {
    forename: getForename(state),
    surname: getSurname(state),
    email: getEmail(state),
    birthday: moment(getBirthday(state)).isValid()
      ? moment(getBirthday(state)).format(BIRTHDAY_DATE_FORMAT)
      : defaultBirthday(getSignupRestrictionLessThanAge(state)),
  },
  minAge: getSignupRestrictionLessThanAge(state),
  signupStep: getStep(state),
});

const mapDispatchToProps = (dispatch, { history }) => ({
  updateMemberProfile: (memberId, values) => dispatch(updateMemberProfile(memberId, values)),
  // showPurchaseWizard: () => dispatch(showPurchaseWizard({ history: history })),
  manageMembershipClicked: () =>
    dispatch(userProfileCtaAction(PropertyKeys.USER_PROFILE_ACTION.MANAGE_SUB)),
  editProfileClicked: () =>
    dispatch(userProfileCtaAction(PropertyKeys.USER_PROFILE_ACTION.EDIT_PROFILE)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({
    form: 'myAccount',
    enableReinitialize: true,
    async onSubmit({ forename, surname, email }, dispatch, { memberId }) {
      try {
        await dispatch(
          updateMemberProfile(memberId, {
            forename,
            surname,
            email,
          })
        );
      } catch (e) {
        console.error(e);
        throw new SubmissionError({
          _error: appMessages.submit_error,
        });
      }
    },
    validate: (values, { minAge }) => ({
      ...signupFormValidation.firstname('forename', values),
      ...signupFormValidation.lastname('surname', values),
      ...appFormValidation.email('email', values),
      ...signupFormValidation.birthday('birthday', values, minAge, BIRTHDAY_DATE_FORMAT),
    }),
  }),
  withRouter
)(MyAccount);
