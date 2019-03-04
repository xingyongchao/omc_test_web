'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListData = getListData;
exports.deleteRow = deleteRow;
exports.select = select;
exports.selectOperator = selectOperator;
exports.changeName = changeName;
exports.changeStopstatus = changeStopstatus;
exports.changeContext = changeContext;
exports.changeFrequency = changeFrequency;
exports.changeTimepoint = changeTimepoint;
exports.changeInterval = changeInterval;
exports.changeWeekOrMonth = changeWeekOrMonth;
exports.changeReceivers = changeReceivers;
exports.changeCycle = changeCycle;
exports.changeSolution = changeSolution;
exports.modifyCellValue = modifyCellValue;
exports.editRow = editRow;
exports.onOk = onOk;
exports.change = change;
exports.focus = focus;
exports.check = check;
exports.initOperator = initOperator;
exports.getReceivers = getReceivers;
exports.getSolutionList = getSolutionList;
exports.getSolutionEdit = getSolutionEdit;
exports.initData = initData;
exports.close = close;
exports.getEntityInfo = getEntityInfo;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _util = require('../helpers/util');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var name = '',
    conditionDesc = '',
    day = [],
    user = [],
    receivers = [],
    userId = [],
    menucode = '',
    report = null,
    startTime = null,
    endTime = null,
    interval = 0,
    timepoint = ['0'],
    stopstatus = 1,
    frequency = 1,
    context = '',
    subscriptionCondition = '',
    billNo = null,
    gridModel = null,
    menuCode = null,
    searchCondition = null,
    groupSchemaId = null,
    entityName = null,
    treeData = null,
    key2Data = null,
    selectedKey2Title = null,
    title2ResultKey = null,
    listData = [],
    selectionStart = 0,
    subscribeId = [],
    dataSource = [],
    data = [],
    checkState = false,
    editId = null;

var $$initialState = _immutable2.default.fromJS({
  visible: false,
  name: name,
  conditionDesc: conditionDesc,
  stopstatus: stopstatus,
  frequency: frequency,
  subscriptionCondition: subscriptionCondition,
  errorInfo: '',
  checkPass: true,
  context: context,
  day: day,
  timepoint: timepoint,
  interval: interval,
  receivers: receivers,
  userId: userId,
  user: user,
  startTime: startTime,
  endTime: endTime,
  listData: listData,
  subscribeId: subscribeId,
  dataSource: dataSource,
  gridModel: gridModel,
  data: data,
  caption: '新增订阅方案',
  checkState: checkState,
  editId: editId,
  solutionList: [],
  solutionId: ''
});

exports.default = function () {
  var $$state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PLATFORM_UI_ADD_INIT_DATA':
      return $$state.merge(action.payload);
    case 'PLATFORM_UI_ADD_UPDATE_EXPRESSION':
      return $$state.set('conditionDesc', conditionDesc);
    default:
      return $$state;
  }
};

// export function getListData(){
//     return async function (dispatch) {
//       const config = {
//         url: '/report/getReportSubscriptionList',
//         method: 'GET',
//       };
//       proxy(config).then(json => {
//         if (json.code !== 200) {
//           cb.uitls.alert(json.message, 'error');
//           return
//         }
//         let dataSource = json.data;
//         let listData=[];
//            dataSource.forEach(
//            (item,index,arr)=> {
//             listData.push(item)
//           }
//         )
//         dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', {listData}))
//       })
//   }
//   }


function getListData(gridmodel) {
  // gridModel = gridmodel;
  return function (dispatch) {
    var config = {
      url: '/report/getReportSubscriptionList',
      method: 'GET'
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert('请求数据失败！' + json.message, 'error');
        return;
      }
      var modalData = json.data;
      var dataSource = [];
      var subscribeId = [];
      var data = [];
      modalData.map(function (ele) {
        var interval = void 0;
        interval = ele.startTime ? (0, _moment2.default)(ele.startTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') + '至' + (0, _moment2.default)(ele.endTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') : '';

        dataSource.push({ name: ele.name, cycle: interval, isStart: !ele.stopstatus });
        subscribeId.push(ele.id);
        data.push(ele);
      });
      gridmodel.setDataSource(dataSource);
      dispatch((0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { gridModel: gridmodel, data: data, dataSource: dataSource, subscribeId: subscribeId }));
    });
  };
}

