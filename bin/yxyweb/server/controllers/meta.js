'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMeta = undefined;

var _jsBeautify = require('js-beautify');

var _jsBeautify2 = _interopRequireDefault(_jsBeautify);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _env = require('../../../server/env');

var _env2 = _interopRequireDefault(_env);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _tpls = require('../tpls');

var tpls = _interopRequireWildcard(_tpls);

var _common = require('./common');

var common = _interopRequireWildcard(_common);

var _env3 = require('../../common/helpers/env');

var _env4 = _interopRequireDefault(_env3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ControlTypesByChildrenField = _env4.default.ControlTypesByChildrenField,
    ControlType2ModelType = _env4.default.ControlType2ModelType;
var getMeta = exports.getMeta = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var type, url, meta, results, tplHtml;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = ctx.request.body.type;
            url = _getMetaUrl(ctx);

            ctx.logger.info('meta url\uFF1A' + url);
            _context.next = 5;
            return common.doFetch(url);

          case 5:
            meta = _context.sent;
            results = meta;

            if (meta.code == 200) {
              //暂时特殊处理下option的meta
              // if (type == 'option') {
              //   _specialOptionMeta(meta);
              // }
              tplHtml = common.getVmTpl(meta);

              if (tplHtml.tpl) {
                results = _combineTplMeta(tplHtml.tpl, meta, ctx.request.body.extendName);
              } else {
                results = {
                  code: 404,
                  message: tplHtml.msg
                };
              }
            }
            ctx.body = results;

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getMeta(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _prepareMeta = function _prepareMeta(vmmeta) {
  if (!vmmeta) return;
  var fields = new Array();
  var actionFields = {};
  var meta = void 0;
  var billType = vmmeta.cBillType;
  switch (billType) {
    case 'VoucherList':
    case 'ArchiveList':
    case 'TreeList':
    case 'Report':
      meta = _getVoucherListMeta(vmmeta);
      break;
    case 'Voucher':
    case 'Archive':
    case 'EditableVoucherList':
      meta = _getVoucherMeta(vmmeta);
      break;
    case 'TreeArchive':
      meta = _getTreeArchiveMeta(vmmeta);
      break;
    case 'Compare':
      //树卡表，对照
      meta = _getCompareMeta(vmmeta);
      break;
    case 'BillMaker':
      meta = _getBillMakerMeta(vmmeta);
      break;
    case 'Option':
      meta = _getOptionMeta(vmmeta);
      break;
    case 'FreeView':
      meta = _getFreeViewMeta(vmmeta);
      break;
  }
  return meta;
};

/**
 * meta核心
 */
var _combineTplMeta = function _combineTplMeta(tpl, meta, extendName) {
  var metaData = meta.data;
  var querySchema = metaData.querySchema;

  var viewmeta = metaData.viewApplication;
  var vmmeta = metaData.viewmodel;
  var func = _template2.default.compile(tpl);
  var viewmodel = _prepareMeta(vmmeta);
  viewmeta.vmName = _getVmName(viewmeta);
  viewmeta.extendFileName = _getExtendVmFileName(viewmeta, extendName);
  viewmeta.extendVmName = _getExtendVmName(viewmeta, extendName);

  var vmStr = void 0;
  if (viewmodel) {
    viewmodel.vmName = viewmeta.vmName;
    viewmodel.extendFileName = viewmeta.extendFileName;
    viewmodel.extendVmName = viewmeta.extendVmName;
    viewmodel.actions = _getActions(vmmeta, viewmodel.actionFields);
    viewmodel.allActions = vmmeta.actions ? JSON.stringify(vmmeta.actions) : "undefined";
    viewmodel.subId = viewmeta.cSubId;
    viewmodel.bPrintLimited = viewmeta.bPrintLimited;
    viewmodel.bAllowMultiTpl = viewmeta.bAllowMultiTpl;
    viewmodel.helper_filterModelKeys = _helper_filterModelKeys;
    vmStr = func(viewmodel);
  }
  if (process.env.NODE_ENV === 'development' || process.env.BUSINESS_ENV === 'development') {
    vmStr = (0, _jsBeautify2.default)(vmStr);
    _createStaticVmFiles(viewmeta, vmStr);
  } else {
    try {
      // vmStr = require('uglify-js').minify(vmStr, {fromString: true}).code;
    } catch (error) {}
  }
  var result = {
    code: 200,
    data: {
      querySchema: querySchema,
      viewmeta: viewmeta,
      vm: vmStr
    }
  };
  if (meta.data.makeBill) {
    result.data.makeBill = meta.data.makeBill;
  }
  return result;
};
var _getVmName = function _getVmName(obj) {
  if (!obj) return;
  return obj.cSubId + '_' + obj.cBillNo + '_' + "VM";
};

var _recursive = function _recursive(entity) {
  var columns = {},
      showAggregates = false;
  entity.fields.forEach(function (item) {
    columns[item.cItemName] = item;
    if (item.bNeedSum) showAggregates = 'local';
  });
  if (entity.children) {
    entity.children.forEach(function (subEntity) {
      var obj = void 0;
      if (subEntity.cModelType === 'TagModel') {
        var field = subEntity.fields.filter(function (item) {
          return ControlTypesByChildrenField.indexOf(item.cControlType && item.cControlType.trim().toLocaleLowerCase()) > -1;
        });
        obj = field.length && field[0] || {};
        obj.multiple = true;
        obj.bIsNull = subEntity.bIsNull;
      } else {
        var tmpObj = _recursive(subEntity);
        obj = {
          cControlType: 'Table',
          columns: tmpObj.columns,
          showCheckBox: false,
          bIsNull: subEntity.bIsNull,
          showRowNo: true,
          showAggregates: tmpObj.showAggregates,
          pagination: false,
          cShowCaption: subEntity.cEntityName
        };
      }
      columns[subEntity.childrenField] = obj;
    });
  }
  return { columns: columns, showAggregates: showAggregates };
};
var _getFreeViewMeta = function _getFreeViewMeta(vmmeta) {
  var fields = new Array();
  var checkFields = new Array();
  var actionFields = {};
  var subId = vmmeta.cSubId;
  var cCarry = vmmeta.cCarry;
  var tableEntites = vmmeta.entities && vmmeta.entities.filter(function (x) {
    return x.cModelType && x.cModelType.toLowerCase() == 'gridmodel' && x.cCode;
  });
  var treeEntites = vmmeta.entities && vmmeta.entities.filter(function (x) {
    return x.cModelType && x.cModelType.toLowerCase() == 'treemodel';
  });
  var parentCodes = new Array();
  //除了tree 和table 的entity
  vmmeta.entities.forEach(function (val) {
    if (!val.cModelType || val.cModelType && val.cModelType.toLowerCase() != 'treemodel' && val.cModelType && val.cModelType.toLowerCase() != 'gridmodel') {
      if (val && val.fields && (val.cType === 'Toolbar' || val.cType === 'Bill')) {
        val.fields.forEach(function (item) {
          if (val.cType === 'Toolbar') {
            item.needClear = false;
          }
          if (val.cType == 'Bill') {
            parentCodes.push(val.cCode);
          }
          var key = item.cItemName;
          var field = {
            name: key
          };
          var ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
          var model = ControlType2ModelType[ctrlType] || 'SimpleModel';
          field.value = "new cb.models." + model + "(" + JSON.stringify(item) + ")";
          field.modelType = model;
          fields.push(field);
          var cCommand = item.cCommand;
          if (val.cType === 'Toolbar' && cCommand) {
            if (actionFields[cCommand]) {
              actionFields[cCommand].push(item);
            } else {
              actionFields[cCommand] = [item];
            }
          }
          if (item.bCheck) {
            checkFields.push(field);
          }
        });
      }
    }
  });
  var nonMainEntities = [],
      subTables = [],
      mainTables = [];

  if (tableEntites) {
    subTables = tableEntites.filter(function (x) {
      if (x.cParentCode) {
        parentCodes.push(x.parentCode);
      }
      ;return x.cParentCode;
    });
    mainTables = tableEntites.filter(function (x) {
      if (x.cParentCode) {
        parentCodes.push(x.parentCode);
      }
      ;return !x.cParentCode;
    });
  }
  _setSubTablesFields(fields, subTables, parentCodes);
  mainTables && mainTables.forEach(function (val) {
    var modelType = 'GridModel';
    var columns = {};
    val.fields.forEach(function (item) {
      var key = item.cItemName;
      var column = {};
      columns[key] = item;
    });
    var field = {};
    var obj = {
      columns: columns,
      bIsNull: val.bIsNull,
      dataSourceMode: 'remote'
    };
    field.name = val.cCode;
    field.value = "new cb.models." + modelType + "(" + JSON.stringify(obj) + ")";
    field.modelType = modelType;
    fields.push(field);
  });

  treeEntites && treeEntites.forEach(function (val) {
    var modelType = 'TreeModel';
    var columns = {};
    val.fields.forEach(function (item) {
      var key = item.cItemName;
      var column = {};
      columns[key] = item;
    });
    var field = {};
    var obj = {
      treeName: val.cDataSourceName,
      treeEntityName: val.cEntityName,
      columns: columns,
      keyField: 'id',
      titleField: 'name',
      needClear: false,
      dataSourceMode: 'remote'
    };
    field.name = val.cCode;
    field.value = "new cb.models." + modelType + "(" + JSON.stringify(obj) + ")";
    field.modelType = modelType;
    fields.push(field);
  });

  fields.push({
    name: 'params',
    value: JSON.stringify({
      billNo: vmmeta.cBillNo,
      billType: vmmeta.cBillType,
      filterId: vmmeta.cFilterId
    })
  });

  if (vmmeta.states) {
    var states = _getStates(vmmeta);
    fields.push({
      name: 'states',
      value: JSON.stringify(states)
    });
  }
  var _vmmeta = {
    fields: fields,
    checkFields: checkFields,
    actionFields: actionFields,
    cBillType: 'freeview'
  };
  return _vmmeta;
};

var _setSubTablesFields = function _setSubTablesFields(fields, nonMainEntities, parentCodes) {
  var nonMainMap = {};
  var subEntities = [];
  nonMainEntities.forEach(function (entity) {
    nonMainMap[entity.cCode] = entity;
  });
  parentCodes.forEach(function (parentCode) {
    nonMainEntities.forEach(function (entity) {
      if (entity.cParentCode === parentCode) {
        subEntities.push(entity);
      } else {
        var parentEntity = nonMainMap[entity.cParentCode];
        if (!parentEntity) return;
        if (!parentEntity.children) parentEntity.children = [];
        parentEntity.children.push(entity);
      }
    });
  });
  subEntities.forEach(function (entity) {
    var modelType = entity.cModelType || 'GridModel';
    var obj = void 0;
    if (modelType === 'TagModel') {
      var _fields = [];
      var checkField = null,
          sortField = null,
          childrenField = null;
      entity.fields.forEach(function (item) {
        var ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
        var cItemName = item.cItemName;

        if (ControlTypesByChildrenField.indexOf(ctrlType) > -1) obj = item;else if (ctrlType === 'boolean') {
          _fields.push(item);
          checkField = cItemName;
        } else if (ctrlType === 'sort') {
          _fields.push(item);
          sortField = cItemName;
        }
      });
      if (entity.children) childrenField = entity.children[0].childrenField;
      if (!obj) obj = {};
      obj.multiple = true;
      obj.bIsNull = entity.bIsNull;
      if (_fields.length || entity.children) obj.columns = _recursive({ fields: _fields, children: entity.children }).columns;
      if (checkField) obj.checkField = checkField;
      if (sortField) obj.sortField = sortField;
      if (childrenField) obj.childrenField = childrenField;
    } else {
      var tmpObj = _recursive(entity);
      obj = {
        columns: tmpObj.columns,
        showCheckBox: false,
        bIsNull: entity.bIsNull,
        showRowNo: true,
        showAggregates: tmpObj.showAggregates,
        pagination: false,
        cShowCaption: entity.cEntityName
      };
    }
    fields.push({
      name: entity.childrenField || entity.cCode,
      modelType: modelType,
      value: "new cb.models." + modelType + "(" + JSON.stringify(obj) + ")"
    });
  });
};
var _getVoucherMeta = function _getVoucherMeta(vmmeta) {
  var fields = new Array();
  var checkFields = new Array();
  var actionFields = {};
  var subId = vmmeta.cSubId;
  var cCarry = vmmeta.cCarry;
  var cForeignKey = void 0;
  var parentCode = void 0;
  var nonMainEntities = [];
  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && (val.cType === 'Toolbar' || val.cType === 'Bill' && val.bMain === true)) {
      if (val.cType === 'Bill') {
        cForeignKey = val.cForeignKey;
        parentCode = val.cCode;
      }
      val.fields.forEach(function (item) {
        if (val.cType === 'Toolbar') {
          item.needClear = false;
        }
        var key = item.cItemName;
        var field = {
          name: key
        };
        var ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
        if (val.cType === 'Bill' && ctrlType === 'button') {
          item.needClear = false;
          item.value = item.cShowCaption;
        }
        var model = ControlType2ModelType[ctrlType] || 'SimpleModel';
        field.value = "new cb.models." + model + "(" + JSON.stringify(item) + ")";
        field.modelType = model;
        fields.push(field);
        var cCommand = item.cCommand;
        if (val.cType === 'Toolbar' && cCommand) {
          if (actionFields[cCommand]) {
            actionFields[cCommand].push(item);
          } else {
            actionFields[cCommand] = [item];
          }
        }
        if (item.bCheck) {
          checkFields.push(field);
        }
      });
    } else {
      if (val.cCode) nonMainEntities.push(val);
    }
  });
  _setSubTablesFields(fields, nonMainEntities, [parentCode]);
  if (vmmeta.states) {
    var states = _getStates(vmmeta);
    fields.push({
      name: 'states',
      value: JSON.stringify(states)
    });
  }
  // //处理只有表的页面
  // let onlyTable = vmmeta.entities.filter(x => {
  //   return x.cControlType && x.cControlType.toLocaleLowerCase() == 'table' && !x.childrenField && !x.cParentCode
  // })
  fields.push({
    name: 'params',
    value: JSON.stringify({
      cCarry: cCarry,
      // onlyTable,
      foreignKey: cForeignKey
    })
  });

  var _vmmeta = {
    fields: fields,
    checkFields: checkFields,
    actionFields: actionFields,
    cBillType: vmmeta.cBillType.toLocaleLowerCase()
  };
  return _vmmeta;
};
var _getCompareMeta = function _getCompareMeta(vmmeta) {
  var fields = new Array();
  var realFields = new Array();
  var cDataSourceName = void 0;
  var cCode = void 0;
  var checkFields = new Array();
  var actionFields = {};
  var cForeignKey = void 0;
  var subId = vmmeta.cSubId;

  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && (val.cType === 'Toolbar' || val.cType === 'Bill' && val.bMain === true)) {
      if (val.cType === 'Bill') {
        cForeignKey = val.cForeignKey;
        cDataSourceName = val.cDataSourceName;
        cCode = val.cCode;
      }
      val.fields.forEach(function (item) {
        if (val.cType === 'Toolbar') {
          item.needClear = false;
        }
        if (val.cType === 'Bill') {
          realFields.push(item);
        }
        var key = item.cItemName;
        var field = {};
        field.name = key;
        var ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
        var model = ControlType2ModelType[ctrlType] || 'SimpleModel';
        field.value = "new cb.models." + model + "(" + JSON.stringify(item) + ")";
        field.modelType = model;
        fields.push(field);
        var cCommand = item.cCommand;
        if (val.cType === 'Toolbar' && cCommand) {
          if (actionFields[cCommand]) {
            actionFields[cCommand].push(item);
          } else {
            actionFields[cCommand] = [item];
          }
        }
        if (item.bCheck) {
          checkFields.push(field);
        }
      });
    }
  });
  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && val.cType === 'Bill' && val.cControlType == 'Table' && val.bMain === false) {
      var modelType = 'GridModel';
      var columns = {};
      val.fields.forEach(function (item) {
        var key = item.cItemName;
        var column = {};
        columns[key] = item;
      });
      var field = {};
      var fieldKey = val.cCode;
      var _obj = {
        columns: columns,
        bIsNull: val.bIsNull,
        dataSourceMode: 'remote'
      };
      field.name = fieldKey;
      field.modelType = modelType;
      field.value = "new cb.models." + modelType + "(" + JSON.stringify(_obj) + ")";
      fields.push(field);
    }
  });
  var treeColumns = {};
  realFields.forEach(function (item) {
    var key = item.cItemName;
    treeColumns[key] = item;
  });
  var obj = {
    columns: treeColumns,
    dataSourceMode: 'remote',
    keyField: 'id',
    titleField: 'name'
  };
  fields.push({
    name: cCode,
    modelType: 'TreeModel',
    value: "new cb.models.TreeModel(" + JSON.stringify(obj) + ")"
  });

  if (vmmeta.states) {
    var states = _getStates(vmmeta);
    fields.push({
      name: 'states',
      value: JSON.stringify(states)
    });
  }
  fields.push({
    name: 'params',
    value: JSON.stringify({
      billNo: vmmeta.cBillNo,
      foreignKey: cForeignKey,
      treeName: cDataSourceName,
      billType: vmmeta.cBillType,
      filterId: vmmeta.cFilterId
    })
  });
  var _vmmeta = {
    fields: fields,
    checkFields: checkFields,
    actionFields: actionFields
  };
  return _vmmeta;
};
var _getTreeArchiveMeta = function _getTreeArchiveMeta(vmmeta) {
  var fields = new Array();
  var realFields = new Array();
  var cDataSourceName = void 0,
      cCode = void 0;
  var checkFields = new Array();
  var actionFields = {};
  var subId = vmmeta.cSubId;
  var parentCode = void 0;
  var nonMainEntities = [];
  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && (val.cType === 'Toolbar' || val.cType === 'Bill' && val.bMain === true)) {
      if (val.cType === 'Bill') {
        cDataSourceName = val.cDataSourceName;
        cCode = val.cCode;
        parentCode = val.cCode;
      }
      val.fields.forEach(function (item) {
        if (val.cType === 'Toolbar') {
          item.needClear = false;
        }
        if (val.cType === 'Bill') {
          realFields.push(item);
        }
        var key = item.cItemName;
        var field = {};
        field.name = key;
        var ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
        var model = ControlType2ModelType[ctrlType] || 'SimpleModel';
        field.modelType = model;
        field.value = "new cb.models." + model + "(" + JSON.stringify(item) + ")";
        fields.push(field);
        var cCommand = item.cCommand;
        if (val.cType === 'Toolbar' && cCommand) {
          if (actionFields[cCommand]) {
            actionFields[cCommand].push(item);
          } else {
            actionFields[cCommand] = [item];
          }
        }
        if (item.bCheck) {
          checkFields.push(field);
        }
      });
    } else {
      if (val.cCode) nonMainEntities.push(val);
    }
  });
  _setSubTablesFields(fields, nonMainEntities, [parentCode]);
  var columns = {};
  realFields.forEach(function (item) {
    var key = item.cItemName;
    columns[key] = item;
  });
  var obj = {
    columns: columns,
    dataSourceMode: 'remote',
    keyField: vmmeta.pkField || 'id',
    parentField: vmmeta.parentField || 'parent',
    needClear: false,
    titleField: 'name'
  };
  fields.push({
    name: cCode,
    modelType: 'TreeModel',
    value: "new cb.models.TreeModel(" + JSON.stringify(obj) + ")"
  });

  if (vmmeta.states) {
    var states = _getStates(vmmeta);
    fields.push({
      name: 'states',
      value: JSON.stringify(states)
    });
  }
  //var str = JSON.stringify({ billNo: vmmeta.cBillNo, subId: subId, childrenField: childrenField });
  //fields.push({ name: 'params', value: str });
  // console.log(actions);
  fields.push({
    name: 'params',
    value: JSON.stringify({
      billNo: vmmeta.cBillNo,
      billType: vmmeta.cBillType,
      treeName: cDataSourceName,
      filterId: vmmeta.cFilterId,
      hasChildren: true || nonMainEntities.length ? true : false
    })
  });
  var _vmmeta = {
    fields: fields,
    checkFields: checkFields,
    actionFields: actionFields
  };
  return _vmmeta;
};

