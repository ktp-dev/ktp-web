import styled from 'styled-components';
import { h } from 'react-hyperscript-helpers';

const Wrapper = styled.div`
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  textalign: center;
  borderradius: 10px;
`;

const Message = styled.p`
  padding: 10px;
  margin: 0;
`;

const Alert = () => {
  // default to negative colors
  let backgroundColor = '#ffbaba';
  const color = '01ff70';
  if (this.props.positive) {
    backgroundColor = '#01ff70';
  }
  return h(Wrapper, { backgroundColor, color }, h(Message, this.props.message));
};

export default Alert;
