import React, { Component } from 'react';
import { Tag } from 'antd';
import { Row, Col, Span } from '../basic';

export default class MainTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false
    };
  }
  componentDidMount() {
    this.props.viewModel.on('afterLoadData', data => {
      const bizstatus = parseInt(data.bizstatus);
      const finished = !isNaN(bizstatus) && bizstatus >= 1 ? true : false;
      this.setState({ finished });
    });
  }
  renderIcon(control) {
    let icon = null;
    if (control.cStyle) {
      let config = null;
      try {
        config = JSON.parse(control.cStyle);
      } catch (e) {
        config = {};
      }
      if (config.icon)
        icon = '#icon-' + config.icon;
    }
    return <svg key='icon' className="icon" aria-hidden="true"><use href={icon}></use></svg>
  }
  render() {
    const { controls, viewModel } = this.props;
    if (!controls || !controls.length)
      return null;
    let IconControl, TitleControl, TagControl;
    controls.forEach(control => {
      const controlType = control.cControlType && control.cControlType.trim().toLocaleLowerCase();
      const key = control.cItemName;
      const model = viewModel.get(key);
      if (controlType == 'icon')
        IconControl = this.renderIcon(control);
      if (controlType == 'title')
        TitleControl = <Span key='title' model={model} />
      if (controlType == 'tag')
        TagControl = <Tag key='tag' color="blue"><Span model={model} /></Tag>
    });
    const items = [IconControl, TitleControl, TagControl];
    if (this.state.finished)
      items.push(<div className='timestamp'></div>);
    return (
      <Row>
        <div className='pull-left main-title'>
          <div className='title'>
            {items}
          </div>
        </div>
      </Row>
    );
  }
}
