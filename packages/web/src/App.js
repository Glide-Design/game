import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';
import Loadable from 'react-loadable';
import { setConfig } from 'xi-core/config/actions';
import LocaleProvider from 'xi-core/locale/LocaleProvider';
import navPresenter from 'xi-core/navigation/NavigationPresenter';
import navTree from 'xi-core/navigation/NavigationTree';
import ErrorBoundary from 'xi-core/errors/ErrorBoundary';
import sanitizeEnvVars from 'xi-core/utils/sanitizeEnvVars';
import appRoutes from 'xi-core/app/routes';
import { LoadableProps } from './common/NetworkSlow';
import AppLayout from './app/Layout';
import WebBootstrap from './app/WebBootstrap';
import config from './config';
import ErrorPage from './errors/ErrorPage';
import store from './state/store';

const Discovery = Loadable({ loader: () => import('./discovery'), ...LoadableProps });
const Content = Loadable({ loader: () => import('./content/pages'), ...LoadableProps });
const PlayerIndex = Loadable({
  loader: () => import('./playerIndex'),
  ...LoadableProps,
});
const PlayerProfile = Loadable({
  loader: () => import('./playerProfile'),
  ...LoadableProps,
});
const PlayerProfileVanity = Loadable({
  loader: () => import('./playerProfile/Vanity'),
  ...LoadableProps,
});
const Search = Loadable({ loader: () => import('./search/Search'), ...LoadableProps });
const Language = Loadable({
  loader: () => import('./member/language'),
  ...LoadableProps,
});
// const Payments = Loadable({
//   loader: () => import('./member/payments'),
//   ...LoadableProps,
// });
const MyLocker = Loadable({
  loader: () => import('./member/myLocker'),
  ...LoadableProps,
});
const MyAccount = Loadable({
  loader: () => import('./member/myAccount'),
  ...LoadableProps,
});
const HelpInformation = Loadable({
  loader: () => import('./member/help'),
  ...LoadableProps,
});
// const UpdatePaymentMethod = Loadable({
//   loader: () => import('./member/payment/UpdatePaymentMethod'),
//   ...LoadableProps,
// });
// const Membership = Loadable({
//   loader: () => import('./member/membership'),
//   ...LoadableProps,
// });
const ContactPreferences = Loadable({
  loader: () => import('./member/contactPreferences'),
  ...LoadableProps,
});
const EditProfile = Loadable({
  loader: () => import('./member/editProfile'),
  ...LoadableProps,
});
const Profile = Loadable({
  loader: () => import('./profile/Profile'),
  ...LoadableProps,
});
const Settings = Loadable({
  loader: () => import('./profile/Settings'),
  ...LoadableProps,
});
const Timeline = Loadable({
  loader: () => import('./gallery/Timeline'),
  ...LoadableProps,
});
const JoinOtro = Loadable({
  loader: () => import('./signup/joinotro'),
  ...LoadableProps,
});
const Join = Loadable({ loader: () => import('./signup/join'), ...LoadableProps });
const SignIn = Loadable({ loader: () => import('./signup/signin'), ...LoadableProps });
const LoginCode = Loadable({ loader: () => import('./signup/loginCode'), ...LoadableProps });
const AuthRedirect = Loadable({
  loader: () => import('./signup/AuthRedirect'),
  ...LoadableProps,
});
// const Unlimited = Loadable({
//   loader: () => import('./purchases/unlimited'),
//   ...LoadableProps,
// });
const NoMatch = Loadable({
  loader: () => import('./app/NoMatch'),
  ...LoadableProps,
});

const AppLanding = Loadable({
  loader: () => import('./signup/appLanding'),
  ...LoadableProps,
});

const ContentIndex = Loadable({
  loader: () => import('./contentIndex'),
  ...LoadableProps,
});

store.dispatch(setConfig({ ...sanitizeEnvVars(config) }));

// export const deriveLanguageSettingToUse = language => {
//   let languageInLocalStorage = localStorage.getItem('language');
//   return languageInLocalStorage || language;
// };

export const routes = appRoutes();

navPresenter.convertAppRoutes(routes);
navPresenter.setTree(navTree);

export const redirectToJoinRoutes = [routes.profile, routes.editProfile];

export const skipCookieBarRoutes = [routes.joinotro.path, routes.appLanding.path];

class App extends React.Component {
  state = { didError: false };

  componentDidCatch(e) {
    this.setState({ didError: true });
  }

  render() {
    if (this.state.didError) {
      /* eslint-disable jsx-a11y/click-events-have-key-events */
      return (
        <p>
          An error occurred. Please{' '}
          <a role="button" onClick={() => window.location.reload()} tabIndex={-1}>
            reload
          </a>{' '}
          the page.
        </p>
      );
    }

    return (
      <Provider store={store}>
        <WebBootstrap>
          <LocaleProvider>
            <ErrorBoundary renderError={({ clearError }) => <ErrorPage clearError={clearError} />}>
              <Router>
                <Fragment>
                  <ScrollMemory />
                  <AppLayout>
                    <Switch>
                      <Route {...routes.contentIndex} component={ContentIndex} />
                      <Route {...routes.content} component={Content} />
                      <Route {...routes.profile} component={Profile} />
                      <Route {...routes.editProfile} component={EditProfile} />
                      <Route {...routes.joinotro} component={JoinOtro} />
                      <Route {...routes.join} component={Join} />
                      <Route {...routes.signin} component={SignIn} />
                      <Route {...routes.loginCode} component={LoginCode} />
                      {/* <Route {...routes.unlimited} component={Unlimited} /> */}
                      <Route {...routes.activate} component={AuthRedirect} />
                      <Route {...routes.invite} component={AuthRedirect} />
                      <Route {...routes.login} component={AuthRedirect} />
                      <Route {...routes.settings} component={Settings} />
                      <Route {...routes.search} component={Search} />
                      <Route {...routes.stars} component={PlayerIndex} />
                      <Route {...routes.timeline} component={Timeline} />
                      <Route {...routes.playerProfile} component={PlayerProfile} />
                      <Route {...routes.myLocker} component={MyLocker} />
                      <Route {...routes.myAccount} component={MyAccount} />
                      {/* <Route {...routes.updatePayment} component={UpdatePaymentMethod} /> */}
                      {/* <Route {...routes.membership} component={Membership} /> */}
                      {/* <Route {...routes.payments} component={Payments} /> */}
                      <Route {...routes.language} component={Language} />
                      <Route {...routes.help} component={HelpInformation} />
                      <Route {...routes.contactPreferences} component={ContactPreferences} />
                      <Route {...routes.appLanding} component={AppLanding} />
                      <Route
                        exact
                        {...routes.playerProfileVanity}
                        component={PlayerProfileVanity}
                      />
                      <Route exact {...routes.discovery} component={Discovery} />
                      <Route component={NoMatch} />
                    </Switch>
                  </AppLayout>
                </Fragment>
              </Router>
            </ErrorBoundary>
          </LocaleProvider>
        </WebBootstrap>
      </Provider>
    );
  }
}

export default App;
