import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Tabs, Icon } from 'antd';
import Col from '../basic/col';
import Row from '../basic/row';
import Table from '../basic/table';
import Button from '../basic/button';
import FormulaDesigner from 'yxyweb/common/components/formula-designer'
import * as billactions from '../../redux/billDesign';
import { initData } from '../../redux/formula';
import { proxy } from '../../helpers/util';
import SvgIcon from 'SvgIcon';
const TabPane = Tabs.TabPane;

if (process.env.__CLIENT__ === true) {
  require('./billDesign.less')
}
class BillDesign extends Component {
  constructor(props) {
    super(props);
    this.actions = props.billactions;
    this.title = '表单模板';
    this.cEnumString = {};
    this.getEnum();
  }
  async getEnum() {
    const config = {
      url: 'enum/getEnumStrFetch',
      method: 'GET',
      params: {
        enumtype: 'enterDirection'
      }
    };
    const json = await proxy(config);

    // proxy(config)
    //   .then(json => {
    if (json.code !== 200) {
      cb.utils.alert('获取枚举失败' + json.message, 'error');
      return;
    }
    this.enumArr = JSON.parse(json.data);
    this.enumArr && this.enumArr.map(item => {
      this.cEnumString[item.key] = item.value;
    });
    this.initDesign();
    // });
  }
  initDesign() {
    let type = 'voucher';
    if (this.props.type && this.props.type == 'report') type = 'Report';
    this.actions.loadBillDesign(type);
    let columns = {
      cCaption: { cItemName: 'cCaption', cShowCaption: '名称', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: false, cControlType: 'Input', bMustSelect: true },
      cShowCaption: { cItemName: 'cShowCaption', cShowCaption: '显示名称', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input', bMustSelect: true },
      bShowIt: { cItemName: 'bShowIt', cShowCaption: '是否显示', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'CheckRadio', bMustSelect: true },
      bIsNull: { cItemName: 'bIsNull', cShowCaption: '是否必输', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'CheckRadio', bMustSelect: true },
      bNeedSum: { cItemName: 'bNeedSum', cShowCaption: '是否合计', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'CheckRadio', bMustSelect: true },
      iColWidth: { cItemName: 'iColWidth', cShowCaption: '宽度', iColWidth: 80, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'InputNumber', bMustSelect: true, iNumPoint: 0 },
      cDefaultValue: { cItemName: 'cDefaultValue', cShowCaption: '默认值', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Uncertain', bMustSelect: true },
      enterDirection: {
        cItemName: 'enterDirection', cShowCaption: '回车方向', iColWidth: 100, bHidden: false,
        bShowIt: true, bCanModify: true, cControlType: 'Select', bMustSelect: true, "cEnumType": "enterDirection",
        cEnumString: JSON.stringify(this.cEnumString || ""), enumArray: JSON.stringify(this.enumArr || "")
      },
    };
    if (type == 'Report') {
      columns = {
        cCaption: { cItemName: 'cCaption', cShowCaption: '名称', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: false, cControlType: 'Input', bMustSelect: true },
        cShowCaption: { cItemName: 'cShowCaption', cShowCaption: '显示名称', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input', bMustSelect: true },
        bShowIt: { cItemName: 'bShowIt', cShowCaption: '是否显示', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'CheckRadio', bMustSelect: true },
        iColWidth: { cItemName: 'iColWidth', cShowCaption: '宽度', iColWidth: 80, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'InputNumber', bMustSelect: true, iNumPoint: 0 },
      };
    }
    this.gridModel = new cb.models.GridModel({
      columns: columns,
      independent: true,
      readOnly: true,
      showRowNo: true,
      showCheckBox: false,
      showAggregates: false,
      pagination: false,
      isDirty: true,
      showColumnSetting: false,

    });
    this.gridModel.on('afterCellValueChange', val => {
      let index = val.rowIndex;
      let data = this.gridModel.getAllData();
      if (val.cellName == 'cDefaultValue' && val.value == '')
        data[index].cDefaultValue = null;
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
    this.actions.getBillByBillNo(data.cBillNo, this.gridModel, readOnly, this.props.type, false, data.cBillType);
    this.params = { cBillNo: data.cBillNo, readOnly: readOnly };
    this.billNo = data.cBillNo;
  }
  handleAdd = () => {
    let selectRowIndex = this.gridModel.getSelectedRowIndexes();
    if (!selectRowIndex || selectRowIndex.length == 0) {
      cb.utils.alert('请选中一行后增加！', 'error');
      return
    }
    const iBillEntityId = this.getBillEntityId();
    this.props.initData(this.billNo, { caption: "", expressionCode: "", expression: "" }, iBillEntityId);
    this.isAdd = true;
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
    this.props.initData(this.billNo, {
      'caption': checkRow.cShowCaption, 'expressionCode': checkRow.cFieldName, 'expression': checkRow.cDefineName,
      'cControlType': checkRow.cControlType, 'cFormatData': checkRow.cFormatData, 'iNumPoint': checkRow.iNumPoint
    }, iBillEntityId);
  }
  getBillEntityId = () => {
    let { voucher, report } = this.props.billDesign;
    let activeKey, groups, iBillEntityId = "";
    if (this.props.type == 'report') {
      activeKey = report.activeKey;
      groups = report.groups;
    } else {
      activeKey = voucher.activeKey;
      groups = voucher.groups;
    }
    let selectRow = this.gridModel && this.gridModel.getSelectedRows();
    if(selectRow && selectRow.length >0){
      iBillEntityId = selectRow[0].iBillEntityId;
    }else{
      let data = cb.utils.extend(true, [], groups);
      data.map((item, groupIndex) => {
        if (item.groupId == activeKey) {
          iBillEntityId = item.iBillEntityId;
        }
      });
    }
    return iBillEntityId;
  }
  handleOk = (args) => {
    let { voucher, report } = this.props.billDesign;
    let groups = [], activeKey;
    if (this.props.type == 'report') {
      groups = report.groups;
      activeKey = report.activeKey;
    } else {
      groups = voucher.groups;
      activeKey = voucher.activeKey;
    }
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
        cControlType: args.cControlType,
        cFormatData: args.cFormatData,
        iNumPoint: args.iNumPoint,
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
      this.gridModel.setCellValue(checkIndex, 'cControlType', args.cControlType);
      this.gridModel.setCellValue(checkIndex, 'cFormatData', args.cFormatData);
      this.gridModel.setCellValue(checkIndex, 'iNumPoint', args.iNumPoint);
      controls[checkIndex].cCaption = args.caption;
      controls[checkIndex].cShowCaption = args.caption;
      controls[checkIndex].cFieldName = args.expressionCode;
      controls[checkIndex].cDefineName = args.expression;
      controls[checkIndex].cControlType = args.cControlType;
      controls[checkIndex].cFormatData = args.cFormatData;
      controls[checkIndex].iNumPoint = args.iNumPoint;
      controls[checkIndex]._status = 'Update';
      this.actions.setGroups(controls, this.props.type);
    }
  }
  /*弹出框确认及取消事件*/
  onOk = (e) => {
    let { voucher, report } = this.props.billDesign;
    let groups = [];
    if (this.props.type == 'report') {
      groups = report.groups;
    } else {
      groups = voucher.groups;
    }
    this.actions.updateBillTemplate(groups, null, {
      cBillNo: this.params.cBillNo, gridModel: this.gridModel,
      readOnly: this.params.readOnly, type: this.props.type
    });
    this.actions.modifyModalVisible(false, this.props.type);
  }
  onCancel = (e) => {
    this.actions.modifyModalVisible(false, this.props.type);
  }
  onButtonClick = (type) => {
    this.actions.setReadOnly(false, this.props.type);
    this.gridModel.setReadOnly(false);
  }
  onMoveUp = () => {
    let controls, pre, now;;
    let index = this.gridModel.getSelectedRowIndexes()[0];
    if (!index && index != 0) {
      cb.utils.alert('请选择行在进行上移操作！', 'error');
      return
    }
    let rows = this.gridModel.getRowsByIndexes([index, (index - 1)]);
    now = rows[0], pre = rows[1];
    this.gridModel.shiftUpRow(index);
    controls = this.gridModel.getData();
    this.gridModel.setDataSource(controls);
    this.gridModel.setCellValue(index, 'iOrder', now.iOrder);
    this.gridModel.setCellValue(index - 1, 'iOrder', pre.iOrder);
    this.gridModel.select(index - 1);
    this.actions.setGroups(controls, this.props.type);
  }
  onMoveDown = () => {
    let controls, next, now;;
    let index = this.gridModel.getSelectedRowIndexes()[0];
    if (!index && index != 0) {
      cb.utils.alert('请选择行在进行下移操作！', 'error');
      return
    }
    let rows = this.gridModel.getRowsByIndexes([index, (index + 1)]);
    now = rows[0], next = rows[1];
    this.gridModel.shiftDownRow(index);
    controls = this.gridModel.getData();
    this.gridModel.setDataSource(controls);
    this.gridModel.setCellValue(index, 'iOrder', now.iOrder);
    this.gridModel.setCellValue(index + 1, 'iOrder', next.iOrder);
    this.gridModel.select(index + 1);
    this.actions.setGroups(controls, this.props.type);
  }
  getControl = () => {
    let { voucher, report } = this.props.billDesign;
    let billDesignList = [], controls = [];
    if (this.props.type == 'report') {
      billDesignList = report.billDesignList;
    } else {
      billDesignList = voucher.billDesignList;
    }
    billDesignList.map((ele, index) => {
      let childControl = this.getChildControl(ele.children);
      controls.push(
        <div id={index} className='uretail-bill-list'><h3>{ele.cName}</h3>{childControl}</div>
      )
    });
    return controls
  }
  getChildControl = (children) => {
    if (!children) return '';
    let controls = [];
    children.map(ele => {
      controls.push(
        <Col span={1}>
          <div id={ele.cBillNo} className="billdesign-card">
            <div className="billdesign-card-title">{ele.cName}</div>
            <div className="billdesign-card-operation">
              <a onClick={(e) => this.onClick(e, 'see', ele)}>查看</a>|
                            <a onClick={(e) => this.onClick(e, 'modify', ele)}>编辑</a>
            </div>
          </div >
        </Col>
      )
    });
    return <Row colCount={5}>{controls}</Row>
  }
  onTabsChange = (activeKey) => {
    this.actions.setActiveKey(activeKey, this.gridModel, this.props.type);
  }
  onActionClick = (index, action) => {
    const { cItemName } = action;
    const { voucher, report } = this.props.billDesign;
    let activeKey, groups;
    if (this.props.type == 'report') {
      activeKey = report.activeKey;
      groups = report.groups;
    } else {
      activeKey = voucher.activeKey;
      groups = voucher.groups;
    }
    let data = cb.utils.extend(true, [], groups);
    if (cItemName == 'btnDeleteRow') {
      let controls = [], gIndex;
      data.map((item, groupIndex) => {
        if (item.groupId == activeKey) {
          controls = item.controls;
          gIndex = groupIndex;
        }
      });
      if (controls[index]) {
        if (controls[index].iSystem == 1) {
          cb.utils.alert('系统项不允许进行删除操作！', 'error');
          return
        }
        cb.utils.confirm("确定删除栏目【" + controls[index].cShowCaption + "】么？", () => {
          controls[index]._status = 'delete';
          this.gridModel.deleteRows([index]);
          this.actions.setGroups(controls, this.props.type);
          data[gIndex].controls = [controls[index]];
          this.actions.updateBillTemplate(data, null, {
            cBillNo: this.params.cBillNo, gridModel: this.gridModel,
            readOnly: this.params.readOnly, type: this.props.type
          });
        });
      }
    }
  }
  bHasDataSource = () => {
    let { voucher, report } = this.props.billDesign;
    let activeKey, groups, hasDataSource = false;
    if (this.props.type == 'report') {
      activeKey = report.activeKey;
      groups = report.groups;
    } else {
      activeKey = voucher.activeKey;
      groups = voucher.groups;
    }
    let data = cb.utils.extend(true, [], groups);
    data.map((item, groupIndex) => {
      if (item.groupId == activeKey) {
        if (item.cDataSourceName) hasDataSource = true;
      }
    });
    return hasDataSource;
  }
  getModalControl = (modalData) => {
    let { voucher, report } = this.props.billDesign;
    let activeKey, readOnly, action, tableClass, buttonControl, hasDataSource;
    hasDataSource = this.bHasDataSource();
    action = {
      "cControlType": "Toolbar",
      "controls":
        [
          {
            "cItemName": "btnDeleteRow", "cCaption": "删行", "iOrder": 34, "cShowCaption": "删行", "iStyle": 0,
            "cControlType": "button", "icon": "shanchu1", "childrenField": "purInRecords", "key": "3876626"
          }
        ]
    }
    if (this.props.type == 'report') {
      activeKey = report.activeKey;
      readOnly = report.readOnly;
      tableClass = "ReportDesign";
    } else {
      tableClass = "BillDesign";
      activeKey = voucher.activeKey;
      readOnly = voucher.readOnly;
    }
    if (readOnly) {
      buttonControl = (
        <Button key="edit" onClick={() => this.onButtonClick('edit')}>
          <SvgIcon className="icon-edit" type="edit" />
          编辑
        </Button>
      )
    } else {

      if (hasDataSource) {

        buttonControl = (
          <div>
            <Button key="plus-copy" type="primary" onClick={this.handleAdd}>
              <SvgIcon className="icon-plus-copy" type="plus-copy" />
              增加
            </Button>
            <Button key="edit" onClick={this.handleModify}>
              <SvgIcon className="icon-edit" type="edit" />
              设计
            </Button>
            <Button key="moveup" onClick={this.onMoveUp}>
              <SvgIcon className="icon-shangyi" type="shangyi" />
              上移
            </Button>
            <Button key="movedown" onClick={this.onMoveDown}>
              <SvgIcon className="icon-xiayi" type="xiayi" />
              下移
            </Button>
          </div>
        )
      } else {
        buttonControl = (
          <div>
            <Button key="moveup" onClick={this.onMoveUp}>
              <SvgIcon className="icon-shangyi" type="shangyi" />
              上移
            </Button>
            <Button key="movedown" onClick={this.onMoveDown}>
              <SvgIcon className="icon-xiayi" type="xiayi" />
              下移
            </Button>
          </div>
        )
      }
    }
    if (!modalData || modalData.length == 0) return;
    let paneControls = [], tabButtonClass = "tabs-button";
    if (modalData && modalData.length > 1) {
      modalData.map(ele => {
        paneControls.push(<TabPane tab={ele.cName} key={ele.groupId} />);
      })
    } else {
      tabButtonClass = tabButtonClass + ' noTabs';
    }
    if (typeof activeKey == 'number') activeKey = activeKey.toString();
    return (
      <div>
        <div className="bill-design-tabs clearfix">
          <div className={tabButtonClass}>
            {buttonControl}
          </div>
          {/* <div className="tabs-control">{paneControls}</div> */}
          {/* <div className="tabs-control"> */}
          {
            paneControls.length == 0 ?
              ""
              :
              <Tabs style={{ width: '800px', float: 'left' }}
                // hideAdd
                onChange={this.onTabsChange}
                activeKey={activeKey}
                // type="editable-card"
                // onEdit={this.onEdit}
                animated={false}
              >
                {paneControls}
              </Tabs>
          }
          {/* </div> */}
        </div>
        <Table action={action} noViewModel={true} noBrowseAction={true} onActionClick={this.onActionClick} width={800} height={441} tableClass={tableClass} model={this.gridModel} />
      </div>
    )
  }
  render() {
    let billDesignControl = this.getControl();
    let { voucher, report } = this.props.billDesign;
    let showModal, modalData, readOnly, className = "bill-design-modal report-design-modal";
    if (this.props.type == 'report') {
      showModal = report.showModal;
      modalData = report.modalData;
      readOnly = report.readOnly;
    } else {
      showModal = voucher.showModal;
      modalData = voucher.modalData;
      readOnly = voucher.readOnly;
      className = 'bill-design-modal';
    }
    let modalControl = this.getModalControl(modalData);
    let title = readOnly ? '查看' : '编辑';
    const iBillEntityId = this.getBillEntityId();
    return (
      <div className="uretail-billdesign-body">
        {billDesignControl}
        <Modal title={title + this.title} width={800} visible={showModal} className={className}
          onOk={this.onOk} onCancel={this.onCancel} okText="确定" cancelText="取消" maskClosable={false}
        >
          <div>{modalControl}</div>
        </Modal>
        <FormulaDesigner modalKey={this.billNo + iBillEntityId} onOk={this.handleOk} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    billDesign: state.billDesign.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    billactions: bindActionCreators(billactions, dispatch),
    initData: bindActionCreators(initData, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillDesign);
