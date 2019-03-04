'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRankTable = getRankTable;

var _eChartDemoData = require('../eChartDemoData');

var eChartDemoData = _interopRequireWildcard(_eChartDemoData);

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _gridMobile = require('../../grid-mobile');

var _gridMobile2 = _interopRequireDefault(_gridMobile);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _row = require('../../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../../basic/col');

var _col2 = _interopRequireDefault(_col);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getRankTable(yySetting, data, isInPanel, panelType, skinConfig) {
  var skinStyle = {};
  var skinStyle2 = {};
  if (!!skinConfig && skinConfig.displaySkin) {
    skinStyle.color = skinConfig.displaySkin.textColor;
    skinStyle2.color = skinConfig.displaySkin.textColor2;
  }
  var bShowValueAfterBarCol = true;
  var dimensionX = yySetting.dataField.dimensionX ? yySetting.dataField.dimensionX : [];
  dimensionX.sort(function (a, b) {
    return a.iLabelOrder - b.iLabelOrder;
  });
  var measure = yySetting.dataField.measure;
  measure.sort(function (a, b) {
    return a.iOrder - b.iOrder;
  });
  var tableCols = [];
  var colorList = eChartCommon.getChartColorArr(100);
  var indexCol = yySetting.indexCol;
  var bAddIndexCol = indexCol.bAddIndexCol ? true : false;
  var orderInfo = yySetting.orderInfo;
  // topNum: 6, //“主维度显示行数”：最多31
  // orderField: "fNetMoney",// “排序指标”：按照哪个指标排序的含义，默认按照展示指标中的第一个。
  // orderBy: "desc",// “排序方式（升序、降序）”：默认降序
  var maxMeasureArr = [];
  measure.forEach(function (ele) {
    if (ele.bShowValueNotBar == false) {
      maxMeasureArr.push({ fieldname: ele.valueField, fieldvalue: 0, bShowValueAfterBar: ele.bShowValueAfterBar ? true : false });
    }
  });
  if (maxMeasureArr.length > 0) {
    maxMeasureArr.forEach(function (eleMeasure) {
      data.forEach(function (eleData) {
        if (isNaN(eleData[eleMeasure.fieldname]) == false) {
          if (Number(eleData[eleMeasure.fieldname]) > Number(eleMeasure.fieldvalue)) eleMeasure.fieldvalue = Number(eleData[eleMeasure.fieldname]);
        }
      });
    });
  };

  if (data.length > 1) {
    if (orderInfo.orderBy == "asc") data.sort(function (a, b) {
      return a[orderInfo.orderField] - b[orderInfo.orderField];
    });else data.sort(function (a, b) {
      return b[orderInfo.orderField] - a[orderInfo.orderField];
    });
  }
  if (isNaN(orderInfo.topNum) == false && data.length > orderInfo.topNum) {
    data = data.slice(0, orderInfo.topNum);
  }
  if (bAddIndexCol) {
    tableCols.push({
      title: _react2.default.createElement(
        'div',
        { style: skinStyle2 },
        indexCol.caption
      ),
      dataIndex: indexCol.key,
      width: isInPanel ? undefined : 40
    });
  }
  dimensionX.forEach(function (ele) {
    tableCols.push({
      title: _react2.default.createElement(
        'div',
        { style: skinStyle2 },
        ele.caption
      ),
      dataIndex: ele.nameField,
      width: isInPanel ? undefined : 220
    });
  });
  measure.forEach(function (ele) {

    if (ele.bShowValueNotBar) {
      tableCols.push({
        title: _react2.default.createElement(
          'div',
          { style: skinStyle2 },
          ele.caption
        ),
        dataIndex: ele.valueField
      });
    } else {
      tableCols.push({
        title: _react2.default.createElement(
          'div',
          { style: skinStyle2 },
          ele.caption
        ),
        dataIndex: ele.valueField,
        render: function render(text, row, index) {
          return renderLenthBar(text, row, index, ele, colorList[index], maxMeasureArr, isInPanel, bShowValueAfterBarCol);
        }
      });
      if (bShowValueAfterBarCol && ele.bShowValueAfterBar) tableCols.push({
        // title: ele.caption,
        dataIndex: ele.valueField + "_BarValue"
        // render: (text, row, index) => renderLenthBarValue(text, row, index, ele, colorList[index], maxMeasureArr, isInPanel)

      });
    }
  });
  var tableData = [];
  data.forEach(function (eleData, dataIndex) {
    var tmpData = { key: dataIndex };
    tableCols.forEach(function (eleCols) {
      var fieldName = eleCols.dataIndex;
      if (fieldName.indexOf("_BarValue") > 0) {
        var num = fieldName.indexOf("_BarValue");
        tmpData[fieldName] = _react2.default.createElement(
          'div',
          { style: skinStyle },
          eleData[fieldName.substring(0, num)]
        );
      } else if (_lodash2.default.filter(maxMeasureArr, function (o) {
        return o.fieldname == fieldName;
      }).length > 0) {
        tmpData[fieldName] = eleData[fieldName];
      } else {
        tmpData[fieldName] = _react2.default.createElement(
          'div',
          { style: skinStyle },
          eleData[fieldName]
        );
      }
    });

    if (bAddIndexCol) {
      tmpData[indexCol.key] = _react2.default.createElement(
        'div',
        { style: skinStyle },
        dataIndex + 1
      );
    }
    tableData.push(tmpData);
  });
  var pagination = {
    // current: pageIndex,
    // total: recordCount ? recordCount : 0,
    // onChange: this.pageChange,
    // showQuickJumper: true,
    // defaultPageSize: 4,
    pageSize: 10
  };
  if (isInPanel || tableData.length <= pagination.pageSize) {
    pagination = false;
  }
  // let bDisplaySkin = !!skinConfig && skinConfig.displaySkin;
  var titleStyle = _lodash2.default.cloneDeep(skinStyle);
  titleStyle.fontSize = 14;
  // titleStyle.color = "#333";
  titleStyle.fontWeight = "bold";
  return _react2.default.createElement(
    'div',
    { className: 'mobile_RankTable' },
    _react2.default.createElement(
      'div',
      {
        className: 'mobile_RankTable_Title',
        style: titleStyle
      },
      yySetting.title.text
    ),
    '/>'
  );
}
// import { Table } from 'antd';
// import { Table } from 'antd-mobile';
// import { Table } from 'antd';


