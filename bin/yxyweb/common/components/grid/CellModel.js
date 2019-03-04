'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _fixedDataTable = require('fixed-data-table-2');

var _input = require('../basic/input');

var _input2 = _interopRequireDefault(_input);

var _hotkeyinput = require('../basic/hotkeyinput');

var _hotkeyinput2 = _interopRequireDefault(_hotkeyinput);

var _inputnumber = require('../basic/inputnumber');

var _inputnumber2 = _interopRequireDefault(_inputnumber);

var _datepicker = require('../basic/datepicker');

var _datepicker2 = _interopRequireDefault(_datepicker);

var _timepicker = require('../basic/timepicker');

var _timepicker2 = _interopRequireDefault(_timepicker);

var _select = require('../basic/select');

var _select2 = _interopRequireDefault(_select);

var _refer = require('../basic/refer');

var _refer2 = _interopRequireDefault(_refer);

var _switch = require('../basic/switch');

var _switch2 = _interopRequireDefault(_switch);

var _labelswitch = require('../basic/labelswitch');

var _labelswitch2 = _interopRequireDefault(_labelswitch);

var _button = require('../basic/button');

var _button2 = _interopRequireDefault(_button);

var _checkbox = require('../basic/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _tag = require('../basic/tag');

var _tag2 = _interopRequireDefault(_tag);

var _col = require('../basic/col');

var _col2 = _interopRequireDefault(_col);

var _row = require('../basic/row');

var _row2 = _interopRequireDefault(_row);

var _switchlabel = require('../basic/switchlabel');

var _switchlabel2 = _interopRequireDefault(_switchlabel);

var _treerefer = require('../basic/treerefer');

var _treerefer2 = _interopRequireDefault(_treerefer);

var _listrefer = require('../basic/listrefer');

var _listrefer2 = _interopRequireDefault(_listrefer);

var _CompositeModel = require('./CompositeModel');

var _CompositeModel2 = _interopRequireDefault(_CompositeModel);

var _checkradio = require('../basic/checkradio');

var _checkradio2 = _interopRequireDefault(_checkradio);

var _cascader = require('../basic/cascader');

var _cascader2 = _interopRequireDefault(_cascader);

var _formatDate = require('../../helpers/formatDate');

var format = _interopRequireWildcard(_formatDate);

var _util = require('../../helpers/util');

var _formatter = require('../../../../common/components/formatter');

var FormatterMap = _interopRequireWildcard(_formatter);

var _UncertainControl = require('./UncertainControl');

var _UncertainControl2 = _interopRequireDefault(_UncertainControl);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { Input, InputNumber, DatePicker, Select, Refer, Switch, LabelSwitch, Button, Checkbox, Tag, Col, Row } from '../basic'


var CellModel = function (_React$Component) {
  _inherits(CellModel, _React$Component);

  function CellModel(props) {
    _classCallCheck(this, CellModel);

    var _this = _possibleConstructorReturn(this, (CellModel.__proto__ || Object.getPrototypeOf(CellModel)).call(this, props));

    _this.getKeyByIndex = function (index, data) {
      var columnKey = null;
      for (var key in data) {
        if (index == data[key]) {
          columnKey = key;
          break;
        }
      }
      return columnKey;
    };

    _this.getCount = function (data, index) {
      var keyIndex = index - 1,
          count = 1;
      for (var i = 0; i < 1000000; i++) {
        if (data[keyIndex] === 1) {
          count = count + 1;
          keyIndex = keyIndex - 1;
        } else {
          break;
        }
      }
      return count;
    };

    _this.onCrChange = function (value, index, columnKey) {
      // this.props.dataList[index][columnKey] = value;
      _this.props.model.setFocusedRowIndex(index);
      _this.props.model.setCellValue(index, columnKey, value, true);
    };

    _this.state = {};
    return _this;
  }

  _createClass(CellModel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
    //组合控件切换浏览态

  }, {
    key: 'setCellBlur',
    value: function setCellBlur(index, columnKey) {
      var data = { rowIndex: index, cellName: columnKey };
      this.props.setCellBlur(data);
    }
    //单元格单击事件

  }, {
    key: 'onCellClick',
    value: function onCellClick(e, index, columnKey) {
      if (!this.props.cellState[index][columnKey].disabled && !this.props.cellState[index][columnKey].readOnly) this.props.onCellClick(e, index, columnKey);
    }
  }, {
    key: 'setCell',
    value: function setCell() {
      var self = this;
      var property = this.props.RowProperty; //行属性
      var col = this.props.Column; //栏目信息
      var controlType = col.cControlType;
      var index = property.rowIndex; //行号
      var cellState = { disabled: false, visible: false, readOnly: false, style: {} }; //单元格状态
      var isColErro = this.props.isColErro; //错误
      if (this.props.cellState[index] && this.props.cellState[index][property.columnKey]) {
        cellState.disabled = this.props.cellState[index][property.columnKey].disabled;
        cellState.visible = this.props.cellState[index][property.columnKey].visible;
        cellState.readOnly = this.props.cellState[index][property.columnKey].readOnly;
        cellState.style = cb.utils.extend(true, {}, this.props.cellState[index][property.columnKey].style);
        cellState.className = this.props.cellState[index][property.columnKey].className;
      }
      cellState.style.height = property.height;
      if (controlType && controlType.trim().toLocaleLowerCase() != 'avatar') cellState.style.padding = '12px 10px';
      cellState.style.lineHeight = '14px';
      if (isColErro) {
        cellState.style.height = cellState.style.height - 1;
        cellState.style.boxSizing = 'border-box';
        cellState.style.borderRadius = '5px';
        cellState.style.border = '1px solid #ff7733';
      }

      var data = this.props.dataList;
      if (data[index]) {
        //操作列
        if (col.cControlType == 'Action') {
          var actionList = this.props.action.controls;
          var actionState = this.props.actionState;
          var actionControl = [];
          if (actionList && actionList.length > 0) {
            actionControl = this.buildActionControls(actionList, true);
            return _react2.default.createElement(
              'div',
              { style: { "width": property.width, "height": property.height, "borderBottom": "1px solid #dbe0e5" } },
              _react2.default.createElement(
                'div',
                { className: 'acticonCell' },
                _react2.default.createElement(
                  _row2.default,
                  null,
                  actionControl
                )
              )
            );
          } else {
            return _react2.default.createElement(
              'div',
              { className: 'acticonCell' },
              _react2.default.createElement(_row2.default, null)
            );
          }
        } else {
          var _Cell = this.RemodelingCell(property, col, cellState);
          return _Cell;
        }
      }
    }
  }, {
    key: 'buildActionControls',
    value: function buildActionControls(actionList, judge) {
      if (!actionList) return;
      var data = this.props.dataList,
          index = this.props.RowProperty.rowIndex,
          actionState = this.props.actionState,
          actionControl = [];
      var _id = data[this.props.showActionIndex] ? data[this.props.showActionIndex]._id : 0;
      actionList.map(function (action) {
        var _this2 = this;

        var icon = action.iStyle === 1 ? null : '#icon-' + action.icon;
        var text = action.iStyle === 2 ? null : action.cShowCaption;

        if (!judge || this.props.showActionIndex == index && actionState[_id] && actionState[_id][action.cItemName].visible) {
          if (action.cControlType != 'popbutton') {
            var temp_action = _react2.default.createElement(
              'span',
              { key: action.cItemName },
              _react2.default.createElement(
                'a',
                { className: 'table-list-btn', onClick: function onClick(e) {
                    return _this2.props.ActionClick(e, action);
                  } },
                text
              )
            );
            actionControl.push(temp_action);
          } else {
            var currentRow = this.dataList[this.props.showActionIndex];
            if (!currentRow) return;
          }
        }
      }, this);
      return actionControl;
    }
    //组织Cell

  }, {
    key: 'RemodelingCell',
    value: function RemodelingCell(rowIndex, col, cellState) {
      var _this3 = this;

      var cControlType = col.cControlType,
          formatter = col.formatter,
          bCanModify = col.bCanModify,
          bJointQuery = col.bJointQuery;

      var index = rowIndex.rowIndex;
      var columnKey = rowIndex.columnKey;
      var data = this.props.dataList;
      var CellStatus = this.state.CellStatus;
      var readOnly = this.props.readOnly;
      var className = "textCol";
      var cellClass = "retail-table-cell";
      cControlType = cControlType ? cControlType : 'Input';
      if (this.props.CellStatus[index]) {
        CellStatus = this.props.CellStatus[index][columnKey]; /*单元格编辑状态*/
      }
      // if (!bCanModify || cellState.disabled) {
      if (this.props.rowStatus[index] && this.props.rowStatus[index].disabled || !bCanModify || cellState.disabled) className = 'public_fixedDataTableCell_disabled textCol';
      // }
      if (cControlType === 'refer' || cControlType.trim().toLocaleLowerCase() === 'refer') {
        cellState.style.textAlign = 'left';
      }
      cellState.style.width = rowIndex.width;
      if (cellState.className && cellState.className != '') className = className + ' ' + cellState.className;
      if (col.className && col.className != '') className = className + ' ' + col.className;
      if (formatter && !CellStatus) {
        var cellObj = formatter(rowIndex, data[index]);
        if (cellObj) {
          if (cellObj.formatterKey) {
            var ComName = FormatterMap[cellObj.formatterKey];
            if (!ComName) return null;
            return _react2.default.createElement(
              _fixedDataTable.Cell,
              { width: rowIndex.width, height: rowIndex.height },
              _react2.default.createElement(
                'div',
                { style: cellState.style, className: 'textCol' },
                _react2.default.createElement(ComName, _extends({ model: this.props.model }, cellObj.props))
              )
            );
          }
          var cellHtml = '',
              cellText = '';
          var cellProps = {};
          if (cellObj.html) {
            cellHtml += cellObj.html;
            cellText += cellObj.text || cellObj.html;
            Object.assign(cellProps, cellObj.props);
          }
          var cellCom = _react2.default.createElement('span', _extends({ title: cellText, dangerouslySetInnerHTML: { __html: cellHtml } }, cellProps));
          /*add by jinzh1 特殊处理 formatter*/
          cellState.style.padding = '0px 0px';
          if (this.props.readOnly) className = "textCol"; /*add by jinzh1 readOnly下放开不能点击控制*/
          return _react2.default.createElement(
            _fixedDataTable.Cell,
            { width: rowIndex.width, height: rowIndex.height },
            _react2.default.createElement(
              'div',
              { style: cellState.style, className: className },
              cellObj && cellObj.override ? null : _react2.default.createElement(
                'span',
                { title: data[index][columnKey] },
                data[index][columnKey]
              ),
              cellCom
            )
          );
        }
      }
      //选择框
      if (columnKey === 'CheckBox') {
        return _react2.default.createElement(
          _fixedDataTable.Cell,
          { width: rowIndex.width, height: rowIndex.height },
          this.RemodelingEditControl(cControlType, index, columnKey, col)
        );
      }
      //行号
      if (columnKey === 'GridRowNo') {
        return _react2.default.createElement(
          _fixedDataTable.Cell,
          { width: rowIndex.width, height: rowIndex.height },
          _react2.default.createElement(
            'div',
            { className: 'rowNo', style: { "width": rowIndex.width, "height": rowIndex.height } },
            index + 1
          )
        );
      }
      if (this.props.mergeCells && this.props.mergeColContrast[columnKey] && col.bMergeCol && !cb.utils.isEmpty(data[index][columnKey])) {
        var ColIndexs = this.props.ColIndexs; /*栏目index对照*/
        var mergeColContrast = this.props.mergeColContrast;
        var dataLen = data.length; /*数据行数*/
        var nowColIndex = ColIndexs[columnKey]; /*当前列 索引*/
        var hasMoreRow = dataLen > index + 1; /*是否存在下一行*/

        mergeColContrast[columnKey][index] = 0;
        if (index == 0) {
          /*第一行*/
          if (hasMoreRow) {
            /*存在下一行*/
            if (nowColIndex == 0) {
              if (data[index][columnKey] == data[index + 1][columnKey]) {
                mergeColContrast[columnKey][index] = 1;
                this.props.setMergeColContrast(mergeColContrast);
                return _react2.default.createElement(_fixedDataTable.Cell, null);
              }
            } else {
              var preColumnKey = this.getKeyByIndex(nowColIndex - 1, ColIndexs);
              if (mergeColContrast[preColumnKey][index] == 1 && data[index][columnKey] == data[index + 1][columnKey] && data[index][preColumnKey] == data[index + 1][preColumnKey]) {
                mergeColContrast[columnKey][index] = 1;
                this.props.setMergeColContrast(mergeColContrast);
                return _react2.default.createElement(_fixedDataTable.Cell, null);
              }
            }
          }
        } else {
          if (nowColIndex == 0) {
            /*第一列*/
            if (mergeColContrast[columnKey][index - 1] == 1) {
              /*前一行合并*/
              if (data[index][columnKey] == data[index - 1][columnKey]) {
                /*需要合并*/
                if (dataLen > index + 1 && data[index][columnKey] == data[index + 1][columnKey]) {
                  /*下一行 需要合并*/
                  mergeColContrast[columnKey][index] = 1;
                  this.props.setMergeColContrast(mergeColContrast);
                  return _react2.default.createElement(_fixedDataTable.Cell, null);
                } else {
                  /*合并的最后一行*/
                  var count = this.getCount(mergeColContrast[columnKey], index);
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
                return _react2.default.createElement(_fixedDataTable.Cell, null);
              }
            }
          } else {
            var _preColumnKey = this.getKeyByIndex(nowColIndex - 1, ColIndexs);
            var preColMerge = mergeColContrast[_preColumnKey][index];
            if (preColMerge == 1) {
              /*前一列当前行  合并*/
              /*当前列 上一行 合并*/
              if (mergeColContrast[columnKey][index - 1]) {
                if (data[index][columnKey] == data[index - 1][columnKey]) {
                  /*需要合并*/
                  if (data[index][columnKey] == data[index + 1][columnKey]) {
                    /*下一行 需要合并*/
                    mergeColContrast[columnKey][index] = 1;
                    this.props.setMergeColContrast(mergeColContrast);
                    return _react2.default.createElement(_fixedDataTable.Cell, null);
                  } else {
                    var _count = this.getCount(mergeColContrast[columnKey], index);
                    cellState.style.marginTop = "-" + _count * this.props.rowHeight / 2;
                    cellState.style.position = "absolute";
                    cellState.style.height = (this.props.rowHeight + _count * this.props.rowHeight) / 2;
                    // cellClass = 'last-merge-cell';
                    mergeColContrast[columnKey][index] = 2;
                  }
                }
              } else {
                if (data[index][columnKey] == data[index + 1][columnKey]) {
                  /*下一行 需要合并*/
                  mergeColContrast[columnKey][index] = 1;
                  this.props.setMergeColContrast(mergeColContrast);
                  return _react2.default.createElement(_fixedDataTable.Cell, null);
                }
              }
            } else if (preColMerge == 2) {
              /*当前列 上一行 合并*/
              if (mergeColContrast[columnKey][index - 1]) {
                if (data[index][columnKey] == data[index - 1][columnKey]) {
                  /*需要合并*/
                  var _count2 = this.getCount(mergeColContrast[columnKey], index);
                  cellState.style.marginTop = "-" + _count2 * this.props.rowHeight / 2;
                  cellState.style.position = "absolute";
                  cellState.style.height = (this.props.rowHeight + _count2 * this.props.rowHeight) / 2;
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
        if (cControlType == 'labelswitch') cellState.style.pointerEvents = 'initial';
        if (this.props.selectIndex == index) {
          return _react2.default.createElement(
            _fixedDataTable.Cell,
            { width: rowIndex.width, height: rowIndex.height },
            _react2.default.createElement(
              'div',
              { style: cellState.style, className: className },
              this.RemodelingEditControl(cControlType, index, columnKey, col)
            )
          );
        } else {
          return _react2.default.createElement(
            _fixedDataTable.Cell,
            { width: rowIndex.width, height: rowIndex.height },
            _react2.default.createElement(
              'div',
              { style: cellState.style, className: className },
              this.RemodelingFormatControl(cControlType, data[index][columnKey], bJointQuery, index, columnKey)
            )
          );
        }
      }
      if (cControlType == 'CheckRadio' && !CellStatus && !readOnly) {
        cellState.style.padding = '4px 10px';
      }
      //不可编辑状态
      if (readOnly) {
        var title = data[index][columnKey];
        if (!cb.utils.isEmpty(title) && (typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
          title = title.text;
        }
        var cName = "textCol";
        if (cellState.className && cellState.className != '') cName = cName + '  ' + cellState.className;
        if (col.className && col.className != '') cName = cName + '  ' + col.className;
        return _react2.default.createElement(
          _fixedDataTable.Cell,
          { width: rowIndex.width, height: rowIndex.height, className: 'retail-table-cell' },
          _react2.default.createElement(
            'div',
            { title: title, className: cName, style: cellState.style },
            this.RemodelingFormatControl(cControlType, data[index][columnKey], bJointQuery, index, columnKey)
          )
        );
      }
      if (!cellState) {
        className = className + 'formatCol';
      }
      return CellStatus ? _react2.default.createElement(
        _fixedDataTable.Cell,
        { width: rowIndex.width, height: rowIndex.height, className: cellClass },
        _react2.default.createElement(
          'div',
          { className: 'editCol', style: cellState.style },
          this.RemodelingEditControl(cControlType, index, columnKey, col)
        )
      ) : _react2.default.createElement(
        _fixedDataTable.Cell,
        { width: rowIndex.width, height: rowIndex.height, className: cellClass },
        _react2.default.createElement(
          'div',
          { style: cellState.style, className: className, onClick: function onClick(e) {
              return _this3.onCellClick(e, index, columnKey);
            } },
          this.RemodelingFormatControl(cControlType, data[index][columnKey], bJointQuery, index, columnKey)
        )
      );
    }
  }, {
    key: 'RemodelingEditControl',

    //构建editControls结构
    value: function RemodelingEditControl(controlType, index, columnKey, col) {
      var _this4 = this;

      var model = this.props.model.getEditRowModel().get(columnKey);
      var disabled = false;
      var NumPoint = 1;
      /*转换iNumPoint为inputNumber控件识别的小数位*/
      if (col.iNumPoint && col.iNumPoint > 1) {
        NumPoint = 0.1;
        NumPoint = Math.pow(NumPoint, col.iNumPoint).toFixed(col.iNumPoint);
      }
      if (this.props.rowStatus[index]) disabled = this.props.rowStatus[index].disabled;
      switch (controlType && controlType.trim().toLocaleLowerCase()) {
        // case 'money':
        //   return <InputNumber focus model={model} iNumPoint={NumPoint} />
        case 'input':
          return _react2.default.createElement(_input2.default, { focus: true, model: model });
        case 'hotkeyinput':
          return _react2.default.createElement(_hotkeyinput2.default, { focus: true, model: model });
        case 'inputnumber':
        case 'money':
        case 'price':
          if (controlType === 'money') NumPoint = cb.rest.AppContext.option.amountofdecimal;else if (controlType === 'price') NumPoint = cb.rest.AppContext.option.monovalentdecimal;
          return _react2.default.createElement(_inputnumber2.default, { className: 'edit-input-number', focus: true, model: model, iNumPoint: col.iNumPoint, cFormatData: col.cFormatData });
        case 'datepicker':
          return _react2.default.createElement(_datepicker2.default, { model: model, className: 'edit-input-number', cFormatData: col.cFormatData });
        case 'timepicker':
          return _react2.default.createElement(_timepicker2.default, { model: model, className: 'edit-input-number' });
        case 'select':
          return _react2.default.createElement(_select2.default, { focus: true, model: model, className: 'edit-input-number' });
        case 'refer':
          return _react2.default.createElement(_refer2.default, { focus: true, model: model, relatedControl: this.buildActionControls(col.relatedActions) });
        case 'switch':
          return _react2.default.createElement(_switch2.default, { focus: true, model: model, className: 'edit-input-number', style: { width: '50%' }, readOnly: false, checkedChildren: '\u662F', unCheckedChildren: '\u5426' });
        case 'checkradio':
          return _react2.default.createElement(_checkradio2.default, { focus: true, model: model, className: 'edit-input-number', style: { width: '50%' }, readOnly: false });
        case 'selectcheckbox':
          //grid首位选择列
          if (this.props.GridProps.isRadio) return _react2.default.createElement(_antd.Radio, { checked: this.props.dataList[index]._selected, onChange: function onChange(e) {
              return _this4.SelectChange(e, index);
            } });else return _react2.default.createElement(_checkbox2.default, { value: this.props.dataList[index]._selected, onChange: function onChange(e, i) {
              return _this4.SelectChange(e, index);
            } });
        case 'labelswitch':
          return _react2.default.createElement(_labelswitch2.default, { focus: true, model: model, style: { width: '50%' }, readOnly: false, checkedChildren: '\u542F', unCheckedChildren: '\u505C' });
        case 'scheckbox':
          return _react2.default.createElement(_checkbox2.default, { model: model, disabled: disabled });
        case 'tag':
          return disabled ? _react2.default.createElement(_tag2.default, { model: model, disabled: true, color: '', closable: false, cRefType: this.props.Column.cRefType, refReturn: this.props.Column.refReturn, cRefRetId: this.props.Column.cRefRetId }) : _react2.default.createElement(_tag2.default, { model: model, disabled: false, color: 'blue', closable: true, cRefType: this.props.Column.cRefType, refReturn: this.props.Column.refReturn, cRefRetId: this.props.Column.cRefRetId });
        case 'treerefer':
          return _react2.default.createElement(_treerefer2.default, { model: model });
        case 'listrefer':
          return _react2.default.createElement(_listrefer2.default, { model: model });
        case 'cascader':
          return _react2.default.createElement(_cascader2.default, { model: model });
        case 'composite':
          var compositeControl = this.props.compositeControl[index][columnKey];
          var rowModel = this.props.model.getEditRowModel();
          return _react2.default.createElement(_CompositeModel2.default, { compositeControl: compositeControl, visible: false, width: col.iColWidth, height: this.props.rowHeight, cellState: this.props.cellState[index][columnKey], rowModel: rowModel, setCellBlur: function setCellBlur() {
              return _this4.setCellBlur(index, columnKey);
            } });
        case 'uncertain':
          return _react2.default.createElement(_UncertainControl2.default, _extends({ model: model, cellConfig: this.props.dataList[index].cellConfig || null }, this.props));

      }
    }
    ///////////////////////////////////////////////Begin-为comboGrid形式的控件单独支持的方法//////////////////////////////////////////////////////////////////////////
    //switchChange控件点击改变事件

  }, {
    key: 'switchChange',
    value: function switchChange(value, index, columnKey) {
      this.props.dataList[index][columnKey] = value;
      this.props.model.setFocusedRowIndex(index);
      this.props.model.setCellValue(index, columnKey, this.props.dataList[index][columnKey], true);
    }
    //CheckBoxg改变事件

  }, {
    key: 'CheckBoxOnChange',
    value: function CheckBoxOnChange(value, index, columnKey) {
      this.props.dataList[index][columnKey] = value;
      this.props.model.setFocusedRowIndex(index);
      this.props.model.setCellValue(index, columnKey, value, true);
    }
    //

  }, {
    key: 'referClikc',
    value: function referClikc(index, columnKey) {
      this.props.model.setFocusedRowIndex(index);
      var model = this.props.model.getEditRowModel().get(columnKey);
      model.browse();
    }
    //

  }, {
    key: 'TagOnClose',
    value: function TagOnClose(key, index, columnKey) {
      this.props.model.setFocusedRowIndex(index);
      var model = this.props.model.getEditRowModel().get(columnKey);
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

  }, {
    key: 'RemodelingFormatControl',
    value: function RemodelingFormatControl(controlType, text, bJointQuery, index, columnKey) {
      var _this5 = this;

      var disabled = false;
      if (this.props.rowStatus[index]) disabled = this.props.rowStatus[index].disabled;
      switch (controlType && controlType.trim().toLocaleLowerCase()) {
        case 'refer':
        case 'treerefer':
        case 'listrefer':
          {
            var formatText = text != null && (typeof text === 'undefined' ? 'undefined' : _typeof(text)) === 'object' ? text.name : text;
            return bJointQuery ? _react2.default.createElement(
              'a',
              { onClick: function onClick(e) {
                  return _this5.handleJointQuery(e, index, columnKey);
                } },
              formatText
            ) : formatText;
          }
        case 'select':
          {
            if (cb.utils.isEmpty(text)) return text;
            var _formatText = null;
            if ((typeof text === 'undefined' ? 'undefined' : _typeof(text)) !== 'object') _formatText = text;else if (text.nameType === 'icontext') _formatText = _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_antd.Icon, { type: text.icon }),
              text.text
            );else if (text.nameType === 'icon') _formatText = _react2.default.createElement(_antd.Icon, { type: text.icon });else _formatText = text.text;
            return bJointQuery ? _react2.default.createElement(
              'a',
              { onClick: function onClick(e) {
                  return _this5.handleJointQuery(e, index, columnKey);
                } },
              _formatText
            ) : _formatText;
            return (typeof text === 'undefined' ? 'undefined' : _typeof(text)) === 'object' ? text.text : text;
          }
        case 'switch':
          return _react2.default.createElement(_switch2.default, { className: 'edit-input-number', checked: Boolean(text), readOnly: true, checkedChildren: '\u662F', unCheckedChildren: '\u5426' });
        case 'checkradio':
          // return <CheckRadio className={'edit-input-number'} checked={Boolean(text)} readOnly={true} />
          return _react2.default.createElement(_checkradio2.default, { focus: true, className: 'edit-input-number', checked: Boolean(text), style: { width: '50%' }, onChange: function onChange(checked) {
              return _this5.onCrChange(checked, index, columnKey);
            }, readOnly: this.props.readOnly });
        case 'vouchermoney':
          var money = this.buildMoney(text);
          return money;
        case 'labelswitch':
          return _react2.default.createElement(_labelswitch2.default, { checkedChildren: '启', unCheckedChildren: '停', value: text, onChange: function onChange(checked) {
              return _this5.switchChange(checked, index, columnKey);
            } });
        case 'switchlabel':
          return _react2.default.createElement(_switchlabel2.default, { value: text });
        case 'scheckbox':
          return _react2.default.createElement(_checkbox2.default, { disabled: disabled, value: text, onChange: function onChange(value) {
              return _this5.CheckBoxOnChange(value, index, columnKey);
            } });
        case 'tag':
          return _react2.default.createElement(_tag2.default, {
            disabled: disabled,
            cRefType: this.props.Column.cRefType,
            refReturn: this.props.Column.refReturn,
            cRefRetId: this.props.Column.cRefRetId,
            closable: !disabled,
            tagData: text,
            color: 'blue',
            onClose: function onClose(key) {
              return _this5.TagOnClose(key, index, columnKey);
            },
            referClikc: function referClikc() {
              return _this5.referClikc(index, columnKey);
            }
          });
        case 'composite':
          var CompositeJson = JSON.parse(this.props.CompositeLayout[index][columnKey]);
          var compositeData = this.analysisComposite(CompositeJson, index);
          return compositeData;
        case 'inputnumber':
        case 'money':
        case 'price':
          if (cb.utils.isEmpty(text)) return '';
          if (isNaN(text)) return text;

          /*谓词变量支持系统参数*/
          var cFormatData = this.props.Column.cFormatData;
          try {
            if (!cFormatData || cFormatData == '') {
              cFormatData = {};
            } else {
              cFormatData = JSON.parse(cFormatData);
            }
          } catch (e) {
            cb.utils.alert('数量/金额/单价，预制错误！', 'error');
          }
          var iNumPoint = this.props.Column.iNumPoint;
          var decimal = cFormatData.decimal ? (0, _util.getPredicateValue)(cFormatData.decimal) : null;
          if (controlType === 'money') {
            if (decimal) iNumPoint = decimal;else iNumPoint = cb.rest.AppContext.option.amountofdecimal;
          } else if (controlType === 'price') {
            if (decimal) iNumPoint = decimal;else iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
          } else {
            if (decimal) iNumPoint = decimal;else if (cb.utils.isEmpty(iNumPoint)) iNumPoint = null;
          }

          if (!isNaN(iNumPoint) && iNumPoint != null) {
            text = parseFloat(text);
            text = (0, _util.getRoundValue)(text, iNumPoint);
          }

          if (cFormatData.after) text = text + cFormatData.after;

          return text;
        case 'datepicker':
          if (text) {
            var fmt = 'YYYY-MM-dd';
            if (this.props.Column.cFormatData && this.props.Column.cFormatData != '') {
              fmt = this.props.Column.cFormatData;
            }
            text = format.dateFormat(new Date(text), fmt);
          }
          return text;
        case 'avatar':
          var displaymode = 'default';
          var cStyle = this.props.Column.cStyle;

          if (cStyle) {
            try {
              displaymode = JSON.parse(cStyle).displaymode || displaymode;
            } catch (e) {}
          }
          var className = 'cell-avatar-' + displaymode;
          if (!text || text == '') {
            return _react2.default.createElement('div', { className: 'no-avatar-man ' + className });
          } else {
            var style = {};
            style.height = this.props.rowHeight;
            style.width = this.props.rowHeight;
            return _react2.default.createElement('img', { className: className, src: text + '?imageView2/1/w/80/h/80', style: style });
          }
        case 'uncertain':
          text = this.getUncertainFormatValue(text, index, columnKey);
          return text;
        case 'specialcom':
          text = this.getSpecalValue(index);
          return text;
      }
      if (text === '') return '';
      return bJointQuery ? _react2.default.createElement(
        'a',
        { onClick: function onClick(e) {
            return _this5.handleJointQuery(e, index, columnKey);
          } },
        text
      ) : text;
    }
    /*获取特殊列的显示值*/

  }, {
    key: 'getSpecalValue',
    value: function getSpecalValue(index) {
      var column = this.props.Column;
      var cStyle = column.cStyle;
      try {
        cStyle = JSON.parse(cStyle);
      } catch (e) {
        cb.utils.alert('specialcom  cstyle预制错误！');
        return;
      }
      var _cStyle = cStyle,
          Separator = _cStyle.Separator,
          dataSource = _cStyle.dataSource,
          columns = _cStyle.columns;

      var row = this.props.dataList[index];
      var data = row[dataSource];
      var cols = columns.split(',');
      var controls = [];
      if (!Separator) Separator = '';
      data && data.map(function (row) {
        var temp = [];
        var colLen = cols ? cols.length : 0;
        cols && cols.map(function (col, index) {
          if (index == colLen - 1) {
            temp.push(_react2.default.createElement(
              'div',
              { className: 'special_col' },
              row[col]
            ));
          } else {
            temp.push(_react2.default.createElement(
              'div',
              { className: 'special_col' },
              row[col]
            ));
            temp.push(_react2.default.createElement(
              'div',
              { className: 'special_separator' },
              Separator
            ));
          }
        });
        controls.push(_react2.default.createElement(
          'div',
          { className: 'special-row' },
          temp
        ));
      });
      return _react2.default.createElement(
        'div',
        { className: 'special-rows' },
        controls
      );
    }
    /*获取不确定列的显示值*/

  }, {
    key: 'getUncertainFormatValue',
    value: function getUncertainFormatValue(text, index, columnKey) {
      if (this.props.dataList[index][columnKey] == null || this.props.dataList[index][columnKey] == "") return "";
      var cellConfig = this.props.dataList[index].cellConfig || null;
      if (!cellConfig) return text;
      var controlType = cellConfig.cControlType;
      switch (controlType && controlType.trim().toLocaleLowerCase()) {
        case 'refer':
        case 'treerefer':
        case 'listrefer':
          return text;
        case 'select':
        case 'radio':
        case 'checkboxenum':
          var cEnumString = cellConfig.cEnumString;
          try {
            if (!cEnumString || cEnumString == '') {
              cEnumString = {};
            } else {
              cEnumString = JSON.parse(cEnumString);
            }
          } catch (e) {
            cb.utils.alert('cEnumString，预制错误！', 'error');
          }
          if ((typeof text === 'undefined' ? 'undefined' : _typeof(text)) === 'object') {
            var temp = '';
            text.map(function (t) {
              temp = temp == '' ? cEnumString[t] : temp + ',' + cEnumString[t];
            });
            text = temp;
          } else {
            if (text && text.split(',') && text.split(',').length > 1) {
              var tem_text = text.split(',');
              text = '';
              tem_text.map(function (t) {
                text = text == '' ? cEnumString[t] : text + ',' + cEnumString[t];
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
          var cFormatData = cellConfig.cFormatData;
          try {
            if (!cFormatData || cFormatData == '') {
              cFormatData = {};
            } else {
              cFormatData = JSON.parse(cFormatData);
            }
          } catch (e) {
            cb.utils.alert('数量/金额/单价，预制错误！', 'error');
          }
          var iNumPoint = cellConfig.iNumPoint;
          var decimal = cFormatData.decimal ? (0, _util.getPredicateValue)(cFormatData.decimal) : null;
          if (controlType === 'money') {
            if (decimal) iNumPoint = decimal;else iNumPoint = cb.rest.AppContext.option.amountofdecimal;
          } else if (controlType === 'price') {
            if (decimal) iNumPoint = decimal;else iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
          } else {
            if (decimal) iNumPoint = decimal;else if (cb.utils.isEmpty(iNumPoint)) iNumPoint = null;
          }

          if (!isNaN(iNumPoint) && iNumPoint != null) {
            text = parseFloat(text);
            text = (0, _util.getRoundValue)(text, iNumPoint);
          }

          if (cFormatData.after) text = text + cFormatData.after;

          return text;
        case 'datepicker':
          if (text) {
            var fmt = 'YYYY-MM-dd';
            if (cellConfig.cFormatData && cellConfig.cFormatData != '') {
              fmt = cellConfig.cFormatData;
            }
            text = format.dateFormat(new Date(text), fmt);
          }
          return text;
      }
      return text;
    }
  }, {
    key: 'analysisComposite',

    //解析浏览态的复合组件行
    value: function analysisComposite(Json, index) {
      var self = this;
      var rowData = self.props.dataList[index];
      if (Json.length < 0) return;
      var Control = [];
      Json.map(function (r) {
        var Row = self.analysisRow(r, rowData);
        if (!Row) return;
        Control.push(Row);
      });
      return Control;
    }
    //解析复合组件row

  }, {
    key: 'analysisRow',
    value: function analysisRow(rowJson, rowData) {
      var self = this;
      if (rowJson.row.length < 0) return;
      var RowControl = [];
      var Col = void 0;
      rowJson.row.map(function (c) {
        Col = self.analysisCol(c, rowData);
        if (!Col) return false;
        RowControl.push(Col);
      });
      if (RowControl.length <= 0) return false;
      return _react2.default.createElement(
        _row2.default,
        { style: { 'height': 'initial' } },
        RowControl
      );
    }
    //解析复合组件col

  }, {
    key: 'analysisCol',
    value: function analysisCol(colJson, rowData) {
      var self = this;
      if (colJson.col.length < 0) return;
      var ColControl = [];
      var colData = void 0;
      colJson.col.map(function (item) {
        var colspan = item.colspan;
        var style = item.style;
        var caption = self.props.model.getColumn(item.cItemName).cShowCaption;
        if (rowData[item.cItemName] == undefined || rowData[item.cItemName] == '' || rowData[item.cItemName] == "undefined") return false;
        var showCaption = item.bShowCaption ? caption + ':' + rowData[item.cItemName] : rowData[item.cItemName];
        colData = _react2.default.createElement(
          _col2.default,
          { key: item.cItemName, span: colspan },
          _react2.default.createElement(
            'div',
            { style: style },
            showCaption
          )
        );
        ColControl.push(colData);
      });
      if (ColControl.length <= 0) return false;
      return ColControl;
    }
    //创建凭证所需金额显示模块

  }, {
    key: 'buildMoney',
    value: function buildMoney(value) {
      var MoneyData = [];
      var FormatData = value;
      FormatData = FormatData * 1;
      if (FormatData !== 0) {
        var Money = FormatData.toFixed(2); //格式化数字为两位精度小数
        var length = Money.length;
        for (var i = 0; i < length; i++) {
          MoneyData.push(Money[i]);
        }
        MoneyData.reverse();
        MoneyData.splice(2, 1);
      }
      return _react2.default.createElement(
        _fixedDataTable.Cell,
        null,
        _react2.default.createElement(
          _row2.default,
          { className: "CredentialsBody" },
          _react2.default.createElement(
            'ul',
            { className: "CredentialsMoney" },
            _react2.default.createElement(
              'li',
              { className: "firstCol" },
              MoneyData[10]
            ),
            _react2.default.createElement(
              'li',
              null,
              MoneyData[9]
            ),
            _react2.default.createElement(
              'li',
              null,
              MoneyData[8]
            ),
            _react2.default.createElement(
              'li',
              { className: "lineBlue" },
              MoneyData[7]
            ),
            _react2.default.createElement(
              'li',
              null,
              MoneyData[6]
            ),
            _react2.default.createElement(
              'li',
              null,
              MoneyData[5]
            ),
            _react2.default.createElement(
              'li',
              { className: "lineBlue" },
              MoneyData[4]
            ),
            _react2.default.createElement(
              'li',
              null,
              MoneyData[3]
            ),
            _react2.default.createElement(
              'li',
              null,
              MoneyData[2]
            ),
            _react2.default.createElement(
              'li',
              { className: "lineRed" },
              MoneyData[1]
            ),
            _react2.default.createElement(
              'li',
              null,
              MoneyData[0]
            )
          )
        )
      );
    }
  }, {
    key: 'handleJointQuery',
    value: function handleJointQuery(e, index, columnKey) {
      var dataArry = this.props.dataList;
      var rowData = dataArry[index];
      // this.props.model.fireEvent('dblClick', rowData);
      this.props.model.execute('cellJointQuery', {
        rowIndex: index,
        cellName: columnKey
      });
    }
    //操作列 点击事件

  }, {
    key: 'ActionClick',
    value: function ActionClick(e, index, action) {
      this.props.model.select(index);
      var viewModel = this.props.model.getParent();
      while (viewModel.getParent()) {
        viewModel = viewModel.getParent();
      }var params = { index: index, cItemName: action.cItemName };
      viewModel.get(action.cItemName).fireEvent('click', params);
      this.props.model.unselect(index);
    }
    //监听选择

  }, {
    key: 'SelectChange',
    value: function SelectChange(checked, index) {
      if ((typeof checked === 'undefined' ? 'undefined' : _typeof(checked)) == 'object') checked = checked.target.checked;
      var all = false;
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

  }, {
    key: 'NumberToChinese',
    value: function NumberToChinese(num) {
      var unitPos = 0;
      var strIns = '',
          chnStr = '';
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
        strIns += section !== 0 ? this.chnUnitSection[unitPos] : this.chnUnitSection[0];
        chnStr = strIns + chnStr;
        needZero = section < 1000 && section > 0;
        num = Math.floor(num / 10000);
        unitPos++;
      }

      return chnStr;
    }
    //金额转换辅助函数

  }, {
    key: 'SectionToChinese',
    value: function SectionToChinese(section) {
      var strIns = '',
          chnStr = '';
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
  }, {
    key: 'render',
    value: function render() {
      var Cell = this.setCell();
      return Cell;
    }
  }]);

  return CellModel;
}(_react2.default.Component);

exports.default = CellModel;