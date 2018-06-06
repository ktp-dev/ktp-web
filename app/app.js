import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { h } from 'react-hyperscript-helpers';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';
import { routes } from './constants';
import { Navigator, HomePage, Login, Logout } from './pages';
import { ConfigurationThunks } from './actions';
import { getUserMetadata } from './util/user';

// polyfill Promise for IE browsers
require('es6-promise').polyfill();

/* uncomment to view redux logs in console */
// import logger from 'redux-logger';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  reducers,
  undefined,
  compose(applyMiddleware(thunkMiddleware, middleware)),
);

window.s = store;

class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(ConfigurationThunks.loadConfiguration());
  }

  static getMetadata() {
    return getUserMetadata(store.getState().userState.data);
  }

  render() {
    const { should_logout } = this.props.configurationState.data;

    if (should_logout && localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
      window.location.reload();
    }

    if (!this.props.configurationState.fetched) {
      return h('div');
    }

    return h(
      ConnectedRouter,
      { history }, [
      h(Navigator, [
        h(Switch, [
          h(Route, {
            exact: true,
            path: routes.HOME,
            component: HomePage,
          }),
          h(Route, {
            exact: true,
            path: routes.LOGIN,
            render: () => {
              if (App.getMetadata().isLoggedIn) {
                return h(Redirect, { to: routes.HOME });
              }
              return h(Login);
            },
          }),
          h(Route, {
            exact: true,
            path: routes.LOGOUT,
            render: () => h(Logout),
          }),
          h(Route, { component: HomePage }),
        ]),
      ]),
    ]);
  }
}

function mapStateToProps(state) {
  return {
    configurationState: state.configurationState,
  };
}

const AppConn = connect(mapStateToProps)(App)

render(
  h(Provider, { store }, [h(AppConn)]),
  document.getElementById('app'),
);
