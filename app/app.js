import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';

import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';
import { routes } from './constants';
import {
    Navigator,
    HomePage,
    Login,
    Logout,
    EditProfile,
    AdminPage
} from './pages';
import { ConfigurationThunks } from './actions';
import { connect } from 'react-redux';
import { getUserMetadata } from './util/user.js';

// polyfill Promise for IE browsers
require('es6-promise').polyfill();

/* uncomment to view redux logs in console */
//import logger from 'redux-logger';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
    reducers,
    undefined,
    compose(applyMiddleware(thunkMiddleware, middleware))
);

window.s = store;

// Delay render of components until the store
// has rehydrated to prevent redirects and other
// weird effects
class AppProvider extends React.Component {
    componentWillMount() {
        this.props.dispatch(ConfigurationThunks.loadConfiguration());
    }

    getMetadata() {
        return getUserMetadata(store.getState().userState.data);
    }

    render() {
        const { should_logout } = this.props.configurationState.data;

        if (should_logout && localStorage.getItem('jwt')) {
            localStorage.removeItem('jwt');
            location.reload();
        }

        if (!this.props.configurationState.fetched) {
            return <div />;
        }

        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Navigator>
                        <Switch>
                            <Route
                                exact
                                path={routes.HOME}
                                component={HomePage}
                            />
                            <Route
                                exact
                                path={routes.LOGIN}
                                render={() => {
                                    if (this.getMetadata().isLoggedIn) {
                                        return <Redirect to={routes.HOME} />;
                                    }

                                    return <Login />;
                                }}
                            />
                            <Route
                                exact
                                path={routes.LOGOUT}
                                render={() => {
                                    return <Logout />;
                                }}
                            />
                            <Route
                                exact
                                path={routes.PROFILE}
                                render={() => {
                                    if (this.getMetadata().isLoggedIn) {
                                        return <EditProfile />;
                                    }

                                    return <Redirect to={routes.LOGIN} />;
                                }}
                            />
                            <Route
                                exact
                                path={routes.ADMIN}
                                render={() => {
                                    const {
                                        isLoggedIn,
                                        isAdmin
                                    } = this.getMetadata();
                                    if (isLoggedIn && isAdmin) {
                                        return <AdminPage.Models />;
                                    }

                                    return <Redirect to={routes.LOGIN} />;
                                }}
                            />
                            <Route
                                path={'/admin/:model'}
                                render={({ match }) => {
                                    return (
                                        <AdminPage.Model
                                            model={match.params.model}
                                        />
                                    );
                                }}
                            />
                            <Route component={HomePage} />
                        </Switch>
                    </Navigator>
                </ConnectedRouter>
            </Provider>
        );
    }
}

function mapStateToProps(state) {
    return {
        configurationState: state.configurationState
    };
}

render(
    React.createElement(connect(mapStateToProps)(AppProvider), {
        store
    }),
    document.getElementById('app')
);
