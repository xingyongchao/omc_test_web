import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BaseComponents from '../BasicComponents'
import { List } from 'antd-mobile';
import SvgIcon from 'SvgIcon';
const BasicComponentsMap = {};
for (var attr in BaseComponents)
  BasicComponentsMap[attr.toLocaleLowerCase()] = BaseComponents[attr];

export default class DetailHeaderControl extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
    };
    this.viewModel = props.model;
    this.meta = props.meta;
    this.ShowLineMeta = null;
    this.initMeta(props.meta);
  }
  initMeta = (meta) => {
    if (!meta.containers) return;
    meta.containers.map(container => {
      let controls = container.controls;
      if (container.cGroupCode == 'ShowLine')
        this.ShowLineMeta = controls;
    });
  }
  getControl = (meta) => {
    if (!meta) return null;
    let controls = [];
    meta.map(item => {
      let ctrlType = item.cControlType.trim().toLocaleLowerCase();
      switch (ctrlType) {
        case "money":
        case "inputnumber":
        case "treerefer":
        case "searchbox":
          ctrlType = 'input';
          break;
      }
      let ComName = BasicComponentsMap[ctrlType];
      if (!ComName) return "";
      controls.push(
        <ComName viewMeta={item} model={this.props.model.get(item.cItemName)}></ComName>
      );
    })
    return controls;
  }
  onClick = () => {
    let pathList = window.location.pathname.split('/');
    let pathname = pathList[pathList.length - 1];
    this.context.router.history.push(`/headerInfo/${pathname}`);
  }
  getBaseControl = () => {
    let control, mode;
    if (this.props.model)
      mode = this.props.model.getParams().mode;
    control = this.getControl(this.ShowLineMeta);
    return (
      <List className="voucher-header">
        {mode != 'browse' ? <List.Item extra={<SvgIcon style={{ width: '0.42rem', height: '0.42rem' }} type="edit" onClick={this.onClick} />}>{this.props.meta.cName}</List.Item> : null}
        <div onClick={mode === 'browse' && this.onClick}>{control}</div>
      </List>
    )
  }
  render() {
    const control = this.getBaseControl();
    return control;
  }

}
