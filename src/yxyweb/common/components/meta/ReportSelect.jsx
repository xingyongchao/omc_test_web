import React, { Component } from 'react';
import { Select } from '../basic';

export default class ReportSelect extends Component {
  constructor(props) {
    super(props);
    const { viewModel } = props;
    const { billNo } = viewModel.getParams();
    const valueField = 'id';
    this.groupSchemasMeta = {
      cControlType: 'Select',
      modelType: 'ListModel',
      cShowCaption: '分组方案',
      cItemName: 'groupSchemas',
      valueField,
      textField: 'name',
      dataSourceMode: 'remote',
      bNotModify: false,
      bIsNull: true,
      cAction: 'switchGroupSchema'
    };
    const key = this.groupSchemasMeta.cItemName;
    viewModel.addProperty(key, new cb.models[this.groupSchemasMeta.modelType](this.groupSchemasMeta));
    viewModel.get(key).setDataSource({
      url: 'report/getGroupSchema',
      method: 'GET'
    }, { billnum: billNo });
    viewModel.get(key).on('afterSetDataSource', function (data) {
      const defaultValue = data.find(item => {
        return item.isDefault;
      });
      if (!defaultValue) return;
      this.setValue(defaultValue[valueField], true);
    });
    viewModel.get(key).on('afterValueChange', (args) => {
      viewModel.biz.do(this.groupSchemasMeta.cAction, viewModel, args.value ? args.value[valueField] : null);
    });
  }
  render() {
    const { viewModel } = this.props;
    const model = viewModel.get(this.groupSchemasMeta.cItemName);
    return (
      <Select className='rpt-table-team-select' model={model} {...this.groupSchemasMeta} />
    );
  }
}
