import React, { Component } from 'react';
import { Tabs } from 'antd';
import { Row } from '../basic';
import * as MetaComponents from './index';
import Meta from '../meta-runner';
import SvgIcon from 'SvgIcon';

const TabPane = Tabs.TabPane;

export default class CardTabs extends Component {
  constructor(props) {
    super(props);
    this.keyField = 'cGroupCode';
    this.init(props.meta.containers);
    const config = props.meta.cStyle;
    let className = '';
    if (config) {
      try {
        className = JSON.parse(config).classname;
      } catch (e) {

      }
    }
    this.state = {
      activeKey: this.defaultActiveKey,
      paneStates: {},
      forceRenders: [],
      className
    };
  }
  componentDidMount() {
    const { activeKey } = this.state;
    if (this.external[activeKey])
      this.handleChange(activeKey);
    const { viewModel } = this.props;
    viewModel.on('updateCount', (key, count) => this.updateCount(key, count));
    viewModel.on('updateViewMeta', args => {
      if (args.forceRender) {
        let { forceRenders } = this.state;
        forceRenders.push(args.code);
        this.setState({ forceRenders })
      }
      const { paneStates, activeKey } = this.state;
      let newActiveKey = activeKey;
      const { code, visible, disabled, refresh, active } = args;
      paneStates[code] = { visible, disabled, refresh };
      if (active && visible !== false)
        newActiveKey = code;
      const states = { paneStates };
      if (paneStates[activeKey] && paneStates[activeKey].visible === false)
        newActiveKey = this.defaultActiveKey;
      this.setState(states);
      if (newActiveKey !== activeKey)
        this.handleChange(newActiveKey);
    });
  }
  init(containers) {
    if (!containers || !containers.length) return;
    this.groupContainers = [];
    this.otherContainers = [];
    this.external = {};
    containers.forEach((container, index) => {
      if (container.cControlType && container.cControlType.trim().toLocaleLowerCase() !== 'group') {
        this.otherContainers.push(container);
        return;
      }
      const key = container[this.keyField];
      if (!this.groupContainers.length)
        this.defaultActiveKey = key;
      this.groupContainers.push(container);
      if (!container.cStyle) return;
      this.external[key] = { config: container.cStyle, component: null };
    });
  }
  updateCount() {

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
  handleChange(key, disabled) {
    if (disabled) return;
    this.setState({ activeKey: key });
    this.props.viewModel.execute('tabActiveKeyChange', { key });
    if (!this.external[key]) return;
    if (this.external[key].component) {
      const { paneStates } = this.state;
      if (paneStates[key] && paneStates[key].refresh)
        this.external[key].viewModel.execute('refresh');
      return;
    }
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
  renderMetaContainer(container) {
    const { viewModel } = this.props;
    const containerType = container.cControlType && container.cControlType.trim().toLocaleLowerCase();
    switch (containerType) {
      case 'toolbar':
        this.toolbar = <MetaComponents.Toolbar controls={container.controls} model={viewModel} />
        break;
      case 'sign':
        this.sign = <MetaComponents.Sign controls={container.controls} viewModel={viewModel} />
        break;
    }
  }
  renderProgressBar(containers, activeMode) {
    const { paneStates, activeKey } = this.state;
    const items = [];
    containers.forEach((container, index) => {
      const key = container[this.keyField];
      let disabled = false;
      if (paneStates[key]) {
        if (paneStates[key].visible === false) return;
        disabled = paneStates[key].disabled || false;
      }
      let icon = container.cImage;
      if (disabled)
        icon += '-disabled';
      else if (activeMode === 'icon' && key === activeKey)
        icon += '-active';
      items.push(<li className={key === activeKey ? 'selected' : null} key={key} disabled={disabled} onClick={() => this.handleChange(key, disabled)}>
        <div className="inventory-process-img">
          <SvgIcon type={icon} />
        </div>
        <div>{container.cName}</div>
      </li>);
    });
    if (items.length === 1)
      items.length = 0;
    this.progressbar = items.length ? <ul className="inventory-process">{items}</ul> : null;
  }
  renderOtherContainers() {
    if (this.otherContainers.length !== 1)
      return null;
    const cardHeaderMeta = this.otherContainers[0];
    const { containers, cStyle } = cardHeaderMeta;
    containers && containers.forEach(item => {
      this.renderMetaContainer(item);
    });
    let activeMode = 'class';
    if (cStyle) {
      try {
        activeMode = JSON.parse(cStyle).activemode;
      } catch (e) {

      }
    }
    this.renderProgressBar(this.groupContainers, activeMode);
    return (
      <Row>
        {this.toolbar}
        {this.progressbar}
        {this.sign}
      </Row>
    );
  }
  renderTabItems(containers) {
    const { viewModel, width, height } = this.props;
    const { paneStates, forceRenders } = this.state;
    const items = [];
    let tabContent = null;
    containers.forEach((container, index) => {
      const key = container[this.keyField];
      let disabled = false;
      if (paneStates[key]) {
        if (paneStates[key].visible === false) return;
        disabled = paneStates[key].disabled || false;
      }
      tabContent = container.cStyle ? this.external[key].component : <MetaComponents.Container meta={container} viewModel={viewModel} width={width} height={height} />
      items.push(<TabPane tab={container.cName} forceRender={forceRenders.indexOf(key) >= 0} key={key} disabled={disabled}><div id={`${viewModel.getParams().billNo}|${key}`}>{tabContent}</div></TabPane>);
    });
    return items;
  }
  render() {
    return (
      <Row className={`card-tabs ${this.state.className}`}>
        {this.renderOtherContainers()}
        <Tabs className='tab-list' activeKey={this.state.activeKey} type='card' animated={false} onChange={key => this.handleChange(key)}>
          {this.renderTabItems(this.groupContainers)}
        </Tabs>
      </Row>
    );
  }
}
