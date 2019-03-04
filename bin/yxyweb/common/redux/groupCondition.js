'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conditiOnMouseEnter = conditiOnMouseEnter;
exports.conditiOnTextMouseEnter = conditiOnTextMouseEnter;
exports.setDefaultCondition = setDefaultCondition;
exports.deleteCondition = deleteCondition;
exports.chooseCondition = chooseCondition;
exports.refreshConditionListValue = refreshConditionListValue;
exports.initConditionListValue = initConditionListValue;
exports.setValue = setValue;
exports.getReportGroupAuth = getReportGroupAuth;
exports.showList = showList;
exports.editConditionInfo = editConditionInfo;
exports.cancelEdit = cancelEdit;
exports.saveCondition = saveCondition;
exports.editCondition_SetValue = editCondition_SetValue;
exports.editCondition_SetIsCrossTable = editCondition_SetIsCrossTable;
exports.editCondition_SelectedKey = editCondition_SelectedKey;
exports.getArrayFields = getArrayFields;
exports.editCondition_MoveItems = editCondition_MoveItems;
exports.editCondition_ShowColumnDefine = editCondition_ShowColumnDefine;
exports.setColumnDefineValue = setColumnDefineValue;
exports.editCondition_SaveColumnDefine = editCondition_SaveColumnDefine;
exports.eChartSetting_EChartSettingOK = eChartSetting_EChartSettingOK;
exports.eChartSetting_Show = eChartSetting_Show;
exports.eChartSetting_SetDisplayType = eChartSetting_SetDisplayType;
exports.eChartSetting_SetSubChartColNum = eChartSetting_SetSubChartColNum;
exports.eChartSetting_ChooseChart = eChartSetting_ChooseChart;
exports.eChartSetting_CancelChartConfig = eChartSetting_CancelChartConfig;
exports.eChartSetting_RemoveConfig = eChartSetting_RemoveConfig;
exports.eChartSetting_SetEChartConfigValue = eChartSetting_SetEChartConfigValue;
exports.eChartSetting_DimensionXFieldsChecked = eChartSetting_DimensionXFieldsChecked;
exports.eChartSetting_DimensionSubFieldsChecked = eChartSetting_DimensionSubFieldsChecked;
exports.eChartSetting_MeasureFieldsChecked = eChartSetting_MeasureFieldsChecked;
exports.eChartSetting_MeasureFieldsValueChanged = eChartSetting_MeasureFieldsValueChanged;
exports.eChartSetting_ReturnNothing = eChartSetting_ReturnNothing;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _util = require('../helpers/util');

var _eChartProxy = require('../components/echart/eChartProxy');

var eChartProxy = _interopRequireWildcard(_eChartProxy);

var _eChartCommon = require('../components/echart/eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $$initialState = _immutable2.default.fromJS({
  "reduxTemplate": {
    billnum: '', //rm_saleanalysis
    bShowList: false,
    bShowCard: false,
    bShowEChartSetting: false,
    bShowEChartSetting_Add: false,
    showEChartKey: "",
    bAuthAdd: false,
    bAuthDel: false,
    bAuthEdit: false,
    cShowCaption: '分组条件',
    currentId: -1,
    currentName: "",
    textMouseEnterId: -1,
    conditionList: [],
    refreshGroupSchemaId: "",
    editCondition: {
      // groupType 值
      // 分组  0 分组项  3  统计项
      // 交叉  0 行标题  1 列标题  2 交叉点
      // billnum: "",
      id: "",
      name: "",
      isCrossTable: true, // true 分组  false 交叉
      focusedGroupType: 0,
      isDefault: false,
      keyWord: "",
      bEdit: false, // true 编辑  false 新增
      bDisplayCrossPoint: false, //显示交叉点横向汇总
      isDisplayZero: false,
      isPc: true,
      isMobile: false,
      dataSource_Selected: [],
      dataSource_UnSelected: [],
      metaData: {},
      columnDefineInfo: {
        bShowDefine: false,
        itemEle: {},
        defineData: {}
      }
    },
    eChart: {

      //   displayType: 1,/// 1 单表 2 单图 3 多图+表
      //   layOutConfig: {// 多图+表时的布局，目前只支持上1图下1表
      //     rows: [
      //       [
      //         {
      //           colspan: 12,
      //           widgetType: "chart",
      //           widgetValue: "chart1"
      //         }
      //       ],
      //       [
      //         {
      //           colspan: 12,
      //           widgetType: "rpt"
      //         }
      //       ]
      //     ]
      //   },
      //   eChartConfig: {}//具体图形报表的维度指标展示的设置,里面可以存储多个chart { chart1: {}, chart2: {},......}
    },

    eChartTemplate: {
      displayType: 1, /// 1 单表 2 单图 3 多图+表
      layOutConfig: { // 多图+表时的布局，目前只支持上1图下1表
        rows: [[{
          colspan: 12,
          widgetType: "chart",
          widgetValue: "chart1"
        }], [{
          colspan: 12,
          widgetType: "rpt"
        }]]
      },
      // eChartConfig: {},//具体图形报表的维度指标展示的设置,里面可以存储多个chart { chart1: {}, chart2: {},......}
      eChartConfig: {
        subChartColNum: 1,
        subChartConfigArr: []
      },
      errors: {}
    }
  }
});

