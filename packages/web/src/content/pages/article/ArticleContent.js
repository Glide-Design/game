import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { get } from 'lodash/fp';
import htmlToReactParser from 'xi-core/content/htmlToReactParser';
import { fetchArticleData } from 'xi-core/content/actions';
import { getContentItemById, getContentUrl } from 'xi-core/content/selectors';
import withRequest from 'xi-core/withRequest';
import htmlStringTagReplacements from './htmlTagReplacements';
const domParser = new DOMParser();

const ArticleContent = ({ article }) =>
  htmlToReactParser(article, domParser, htmlStringTagReplacements);

export default compose(
  connect((state, { contentId }) => ({
    article: get('article', getContentItemById(state)(contentId)),
    contentUrl: getContentUrl(state)(contentId),
  })),
  withRequest({
    requestIdAlias: ['contentId', 'contentUrl'],
    requestAction: fetchArticleData,
  })
)(ArticleContent);
