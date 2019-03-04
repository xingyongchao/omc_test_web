import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Tabs, Icon,Button} from 'antd';
import Col from '../basic/col';
import Row from '../basic/row';
import SvgIcon from 'SvgIcon';
import AddMessage from './AddMessage'
import * as addActions from '../../redux/addMessage';

const TabPane = Tabs.TabPane;
let Table = null;
if (process.env.__CLIENT__ === true) {
  require('./billdesign.less')
}

class SubscribeSetting extends Component {
  constructor(props) {
    super(props);
    Table = require('../basic/table').default;
    this.actions = props.addActions;
    this.title = '订阅设置';
  }
  componentDidMount() {
    let columns = {
      cCaption: { cItemName: 'name', cShowCaption: '订阅名称', iColWidth: 150, bHidden: false, bShowIt: true, bCanModify: false, cControlType: 'Input', bMustSelect: true },
      cCycle: { cItemName: 'cycle', cShowCaption: '订阅周期', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: false, cControlType: 'Input', bMustSelect: true },
      cStart: { cItemName: 'isStart', cShowCaption: '是否启用', iColWidth: 150, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'CheckRadio', bMustSelect: true },
    };
    this.gridModel = new cb.models.GridModel({
      columns: columns,
      independent: true,
      readOnly: false,
      showRowNo: true,
      showCheckBox: false,
      showAggregates: false,
      pagination: false,
      isDirty: true,
      showColumnSetting: false,

    });
    // let dataSource=this.props.addMessage.dataSource
    this.actions.getListData(this.gridModel);
    // this.gridModel.setDataSource(dataSource);
    this.gridModel.on('beforeCellValueChange', val=>{
      let data= this.gridModel.getRowsByIndexes([val.rowIndex]);
      if(data[0].isStart){
      cb.utils.confirm("确定停用此条订阅吗？",()=>{
        this.actions.modifyCellValue(data[0].isStart,val.rowIndex)
      })
      return false;
    }
      cb.utils.confirm("确定启用此条订阅吗？",()=>{
        this.actions.modifyCellValue(data[0].isStart,val.rowIndex)
      })
      return false;
    }
    );
    this.gridModel.on('afterCellValueChange', val => {
      let index = val.rowIndex;
      let data = this.gridModel.getAllData();
      data[index]._status = 'Update';
      this.actions.setGroups(data, this.props.type, data[index]);
    });
    this.gridModel.on('afterUpdateRow', val => {
      let index = val.index;
      let data = this.gridModel.getAllData();
      data[index]._status = 'Update';
      this.actions.setGroups(data, this.props.type, data[index]);
    });
    this.gridModel.on('afterInsertRow', val => {
      let index = val.index;
      let data = this.gridModel.getAllData();
      // data[index]._status = 'insert';
      this.actions.setGroups(data, this.props.type);
    });
    this.gridModel.on('afterSetDataSource', data => {
      if (cb.utils.isArray(data)) {
        let states = [];
        data.map((row, index) => {
          if (row.iSystem != 1) {
            states.push(
              { "rowIndex": index, "cellName": "bIsNull", "propertyName": "disabled", "value": true }
            )
          }
        });
        if (states.length > 0) this.gridModel.setCellStates(states);
      }
    });
  }
  /*查看/编辑 表单模板*/
  onClick = (e, type, data) => {
    let readOnly, modalVisible;
    if (type == 'see') {
      readOnly = true;
    } else {
      readOnly = false;
    }
    this.title = data.cName;
    this.actions.modifyModalVisible(true, this.props.type);
    this.actions.setReadOnly(readOnly, this.props.type);
    this.gridModel.setReadOnly(readOnly);
    this.actions.getBillByBillNo(data.cBillNo, this.gridModel, readOnly, this.props.type);
    this.params = { cBillNo: data.cBillNo, readOnly: readOnly };
    this.billNo = data.cBillNo;
  }

