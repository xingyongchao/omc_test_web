import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Modal, Button } from 'antd';
import ReferToolbar from './ReferToolbar';
import { Row, Col, TreeTable } from '../basic';
import SearchTree from '../meta/SearchTree';
import ReferTable from './ReferTable';
import ReferPagination from './ReferPagination';
import env from '../../helpers/env';
import ConvenientQuery from '../filter';

export default class ReferView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: env.INTERACTIVE_MODE === 'touch' ? ' refer-modal-touch' : '',
      referType: this.props.referType,
      bodyHeight: 0,
      tableHeight: 0,
    };
    this.__isElectronic = false;
  }
  componentDidMount() {
    if (window.__isElectronic)
      this.__isElectronic = true;
    const { referType } = this.props;
    let bodyHeight = 495, tHeight;
    switch (referType) {
      case 'Table':
        bodyHeight = 495;
        if (this.__isElectronic) {
          bodyHeight = 395;
          tHeight = bodyHeight - 52;
        } else {
          tHeight = bodyHeight - 93;
        }
        break;
      case 'TreeTable':
        bodyHeight = 515;
        if (this.__isElectronic) bodyHeight = 415;
        tHeight = bodyHeight - 60;
        break;
    }
    this.setState({ bodyHeight, tableHeight: tHeight });
  }
  render() {
    const referType = this.state.referType;
    const { model } = this.props;
    const key = model && model.getParams().refCode;
    let treeContent = '';
    let cardContent = '';
    let className = 'referModal ' + referType + this.state.className;
    if (referType == 'Tree') {
      treeContent = (<Col span={24} className="leftPanel">
        <Row colCount={2}>
          <Col span={1}>
            <SearchTree model={model.get('tree')} />
          </Col>
        </Row>
      </Col>);
    }
    else if (referType == 'TreeTable') {
      treeContent = (<div className="leftPanel">
        <SearchTree text={`${this.props.title}分类`} model={model.get('tree')} />
      </div>);
      const filterId = model.getParams().filterId;
      let width = 800;
      if (env.INTERACTIVE_MODE === 'touch') {
        if (this.__isElectronic) {
          width = 690;
        } else {
          width = 790;
        }
      }
      cardContent = (<div className="rightPanel">
        <Row ref='ReferToolbar'>
          {filterId ? <ConvenientQuery model={model} cols={2} /> : null}
          <ReferToolbar model={model} filterId={filterId} />
        </Row>
        <Row>
          <ReferTable model={model.get('table')} width={width} maxRowCount={10} height={this.state.tableHeight} />
        </Row>
      </div>);
    }
    else if (referType == 'Table') {
      const filterId = model.getParams().filterId;
      cardContent = (<Col span={24} className="rightPanel">
        <Row ref='ReferToolbar'>
          {filterId ? <ConvenientQuery model={model} cols={2} /> : null}
          <ReferToolbar model={model} filterId={filterId} />
        </Row>
        <Row>
          <ReferTable model={model.get('table')} width={this.__isElectronic ? 900 : 1000} maxRowCount={10} height={this.state.tableHeight} />
        </Row>
      </Col>);
    }
    else if (referType === 'TreeList') {
      const filterId = model.getParams().filterId;
      cardContent = (<Col span={24} className="rightPanel">
        <Row ref='ReferToolbar'>
          {filterId ? <ConvenientQuery model={model} cols={2} /> : null}
          <ReferToolbar model={model} filterId={filterId} />
        </Row>
        <Row>
          <TreeTable model={model.get('tree')} width={this.__isElectronic ? 900 : 1000} maxRowCount={10} height={this.state.tableHeight} actionMeta={{ controls: [] }} />
        </Row>
      </Col>);
    }
    return (
      <Row colCount={24} id={key}>
        {treeContent}
        {cardContent}
      </Row>
    );
  }
}
