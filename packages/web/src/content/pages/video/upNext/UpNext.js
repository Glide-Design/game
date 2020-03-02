import React from 'react';
import { compose } from 'lodash/fp';
import styled from 'styled-components';
import { connect } from 'react-redux';
import withRequest from 'xi-core/withRequest';
import { Grey85 } from 'xi-core/colours';
import { fetchRelatedContentSection, contentDetailPageInteraction } from 'xi-core/content/actions';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';

import { getRelatedContent } from 'xi-core/content/selectors';
import { CoreDevices } from '../../../../common/dimensions';
import { FontFamily } from '../../../../common/typography';
import ExpandMoreIcon from '../../../../common/icons/ExpandMore';
import ExpandLessIcon from '../../../../common/icons/ExpandLess';
import UpNextList from './UpNextList';

const UpNextContainer = styled.div`
  background-color: #f2f2f2;
  position: relative;
  z-index: 1;
`;

const Title = styled.h3`
  ${FontFamily.bold}
  font-size: 16px;
  line-height: 40px
  color: ${Grey85};
  text-transform: uppercase;
  margin-left: 24px;
  padding-top: 9px;
  position: relative;
  @media ${CoreDevices.medium} {
    margin-left: 40px;
  }
  @media ${CoreDevices.large} {
    margin-left: 86px;
  }
`;

const UpNextTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  position: relative;
  cursor: pointer;
`;

const ListWrapper = styled.div`
  width: 100%;
  margin: auto 0;
  position: relative;
  height: ${({ open }) => (!open ? '0px' : '128px')};
  transition: all 0.6s ease;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    height: ${({ open }) => (!open ? '0px' : '173px')};
  }

  ${({ open }) => (!open ? 'height: 0px;' : '')}
  ${({ open }) => (open ? 'padding-bottom: 16px;' : 'padding-bottom: 0px;')}
`;

const ExpandIconContainer = styled.div`
  position: absolute;
  height: 100%;
  right: 24px;
  @media ${CoreDevices.medium} {
    right: 40px;
  }
  @media ${CoreDevices.large} {
    right: 40px;
  }
`;

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  position: absolute;
  top: 17px;
`;

const StyledExpandLessIcon = styled(ExpandLessIcon)`
  position: absolute;
  top: 15px;
`;

class UpNext extends React.Component {
  state = {
    open: false,
  };

  toggleUpNextView = () => {
    const { contentDetailPageInteraction } = this.props;

    if (this.state.open) {
      contentDetailPageInteraction(PropertyKeys.CONTENT_DETAIL_INTERACTIONS.UP_NEXT_WINDOWN_HIDE);
    } else {
      contentDetailPageInteraction(PropertyKeys.CONTENT_DETAIL_INTERACTIONS.UP_NEXT_WINDOW_REVEAL);
    }

    this.setState({ open: !this.state.open });
  };

  componentDidMount = () => {
    this.setState({ open: true });
  };

  render() {
    const { upNext } = this.props;

    if (!upNext.length) {
      return null;
    }

    return (
      <UpNextContainer>
        <UpNextTitleWrapper onClick={this.toggleUpNextView}>
          <Title>More Like This</Title>
          <ExpandIconContainer>
            {this.state.open ? <StyledExpandLessIcon /> : <StyledExpandMoreIcon />}
          </ExpandIconContainer>
        </UpNextTitleWrapper>
        <ListWrapper open={this.state.open}>
          <UpNextList items={upNext} />
        </ListWrapper>
      </UpNextContainer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  contentDetailPageInteraction: action =>
    dispatch(
      contentDetailPageInteraction({
        [action]: true,
      })
    ),
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withRequest({
    requestIdAlias: 'contentId',
    requestAction: fetchRelatedContentSection,
    responseSelector: getRelatedContent,
    responseAlias: 'upNext',
  })
)(UpNext);
