'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _select = require('../basic/select');

var _select2 = _interopRequireDefault(_select);

var _refer = require('../basic/refer');

var _refer2 = _interopRequireDefault(_refer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTableEditCell = function (_React$Component) {
  _inherits(TreeTableEditCell, _React$Component);

  function TreeTableEditCell(props) {
    _classCallCheck(this, TreeTableEditCell);

    var _this = _possibleConstructorReturn(this, (TreeTableEditCell.__proto__ || Object.getPrototypeOf(TreeTableEditCell)).call(this, props));

    _this.state = {
      model: null
    };
    return _this;
  }

  _createClass(TreeTableEditCell, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var col = this.props.column;
      var cControlType = col.cControlType && col.cControlType.trim().toLocaleLowerCase();
      var model = null;
      switch (cControlType) {
        case 'select':
        case 'radio':
          model = new cb.models.ListModel(col);
          break;
        case 'refer':
          model = new cb.models.ReferModel(cb.utils.extend(true, {}, { multiple: false }, col));
          break;
        default:
          model = new cb.models.SimpleModel(col);
          break;
      }
      this.setState({ model: model });
      model.on('blur', function () {
        var _props = _this2.props,
            bExpand = _props.bExpand,
            rowIndex = _props.rowIndex,
            column = _props.column;

        var cControlType = column.cControlType && column.cControlType.trim().toLocaleLowerCase();
        if (cControlType == 'refer') {
          _this2.props.onCellBlur(val, bExpand, rowIndex, column.cItemName, false);
          return;
        }
        var val = _this2.state.model.getValue();
        _this2.props.onCellBlur(val, bExpand, rowIndex, column.cItemName, true);
      });
      model.on('afterValueChange', function (val) {
        var _props2 = _this2.props,
            bExpand = _props2.bExpand,
            rowIndex = _props2.rowIndex,
            column = _props2.column;

        var cControlType = column.cControlType && column.cControlType.trim().toLocaleLowerCase();
        if (cControlType == 'refer') {
          var value = val.value;
          var data = {};
          var returnFields = _this2.state.model.getReturnFields();
          var valueField = _this2.state.model.get('valueField');
          data[column.cItemName] = cb.utils.isEmpty(value) ? null : value[valueField];
          for (var billKey in returnFields) {
            if (cb.utils.isEmpty(value)) data[billKey] = null;else data[billKey] = value[returnFields[billKey]];
          }
          _this2.props.onCellBlur(data, bExpand, rowIndex, column.cItemName, true);
        }
      });
      model.on('beforeBrowse', function (data) {
        var TreeModel = _this2.props.model;
        return TreeModel.execute('beforeBrowse', { rowData: _this2.props.row, context: _this2.state.model });
      });
    }
  }, {
    key: 'getComponents',
    value: function getComponents(col) {
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
          // case 'refer':
          // case 'treerefer':
          // case 'listrefer':
          components = _react2.default.createElement(_input2.default, { focus: true, model: model });
          break;
        case 'refer':
          components = _react2.default.createElement(_refer2.default, { focus: true, model: model });
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
        var value = this.props.row[col.cItemName];
        if (!cb.utils.isEmpty(value)) model.setValue(value);
      }
      return components;
    }
  }, {
    key: 'render',
    value: function render() {
      var components = this.getComponents(this.props.column);
      return _react2.default.createElement(
        'div',
        { className: 'tree-table-edit-cell' },
        components
      );
    }
  }]);

  return TreeTableEditCell;
}(_react2.default.Component);

exports.default = TreeTableEditCell;