import React from 'react';
import styled from 'styled-components';
import { h } from 'react-hyperscript-helpers';

import { devices } from '../styles';

const Container = styled.div`
  display: block;
  textalign: center;
  fontsize: 14px;
`;

const SelectionContainer = styled.div`
  display: flex;
  flexdirection: row;
  justifycontent: flex-start;
  alignitems: stretch;
  border: 3px solid ${(props) => props.defaultColor};
  position: relative;

  &:hover {
    border: 3px solid ${(props) => props.hoverColor};
    transition: all 0.2s ease-in-out;

    .upload-button {
      backgroundcolor: ${(props) => props.hoverColor};
      color: white;
      transition: all 0.2s ease-in-out;
    }
  }
`;

const Button = styled.div`
  order: 1;
  backgroundcolor: ${(props) => props.backgroundColor};
  color: white;
  padding: 12px 10px;

  ${devices.small`
        padding: 12px 20px;
    `};
`;

const FileName = styled.div`
  order: 2;
  flexgrow: 1;
  padding: 12px;
`;

const Input = styled.input`
  zindex: 100;
  cursor: pointer;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
`;

class FileUpload extends React.Component {
  constructor() {
    super();

    this.state = {
      fileSelected: false,
      fileName: '',
    };

    this.onFileSelect = this.onFileSelect.bind(this);
  }

  onFileSelect(e) {
    const file = e.target.files[0];

    this.setState({
      fileSelected: true,
      fileName: file.name,
    });

    this.props.onFileSelect(file);
  }

  render() {
    const { defaultColor, hoverColor, activeColor } = this.props;

    return h(
      Container,
      h(
        SelectionContainer,
        {
          defaultColor: this.state.fileSelected ? activeColor : defaultColor,
          hoverColor,
        },
        [
          h(
            Button,
            {
              className: 'upload-button',
              backgroundColor: this.state.fileSelected
                ? activeColor
                : defaultColor,
            },
            `Upload ${this.props.fileTitle}`,
          ),
          h(
            FileName,
            this.state.fileSelected
              ? this.state.fileName
              : this.props.defaultText || 'No file chosen...',
          ),
          h(Input, {
            type: 'file',
            name: 'chooseFile',
            onChange: this.onFileSelect,
          }),
        ],
      ),
    );
  }
}

export default FileUpload;
