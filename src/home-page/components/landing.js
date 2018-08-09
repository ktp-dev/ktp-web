import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getTheme } from '../../selectors';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.backgroundGradient};
  padding: 0;
  display: flex;
  flex-flow: column;
  height: calc(100vh - 80px);
`;

const Container = styled.div`
  padding: 50px;
  max-width: calc(100vw * 0.65);
  margin: 80px auto 0px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Hero = styled.p`
  font-size: 65px;
  color: #ffffff;
  text-align: left;
  fontweight: 500;
  padding: 5px;
  margin: 5px 0;
`;

export const Label = styled.label`
  display: block;
  margin: 2px;
  height: 21px;
  font-size: 13px;
  color: #fff;
`;

export const Landing = () =>
  h(Wrapper, [h(Container, [h(Hero, ['Kappa Theta Pi'])])]);

const mapStateToProps = (state) => ({
  theme: getTheme(state),
});

export const LandingConn = connect(mapStateToProps)(Landing);
