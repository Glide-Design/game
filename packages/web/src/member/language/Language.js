import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { compose } from 'lodash/fp';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import {
  getMemberId,
  getLanguage,
  // isAuthenticated,
  getForename,
  getSurname,
} from 'xi-core/member/selectors';
import { updateMemberProfile } from 'xi-core/member/actions';
import { appLanguagesList } from 'xi-core/member/languages';
import { Grey5, Grey15, Grey85 } from 'xi-core/colours';
import { CoreDevices, NAVBAR_HEIGHT_PX, TOOLBAR_HEIGHT_PX } from '../../common/dimensions';
import ProfileTopIcons from '../../profile/ProfileTopIcons';
import Settings from '../../profile/Settings';
import { SettingsMenuWrapper, SectionsWrapper } from '../styles';
import { getTargetDevice } from '../../state/app/selectors';

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

const Label = styled.label`
  font-size: 14px;
  font-weight: normal;
  color: ${Grey85};
`;
// const PreEditValue = styled.div`
//   font-size: 16px;
//   color: #b2b2b2;
//   margin-bottom: 20px;
// `;

const SelectContainer = styled.div`
  position: relative;
  margin-top: 20px;
  width: 100%;
  ${({ value, placeholder }) =>
    !placeholder || value !== ''
      ? ''
      : `
    &:before {
      content: '${placeholder}';
      left: 14px;
      top: 20px;
      position: absolute;
      color: #aaa;
      font-size: 10px;
      pointer-events: none;
    }
  `};

  &:after {
    content: '';
    border: solid #8d8d8d;
    border-width: 0 2px 2px 0;
    padding: 4px;
    transform: rotate(45deg);
    right: 20px;
    top: 16px;
    position: absolute;
    pointer-events: none;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 47px;
  background-color: #f7f7f7;
  border: 0;
  border-bottom: solid 1px ${Grey15};
  font-size: 16px;
  color: ${Grey85};
  padding-right: 14px;
  padding-left: 8px;
  border-radius: 0;

  /* Hide down arrow */
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  option {
    color: #000;
  }
`;

class Language extends React.Component {
  state = {
    editMode: false,
    user: {
      language: null,
    },
  };

  // componentDidMount() {
  //   // const { history, isAuthenticated } = this.props;
  //   // if (!isAuthenticated) {
  //   //   history.replace(routes.settings.path);
  //   // }
  // }

  onLanguageChange = value => {
    const { updateMemberProfile, memberId, forename, surname } = this.props;

    updateMemberProfile(memberId, {
      language: value,
      forename,
      surname,
    });
  };

  render() {
    const { targetDevice, language } = this.props;
    const largeDevice = targetDevice === 'large';

    return (
      <Container>
        {!largeDevice && (
          <StyledProfileTopIcons
            fixedTopBackground={0}
            hideBackButton={false}
            fullName={
              <FormattedMessage id="language.countryAndLanguage" defaultMessage="Language" />
            }
          />
        )}
        {largeDevice ? (
          <SettingsMenuWrapper>
            <Settings wrapped={true} active="language" />
          </SettingsMenuWrapper>
        ) : null}
        <SectionsWrapper largeDevice={largeDevice}>
          <Section largeDevice={largeDevice}>
            {/*<Label>
              <FormattedMessage id="language.country" defaultMessage="Country" />
            </Label>*/}
            {/*<PreEditValue>{country}</PreEditValue>*/}
            <Label>
              <FormattedMessage id="language.language" defaultMessage="Language" />
            </Label>
            <SelectContainer value={language} placeholder={'Language'}>
              <StyledSelect value={language} onChange={e => this.onLanguageChange(e.target.value)}>
                {appLanguagesList().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.display}
                  </option>
                ))}
              </StyledSelect>
            </SelectContainer>
          </Section>
        </SectionsWrapper>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  memberId: getMemberId(state),
  targetDevice: getTargetDevice(state),
  language: getLanguage(state),
  // isAuthenticated: isAuthenticated(state),
  forename: getForename(state),
  surname: getSurname(state),
});

const mapDispatchToProps = dispatch => ({
  updateMemberProfile: (memberId, values) => dispatch(updateMemberProfile(memberId, values)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
  // withRouter
)(Language);
