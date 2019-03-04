'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _basic = require('../basic');

var _lodash = require('lodash');

var _userDefineArchives = require('../../redux/userDefineArchives');

var _ActionStatus = require('../../constants/ActionStatus');

var _ActionStatus2 = _interopRequireDefault(_ActionStatus);

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (process.env.__CLIENT__ === true) {
  require('./UserDefineArchives.less');
}

var confirm = _antd.Modal.confirm;

var UserDefineSetting = function (_Component) {
  _inherits(UserDefineSetting, _Component);

  function UserDefineSetting(props) {
    _classCallCheck(this, UserDefineSetting);

    var _this = _possibleConstructorReturn(this, (UserDefineSetting.__proto__ || Object.getPrototypeOf(UserDefineSetting)).call(this, props));

    _this.checkType = function (rule, value, callback) {
      var form = _this.props.form;
      if (value != undefined && value.trim() == "") {
        callback('数据类型不可为空字符。');
      } else {
        callback();
      }
    };

    _this.checkItemName = function (rule, value, callback) {
      var form = _this.props.form;
      if (value && value.trim().length > 50) {
        callback('最大长度为50个字符');
      } else {
        callback();
      }
      // if (value && value !== form.getFieldValue('itemName')) {
      //   callback('Two passwords that you enter is inconsistent!');
      // }
      // else {
      //   callback();
      // }
    };

    _this.state = {
      isUpdate: _this.props.params.defineId !== undefined,
      typeValue: "",
      typeDisabled: false,
      maxInputLenDisabled: false,
      decimalDigitsDisabled: false,
      isMultiSelDisabled: false,
      isEnabledDisabled: false,
      isSysEnabled: false,
      bInitGridModelDataSource: true
    };
    _this.handleOk = _this.handleOk.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.dataSourceChange = _this.dataSourceChange.bind(_this);
    return _this;
  }

  _createClass(UserDefineSetting, [{
    key: 'getTabsContent',
    value: function getTabsContent() {
      var _this2 = this;

      var TabPane = _antd.Tabs.TabPane;
      if (this.state.typeValue == "档案") {
        return _react2.default.createElement(
          _antd.Tabs,
          { defaultActiveKey: '1',
            tabBarExtraContent: _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _antd.Button,
                { type: 'ghost', ref: 'buttonAdd', className: 'ant-btn ant-btn-ghost no-border-radius m-l-5',
                  onClick: function onClick(e) {
                    return _this2.handleClick('add');
                  } },
                _react2.default.createElement(_SvgIcon2.default, { type: 'plus' }),
                '\u589E\u884C'
              )
            ) },
          _react2.default.createElement(
            TabPane,
            { tab: '\u6863\u6848\u503C', key: '1' },
            _react2.default.createElement(
              _basic.Row,
              null,
              _react2.default.createElement(
                _basic.Col,
                { span: 'all' },
                this.renderTable()
              )
            )
          )
        );
      } else {
        return _react2.default.createElement('div', null);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this,
          _React$createElement;

      var isUpdate = this.state.isUpdate;
      var _props = this.props,
          form = _props.form,
          userDefineArchives = _props.userDefineArchives;
      var getFieldDecorator = form.getFieldDecorator;

      var FormItem = _antd.Form.Item;
      var tabsContent = this.getTabsContent();
      var needMaxInputLen = !this.state.maxInputLenDisabled;

      var isInputDisabled = this.props.params.classId == "batchnoArchive" || this.props.params.classId == "productSpec" ? true : false;

      return _react2.default.createElement(
        _antd.Modal,
        (_React$createElement = {
          title: '\u81EA\u5B9A\u4E49\u9879\u8BBE\u7F6E',
          width: 846,
          maskClosable: false,
          className: 'userDefineSetting'
        }, _defineProperty(_React$createElement, 'width', 750), _defineProperty(_React$createElement, 'visible', true), _defineProperty(_React$createElement, 'onOk', this.handleOk), _defineProperty(_React$createElement, 'onCancel', this.handleCancel), _React$createElement),
        _react2.default.createElement(
          _antd.Form,
          { className: 'ant-advanced-search-form' },
          _react2.default.createElement(
            _basic.Row,
            { colCount: 2, gutter: 24 },
            _react2.default.createElement(
              _basic.Col,
              { span: 0 },
              ' ',
              _react2.default.createElement(
                FormItem,
                null,
                ' ',
                getFieldDecorator("tenantId")(_react2.default.createElement(_antd.Input, { size: 'default', disabled: true })),
                ' '
              ),
              ' '
            ),
            _react2.default.createElement(
              _basic.Col,
              { span: 0 },
              ' ',
              _react2.default.createElement(
                FormItem,
                null,
                ' ',
                getFieldDecorator("pubts")(_react2.default.createElement(_antd.Input, { size: 'default', disabled: true })),
                ' '
              ),
              ' '
            ),
            _react2.default.createElement(
              _basic.Col,
              { span: 0 },
              ' ',
              _react2.default.createElement(
                FormItem,
                null,
                ' ',
                getFieldDecorator("id")(_react2.default.createElement(_antd.Input, { size: 'default', disabled: true })),
                ' '
              ),
              ' '
            ),
            _react2.default.createElement(
              _basic.Col,
              { span: 0 },
              ' ',
              _react2.default.createElement(
                FormItem,
                null,
                ' ',
                getFieldDecorator("classId")(_react2.default.createElement(_antd.Input, { size: 'default', disabled: true })),
                ' '
              ),
              ' '
            ),
            _react2.default.createElement(
              _basic.Col,
              { span: 1 },
              ' ',
              _react2.default.createElement(
                FormItem,
                { label: '\u5206\u7C7B', labelCol: { span: 7 }, wrapperCol: { span: 13 } },
                ' ',
                getFieldDecorator("className")(_react2.default.createElement(_antd.Input, { size: 'default', disabled: true })),
                ' '
              ),
              ' '
            ),
            _react2.default.createElement(
              _basic.Col,
              { span: 0 },
              ' ',
              _react2.default.createElement(
                FormItem,
                { label: 'defineId', labelCol: { span: 6 }, wrapperCol: { span: 14 } },
                ' ',
                getFieldDecorator("defineId")(_react2.default.createElement(_antd.Input, { placeholder: 'defineId', size: 'default', disabled: true })),
                ' '
              ),
              ' '
            ),
            _react2.default.createElement(
              _basic.Col,
              { span: 1 },
              ' ',
              _react2.default.createElement(
                FormItem,
                { label: '\u9879\u76EE\u53F7', labelCol: { span: 6 }, wrapperCol: { span: 14 } },
                ' ',
                getFieldDecorator("item")(_react2.default.createElement(_antd.Input, { placeholder: '\u9879\u76EE\u53F7', size: 'default', disabled: true })),
                ' '
              ),
              ' '
            )
          ),
          _react2.default.createElement(
            _basic.Row,
            { colCount: 2, gutter: 24 },
            _react2.default.createElement(
              _basic.Col,
              { span: 1 },
              _react2.default.createElement(
                FormItem,
                { label: '\u6570\u636E\u7C7B\u578B', labelCol: { span: 7 }, wrapperCol: { span: 13 } },
                getFieldDecorator("type", { rules: [{ required: true, message: '不能为空' }], initialValue: "" })(_react2.default.createElement(
                  _antd.Select,
                  { style: { width: 139 }, disabled: this.state.typeDisabled, onChange: function onChange(val) {
                      return _this3.dataSourceChange("type", val, false);
                    } },
                  _react2.default.createElement(
                    _antd.Select.Option,
                    { value: '\u6587\u672C' },
                    '\u6587\u672C'
                  ),
                  _react2.default.createElement(
                    _antd.Select.Option,
                    { value: '\u6574\u578B' },
                    '\u6574\u578B'
                  ),
                  _react2.default.createElement(
                    _antd.Select.Option,
                    { value: '\u6570\u503C' },
                    '\u6570\u503C'
                  ),
                  _react2.default.createElement(
                    _antd.Select.Option,
                    { value: '\u65E5\u671F' },
                    '\u65E5\u671F'
                  ),
                  _react2.default.createElement(
                    _antd.Select.Option,
                    { value: '\u65F6\u95F4' },
                    '\u65F6\u95F4'
                  ),
                  _react2.default.createElement(
                    _antd.Select.Option,
                    { value: '\u65E5\u671F\u65F6\u95F4' },
                    '\u65E5\u671F\u65F6\u95F4'
                  ),
                  _react2.default.createElement(
                    _antd.Select.Option,
                    { value: '\u6863\u6848' },
                    '\u6863\u6848'
                  )
                ))
              )
            ),
            _react2.default.createElement(
              _basic.Col,
              { span: 1 },
              ' ',
              _react2.default.createElement(
                FormItem,
                { label: '\u9879\u76EE\u540D\u79F0', labelCol: { span: 6 }, wrapperCol: { span: 14 } },
                ' ',
                getFieldDecorator("showItem", { rules: [{ required: true, message: '不能为空' }, /*{ required: true, message: '最大长度为50个字符。',min:1, max: 50 },*/{ validator: this.checkItemName }] })(_react2.default.createElement(_antd.Input, { placeholder: '', size: 'default' })),
                ' '
              ),
              ' '
            )
          ),
          _react2.default.createElement(
            _basic.Row,
            { colCount: 2, gutter: 24 },
            _react2.default.createElement(
              _basic.Col,
              { span: 1 },
              ' ',
              _react2.default.createElement(
                FormItem,
                { label: '\u63A7\u5236\u5F55\u5165\u957F\u5EA6', labelCol: { span: 7 }, wrapperCol: { span: 13 } },
                ' ',
                getFieldDecorator("maxInputLen", { rules: [{ required: needMaxInputLen, message: '不能为空' }] })(_react2.default.createElement(_antd.Input, { placeholder: '', size: 'default', disabled: this.state.maxInputLenDisabled })),
                ' '
              ),
              ' '
            ),
            _react2.default.createElement(
              _basic.Col,
              { span: 1 },
              ' ',
              _react2.default.createElement(
                FormItem,
                { label: '\u5C0F\u6570\u4F4D\u6570', labelCol: { span: 6 }, wrapperCol: { span: 14 } },
                ' ',
                getFieldDecorator("decimalDigits")(_react2.default.createElement(_antd.Input, { placeholder: '\u8BF7\u8F93\u5165\u5C0F\u6570\u4F4D\u6570', size: 'default', disabled: this.state.decimalDigitsDisabled })),
                ' '
              ),
              ' '
            )
          ),
          _react2.default.createElement(
            _basic.Row,
            { colCount: 12, gutter: 24 },
            _react2.default.createElement(
              _basic.Col,
              { span: 6 },
              _react2.default.createElement(
                _basic.Col,
                { span: 7, className: 'ant-form-item-label' },
                _react2.default.createElement(
                  'label',
                  null,
                  '\u63A7\u5236'
                )
              ),
              _react2.default.createElement(
                _basic.Col,
                { span: 13, className: 'checkbox' },
                getFieldDecorator("isEnabled", { initialValue: false, valuePropName: 'checked' })(_react2.default.createElement(
                  _antd.Checkbox,
                  { disabled: this.state.isEnabledDisabled },
                  '\u542F\u7528'
                )),
                getFieldDecorator("isInput", { initialValue: false, valuePropName: 'checked' })(_react2.default.createElement(
                  _antd.Checkbox,
                  { disabled: isInputDisabled },
                  '\u5FC5\u8F93'
                ))
              )
            )
          ),
          tabsContent
        )
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick(action, row) {
      switch (action) {
        case 'edit':
          this.gridModel.setReadOnly(false);
          break;
        case 'add':
          this.gridModel.setReadOnly(false);
          this.gridModel.appendRow();
          break;
        case 'delete':
          this.gridModel.setReadOnly(false);
          // let indexs = this.gridModel.getSelectedRowIndexes()
          // this.gridModel.deleteRows(indexs[0]);
          this.gridModel.deleteRows(row);
          break;
      }
    }
  }, {
    key: 'renderTable',
    value: function renderTable() {
      var _props$userDefineArch = this.props.userDefineArchives,
          userDefSetting_ArchiveValue = _props$userDefineArch.userDefSetting_ArchiveValue,
          userDefSetting_GetArchiveStatus = _props$userDefineArch.userDefSetting_GetArchiveStatus;

      if (userDefSetting_GetArchiveStatus === _ActionStatus2.default.ING) {
        return _react2.default.createElement(
          'div',
          null,
          '\u6B63\u5728\u52A0\u8F7D..'
        );
      } else if (userDefSetting_GetArchiveStatus === _ActionStatus2.default.FAILURE) {
        return _react2.default.createElement(
          'div',
          null,
          '\u52A0\u8F7D\u5931\u8D25'
        );
      }
      // else if (userDefSetting_GetArchiveStatus === ActionStatus.SUCCEED && userDefSetting_ArchiveValue.length === 0) {
      //   return <div>暂无数据</div>
      // }
      var action = {};
      if (this.state.isSysEnabled == false) {
        action.cAlign = "left";
        action.cControlType = "Toolbar";
        action.cDataSourceName = "Toolbar";
        action.controls = [];
        action.controls.push({ cCaption: "删除", cControlType: "button", cItemName: "btnDelete", cShowCaption: "删除", iOrder: 2, iStyle: 0, icon: "delete", key: "ABC231626" });
      }
      // return (<Table width={700} model={this.gridModel} action={action} />)
      return _react2.default.createElement(_basic.Table, { width: 900, height: 0, model: this.gridModel, maxRowCount: 5, action: action });
    }
  }, {
    key: 'dataSourceChange',
    value: function dataSourceChange(name, value, bInit) {
      var _props2 = this.props,
          form = _props2.form,
          userDefineArchives = _props2.userDefineArchives;

      var fields = {};
      if (name == "type") {
        fields.typeDisabled = { value: false };
        if (value == "文本") {
          this.state.maxInputLenDisabled = false;
          fields.decimalDigits = { value: null };
          this.state.decimalDigitsDisabled = true;
          this.state.isMultiSelDisabled = true;
          if (bInit == false) {
            fields.maxInputLen = { value: 255 };
          }
        } else if (value == "整型") {
          this.state.maxInputLenDisabled = false;
          fields.decimalDigits = { value: null };
          this.state.decimalDigitsDisabled = true;
          this.state.isMultiSelDisabled = true;
          if (bInit == false) {
            fields.maxInputLen = { value: 255 };
          }
        } else if (value == "数值") {
          // fields.maxInputLen = { value: 255 };
          this.state.maxInputLenDisabled = false;
          this.state.decimalDigitsDisabled = false;
          this.state.isMultiSelDisabled = true;
          if (bInit == false) {
            fields.maxInputLen = { value: 255 };
            fields.decimalDigits = { value: 8 };
          }
        } else if (value == "日期") {
          // fields.maxInputLen = { value: 10 };
          fields.maxInputLen = { value: null };
          this.state.maxInputLenDisabled = true;
          fields.decimalDigits = { value: null };
          this.state.decimalDigitsDisabled = true;
          this.state.isMultiSelDisabled = true;
        } else if (value == "时间") {
          // fields.maxInputLen = { value: 8 };
          fields.maxInputLen = { value: null };
          this.state.maxInputLenDisabled = true;
          fields.decimalDigits = { value: null };
          this.state.decimalDigitsDisabled = true;
          this.state.isMultiSelDisabled = true;
        } else if (value == "日期时间") {
          // fields.maxInputLen = { value: 19 };
          fields.maxInputLen = { value: null };
          this.state.maxInputLenDisabled = true;
          fields.decimalDigits = { value: null };
          this.state.decimalDigitsDisabled = true;
          this.state.isMultiSelDisabled = true;
        } else if (value == "档案") {
          var _getUserDefineArchiveByDefineId = this.props.getUserDefineArchiveByDefineId;
          // fields.maxInputLen = { value: 0 };

          fields.maxInputLen = { value: null };
          this.state.maxInputLenDisabled = true;
          fields.decimalDigits = { value: null };
          this.state.decimalDigitsDisabled = true;
          this.state.isMultiSelDisabled = false;
          _getUserDefineArchiveByDefineId(this.props.params.defineId);
        }
      }
      if (bInit == true) {
        var isEnabled = form.getFieldValue('isEnabled');
        this.state.isSysEnabled = false;
        if (isEnabled && isEnabled == true) {
          this.state.isSysEnabled = true;
          // this.state.decimalDigitsDisabled = true;
          this.state.maxInputLenDisabled = true;
          this.state.typeDisabled = true;
          this.state.isEnabledDisabled = true;
        }
      }
      form.setFields(fields);
      this.setState({ typeValue: value });
    }
  }, {
    key: 'checkUserDefValue',
    value: function checkUserDefValue(value) {
      var type = value.type;
      var length = value.length; //控制录入长度
      if (length == undefined) length = 255;
      var maxInputLen = value.maxInputLen; //控制录入长度
      var decimalDigits = value.decimalDigits; //小数位数
      if (type == undefined || type == "") {
        cb.utils.alert("数据类型不可为空,请检查。", 'error');
        return false;
      }
      if (value.type == "文本") {
        if (isNaN(maxInputLen) == true || typeof maxInputLen == "string" && maxInputLen.trim() == "" || maxInputLen < 1 || length < maxInputLen || String(maxInputLen).indexOf(".") > 0) {
          cb.utils.alert("控制录入长度必须为1~255之间的整数!", 'error');
          return false;
        }
      }
      if (value.type == "数值") {
        if (isNaN(decimalDigits) == true || typeof maxInputLen == "string" && maxInputLen.trim() == "" || decimalDigits < 1 || decimalDigits > 8 || String(decimalDigits).indexOf(".") > 0) {
          cb.utils.alert("小数位数必须为1~8之间的整数!", 'error');
          return false;
        }
        if (isNaN(maxInputLen) == true || typeof maxInputLen == "string" && maxInputLen.trim() == "" || maxInputLen < 1 || length < maxInputLen || String(maxInputLen).indexOf(".") > 0) {
          cb.utils.alert("控制录入长度必须为1~255之间的整数!", 'error');
          return false;
        }
      }
      if (value.type == "整型") {
        if (isNaN(maxInputLen) == true || typeof maxInputLen == "string" && maxInputLen.trim() == "" || maxInputLen < 1 || length < maxInputLen || String(maxInputLen).indexOf(".") > 0) {
          cb.utils.alert("控制录入长度必须为1~255之间的整数!", 'error');
          return false;
        }
      }
    }
  }, {
    key: 'checkUserDefArchiveValue',
    value: function checkUserDefArchiveValue(data) {
      if (data) {
        var codeArray = [];
        var nameNullRow = [];
        for (var i = 0; i < data.length; i++) {
          // 不再控制编码不可为空和重复
          // if (data[i].code && data[i].code != "") {
          //   if (codeArray.indexOf(data[i].code) >= 0) {
          //     cb.utils.alert("存在编码重复的行,请检查。", 'error');
          //     return false;
          //   }
          //   else {
          //     codeArray.push(data[i].code);
          //   }
          // }
          // if (data[i].code === undefined || data[i].code == "") {
          //   cb.utils.alert("档案值，编码字段不能为空！", 'error');
          //   return false;
          // }
          if (data[i].name === undefined || data[i].name == "") {
            cb.utils.alert("档案值，名称字段不能为空！", 'error');
            return false;
          }
        }
      }
      return true;
    }
  }, {
    key: 'handleOk',
    value: function handleOk() {
      var _this4 = this;

      // 行业的值非空 0可以改
      var _props3 = this.props,
          form = _props3.form,
          updateUserDef = _props3.updateUserDef,
          userDefineArchives = _props3.userDefineArchives;

      var propertytype = form.getFieldValue('propertytype');
      var bOKDisable = propertytype ? true : false;
      if (propertytype == "0" || propertytype == 0) bOKDisable = false;
      if (bOKDisable == true) {
        cb.utils.alert("行业应用不可修改自定义项。", 'error');
        return;
      }
      var self = this;

      var isEnabled = form.getFieldValue('isEnabled');

      form.validateFields(function (errors, values) {
        if (!!errors) {
          return;
        }
        if (_this4.checkUserDefValue(values) == false) return;
        values = cb.utils.changeUserDefineTypeEnumValue([values], false)[0];
        var params = void 0;
        if (_this4.state.typeValue == "档案") {
          var dataAll = _this4.gridModel.getAllData();
          var dirtyData = _this4.gridModel.getDirtyData();
          if (isEnabled == true && !(dataAll && dataAll.length > 0)) {
            cb.utils.alert("档案值不可为空。", 'error');
            return;
          } else if (_this4.checkUserDefArchiveValue(dataAll) == false) {
            return;
          } else {
            params = {
              "classId": _this4.props.params.classId,
              "defineId": _this4.props.params.defineId,
              "userDefBase": values,
              "userDefines": dirtyData
            };
          }
        } else {
          var data = _this4.gridModel.getData();
          for (var i = data.length - 1; i >= 0; i--) {
            if (data[i]._status == "Insert") delete data[i];else {
              data[i]._status = "Delete";
            }
          }
          params = {
            "classId": _this4.props.params.classId,
            "defineId": _this4.props.params.defineId,
            "userDefBase": values,
            "userDefines": data
          };
        }

        if (isEnabled == true && _this4.state.isSysEnabled == false) {
          self.state.isShowConfirm = true;

          cb.utils.confirm('请确保数据类型设置正确，启用后不允许调整！', function () {
            self.state.isShowConfirm = false;
            updateUserDef(params);
            self.handleCancel();
          }, function () {
            self.state.isShowConfirm = false;
            //取消操作
          });
        } else {
          updateUserDef(params);
          self.handleCancel();
        }
      });
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      this.props.hideSetting();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this5 = this;

      var _props4 = this.props,
          params = _props4.params,
          userDefineArchives = _props4.userDefineArchives,
          form = _props4.form,
          getUserDefineArchiveByDefineId = _props4.getUserDefineArchiveByDefineId; //, getScopeTreeData

      var isUpdate = this.state.isUpdate;
      var userDefList_DisplayData = userDefineArchives.userDefList_DisplayData,
          refFields = userDefineArchives.refFields;

      if (isUpdate) {
        for (var u in userDefList_DisplayData) {
          var userDef = userDefList_DisplayData[u];
          if (userDef.defineId === params.defineId) {
            var _fields = {};
            for (var key in userDef) {
              _fields[key] = { value: userDef[key] };
            }
            form.setFields(_fields);
            if (_fields.type) {
              this.state.typeValue = _fields.type.value;
              this.dataSourceChange("type", this.state.typeValue, true);
            }
            break;
          }
        }
        this.gridModel = new cb.models.GridModel({
          columns: {
            id: { cItemName: 'id', cShowCaption: 'ID', iColWidth: 0, bHidden: false, bShowIt: false, bCanModify: false, cControlType: 'Input', bMustSelect: true },
            code: { cItemName: 'code', cShowCaption: '编码', iColWidth: 250, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input', bMustSelect: true, iMaxLength: 20 },
            name: { cItemName: 'name', cShowCaption: '名称', iColWidth: 400, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input', bMustSelect: true, iMaxLength: 50 },
            // editButton: { cItemName: 'editButton', cShowCaption: '操作', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: true },

            pubts: { cItemName: 'pubts', cShowCaption: 'pubts', iColWidth: 0, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
            isDeleted: { cItemName: 'isDeleted', cShowCaption: 'isDeleted', iColWidth: 0, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' }
          },
          independent: true,
          readOnly: true,
          showCheckBox: false,
          showAggregates: false,
          pagination: false,
          showColumnSetting: false
        });
        this.state.bInitGridModelDataSource = true;

        // this.gridModel.on('beforeValueChange', (data) => {
        //   let cellName = data.cellName;
        //   let value = data.value;
        //   if (cellName == "code" && value.length > 20)
        //     return false;
        //   else if (cellName == "name" && value.length > 50)
        //     return false;
        //   else
        //     return true;
        // });
        this.gridModel.on('beforeCellValueChange', function (data) {
          var cellName = data.cellName;
          var value = data.value;
          if (cellName == "code" && value.length > 20) {
            return false;
          } else if (cellName == "name" && value.length > 50) {
            return false;
          } else return true;
        });
        // this.gridModel.on('beforeColumnValueChange', (data) => {
        //   let cellName = data.cellName;
        //   let value = data.value;
        //   if (cellName == "code" && value.length > 20)
        //     return false;
        //   else if (cellName == "name" && value.length > 50)
        //     return false;
        //   else
        //     return true;
        // });
        this.gridModel.setReadOnly(false);
        var fields = {
          grid: this.gridModel,
          btnEdit: new cb.models.SimpleModel(),
          btnDelete: new cb.models.SimpleModel()
        };
        this.viewModel = new cb.models.ContainerModel();
        this.viewModel.setData(fields);

        this.viewModel.get("btnEdit").on('click', function (params) {
          // const rowData = this.gridModel.getRow(params.index);
          _this5.handleClick('edit');
        });

        this.viewModel.get("btnDelete").on('click', function (params) {
          // const rowData = this.gridModel.getRow(params.index);
          _this5.handleClick('delete', params.index);
        });

        if (this.state.typeValue == "档案") getUserDefineArchiveByDefineId(params.defineId);
      } else {}
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {

      if (this.state.isShowConfirm) return;else {
        if (this.gridModel && nextProps.userDefineArchives.userDefSetting_ArchiveValue && nextProps.userDefineArchives.userDefSetting_ArchiveValue.length > 0) {
          if (this.state.bInitGridModelDataSource) {
            this.gridModel.setDataSource(nextProps.userDefineArchives.userDefSetting_ArchiveValue);
            this.gridModel.setDirty(false);
            this.state.bInitGridModelDataSource = false;
          }
        }
      }
    }
  }]);

  return UserDefineSetting;
}(_react.Component);

UserDefineSetting.contextTypes = {
  router: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    userDefineArchives: state.userDefineArchives.toJS(),
    params: ownProps.params
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  var methods = {
    getUserDefineArchiveByDefineId: _userDefineArchives.getUserDefineArchiveByDefineId, updateUserDef: _userDefineArchives.updateUserDef, hideSetting: _userDefineArchives.hideSetting
  };
  return _extends({
    dispatch: dispatch
  }, (0, _redux.bindActionCreators)(methods, dispatch));
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_antd.Form.create()(UserDefineSetting));