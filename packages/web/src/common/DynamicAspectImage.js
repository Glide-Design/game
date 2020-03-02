import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import getSourcesByRatio from './getSourcesByRatio';
import SrcSetImage from './SrcSetImage';

const StyledSrcSetImage = styled(SrcSetImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

class DynamicAspectImage extends React.Component {
  setSrcSetImg = ref => {
    if (!this.srcSetImg && ref) {
      this.srcSetImg = ref;
      this.forceUpdate();
    }
  };

  render() {
    let imageRatioDecimal = null;

    if (this.srcSetImg) {
      const img = this.srcSetImg.getImageRef();
      if (img) {
        const imgHeight = img.clientHeight;
        const imgWidth = img.clientWidth;
        // Return ratio dependant on orientation
        imageRatioDecimal = imgWidth / imgHeight;
      }
    }

    const { creatives, usageTypes, className, width, height, loaded } = this.props;

    return (
      <StyledSrcSetImage
        innerRef={this.setSrcSetImg}
        imgSources={getSourcesByRatio({
          creatives: creatives,
          targetRatio: imageRatioDecimal,
          usageTypes: usageTypes,
        })}
        className={className}
        width={width}
        height={height}
        loaded={loaded}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    // Listening to this will cause a rerender even though
    // it is not being used in render(). This means we don't
    // need to attach a window resize event to this component.
    viewport: state.viewport,
  };
};

export default connect(
  mapStateToProps,
  null
)(DynamicAspectImage);
