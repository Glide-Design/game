import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'lodash/fp';
import { FormattedMessage } from 'react-intl';
import withLoadedFlag from 'xi-core/withLoadedFlag';
import { START_TIMELINE } from 'xi-core/stars/actions';
import { CoreDevices, SIDE_MARGIN_PX, ContainerPaddingCss } from '../../common/dimensions';
import { Button3 } from '../../common/buttons';
import Gradients from '../components/Gradients';
import DynamicAspectImage from '../../common/DynamicAspectImage';
import TileTitle from './components/TileTitle';
import DefaultBackground from './components/DefaultBackground';
import { TileContainerLink } from './components/TileContainer';

const StyledTileContainerLink = styled(TileContainerLink)`
  padding-top: 40px;
`;

const ButtonRow = styled.div`
  margin-bottom: 62px;
  margin-top: auto;
  @media ${CoreDevices.medium} {
    margin-bottom: 92px;
  }
  @media ${CoreDevices.large} {
    margin-bottom: 88px;
  }
  ${ContainerPaddingCss};
`;

const ButtonRowInset = styled(ButtonRow)`
  @media ${CoreDevices.medium} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
  }
  @media ${CoreDevices.large} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
  }
`;

const TimelineTile = ({
  containerInset,
  creatives,
  galleryId,
  match,
  loaded,
  loadingComplete,
  timelineStarted,
}) => {
  const title = <FormattedMessage id="timeline.myTimeline" defaultMessage="Career Gallery" />;
  return (
    <Fragment key={galleryId}>
      <DefaultBackground />
      <Gradients>
        <DynamicAspectImage creatives={creatives} loaded={loaded} />
      </Gradients>
      {loadingComplete ? (
        <StyledTileContainerLink
          to={`/star/${match.params.starId}/timeline/${galleryId}`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
          data-test-id="open-timeline"
          onClick={() => timelineStarted()}
        >
          {containerInset ? (
            <Fragment>
              <div>
                <TileTitle inset>{title}</TileTitle>
              </div>

              <ButtonRowInset>
                <Button3 inset>
                  <FormattedMessage
                    id="timeline.startTimeline"
                    defaultMessage="VIEW GALLERY"
                    data-test-id="view-gallery"
                  />
                </Button3>
              </ButtonRowInset>
            </Fragment>
          ) : (
            <Fragment>
              <div>
                <TileTitle>{title}</TileTitle>
              </div>

              <ButtonRow>
                <Button3>
                  <FormattedMessage
                    id="timeline.startTimeline"
                    defaultMessage="VIEW GALLERY"
                    data-test-id="view-gallery"
                  />
                </Button3>
              </ButtonRow>
            </Fragment>
          )}
        </StyledTileContainerLink>
      ) : null}
    </Fragment>
  );
};

export default compose(
  withRouter,
  connect(
    null,
    (dispatch, { match }) => ({
      timelineStarted: () => dispatch({ type: START_TIMELINE, starId: match.params.starId }),
    })
  ),
  withLoadedFlag()
)(TimelineTile);
