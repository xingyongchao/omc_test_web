import React, { Component } from 'react';
import { Row, Col, Button, Select } from '../basic';
import * as MetaComponents from './index';

export default class CardHeaderControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false
    };
    this.leftToolbar = null;
    this.rightToolbar = null;
    this.mainTitle = null;
    this.statusBar = null;
    this.processGroup = null;
    this.visibleMap = { left: true, right: true };
  }
  handleVisibleChange(align, visible) {
    this.visibleMap[align] = visible;
    let hide = false;
    if (this.leftToolbar && this.rightToolbar) {
      if (!this.visibleMap.left && !this.visibleMap.right)
        hide = true;
    } else {
      if (this.leftToolbar) {
        if (!this.visibleMap.left)
          hide = true;
      }
      if (this.rightToolbar) {
        if (!this.visibleMap.right)
          hide = true;
      }
    }
    if (hide) {
      if (this.mainTitle || this.statusBar || this.processGroup)
        hide = false;
    }
    this.setState({ hide });
  }
  getMetaContainer(container) {
    const { model } = this.props;
    const containerType = container.cControlType && container.cControlType.trim().toLocaleLowerCase();
    switch (containerType) {
      case 'toolbar':
        const align = container.cAlign === 'right' ? 'right' : 'left';
        const toolbar = <MetaComponents.Toolbar align={container.cAlign} controls={container.controls} model={model} onVisibleChange={visible => this.handleVisibleChange(align, visible)} delay />
        align === 'right' ? this.rightToolbar = toolbar : this.leftToolbar = toolbar;
        break;
      case 'maintitle':
        break;
        this.mainTitle = <MetaComponents.MainTitle key={containerType} controls={container.controls} viewModel={model} />
        break;
      case 'statusbar':
        this.statusBar = <MetaComponents.StatusBar key={containerType} viewModel={model} />
        break;
      case 'processgroup':
        this.processGroup = <MetaComponents.ProcessGroup key={containerType} viewModel={model} />
        break;
    }
  }
  getHeader() {
    this.props.meta.containers.forEach(container => {
      this.getMetaContainer(container);
    });
    let toolbar = null;
    if (this.leftToolbar && this.rightToolbar) {
      toolbar = (
        <Row key='toolbar'>
          <div style={{ float: 'left' }}>{this.leftToolbar}</div>
          <div style={{ float: 'right' }}>{this.rightToolbar}</div>
        </Row>
      );
    } else {
      if (this.leftToolbar)
        toolbar = this.leftToolbar;
      if (this.rightToolbar)
        toolbar = <div>{this.rightToolbar}</div>;
    }
    return [toolbar, this.mainTitle, this.statusBar, this.processGroup];
  }
  render() {
    if (!this.props.meta.containers)
      return null;
    const controls = this.getHeader();
    const className = this.state.hide ? 'hide' : 'list-top-toolbar';
    return (
      <div className={className}>{controls}</div>
    );
  }
}
