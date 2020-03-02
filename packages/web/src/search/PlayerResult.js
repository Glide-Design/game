import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ThumbnailRound } from '../content/thumbnails';
import { CoreDevices } from '../common/dimensions';
import getSourcesByRatio from '../common/getSourcesByRatio';

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: inherit;
`;

const StyledThumbnail = styled(ThumbnailRound)`
  width: 80px;
  height: 80px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
  font-size: 10px;
  text-align: center;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    font-weight: bold;
  }
`;

export default ({ star: { starId, forename, surname, creatives }, onClick }) => (
  <StyledLink to={'/star/' + starId} data-test-id={`player-result-${starId}`} onClick={onClick}>
    <StyledThumbnail backgroundImgSources={getSourcesByRatio(creatives)} />
    <TitleContainer>
      {forename}
      {forename && surname ? <br /> : null}
      {surname}
    </TitleContainer>
  </StyledLink>
);
