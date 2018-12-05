import { h } from 'react-hyperscript-helpers';
import { Route, Switch } from 'react-router';

import { routes } from '../constants';
import { HomePage } from '@ktp/home';
import { AboutPage } from '@ktp/about-us';
import { ProDevPage } from '@ktp/pro-dev';
import { Login, Logout } from '@ktp/auth';

export const Routes = () =>
  h(Switch, [
    h(Route, {
      exact: true,
      path: routes.HOME,
      component: HomePage,
    }),
    h(Route, {
      exact: true,
      path: routes.ABOUT,
      component: AboutPage,
    }),
    h(Route, {
      exact: true,
      path: routes.PRODEV,
      component: ProDevPage,
    }),
    h(Route, {
      exact: true,
      path: routes.LOGIN,
      render: () =>
        // if (App.getMetadata().isLoggedIn) {
        //   return h(Redirect, { to: routes.HOME });
        // }
        h(Login),
    }),
    h(Route, {
      exact: true,
      path: routes.LOGOUT,
      render: () => h(Logout),
    }),
    h(Route, { component: HomePage }),
  ]);
