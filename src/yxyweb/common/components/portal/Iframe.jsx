import React, { Component } from 'react';

export default class Iframe extends Component {
  render() {
    const { url, width, height, index } = this.props;
    const style = { width, height };
    return (
      <iframe id={index} name='myFrame' src={url} style={style} className='no-border' />
    );
  }
}
