import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Tabs } from 'antd-mobile';
import Meta from '../MetaRunner';

import * as portalactions from 'yxyweb/common/redux/portal';

const TabPane = Tabs.TabPane;

import env from 'yxyweb/common/helpers/env';
require('src/mobile/styles/globalCss/portalTabItem.css');
class PortalTabItem extends Component {
  constructor(props) {
    super(props);
    this.tabs = [];
    this.list = [];
    this.height = window.screen.height;
    this.width = window.screen.width;
  }
  componentDidMount() {
    /*监听屏幕方向改变*/
    cb.events.on('lockOrientation', function (args) {
      this.setState({ "lockOrientation": args });
    }, this);
  }
  componentWillUnmount() {
    const { portalactions, match } = this.props;
    // portalactions.destroy(match.params.menuId);
  }
  render() {
    let { portal, match, width, height } = this.props;
    const index = match.params.menuId;
    const current = portal.tabs[index];
    if (!height) {
      // height = document.documentElement.offsetHeight;
      if (window.plus && window.plus.screen && this.state && this.state.lockOrientation) {
        // height = window.plus.screen.resolutionHeight;
        height = this.width;
      }
      else {
        // height = window.screen.height;
        height = this.height;
      }
    }
    if (!current || !current.panes.length)
      return null;
    this.tabs = [];
    const length = current.panes.length;
    let i;
    for (i = 0; i < length; i++) {
      const pane = current.panes[i];
      this.tabs.push({ key: pane.key, title: 'Tab' + i });
      let tabContent;
      if (pane.content.vm) {
        tabContent = <Meta
          index={index}
          width={width}
          height={height}
          viewModel={pane.content.vm}
          metaData={pane.content.metaData}
          id={pane.key} />
      }
      if (tabContent) {
        if (this.list[i]) {
          this.list[i] = <div key={pane.key} style={{ height: height }}>{tabContent}</div>
        } else {
          this.list.push(<div key={pane.key} style={{ height: height }}>{tabContent}</div>);
        }
      }
    }
    if (this.list[i])
      this.list.splice(i, 1);
    return <div style={{ height: height }} className="meta-container"><Tabs key={length} tabs={this.tabs} page={current.activeKey} animated={false}>{this.list}</Tabs></div>
  };

}

function mapStateToProps(state) {
  return {
    portal: state.portal.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    portalactions: bindActionCreators(portalactions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortalTabItem);
