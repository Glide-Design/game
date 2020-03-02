import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { addToViewCount } from 'xi-core/member/actions';
import { H1 } from '../../../common/typography';
import FixedFullScreenContainer from '../../../common/FixedFullScreenContainer';
import MediaCarousel from '../../../common/MediaCarousel';
import { ContainerPaddingCss } from '../../../common/dimensions';
import DynamicAspectImage from '../../../common/DynamicAspectImage';
import FixedToolbar from '../../../common/FixedToolbar';
import BackButton from '../../../common/BackButton';
import ContentInteractionFooter from '../../components/ContentInteractionFooter';
import Gradients from '../../components/Gradients';
import LoadingSpinner from '../LoadingSpinner';

const StyledContentInteractionFooter = styled(ContentInteractionFooter)`
  ${ContainerPaddingCss};
`;

const InteractionsContainer = styled.div`
  position: absolute;
  bottom: 25px;
  left: 0;
  width: 100%;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
`;

const Elements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  ${H1};
  ${ContainerPaddingCss};
  margin-top: auto;
  margin-bottom: 150px;
`;

class Gallery extends React.Component {
  componentDidMount() {
    this.props.addToViewCount();
  }

  render() {
    const { content, contentId } = this.props;

    return (
      <Fragment>
        <FixedToolbar leftButton={<BackButton />} position="fixed" title={content.title} />
        <FixedFullScreenContainer fixedToolbarVisible>
          {!content ? (
            <LoadingSpinner />
          ) : (
            <Fragment>
              <MediaCarousel
                items={[
                  <Slide key={1}>
                    <Gradients>
                      <DynamicAspectImage creatives={content.creatives} />
                    </Gradients>
                    <Elements>
                      <Title>{content.title}</Title>
                    </Elements>
                  </Slide>,
                ]}
                hideTimestamp={true}
              />
              <InteractionsContainer>
                <StyledContentInteractionFooter contentId={contentId} />
              </InteractionsContainer>
            </Fragment>
          )}
        </FixedFullScreenContainer>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, { contentId }) => ({
  addToViewCount: () => dispatch(addToViewCount(contentId)),
});

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(Gallery);
