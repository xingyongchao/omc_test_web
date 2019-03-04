import React from 'react';
import { Popover } from 'antd';
import Input from '../basic/input'
import InputNumber from '../basic/inputnumber'
import DatePicker from '../basic/datepicker'
import Select from '../basic/select'
import Refer from '../basic/refer'
import Switch from '../basic/switch'
import LabelSwitch from '../basic/labelswitch'
import Button from '../basic/button'
import Checkbox from '../basic/checkbox'
import Tag from '../basic/tag'
import Col from '../basic/col'
import Row from '../basic/row'
// import Meta from '../viewmeta/main';
import addEventListener from 'rc-util/lib/Dom/addEventListener';

export default class CompositeModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: props.visible,
      width: props.width,
      height: props.height,
      compositeControl: props.compositeControl,
      rowModel: props.rowModel
    };

    this._isVisible = false;
    this.onDocumentClick = this.onDocumentClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.compositeControl)
      this.setState({
        width: nextProps.width,
        height: nextProps.height,
        compositeControl: nextProps.compositeControl,
        rowModel: nextProps.rowModel
      });
  }
  componentDidUpdate() {
    if (this.state.isVisible) {
      if (!this.clickOutsideHandler)
        this.clickOutsideHandler = addEventListener(document, 'mousedown', this.onDocumentClick);
      return;
    }
    this.removeEventListener();
  }
  removeEventListener() {
    if (this.clickOutsideHandler) {
      this.clickOutsideHandler.remove();
      this.clickOutsideHandler = null;
    }
  }

  onDocumentClick(event) {
    if (this._isVisible !== false) return;
    var parent = cb.dom(event.target).parents('div[data-reactroot]');
    if (parent.hasClass('ant-row') || parent.children('.bill-maker-modal').length) {
      this.setState({ isVisible: this._isVisible });
      if (!this._isVisible)
        this.props.setCellBlur();
    }
  }

  /*弹出pop点击事件*/
  showPopClick() {
    this.setState({
      isVisible: true
    });
  }
  //是否显示状态改变事件
  onVisibleChange(e) {
    this._isVisible = e;
  }
  //动态生成pop事件
  getPopoverContent() {
    let self = this;
    let rowModel = this.state.rowModel;
    let controls = this.state.compositeControl.controls;
    let ret = [];
    controls.map(function (item) {
      let model = rowModel.get(item.cItemName);
      let control = self.getComponents(item, model);
      ret.push(
        <Row>
          <Col span={8}>{item.cShowCaption + ':'}</Col>
          <Col span={16}>{control}</Col>
        </Row>
      );
    });
    return ret;
  }
  getComponents(col, model) {
    switch (col.cControlType && col.cControlType.trim().toLocaleLowerCase()) {
      case 'input':
        return <Input model={model} />
      case 'inputnumber':
        let NumPoint = 1;
        /*转换iNumPoint为inputNumber控件识别的小数位*/
        if (col.iNumPoint && col.iNumPoint > 1) {
          NumPoint = 0.1;
          NumPoint = Math.pow(NumPoint, col.iNumPoint).toFixed(col.iNumPoint);
        }
        return <InputNumber model={model} iNumPoint={NumPoint} />
      case 'datepicker':
        return <DatePicker model={model} />
      case 'select':
        return <Select model={model} />
      case 'refer':
        return <Refer model={model} />
      case 'switch':
        return <Switch model={model} checkedChildren="是" unCheckedChildren="否" />
      case 'scheckbox':
        return <Checkbox model={model} ></Checkbox>
      case 'tag':
        return <Tag model={model} disabled={false} color={'blue'} closable={true} cRefType={col.cRefType} refReturn={col.refReturn} cRefRetId={col.cRefRetId} />
    }
  }
  render() {
    var content = this.getPopoverContent();
    return (
      <Popover placement="bottom" overlayStyle={{ width: this.state.width }} content={content} trigger="click" visible={this.state.isVisible} onVisibleChange={(e) => this.onVisibleChange(e)}>
        <Button style={{ borderWidth: 0, width: '100%', height: '100%' }} type="ghost" icon="" onClick={() => this.showPopClick()} />
      </Popover>
    )
  }
}
