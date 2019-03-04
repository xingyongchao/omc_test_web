import beautify from 'js-beautify'
import path from 'path'
import fs from 'fs'
import mkdirp from 'mkdirp'
import env from '../../../server/env'
import template from './template'
import * as tpls from '../tpls'
import * as common from './common'
import env2 from '../../common/helpers/env';

const { ControlTypesByChildrenField, ControlType2ModelType } = env2;

export const getMeta = async (ctx) => {
  const type = ctx.request.body.type;
  const url = _getMetaUrl(ctx);
  ctx.logger.info(`meta url：${url}`);
  let meta = await common.doFetch(url);
  let results = meta;
  if (meta.code == 200) {
    //暂时特殊处理下option的meta
    // if (type == 'option') {
    //   _specialOptionMeta(meta);
    // }
    let tplHtml = common.getVmTpl(meta);
    if (tplHtml.tpl) {
      results = _combineTplMeta(tplHtml.tpl, meta, ctx.request.body.extendName);
    } else {
      results = {
        code: 404,
        message: tplHtml.msg
      }
    }
  }
  ctx.body = results;
}

const _prepareMeta = (vmmeta) => {
  if (!vmmeta) return
  let fields = new Array();
  let actionFields = {};
  let meta;
  let billType = vmmeta.cBillType;
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
    case 'Compare': //树卡表，对照
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
}

/**
 * meta核心
 */
const _combineTplMeta = (tpl, meta, extendName) => {
  let metaData = meta.data;
  const { querySchema } = metaData;
  let viewmeta = metaData.viewApplication;
  let vmmeta = metaData.viewmodel;
  let func = template.compile(tpl);
  let viewmodel = _prepareMeta(vmmeta);
  viewmeta.vmName = _getVmName(viewmeta);
  viewmeta.extendFileName = _getExtendVmFileName(viewmeta, extendName);
  viewmeta.extendVmName = _getExtendVmName(viewmeta, extendName);

  let vmStr;
  if (viewmodel) {
    viewmodel.vmName = viewmeta.vmName;
    viewmodel.extendFileName = viewmeta.extendFileName;
    viewmodel.extendVmName = viewmeta.extendVmName;
    viewmodel.actions = _getActions(vmmeta, viewmodel.actionFields);
    viewmodel.allActions = vmmeta.actions ? JSON.stringify(vmmeta.actions) : "undefined";
    viewmodel.subId = viewmeta.cSubId;
    viewmodel.bPrintLimited = viewmeta.bPrintLimited;
    viewmodel.bAllowMultiTpl = viewmeta.bAllowMultiTpl;
    viewmodel.helper_filterModelKeys = _helper_filterModelKeys
    vmStr = func(viewmodel);
  }
  if (process.env.NODE_ENV === 'development' || process.env.BUSINESS_ENV === 'development') {
    vmStr = beautify(vmStr);
    _createStaticVmFiles(viewmeta, vmStr);
  } else {
    try {
      // vmStr = require('uglify-js').minify(vmStr, {fromString: true}).code;
    } catch (error) { }
  }
  let result = {
    code: 200,
    data: {
      querySchema,
      viewmeta: viewmeta,
      vm: vmStr
    }
  };
  if (meta.data.makeBill) {
    result.data.makeBill = meta.data.makeBill;
  }
  return result;
}
const _getVmName = (obj) => {
  if (!obj) return;
  return obj.cSubId + '_' + obj.cBillNo + '_' + "VM"
}

