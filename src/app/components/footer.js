import styled from 'styled-components';
import { h } from 'react-hyperscript-helpers';

import { Container } from '../../ui';
import { devices } from '../../styles';

const InstagramImg = require('../../../static/icons/instagram.png');
const FacebookImg = require('../../../static/icons/facebook.png');

const FooterWrapper = styled.div`
  background-color: white;
`;

const HomeFooter = styled.footer`
  position: relative;
  display: flex;
  padding: 1rem;
  align-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Text = styled.h2`
  color: ${({ theme }) => theme.secondary};
  font-size: 12px;
  margin-bottom: 0;
  text-align: left;
  flex: 1;
  text-align: center;
  min-width: 100%;
  order: 1;

  ${devices.tablet`
        text-align: left;
        text-indent: 50px;
        min-width: 0;
        order: 0;
    `};
`;

const Flexer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  min-width: 100%;

  ${devices.tablet`
        text-align: left;
        min-width: 0;

        ${({ right }) => (right ? 'justify-content: flex-end;' : '')}
    `};
`;

const Img100 = styled.img`
  height: 100%;
  margin: auto;
`;

const ImgButtonWrapper = styled.div`
  height: 20px;
  width: 20px;
  margin: 5px;
  text-align: center;
  display: block;
`;

const ImgButton = ({ href }) =>
  h(ImgButtonWrapper, [h('a', { href }, [h(Img100)])]);

export const Footer = () =>
  h('div', [
    h(FooterWrapper, { id: 'footer' }, [
      h(Container, [
        h(HomeFooter, [
          h(Text, ['© Kappa Theta Pi 2018']),
          h(Flexer, [
            h(ImgButton, {
              src: { FacebookImg },
              alt: 'Facebook',
              align: 'middle',
              href: 'https://www.facebook.com/ktpumich',
            }),
            h(ImgButton, {
              src: { InstagramImg },
              alt: 'Instagram',
              align: 'middle',
              href: 'https://www.instagram.com/ktpumich',
            }),
          ]),
        ]),
      ]),
    ]),
  ]);
