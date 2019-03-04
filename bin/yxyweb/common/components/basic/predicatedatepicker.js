'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _col = require('./col');

var _col2 = _interopRequireDefault(_col);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioButton = _antd.Radio.Button;
var RadioGroup = _antd.Radio.Group;

var PredicateDatePicker = function (_Component) {
  _inherits(PredicateDatePicker, _Component);

  function PredicateDatePicker(props) {
    _classCallCheck(this, PredicateDatePicker);

    var _this = _possibleConstructorReturn(this, (PredicateDatePicker.__proto__ || Object.getPrototypeOf(PredicateDatePicker)).call(this, props));

    _this.disabledStartDate = function (startValue) {
      var _this$state = _this.state,
          endValue = _this$state.endValue,
          format = _this$state.format,
          endSuffix = _this$state.endSuffix;

      if (!startValue || !endValue) return false;
      var endDate = (0, _moment2.default)(endValue.format(format) + endSuffix, format + ' HH:mm:ss');
      return startValue.valueOf() > endDate.valueOf();
    };

    _this.disabledEndDate = function (endValue) {
      var _this$state2 = _this.state,
          startValue = _this$state2.startValue,
          format = _this$state2.format,
          startSuffix = _this$state2.startSuffix;

      if (!endValue || !startValue) return false;
      var startDate = (0, _moment2.default)(startValue.format(format) + startSuffix, format + ' HH:mm:ss');
      return endValue.valueOf() < startDate.valueOf();
    };

    _this.onStartChange = function (value) {
      var _this$state3 = _this.state,
          format = _this$state3.format,
          startSuffix = _this$state3.startSuffix,
          endSuffix = _this$state3.endSuffix,
          endValue = _this$state3.endValue;

      var value1 = value && value.format(format) + startSuffix || null;
      var value2 = endValue && endValue.format(format) + endSuffix || null;
      _this.setModelValue(value1, null);
    };

    _this.onEndChange = function (value) {
      var _this$state4 = _this.state,
          startValue = _this$state4.startValue,
          format = _this$state4.format,
          startSuffix = _this$state4.startSuffix,
          endSuffix = _this$state4.endSuffix;

      var value1 = startValue && startValue.format(format) + startSuffix || null;
      var value2 = value && value.format(format) + endSuffix || null;
      var predicateValue = _this.fitPredicateValue(startValue, value);
      _this.setModelValue(value1, value2, predicateValue);
    };

    _this.handleStartOpenChange = function (open) {
      var endValue = _this.state.endValue;

      if (!open) _this.setState({ endOpen: true });
    };

    _this.handleEndOpenChange = function (open) {
      _this.setState({ endOpen: open });
    };

    var cStyle = props.cStyle;

    var config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }
    _this.state = Object.assign({
      predicateValue: null,
      startValue: null,
      endValue: null,
      endOpen: false,
      format: 'YYYY-MM-DD',
      startSuffix: ' 00:00:00',
      endSuffix: ' 23:59:59'
    }, config);
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
        // const predicateValue = this.fitPredicateValue(startValue, endValue);
        if (startValue && endValue && cb.utils.isEmpty(predicateValue)) predicateValue = this.fitPredicateValue(startValue, endValue);
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
        case '7':
          {
            var daystoNextMonday = 7 - ((0, _moment2.default)().isoWeekday() - 1);
            var nextWeekStart = (0, _moment2.default)().add('days', daystoNextMonday);
            var nextWeekEnd = (0, _moment2.default)().add('days', daystoNextMonday + 6);
            this.setModelValue(nextWeekStart.format(format) + startSuffix, nextWeekEnd.format(format) + endSuffix, predicateValue);
            break;
          }
        case '30':
          {
            var nextMonthStart = (0, _moment2.default)().add('month', 1).format('YYYY-MM') + '-01';
            var nextMonthEnd = (0, _moment2.default)(nextMonthStart).add('month', 1).add('days', -1).format(format);
            this.setModelValue(nextMonthStart + startSuffix, nextMonthEnd + endSuffix, predicateValue);
            break;
          }
        case '90':
          {
            var nowquarter = (0, _moment2.default)().quarter();
            var nowyear = (0, _moment2.default)().year();
            var nextQuarterStart = void 0;
            var nextQuarterEnd = void 0;
            switch (nowquarter) {
              case 1:
                nextQuarterStart = nowyear + '-04-01';
                nextQuarterEnd = nowyear + '-06-30';
                break;
              case 2:
                nextQuarterStart = nowyear + '-07-01';
                nextQuarterEnd = nowyear + '-09-30';
                break;
              case 3:
                nextQuarterStart = nowyear + '-10-01';
                nextQuarterEnd = nowyear + '-12-31';
                break;
              default:
                nextQuarterStart = nowyear + 1 + '-01-01';
                nextQuarterEnd = nowyear + 1 + '-03-31';
            }
            this.setModelValue(nextQuarterStart + startSuffix, nextQuarterEnd + endSuffix, predicateValue);
            break;
          }
        case '365':
          {
            var nextYearStart = (0, _moment2.default)().add('year', 1).format('YYYY') + '-01-01';
            var nextYearEnd = (0, _moment2.default)(nextYearStart).add('year', 1).add('days', -1).format(format);
            this.setModelValue(nextYearStart + startSuffix, nextYearEnd + endSuffix, predicateValue);
            break;
          }
      }
    }
  }, {
    key: 'setModelValue',
    value: function setModelValue(value1, value2, predicateValue) {
      this.props.model.setValue({ value1: value1, value2: value2, predicateValue: predicateValue }, true);
    }
  }, {
    key: 'fitPredicateValue',
    value: function fitPredicateValue(startValue, endValue) {
      var format = this.state.format;

      var startString = startValue && startValue.format(format);
      var endString = endValue && endValue.format(format);
      if (!startString || !endString) return;
      var today = (0, _moment2.default)().format(format);
      if (startString === today && endString === today) return '0';
      var yesterday = (0, _moment2.default)().subtract(1, 'days').format(format);
      if (startString === yesterday && endString === yesterday) return '-1';
      if (startString === (0, _moment2.default)().subtract(6, 'day').format(format) && endString === today) return '-7';
      if (startString === (0, _moment2.default)().subtract(29, 'days').format(format) && endString === today) return '-30';
      // 下周
      var daystoNextMonday = 7 - ((0, _moment2.default)().isoWeekday() - 1);
      var nextWeekStart = (0, _moment2.default)().add('days', daystoNextMonday).format(format);
      var nextWeekEnd = (0, _moment2.default)().add('days', daystoNextMonday + 6).format(format);
      if (startString === nextWeekStart && endString === nextWeekEnd) return '7';
      // 下月
      var nextMonthStart = (0, _moment2.default)().add('month', 1).format('YYYY-MM') + '-01';
      var nextMonthEnd = (0, _moment2.default)(nextMonthStart).add('month', 1).add('days', -1).format(format);
      if (startString === nextMonthStart && endString === nextMonthEnd) return '30';
      // 下季度
      var nowquarter = (0, _moment2.default)().quarter();
      var nowyear = (0, _moment2.default)().year();
      var nextQuarterStart = void 0;
      var nextQuarterEnd = void 0;
      switch (nowquarter) {
        case 1:
          nextQuarterStart = nowyear + '-04-01';
          nextQuarterEnd = nowyear + '-06-30';
          break;
        case 2:
          nextQuarterStart = nowyear + '-07-01';
          nextQuarterEnd = nowyear + '-09-30';
          break;
        case 3:
          nextQuarterStart = nowyear + '-10-01';
          nextQuarterEnd = nowyear + '-12-31';
          break;
        default:
          nextQuarterStart = nowyear + 1 + '-01-01';
          nextQuarterEnd = nowyear + 1 + '-03-31';
      }
      if (startString === nextQuarterStart && endString === nextQuarterEnd) return '90';
      // 下年
      var nextYearStart = (0, _moment2.default)().add('year', 1).format('YYYY') + '-01-01';
      var nextYearEnd = (0, _moment2.default)(nextYearStart).add('year', 1).add('days', -1).format(format);
      if (startString === nextYearStart && endString === nextYearEnd) return '365';
      return null;
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _this2 = this;

      var dataSource = this.state.dataSource;

      if (!dataSource || !dataSource.length) return null;
      var valueField = this.valueField,
          textField = this.textField;
      var options = [];
      dataSource.forEach(function (item) {
        options.push(_react2.default.createElement(
          RadioButton,
          { value: item[valueField] },
          item[textField]
        ));
      });
      var _state2 = this.state,
          predicateValue = _state2.predicateValue,
          startValue = _state2.startValue,
          endValue = _state2.endValue,
          endOpen = _state2.endOpen;

      var isInPanel = this.props.isInPanel ? this.props.isInPanel : false;
      var panelType = this.props.panelType || 0;
      return _react2.default.createElement(
        _row2.default,
        { className: 'm-b-10' },
        _react2.default.createElement(
          'div',
          { style: { float: 'left' }, className: 'm-r-10' },
          _react2.default.createElement(
            RadioGroup,
            { value: predicateValue, onChange: function onChange(e) {
                return _this2.onPredicateChange(e.target.value);
              } },
            options
          )
        ),
        isInPanel == false ? _react2.default.createElement(
          'div',
          { style: { float: 'left' }, className: 'query-scheme-date' },
          _react2.default.createElement(
            _row2.default,
            { colCount: 3 },
            _react2.default.createElement(
              _col2.default,
              { span: 1, className: 'm-r-10' },
              _react2.default.createElement(_antd.DatePicker, {
                disabledDate: this.disabledStartDate,
                value: startValue,
                onChange: this.onStartChange,
                onOpenChange: this.handleStartOpenChange
              })
            ),
            _react2.default.createElement(
              'div',
              { style: { float: 'left' }, className: "m-r-10" + (panelType == 3 ? " basic-predicate-to " : "") },
              '\u81F3'
            ),
            _react2.default.createElement(
              _col2.default,
              { span: 1 },
              _react2.default.createElement(_antd.DatePicker, {
                disabledDate: this.disabledEndDate,
                value: endValue,
                onChange: this.onEndChange,
                open: endOpen,
                onOpenChange: this.handleEndOpenChange
              })
            )
          )
        ) : ""
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var cShowCaption = this.props.cShowCaption;

      var control = this.baseControl();
      var isInPanel = this.props.isInPanel ? this.props.isInPanel : false;
      return _react2.default.createElement(
        'div',
        { className: 'basic-predicate-data-picker ' + (this.state.classname || '') },
        cShowCaption && isInPanel == false ? _react2.default.createElement(_label2.default, { isInFilterJSX: true, control: control, title: cShowCaption }) : control
      );
    }
  }]);

  return PredicateDatePicker;
}(_react.Component);

exports.default = PredicateDatePicker;