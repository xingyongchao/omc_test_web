'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../../basic');

var _rangepicker = require('../../basic/rangepicker');

var _rangepicker2 = _interopRequireDefault(_rangepicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _antd.Select.Option;

var FilterControl = function (_React$Component) {
  _inherits(FilterControl, _React$Component);

  function FilterControl(props) {
    _classCallCheck(this, FilterControl);

    var _this = _possibleConstructorReturn(this, (FilterControl.__proto__ || Object.getPrototypeOf(FilterControl)).call(this, props));

    _this.state = {
      compareLogic: 'eq',
      selectedField: '',
      defaultValue: _this.props.selectedValue
    };
    return _this;
  }

  _createClass(FilterControl, [{
    key: 'getFieldControl',
    value: function getFieldControl() {
      var self = this;
      var selectedField = this.props.dataSource.length && this.props.dataSource.filter(function (item) {
        return item.itemName == self.props.selectedValue;
      })[0];

      var ctrlType = selectedField.ctrlType.trim().toLocaleLowerCase();
      var compareLogic = this.props.compareLogic || this.state.compareLogic;
      var fromModel = this.props.model && this.props.model.getFromModel();
      var toModel = this.props.model && this.props.model.getToModel();

      var control = void 0;
      switch (ctrlType) {
        case 'input':
          if (compareLogic == 'between') {
            control = _react2.default.createElement(
              _basic.Row,
              null,
              _react2.default.createElement(
                _basic.Col,
                { span: 11 },
                _react2.default.createElement(_basic.Input, { model: fromModel })
              ),
              _react2.default.createElement(
                _basic.Col,
                { span: 2, className: 'sp-range-txt' },
                _react2.default.createElement(
                  'span',
                  null,
                  '\u81F3'
                )
              ),
              _react2.default.createElement(
                _basic.Col,
                { span: 11 },
                _react2.default.createElement(_basic.Input, { model: toModel })
              )
            );
          } else control = _react2.default.createElement(_basic.Input, { model: fromModel });
          break;
        case 'inputnumber':
          if (compareLogic == 'between') {
            control = _react2.default.createElement(
              _basic.Row,
              null,
              _react2.default.createElement(
                _basic.Col,
                { span: 11 },
                _react2.default.createElement(_basic.InputNumber, { model: fromModel })
              ),
              _react2.default.createElement(
                _basic.Col,
                { span: 2, className: 'sp-range-txt' },
                _react2.default.createElement(
                  'span',
                  null,
                  '\u81F3'
                )
              ),
              _react2.default.createElement(
                _basic.Col,
                { span: 11 },
                _react2.default.createElement(_basic.InputNumber, { model: toModel })
              )
            );
          } else control = _react2.default.createElement(_basic.InputNumber, { model: fromModel });
          break;
        case 'refer':
          if (compareLogic == 'between') {
            control = _react2.default.createElement(
              _basic.Row,
              null,
              _react2.default.createElement(
                _basic.Col,
                { span: 11 },
                _react2.default.createElement(_basic.Refer, { model: fromModel })
              ),
              _react2.default.createElement(
                _basic.Col,
                { span: 2, className: 'sp-range-txt' },
                _react2.default.createElement(
                  'span',
                  null,
                  '\u81F3'
                )
              ),
              _react2.default.createElement(
                _basic.Col,
                { span: 11 },
                _react2.default.createElement(_basic.Refer, { model: toModel })
              )
            );
          } else control = _react2.default.createElement(_basic.Refer, { model: fromModel });
          break;
        case 'datepicker':
          if (compareLogic == 'between') {
            control = _react2.default.createElement(
              _basic.Row,
              null,
              _react2.default.createElement(
                _basic.Col,
                { span: 11 },
                _react2.default.createElement(_basic.DatePicker, { model: fromModel })
              ),
              _react2.default.createElement(
                _basic.Col,
                { span: 2, className: 'sp-range-txt' },
                _react2.default.createElement(
                  'span',
                  null,
                  '\u81F3'
                )
              ),
              _react2.default.createElement(
                _basic.Col,
                { span: 11 },
                _react2.default.createElement(_basic.DatePicker, { model: toModel })
              )
            );
          } else control = _react2.default.createElement(_basic.DatePicker, { model: fromModel });
          break;
      }
      return _react2.default.createElement(
        'div',
        null,
        control
      );
    }
  }, {
    key: 'handleChange',
    value: function handleChange(value) {
      var selectedField = this.props.dataSource.filter(function (item) {
        return item.itemName == value;
      })[0];

      if (this.props.onChange) this.props.onChange(this.state.defaultValue, selectedField);

      if (selectedField) this.setState({ selectedField: selectedField, defaultValue: selectedField.itemName });
    }
  }, {
    key: 'getSelect',
    value: function getSelect() {
      var _this2 = this;

      var options = new Array();
      this.props.dataSource && this.props.dataSource.length && this.props.dataSource.forEach(function (item) {
        options.push(_react2.default.createElement(
          Option,
          { value: item.itemName },
          item.cShowCaption
        ));
      });
      return _react2.default.createElement(
        _antd.Select,
        { showSearch: true, style: { width: 95 }, optionFilterProp: 'children', value: this.props.selectedValue,
          notFoundContent: '\u65E0\u6CD5\u627E\u5230', onChange: function onChange(e) {
            return _this2.handleChange(e);
          } },
        options
      );
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var selectControl = this.getSelect();
      var inputControl = this.getFieldControl();

      var control = _react2.default.createElement(
        _basic.Row,
        null,
        _react2.default.createElement(
          _basic.Col,
          { span: 6 },
          selectControl
        ),
        _react2.default.createElement(
          _basic.Col,
          { span: 18 },
          inputControl
        )
      );

      return control;
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getControl();
      return _react2.default.createElement(
        'div',
        null,
        control
      );
    }
  }]);

  return FilterControl;
}(_react2.default.Component);

exports.default = FilterControl;
;