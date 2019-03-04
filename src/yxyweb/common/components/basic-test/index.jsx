import React, { Component } from 'react';
import { Switch } from 'antd';
import RichText from '../basic/richtext';

const BasicComponents = { RichText }

export default class BasicTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
  }
  componentDidMount() {
    this.setState({ viewModel: cb.loader.initMetaCommonViewModel('TestViewModel', 'testViewModel') });
  }
  onChange(checked) {
    this.setState({ checked });
    this.state.viewModel.setReadOnly(!checked);
  }
  render() {
    if (!this.state.viewModel) return null;
    let children = [], BasicComponent, model;
    children.push(<Switch defaultChecked={this.state.checked} onChange={(checked) => this.onChange(checked)} />);
    for (var attr in BasicComponents) {
      BasicComponent = BasicComponents[attr];
      model = this.state.viewModel.get(attr.trim().toLocaleLowerCase());
      children.push(<BasicComponent model={model} />);
    }
    return <div>{children}</div>
  }
}