const _recursive = (entity) => {
  let columns = {}, showAggregates = false;
  entity.fields.forEach(function (item) {
    columns[item.cItemName] = item;
    if (item.bNeedSum)
      showAggregates = 'local';
  });
  if (entity.children) {
    entity.children.forEach(function (subEntity) {
      let obj;
      if (subEntity.cModelType === 'TagModel') {
        let field = subEntity.fields.filter(item => {
          return ControlTypesByChildrenField.indexOf(item.cControlType && item.cControlType.trim().toLocaleLowerCase()) > -1;
        });
        obj = field.length && field[0] || {};
        obj.multiple = true;
        obj.bIsNull = subEntity.bIsNull;
      } else {
        const tmpObj = _recursive(subEntity);
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
  return { columns, showAggregates };
}
const _getFreeViewMeta = (vmmeta) => {
  let fields = new Array();
  let checkFields = new Array();
  let actionFields = {};
  let subId = vmmeta.cSubId;
  let cCarry = vmmeta.cCarry;
  let tableEntites = vmmeta.entities && vmmeta.entities.filter(x => {
    return x.cModelType && x.cModelType.toLowerCase() == 'gridmodel' && x.cCode
  });
  let treeEntites = vmmeta.entities && vmmeta.entities.filter(x => {
    return x.cModelType && x.cModelType.toLowerCase() == 'treemodel'
  });
  let parentCodes = new Array();
  //除了tree 和table 的entity
  vmmeta.entities.forEach(function (val) {
    if (!val.cModelType || (val.cModelType && val.cModelType.toLowerCase() != 'treemodel' && val.cModelType && val.cModelType.toLowerCase() != 'gridmodel')) {
      if (val && val.fields && ((val.cType === 'Toolbar') || (val.cType === 'Bill'))) {
        val.fields.forEach(function (item) {
          if (val.cType === 'Toolbar') {
            item.needClear = false;
          }
          if (val.cType == 'Bill') {
            parentCodes.push(val.cCode);
          }
          let key = item.cItemName;
          let field = {
            name: key
          };
          const ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
          const model = ControlType2ModelType[ctrlType] || 'SimpleModel';
          field.value = "new cb.models." + model + "(" + JSON.stringify(item) + ")";
          field.modelType = model;
          fields.push(field);
          let cCommand = item.cCommand;
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
  let nonMainEntities = [],
    subTables = [],
    mainTables = [];

  if (tableEntites) {
    subTables = tableEntites.filter(x => {
      if (x.cParentCode) {
        parentCodes.push(x.parentCode)
      }
      ; return x.cParentCode
    })
    mainTables = tableEntites.filter(x => {
      if (x.cParentCode) {
        parentCodes.push(x.parentCode)
      }
      ; return !x.cParentCode
    })
  }
  _setSubTablesFields(fields, subTables, parentCodes);
  mainTables && mainTables.forEach(function (val) {
    let modelType = 'GridModel';
    let columns = {};
    val.fields.forEach(function (item) {
      let key = item.cItemName;
      let column = {};
      columns[key] = item;
    });
    let field = {};
    let obj = {
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
    let modelType = 'TreeModel';
    let columns = {};
    val.fields.forEach(function (item) {
      let key = item.cItemName;
      let column = {};
      columns[key] = item;
    });
    let field = {};
    let obj = {
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
    let states = _getStates(vmmeta);
    fields.push({
      name: 'states',
      value: JSON.stringify(states)
    });
  }
  let _vmmeta = {
    fields: fields,
    checkFields: checkFields,
    actionFields: actionFields,
    cBillType: 'freeview'
  };
  return _vmmeta;
}

const _setSubTablesFields = (fields, nonMainEntities, parentCodes) => {
  let nonMainMap = {};
  let subEntities = [];
  nonMainEntities.forEach(function (entity) {
    nonMainMap[entity.cCode] = entity;
  });
  parentCodes.forEach(function (parentCode) {
    nonMainEntities.forEach(function (entity) {
      if (entity.cParentCode === parentCode) {
        subEntities.push(entity);
      } else {
        let parentEntity = nonMainMap[entity.cParentCode];
        if (!parentEntity) return;
        if (!parentEntity.children)
          parentEntity.children = [];
        parentEntity.children.push(entity);
      }
    });
  });
  subEntities.forEach(function (entity) {
    let modelType = entity.cModelType || 'GridModel';
    let obj;
    if (modelType === 'TagModel') {
      const fields = [];
      let checkField = null, sortField = null, childrenField = null;
      entity.fields.forEach(item => {
        const ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
        const { cItemName } = item;
        if (ControlTypesByChildrenField.indexOf(ctrlType) > -1)
          obj = item;
        else if (ctrlType === 'boolean') {
          fields.push(item);
          checkField = cItemName;
        } else if (ctrlType === 'sort') {
          fields.push(item);
          sortField = cItemName;
        }
      });
      if (entity.children)
        childrenField = entity.children[0].childrenField;
      if (!obj)
        obj = {};
      obj.multiple = true;
      obj.bIsNull = entity.bIsNull;
      if (fields.length || entity.children)
        obj.columns = _recursive({ fields, children: entity.children }).columns;
      if (checkField)
        obj.checkField = checkField;
      if (sortField)
        obj.sortField = sortField;
      if (childrenField)
        obj.childrenField = childrenField;
    } else {
      const tmpObj = _recursive(entity);
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
}
const _getVoucherMeta = (vmmeta) => {
  let fields = new Array();
  let checkFields = new Array();
  let actionFields = {};
  let subId = vmmeta.cSubId;
  let cCarry = vmmeta.cCarry;
  let cForeignKey;
  let parentCode;
  let nonMainEntities = [];
  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && ((val.cType === 'Toolbar') || (val.cType === 'Bill' && val.bMain === true))) {
      if (val.cType === 'Bill') {
        cForeignKey = val.cForeignKey;
        parentCode = val.cCode;
      }
      val.fields.forEach(function (item) {
        if (val.cType === 'Toolbar') {
          item.needClear = false;
        }
        let key = item.cItemName;
        let field = {
          name: key
        };
        const ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
        if (val.cType === 'Bill' && ctrlType === 'button') {
          item.needClear = false;
          item.value = item.cShowCaption;
        }
        const model = ControlType2ModelType[ctrlType] || 'SimpleModel';
        field.value = "new cb.models." + model + "(" + JSON.stringify(item) + ")";
        field.modelType = model;
        fields.push(field);
        let cCommand = item.cCommand;
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
      if (val.cCode)
        nonMainEntities.push(val);
    }
  });
  _setSubTablesFields(fields, nonMainEntities, [parentCode]);
  if (vmmeta.states) {
    let states = _getStates(vmmeta);
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


  let _vmmeta = {
    fields: fields,
    checkFields: checkFields,
    actionFields: actionFields,
    cBillType: vmmeta.cBillType.toLocaleLowerCase()
  };
  return _vmmeta;
}
const _getCompareMeta = (vmmeta) => {
  let fields = new Array();
  let realFields = new Array();
  let cDataSourceName;
  let cCode;
  let checkFields = new Array();
  let actionFields = {};
  let cForeignKey;
  let subId = vmmeta.cSubId;

  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && ((val.cType === 'Toolbar') || (val.cType === 'Bill' && val.bMain === true))) {
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
        let key = item.cItemName;
        let field = {};
        field.name = key;
        const ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
        const model = ControlType2ModelType[ctrlType] || 'SimpleModel';
        field.value = "new cb.models." + model + "(" + JSON.stringify(item) + ")";
        field.modelType = model;
        fields.push(field);
        let cCommand = item.cCommand;
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
      let modelType = 'GridModel';
      let columns = {};
      val.fields.forEach(function (item) {
        let key = item.cItemName;
        let column = {};
        columns[key] = item;
      });
      let field = {};
      let fieldKey = val.cCode;
      let obj = {
        columns: columns,
        bIsNull: val.bIsNull,
        dataSourceMode: 'remote'
      };
      field.name = fieldKey;
      field.modelType = modelType;
      field.value = "new cb.models." + modelType + "(" + JSON.stringify(obj) + ")";
      fields.push(field);
    }
  });
  let treeColumns = {};
  realFields.forEach(function (item) {
    let key = item.cItemName;
    treeColumns[key] = item;
  });
  let obj = {
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
    let states = _getStates(vmmeta);
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
  let _vmmeta = {
    fields: fields,
    checkFields: checkFields,
    actionFields: actionFields
  };
  return _vmmeta;
}
const _getTreeArchiveMeta = (vmmeta) => {
  let fields = new Array();
  let realFields = new Array();
  let cDataSourceName,
    cCode;
  let checkFields = new Array();
  let actionFields = {};
  let subId = vmmeta.cSubId;
  let parentCode;
  let nonMainEntities = [];
  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && ((val.cType === 'Toolbar') || (val.cType === 'Bill' && val.bMain === true))) {
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
        let key = item.cItemName;
        let field = {};
        field.name = key;
        const ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
        const model = ControlType2ModelType[ctrlType] || 'SimpleModel';
        field.modelType = model;
        field.value = "new cb.models." + model + "(" + JSON.stringify(item) + ")";
        fields.push(field);
        let cCommand = item.cCommand;
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
      if (val.cCode)
        nonMainEntities.push(val);
    }
  });
  _setSubTablesFields(fields, nonMainEntities, [parentCode]);
  let columns = {};
  realFields.forEach(function (item) {
    let key = item.cItemName;
    columns[key] = item;
  });
  let obj = {
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
    value: "new cb.models.TreeModel(" + JSON.stringify(obj) + ")",
  });

  if (vmmeta.states) {
    let states = _getStates(vmmeta);
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
  let _vmmeta = {
    fields: fields,
    checkFields: checkFields,
    actionFields: actionFields
  };
  return _vmmeta;
}

const _getVoucherListMeta = (vmmeta) => {
  let fields = new Array();
  let actionFields = {};
  let checkFields = new Array();
  let treeName,
    treeEntityName;
  let subId = vmmeta.cSubId;
  const showCheckBox = vmmeta.bBatchOperate ? true : false;

  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && ((val.cType === 'Toolbar'))) {
      val.fields.forEach(function (item) {
        item.needClear = false;
        let key = item.cItemName;
        let field = {};
        field.name = key;
        field.value = "new cb.models.SimpleModel(" + JSON.stringify(item) + ")";
        field.modelType = 'SimpleModel';
        fields.push(field);
        let cCommand = item.cCommand;
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
  let showAggregates = false;
  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && val.cType === 'Bill') {
      let modelType = 'GridModel';
      let fieldKey = val.cCode;
      const ctrlType = val.cControlType && val.cControlType.trim().toLocaleLowerCase();
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
      let columns = {};
      val.fields.forEach(function (item) {
        let key = item.cItemName;
        let column = {};
        columns[key] = item;
        if (item.bNeedSum)
          showAggregates = true;
      });
      let field = {};

      let obj = {
        columns: columns,
        dataSourceMode: 'remote',
        showCheckBox,
        showAggregates
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
    let states = _getStates(vmmeta);
    if (states.length > 0)
      fields.push({
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
  let _vmmeta = {
    fields: fields,
    actionFields: actionFields,
    checkFields: checkFields
  };
  return _vmmeta;
}

const _getBillMakerMeta = (vmmeta) => {
  let fields = new Array();
  fields.push({
    name: 'params',
    value: JSON.stringify({
      billNo: vmmeta.cBillNo,
      billType: vmmeta.cBillType,
      filterId: vmmeta.cFilterId
    })
  });
  fields.push(
    {
      name: 'MakeBillCache',
      value: JSON.stringify({})
    },
    {
      name: 'RuleCache',
      value: JSON.stringify({})
    },
    {
      name: 'MakeBill',
      value: JSON.stringify({})
    },
    {
      name: 'FilterCache',
      value: JSON.stringify({})
    }
  );
  let actionFields = {};
  let childrenField = '';
  let subId = vmmeta.cSubId;
  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && ((val.cType === 'Toolbar'))) {
      val.fields.forEach(function (item) {
        item.needClear = false;
        let key = item.cItemName;
        let field = {};
        field.name = key;
        field.value = "new cb.models.SimpleModel(" + JSON.stringify(item) + ")";
        field.modelType = 'SimpleModel';
        fields.push(field);
        let cCommand = item.cCommand;
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
  const showCheckBox = vmmeta.bBatchOperate ? true : false;
  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && val.cType === 'Bill') {
      let modelType = 'GridModel';
      let columns = {};
      val.fields.forEach(function (item) {
        let key = item.cItemName;
        let column = {};
        columns[key] = item;
      });
      let field = {};
      let fieldKey = val.childrenField || val.cCode;
      let obj = {
        columns: columns,
        bIsNull: val.bIsNull
      };
      if (val.bMain)
        obj.showCheckBox = showCheckBox;
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
  let _vmmeta = {
    fields: fields,
    actionFields: actionFields
  };
  return _vmmeta;
}

const _getOptionMeta = (vmmeta) => {
  let fields = new Array();
  let checkFields = new Array();
  let actionFields = {};
  let subId = vmmeta.cSubId;
  vmmeta.cBillNo = subId;
  fields.push({
    name: 'params',
    value: JSON.stringify({})
  });
  vmmeta.entities.forEach(function (val) {
    if (val && val.fields && ((val.cType === 'Toolbar') || (val.cType === 'Option'))) {
      val.fields.forEach(function (item) {
        if (val.cType === 'Toolbar') {
          item.needClear = false;
        }
        let key = item.cItemName;
        let field = {};
        field.name = key;
        const ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
        const modelType = ControlType2ModelType[ctrlType] || 'SimpleModel';
        field.value = "new cb.models." + modelType + "(" + JSON.stringify(item) + ")";
        field.modelType = modelType;
        fields.push(field);
        let cCommand = item.command;
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
    let states = _getStates(vmmeta);
    fields.push({
      name: 'states',
      value: JSON.stringify(states)
    });
  }
  //fields.push({ name: 'params', value: str });
  // console.log(actions);
  let _vmmeta = {
    fields: fields,
    checkFields: checkFields,
    cBillType: vmmeta.cBillType.toLocaleLowerCase(),
    actionFields: actionFields
  };
  return _vmmeta;
}


/**
 * 开发环境下生成vm.js 调试用
 */
const _createStaticVmFiles = (viewmeta, str) => {
  let subId = viewmeta.cSubId;
  let vmName = viewmeta.vmName;
  let pathname = path.resolve('autogenerate', 'viewmodel', subId, vmName + '.js');
  mkdirp(path.dirname(pathname), function (error) {
    if (error) {
      console.warn(error);
    } else {
      let stream = fs.createWriteStream(pathname);
      stream.end(str);
    }
  });
};

/**
 * 获取extend js的文件名
 */
const _getExtendVmFileName = (viewmeta, extendName) => {
  let vmName = viewmeta.vmName;
  let extendFileName = (extendName || vmName) + '.Extend.js';
  return extendFileName;
}

/**
 * 获取extend 变量名
 */
const _getExtendVmName = (viewmeta, extendNameParam) => {
  let vmName = viewmeta.vmName;
  let extendName = (extendNameParam || vmName) + '_Extend';
  return extendName;
}

const _helper_filterModelKeys = (modelType, fields) => {
  if (!fields || !modelType) return
  let results = fields.filter(x => {
    return x.modelType == modelType
  });
  let keys = results.map(x => {
    return x.name
  })
  console.log(keys);
  return keys ? JSON.stringify(keys) : "undefined";
}


/**
 * 根据元数据类型返回获取元数据的URL
 */
const _getMetaUrl = (ctx) => {
  let postData = ctx.request.body
  const billno = postData.billNo;
  const subid = postData.subId;
  const optionId = postData.optionId;
  const isSum = postData.query && Boolean(postData.query.isSum);
  const type = postData.type;
  let url = '';
  switch (type) {
    case 'bill':
      url = env.HTTP_USER_FETCH_METABYMENU + '?billno=' + billno + '&bIncludeViewModel=true';
      if (isSum)
        url += '&isSum=' + isSum;
      if (postData.reportId)
        url += '&reportId=' + postData.reportId;
      for (var attr in postData.query) {
        if (attr.trim().toLocaleLowerCase() === 'issum') continue;
        url += `&${attr}=${postData.query[attr]}`;
      }
      break;
    case 'menu':
      url = env.HTTP_USER_FETCH_METABYBILLNO + '?menu_code=' + billno;
      break;
    case 'option':
      url = env.HTTP_USER_FETCH_OPTIONMETA + '?subid=' + subid + '&optionId=' + optionId;
      break;
    case 'billmaker':
      url = env.HTTP_USER_FETCH_METABYBILLMAKER + '?billno=' + billno + '&bIncludeViewModel=true&type=' + postData.makeBilltype + '&code=' + postData.code;
      break;
  }
  url += '&token=' + ctx.request.query.token;
  url += '&terminalType=' + ctx.request.query.terminalType;
  if (postData.tplid) {
    url += '&tplid=' + postData.tplid
  }
  return url;
}

/**
 *特殊处理下option的meta
 */
const _specialOptionMeta = (meta) => {
  meta.data.viewmodel.cBillType = 'Option';
  meta.data.viewmodel.cSubId = 'AA' || meta.data.viewApplication.subid;;
  meta.data.viewmodel.cBillNo = meta.data.viewApplication.code;
  meta.data.viewApplication.cBillType = 'Option';
  meta.data.viewApplication.cSubId = 'AA' || meta.data.viewApplication.subid;
  meta.data.viewApplication.cBillNo = meta.data.viewApplication.code;
  const { viewApplication } = meta.data;
  _recursiveItems(viewApplication.view.containers);
}
const transferMap = {
  align: 'cAlign',
  controltype: 'cControlType',
  code: 'cGroupCode',
  name: 'cName',
  caption: 'cShowCaption'
};
const _recursiveItems = items => {
  if (!items || !items.length) return;
  items.forEach(item => {
    for (let attr in transferMap) {
      item[transferMap[attr]] = item[attr];
      delete item[attr];
    }
    _recursiveItems(item.containers);
    _recursiveItems(item.controls);
  });
}

const _getActions = (vmmeta, actionFields) => {
  let actions = new Array();
  let hasActions = new Set();
  vmmeta.actions && vmmeta.actions.forEach(function (action) {
    let action_cCommand = action.cCommand;
    if (!common.isEmptyObject(actionFields)) {
      if (actionFields[action_cCommand] && !hasActions.has(action_cCommand)) {
        actionFields[action_cCommand].forEach(function (item) {
          let action_field = {};
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
}
const _getStates = (vmmeta) => {
  let states = new Array();
  vmmeta.states.forEach(function (state) {
    if (state.cCode) {
      let obj = {
        code: state.cCode,
        condition: state.cCondition,
        items: state.items
      };
      states.push(obj);
    }
  });
  return states;
}
