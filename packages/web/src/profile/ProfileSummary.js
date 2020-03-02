import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { getName, getAboutMe, getMyTeams, getCity, getFlag } from 'xi-core/member/selectors';
import styled from 'styled-components';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import { userProfileCtaAction } from 'xi-core/member/actions';
import EditNoSquareIcon from '../common/icons/EditNoSquare';
import { Body1, H2, H3, H5 } from '../common/typography';
import { ContainerPaddingCss, CoreDevices } from '../common/dimensions';
import { routes } from '../App';
import ProfileAvatar from './ProfileAvatar';

const ProfileSummary = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  position: relative;

  > div {
    position: relative;
    z-index: 1;
  }
`;

const ContentsWrapper = styled.div`
  ${ContainerPaddingCss};
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  margin-bottom: 30px;
`;

const Name = styled.span`
  ${H5};
  word-spacing: 100vw;
  color: #000;
  font-size: 40px;
  line-height: 40px;
`;

const AboutMeContainer = styled.div`
  color: black;
  > span {
    ${Body1};
  }

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    margin: 30px 0;
  }
`;

const AboutMe = styled.div`
  ${H2};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${H3};
  }
  margin-bottom: 20px;
`;

const ContentsRow = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;

  > div:first-child {
    flex: 1;
  }
`;

const StyledLink = styled(Link)`
  float: right;
  position: relative;
  top: 20px;
`;

const mapStateToProps = state => ({
  name: getName(state),
  aboutMe: getAboutMe(state),
  myTeams: getMyTeams(state),
  city: getCity(state),
  flag: getFlag(state),
});

const mapDispatchToProps = dispatch => ({
  editProfileClicked: () =>
    dispatch(userProfileCtaAction(PropertyKeys.USER_PROFILE_ACTION.EDIT_PROFILE)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ name, aboutMe, editProfileClicked }) => (
  <ProfileSummary>
    <div>
      <Row>
        <ContentsWrapper>
          <ProfileAvatar />
          <ContentsRow>
            <div>
              <Name>{name}</Name>
              <StyledLink
                data-test-id="edit-profile"
                to={routes.editProfile.path}
                onClick={() => editProfileClicked()}
              >
                <EditNoSquareIcon />
              </StyledLink>
            </div>
          </ContentsRow>
        </ContentsWrapper>
      </Row>
      {/* <Row>
        <SimpleDivider />
      </Row> */}
      <Row>
        <ContentsWrapper>
          <AboutMeContainer>
            <AboutMe>
              <FormattedMessage id="profileSummary.aboutMe" defaultMessage="About me" />
            </AboutMe>
            <span>
              {aboutMe || (
                <FormattedMessage
                  id="profileSummary.tellUsAbout"
                  defaultMessage="Tell us about yourself. Who's your favourite player? Who do you support? Why do you love football? Tell us everything. "
                />
              )}
            </span>
          </AboutMeContainer>
        </ContentsWrapper>
      </Row>
    </div>
  </ProfileSummary>
));
