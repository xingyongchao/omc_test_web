import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Button } from 'antd';
import { Row, Col } from '../basic';
import TopHeader from './TopHeader';
import TopMenu from './TopMenu';
import PrintBody from './PrintBody';

if (process.env.__CLIENT__ === true) {
  require('./print.less')
}
export default class PrintDesign extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.leftTime = cb.rest.AppContext && cb.rest.AppContext.tenant.leftTime || 31;
  }
  componentWillReceiveProps(nextProps, ) {
    if (nextProps.height == this.props.height) return;
    let bodyHeight = nextProps.height - 155 - 28;
    if(this.leftTime <=30) bodyHeight -= 37;
    this.setState({ bodyHeight });
  }
  componentDidMount() {
    // this.headerHeight = findDOMNode(this.refs.TopHeader).clientHeight;
    let bodyHeight = this.props.height - 155 - 28;
    if(this.leftTime <=30) bodyHeight -= 37;
    this.setState({ bodyHeight });
  }
  render() {
    return (
      <div className="print-container">
        <TopHeader ref="TopHeader" />
        <TopMenu />
        <PrintBody height={this.state.bodyHeight} />
      </div>
    );
  }
}
