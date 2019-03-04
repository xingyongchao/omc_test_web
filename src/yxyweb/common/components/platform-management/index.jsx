import React, { Component } from 'react';
import { Row } from 'antd';
import { CheckboxEnum, Button } from '../basic';

export default class PlatformManagement extends Component {
  constructor(props) {
    super(props);
    this.viewModel = cb.loader.initMetaCommonViewModel('PlatformManagementViewModel', 'platformManagementViewModel');
  }
  render() {
    return (
      <Row className="Platform_management">
        <Row>
          <div className='viewCell' style={{ width: 'auto' }}>
            <Row style={{ height: 32 }}><div className='label-control'>自定义项</div></Row>
          </div>
          <Button model={this.viewModel.get('upgradeUserDef')} value='更新' />
        </Row>
        <Row>
          <div className='viewCell' style={{ width: 'auto' }}>
            <CheckboxEnum model={this.viewModel.get('cacheType')} cShowCaption='缓存类型' />
          </div>
          <Button className="Platform_management_btn" model={this.viewModel.get('refreshCache')} value='刷新' />
        </Row>
      </Row>
    );
  }
}
