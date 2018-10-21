import styled from 'styled-components';
import { h } from 'react-hyperscript-helpers';

import { SmallBody } from '../../ui';

const InstagramImg = require('../../../static/icons/instagram.png');
const FacebookImg = require('../../../static/icons/facebook.png');

const SocialIconsContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  padding: 1rem;
  align-content: space-between;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Img100 = styled.img`
  height: 100%;
  margin: auto;
`;

const ImgButtonWrapper = styled.div`
  height: 30px;
  width: 30px;
  margin: 5px;
  text-align: center;
  display: flex;
`;

const ImgButton = ({ href }) =>
  h(ImgButtonWrapper, [h('a', { href }, [h(Img100)])]);

export const Footer = () =>
  h(Container, [
    h(SocialIconsContainer, [
      h(ImgButton, {
        src: FacebookImg,
        alt: 'Facebook',
        align: 'middle',
        href: 'https://www.facebook.com/KTPalpha/',
      }),
      h(ImgButton, {
        src: InstagramImg,
        alt: 'Instagram',
        align: 'middle',
        href: 'https://www.instagram.com/ktpumich',
      }),
    ]),
    h(SmallBody, ['© 2018 Kappa Theta Pi Alpha Chapter']),
  ]);
