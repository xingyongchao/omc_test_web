import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import classnames from 'classnames';
import { Row } from '../basic';
import Group from './Group';

export default class GroupContainer extends Component {
  constructor(props) {
    super(props);
    const { cStyle } = props.meta;
    let config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) { }
    }
    this.state = Object.assign({
      collapse: true,
      visible: true
    }, config);
  }
  componentDidMount() {
    const { viewModel, meta } = this.props;
    viewModel.on('updateViewMeta', args => {
      const { code, visible } = args;
      if (code !== meta.cGroupCode) return;
      this.setState({ visible });
    });
  }
  handleClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  renderButton() {
    return (
      this.state.collapse ?
        <Button type='ghost' onClick={() => this.handleClick()} className='putAway no-border'>展开更多<Icon type="down-circle" /></Button>
        :
        <Button type='ghost' onClick={() => this.handleClick()} className='putAway no-border'>收起<Icon type="up-circle" /></Button>
    );
  }
  renderControl(containers) {
    const { viewModel, width, index } = this.props;
    const items = [];
    containers.forEach(container => {
      items.push(<Group key={container.groupId} meta={container} viewModel={viewModel} width={width} index={index} />);
    });
    return items;
  }
  render() {
    let { config, meta } = this.props;
    let hasButton = false;
    if (config) {
      try {
        config = JSON.parse(config);
      } catch (e) {
        config = {};
      }
      if (config.button)
        hasButton = true;
    }
    let controlClassName = null;
    let button = null;
    if (hasButton) {
      if (this.state.collapse)
        controlClassName = 'group-container-collapse';
      const buttonClassName = 'group-container-button';
      button = <Row className={buttonClassName}>{this.renderButton()}</Row>
    }
    const control = <Row className={controlClassName}>{this.renderControl(meta.containers)}</Row>
    return (
      <Row className={classnames('group-container', { hide: !this.state.visible }, this.state.classname)}>
        {control}
        {button}
      </Row>
    );
  }
}
