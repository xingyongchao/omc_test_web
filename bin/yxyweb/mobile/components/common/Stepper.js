'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import SvgIcon from 'src/client/components/SvgIcon'

/**
 * value由只能由props中传入，为了校验数量是否有权限加减不自己在state中维护
*/

var StepperSelf = function (_Component) {
  _inherits(StepperSelf, _Component);

  function StepperSelf(props) {
    _classCallCheck(this, StepperSelf);

    var _this = _possibleConstructorReturn(this, (StepperSelf.__proto__ || Object.getPrototypeOf(StepperSelf)).call(this, props));

    var obj = {
      showType: props.showType || 'text', /*数字展示区域类型 'text' || 'input'*/
      min: props.min !== undefined ? props.min : 1,
      max: props.max !== undefined ? props.max : 9999999,
      value: props.value || 1,
      step: props.step || 1,
      isMin: false, /*是否达到最小值*/
      isMax: false
    };
    if (obj.min == obj.value) obj.isMin = true;
    if (obj.max == obj.value) obj.isMax = true;
    _this.state = obj;
    return _this;
  }

  _createClass(StepperSelf, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value != this.state.value) {
        this.setState({ value: nextProps.value });
      }
    }
  }, {
    key: 'downClick',
    value: function downClick(e) {
      var _state = this.state,
          value = _state.value,
          min = _state.min,
          step = _state.step,
          max = _state.max;

      value = value - step;
      if (value <= min) {
        this.setState({ isMin: true, isMax: false });
        value = min;
      } else {
        this.setState({ isMin: false, isMax: false });
      }
      if (this.props.onChange) this.props.onChange(value, e, 'down');
    }
  }, {
    key: 'upClick',
    value: function upClick(e) {
      var _state2 = this.state,
          value = _state2.value,
          step = _state2.step,
          min = _state2.min,
          max = _state2.max;

      value = value + step;
      if (value >= max) {
        value = max;
        this.setState({ isMax: true, isMin: true });
      } else {
        this.setState({ isMax: false, isMin: false });
      }
      if (this.props.onChange) this.props.onChange(value, e, 'up');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state3 = this.state,
          showType = _state3.showType,
          value = _state3.value,
          isMin = _state3.isMin,
          isMax = _state3.isMax;

      var quantitydecimal = cb.rest.AppContext.option.quantitydecimal;
      value = parseFloat(value).toFixed(quantitydecimal);
      return _react2.default.createElement(
        'div',
        { className: 'stepper_container am-stepper showNumber' },
        _react2.default.createElement(
          'div',
          { className: 'stepper_btn am-stepper-handler-wrap' },
          _react2.default.createElement(
            'span',
            { className: !isMin ? "stepper_left_btn am-stepper-handler am-stepper-handler-down" : "stepper_right_btn am-stepper-handler am-stepper-handler-down am-stepper-handler-disabled",
              onClick: function onClick(e) {
                return _this2.downClick(e);
              }
            },
            _react2.default.createElement(
              'svg',
              { className: 'icon am-icon am-icon-minus am-icon-xxs' },
              _react2.default.createElement('use', { xlinkHref: '#minus' })
            )
          ),
          _react2.default.createElement(
            'span',
            {
              className: !isMax ? "stepper_rignt_btn am-stepper-handler am-stepper-handler-up " : "stepper_rignt_btn am-stepper-handler am-stepper-handler-up am-stepper-handler-disabled",
              onClick: function onClick(e) {
                return _this2.upClick(e);
              } },
            _react2.default.createElement(
              'svg',
              { className: 'am-icon am-icon-plus am-icon-xxs' },
              _react2.default.createElement('use', { xlinkHref: '#plus' })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'stepper_show_area am-stepper-input-wrap' },
          showType === 'input' ? _react2.default.createElement('input', { className: 'am-stepper-input', onChange: function onChange(e) {
              return _this2.onChange(e);
            }, value: value }) : _react2.default.createElement(
            'div',
            null,
            value
          )
        )
      );
    }
  }]);

  return StepperSelf;
}(_react.Component);

exports.default = StepperSelf;