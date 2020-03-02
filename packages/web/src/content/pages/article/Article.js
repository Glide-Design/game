import React, { Fragment } from 'react';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import styled from 'styled-components';
import withRequest from 'xi-core/withRequest';
import { fetchContentEntitlement } from 'xi-core/content/actions';
import { getTimestamp, getContentPartner, getTagType } from 'xi-core/content/selectors';
import withContentScrollInteractions from 'xi-core/content/withContentScrollInteractions';
import { addToViewCount } from 'xi-core/member/actions';
import { Grey85, Grey0 } from 'xi-core/colours';
import {
  CoreDevices,
  SIDE_MARGIN_PX,
  ROW_HEIGHT_PX,
  ContainerPaddingCss,
} from '../../../common/dimensions';
import SrcSetImage from '../../../common/SrcSetImage';
import FixedToolbarOnScroll from '../../../common/FixedToolbarOnScroll';
import getSourcesByRatio from '../../../common/getSourcesByRatio';
import DayAndTime from '../../../common/DayAndTime';
import Title from '../../components/Title';
import ContentInteractionFooter from '../../components/ContentInteractionFooter';
import MoreLikeThis from '../MoreLikeThis';
import PageContentInfo from '../PageContentInfo';
import DiscussionHighlights from '../DiscussionHighlights';
import Tag from '../../components/Tag';
import ArticleContent from './ArticleContent';
import ContentPartnerName from './ContentPartnerName';
import ContentPartnerLogo from './ContentPartnerLogo';

const ContentMaxWidth = 830;

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background: ${Grey0};
  color: ${Grey85};
  min-height: 91.5vh;
  margin-left: auto;
  margin-right: auto;
`;

const StyledSrcSetImage = styled(SrcSetImage)`
  display: block;
  width: 100%;
  max-width: calc(${ContentMaxWidth}px + (2 * ${SIDE_MARGIN_PX.large}px));
  margin-left: auto;
  margin-right: auto;
`;

const ArticleContainer = styled.div`
  overflow: hidden;
  max-width: ${ContentMaxWidth}px;
  background: #fff;
  & img {
    max-width: 100%;
  }
  padding-top: 20px;
  padding-bottom: 68px;
  ${ContainerPaddingCss};
  margin: 0 auto 40px;
`;

const StyledPageContentInfo = styled(PageContentInfo)`
  max-width: ${ContentMaxWidth}px;
  background: #fff;
  margin-left: auto;
  margin-right: auto;
`;

const StyledTitle = styled(Title)`
  position: relative;
  padding-top: 10px;
`;

const StyledDescription = styled.div`
  font-size: 14px;
  line-height: 1.43;
  margin: 20px 0 20px;
  @media ${CoreDevices.medium}, ${CoreDevices.large} {
    font-size: 16px;
    margin-bottom: 28px;
  }
`;

const StyledDayAndTime = styled(DayAndTime)`
  position: absolute;
  top: 0;
  margin-bottom: 30px;
  align-self: flex-end;
`;

const Sections = styled.div`
  & > * {
    position: relative;
    padding-top: ${ROW_HEIGHT_PX * 3}px;
    @media ${CoreDevices.medium} {
      padding-top: ${ROW_HEIGHT_PX * 6.5}px;
    }
    @media ${CoreDevices.large} {
      padding-top: 62px;
    }
  }
`;

const ArticleContentContainer = styled.div`
  margin: 0 auto 50px;
`;

const StyledTag = styled(Tag)`
  align-self: flex-start;
`;

class Article extends React.Component {
  componentDidMount() {
    const { contentId, addToViewCount } = this.props;
    addToViewCount(contentId);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    const { contentId, addToViewCount } = this.props;

    if (prevProps.contentId !== contentId) {
      addToViewCount(contentId);
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll = () => {
    const scrollOffset =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const contentHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;

    this.props.handleScroll(scrollOffset, contentHeight);
  };

  render() {
    const { contentId, content, timestamp, contentPartner = {}, tagType } = this.props;

    if (!content) {
      return '';
    }

    return (
      <Container>
        <FixedToolbarOnScroll />
        <StyledSrcSetImage imgSources={getSourcesByRatio(content.creatives, 16 / 9)} />
        <StyledPageContentInfo
          timestamp={<StyledDayAndTime timestamp={timestamp} />}
          title={<StyledTitle truncate={false}>{content.title}</StyledTitle>}
          description={<StyledDescription>{content.description}</StyledDescription>}
          contentPartnerName={<ContentPartnerName contentPartner={contentPartner} />}
          tag={<StyledTag whiteBackground tagType={tagType} />}
          icon={
            contentPartner.logoUrl ? <ContentPartnerLogo contentPartner={contentPartner} /> : null
          }
          contentId={contentId}
        />

        <ArticleContainer>
          <DiscussionHighlights contentId={contentId} article={true} />
          <Fragment>
            <ArticleContentContainer>
              <ArticleContent contentId={contentId} />
            </ArticleContentContainer>
            <ContentInteractionFooter contentId={contentId} />
          </Fragment>
        </ArticleContainer>
        <Sections>
          <MoreLikeThis contentId={contentId} />
        </Sections>
      </Container>
    );
  }
}

export default compose(
  connect(
    (state, { contentTypeName, contentId }) => ({
      tagType: getTagType(state)(contentTypeName, contentId),
      timestamp: getTimestamp(state)(contentId),
      contentPartner: getContentPartner(state)(contentId),
    }),
    dispatch => ({
      addToViewCount: contentId => dispatch(addToViewCount(contentId)),
    })
  ),
  withRequest({
    requestIdAlias: 'contentId',
    requestAction: fetchContentEntitlement,
  }),
  withContentScrollInteractions()
)(Article);
