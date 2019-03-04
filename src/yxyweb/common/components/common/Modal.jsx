import React, { Component } from 'react';
import { Modal as ModalControl } from 'antd';

export default class Modal extends Component {
  render() {
    if (!process.env.__CLIENT__)
      return <ModalControl {...this.props} />
    let props = { ...this.props };
    if (cb.electron.getSharedObject()) {
      Object.assign(props, { 'transitionName': null, 'maskTransitionName': null })
    }
    return <ModalControl {...props} />
  }
}
