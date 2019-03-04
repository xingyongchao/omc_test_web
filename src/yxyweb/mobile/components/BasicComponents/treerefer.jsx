import React, { Component } from 'react';
import { List } from 'antd-mobile';
import { TreeReferModel } from '../refer';

export default class TreeReferControl extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.model) {
      this.props.model.addListener(this);
    }
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }

  open(e) {
    this.setState({ vm: e.vm });
    let control;
    control = (
      <TreeReferModel height={window.innerHeight} vm={e.vm} model={this.props.model} close={this.close} />
    )
    this.props.referStatus(control, true)
  }

  close = () => {
    this.props.referStatus(null, false);
  }

  handClick = () => {
    if (this.state.disabled) return;
    let model = this.props.model || this.model;
    if (!model && this.props.cRefType) {
      //当不存在时
    }
    if (model) {
      model.browse(true);
    }
  }

  render() {
    if (!this.state) {
      return null;
    }
    let name = '请选择'; let className = "";
    if (this.props.model.get('text')) {
      name = this.props.model.get('text');
      className = "uretail_refer"
    }

    return (
      <div className={className}>
        <List>
          <List.Item onClick={this.handClick} className="store-list" arrow="horizontal" extra={name}>{this.props.title}</List.Item>
        </List>
      </div>
    )
  }

}
