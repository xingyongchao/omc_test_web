import React, { Component } from 'react';
import { Icon, Menu } from 'antd';
import { Row, Col, Button, DropdownButton, Dropdown, Input, CheckBox } from '../basic';
import SumAreaSetting from '../basic/sumareasetting';
import PublishMenu from '../basic/publishmenu';
import Print from './Print';
import Draftbutton from './Draftbutton'
import env from '../../helpers/env';
import * as ToolbarIndex from '../../../../common/components/toolbar';
import SummarySetting from '../summary-setting';
const ToolbarMap = {};
for (let attr in ToolbarIndex)
  ToolbarMap[attr.trim().toLocaleLowerCase()] = ToolbarIndex[attr];

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    const { controls, showCount } = props;
    this.state = Object.assign({
      flex: props.align === 'right' ? 'end' : 'start',
      hide: false,
    }, this.buildState(controls, showCount));
    let keyMap = {};
    this.recursive(this.state.controls, function (key, value) {
      keyMap[key] = value;
    });
    this.keyMap = keyMap;
    const visibleMap = {};
    this.state.controls.forEach(item => {
      visibleMap[item.cItemName] = true;
    });
    this.visibleMap = visibleMap;
  }
  buildState(controls, showCount) {
    controls = controls || [];
    showCount = showCount != null ? showCount : controls.length;
    return { controls, showCount };
  }
  recursive(data, callback) {
    data.forEach(item => {
      callback.call(this, item.cItemName, item);
      if (item.children)
        this.recursive(item.children, callback);
    });
  }
  componentDidMount() {
    this.menuControls.map(control => {
      let controlModel = this.props.model.get(control.cItemName);
      if (controlModel)
        controlModel.addListener(this);
    });
  }
  componentWillReceiveProps(nextProps) {
    const { controls, showCount } = nextProps;
    this.setState(this.buildState(controls, showCount));
  }
  componentWillUnmount() {
    this.menuControls.map(control => {
      let controlModel = this.props.model.get(control.cItemName);
      if (controlModel)
        controlModel.removeListener(this);
    });
  }
  handleVisibleChange(controlKey, visible) {
    this.visibleMap[controlKey] = visible;
    let hideCount = 0;
    const { controls } = this.state;
    controls.forEach(item => {
      const { cItemName } = item;
      if (this.visibleMap[cItemName]) return;
      hideCount++;
    });
    const hide = hideCount === controls.length;
    this.setState({ hide });
    if (this.props.onVisibleChange)
      this.props.onVisibleChange(!hide);
  }
  parseShowButtons() {
    const { delay } = this.props;
    const showCount = this.state.showCount, showButtons = [];
    let realButtonCount = 0;
    this.state.controls.map((control, index) => {
      if (realButtonCount === showCount) return;
      let ctrlType = control.cControlType.trim().toLocaleLowerCase();
      let caption = control.cShowCaption;
      const controlKey = control.cItemName;
        //  ctrlType = 'draftbutton';
      if (controlKey === 'btnPreview' && env.INTERACTIVE_MODE !== 'touch')
        ctrlType = 'printbutton';
      if (controlKey.toLocaleLowerCase() === 'btnsumSetting'.toLocaleLowerCase())
        ctrlType = 'sumsettingbutton';
      if (controlKey.toLocaleLowerCase() === 'btnMenupublish'.toLocaleLowerCase())
        ctrlType = 'menupublishbutton';
       
      let controlModel = this.props.model.get(controlKey);
      let button;
      let id = `${this.props.model.getParams().billNo}|${controlKey}`;
      switch (ctrlType) {
        case 'dropdownbutton':
          const className = showCount === 1 ? undefined : 'm-r-10';
          button = (
            <DropdownButton value={caption} model={controlModel} {...control} className={className} />
          );
          realButtonCount++;
          break;
        case 'dropdown':
          button = (
            <Dropdown onVisibleChange={visible => this.handleVisibleChange(controlKey, visible)} value={caption} model={controlModel} {...control} className="no-border-radius m-l-10" />
          );
          realButtonCount++;
          break;
        case 'printbutton':
          button = (
            <Print onVisibleChange={visible => this.handleVisibleChange(controlKey, visible)} value={caption} model={controlModel} {...control} />
          );
          realButtonCount++;
          break;
        case 'sumsettingbutton':
          button = (
            <SumAreaSetting viewModel={this.props.model} name={control.cShowCaption} className="m-l-10" />
          );
          realButtonCount++;
          break;
        case 'menupublishbutton':
          button = (
            <PublishMenu viewModel={this.props.model} name={control.cShowCaption} className="m-l-10" />
          );
          realButtonCount++;
          break;
        case 'summarysetting':
          button = (
            <SummarySetting viewModel={this.props.model} meta={control} />
          );
          realButtonCount++;
          break;
        case 'button':
          button = (
            <Button onVisibleChange={visible => this.handleVisibleChange(controlKey, visible)} value={caption} model={controlModel} delay={delay} {...control} className="no-border-radius m-l-10" id={id} />
          );
          realButtonCount++;
          break;
          case 'draftbutton':
          button = (
            <Draftbutton onVisibleChange={visible => this.handleVisibleChange(controlKey, visible)} value={caption} model={controlModel} {...control} controls={this.state.controls} />
          );
          realButtonCount++;
          break;
        case 'primarybutton':
          button = (
            <Button onVisibleChange={visible => this.handleVisibleChange(controlKey, visible)} value={caption} model={controlModel} delay={delay} {...control} className="no-border-radius m-l-10" type='primary' id={id} />
          );
          realButtonCount++;
          break;
        case 'input':
          button = (
            <Input model={controlModel} {...control} />
          );
          realButtonCount++;
          break;
        case 'checkbox':
          button = (
            <CheckBox model={controlModel} {...control} />
          );
          realButtonCount++;
          break;
        case 'spliter':
          button = (
            <span style={{
              padding: 10
            }}></span>
          );
          break;
        default:
          const ComName = ToolbarMap[ctrlType];
          if (ComName) {
            button = (
              <ComName model={controlModel} {...control} />
            );
            realButtonCount++;
          }
          break;
      }
      if (button) {
        showButtons.push(button);
        this.breakIndex = index;
      }
    });
    return showButtons;
  }
  parseMenuButtons() {
    const breakIndex = this.breakIndex, menuButtons = [];
    this.menuControls = [];
    this.state.controls.map((control, index) => {
      if (index <= breakIndex) return;
      let caption = control.cShowCaption;
      let key = control.cItemName;
      let disabled = control.disabled;
      let menuItemCom = control.icon ? <span><Icon type={control.icon} /><span>{caption}</span></span> : caption;
      let menuButton = <MenuItem key={key} disabled={disabled}>{menuItemCom}</MenuItem>
      menuButtons.push(menuButton);
      this.menuControls.push(control);
    });
    return menuButtons;
  }
  handleMenuClick(e) {
    let controlModel = this.props.model.get(e.key);
    if (controlModel)
      controlModel.fireEvent('click');
  }
  setDisabled(value, key) {
    let item = this.keyMap[key];
    if (item)
      item.disabled = value;
    this.setState({
      controls: this.state.controls
    });
  }
  render() {
    const control = [];
    const showButtons = this.parseShowButtons();
    control.push(<Col key='show' span={'auto'}>{showButtons}</Col>);
    const menuButtons = this.parseMenuButtons();
    if (menuButtons.length) {
      const menu = (
        <Menu onClick={e => this.handleMenuClick(e)} mode="horizontal" className="no-border moreButton">
          <SubMenu title={<span>批量操作<Icon type='tagall' /></span>}>
            {menuButtons}
          </SubMenu>
        </Menu>
      );
      control.push(<Col key='menu' span={'auto'} className='btn-submenu'>{menu}</Col>);
    }
    let className = 'btn-toolbar-bottom';
    if (this.props.config) {
      let config = null;
      try {
        config = JSON.parse(this.props.config);
      } catch (e) {
        config = {};
      }
      if (config.classname)
        className += ' ' + config.classname;
    }
    if (this.state.hide)
      className = 'hide';
    return (
      <Row className={className} flex={this.state.flex}>{control}</Row>
    );
  }
}
