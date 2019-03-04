import React from 'react';
// import { Icon } from 'antd-mobile';
import { Cell } from 'fixed-data-table-2';
import * as format from '../../helpers/formatDate'
import { getPredicateValue, getRoundValue } from '../../helpers/util'

export default class CellModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  setCell() {
    let property = this.props.RowProperty;//行属性
    let col = this.props.Column;//栏目信息
    let controlType = col.cControlType;
    let index = property.rowIndex;//行号
    let cellState = { disabled: false, visible: false, readOnly: false, style: {} };//单元格状态
    if (this.props.cellState && this.props.cellState[index] && this.props.cellState[index][property.columnKey]) {
      cellState.disabled = this.props.cellState[index][property.columnKey].disabled;
      cellState.visible = this.props.cellState[index][property.columnKey].visible;
      cellState.readOnly = this.props.cellState[index][property.columnKey].readOnly;
      cellState.style = cb.utils.extend(true, {}, this.props.cellState[index][property.columnKey].style);
    }
    cellState.style.height = property.height;
    let data = this.props.dataList;
    if (data[index]) {
      let Cell = this.RemodelingCell(property, col, cellState);
      return Cell
    }
  }
  //组织Cell
  RemodelingCell(rowIndex, col, cellState) {
    let { cControlType, formatter, bCanModify, bJointQuery } = col;
    let index = rowIndex.rowIndex;
    let columnKey = rowIndex.columnKey;
    let data = this.props.dataList;
    let className = "textCol";
    cControlType = cControlType ? cControlType : 'Input';
    // if (cControlType === 'refer' || cControlType.trim().toLocaleLowerCase() === 'refer') {
    //   cellState.style.textAlign = 'left';
    // }
    cellState.style.width = rowIndex.width;
    if (formatter) {
      const cellObj = formatter(rowIndex, data[index]);
      let cellHtml = '', cellText = '';
      const cellProps = {};
      if (cellObj && cellObj.html) {
        cellHtml += cellObj.html;
        cellText += cellObj.text || cellObj.html;
        Object.assign(cellProps, cellObj.props);
      }
      const cellCom = (
        <span title={cellText} dangerouslySetInnerHTML={{ __html: cellHtml }} {...cellProps}></span>
      );
      return <Cell width={rowIndex.width} height={rowIndex.height}>
        <div style={cellState.style} className={className}>
          {cellObj && cellObj.override ? null : <span title={data[index][columnKey]}>{data[index][columnKey]}</span>}
          {cellCom}
        </div>
      </Cell>
    }
    //行号
    if (columnKey === 'GridRowNo') {
      return (
        <Cell width={rowIndex.width} height={rowIndex.height}>
          {index + 1}
        </Cell>
      );
    }
    return (
      <Cell width={rowIndex.width} height={rowIndex.height} className="retail-table-cell">
        <div title={data[index][columnKey]} className="textCol" style={cellState.style}>
          {this.RemodelingFormatControl(cControlType, data[index][columnKey], bJointQuery, index, columnKey)}
        </div>
      </Cell>
    );
  }
  ///////////////////////////////////////////////End-为comboGrid形式的控件单独支持的方法////////////////////////////////////////////////////////////////////////
  //构建formatControls结构
  RemodelingFormatControl(controlType, text, bJointQuery, index, columnKey) {
    switch (controlType && controlType.trim().toLocaleLowerCase()) {
      case 'refer':
      case 'treerefer':
      case 'listrefer': {
        let formatText = text != null && typeof text === 'object' ? text.name : text;
        return bJointQuery ? <a onClick={e => this.handleJointQuery(e, index, columnKey)}>{formatText}</a> : formatText;
      }
      case 'select': {
        if (cb.utils.isEmpty(text))
          return text;
        let formatText = null;
        if (typeof text !== 'object')
          formatText = text;
        // else if (text.nameType === 'icontext')
        //   formatText = <span><Icon type={text.icon} />{text.text}</span>
        // else if (text.nameType === 'icon')
        //   formatText = <Icon type={text.icon} />
        else
          formatText = text.text;
        return bJointQuery ? <a onClick={e => this.handleJointQuery(e, index, columnKey)}>{formatText}</a> : formatText;
      }
      case 'inputnumber':
      case 'money':
      case 'price':
        if (cb.utils.isEmpty(text)) return '';
        if (isNaN(text)) return text;

        /*谓词变量支持系统参数*/
        let cFormatData = this.props.Column.cFormatData;
        try {
          if (!cFormatData || cFormatData == '') {
            cFormatData = {};
          } else {
            cFormatData = JSON.parse(cFormatData);
          }
        } catch (e) {
          cb.utils.alert('数量/金额/单价，预制错误！', 'error');
        }
        text = parseFloat(text);
        let iNumPoint = this.props.Column.iNumPoint;
        let decimal = cFormatData.decimal ? getPredicateValue(cFormatData.decimal) : null;
        if (controlType === 'money') {
          if (decimal)
            iNumPoint = decimal;
          else
            iNumPoint = cb.rest.AppContext.option.amountofdecimal;
        }
        else if (controlType === 'price') {
          if (decimal)
            iNumPoint = decimal;
          else
            iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
        } else {
          if (decimal)
            iNumPoint = decimal;
          else
            if (cb.utils.isEmpty(iNumPoint)) iNumPoint = null;
        }
        if (!isNaN(iNumPoint) && iNumPoint != null) {
          text = parseFloat(text);
          text = getRoundValue(text, iNumPoint);
        }
        if (cFormatData.after) text = text + cFormatData.after;

        return text;
      case 'datepicker':
        if (text) {
          let fmt = 'YYYY-MM-dd';
          if (this.props.Column.cFormatData && this.props.Column.cFormatData != '')
            fmt = this.props.Column.cFormatData;
          text = format.dateFormat(new Date(text), fmt)
        }
        return text;
      case 'avatar':
        if (!text || text == '') {
          return <div className="no-avatar-man"></div>
        } else {
          let style = {};
          style.height = this.props.rowHeight;
          style.width = this.props.rowHeight;
          return <img src={text + '?imageView2/1/w/80/h/80'} style={style} />
        }
    }
    if (text === '')
      return ''
    return bJointQuery ? <a onClick={e => this.handleJointQuery(e, index, columnKey)}>{text}</a> : text;
  }
  handleJointQuery(e, index, columnKey) {
    this.props.model.execute('cellJointQuery', {
      rowIndex: index,
      cellName: columnKey
    });
  }
  render() {
    var Cell = this.setCell();
    return Cell;
  }
}
