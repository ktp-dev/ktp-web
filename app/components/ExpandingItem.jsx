import React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
    display: inline-block;
`;

const Header = styled.h3`
    display: inline-block;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    margintop: 0;
    marginbottom: 0;
    color: ${props => props.color};
    fontsize: 18px;
`;

const Body = styled.p`
    paddingleft: 25px;
    paddingtop: 10px;
    paddingbottom: 10px;
    marginbottom: 5px;
    -webkit-margin-before: 5px;
    -webkit-margin-after: 5px;
    color: ${props => props.color};
    fontsize: 15px;
`;

const Flexbox = styled.div`
    display: flex;
    cursor: pointer;
`;

const Open = keyframes`
    from {
        transform: scaleY(0);
    } to {
        height: max-content;
        transform: scaleY(1);
    }
`;

const Close = keyframes`
    from {
        height: max-content;
        transform: scaleY(1);
    } to {
        height: 0px;
        transform: scaleY(0);
    }
`;

const Slider = styled.div`
    overflow: hidden;
    transformorigin: top center;

    ${props =>
        props.open
            ? ` 
        animation: ${Open} 0.3s ease-in-out;
        animationFillMode: forwards;
    `
            : `
        height: max-content;
        animation: ${Close} 0.3s ease-in-out;
        animationFillMode: forwards;
    `};
`;

const PlusWrapper = styled.div`
    position: relative;
    display: inline-block;
    margin: 0;
    marginleft: 10px;
    height: 15px;
    width: 15px;
    zindex: 10;
`;

const PlusLine = styled.div`
    display: inline-block;
    position: absolute;
    zindex: -1;
    backgroundcolor: ${props => props.color};
    height: 10px;
    width: 2px;
    top: 4px;
    transitionduration: 0.3s;

    ${props =>
        !props.vertical
            ? `
        transform: rotate(90deg);
    `
            : `
        transform: rotate(0deg);
    `};
`;

const Plus = props => {
    return (
        <PlusWrapper>
            <PlusLine color={props.color} />
            <PlusLine color={props.color} vertical={!props.open} />
        </PlusWrapper>
    );
};

export default class ExpandingItem extends React.Component {
    constructor(props) {
        super();
        this.state = { expanded: false, currentColor: props.colorOff };
        this.handleClick = this.handleClick.bind(this);
        this.handlePlusColor = this.handlePlusColor.bind(this);
        this.handleHeaderColor = this.handleHeaderColor.bind(this);
        this.handleBodyColor = this.handleBodyColor.bind(this);
    }

    handleClick() {
        if (this.props.expandColor) {
            this.setState(prevState => ({
                expanded: !prevState.expanded,
                currentColor: this.state.expanded
                    ? this.props.colorOff
                    : this.props.colorOn
            }));
        } else {
            this.setState(prevState => ({
                expanded: !prevState.expanded
            }));
        }
    }

    handlePlusColor() {
        return this.props.expandColor
            ? this.state.currentColor
            : this.props.plusColor;
    }

    handleHeaderColor() {
        return this.props.expandColor
            ? this.state.currentColor
            : this.props.headerColor;
    }

    handleBodyColor() {
        return this.props.expandColor
            ? this.state.currentColor
            : this.props.bodyColor;
    }

    render() {
        return (
            <Wrapper>
                <Flexbox onClick={this.handleClick}>
                    <Plus
                        color={this.handlePlusColor}
                        open={this.state.expanded}
                    />
                    <Header color={this.handleHeaderColor}>
                        {this.props.header}
                    </Header>
                </Flexbox>
                <Slider open={this.state.expanded}>
                    <Body color={this.handleBodyColor}>{this.props.body}</Body>
                </Slider>
            </Wrapper>
        );
    }
}
