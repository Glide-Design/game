import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #000;
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: stretch;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  align-self: center;
`;

class TimelineImage extends React.PureComponent {
  render() {
    const { src, srcSet, sizes } = this.props;
    return (
      <Container>
        <StyledImage srcSet={srcSet} src={src} sizes={sizes} alt="content description" />
      </Container>
    );
  }
}

export default TimelineImage;
