import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { UnstyledButtonLink } from '../../common/buttons';
import getSourcesByRatio from '../../common/getSourcesByRatio';
import { CoreDevices } from '../../common/dimensions';

const Container = styled(UnstyledButtonLink)`
  box-sizing: content-box;
  text-align: ${({ textAlign }) => textAlign};
`;

const Image = styled.img`
  margin-top: 4px;
  max-width: 100%;
  max-height: 30px;
  @media ${CoreDevices.medium} {
    max-height: 34px;
  }
  @media ${CoreDevices.large} {
    max-height: 38px;
  }
`;

export default ({ className, creatives = [], alt = 'Partner', url, tile, card, contentDetail }) => {
  const sources = getSourcesByRatio({
    creatives,
    usageTypes: card || contentDetail ? ['Corporate logo'] : ['Signature'],
    transparentIfEmpty: false,
  });
  return sources.src ? (
    <Container
      className={className}
      onClick={url ? () => window.open(url, '_blank') : null}
      textAlign={card || contentDetail ? 'right' : 'left'}
    >
      <div>
        <FormattedMessage id="partner.presentedBy" defaultMessage="Presented By" />
      </div>
      <Image {...sources} alt={alt} />
    </Container>
  ) : null;
};
