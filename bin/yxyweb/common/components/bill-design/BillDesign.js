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

var _table = require('../basic/table');

var _table2 = _interopRequireDefault(_table);

var _button = require('../basic/button');

var _button2 = _interopRequireDefault(_button);

var _formulaDesigner = require('../formula-designer');

var _formulaDesigner2 = _interopRequireDefault(_formulaDesigner);

var _billDesign = require('../../redux/billDesign');

var billactions = _interopRequireWildcard(_billDesign);

var _formula = require('../../redux/formula');

var _util = require('../../helpers/util');

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _antd.Tabs.TabPane;

if (process.env.__CLIENT__ === true) {
  require('./billDesign.less');
}

var BillDesign = function (_Component) {
  _inherits(BillDesign, _Component);

  function BillDesign(props) {
    _classCallCheck(this, BillDesign);

    var _this = _possibleConstructorReturn(this, (BillDesign.__proto__ || Object.getPrototypeOf(BillDesign)).call(this, props));

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
      _this.actions.getBillByBillNo(data.cBillNo, _this.gridModel, readOnly, _this.props.type, false, data.cBillType);
      _this.params = { cBillNo: data.cBillNo, readOnly: readOnly };
      _this.billNo = data.cBillNo;
    };

    _this.handleAdd = function () {
      var selectRowIndex = _this.gridModel.getSelectedRowIndexes();
      if (!selectRowIndex || selectRowIndex.length == 0) {
        cb.utils.alert('请选中一行后增加！', 'error');
        return;
      }
      var iBillEntityId = _this.getBillEntityId();
      _this.props.initData(_this.billNo, { caption: "", expressionCode: "", expression: "" }, iBillEntityId);
      _this.isAdd = true;
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
      _this.props.initData(_this.billNo, {
        'caption': checkRow.cShowCaption, 'expressionCode': checkRow.cFieldName, 'expression': checkRow.cDefineName,
        'cControlType': checkRow.cControlType, 'cFormatData': checkRow.cFormatData, 'iNumPoint': checkRow.iNumPoint
      }, iBillEntityId);
    };

    _this.getBillEntityId = function () {
      var _this$props$billDesig = _this.props.billDesign,
          voucher = _this$props$billDesig.voucher,
          report = _this$props$billDesig.report;

      var activeKey = void 0,
          groups = void 0,
          iBillEntityId = "";
      if (_this.props.type == 'report') {
        activeKey = report.activeKey;
        groups = report.groups;
      } else {
        activeKey = voucher.activeKey;
        groups = voucher.groups;
      }
      var selectRow = _this.gridModel && _this.gridModel.getSelectedRows();
      if (selectRow && selectRow.length > 0) {
        iBillEntityId = selectRow[0].iBillEntityId;
      } else {
        var data = cb.utils.extend(true, [], groups);
        data.map(function (item, groupIndex) {
          if (item.groupId == activeKey) {
            iBillEntityId = item.iBillEntityId;
          }
        });
      }
      return iBillEntityId;
    };

    _this.handleOk = function (args) {
      var _this$props$billDesig2 = _this.props.billDesign,
          voucher = _this$props$billDesig2.voucher,
          report = _this$props$billDesig2.report;

      var groups = [],
          activeKey = void 0;
      if (_this.props.type == 'report') {
        groups = report.groups;
        activeKey = report.activeKey;
      } else {
        groups = voucher.groups;
        activeKey = voucher.activeKey;
      }
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
          cControlType: args.cControlType,
          cFormatData: args.cFormatData,
          iNumPoint: args.iNumPoint,
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
        _this.gridModel.setCellValue(checkIndex, 'cControlType', args.cControlType);
        _this.gridModel.setCellValue(checkIndex, 'cFormatData', args.cFormatData);
        _this.gridModel.setCellValue(checkIndex, 'iNumPoint', args.iNumPoint);
        controls[checkIndex].cCaption = args.caption;
        controls[checkIndex].cShowCaption = args.caption;
        controls[checkIndex].cFieldName = args.expressionCode;
        controls[checkIndex].cDefineName = args.expression;
        controls[checkIndex].cControlType = args.cControlType;
        controls[checkIndex].cFormatData = args.cFormatData;
        controls[checkIndex].iNumPoint = args.iNumPoint;
        controls[checkIndex]._status = 'Update';
        _this.actions.setGroups(controls, _this.props.type);
      }
    };

    _this.onOk = function (e) {
      var _this$props$billDesig3 = _this.props.billDesign,
          voucher = _this$props$billDesig3.voucher,
          report = _this$props$billDesig3.report;

      var groups = [];
      if (_this.props.type == 'report') {
        groups = report.groups;
      } else {
        groups = voucher.groups;
      }
      _this.actions.updateBillTemplate(groups, null, {
        cBillNo: _this.params.cBillNo, gridModel: _this.gridModel,
        readOnly: _this.params.readOnly, type: _this.props.type
      });
      _this.actions.modifyModalVisible(false, _this.props.type);
    };

    _this.onCancel = function (e) {
      _this.actions.modifyModalVisible(false, _this.props.type);
    };

    _this.onButtonClick = function (type) {
      _this.actions.setReadOnly(false, _this.props.type);
      _this.gridModel.setReadOnly(false);
    };

    _this.onMoveUp = function () {
      var controls = void 0,
          pre = void 0,
          now = void 0;;
      var index = _this.gridModel.getSelectedRowIndexes()[0];
      if (!index && index != 0) {
        cb.utils.alert('请选择行在进行上移操作！', 'error');
        return;
      }
      var rows = _this.gridModel.getRowsByIndexes([index, index - 1]);
      now = rows[0], pre = rows[1];
      _this.gridModel.shiftUpRow(index);
      controls = _this.gridModel.getData();
      _this.gridModel.setDataSource(controls);
      _this.gridModel.setCellValue(index, 'iOrder', now.iOrder);
      _this.gridModel.setCellValue(index - 1, 'iOrder', pre.iOrder);
      _this.gridModel.select(index - 1);
      _this.actions.setGroups(controls, _this.props.type);
    };

    _this.onMoveDown = function () {
      var controls = void 0,
          next = void 0,
          now = void 0;;
      var index = _this.gridModel.getSelectedRowIndexes()[0];
      if (!index && index != 0) {
        cb.utils.alert('请选择行在进行下移操作！', 'error');
        return;
      }
      var rows = _this.gridModel.getRowsByIndexes([index, index + 1]);
      now = rows[0], next = rows[1];
      _this.gridModel.shiftDownRow(index);
      controls = _this.gridModel.getData();
      _this.gridModel.setDataSource(controls);
      _this.gridModel.setCellValue(index, 'iOrder', now.iOrder);
      _this.gridModel.setCellValue(index + 1, 'iOrder', next.iOrder);
      _this.gridModel.select(index + 1);
      _this.actions.setGroups(controls, _this.props.type);
    };

    _this.getControl = function () {
      var _this$props$billDesig4 = _this.props.billDesign,
          voucher = _this$props$billDesig4.voucher,
          report = _this$props$billDesig4.report;

      var billDesignList = [],
          controls = [];
      if (_this.props.type == 'report') {
        billDesignList = report.billDesignList;
      } else {
        billDesignList = voucher.billDesignList;
      }
      billDesignList.map(function (ele, index) {
        var childControl = _this.getChildControl(ele.children);
        controls.push(_react2.default.createElement(
          'div',
          { id: index, className: 'uretail-bill-list' },
          _react2.default.createElement(
            'h3',
            null,
            ele.cName
          ),
          childControl
        ));
      });
      return controls;
    };

    _this.getChildControl = function (children) {
      if (!children) return '';
      var controls = [];
      children.map(function (ele) {
        controls.push(_react2.default.createElement(
          _col2.default,
          { span: 1 },
          _react2.default.createElement(
            'div',
            { id: ele.cBillNo, className: 'billdesign-card' },
            _react2.default.createElement(
              'div',
              { className: 'billdesign-card-title' },
              ele.cName
            ),
            _react2.default.createElement(
              'div',
              { className: 'billdesign-card-operation' },
              _react2.default.createElement(
                'a',
                { onClick: function onClick(e) {
                    return _this.onClick(e, 'see', ele);
                  } },
                '\u67E5\u770B'
              ),
              '|',
              _react2.default.createElement(
                'a',
                { onClick: function onClick(e) {
                    return _this.onClick(e, 'modify', ele);
                  } },
                '\u7F16\u8F91'
              )
            )
          )
        ));
      });
      return _react2.default.createElement(
        _row2.default,
        { colCount: 5 },
        controls
      );
    };

    _this.onTabsChange = function (activeKey) {
      _this.actions.setActiveKey(activeKey, _this.gridModel, _this.props.type);
    };

    _this.onActionClick = function (index, action) {
      var cItemName = action.cItemName;
      var _this$props$billDesig5 = _this.props.billDesign,
          voucher = _this$props$billDesig5.voucher,
          report = _this$props$billDesig5.report;

      var activeKey = void 0,
          groups = void 0;
      if (_this.props.type == 'report') {
        activeKey = report.activeKey;
        groups = report.groups;
      } else {
        activeKey = voucher.activeKey;
        groups = voucher.groups;
      }
      var data = cb.utils.extend(true, [], groups);
      if (cItemName == 'btnDeleteRow') {
        var controls = [],
            gIndex = void 0;
        data.map(function (item, groupIndex) {
          if (item.groupId == activeKey) {
            controls = item.controls;
            gIndex = groupIndex;
          }
        });
        if (controls[index]) {
          if (controls[index].iSystem == 1) {
            cb.utils.alert('系统项不允许进行删除操作！', 'error');
            return;
          }
          cb.utils.confirm("确定删除栏目【" + controls[index].cShowCaption + "】么？", function () {
            controls[index]._status = 'delete';
            _this.gridModel.deleteRows([index]);
            _this.actions.setGroups(controls, _this.props.type);
            data[gIndex].controls = [controls[index]];
            _this.actions.updateBillTemplate(data, null, {
              cBillNo: _this.params.cBillNo, gridModel: _this.gridModel,
              readOnly: _this.params.readOnly, type: _this.props.type
            });
          });
        }
      }
    };

    _this.bHasDataSource = function () {
      var _this$props$billDesig6 = _this.props.billDesign,
          voucher = _this$props$billDesig6.voucher,
          report = _this$props$billDesig6.report;

      var activeKey = void 0,
          groups = void 0,
          hasDataSource = false;
      if (_this.props.type == 'report') {
        activeKey = report.activeKey;
        groups = report.groups;
      } else {
        activeKey = voucher.activeKey;
        groups = voucher.groups;
      }
      var data = cb.utils.extend(true, [], groups);
      data.map(function (item, groupIndex) {
        if (item.groupId == activeKey) {
          if (item.cDataSourceName) hasDataSource = true;
        }
      });
      return hasDataSource;
    };

    _this.getModalControl = function (modalData) {
      var _this$props$billDesig7 = _this.props.billDesign,
          voucher = _this$props$billDesig7.voucher,
          report = _this$props$billDesig7.report;

      var activeKey = void 0,
          readOnly = void 0,
          action = void 0,
          tableClass = void 0,
          buttonControl = void 0,
          hasDataSource = void 0;
      hasDataSource = _this.bHasDataSource();
      action = {
        "cControlType": "Toolbar",
        "controls": [{
          "cItemName": "btnDeleteRow", "cCaption": "删行", "iOrder": 34, "cShowCaption": "删行", "iStyle": 0,
          "cControlType": "button", "icon": "shanchu1", "childrenField": "purInRecords", "key": "3876626"
        }]
      };
      if (_this.props.type == 'report') {
        activeKey = report.activeKey;
        readOnly = report.readOnly;
        tableClass = "ReportDesign";
      } else {
        tableClass = "BillDesign";
        activeKey = voucher.activeKey;
        readOnly = voucher.readOnly;
      }
      if (readOnly) {
        buttonControl = _react2.default.createElement(
          _button2.default,
          { key: 'edit', onClick: function onClick() {
              return _this.onButtonClick('edit');
            } },
          _react2.default.createElement(_SvgIcon2.default, { className: 'icon-edit', type: 'edit' }),
          '\u7F16\u8F91'
        );
      } else {

        if (hasDataSource) {

          buttonControl = _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              _button2.default,
              { key: 'plus-copy', type: 'primary', onClick: _this.handleAdd },
              _react2.default.createElement(_SvgIcon2.default, { className: 'icon-plus-copy', type: 'plus-copy' }),
              '\u589E\u52A0'
            ),
            _react2.default.createElement(
              _button2.default,
              { key: 'edit', onClick: _this.handleModify },
              _react2.default.createElement(_SvgIcon2.default, { className: 'icon-edit', type: 'edit' }),
              '\u8BBE\u8BA1'
            ),
            _react2.default.createElement(
              _button2.default,
              { key: 'moveup', onClick: _this.onMoveUp },
              _react2.default.createElement(_SvgIcon2.default, { className: 'icon-shangyi', type: 'shangyi' }),
              '\u4E0A\u79FB'
            ),
            _react2.default.createElement(
              _button2.default,
              { key: 'movedown', onClick: _this.onMoveDown },
              _react2.default.createElement(_SvgIcon2.default, { className: 'icon-xiayi', type: 'xiayi' }),
              '\u4E0B\u79FB'
            )
          );
        } else {
          buttonControl = _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              _button2.default,
              { key: 'moveup', onClick: _this.onMoveUp },
              _react2.default.createElement(_SvgIcon2.default, { className: 'icon-shangyi', type: 'shangyi' }),
              '\u4E0A\u79FB'
            ),
            _react2.default.createElement(
              _button2.default,
              { key: 'movedown', onClick: _this.onMoveDown },
              _react2.default.createElement(_SvgIcon2.default, { className: 'icon-xiayi', type: 'xiayi' }),
              '\u4E0B\u79FB'
            )
          );
        }
      }
      if (!modalData || modalData.length == 0) return;
      var paneControls = [],
          tabButtonClass = "tabs-button";
      if (modalData && modalData.length > 1) {
        modalData.map(function (ele) {
          paneControls.push(_react2.default.createElement(TabPane, { tab: ele.cName, key: ele.groupId }));
        });
      } else {
        tabButtonClass = tabButtonClass + ' noTabs';
      }
      if (typeof activeKey == 'number') activeKey = activeKey.toString();
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'bill-design-tabs clearfix' },
          _react2.default.createElement(
            'div',
            { className: tabButtonClass },
            buttonControl
          ),
          paneControls.length == 0 ? "" : _react2.default.createElement(
            _antd.Tabs,
            { style: { width: '800px', float: 'left' }
              // hideAdd
              , onChange: _this.onTabsChange,
              activeKey: activeKey
              // type="editable-card"
              // onEdit={this.onEdit}
              , animated: false
            },
            paneControls
          )
        ),
        _react2.default.createElement(_table2.default, { action: action, noViewModel: true, noBrowseAction: true, onActionClick: _this.onActionClick, width: 800, height: 441, tableClass: tableClass, model: _this.gridModel })
      );
    };

    _this.actions = props.billactions;
    _this.title = '表单模板';
    _this.cEnumString = {};
    _this.getEnum();
    return _this;
  }

  _createClass(BillDesign, [{
    key: 'getEnum',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var config, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = {
                  url: 'enum/getEnumStrFetch',
                  method: 'GET',
                  params: {
                    enumtype: 'enterDirection'
                  }
                };
                _context.next = 3;
                return (0, _util.proxy)(config);

              case 3:
                json = _context.sent;

                if (!(json.code !== 200)) {
                  _context.next = 7;
                  break;
                }

                cb.utils.alert('获取枚举失败' + json.message, 'error');
                return _context.abrupt('return');

              case 7:
                this.enumArr = JSON.parse(json.data);
                this.enumArr && this.enumArr.map(function (item) {
                  _this2.cEnumString[item.key] = item.value;
                });
                this.initDesign();
                // });

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getEnum() {
        return _ref.apply(this, arguments);
      }

      return getEnum;
    }()
  }, {
    key: 'initDesign',
    value: function initDesign() {
      var _this3 = this;

      var type = 'voucher';
      if (this.props.type && this.props.type == 'report') type = 'Report';
      this.actions.loadBillDesign(type);
      var columns = {
        cCaption: { cItemName: 'cCaption', cShowCaption: '名称', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: false, cControlType: 'Input', bMustSelect: true },
        cShowCaption: { cItemName: 'cShowCaption', cShowCaption: '显示名称', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input', bMustSelect: true },
        bShowIt: { cItemName: 'bShowIt', cShowCaption: '是否显示', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'CheckRadio', bMustSelect: true },
        bIsNull: { cItemName: 'bIsNull', cShowCaption: '是否必输', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'CheckRadio', bMustSelect: true },
        bNeedSum: { cItemName: 'bNeedSum', cShowCaption: '是否合计', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'CheckRadio', bMustSelect: true },
        iColWidth: { cItemName: 'iColWidth', cShowCaption: '宽度', iColWidth: 80, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'InputNumber', bMustSelect: true, iNumPoint: 0 },
        cDefaultValue: { cItemName: 'cDefaultValue', cShowCaption: '默认值', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Uncertain', bMustSelect: true },
        enterDirection: {
          cItemName: 'enterDirection', cShowCaption: '回车方向', iColWidth: 100, bHidden: false,
          bShowIt: true, bCanModify: true, cControlType: 'Select', bMustSelect: true, "cEnumType": "enterDirection",
          cEnumString: JSON.stringify(this.cEnumString || ""), enumArray: JSON.stringify(this.enumArr || "")
        }
      };
      if (type == 'Report') {
        columns = {
          cCaption: { cItemName: 'cCaption', cShowCaption: '名称', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: false, cControlType: 'Input', bMustSelect: true },
          cShowCaption: { cItemName: 'cShowCaption', cShowCaption: '显示名称', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input', bMustSelect: true },
          bShowIt: { cItemName: 'bShowIt', cShowCaption: '是否显示', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'CheckRadio', bMustSelect: true },
          iColWidth: { cItemName: 'iColWidth', cShowCaption: '宽度', iColWidth: 80, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'InputNumber', bMustSelect: true, iNumPoint: 0 }
        };
      }
      this.gridModel = new cb.models.GridModel({
        columns: columns,
        independent: true,
        readOnly: true,
        showRowNo: true,
        showCheckBox: false,
        showAggregates: false,
        pagination: false,
        isDirty: true,
        showColumnSetting: false

      });
      this.gridModel.on('afterCellValueChange', function (val) {
        var index = val.rowIndex;
        var data = _this3.gridModel.getAllData();
        if (val.cellName == 'cDefaultValue' && val.value == '') data[index].cDefaultValue = null;
        data[index]._status = 'Update';
        _this3.actions.setGroups(data, _this3.props.type, data[index]);
      });
      this.gridModel.on('afterUpdateRow', function (val) {
        var index = val.index;
        var data = _this3.gridModel.getAllData();
        data[index]._status = 'Update';
        _this3.actions.setGroups(data, _this3.props.type, data[index]);
      });
      this.gridModel.on('afterInsertRow', function (val) {
        var index = val.index;
        var data = _this3.gridModel.getAllData();
        // data[index]._status = 'insert';
        _this3.actions.setGroups(data, _this3.props.type);
      });
      this.gridModel.on('afterSetDataSource', function (data) {
        if (cb.utils.isArray(data)) {
          var states = [];
          data.map(function (row, index) {
            if (row.iSystem != 1) {
              states.push({ "rowIndex": index, "cellName": "bIsNull", "propertyName": "disabled", "value": true });
            }
          });
          if (states.length > 0) _this3.gridModel.setCellStates(states);
        }
      });
    }
    /*查看/编辑 表单模板*/

    /*弹出框确认及取消事件*/

  }, {
    key: 'render',
    value: function render() {
      var billDesignControl = this.getControl();
      var _props$billDesign = this.props.billDesign,
          voucher = _props$billDesign.voucher,
          report = _props$billDesign.report;

      var showModal = void 0,
          modalData = void 0,
          readOnly = void 0,
          className = "bill-design-modal report-design-modal";
      if (this.props.type == 'report') {
        showModal = report.showModal;
        modalData = report.modalData;
        readOnly = report.readOnly;
      } else {
        showModal = voucher.showModal;
        modalData = voucher.modalData;
        readOnly = voucher.readOnly;
        className = 'bill-design-modal';
      }
      var modalControl = this.getModalControl(modalData);
      var title = readOnly ? '查看' : '编辑';
      var iBillEntityId = this.getBillEntityId();
      return _react2.default.createElement(
        'div',
        { className: 'uretail-billdesign-body' },
        billDesignControl,
        _react2.default.createElement(
          _antd.Modal,
          { title: title + this.title, width: 800, visible: showModal, className: className,
            onOk: this.onOk, onCancel: this.onCancel, okText: '\u786E\u5B9A', cancelText: '\u53D6\u6D88', maskClosable: false
          },
          _react2.default.createElement(
            'div',
            null,
            modalControl
          )
        ),
        _react2.default.createElement(_formulaDesigner2.default, { modalKey: this.billNo + iBillEntityId, onOk: this.handleOk })
      );
    }
  }]);

  return BillDesign;
}(_react.Component);

function mapStateToProps(state) {
  return {
    billDesign: state.billDesign.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    billactions: (0, _redux.bindActionCreators)(billactions, dispatch),
    initData: (0, _redux.bindActionCreators)(_formula.initData, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BillDesign);