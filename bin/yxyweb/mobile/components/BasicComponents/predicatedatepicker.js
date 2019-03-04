'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _SvgIcon = require('../../../common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = _antdMobile.Popover.Item;

var PredicateDatePicker = function (_Component) {
  _inherits(PredicateDatePicker, _Component);

  function PredicateDatePicker(props) {
    _classCallCheck(this, PredicateDatePicker);

    var _this = _possibleConstructorReturn(this, (PredicateDatePicker.__proto__ || Object.getPrototypeOf(PredicateDatePicker)).call(this, props));

    _this.handleVisibleChange = function (visible) {
      _this.setState({ visible: visible });
    };

    _this.onConfirm = function (startTime, endTime) {
      var format = 'yyyy-MM-dd';
      var _this$state = _this.state,
          startSuffix = _this$state.startSuffix,
          endSuffix = _this$state.endSuffix;

      var value1 = startTime.format(format) + startSuffix;
      var value2 = endTime.format(format) + endSuffix;
      _this.setModelValue(value1, value2);
      _this.setState({ calendarVisible: false });
    };

    _this.onCancel = function () {
      _this.setState({ calendarVisible: false });
    };

    _this.state = {
      predicateValue: null,
      startValue: null,
      endValue: null,
      visible: false,
      calendarVisible: false,
      format: 'YYYY-MM-DD',
      startSuffix: ' 00:00:00',
      endSuffix: ' 23:59:59'
    };
    return _this;
  }

  _createClass(PredicateDatePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(params) {
      var valueField = params.valueField,
          textField = params.textField,
          value = params.value,
          dataSource = params.dataSource,
          defaultValue = params.defaultValue;

      this.valueField = valueField;
      this.textField = textField;
      delete params.valueField;
      delete params.textField;
      delete params.value;
      this.setState(params);
      if (defaultValue === false) {
        this.setValue(value && value[valueField] || value);
      } else {
        this.setValue(cb.utils.isEmpty(value) ? dataSource && dataSource.length && dataSource[0][valueField] : value[valueField] || value);
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (cb.utils.isEmpty(value)) {
        this.setState({ predicateValue: null, startValue: null, endValue: null });
      } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        var value1 = value.value1,
            value2 = value.value2,
            predicateValue = value.predicateValue;

        var startValue = value1 && (0, _moment2.default)(value1) || null,
            endValue = value2 && (0, _moment2.default)(value2) || null;
        this.setState({ predicateValue: predicateValue, startValue: startValue, endValue: endValue });
      } else {
        this.onPredicateChange(value);
      }
    }
  }, {
    key: 'onPredicateChange',
    value: function onPredicateChange(predicateValue) {
      var _state = this.state,
          format = _state.format,
          startSuffix = _state.startSuffix,
          endSuffix = _state.endSuffix;

      this.state.visible = false;
      switch (predicateValue) {
        case '0':
          var today = (0, _moment2.default)().format(format);
          this.setModelValue(today + startSuffix, today + endSuffix, predicateValue);
          break;
        case '-1':
          var yesterday = (0, _moment2.default)().subtract(1, 'days').format(format);
          this.setModelValue(yesterday + startSuffix, yesterday + endSuffix, predicateValue);
          break;
        case '-7':
          this.setModelValue((0, _moment2.default)().subtract(6, 'day').format(format) + startSuffix, (0, _moment2.default)().format(format) + endSuffix, predicateValue);
          break;
        case '-30':
          this.setModelValue((0, _moment2.default)().subtract(29, 'day').format(format) + startSuffix, (0, _moment2.default)().format(format) + endSuffix, predicateValue);
          break;
        case 'custom':
          this.setState({ visible: false, calendarVisible: true });
          break;
      }
    }
  }, {
    key: 'setModelValue',
    value: function setModelValue(value1, value2, predicateValue) {
      this.props.model.setValue({ value1: value1, value2: value2, predicateValue: predicateValue }, true);
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _this2 = this;

      var _state2 = this.state,
          dataSource = _state2.dataSource,
          predicateValue = _state2.predicateValue,
          startValue = _state2.startValue,
          endValue = _state2.endValue,
          visible = _state2.visible,
          calendarVisible = _state2.calendarVisible,
          format = _state2.format;

      if (!dataSource || !dataSource.length) return null;
      var valueField = this.valueField,
          textField = this.textField;
      var options = [];
      var customText = (startValue && startValue.format(format)) + ' ~ ' + (endValue && endValue.format(format));
      var predicateText = null;
      dataSource.forEach(function (item) {
        if (item[valueField] === predicateValue) predicateText = item[textField];
        options.push(_react2.default.createElement(
          Item,
          { value: item[valueField] },
          _react2.default.createElement(
            'div',
            null,
            item[textField],
            predicateText == item[textField] ? _react2.default.createElement(_SvgIcon2.default, { type: 'xuanzhong1' }) : _react2.default.createElement('div', null)
          )
        ));
      });
      options.push(_react2.default.createElement(
        Item,
        { value: 'custom' },
        _react2.default.createElement(
          'div',
          null,
          '' + (!predicateText && customText || '自定义时间'),
          !predicateText ? _react2.default.createElement(_SvgIcon2.default, { type: 'xuanzhong1' }) : _react2.default.createElement('div', null)
        )
      ));
      if (!predicateText) predicateText = customText;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antdMobile.Popover,
          {
            getTooltipContainer: function getTooltipContainer() {
              return document.getElementById('popup-container') || document.body;
            },
            visible: visible,
            overlay: options,
            mask: true,
            onSelect: function onSelect(e) {
              return _this2.onPredicateChange(e.props.value);
            },
            onVisibleChange: this.handleVisibleChange,
            overlayClassName: 'PredicateDatePicker_Popover' },
          _react2.default.createElement(
            'div',
            { className: 'PredicateDatePicker_TextAndIcon' },
            _react2.default.createElement(
              'div',
              { className: 'PredicateDatePicker_Text' },
              predicateText
            ),
            _react2.default.createElement('i', { className: visible === true ? "icon icon-shouqi" : "icon icon-zhakai" })
          )
        ),
        _react2.default.createElement(_antdMobile.Calendar, { visible: calendarVisible, type: 'range', onConfirm: this.onConfirm, onCancel: this.onCancel })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return this.baseControl();
    }
  }]);

  return PredicateDatePicker;
}(_react.Component);

exports.default = PredicateDatePicker;