function deleteRow(id, gridModel) {
  return function (dispatch) {
    var config = {
      url: '/report/deleteReportSubscription',
      method: 'GET',
      params: {
        id: id
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert('操作失败!' + json.message, 'error');
        return;
      }
      cb.utils.alert("操作成功！");
      dispatch(getListData(gridModel));
    });
  };
}

function select(key) {
  return function (dispatch) {
    var leftExp = conditionDesc.substr(0, selectionStart);
    var rightExp = conditionDesc.substr(selectionStart);
    conditionDesc = leftExp + selectedKey2Title[key] + rightExp;
    selectionStart = conditionDesc.length;
    dispatch((0, _util.genAction)('PLATFORM_UI_ADD_UPDATE_EXPRESSION'));
    dispatch((0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { checkState: true }));
  };
}

function selectOperator(key) {
  return function (dispatch) {
    var leftExp = conditionDesc.substr(0, selectionStart);
    var rightExp = conditionDesc.substr(selectionStart);
    conditionDesc = leftExp + key + rightExp;
    selectionStart = conditionDesc.length;
    dispatch((0, _util.genAction)('PLATFORM_UI_ADD_UPDATE_EXPRESSION'));
    dispatch((0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { checkState: true }));
  };
}

function changeName(value) {
  return (0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { name: value });
}

function changeStopstatus(value) {
  return (0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { stopstatus: value });
}

function changeContext(value) {
  return (0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { context: value });
}

function changeFrequency(value) {
  return (0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { frequency: value, interval: 0, day: [] });
}

function changeTimepoint(value) {
  return (0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { timepoint: value });
}

function changeInterval(value) {
  return (0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { interval: value });
}

function changeWeekOrMonth(value) {
  return (0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { day: value });
}

function changeReceivers(value) {
  return (0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { userId: value });
}

function changeCycle(value) {
  return (0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { startTime: value[0], endTime: value[1] });
}

function changeSolution(value) {
  return (0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { solutionId: value });
}

function modifyCellValue(value, index) {
  if (value) {
    return function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
        var _getState$addMessage$, data, gridModel, config, json;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _getState$addMessage$ = getState().addMessage.toJS(), data = _getState$addMessage$.data, gridModel = _getState$addMessage$.gridModel;
                config = {
                  url: 'report/updateStatus',
                  method: 'POST',
                  params: [{
                    id: data[index].id,
                    stopstatus: 1
                  }]
                };
                _context.next = 4;
                return (0, _util.proxy)(config);

              case 4:
                json = _context.sent;

                if (!(json.code !== 200)) {
                  _context.next = 8;
                  break;
                }

                cb.utils.alert(json.message, 'error');
                return _context.abrupt('return');

              case 8:
                cb.utils.alert("修改成功！", 'success');
                dispatch(getListData(gridModel));

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }();
  }
  return function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
      var _getState$addMessage$2, data, gridModel, config, json;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _getState$addMessage$2 = getState().addMessage.toJS(), data = _getState$addMessage$2.data, gridModel = _getState$addMessage$2.gridModel;
              config = {
                url: 'report/updateStatus',
                method: 'POST',
                params: [{
                  id: data[index].id,
                  stopstatus: 0
                }]
              };
              _context2.next = 4;
              return (0, _util.proxy)(config);

            case 4:
              json = _context2.sent;

              if (!(json.code !== 200)) {
                _context2.next = 8;
                break;
              }

              cb.utils.alert(json.message, 'error');
              return _context2.abrupt('return');

            case 8:
              cb.utils.alert("修改成功！", 'success');
              dispatch(getListData(gridModel));

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();
}
//   return async function (dispatch, getState) {
//     const { data,gridModel } = getState().addMessage.toJS();
//     const config = {
//       url: 'report/subscribe',
//       method: 'POST',
//       params: [{
//         name:data[index].name,
//         subscriptionCondition:data[index].subscribeCondition,
//         conditionDesc:data[index].conditionDesc,
//         context:data[index].context,
//         billnum: data[index].billnum&&data[index].billnum,
//         stopstatus:0,
//         frequency:data[index].frequency,
//         day: data[index].day,
//         timepoint: data[index].timepoint,
//         interval:data[index].interval,
//         menucode: data[index].menucode,
//         report:data[index].report && data[index].report,
//         // report: {
//         //   billnum: billNo,
//         //   condition: searchCondition && JSON.stringify(searchCondition.condition),
//         //   groupSchemaId: groupSchemaId
//         // },
//         receivers:data[index].receivers&&data[index].receivers,
//         startTime: data[index].startTime && data[index].startTime,
//         endTime: data[index].endTime && data[index].endTime,
//         id:data[index].id,

