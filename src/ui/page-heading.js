import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';

import { Body, BodyHighlight, Hero } from './typography';

const Container = styled.div`
  background-size: cover;
  margin: 20px;
  height: 300px;
`;

export const PageHeading = ({ title, subtitle, body, color }) =>
  h(Container, [
    h(Hero, { style: { color } }, title),
    h(BodyHighlight, subtitle),
    h(Body, body),
  ]);
