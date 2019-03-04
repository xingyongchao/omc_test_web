import Immutable from 'immutable';
import { genAction, proxy } from '../helpers/util';
import * as  eChartProxy from '../components/echart/eChartProxy';
import * as  eChartCommon from '../components/echart/eChartCommon';
const $$initialState = Immutable.fromJS({
  "reduxTemplate": {
    billnum: '',//rm_saleanalysis
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
      isCrossTable: true,// true 分组  false 交叉
      focusedGroupType: 0,
      isDefault: false,
      keyWord: "",
      bEdit: false,// true 编辑  false 新增
      bDisplayCrossPoint: false,//显示交叉点横向汇总
      isDisplayZero: false,
      isPc: true,
      isMobile: false,
      dataSource_Selected: [],
      dataSource_UnSelected: [],
      metaData: {},
      columnDefineInfo:
        {
          bShowDefine: false,
          itemEle: {},
          defineData: {}
        }
    },
    eChart:
      {

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

    eChartTemplate:
      {
        displayType: 1,/// 1 单表 2 单图 3 多图+表
        layOutConfig: {// 多图+表时的布局，目前只支持上1图下1表
          rows: [
            [
              {
                colspan: 12,
                widgetType: "chart",
                widgetValue: "chart1"
              }
            ],
            [
              {
                colspan: 12,
                widgetType: "rpt"
              }
            ]
          ]
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

export default ($$state = $$initialState, action) => {
  let $state = $$state.toJS();
  switch (action.type) {
    case 'PLATFORM_UI_GroupCondition_initValue':
      {
        let viewid = action.payload.viewid;
        let billnum = action.payload.billnum;
        let billnum_viewid = billnum;
        if (!!viewid)
          billnum_viewid = billnum + "_" + viewid;
        if ($state[billnum_viewid])
          delete $state[billnum_viewid];
        let ele = deepCopy($state["reduxTemplate"]);
        ele = Object.assign(ele, action.payload);
        $state[billnum_viewid] = ele;
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_SaveCondition':
      {
        let billnum = action.payload.billnum;
        let groupSchemaId = action.payload.groupSchemaId;
        $state[billnum] = Object.assign($state[billnum], action.payload)
        if (action.payload.bShowCard === false)
          $state[billnum].editCondition.columnDefineInfo.bShowDefine = false;
        $state[billnum].refreshGroupSchemaId = groupSchemaId;
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_SetValue':
      {
        let billnum = action.payload.billnum;
        $state[billnum] = Object.assign($state[billnum], action.payload)
        if (action.payload.bShowCard === false)
          $state[billnum].editCondition.columnDefineInfo.bShowDefine = false;
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_EditCondition_SetValue':
      {
        let billnum = action.payload.billnum;
        $state[billnum].editCondition = Object.assign($state[billnum].editCondition, action.payload)
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_ConditiOnTextMouseEnter':
      {
        let billnum = action.payload.billnum;
        if (action.payload.bEnter == true)
          $state[billnum].textMouseEnterId = action.payload.id;
        else
          $state[billnum].textMouseEnterId = -1;
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_ConditiOnMouseEnter':
      {
        let billnum = action.payload.billnum;
        let conditionList = $state[billnum].conditionList;
        if (conditionList && conditionList.length > 0) {
          conditionList.forEach(function (ele, index) {
            if (ele.id == action.payload.id)
              ele.isMouseEnter = action.payload.bEnter;
          });
        }
        return Immutable.fromJS($state);
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
        let billnum = action.payload.billnum;
        let conditionList = $state[billnum].conditionList;
        $state[billnum].currentId = "";
        $state[billnum].currentName = "";
        if (conditionList && conditionList.length > 0) {
          conditionList.forEach(function (element, index) {
            if (element.id == action.payload.id) {
              $state[billnum].currentId = element.id;
              $state[billnum].currentName = element.name;
              $state[billnum].bShowList = false;
            }
            else {
            }
          });
        }
        return Immutable.fromJS($state);

      }
    case 'PLATFORM_UI_GroupCondition_EditCondition':
      {
        let billnum = action.payload.condition.billnum;
        $state[billnum].bShowCard = true;
        $state[billnum].bShowList = false;
        $state[billnum].editCondition.bEdit = true;
        $state[billnum].editCondition = Object.assign($state[billnum].editCondition, action.payload.condition)

        let chart = action.payload.chart;
        if (_.isEmpty(chart) == true || (chart.displayType == 1 && _.isEmpty(chart.eChartConfig) == true)) {
          $state[billnum].eChart = _.cloneDeep($state[billnum].eChartTemplate);
        }
        else {
          $state[billnum].eChart.displayType = chart.displayType;
          $state[billnum].eChart.layOutConfig = chart.layOutConfig;
          $state[billnum].eChart.eChartConfig = chart.eChartConfig;
          $state[billnum].eChart.errors = {};
        }
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_AddCondition':
      {
        let billnum = action.payload.condition.billnum;
        $state[billnum].bShowCard = true;
        $state[billnum].bShowList = false;
        $state[billnum].editCondition.bEdit = false;
        $state[billnum].editCondition = Object.assign($state[billnum].editCondition, action.payload.condition);
        $state[billnum].eChart = _.cloneDeep($state[billnum].eChartTemplate);
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_EditCondition_SelectedKey':
      {
        let billnum = action.payload.billnum;
        let groupType = action.payload.groupType;
        let selectedKey = action.payload.selectedKey;
        let bSelected = action.payload.bSelected;
        let bSelectedItems = action.payload.bSelectedItems;
        if (bSelectedItems)
          $state[billnum].editCondition.dataSource_Selected.forEach(function (ele, index) {
            if (selectedKey == ele.fieldname && ele.groupType == groupType) {
              ele.bSelected = bSelected;
              $state[billnum].editCondition.focusedGroupType = ele.groupType;
            }
          })
        else
          $state[billnum].editCondition.dataSource_UnSelected.forEach(function (ele, index) {
            if (selectedKey == ele.fieldname) {
              ele.bSelected = bSelected;
            }
          })

        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_EditCondition_MoveItems':
      {
        let billnum = action.payload.billnum;
        let bToRight = action.payload.bToRight;
        let isCrossTable = $state[billnum].editCondition.isCrossTable;
        let focusedGroupType = $state[billnum].editCondition.focusedGroupType;
        if (bToRight) {
          if (isCrossTable == true && focusedGroupType == 1000) {
            let tmpArray = $state[billnum].editCondition.dataSource_Selected;
            if (tmpArray.length > 0)
              for (var i = tmpArray.length - 1; i >= 0; i--) {
                let ele = tmpArray[i];
                if (ele.groupType == 1) {
                  tmpArray.splice(i, 1);
                }
              }
            let bInserted = false;
            $state[billnum].editCondition.dataSource_UnSelected.forEach(function (ele, index) {
              if (ele.bSelected) {
                ele.bSelected = false;
                if (bInserted == false) {
                  let ele2 = deepCopy(ele);
                  ele2.groupType = focusedGroupType;
                  $state[billnum].editCondition.dataSource_Selected.push(ele2);
                  bInserted = true;
                }
              }
            })

          }
          else {
            $state[billnum].editCondition.dataSource_UnSelected.forEach(function (ele, index) {
              if (ele.bSelected) {
                ele.bSelected = false;
                let ele2 = deepCopy(ele);
                if (isCrossTable) {
                  ele2.groupType = focusedGroupType;
                }
                else {
                  ele2.groupType = focusedGroupType
                }
                $state[billnum].editCondition.dataSource_Selected.push(ele2);
              }
            })
          }
        }
        else {
          let tmpArray = $state[billnum].editCondition.dataSource_Selected;
          for (var i = tmpArray.length - 1; i >= 0; i--) {
            if (tmpArray[i].bSelected && tmpArray[i].groupType == focusedGroupType) {
              tmpArray.splice(i, 1);
            }
          }
        }
        return Immutable.fromJS($state);
      }

    case 'PLATFORM_UI_GroupCondition_EditCondition_ShowColumnDefine':
      {
        // billnum, bShowDefine,defineData: json.data
        let billnum = action.payload.billnum;
        let columnDefineInfo = $state[billnum].editCondition.columnDefineInfo;
        if (action.payload.bShowDefine) {
          let defineData = action.payload.defineData
          if (defineData && defineData.length > 0) {
            columnDefineInfo.bShowDefine = true;
            columnDefineInfo.itemEle = action.payload.itemEle;
            columnDefineInfo.defineData = defineData;
          }
          else {
            cb.utils.alert("没有可设置信息。");
            columnDefineInfo.bShowDefine = false;
          }
        }
        else {
          columnDefineInfo.bShowDefine = false;
        }
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_EditCondition_SetColumnDefineValue':
      {
        //groupType, fieldname, defineName, value
        let billnum = action.payload.billnum;
        let columnDefineInfo = $state[billnum].editCondition.columnDefineInfo;
        let defineData = columnDefineInfo.defineData;
        defineData && defineData.length && defineData.forEach(function (ele) {
          if (ele.name == action.payload.defineName)
            ele.value = action.payload.value;
        });
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_EditCondition_SaveColumnDefine':
      {
        let billnum = action.payload.billnum;
        let columnDefineInfo = $state[billnum].editCondition.columnDefineInfo;
        let dataSource_Selected = $state[billnum].editCondition.dataSource_Selected;
        let defineData = columnDefineInfo.defineData;
        let itemEle = columnDefineInfo.itemEle;
        let cColumnDefineMemo = "";
        columnDefineInfo.bShowDefine = false;
        if (action.payload.bSave) {
          let columnDefine = {};
          defineData && defineData.length && defineData.forEach(function (ele) {
            columnDefine[ele.name] = ele.value;
            if (ele.controltype == "select") {
              let enumArray2 = JSON.parse(ele.enumArray);
              enumArray2.forEach((tmp) => {
                if (tmp.key == ele.value)
                  cColumnDefineMemo = (cColumnDefineMemo == "" ? tmp.value : cColumnDefineMemo + "/" + tmp.value);
              })
            }
            else if (ele.controltype == "checkbox" && ele.value == "true") {
              cColumnDefineMemo = (cColumnDefineMemo == "" ? ele.caption : cColumnDefineMemo + "/" + ele.caption);;
            }
          })
          dataSource_Selected.forEach(function (ele) {
            if (ele.groupType == itemEle.groupType && ele.fieldname == itemEle.fieldname) {
              ele.columnDefine = JSON.stringify(columnDefine);
              ele.cColumnDefineMemo = cColumnDefineMemo;
            }
          })
        }

        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_GroupCondition_ReturnNothing':
      return $$state;

    case 'PLATFORM_UI_EChartSetting_Show':
      {
        $state[action.payload.billnum].bShowEChartSetting = action.payload.bShow;
        if (action.payload.bShow == true) {
          $state[action.payload.billnum].showEChartKey = action.payload.chartKey;
          if (!!action.payload.chartKey)
            $state[action.payload.billnum].bShowEChartSetting_Add = false;
          else
            $state[action.payload.billnum].bShowEChartSetting_Add = true;
        }
        else {
          $state[action.payload.billnum].eChart.errors = {};
          $state[action.payload.billnum].showEChartKey = "";
        }
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_SetDisplayType':
      {
        let billnum = action.payload.billnum;
        let eChart = $state[billnum].eChart;
        eChart.displayType = action.payload.value;
        return Immutable.fromJS($state);
      }

    case 'PLATFORM_UI_EChartSetting_SetSubChartColNum':
      {
        let billnum = action.payload.billnum;
        let eChart = $state[billnum].eChart;
        // eChart.eChartConfig.subChartColNum = action.payload.value;
        _.set(eChart, "eChartConfig.subChartColNum", action.payload.value);
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_ReSetChartConfig':
      {
        let billnum = action.payload.billnum;
        let eChart = $state[billnum].eChart;
        eChart.eChartConfig = {
          subChartColNum: 1,
          subChartConfigArr: []
        };
        eChart.errors = {};
        if (action.payload.bClose == true) {
          $state[billnum].bShowEChartSetting = false;
          $state[billnum].showEChartKey = "";
        }
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_SetChartConfig':
      {
        let billnum = action.payload.billnum;
        let eChart = $state[billnum].eChart;
        let config = action.payload.config;
        let chartKey = action.payload.chartKey;
        let bClose = action.payload.bClose || false;
        // eChart.eChartConfig[config.chartKey] = config;
        eChartCommon.subConfigArray_Operate(eChart, chartKey, config || {}, action.payload.operate);
        eChart.errors = {};
        if (bClose == true) {
          $state[billnum].bShowEChartSetting = false;
          $state[billnum].showEChartKey = "";
        }
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_Errors':
      {
        let billnum = action.payload.billnum;
        let chartKey = action.payload.chartKey;
        let errors = action.payload.errors;
        _.set($state[billnum].eChart, "errors", errors);
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_SetEChartConfigValue':
      {
        let billnum = action.payload.billnum;
        let chartKey = action.payload.chartKey;
        let fieldPath = action.payload.fieldPath;
        let fieldValue = action.payload.fieldValue;
        let eChart = $state[billnum].eChart;
        // let chart = eChart.eChartConfig[chartKey];
        let chart = eChartCommon.subConfig_Get(eChart, chartKey);
        // let yySetting = $state[billnum].eChart.yySetting;
        // let eChartSetting = $state[billnum].eChart.eChartSetting;
        // if (fieldName == "eChartSetting.title.text")
        //   eChartSetting.title.text = fieldValue;
        // if (fieldName == "yySetting.type")
        //   yySetting.type = fieldValue;
        let oldValue = _.get(chart, fieldPath);
        _.set(chart, fieldPath, fieldValue);

        _.endsWith(fieldPath, "bUseDimensionXRows")
        {
          eChart.errors["dimensionXRows"] = undefined;
          eChart.errors["dimensionSubRows"] = undefined;
        }
        let checkArray = ["dimensionXRows", "dimensionSubRows", "longitudeField", "latitudeField"];
        checkArray.forEach(function (ele, index) {
          if (_.endsWith(fieldPath, ele)) {
            eChart.errors[ele] = undefined;
            if (inputCheck(eChart, chartKey, ele == "dimensionSubRows" ? "dimensionXRows" : ele) == false) {
              _.set(chart, fieldPath, oldValue);
            }
          }
        });
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_DimensionXFieldsChecked':
      {
        let billnum = action.payload.billnum;
        let chartKey = action.payload.chartKey;
        let bCheck = action.payload.bCheck;
        let ele = action.payload.ele;
        let eChart = $state[billnum].eChart;
        // let chart = $state[billnum].eChart.eChartConfig[chartKey];
        let chart = eChartCommon.subConfig_Get($state[billnum].eChart, chartKey)
        let dimensions = chart.yySetting.dataField.dimensionX;
        for (var i = 0; i < dimensions.length; i++) {
          let item = dimensions[i];
          if (item.nameField == ele.nameField)
            dimensions.splice(i, 1);
        }
        eChart.errors.dimensionX = "";
        if (bCheck) {
          dimensions.push(ele);
          if (inputCheck(eChart, chartKey, "dimensionX") == false) {
            dimensions.pop();
          }
        }
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_DimensionSubFieldsChecked':
      {
        let billnum = action.payload.billnum;
        let chartKey = action.payload.chartKey;
        let bCheck = action.payload.bCheck;
        let ele = action.payload.ele;
        let eChart = $state[billnum].eChart;
        // let chart = $state[billnum].eChart.eChartConfig[chartKey];
        let chart = eChartCommon.subConfig_Get($state[billnum].eChart, chartKey)
        let dimensions = chart.yySetting.dataField.dimensionSub;
        for (var i = dimensions.length - 1; i >= 0; i--) {
          // let item = dimensions[i];
          // if (item.nameField == ele.nameField)
          dimensions.splice(i, 1);
        }
        if (bCheck) {
          dimensions.push(ele);
        }
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_MeasureFieldsValueChanged':
      {
        // billnum, valueField, fieldname, fieldValue
        let billnum = action.payload.billnum;
        let chartKey = action.payload.chartKey;
        let eChart = $state[billnum].eChart;
        // let chart = $state[billnum].eChart.eChartConfig[chartKey];
        let chart = eChartCommon.subConfig_Get($state[billnum].eChart, chartKey)
        let measure = chart.yySetting.dataField.measure;
        let measureEle = _.find(measure, function (o) { return o.valueField == action.payload.valueField; });
        if (measureEle) {
          measureEle[action.payload.fieldname] = action.payload.fieldValue;
        }
        return Immutable.fromJS($state);
      }
    case 'PLATFORM_UI_EChartSetting_MeasureFieldsChecked':
      {
        let billnum = action.payload.billnum;
        let chartKey = action.payload.chartKey;
        let bCheck = action.payload.bCheck;
        let ele = action.payload.ele;
        let eChart = $state[billnum].eChart;
        // let chart = eChart.eChartConfig[chartKey];
        let chart = eChartCommon.subConfig_Get(eChart, chartKey);
        let dimensions = chart.yySetting.dataField.measure;
        let type = chart.yySetting.type;
        for (var i = dimensions.length - 1; i >= 0; i--) {
          let item = dimensions[i];
          if (item.valueField == ele.valueField || type == "pie" || type == "scatter") {
            dimensions.splice(i, 1);
            if (item.valueField == chart.yySetting.orderInfo.orderField)
              chart.yySetting.orderInfo.orderField = "";
          }
        }
        // if (eChart.errors)
        eChart.errors.measure = "";
        eChart.errors.measure0 = "";
        eChart.errors.measure1 = "";
        if (bCheck) {
          dimensions.push(ele);
          // let errors = saveCheck(eChart, chartKey);
          //  if(type=="barline"){}
          //  else
          let bPoped = false;

          if (type != "barline") {
            if (inputCheck(eChart, chartKey, "measure") == false) {
              dimensions.pop();
              bPoped = true;
              // eChart.errors.measure = errors.measure;
            }
          }
          if (type == "barline") {

            if (inputCheck(eChart, chartKey, "measure" + ele.yAxisIndex.toString()) == false) {
              dimensions.pop();
              bPoped = true;
              // eChart.errors.measure = errors.measure;
            }

          }
          if (bPoped == false) {
            if (chart.yySetting.orderInfo.orderField == "") {
              chart.yySetting.orderInfo.orderField = ele.valueField;
            }
            if (type == "pie") {
              chart.eChartSetting.series[0].name = ele.caption;
            }
            else if (type == "scatter") {
              chart.eChartSetting.series[0].name = ele.caption;
              chart.eChartSetting.series[1].name = ele.caption;
            }
          }
        }
        return Immutable.fromJS($state);
      }
    default:
      return $$state;
  }
}

function inputCheck(eChart, chartKey, errKey) {
  let errors = saveCheck(eChart, chartKey);
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
export function conditiOnMouseEnter(billnum, id, bEnter) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_GroupCondition_ConditiOnMouseEnter', { billnum, id, bEnter }));

  }
}
export function conditiOnTextMouseEnter(billnum, id, bEnter) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_GroupCondition_ConditiOnTextMouseEnter', { billnum, id, bEnter }));

  }
}

export function setDefaultCondition(billnum, id, viewModel) {
  return function (dispatch, getState) {
    // dispatch(genAction('PLATFORM_UI_GroupCondition_setDefaultCondition', { id }));

    let conditionList = getState().groupCondition.toJS()[billnum].conditionList;
    let params = { id: -1 };//Json groupSchema
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
      let callback = (json) => {
        if (json.code === 200) {
          dispatch(refreshConditionListValue(billnum, viewModel));
        }
        if (json.code !== 200) {
          console.log("保存分组条件失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
          dispatch(genAction('PLATFORM_UI_GroupCondition_ReturnNothing'));
        }
      }
      eChartProxy.doProxy(eChartProxy.url.saveGroupSchema, 'POST', params, callback);
    }
    else {
      dispatch(genAction('PLATFORM_UI_GroupCondition_ReturnNothing'));
    }
  }
}

export function deleteCondition(billnum, id, viewModel) {
  return function (dispatch, getState) {

    let params = {};//Json groupSchema
    params.groupSchemaId = id;
    let callback = (json) => {
      if (json.code === 200) {
        dispatch(refreshConditionListValue(billnum, viewModel));
      }
      else if (json.code === 999) {
        cb.utils.alert(json.message);
        dispatch(genAction('PLATFORM_UI_GroupCondition_ReturnNothing'));
      }
      else if (json.code !== 200) {
        console.log("删除分组条件失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
        dispatch(genAction('PLATFORM_UI_GroupCondition_ReturnNothing'));
      }
    }
    eChartProxy.doProxy(eChartProxy.url.deleteGroupSchema, 'GET', params, callback);
  }
}

export function chooseCondition(billnum, id) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_GroupCondition_chooseCondition', { billnum, id }));
    const userId = cb.rest.AppContext.user.id;
    const localDataKey = `${billnum}_${userId}`;
    let localData;
    try {
      localData = JSON.parse(localStorage.getItem(localDataKey));
    } catch (e) {

    }
    if (!localData)
      localData = {};
    localData.groupSchemaId = id;
    localStorage.setItem(localDataKey, JSON.stringify(localData));
  }
}
//刷新
export function refreshConditionListValue(billnum, viewModel) {
  return function (dispatch, getState) {
    // let billnum = getState().groupCondition.toJS().billnum;

    let proxyParams = { billnum: billnum };
    let callback = (json) => {
      if (json.code === 200) {
        let params = {};
        let conditionList = json.data;
        params.conditionList = conditionList;
        params["billnum"] = billnum;
        dispatch(genAction('PLATFORM_UI_GroupCondition_SetValue', params));
      }
      if (json.code !== 200) {
        console.log("获取分组条件失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
      }
    }
    eChartProxy.doProxy(eChartProxy.url.getGroupSchema, 'GET', proxyParams, callback);
  }
}

/*初始化*/
export function initConditionListValue(billnum, params, viewModel) {
  return function (dispatch, getState) {
    let proxyParams = { billnum: billnum };

    let viewid = _.get(viewModel.getParams(), 'query.viewid');
    if (viewid) proxyParams.viewid = viewid;

    let callback = (json) => {
      if (json.code === 200) {
        let conditionList = json.data;
        let defaultId = -1;
        let defaultName = "";
        if (conditionList && conditionList.length > 0) {
          conditionList.forEach(function (ele, index) {
            if (defaultId == -1 || ele.isDefault) {
              defaultId = ele.id;
              defaultName = ele.name;
            }
            ele.isMouseEnter = false;
          });
          const userId = cb.rest.AppContext.user.id;
          try {
            const localData = JSON.parse(localStorage.getItem(`${billnum}_${userId}`));
            const localDefaultId = localData && localData.groupSchemaId;
            if (localDefaultId) {
              const localDefaultGroupSchema = conditionList.find(item => {
                return item.id == localDefaultId;
              });
              if (localDefaultGroupSchema) {
                defaultId = localDefaultGroupSchema.id;
                defaultName = localDefaultGroupSchema.name;
              }
            }
          } catch (e) {

          }
          if (viewModel && defaultId > -1) {
            viewModel.biz.do("switchGroupSchema", viewModel, { groupSchemaId: defaultId, groupSchemaName: defaultName });
            let tmp = [];
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
        dispatch(genAction('PLATFORM_UI_GroupCondition_initValue', params));
        if (!viewid)
          dispatch(getReportGroupAuth(billnum));
      }
      if (json.code !== 200) {
        console.log("获取分组条件失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
        viewModel.biz.do("switchGroupSchema", viewModel, null);
      }
    }
    eChartProxy.doProxy(eChartProxy.url.getGroupSchema, 'GET', proxyParams, callback);
  }
}

export function setValue(billnum, params) {
  return function (dispatch, getState) {
    params["billnum"] = billnum;
    dispatch(genAction('PLATFORM_UI_GroupCondition_SetValue', params));
  }
}
export function getReportGroupAuth(billnum) {
  return function (dispatch, getState) {
    let params = {};
    let callback = (json) => {
      if (json.code === 200) {
        // dispatch(genAction('PLATFORM_UI_GroupCondition_SaveCondition', { billnum, groupSchemaId: editCondition.id, bShowCard: false }));
        dispatch(genAction('PLATFORM_UI_GroupCondition_SetValue', {
          billnum: billnum,
          bAuthAdd: json.data.groupschemaAdd,
          bAuthDel: json.data.groupschemaDelete,
          bAuthEdit: json.data.groupschemaSave
        }));
      }
      else {
        console.log("获取分组权限信息失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
      }
    }
    eChartProxy.doProxy(eChartProxy.url.checkGroupAuth, 'GET', params, callback);
  }
}

export function showList(billnum, bShowList) {
  // url: "/user/operation/batchcheck/groupschemaAdd,groupschemaSave,groupschemaDelete",
  // method: 'GET'
  return function (dispatch, getState) {

    dispatch(genAction('PLATFORM_UI_GroupCondition_SetValue', { billnum: billnum, bShowList: bShowList }));
  }
}

export function editConditionInfo(billnum, id) {
  return function (dispatch, getState) {
    let params = { billnum: billnum };

    if (id != "") {
      params.groupSchemaId = id;
    }
    let callback = (json) => {
      if (json.code === 200) {

        let metaData = json.data;
        let dataSource_Selected = metaData.selected ? metaData.selected : [];
        let dataSource_UnSelected = metaData.unselected ? metaData.unselected : [];
        // let groups = metaData.groups;
        let name = metaData.name;
        let isCrossTable = metaData.isCrossTable;
        let isDefault = metaData.isDefault;
        let isDisplayZero = metaData.isDisplayZero ? metaData.isDisplayZero : false;
        let isPc = metaData.hasOwnProperty("isPc") ? metaData.isPc : true;
        let isMobile = metaData.hasOwnProperty("isMobile") ? metaData.isMobile : false;

        // groups.forEach(function (ele, index) {
        //   dataSource_Selected.push({
        //     key: ele.alias.toString(),
        //     title: ele.caption,
        //     description: ele.caption,
        //     bSelected: ele.bSelected ? ele.bSelected : false,
        //     bTarget: ele.bTarget ? ele.bTarget : false,
        //   });

        // });
        let condition = { billnum, id, name, isCrossTable, isDefault, isMobile, isPc, isDisplayZero, metaData, dataSource_Selected, dataSource_UnSelected };
        if (id) {
          condition.focusedGroupType = 0;
          condition.keyWord = "";

          let chart = {};
          if (metaData.displayStyle) {
            chart.displayType = metaData.displayStyle;
            chart.layOutConfig = JSON.parse(metaData.pageLayout);
            let eChartConfig = JSON.parse(metaData.chartConfig);
            if (eChartConfig && _.isEmpty(eChartConfig) == false)
              eChartConfig = eChartCommon.upgradeConfig_ForEChartArr(eChartConfig);
            chart.eChartConfig = eChartConfig;
          }

          dispatch(genAction('PLATFORM_UI_GroupCondition_EditCondition', { condition, chart }));
        }
        else {
          condition.isCrossTable = false;
          condition.isDefault = false;
          condition.focusedGroupType = 0;
          condition.keyWord = "";
          dispatch(genAction('PLATFORM_UI_GroupCondition_AddCondition', { condition }));
        }
      }
      if (json.code !== 200) {
        console.log("获取分组条件失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
        dispatch(genAction('PLATFORM_UI_GroupCondition_ReturnNothing'));
      }
    }
    eChartProxy.doProxy(eChartProxy.url.getGroupItems, 'GET', params, callback);
  }
}


export function cancelEdit(billnum) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_GroupCondition_SetValue', { billnum, bShowCard: false }));
  }
}

export function saveCondition(billnum, viewModel) {
  return function (dispatch, getState) {
    let editCondition = getState().groupCondition.toJS()[billnum].editCondition;
    let eChart = getState().groupCondition.toJS()[billnum].eChart;

    let params = {};//Json groupSchema
    params.billnum = billnum;
    if (editCondition.bEdit)
      params.id = editCondition.id;
    params.name = editCondition.name;
    params.name = eChartCommon.checkTempName(params.name);
    params.isCrossTable = editCondition.isCrossTable;
    params.isDisplayZero = editCondition.isDisplayZero;
    if (!!params.isCrossTable)
      params.isMobile = false;
    else
      params.isMobile = editCondition.isMobile;
    params.isPc = editCondition.isPc;
    params.isDefault = editCondition.isDefault;
    params.selected = editCondition.dataSource_Selected;//JSON.parse
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

    let callback = (json) => {
      if (json.code === 200) {
        dispatch(genAction('PLATFORM_UI_GroupCondition_SaveCondition', { billnum, groupSchemaId: editCondition.id, bShowCard: false }));
        dispatch(refreshConditionListValue(billnum, viewModel));
      }
      if (json.code !== 200) {
        console.log("保存分组条件失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
        dispatch(genAction('PLATFORM_UI_GroupCondition_ReturnNothing'));
      }
    }
    eChartProxy.doProxy(eChartProxy.url.saveGroupSchema, 'POST', params, callback);
  }
}


export function editCondition_SetValue(billnum, fieldName, fieldValue) {
  return function (dispatch, getState) {
    let param = {};
    param.billnum = billnum;
    param[fieldName] = fieldValue;
    dispatch(genAction('PLATFORM_UI_GroupCondition_EditCondition_SetValue', param));
  }
}

export function editCondition_SetIsCrossTable(billnum, fieldName, fieldValue) {
  return function (dispatch, getState) {
    let param = {};
    param.billnum = billnum;
    param[fieldName] = fieldValue;
    param["dataSource_Selected"] = [];
    param["isPc"] = true;
    param["isMobile"] = false;
    dispatch(genAction('PLATFORM_UI_GroupCondition_EditCondition_SetValue', param));
    dispatch(genAction('PLATFORM_UI_EChartSetting_ReSetChartConfig', { billnum, bClose: true }));
  }
}


export function editCondition_SelectedKey(billnum, groupType, selectedKey, bSelected, bSelectedItems) {
  return function (dispatch, getState) {
    let param = { billnum, groupType, selectedKey, bSelected, bSelectedItems };
    dispatch(genAction('PLATFORM_UI_GroupCondition_EditCondition_SelectedKey', param));
  }
}

export function getArrayFields(obj, arrPath, fieldName) {
  let arr = _.get(obj, arrPath);
  let arrReturn = [];
  let str = "";
  if (arr && arr.length > 0) {
    arr.forEach(item => {
      str = item[fieldName];
      if (arrReturn.indexOf(str) < 0)
        arrReturn.push(str);
    });
  }
  return arrReturn;
}
export function editCondition_MoveItems(billnum, bToRight) {
  return function (dispatch, getState) {
    let editCondition = getState().groupCondition.toJS()[billnum].editCondition;
    let eChart = getState().groupCondition.toJS()[billnum].eChart;

    if (bToRight == false && (eChart.displayType == 2 || eChart.displayType == 3)) {
      let config = eChart.eChartConfig["chart1"];
      if (config) {
        let str = "";
        let dimensionXFields = getArrayFields(config, "yySetting.dataField.dimensionX", "nameField");
        let dimensionSubFields = getArrayFields(config, "yySetting.dataField.dimensionSub", "nameField");
        let measureFields = getArrayFields(config, "yySetting.dataField.measure", "valueField");
        editCondition.dataSource_Selected.forEach(function (ele, index) {
          if (ele.bSelected) {
            if (dimensionXFields.indexOf(ele.fieldname) > -1 || dimensionSubFields.indexOf(ele.fieldname) > -1 || measureFields.indexOf(ele.fieldname) > -1) {
              str = str + ele.caption + " ";
            }
          }
        });
        if (str != "") {
          cb.utils.alert(str + "已经在图形报表中使用，不能删除。");
          dispatch(genAction('PLATFORM_UI_GroupCondition_ReturnNothing'));
          return;
        }
      }
    }
    dispatch(genAction('PLATFORM_UI_GroupCondition_EditCondition_MoveItems', { billnum, bToRight }));
  }
}

export function editCondition_ShowColumnDefine(billnum, bShowDefine, itemEle) {
  return function (dispatch, getState) {
    // {"billnum":"rm_salereceipts_report","fieldname":"vouchdate","groupType":0,"columnDefine":"{\"function\":\"fn_formatdateyyyymmdd\"}","caption":"日期","sumType":"fn_formatdateyyyymmdd"}
    let params = itemEle;//Json groupSchema
    params.billnum = billnum;
    if (bShowDefine) {
      let callback = (json) => {
        if (json.code === 200) {
          dispatch(genAction('PLATFORM_UI_GroupCondition_EditCondition_ShowColumnDefine', { billnum, bShowDefine, itemEle, defineData: json.data }));
        }
        if (json.code !== 200) {
          console.log("获取列定义失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
          dispatch(genAction('PLATFORM_UI_GroupCondition_ReturnNothing'));
        }
      }
      eChartProxy.doProxy(eChartProxy.url.columnDefine, 'POST', params, callback);
    }
    else {
      dispatch(genAction('PLATFORM_UI_GroupCondition_EditCondition_ShowColumnDefine', { billnum, bShowDefine }));
    }
  }
}

export function setColumnDefineValue(billnum, groupType, fieldname, defineName, value) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_GroupCondition_EditCondition_SetColumnDefineValue', { billnum, groupType, fieldname, defineName, value }));
  }
}

export function editCondition_SaveColumnDefine(billnum, bSave) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_GroupCondition_EditCondition_SaveColumnDefine', { billnum, bSave }));
  }
}
export function eChartSetting_EChartSettingOK(billnum, chartKey) {
  return function (dispatch, getState) {
    let eChart = getState().groupCondition.toJS()[billnum].eChart;
    let errors = saveCheck(eChart, chartKey);
    if (_.isEmpty(errors) == true) {
      dispatch(genAction('PLATFORM_UI_EChartSetting_Show', { billnum, bShow: false, chartKey }));
    }
    else {
      dispatch(genAction('PLATFORM_UI_EChartSetting_Errors', { billnum, chartKey, errors }));
    }
  }
}

function saveCheck(eChart, chartKey) {
  let errors = {};
  if (eChart.displayType == 2 || eChart.displayType == 3) {
    // let chart = eChart.eChartConfig[chartKey];
    let chart = eChartCommon.subConfig_Get(eChart, chartKey);
    let yySetting = chart.yySetting;
    let eChartSetting = chart.eChartSetting;
    let title = "";
    if (yySetting.type == "ranktable")
      title = _.get(yySetting, "title.text");
    else
      title = _.get(eChartSetting, "title.text");
    let dimensionX = chart.yySetting.dataField.dimensionX;
    let dimensionSub = chart.yySetting.dataField.dimensionSub;
    let measure = chart.yySetting.dataField.measure;
    let rotate = _.get(eChartSetting, "xAxis.axisLabel.rotate");
    let bUseDimensionXRows = chart.yySetting.orderInfo.bUseDimensionXRows;
    let dimensionXRows = chart.yySetting.orderInfo.dimensionXRows;
    let dimensionSubRows = chart.yySetting.orderInfo.dimensionSubRows;
    let orderField = chart.yySetting.orderInfo.orderField;
    let LngAndLat = chart.yySetting.dataField.LngAndLat;
    if (_.isEmpty(title) || title.trim() == "")
      errors.title = "标题不可为空";
    if (dimensionX.length < 1 || dimensionX.length > 3)
      errors.dimensionX = "主维度不可为空且最多三项";
    if (dimensionSub.length > 1)
      errors.dimensionSub = "辅维度最多一项";
    if (yySetting.type == "barline") {
      let measure0 = _.filter(measure, function (o) { return o.yAxisIndex == 0; });
      let measure1 = _.filter(measure, function (o) { return o.yAxisIndex == 1; });
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
      if (measure.length < 1 || measure.length > 3)
        errors.measure = "展示指标必选，且最多3项";
    }
    if (yySetting.type == "scatter") {
      if (measure.length < 1 || measure.length > 3)
        errors.measure = "请选择展示指标";
      if (yySetting.regionInfo && yySetting.regionInfo.region) {
        if (yySetting.regionInfo.region != "100000"
          && yySetting.regionInfo.parent != "100000"
          && !eChartCommon.getMapAllCitys(yySetting.regionInfo.region)
        ) {
          errors.map = "当前区域没有地图组件。";
        }
      }
      else {
        errors.map = "请选择地图信息。";
      }
    }
    else if (yySetting.type != "barline") {
      if (measure.length < 1 || measure.length > 5)
        errors.measure = "展示指标必选，且最多5项";
    }
    if (dimensionSub.length > 0 && measure.length > 1)
      errors.measure = "有辅维度存在，展示指标只支持单选";
    if (orderField == "")
      errors.orderField = "请选择排序指标";
    if (yySetting.type == "pie") {
      if (measure.length > 1)
        errors.measure = "饼形图展示指标只支持单选";
      if (yySetting.hasOwnProperty("radius")) {
        if (isNaN(yySetting.radius.radiusInner) || isNaN(yySetting.radius.radiusOuter))
          errors.radiusInner = "内外径请输入0到100的整数，且外径大于内径。";
        let radiusInner = Number(yySetting.radius.radiusInner);
        let radiusOuter = Number(yySetting.radius.radiusOuter);
        if (radiusInner < 0 || radiusOuter > 100 || radiusInner >= radiusOuter) {
          errors.radiusInner = "内外径请输入0到100的整数，且外径大于内径。";
        }
      }
    }
    if (yySetting.type == "scatter") {
      if (measure.length > 1)
        errors.measure = "气泡图展示指标只支持单选";
      if (LngAndLat.longitude.longitudeField == "")
        errors.longitudeField = "经度字段不可为空";
      if (LngAndLat.latitude.latitudeField == "")
        errors.latitudeField = "纬度字段不可为空";
      else if (LngAndLat.longitude.longitudeField == LngAndLat.latitude.latitudeField) {
        errors.longitudeField = "经纬度字段不可相同";
        errors.latitudeField = "经纬度字段不可相同";
      }
    }
    if (yySetting.type == "ranktable") {
      if (
        yySetting.orderInfo.topNum == ""
        || yySetting.orderInfo.topNum.toString().indexOf(".") > -1
        || isNaN(yySetting.orderInfo.topNum)
        || Number(yySetting.orderInfo.topNum) > 999
        || Number(yySetting.orderInfo.topNum) < 1
      ) {
        errors.topNum = "请录入1-999的整数。";
      }
    }
    if (rotate && (Number(rotate) < 0 || Number(rotate) > 60))
      errors.rotate = "显示角度应该在0-60之间";

    if (bUseDimensionXRows && !dimensionXRows) {
      errors.dimensionXRows = "请录入主维度行数。";
    }
    if (yySetting.type !== "scatter" && bUseDimensionXRows && Number(dimensionXRows) > 31)
      errors.dimensionXRows = "主维度行数不可大于31";

    if (yySetting.type == "line") {
      if (!bUseDimensionXRows && Number(dimensionSubRows) > 99)
        errors.dimensionXRows = "辅维度行数不可大于99";
    }
    else {
      if (!bUseDimensionXRows && Number(dimensionSubRows) > 5)
        errors.dimensionXRows = "辅维度行数不可大于5";
    }
  }
  return errors;
}
export function eChartSetting_Show(billnum, bShow, chartKey) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_EChartSetting_Show', { billnum, bShow, chartKey }));
  }
}
export function eChartSetting_SetDisplayType(billnum, value) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_EChartSetting_SetDisplayType', { billnum, value }));
  }
}
export function eChartSetting_SetSubChartColNum(billnum, value) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_EChartSetting_SetSubChartColNum', { billnum, value }));
  }
}


export function eChartSetting_ChooseChart(billnum, configTemplate, chartKey, bAddNewToArr) {
  return function (dispatch, getState) {

    let newEChart = configTemplate;
    let newEChartType = newEChart.yySetting.type;
    let newEChartSubType = newEChart.yySetting.subType;
    // let oldEChart = getState().groupCondition.toJS()[billnum].eChart.eChartConfig[newEChart.chartKey];
    if (bAddNewToArr == false) {
      let oldEChart = eChartCommon.subConfig_Get(getState().groupCondition.toJS()[billnum].eChart, newEChart.chartKey);
      let oldEChartType = oldEChart ? oldEChart.yySetting.type : "";
      let copyArray = [];
      let titleText = _.get(oldEChart, 'eChartSetting.title.text');
      if (
        titleText != "饼形图示例"
        && titleText != "柱形图示例"
        && titleText != "堆叠柱形图示例"
        && titleText != "条形图示例"
        && titleText != "堆叠条形图示例"
        && titleText != "折线图示例"
        && titleText != "曲线图示例"
        && titleText != "气泡图示例"
        && titleText != "柱折图示例"
        && titleText != "排名表示例"
      )
        copyArray.push('eChartSetting.title.text');

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
    let operate = bAddNewToArr ? "add" : "mod";
    dispatch(genAction('PLATFORM_UI_EChartSetting_SetChartConfig', { billnum, config: newEChart, bClose: false, chartKey, operate }));
  }
}
export function eChartSetting_CancelChartConfig(billnum, chart_Backup, chartKey, bAdd) {
  return function (dispatch, getState) {
    let operate = bAdd ? "del" : "mod";
    dispatch(genAction('PLATFORM_UI_EChartSetting_SetChartConfig', { billnum, config: chart_Backup, bClose: true, chartKey, operate }));
  }
}

export function eChartSetting_RemoveConfig(billnum, chartKey) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_EChartSetting_SetChartConfig', { billnum, chartKey, operate: "del" }));
  }
}

export function eChartSetting_SetEChartConfigValue(billnum, chartKey, fieldPath, fieldValue) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_EChartSetting_SetEChartConfigValue', { billnum, chartKey, fieldPath, fieldValue }));
  }
}
export function eChartSetting_DimensionXFieldsChecked(billnum, chartKey, bCheck, ele) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_EChartSetting_DimensionXFieldsChecked', { billnum, chartKey, bCheck, ele }));
  }
}
export function eChartSetting_DimensionSubFieldsChecked(billnum, chartKey, bCheck, ele) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_EChartSetting_DimensionSubFieldsChecked', { billnum, chartKey, bCheck, ele }));
  }
}
export function eChartSetting_MeasureFieldsChecked(billnum, chartKey, bCheck, ele) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_EChartSetting_MeasureFieldsChecked', { billnum, chartKey, bCheck, ele }));
  }
}
export function eChartSetting_MeasureFieldsValueChanged(billnum, chartKey, valueField, fieldname, fieldValue) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_EChartSetting_MeasureFieldsValueChanged', { billnum, chartKey, valueField, fieldname, fieldValue }));
  }
}
export function eChartSetting_ReturnNothing() {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_GroupCondition_ReturnNothing'));
  }
}
