import React, { Component } from 'react';
import { ReferTree } from '../refer';
import { SearchBar, Button, Flex } from 'antd-mobile';
import NavBar from '../NavBar'

export default class TreeReferModel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
    this.searchBoxModel = this.props.vm.get('searchBox');
    this.searchBoxModel.addListener(this);
  }

  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
    this.searchBoxModel = this.props.vm.get('searchBox');
    this.searchBoxModel.removeListener(this);
  }

  onLeftClick() {
    this.props.close();
  }

  onSearch() {
    this.searchBoxModel.execute('search', this.state.searTxt);
  }

  onChange(value) {
    this.setState({ searTxt: value });
  }

  onCancel(type) {
    this.setState({ searTxt: '' });
    if (type === 'cancel') {
      this.searchBoxModel.execute('search', '');
    }
  }
  onOkClick = (e, referViewModel) => {
    let treeModel = referViewModel.get('tree');
    referViewModel.execute('afterOkClick', treeModel.getSelectedNodes());
    this.props.close();
  }
  getHeight() {
    if (window) {
      let height = this.props.height - window.__fontUnit * (1.4 + 1.28);
      if (height > 0)
        return height;
    }
    return undefined;
  }
  render() {
    if (!this.state) {
      return null;
    }
    let { searTxt } = this.state;
    return (
      <div>
        <NavBar title={this.state.itemTitle + '参照'} onLeftClick={this.onLeftClick.bind(this)} />
        {/*modify by jinzh1  隐藏移动端树参照的搜索框*/}
        {/* <SearchBar value={searTxt} placeholder={this.state.placeholder} onSubmit={this.onSearch.bind(this)} onChange={this.onChange.bind(this)} onClear={this.onCancel.bind(this, 'clear')} onCancel={this.onCancel.bind(this, 'cancel')} /> */}
        <div style={{ height: this.getHeight(), overflow: 'scroll' }} >
          <ReferTree model={this.props.vm.get('tree')} cRefType={this.state.cRefType} />
        </div>
        <Flex className="tree-refer-button">
          <Flex.Item>
            <Button onClick={e => this.onOkClick(e, this.props.vm)}>确定</Button>
          </Flex.Item>
        </Flex >
      </div >
    )
  }

}
