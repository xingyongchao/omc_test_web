import React, { Component } from 'react';
import { parseContainer } from './util';

export default class Container extends Component {
  constructor(props) {
    super(props);
    // this.calcWidth(props.width);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.width === this.props.width) return;
    this.calcWidth(nextProps.width);
  }
  calcWidth(width) {
    this.hasTree = false;
    this.width = width;
    let minWidth = 1140;
    const { meta, parents } = this.props;
    // if (parents === 'LineTabs') {
    //   this.width -= 60;
    //   minWidth -= 60;
    // }
    if (meta.containers) {
      meta.containers.forEach(item => {
        if (item.cAlign && item.cAlign.trim().toLocaleLowerCase() !== 'left') return;
        this.hasTree = true;
        this.width -= 240;
        minWidth -= 240;
      })
    }
    if (parents === 'Modal') return;
    if (this.width < minWidth && env.INTERACTIVE_MODE !== 'touch')
      this.width = minWidth;
  }
  render() {
    const { meta, viewModel, height, index, className } = this.props;
    const container = parseContainer(meta, viewModel, this.width, height, index, this.hasTree);
    return (
      <div className={className}>
        {container}
      </div>
    );
  }
}
