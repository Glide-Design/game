import React from 'react';
import { connect } from 'react-redux';
import { compose, identity } from 'lodash/fp';
import { defaultProps, branch, renderNothing } from 'recompose';
import scriptjs from 'scriptjs';
import {
  Elements,
  StripeProvider as ReactStripeProvider,
  injectStripe,
} from 'react-stripe-elements';
import { getLanguage } from 'xi-core/locale/selectors';
import { getStripeAPIKey } from '../../state/config/selectors';

let SDK_LOADED = false;

class StripeProvider extends React.Component {
  constructor(props) {
    super(props);
    // TODO Check if there is a global var works
    this.state = { stripeScriptLoaded: SDK_LOADED };

    if (!SDK_LOADED) {
      scriptjs('https://js.stripe.com/v3/', () => {
        SDK_LOADED = true;
        this.setState({ stripeScriptLoaded: true });
      });
    }
  }

  render() {
    if (!this.state.stripeScriptLoaded) {
      return null;
    }

    const { stripeKey, language, ComponentWithStripe, ...props } = this.props;
    return (
      <ReactStripeProvider apiKey={stripeKey}>
        {/* Stripe calls this `locale` but it's actually just the two-letter language code. See https://stripe.com/docs/stripe-js/reference#stripe-elements */}
        <Elements locale={language}>
          <ComponentWithStripe {...props} />
        </Elements>
      </ReactStripeProvider>
    );
  }
}

export default Component =>
  compose(
    defaultProps({
      ComponentWithStripe: injectStripe(Component),
    }),
    connect(state => ({
      stripeKey: getStripeAPIKey(state),
      language: getLanguage(state),
    })),
    branch(({ stripeKey }) => !stripeKey, renderNothing, identity)
  )(StripeProvider);
