import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReferList, ReferTree } from '../refer';
import { SearchBar, Button, Flex } from 'antd-mobile';
import NavBar from '../NavBar'
import SvgIcon from 'SvgIcon';

export default class ReferModel extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      showTree: false
    }
    cb.utils.setStatusBarStyle("dark");
    this.referType = 'Table';
  }

  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
    if (this.props.vm) {
      this.searchBoxModel = this.props.vm.get('searchBox');
      this.referType = this.props.vm.getCache('referType')
    }
    this.searchBoxModel.addListener(this);
    this.tableHeight = document.documentElement.offsetHeight - (window.__fontUnit * 1.28 + 44);
  }

  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
    this.searchBoxModel.removeListener(this);
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
  onLeftClick = () => {
    if (this.state.showTree) {
      this.setState({ 'showTree': false });
      return
    }
    if (this.props.close) {
      this.props.close();
    } else {
      //设置状态栏字体白色
      cb.utils.setStatusBarStyle("light");
      this.context.router.history.goBack()
    }
  }
  getRightContent() {
    if (this.referType != 'TreeTable' || this.state.showTree == true) return null;
    return (
      <div onClick={() => { this.setState({ "showTree": true }) }}>
        <SvgIcon type='shaixuan' style={{ width: '0.42rem', height: '0.42rem', marginTop: '0.08rem' }} />
      </div>
    )
  }
  render() {
    if (!this.state) {
      return null;
    }
    const { searTxt, showTree } = this.state;
    const rightContent = this.getRightContent();
    return (
      <div>
        <NavBar title={this.state.itemTitle || this.state.cShowCaption + '参照'} onLeftClick={this.onLeftClick}
          rightContent={rightContent} />
        {
          showTree ? null :<SearchBar value={searTxt} placeholder={this.state.placeholder} onSubmit={this.onSearch.bind(this)} onChange={this.onChange.bind(this)} onClear={this.onCancel.bind(this, 'clear')} onCancel={this.onCancel.bind(this, 'cancel')} />
        }
        <div style={{ 'display': showTree ? 'none' : 'block' }}>
          <ReferList okClick={this.props.okClick} model={this.props.vm.get('table')} cRefType={this.state.cRefType} height={this.tableHeight} />
        </div>
        <div style={{ 'display': showTree ? 'block' : 'none' }}>
          <ReferTree model={this.props.vm.get('tree')} cRefType={this.state.cRefType} goBack={this.onLeftClick}/>
        </div>
      </div>
    )
  }

}
