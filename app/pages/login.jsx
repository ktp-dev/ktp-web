import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AuthThunks } from '../actions';
import { connect } from 'react-redux';
import { routes } from '../constants';

import { RoundedButton, Alert } from '../components';

/* Containers */
const Page = styled.div`margin: 80px auto 0 auto;`;

const FormContainer = styled.div`
    width: 500px;
    maxWidth: calc(100% - 40px);
    minHeight: calc(100vh - 30px - 2rem - 80px);
    padding: 20px 0 50px;
    margin: 0 auto;
`;

const Flexer = styled.div`
    display: flex;
    flexDirection: column;
`;

const InputContainer = styled.div`
    margin: 30px 0;

    input {
        width: 100%;
        margin: 10px 0;
        padding: 8px;
        fontSize: 1em;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    flexDirection: row;
    justifyContent: space-between;
`;

const AlertContainer = styled.div`marginTop: 30px;`;

/* Login Component */
class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };
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
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.dispatch(
            AuthThunks.login({
                email: this.state.email,
                password: this.state.password
            })
        );
    }

    render() {
        return (
            <Page>
                <FormContainer>
                    {this.props.userState.error ? (
                        <AlertContainer>
                            <Alert message={this.props.userState.message} />
                        </AlertContainer>
                    ) : null}
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <Flexer>
                            <InputContainer>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleAttributeChange.bind(
                                        this
                                    )}
                                />
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleAttributeChange.bind(
                                        this
                                    )}
                                />
                            </InputContainer>
                            <ButtonGroup>
                                <RoundedButton
                                    type="submit"
                                    color={this.props.theme.primary}
                                >
                                    Login
                                </RoundedButton>
                            </ButtonGroup>
                        </Flexer>
                    </form>
                </FormContainer>
            </Page>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        userState: state.userState,
        theme: state.theme.data
    };
}

export default connect(mapStateToProps)(Login);
