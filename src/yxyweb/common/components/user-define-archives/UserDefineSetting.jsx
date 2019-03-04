import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Tree, Tabs, Checkbox, Select, Input, InputNumber, Form, DatePicker, Radio, Button, Icon, Popconfirm } from 'antd';
import { Row, Col, Table, Refer } from '../basic';
import { isBoolean, isString, isArray } from 'lodash';
import { getUserDefineArchiveByDefineId, updateUserDef, hideSetting } from '../../redux/userDefineArchives';
import ActionStatus from '../../constants/ActionStatus';
import SvgIcon from 'SvgIcon';
if (process.env.__CLIENT__ === true) {
  require('./UserDefineArchives.less')
}

const confirm = Modal.confirm;
class UserDefineSetting extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      isUpdate: this.props.params.defineId !== undefined,
      typeValue: "",
      typeDisabled: false,
      maxInputLenDisabled: false,
      decimalDigitsDisabled: false,
      isMultiSelDisabled: false,
      isEnabledDisabled: false,
      isSysEnabled: false,
      bInitGridModelDataSource: true
    }
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.dataSourceChange = this.dataSourceChange.bind(this)
  }
  getTabsContent() {
    const TabPane = Tabs.TabPane
    if (this.state.typeValue == "档案") {
      return (<Tabs defaultActiveKey="1"
        tabBarExtraContent={
          <div>
            <Button type="ghost" ref="buttonAdd" className="ant-btn ant-btn-ghost no-border-radius m-l-5"
              onClick={e => this.handleClick('add')}><SvgIcon type="plus" />增行</Button>
            {/*<Button icon="edit" ref="buttonEdit" className="ant-btn ant-btn-ghost no-border-radius m-l-5"
              onClick={e => this.handleClick('edit')}>编辑</Button>
            <Button icon="delete" ref="buttonEdit" className="ant-btn ant-btn-ghost no-border-radius m-l-5"
              onClick={e => this.handleClick('delete')}>删除</Button>*/}
          </div>
        }>
        <TabPane tab="档案值" key="1">
          <Row>
            <Col span={'all'}>
              {this.renderTable()}
            </Col>
          </Row>
        </TabPane>
      </Tabs>);
    }
    else {
      return (<div></div>);
    }
  }
  checkType = (rule, value, callback) => {
    const form = this.props.form;
    if (value != undefined && value.trim() == "") {
      callback('数据类型不可为空字符。');
    }
    else {
      callback();
    }
  }
  checkItemName = (rule, value, callback) => {
    const form = this.props.form;
    if (value  && value.trim().length>50) {
      callback('最大长度为50个字符');
    }
    else {
      callback();
    }
    // if (value && value !== form.getFieldValue('itemName')) {
    //   callback('Two passwords that you enter is inconsistent!');
    // }
    // else {
    //   callback();
    // }
  }

  render() {

    const { isUpdate } = this.state
    const { form, userDefineArchives } = this.props
    const { getFieldDecorator } = form
    const FormItem = Form.Item
    let tabsContent = this.getTabsContent();
    let needMaxInputLen = !this.state.maxInputLenDisabled;

    let isInputDisabled = (this.props.params.classId == "batchnoArchive" || this.props.params.classId == "productSpec") ? true : false;

    return (
      <Modal
        title="自定义项设置"
        width={846}
        maskClosable={false}
        className="userDefineSetting"
        width={750}
        visible={true}
        onOk={this.handleOk}
        onCancel={this.handleCancel} >
        <Form className="ant-advanced-search-form">
          <Row colCount={2} gutter={24}>
            <Col span={0}> <FormItem> {getFieldDecorator("tenantId")(<Input size="default" disabled={true} />)} </FormItem> </Col>
            <Col span={0}> <FormItem> {getFieldDecorator("pubts")(<Input size="default" disabled={true} />)} </FormItem> </Col>
            <Col span={0}> <FormItem> {getFieldDecorator("id")(<Input size="default" disabled={true} />)} </FormItem> </Col>
            <Col span={0}> <FormItem> {getFieldDecorator("classId")(<Input size="default" disabled={true} />)} </FormItem> </Col>
            <Col span={1}> <FormItem label="分类" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} > {getFieldDecorator("className")(<Input size="default" disabled={true} />)} </FormItem> </Col>
            <Col span={0}> <FormItem label="defineId" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} > {getFieldDecorator("defineId")(<Input placeholder="defineId" size="default" disabled={true} />)} </FormItem> </Col>
            <Col span={1}> <FormItem label="项目号" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} > {getFieldDecorator("item")(<Input placeholder="项目号" size="default" disabled={true} />)} </FormItem> </Col>
          </Row>
          <Row colCount={2} gutter={24}>
            <Col span={1}>
              <FormItem label="数据类型" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} >
                {getFieldDecorator
                  ("type", { rules: [{ required: true, message: '不能为空', }, /*{ validator: this.checkType }*/], initialValue: "" })
                  (<Select style={{ width: 139 }} disabled={this.state.typeDisabled} onChange={(val) => this.dataSourceChange("type", val, false)}>
                    <Select.Option value="文本">文本</Select.Option>
                    <Select.Option value="整型">整型</Select.Option>
                    <Select.Option value="数值">数值</Select.Option>
                    <Select.Option value="日期">日期</Select.Option>
                    <Select.Option value="时间">时间</Select.Option>
                    <Select.Option value="日期时间">日期时间</Select.Option>
                    <Select.Option value="档案">档案</Select.Option>
                  </Select>)}
              </FormItem>
            </Col>
            <Col span={1}> <FormItem label="项目名称" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} > {getFieldDecorator("showItem", { rules: [{ required: true, message: '不能为空' },/*{ required: true, message: '最大长度为50个字符。',min:1, max: 50 },*/ { validator: this.checkItemName }], })(<Input placeholder="" size="default" />)} </FormItem> </Col>
            {/*<Col span={0}> <FormItem label="系统项目名称"> {getFieldDecorator("item")(<Input size="default" disabled={true} />)} </FormItem> </Col>*/}
          </Row>
          <Row colCount={2} gutter={24}>
            {/*<Col span={1}> <FormItem label="长度" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} > {getFieldDecorator("length")(<Input placeholder="长度" size="default" disabled={true} />)} </FormItem> </Col>*/}
            <Col span={1}> <FormItem label="控制录入长度" labelCol={{ span: 7 }} wrapperCol={{ span: 13 }} > {getFieldDecorator("maxInputLen", { rules: [{ required: needMaxInputLen, message: '不能为空' }] })(<Input placeholder="" size="default" disabled={this.state.maxInputLenDisabled} />)} </FormItem> </Col>
            <Col span={1}> <FormItem label="小数位数" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} > {getFieldDecorator("decimalDigits")(<Input placeholder="请输入小数位数" size="default" disabled={this.state.decimalDigitsDisabled} />)} </FormItem> </Col>
          </Row>
          <Row colCount={12} gutter={24}>
            <Col span={6}>
              <Col span={7} className='ant-form-item-label'><label>控制</label></Col>
              <Col span={13} className="checkbox">
                {/*{getFieldDecorator("isMultiSel", { initialValue: false, valuePropName: 'checked' })(<Checkbox  disabled={this.state.isMultiSelDisabled}>复选</Checkbox>)}*/}
                {getFieldDecorator("isEnabled", { initialValue: false, valuePropName: 'checked' })(<Checkbox disabled={this.state.isEnabledDisabled} >启用</Checkbox>)}
                {getFieldDecorator("isInput", { initialValue: false, valuePropName: 'checked' })(<Checkbox disabled={isInputDisabled} >必输</Checkbox>)}
              </Col>
            </Col>
          </Row>
          {tabsContent}
        </Form>
      </Modal>
    )
  }

  handleClick(action, row) {
    switch (action) {
      case 'edit':
        this.gridModel.setReadOnly(false);
        break;
      case 'add':
        this.gridModel.setReadOnly(false);
        this.gridModel.appendRow();
        break;
      case 'delete':
        this.gridModel.setReadOnly(false);
        // let indexs = this.gridModel.getSelectedRowIndexes()
        // this.gridModel.deleteRows(indexs[0]);
        this.gridModel.deleteRows(row);
        break;
    }
  }
  renderTable() {
    const { userDefSetting_ArchiveValue, userDefSetting_GetArchiveStatus } = this.props.userDefineArchives
    if (userDefSetting_GetArchiveStatus === ActionStatus.ING) {
      return <div>正在加载..</div>
    }
    else if (userDefSetting_GetArchiveStatus === ActionStatus.FAILURE) {
      return <div>加载失败</div>
    }
    // else if (userDefSetting_GetArchiveStatus === ActionStatus.SUCCEED && userDefSetting_ArchiveValue.length === 0) {
    //   return <div>暂无数据</div>
    // }
    let action = {};
    if (this.state.isSysEnabled == false) {
      action.cAlign = "left";
      action.cControlType = "Toolbar";
      action.cDataSourceName = "Toolbar";
      action.controls = [];
      action.controls.push({ cCaption: "删除", cControlType: "button", cItemName: "btnDelete", cShowCaption: "删除", iOrder: 2, iStyle: 0, icon: "delete", key: "ABC231626" });
    }
    // return (<Table width={700} model={this.gridModel} action={action} />)
    return (<Table width={900} height={0} model={this.gridModel} maxRowCount={5} action={action} />)

  }
  dataSourceChange(name, value, bInit) {
    const { form, userDefineArchives } = this.props
    let fields = {};
    if (name == "type") {
      fields.typeDisabled = { value: false };
      if (value == "文本") {
        this.state.maxInputLenDisabled = false;
        fields.decimalDigits = { value: null };
        this.state.decimalDigitsDisabled = true;
        this.state.isMultiSelDisabled = true;
        if (bInit == false) {
          fields.maxInputLen = { value: 255 }
        }
      }
      else if (value == "整型") {
        this.state.maxInputLenDisabled = false;
        fields.decimalDigits = { value: null };
        this.state.decimalDigitsDisabled = true;
        this.state.isMultiSelDisabled = true;
        if (bInit == false) {
          fields.maxInputLen = { value: 255 }
        }
      }
      else if (value == "数值") {
        // fields.maxInputLen = { value: 255 };
        this.state.maxInputLenDisabled = false;
        this.state.decimalDigitsDisabled = false;
        this.state.isMultiSelDisabled = true;
        if (bInit == false) {
          fields.maxInputLen = { value: 255 }
          fields.decimalDigits = { value: 8 }
        }
      }
      else if (value == "日期") {
        // fields.maxInputLen = { value: 10 };
        fields.maxInputLen = { value: null };
        this.state.maxInputLenDisabled = true;
        fields.decimalDigits = { value: null };
        this.state.decimalDigitsDisabled = true;
        this.state.isMultiSelDisabled = true;
      }
      else if (value == "时间") {
        // fields.maxInputLen = { value: 8 };
        fields.maxInputLen = { value: null };
        this.state.maxInputLenDisabled = true;
        fields.decimalDigits = { value: null };
        this.state.decimalDigitsDisabled = true;
        this.state.isMultiSelDisabled = true;
      }
      else if (value == "日期时间") {
        // fields.maxInputLen = { value: 19 };
        fields.maxInputLen = { value: null };
        this.state.maxInputLenDisabled = true;
        fields.decimalDigits = { value: null };
        this.state.decimalDigitsDisabled = true;
        this.state.isMultiSelDisabled = true;
      }
      else if (value == "档案") {
        const { getUserDefineArchiveByDefineId } = this.props;
        // fields.maxInputLen = { value: 0 };
        fields.maxInputLen = { value: null };
        this.state.maxInputLenDisabled = true;
        fields.decimalDigits = { value: null };
        this.state.decimalDigitsDisabled = true;
        this.state.isMultiSelDisabled = false;
        getUserDefineArchiveByDefineId(this.props.params.defineId);
      }
    }
    if (bInit == true) {
      let isEnabled = form.getFieldValue('isEnabled');
      this.state.isSysEnabled = false;
      if (isEnabled && isEnabled == true) {
        this.state.isSysEnabled = true;
        // this.state.decimalDigitsDisabled = true;
        this.state.maxInputLenDisabled = true;
        this.state.typeDisabled = true;
        this.state.isEnabledDisabled = true;
      }
    }
    form.setFields(fields)
    this.setState({ typeValue: value });
  }

  checkUserDefValue(value) {
    let type = value.type;
    let length = value.length; //控制录入长度
    if (length == undefined)
      length = 255;
    let maxInputLen = value.maxInputLen; //控制录入长度
    let decimalDigits = value.decimalDigits; //小数位数
    if (type == undefined || type == "") {
      cb.utils.alert("数据类型不可为空,请检查。", 'error');
      return false;
    }
    if (value.type == "文本") {
      if (isNaN(maxInputLen) == true || (typeof (maxInputLen) == "string" && maxInputLen.trim() == "") || maxInputLen < 1 || length < maxInputLen || String(maxInputLen).indexOf(".") > 0) {
        cb.utils.alert("控制录入长度必须为1~255之间的整数!", 'error');
        return false;
      }
    }
    if (value.type == "数值") {
      if (isNaN(decimalDigits) == true || (typeof (maxInputLen) == "string" && maxInputLen.trim() == "") || decimalDigits < 1 || decimalDigits > 8 || String(decimalDigits).indexOf(".") > 0) {
        cb.utils.alert("小数位数必须为1~8之间的整数!", 'error');
        return false;
      }
      if (isNaN(maxInputLen) == true || (typeof (maxInputLen) == "string" && maxInputLen.trim() == "") || maxInputLen < 1 || length < maxInputLen || String(maxInputLen).indexOf(".") > 0) {
        cb.utils.alert("控制录入长度必须为1~255之间的整数!", 'error');
        return false;
      }
    }
    if (value.type == "整型") {
      if (isNaN(maxInputLen) == true || (typeof (maxInputLen) == "string" && maxInputLen.trim() == "") || maxInputLen < 1 || length < maxInputLen || String(maxInputLen).indexOf(".") > 0) {
        cb.utils.alert("控制录入长度必须为1~255之间的整数!", 'error');
        return false;
      }
    }
  }

  checkUserDefArchiveValue(data) {
    if (data) {
      let codeArray = [];
      let nameNullRow = [];
      for (var i = 0; i < data.length; i++) {
        // 不再控制编码不可为空和重复
        // if (data[i].code && data[i].code != "") {
        //   if (codeArray.indexOf(data[i].code) >= 0) {
        //     cb.utils.alert("存在编码重复的行,请检查。", 'error');
        //     return false;
        //   }
        //   else {
        //     codeArray.push(data[i].code);
        //   }
        // }
        // if (data[i].code === undefined || data[i].code == "") {
        //   cb.utils.alert("档案值，编码字段不能为空！", 'error');
        //   return false;
        // }
        if (data[i].name === undefined || data[i].name == "") {
          cb.utils.alert("档案值，名称字段不能为空！", 'error');
          return false;
        }
      }
    }
    return true;
  }


  handleOk() {
    // 行业的值非空 0可以改
    const { form, updateUserDef, userDefineArchives } = this.props;
    let propertytype = form.getFieldValue('propertytype');
    let bOKDisable = propertytype ? true : false;
    if (propertytype == "0" || propertytype == 0)
      bOKDisable = false;
    if (bOKDisable == true) {
      cb.utils.alert("行业应用不可修改自定义项。", 'error');
      return;
    }
    let self = this;

    let isEnabled = form.getFieldValue('isEnabled')

    form.validateFields((errors, values) => {
      if (!!errors) {
        return
      }
      if (this.checkUserDefValue(values) == false)
        return;
      values = cb.utils.changeUserDefineTypeEnumValue([values], false)[0];
      let params;
      if (this.state.typeValue == "档案") {
        let dataAll = this.gridModel.getAllData();
        let dirtyData = this.gridModel.getDirtyData();
        if (isEnabled == true && (!(dataAll && dataAll.length > 0))) {
          cb.utils.alert("档案值不可为空。", 'error');
          return;
        }
        else if (this.checkUserDefArchiveValue(dataAll) == false) {
          return;
        }
        else {
          params = {
            "classId": this.props.params.classId,
            "defineId": this.props.params.defineId,
            "userDefBase": values,
            "userDefines": dirtyData
          }
        }
      }
      else {
        let data = this.gridModel.getData();
        for (var i = data.length - 1; i >= 0; i--) {
          if (data[i]._status == "Insert")
            delete data[i];
          else {
            data[i]._status = "Delete";
          }
        }
        params = {
          "classId": this.props.params.classId,
          "defineId": this.props.params.defineId,
          "userDefBase": values,
          "userDefines": data
        }
      }

      if (isEnabled == true && this.state.isSysEnabled == false) {
        self.state.isShowConfirm = true;


        cb.utils.confirm('请确保数据类型设置正确，启用后不允许调整！', () => {
          self.state.isShowConfirm = false;
          updateUserDef(params);
          self.handleCancel();
        }, () => {
          self.state.isShowConfirm = false;
          //取消操作
        });


      }
      else {
        updateUserDef(params);
        self.handleCancel();
      }
    })
  }
  handleCancel() {
    this.props.hideSetting();
  }

  componentDidMount() {
    const { params, userDefineArchives, form, getUserDefineArchiveByDefineId } = this.props;//, getScopeTreeData
    const { isUpdate } = this.state;
    const { userDefList_DisplayData, refFields } = userDefineArchives;
    if (isUpdate) {
      for (let u in userDefList_DisplayData) {
        const userDef = userDefList_DisplayData[u];
        if (userDef.defineId === params.defineId) {
          let fields = {};
          for (let key in userDef) {
            fields[key] = { value: userDef[key] };
          }
          form.setFields(fields)
          if (fields.type) {
            this.state.typeValue = fields.type.value;
            this.dataSourceChange("type", this.state.typeValue, true)
          }
          break;
        }
      }
      this.gridModel = new cb.models.GridModel({
        columns: {
          id: { cItemName: 'id', cShowCaption: 'ID', iColWidth: 0, bHidden: false, bShowIt: false, bCanModify: false, cControlType: 'Input', bMustSelect: true },
          code: { cItemName: 'code', cShowCaption: '编码', iColWidth: 250, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input', bMustSelect: true, iMaxLength: 20 },
          name: { cItemName: 'name', cShowCaption: '名称', iColWidth: 400, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input', bMustSelect: true, iMaxLength: 50 },
          // editButton: { cItemName: 'editButton', cShowCaption: '操作', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: true },

          pubts: { cItemName: 'pubts', cShowCaption: 'pubts', iColWidth: 0, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
          isDeleted: { cItemName: 'isDeleted', cShowCaption: 'isDeleted', iColWidth: 0, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
        },
        independent: true,
        readOnly: true,
        showCheckBox: false,
        showAggregates: false,
        pagination: false,
        showColumnSetting: false
      });
      this.state.bInitGridModelDataSource = true;

      // this.gridModel.on('beforeValueChange', (data) => {
      //   let cellName = data.cellName;
      //   let value = data.value;
      //   if (cellName == "code" && value.length > 20)
      //     return false;
      //   else if (cellName == "name" && value.length > 50)
      //     return false;
      //   else
      //     return true;
      // });
      this.gridModel.on('beforeCellValueChange', (data) => {
        let cellName = data.cellName;
        let value = data.value;
        if (cellName == "code" && value.length > 20) {
          return false;
        }
        else if (cellName == "name" && value.length > 50) {
          return false;
        }
        else
          return true;
      });
      // this.gridModel.on('beforeColumnValueChange', (data) => {
      //   let cellName = data.cellName;
      //   let value = data.value;
      //   if (cellName == "code" && value.length > 20)
      //     return false;
      //   else if (cellName == "name" && value.length > 50)
      //     return false;
      //   else
      //     return true;
      // });
      this.gridModel.setReadOnly(false);
      var fields = {
        grid: this.gridModel,
        btnEdit: new cb.models.SimpleModel(),
        btnDelete: new cb.models.SimpleModel()
      }
      this.viewModel = new cb.models.ContainerModel();
      this.viewModel.setData(fields);

      this.viewModel.get("btnEdit").on('click', (params) => {
        // const rowData = this.gridModel.getRow(params.index);
        this.handleClick('edit');
      });

      this.viewModel.get("btnDelete").on('click', (params) => {
        // const rowData = this.gridModel.getRow(params.index);
        this.handleClick('delete', params.index);
      });

      if (this.state.typeValue == "档案")
        getUserDefineArchiveByDefineId(params.defineId);
    }
    else {

    }
  }
  componentWillReceiveProps(nextProps) {

    if (this.state.isShowConfirm)
      return;
    else {
      if (this.gridModel && nextProps.userDefineArchives.userDefSetting_ArchiveValue && nextProps.userDefineArchives.userDefSetting_ArchiveValue.length > 0) {
        if (this.state.bInitGridModelDataSource) {
          this.gridModel.setDataSource(nextProps.userDefineArchives.userDefSetting_ArchiveValue);
          this.gridModel.setDirty(false);
          this.state.bInitGridModelDataSource = false;
        }
      }
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userDefineArchives: state.userDefineArchives.toJS(),
    params: ownProps.params,
  }
}
const mapDispatchToProps = (dispatch) => {
  const methods = {
    getUserDefineArchiveByDefineId, updateUserDef, hideSetting
  };
  return {
    dispatch,
    ...bindActionCreators(methods, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UserDefineSetting))

