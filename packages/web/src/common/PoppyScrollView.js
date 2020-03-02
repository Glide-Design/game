import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { CoreDevices, HelperDevices, SIDE_MARGIN_PX } from '../common/dimensions';
import Gradients from '../content/components/Gradients';
import DynamicAspectImage from '../common/DynamicAspectImage';
import { LinearGradient } from '../content/components/Gradients';
import { getViewportWidth } from '../state/app/selectors';

const PoppyScrollCustomMedia = {
  mobilePortraitTall: `(${HelperDevices.belowMediumPortrait}) + ' AND (min-height: 668px)`,
  mobilePortraitRegular: `(${HelperDevices.belowMediumPortrait}) + ' AND (max-height: 667px)`,
};

const AppIsLaunchedFromHomeScreen = window.matchMedia('(display-mode: standalone)').matches
  ? true
  : false;

const BrowserToolbarsPresent = AppIsLaunchedFromHomeScreen;

const Background = styled.div`
  background: #0b0b0b;
  position: relative;
`;

const HeadlineContainer = styled.div`
  position: relative;

  @media ${CoreDevices.large} {
    height: 648px;
  }

  @media ${CoreDevices.medium} {
    height: 748px;
  }

  @media ${HelperDevices.belowMediumPortrait} {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
  }

  @media ${HelperDevices.belowMediumLandscape} {
    height: 380px;
  }
`;

const HeadlineElements = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  color: #fff;
  @media ${HelperDevices.belowMedium} {
    bottom: 140px;
  }
  ${
    BrowserToolbarsPresent
      ? `
  @media ${PoppyScrollCustomMedia.mobilePortraitRegular} {
    bottom: 170px;
  }
  @media ${PoppyScrollCustomMedia.mobilePortraitTall} {
    bottom: 240px;
  }
    `
      : `
  @media ${PoppyScrollCustomMedia.mobilePortraitRegular} {
    bottom: 260px;
  }
  @media ${PoppyScrollCustomMedia.mobilePortraitTall} {
    bottom: 320px;
  }
  `
  }
  @media ${CoreDevices.medium} {
    bottom: 147px;
  }

  @media ${CoreDevices.large} {
    bottom: 112px;
  }
`;

const StyledLinearGradient = styled(LinearGradient)`
  height: 100%;
  background: linear-gradient(to bottom, rgba(11, 11, 11, 0), #0b0b0b);
`;

const ContentItemsWrapper = styled.div`
  @media ${HelperDevices.belowMediumPortrait} {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: calc(80vh - 100px);
    transition: all 0.35s;
    transition-timing-function: cubic-bezier(0.31, 0.07, 0.34, 1.28);
    transform-origin: center 0;
    will-change: transform;
    &.shrunk {
      transform: translateY(20vh) scale(${({ scale }) => scale});
    }
    &.normal {
      transform: scale(1);
    }
  }

  ${BrowserToolbarsPresent
    ? `
    @media ${PoppyScrollCustomMedia.mobilePortraitRegular} {
       margin-top: calc(80vh - 130px);
    }

    @media ${PoppyScrollCustomMedia.mobilePortraitTall} {
       margin-top: calc(80vh - 180px);
    }
    `
    : `
    @media ${PoppyScrollCustomMedia.mobilePortraitRegular} {
       margin-top: calc(80vh - 220px);
    }

    @media ${PoppyScrollCustomMedia.mobilePortraitTall} {
       margin-top: calc(80vh - 280px);
    }
  `};
`;

class PoppyScrollView extends React.Component {
  state = {
    shrunk: this.getScrollTop() <= 0,
  };

  componentDidMount = () => {
    window.addEventListener('scroll', this.bodyScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.bodyScroll);
  };

  getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  bodyScroll = () => {
    this.setState({
      shrunk: this.getScrollTop() <= 0,
    });
  };

  render() {
    const { items, viewportWidth, headlineCreatives, headlineElements } = this.props;

    const scale = 1 - (SIDE_MARGIN_PX.small * 2) / viewportWidth;

    return (
      <Background>
        <HeadlineContainer>
          <Gradients>
            <DynamicAspectImage creatives={headlineCreatives} />
          </Gradients>
          <StyledLinearGradient />
          <HeadlineElements>{headlineElements}</HeadlineElements>
        </HeadlineContainer>
        <ContentItemsWrapper className={this.state.shrunk ? 'shrunk' : 'normal'} scale={scale}>
          {items}
        </ContentItemsWrapper>
      </Background>
    );
  }
}

const mapStateToProps = state => ({
  viewportWidth: getViewportWidth(state),
});

export default connect(
  mapStateToProps,
  null
)(PoppyScrollView);
