'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _paymode = require('../../../../common/redux/modules/billing/paymode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextareaControl = function (_React$Component) {
  _inherits(TextareaControl, _React$Component);

  function TextareaControl(props) {
    _classCallCheck(this, TextareaControl);

    var _this = _possibleConstructorReturn(this, (TextareaControl.__proto__ || Object.getPrototypeOf(TextareaControl)).call(this, props));

    _this.setListenerState = function (params) {
      var cFormatData = params.cFormatData;
      try {
        if (!cFormatData || cFormatData == '') {
          cFormatData = {};
        } else {
          cFormatData = JSON.parse(cFormatData);
        }
      } catch (e) {
        cb.utils.alert('格式化字段预制错误！', 'error');
      }
      params.cFormatData = cFormatData;
      _this.setState(params);
    };

    _this.onInputChange = function (val) {
      _this.setState({ value: val });
    };

    _this.onInputBlur = function (val) {
      if (_this.props.model) _this.props.model.setValue(val, true);
    };

    _this.state = {};
    return _this;
  }

  _createClass(TextareaControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          value = _state.value,
          bCanModify = _state.bCanModify,
          iMaxLength = _state.iMaxLength,
          cFormatData = _state.cFormatData,
          cShowCaption = _state.cShowCaption,
          cControlType = _state.cControlType;

      var prefix = cFormatData && cFormatData.prefix ? cFormatData.prefix : "";
      var originalValue = value;
      if (cControlType === "money" && value) {
        if (value < 0) {
          value = Math.abs(value);
        }
        value = (0, _paymode.getFixedNumber)(value);
      }
      if (cb.utils.isEmpty(value)) value = "";
      var showValue = prefix + value;
      if (originalValue < 0) {
        showValue = "-" + prefix + value;
      }
      var className = "textAlignRight";
      if (this.props.viewMeta.iAlign == 1) className = "textAlignLeft";
      if (this.props.viewMeta.iAlign == 2) className = "textAlignCenter";
      if (this.props.viewMeta.iAlign == 3) className = "textAlignRight";
      if (cShowCaption && !this.props.noTitle) {
        if (this.state.readOnly) {
          return _react2.default.createElement(
            _antdMobile.List,
            null,
            _react2.default.createElement(
              _antdMobile.List.Item,
              { className: 'textarea-readonly', extra: showValue },
              cShowCaption
            )
          );
        } else {
          return _react2.default.createElement(
            _antdMobile.List,
            null,
            _react2.default.createElement(_antdMobile.TextareaItem, { title: cShowCaption, autoHeight: true, className: className, disabled: this.state.readOnly,
              editable: bCanModify, maxLength: iMaxLength, onBlur: this.onInputBlur,
              onChange: this.onInputChange, placeholder: this.state.readOnly ? "" : "请输入", value: showValue })
          );
        }
      } else {
        return _react2.default.createElement(
          _antdMobile.List,
          null,
          _react2.default.createElement(
            _antdMobile.List.Item,
            { className: 'noTitle' },
            showValue
          )
        );
      }
    }
  }]);

  return TextareaControl;
}(_react2.default.Component);

exports.default = TextareaControl;