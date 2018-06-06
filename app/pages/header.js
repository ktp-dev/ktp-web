import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import { h } from 'react-hyperscript-helpers';

import { routes } from '../constants';
import { devices } from '../styles';
import globalTheme from '../styles/theme';
import { getUserMetadata } from '../util/user';

console.log(globalTheme);

const HeaderLogoImage = require('../../static/icons/logo.png');
const Favicon = require('../../static/icons/logo.png');

/* Header Section */
const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 15px
    padding-bottom: 15px
    z-index: 100;

    display: flex;
    height: 80px;
    align-items: center;
    justify-content: flex-start;

`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
  width: calc(100% - 72px);
  margin: 0 auto;

  ${devices.tablet`
        justify-content: space-between;
    `};
`;

const Logo = styled.img`
  height: 50px;
  display: block;
  ${devices.small`
        height: 50px;
    `};
`;

const NavContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: flex-end;
  ${devices.tablet`
        ${(props) => (props.disableCompact ? 'display: flex' : '')};
    `};
`;

const HeaderNavLink = styled(NavLink)`
  margin: auto;
  margin-left: 0;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 16px;
  padding: 2px 20px;
  margin: 10px 0 10px 15px;
  border: 2px solid ${(props) => props.color};
  color: ${(props) => props.color};

  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s;
  text-transform: uppercase;

  &:hover {
    background-color: ${(props) => props.color};
    color: white;
  }

  &:first-child {
    margin: 0;
    margin-left: 15px;
  }
`;

const StyledALink = styled.a`
  font-size: 16px;
  padding: 2px 20px;
  margin: 10px 0 10px 15px;
  border: 2px solid ${(props) => props.color};
  color: ${(props) => props.color};

  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s;
  text-transform: uppercase;

  &:hover {
    background-color: ${(props) => props.color};
    color: white;
  }

  &:first-child {
    margin: 0;
    margin-left: 15px;
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
    background: ${(props) => props.primaryColor};
    height: 15% !important;
    border-radius: 10px;
  }

  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  .bm-cross {
    background: ${(props) => props.primaryColor};
  }

  .bm-menu {
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
        ${(props) => (props.disableCompact ? 'display: none' : '')};
    `};
`;

const HeaderLinks = ({ color, userMetadata, isCompact }) => {
  const { isLoggedIn, isAdmin } = userMetadata;

  // Either render a Menu component for mobile, or NavContainer for desktop as
  // the parent component for the navigation links.
  const WrappingComponent = isCompact ? Menu : NavContainer;
  return h(
    WrappingComponent,
    {
      right: false,
      disableCompact: !userMetadata.isLoggedIn,
      isOpen: false,
    },
    [
      isLoggedIn && isAdmin
        ? h(StyledALink, { href: routes.ADMIN, color }, 'Admin')
        : null,
      isLoggedIn
        ? h(StyledNavLink, { to: routes.PROFILE, color }, 'Edit Profile')
        : null,
      isLoggedIn
        ? h(StyledNavLink, { to: routes.LOGOUT, color }, 'Log Out')
        : h(StyledNavLink, { to: routes.LOGIN, color }, 'Log In'),
    ],
  );
};

const Header = ({ userData, theme }) => {
  const userMetadata = getUserMetadata(userData);

  return h('div', [
    h(Helmet, [
      h('title', 'Kappa Theta Pi'),
      h('link', {
        rel: 'icon',
        type: 'image/x-icon',
        href: Favicon,
      }),
    ]),
    h(Wrapper, [
      h(FlexWrapper, [
        h(HeaderNavLink, { to: routes.HOME }, [
          h(Logo, { src: HeaderLogoImage }),
        ]),
        h(HeaderLinks, {
          userMetadata,
          color: theme.highlight,
          isCompact: false,
        }),
        h(
          Burger,
          {
            primaryColor: theme.highlight,
            disableCompact: !userMetadata.isLoggedIn,
          },
          [
            h(HeaderLinks, {
              userMetadata,
              color: theme.highlight,
              isCompact: true,
            }),
          ],
        ),
      ]),
    ]),
  ]);
};

function mapStateToProps({ userState, theme }) {
  return {
    userData: userState.data,
    theme: theme.data,
  };
}

export default connect(mapStateToProps)(Header);
