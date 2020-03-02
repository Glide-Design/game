import React from 'react';
import styled from 'styled-components';
import { CoreDevices } from '../../../common/dimensions';
import { Body10, Body1 } from '../../../common/typography';
import Quote from '../../../common/icons/Quote';

const StyledParagaph = styled.p`
  ${Body1};
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    ${Body10};
  }
  margin: 24px 0;
`;

const StyledFigure = styled.figure`
  text-align: center;
`;

const StyledQuoteContainer = styled(StyledParagaph)`
  & > * {
    display: inline;
  }
`;

const StyledQuote = styled(Quote)`
  width: 42px;
  height: 39px;
  color: #00ff00;
  margin-right: 8px;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    margin-right: 30px;
  }
`;

export default {
  p: children => key => <StyledParagaph key={key}>{children}</StyledParagaph>,
  strong: children => key => <strong key={key}>{children}</strong>,
  figure: children => key => <StyledFigure key={key}>{children}</StyledFigure>,
  img: (children, { src }) => key => <img key={key} src={src} alt="Article" />,
  a: (children, { href }) => key => (
    <a key={key} href={href} target="_blank" style={{ textDecoration: 'underline' }}>
      {children}
    </a>
  ),
  h1: children => key => <h1 key={key}>{children}</h1>,
  h2: children => key => <h2 key={key}>{children}</h2>,
  h3: children => key => <h3 key={key}>{children}</h3>,
  br: children => key => <br key={key} />,
  ul: children => key => <ul key={key}>{children}</ul>,
  li: children => key => <li key={key}>{children}</li>,
  table: children => key => <table key={key}>{children}</table>,
  tbody: children => key => <tbody key={key}>{children}</tbody>,
  th: children => key => <th key={key}>{children}</th>,
  tr: children => key => <tr key={key}>{children}</tr>,
  td: children => key => <td key={key}>{children}</td>,
  em: children => key => <em key={key}>{children}</em>,
  blockquote: children => key => (
    <StyledQuoteContainer key={key}>
      <StyledQuote />
      {children}
    </StyledQuoteContainer>
  ),
  text: text => key => <React.Fragment key={key}>{text}</React.Fragment>,
};
