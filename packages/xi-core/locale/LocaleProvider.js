import React from 'react';
import { connect } from 'react-redux';
// TODO 2019-02-18
// This is currently installed from
// "git+https://github.com/DragonRaider5/react-intl.git#feature/new-context-api",
// as soon as https://github.com/yahoo/react-intl/pull/1186 is merged and released
// switch back to the main repo
import { IntlProvider } from 'react-intl';
import { getLanguage, getMessages } from './selectors';

class LocaleProvider extends React.Component {
  shouldComponentUpdate(newProps) {
    const currentLanguage = this.props.language;
    const newLanguage = newProps.language;

    return currentLanguage !== newLanguage || !Object.keys(this.props.messages || {}).length;
  }

  render() {
    const { language, messages, children, textComponent } = this.props;
    return language != null ? (
      <IntlProvider
        locale={language}
        messages={messages}
        textComponent={textComponent}
      >
        {children}
      </IntlProvider>
    ) : null;
  }
}

const mapStateToProps = state => ({
  language: getLanguage(state),
  messages: getMessages(state),
});

export default connect(mapStateToProps)(LocaleProvider);