var _getVoucherListMeta = function _getVoucherListMeta(vmmeta) {
  var fields = new Array();
  var actionFields = {};
  var checkFields = new Array();
  var treeName = void 0,
      treeEntityName = void 0;
  var subId = vmmeta.cSubId;
  var showCheckBox = vmmeta.bBatchOperate ? true : false;

  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && val.cType === 'Toolbar') {
      val.fields.forEach(function (item) {
        item.needClear = false;
        var key = item.cItemName;
        var field = {};
        field.name = key;
        field.value = "new cb.models.SimpleModel(" + JSON.stringify(item) + ")";
        field.modelType = 'SimpleModel';
        fields.push(field);
        var cCommand = item.cCommand;
        if (val.cType === 'Toolbar' && cCommand) {
          if (actionFields[cCommand]) {
            actionFields[cCommand].push(item);
          } else {
            actionFields[cCommand] = [item];
          }
        }
      });
    }
  });
  var showAggregates = false;
  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && val.cType === 'Bill') {
      var modelType = 'GridModel';
      var fieldKey = val.cCode;
      var ctrlType = val.cControlType && val.cControlType.trim().toLocaleLowerCase();
      switch (ctrlType) {
        case 'tree':
        case 'searchtree':
        case 'treetable':
          modelType = 'TreeModel';
          treeName = val.cDataSourceName;
          treeEntityName = val.cEntityName;
          fieldKey = val.cCode;
          break;
      }
      var columns = {};
      val.fields.forEach(function (item) {
        var key = item.cItemName;
        var column = {};
        columns[key] = item;
        if (item.bNeedSum) showAggregates = true;
      });
      var field = {};

      var obj = {
        columns: columns,
        dataSourceMode: 'remote',
        showCheckBox: showCheckBox,
        showAggregates: showAggregates
      };
      if (ctrlType === 'tree' || ctrlType === 'searchtree' || ctrlType === 'treetable') {
        obj.keyField = 'id';
        obj.needClear = false;
        obj.titleField = 'name';
      }

      field.name = fieldKey;
      field.value = "new cb.models." + modelType + "(" + JSON.stringify(obj) + ")";
      field.modelType = modelType;
      fields.push(field);
    }
  });
  if (vmmeta.states) {
    var states = _getStates(vmmeta);
    if (states.length > 0) fields.push({
      name: 'states',
      value: JSON.stringify(states)
    });
  }
  fields.push({
    name: 'params',
    value: JSON.stringify({
      billNo: vmmeta.cBillNo,
      treeEntityName: treeEntityName,
      treeName: treeName,
      billType: vmmeta.cBillType,
      filterId: vmmeta.cFilterId
    })
  });
  var _vmmeta = {
    fields: fields,
    actionFields: actionFields,
    checkFields: checkFields
  };
  return _vmmeta;
};

