import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tree } from 'antd';

import * as addActions from '../../redux/addMessage';

const TreeNode = Tree.TreeNode;

class LeftContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: []
    };
  }
  onSelect = (selectedKeys) => {
    if (!selectedKeys.length)
      selectedKeys = this.state.selectedKeys;
    this.setState({ selectedKeys });
    this.props.addActions.select(selectedKeys[0]);
  }
  onLoadData = (treeNode) => {
    this.props.addActions.getEntityInfo(treeNode.props.eventKey);
  }
  renderTreeNodes(treeData) {
    return treeData.map(item => {
      const { mergeCode, title, isExpand, children } = item;
      if (isExpand)
        return <TreeNode title={title} key={mergeCode}>{this.renderTreeNodes(children || [])}</TreeNode>
      return <TreeNode title={title} key={mergeCode} isLeaf />
    });
  }
  render() {
    const { treeData, billNo } = this.props.addMessage;
    if (!treeData || !treeData.length)
      return null;
    const treeNodes = this.renderTreeNodes(treeData);
    return (
      <Tree key={billNo} selectedKeys={this.state.selectedKeys} onSelect={this.onSelect} loadData={this.onLoadData}>
        {treeNodes}
      </Tree>
    );
  }
}

function mapStateToProps(state) {
  return {
    addMessage: state.addMessage.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addActions: bindActionCreators(addActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftContent);
