import React, { Fragment } from 'react';
import styled from 'styled-components';
import { CoreDevices } from '../../common/dimensions';
import { Body1, Body10, H2 } from '../../common/typography';
import Price from './Price';
import TickIcon from './TickIcon';

const ProductTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  ${H2};
`;

const Option = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 24px 0;
  > :first-child {
    margin-right: 20px;
  }
`;

const StyledTickIcon = styled(TickIcon)`
  width: 20px;
`;

// const Line1 = styled.h4`
//   ${H4};
//   @media ${CoreDevices.medium}, ${CoreDevices.large} {
//     ${H2};
//   }
// `;

const Line2 = styled.div`
  // margin-top: 8px;
  ${Body1};

  @media ${CoreDevices.large} {
    ${Body10};
  }
`;

const Description = styled.div`
  margin-top: 15px;
`;

export const ProductTitle = ({ product, price, icon }) => (
  <Fragment>
    <ProductTitleContainer>
      <div>
        {product.name}
        {price && (
          <span>
            <br />
            <Price price={price} />
          </span>
        )}
      </div>
      {icon}
    </ProductTitleContainer>
    <Description>{product.description}</Description>
  </Fragment>
);

export const ProductOptions = ({ product }) => (
  <React.Fragment>
    {(product.offerFeatures || []).map((feature, j) => (
      <Option key={j + product.externalId}>
        <div>
          <StyledTickIcon />
        </div>
        <div>
          {/*<Line1>{feature.name}</Line1>*/}
          <Line2>{feature.description}</Line2>
        </div>
      </Option>
    ))}
  </React.Fragment>
);
