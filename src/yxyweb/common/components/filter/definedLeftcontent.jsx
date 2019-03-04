import React, { Component } from 'react';
import { Tree, Input } from 'antd';
import { proxy } from '../../helpers/util';
import _ from 'lodash'
const { TreeNode } = Tree;
const Search = Input.Search;
const dataList = [];
export default class definedLeftcontent extends React.Component {
  constructor(props) {
  super(props);
  let billNo = this.props.model.getParams().billNo
  this.state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
    selectedKeys:[],
    selectName:'',
    billNo:billNo,
    billNodata:[]
  }
  }
  componentDidMount(){
    let {billNo} = this.state;
    this.getdataSource(billNo)
  }
  async getdataSource(billNo){
    const config = {
      url: 'report/getEntityInfoByBillNo.do',
      method: 'GET',
      params: {
        billno: billNo
      }
    };
    const json = await proxy(config);
    if(json.code!==200) return 
    json.data && this.setState({billNodata:json.data})

  }
 
  generateList (data){
    // for (let i = 0; i < data.length; i++) {
    //   const node = data[i];
    //   const key = node.key;
    //   dataList.push({ key, title: node.title });
    //   if (node.children) {
    //     this.generateList(node.children, node.key);
    //   }
    // }
    data.forEach((item)=>{
      let key = item.name;
      let title = item.title;
      dataList.push({key:key,title:title});
      if(item.children){
        this.generateList(item.children,item.name)
      }


    })
  };
  // generateList(gData);
  
 getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some(item => item.name === key)) {
          parentKey = node.name;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };
  
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onChange = (e) => {
    let {billNodata} = this.state
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return this.getParentKey(item.key, billNodata);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    });
  }
  onTreeselect(selectedKeys,e){
    let {billNodata} = this.state;
    if(!selectedKeys.length){
      selectedKeys = this.state.selectedKeys
    }
    this.setState({selectName:e.selectedNodes,selectedKeys})
    this.props.onSelect(selectedKeys[0],billNodata)
    console.log('e',e.selectedNodes)
    console.log(e)
  }
  loadData = (treeNode) => {
    console.log('treeNode',treeNode);
    let self = this;
    self.getLoadData(treeNode);
    // return new Promise();
  }
  async getLoadData (treeNode){
    console.log('treeNode',treeNode)
    console.log(this.state. billNodata)
    let {billNodata} = this.state
    let key = treeNode.props.eventKey;
    let _index = _.findIndex(billNodata, (obj) => {
      return obj.name === key;
    })
    let entityName = billNodata[_index].entityName;
    const config = {
      url: ' report/getEntityInfoByName.do',
      method: 'GET',
      params: {entityName:entityName}
    };
    const json = await proxy(config);
    if(json.code!==200) return 
    // json.data && this.setState({billNodata:json.data})
    console.log('entity',json.data)
  }
  render() {
    const { searchValue, expandedKeys, autoExpandParent,selectName,billNodata} = this.state;
    // this.generateData(billNodata);
    this.generateList(billNodata)
    const loop = data => data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      let isExpand = item.isExpand ? item.isExpand : false
      if (isExpand) {
        return (
          <TreeNode key={item.name} title={title}>
            {loop([])}
          </TreeNode>
        );
      }
      return <TreeNode key={item.name} title={title} isLeaf/>;
    });
    return (
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree
        selectedKeys={this.state.selectedKeys}
        onSelect={(selectedKeys,e) =>this.onTreeselect(selectedKeys,e)}
        onExpand={this.onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        loadData={this.loadData}
        >
          {loop(billNodata)}
        </Tree>
      </div>
    );
  }
}