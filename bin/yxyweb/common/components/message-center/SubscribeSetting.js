'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _col = require('../basic/col');

var _col2 = _interopRequireDefault(_col);

var _row = require('../basic/row');

var _row2 = _interopRequireDefault(_row);

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _AddMessage = require('./AddMessage');

var _AddMessage2 = _interopRequireDefault(_AddMessage);

var _addMessage = require('../../redux/addMessage');

var addActions = _interopRequireWildcard(_addMessage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _antd.Tabs.TabPane;
var Table = null;
if (process.env.__CLIENT__ === true) {
  require('./billdesign.less');
}

var SubscribeSetting = function (_Component) {
  _inherits(SubscribeSetting, _Component);

  function SubscribeSetting(props) {
    _classCallCheck(this, SubscribeSetting);

    var _this = _possibleConstructorReturn(this, (SubscribeSetting.__proto__ || Object.getPrototypeOf(SubscribeSetting)).call(this, props));

    _this.onClick = function (e, type, data) {
      var readOnly = void 0,
          modalVisible = void 0;
      if (type == 'see') {
        readOnly = true;
      } else {
        readOnly = false;
      }
      _this.title = data.cName;
      _this.actions.modifyModalVisible(true, _this.props.type);
      _this.actions.setReadOnly(readOnly, _this.props.type);
      _this.gridModel.setReadOnly(readOnly);
      _this.actions.getBillByBillNo(data.cBillNo, _this.gridModel, readOnly, _this.props.type);
      _this.params = { cBillNo: data.cBillNo, readOnly: readOnly };
      _this.billNo = data.cBillNo;
    };

    _this.handleModify = function () {
      _this.isAdd = false;
      var checkRows = _this.gridModel.getSelectedRows();
      var checkRow = [];
      if (!checkRows || checkRows.length < 1) {
        cb.utils.alert('未选中任何行！', 'error');
        return;
      } else {
        checkRow = checkRows[0];
        if (checkRow.iSystem == 1) {
          cb.utils.alert('系统项，不允许设计！', 'error');
          return;
        }
      }
      var iBillEntityId = _this.getBillEntityId();
      _this.props.initData(_this.billNo, { caption: checkRow.cShowCaption, expressionCode: checkRow.cFieldName, expression: checkRow.cDefineName }, iBillEntityId);
    };

    _this.getBillEntityId = function () {
      var activeKey = void 0,
          groups = void 0,
          iBillEntityId = "";
      var data = cb.utils.extend(true, [], groups);
      data.map(function (item, groupIndex) {
        if (item.groupId == activeKey) {
          iBillEntityId = item.iBillEntityId;
        }
      });
      return iBillEntityId;
    };

    _this.handleOk = function (args) {
      var groups = [],
          activeKey = void 0;

      var data = cb.utils.extend(true, [], groups);
      var controls = [],
          gIndex = void 0;
      data.map(function (item, groupIndex) {
        if (item.groupId == activeKey) {
          controls = item.controls;
          gIndex = groupIndex;
        }
      });
      if (_this.isAdd) {
        var selectRowIndex = _this.gridModel.getSelectedRowIndexes()[0];
        var rows = _this.gridModel.getData();
        var selectRow = rows[selectRowIndex];
        var row = {
          cCaption: args.caption,
          cShowCaption: args.caption,
          cFieldName: args.expressionCode,
          cDefineName: args.expression,
          iBillTplGroupId: selectRow.iBillTplGroupId,
          iBillId: selectRow.iBillId,
          iBillEntityId: selectRow.iBillEntityId,
          iTplId: selectRow.iTplId,
          cSubId: selectRow.cSubId,
          iOrder: selectRow.iOrder + 1,
          cDataSourceName: selectRow.cDataSourceName
        };
        row._status = 'Insert';
        data[gIndex].controls = [row];
        for (var i = selectRowIndex + 1; i < rows.length; i++) {
          data[gIndex].controls.push(rows[i]);
        }
        _this.actions.updateBillTemplate(data, "insert", {
          cBillNo: _this.params.cBillNo, gridModel: _this.gridModel,
          readOnly: _this.params.readOnly, type: _this.props.type
        });
      } else {
        var seletIndexs = _this.gridModel.getSelectedRowIndexes();
        var checkIndex = seletIndexs[0];
        _this.gridModel.setCellValue(checkIndex, 'cCaption', args.caption);
        _this.gridModel.setCellValue(checkIndex, 'cShowCaption', args.caption);
        _this.gridModel.setCellValue(checkIndex, 'cFieldName', args.expressionCode);
        _this.gridModel.setCellValue(checkIndex, 'cDefineName', args.expression);
        controls[checkIndex].cCaption = args.caption;
        controls[checkIndex].cShowCaption = args.caption;
        controls[checkIndex].cFieldName = args.expressionCode;
        controls[checkIndex].cDefineName = args.expression;
        controls[checkIndex]._status = 'Update';
        _this.actions.setGroups(controls, _this.props.type);
      }
    };

    _this.onOk = function (e) {
      var groups = [];
      _this.actions.updateBillTemplate(groups, null, {
        cBillNo: _this.params.cBillNo, gridModel: _this.gridModel,
        readOnly: _this.params.readOnly, type: _this.props.type
      });
      _this.actions.modifyModalVisible(false, _this.props.type);
    };

    _this.onCancel = function (e) {
      _this.props.close();
    };

    _this.onButtonClick = function (type) {
      _this.actions.setReadOnly(false, _this.props.type);
      _this.gridModel.setReadOnly(false);
    };

    _this.onActionClick = function (index, action) {
      var subscribeId = _this.props.addMessage.subscribeId;
      var id = subscribeId[index];
      var cItemName = action.cItemName;
      // const dataSource=this.props.addMessage.dataSource;
      // let activeKey, groups;
      // let data = cb.utils.extend(true, [], groups);

      if (cItemName == 'btnDeleteRow') {
        cb.utils.confirm("确定删除此栏目么？", function () {
          _this.actions.deleteRow(id, _this.gridModel);
        });
        // this.gridModel.deleteRows(id);
        // this.gridModel.setDataSource(dataSource);
        // this.actions.getListData(this.gridModel);
        // this.getModalControl();

        // let controls = [], gIndex;
        // data.map((item, groupIndex) => {
        //   if (item.groupId == activeKey) {
        //     controls = item.controls;
        //     gIndex = groupIndex;
        //   }
        // });
        // if (controls[index]) {
        //   if (controls[index].iSystem == 1) {
        //     cb.utils.alert('系统项不允许进行删除操作！', 'error');
        //     return
        //   }
        //   cb.utils.confirm("确定删除栏目【" + controls[index].cShowCaption + "】么？", () => {
        //     controls[index]._status = 'delete';
        //     this.gridModel.deleteRows([index]);
        //     data[gIndex].controls = [controls[index]];
        //     this.actions.updateBillTemplate(data, null, {
        //       cBillNo: this.params.cBillNo, gridModel: this.gridModel,
        //       readOnly: this.params.readOnly, type: this.props.type
        //     });
        //   });
        // }
      } else {
        var model = _this.props.model;

        var _model$getParams = model.getParams(),
            billNo = _model$getParams.billNo,
            menuId = _model$getParams.menuId,
            filterId = _model$getParams.filterId,
            code = _model$getParams.code,
            name = _model$getParams.name,
            viewType = _model$getParams.viewType,
            metaType = _model$getParams.metaType,
            metaKey = _model$getParams.metaKey;

        var command = JSON.stringify({ code: code, name: name, viewType: viewType, metaType: metaType, metaKey: metaKey });
        _this.actions.initData(billNo, command, filterId, model.getCache('lastSearchCondition'), model.getCache('groupSchemaId'));
        // this.actions.getSolutionList(filterId);
        _this.actions.getSolutionEdit(filterId);
        _this.actions.editRow(index);
      }
    };

    _this.bHasDataSource = function () {
      var activeKey = void 0,
          groups = void 0,
          hasDataSource = false;

      var data = cb.utils.extend(true, [], groups);
      data.map(function (item, groupIndex) {
        if (item.groupId == activeKey) {
          if (item.cDataSourceName) hasDataSource = true;
        }
      });
      return hasDataSource;
    };

    _this.showAddModal = function () {
      var model = _this.props.model;

      var _model$getParams2 = model.getParams(),
          billNo = _model$getParams2.billNo,
          menuId = _model$getParams2.menuId,
          filterId = _model$getParams2.filterId,
          code = _model$getParams2.code,
          name = _model$getParams2.name,
          viewType = _model$getParams2.viewType,
          metaType = _model$getParams2.metaType,
          metaKey = _model$getParams2.metaKey;

      var command = JSON.stringify({ code: code, name: name, viewType: viewType, metaType: metaType, metaKey: metaKey });
      _this.actions.initData(billNo, command, filterId, model.getCache('lastSearchCondition'), model.getCache('groupSchemaId'));
      _this.actions.getReceivers();
      _this.actions.getSolutionList(filterId);
    };

    _this.getModalControl = function () {
      var action = {
        "cControlType": "Toolbar",
        "cStyle": "{\"fixedwidth\":150}",
        "controls": [{
          "cItemName": "btnEditRow", "cCaption": "编辑", "iOrder": 34, "cShowCaption": "编辑", "iStyle": 0,
          "cControlType": "button", "icon": "shanchu1", "childrenField": "purInRecords", "key": "3876626"
        }, {
          "cItemName": "btnDeleteRow", "cCaption": "删除", "iOrder": 34, "cShowCaption": "删除", "iStyle": 0,
          "cControlType": "button", "icon": "shanchu1", "childrenField": "purInRecords", "key": "3876626"
        }]
      };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'bill-design-tabs clearfix' },
          _react2.default.createElement(
            'div',
            { className: 'tabs-button noTabs' },
            _react2.default.createElement(
              _antd.Button,
              { type: 'primary', onClick: _this.showAddModal },
              _react2.default.createElement(_SvgIcon2.default, { className: 'icon-plus-copy', type: 'plus-copy' }),
              '\u65B0\u589E'
            )
          )
        ),
        _react2.default.createElement(Table, { action: action, noViewModel: true, onActionClick: _this.onActionClick, width: 800, height: 441, model: _this.gridModel })
      );
    };

    Table = require('../basic/table').default;
    _this.actions = props.addActions;
    _this.title = '订阅设置';
    return _this;
  }

  _createClass(SubscribeSetting, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var columns = {
        cCaption: { cItemName: 'name', cShowCaption: '订阅名称', iColWidth: 150, bHidden: false, bShowIt: true, bCanModify: false, cControlType: 'Input', bMustSelect: true },
        cCycle: { cItemName: 'cycle', cShowCaption: '订阅周期', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: false, cControlType: 'Input', bMustSelect: true },
        cStart: { cItemName: 'isStart', cShowCaption: '是否启用', iColWidth: 150, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'CheckRadio', bMustSelect: true }
      };
      this.gridModel = new cb.models.GridModel({
        columns: columns,
        independent: true,
        readOnly: false,
        showRowNo: true,
        showCheckBox: false,
        showAggregates: false,
        pagination: false,
        isDirty: true,
        showColumnSetting: false

      });
      // let dataSource=this.props.addMessage.dataSource
      this.actions.getListData(this.gridModel);
      // this.gridModel.setDataSource(dataSource);
      this.gridModel.on('beforeCellValueChange', function (val) {
        var data = _this2.gridModel.getRowsByIndexes([val.rowIndex]);
        if (data[0].isStart) {
          cb.utils.confirm("确定停用此条订阅吗？", function () {
            _this2.actions.modifyCellValue(data[0].isStart, val.rowIndex);
          });
          return false;
        }
        cb.utils.confirm("确定启用此条订阅吗？", function () {
          _this2.actions.modifyCellValue(data[0].isStart, val.rowIndex);
        });
        return false;
      });
      this.gridModel.on('afterCellValueChange', function (val) {
        var index = val.rowIndex;
        var data = _this2.gridModel.getAllData();
        data[index]._status = 'Update';
        _this2.actions.setGroups(data, _this2.props.type, data[index]);
      });
      this.gridModel.on('afterUpdateRow', function (val) {
        var index = val.index;
        var data = _this2.gridModel.getAllData();
        data[index]._status = 'Update';
        _this2.actions.setGroups(data, _this2.props.type, data[index]);
      });
      this.gridModel.on('afterInsertRow', function (val) {
        var index = val.index;
        var data = _this2.gridModel.getAllData();
        // data[index]._status = 'insert';
        _this2.actions.setGroups(data, _this2.props.type);
      });
      this.gridModel.on('afterSetDataSource', function (data) {
        if (cb.utils.isArray(data)) {
          var states = [];
          data.map(function (row, index) {
            if (row.iSystem != 1) {
              states.push({ "rowIndex": index, "cellName": "bIsNull", "propertyName": "disabled", "value": true });
            }
          });
          if (states.length > 0) _this2.gridModel.setCellStates(states);
        }
      });
    }
    /*查看/编辑 表单模板*/

    /*弹出框确认及取消事件*/

  }, {
    key: 'render',

    // getData=()=>{
    //   this.actions.getListData()
    // }
    value: function render() {
      var showModal = void 0,
          modalData = void 0,
          readOnly = void 0,
          className = "bill-design-modal report-design-modal";
      var modalControl = this.getModalControl();
      var iBillEntityId = this.getBillEntityId();
      return _react2.default.createElement(
        'div',
        { className: 'uretail-billdesign-body' },
        _react2.default.createElement(
          _antd.Modal,
          { title: '\u8BA2\u9605\u8BBE\u7F6E', width: 800, visible: true,
            className: className,
            onOk: this.onCancel, onCancel: this.onCancel, okText: '\u786E\u5B9A', cancelText: '\u53D6\u6D88', maskClosable: false
          },
          _react2.default.createElement(
            'div',
            null,
            modalControl
          )
        ),
        _react2.default.createElement(_AddMessage2.default, null)
      );
    }
  }]);

  return SubscribeSetting;
}(_react.Component);

function mapStateToProps(state) {
  return {
    addMessage: state.addMessage.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addActions: (0, _redux.bindActionCreators)(addActions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SubscribeSetting);