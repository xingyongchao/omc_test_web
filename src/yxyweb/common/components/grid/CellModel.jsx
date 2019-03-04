import React from 'react';
import { Popover, Icon } from 'antd';
import { Table, Column, Cell } from 'fixed-data-table-2';
// import { Input, InputNumber, DatePicker, Select, Refer, Switch, LabelSwitch, Button, Checkbox, Tag, Col, Row } from '../basic'
import { Radio } from 'antd';
import Input from '../basic/input'
import HotkeyInput from '../basic/hotkeyinput';
import InputNumber from '../basic/inputnumber'
import DatePicker from '../basic/datepicker'
import TimePicker from '../basic/timepicker'
import Select from '../basic/select'
import Refer from '../basic/refer'
import Switch from '../basic/switch'
import LabelSwitch from '../basic/labelswitch'
import Button from '../basic/button'
import Checkbox from '../basic/checkbox'
import Tag from '../basic/tag'
import Col from '../basic/col'
import Row from '../basic/row'
import SwitchLabel from '../basic/switchlabel'
import TreeRefer from '../basic/treerefer'
import ListRefer from '../basic/listrefer'
import CompositeModel from './CompositeModel'
import CheckRadio from '../basic/checkradio'
import Cascader from '../basic/cascader'
import * as format from '../../helpers/formatDate'
import { getPredicateValue, getRoundValue } from '../../helpers/util'
import * as FormatterMap from '../../../../common/components/formatter';
import UncertainControl from './UncertainControl';