//       }]
//     };
//     const json = await proxy(config);
//     if (json.code !== 200) {
//       cb.utils.alert(json.message, 'error');
//       return;
//     }
//     cb.utils.alert("修改成功！", 'success');
//     dispatch(getListData(gridModel));
//   }
// }

function editRow(index) {
  return function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
      var _getState$addMessage$3, data, gridModel, config, json, editData, stopstatus, startTime, endTime, day, timepoint, checkState, userid, solutionId;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _getState$addMessage$3 = getState().addMessage.toJS(), data = _getState$addMessage$3.data, gridModel = _getState$addMessage$3.gridModel;
              config = {
                url: 'report/getReportSubscription',
                method: 'GET',
                params: {
                  id: data[index].id
                }
              };
              _context3.next = 4;
              return (0, _util.proxy)(config);

            case 4:
              json = _context3.sent;

              if (!(json.code !== 200)) {
                _context3.next = 8;
                break;
              }

              cb.utils.alert(json.message, 'error');
              return _context3.abrupt('return');

            case 8:
              dispatch(getReceivers());
              editData = json.data;
              stopstatus = editData.stopstatus ? 1 : 0;
              startTime = editData.startTime && (0, _moment2.default)(editData.startTime, 'YYYY-MM-DD HH:mm:ss');
              endTime = editData.endTime && (0, _moment2.default)(editData.endTime, 'YYYY-MM-DD HH:mm:ss');
              day = editData.day.split(",");
              timepoint = editData.timepoint.split(",");
              checkState = editData.conditionDesc ? true : false;
              userid = [];
              solutionId = editData.solutionId;

              editData.receivers.forEach(function (ele) {
                userid.push(ele.user);
              });
              dispatch((0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { editId: data[index].id, checkState: checkState, caption: '编辑订阅方案', userId: userid, subcriptionCondition: editData.subcriptionCondition, visible: true, name: editData.name, stopstatus: stopstatus, conditionDesc: editData.conditionDesc, context: editData.context, day: day, frequency: editData.frequency, interval: editData.interval, timepoint: timepoint, startTime: startTime, endTime: endTime, solutionId: solutionId }));
              //     cb.utils.alert("修改成功！", 'success');
              // dispatch(getListData(gridModel));
              //   }

            case 20:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }();
}

function onOk() {
  conditionDesc = '';
  return function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
      var _getState$addMessage$4, editId, name, receivers, gridModel, solutionId, subscriptionCondition, user, conditionDesc, context, stopstatus, day, timepoint, frequency, interval, startTime, endTime, _getState$addMessage$5, userId, i, format, config, json;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _getState$addMessage$4 = getState().addMessage.toJS(), editId = _getState$addMessage$4.editId, name = _getState$addMessage$4.name, receivers = _getState$addMessage$4.receivers, gridModel = _getState$addMessage$4.gridModel, solutionId = _getState$addMessage$4.solutionId, subscriptionCondition = _getState$addMessage$4.subscriptionCondition, user = _getState$addMessage$4.user, conditionDesc = _getState$addMessage$4.conditionDesc, context = _getState$addMessage$4.context, stopstatus = _getState$addMessage$4.stopstatus, day = _getState$addMessage$4.day, timepoint = _getState$addMessage$4.timepoint, frequency = _getState$addMessage$4.frequency, interval = _getState$addMessage$4.interval, startTime = _getState$addMessage$4.startTime, endTime = _getState$addMessage$4.endTime;
              _getState$addMessage$5 = getState().addMessage.toJS(), userId = _getState$addMessage$5.userId;

              for (i = 1; i < userId.length + 1; i++) {
                user.push({ 'user': userId[i - 1] });
              }
              format = "YYYY-MM-DD";
              config = {
                url: 'report/subscribe',
                method: 'POST',
                params: [{
                  name: name,
                  subscriptionCondition: subscriptionCondition,
                  conditionDesc: conditionDesc && conditionDesc,
                  context: context,
                  billnum: billNo,
                  stopstatus: stopstatus,
                  frequency: frequency,
                  day: day.join(),
                  timepoint: timepoint.join(),
                  interval: interval,
                  menucode: menuCode,
                  report: {
                    billnum: billNo,
                    condition: searchCondition && JSON.stringify(searchCondition.condition),
                    groupSchemaId: groupSchemaId
                  },
                  receivers: user,
                  startTime: startTime && (0, _moment2.default)(startTime).format(format) + ' ' + '00:00:00',
                  endTime: endTime && (0, _moment2.default)(endTime).format(format) + ' ' + '23:59:59',
                  id: editId && editId,
                  solutionId: solutionId ? solutionId : null
                }]
              };
              _context4.next = 7;
              return (0, _util.proxy)(config);

            case 7:
              json = _context4.sent;

              if (!(json.code !== 200)) {
                _context4.next = 11;
                break;
              }

              cb.utils.alert(json.message, 'error');
              return _context4.abrupt('return');

            case 11:
              cb.utils.alert('保存成功', 'success');
              dispatch(getListData(gridModel));
              dispatch((0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', {
                visible: false,
                caption: '新增订阅方案',
                name: '',
                stopstatus: 1,
                conditionDesc: '',
                subscriptionCondition: '',
                context: '',
                errorInfo: '',
                checkPass: true,
                frequency: 1,
                timepoint: ['0'],
                interval: 0,
                day: [],
                userId: [],
                startTime: null,
                endTime: null,
                user: [],
                checkState: false,
                editId: null,
                solutionId: ''
              }));

            case 14:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x8, _x9) {
      return _ref4.apply(this, arguments);
    };
  }();
}

