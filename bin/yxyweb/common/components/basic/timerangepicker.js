'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _timepicker = require('./timepicker');

var _timepicker2 = _interopRequireDefault(_timepicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeRangePicker = function (_Component) {
  _inherits(TimeRangePicker, _Component);

  function TimeRangePicker(props) {
    _classCallCheck(this, TimeRangePicker);

    var _this = _possibleConstructorReturn(this, (TimeRangePicker.__proto__ || Object.getPrototypeOf(TimeRangePicker)).call(this, props));

    var fromModel = props.model;
    var toModel = null;
    if (props.cStyle) {
      var config = null;
      try {
        config = JSON.parse(props.cStyle);
      } catch (e) {
        config = {};
      }
      if (config.to) toModel = fromModel.getParent().get(config.to);
    }
    _this.state = {
      bIsNull: props.bIsNull,
      visible: !props.bHidden,
      fromModel: fromModel,
      toModel: toModel
    };
    return _this;
  }

  _createClass(TimeRangePicker, [{
    key: 'validate',
    value: function validate(val) {
      this.setState({
        err: 'has-' + val.type,
        msg: val.message
      });
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _state = this.state,
          fromModel = _state.fromModel,
          toModel = _state.toModel;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_timepicker2.default, { model: fromModel }),
        '-',
        _react2.default.createElement(_timepicker2.default, { model: toModel })
      );
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var cShowCaption = this.props.cShowCaption;

      var title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(_antd.Icon, { type: 'star' }),
        cShowCaption
      ) : _react2.default.createElement(
        'label',
        null,
        cShowCaption
      );
      var control = cShowCaption ? _react2.default.createElement(_label2.default, { control: this.baseControl(), title: title }) : this.baseControl();
      return control;
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getControl();
      var style = this.state.visible ? {} : { display: "none" };
      var className = this.state.err + ' ' + this.state.className;
      return _react2.default.createElement(
        'div',
        { ref: 'div', style: style, className: className },
        control,
        _react2.default.createElement(
          'div',
          { className: 'ant-form-explain' },
          this.state.msg
        )
      );
    }
  }]);

  return TimeRangePicker;
}(_react.Component);

exports.default = TimeRangePicker;