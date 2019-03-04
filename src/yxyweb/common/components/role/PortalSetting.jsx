import React, { Component } from 'react';
import { Checkbox, Button } from 'antd';
import { Row, Col } from '../basic';

const PortalComponents = [
  { title: '营业概览', order: 0 },
  { title: '销售排行', order: 1 },
  { title: '门店销售趋势', order: 2 }
];

export default class PortalSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.dataSource || PortalComponents
    };
    this.originalData = cb.utils.extend(true, [], this.state.dataSource);
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.dataSource || nextProps.dataSource === this.state.dataSource) return;
    this.setState({ dataSource: nextProps.dataSource });
    this.originalData = cb.utils.extend(true, [], this.state.dataSource);
  }
  getData() {
    const { dataSource } = this.state;
    let flag = true;
    for (let i = 0, len = dataSource.length; i < len; i++) {
      const currentItem = dataSource[i];
      const originalItem = this.originalData[i];
      if(!originalItem) {
        return cb.utils.extend(true, [], PortalComponents);
      }
      if (currentItem.order === originalItem.order && currentItem.visible === originalItem.visible) continue;
      flag = false;
    }
    if (flag)
      return null;
    return cb.utils.extend(true, [], this.state.dataSource);
  }
  onMouseEnter(index) {
    const { dataSource } = this.state;
    const currentItem = dataSource.find(item => {
      return item.order === index;
    });
    currentItem.showIcon = true;
    this.setState({ dataSource });
  }
  onMouseLeave(index) {
    const { dataSource } = this.state;
    dataSource.forEach(item => {
      item.showIcon = false;
    });
    this.setState({ dataSource });
  }
  sortClick(type, index) {
    const { dataSource } = this.state;
    const swapIndex = type === 'up' ? index - 1 : index + 1;
    const currentItem = dataSource.find(item => {
      return item.order === index;
    });
    const swapItem = dataSource.find(item => {
      return item.order === swapIndex;
    });
    currentItem.order = swapIndex;
    swapItem.order = index;
    this.setState({ dataSource });
  }
  onChecked(index, checked) {
    const { dataSource } = this.state;
    const currentItem = dataSource.find(item => {
      return item.order === index;
    });
    currentItem.visible = checked;
    this.setState({ dataSource });
  }
  renderItem(element, index, totalCount) {
    const { showIcon, visible } = element;
    const upDisabled = index === 0 ? true : false;
    const downDisabled = index === totalCount - 1 ? true : false;
    const rightIcons = showIcon ? (
      <div className='pull-right'>
        <Button disabled={upDisabled} style={{ borderWidth: 0 }} icon="arrow-up" onClick={() => this.sortClick('up', index)}></Button>
        <Button disabled={downDisabled} style={{ borderWidth: 0 }} icon="arrow-down" onClick={() => this.sortClick('down', index)}></Button>
      </div>
    ) : null;
    return (
      <Row style={{ minHeight: "25px" }} onMouseEnter={() => this.onMouseEnter(index)} onMouseLeave={() => this.onMouseLeave(index)}>
        <div className='pull-left'>
          <Checkbox checked={visible} onChange={e => this.onChecked(index, e.target.checked)}>{element.title}</Checkbox>
        </div>
        {rightIcons}
      </Row>
    );
  }
  render() {
    const { dataSource } = this.state;
    if (!dataSource || !dataSource.length)
      return null;
    const orderedData = Object.assign([], dataSource).sort((a, b) => {
      return a.order > b.order;
    });
    const totalCount = orderedData.length;
    const components = [];
    orderedData.forEach((element, index) => {
      const component = this.renderItem(element, index, totalCount);
      components.push(component);
    });
    return (
      <div className='filter-txt'>{components}</div>
    );
  }
}
