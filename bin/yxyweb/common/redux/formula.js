'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCommonData = setCommonData;
exports.select = select;
exports.selectOperator = selectOperator;
exports.changeCaption = changeCaption;
exports.change = change;
exports.focus = focus;
exports.check = check;
exports.initOperator = initOperator;
exports.initData = initData;
exports.close = close;
exports.getEntityInfo = getEntityInfo;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _util = require('../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var expression = '',
    expressionCode = '',
    billNo = null,
    entityName = null,
    treeData = null,
    key2Data = null,
    selectedKey2Title = null,
    title2ResultKey = null,
    selectionStart = 0;

var $$initialState = _immutable2.default.fromJS({
  visible: false,
  caption: '',
  expression: expression,
  expressionCode: expressionCode,
  errorInfo: '',
  checkPass: false,
  cControlType: 'Input',
  cFormatData: null,
  iNumPoint: 0
});

exports.default = function () {
  var $$state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PLATFORM_UI_FORMULA_INIT_DATA':
      return $$state.merge(action.payload);
    case 'PLATFORM_UI_FORMULA_UPDATE_EXPRESSION':
      return $$state.set('expression', expression);
    default:
      return $$state;
  }
};

function setCommonData(data) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_FORMULA_INIT_DATA', data));
  };
}

function select(key) {
  return function (dispatch) {
    var leftExp = expression.substr(0, selectionStart);
    var rightExp = expression.substr(selectionStart);
    expression = leftExp + selectedKey2Title[key] + rightExp;
    selectionStart = expression.length;
    dispatch((0, _util.genAction)('PLATFORM_UI_FORMULA_UPDATE_EXPRESSION'));
  };
}

function selectOperator(key) {
  return function (dispatch) {
    var leftExp = expression.substr(0, selectionStart);
    var rightExp = expression.substr(selectionStart);
    expression = leftExp + key + rightExp;
    selectionStart = expression.length;
    dispatch((0, _util.genAction)('PLATFORM_UI_FORMULA_UPDATE_EXPRESSION'));
  };
}

function changeCaption(value) {
  return (0, _util.genAction)('PLATFORM_UI_FORMULA_INIT_DATA', { caption: value });
}

function change(value, start) {
  expression = value;
  selectionStart = start;
  return (0, _util.genAction)('PLATFORM_UI_FORMULA_INIT_DATA', { expression: expression, checkPass: false });
}

function focus(value) {
  return function (dispatch) {
    selectionStart = value;
  };
}

function check() {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var config, json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
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
                url: 'billdesign/checkExpression',
                method: 'POST',
                params: {
                  billno: billNo,
                  iBillEntityId: entityName,
                  expression: expression
                }
              };
              _context.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context.sent;

              if (!(json.code !== 200)) {
                _context.next = 7;
                break;
              }

              dispatch((0, _util.genAction)('PLATFORM_UI_FORMULA_INIT_DATA', { errorInfo: json.message, checkPass: false }));
              return _context.abrupt('return');

            case 7:
              cb.utils.alert('校验成功', 'success');
              dispatch((0, _util.genAction)('PLATFORM_UI_FORMULA_INIT_DATA', { expressionCode: json.data, errorInfo: '', checkPass: true }));

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }();
}

function initOperator() {
  return function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch) {
      var config, json, operatorData;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              config = {
                url: 'enum/getEnumStrFetch',
                method: 'GET',
                params: {
                  enumtype: 'expressionType'
                }
              };
              _context2.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context2.sent;

              if (!(json.code !== 200)) {
                _context2.next = 7;
                break;
              }

              cb.utils.alert(json.message, 'error');
              return _context2.abrupt('return');

            case 7:
              operatorData = JSON.parse(json.data);

              dispatch((0, _util.genAction)('PLATFORM_UI_FORMULA_INIT_DATA', { operatorData: operatorData }));

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
}

function initData(billno, data, entityname) {
  return function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch) {
      var config, json;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(billno !== billNo || entityname !== entityName)) {
                _context3.next = 15;
                break;
              }

              billNo = billno;
              entityName = entityname;
              config = {
                url: 'billdesign/getBillDataSource',
                method: 'GET',
                params: {
                  billno: billNo,
                  iBillEntityId: entityName
                }
              };
              _context3.next = 6;
              return (0, _util.proxy)(config);

            case 6:
              json = _context3.sent;

              if (!(json.code !== 200)) {
                _context3.next = 10;
                break;
              }

              cb.utils.alert(json.message, 'error');
              return _context3.abrupt('return');

            case 10:
              treeData = json.data;
              key2Data = {};
              selectedKey2Title = {};
              title2ResultKey = {};
              rebuildTreeData(treeData);

            case 15:
              if (data) {
                expression = data.expression || '';
                selectionStart = expression && expression.length || 0;
              }
              dispatch((0, _util.genAction)('PLATFORM_UI_FORMULA_INIT_DATA', Object.assign({ billNo: billNo, treeData: treeData, visible: true }, data)));

            case 17:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x4) {
      return _ref3.apply(this, arguments);
    };
  }();
}

function close() {
  return (0, _util.genAction)('PLATFORM_UI_FORMULA_INIT_DATA', {
    visible: false,
    caption: '',
    expression: expression,
    expressionCode: expressionCode,
    errorInfo: '',
    checkPass: false,
    cControlType: 'Input',
    cFormatData: null,
    iNumPoint: 0
  });
}

function getEntityInfo(key) {
  return function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch) {
      var expandData, entityName, config, json;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              expandData = key2Data[key];
              entityName = expandData.entityName;
              config = {
                url: 'billdesign/getEntityInfoByName',
                method: 'GET',
                params: { entityName: entityName }
              };
              _context4.next = 5;
              return (0, _util.proxy)(config);

            case 5:
              json = _context4.sent;

              if (!(json.code !== 200)) {
                _context4.next = 9;
                break;
              }

              cb.utils.alert(json.message, 'error');
              return _context4.abrupt('return');

            case 9:
              expandData.children = json.data;
              key2Data = {};
              selectedKey2Title = {};
              title2ResultKey = {};
              rebuildTreeData(treeData);
              dispatch((0, _util.genAction)('PLATFORM_UI_FORMULA_INIT_DATA', { treeData: treeData }));

            case 15:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x5) {
      return _ref4.apply(this, arguments);
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