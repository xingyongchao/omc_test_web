import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import * as BaseComponents from '../BasicComponents'

const BasicComponentsMap = {};
for (var attr in BaseComponents)
  BasicComponentsMap[attr.toLocaleLowerCase()] = BaseComponents[attr];
export default class HighLight extends Component {
  constructor(props) {
    super(props);
    this.key = props.key;
    this.meta = props.meta;
    this.model = props.model;
  }

  componentDidMount() {
    if (this.model)
      this.model.addListener(this);
  }

  componentWillUnmount() {
    if (this.model)
      this.model.removeListener(this);
  }

  _renderComponents() {
    if (!this.meta)
      return "";
    let controls = [];
    this.meta.controls.map((item, index) => {
      const control = this.getControl(item, index);
      controls.push(<Flex key={index}><Flex.Item>{control}</Flex.Item></Flex>);
    })
    return controls;
  }

  getControl(item, index) {
    let ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
    switch (ctrlType) {
      case "money":
        ctrlType = 'input';
        break;
    }
    let ComName = BasicComponentsMap[ctrlType];
    return <ComName noTitle={true} viewMeta={item} model={this.model.get(item.cItemName)}></ComName>
  }

  render() {
    let constrol = this._renderComponents();
    let className = "card_contains card-highlight";
    if (this.props.hType == 'tophighlight') className = "card_contains card-tophighlight";
    return <div className={className}>{constrol}</div>;
  }
}
