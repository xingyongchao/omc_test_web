import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
// import { Table } from '../basic';

import env from '../../helpers/env';
let Table;

export default class ReferModal extends React.Component {
  constructor(props) {
    super(props);
    Table = env.INTERACTIVE_MODE === 'touch' ? require('../grid-touch').default : require('../basic/table').default;
    this.state = {
      height: props.height || 0,
    };
  }
  componentDidMount() {
    this.props.model.on('toolbarHeightUpdate', height => {
      this.setState({ height });
    });
  }
  componentWillUnmount() {
    this.props.model.un('toolbarHeightUpdate');
  }
  componentWillReceiveProps(nextProps) {

  }

  render() {
    return <Table tableMode={"refer"} model={this.props.model} width={this.props.width} maxRowCount={this.props.maxRowCount} height={this.state.height} />
  }
}