  handleModify = () => {
    this.isAdd = false;
    const checkRows = this.gridModel.getSelectedRows();
    let checkRow = [];
    if (!checkRows || checkRows.length < 1) {
      cb.utils.alert('未选中任何行！', 'error');
      return
    } else {
      checkRow = checkRows[0];
      if (checkRow.iSystem == 1) {
        cb.utils.alert('系统项，不允许设计！', 'error');
        return
      }
    }
    const iBillEntityId = this.getBillEntityId();
    this.props.initData(this.billNo, { caption: checkRow.cShowCaption, expressionCode: checkRow.cFieldName, expression: checkRow.cDefineName }, iBillEntityId);
  }
  getBillEntityId = () => {
    let activeKey, groups, iBillEntityId = "";
    let data = cb.utils.extend(true, [], groups);
    data.map((item, groupIndex) => {
      if (item.groupId == activeKey) {
        iBillEntityId = item.iBillEntityId;
      }
    });
    return iBillEntityId;
  }
  handleOk = (args) => {
    let groups = [], activeKey;

    let data = cb.utils.extend(true, [], groups);
    let controls = [], gIndex;
    data.map((item, groupIndex) => {
      if (item.groupId == activeKey) {
        controls = item.controls;
        gIndex = groupIndex;
      }
    });
    if (this.isAdd) {
      let selectRowIndex = this.gridModel.getSelectedRowIndexes()[0];
      let rows = this.gridModel.getData();
      let selectRow = rows[selectRowIndex];
      let row = {
        cCaption: args.caption,
        cShowCaption: args.caption,
        cFieldName: args.expressionCode,
        cDefineName: args.expression,
        iBillTplGroupId: selectRow.iBillTplGroupId,
        iBillId: selectRow.iBillId,
        iBillEntityId: selectRow.iBillEntityId,
        iTplId: selectRow.iTplId,
        cSubId: selectRow.cSubId,
        iOrder: selectRow.iOrder + 1,
        cDataSourceName: selectRow.cDataSourceName
      };
      row._status = 'Insert';
      data[gIndex].controls = [row];
      for (var i = selectRowIndex + 1; i < rows.length; i++) {
        data[gIndex].controls.push(rows[i]);
      }
      this.actions.updateBillTemplate(data, "insert", {
        cBillNo: this.params.cBillNo, gridModel: this.gridModel,
        readOnly: this.params.readOnly, type: this.props.type
      });
    } else {
      const seletIndexs = this.gridModel.getSelectedRowIndexes();
      const checkIndex = seletIndexs[0];
      this.gridModel.setCellValue(checkIndex, 'cCaption', args.caption);
      this.gridModel.setCellValue(checkIndex, 'cShowCaption', args.caption);
      this.gridModel.setCellValue(checkIndex, 'cFieldName', args.expressionCode);
      this.gridModel.setCellValue(checkIndex, 'cDefineName', args.expression);
      controls[checkIndex].cCaption = args.caption;
      controls[checkIndex].cShowCaption = args.caption;
      controls[checkIndex].cFieldName = args.expressionCode;
      controls[checkIndex].cDefineName = args.expression;
      controls[checkIndex]._status = 'Update';
      this.actions.setGroups(controls, this.props.type);
    }
  }
  /*弹出框确认及取消事件*/
  onOk = (e) => {
    let groups = [];
    this.actions.updateBillTemplate(groups, null, {
      cBillNo: this.params.cBillNo, gridModel: this.gridModel,
      readOnly: this.params.readOnly, type: this.props.type
    });
    this.actions.modifyModalVisible(false, this.props.type);
  }
  onCancel = (e) => {
    this.props.close();

  }
  onButtonClick = (type) => {
    this.actions.setReadOnly(false, this.props.type);
    this.gridModel.setReadOnly(false);
  }

