import React from 'react';
import { h } from 'react-hyperscript-helpers';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import Header from './header';

class Navigator extends React.Component {
  render() {
    return h(
      IntlProvider,
      { locale: 'en' }, [
      h(
        ThemeProvider,
        { theme: this.props.theme }, [
        h('div', [h(Header), React.Children.toArray(this.props.children)]),
      ]),
    ]);
  }
}

function mapStateToProps(state) {
  return {
    theme: state.theme.data,
  };
}

export default withRouter(connect(mapStateToProps)(Navigator));
