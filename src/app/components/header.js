import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { h } from 'react-hyperscript-helpers';

// eslint-disable-next-line no-unused-vars
import { theme as globalTheme, devices, getTheme } from '@ktp/theme';
import { getUser } from '@ktp/user';

import { routes } from '../constants';

const HeaderLogoImage = require('../../../static/icons/logo.png');
const Favicon = require('../../../static/icons/favicon.png');

/* Header Section */
const Wrapper = styled.div`
  margin: 0 px 16%;
  ${devices.small`
        margin: 0px 8%;
    `};
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const HeaderNavLink = styled(NavLink)`
  margin: auto;
  margin-left: 0;
  display: flex;
  flex-direction: row;
  text-decoration: none;
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  padding: 2px 20px;
  margin: 10px 0 10px 15px;
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

const Header = () =>
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
        ]),
        h(
          NavContainer,
          {
            right: false,
            isOpen: false,
          },
          [
            h(StyledNavLink, { to: routes.HOME }, 'Home'),
            h(StyledNavLink, { to: routes.ABOUT }, 'About Us'),
            h(StyledNavLink, { to: routes.MEMBERS }, 'Members'),
            h(StyledNavLink, { to: routes.RUSH }, 'Rush'),
            h(StyledNavLink, { to: routes.CONTACT }, 'Contact Us'),
          ],
        ),
      ]),
    ]),
  ]);

const mapStateToProps = (state) => ({
  user: getUser(state),
  theme: getTheme(state),
});

export const HeaderConn = connect(mapStateToProps)(Header);
