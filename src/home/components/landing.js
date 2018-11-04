import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getTheme } from '@ktp/theme';
import { Card, PageHeading } from '@ktp/ui';
import { getHomePageCards } from '../selectors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-flow: column wrap;
`;

export const Landing = ({ cards, theme }) =>
  h(Wrapper, [
    h(PageHeading, {
      color: theme.green,
      title: 'Kappa Theta Pi',
      subtitle: 'Tech Fraternity.',
      body:
        'Kappa Theta Pi is a co-ed professional technology fraternity at the University of Michigan.',
    }),
    h(Container, [cards.map((c) => h(Card, { ...c }))]),
  ]);

const mapStateToProps = (state) => ({
  theme: getTheme(state),
  cards: getHomePageCards(),
});

export const LandingConn = connect(mapStateToProps)(Landing);
