import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';

import { devices } from '@ktp/theme';
import { Body, BodyHighlight } from './typography';

const Container = styled.div`
  background-size: cover;
  flex-flow: column wrap;
  margin: 20px;
  height: 300px;
  ${devices.tablet`
    flex: 50%;
    `};
`;

export const Card = ({ img, title, body }) =>
  h(
    Container,
    {
      style: { backgroundImage: `url(${img})` },
    },
    [h(BodyHighlight, title), h(Body, body)],
  );
