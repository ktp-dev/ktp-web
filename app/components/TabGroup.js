import React from 'react';
import styled from 'styled-components';
import { h } from 'react-hyperscript-helpers';

import { devices } from '../styles';

const Group = styled.div`
  display: flex;
  flexdirection: row;
  padding: 0;
  margin: 0;
`;

const TabItem = styled.div`
  flex: 1;
  textalign: center;
  backgroundcolor: ${(props) =>
    props.active ? props.activeColor : 'transparent'};
  border: 3px solid ${(props) => props.activeColor};
  borderright: none;
  color: ${(props) => (props.active ? 'white' : props.activeColor)};
  padding: 10px 0;
  fontsize: 15px;
  fontweight: 500;

  &:first-child {
    bordertopleftradius: 20px;
    borderbottomleftradius: 20px;
  }

  &:last-child {
    bordertoprightradius: 20px;
    borderbottomrightradius: 20px;
    borderright: 3px solid ${(props) => props.activeColor};
  }

  &:hover {
    backgroundcolor: ${(props) => props.activeColor};
    color: white;
  }

  ${devices.tablet`
        fontSize: 18px;
    `};
`;

class TabGroup extends React.Component {
  constructor(props) {
    super(props);

    this.clickMiddleware = this.clickMiddleware.bind(this);
    this.state = {
      activeIndex: props.defaultIndex || 0,
    };
  }

  clickMiddleware(index, func) {
    return () => {
      this.setState({
        activeIndex: index,
      });
      func(index);
    };
  }

  render() {
    const { tabs } = this.props;

    return h(
      Group,
      tabs.map((tab, i) =>
        h(
          TabItem,
          {
            key: i,
            onClick: this.clickMiddleware(i, tab.onClick),
            activeColor: this.props.primaryColor,
            active: i === this.state.activeIndex,
          },
          tab.title,
        ),
      ),
    );
  }
}

export default TabGroup;
