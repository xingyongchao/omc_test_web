import React, { Component } from 'react';
import { Row, Col } from '../basic';
import env from '../../helpers/env'

export default class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.meta.cName
    };
  }
  componentDidMount() {
    this.props.viewModel.on('modeChange', mode => {
      let prefix = '';
      switch (mode) {
        case env.VOUCHER_STATE_ADD:
          prefix = '新增';
          break;
        case env.VOUCHER_STATE_EDIT:
          prefix = '编辑';
          break;
      }
      this.setState({ text: prefix + this.props.meta.cName });
    });
  }
  render() {
    let style = this.props.meta.cStyle;
    if (!style) style = '{}';
    return (
      <Row>
        <Col>
          <div className="viewSetting viewCell" style={JSON.parse(style)}>
            <h1>{this.state.text}</h1>
          </div>
        </Col>
      </Row>
    );
  }
}
