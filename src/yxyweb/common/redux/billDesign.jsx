import Immutable from 'immutable';
import { genAction, proxy } from '../helpers/util';

let treeData = [];

const $$initialState = Immutable.fromJS({
  voucher: {
    billDesignList: [],
    showModal: false,
    modalData: [],
    groups: [],
    readOnly: false,
    activeBillType: null,
  },
  report: {
    billDesignList: [],
    showModal: false,
    modalData: [],
    groups: [],
    readOnly: false,
    activeBillType: null,
  }
})

export default ($$state = $$initialState, action) => {
  switch (action.type) {
    case 'PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA':
      return $$state.merge(action.payload);
    default:
      return $$state;
  }
}

/*获取表单列表*/
export function loadBillDesign(cbilltype) {
  return function (dispatch, getState) {
    let { voucher, report } = getState().billDesign.toJS();
    const config = {
      url: 'billdesign/getBillList',
      method: 'POST',
      params: { cbilltype: cbilltype }
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) {
          cb.utils.alert('获取表单模板列表失败！' + json.message, 'error');
          return;
        }
        if (!cbilltype || cbilltype == 'voucher') {
          voucher.billDesignList = json.data;
        } else {
          report.billDesignList = json.data;
        }
        dispatch(genAction('PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA', { voucher, report }));
      });
  }
}
/*改变弹出框状态*/
export function modifyModalVisible(visible, cbilltype) {
  return function (dispatch, getState) {
    let { voucher, report } = getState().billDesign.toJS();
    if (!cbilltype || cbilltype == 'voucher') {
      voucher.showModal = visible;
      voucher.groups = [];
    } else {
      report.showModal = visible;
      report.groups = [];
    }
    dispatch(genAction('PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA', { voucher, report }));
  }
}
/*根据BillNo获取模板*/
export function getBillByBillNo(billNo, gridModel, readOnly, type, onlyData, cBillType) {
  return function (dispatch, getState) {
    let { voucher, report } = getState().billDesign.toJS();
    const config = {
      url: 'billdesign/getBillTemplate',
      method: 'GET',
      params: { billno: billNo }
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) {
          cb.utils.alert(json.message, 'error');
          return;
        }
        let modalData = json.data;
        let newData = [], cellState = [];
        modalData.map(ele => {
          ele.controls = RemodelingModalData(ele.controls);
          newData.push(ele);
        });
        let dataSource = newData[0] ? newData[0].controls : [];
        let cControlType = newData[0] ? newData[0].cControlType : null;
        if (!type || type == 'voucher') {
          voucher.modalData = newData;
          voucher.groups = newData;
          if (!cBillType)
            cBillType = voucher.cBillType;
          else
            voucher.cBillType = cBillType;
          if (!onlyData) {
            voucher.activeKey = newData[0] ? newData[0].groupId : 0;
          } else {
            for (var i = 0; i < newData.length; i++) {
              if (newData[i].groupId == voucher.activeKey) {
                dataSource = newData[i] ? newData[i].controls : [];
                cControlType = newData[i].cControlType;
                break;
              }
            }
          }
          if ((cBillType != 'Archive' && cBillType != 'Voucher') ||
            (cControlType && cControlType.trim().toLocaleLowerCase() != 'table')) {
            let columns = gridModel.getColumns();
            columns.enterDirection.iColWidth = 0;
            columns.bNeedSum.iColWidth = 0;
            // columns.cDefaultValue.iColWidth = 0;
            gridModel.setColumns(columns);
          } else {
            let columns = gridModel.getColumns();
            columns.enterDirection.iColWidth = 100;
            // columns.cDefaultValue.iColWidth = 100;
            columns.bNeedSum.iColWidth = 100;
            dataSource && dataSource.map((item, index) => {
              let controlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
              if (controlType != 'inputnumber' && controlType != 'money' && controlType != 'price') {
                cellState.push({
                  "rowIndex": index, "cellName": "bNeedSum", "propertyName": "disabled", "value": true
                });
              } else {
                cellState.push({
                  "rowIndex": index, "cellName": "bNeedSum", "propertyName": "disabled", "value": false
                });
              }
            });
            gridModel.setColumns(columns);
          }
        } else {
          report.modalData = newData;
          report.groups = newData;
          if (!onlyData) {
            report.activeKey = newData[0] ? newData[0].groupId : 0;
          } else {
            for (var i = 0; i < newData.length; i++) {
              if (newData[i].groupId == report.activeKey) {
                dataSource = newData[i] ? newData[i].controls : [];
                break;
              }
            }
          }
        }
        gridModel.setDataSource(dataSource);
        if (cellState.length > 0) gridModel.setCellStates(cellState);
        dispatch(genAction('PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA', { voucher, report }));
      });
  }
}
export function RemodelingModalData(controls, isUpdate) {
  let newData = [];
  controls.map(control => {
    let newControl = cb.utils.extend(true, {}, control);

    if (isUpdate) {
      if (newControl._status && newControl._status != 'Unchanged') {
        newControl.bIsNull = !newControl.bIsNull;
        newData.push(newControl);
      }
    } else {
      /*处理默认值列需要数据*/
      if (!newControl.cellConfig) newControl.cellConfig = control
      newControl.bIsNull = !newControl.bIsNull;
      newData.push(newControl);
    }
  });
  return newData;
}
/*更新模板*/
export function updateBillTemplate(groups, status, params) {
  return function (dispatch, getState) {
    let { voucher, report } = getState().billDesign.toJS();
    let activeKey;
    if (params.type == 'report') {
      activeKey = report.activeKey;
    } else {
      activeKey = voucher.activeKey;
    }

    let newGroup = [];
    /*处理冗余数据 _id _selected*/
    let data = cb.utils.extend(true, [], groups);
    data.forEach(group => {
      if (group.controls) {
        group.controls.forEach(control => {
          delete control._id
          delete control._selected
          delete control.cellConfig
          if (control.iSystem == 1)
            delete control.cFieldName
        });
      }
    })
    data.map(ele => {
      if (ele.groupId == activeKey) {
        ele.controls = status == "insert" ? ele.controls : RemodelingModalData(ele.controls, true);
        newGroup.push(ele);
      }
    });
    const config = {
      url: 'billdesign/updateBillTemplate',
      method: 'POST',
      params: {
        "groups": newGroup, "billno": params.cBillNo,
        "cBillType": params.type == 'report' ? "Report" : "Voucher"
      }
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) {
          cb.utils.alert('保存失败！' + json.message, 'error');
          return;
        }
        cb.utils.alert('保存成功', 'success');
        // if (status == 'insert')
        dispatch(getBillByBillNo(params.cBillNo, params.gridModel, params.readOnly, params.type, true));

      });
  }
}
/*activeKey改变*/
export function setActiveKey(key, gridModel, cbilltype) {
  return function (dispatch, getState) {
    let { voucher, report } = getState().billDesign.toJS();
    let groups = [], cellState = [];
    if (!cbilltype || cbilltype == 'voucher') {
      groups = voucher.groups;
      voucher.activeKey = key;
      let modalData = voucher.modalData;
      let cControlType = '', dataSource;
      modalData.map(item => {
        if (item.groupId == key) {
          cControlType = item.cControlType;
          dataSource = item.controls;
        }
      });
      let columns = gridModel.getColumns();
      if ((voucher.cBillType == 'Archive' || voucher.cBillType == 'Voucher') &&
        cControlType && cControlType.trim().toLocaleLowerCase() == 'table') {
        columns.enterDirection.iColWidth = 100;
        // columns.cDefaultValue.iColWidth = 100;
        columns.bNeedSum.iColWidth = 100;
        dataSource && dataSource.map((item, index) => {
          let controlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
          if (controlType != 'inputnumber' && controlType != 'money' && controlType != 'price') {
            cellState.push({
              "rowIndex": index, "cellName": "bNeedSum", "propertyName": "disabled", "value": true
            });
          } else {
            cellState.push({
              "rowIndex": index, "cellName": "bNeedSum", "propertyName": "disabled", "value": false
            });
          }
        });
      } else {
        columns.enterDirection.iColWidth = 0;
        // columns.cDefaultValue.iColWidth = 0;
        columns.bNeedSum.iColWidth = 0;
      }
      gridModel.setColumns(columns);
    } else {
      groups = report.groups;
      report.activeKey = key;
    }
    groups.forEach(element => {
      if (key == element.groupId) {
        gridModel.clear();
        gridModel.setDataSource(element.controls);
      }
    });
    if (cellState.length > 0) gridModel.setCellStates(cellState);
    dispatch(genAction('PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA', { voucher, report }));
  }
}
/**/
export function setGroups(group, cbilltype, control) {
  return function (dispatch, getState) {
    let { voucher, report } = getState().billDesign.toJS();
    if (!cbilltype || cbilltype == 'voucher') {
      voucher.groups.forEach(element => {
        if (voucher.activeKey == element.groupId) {
          if (control) {
            element.controls.forEach((e, i) => {
              if (e.id == control.id)
                element.controls[i] = control;
            });
          } else {
            element.controls = group;
          }
        }

      });
    } else {
      report.groups.forEach(element => {
        if (report.activeKey == element.groupId) {
          if (control) {
            element.controls.forEach((e, i) => {
              if (e.id == control.id)
                element.controls[i] = control;
            });
          } else {
            element.controls = group;
          }
        }
      });
    }
    dispatch(genAction('PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA', { voucher, report }));
  }
}
// export function setModalData(modalData) {
//     return function (dispatch, getState) {
//         dispatch(genAction('PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA', { modalData }));
//     }
// }
export function setReadOnly(val, cbilltype) {
  return function (dispatch, getState) {
    let { voucher, report } = getState().billDesign.toJS();
    if (!cbilltype || cbilltype == 'voucher') {
      voucher.readOnly = val;
    } else {
      report.readOnly = val;
    }
    dispatch(genAction('PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA', { voucher, report }));
  }
}