export default class CellModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentWillReceiveProps(nextProps) {

  }
  //组合控件切换浏览态
  setCellBlur(index, columnKey) {
    let data = { rowIndex: index, cellName: columnKey };
    this.props.setCellBlur(data);
  }
  //单元格单击事件
  onCellClick(e, index, columnKey) {
    if (!this.props.cellState[index][columnKey].disabled && !this.props.cellState[index][columnKey].readOnly)
      this.props.onCellClick(e, index, columnKey);
  }
  setCell() {
    let self = this;
    let property = this.props.RowProperty;//行属性
    let col = this.props.Column;//栏目信息
    let controlType = col.cControlType;
    let index = property.rowIndex;//行号
    let cellState = { disabled: false, visible: false, readOnly: false, style: {} };//单元格状态
    let isColErro = this.props.isColErro;//错误
    if (this.props.cellState[index] && this.props.cellState[index][property.columnKey]) {
      cellState.disabled = this.props.cellState[index][property.columnKey].disabled;
      cellState.visible = this.props.cellState[index][property.columnKey].visible;
      cellState.readOnly = this.props.cellState[index][property.columnKey].readOnly;
      cellState.style = cb.utils.extend(true, {}, this.props.cellState[index][property.columnKey].style);
      cellState.className = this.props.cellState[index][property.columnKey].className;
    }
    cellState.style.height = property.height;
    if (controlType && controlType.trim().toLocaleLowerCase() != 'avatar')
      cellState.style.padding = '12px 10px';
    cellState.style.lineHeight = '14px';
    if (isColErro) {
      cellState.style.height = cellState.style.height - 1;
      cellState.style.boxSizing = 'border-box';
      cellState.style.borderRadius = '5px';
      cellState.style.border = '1px solid #ff7733';
    }

    let data = this.props.dataList;
    if (data[index]) {
      //操作列
      if (col.cControlType == 'Action') {
        let actionList = this.props.action.controls;
        let actionState = this.props.actionState;
        let actionControl = [];
        if (actionList && actionList.length > 0) {
          actionControl = this.buildActionControls(actionList, true);
          return (<div style={{ "width": property.width, "height": property.height, "borderBottom": "1px solid #dbe0e5" }}><div className="acticonCell"><Row>{actionControl}</Row></div></div>);
        } else {
          return <div className="acticonCell"><Row></Row></div>;
        }
      } else {
        let Cell = this.RemodelingCell(property, col, cellState);
        return Cell
      }
    }
  }
  buildActionControls(actionList, judge) {
    if (!actionList) return;
    const data = this.props.dataList,
      index = this.props.RowProperty.rowIndex,
      actionState = this.props.actionState,
      actionControl = [];
    let _id = data[this.props.showActionIndex] ? data[this.props.showActionIndex]._id : 0;
    actionList.map(function (action) {
      const icon = action.iStyle === 1 ? null : '#icon-' + action.icon;
      const text = action.iStyle === 2 ? null : action.cShowCaption;

      if (!judge || this.props.showActionIndex == index && actionState[_id] && actionState[_id][action.cItemName].visible) {
        if (action.cControlType != 'popbutton') {
          let temp_action = (
            <span key={action.cItemName}>
              <a className="table-list-btn" onClick={(e) => this.props.ActionClick(e, action)}>{text}</a>
            </span>
          );
          actionControl.push(temp_action);
        } else {
          const currentRow = this.dataList[this.props.showActionIndex];
          if (!currentRow) return;
        }
      }
    }, this);
    return actionControl;
  }
  //组织Cell
  RemodelingCell(rowIndex, col, cellState) {
    let { cControlType, formatter, bCanModify, bJointQuery } = col;
    let index = rowIndex.rowIndex;
    let columnKey = rowIndex.columnKey;
    let data = this.props.dataList;
    let CellStatus = this.state.CellStatus;
    let readOnly = this.props.readOnly;
    let className = "textCol";
    let cellClass = "retail-table-cell";
    cControlType = cControlType ? cControlType : 'Input';
    if (this.props.CellStatus[index]) {
      CellStatus = this.props.CellStatus[index][columnKey];/*单元格编辑状态*/
    }
    // if (!bCanModify || cellState.disabled) {
    if ((this.props.rowStatus[index] && this.props.rowStatus[index].disabled) || (!bCanModify || cellState.disabled))
      className = 'public_fixedDataTableCell_disabled textCol';
    // }
    if (cControlType === 'refer' || cControlType.trim().toLocaleLowerCase() === 'refer') {
      cellState.style.textAlign = 'left';
    }
    cellState.style.width = rowIndex.width;
    if (cellState.className && cellState.className != '') className = className + ' ' + cellState.className;
    if (col.className && col.className != '') className = className + ' ' + col.className;
    if (formatter && !CellStatus) {
      const cellObj = formatter(rowIndex, data[index]);
      if (cellObj) {
        if (cellObj.formatterKey) {
          const ComName = FormatterMap[cellObj.formatterKey];
          if (!ComName)
            return null;
          return <Cell width={rowIndex.width} height={rowIndex.height}>
            <div style={cellState.style} className='textCol'>
              <ComName model={this.props.model} {...cellObj.props} />
            </div>
          </Cell>
        }
        let cellHtml = '', cellText = '';
        const cellProps = {};
        if (cellObj.html) {
          cellHtml += cellObj.html;
          cellText += cellObj.text || cellObj.html;
          Object.assign(cellProps, cellObj.props);
        }
        const cellCom = (
          <span title={cellText} dangerouslySetInnerHTML={{ __html: cellHtml }} {...cellProps}></span>
        );
        /*add by jinzh1 特殊处理 formatter*/
        cellState.style.padding = '0px 0px';
        if (this.props.readOnly) className = "textCol";/*add by jinzh1 readOnly下放开不能点击控制*/
        return <Cell width={rowIndex.width} height={rowIndex.height}>
          <div style={cellState.style} className={className}>
            {cellObj && cellObj.override ? null : <span title={data[index][columnKey]}>{data[index][columnKey]}</span>}
            {cellCom}
          </div>
        </Cell>
      }
    }
    //选择框
    if (columnKey === 'CheckBox') {
      return (
        <Cell width={rowIndex.width} height={rowIndex.height}>
          {this.RemodelingEditControl(cControlType, index, columnKey, col)}
        </Cell>
      );
    }
    //行号
    if (columnKey === 'GridRowNo') {
      return (
        <Cell width={rowIndex.width} height={rowIndex.height}>
          <div className="rowNo" style={{ "width": rowIndex.width, "height": rowIndex.height }} >{index + 1}</div>
        </Cell>
      );
    }
    if (this.props.mergeCells && this.props.mergeColContrast[columnKey] && col.bMergeCol && !cb.utils.isEmpty(data[index][columnKey])) {
      const ColIndexs = this.props.ColIndexs;/*栏目index对照*/
      let mergeColContrast = this.props.mergeColContrast;
      let dataLen = data.length;/*数据行数*/
      let nowColIndex = ColIndexs[columnKey];/*当前列 索引*/
      let hasMoreRow = dataLen > index + 1;/*是否存在下一行*/

      mergeColContrast[columnKey][index] = 0;
      if (index == 0) {/*第一行*/
        if (hasMoreRow) {/*存在下一行*/
          if (nowColIndex == 0) {
            if (data[index][columnKey] == data[index + 1][columnKey]) {
              mergeColContrast[columnKey][index] = 1;
              this.props.setMergeColContrast(mergeColContrast);
              return <Cell></Cell>;
            }
          } else {
            let preColumnKey = this.getKeyByIndex(nowColIndex - 1, ColIndexs);
            if (mergeColContrast[preColumnKey][index] == 1 && data[index][columnKey] == data[index + 1][columnKey] && data[index][preColumnKey] == data[index + 1][preColumnKey]) {
              mergeColContrast[columnKey][index] = 1;
              this.props.setMergeColContrast(mergeColContrast);
              return <Cell></Cell>;
            }
          }
        }
      } else {
        if (nowColIndex == 0) {/*第一列*/
          if (mergeColContrast[columnKey][index - 1] == 1) {/*前一行合并*/
            if (data[index][columnKey] == data[index - 1][columnKey]) {/*需要合并*/
              if (dataLen > index + 1 && data[index][columnKey] == data[index + 1][columnKey]) {/*下一行 需要合并*/
                mergeColContrast[columnKey][index] = 1;
                this.props.setMergeColContrast(mergeColContrast);
                return (<Cell></Cell>);
              } else {/*合并的最后一行*/
                let count = this.getCount(mergeColContrast[columnKey], index);
                cellState.style.marginTop = "-" + count * this.props.rowHeight / 2;
                cellState.style.position = "absolute";
                cellState.style.height = (this.props.rowHeight + count * this.props.rowHeight) / 2;
                // cellClass = 'last-merge-cell';
                mergeColContrast[columnKey][index] = 2;
              }
            }
          } else {
            /*下一行 需要合并*/
            if (dataLen > index + 1 && data[index][columnKey] == data[index + 1][columnKey]) {
              mergeColContrast[columnKey][index] = 1;
              return (<Cell></Cell>);
            }
          }
        } else {
          let preColumnKey = this.getKeyByIndex(nowColIndex - 1, ColIndexs);
          let preColMerge = mergeColContrast[preColumnKey][index];
          if (preColMerge == 1) {/*前一列当前行  合并*/
            /*当前列 上一行 合并*/
            if (mergeColContrast[columnKey][index - 1]) {
              if (data[index][columnKey] == data[index - 1][columnKey]) {/*需要合并*/
                if (data[index][columnKey] == data[index + 1][columnKey]) {/*下一行 需要合并*/
                  mergeColContrast[columnKey][index] = 1;
                  this.props.setMergeColContrast(mergeColContrast);
                  return (<Cell></Cell>);
                } else {
                  let count = this.getCount(mergeColContrast[columnKey], index);
                  cellState.style.marginTop = "-" + count * this.props.rowHeight / 2;
                  cellState.style.position = "absolute";
                  cellState.style.height = (this.props.rowHeight + count * this.props.rowHeight) / 2;
                  // cellClass = 'last-merge-cell';
                  mergeColContrast[columnKey][index] = 2;
                }
              }
            } else {
              if (data[index][columnKey] == data[index + 1][columnKey]) {/*下一行 需要合并*/
                mergeColContrast[columnKey][index] = 1;
                this.props.setMergeColContrast(mergeColContrast);
                return (<Cell></Cell>);
              }
            }
          } else if (preColMerge == 2) {
            /*当前列 上一行 合并*/
            if (mergeColContrast[columnKey][index - 1]) {
              if (data[index][columnKey] == data[index - 1][columnKey]) {/*需要合并*/
                let count = this.getCount(mergeColContrast[columnKey], index);
                cellState.style.marginTop = "-" + count * this.props.rowHeight / 2;
                cellState.style.position = "absolute";
                cellState.style.height = (this.props.rowHeight + count * this.props.rowHeight) / 2;
                // cellClass = 'last-merge-cell';
                mergeColContrast[columnKey][index] = 2;
              }
            }
          }
        }
      }
      this.props.setMergeColContrast(mergeColContrast);
    }
    if ((cControlType == 'scheckbox' || cControlType == 'labelswitch' || cControlType == 'tag') && cControlType.trim().toLocaleLowerCase()) {
      cellState.style.textAlign = 'center';
      if (cControlType == 'labelswitch')
        cellState.style.pointerEvents = 'initial';
      if (this.props.selectIndex == index) {
        return (
          <Cell width={rowIndex.width} height={rowIndex.height} >
            <div style={cellState.style} className={className}>
              {this.RemodelingEditControl(cControlType, index, columnKey, col)}
            </div>
          </Cell>
        );
      } else {
        return (
          <Cell width={rowIndex.width} height={rowIndex.height} >
            <div style={cellState.style} className={className}>
              {this.RemodelingFormatControl(cControlType, data[index][columnKey], bJointQuery, index, columnKey)}
            </div>
          </Cell>
        )
      }
    }
    if (cControlType == 'CheckRadio' && !CellStatus && !readOnly) {
      cellState.style.padding = '4px 10px';
    }
    //不可编辑状态
    if (readOnly) {
      let title = data[index][columnKey];
      if (!cb.utils.isEmpty(title) && typeof title === 'object') {
        title = title.text;
      }
      let cName = "textCol";
      if (cellState.className && cellState.className != '') cName = cName + '  ' + cellState.className;
      if (col.className && col.className != '') cName = cName + '  ' + col.className;
      return (
        <Cell width={rowIndex.width} height={rowIndex.height} className="retail-table-cell">
          <div title={title} className={cName} style={cellState.style}>
            {this.RemodelingFormatControl(cControlType, data[index][columnKey], bJointQuery, index, columnKey)}
          </div>
        </Cell>
      );
    }
    if (!cellState) {
      className = className + 'formatCol';
    }
    return (
      CellStatus ?
        <Cell width={rowIndex.width} height={rowIndex.height} className={cellClass}>
          <div className="editCol" style={cellState.style}>
            {this.RemodelingEditControl(cControlType, index, columnKey, col)}
          </div>
        </Cell>
        :
        <Cell width={rowIndex.width} height={rowIndex.height} className={cellClass}>
          <div style={cellState.style} className={className} onClick={(e) => this.onCellClick(e, index, columnKey)}>
            {this.RemodelingFormatControl(cControlType, data[index][columnKey], bJointQuery, index, columnKey)}
          </div>
        </Cell>
    );
  }
  getKeyByIndex = (index, data) => {
    let columnKey = null;
    for (var key in data) {
      if (index == data[key]) {
        columnKey = key;
        break;
      }
    }
    return columnKey;
  }
  getCount = (data, index) => {
    let keyIndex = index - 1, count = 1;
    for (var i = 0; i < 1000000; i++) {
      if (data[keyIndex] === 1) {
        count = count + 1;
        keyIndex = keyIndex - 1;
      } else {
        break;
      }
    }
    return count;
  }
  //构建editControls结构
  RemodelingEditControl(controlType, index, columnKey, col) {
    let model = this.props.model.getEditRowModel().get(columnKey);
    let disabled = false;
    let NumPoint = 1;
    /*转换iNumPoint为inputNumber控件识别的小数位*/
    if (col.iNumPoint && col.iNumPoint > 1) {
      NumPoint = 0.1;
      NumPoint = Math.pow(NumPoint, col.iNumPoint).toFixed(col.iNumPoint);
    }
    if (this.props.rowStatus[index])
      disabled = this.props.rowStatus[index].disabled;
    switch (controlType && controlType.trim().toLocaleLowerCase()) {
      // case 'money':
      //   return <InputNumber focus model={model} iNumPoint={NumPoint} />
      case 'input':
        return <Input focus model={model} />
      case 'hotkeyinput':
        return <HotkeyInput focus model={model} />
      case 'inputnumber':
      case 'money':
      case 'price':
        if (controlType === 'money')
          NumPoint = cb.rest.AppContext.option.amountofdecimal;
        else if (controlType === 'price')
          NumPoint = cb.rest.AppContext.option.monovalentdecimal;
        return <InputNumber className={'edit-input-number'} focus model={model} iNumPoint={col.iNumPoint} cFormatData={col.cFormatData} />
      case 'datepicker':
        return <DatePicker model={model} className={'edit-input-number'} cFormatData={col.cFormatData} />
      case 'timepicker':
        return <TimePicker model={model} className='edit-input-number' />
      case 'select':
        return <Select focus model={model} className={'edit-input-number'} />
      case 'refer':
        return <Refer focus model={model} relatedControl={this.buildActionControls(col.relatedActions)} />
      case 'switch':
        return <Switch focus model={model} className={'edit-input-number'} style={{ width: '50%' }} readOnly={false} checkedChildren="是" unCheckedChildren="否" />
      case 'checkradio':
        return <CheckRadio focus model={model} className={'edit-input-number'} style={{ width: '50%' }} readOnly={false} />
      case 'selectcheckbox'://grid首位选择列
        if (this.props.GridProps.isRadio)
          return <Radio checked={this.props.dataList[index]._selected} onChange={(e) => this.SelectChange(e, index)}></Radio>
        else
          return <Checkbox value={this.props.dataList[index]._selected} onChange={(e, i) => this.SelectChange(e, index)}></Checkbox>
      case 'labelswitch':
        return <LabelSwitch focus model={model} style={{ width: '50%' }} readOnly={false} checkedChildren="启" unCheckedChildren="停" />
      case 'scheckbox':
        return <Checkbox model={model} disabled={disabled} ></Checkbox>
      case 'tag':
        return (
          disabled ?
            <Tag model={model} disabled={true} color={''} closable={false} cRefType={this.props.Column.cRefType} refReturn={this.props.Column.refReturn} cRefRetId={this.props.Column.cRefRetId} />
            :
            <Tag model={model} disabled={false} color={'blue'} closable={true} cRefType={this.props.Column.cRefType} refReturn={this.props.Column.refReturn} cRefRetId={this.props.Column.cRefRetId} />
        );
      case 'treerefer':
        return <TreeRefer model={model} />
      case 'listrefer':
        return <ListRefer model={model} />
      case 'cascader':
        return <Cascader model={model} />
      case 'composite':
        let compositeControl = this.props.compositeControl[index][columnKey];
        let rowModel = this.props.model.getEditRowModel();
        return <CompositeModel compositeControl={compositeControl} visible={false} width={col.iColWidth} height={this.props.rowHeight} cellState={this.props.cellState[index][columnKey]} rowModel={rowModel} setCellBlur={() => this.setCellBlur(index, columnKey)} />
      case 'uncertain':
        return <UncertainControl model={model} cellConfig={this.props.dataList[index].cellConfig || null} {...this.props} />

    }
  }
  ///////////////////////////////////////////////Begin-为comboGrid形式的控件单独支持的方法//////////////////////////////////////////////////////////////////////////
  //switchChange控件点击改变事件
  switchChange(value, index, columnKey) {
    this.props.dataList[index][columnKey] = value;
    this.props.model.setFocusedRowIndex(index);
    this.props.model.setCellValue(index, columnKey, this.props.dataList[index][columnKey], true);
  }
  //CheckBoxg改变事件
  CheckBoxOnChange(value, index, columnKey) {
    this.props.dataList[index][columnKey] = value;
    this.props.model.setFocusedRowIndex(index);
    this.props.model.setCellValue(index, columnKey, value, true);
  }
  //
  referClikc(index, columnKey) {
    this.props.model.setFocusedRowIndex(index);
    let model = this.props.model.getEditRowModel().get(columnKey);
    model.browse();
  }
  //
  TagOnClose(key, index, columnKey) {
    this.props.model.setFocusedRowIndex(index);
    let model = this.props.model.getEditRowModel().get(columnKey);
    model.deleteItem(key);
    //   return;
    //     var data = this.props.dataList[index][columnKey];
    //     for (var i in data) {
    //         if (data[i] === key) {
    //             data.splice(i, 1);
    //         }
    //     }
    //     this.props.model.setCellValue(index, columnKey, data, true);
  }
  ///////////////////////////////////////////////End-为comboGrid形式的控件单独支持的方法////////////////////////////////////////////////////////////////////////
  //构建formatControls结构
  RemodelingFormatControl(controlType, text, bJointQuery, index, columnKey) {
    let disabled = false;
    if (this.props.rowStatus[index])
      disabled = this.props.rowStatus[index].disabled;
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
        else if (text.nameType === 'icontext')
          formatText = <span><Icon type={text.icon} />{text.text}</span>
        else if (text.nameType === 'icon')
          formatText = <Icon type={text.icon} />
        else
          formatText = text.text;
        return bJointQuery ? <a onClick={e => this.handleJointQuery(e, index, columnKey)}>{formatText}</a> : formatText;
        return typeof text === 'object' ? text.text : text;
      }
      case 'switch':
        return <Switch className={'edit-input-number'} checked={Boolean(text)} readOnly={true} checkedChildren="是" unCheckedChildren="否" />
      case 'checkradio':
        // return <CheckRadio className={'edit-input-number'} checked={Boolean(text)} readOnly={true} />
        return <CheckRadio focus className={'edit-input-number'} checked={Boolean(text)} style={{ width: '50%' }} onChange={(checked) => this.onCrChange(checked, index, columnKey)} readOnly={this.props.readOnly} />
      case 'vouchermoney':
        var money = this.buildMoney(text);
        return money;
      case 'labelswitch':
        return <LabelSwitch checkedChildren={'启'} unCheckedChildren={'停'} value={text} onChange={(checked) => this.switchChange(checked, index, columnKey)} />
      case 'switchlabel':
        return <SwitchLabel value={text} />
      case 'scheckbox':
        return (
          <Checkbox disabled={disabled} value={text} onChange={(value) => this.CheckBoxOnChange(value, index, columnKey)}></Checkbox>
        );
      case 'tag':
        return (<Tag
          disabled={disabled}
          cRefType={this.props.Column.cRefType}
          refReturn={this.props.Column.refReturn}
          cRefRetId={this.props.Column.cRefRetId}
          closable={!disabled}
          tagData={text}
          color={'blue'}
          onClose={(key) => this.TagOnClose(key, index, columnKey)}
          referClikc={() => this.referClikc(index, columnKey)}
        />);
      case 'composite':
        let CompositeJson = JSON.parse(this.props.CompositeLayout[index][columnKey]);
        let compositeData = this.analysisComposite(CompositeJson, index);
        return compositeData;
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
          if (this.props.Column.cFormatData && this.props.Column.cFormatData != '') {
            fmt = this.props.Column.cFormatData;
          }
          text = format.dateFormat(new Date(text), fmt)
        }
        return text;
      case 'avatar':
        let displaymode = 'default';
        const { cStyle } = this.props.Column;
        if (cStyle) {
          try {
            displaymode = JSON.parse(cStyle).displaymode || displaymode;
          } catch (e) {

          }
        }
        const className = `cell-avatar-${displaymode}`;
        if (!text || text == '') {
          return <div className={`no-avatar-man ${className}`}></div>
        } else {
          let style = {};
          style.height = this.props.rowHeight;
          style.width = this.props.rowHeight;
          return <img className={className} src={text + '?imageView2/1/w/80/h/80'} style={style} />
        }
      case 'uncertain':
        text = this.getUncertainFormatValue(text, index, columnKey);
        return text;
      case 'specialcom':
        text = this.getSpecalValue(index);
        return text;
    }
    if (text === '')
      return ''
    return bJointQuery ? <a onClick={e => this.handleJointQuery(e, index, columnKey)}>{text}</a> : text;
  }
  /*获取特殊列的显示值*/
  getSpecalValue(index) {
    let column = this.props.Column;
    let cStyle = column.cStyle;
    try {
      cStyle = JSON.parse(cStyle);
    } catch (e) {
      cb.utils.alert('specialcom  cstyle预制错误！');
      return;
    }
    let { Separator, dataSource, columns } = cStyle;
    let row = this.props.dataList[index];
    let data = row[dataSource];
    let cols = columns.split(',');
    let controls = [];
    if (!Separator) Separator = '';
    data && data.map(row => {
      let temp = [];
      let colLen = cols ? cols.length : 0;
      cols && cols.map((col, index) => {
        if (index == (colLen - 1)){
          temp.push(<div className="special_col">{row[col]}</div>)
        }else{
          temp.push(<div className="special_col">{row[col]}</div>)
          temp.push(<div className="special_separator">{Separator}</div>)
        }
      });
      controls.push(<div className="special-row">{temp}</div>)
    });
    return <div className="special-rows">{controls}</div>
  }
  /*获取不确定列的显示值*/
  getUncertainFormatValue(text, index, columnKey) {
    if (this.props.dataList[index][columnKey] == null || this.props.dataList[index][columnKey] == "") return "";
    let cellConfig = this.props.dataList[index].cellConfig || null;
    if (!cellConfig) return text;
    let controlType = cellConfig.cControlType;
    switch (controlType && controlType.trim().toLocaleLowerCase()) {
      case 'refer':
      case 'treerefer':
      case 'listrefer':
        return text;
      case 'select':
      case 'radio':
      case 'checkboxenum':
        let cEnumString = cellConfig.cEnumString;
        try {
          if (!cEnumString || cEnumString == '') {
            cEnumString = {};
          } else {
            cEnumString = JSON.parse(cEnumString);
          }
        } catch (e) {
          cb.utils.alert('cEnumString，预制错误！', 'error');
        }
        if (typeof text === 'object') {
          let temp = '';
          text.map(t => {
            temp = (temp == '' ? cEnumString[t] : (temp + ',' + cEnumString[t]));
          });
          text = temp;
        } else {
          if (text && text.split(',') && text.split(',').length > 1) {
            let tem_text = text.split(',');
            text = '';
            tem_text.map(t => {
              text = (text == '' ? cEnumString[t] : (text + ',' + cEnumString[t]));
            });
          } else {
            text = cEnumString[text];
          }
        }
        return text || "";
      case 'inputnumber':
      case 'money':
      case 'price':
        if (cb.utils.isEmpty(text)) return '';
        if (isNaN(text)) return text;
        /*谓词变量支持系统参数*/
        let cFormatData = cellConfig.cFormatData;
        try {
          if (!cFormatData || cFormatData == '') {
            cFormatData = {};
          } else {
            cFormatData = JSON.parse(cFormatData);
          }
        } catch (e) {
          cb.utils.alert('数量/金额/单价，预制错误！', 'error');
        }
        let iNumPoint = cellConfig.iNumPoint;
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
          if (cellConfig.cFormatData && cellConfig.cFormatData != '') {
            fmt = cellConfig.cFormatData;
          }
          text = format.dateFormat(new Date(text), fmt)
        }
        return text;
    }
    return text;
  }
  onCrChange = (value, index, columnKey) => {
    // this.props.dataList[index][columnKey] = value;
    this.props.model.setFocusedRowIndex(index);
    this.props.model.setCellValue(index, columnKey, value, true);
  }
  //解析浏览态的复合组件行
  analysisComposite(Json, index) {
    let self = this;
    let rowData = self.props.dataList[index];
    if (Json.length < 0) return;
    let Control = [];
    Json.map(function (r) {
      let Row = self.analysisRow(r, rowData);
      if (!Row) return;
      Control.push(Row);
    });
    return Control;
  }
  //解析复合组件row
  analysisRow(rowJson, rowData) {
    let self = this;
    if (rowJson.row.length < 0) return;
    let RowControl = [];
    let Col;
    rowJson.row.map(function (c) {
      Col = self.analysisCol(c, rowData);
      if (!Col) return false;
      RowControl.push(Col);
    });
    if (RowControl.length <= 0) return false;
    return (<Row style={{ 'height': 'initial' }}>{RowControl}</Row>);
  }
  //解析复合组件col
  analysisCol(colJson, rowData) {
    let self = this;
    if (colJson.col.length < 0) return;
    let ColControl = [];
    let colData;
    colJson.col.map(function (item) {
      let colspan = item.colspan;
      let style = item.style;
      let caption = self.props.model.getColumn(item.cItemName).cShowCaption;
      if (rowData[item.cItemName] == undefined || rowData[item.cItemName] == '' || rowData[item.cItemName] == "undefined") return false;
      let showCaption = item.bShowCaption ? caption + ':' + rowData[item.cItemName] : rowData[item.cItemName];
      colData = (
        <Col key={item.cItemName} span={colspan}>
          <div style={style}>
            {showCaption}
          </div>
        </Col>
      );
      ColControl.push(colData);
    });
    if (ColControl.length <= 0) return false;
    return ColControl;
  }
  //创建凭证所需金额显示模块
  buildMoney(value) {
    let MoneyData = [];
    let FormatData = value;
    FormatData = FormatData * 1;
    if (FormatData !== 0) {
      var Money = FormatData.toFixed(2);//格式化数字为两位精度小数
      var length = Money.length;
      for (let i = 0; i < length; i++) {
        MoneyData.push(Money[i]);
      }
      MoneyData.reverse();
      MoneyData.splice(2, 1);
    }
    return (
      <Cell>
        <Row className={"CredentialsBody"}>
          <ul className={"CredentialsMoney"}>
            <li className={"firstCol"}>{MoneyData[10]}</li>
            <li>{MoneyData[9]}</li>
            <li>{MoneyData[8]}</li>
            <li className={"lineBlue"}>{MoneyData[7]}</li>
            <li>{MoneyData[6]}</li>
            <li>{MoneyData[5]}</li>
            <li className={"lineBlue"}>{MoneyData[4]}</li>
            <li>{MoneyData[3]}</li>
            <li>{MoneyData[2]}</li>
            <li className={"lineRed"}>{MoneyData[1]}</li>
            <li>{MoneyData[0]}</li>
          </ul>
        </Row>
      </Cell>
    );
  }
  handleJointQuery(e, index, columnKey) {
    let dataArry = this.props.dataList;
    let rowData = dataArry[index];
    // this.props.model.fireEvent('dblClick', rowData);
    this.props.model.execute('cellJointQuery', {
      rowIndex: index,
      cellName: columnKey
    });
  }
  //操作列 点击事件
  ActionClick(e, index, action) {
    this.props.model.select(index);
    let viewModel = this.props.model.getParent();
    while (viewModel.getParent())
      viewModel = viewModel.getParent();
    let params = { index: index, cItemName: action.cItemName }
    viewModel.get(action.cItemName).fireEvent('click', params);
    this.props.model.unselect(index);
  }
  //监听选择
  SelectChange(checked, index) {
    if (typeof checked == 'object')
      checked = checked.target.checked;
    let all = false;
    if (this.props.GridProps.isRadio) all = true;
    if (checked) {
      if (all) {
        this.props.model.select([index], all);
      } else {
        this.props.model.select(index, all);
      }
    } else {
      this.props.model.unselect(index);
    }
  }
  //金额转换函数
  NumberToChinese(num) {
    var unitPos = 0;
    var strIns = '', chnStr = '';
    var needZero = false;

    if (num === 0) {
      return this.chnNumChar[0];
    }

    while (num > 0) {
      var section = num % 10000;
      if (needZero) {
        chnStr = this.chnNumChar[0] + chnStr;
      }
      strIns = this.SectionToChinese(section);
      strIns += (section !== 0) ? this.chnUnitSection[unitPos] : this.chnUnitSection[0];
      chnStr = strIns + chnStr;
      needZero = (section < 1000) && (section > 0);
      num = Math.floor(num / 10000);
      unitPos++;
    }

    return chnStr;
  }
  //金额转换辅助函数
  SectionToChinese(section) {
    var strIns = '', chnStr = '';
    var unitPos = 0;
    var zero = true;
    while (section > 0) {
      var v = section % 10;
      if (v === 0) {
        if (!zero) {
          zero = true;
          chnStr = this.chnNumChar[v] + chnStr;
        }
      } else {
        zero = false;
        strIns = this.chnNumChar[v];
        strIns += this.chnUnitChar[unitPos];
        chnStr = strIns + chnStr;
      }
      unitPos++;
      section = Math.floor(section / 10);
    }
    return chnStr;
  }
  render() {
    var Cell = this.setCell();
    return Cell;
  }
}
