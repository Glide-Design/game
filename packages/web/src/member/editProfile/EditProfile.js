import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components';
import { compose } from 'lodash/fp';
import { Field, reduxForm } from 'redux-form';
import withRequest from 'xi-core/withRequest';
import { fetchMemberProfile, updateMemberProfile } from 'xi-core/member/actions';
import {
  getMemberId,
  getForename,
  getSurname,
  getAboutMe,
  getAvatar,
} from 'xi-core/member/selectors';
import signupFormValidation from 'xi-core/signup/formValidation';
import appFormValidation from 'xi-core/app/formValidation';
import { Grey30, Grey5, Grey85, Grey15 } from 'xi-core/colours';
import { CoreDevices, HelperDevices, NAVBAR_HEIGHT_PX } from '../../common/dimensions';
import { Button1 } from '../../common/buttons';
import { TextFieldReduxForm, FieldWrapper } from '../../common/TextField';
import { TextAreaReduxForm } from '../../common/TextArea';
import { H2, H4 } from '../../common/typography';
import ProfileTopIcons from '../../profile/ProfileTopIcons';
import Settings from '../../profile/Settings';
import { getTargetDevice } from '../../state/app/selectors';
import { SettingsMenuWrapper, SectionsWrapper } from '../styles';
import UploadProfileAvatar from './UploadProfileAvatar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  color: ${Grey85};
  box-sizing: border-box;
  width: 100%;

  @media ${CoreDevices.tiny} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.tiny}px);
    padding-top: ${NAVBAR_HEIGHT_PX.tiny}px;
  }

  @media ${CoreDevices.small} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.small}px);
    padding-top: ${NAVBAR_HEIGHT_PX.small}px;
  }

  @media ${CoreDevices.medium} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.medium}px);
    padding-top: ${NAVBAR_HEIGHT_PX.medium}px;
  }

  @media ${CoreDevices.large} {
    min-height: calc(100vh - ${NAVBAR_HEIGHT_PX.large}px);
    padding-top: 0;
  }
`;

const StyledProfileTopIcons = styled(ProfileTopIcons)`
  @media ${CoreDevices.large} {
    display: none;
  }
`;

const Section = styled.div`
  border-top: 1px solid ${Grey5};
  margin-bottom: 20px;
  padding: 22px;
  position: relative;

  ${({ largeDevice }) => (largeDevice ? 'width: 400px;' : '')};
`;

const Elements = styled.div`
  align-self: center;
  display: flex;

  > * {
    margin-top: 16px;
  }

  & .fullWidth {
    width: 100%;
  }

  @media ${HelperDevices.belowMedium} {
    flex-direction: column;
    justify-content: space-between;
    margin: 0 23px;
  }

  @media ${CoreDevices.medium} {
    margin: 0 42px;
  }

  @media ${CoreDevices.large} {
    max-width: 500px;
  }

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    flex-wrap: wrap;
    > * {
      margin-top: 50px;
    }

    #forename {
      margin-right: 16px;
      flex: 1;
    }
    #surname {
      margin-left: 16px;
      flex: 1;
    }
  }
`;

const StyledSectionWrapper = styled(SectionsWrapper)`
  padding-top: 0;
  & ${FieldWrapper} {
    display: flex;
  }
`;

const fieldCss = css`
  padding-left: 6px;
  padding-right: 6px;
  background: #f7f7f7;
  border-bottom: solid 1px ${Grey15};
  color: ${Grey85};
`;

const StyledTextFieldReduxForm = styled(TextFieldReduxForm)`
  ${fieldCss};
  flex-grow: 1;
`;

const AboutMeWrapper = styled.div`
  position: relative;
`;

const StyledTextAreaReduxForm = styled(TextAreaReduxForm)`
  ${fieldCss};
  padding-top: 6px;
  padding-bottom: 6px;
  box-sizing: border-box;
  width: 100%;
  height: 120px;
  resize: none;
`;

const WordCountdown = styled.div`
  color: ${props => (props.overflowed ? 'red' : Grey30)};
  background-color: rgba(247, 247, 247, 0.5);
  text-align: right;
  position: absolute;
  bottom: 14px;
  right: 20px;
