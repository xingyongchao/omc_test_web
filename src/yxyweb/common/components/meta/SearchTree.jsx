import React from 'react';
import { Tree, Select, Icon, Button } from 'antd';

const TreeNode = Tree.TreeNode;
const Option = Select.Option;

export class SearchTreeControl extends React.Component {
  constructor(props) {
    super(props);
    let filterProps = ['name'];
    let placeholder = null;
    if (props.config) {
      let config = null;
      try {
        config = JSON.parse(this.props.config);
      } catch (e) {
        config = {};
      }
      if (cb.utils.isArray(config.filters))
        filterProps = config.filters;
      if (config.placeholder)
        placeholder = config.placeholder;
    }
    this.state = {
      multiple: this.props.multiple || false,
      checkable: this.props.checkable || false,
      expandAll: this.props.expandAll || false,
      keyField: this.props.keyField || 'key',
      titleField: this.props.titleField || 'title',
      childrenField: this.props.childrenField || 'children',
      expandedKeys: this.props.expandedKeys || [],
      visible: !props.bHidden,
      autoExpandParent: false,
      selectedKeys: [],
      checkedKeys: [],
      dataSource: [],
      optionData: [],
      renderFlag: true,
      searchValue: '',//搜索框的value
      selectKey: '',//搜索框下拉选中值
      filterProps: filterProps,
      placeholder: placeholder
    };
    this.selectDataSource = [];//拍平的datasource
  }

  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillReceiveProps(nextProps) {
    let childrenField = this.state.childrenField;
    if (!nextProps.dataSource || this.props.id === nextProps.id) return;
    let states = { dataSource: nextProps.dataSource, optionData: nextProps.dataSource };
    if (this.state.expandAll) {
      let keyField = this.state.keyField;
      const expandedKeys = [];
      const loop = data => data.map((item) => {
        expandedKeys.push(item[keyField]);
        if (item[childrenField])
          loop(item[childrenField]);
      });
      loop(nextProps.dataSource);
      states.expandedKeys = expandedKeys;
    }
    this.setState(states);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  onSelect(selectedKeys, e) {
    if (this.props.onSelect)
      this.props.onSelect(selectedKeys, e);
    if (this.props.model)
      this.props.model.select(selectedKeys);
  }
  onCheck = (checkedKeys) => {
    if (this.props.model)
      this.props.model.check(checkedKeys);
  }
  onExpand(expandedKeys, e) {
    if (e) { //通过点击＋或者-触发
      this.setState({ expandedKeys: expandedKeys, autoExpandParent: false });
    } else { //通过搜索触发
      this.setState({ expandedKeys: expandedKeys, autoExpandParent: true });
    }
  }

  searchSelect(value, option) {
    const { selectData, expandedKeys } = this.state;
    const currentData = selectData.find(item => {
      return item.id == value;
    });
    const newExpandedKeys = [].concat(expandedKeys);
    if (currentData && currentData.parent) {
      const expandedKey = currentData.parent.toString();
      if (newExpandedKeys.indexOf(expandedKey) === -1)
        newExpandedKeys.push(expandedKey);
    }
    this.onExpand(newExpandedKeys);
    this.onSelect([value]);
  }
  fetch(value, callback) {
    const dataSource = this.selectDataSource;
    const { filterProps } = this.state;
    const data = [];
    dataSource.forEach(ele => {
      filterProps.forEach(field => {
        if (ele[field].indexOf(value) < 0) return;
        data.push(ele);
      });
    });
    callback(data);
  }
  getSelectData(data, parent) {
    const { childrenField } = this.props;
    data.forEach(function (ele) {
      const item = { parent: parent };
      for (var attr in ele) {
        if (attr === childrenField) continue;
        item[attr] = ele[attr];
      }
      this.selectDataSource.push(item);
      if (ele.children) {
        this.getSelectData(ele.children, ele.id)
      }
    }, this);
  }
  onSearch(value) {
    this.setState({ searchValue: value });
    this.fetch(value, selectData => this.setState({ selectData }));
  }
  getSearchOptions() {
    let searchValue = this.state.searchValue;
    if (searchValue == '') return
    let selectData = this.state.selectData;
    let options = [];
    selectData.forEach(function (ele) {
      options.push(<Option key={ele[this.state.keyField]}>{ele[this.state.titleField]}</Option>)
    }, this);
    return options;
  }
  setDataSource(dataSource) {
    this.selectDataSource = [];
    this.getSelectData(dataSource);
    this.setState({ dataSource });
  }
  handleSearchClick = (e) => {
    this.flag = true;
  }
  handleTreeClick = (e) => {
    this.flag = true;
  }
  handleClick = (e) => {
    if (this.flag) {
      this.flag = false;
      return;
    }
    this.onSelect([]);
  }
  render() {
    let titleField = this.state.titleField;
    let keyField = this.state.keyField;
    let childrenField = this.state.childrenField;

    const loop = data => data.map((item) => {
      if (item[childrenField]) {
        return <TreeNode data={item} title={item[titleField]} key={item[keyField]}>{loop(item[childrenField])}</TreeNode>;
      }
      return <TreeNode data={item} title={item[titleField]} key={item[keyField]} isLeaf={item.isLeaf} disabled={item.disabled} />;//onClick={}
    });
    const treeNodes = loop(this.state.dataSource);
    let treeProps = {
      multiple: this.state.multiple,
      checkable: this.state.checkable,
      expandedKeys: this.state.expandedKeys,
      selectedKeys: this.state.selectedKeys,
      checkedKeys: this.state.checkedKeys,
      autoExpandParent: this.state.autoExpandParent
    };
    let style = this.state.visible ? {} : { display: "none" };
    let options = this.getSearchOptions();
    return (
      <div onClick={this.handleClick} className="bg-white border-r" style={{ width: '240px', height: this.props.height }}>
        <div onClick={this.handleSearchClick} className="search-tree-2">
          <Button icon="search" />
          <Select placeholder={this.state.placeholder} mode="combobox" value={this.state.searchValue} notFoundContent="啊哦！没此节点哦！"
            onSelect={(value, option) => this.searchSelect(value, option)} onSearch={(value) => this.onSearch(value)}
            defaultActiveFirstOption={false} showArrow={false} filterOption={false} onChange={this.handleChange} dropdownMatchSelectWidth={false}>
            {options}
          </Select>
        </div>
        <div onClick={this.handleTreeClick} className="search-tree-3">
          <Tree key={treeNodes.length} style={style} onExpand={(expandedKeys, e) => this.onExpand(expandedKeys, e)} onSelect={(selectedKeys, e) => this.onSelect(selectedKeys, e)} onCheck={this.onCheck} {...treeProps}>
            {treeNodes}
          </Tree>
        </div>
      </div>
    )
  }
};
export default SearchTreeControl
