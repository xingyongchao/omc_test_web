'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _antd = require('antd');

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               成员				说明						类型				默认值
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               min				最小值					Number			-Infinity
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               max				最大值					Number			Infinity
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               value			当前值					Number
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               step			每次改变步数，可以为小数	Number or String	1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               value	初始值					Number
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               disabled		禁用						Boolean			false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               size			输入框大小				String			无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var InputFloatControl = function (_React$Component) {
  _inherits(InputFloatControl, _React$Component);

  function InputFloatControl(props) {
    _classCallCheck(this, InputFloatControl);

    // let format = null;
    // if (props.cFormatData) {
    //   try {
    //     format = JSON.parse(props.cFormatData);
    //   } catch (e) {

    //   }
    // }
    // let numPoint = this.formatToDisplayStyle(this.props.numPoint, 0, 2);
    // let value = this.formatToDisplayStyle(this.props.value, numPoint, "");
    // this.state = {
    //   bIsNull: props.bIsNull,
    //   value: value,
    //   triggerValue: value,//触发给外部的数值
    //   min: this.props.min == undefined ? -999999999 : this.props.min,
    //   isIncludeMinValue: this.props.isIncludeMinValue == undefined ? true : this.props.isIncludeMinValue,
    //   max: this.props.max || 999999999,
    //   isIncludeMaxValue: this.props.isIncludeMaxValue == undefined ? true : this.props.isIncludeMaxValue,
    //   numPoint: numPoint,
    //   className: props.className || '',
    //   placeholder: props.placeholder || '',
    //   id: props.id || ''
    // };

    var _this = _possibleConstructorReturn(this, (InputFloatControl.__proto__ || Object.getPrototypeOf(InputFloatControl)).call(this, props));

    _this.state = _this.setStateByProps(_this.props, true);

    return _this;
  }

  _createClass(InputFloatControl, [{
    key: 'setStateByProps',
    value: function setStateByProps(props, bConstructor) {
      var numPoint = this.formatToDisplayStyle(props.numpoint, 0, 2);
      var value = this.formatToDisplayStyle(props.value, numPoint, "");
      var obj = {};
      obj = {
        bIsNull: props.bIsNull,
        value: value,
        triggerValue: value, //触发给外部的数值
        min: props.min == undefined ? -999999999 : props.min,
        isIncludeMinValue: props.isIncludeMinValue == undefined ? true : props.isIncludeMinValue,
        max: props.max || 999999999,
        isIncludeMaxValue: props.isIncludeMaxValue == undefined ? true : props.isIncludeMaxValue,
        numPoint: numPoint,
        className: props.className || '',
        placeholder: props.placeholder || '',
        id: props.id || ''
      };

      return obj;

      //   let value = this.state.value;
      // if (parseFloat(nextProps.value) != parseFloat(this.state.value))
      //   value = this.formatToDisplayStyle(nextProps.value, this.state.numPoint, "");
      // this.setState({ value: value, triggerValue: value });

    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // if (this.props.model)
      //   this.props.model.addListener(this);
      if (this.props.focus) {
        var input = cb.dom((0, _reactDom.findDOMNode)(this.refs.input)).find('input');
        input.length && input[0].focus();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var id = this.state.id;
      if (id == undefined || id == '') return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_antd.Input, {
          placeholder: this.state.placeholder,
          disabled: !!this.props.disabled,
          visible: !!this.props.visible,
          value: this.state.value,
          onChange: function onChange(e) {
            return _this2.valueChange(e);
          },
          onBlur: function onBlur(e) {
            return _this2.inputOnBlur(e);
          }
        })
      );else return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_antd.Input, {
          id: id,
          placeholder: this.state.placeholder,
          disabled: !!this.props.disabled,
          visible: !!this.props.visible,
          value: this.state.value,
          onChange: function onChange(e) {
            return _this2.valueChange(e);
          },
          onBlur: function onBlur(e) {
            return _this2.inputOnBlur(e);
          }
        })
      );
    }
  }, {
    key: 'formatToDisplayStyle',
    value: function formatToDisplayStyle(value, numPoint, defaultValue) {
      if (value == undefined) return defaultValue;
      if (isNaN(value)) return defaultValue;
      var str = value.toString();
      if (str.trim() === "") return defaultValue;
      if (numPoint > 0 && str.indexOf('.') < 0) return parseFloat(value).toFixed(numPoint);
      if (numPoint > 0) return parseFloat(value).toFixed(numPoint);
      if (str.indexOf('.') > -1 && numPoint == 0) return parseInt(value);
      return value;
    }
  }, {
    key: 'validateInputNumber',
    value: function validateInputNumber(value) {
      var numPoint = this.state.numPoint;
      //  var regu = /^[0-9]+\.?[0-9]*$/;
      var regu = /^\-?[0-9]+\.?[0-9]*$/;
      if (value == "-") return true;
      if (value != "") {
        if (!regu.test(value)) {
          return false;
        }
        if (isNaN(value)) {
          return false;
        }
        if (numPoint == 0) {
          if (value.indexOf('.') > -1) {
            return false;
          }
        }
        if (value.indexOf('.') > -1) {
          if (value.split('.')[1].length > numPoint) {
            return false;
          }
        }
        if (Number(value) > this.state.max || this.state.isIncludeMaxValue == false && Number(value) == this.state.max) {
          return false;
        }
        if (Number(value) < this.state.min || this.state.isIncludeMinValue == false && Number(value) == this.state.min) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'inputOnBlur',
    value: function inputOnBlur(e) {

      var value = this.formatToDisplayStyle(this.state.triggerValue, this.state.numPoint, "");
      this.setState({ value: value });
    }
  }, {
    key: 'isNotTriggerNum',
    value: function isNotTriggerNum(value) {
      if (value == "-") return true;
      if (value == "-0") return true;
      if (value == "-0.") return true;
      return false;
    }
  }, {
    key: 'valueChange',
    value: function valueChange(e) {
      var value = e.target.value;
      if (this.validateInputNumber(value) == true) {
        this.triggerOnChange(value);
        this.setState({ value: value });
      } else {
        this.setState();
      }
    }
  }, {
    key: 'triggerOnChange',
    value: function triggerOnChange(value) {
      if (this.props.onChange == undefined) return;
      if (this.isNotTriggerNum(value)) return;
      // if (value != "" && value != "-" && isNaN(parseFloat(value)))
      //   return;
      if (isNaN(parseFloat(value)) && isNaN(parseFloat(this.state.value))) return;
      if (parseFloat(value) == parseFloat(this.state.value)) return;
      this.props.onChange(value);
      this.setState({ triggerValue: value });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var obj = this.setStateByProps(nextProps, false);
      var value = this.state.value;
      if (parseFloat(nextProps.value) != parseFloat(this.state.value)) value = this.formatToDisplayStyle(nextProps.value, this.state.numPoint, "");
      obj = Object.assign(obj, { value: value, triggerValue: value });
      this.setState(obj);
    }
  }]);

  return InputFloatControl;
}(_react2.default.Component);

exports.default = InputFloatControl;