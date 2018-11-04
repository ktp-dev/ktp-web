import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';

import { Body, BodyHighlight } from './typography';

const Container = styled.div`
  background-size: cover;
  height: 300px;
`;

export const Card = ({ img, title, body }) =>
  h(
    Container,
    {
      style: { backgroundImage: `url(${img})` },
    },
    [h(BodyHighlight, title), h(Body, body)],
  );
