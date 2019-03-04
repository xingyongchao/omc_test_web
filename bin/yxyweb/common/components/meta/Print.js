'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basic = require('../basic');

var _env = require('../../helpers/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import * as MetaComponents from './index';


var Print = function (_Component) {
  _inherits(Print, _Component);

  function Print(props) {
    _classCallCheck(this, Print);

    var _this = _possibleConstructorReturn(this, (Print.__proto__ || Object.getPrototypeOf(Print)).call(this, props));

    _this.onVisibleChange = function (visible) {
      _this.setState({ hide: !visible });
      if (_this.props.onVisibleChange) _this.props.onVisibleChange(visible);
    };

    _this.state = {
      hide: false
    };
    var cParameter = props.cParameter;

    var config = {};
    if (cParameter) {
      try {
        Object.assign(config, JSON.parse(cParameter));
      } catch (e) {}
    }
    var viewModel = props.model.getParent();

    var _viewModel$getParams = viewModel.getParams(),
        billType = _viewModel$getParams.billType,
        mode = _viewModel$getParams.mode;

    var valueField = 'templatecode',
        vouchPrintKey = props.cItemName,
        localPrintKey = 'btnLocalPrint';
    _this.attachedMeta = [{
      cControlType: 'Select',
      modelType: 'ListModel',
      // cShowCaption: '打印模板',
      cItemName: 'templates',
      valueField: valueField,
      textField: 'templatename',
      dataSourceMode: 'remote',
      bNotModify: false,
      needClear: false
    }];
    if (config.vouchPrint !== false) {
      _this.attachedMeta.push({
        cControlType: 'Button',
        value: '单据打印',
        icon: props.icon,
        cItemName: vouchPrintKey,
        onVisibleChange: _this.onVisibleChange
      });
    }
    if (billType !== 'Report') {
      _this.attachedMeta.push({
        cControlType: 'Button',
        modelType: 'SimpleModel',
        value: config.localPrintCaption || '小票打印',
        icon: props.icon,
        cItemName: localPrintKey,
        cAction: 'localPrint',
        needClear: false
      });
    }
    if (process.env.NODE_ENV === 'development') {
      _this.attachedMeta.splice(0, 0, {
        cControlType: 'Button',
        modelType: 'SimpleModel',
        value: '保存业务对象',
        cItemName: 'btnSaveBo',
        cAction: 'saveBo',
        needClear: false
      });
    }
    if (mode && mode !== _env2.default.VOUCHER_STATE_BROWSE) {
      if (props.onVisibleChange) props.onVisibleChange(false);
      // return;
    }
    _this.attachedMeta.forEach(function (item) {
      var key = item.cItemName;
      if (!viewModel.get(key)) viewModel.addProperty(key, new cb.models[item.modelType](item));
      if (item.cControlType === 'Button') {
        if (key === vouchPrintKey) return;
        viewModel.get(key).on('click', function () {
          if (key === localPrintKey) {
            viewModel.get(vouchPrintKey).execute('click', { cAction: item.cAction });
          } else {
            viewModel.biz.do(item.cAction, viewModel, { key: key });
          }
        });
      } else {
        viewModel.get(key).setDataSource({
          url: 'print/getTemplateByBo',
          method: 'GET',
          options: { mask: false }
        }, { billno: props.model.getState('billNo') || viewModel.getParams().billNo });
        viewModel.get(key).on('afterSetDataSource', function (data) {
          var defaultValue = data.length === 1 ? data[0] : data.find(function (item) {
            return item.isdefault;
          });
          if (!defaultValue) return;
          this.setValue(defaultValue[valueField]);
        });
      }
    });
    return _this;
  }

  _createClass(Print, [{
    key: 'render',
    value: function render() {
      var viewModel = this.props.model.getParent();
      // const { mode } = viewModel.getParams();
      // if (mode && mode !== env.VOUCHER_STATE_BROWSE)
      //   return null;
      var attachedControls = [];
      this.attachedMeta.forEach(function (control) {
        var controlType = control.cControlType && control.cControlType.trim().toLocaleLowerCase();
        var key = control.cItemName;
        var model = viewModel.get(key);
        if (controlType === 'button') attachedControls.push(_react2.default.createElement(
          _basic.Col,
          { key: key, span: 8 },
          _react2.default.createElement(_basic.Button, _extends({ className: control.className, model: model }, control))
        ));
        if (controlType === 'select') attachedControls.push(_react2.default.createElement(
          _basic.Col,
          { key: key, span: 8 },
          _react2.default.createElement(_basic.Select, _extends({ model: model }, control))
        ));
      });
      // attachedControls.push(<Col span={8}><Button {...this.props} /></Col>)
      return _react2.default.createElement(
        'div',
        { className: 'meta-print-button', style: { float: 'left', display: this.state.hide ? 'none' : '' } },
        attachedControls
      );
    }
  }]);

  return Print;
}(_react.Component);

exports.default = Print;