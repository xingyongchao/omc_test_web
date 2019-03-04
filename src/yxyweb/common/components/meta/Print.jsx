import React, { Component } from 'react';
import { Row, Col, Button, Select } from '../basic';
// import * as MetaComponents from './index';
import env from '../../helpers/env';

export default class Print extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false
    };
    const { cParameter } = props;
    const config = {};
    if (cParameter) {
      try {
        Object.assign(config, JSON.parse(cParameter));
      } catch (e) {

      }
    }
    const viewModel = props.model.getParent();
    const { billType, mode } = viewModel.getParams();
    const valueField = 'templatecode', vouchPrintKey = props.cItemName, localPrintKey = 'btnLocalPrint';
    this.attachedMeta = [
      {
        cControlType: 'Select',
        modelType: 'ListModel',
        // cShowCaption: '打印模板',
        cItemName: 'templates',
        valueField,
        textField: 'templatename',
        dataSourceMode: 'remote',
        bNotModify: false,
        needClear: false
      }
    ];
    if (config.vouchPrint !== false) {
      this.attachedMeta.push({
        cControlType: 'Button',
        value: '单据打印',
        icon: props.icon,
        cItemName: vouchPrintKey,
        onVisibleChange: this.onVisibleChange
      });
    }
    if (billType !== 'Report') {
      this.attachedMeta.push({
        cControlType: 'Button',
        modelType: 'SimpleModel',
        value: config.localPrintCaption || '小票打印',
        icon: props.icon,
        cItemName: localPrintKey,
        cAction: 'localPrint',
        needClear: false
      });
    }
    if (process.env.NODE_ENV === 'development') {
      this.attachedMeta.splice(0, 0, {
        cControlType: 'Button',
        modelType: 'SimpleModel',
        value: '保存业务对象',
        cItemName: 'btnSaveBo',
        cAction: 'saveBo',
        needClear: false
      });
    }
    if (mode && mode !== env.VOUCHER_STATE_BROWSE) {
      if (props.onVisibleChange)
        props.onVisibleChange(false);
      // return;
    }
    this.attachedMeta.forEach(item => {
      const key = item.cItemName;
      if (!viewModel.get(key))
        viewModel.addProperty(key, new cb.models[item.modelType](item));
      if (item.cControlType === 'Button') {
        if (key === vouchPrintKey) return;
        viewModel.get(key).on('click', function () {
          if (key === localPrintKey) {
            viewModel.get(vouchPrintKey).execute('click', { cAction: item.cAction });
          } else {
            viewModel.biz.do(item.cAction, viewModel, { key });
          }
        });
      } else {
        viewModel.get(key).setDataSource({
          url: 'print/getTemplateByBo',
          method: 'GET',
          options: { mask: false }
        }, { billno: props.model.getState('billNo') || viewModel.getParams().billNo });
        viewModel.get(key).on('afterSetDataSource', function (data) {
          const defaultValue = data.length === 1 ? data[0] : data.find(item => {
            return item.isdefault;
          });
          if (!defaultValue) return;
          this.setValue(defaultValue[valueField]);
        });
      }
    });
  }
  onVisibleChange = (visible) => {
    this.setState({ hide: !visible });
    if (this.props.onVisibleChange)
      this.props.onVisibleChange(visible);
  }
  render() {
    const viewModel = this.props.model.getParent();
    // const { mode } = viewModel.getParams();
    // if (mode && mode !== env.VOUCHER_STATE_BROWSE)
    //   return null;
    const attachedControls = [];
    this.attachedMeta.forEach(control => {
      const controlType = control.cControlType && control.cControlType.trim().toLocaleLowerCase();
      const key = control.cItemName;
      const model = viewModel.get(key);
      if (controlType === 'button')
        attachedControls.push(<Col key={key} span={8}><Button className={control.className} model={model} {...control} /></Col>);
      if (controlType === 'select')
        attachedControls.push(<Col key={key} span={8}><Select model={model} {...control} /></Col>);
    });
    // attachedControls.push(<Col span={8}><Button {...this.props} /></Col>)
    return (
      <div className='meta-print-button' style={{ float: 'left', display: this.state.hide ? 'none' : '' }}>
        {attachedControls}
      </div>
    );
  }
}
