'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fixedDataTable = require('fixed-data-table-2');

var _antd = require('antd');

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('../../helpers/util');

var _popover = require('../../../../common/components/popover');

var PopoverMap = _interopRequireWildcard(_popover);

var _TreeTableEditCell = require('../grid/TreeTableEditCell');

var _TreeTableEditCell2 = _interopRequireDefault(_TreeTableEditCell);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTable = function (_Component) {
  _inherits(TreeTable, _Component);

  function TreeTable(props) {
    _classCallCheck(this, TreeTable);

    var _this = _possibleConstructorReturn(this, (TreeTable.__proto__ || Object.getPrototypeOf(TreeTable)).call(this, props));

    _this.setColumns = function (columndata) {
      var columns = [],
          actionMeta = _this.props.actionMeta;
      columns.push({
        "cFieldName": "expandCol", "cItemName": "expandCol", "cCaption": "", "cShowCaption": "",
        "iColWidth": 30, "cControlType": "expand", "iAlign": 2
      });
      if (actionMeta && actionMeta.controls) {
        columns.push({
          "cFieldName": "action", "cItemName": "action", "cCaption": "", "cShowCaption": "",
          "iColWidth": _this.fixedwidth, "cControlType": "action", "iAlign": 2, "fixedRight": true
        });
      }
      _lodash2.default.forEach(columndata, function (column, key) {
        columns.push(column);
      });
      _this.setState({ columns: columns });
    };

    _this.setActionState = function (data) {
      var rowKey = _this.state.rowKey;
      var key = data.key,
          itemName = data.itemName,
          name = data.name,
          value = data.value;

      _this.actionState[key][itemName][name] = value;
      _this.setState({ rowKey: rowKey });
    };

    _this.setActionsState = function (data) {
      if (data && data.length > 0) {
        var rowKey = _this.state.rowKey;
        data.map(function (row) {
          _this.actionState[row.key][row.itemName][row.name] = row.value;
        });
        _this.setState({ rowKey: rowKey });
      }
    };

    _this.setShowActionRows = function (rows) {
      if ((typeof rows === 'undefined' ? 'undefined' : _typeof(rows)) == 'object' && rows.length > 0) {
        rows.map(function (row) {
          if (_this.keyMap[row.rowKey]) _this.keyMap[row.rowKey].showAction = row.showAction;
        });
      } else {
        console.log('setShowActionRows------参数错误！');
      }
    };

    _this.getKeyMap = function (data, rowKey) {
      var actionList = _this.props.actionMeta ? _this.props.actionMeta.controls : [];
      var contrast = {};
      data.map(function (item) {
        var key = item[rowKey];
        contrast[key] = { "isExpand": false, "showAction": false, "isEnd": item.isEnd, "level": item.level, "parent": item.parent, "key": key, "row": item };
        if (_this.state.expandAllRow) contrast[key].isExpand = true;
        if (_this.keyMap[key] && _this.keyMap[key].isExpand) contrast[key].isExpand = _this.keyMap[key].isExpand;
        _this.keyMap[key] = contrast[key];
        _this.cellStatus[key] = {};
        _this.actionState[key] = {};
        actionList.map(function (action) {
          if (!_this.actionState[key][action.cItemName]) _this.actionState[key][action.cItemName] = { disabled: false, visible: true };
        });
        if (item.children) contrast[key].children = _this.getKeyMap(item.children, rowKey, {}, status);
      });
      return contrast;
    };

    _this.setExpandRow = function (data) {
      if (!data) return;
      var rowKey = data.rowKey,
          isExpand = data.isExpand;

      if (_this.keyMap[rowKey]) {
        _this.selectRowIndex = rowKey;
        var parentRowKey = _this.keyMap[rowKey].parent;
        _this.keyMap[parentRowKey].isExpand = isExpand;
      }
      _this.setState({ "rowKey": _this.state.rowKey });
    };

    _this.handleRowClick = function (e, index) {
      var _this$state = _this.state,
          dataSource = _this$state.dataSource,
          rowKey = _this$state.rowKey;

      var selectKey = '';
      if (e) {
        /*点击是否为扩展行*/
        var target = e.target;
        var className = target.className ? target.className : '';
        if (className.indexOf('expand-row') >= 0 || className.indexOf('expand-col') >= 0) {
          _this.selectRowIndex = target.id;
          _this.setState({ rowKey: rowKey });
          return;
        }
      }
      if ((typeof index === 'undefined' ? 'undefined' : _typeof(index)) == 'object') {
        selectKey = _this.keyMap[index.key].row[rowKey];
      } else {
        _this.selectRowIndex = index;
        if (dataSource.length == 0 || !dataSource[index]) return;
        selectKey = dataSource[index][rowKey];
      }
      if (_this.props.model) _this.props.model.select(selectKey);
    };

    _this.getColumnControl = function () {
      var columns = _this.state.columns;

      var ret = [];
      columns.map(function (col) {
        var column = this.getColumn(col);
        ret.push(column);
      }, _this);

      return ret;
    };

    _this.getColumn = function (col) {
      var bIsNull = col.bIsNull,
          cShowCaption = col.cShowCaption,
          fixedRight = col.fixedRight,
          iAlign = col.iAlign,
          cItemName = col.cItemName,
          iColWidth = col.iColWidth,
          bCanModify = col.bCanModify;

      var headerCell = _react2.default.createElement(
        _fixedDataTable.Cell,
        null,
        _react2.default.createElement(
          'div',
          { className: 'billing-head-name' },
          cShowCaption
        )
      );
      if (bCanModify && !bIsNull && _this.state.readOnly === false) headerCell = _react2.default.createElement(
        _fixedDataTable.Cell,
        null,
        _react2.default.createElement(
          'div',
          { className: 'billing-head-name' },
          _react2.default.createElement(
            'div',
            { 'class': 'red-star' },
            '*'
          ),
          cShowCaption
        )
      );
      var width = void 0,
          align = void 0,
          fixed = false;
      width = isNaN(parseFloat(iColWidth)) ? 200 : parseFloat(iColWidth);
      if (iAlign === 1) align = 'left';else if (iAlign === 2) align = 'center';else align = 'right';
      if (fixedRight) {
        return _react2.default.createElement(_fixedDataTable.Column, { key: cItemName,
          allowCellsRecycling: true, columnKey: cItemName,
          header: headerCell, cell: function cell(rowIndex) {
            return _this.setCell(rowIndex, col);
          },
          width: width, align: 'center', fixedRight: true });
      } else {
        return _react2.default.createElement(_fixedDataTable.Column, { key: cItemName,
          allowCellsRecycling: true, columnKey: cItemName,
          header: headerCell, cell: function cell(rowProperty) {
            return _this.setCell(rowProperty, col);
          },
          width: width, align: align, fixed: fixed });
      }
    };

    _this.setCell = function (rowProperty, col) {
      var dataSource = _this.state.dataSource;

      var index = rowProperty.rowIndex;
      var row = dataSource[index];

      var text = _this.compareCell(row, col, index);
      var titile = text;
      if ((typeof text === 'undefined' ? 'undefined' : _typeof(text)) == 'object') {
        if (text.props && _typeof(text.props.children) != 'object') titile = text.props.children;else titile = '';
      }
      return _react2.default.createElement(
        _fixedDataTable.Cell,
        { width: rowProperty.width, height: _this.rowHeight, className: 'billing-table-cell' },
        _react2.default.createElement(
          'div',
          { title: titile, className: 'cell-text', onClick: function onClick(e) {
              return _this.onCellClick(e, col, index);
            } },
          text
        )
      );
    };

    _this.compareCell = function (row, col, index, bExpand) {
      var rowKey = _this.state.rowKey;
      var ctrlType = col.cControlType && col.cControlType.trim().toLocaleLowerCase();
      var cItemName = col.cItemName,
          bCanModify = col.bCanModify,
          bJointQuery = col.bJointQuery;

      var text = cb.utils.isEmpty(row[cItemName]) ? "" : row[cItemName];
      // if (this.state.readOnly === false) {
      if (bCanModify && _this.state.readOnly === false) {
        var bEditCell = false;
        if (bExpand) {
          bEditCell = _this.cellStatus[index.key] ? _this.cellStatus[index.key][cItemName] : false;
        } else {
          var key = _this.state.dataSource[index][rowKey];
          bEditCell = _this.cellStatus[key] ? _this.cellStatus[key][cItemName] : false;
        }
        if (bEditCell) {
          return _react2.default.createElement(_TreeTableEditCell2.default, _extends({}, _this.state, _this.props, { bExpand: bExpand, keyMap: _this.keyMap,
            column: col, rowIndex: index, onCellBlur: _this.onCellBlur, row: row
          }));
        }
      }
      // this.editCellModel
      switch (ctrlType) {
        case 'select':
          return _this.renderSelect(col, text);
        case 'inputnumber':
        case 'money':
        case 'price':
          if (cb.utils.isEmpty(text)) return '';
          if (isNaN(text)) return text;

          /*谓词变量支持系统参数*/
          var cFormatData = col.cFormatData;
          try {
            if (!cFormatData || cFormatData == '') {
              cFormatData = {};
            } else {
              cFormatData = JSON.parse(cFormatData);
            }
          } catch (e) {
            cb.utils.alert('数量/金额/单价，预制错误！', 'error');
          }
          var iNumPoint = col.iNumPoint;
          var decimal = cFormatData.decimal ? (0, _util.getPredicateValue)(cFormatData.decimal) : null;
          if (ctrlType === 'money') {
            if (decimal) iNumPoint = decimal;else iNumPoint = cb.rest.AppContext.option.amountofdecimal;
          } else if (ctrlType === 'price') {
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
        case 'expand':
          var isExpand = void 0;
          if (row.children) {
            if (bExpand) isExpand = _this.keyMap[index.key].isExpand;else isExpand = _this.keyMap[row[rowKey]].isExpand;

            if (isExpand) text = _react2.default.createElement(
              'div',
              { className: 'expand-icon', onClick: function onClick(e) {
                  return _this.onExpandClick(e, index);
                } },
              _react2.default.createElement(_antd.Icon, { type: 'minus-square-o' })
            );else text = _react2.default.createElement(
              'div',
              { className: 'expand-icon', onClick: function onClick(e) {
                  return _this.onExpandClick(e, index);
                } },
              _react2.default.createElement(_antd.Icon, { type: 'plus-square-o' })
            );
          } else {
            text = "";
          }
          break;
        case 'checkbox':
          if (text == null || text == '') text = false;
          var indeterminate = _this.getIndeterminate(index, col.cItemName, bExpand);
          if (indeterminate) text = 0;
          return _react2.default.createElement(_antd.Checkbox, { onChange: function onChange(e) {
              return _this.onCheckChange(e, index, col.cItemName, bExpand);
            }, checked: text, indeterminate: indeterminate });
          break;
        case 'action':
          text = _this.getActionControl(index);
          return text;
      }
      return bJointQuery ? _react2.default.createElement(
        'a',
        { className: 'joinQueryCell', onClick: function onClick(e) {
            return _this.handleJointQuery(e, index, cItemName);
          } },
        text
      ) : text;
    };

    _this.onCellBlur = function (value, bExpand, rowIndex, cItemName, updateData) {
      var node = void 0,
          key = void 0;
      if (bExpand) {
        node = _this.keyMap[rowIndex.key].row;
        key = rowIndex.key;
      } else {
        var _this$state2 = _this.state,
            dataSource = _this$state2.dataSource,
            rowKey = _this$state2.rowKey;

        node = dataSource[rowIndex];
        key = node[rowKey];
      }
      if (updateData) {
        if (!cb.utils.isEmpty(value) && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
          for (var a in value) {
            node[a] = value[a];
          }
        } else {
          node[cItemName] = value;
        }
        _this.props.model.updateNode(node);
      }
      _this.cellStatus[key][cItemName] = false;
      _this.setState({ rowKey: _this.state.rowKey });
    };

    _this.onCellClick = function (e, col, index, isExpand) {
      // if (this.state.readOnly) return;
      if (!col.bCanModify || _this.state.readOnly) return;
      _this.props.model.promiseExecute('cellClick', { col: col, index: index, isExpand: isExpand }, function () {
        var _this$state3 = _this.state,
            rowKey = _this$state3.rowKey,
            dataSource = _this$state3.dataSource;

        var key = void 0;
        if (isExpand) {
          key = index;
        } else {
          key = dataSource[index][rowKey];
        }
        if (_this.cellStatus[key]) _this.cellStatus[key][col.cItemName] = true;
        _this.setState({ rowKey: rowKey });
      });
    };

    _this.onCheckChange = function (e, index, cItemName, isExpand) {
      var _this$state4 = _this.state,
          dataSource = _this$state4.dataSource,
          rowKey = _this$state4.rowKey;

      var checked = e.target.checked;
      var node = {};
      if (isExpand) {
        node = index.row;
        if (node.parent) {
          node[cItemName] = checked;
          _this.updateNodes.push(node);
          if (node.children) _this.loopChildNodes(_this.keyMap[node[rowKey]], cItemName, checked);
          _this.loopUpdateNodes(_this.keyMap[node.parent], cItemName, checked);
          _this.props.model.updateNodes(_this.updateNodes);
          _this.updateNodes = [];
          return;
        }
      } else {
        node = dataSource[index];
      }
      _this.props.model.updateNodeRecursive(node, cItemName, checked);
    };

    _this.loopChildNodes = function (data, cItemName, checked) {
      var children = data.children;
      for (var key in children) {
        var childRow = children[key].row;
        var child = children[key].children;
        if (childRow[cItemName] != checked) {
          childRow[cItemName] = checked;
          _this.updateNodes.push(childRow);
        }
        if (child) _this.loopChildNodes(_this.keyMap[children[key].key], cItemName, checked);
      }
    };

    _this.loopUpdateNodes = function (data, cItemName, checked) {
      var children = data.children,
          row = data.row,
          level = data.level;

      if (checked) {
        var allChecked = true;
        for (var key in children) {
          var childRow = children[key].row;
          if (!childRow[cItemName] || childRow[cItemName] == '') {
            allChecked = false;
          }
        }
        if (allChecked) {
          row[cItemName] = checked;
          _this.updateNodes.push(row);
        }
      } else {
        if (!row[cItemName]) {
          return;
        } else {
          row[cItemName] = checked;
          _this.updateNodes.push(row);
        }
      }
      if (level > 1) _this.loopUpdateNodes(_this.keyMap[data.parent], cItemName, checked);
    };

    _this.getIndeterminate = function (index, cItemName, bExpand) {
      var _this$state5 = _this.state,
          dataSource = _this$state5.dataSource,
          rowKey = _this$state5.rowKey;

      var key = null,
          indeterminate = false,
          node = void 0;
      if (bExpand) key = index.key;else key = dataSource[index][rowKey];
      node = _this.keyMap[key];
      if (node.isEnd) return false;
      indeterminate = _this.loopChildIndeterminate(node, cItemName);
      return indeterminate;
    };

    _this.loopChildIndeterminate = function (data, cItemName) {
      var children = data.children;
      var indeterminate = true;
      var checkedLen = 0;
      var allLen = 0;
      for (var key in children) {
        allLen += 1;
        var childRow = children[key].row;
        var child = children[key].children;
        var cInde = void 0;
        if (child) cInde = _this.loopChildIndeterminate(_this.keyMap[children[key].key], cItemName);
        if (childRow[cItemName] || cInde) checkedLen += 1;
      }
      if (checkedLen == 0 || checkedLen == allLen) indeterminate = false;
      return indeterminate;
    };

    _this.getActionControl = function (index) {
      var _this$state6 = _this.state,
          dataSource = _this$state6.dataSource,
          rowKey = _this$state6.rowKey;

      var actionList = _this.props.actionMeta.controls;
      var actionControl = [],
          key = "";
      if ((typeof index === 'undefined' ? 'undefined' : _typeof(index)) == 'object') {
        key = index.row[rowKey];
        if (index.showAction) {
          actionList.map(function (action) {
            if (this.actionState[key] && this.actionState[key][action.cItemName].visible) {
              var temp_action = this.getPopControl(action, index);
              actionControl.push(temp_action);
            }
          }, _this);
        }
      } else {
        var _this$state7 = _this.state,
            _dataSource = _this$state7.dataSource,
            _rowKey = _this$state7.rowKey;

        key = _dataSource[index][_rowKey];
        if (_this.keyMap[key].showAction) {
          actionList.map(function (action) {
            if (this.actionState[key] && this.actionState[key][action.cItemName].visible) {
              var temp_action = this.getPopControl(action, index);
              actionControl.push(temp_action);
            }
          }, _this);
        }
      }
      return _react2.default.createElement(
        'div',
        { className: 'acticonCell', style: { "width": _this.fixedwidth } },
        actionControl
      );
    };

    _this.getPopControl = function (action, index) {
      var text = action.iStyle === 2 ? null : action.cShowCaption;
      var temp_action = _react2.default.createElement(
        'span',
        { key: action.cItemName },
        _react2.default.createElement(
          'a',
          { className: 'table-list-btn', onClick: function onClick(e) {
              return _this.ActionClick(e, action, index);
            } },
          text
        )
      );
      if (action.popoverKey) {
        var ComName = PopoverMap[action.popoverKey];
        var rowData = void 0;
        if ((typeof index === 'undefined' ? 'undefined' : _typeof(index)) == 'object') rowData = index.row;else rowData = _this.state.dataSource[index];
        if (ComName) temp_action = _react2.default.createElement(
          ComName,
          { model: action.model, data: rowData },
          temp_action
        );
      }
      return temp_action;
      // }
    };

    _this.ActionClick = function (e, action, rowIndex) {
      _this.handleRowClick(null, rowIndex);
      if (_this.actionClickTime) {
        var nowTime = new Date().valueOf();
        if (nowTime - _this.actionClickTime < 1000) return;
        _this.actionClickTime = nowTime;
      } else {
        _this.actionClickTime = new Date().valueOf();
      }
      var viewModel = _this.props.model.getParent();
      while (viewModel.getParent()) {
        viewModel = viewModel.getParent();
      }var params = { index: rowIndex, cItemName: action.cItemName };
      viewModel.get(action.cItemName).fireEvent('click', params);
    };

    _this._subRowHeightGetter = function (index) {
      var _this$state8 = _this.state,
          dataSource = _this$state8.dataSource,
          rowKey = _this$state8.rowKey;

      var rowData = dataSource[index];
      var key = rowData[rowKey];
      var subRowHeight = 40;
      if (!cb.utils.isEmpty(_this.keyMap[key]) && rowData.children) {
        if (_this.keyMap[key].isExpand) {
          var children = rowData.children;
          subRowHeight = _this.getSubRowHeight(_this.keyMap[key].children, children.length * 40);
        } else {
          subRowHeight = 0;
        }
      } else {
        subRowHeight = 0;
      }
      return subRowHeight;
    };

    _this.getSubRowHeight = function (children, height) {
      for (var key in children) {
        var child = children[key];
        if (child.isExpand) {
          var len = 0;
          for (var key1 in child.children) {
            len = len + 1;
          }
          height = height + len * 40;
          if (child.children) {
            height = _this.getSubRowHeight(child.children, height);
          }
        }
      }
      return height;
    };

    _this.getGridHeight = function () {
      var _this$state9 = _this.state,
          dataSource = _this$state9.dataSource,
          rowKey = _this$state9.rowKey;

      var height = dataSource.length * 40 + 40 + 17;
      dataSource.map(function (rowData, index) {
        var key = rowData[rowKey];
        var subRowHeight = 40;
        if (!cb.utils.isEmpty(_this.keyMap[key]) && rowData.children) {
          if (_this.keyMap[key].isExpand) {
            var children = rowData.children;
            subRowHeight = _this.getSubRowHeight(_this.keyMap[key].children, children.length * 40);
          } else {
            subRowHeight = 0;
          }
        } else {
          subRowHeight = 0;
        }
        height = height + subRowHeight;
      });
      return height;
    };

    _this._rowExpandedGetter = function (_ref) {
      var rowIndex = _ref.rowIndex,
          width = _ref.width,
          height = _ref.height;
      var _this$state10 = _this.state,
          dataSource = _this$state10.dataSource,
          rowKey = _this$state10.rowKey;

      var rowData = dataSource[rowIndex];
      var key = rowData[rowKey];
      if (!cb.utils.isEmpty(_this.keyMap[key]) && rowData.children) {
        if (_this.keyMap[key].isExpand) {
          return _react2.default.createElement(
            'div',
            { className: 'expand-rows' },
            _this.getExpandRow(rowData.children, key)
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    };

    _this.getExpandRow = function (rows, parentKey) {
      var _this$state11 = _this.state,
          columns = _this$state11.columns,
          rowKey = _this$state11.rowKey;

      var controls = [];
      rows.map(function (row) {
        var control = void 0,
            key = row[rowKey];
        control = _this.getExpandCol(row, key);
        controls.push(control);
        if (row.children && _this.keyMap[key].isExpand) {
          control = _this.getExpandRow(row.children, _this.keyMap[key].children, key);
          controls = controls.concat(control);
        }
      });
      return controls;
    };

    _this.getExpandCol = function (row, parentKey) {
      var _this$state12 = _this.state,
          columns = _this$state12.columns,
          rowKey = _this$state12.rowKey;
      var _this$keyMap$parentKe = _this.keyMap[parentKey],
          level = _this$keyMap$parentKe.level,
          isEnd = _this$keyMap$parentKe.isEnd;

      var controls = [],
          bExpand = false;
      columns.map(function (col) {
        var width = void 0,
            align = void 0,
            style = { height: 40, float: 'left' };
        var expandColClass = "expand-col cell-text";
        width = isNaN(parseFloat(col.iColWidth)) ? 200 : parseFloat(col.iColWidth);
        if (col.iAlign === 1) align = 'left';else if (col.iAlign === 2) align = 'center';else align = 'left';
        // align = 'right';
        var text = _this.compareCell(row, col, _this.keyMap[parentKey], true);
        style.width = width;
        style.textAlign = align;
        if (col.cControlType == 'action') {
          // style.float = 'right';
          style.position = 'fixed';
          style.textAlign = 'right';
          style.left = (_this.props.width || 1100) - width;
          if (text.props.children.length == 0) {
            expandColClass = expandColClass + " " + "action-col";
            style.height = style.height - 2;
          }
        }
        if (col.cControlType == 'expand') {
          style.textOverflow = 'initial';
        }
        if (level > 1 && col.cControlType != 'action') {
          if (col.cControlType == 'expand') {
            style.marginLeft = (level - 1) * 15;
            bExpand = true;
          } else {
            if (bExpand) {
              style.width = style.width - (level - 1) * 15;
              if (style.width < 0) style.width = 0;
              bExpand = false;
            }
          }
        }
        controls.push(_react2.default.createElement(
          'div',
          { className: expandColClass, onClick: function onClick(e) {
              return _this.onCellClick(e, col, parentKey, true);
            }, id: parentKey, style: style },
          text
        ));
      });
      var expandRowClass = "expand-row level-" + level;
      if (_this.selectRowIndex == parentKey) expandRowClass = expandRowClass + ' ' + 'expand-row-selected';
      if (isEnd) expandRowClass = expandRowClass + ' ' + 'expand-row-end';
      var rowStyle = { "height": "40px" };
      rowStyle.width = _this.getRowWidth();
      return _react2.default.createElement(
        'div',
        { className: expandRowClass, id: parentKey, style: rowStyle,
          onMouseEnter: function onMouseEnter(e) {
            return _this.onExpandMouseEnter(e, parentKey);
          },
          onMouseLeave: function onMouseLeave(e) {
            return _this.onExpandMouseLeave(e, parentKey);
          }
        },
        controls
      );
    };

    _this.getRowWidth = function () {
      var columns = _this.state.columns;
      var rowWidth = 0,
          tableWith = _this.props.width || 1100;
      columns.map(function (col) {
        var width = isNaN(parseFloat(col.iColWidth)) ? 200 : parseFloat(col.iColWidth);
        // if (col.cItemName != 'action')
        rowWidth = rowWidth + width;
      });
      if (rowWidth < tableWith) rowWidth = tableWith;
      return rowWidth;
    };

    _this.onExpandMouseEnter = function (e, key) {
      for (var key1 in _this.keyMap) {
        if (key1 == key) {
          _this.keyMap[key].showAction = true;
        } else {
          _this.keyMap[key1].showAction = false;
        }
      }
      _this.setState({
        rowKey: _this.state.rowKey
      });
    };

    _this.onExpandMouseLeave = function (e, key) {
      var actionParent1 = new cb.dom(e.relatedTarget).parents('.ant-popover');
      if (actionParent1.length) return;
      _this.keyMap[key].showAction = false;
      _this.keyMap[_this.keyMap[key].parent].showAction = true;

      _this.setState({
        rowKey: _this.state.rowKey
      });
    };

    _this.getRowClassName = function (index) {
      if (_this.selectRowIndex == index) return 'public_fixedDataTableRow_selected';
    };

    _this._onHorizontalScroll = function (scrollLeft) {
      var expandRows = document.getElementsByClassName('expand-rows');
      if (expandRows.length <= 0) return true;
      for (var i = 0; i < expandRows.length; i++) {
        expandRows[i].scrollLeft = scrollLeft;
      }
      return true;
    };

    _this.onExpandClick = function (e, index) {
      e.preventDefault();
      e.stopPropagation();
      var _this$state13 = _this.state,
          dataSource = _this$state13.dataSource,
          rowKey = _this$state13.rowKey;

      if ((typeof index === 'undefined' ? 'undefined' : _typeof(index)) === 'object') {
        _this.keyMap[index.key].isExpand = !index.isExpand;
      } else {
        var rowData = dataSource[index];
        var key = rowData[rowKey];
        _this.keyMap[key].isExpand = !_this.keyMap[key].isExpand;
      }
      _this.setState({ rowKey: rowKey });
    };

    _this.columnSetting = function () {
      _this.setState({
        popFlag: !_this.state.popFlag
      });
      _this.props.model.columnSetting(_this.props.code);
    };

    _this.setTitle = function (titleList) {
      _this.setState({
        titleList: titleList
      });
    };

    _this.onMouseEnter = function (e, index) {
      var titleList = _this.state.titleList;
      titleList[index].bShowPop = true;
      _this.setState({
        titleList: titleList
      });
    };

    _this.onMouseLeave = function (e, index) {
      var titleList = _this.state.titleList;
      titleList.forEach(function (ele, i) {
        ele.bShowPop = false;
      });
      _this.sort = "";
      _this.setState({
        titleList: titleList
      });
    };

    _this.sortClick = function (type, index) {
      var titleList = _this.state.titleList;
      if (type == 'up' && index == 0) return;
      if (type == 'down' && index == titleList.length - 1) return;
      if (titleList[index] && titleList[index].bJointQuery) {
        cb.utils.alert('关键字段不允许移动！', 'warning');
        return;
      }
      var pre = cb.utils.extend(true, {}, titleList[index - 1]);
      var next = cb.utils.extend(true, {}, titleList[index + 1]);
      var now = cb.utils.extend(true, {}, titleList[index]);
      var preOrder = pre.iOrder;
      var nextOrder = next.iOrder;
      var nowOrder = now.iOrder;
      if (type == 'up') {
        _this.sort = "up";
        titleList[index] = pre;
        titleList[index].iOrder = nowOrder;
        titleList[index - 1] = now;
        titleList[index - 1].iOrder = preOrder;
      } else {
        _this.sort = "down";
        titleList[index] = next;
        titleList[index].iOrder = nowOrder;
        titleList[index + 1] = now;
        titleList[index + 1].iOrder = nextOrder;
      }
      _this.setState({
        titleList: titleList
      });
    };

    _this.onChecked = function (e, element, index) {
      var checked = e.target.checked;
      var id = element.id;
      var titleList = _this.state.titleList;
      if (titleList[index].bJointQuery) {
        cb.utils.alert('关联字段不允许修改！', 'warning');
      } else {
        if (checked) {
          titleList[index].bShowIt = 1;
        } else {
          titleList[index].bShowIt = 0;
        }
      }
      _this.setState({
        titleList: titleList
      });
    };

    _this.buttonClick = function (type) {
      if (type == 'save') {
        _this.props.model.setTitleData(_this.state.titleList);
      }
      _this.setState({
        popFlag: false
      });
    };

    _this.getSettingContent = function () {
      var titleList = _this.state.titleList;
      var titileItem = [];
      titleList.forEach(function (element, index) {
        var _this2 = this;

        var item = void 0;
        var bShowPop = element.bShowPop ? element.bShowPop : false;
        if (!element.bHidden) {
          var showIt = false;
          if (element.bShowIt == 1) {
            showIt = true;
          }
          item = bShowPop ? _react2.default.createElement(
            _row2.default,
            { style: { minHeight: "25px" }, onMouseEnter: function onMouseEnter(e) {
                return _this2.onMouseEnter(e, index);
              }, onMouseLeave: function onMouseLeave(e) {
                return _this2.onMouseLeave(e, index);
              } },
            _react2.default.createElement(
              'div',
              { className: 'pull-left', title: element.cShowCaption },
              _react2.default.createElement(
                _antd.Checkbox,
                { checked: showIt, onChange: function onChange(e) {
                    return _this2.onChecked(e, element, index);
                  } },
                element.cShowCaption
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'pull-right' },
              _react2.default.createElement(_antd.Button, { style: { borderWidth: 0 }, icon: 'arrow-up', onClick: function onClick() {
                  return _this2.sortClick('up', index);
                } }),
              _react2.default.createElement(_antd.Button, { style: { borderWidth: 0 }, icon: 'arrow-down', onClick: function onClick() {
                  return _this2.sortClick('down', index);
                } })
            )
          ) : _react2.default.createElement(
            _row2.default,
            { colCount: 2, style: { minHeight: "25px" }, onMouseEnter: function onMouseEnter(e) {
                return _this2.onMouseEnter(e, index);
              }, onMouseLeave: function onMouseLeave(e) {
                return _this2.onMouseLeave(e, index);
              } },
            _react2.default.createElement(
              'div',
              { className: 'pull-left' },
              _react2.default.createElement(
                _antd.Checkbox,
                { checked: showIt, onChange: function onChange(e) {
                    return _this2.onChecked(e, element, index);
                  } },
                element.cShowCaption
              )
            ),
            _react2.default.createElement('div', { className: 'pull-right' })
          );
          titileItem.push(item);
        }
      }, _this);
      var buttonClass = 'filter-btn-fixed';

      var settingContent = _react2.default.createElement(
        'div',
        { className: buttonClass, style: { overflow: "auto", height: "250px" } },
        _react2.default.createElement(
          'div',
          { className: 'filter-txt' },
          titileItem
        ),
        _react2.default.createElement(
          'div',
          { className: 'filter-btn-1' },
          _react2.default.createElement(
            _antd.Button,
            { type: "primary", size: 'small', onClick: function onClick() {
                return _this.buttonClick('save');
              } },
            '\u4FDD\u5B58'
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: "default", size: 'small', onClick: function onClick() {
                return _this.buttonClick('cancel');
              } },
            '\u53D6\u6D88'
          )
        )
      );
      return settingContent;
    };

    _this.getColumnSetting = function () {
      var hasSetting = _this.state.showColumnSetting;
      if (hasSetting) {
        var settingContent = _this.getSettingContent();
        var popFlag = _this.state.popFlag;
        return _react2.default.createElement(
          'div',
          { className: 'columnSetting' },
          _react2.default.createElement(
            _antd.Popover,
            { overlayStyle: { width: "200px" }, placement: "bottomRight", content: settingContent, trigger: "click", visible: popFlag },
            _react2.default.createElement(_antd.Button, { className: 'SettingBtn', type: "ghost", size: 'small', icon: 'ellipsis', onClick: function onClick() {
                return _this.columnSetting();
              } })
          )
        );
      } else {
        return '';
      }
    };

    _this._onRowMouseEnter = function (e, index) {
      var _this$state14 = _this.state,
          dataSource = _this$state14.dataSource,
          rowKey = _this$state14.rowKey;

      var key = dataSource[index][rowKey];
      for (var key1 in _this.keyMap) {
        if (key1 == key) {
          _this.keyMap[key].showAction = true;
        } else {
          _this.keyMap[key1].showAction = false;
        }
      }
      _this.setState({ rowKey: rowKey });
    };

    _this._onRowMouseLeave = function (e, index) {
      var actionParent1 = new cb.dom(e.relatedTarget).parents('.ant-popover');
      if (actionParent1.length) return;
      var _this$state15 = _this.state,
          dataSource = _this$state15.dataSource,
          rowKey = _this$state15.rowKey;

      var key = dataSource[index][rowKey];
      _this.keyMap[key].showAction = false;
      _this.setState({ rowKey: rowKey });
    };

    _this.state = {
      columns: [],
      dataSource: [],
      rowKey: "id",
      popFlag: false,
      showColumnSetting: true,
      titleList: [],
      expandAllRow: false
    };
    _this.keyMap = {};
    _this.cellStatus = {};
    _this.actionState = {};
    _this.updateNodes = [];
    _this.editCellModel = null;
    return _this;
  }

  _createClass(TreeTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.model.addListener(this);
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(data) {
      if (!data.columns) return;
      if (this.props.columns) {
        var tempColumns = {};
        for (var attr in this.props.columns) {
          if (!data.columns[attr]) continue;
          var column = {};
          Object.assign(column, this.props.columns[attr], data.columns[attr]);
          tempColumns[attr] = column;
        }
        data.columns = tempColumns;
      }
      var columns = [],
          actionMeta = this.props.actionMeta;
      columns.push({
        "cFieldName": "expandCol", "cItemName": "expandCol", "cCaption": "", "cShowCaption": "",
        "iColWidth": 30, "cControlType": "expand", "iAlign": 2
      });
      if (actionMeta && actionMeta.controls) {
        var cStyle = actionMeta.cStyle;
        try {
          if (!cStyle || cStyle == '') {
            cStyle = {};
          } else {
            cStyle = JSON.parse(cStyle);
          }
        } catch (e) {
          cb.utils.alert('Toolbar cStyle，预制错误！', 'error');
        }
        this.fixedwidth = cStyle.fixedwidth ? cStyle.fixedwidth : 150;
        columns.push({
          "cFieldName": "action", "cItemName": "action", "cCaption": "", "cShowCaption": "",
          "iColWidth": this.fixedwidth, "cControlType": "action", "iAlign": 2, "fixedRight": true
        });
      }
      _lodash2.default.forEach(data.columns, function (column, key) {
        columns.push(column);
      });
      this.setState({ columns: columns, rowKey: data.keyField, readOnly: data.readOnly });
    }
  }, {
    key: 'setDataSource',
    value: function setDataSource(dataSource) {
      var _state = this.state,
          rowKey = _state.rowKey,
          columns = _state.columns;

      this.getKeyMap(dataSource, rowKey);
      this.setState({ dataSource: dataSource });
    }
    //接受来自model的column信息

    /*操作列状态控制*/

    /*批量操作列状态控制*/

    /*设置操作列是否显示*/

    /*对照*/

    /*设置展开行*/

    /*行点击*/

  }, {
    key: 'handleJointQuery',
    value: function handleJointQuery(e, index, columnKey) {
      var dataArry = this.state.dataSource;
      var rowData = {};
      if ((typeof index === 'undefined' ? 'undefined' : _typeof(index)) == 'object') {
        rowData = this.keyMap[index.key].row;
      } else {
        rowData = dataArry[index];
      }
      this.props.model.execute('cellJointQuery', {
        rowData: rowData,
        cellName: columnKey
      });
    }
    /*操作列*/

    /*操作列点击*/

  }, {
    key: 'renderSelect',
    value: function renderSelect(column, text) {
      var keyMap = column.keyMap,
          textField = column.textField;

      if (!keyMap || !textField) return text;
      return keyMap[text] && keyMap[text][textField];
    }

    /*展开行高度*/

    /*获取展开行高度*/

    /*展开行 渲染*/

    //栏目设置————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

    //排序

  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          columns = _state2.columns,
          dataSource = _state2.dataSource;

      var columnSetting = this.getColumnSetting();
      var gridHeight = this.getGridHeight();
      if (this.props.maxRowCount) gridHeight = this.props.maxRowCount * 40 + 40;
      return _react2.default.createElement(
        'div',
        { className: 'meta-table tree-table' },
        _react2.default.createElement(
          _row2.default,
          null,
          columnSetting,
          _react2.default.createElement(
            _fixedDataTable.Table,
            {
              className: 'billing_tree_table',
              rowHeight: 40,
              overflowY: 'auto',
              overflowX: 'auto',
              subRowHeightGetter: this._subRowHeightGetter,
              rowExpanded: this._rowExpandedGetter,
              onHorizontalScroll: this._onHorizontalScroll,
              footerHeight: 0,
              headerHeight: 40,
              onRowMouseEnter: this._onRowMouseEnter,
              onRowMouseLeave: this._onRowMouseLeave,
              rowsCount: dataSource.length,
              width: this.props.width || 1100,
              height: gridHeight,
              onRowClick: this.handleRowClick,
              rowClassNameGetter: this.getRowClassName
            },
            this.getColumnControl()
          )
        )
      );
    }
  }]);

  return TreeTable;
}(_react.Component);

exports.default = TreeTable;