var _getBillMakerMeta = function _getBillMakerMeta(vmmeta) {
  var fields = new Array();
  fields.push({
    name: 'params',
    value: JSON.stringify({
      billNo: vmmeta.cBillNo,
      billType: vmmeta.cBillType,
      filterId: vmmeta.cFilterId
    })
  });
  fields.push({
    name: 'MakeBillCache',
    value: JSON.stringify({})
  }, {
    name: 'RuleCache',
    value: JSON.stringify({})
  }, {
    name: 'MakeBill',
    value: JSON.stringify({})
  }, {
    name: 'FilterCache',
    value: JSON.stringify({})
  });
  var actionFields = {};
  var childrenField = '';
  var subId = vmmeta.cSubId;
  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && val.cType === 'Toolbar') {
      val.fields.forEach(function (item) {
        item.needClear = false;
        var key = item.cItemName;
        var field = {};
        field.name = key;
        field.value = "new cb.models.SimpleModel(" + JSON.stringify(item) + ")";
        field.modelType = 'SimpleModel';
        fields.push(field);
        var cCommand = item.cCommand;
        if (val.cType === 'Toolbar' && cCommand) {
          if (actionFields[cCommand]) {
            actionFields[cCommand].push(item);
          } else {
            actionFields[cCommand] = [item];
          }
        }
      });
    }
  });
  var showCheckBox = vmmeta.bBatchOperate ? true : false;
  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && val.cType === 'Bill') {
      var modelType = 'GridModel';
      var columns = {};
      val.fields.forEach(function (item) {
        var key = item.cItemName;
        var column = {};
        columns[key] = item;
      });
      var field = {};
      var fieldKey = val.childrenField || val.cCode;
      var obj = {
        columns: columns,
        bIsNull: val.bIsNull
      };
      if (val.bMain) obj.showCheckBox = showCheckBox;
      field.name = fieldKey;
      field.value = "new cb.models." + modelType + "(" + JSON.stringify(obj) + ")";
      field.modelType = modelType;
      fields.push(field);
      fields.push({
        name: val.bMain === true ? 'Head' : 'Body',
        value: '"' + fieldKey + '"'
      });
    }
  });
  var _vmmeta = {
    fields: fields,
    actionFields: actionFields
  };
  return _vmmeta;
};

