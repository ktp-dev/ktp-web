import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { h } from 'react-hyperscript-helpers';

// eslint-disable-next-line no-unused-vars
import globalTheme from '../../styles/theme';
import { routes } from '../constants';
import { devices } from '../../styles';
import { getTheme, getUser } from '../../selectors';

const HeaderLogoImage = require('../../../static/icons/logo.png');
const Favicon = require('../../../static/icons/logo.png');

/* Header Section */
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.secondary};
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

const HeaderText = styled.h2`
  color: white;
  margin: 5px 5px 5px 15px;
`;

const NavContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: flex-end;
  ${devices.tablet`
        ${({ disableCompact }) => (disableCompact ? 'display: flex' : '')};
    `};
`;

const HeaderNavLink = styled(NavLink)`
  margin: auto;
  margin-left: 0;
  display: flex;
  flex-direction: row;
  text-decoration: none;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 16px;
  padding: 2px 20px;
  margin: 10px 0 10px 15px;
  color: #ffffff;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s;
  text-transform: uppercase;
  &:hover {
    background-color: #ffffff33;
    color: white;
  }
  &:first-child {
    margin: 0;
    margin-left: 15px;
  }
`;

const HeaderLinks = ({ color, user }) => {
  const { isLoggedIn } = user;
  return h(
    NavContainer,
    {
      right: false,
      disableCompact: !user.isLoggedIn,
      isOpen: false,
    },
    [
      h(StyledNavLink, { to: routes.HOME, color }, 'About'),
      isLoggedIn
        ? h(StyledNavLink, { to: routes.HOME, color }, 'Log Out')
        : h(
            StyledNavLink,
            { to: routes.HOME, color, style: { border: '1px solid #ffffff' } },
            'Log In',
          ),
    ],
  );
};

const Header = ({ user, theme }) =>
  h('div', [
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
          h(HeaderText, 'Kappa Theta Pi'),
        ]),
        h(HeaderLinks, {
          user,
          color: theme.highlight,
          isCompact: false,
        }),
      ]),
    ]),
  ]);

const mapStateToProps = (state) => ({
  user: getUser(state),
  theme: getTheme(state),
});

export const HeaderConn = connect(mapStateToProps)(Header);
