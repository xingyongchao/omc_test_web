import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tree, message, Modal, Popconfirm } from 'antd';
import { Row, Col, Button, Table } from '../basic';
import UserDefineSetting from './UserDefineSetting';
import {
  fetchUserDefineList,
  fetchUserDefineListPageByClass,
  showSetting
} from '../../redux/userDefineArchives';
import ActionStatus from '../../constants/ActionStatus';

if (process.env.__CLIENT__ === true) {
  require('./UserDefineArchives.less')
}

class UserDefineArchives extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    // this.handleTableRowDoubleClick = this.handleTableRowDoubleClick.bind(this)
    this.handleClassClick = this.handleClassClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.pageSize = 10;
    this.setModel();
  }
  // handleTableRowDoubleClick(params) {
  //   const defineId = encodeURI(params.defineId);
  //   this.context.router.push(`/userDefines/${defineId}`)
  // }

  handleClassClick(code) {
    this.props.fetchUserDefineListPageByClass(code, this.pageSize, 1)
  }
  handleClick(type) {
    if (type === 'refresh') {
      this.props.fetchUserDefineList("", this.pageSize, 1)
    }
  }

  render() {

    const { userDefList_Class, userDefList_CurrentClassId, userDefSetting_DefineId } = this.props.userDefineArchives
    const userDefList_ClassButton = []
    let bHeader = false;
    for (var prop in userDefList_Class) {
      if (userDefList_Class.hasOwnProperty(prop)) {
        let value = userDefList_Class[prop]
        let key = prop
        //在遍历或者循环输出去渲染子组件的时候，key必不可少
        let cname = "no-border button-margin button-selected-" + (userDefList_CurrentClassId == key);
        if (key == "billHead") {
          userDefList_ClassButton.splice(0, 0, <Button type="ghost" key={key} className={cname} onClick={e => this.handleClassClick(key)}>{value}</Button>)
          bHeader = true;
        }
        else if (key == "billBody") {
          if (bHeader)
            userDefList_ClassButton.splice(1, 0, <Button type="ghost" key={key} className={cname} onClick={e => this.handleClassClick(key)}>{value}</Button>)
          else
            userDefList_ClassButton.splice(0, 0, <Button type="ghost" key={key} className={cname} onClick={e => this.handleClassClick(key)}>{value}</Button>)
        }
        else {
          userDefList_ClassButton.push(<Button type="ghost" key={key} className={cname} onClick={e => this.handleClassClick(key)}>{value}</Button>)
        }
      }
    }
    let archForm = (
      <div className="userDefinedArchives">
        <Row colCount={12} className="itemType">
          {/*<Col span={1}>
            项目分类：
          </Col>*/}
          <Col span={12}>
            {userDefList_ClassButton}
          </Col>
          {/*<Col span={1}> <Button type="ghost" icon="reload" className="ant-btn ant-btn-ghost no-border-radius m-l-5" onClick={e => this.handleClick('refresh')}>刷新</Button>*/}
          {/*</Col>*/}
        </Row>
        <Row>
          <Col span={'all'}>
            {this.renderTable()}
          </Col>
        </Row>
      </div>
    );
    let modal = null;
    if (userDefSetting_DefineId) {
      const params = { classId: userDefList_CurrentClassId, defineId: userDefSetting_DefineId };
      modal = <UserDefineSetting params={params} />
    }
    return <div>{archForm}{modal}</div>;
  }

  renderTable() {
    const { userDefList_DisplayData, userDefList_GetUserDefStatus, userDefList_CurrentClassId } = this.props.userDefineArchives;
    if (userDefList_GetUserDefStatus === ActionStatus.ING) {
      return <div>正在加载..</div>
    } else if (userDefList_GetUserDefStatus === ActionStatus.FAILURE) {
      return <div>加载失败</div>
    } else if (userDefList_GetUserDefStatus === ActionStatus.SUCCEED && userDefList_DisplayData.length === 0) {
      return <div>没有数据</div>
    }
    let action = {};
    action.cAlign = "left";
    action.cControlType = "Toolbar";
    action.cDataSourceName = "Toolbar";
    this.actionControls = action.controls = [];
    action.controls.push({ cCaption: "设置", cControlType: "button", cItemName: "btnEdit", cShowCaption: "设置", iOrder: 1, iStyle: 0, icon: "edit", key: "ABC231625" });
    // if (userDefList_CurrentClassId == "productSpec") {
    //   console.log(" renderTable noaction  userDefList_CurrentClassId = " + userDefList_CurrentClassId);
    //   return (<Table width={this.props.width} model={this.gridModel} action={{}} />);
    // } else {
    console.log(" renderTable  userDefList_CurrentClassId = " + userDefList_CurrentClassId);
    return (<Table width={this.props.width} height={600} listHeaderHeight={1} model={this.gridModel} action={action} />);
    // }
  }
  setModel() {
    this.gridModel = new cb.models.GridModel({
      columns: {
        tenantId: { cItemName: 'tenantId', cShowCaption: 'tenantId', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: false, cControlType: 'Input' },
        pubts: { cItemName: 'pubts', cShowCaption: 'pubts', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: false, cControlType: 'Input' },
        id: { cItemName: 'id', cShowCaption: 'id', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: false, cControlType: 'Input' },
        classId: { cItemName: 'classId', cShowCaption: 'classId', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: false, cControlType: 'Input' },
        className: { cItemName: 'className', cShowCaption: '分类', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: false, cControlType: 'Input' },
        defineId: { bJointQuery: false, cItemName: 'defineId', cShowCaption: 'defineId', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: true, cControlType: 'Input' },//bJointQuery: true,
        item: { bJointQuery: false, cItemName: 'item', cShowCaption: '项目号', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },//bJointQuery: true,
        // item: { cItemName: 'item', cShowCaption: '系统项目名称', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: false, cControlType: 'Input' },
        type: { cItemName: 'type', cShowCaption: '数据类型', iColWidth: 120, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
        showItem: { cItemName: 'showItem', cShowCaption: '项目名称', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
        // length: { cItemName: 'length', cShowCaption: '长度', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
        maxInputLen: { cItemName: 'maxInputLen', cShowCaption: '控制录入长度', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
        decimalDigits: { cItemName: 'decimalDigits', cShowCaption: '小数位数', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
        isEnabled: { cItemName: 'isEnabled', cShowCaption: '启用', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'switch' },
        isInput: { cItemName: 'isInput', cShowCaption: '必输', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'switch' },
        isDeleted: { cItemName: 'isDeleted', cShowCaption: 'isDeleted', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: false, cControlType: 'switch' },
        // isMultiSel: { cItemName: 'isMultiSel', cShowCaption: '复选', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'switch' },
        // dataSource: { cItemName: 'dataSource', cShowCaption: '数据来源', iColWidth: 80, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
        // refArchive: { cItemName: 'refArchive', cShowCaption: '对应档案', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
        // isUserDefAttachFile: { cItemName: 'isUserDefAttachFile', cShowCaption: '附件', iColWidth: 50, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'switch' },
        // isUserDefPic: { cItemName: 'isUserDefPic', cShowCaption: '图片', iColWidth: 50, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'switch' },
      },
      independent: true,
      readOnly: true,
      showCheckBox: false,
      showAggregates: false,
      pagination: true,
      showColumnSetting: false,
      showRowNo: true
    });
    var fields = {
      grid: this.gridModel,
      btnEdit: new cb.models.SimpleModel()
    }
    this.viewModel = new cb.models.ContainerModel();
    this.viewModel.setData(fields);
    this.gridModel.on('pageInfoChange', (params) => {
      console.log("pageInfoChange params=" + JSON.stringify(params));
      const { userDefList_CurrentClassId } = this.props.userDefineArchives
      this.gridModel.unselectAll();
      if (this.pageSize != params.pageSize)
        this.pageSize = params.pageSize;
      this.props.fetchUserDefineListPageByClass(userDefList_CurrentClassId, params.pageSize, params.pageIndex);
      console.log("pageInfoChange params=" + JSON.stringify(params));
      // this.gridModel.setPageInfo(params);
      // this.gridModel.on('dblClick', (params) => {
      //   //  const defineId=encodeURI(params.defineId);
      //   //  this.context.router.push(`/userDefines/${defineId}`)
      //   this.props.showSetting(params.defineId);
      // });
      //  const defineId=encodeURI(params.defineId);
      //  this.context.router.push(`/userDefines/${defineId}`)
      // this.props.showSetting(params.defineId);
      // this.gridModel.setDataSource([]);
    });
    this.viewModel.get("btnEdit").on('click', (params) => {
      const rowData = this.gridModel.getRow(params.index);
      this.props.showSetting(rowData.defineId);
      this.gridModel.select(params.index);
    });
  }
  componentDidMount() {
    this.props.fetchUserDefineList("", this.pageSize, 1);

  }
  componentWillReceiveProps(nextProps) {
    const { userDefList_DisplayData, userDefList_GetUserDefStatus, userDefList_CurrentClassId } = this.props.userDefineArchives;

    let list = nextProps.userDefineArchives.userDefList_DisplayData;
    if (list && this.gridModel) {
      console.log(" componentWillReceiveProps  userDefList_CurrentClassId = " + userDefList_CurrentClassId);
      this.gridModel.setDataSource(cb.utils.changeUserDefineTypeEnumValue(list, true));

      const rows = this.gridModel.getRows();
      const actions = this.actionControls;
      const actionsStates = [];
      // const visible = nextProps.userDefineArchives.userDefList_CurrentClassId == "productSpec" ? false : true;
      const visible = true;
      rows.forEach(data => {
        const actionState = {};
        actions.forEach(action => {
          actionState[action.cItemName] = { visible: visible };
        });
        actionsStates.push(actionState);
      });
      this.gridModel.setActionsState(actionsStates);

      let pageSize = this.pageSize;
      let recordCount = nextProps.userDefineArchives.userDefList_DisplayRecordCount;
      let pageCount = nextProps.userDefineArchives.userDefList_DisplayPageCount;
      let pageIndex = nextProps.userDefineArchives.userDefList_DisplayPageIndex;
      this.gridModel.setPageInfo({ pageSize: pageSize, pageIndex: pageIndex, pageCount: pageCount, recordCount: recordCount });
      this.gridModel.setDirty(false);
      console.log("componentWillReceiveProps userDefList_DisplayData.length = " + list.length + " pageinfo=" + JSON.stringify({ pageSize: pageSize, pageIndex: 1, pageCount: pageCount, recordCount: recordCount }));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userDefineArchives: state.userDefineArchives.toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  const methods = { fetchUserDefineList, fetchUserDefineListPageByClass, showSetting }
  return { dispatch, ...bindActionCreators(methods, dispatch), }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDefineArchives)

