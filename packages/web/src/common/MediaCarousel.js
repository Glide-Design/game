import React from 'react';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';

const CarouselContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;

  .slider {
    height: 100% !important;
  }
  .slider-frame {
    height: 100% !important;
  }
  .slider-list {
    height: 100% !important;
    width: 100% !important;
  }
  .slider-slide {
    height: 100% !important;
    width: 100% !important;
  }

  .slider-control-centerright,
  .slider-control-centerleft {
    display: none;
  }

  .slider-control-bottomcenter {
    ${({ itemCount }) => (itemCount > 1 ? '' : 'display: none;')} padding: 0;
    bottom: 50px !important;

    ul {
      top: 0 !important;
    }

    button {
      font-size: 30px !important;
      padding: 0 8px !important;
      line-height: 15px;
      height: 20px;
      outline: none;
      opacity: 1 !important;
      color: #6b6b6b !important;
    }
    ul > li:nth-child(${({ currentSlide }) => currentSlide}) {
      button {
        color: #ffffff !important;
      }
    }
  }
`;

export default class MediaCarousel extends React.Component {
  state = { slideIdx: 0 };

  render() {
    const { items = [], afterSlide, carouselProps = {}, autoplay = false } = this.props;
    return (
      <CarouselContainer itemCount={items.length} currentSlide={this.state.slideIdx + 1}>
        <Carousel
          {...carouselProps}
          autoplay={autoplay}
          speed={200}
          wrapAround
          afterSlide={slideIdx => {
            this.setState({ slideIdx });
            afterSlide && afterSlide(slideIdx);
          }}
        >
          {items}
        </Carousel>
      </CarouselContainer>
    );
  }
}
