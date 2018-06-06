import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { devices } from '../../styles';

const Wrapper = styled.div`
  background: ${(props) => props.theme.secondary};
  padding: 0;
  height: calc(100vh - 80px);
  zindex: 98;
`;

const Container = styled.div`
    height: 100%;
    width: calc(100% - 60px);
    maxWidth: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${devices.tablet`
        width: calc(100% - 100px);
    `} ${devices.desktop`
        width: calc(100% - 140px);
    `} ${devices.giant`
        width: calc(100% - 160px);
    `};
`;

const Text = styled.h2`
  fontsize: 50px;
  color: white;
  text-align: center;
  fontweight: 500;
  textalign: center;
  padding: 0 10vw;
  margin: 5px 0;
  ${devices.tablet`
        fontSize: 50px;
    `};
`;

const Landing = () => h(Wrapper, [h(Container, [h(Text, ['Kappa Theta Pi'])])]);

function mapStateToProps(state) {
  return {
    theme: state.theme.data,
  };
}

export default connect(mapStateToProps)(Landing);
