import React from 'react';
import styled from 'styled-components';
import { ROW_HEIGHT_PX } from '../../common/dimensions';

export const THUMBNAIL_WIDTH = 9 * ROW_HEIGHT_PX;
export const THUMBNAIL_HEIGHT = 12 * ROW_HEIGHT_PX;

const ThumbnailContainer = styled(({ width, ...rest }) => <div {...rest} />)`
  height: ${THUMBNAIL_HEIGHT}px;
  width: ${THUMBNAIL_WIDTH}px;
  padding: 4px;
  box-sizing: border-box;
  flex-shrink: 0;
  position: relative;
`;

const ImageBackground = styled.div`
  width: 100%;
  height: 100%;
  background: black;
`;

// uses attrs and style for performance reasons
const Image = styled(({ srcset, alt, scale, opacity, ...rest }) => (
  <img srcSet={srcset} alt={alt} {...rest} />
)).attrs({
  style: ({ scale, opacity, src }) => ({
    transform: `scale(${scale})`,
    opacity,
  }),
})`
  box-sizing: border-box;
  border: 2px solid white;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

class Thumbnail extends React.PureComponent {
  render() {
    const { scale, opacity, srcset, alt, style, onClick } = this.props;

    return (
      <ThumbnailContainer onClick={onClick} style={style}>
        {srcset ? (
          <ImageBackground>
            <Image
              srcset={srcset}
              alt={alt}
              sizes={`${THUMBNAIL_WIDTH}px`}
              scale={scale}
              opacity={opacity}
            />
          </ImageBackground>
        ) : null}
      </ThumbnailContainer>
    );
  }
}

export default Thumbnail;