var _getOptionMeta = function _getOptionMeta(vmmeta) {
  var fields = new Array();
  var checkFields = new Array();
  var actionFields = {};
  var subId = vmmeta.cSubId;
  vmmeta.cBillNo = subId;
  fields.push({
    name: 'params',
    value: JSON.stringify({})
  });
  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && (val.cType === 'Toolbar' || val.cType === 'Option')) {
      val.fields.forEach(function (item) {
        if (val.cType === 'Toolbar') {
          item.needClear = false;
        }
        var key = item.cItemName;
        var field = {};
        field.name = key;
        var ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
        var modelType = ControlType2ModelType[ctrlType] || 'SimpleModel';
        field.value = "new cb.models." + modelType + "(" + JSON.stringify(item) + ")";
        field.modelType = modelType;
        fields.push(field);
        var cCommand = item.command;
        if (val.cType === 'Toolbar' && cCommand) {
          if (actionFields[cCommand]) {
            actionFields[cCommand].push(item);
          } else {
            actionFields[cCommand] = [item];
          }
        }
        if (item.bCheck) {
          checkFields.push(field);
        }
      });
    }
  });

  if (vmmeta.states) {
    var states = _getStates(vmmeta);
    fields.push({
      name: 'states',
      value: JSON.stringify(states)
    });
  }
  //fields.push({ name: 'params', value: str });
  // console.log(actions);
  var _vmmeta = {
    fields: fields,
    checkFields: checkFields,
    cBillType: vmmeta.cBillType.toLocaleLowerCase(),
    actionFields: actionFields
  };
  return _vmmeta;
};

