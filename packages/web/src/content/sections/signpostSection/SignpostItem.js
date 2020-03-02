import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, first } from 'lodash/fp';
import withRequest from 'xi-core/withRequest';
import { PropertyKeys } from 'xi-core/analytics/analyticEvents';
import { fetchSectionItems } from 'xi-core/content/actions';
import { getSectionItems } from 'xi-core/content/selectors';
import { contentTypes } from 'xi-core/content/contentTypes';
import { discoveryPageInteraction } from 'xi-core/content/actions';
import { ContainerPaddingCss, CoreDevices, HelperDevices } from '../../../common/dimensions';
import { getTargetDevice } from '../../../state/app/selectors';
import { CtaButton } from '../../../common/buttons';
import { H3 } from '../../../common/typography';
import Gradients from '../../components/Gradients';
import DynamicAspectImage from '../../../common/DynamicAspectImage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${ContainerPaddingCss};
  margin: 0;
  position: relative;
  height: 221px;

  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    height: 480px;
    justify-content: flex-start;
  }
`;

const SignpostLink = styled(Link)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
`;

const Heading = styled.h2`
  ${H3};
  text-align: center;
  @media ${HelperDevices.belowMedium} {
    font-size: 24px;
  }
`;

const StyledCtaButton = styled(CtaButton)`
  margin-bottom: 18px;
  @media ${HelperDevices.belowMedium} {
    margin-bottom: 4px;
  }
`;

const SignpostItem = ({ signPostClicked, loaded, items }) => {
  if (!items.length) {
    return null;
  }

  const signpost = first(items);

  const redirectTo = `/content-index/${signpost.externalId}`;
  const { creatives, title: heading, description: ctaText } = signpost;

  return (
    <Container>
      <Gradients>
        <DynamicAspectImage creatives={creatives} loaded={loaded} />
      </Gradients>
      <SignpostLink
        to={redirectTo}
        style={{ WebkitTapHighlightColor: 'transparent' }}
        data-test-id="signpost-link"
        onClick={signPostClicked}
      >
        <Heading>{heading}</Heading>
        <StyledCtaButton contentType={contentTypes.ARTICLE} iconSide={'right'}>
          {ctaText}
        </StyledCtaButton>
      </SignpostLink>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    targetDevice: getTargetDevice(state),
  };
};

const mapDispatchToProps = dispatch => ({
  signPostClicked: () =>
    dispatch(discoveryPageInteraction(PropertyKeys.DISCOVERY_INTERACTIONS.SIGN_POST_CTA)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRequest({
    requestIdAlias: 'sectionId',
    requestAction: fetchSectionItems,
    responseSelector: getSectionItems,
    responseAlias: 'items',
    requestCondition: ({ responseData = [] }) => !responseData.length,
  })
)(SignpostItem);
