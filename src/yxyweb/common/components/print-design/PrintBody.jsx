import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { Button, Modal, Input, Select, Switch, Card } from 'antd';
import { Row, Col, Label } from '../basic';
import * as printactions from '../../redux/print';


class PrintBody extends Component {
  constructor(props) {
    super(props);
    this.actions = props.printactions;
  }
  componentDidMount() {
    this.actions.loadTemplate();
  }
  componentWillReceiveProps(nextProps) {
    let oldProps = this.props.print;
    let newProps = nextProps.print;
    if (newProps.openNewWindow && oldProps.openNewWindow != newProps.openNewWindow) {
      this.winObj = window.open(newProps.url);
      this.timer = window.setInterval(this.closeWindow, 500);
      this.actions.setData({ openNewWindow: false });
    }
    if (oldProps.selectType != newProps.selectType) {
      let printBody = cb.dom(findDOMNode(this.refs.printBody));
      if (printBody && printBody[0]) {
        let offsetTop = 200;
        var selectDom = window.document.getElementsByClassName(newProps.selectType);
        if (selectDom && selectDom[0]) {
          offsetTop = selectDom[0].offsetTop - 150;
        }
        printBody[0].scrollTo(0, offsetTop);
      }
    }
  }
  componentWillUnmount() {
    window.clearInterval(this.winObj);
    this.actions.setData({
      selectType: '', templateData: [],
      url: null, showModal: false, showCopyModal: false,
      templatecode: '', templatename: '', openNewWindwo: false,
    });
  }
  closeWindow = () => {
    if (this.winObj.closed && this.timer != null) {
      this.actions.loadTemplate();
      window.clearInterval(this.timer);
      window.clearInterval(this.winObj);
      this.timer = null;
    }
  }
  /*设为默认模板*/
  setDefault = (template, bo) => {
    let params = { "templateCode": template.templatecode, "pkBo": bo.pk_bo };
    this.actions.setDefaultTemplate(params, template.pk_print_template);
  }
  getBillName = (billno) => {
    let { templateData } = this.props.print;
    let name = '';
    templateData.forEach(function (element) {
      if (element.bo_code == billno) {
        name = element.bo_name;
      }
    });
    return name;
  }
  onClick = (e, type, data, billno) => {
    switch (type) {
      case 'modify':
        this.actions.modifyTemplate(data.templatecode);
        break;
      case 'copy':
        this.pk_print_template = data.pk_print_template;
        this.billno = this.getBillName(billno);
        this.actions.setData({ showCopyModal: true });
        break;
      case 'delete':
        if (data.isdefault == true) {
          cb.utils.alert('默认模板不允许删除！', 'error');
          return;
        }
        cb.utils.confirm(`确定要删除${data.templatename}？`, () => {
          this.actions.deleteTemplate(data.pk_print_template);
        });
        break;
    }
  }
  onOk = (e) => {
    let { selectType, templatecode, templatename } = this.props.print;
    let renderData = { templatecode: templatecode, templatename: templatename, pk_template: this.pk_print_template };
    if (!templatecode || templatecode == '' || templatename == '' || !templatename) {
      cb.utils.alert('模板编码/模板名称必输！', 'error');
      return
    }
    let bSbccase = false;
    bSbccase = this.isSbccase(templatecode);
    if (!bSbccase) bSbccase = this.isSbccase(templatename);
    if (bSbccase) {
      cb.utils.alert('模板编码/模板名称不支持全角！', 'error');
      return
    }
    if (escape(templatecode).indexOf("%u") >= 0) {
      cb.utils.alert('编码不允许存在中文！', 'error');
      return;
    }
    this.actions.copyTemplate(renderData);
    this.actions.setData({ showCopyModal: false, templatecode: '', templatename: '' });
  }
  /*判断全角函数*/
  isSbccase = (str) => {
    // for (var i = 0; i < str.length; i++) {
    //   if (str.charCodeAt(i) > 128) {
    //     return true;
    //     break;
    //   }
    // }
    var sbccase = str.match(/[\uff00-\uffff]/g);
    if (sbccase && sbccase.length > 0)
      return true;
    else
      return false
  }
  /*关闭modal*/
  onCancel = (e) => {
    this.actions.setData({ showCopyModal: false });
  }
  /*编码/名称改变*/
  onChange = (val, type) => {
    if (type == 'code') {
      this.actions.setData({ templatecode: val.target.value });
    } else {
      this.actions.setData({ templatename: val.target.value });
    }
  }
  /**/
  getDefault(ele, bo) {
    if (ele.isdefault) {
      return (
        <div className="print-card-btn-default">
          <Button size="small">默认模板</Button>
        </div>
      )
    } else {
      return (
        <div className="print-card-btn-setDefault">
          <Button size="small" onClick={() => this.setDefault(ele, bo)}>设为默认</Button>
        </div>
      )
    }
  }
  // getButton(ele) {
  //     if (ele.isPrecut) {
  //         return (
  //             <div className="print-card-operation">
  //                 <a onClick={(e) => this.onClick(e, 'copy', ele, billno)}>复制</a>
  //             </div>
  //         )
  //     } else {
  //         return (
  //             <div className="print-card-operation">
  //                 <a onClick={(e) => this.onClick(e, 'modify', ele)}>设计</a>|<a onClick={(e) => this.onClick(e, 'copy', ele, billno)}>复制</a>|<a onClick={(e) => this.onClick(e, 'delete', ele)}>删除</a>
  //             </div>
  //         )
  //     }
  // }
  getTemplates = (bo) => {
    let data = bo.templates, billno = bo.billno;
    let templates = [];
    data.forEach(function (ele) {
      let defaultControl = this.getDefault(ele, bo);
      let precutControl = ele.isPrecut ? <div className="print-card-btn-precut"></div> : <div></div>;
      // let buttonControl = this.getButton(ele);
      templates.push(
        <Col span={1}>
          <div className="print-card">
            <div className="print-card-header">
              {precutControl}
              {defaultControl}
            </div>
            <div className="print-card-title">{ele.templatename}</div>
            <div className="print-card-operation">
              <a onClick={(e) => this.onClick(e, 'modify', ele)}>设计</a>|<a onClick={(e) => this.onClick(e, 'copy', ele, billno)}>复制</a>|<a onClick={(e) => this.onClick(e, 'delete', ele)}>删除</a>
            </div>
          </div >
        </Col>
      )
    }, this);
    return <Row colCount={4}>{templates}</Row>;
  }
  getControl = (data) => {
    if (!data) return '';
    let controls = [];
    data.forEach(function (element) {
      let templates = this.getTemplates(element);
      controls.push(
        // <div id={element.bo_code} className='uretail-print-list'><h3>{element.bo_name}</h3>{templates}</div>
        <div className={'uretail-print-list ' + element.bo_code}><h3>{element.bo_name}</h3>{templates}</div>
      )
    }, this);
    return controls;
  }
  render() {
    let { templateData, showCopyModal, templatecode, templatename } = this.props.print;
    let control = this.getControl(templateData);
    let style = { "height": this.props.height };
    return (
      <div ref="printBody" className="uretail-print-body" style={style}>
        {control}
        <Modal title="复制模板" width={846} visible={showCopyModal}
          onOk={this.onOk} onCancel={this.onCancel} okText="确认" cancelText="取消" maskClosable={false}
        >
          <Row >
            <Label title="*模板编码:" control={<Input value={templatecode} onChange={val => this.onChange(val, 'code')} placeholder="请输入模板编码" />} />
            <Label title="*模板名称:" control={<Input value={templatename} onChange={val => this.onChange(val, 'name')} placeholder="请输入模板名称" />} />
          </Row>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    print: state.print.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    printactions: bindActionCreators(printactions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintBody);