/**
 * 开发环境下生成vm.js 调试用
 */
var _createStaticVmFiles = function _createStaticVmFiles(viewmeta, str) {
  var subId = viewmeta.cSubId;
  var vmName = viewmeta.vmName;
  var pathname = _path2.default.resolve('autogenerate', 'viewmodel', subId, vmName + '.js');
  (0, _mkdirp2.default)(_path2.default.dirname(pathname), function (error) {
    if (error) {
      console.warn(error);
    } else {
      var stream = _fs2.default.createWriteStream(pathname);
      stream.end(str);
    }
  });
};

/**
 * 获取extend js的文件名
 */
var _getExtendVmFileName = function _getExtendVmFileName(viewmeta, extendName) {
  var vmName = viewmeta.vmName;
  var extendFileName = (extendName || vmName) + '.Extend.js';
  return extendFileName;
};

/**
 * 获取extend 变量名
 */
var _getExtendVmName = function _getExtendVmName(viewmeta, extendNameParam) {
  var vmName = viewmeta.vmName;
  var extendName = (extendNameParam || vmName) + '_Extend';
  return extendName;
};

var _helper_filterModelKeys = function _helper_filterModelKeys(modelType, fields) {
  if (!fields || !modelType) return;
  var results = fields.filter(function (x) {
    return x.modelType == modelType;
  });
  var keys = results.map(function (x) {
    return x.name;
  });
  console.log(keys);
  return keys ? JSON.stringify(keys) : "undefined";
};

