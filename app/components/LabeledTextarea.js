import React from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';

const InputField = styled.div`
  width: 100%;
  margin: 10px 0;
  display: flex;
  flexdirection: column;
  justifycontent: space-between;

  textarea {
    padding: 10px;
    bordercolor: rgb(215, 215, 215);
    flexgrow: 1;
    height: 120px;
    borderradius: 5px;
  }
`;

const LabeledTextarea = ({ label, children }) =>
  h(InputField, [h('p', label), React.Children.toArray(children)]);

export default LabeledTextarea;
