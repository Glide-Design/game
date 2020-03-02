import React from 'react';
import styled from 'styled-components';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';
import { Grey5, Grey85 } from 'xi-core/colours';
import { CoreDevices, SIDE_MARGIN_PX, ContainerPaddingCss } from '../../common/dimensions';
import { BulletTitleContainer } from '../../common/BulletTitle';
import SimpleDivider from '../../common/SimpleDivider';
import Delete from '../../common/icons/Delete';
import Title from '../components/Title';

const Container = styled.div`
  background: #fff;
`;

const LoadMoreContainer = styled.div`
  overflow: hidden;
  padding-bottom: 40px;
  padding-top: 6px;

  @media ${CoreDevices.large} {
    display: flex;
    flex-wrap: wrap;
  }
`;

const StyledTitleContainer = styled(BulletTitleContainer)`
  height: auto;
  position: relative;
  margin-bottom: 25px;
  ${ContainerPaddingCss};
`;

const ListItemWrapper = styled.div`
  padding: 0 ${SIDE_MARGIN_PX.small}px;
  box-sizing: border-box;

  @media ${CoreDevices.medium} {
    padding: 0 ${SIDE_MARGIN_PX.medium}px;
  }

  @media ${CoreDevices.large} {
    padding: 0 ${SIDE_MARGIN_PX.large}px 33px;
    flex: 1 1 50%;
    max-width: 50%;
  }
`;

const StyledSimpleDivider = styled(SimpleDivider)`
  margin: 15px 0;
  @media ${CoreDevices.large} {
    display: none;
  }
`;

const SwipeIconWrapper = styled.div`
  width: 156px;
  text-align: center;
  background-color: #ff2f4b;
  color: #fff;

  svg {
    width: 60px;
  }
`;

const StyledDelete = styled(Delete)`
  width: 24px;
  height: 34px;
`;

const swipeOutStyle = { backgroundColor: '#ff2f4b', color: 'white' };

class CardSection extends React.Component {
  // state = {
  //   showMoreEpisodes: false,
  // };

  render() {
    const { items, className, title } = this.props;

    // let loadMoreInSeriesButton = true;
    // if (
    //   (episodesInCurrentSeason.length <= 4 && window.matchMedia(CoreDevices.large).matches) ||
    //   (episodesInCurrentSeason.length <= 3 && window.matchMedia(CoreDevices.medium).matches) ||
    //   (episodesInCurrentSeason.length <= 2 && window.matchMedia(HelperDevices.belowMedium).matches)
    //   (episodesInCurrentSeason.length <= 3 && window.matchMedia(HelperDevices.belowMediumLandscape).matches) ||
    // ) {
    //   loadMoreInSeriesButton = false;
    // }

    if (!items.length) {
      return null;
    }

    return (
      <Container className={className}>
        {title && (
          <StyledTitleContainer colour={Grey85}>
            <Title>{title}</Title>
          </StyledTitleContainer>
        )}
        <LoadMoreContainer hiding={false /*!this.state.showMoreEpisodes*/}>
          {items.map((item, i) => {
            const { swipeAction, item: contentItem } = item.props;

            return (
              <React.Fragment key={i}>
                {swipeAction ? (
                  <Swipeout
                    ref="swipeout"
                    autoClose={true}
                    right={[
                      {
                        text: (
                          <SwipeIconWrapper>
                            <StyledDelete />
                          </SwipeIconWrapper>
                        ),
                        onPress: () => swipeAction(contentItem.externalId),
                        style: swipeOutStyle,
                      },
                    ]}
                  >
                    <ListItemWrapper>{item}</ListItemWrapper>
                  </Swipeout>
                ) : (
                  <ListItemWrapper>{item}</ListItemWrapper>
                )}
                {i < items.length - 1 && <StyledSimpleDivider color={Grey5} />}
              </React.Fragment>
            );
          })}
        </LoadMoreContainer>
        {/*loadMoreInSeriesButton &&
          !this.state.showMoreEpisodes && (
            <ShowMoreButton onClick={() => this.setState({ showMoreEpisodes: true })}>
              <FormattedMessage
                id="content.loadMoreSeason"
                defaultMessage="load more in this season"
              />
              <img src="/images/down-icon.svg" alt="" />
            </ShowMoreButton>
          )*/}
      </Container>
    );
  }
}

export default CardSection;
