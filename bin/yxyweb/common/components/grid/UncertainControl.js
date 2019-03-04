'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('../basic/input');

var _input2 = _interopRequireDefault(_input);

var _inputnumber = require('../basic/inputnumber');

var _inputnumber2 = _interopRequireDefault(_inputnumber);

var _datepicker = require('../basic/datepicker');

var _datepicker2 = _interopRequireDefault(_datepicker);

var _timepicker = require('../basic/timepicker');

var _timepicker2 = _interopRequireDefault(_timepicker);

var _checkboxenum = require('../basic/checkboxenum');

var _checkboxenum2 = _interopRequireDefault(_checkboxenum);

var _select = require('../basic/select');

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UncertainControl = function (_React$Component) {
  _inherits(UncertainControl, _React$Component);

  function UncertainControl(props) {
    _classCallCheck(this, UncertainControl);

    var _this = _possibleConstructorReturn(this, (UncertainControl.__proto__ || Object.getPrototypeOf(UncertainControl)).call(this, props));

    _this.state = {
      model: null
    };
    return _this;
  }

  _createClass(UncertainControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var col = this.props.cellConfig;
      if (!col) col = { 'cControlType': 'Input' };
      var cControlType = col.cControlType && col.cControlType.trim().toLocaleLowerCase();
      var model = null;
      switch (cControlType) {
        case 'select':
        case 'radio':
        case 'checkboxenum':
          model = new cb.models.ListModel(col);
          break;
        default:
          model = new cb.models.SimpleModel(col);
          break;
      }
      this.setState({ model: model });
      model.on('blur', function () {
        var val = _this2.state.model.getValue();
        var _props$RowProperty = _this2.props.RowProperty,
            rowIndex = _props$RowProperty.rowIndex,
            columnKey = _props$RowProperty.columnKey;

        _this2.props.model.setCellValue(rowIndex, columnKey, val || '', true, true);
      });
      model.on('afterValueChange', function (val) {
        if (val.value != null && _typeof(val.value) == 'object') {
          var _props$RowProperty2 = _this2.props.RowProperty,
              rowIndex = _props$RowProperty2.rowIndex,
              columnKey = _props$RowProperty2.columnKey;

          var newValue = val.value;
          if (!cb.utils.isArray(newValue)) {
            newValue = newValue.value;
          } else {
            var temp = '';
            newValue.map(function (newVal) {
              if (temp == '') temp = newVal.value;else temp = temp + ',' + newVal.value;
            });
            newValue = temp;
          }
          _this2.props.model.setCellValue(rowIndex, columnKey, newValue || '', true, true);
        }
      });
    }
  }, {
    key: 'getComponents',
    value: function getComponents(col) {
      if (!col) col = { 'cControlType': 'Input' };
      var components = null;
      var NumPoint = 1;
      /*转换iNumPoint为inputNumber控件识别的小数位*/
      if (col.iNumPoint && col.iNumPoint > 1) {
        NumPoint = 0.1;
        NumPoint = Math.pow(NumPoint, col.iNumPoint).toFixed(col.iNumPoint);
      }
      var controlType = col.cControlType && col.cControlType.trim().toLocaleLowerCase();
      var model = this.state.model;
      switch (controlType) {
        case 'input':
        case 'refer':
        case 'treerefer':
        case 'listrefer':
          components = _react2.default.createElement(_input2.default, { focus: true, model: model });
          break;
        case 'inputnumber':
        case 'money':
        case 'price':
          if (controlType === 'money') NumPoint = cb.rest.AppContext.option.amountofdecimal;else if (controlType === 'price') NumPoint = cb.rest.AppContext.option.monovalentdecimal;
          components = _react2.default.createElement(_inputnumber2.default, { className: 'edit-input-number', focus: true, model: model, iNumPoint: col.iNumPoint, cFormatData: col.cFormatData });
          break;
        case 'datepicker':
          components = _react2.default.createElement(_datepicker2.default, { model: model, className: 'edit-input-number', cFormatData: col.cFormatData });
          break;
        case 'timepicker':
          components = _react2.default.createElement(_timepicker2.default, { model: model, className: 'edit-input-number' });
          break;
        case 'select':
        case 'radio':
          components = _react2.default.createElement(_select2.default, { focus: true, model: model, className: 'edit-input-number' });
          break;
        case 'checkboxenum':
          components = _react2.default.createElement(_select2.default, { focus: true, model: model });
          break;
        default:
          components = _react2.default.createElement(_input2.default, { focus: true, model: model });
          break;
      }
      if (model) {
        var data = this.props.dataList;
        var _props$RowProperty3 = this.props.RowProperty,
            rowIndex = _props$RowProperty3.rowIndex,
            columnKey = _props$RowProperty3.columnKey;

        var value = data[rowIndex][columnKey];
        if (!cb.utils.isEmpty(value)) model.setValue(value);
      }
      return components;
    }
  }, {
    key: 'render',
    value: function render() {
      var components = this.getComponents(this.props.cellConfig);
      return components;
    }
  }]);

  return UncertainControl;
}(_react2.default.Component);

exports.default = UncertainControl;