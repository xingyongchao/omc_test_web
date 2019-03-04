import React, { Component } from 'react';
import classnames from 'classnames';
import SvgIcon from 'SvgIcon';
import { Row, Col } from '../basic';
import { parseContainer } from './util';
import { TitleTips } from './index';

export default class Group extends Component {
  constructor(props) {
    super(props);
    const { cStyle } = props.meta;
    let config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {}
    }
    this.state = Object.assign({
      underline: false,
      collapse: false,
      collapsed: true,
      visible:true
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
  handleExpand = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  }
  render() {
    const { meta, viewModel, width, height, index} = this.props;
    const control = parseContainer(meta, viewModel, width, height, index);
    if (!control)
      return null;
    const { underline, collapse, collapsed,config } = this.state;
    const titleControl = (
      <Row>
        <Col>
          <p className={classnames('group-title', { underline })}>{meta.cName}{config && config.length ?<TitleTips config={config} /> : null}<span className='group-collapse' onClick={this.handleExpand}>{collapse && <SvgIcon type={collapsed ? 'zhankai' : 'shouqi'} />}{collapse && (collapsed ? '展开':'折叠') }</span></p> 
        </Col>
      </Row>
    );
    return (
      <div className={classnames({ hide: !this.state.visible })}>
        {titleControl}
        <div className={classnames({ hide: collapse && collapsed })}>
          {control}
        </div>
      </div>
    );
  }
}
