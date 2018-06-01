import React from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';

const Avatar = styled.img`
  width: inherit;
  minwidth: 100px;
  maxwidth: 200px;
`;

const BackupPicture = styled.div`
  backgroundcolor: gray;
  width: 100px;
  height: 100px;
`;

export default class ProfilePicture extends React.Component {
  constructor(props) {
    super(props);

    const { avatars } = this.props;

    this.state = {
      profilePicture: avatars && avatars.length > 0 ? avatars[0] : '',
      counter: 0,
      isValidPicture: true,
    };

    this.handleImageError = this.handleImageError.bind(this);
  }

  handleImageError() {
    const { avatars } = this.props;
    const counter = this.state.counter + 1;

    if (!avatars || counter > avatars.length) {
      this.setState({
        isValidPicture: false,
      });
    } else {
      this.setState({
        profilePicture: avatars[counter],
        counter: counter,
      });
    }
  }

  render() {
    if (!this.state.isValidPicture) {
      return h(BackupPicture);
    }
    return h(Avatar, {
      onError: this.handleImageError,
      src: this.state.profilePicture,
    });
  }
}
