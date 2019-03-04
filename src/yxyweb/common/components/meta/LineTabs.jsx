import React, { Component } from 'react';
import { Menu, Tabs } from 'antd';
import { Row } from '../basic';
import * as MetaComponents from './index';
import Meta from '../meta-runner';

const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;

export default class LineTabs extends Component {
  constructor(props) {
    super(props);
    this.keyField = 'cGroupCode';
    this.keyVisible = {};
    this.defaultActiveKey = this.init(props.containers);
    this.state = {
      activeKey: this.defaultActiveKey,
      keyVisible: this.keyVisible,
      className: props.config.classname
    };
  }
  componentDidMount() {
    const { viewModel, meta } = this.props;
    viewModel.on('updateViewMeta', args => {
      if (this.groupKeys.indexOf(args.code) === -1) return;
      if (args.caption) {
        const container = this.newContainers.find(item => {
          return item[this.keyField] === args.code;
        });
        if (container) {
          container.cName = args.caption;
          this.setState({ flag: true });
        }
        return;
      }
      const { keyVisible, activeKey } = this.state;
      keyVisible[args.code] = args.visible;
      const states = { keyVisible };
      states.activeKey = Object.keys(keyVisible).find((v) => { return keyVisible[v] }) || '';
      // if (keyVisible[activeKey] === false) {
      //   states.activeKey = this.defaultActiveKey;
      //   if (keyVisible[states.activeKey] === false)
      //     states.activeKey = '';
      // }
      // if (activeKey === '' && args.visible)
      //   states.activeKey = args.code;
      this.setState(states);
    });
  }
  init(containers) {
    if (!containers || !containers.length) return;
    let activeKey = '';
    this.toolbarContainers = {};
    this.newContainers = [];
    this.groupKeys = [];
    this.external = {};
    containers.forEach((container, index) => {
      const key = container[this.keyField];
      if (index === 0)
        activeKey = key;
      const subContainers = container.containers;
      if (!subContainers || !subContainers.length) return;
      const newContainer = Object.assign({}, container);
      newContainer.containers = [];
      subContainers.forEach(item => {
        if (item.cControlType && item.cControlType.trim().toLocaleLowerCase() === 'toolbar') {
          if (this.toolbarContainers[key])
            this.toolbarContainers[key].controls = (this.toolbarContainers[key].controls || []).concat(item.controls || []);
          else
            this.toolbarContainers[key] = item;
        } else {
          newContainer.containers.push(item);
        }
      });
      this.newContainers.push(newContainer);
      this.groupKeys.push(key);
      this.keyVisible[key] = true;
      if (!container.cStyle) return;
      const config = JSON.parse(container.cStyle);
      if (!config.billnum) return;
      this.external[key] = { config: container.cStyle, component: null };
    });
    return activeKey;
  }
  externalReady(parentViewModel, viewModel, config) {
    if (!config.filter) return;
    const condition = { commonVOs: [{ itemName: config.filter, value1: null }] };
    let currentValue = parentViewModel.get(config.key).getValue();
    condition.commonVOs[0].value1 = currentValue;
    const params = viewModel.getParams();
    params.filterId = null;
    params.condition = condition;
    if (!currentValue)
      params.autoLoad = false;
    parentViewModel.on('afterLoadData', function () {
      currentValue = parentViewModel.get(config.key).getValue();
      if (!currentValue) return;
      condition.commonVOs[0].value1 = currentValue;
      viewModel.execute('filterClick', { condition });
    });
  }
  handleClick(e) {
    const { key } = e;
    this.setState({ activeKey: key });
    if (!this.external[key] || this.external[key].component) return;
    const config = JSON.parse(this.external[key].config);
    const data = {
      billtype: 'voucherlist',
      billno: config.billnum
    };
    cb.loader.runCommandLine('bill', data, this.props.viewModel, (vm, viewmeta) => {
      this.externalReady(this.props.viewModel, vm, config);
      this.external[key].component = <Meta index={this.props.index} width={this.props.width} viewModel={vm} metaData={viewmeta} />
      this.external[key].viewModel = vm;
      this.setState({ flag: true });
    });
  }
  renderMenuItems() {
    const { keyVisible } = this.state;
    const menuItems = [];
    this.newContainers.forEach(item => {
      const key = item[this.keyField];
      if (keyVisible[key] === false) return;
      menuItems.push(<MenuItem key={key}><a>{item.cName}</a></MenuItem>);
    });
    return menuItems;
  }
  renderMenu() {
    const menuItems = this.renderMenuItems();
    return (
      <Menu className="tab-menu" mode="horizontal" selectedKeys={[this.state.activeKey]} onSelect={e => this.handleClick(e)}>
        {menuItems}
      </Menu>
    )
  }
  renderTabItems() {
    const { viewModel, width, height } = this.props;
    const items = [];
    let tabContent = null;
    this.newContainers.forEach(container => {
      const key = container[this.keyField];
      tabContent = this.external[key] ? this.external[key].component : <MetaComponents.Container meta={container} viewModel={viewModel} width={width} height={height} parents='LineTabs' />
      items.push(<TabPane tab={container.cName} key={key}><div id={`${viewModel.getParams() && viewModel.getParams().billNo}|${key}`}>{tabContent}</div></TabPane>);
    });
    return items;
  }
  renderToolbar() {
    const toolbarContainer = this.toolbarContainers[this.state.activeKey];
    if (!toolbarContainer)
      return null;
    return (
      <div className='tab-top-right'>
        <MetaComponents.Toolbar align={'right'} config={toolbarContainer.cStyle} controls={toolbarContainer.controls} model={this.props.viewModel} />
      </div>
    );
  }
  render() {
    const { activeKey, className } = this.state;
    if (!activeKey)
      return null;
    const menu = (
      <Row>
        {this.renderMenu()}
        {this.renderToolbar()}
      </Row>
    );
    const tabs = (
      <Tabs className="card-container" activeKey={activeKey} type="card" animated={false}>
        {this.renderTabItems()}
      </Tabs>
    );
    return (
      <Row className={`line-tabs ${className}`}>
        {menu}
        {tabs}
      </Row>
    );
  }
}