exports.default = function () {
  var $$state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  var $state = $$state.toJS();
  switch (action.type) {
    case 'PLATFORM_UI_GroupCondition_initValue':
      {
        var viewid = action.payload.viewid;
        var billnum = action.payload.billnum;
        var billnum_viewid = billnum;
        if (!!viewid) billnum_viewid = billnum + "_" + viewid;
        if ($state[billnum_viewid]) delete $state[billnum_viewid];
        var ele = deepCopy($state["reduxTemplate"]);
        ele = Object.assign(ele, action.payload);
        $state[billnum_viewid] = ele;
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_SaveCondition':
      {
        var _billnum = action.payload.billnum;
        var groupSchemaId = action.payload.groupSchemaId;
        $state[_billnum] = Object.assign($state[_billnum], action.payload);
        if (action.payload.bShowCard === false) $state[_billnum].editCondition.columnDefineInfo.bShowDefine = false;
        $state[_billnum].refreshGroupSchemaId = groupSchemaId;
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_SetValue':
      {
        var _billnum2 = action.payload.billnum;
        $state[_billnum2] = Object.assign($state[_billnum2], action.payload);
        if (action.payload.bShowCard === false) $state[_billnum2].editCondition.columnDefineInfo.bShowDefine = false;
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_EditCondition_SetValue':
      {
        var _billnum3 = action.payload.billnum;
        $state[_billnum3].editCondition = Object.assign($state[_billnum3].editCondition, action.payload);
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_ConditiOnTextMouseEnter':
      {
        var _billnum4 = action.payload.billnum;
        if (action.payload.bEnter == true) $state[_billnum4].textMouseEnterId = action.payload.id;else $state[_billnum4].textMouseEnterId = -1;
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_ConditiOnMouseEnter':
      {
        var _billnum5 = action.payload.billnum;
        var conditionList = $state[_billnum5].conditionList;
        if (conditionList && conditionList.length > 0) {
          conditionList.forEach(function (ele, index) {
            if (ele.id == action.payload.id) ele.isMouseEnter = action.payload.bEnter;
          });
        }
        return _immutable2.default.fromJS($state);
      }

    // case 'PLATFORM_UI_GroupCondition_setDefaultCondition':
    //   {
    //       let billnum = action.payload.billnum;
    //     let conditionList = $state.conditionList;
    //     if (conditionList && conditionList.length > 0) {
    //       conditionList.forEach(function (element, index) {
    //         if (element.id == action.payload.id)
    //           element.isDefault = true;
    //         else
    //           element.isDefault = false;
    //       });
    //     }
    //     return Immutable.fromJS($state);
    //   }

    case 'PLATFORM_UI_GroupCondition_chooseCondition':
      {
        var _billnum6 = action.payload.billnum;
        var _conditionList = $state[_billnum6].conditionList;
        $state[_billnum6].currentId = "";
        $state[_billnum6].currentName = "";
        if (_conditionList && _conditionList.length > 0) {
          _conditionList.forEach(function (element, index) {
            if (element.id == action.payload.id) {
              $state[_billnum6].currentId = element.id;
              $state[_billnum6].currentName = element.name;
              $state[_billnum6].bShowList = false;
            } else {}
          });
        }
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_EditCondition':
      {
        var _billnum7 = action.payload.condition.billnum;
        $state[_billnum7].bShowCard = true;
        $state[_billnum7].bShowList = false;
        $state[_billnum7].editCondition.bEdit = true;
        $state[_billnum7].editCondition = Object.assign($state[_billnum7].editCondition, action.payload.condition);

        var chart = action.payload.chart;
        if (_.isEmpty(chart) == true || chart.displayType == 1 && _.isEmpty(chart.eChartConfig) == true) {
          $state[_billnum7].eChart = _.cloneDeep($state[_billnum7].eChartTemplate);
        } else {
          $state[_billnum7].eChart.displayType = chart.displayType;
          $state[_billnum7].eChart.layOutConfig = chart.layOutConfig;
          $state[_billnum7].eChart.eChartConfig = chart.eChartConfig;
          $state[_billnum7].eChart.errors = {};
        }
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_AddCondition':
      {
        var _billnum8 = action.payload.condition.billnum;
        $state[_billnum8].bShowCard = true;
        $state[_billnum8].bShowList = false;
        $state[_billnum8].editCondition.bEdit = false;
        $state[_billnum8].editCondition = Object.assign($state[_billnum8].editCondition, action.payload.condition);
        $state[_billnum8].eChart = _.cloneDeep($state[_billnum8].eChartTemplate);
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_EditCondition_SelectedKey':
      {
        var _billnum9 = action.payload.billnum;
        var groupType = action.payload.groupType;
        var selectedKey = action.payload.selectedKey;
        var bSelected = action.payload.bSelected;
        var bSelectedItems = action.payload.bSelectedItems;
        if (bSelectedItems) $state[_billnum9].editCondition.dataSource_Selected.forEach(function (ele, index) {
          if (selectedKey == ele.fieldname && ele.groupType == groupType) {
            ele.bSelected = bSelected;
            $state[_billnum9].editCondition.focusedGroupType = ele.groupType;
          }
        });else $state[_billnum9].editCondition.dataSource_UnSelected.forEach(function (ele, index) {
          if (selectedKey == ele.fieldname) {
            ele.bSelected = bSelected;
          }
        });

        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_EditCondition_MoveItems':
      {
        var _billnum10 = action.payload.billnum;
        var bToRight = action.payload.bToRight;
        var isCrossTable = $state[_billnum10].editCondition.isCrossTable;
        var focusedGroupType = $state[_billnum10].editCondition.focusedGroupType;
        if (bToRight) {
          if (isCrossTable == true && focusedGroupType == 1000) {
            var tmpArray = $state[_billnum10].editCondition.dataSource_Selected;
            if (tmpArray.length > 0) for (var i = tmpArray.length - 1; i >= 0; i--) {
              var _ele = tmpArray[i];
              if (_ele.groupType == 1) {
                tmpArray.splice(i, 1);
              }
            }
            var bInserted = false;
            $state[_billnum10].editCondition.dataSource_UnSelected.forEach(function (ele, index) {
              if (ele.bSelected) {
                ele.bSelected = false;
                if (bInserted == false) {
                  var ele2 = deepCopy(ele);
                  ele2.groupType = focusedGroupType;
                  $state[_billnum10].editCondition.dataSource_Selected.push(ele2);
                  bInserted = true;
                }
              }
            });
          } else {
            $state[_billnum10].editCondition.dataSource_UnSelected.forEach(function (ele, index) {
              if (ele.bSelected) {
                ele.bSelected = false;
                var ele2 = deepCopy(ele);
                if (isCrossTable) {
                  ele2.groupType = focusedGroupType;
                } else {
                  ele2.groupType = focusedGroupType;
                }
                $state[_billnum10].editCondition.dataSource_Selected.push(ele2);
              }
            });
          }
        } else {
          var _tmpArray = $state[_billnum10].editCondition.dataSource_Selected;
          for (var i = _tmpArray.length - 1; i >= 0; i--) {
            if (_tmpArray[i].bSelected && _tmpArray[i].groupType == focusedGroupType) {
              _tmpArray.splice(i, 1);
            }
          }
        }
        return _immutable2.default.fromJS($state);
      }

    case 'PLATFORM_UI_GroupCondition_EditCondition_ShowColumnDefine':
      {
        // billnum, bShowDefine,defineData: json.data
        var _billnum11 = action.payload.billnum;
        var columnDefineInfo = $state[_billnum11].editCondition.columnDefineInfo;
        if (action.payload.bShowDefine) {
          var defineData = action.payload.defineData;
          if (defineData && defineData.length > 0) {
            columnDefineInfo.bShowDefine = true;
            columnDefineInfo.itemEle = action.payload.itemEle;
            columnDefineInfo.defineData = defineData;
          } else {
            cb.utils.alert("没有可设置信息。");
            columnDefineInfo.bShowDefine = false;
          }
        } else {
          columnDefineInfo.bShowDefine = false;
        }
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_EditCondition_SetColumnDefineValue':
      {
        //groupType, fieldname, defineName, value
        var _billnum12 = action.payload.billnum;
        var _columnDefineInfo = $state[_billnum12].editCondition.columnDefineInfo;
        var _defineData = _columnDefineInfo.defineData;
        _defineData && _defineData.length && _defineData.forEach(function (ele) {
          if (ele.name == action.payload.defineName) ele.value = action.payload.value;
        });
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_EditCondition_SaveColumnDefine':
      {
        var _billnum13 = action.payload.billnum;
        var _columnDefineInfo2 = $state[_billnum13].editCondition.columnDefineInfo;
        var dataSource_Selected = $state[_billnum13].editCondition.dataSource_Selected;
        var _defineData2 = _columnDefineInfo2.defineData;
        var itemEle = _columnDefineInfo2.itemEle;
        var cColumnDefineMemo = "";
        _columnDefineInfo2.bShowDefine = false;
        if (action.payload.bSave) {
          var columnDefine = {};
          _defineData2 && _defineData2.length && _defineData2.forEach(function (ele) {
            columnDefine[ele.name] = ele.value;
            if (ele.controltype == "select") {
              var enumArray2 = JSON.parse(ele.enumArray);
              enumArray2.forEach(function (tmp) {
                if (tmp.key == ele.value) cColumnDefineMemo = cColumnDefineMemo == "" ? tmp.value : cColumnDefineMemo + "/" + tmp.value;
              });
            } else if (ele.controltype == "checkbox" && ele.value == "true") {
              cColumnDefineMemo = cColumnDefineMemo == "" ? ele.caption : cColumnDefineMemo + "/" + ele.caption;;
            }
          });
          dataSource_Selected.forEach(function (ele) {
            if (ele.groupType == itemEle.groupType && ele.fieldname == itemEle.fieldname) {
              ele.columnDefine = JSON.stringify(columnDefine);
              ele.cColumnDefineMemo = cColumnDefineMemo;
            }
          });
        }

        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_ReturnNothing':
      return $$state;

    case 'PLATFORM_UI_EChartSetting_Show':
      {
        $state[action.payload.billnum].bShowEChartSetting = action.payload.bShow;
        if (action.payload.bShow == true) {
          $state[action.payload.billnum].showEChartKey = action.payload.chartKey;
          if (!!action.payload.chartKey) $state[action.payload.billnum].bShowEChartSetting_Add = false;else $state[action.payload.billnum].bShowEChartSetting_Add = true;
        } else {
          $state[action.payload.billnum].eChart.errors = {};
          $state[action.payload.billnum].showEChartKey = "";
        }
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_SetDisplayType':
      {
        var _billnum14 = action.payload.billnum;
        var eChart = $state[_billnum14].eChart;
        eChart.displayType = action.payload.value;
        return _immutable2.default.fromJS($state);
      }

    case 'PLATFORM_UI_EChartSetting_SetSubChartColNum':
      {
        var _billnum15 = action.payload.billnum;
        var _eChart = $state[_billnum15].eChart;
        // eChart.eChartConfig.subChartColNum = action.payload.value;
        _.set(_eChart, "eChartConfig.subChartColNum", action.payload.value);
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_ReSetChartConfig':
      {
        var _billnum16 = action.payload.billnum;
        var _eChart2 = $state[_billnum16].eChart;
        _eChart2.eChartConfig = {
          subChartColNum: 1,
          subChartConfigArr: []
        };
        _eChart2.errors = {};
        if (action.payload.bClose == true) {
          $state[_billnum16].bShowEChartSetting = false;
          $state[_billnum16].showEChartKey = "";
        }
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_SetChartConfig':
      {
        var _billnum17 = action.payload.billnum;
        var _eChart3 = $state[_billnum17].eChart;
        var config = action.payload.config;
        var chartKey = action.payload.chartKey;
        var bClose = action.payload.bClose || false;
        // eChart.eChartConfig[config.chartKey] = config;
        eChartCommon.subConfigArray_Operate(_eChart3, chartKey, config || {}, action.payload.operate);
        _eChart3.errors = {};
        if (bClose == true) {
          $state[_billnum17].bShowEChartSetting = false;
          $state[_billnum17].showEChartKey = "";
        }
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_Errors':
      {
        var _billnum18 = action.payload.billnum;
        var _chartKey = action.payload.chartKey;
        var errors = action.payload.errors;
        _.set($state[_billnum18].eChart, "errors", errors);
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_SetEChartConfigValue':
      {
        var _billnum19 = action.payload.billnum;
        var _chartKey2 = action.payload.chartKey;
        var fieldPath = action.payload.fieldPath;
        var fieldValue = action.payload.fieldValue;
        var _eChart4 = $state[_billnum19].eChart;
        // let chart = eChart.eChartConfig[chartKey];
        var _chart = eChartCommon.subConfig_Get(_eChart4, _chartKey2);
        // let yySetting = $state[billnum].eChart.yySetting;
        // let eChartSetting = $state[billnum].eChart.eChartSetting;
        // if (fieldName == "eChartSetting.title.text")
        //   eChartSetting.title.text = fieldValue;
        // if (fieldName == "yySetting.type")
        //   yySetting.type = fieldValue;
        var oldValue = _.get(_chart, fieldPath);
        _.set(_chart, fieldPath, fieldValue);

        _.endsWith(fieldPath, "bUseDimensionXRows");
        {
          _eChart4.errors["dimensionXRows"] = undefined;
          _eChart4.errors["dimensionSubRows"] = undefined;
        }
        var checkArray = ["dimensionXRows", "dimensionSubRows", "longitudeField", "latitudeField"];
        checkArray.forEach(function (ele, index) {
          if (_.endsWith(fieldPath, ele)) {
            _eChart4.errors[ele] = undefined;
            if (inputCheck(_eChart4, _chartKey2, ele == "dimensionSubRows" ? "dimensionXRows" : ele) == false) {
              _.set(_chart, fieldPath, oldValue);
            }
          }
        });
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_DimensionXFieldsChecked':
      {
        var _billnum20 = action.payload.billnum;
        var _chartKey3 = action.payload.chartKey;
        var bCheck = action.payload.bCheck;
        var _ele2 = action.payload.ele;
        var _eChart5 = $state[_billnum20].eChart;
        // let chart = $state[billnum].eChart.eChartConfig[chartKey];
        var _chart2 = eChartCommon.subConfig_Get($state[_billnum20].eChart, _chartKey3);
        var dimensions = _chart2.yySetting.dataField.dimensionX;
        for (var i = 0; i < dimensions.length; i++) {
          var item = dimensions[i];
          if (item.nameField == _ele2.nameField) dimensions.splice(i, 1);
        }
        _eChart5.errors.dimensionX = "";
        if (bCheck) {
          dimensions.push(_ele2);
          if (inputCheck(_eChart5, _chartKey3, "dimensionX") == false) {
            dimensions.pop();
          }
        }
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_DimensionSubFieldsChecked':
      {
        var _billnum21 = action.payload.billnum;
        var _chartKey4 = action.payload.chartKey;
        var _bCheck = action.payload.bCheck;
        var _ele3 = action.payload.ele;
        var _eChart6 = $state[_billnum21].eChart;
        // let chart = $state[billnum].eChart.eChartConfig[chartKey];
        var _chart3 = eChartCommon.subConfig_Get($state[_billnum21].eChart, _chartKey4);
        var _dimensions = _chart3.yySetting.dataField.dimensionSub;
        for (var i = _dimensions.length - 1; i >= 0; i--) {
          // let item = dimensions[i];
          // if (item.nameField == ele.nameField)
          _dimensions.splice(i, 1);
        }
        if (_bCheck) {
          _dimensions.push(_ele3);
        }
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_MeasureFieldsValueChanged':
      {
        // billnum, valueField, fieldname, fieldValue
        var _billnum22 = action.payload.billnum;
        var _chartKey5 = action.payload.chartKey;
        var _eChart7 = $state[_billnum22].eChart;
        // let chart = $state[billnum].eChart.eChartConfig[chartKey];
        var _chart4 = eChartCommon.subConfig_Get($state[_billnum22].eChart, _chartKey5);
        var measure = _chart4.yySetting.dataField.measure;
        var measureEle = _.find(measure, function (o) {
          return o.valueField == action.payload.valueField;
        });
        if (measureEle) {
          measureEle[action.payload.fieldname] = action.payload.fieldValue;
        }
        return _immutable2.default.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_MeasureFieldsChecked':
      {
        var _billnum23 = action.payload.billnum;
        var _chartKey6 = action.payload.chartKey;
        var _bCheck2 = action.payload.bCheck;
        var _ele4 = action.payload.ele;
        var _eChart8 = $state[_billnum23].eChart;
        // let chart = eChart.eChartConfig[chartKey];
        var _chart5 = eChartCommon.subConfig_Get(_eChart8, _chartKey6);
        var _dimensions2 = _chart5.yySetting.dataField.measure;
        var type = _chart5.yySetting.type;
        for (var i = _dimensions2.length - 1; i >= 0; i--) {
          var _item = _dimensions2[i];
          if (_item.valueField == _ele4.valueField || type == "pie" || type == "scatter") {
            _dimensions2.splice(i, 1);
            if (_item.valueField == _chart5.yySetting.orderInfo.orderField) _chart5.yySetting.orderInfo.orderField = "";
          }
        }
        // if (eChart.errors)
        _eChart8.errors.measure = "";
        _eChart8.errors.measure0 = "";
        _eChart8.errors.measure1 = "";
        if (_bCheck2) {
          _dimensions2.push(_ele4);
          // let errors = saveCheck(eChart, chartKey);
          //  if(type=="barline"){}
          //  else
          var bPoped = false;

          if (type != "barline") {
            if (inputCheck(_eChart8, _chartKey6, "measure") == false) {
              _dimensions2.pop();
              bPoped = true;
              // eChart.errors.measure = errors.measure;
            }
          }
          if (type == "barline") {

            if (inputCheck(_eChart8, _chartKey6, "measure" + _ele4.yAxisIndex.toString()) == false) {
              _dimensions2.pop();
              bPoped = true;
              // eChart.errors.measure = errors.measure;
            }
          }
          if (bPoped == false) {
            if (_chart5.yySetting.orderInfo.orderField == "") {
              _chart5.yySetting.orderInfo.orderField = _ele4.valueField;
            }
            if (type == "pie") {
              _chart5.eChartSetting.series[0].name = _ele4.caption;
            } else if (type == "scatter") {
              _chart5.eChartSetting.series[0].name = _ele4.caption;
              _chart5.eChartSetting.series[1].name = _ele4.caption;
            }
          }
        }
        return _immutable2.default.fromJS($state);
      }
    default:
      return $$state;
  }
};

function inputCheck(eChart, chartKey, errKey) {
  var errors = saveCheck(eChart, chartKey);
  if (errors[errKey]) {
    eChart.errors[errKey] = errors[errKey];
    return false;
  }
  return true;
}
function deepCopy(p, c) {
  return _.cloneDeep(p);

  // var c = c || {};
  // for (var i in p) {
  //   if (typeof p[i] === 'object') {
  //     c[i] = (p[i].constructor === Array) ? [] : {};
  //     deepCopy(p[i], c[i]);
  //   } else {
  //     c[i] = p[i];
  //   }
  // }
  // return c;
}
function conditiOnMouseEnter(billnum, id, bEnter) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_ConditiOnMouseEnter', { billnum: billnum, id: id, bEnter: bEnter }));
  };
}
function conditiOnTextMouseEnter(billnum, id, bEnter) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_ConditiOnTextMouseEnter', { billnum: billnum, id: id, bEnter: bEnter }));
  };
}

function setDefaultCondition(billnum, id, viewModel) {
  return function (dispatch, getState) {
    // dispatch(genAction('PLATFORM_UI_GroupCondition_setDefaultCondition', { id }));

    var conditionList = getState().groupCondition.toJS()[billnum].conditionList;
    var params = { id: -1 }; //Json groupSchema
    params.billnum = billnum;
    conditionList.forEach(function (ele, index) {
      if (ele.id == id) {
        params.id = id;
        params.name = ele.name;
        params.isCrossTable = ele.isCrossTable;
        params.isDefault = true;
      }
    });
    if (params.id > 0) {
      var callback = function callback(json) {
        if (json.code === 200) {
          dispatch(refreshConditionListValue(billnum, viewModel));
        }
        if (json.code !== 200) {
          console.log("保存分组条件失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
          dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_ReturnNothing'));
        }
      };
      eChartProxy.doProxy(eChartProxy.url.saveGroupSchema, 'POST', params, callback);
    } else {
      dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_ReturnNothing'));
    }
  };
}

function deleteCondition(billnum, id, viewModel) {
  return function (dispatch, getState) {

    var params = {}; //Json groupSchema
    params.groupSchemaId = id;
    var callback = function callback(json) {
      if (json.code === 200) {
        dispatch(refreshConditionListValue(billnum, viewModel));
      } else if (json.code === 999) {
        cb.utils.alert(json.message);
        dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_ReturnNothing'));
      } else if (json.code !== 200) {
        console.log("删除分组条件失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
        dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_ReturnNothing'));
      }
    };
    eChartProxy.doProxy(eChartProxy.url.deleteGroupSchema, 'GET', params, callback);
  };
}

function chooseCondition(billnum, id) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_chooseCondition', { billnum: billnum, id: id }));
    var userId = cb.rest.AppContext.user.id;
    var localDataKey = billnum + '_' + userId;
    var localData = void 0;
    try {
      localData = JSON.parse(localStorage.getItem(localDataKey));
    } catch (e) {}
    if (!localData) localData = {};
    localData.groupSchemaId = id;
    localStorage.setItem(localDataKey, JSON.stringify(localData));
  };
}
//刷新
function refreshConditionListValue(billnum, viewModel) {
  return function (dispatch, getState) {
    // let billnum = getState().groupCondition.toJS().billnum;

    var proxyParams = { billnum: billnum };
    var callback = function callback(json) {
      if (json.code === 200) {
        var params = {};
        var conditionList = json.data;
        params.conditionList = conditionList;
        params["billnum"] = billnum;
        dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_SetValue', params));
      }
      if (json.code !== 200) {
        console.log("获取分组条件失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
      }
    };
    eChartProxy.doProxy(eChartProxy.url.getGroupSchema, 'GET', proxyParams, callback);
  };
}

/*初始化*/
function initConditionListValue(billnum, params, viewModel) {
  return function (dispatch, getState) {
    var proxyParams = { billnum: billnum };

    var viewid = _.get(viewModel.getParams(), 'query.viewid');
    if (viewid) proxyParams.viewid = viewid;

    var callback = function callback(json) {
      if (json.code === 200) {
        var conditionList = json.data;
        var defaultId = -1;
        var defaultName = "";
        if (conditionList && conditionList.length > 0) {
          conditionList.forEach(function (ele, index) {
            if (defaultId == -1 || ele.isDefault) {
              defaultId = ele.id;
              defaultName = ele.name;
            }
            ele.isMouseEnter = false;
          });
          var userId = cb.rest.AppContext.user.id;
          try {
            var localData = JSON.parse(localStorage.getItem(billnum + '_' + userId));
            var localDefaultId = localData && localData.groupSchemaId;
            if (localDefaultId) {
              var localDefaultGroupSchema = conditionList.find(function (item) {
                return item.id == localDefaultId;
              });
              if (localDefaultGroupSchema) {
                defaultId = localDefaultGroupSchema.id;
                defaultName = localDefaultGroupSchema.name;
              }
            }
          } catch (e) {}
          if (viewModel && defaultId > -1) {
            viewModel.biz.do("switchGroupSchema", viewModel, { groupSchemaId: defaultId, groupSchemaName: defaultName });
            var tmp = [];
            tmp.push({ id: defaultId, name: defaultName });
            viewModel.get('groupSchemas').setDataSource(tmp);
            viewModel.get('groupSchemas').setValue(defaultId);
          } else {
            viewModel.biz.do("switchGroupSchema", viewModel, null);
          }
        } else {
          viewModel.biz.do("switchGroupSchema", viewModel, null);
        }
        params.currentId = defaultId;
        params.currentName = defaultName ? defaultName : undefined;
        params.conditionList = conditionList;
        params.viewid = viewid;
        params["billnum"] = billnum;
        dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_initValue', params));
        if (!viewid) dispatch(getReportGroupAuth(billnum));
      }
      if (json.code !== 200) {
        console.log("获取分组条件失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
        viewModel.biz.do("switchGroupSchema", viewModel, null);
      }
    };
    eChartProxy.doProxy(eChartProxy.url.getGroupSchema, 'GET', proxyParams, callback);
  };
}

function setValue(billnum, params) {
  return function (dispatch, getState) {
    params["billnum"] = billnum;
    dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_SetValue', params));
  };
}
function getReportGroupAuth(billnum) {
  return function (dispatch, getState) {
    var params = {};
    var callback = function callback(json) {
      if (json.code === 200) {
        // dispatch(genAction('PLATFORM_UI_GroupCondition_SaveCondition', { billnum, groupSchemaId: editCondition.id, bShowCard: false }));
        dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_SetValue', {
          billnum: billnum,
          bAuthAdd: json.data.groupschemaAdd,
          bAuthDel: json.data.groupschemaDelete,
          bAuthEdit: json.data.groupschemaSave
        }));
      } else {
        console.log("获取分组权限信息失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
      }
    };
    eChartProxy.doProxy(eChartProxy.url.checkGroupAuth, 'GET', params, callback);
  };
}

function showList(billnum, bShowList) {
  // url: "/user/operation/batchcheck/groupschemaAdd,groupschemaSave,groupschemaDelete",
  // method: 'GET'
  return function (dispatch, getState) {

    dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_SetValue', { billnum: billnum, bShowList: bShowList }));
  };
}

function editConditionInfo(billnum, id) {
  return function (dispatch, getState) {
    var params = { billnum: billnum };

    if (id != "") {
      params.groupSchemaId = id;
    }
    var callback = function callback(json) {
      if (json.code === 200) {

        var metaData = json.data;
        var dataSource_Selected = metaData.selected ? metaData.selected : [];
        var dataSource_UnSelected = metaData.unselected ? metaData.unselected : [];
        // let groups = metaData.groups;
        var name = metaData.name;
        var isCrossTable = metaData.isCrossTable;
        var isDefault = metaData.isDefault;
        var isDisplayZero = metaData.isDisplayZero ? metaData.isDisplayZero : false;
        var isPc = metaData.hasOwnProperty("isPc") ? metaData.isPc : true;
        var isMobile = metaData.hasOwnProperty("isMobile") ? metaData.isMobile : false;

        // groups.forEach(function (ele, index) {
        //   dataSource_Selected.push({
        //     key: ele.alias.toString(),
        //     title: ele.caption,
        //     description: ele.caption,
        //     bSelected: ele.bSelected ? ele.bSelected : false,
        //     bTarget: ele.bTarget ? ele.bTarget : false,
        //   });

        // });
        var condition = { billnum: billnum, id: id, name: name, isCrossTable: isCrossTable, isDefault: isDefault, isMobile: isMobile, isPc: isPc, isDisplayZero: isDisplayZero, metaData: metaData, dataSource_Selected: dataSource_Selected, dataSource_UnSelected: dataSource_UnSelected };
        if (id) {
          condition.focusedGroupType = 0;
          condition.keyWord = "";

          var chart = {};
          if (metaData.displayStyle) {
            chart.displayType = metaData.displayStyle;
            chart.layOutConfig = JSON.parse(metaData.pageLayout);
            var eChartConfig = JSON.parse(metaData.chartConfig);
            if (eChartConfig && _.isEmpty(eChartConfig) == false) eChartConfig = eChartCommon.upgradeConfig_ForEChartArr(eChartConfig);
            chart.eChartConfig = eChartConfig;
          }

          dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_EditCondition', { condition: condition, chart: chart }));
        } else {
          condition.isCrossTable = false;
          condition.isDefault = false;
          condition.focusedGroupType = 0;
          condition.keyWord = "";
          dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_AddCondition', { condition: condition }));
        }
      }
      if (json.code !== 200) {
        console.log("获取分组条件失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
        dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_ReturnNothing'));
      }
    };
    eChartProxy.doProxy(eChartProxy.url.getGroupItems, 'GET', params, callback);
  };
}

function cancelEdit(billnum) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_SetValue', { billnum: billnum, bShowCard: false }));
  };
}

function saveCondition(billnum, viewModel) {
  return function (dispatch, getState) {
    var editCondition = getState().groupCondition.toJS()[billnum].editCondition;
    var eChart = getState().groupCondition.toJS()[billnum].eChart;

    var params = {}; //Json groupSchema
    params.billnum = billnum;
    if (editCondition.bEdit) params.id = editCondition.id;
    params.name = editCondition.name;
    params.name = eChartCommon.checkTempName(params.name);
    params.isCrossTable = editCondition.isCrossTable;
    params.isDisplayZero = editCondition.isDisplayZero;
    if (!!params.isCrossTable) params.isMobile = false;else params.isMobile = editCondition.isMobile;
    params.isPc = editCondition.isPc;
    params.isDefault = editCondition.isDefault;
    params.selected = editCondition.dataSource_Selected; //JSON.parse
    // if (params.selected
    //   && params.selected.length == 4
    //   && params.selected.filter(function (item) { return item.groupType == 0 }).length == 4) {
    //   params.selected[0].level = 1;
    //   params.selected[1].level = 2;
    //   params.selected[2].level = 2;
    //   params.selected[3].level = 3;
    // }

    // params.type = 1;// 报表汇总区域//存储为报表汇总区的设置信息
    params.displayStyle = eChart.displayType;
    params.pageLayout = JSON.stringify(eChart.layOutConfig);
    params.chartConfig = "{}";
    if (eChart.displayType == 2 || eChart.displayType == 3) {
      params.chartConfig = JSON.stringify(eChart.eChartConfig);
    }

    var callback = function callback(json) {
      if (json.code === 200) {
        dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_SaveCondition', { billnum: billnum, groupSchemaId: editCondition.id, bShowCard: false }));
        dispatch(refreshConditionListValue(billnum, viewModel));
      }
      if (json.code !== 200) {
        console.log("保存分组条件失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
        dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_ReturnNothing'));
      }
    };
    eChartProxy.doProxy(eChartProxy.url.saveGroupSchema, 'POST', params, callback);
  };
}

function editCondition_SetValue(billnum, fieldName, fieldValue) {
  return function (dispatch, getState) {
    var param = {};
    param.billnum = billnum;
    param[fieldName] = fieldValue;
    dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_EditCondition_SetValue', param));
  };
}

function editCondition_SetIsCrossTable(billnum, fieldName, fieldValue) {
  return function (dispatch, getState) {
    var param = {};
    param.billnum = billnum;
    param[fieldName] = fieldValue;
    param["dataSource_Selected"] = [];
    param["isPc"] = true;
    param["isMobile"] = false;
    dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_EditCondition_SetValue', param));
    dispatch((0, _util.genAction)('PLATFORM_UI_EChartSetting_ReSetChartConfig', { billnum: billnum, bClose: true }));
  };
}

function editCondition_SelectedKey(billnum, groupType, selectedKey, bSelected, bSelectedItems) {
  return function (dispatch, getState) {
    var param = { billnum: billnum, groupType: groupType, selectedKey: selectedKey, bSelected: bSelected, bSelectedItems: bSelectedItems };
    dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_EditCondition_SelectedKey', param));
  };
}

function getArrayFields(obj, arrPath, fieldName) {
  var arr = _.get(obj, arrPath);
  var arrReturn = [];
  var str = "";
  if (arr && arr.length > 0) {
    arr.forEach(function (item) {
      str = item[fieldName];
      if (arrReturn.indexOf(str) < 0) arrReturn.push(str);
    });
  }
  return arrReturn;
}
function editCondition_MoveItems(billnum, bToRight) {
  return function (dispatch, getState) {
    var editCondition = getState().groupCondition.toJS()[billnum].editCondition;
    var eChart = getState().groupCondition.toJS()[billnum].eChart;

    if (bToRight == false && (eChart.displayType == 2 || eChart.displayType == 3)) {
      var config = eChart.eChartConfig["chart1"];
      if (config) {
        var str = "";
        var dimensionXFields = getArrayFields(config, "yySetting.dataField.dimensionX", "nameField");
        var dimensionSubFields = getArrayFields(config, "yySetting.dataField.dimensionSub", "nameField");
        var measureFields = getArrayFields(config, "yySetting.dataField.measure", "valueField");
        editCondition.dataSource_Selected.forEach(function (ele, index) {
          if (ele.bSelected) {
            if (dimensionXFields.indexOf(ele.fieldname) > -1 || dimensionSubFields.indexOf(ele.fieldname) > -1 || measureFields.indexOf(ele.fieldname) > -1) {
              str = str + ele.caption + " ";
            }
          }
        });
        if (str != "") {
          cb.utils.alert(str + "已经在图形报表中使用，不能删除。");
          dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_ReturnNothing'));
          return;
        }
      }
    }
    dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_EditCondition_MoveItems', { billnum: billnum, bToRight: bToRight }));
  };
}

function editCondition_ShowColumnDefine(billnum, bShowDefine, itemEle) {
  return function (dispatch, getState) {
    // {"billnum":"rm_salereceipts_report","fieldname":"vouchdate","groupType":0,"columnDefine":"{\"function\":\"fn_formatdateyyyymmdd\"}","caption":"日期","sumType":"fn_formatdateyyyymmdd"}
    var params = itemEle; //Json groupSchema
    params.billnum = billnum;
    if (bShowDefine) {
      var callback = function callback(json) {
        if (json.code === 200) {
          dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_EditCondition_ShowColumnDefine', { billnum: billnum, bShowDefine: bShowDefine, itemEle: itemEle, defineData: json.data }));
        }
        if (json.code !== 200) {
          console.log("获取列定义失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
          dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_ReturnNothing'));
        }
      };
      eChartProxy.doProxy(eChartProxy.url.columnDefine, 'POST', params, callback);
    } else {
      dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_EditCondition_ShowColumnDefine', { billnum: billnum, bShowDefine: bShowDefine }));
    }
  };
}

function setColumnDefineValue(billnum, groupType, fieldname, defineName, value) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_EditCondition_SetColumnDefineValue', { billnum: billnum, groupType: groupType, fieldname: fieldname, defineName: defineName, value: value }));
  };
}

function editCondition_SaveColumnDefine(billnum, bSave) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_EditCondition_SaveColumnDefine', { billnum: billnum, bSave: bSave }));
  };
}
function eChartSetting_EChartSettingOK(billnum, chartKey) {
  return function (dispatch, getState) {
    var eChart = getState().groupCondition.toJS()[billnum].eChart;
    var errors = saveCheck(eChart, chartKey);
    if (_.isEmpty(errors) == true) {
      dispatch((0, _util.genAction)('PLATFORM_UI_EChartSetting_Show', { billnum: billnum, bShow: false, chartKey: chartKey }));
    } else {
      dispatch((0, _util.genAction)('PLATFORM_UI_EChartSetting_Errors', { billnum: billnum, chartKey: chartKey, errors: errors }));
    }
  };
}

function saveCheck(eChart, chartKey) {
  var errors = {};
  if (eChart.displayType == 2 || eChart.displayType == 3) {
    // let chart = eChart.eChartConfig[chartKey];
    var chart = eChartCommon.subConfig_Get(eChart, chartKey);
    var yySetting = chart.yySetting;
    var eChartSetting = chart.eChartSetting;
    var title = "";
    if (yySetting.type == "ranktable") title = _.get(yySetting, "title.text");else title = _.get(eChartSetting, "title.text");
    var dimensionX = chart.yySetting.dataField.dimensionX;
    var dimensionSub = chart.yySetting.dataField.dimensionSub;
    var measure = chart.yySetting.dataField.measure;
    var rotate = _.get(eChartSetting, "xAxis.axisLabel.rotate");
    var bUseDimensionXRows = chart.yySetting.orderInfo.bUseDimensionXRows;
    var dimensionXRows = chart.yySetting.orderInfo.dimensionXRows;
    var dimensionSubRows = chart.yySetting.orderInfo.dimensionSubRows;
    var orderField = chart.yySetting.orderInfo.orderField;
    var LngAndLat = chart.yySetting.dataField.LngAndLat;
    if (_.isEmpty(title) || title.trim() == "") errors.title = "标题不可为空";
    if (dimensionX.length < 1 || dimensionX.length > 3) errors.dimensionX = "主维度不可为空且最多三项";
    if (dimensionSub.length > 1) errors.dimensionSub = "辅维度最多一项";
    if (yySetting.type == "barline") {
      var measure0 = _.filter(measure, function (o) {
        return o.yAxisIndex == 0;
      });
      var measure1 = _.filter(measure, function (o) {
        return o.yAxisIndex == 1;
      });
      if (measure0.length < 1) {
        errors.measure0 = "展示指标必选，且最多10项";
      }
      if (measure1.length < 1) {
        errors.measure1 = "展示指标必选，且最多10项";
      }
      if (measure.length < 1 || measure.length > 10) {
        errors.measure0 = "展示指标必选，且最多10项";
        errors.measure1 = "展示指标必选，且最多10项";
      }
    }
    if (yySetting.type == "ranktable") {
      if (measure.length < 1 || measure.length > 3) errors.measure = "展示指标必选，且最多3项";
    }
    if (yySetting.type == "scatter") {
      if (measure.length < 1 || measure.length > 3) errors.measure = "请选择展示指标";
      if (yySetting.regionInfo && yySetting.regionInfo.region) {
        if (yySetting.regionInfo.region != "100000" && yySetting.regionInfo.parent != "100000" && !eChartCommon.getMapAllCitys(yySetting.regionInfo.region)) {
          errors.map = "当前区域没有地图组件。";
        }
      } else {
        errors.map = "请选择地图信息。";
      }
    } else if (yySetting.type != "barline") {
      if (measure.length < 1 || measure.length > 5) errors.measure = "展示指标必选，且最多5项";
    }
    if (dimensionSub.length > 0 && measure.length > 1) errors.measure = "有辅维度存在，展示指标只支持单选";
    if (orderField == "") errors.orderField = "请选择排序指标";
    if (yySetting.type == "pie") {
      if (measure.length > 1) errors.measure = "饼形图展示指标只支持单选";
      if (yySetting.hasOwnProperty("radius")) {
        if (isNaN(yySetting.radius.radiusInner) || isNaN(yySetting.radius.radiusOuter)) errors.radiusInner = "内外径请输入0到100的整数，且外径大于内径。";
        var radiusInner = Number(yySetting.radius.radiusInner);
        var radiusOuter = Number(yySetting.radius.radiusOuter);
        if (radiusInner < 0 || radiusOuter > 100 || radiusInner >= radiusOuter) {
          errors.radiusInner = "内外径请输入0到100的整数，且外径大于内径。";
        }
      }
    }
    if (yySetting.type == "scatter") {
      if (measure.length > 1) errors.measure = "气泡图展示指标只支持单选";
      if (LngAndLat.longitude.longitudeField == "") errors.longitudeField = "经度字段不可为空";
      if (LngAndLat.latitude.latitudeField == "") errors.latitudeField = "纬度字段不可为空";else if (LngAndLat.longitude.longitudeField == LngAndLat.latitude.latitudeField) {
        errors.longitudeField = "经纬度字段不可相同";
        errors.latitudeField = "经纬度字段不可相同";
      }
    }
    if (yySetting.type == "ranktable") {
      if (yySetting.orderInfo.topNum == "" || yySetting.orderInfo.topNum.toString().indexOf(".") > -1 || isNaN(yySetting.orderInfo.topNum) || Number(yySetting.orderInfo.topNum) > 999 || Number(yySetting.orderInfo.topNum) < 1) {
        errors.topNum = "请录入1-999的整数。";
      }
    }
    if (rotate && (Number(rotate) < 0 || Number(rotate) > 60)) errors.rotate = "显示角度应该在0-60之间";

    if (bUseDimensionXRows && !dimensionXRows) {
      errors.dimensionXRows = "请录入主维度行数。";
    }
    if (yySetting.type !== "scatter" && bUseDimensionXRows && Number(dimensionXRows) > 31) errors.dimensionXRows = "主维度行数不可大于31";

    if (yySetting.type == "line") {
      if (!bUseDimensionXRows && Number(dimensionSubRows) > 99) errors.dimensionXRows = "辅维度行数不可大于99";
    } else {
      if (!bUseDimensionXRows && Number(dimensionSubRows) > 5) errors.dimensionXRows = "辅维度行数不可大于5";
    }
  }
  return errors;
}
function eChartSetting_Show(billnum, bShow, chartKey) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_EChartSetting_Show', { billnum: billnum, bShow: bShow, chartKey: chartKey }));
  };
}
function eChartSetting_SetDisplayType(billnum, value) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_EChartSetting_SetDisplayType', { billnum: billnum, value: value }));
  };
}
function eChartSetting_SetSubChartColNum(billnum, value) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_EChartSetting_SetSubChartColNum', { billnum: billnum, value: value }));
  };
}

function eChartSetting_ChooseChart(billnum, configTemplate, chartKey, bAddNewToArr) {
  return function (dispatch, getState) {

    var newEChart = configTemplate;
    var newEChartType = newEChart.yySetting.type;
    var newEChartSubType = newEChart.yySetting.subType;
    // let oldEChart = getState().groupCondition.toJS()[billnum].eChart.eChartConfig[newEChart.chartKey];
    if (bAddNewToArr == false) {
      var oldEChart = eChartCommon.subConfig_Get(getState().groupCondition.toJS()[billnum].eChart, newEChart.chartKey);
      var oldEChartType = oldEChart ? oldEChart.yySetting.type : "";
      var copyArray = [];
      var titleText = _.get(oldEChart, 'eChartSetting.title.text');
      if (titleText != "饼形图示例" && titleText != "柱形图示例" && titleText != "堆叠柱形图示例" && titleText != "条形图示例" && titleText != "堆叠条形图示例" && titleText != "折线图示例" && titleText != "曲线图示例" && titleText != "气泡图示例" && titleText != "柱折图示例" && titleText != "排名表示例") copyArray.push('eChartSetting.title.text');

      copyArray.push('yySetting.dataField.dimensionX');
      if (newEChartType != "pie" && newEChartType != "scatter" && newEChartType != "barline" && newEChartType != "ranktable") {
        copyArray.push('yySetting.dataField.dimensionSub');
      }
      if (newEChartType != "pie" && newEChartType != "scatter" && newEChartType != "ranktable") {
        copyArray.push('eChartSetting.xAxis.axisLabel.rotate');
      }
      if (newEChartType != "barline" && oldEChartType != "barline" && newEChartType != "ranktable") {
        copyArray.push('yySetting.dataField.measure');
      }
      copyArray.push('yySetting.orderInfo.orderField');
      copyArray.push('yySetting.orderInfo.orderBy');

      if (newEChartType != "pie" && newEChartType != "scatter") {
        copyArray.push('yySetting.orderInfo.bUseDimensionXRows');
      }
      copyArray.push('yySetting.orderInfo.dimensionXRows');

      if (newEChartType != "pie" && newEChartType != "scatter" && newEChartType != "barline" && newEChartType != "ranktable") {
        copyArray.push('yySetting.orderInfo.dimensionSubRows');
      }
      copyArray.forEach(function (ele, index) {
        if (_.has(oldEChart, ele)) {
          _.set(newEChart, ele, _.get(oldEChart, ele));
        }
      });
    }
    var operate = bAddNewToArr ? "add" : "mod";
    dispatch((0, _util.genAction)('PLATFORM_UI_EChartSetting_SetChartConfig', { billnum: billnum, config: newEChart, bClose: false, chartKey: chartKey, operate: operate }));
  };
}
function eChartSetting_CancelChartConfig(billnum, chart_Backup, chartKey, bAdd) {
  return function (dispatch, getState) {
    var operate = bAdd ? "del" : "mod";
    dispatch((0, _util.genAction)('PLATFORM_UI_EChartSetting_SetChartConfig', { billnum: billnum, config: chart_Backup, bClose: true, chartKey: chartKey, operate: operate }));
  };
}

function eChartSetting_RemoveConfig(billnum, chartKey) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_EChartSetting_SetChartConfig', { billnum: billnum, chartKey: chartKey, operate: "del" }));
  };
}

function eChartSetting_SetEChartConfigValue(billnum, chartKey, fieldPath, fieldValue) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_EChartSetting_SetEChartConfigValue', { billnum: billnum, chartKey: chartKey, fieldPath: fieldPath, fieldValue: fieldValue }));
  };
}
function eChartSetting_DimensionXFieldsChecked(billnum, chartKey, bCheck, ele) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_EChartSetting_DimensionXFieldsChecked', { billnum: billnum, chartKey: chartKey, bCheck: bCheck, ele: ele }));
  };
}
function eChartSetting_DimensionSubFieldsChecked(billnum, chartKey, bCheck, ele) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_EChartSetting_DimensionSubFieldsChecked', { billnum: billnum, chartKey: chartKey, bCheck: bCheck, ele: ele }));
  };
}
function eChartSetting_MeasureFieldsChecked(billnum, chartKey, bCheck, ele) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_EChartSetting_MeasureFieldsChecked', { billnum: billnum, chartKey: chartKey, bCheck: bCheck, ele: ele }));
  };
}
function eChartSetting_MeasureFieldsValueChanged(billnum, chartKey, valueField, fieldname, fieldValue) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_EChartSetting_MeasureFieldsValueChanged', { billnum: billnum, chartKey: chartKey, valueField: valueField, fieldname: fieldname, fieldValue: fieldValue }));
  };
}
function eChartSetting_ReturnNothing() {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_GroupCondition_ReturnNothing'));
  };
}