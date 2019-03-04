import * as  eChartDemoData from '../eChartDemoData';
import * as  eChartCommon from '../eChartCommon';
// import { Table } from 'antd';
// import { Table } from 'antd-mobile';
// import { Table } from 'antd';
import Table from '../../grid-mobile';
import React, { Component } from 'react'
import _ from 'lodash';
import Row from '../../basic/row';
import Col from '../../basic/col';
export function getRankTable(yySetting, data, isInPanel, panelType, skinConfig) {
  let skinStyle = {};
  let skinStyle2 = {};
  if (!!skinConfig && skinConfig.displaySkin) {
    skinStyle.color = skinConfig.displaySkin.textColor;
    skinStyle2.color = skinConfig.displaySkin.textColor2;
  }
  let bShowValueAfterBarCol = true;
  let dimensionX = yySetting.dataField.dimensionX ? yySetting.dataField.dimensionX : [];
  dimensionX.sort(function (a, b) { return a.iLabelOrder - b.iLabelOrder });
  let measure = yySetting.dataField.measure;
  measure.sort(function (a, b) { return a.iOrder - b.iOrder });
  let tableCols = [];
  let colorList = eChartCommon.getChartColorArr(100);
  let indexCol = yySetting.indexCol;
  let bAddIndexCol = indexCol.bAddIndexCol ? true : false;
  let orderInfo = yySetting.orderInfo;
  // topNum: 6, //“主维度显示行数”：最多31
  // orderField: "fNetMoney",// “排序指标”：按照哪个指标排序的含义，默认按照展示指标中的第一个。
  // orderBy: "desc",// “排序方式（升序、降序）”：默认降序
  let maxMeasureArr = [];
  measure.forEach((ele) => {
    if (ele.bShowValueNotBar == false) {
      maxMeasureArr.push({ fieldname: ele.valueField, fieldvalue: 0, bShowValueAfterBar: ele.bShowValueAfterBar ? true : false })
    }
  });
  if (maxMeasureArr.length > 0) {
    maxMeasureArr.forEach((eleMeasure) => {
      data.forEach((eleData) => {
        if (isNaN(eleData[eleMeasure.fieldname]) == false) {
          if (Number(eleData[eleMeasure.fieldname]) > Number(eleMeasure.fieldvalue))
            eleMeasure.fieldvalue = Number(eleData[eleMeasure.fieldname]);
        }
      });
    });
  };

  if (data.length > 1) {
    if (orderInfo.orderBy == "asc")
      data.sort(function (a, b) { return a[orderInfo.orderField] - b[orderInfo.orderField] });
    else
      data.sort(function (a, b) { return b[orderInfo.orderField] - a[orderInfo.orderField] });
  }
  if (isNaN(orderInfo.topNum) == false && data.length > orderInfo.topNum) {
    data = data.slice(0, orderInfo.topNum);
  }
  if (bAddIndexCol) {
    tableCols.push(
      {
        title: <div style={skinStyle2}>{indexCol.caption}</div>,
        dataIndex: indexCol.key,
        width: (isInPanel ? undefined : 40)
      });
  }
  dimensionX.forEach((ele) => {
    tableCols.push(
      {
        title: <div style={skinStyle2}>{ele.caption}</div>,
        dataIndex: ele.nameField,
        width: (isInPanel ? undefined : 220)
      });
  });
  measure.forEach((ele) => {

    if (ele.bShowValueNotBar) {
      tableCols.push(
        {
          title: <div style={skinStyle2}>{ele.caption}</div>,
          dataIndex: ele.valueField,
        });
    }
    else {
      tableCols.push(
        {
          title: <div style={skinStyle2}>{ele.caption}</div>,
          dataIndex: ele.valueField,
          render: (text, row, index) => renderLenthBar(text, row, index, ele, colorList[index], maxMeasureArr, isInPanel, bShowValueAfterBarCol)
        });
      if (bShowValueAfterBarCol && ele.bShowValueAfterBar)
        tableCols.push(
          {
            // title: ele.caption,
            dataIndex: ele.valueField + "_BarValue",
            // render: (text, row, index) => renderLenthBarValue(text, row, index, ele, colorList[index], maxMeasureArr, isInPanel)

          });
    }
  });
  let tableData = [];
  data.forEach((eleData, dataIndex) => {
    let tmpData = { key: dataIndex };
    tableCols.forEach((eleCols) => {
      let fieldName = eleCols.dataIndex;
      if (fieldName.indexOf("_BarValue") > 0) {
        let num = fieldName.indexOf("_BarValue");
        tmpData[fieldName] = <div style={skinStyle}>{eleData[fieldName.substring(0, num)]}</div>;
      }
      else if (_.filter(maxMeasureArr, function (o) { return o.fieldname == fieldName }).length > 0) {
        tmpData[fieldName] = eleData[fieldName];
      }
      else {
        tmpData[fieldName] = <div style={skinStyle}>{eleData[fieldName]}</div>;
      }
    });

    if (bAddIndexCol) {
      tmpData[indexCol.key] = <div style={skinStyle}>{dataIndex + 1}</div>;
    }
    tableData.push(tmpData);
  });
  let pagination = {
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
  let titleStyle = _.cloneDeep(skinStyle);
  titleStyle.fontSize = 14;
  // titleStyle.color = "#333";
  titleStyle.fontWeight = "bold";
  return <div className="mobile_RankTable">
    <div
      className="mobile_RankTable_Title"
      style={titleStyle}
    >
      {yySetting.title.text}
    </div>
    {/* <Table
      pagination={pagination}
      size={isInPanel ? "small" : "middle"}
      bordered={false}//	是否展示外边框和列边框
      columns={tableCols}
      dataSource={tableData}
      rowClassName={(record, index) => {
        return "rankTable_Row"
      }} */}
    />
  </div>;
}

const renderLenthBarValue = (text, row, index, ele, barColor, maxMeasureArr, isInPanel) => {
  // fieldname: ele.valueField, fieldvalue: 0, bShowValueAfterBar
  const obj = {
    children: text,
    props: {},
  };

  // obj.props.colSpan = 0;

  return obj;

}
const renderLenthBar = (text, row, index, ele, barColor, maxMeasureArr, isInPanel, bShowValueAfterBarCol) => {
  // fieldname: ele.valueField, fieldvalue: 0, bShowValueAfterBar
  let eleMeasures = _.filter(maxMeasureArr, function (o) { return o.fieldname == ele.valueField; })
  let maxValue = eleMeasures[0].fieldvalue;
  if (maxValue == 0)
    maxValue = 1;
  let bShowValueAfterBar = eleMeasures[0].bShowValueAfterBar;
  if (bShowValueAfterBar)
    maxValue = maxValue * 2;
  else
    maxValue = maxValue * 1.5;

  let value = 0;
  let valuePer = 0;
  if (row.hasOwnProperty(ele.valueField) && isNaN(row[ele.valueField]) == false) {
    value = Number(row[ele.valueField]);
    // valuePer = (value * 100 / maxValue)  ;
    valuePer = Math.abs(value * 100 / maxValue);
  }

  let style;
  if (isInPanel) {//如果是大屏显示
    style = { height: '20%', width: (valuePer + "%"), backgroundColor: barColor, float: "left", borderTopLeftRadius: "0", borderBottomLeftRadius: "0", borderTopRightRadius: (valuePer > 10 ? "5px" : "0"), borderBottomRightRadius: (valuePer > 10 ? "5px" : "0") };
  }
  else {
    style = { height: '10px', width: (valuePer + "%"), backgroundColor: barColor, float: "left", borderTopLeftRadius: "0", borderBottomLeftRadius: "0", borderTopRightRadius: "10px", borderBottomRightRadius: "10px", marginTop: "5px" };
  }
  return <div>
    <div style={style}>&nbsp;</div>
    <div><span className="mobile_RankTable_Ranknumber"> {(bShowValueAfterBar && (bShowValueAfterBarCol == false)) ? value : null}</span></div>
  </div>;

  // return <Row>
  //   <Col span={valuePer} style={{ height: '30%', backgroundColor: barColor }}></Col>
  //   <Col span={valuePer} style={{ height: '30%', backgroundColor: barColor }}>{bShowValueAfterBar ? value : null}</Col>
  // </Row>;

}

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


