import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import { routes } from '../constants';
import { devices } from '../styles';
import theme from '../styles/theme.js';
import { getUserMetadata } from '../util/user.js';

const HeaderLogoImage = require('../../static/icons/logo.png');
const Favicon = require('../../static/icons/logo.png');

/* Header Section */
const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    paddingTop: 15px
    paddingBottom: 15px
    zIndex: 100;

    display: flex;
    height: 80px;
    alignItems: center;
    justifyContent: flex-start;
    background: ${theme.primary};
`;

const FlexWrapper = styled.div`
    display: flex;
    alignItems: center;
    justifyContent: center;
    height: 90%;
    width: calc(100% - 72px);
    margin: 0 auto;

    ${devices.tablet`
        justifyContent: space-between;
    `};
`;

const Logo = styled.img`
    height: 50px;
    display: block;
    paddingBottom: 5px;

    ${devices.small`
        height: 50px;
    `};
`;

const NavContainer = styled.div`
    display: none;
    alignItems: center;
    justifyContent: flex-end;
    ${devices.tablet`
        ${props => (props.disableCompact ? 'display: flex' : '')};
    `};
`;

const HeaderNavLink = styled(NavLink)`
    margin: auto;
    marginLeft: 0;
`;

const StyledNavLink = styled(NavLink)`
    fontSize: 22px;
    padding: 2px 20px;
    //margin: 10px 0 10px 15px;
    color: ${props => props.color};
    textDecoration: none;
    transition: all 0.3s;
    text-transform: uppercase;

    &:hover {
        textDecoration: underline;
    }
`;

const StyledALink = styled.a`
    fontSize: 22px;
    padding: 2px 20px;
    //margin: 10px 0 10px 15px;
    color: ${props => props.color};
    textDecoration: none;
    transition: all 0.3s;
    text-transform: uppercase;

    &:hover {
        textDecoration: underline;
    }
`;

const Burger = styled.div`
    .bm-burger-button {
        position: fixed;
        width: 36px;
        height: 30px;
        right: 36px;
        top: 25px;
    }

    .bm-burger-bars {
        background: ${props => props.primaryColor};
        height: 15% !important;
        borderRadius: 10px;
    }

    .bm-cross-button {
        height: 24px;
        width: 24px;
    }

    .bm-cross {
        background: ${props => props.primaryColor};
    }

    .bm-menu {
        backgroundColor: ${theme.primary};
        padding: 2.5em 1.5em 0;
        font-size: 1.15em;
    }

    .bm-morph-shape {
        fill: #373a47;
    }

    .bm-item-list {
        color: white;
        padding: 0.8em;
    }

    .bm-overlay {
        background: rgba(0, 0, 0, 0.3);
        top: 0;
        left: 0;
    }

    .bm-menu-wrap {
        top: 0;
    }

    ${devices.tablet`
        ${props => (props.disableCompact ? 'display: none' : '')};
    `};
`;

class HeaderLinks extends React.Component {
    render() {
        const { color, userMetadata, isCompact } = this.props;
        const { isLoggedIn, isAdmin } = userMetadata;

        // Either render a Menu component for mobile, or NavContainer for desktop as
        // the parent component for the navigation links.
        const WrappingComponent = isCompact ? Menu : NavContainer;
        return (
            <WrappingComponent right disableCompact={true} isOpen={false}>
                {isLoggedIn && isAdmin ? (
                    <StyledALink href={routes.ADMIN} color={color}>
                        Admin
                    </StyledALink>
                ) : null}
                {isLoggedIn ? (
                    <StyledNavLink to={routes.LOGOUT} color={color}>
                        Log Out
                    </StyledNavLink>
                ) : (
                    <StyledNavLink to={routes.LOGIN} color={color}>
                        Log In
                    </StyledNavLink>
                )}
            </WrappingComponent>
        );
    }
}

class Header extends React.Component {
    render() {
        const userData = this.props.userState.data;
        const userMetadata = getUserMetadata(userData);
        const configurationData = this.props.configurationState.data;

        return (
            <div>
                {window.location.pathname == routes.SUBSCRIBE ? null : (
                    <div>
                        <Helmet>
                            <title>Kappa Theta Pi</title>

                            <link
                                rel="icon"
                                type="image/x-icon"
                                href={Favicon}
                            />
                        </Helmet>
                        <Wrapper>
                            <FlexWrapper>
                                <HeaderNavLink to={routes.HOME}>
                                    <Logo src={HeaderLogoImage} />
                                </HeaderNavLink>
                                <HeaderLinks
                                    userMetadata={userMetadata}
                                    configurationData={configurationData}
                                    color={this.props.theme.secondary}
                                    isCompact={false}
                                />
                                <Burger
                                    primaryColor={this.props.theme.highlight}
                                    disableCompact={true}
                                >
                                    <HeaderLinks
                                        userMetadata={userMetadata}
                                        configurationData={configurationData}
                                        color={this.props.theme.highlight}
                                        isCompact={true}
                                    />
                                </Burger>
                            </FlexWrapper>
                        </Wrapper>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userState: state.userState,
        configurationState: state.configurationState,
        theme: state.theme.data
    };
}

export default connect(mapStateToProps)(Header);
