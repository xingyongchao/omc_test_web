import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Modal, Button } from 'antd';
import ReferToolbar from './ReferToolbar';
import { Row, Col, TreeTable } from '../basic';
// import { SearchTree } from '../meta';
import SearchTree from '../meta/SearchTree';
import ReferTable from './ReferTable';
import ReferPagination from './ReferPagination';
import env from '../../helpers/env';
let ConvenientQuery = null;

export default class ReferModal extends React.Component {
  constructor(props) {
    super(props);
    ConvenientQuery = require('../filter').default;
    this.state = {
      className: env.INTERACTIVE_MODE === 'touch' ? ' refer-modal-touch' : '',
      title: (this.props.title || '') + '参照',
      visible: this.props.visible,
      referType: this.props.referType,
      bodyHeight: 0,
      tableHeight: 0,
    };
    this.__isElectronic = false;
  }
  componentDidMount() {
    if (window.__isElectronic) {
      this.__isElectronic = true;
    }
  }
  getModel() {
    return this.props.model || this.model;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
    let model = nextProps.model;
    if (model) {
      const { referType } = nextProps;
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
      this.setState({ referType, bodyHeight, tableHeight: tHeight });
      if (!this.props.model) {
        model.un('filterHeightUpdate');
        model.on('filterHeightUpdate', () => {
          const toolbarHeight = findDOMNode(this.refs.ReferToolbar).clientHeight;
          let tableHeight = this.state.bodyHeight - toolbarHeight;
          this.props.model.get('table').execute('toolbarHeightUpdate', tableHeight);
        });
        if (typeof this.props.afterOkClick === 'function')
          model.on('afterOkClick', this.props.afterOkClick);
      }
    } else {
      if (this.props.cRefType) {
        model = this.getModel();
        if (!model) {
          let self = this;
          this.model = cb.loader.initRefer(this.props.cRefType, this.props.multiple || false, null, function (data) {
            self.setState({ referType: data.cTplType });
          }, this.props.afterOkClick);
        }
      }
    }
  }
  handleCancel() {
    this.setState({
      visible: false
    });
    if (this.props.close)
      this.props.close();
  }
  handleOk() {
    this.handleCancel();
    let model = this.getModel();
    if (model)
      model.okClick();
  }
  render() {
    const referType = this.state.referType;
    const model = this.getModel();
    const key = model && model.getParams().refCode;
    let treeContent = '';
    let cardContent = '';
    let className = 'referModal ' + referType + this.state.className;
    if (referType == 'Tree') {
      treeContent = (<Col span={24} className="leftPanel">
        {/* <Row>
          <Col>
            <ReferToolbar model={model} />
          </Col>
        </Row> */}
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
    let modalContent = null;
    // if (this.__isElectronic && ((referType == 'TreeTable' || referType == 'Table'))) {
    //   let footerControl = (
    //     <div class="ant-modal-footer">
    //       <ReferPagination model={model.get('table')} />
    //       <Button onClick={e => this.handleCancel()} className="ant-btn-lg">取 消</Button>
    //       <Button onClick={e => this.handleOk()} type="primary" className="ant-btn-lg">确 定</Button>
    //     </div>
    //   )
    //   modalContent = (
    //     <Modal maskClosable={false} width={846} title={this.state.title} visible={this.state.visible}
    //       footer={footerControl}
    //       onOk={e => this.handleOk()} onCancel={e => this.handleCancel()} okText="确定" cancelText="取消"
    //       className={className}>
    //       <Row colCount={24}>
    //         {treeContent}
    //         {cardContent}
    //       </Row>
    //     </Modal>
    //   );
    // } else {
      modalContent = (
        <Modal key={key} maskClosable={false} width={846} title={this.state.title} visible={this.state.visible} onOk={e => this.handleOk()} onCancel={e => this.handleCancel()} okText="确定" cancelText="取消" className={className}>
          <Row colCount={24} id={key}>
            {treeContent}
            {cardContent}
          </Row>
        </Modal>
      );
    // }
    return modalContent;
  }
}
