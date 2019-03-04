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

var _checkbox = require('../basic/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _row = require('../basic/row');

var _row2 = _interopRequireDefault(_row);

var _formatDate = require('../../helpers/formatDate');

var format = _interopRequireWildcard(_formatDate);

var _util = require('../../helpers/util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CellModel = function (_React$Component) {
  _inherits(CellModel, _React$Component);

  function CellModel(props) {
    _classCallCheck(this, CellModel);

    var _this = _possibleConstructorReturn(this, (CellModel.__proto__ || Object.getPrototypeOf(CellModel)).call(this, props));

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
      }
      cellState.style.height = property.height;
      if (controlType && controlType.trim().toLocaleLowerCase() != 'avatar') cellState.style.padding = '12px 10px';
      cellState.style.lineHeight = '14px';
      if (isColErro) {
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
            actionList.map(function (action) {
              var _this2 = this;

              var icon = action.iStyle === 1 ? null : '#icon-' + action.icon;
              var text = action.iStyle === 2 ? null : action.cShowCaption;

              if (actionState[index] && actionState[index][action.cItemName].visible) {
                if (action.cControlType != 'popbutton') {
                  var temp_action = _react2.default.createElement(
                    'span',
                    { key: action.cItemName },
                    _react2.default.createElement(
                      'a',
                      { className: 'table-list-btn', onClick: function onClick(e) {
                          return _this2.props.ActionClick(e, action, index);
                        } },
                      _react2.default.createElement(_antd.Icon, { type: 'delete' })
                    )
                  );
                  actionControl.push(temp_action);
                }
              }
            }, this);
            return _react2.default.createElement(
              'div',
              { className: 'acticonCell' },
              _react2.default.createElement(
                _row2.default,
                null,
                actionControl
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
      var readOnly = this.props.readOnly;
      var className = "textCol";
      cControlType = cControlType ? cControlType : 'Input';
      if (cControlType === 'refer' || cControlType.trim().toLocaleLowerCase() === 'refer') {
        cellState.style.textAlign = 'left';
      }
      cellState.style.width = rowIndex.width;
      if (formatter) {
        var cellObj = formatter(rowIndex, data[index]);
        var cellHtml = '',
            cellText = '';
        var cellProps = {};
        if (cellObj && cellObj.html) {
          cellHtml += cellObj.html;
          cellText += cellObj.text || cellObj.html;
          Object.assign(cellProps, cellObj.props);
        }
        var cellCom = _react2.default.createElement('span', _extends({ title: cellText, dangerouslySetInnerHTML: { __html: cellHtml } }, cellProps));
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
      //行号
      if (columnKey === 'GridRowNo') {
        return _react2.default.createElement(
          _fixedDataTable.Cell,
          { width: rowIndex.width, height: rowIndex.height },
          index + 1
        );
      }
      //选择框
      if (columnKey === 'CheckBox') {
        if (this.props.GridProps.isRadio || this.props.hasAction) {
          return _react2.default.createElement(
            _fixedDataTable.Cell,
            { className: 'retail-table-checkbox', width: rowIndex.width, height: rowIndex.height },
            _react2.default.createElement(_antd.Radio, { checked: this.props.dataList[index]._selected,
              onChange: function onChange(e) {
                return _this3.SelectChange(e, index);
              } })
          );
        } else {
          return _react2.default.createElement(
            _fixedDataTable.Cell,
            { className: 'retail-table-checkbox', width: rowIndex.width, height: rowIndex.height },
            _react2.default.createElement(_checkbox2.default, { value: this.props.dataList[index]._selected,
              onChange: function onChange(e, i) {
                return _this3.SelectChange(e, index);
              } })
          );
        }
      }
      return _react2.default.createElement(
        _fixedDataTable.Cell,
        { width: rowIndex.width, height: rowIndex.height, className: 'retail-table-cell' },
        _react2.default.createElement(
          'div',
          { title: data[index][columnKey], className: 'textCol', style: cellState.style },
          this.RemodelingFormatControl(cControlType, data[index][columnKey], bJointQuery, index, columnKey)
        )
      );
    }
    ///////////////////////////////////////////////End-为comboGrid形式的控件单独支持的方法////////////////////////////////////////////////////////////////////////
    //构建formatControls结构

  }, {
    key: 'RemodelingFormatControl',
    value: function RemodelingFormatControl(controlType, text, bJointQuery, index, columnKey) {
      var _this4 = this;

      switch (controlType && controlType.trim().toLocaleLowerCase()) {
        case 'refer':
        case 'treerefer':
        case 'listrefer':
          {
            var formatText = text != null && (typeof text === 'undefined' ? 'undefined' : _typeof(text)) === 'object' ? text.name : text;
            return bJointQuery ? _react2.default.createElement(
              'a',
              { onClick: function onClick(e) {
                  return _this4.handleJointQuery(e, index, columnKey);
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
                  return _this4.handleJointQuery(e, index, columnKey);
                } },
              _formatText
            ) : _formatText;
            return (typeof text === 'undefined' ? 'undefined' : _typeof(text)) === 'object' ? text.text : text;
          }
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
          text = parseFloat(text);
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
          if (!text || text == '') {
            return _react2.default.createElement('div', { className: 'no-avatar-man' });
          } else {
            var style = {};
            style.height = this.props.rowHeight;
            style.width = this.props.rowHeight;
            return _react2.default.createElement('img', { src: text + '?imageView2/1/w/80/h/80', style: style });
          }
      }
      if (text === '') return '';
      return bJointQuery ? _react2.default.createElement(
        'a',
        { onClick: function onClick(e) {
            return _this4.handleJointQuery(e, index, columnKey);
          } },
        text
      ) : text;
    }
    //监听选择

  }, {
    key: 'SelectChange',
    value: function SelectChange(checked, index) {
      if ((typeof checked === 'undefined' ? 'undefined' : _typeof(checked)) == 'object') checked = checked.target.checked;
      var all = false;
      if (this.props.GridProps.isRadio || this.props.hasAction) all = true;
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