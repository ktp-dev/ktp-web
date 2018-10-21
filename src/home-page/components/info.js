import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { devices } from '../../styles';

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    width: calc(100% - 60px);
    max-width: 1200px;
    margin: 0 auto;

    z-index: 98;

    ${devices.tablet`
        width: calc(100% - 100px);
    `} ${devices.desktop`
        width: calc(100% - 140px);
    `} ${devices.giant`
        width: calc(100% - 160px);
    `};
`;

const SectionHeader = styled.h2`
  font-size: 42px;
  color: ${({ theme }) => theme.secondary};
  text-transform: uppercase;
  text-align: center;
  font-weight: 500;
  text-align: center;

  ${devices.small`
    font-size: 48px;
    `};
`;

const SectionBody = styled.p`
  color: ${({ theme }) => theme.secondary};
  font-size: 20px;
  max-width: 600px;
  margin-bottom: 50px;
`;

const Brick = styled.div`
  width: 100px;
  height: 12px;
  background: ${({ theme }) => theme.secondary};
  margin: 25px;
`;

export const Welcome = () =>
  h('div', [
    h(CenteredContainer, [
      h(SectionHeader, ['Welcome', h('br'), 'to The Future of Microservices']),
      h(Brick),
      h(SectionBody, [
        'Your Time is Our Biggest Concern:',
        h('br'),
        h('br'),
        '- Start Projects In Hours',
        h('br'),
        h('br'),
        '- Easily Intergrate Powerful APIs',
        h('br'),
        h('br'),
        '- Augment Your Backend Experience',
      ]),
    ]),
  ]);

function mapStateToProps(state) {
  return {
    theme: state.theme.data,
  };
}

export const WelcomeConn = connect(mapStateToProps)(Welcome);
