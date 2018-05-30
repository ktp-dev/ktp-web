import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    width: 100%;

    input::-webkit-input-placeholder {
        color: ${props => props.primaryColor} !important;
    }

    input:-moz-placeholder {
        color: ${props => props.primaryColor} !important;
    }

    input::-moz-placeholder {
        color: ${props => props.primaryColor} !important;
    }

    input:-ms-input-placeholder {
        color: ${props => props.primaryColor} !important;
    }
`;

const Container = styled.div`
    display: block;
    position: relative;
    height: 40px;
`;

const minButtonWidth = '110px';

const Input = styled.input`
    position: relative;
    z-index: 1;
    width: 70%;
    maxwidth: calc(100% - ${minButtonWidth});
    height: 40px;
    color: ${props => props.primaryColor || '#E6E6E6'};
    border: 3px solid ${props => props.primaryColor || '#E6E6E6'};
    bordertopleftradius: 8px;
    borderbottomleftradius: 8px;
    backgroundcolor: ${props => props.secondaryColor || 'white'};
    padding: 10px;
    fontsize: 16px;
`;

const Button = styled.button`
    width: 30%;
    minwidth: ${minButtonWidth};
    height: 40px;
    top: 0px;
    left: -3px;
    position: relative;
    fontsize: 18px;
    border: 3px solid ${props => props.primaryColor || '#E6E6E6'};
    borderright: 6px solid ${props => props.primaryColor || '#E6E6E6'};
    bordertoprightradius: 8px;
    borderbottomrightradius: 8px;
    backgroundcolor: ${props => props.primaryColor || '#E6E6E6'};
    color: ${props => props.secondaryColor || 'white'};
`;

const Feedback = styled.div`
    width: 100%;
    textalign: left;
    color: ${props => props.color || '#E6E6E6'};
`;

export default class TextSubmit extends React.Component {
    constructor() {
        super();
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
        if (e.key == 'Enter') {
            ReactDOM.findDOMNode(this.refs.textField).blur();
            this.props.onSubmit();
        }
    }

    render() {
        return (
            <Wrapper primaryColor={this.props.primaryColor}>
                {this.props.feedback ? (
                    <Feedback color={this.props.feedbackColor}>
                        {this.props.feedback}
                    </Feedback>
                ) : (
                    <br />
                )}
                <Container>
                    <Input
                        type="text"
                        ref="textField"
                        value={this.props.value}
                        onChange={this.props.onChange}
                        placeholder={this.props.placeholder}
                        onKeyDown={e => {
                            this.handleKeyPress(e);
                        }}
                        primaryColor={this.props.primaryColor}
                    />
                    <Button
                        onClick={this.props.onSubmit}
                        primaryColor={this.props.primaryColor}
                        secondaryColor={this.props.secondaryColor}
                    >
                        {this.props.buttonText}
                    </Button>
                </Container>
            </Wrapper>
        );
    }
}