/**
 * 根据元数据类型返回获取元数据的URL
 */
var _getMetaUrl = function _getMetaUrl(ctx) {
  var postData = ctx.request.body;
  var billno = postData.billNo;
  var subid = postData.subId;
  var optionId = postData.optionId;
  var isSum = postData.query && Boolean(postData.query.isSum);
  var type = postData.type;
  var url = '';
  switch (type) {
    case 'bill':
      url = _env2.default.HTTP_USER_FETCH_METABYMENU + '?billno=' + billno + '&bIncludeViewModel=true';
      if (isSum) url += '&isSum=' + isSum;
      if (postData.reportId) url += '&reportId=' + postData.reportId;
      for (var attr in postData.query) {
        if (attr.trim().toLocaleLowerCase() === 'issum') continue;
        url += '&' + attr + '=' + postData.query[attr];
      }
      break;
    case 'menu':
      url = _env2.default.HTTP_USER_FETCH_METABYBILLNO + '?menu_code=' + billno;
      break;
    case 'option':
      url = _env2.default.HTTP_USER_FETCH_OPTIONMETA + '?subid=' + subid + '&optionId=' + optionId;
      break;
    case 'billmaker':
      url = _env2.default.HTTP_USER_FETCH_METABYBILLMAKER + '?billno=' + billno + '&bIncludeViewModel=true&type=' + postData.makeBilltype + '&code=' + postData.code;
      break;
  }
  url += '&token=' + ctx.request.query.token;
  url += '&terminalType=' + ctx.request.query.terminalType;
  if (postData.tplid) {
    url += '&tplid=' + postData.tplid;
  }
  return url;
};

