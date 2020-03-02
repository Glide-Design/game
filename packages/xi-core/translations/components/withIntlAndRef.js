import React, { forwardRef } from 'react';
import { injectIntl } from 'react-intl';

function withIntlAndRef(Component) {
  class Wrapper extends React.Component {
    render() {
      const { innerRef, ...props } = this.props;
      return <Component ref={innerRef} {...props} />;
    }
  }
  const IntlWrapper = injectIntl(Wrapper);
  return forwardRef((props, ref) => <IntlWrapper {...props} innerRef={ref} />);
}

export default withIntlAndRef;
