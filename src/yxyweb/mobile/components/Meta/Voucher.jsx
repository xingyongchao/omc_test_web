import React, { Component } from 'react';
import { Button, Icon, ActionSheet } from 'antd-mobile';
import SvgIcon from 'SvgIcon';
import NavBar from '../NavBar';
import Footer from './Footer';
import Container from './Container';
export default class Common extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false
    };
    this.initMeta(props.meta);
  }
  initMeta(container) {
    if (!container.containers) {
      this.bodyMeta = container;
      return;
    }
    const { cTemplateTitle } = container;
    this.bodyMeta = { cTemplateTitle, containers: [] };
    container.containers.forEach(item => {
      const containerType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
      if (containerType === 'toolbar') {
        const align = item.cAlign && item.cAlign.trim().toLocaleLowerCase();
        if (item.cGroupCode == 'footertoolbar_m' || align === 'bottom') {
          this.footerToolbar = item.controls;
        } else {
          this.headerToolbar = item.controls;
        }
      } else {
        this.bodyMeta.containers.push(item);
      }
    });
  }

  getHeader() {
    const { returnCallback, homeCallback } = this.props;
    return (
      <div className="listCard-btn">
        <Button onClick={returnCallback}><SvgIcon type='left' />{this.props.meta.cTemplateTitle}</Button>
      </div>
    );
  }
  handleVisibleChange = (visible) => {
    this.setState({ hide: !visible });
  }
  getFooter() {
    let mode = this.props.viewModel.getParams().mode;
    if (!this.footerToolbar || mode === 'browse')
      return null;
    return (
      <div className='right-footer-button'>
        <Footer controls={this.footerToolbar} model={this.props.viewModel} onVisibleChange={this.handleVisibleChange} />
      </div>
    );
  }

  getNavBarRight() {
    if (this.headerToolbar && this.props.viewModel.getParams().mode === 'browse') {
      this.visibleMap = {};
      this.headerToolbar && this.headerToolbar.map(item => {
        this.visibleMap[item.cItemName] = true;
      });
      return <Button onClick={() => this.getHeaderTool()}><Icon type="icon-gengduo" /></Button>
    } else {
      return ''
    }
  }

  handleHeaderVisibleChange(controlKey, visible) {

    this.visibleMap[controlKey] = visible;
    let hideCount = 0;
    this.headerToolbar && this.headerToolbar.forEach(item => {
      const { cItemName } = item;
      if (this.visibleMap[cItemName]) return;
      hideCount++;
    });
    const hide = (!this.headerToolbar || hideCount === this.headerToolbar.length);
    this.handleVisibleChange(!hide);
  }
  getHeaderTool = (controls) => {
    let buttons = [], models = [];
    if (this.headerToolbar) {
      this.headerToolbar.map(control => {
        let model = this.props.viewModel.get(control.cItemName);
        let visible = model.get('visible');
        models.push(model);
        if (visible) {
          buttons.push({
            icon: <SvgIcon type={control.icon} />,
            title: control.cShowCaption,
          })
        }
      });

    }
    ActionSheet.showShareActionSheetWithOptions({
      options: buttons,
    },
      (buttonIndex) => {
        if (models[buttonIndex])
          models[buttonIndex].fireEvent('click');
      });
  }

  render() {
    const { meta, viewModel, width, height, index, returnCallback } = this.props;
    // const header = this.getHeader();
    const body = <Container className='height-100' meta={this.bodyMeta} viewModel={viewModel} width={width} height={height} index={index} />
    const footer = this.getFooter()
    let pathList = window.location.pathname.split('/');
    let pathname = pathList[pathList.length - 1];
    return (
      <div className={"voucher-touch " + pathname} style={{ height: '100%' }}>
        {/* {header} */}
        <NavBar onLeftClick={returnCallback} title={meta.cTemplateTitle} rightContent={this.getNavBarRight()} />
        {body}
        {footer}
      </div>
    );
  }
}
