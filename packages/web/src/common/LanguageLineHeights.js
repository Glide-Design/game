import { connect } from 'react-redux';
import { getLanguage } from 'xi-core/member/selectors';

const mapStateToProps = state => ({
  language: getLanguage(state),
});

export default connect(mapStateToProps)(({ children, language, lineHeights }) => {
  const lineHeight = lineHeights.hasOwnProperty(language)
    ? lineHeights[language]
    : lineHeights.default;

  return children({ lineHeight });
});