function change(value, start) {
  var checkState = value ? true : false;
  conditionDesc = value;
  selectionStart = start;
  return (0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { conditionDesc: conditionDesc, checkPass: !checkState, checkState: checkState });
}

function focus(value) {
  return function (dispatch) {
    selectionStart = value;
  };
}

function check() {
  return function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch, getState) {
      var _getState$addMessage$6, conditionDesc, config, json;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _getState$addMessage$6 = getState().addMessage.toJS(), conditionDesc = _getState$addMessage$6.conditionDesc;
              // let result = null;
              // var exp = /{.*?}/g;
              // var items = expression.match(exp);
              // if (items) {
              //   result = expression.replace(exp, title => {
              //     return title2ResultKey[title] || title;
              //   });
              // } else {
              //   result = expression;
              // }

              config = {
                url: 'report/checkCondition',
                method: 'POST',
                params: {
                  conditionDesc: conditionDesc,
                  billnum: billNo
                }
              };
              _context5.next = 4;
              return (0, _util.proxy)(config);

            case 4:
              json = _context5.sent;

              if (!(json.code !== 200)) {
                _context5.next = 8;
                break;
              }

              dispatch((0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { errorInfo: json.message, checkPass: false }));
              return _context5.abrupt('return');

            case 8:
              cb.utils.alert('校验成功', 'success');
              dispatch((0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { subscriptionCondition: json.data, errorInfo: '', checkPass: true }));

            case 10:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x10, _x11) {
      return _ref5.apply(this, arguments);
    };
  }();
}

function initOperator() {
  return function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(dispatch) {
      var config, json, operatorData;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              config = {
                url: 'enum/getEnumStrFetch',
                method: 'GET',
                params: {
                  enumtype: 'conditionType'
                }
              };
              _context6.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context6.sent;

              if (!(json.code !== 200)) {
                _context6.next = 7;
                break;
              }

              cb.utils.alert(json.message, 'error');
              return _context6.abrupt('return');

            case 7:
              operatorData = JSON.parse(json.data);

              dispatch((0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { operatorData: operatorData }));

            case 9:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x12) {
      return _ref6.apply(this, arguments);
    };
  }();
}

function getReceivers() {
  return function (dispatch, getState) {
    var store = getState().user.toJS().storeId;
    var config = {
      url: 'bill/ref/getRefData',
      method: 'POST',
      params: {
        refCode: "aa_user",
        dataType: "grid",
        page: { pageSize: 200, pageIndex: 1 }
        // "condition": {
        //   "isExtend": true, "simpleVOs": [
        //     { "field": "operatorStore.iStoreId", "op": "eq", "value1": store },
        //     { "field": "iStatus", "op": "eq", "value1": 1 },
        //   ]
        // },
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.uitls.alert(json.message, 'error');
        return;
      }
      var receivers = [];
      var dataSource = json.data.recordList;
      dataSource.forEach(function (item, index, arr) {
        if (item.code) receivers.push({ name: item.name, account: '(' + item.code + ')', value: item.id, lable: item.code.split("@")[0] });
      });
      dispatch((0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { receivers: receivers }));
    });
  };
}