var renderLenthBarValue = function renderLenthBarValue(text, row, index, ele, barColor, maxMeasureArr, isInPanel) {
  // fieldname: ele.valueField, fieldvalue: 0, bShowValueAfterBar
  var obj = {
    children: text,
    props: {}
  };

  // obj.props.colSpan = 0;

  return obj;
};
var renderLenthBar = function renderLenthBar(text, row, index, ele, barColor, maxMeasureArr, isInPanel, bShowValueAfterBarCol) {
  // fieldname: ele.valueField, fieldvalue: 0, bShowValueAfterBar
  var eleMeasures = _lodash2.default.filter(maxMeasureArr, function (o) {
    return o.fieldname == ele.valueField;
  });
  var maxValue = eleMeasures[0].fieldvalue;
  if (maxValue == 0) maxValue = 1;
  var bShowValueAfterBar = eleMeasures[0].bShowValueAfterBar;
  if (bShowValueAfterBar) maxValue = maxValue * 2;else maxValue = maxValue * 1.5;

  var value = 0;
  var valuePer = 0;
  if (row.hasOwnProperty(ele.valueField) && isNaN(row[ele.valueField]) == false) {
    value = Number(row[ele.valueField]);
    // valuePer = (value * 100 / maxValue)  ;
    valuePer = Math.abs(value * 100 / maxValue);
  }

  var style = void 0;
  if (isInPanel) {
    //如果是大屏显示
    style = { height: '20%', width: valuePer + "%", backgroundColor: barColor, float: "left", borderTopLeftRadius: "0", borderBottomLeftRadius: "0", borderTopRightRadius: valuePer > 10 ? "5px" : "0", borderBottomRightRadius: valuePer > 10 ? "5px" : "0" };
  } else {
    style = { height: '10px', width: valuePer + "%", backgroundColor: barColor, float: "left", borderTopLeftRadius: "0", borderBottomLeftRadius: "0", borderTopRightRadius: "10px", borderBottomRightRadius: "10px", marginTop: "5px" };
  }
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { style: style },
      '\xA0'
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'span',
        { className: 'mobile_RankTable_Ranknumber' },
        ' ',
        bShowValueAfterBar && bShowValueAfterBarCol == false ? value : null
      )
    )
  );

  // return <Row>
  //   <Col span={valuePer} style={{ height: '30%', backgroundColor: barColor }}></Col>
  //   <Col span={valuePer} style={{ height: '30%', backgroundColor: barColor }}>{bShowValueAfterBar ? value : null}</Col>
  // </Row>;
};

// const renderLenthBar = (text, row, index, valueField, barColor) => {

//   let value = 0;
//   if (row.hasOwnProperty(valueField) && isNaN(row[valueField]) == false) {
//     value = Number(row[valueField]);
//     value = value % 100;
//   }
//   let widthStr = value + 'px';
//   return <div style={{
//     height: '11px',
//     width: widthStr,
//     backgroundColor: barColor
//   }}></div>;

// }