import React, { Component } from 'react';
import { Row, Col, Input } from '../basic';
import env from '../../helpers/env'

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
    this.keys = {};
    this.init();
  }
  init() {
    const { controls } = this.props.meta;
    if (!controls || !controls.length) return;
    controls.forEach(control => {
      this.keys[control.cItemName] = true;
    });
  }
  componentDidMount() {
    this.props.viewModel.on('modeChange', mode => {
      this.setState({ show: mode === env.VOUCHER_STATE_BROWSE });
    });
    this.props.viewModel.on('afterLoadData', data => {
      for (var key in this.keys)
        this.keys[key] = data[key] ? true : false;
      this.setState({ show: this.state.show });
    });
  }
  parseControls(container) {
    const { controls } = container;
    if (!controls || !controls.length)
      return null;
    const components = [];
    const containerCols = container.iCols || 4;
    controls.forEach(control => {
      components.push(this.parseControl(control, containerCols));
    });
    const className = this.state.show ? 'tab-bottom-txt' : 'hide';
    return (
      <Row key={container.groupId} className={className}>
        <Col span={24}>{components}</Col>
      </Row>
    );
  }
  parseControl(control, containerCols) {
    const { viewModel } = this.props;
    const controlWidth = 100 / containerCols;
    const controlType = control.cControlType.trim().toLocaleLowerCase();
    const modelKey = control.cItemName;
    const controlModel = viewModel.get(modelKey);
    const component = <Input model={controlModel} {...control} />
    const className = this.keys[modelKey] ? `viewSetting viewCell width-percent-${controlWidth.toFixed(0)}` : 'hide';
    return (
      <div key={modelKey} className={className} id={`${viewModel.getParams().billNo}|${modelKey}`}>
        {component}
      </div>
    );
  }
  render() {
    return this.parseControls(this.props.meta);
  }
}
