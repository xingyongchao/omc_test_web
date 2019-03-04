import React, { Component } from 'react';
import { Accordion, List, Icon, Checkbox } from 'antd-mobile';
import _ from 'lodash'
export default class ReferTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      expandKeys: [],
      keyMap: {},
    };
  }

  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }

  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }

  setListenerState(params) {
    const { value, keyField } = params;
    delete params.value;
    const { select } = this.state;
    if (select && select.length) {
      const checkedKeys = [];
      select.forEach(item => {
        checkedKeys.push(item[keyField]);
      });
      params.checkedKeys = checkedKeys;
    }
    this.setState(params);
    if (value)
      this.setValue(value);
  }
  setValue = (value) => {
    if (cb.utils.isArray(value)) return;
    this.setState({ value });
  }
  setDataSource(data) {
    this.setState({ dataSource: data, isLoading: false, refreshing: false });
  }
  onCheckedChange = (e, ele) => {
    let { keyField, selectedKeys, multiple } = this.state;
    let checked = e.target.checked;
    let keys = [];
    if (!multiple) {
      this.props.model.select(ele[keyField]);
      if (this.props.goBack) this.props.goBack();
      return;
    }
    if (checked) {
      selectedKeys.push(ele[keyField]);
      keys = selectedKeys;
    } else {
      selectedKeys.map(key => {
        if (key != ele[keyField]) keys.push(key);
      })
    }
    this.props.model.select(keys);
  }
  onListItemClick = (e, node) => {
    if (e.target.type == 'checkbox') return;
    let { keyField, expandKeys } = this.state;
    let keys = [];
    if (_.indexOf(expandKeys, node[keyField]) == -1) {
      expandKeys.push(node[keyField]);
      keys = expandKeys;
    } else {
      expandKeys.map(key => {
        if (key != node[keyField]) keys.push(key);
      });
    }
    this.setState({ "expandKeys": keys });
  }
  loopTreeNodes(nodes) {
    if (!nodes || nodes.length == 0) return null;
    let { keyField, selectedKeys, expandKeys } = this.state;
    let controls = [];
    nodes.map(node => {
      let checked, expanded, level;
      if (_.indexOf(selectedKeys, node[keyField]) != -1) checked = true;
      if (_.indexOf(expandKeys, node[keyField]) != -1) expanded = true;
      level = node.path.split('|').length - 1;
      /*add by jinzh1  特殊处理商品类别参照 path不规范*/
      if (node.path[0] == '|') level -= 1;

      if (node.children) {
        controls.push(
          <List.Item className={"refer-row-level" + level} key={node.name} onClick={e => this.onListItemClick(e, node)} arrow={expanded ? "up" : "down"}
            thumb={<Checkbox checked={checked} onChange={e => this.onCheckedChange(e, node)} />}  >
            {node.name}
          </List.Item>
        );
        if (expanded) {
          let newControl = this.loopTreeNodes(node.children);
          controls = controls.concat(newControl);
        }
      } else {
        controls.push(
          <List.Item className={"refer-row-level" + level} key={node.name} thumb={<Checkbox checked={checked}
            onChange={e => this.onCheckedChange(e, node)} />}>
            {node.name}
          </List.Item>
        )
      }
    });
    return controls;
  }

  loopFirst(dataSource) {
    if (!dataSource || dataSource.length == 0) return null;
    let { keyField, selectedKeys } = this.state;
    let secondArr = [];
    dataSource.forEach(function (element) {
      let ele, checked;
      if (_.indexOf(selectedKeys, element[keyField]) != -1) checked = true;
      if (element.children) {
        let secondData = this.loopSecond(element.children);
        ele = <Accordion.Panel key={element.name}
          header={<Checkbox checked={checked} onChange={e => this.onCheckedChange(e, element)}>{element.name}</Checkbox>}>
          {secondData}
        </Accordion.Panel>

      } else {
        ele = <List.Item key={element.name} onClick={this.onListItemClick} thumb={<Checkbox checked={checked}
          extra={<Icon type="down" />} onChange={e => this.onCheckedChange(e, element)} />}>{element.name}</List.Item>
      }
      secondArr.push(ele);
    }, this);
    let finalEle = <Accordion activeKey={this.state.secondKey} accordion onChange={(key) => this.handleTabChange(key, 'second')}>
      {secondArr}
    </Accordion>
    return finalEle;
  }
  loopSecond(dataSource) {
    let { keyField, selectedKeys } = this.state;
    let thirdArr = [];
    dataSource.forEach(function (element) {
      let ele = (
        <List.Item key={element.name} thumb={<Checkbox checked={_.indexOf(selectedKeys, element[keyField]) != -1}
          onChange={e => this.onCheckedChange(e, element)} />}>
          {element.name}
        </List.Item>
      )
      thirdArr.push(ele);
    }, this)
    return thirdArr
  }
  handleTabChange(key, flag) {
    if (flag == 'first') this.setState({ firstKey: key, secondKey: null });
    if (flag == 'second') this.setState({ secondKey: key });
  }

  render() {
    if (!this.state) {
      return null;
    }
    let control = this.loopTreeNodes(this.state.dataSource);
    return (
      <List className='billing-cz' >{control}</List>);
  }

}
