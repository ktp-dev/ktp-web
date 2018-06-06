import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { h } from 'react-hyperscript-helpers';

import { AuthThunks } from '../actions';
import { routes } from '../constants';
import { TabGroup, RoundedButton, Alert } from '../components';

/* Containers */
const Page = styled.div`
  margin: 80px auto 0 auto;
`;

const FormContainer = styled.div`
  width: 500px;
  maxwidth: calc(100% - 40px);
  minheight: calc(100vh - 30px - 2rem - 80px);
  padding: 20px 0 50px;
  margin: 0 auto;
`;

const Flexer = styled.div`
  display: flex;
  flexdirection: column;
`;

const InputContainer = styled.div`
  margin: 30px 0;

  input {
    width: 100%;
    margin: 10px 0;
    padding: 8px;
    fontsize: 1em;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flexdirection: row;
  justifycontent: space-between;
`;

const AlertContainer = styled.div`
  margintop: 30px;
`;

/* Login Component */
class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      isRegistering: true,
    };

    this.tabSelect = this.tabSelect.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.userState.data.isLoggedIn) {
      this.context.router.history.replace(routes.PROFILE);
    }
  }

  // Generic function for changing state
  // -- input using this must have a name attribute
  handleAttributeChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.isRegistering) {
      this.props.dispatch(
        AuthThunks.register({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }),
      );
    } else {
      this.props.dispatch(
        AuthThunks.login({
          email: this.state.email,
          password: this.state.password,
        }),
      );
    }
  }

  tabSelect(index) {
    if (
      (this.state.isRegistering === true && index !== 0) ||
      (this.state.isRegistering === false && index !== 1)
    ) {
      this.setState({
        isRegistering: !this.state.isRegistering,
      });
    }
  }

  render() {
    return h(Page, [
      h(FormContainer, [
        h(TabGroup, {
          tabs: [
            { title: 'Sign Up', onClick: this.tabSelect },
            { title: 'Log In', onClick: this.tabSelect },
          ],
          primaryColor: this.props.theme.primary,
        }),
        this.props.userState.error
          ? h(
              AlertContainer,
              h(Alert, { message: this.props.userState.message }),
            )
          : null,
        h('form', { onSubmit: this.onSubmit.bind(this) }, [
          h(Flexer, [
            h(InputContainer, [
              this.state.isRegistering
                ? h('input', {
                    id: 'name',
                    type: 'text',
                    name: 'name',
                    placeholder: 'Name',
                    value: this.state.name,
                    onChange: this.handleAttributeChange.bind(this),
                  })
                : null,
              h('input', {
                id: 'email',
                type: 'email',
                name: 'email',
                placeholder: 'Email',
                value: this.state.email,
                onChange: this.handleAttributeChange.bind(this),
              }),
              h('input', {
                id: 'password',
                type: 'password',
                name: 'password',
                placeholder: 'Password',
                value: this.state.password,
                onChange: this.handleAttributeChange.bind(this),
              }),
            ]),
            h(
              ButtonGroup,
              h(
                RoundedButton,
                {
                  color: this.props.theme.primary,
                },
                'Confirm',
              ),
            ),
          ]),
        ]),
      ]),
    ]);
  }
}

Login.contextTypes = {
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userState: state.userState,
    theme: state.theme.data,
  };
}

export default connect(mapStateToProps)(Login);