  onActionClick = (index, action) => {
    let  subscribeId=this.props.addMessage.subscribeId
    let id=subscribeId[index]
    const { cItemName } = action;
    // const dataSource=this.props.addMessage.dataSource;
    // let activeKey, groups;
    // let data = cb.utils.extend(true, [], groups);
    if (cItemName == 'btnDeleteRow') {
      cb.utils.confirm("确定删除此栏目么？",()=>{
      this.actions.deleteRow(id, this.gridModel)})
      // this.gridModel.deleteRows(id);
      // this.gridModel.setDataSource(dataSource);
      // this.actions.getListData(this.gridModel);
      // this.getModalControl();

      // let controls = [], gIndex;
      // data.map((item, groupIndex) => {
      //   if (item.groupId == activeKey) {
      //     controls = item.controls;
      //     gIndex = groupIndex;
      //   }
      // });
      // if (controls[index]) {
      //   if (controls[index].iSystem == 1) {
      //     cb.utils.alert('系统项不允许进行删除操作！', 'error');
      //     return
      //   }
      //   cb.utils.confirm("确定删除栏目【" + controls[index].cShowCaption + "】么？", () => {
      //     controls[index]._status = 'delete';
      //     this.gridModel.deleteRows([index]);
      //     data[gIndex].controls = [controls[index]];
      //     this.actions.updateBillTemplate(data, null, {
      //       cBillNo: this.params.cBillNo, gridModel: this.gridModel,
      //       readOnly: this.params.readOnly, type: this.props.type
      //     });
      //   });
      // }

    }else{
      const {model} = this.props;
      const {billNo, menuId, filterId, code, name, viewType, metaType, metaKey}=model.getParams();
      const command = JSON.stringify({code,name,viewType,metaType,metaKey});
      this.actions.initData(billNo, command, filterId, model.getCache('lastSearchCondition'), model.getCache('groupSchemaId'));
      // this.actions.getSolutionList(filterId);
      this.actions.getSolutionEdit(filterId);
      this.actions.editRow(index);
    }
  }
  bHasDataSource = () => {
    let activeKey, groups, hasDataSource = false;

    let data = cb.utils.extend(true, [], groups);
    data.map((item, groupIndex) => {
      if (item.groupId == activeKey) {
        if (item.cDataSourceName) hasDataSource = true;
      }
    });
    return hasDataSource;
  }

  showAddModal=()=>{
    const {model} = this.props;
    const {billNo, menuId, filterId, code, name, viewType, metaType, metaKey}=model.getParams();
    const command = JSON.stringify({code,name,viewType,metaType,metaKey});
    this.actions.initData(billNo, command, filterId, model.getCache('lastSearchCondition'), model.getCache('groupSchemaId'));
    this.actions.getReceivers();
    this.actions.getSolutionList(filterId)
  }

  getModalControl = () => {
    const action = {
      "cControlType": "Toolbar",
      "cStyle":"{\"fixedwidth\":150}",
      "controls":
        [
          {
            "cItemName": "btnEditRow", "cCaption": "编辑", "iOrder": 34, "cShowCaption": "编辑", "iStyle": 0,
            "cControlType": "button", "icon": "shanchu1", "childrenField": "purInRecords", "key": "3876626"
          },
          {
            "cItemName": "btnDeleteRow", "cCaption": "删除", "iOrder": 34, "cShowCaption": "删除", "iStyle": 0,
            "cControlType": "button", "icon": "shanchu1", "childrenField": "purInRecords", "key": "3876626"
          }
        ]
    }
    return (
      <div>
        <div className="bill-design-tabs clearfix">
          <div className='tabs-button noTabs'>
            <Button type='primary' onClick={this.showAddModal}><SvgIcon className="icon-plus-copy" type="plus-copy" />
新增</Button>

          </div>
        </div>
        <Table action={action} noViewModel={true} onActionClick={this.onActionClick} width={800} height={441} model={this.gridModel} />
      </div>
    )
  }
  // getData=()=>{
  //   this.actions.getListData()
  // }
  render() {
    let showModal, modalData, readOnly, className = "bill-design-modal report-design-modal";
    let modalControl = this.getModalControl();
    const iBillEntityId = this.getBillEntityId();
    return (
      <div className="uretail-billdesign-body">
        <Modal title="订阅设置" width={800} visible
         className={className}
          onOk={this.onCancel} onCancel={this.onCancel} okText="确定" cancelText="取消" maskClosable={false}
        >
          <div>{modalControl}</div>
        </Modal>
        <AddMessage />


      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
     addMessage: state.addMessage.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addActions: bindActionCreators(addActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeSetting);
