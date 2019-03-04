'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadBillDesign = loadBillDesign;
exports.modifyModalVisible = modifyModalVisible;
exports.getBillByBillNo = getBillByBillNo;
exports.RemodelingModalData = RemodelingModalData;
exports.updateBillTemplate = updateBillTemplate;
exports.setActiveKey = setActiveKey;
exports.setGroups = setGroups;
exports.setReadOnly = setReadOnly;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _util = require('../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var treeData = [];

var $$initialState = _immutable2.default.fromJS({
  voucher: {
    billDesignList: [],
    showModal: false,
    modalData: [],
    groups: [],
    readOnly: false,
    activeBillType: null
  },
  report: {
    billDesignList: [],
    showModal: false,
    modalData: [],
    groups: [],
    readOnly: false,
    activeBillType: null
  }
});

exports.default = function () {
  var $$state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA':
      return $$state.merge(action.payload);
    default:
      return $$state;
  }
};

/*获取表单列表*/


function loadBillDesign(cbilltype) {
  return function (dispatch, getState) {
    var _getState$billDesign$ = getState().billDesign.toJS(),
        voucher = _getState$billDesign$.voucher,
        report = _getState$billDesign$.report;

    var config = {
      url: 'billdesign/getBillList',
      method: 'POST',
      params: { cbilltype: cbilltype }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert('获取表单模板列表失败！' + json.message, 'error');
        return;
      }
      if (!cbilltype || cbilltype == 'voucher') {
        voucher.billDesignList = json.data;
      } else {
        report.billDesignList = json.data;
      }
      dispatch((0, _util.genAction)('PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA', { voucher: voucher, report: report }));
    });
  };
}
/*改变弹出框状态*/
function modifyModalVisible(visible, cbilltype) {
  return function (dispatch, getState) {
    var _getState$billDesign$2 = getState().billDesign.toJS(),
        voucher = _getState$billDesign$2.voucher,
        report = _getState$billDesign$2.report;

    if (!cbilltype || cbilltype == 'voucher') {
      voucher.showModal = visible;
      voucher.groups = [];
    } else {
      report.showModal = visible;
      report.groups = [];
    }
    dispatch((0, _util.genAction)('PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA', { voucher: voucher, report: report }));
  };
}
/*根据BillNo获取模板*/
function getBillByBillNo(billNo, gridModel, readOnly, type, onlyData, cBillType) {
  return function (dispatch, getState) {
    var _getState$billDesign$3 = getState().billDesign.toJS(),
        voucher = _getState$billDesign$3.voucher,
        report = _getState$billDesign$3.report;

    var config = {
      url: 'billdesign/getBillTemplate',
      method: 'GET',
      params: { billno: billNo }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'error');
        return;
      }
      var modalData = json.data;
      var newData = [],
          cellState = [];
      modalData.map(function (ele) {
        ele.controls = RemodelingModalData(ele.controls);
        newData.push(ele);
      });
      var dataSource = newData[0] ? newData[0].controls : [];
      var cControlType = newData[0] ? newData[0].cControlType : null;
      if (!type || type == 'voucher') {
        voucher.modalData = newData;
        voucher.groups = newData;
        if (!cBillType) cBillType = voucher.cBillType;else voucher.cBillType = cBillType;
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
        if (cBillType != 'Archive' && cBillType != 'Voucher' || cControlType && cControlType.trim().toLocaleLowerCase() != 'table') {
          var columns = gridModel.getColumns();
          columns.enterDirection.iColWidth = 0;
          columns.bNeedSum.iColWidth = 0;
          // columns.cDefaultValue.iColWidth = 0;
          gridModel.setColumns(columns);
        } else {
          var _columns = gridModel.getColumns();
          _columns.enterDirection.iColWidth = 100;
          // columns.cDefaultValue.iColWidth = 100;
          _columns.bNeedSum.iColWidth = 100;
          dataSource && dataSource.map(function (item, index) {
            var controlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
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
          gridModel.setColumns(_columns);
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
      dispatch((0, _util.genAction)('PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA', { voucher: voucher, report: report }));
    });
  };
}
function RemodelingModalData(controls, isUpdate) {
  var newData = [];
  controls.map(function (control) {
    var newControl = cb.utils.extend(true, {}, control);

    if (isUpdate) {
      if (newControl._status && newControl._status != 'Unchanged') {
        newControl.bIsNull = !newControl.bIsNull;
        newData.push(newControl);
      }
    } else {
      /*处理默认值列需要数据*/
      if (!newControl.cellConfig) newControl.cellConfig = control;
      newControl.bIsNull = !newControl.bIsNull;
      newData.push(newControl);
    }
  });
  return newData;
}
/*更新模板*/
function updateBillTemplate(groups, status, params) {
  return function (dispatch, getState) {
    var _getState$billDesign$4 = getState().billDesign.toJS(),
        voucher = _getState$billDesign$4.voucher,
        report = _getState$billDesign$4.report;

    var activeKey = void 0;
    if (params.type == 'report') {
      activeKey = report.activeKey;
    } else {
      activeKey = voucher.activeKey;
    }

    var newGroup = [];
    /*处理冗余数据 _id _selected*/
    var data = cb.utils.extend(true, [], groups);
    data.forEach(function (group) {
      if (group.controls) {
        group.controls.forEach(function (control) {
          delete control._id;
          delete control._selected;
          delete control.cellConfig;
          if (control.iSystem == 1) delete control.cFieldName;
        });
      }
    });
    data.map(function (ele) {
      if (ele.groupId == activeKey) {
        ele.controls = status == "insert" ? ele.controls : RemodelingModalData(ele.controls, true);
        newGroup.push(ele);
      }
    });
    var config = {
      url: 'billdesign/updateBillTemplate',
      method: 'POST',
      params: {
        "groups": newGroup, "billno": params.cBillNo,
        "cBillType": params.type == 'report' ? "Report" : "Voucher"
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert('保存失败！' + json.message, 'error');
        return;
      }
      cb.utils.alert('保存成功', 'success');
      // if (status == 'insert')
      dispatch(getBillByBillNo(params.cBillNo, params.gridModel, params.readOnly, params.type, true));
    });
  };
}
/*activeKey改变*/
function setActiveKey(key, gridModel, cbilltype) {
  return function (dispatch, getState) {
    var _getState$billDesign$5 = getState().billDesign.toJS(),
        voucher = _getState$billDesign$5.voucher,
        report = _getState$billDesign$5.report;

    var groups = [],
        cellState = [];
    if (!cbilltype || cbilltype == 'voucher') {
      groups = voucher.groups;
      voucher.activeKey = key;
      var modalData = voucher.modalData;
      var cControlType = '',
          dataSource = void 0;
      modalData.map(function (item) {
        if (item.groupId == key) {
          cControlType = item.cControlType;
          dataSource = item.controls;
        }
      });
      var columns = gridModel.getColumns();
      if ((voucher.cBillType == 'Archive' || voucher.cBillType == 'Voucher') && cControlType && cControlType.trim().toLocaleLowerCase() == 'table') {
        columns.enterDirection.iColWidth = 100;
        // columns.cDefaultValue.iColWidth = 100;
        columns.bNeedSum.iColWidth = 100;
        dataSource && dataSource.map(function (item, index) {
          var controlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
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
    groups.forEach(function (element) {
      if (key == element.groupId) {
        gridModel.clear();
        gridModel.setDataSource(element.controls);
      }
    });
    if (cellState.length > 0) gridModel.setCellStates(cellState);
    dispatch((0, _util.genAction)('PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA', { voucher: voucher, report: report }));
  };
}
/**/
function setGroups(group, cbilltype, control) {
  return function (dispatch, getState) {
    var _getState$billDesign$6 = getState().billDesign.toJS(),
        voucher = _getState$billDesign$6.voucher,
        report = _getState$billDesign$6.report;

    if (!cbilltype || cbilltype == 'voucher') {
      voucher.groups.forEach(function (element) {
        if (voucher.activeKey == element.groupId) {
          if (control) {
            element.controls.forEach(function (e, i) {
              if (e.id == control.id) element.controls[i] = control;
            });
          } else {
            element.controls = group;
          }
        }
      });
    } else {
      report.groups.forEach(function (element) {
        if (report.activeKey == element.groupId) {
          if (control) {
            element.controls.forEach(function (e, i) {
              if (e.id == control.id) element.controls[i] = control;
            });
          } else {
            element.controls = group;
          }
        }
      });
    }
    dispatch((0, _util.genAction)('PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA', { voucher: voucher, report: report }));
  };
}
// export function setModalData(modalData) {
//     return function (dispatch, getState) {
//         dispatch(genAction('PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA', { modalData }));
//     }
// }
function setReadOnly(val, cbilltype) {
  return function (dispatch, getState) {
    var _getState$billDesign$7 = getState().billDesign.toJS(),
        voucher = _getState$billDesign$7.voucher,
        report = _getState$billDesign$7.report;

    if (!cbilltype || cbilltype == 'voucher') {
      voucher.readOnly = val;
    } else {
      report.readOnly = val;
    }
    dispatch((0, _util.genAction)('PLATFORM_UI_BILLDESIGN_SET_COMMON_DATA', { voucher: voucher, report: report }));
  };
}