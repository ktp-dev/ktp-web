import { h } from 'react-hyperscript-helpers';
import { Route, Switch } from 'react-router';

import { routes } from '../constants';
import { components as homePageComponents } from '../../home-page';
const { HomePage } = homePageComponents;
import { components as authComponents } from '../../auth';
const { Login, Logout } = authComponents;

export const Routes = () =>
  h(Switch, [
    h(Route, {
      exact: true,
      path: routes.HOME,
      component: HomePage,
    }),
    h(Route, {
      exact: true,
      path: routes.LOGIN,
      render: Login,
    }),
    h(Route, {
      exact: true,
      path: routes.LOGOUT,
      render: Logout,
    }),
    h(Route, { component: HomePage }),
  ]);