/**
 *特殊处理下option的meta
 */
var _specialOptionMeta = function _specialOptionMeta(meta) {
  meta.data.viewmodel.cBillType = 'Option';
  meta.data.viewmodel.cSubId = 'AA' || meta.data.viewApplication.subid;;
  meta.data.viewmodel.cBillNo = meta.data.viewApplication.code;
  meta.data.viewApplication.cBillType = 'Option';
  meta.data.viewApplication.cSubId = 'AA' || meta.data.viewApplication.subid;
  meta.data.viewApplication.cBillNo = meta.data.viewApplication.code;
  var viewApplication = meta.data.viewApplication;

  _recursiveItems(viewApplication.view.containers);
};
var transferMap = {
  align: 'cAlign',
  controltype: 'cControlType',
  code: 'cGroupCode',
  name: 'cName',
  caption: 'cShowCaption'
};
var _recursiveItems = function _recursiveItems(items) {
  if (!items || !items.length) return;
  items.forEach(function (item) {
    for (var attr in transferMap) {
      item[transferMap[attr]] = item[attr];
      delete item[attr];
    }
    _recursiveItems(item.containers);
    _recursiveItems(item.controls);
  });
};

var _getActions = function _getActions(vmmeta, actionFields) {
  var actions = new Array();
  var hasActions = new Set();
  vmmeta.actions && vmmeta.actions.forEach(function (action) {
    var action_cCommand = action.cCommand;
    if (!common.isEmptyObject(actionFields)) {
      if (actionFields[action_cCommand] && !hasActions.has(action_cCommand)) {
        actionFields[action_cCommand].forEach(function (item) {
          var action_field = {};
          action_field.name = item.cItemName;
          action_field.event = 'click';
          action_field.cAction = action.cAction;
          action['childrenField'] = item.childrenField;
          action_field.params = JSON.stringify(Object.assign(action, item, {
            cmdParameter: action.cParameter
          }));
          action_field.needReduce = action.cSvcUrl ? true : false;
          actions.push(action_field);
          hasActions.add(action_cCommand);
        });
      }
    }
  });
  return actions;
};
var _getStates = function _getStates(vmmeta) {
  var states = new Array();
  vmmeta.states.forEach(function (state) {
    if (state.cCode) {
      var obj = {
        code: state.cCode,
        condition: state.cCondition,
        items: state.items
      };
      states.push(obj);
    }
  });
  return states;
};