import React from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  input::-webkit-input-placeholder {
    color: ${(props) => props.placeholderColor} !important;
  }

  input:-moz-placeholder {
    color: ${(props) => props.placeholderColor} !important;
  }

  input::-moz-placeholder {
    color: ${(props) => props.placeholderColor} !important;
  }

  input:-ms-input-placeholder {
    color: ${(props) => props.placeholderColor} !important;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  fontsize: 1em;
  backgroundcolor: white;
  border: 3px solid ${(props) => props.borderColor};
  borderradius: 8px;
  color: ${(props) => props.color};
`;

const Feedback = styled.div`
  width: 100%;
  textalign: left;
  color: ${(props) => props.color || 'black'};
`;

export default class InputText extends React.Component {
  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.textField.blur();
      this.props.onSubmit();
    }
  }

  render() {
    const {
      placeholderColor,
      feedbackColor,
      feedback,
      borderColor,
      placeholder,
      color,
      value,
      onChange,
    } = this.props;
    return h(Wrapper, { placeholderColor }, [
      feedback
        ? h(Feedback, { color: feedbackColor }, this.props.feedback)
        : h('br'),
      h(Input, {
        type: 'text',
        ref: (textField) => {
          this.textField = textField;
        },
        color: color,
        borderColor: borderColor,
        placeholder: placeholder,
        style: { placeholderTextColor: placeholderColor },
        value,
        onChange,
        onKeyDown: (e) => this.handleKeyPress(e),
      }),
    ]);
  }
}
