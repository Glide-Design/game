import React from 'react';
import styled from 'styled-components';
import DynamicAspectImage from '../../common/DynamicAspectImage';
import { CoreDevices } from '../../common/dimensions';
import Gradients from '../../content/components/Gradients';
import DefaultBackground from './components/DefaultBackground';
import TileContainer from './components/TileContainer';
import TileTitle from './components/TileTitle';

const TextContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 80px;
  text-align: center;

  @media ${CoreDevices.medium} {
    bottom: 60px;
  }

  @media ${CoreDevices.small} {
    bottom: 50px;
  }

  @media ${CoreDevices.tiny} {
    bottom: 40px;
  }
`;

const Description = styled.div`
  color: #fff;
  font-size: 20px;
  margin-top: 10px;

  @media ${CoreDevices.medium} {
    font-size: 16px;
    margin-top: 8px;
  }

  @media ${CoreDevices.small} {
    font-size: 14px;
    margin-top: 6px;
  }

  @media ${CoreDevices.tiny} {
    font-size: 12px;
    margin-top: 4px;
  }
`;

const ContentIndexHeaderTile = ({ creatives, title, description, loaded }) => (
  <TileContainer>
    <DefaultBackground />
    <Gradients>
      <DynamicAspectImage creatives={creatives} loaded={loaded} />
    </Gradients>
    <TextContainer>
      <TileTitle>{title}</TileTitle>
      <Description>{description}</Description>
    </TextContainer>
  </TileContainer>
);

export default ContentIndexHeaderTile;
