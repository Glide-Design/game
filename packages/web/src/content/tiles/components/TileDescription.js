import React from 'react';
import styled from 'styled-components';
import { Body1, Body10 } from '../../../common/typography';
import { CoreDevices, SIDE_MARGIN_PX, ContainerPaddingCss } from '../../../common/dimensions';
import TruncateMultiline from '../../../common/TruncateMultiline';

const Description = styled.div`
  ${Body1};
  ${TruncateMultiline({ width: '85%', linesToShow: 1, lineHeight: 1.43, fontSize: '14px' })};
  ${ContainerPaddingCss};

  @media ${CoreDevices.medium} {
    ${Body10};
    ${TruncateMultiline({ width: '69%', linesToShow: 1, lineHeight: 1.4, fontSize: '18px' })};
  }
  @media ${CoreDevices.large} {
    ${Body10};
    ${TruncateMultiline({ width: '69%', linesToShow: 1, lineHeight: 1.4, fontSize: '18px' })};
  }
`;

const DescriptionInset = styled(Description)`
  @media ${CoreDevices.medium} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
    ${Body1};
  }
  @media ${CoreDevices.large} {
    padding: 0 ${SIDE_MARGIN_PX.small}px;
    ${Body1};
  }
`;

export default ({ className, inset, children }) =>
  inset ? (
    <DescriptionInset className={className}>{children}</DescriptionInset>
  ) : (
    <Description className={className}>{children}</Description>
  );
