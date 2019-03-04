import React, { Component } from 'react';
import * as BaseComponents from '../BasicComponents'
import { Flex } from 'antd-mobile';
import env from 'yxyweb/common/helpers/env';
require('src/mobile/styles/globalCss/card.css');

const BasicComponentsMap = {};
for (var attr in BaseComponents)
  BasicComponentsMap[attr.toLocaleLowerCase()] = BaseComponents[attr];

export default class CardControl extends Component {
  constructor(props) {
    super(props);
    this.key = props.key;
    this.meta = props.meta;
    this.model = props.model;
    this.cStyle = null;
    if (this.meta.cStyle) {
      try {
        this.cStyle = JSON.parse(this.meta.cStyle);
      } catch (e) {
        cb.utils.alert('格式化字段，预制错误！', 'error');
      }
    }
  }

  componentDidMount() {
    if (this.props.model) {
      this.props.model.addListener(this);
    }
  }

  componentWillMount() {
    if (this.props.model) {
      this.props.model.removeListener(this);
    }
  }
  recursiveContainer = (containers) => {
    let controls = [], control = null;
    containers.map(container => {
      if (container.cControlType == 'table1') {
        let Table = BasicComponentsMap.table;
        control = <Flex key={container.childrenField}><Flex.Item><Table viewMeta={container.controls} title={container.cName} model={this.model.get(container.childrenField)} /></Flex.Item></Flex>;
        controls.push(control);
      } else {
        if (container.controls) {
          control = this.recursiveControl(container.controls, container.cControlType);
          controls.push(control);
        }
      }
    });
    return controls;
  }
  recursiveControl = (controls, cControlType) => {
    let list = [];
    controls.map((item, index) => {
      const control = this.getControl(item);
      list.push(<Flex key={index}><Flex.Item>{control}</Flex.Item></Flex>);
    });
    return list;
  }
  _renderComponent() {
    if (!this.meta)
      return "";
    let control;
    if (this.meta.controls)
      control = this.recursiveControl(this.meta.controls);
    if (this.meta.containers)
      control = this.recursiveContainer(this.meta.containers);
    return (
      <div>
        {control}
      </div>
    )
  }

  getControl(item) {
    let ctrlType = item.cControlType.trim().toLocaleLowerCase();
    switch (ctrlType) {
      case "money":
      case "inputnumber":
        ctrlType = 'input';
        break;
    }
    let ComName = BasicComponentsMap[ctrlType];
    if (!ComName) return "";
    return <ComName viewMeta={item} model={this.model.get(item.cItemName)}></ComName>
  }

  render() {
    let mode = this.props.model && this.props.model.getParams().mode;
    if (mode != env.VOUCHER_STATE_BROWSE) return null;
    let controls = this._renderComponent();
    return (
      <div className="card_contains">
        {controls}
      </div>
    )
  }

}
