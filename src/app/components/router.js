import { h } from 'react-hyperscript-helpers';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';

import { GlobalStyle } from '@ktp/theme';

import { Routes } from './routes';
import { NavigatorConn } from './navigator';
import { bootAction } from '../action-creators';

const history = createHistory();

const Router = ({ boot = () => {} }) => {
  boot();
  return h(
    ConnectedRouter,
    {
      history,
    },
    [h(NavigatorConn, [h(Routes), h(GlobalStyle)])],
  );
};

const mapDispatchToProps = (dispatch) => ({
  boot: () => dispatch(bootAction()),
});

export const RouterConn = connect(
  null,
  mapDispatchToProps,
)(Router);