`;

const AboutMeInput = ({ maxChars, meta, ...props }) => {
  const charsRemaining = maxChars - props.input.value.length;
  const overflowed = charsRemaining < 0;

  return (
    <AboutMeWrapper>
      <StyledTextAreaReduxForm type="textarea" meta={{ ...meta, error: null }} {...props} />
      <WordCountdown overflowed={overflowed}>
        {overflowed ? (
          <FormattedMessage
            id="edit_profile.characters_too_many"
            defaultMessage={
              '{charsOverflowed, number} {charsOverflowed, plural, one {character} other {characters}} too many'
            }
            values={{ charsOverflowed: -charsRemaining }}
          />
        ) : (
          <FormattedMessage
            id="edit_profile.characters_remaining"
            defaultMessage={`{charsRemaining, number} {charsRemaining, plural,
              one {character}
              other {characters}
            } left`}
            values={{ charsRemaining }}
          />
        )}
      </WordCountdown>
    </AboutMeWrapper>
  );
};

const Row = styled.div`
  width: 100%;
`;

const StyledButton1 = styled(Button1)`
  align-self: flex-start;
  margin-bottom: 36px;
`;

const AboutMe = styled.div`
  ${H4};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H2};
  }
  margin: 0 0 12px;
`;

const aboutMeMaxChars = 250;

const UploadAvatarField = field => (
  <UploadProfileAvatar onFieldChange={newValue => field.input.onChange(newValue)} />
);

class EditProfile extends React.Component {
  componentDidUpdate(prevProps) {
    this.shouldSubmitAfterAsyncValidation(prevProps);
  }

  shouldSubmitAfterAsyncValidation = prevProps => {
    const { asyncValidating, submit } = this.props;
    if (prevProps.asyncValidating !== asyncValidating && !asyncValidating) {
      if (this.focusLostToSubmitButton) {
        this.focusLostToSubmitButton = false;
        submit();
      }
    }
  };

  render() {
    const { valid, asyncValidating, submitting, submit, targetDevice } = this.props;
    const largeDevice = targetDevice === 'large';
    return (
      <Container>
        {!largeDevice && (
          <StyledProfileTopIcons
            fixedTopBackground={0}
            hideBackButton={false}
            fullName={
              <FormattedMessage id="profile_summary.edit_profile" defaultMessage="Edit Profile" />
            }
          />
        )}
        {largeDevice ? (
          <SettingsMenuWrapper>
            <Settings wrapped={true} active="editProfile" />
          </SettingsMenuWrapper>
        ) : null}
        <StyledSectionWrapper largeDevice={largeDevice}>
          <Section largeDevice={largeDevice}>
            <Elements>
              <Row>
                <Field name="avatarUrl" type="text" component={UploadAvatarField} />
              </Row>

              <FormattedMessage id="editProfile.firstName" defaultMessage="First name">
                {placeholder => (
                  <Field
                    name="forename"
                    type="text"
                    placeholder={placeholder}
                    component={StyledTextFieldReduxForm}
                  />
                )}
              </FormattedMessage>

              <FormattedMessage id="editProfile.lastName" defaultMessage="Last name">
                {placeholder => (
                  <Field
                    name="surname"
                    type="text"
                    placeholder={placeholder}
                    component={StyledTextFieldReduxForm}
                  />
                )}
              </FormattedMessage>

              <Row>
                <AboutMe>About Me</AboutMe>
                <Field name="aboutMe" component={AboutMeInput} maxChars={aboutMeMaxChars} />
              </Row>

              {/* tabIndex is required on the button in order for e.relatedTarget to work */}
              <StyledButton1
                disabled={!valid || asyncValidating !== false || submitting}
                onClick={submit}
                tabIndex={0}
                innerRef={ref => (ref ? (this.primaryButton = ref) : null)}
                data-test-id="save-changes"
              >
                <FormattedMessage id="edit_profile.save" defaultMessage="Save Changes" />
              </StyledButton1>
            </Elements>
          </Section>
        </StyledSectionWrapper>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  memberId: getMemberId(state),
  initialValues: {
    forename: getForename(state),
    surname: getSurname(state),
    aboutMe: getAboutMe(state),
    avatarUrl: getAvatar(state),
  },
  targetDevice: getTargetDevice(state),
});

export default compose(
  connect(mapStateToProps),
  withRequest({
    requestIdAlias: 'memberId',
    requestAction: fetchMemberProfile,
  }),
  withRouter,
  reduxForm({
    form: 'editProfile',
    enableReinitialize: true,
    async onSubmit({ avatarUrl, forename, surname, aboutMe }, dispatch, { memberId, history }) {
      try {
        await dispatch(
          updateMemberProfile(memberId, {
            avatarUrl,
            forename,
            surname,
            aboutMe,
          })
        );
        history.push('/profile');
      } catch (e) {
        console.warn('Failed');
        console.warn(e.message);
      }
    },
    validate: values => ({
      ...signupFormValidation.firstname('forename', values),
      ...signupFormValidation.lastname('surname', values),
      ...appFormValidation.maxChars('aboutMe', values, aboutMeMaxChars),
    }),
  })
)(EditProfile);
