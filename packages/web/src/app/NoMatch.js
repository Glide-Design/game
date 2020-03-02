import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { Grey85 } from 'xi-core/colours';
import { CoreDevices } from '../common/dimensions';
import { FixedFullScreenContainerWithNav } from '../common/FixedFullScreenContainer';
import { Body1, H3, H1 } from '../common/typography';
import { TopLogo } from '../discovery/Discovery';

const StyledFixedFullScreenContainerWithNav = styled(FixedFullScreenContainerWithNav)`
  background: ${Grey85};
  color: white;
  flex-direction: column;
  align-items: center;
`;

const TopLogoContainer = styled.div`
  height: 100px;
  @media ${CoreDevices.large} {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin: auto;
  max-width: 80%;
  & > * {
    margin-top: 40px;
  }
`;

const TitleText = styled.span`
  text-align: center;
  ${H3};
  @media ${CoreDevices.large} {
    ${H1};
  }
`;

const Description = styled.span`
  ${Body1};
`;

class NoMatch extends React.Component {
  unlisten;

  constructor(props) {
    super(props);
    this.unlisten = props.history.listen(this.resetWindow404OnRouteChange);
  }

  resetWindow404OnRouteChange = () => (window.is404 = false);

  componentWillUnmount = () => this.unlisten();

  render() {
    return (
      <StyledFixedFullScreenContainerWithNav id="serviceWorkerUpdatingScreen">
        <TopLogoContainer>
          <TopLogo />
        </TopLogoContainer>
        <Container>
          <TitleText>
            <FormattedMessage
              id="error404.pageNotFound"
              defaultMessage="Error 404 - Page not found"
            />
          </TitleText>
          <Description>
            <FormattedMessage
              id="error404.mightBeBecause"
              defaultMessage="This might be because:{reasons}"
              values={{
                reasons: (
                  <ul>
                    <li>
                      <FormattedMessage
                        id="error404.reasonTypedIncorrectly"
                        defaultMessage={'You have typed the web address incorrectly'}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        id="error404.reasonPageGone"
                        defaultMessage={
                          'The page you were looking for may have been moved, updated or deleted'
                        }
                      />
                    </li>
                  </ul>
                ),
              }}
            />
            <FormattedMessage
              id="error404.tryTheFollowing"
              defaultMessage="Please try the following options instead:{options}"
              values={{
                options: (
                  <ul>
                    <li>
                      <FormattedMessage
                        id="error404.useSearch"
                        defaultMessage={"Use OTRO search to see if it's available elsewhere"}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        id="error404.linksNavBars"
                        defaultMessage={'Try one of the links in the navigation bar'}
                      />
                    </li>
                  </ul>
                ),
              }}
            />
          </Description>
        </Container>
      </StyledFixedFullScreenContainerWithNav>
    );
  }
}

export default withRouter(NoMatch);