function getSolutionList(filterId) {
  return function (dispatch, getState) {
    var config = {
      url: 'filterDesign/getSolutionList',
      method: 'POST',
      params: {
        filterId: filterId
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.uitls.alert(json.message, 'error');
        return;
      }
      var arr = json.data.filter(function (item) {
        return item.isDefault == 1;
      });
      dispatch((0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { solutionList: json.data, solutionId: arr[0].id }));
    });
  };
}

function getSolutionEdit(filterId) {
  return function (dispatch, getState) {
    var config = {
      url: 'filterDesign/getSolutionList',
      method: 'POST',
      params: {
        filterId: filterId
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.uitls.alert(json.message, 'error');
        return;
      }
      var arr = json.data.filter(function (item) {
        return item.isDefault == 1;
      });
      dispatch((0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { solutionList: json.data }));
    });
  };
}

function initData(billno, menucode, filterId, searchcondition, groupschemaid, data, entityname, gridmodel) {
  return function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(dispatch) {
      var config, json;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(billno !== billNo)) {
                _context7.next = 19;
                break;
              }

              billNo = billno;
              gridModel = gridmodel;
              menuCode = menucode;
              searchCondition = searchcondition;
              groupSchemaId = groupschemaid;
              entityName = entityname;
              config = {
                url: 'report/getEntityInfoByBillNo.do',
                method: 'GET',
                params: {
                  billno: billNo,
                  iBillEntityId: entityName
                }
              };
              _context7.next = 10;
              return (0, _util.proxy)(config);

            case 10:
              json = _context7.sent;

              if (!(json.code !== 200)) {
                _context7.next = 14;
                break;
              }

              cb.utils.alert(json.message, 'error');
              return _context7.abrupt('return');

            case 14:
              treeData = json.data;
              key2Data = {};
              selectedKey2Title = {};
              title2ResultKey = {};
              rebuildTreeData(treeData);

            case 19:
              if (data) {
                conditionDesc = data.conditionDesc || '';
                selectionStart = conditionDesc && conditionDesc.length || 0;
              }
              dispatch((0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', Object.assign({ billNo: billNo, treeData: treeData, visible: true }, data)));

            case 21:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function (_x13) {
      return _ref7.apply(this, arguments);
    };
  }();
}

function close() {
  conditionDesc = '';
  return (0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', {
    caption: '新增订阅方案',
    visible: false,
    name: '',
    stopstatus: 1,
    conditionDesc: '',
    subscriptionCondition: '',
    context: '',
    errorInfo: '',
    checkPass: true,
    frequency: 1,
    timepoint: ['0'],
    interval: 0,
    day: [],
    userId: [],
    startTime: null,
    endTime: null,
    user: [],
    checkState: false,
    editId: null
  });
}

function getEntityInfo(key) {
  return function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(dispatch) {
      var expandData, entityName, config, json;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              expandData = key2Data[key];
              entityName = expandData.entityName;
              config = {
                url: 'report/getEntityInfoByName.do',
                method: 'GET',
                params: { entityName: entityName }
              };
              _context8.next = 5;
              return (0, _util.proxy)(config);

            case 5:
              json = _context8.sent;

              if (!(json.code !== 200)) {
                _context8.next = 9;
                break;
              }

              cb.utils.alert(json.message, 'error');
              return _context8.abrupt('return');

            case 9:
              expandData.children = json.data;
              key2Data = {};
              selectedKey2Title = {};
              title2ResultKey = {};
              rebuildTreeData(treeData);
              dispatch((0, _util.genAction)('PLATFORM_UI_ADD_INIT_DATA', { treeData: treeData }));

            case 15:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function (_x14) {
      return _ref8.apply(this, arguments);
    };
  }();
}

function rebuildTreeData(data, mergeCode, mergeName) {
  data.forEach(function (item) {
    var codes = [],
        names = [];
    if (mergeCode) codes.push(mergeCode);
    codes.push(item.name);
    if (mergeName) names.push(mergeName);
    names.push(item.title);
    item.mergeCode = codes.join('.');
    key2Data[item.mergeCode] = item;
    item.mergeName = names.join('.');
    var mergeTitle = '[' + item.mergeName + ']';
    selectedKey2Title[item.mergeCode] = mergeTitle;
    title2ResultKey[mergeTitle] = item.mergeCode;
    if (!item.children) return;
    rebuildTreeData(item.children, item.mergeCode, item.mergeName);
  });
}