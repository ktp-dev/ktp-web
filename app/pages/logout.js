import React from 'react';
import { h } from 'react-hyperscript-helpers';
import PropTypes from 'prop-types';

import { AuthThunks } from '../actions';
import { routes } from '../constants';
import { connect } from 'react-redux';

class Logout extends React.Component {
  componentWillMount() {
    this.props.dispatch(AuthThunks.logout());
    window.localStorage.clear();
    this.context.router.history.replace(routes.HOME);
  }

  render() {
    return h('div');
  }
}

Logout.contextTypes = {
  router: PropTypes.object,
};

export default connect()(Logout);
