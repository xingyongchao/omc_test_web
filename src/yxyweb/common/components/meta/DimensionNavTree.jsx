import React from 'react';
import { Tree, Icon, Input } from 'antd';

import { genAction, proxy } from '../../helpers/util';
const Search = Input.Search;
const TreeNode = Tree.TreeNode;


export class DimensionNavTreeControl extends React.Component {
  //SearchTree
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      treeData: {},
      firstQueryDone: false
    };
    this.nodesList = [];
    this.TreeHeadKey = "all";
  }

  doProxy(url, method, params, callback, noUniform) {
    const config = { url: url, method: method, params: params };
    if (noUniform) {
      config.options = { uniform: false };
    }
    proxy(config)
      .then(json => {
        callback(json);
      });
  }

  getData() {
    let self = this;
    let param = {};
    param.billnum = "rm_saleanalysis";// self.props.billnum;
    param.condition = self.state.condition;
    param.dimensionId = 30022941;
    // param.groupSchemaId = 669953;
    // param.page = { pageSize: 20, pageIndex: 1 };
    let callback = (json) => {
      if (json.code === 200) {
        if (json.data) {
          self.setState({ treeData: json.data, expandedKeys: [] });
        }
      }
    }
    self.doProxy('/report/list', 'POST', param, callback);
  }
  getTitle(title) {
    let searchValue = this.state.searchValue
    if (searchValue != "") {
      let index = title.indexOf(searchValue);
      let beforeStr = title.substr(0, index);
      let afterStr = title.substr(index + searchValue.length);
      return index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{title}</span>;
    }
    return <span>{title}</span>;
  }
  getTreeNodes(recordList, parentFilter, parentKey) {
    if (parentKey == this.TreeHeadKey) {
      this.nodesList = [];
    }
    let treeNodes;
    if (recordList && recordList.length > 0) {
      treeNodes = [];
      recordList.forEach(ele => {
        if (!ele.navKey) {
          ele.navKey = "navKey_" + Math.random().toString().replace(".", "");
        }
        let key = ele.navKey;
        let filter = _.cloneDeep(parentFilter);
        ele.field && ele.field.forEach((item, index) => {
          filter[item] = ele.caption[index];
        });
        let joinedCaption = ele.caption && ele.caption.join("_");
        let title = this.getTitle(joinedCaption);
        let childrenNodes = undefined;
        if (ele.children && ele.children.length > 0) {
          childrenNodes = this.getTreeNodes(ele.children, filter, key);
        }
        this.nodesList.push({ title: joinedCaption, key: key, parentKey: parentKey });
        treeNodes.push(<TreeNode
          title={title}
          key={key}
          filter={filter}
        >
          {childrenNodes}
        </TreeNode >);
        // treeNodes.push(<TreeNode {...node} > {childrenNodes}</TreeNode >);
      });
    }
    return treeNodes;

  }
  onSelect(selectedKeys, e) {
    console.log("选择点的过滤项目 = " + JSON.stringify(e.node.props.filter))
    const filterViewModel = this.props.viewModel.getCache('FilterViewModel');
    filterViewModel.execute('navClick', e.node && e.node.props.filter || {})
  }
  onExpand = (expandedKeys, e) => {
    // this.setState({ expandedKeys: expandedKeys });
    if (e) { //通过点击＋或者-触发
      this.setState({ expandedKeys: expandedKeys, autoExpandParent: false });
    } else { //通过搜索触发
      this.setState({ expandedKeys: expandedKeys, autoExpandParent: true });
    }
  }

  onChange = (e) => {
    const value = e.target.value;
    let expandedKeys = [];
    if (value != "") {
      this.nodesList.forEach((item) => {
        if (item.title.indexOf(value) > -1) {
          if (expandedKeys.indexOf(item.parentKey) == -1)
            expandedKeys.push(item.parentKey);
        }
      });
    }

    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }

  render() {

    let treeNodes = this.getTreeNodes(this.state.treeData.recordList, {}, this.TreeHeadKey);
    return (
      <div  >
        <Search
          style={{ marginBottom: 5 }}
          placeholder="Search"
          onChange={this.onChange}
        />
        <Tree
          onSelect={(selectedKeys, e) => this.onSelect(selectedKeys, e)}
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
        >
          <TreeNode title="全部类别" key={this.TreeHeadKey} >
            {treeNodes}
          </TreeNode >
        </Tree>
      </div>
    )
  }
  onFilterClick = (params) => {
    if (!params.bFromNav && this.state.firstQueryDone) {
      this.state.condition = params.condition;
      this.getData();
    }
  };
  componentDidMount() {
    let self = this;
    // if (this.props.model)
    //   this.props.model.addListener(this);
    this.props.viewModel.on("filterClick", this.onFilterClick);
    this.props.viewModel.on('firstQueryDone', (params) => {

      self.state.firstQueryDone = params;
    });
  }
  componentDidUpdate() {
    // if (this.props.model)
    //   this.props.model.addListener(this);
  }
  componentWillReceiveProps(nextProps) {

  }
  componentWillUnmount() {

  }
};
export default DimensionNavTreeControl
