import React, { Component } from 'react';
import { List, Flex } from 'antd-mobile';
import { getFixedNumber } from 'src/common/redux/modules/billing/paymode'
const Item = List.Item;

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: {},
      dataSource: [],
    }
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  setListenerState = (params) => {
    this.setState(params);
  }
  setDataSource = (dataSource) => {
    this.setState({ dataSource });
  }
  getControl = () => {
    const { columns, dataSource } = this.state;
    const viewMeta = this.props.viewMeta || [];
    let rows = [];
    dataSource.map((row, index) => {
      let cols = [];
      for (var key in columns) {
        let iAlign = 1;
        viewMeta.map(view => {
          if (view.cItemName == key)
            iAlign = view.iAlign;
        })
        let className = "textAlignRight";
        if (iAlign == 1) className = "textAlignLeft";
        if (iAlign == 2) className = "textAlignCenter";
        let vals = row[key];
        if (columns[key].cControlType === 'money' && vals) {
          vals = getFixedNumber(vals);
        }
        cols.push(
          <Flex.Item className={className}>{vals}</Flex.Item>
        )
      }
      rows.push(<Flex>{cols}</Flex>)
    });
    return <div className="flex-container">{rows}</div>
  }
  render() {
    const control = this.getControl();
    return (
      <List className="payTable">
        <Item extra={control}>{this.props.title}</Item>
      </List>
    );
  }
}
