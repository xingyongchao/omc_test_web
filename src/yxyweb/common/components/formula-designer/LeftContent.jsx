import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tree } from 'antd';

import * as formulaActions from '../../redux/formula';

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
    this.props.formulaActions.select(selectedKeys[0]);
  }
  onLoadData = (treeNode) => {
    this.props.formulaActions.getEntityInfo(treeNode.props.eventKey);
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
    const { treeData, billNo } = this.props.formula;
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
    formula: state.formula.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    formulaActions: bindActionCreators(formulaActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftContent);
