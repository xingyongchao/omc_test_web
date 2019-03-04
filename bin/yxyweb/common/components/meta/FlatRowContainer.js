'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _text = require('../basic/text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlatRowContainer = function (_Component) {
  _inherits(FlatRowContainer, _Component);

  function FlatRowContainer(props) {
    _classCallCheck(this, FlatRowContainer);

    var _this = _possibleConstructorReturn(this, (FlatRowContainer.__proto__ || Object.getPrototypeOf(FlatRowContainer)).call(this, props));

    var meta = props.meta,
        viewModel = props.viewModel,
        cStyle = props.cStyle;
    var childrenField = meta.childrenField,
        cCode = meta.cCode;

    var controlModel = viewModel.get(childrenField || cCode);
    var config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }
    _this.state = Object.assign({
      controlModel: controlModel
    }, config);
    return _this;
  }

  _createClass(FlatRowContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.state.controlModel.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.state.controlModel.removeListener(this);
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(params) {
      this.setState(params);
    }
  }, {
    key: 'setDataSource',
    value: function setDataSource(rows) {
      this.setState({ rows: rows });
    }
  }, {
    key: 'setCellValue',
    value: function setCellValue(data) {
      var rowIndex = data.rowIndex,
          cellName = data.cellName,
          value = data.value;
      var rows = this.state.rows;

      rows[rowIndex][cellName] = value;
      this.setDataSource(rows);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(rowIndex, cellName, value) {
      var _value = value === 0 || !!value ? value : null;
      this.state.controlModel.setCellValue(rowIndex, cellName, _value, true);
    }
  }, {
    key: 'getPrecision',
    value: function getPrecision(iNumPoint, controlType) {
      switch (controlType) {
        case 'money':
          iNumPoint = cb.rest.AppContext.option ? cb.rest.AppContext.option.amountofdecimal : 0;
          break;
        case 'price':
          iNumPoint = cb.rest.AppContext.option ? cb.rest.AppContext.option.monovalentdecimal : 0;
          break;
      }
      return iNumPoint;
    }
  }, {
    key: 'renderRow',
    value: function renderRow(row, index) {
      var _this2 = this;

      var editRowModel = this.state.controlModel.getEditRowModel();
      var _state = this.state,
          columns = _state.columns,
          readOnly = _state.readOnly;

      var items = [];
      _.forEach(columns, function (value, key) {
        var controlType = value.cControlType && value.cControlType.trim().toLocaleLowerCase();
        var fieldName = value.cItemName,
            disabled = value.disabled,
            readonly = !value.bCanModify || readOnly;
        var item = null;
        switch (controlType) {
          case 'inputnumber':
          case 'money':
          case 'price':
            var precision = _this2.getPrecision(value.iNumPoint, controlType);
            var min = editRowModel.get(fieldName).getState('min');
            item = readonly ? (0, _text2.default)(row[fieldName]) : _react2.default.createElement(_antd.InputNumber, { value: row[fieldName], precision: precision, min: min, onChange: function onChange(value) {
                return _this2.handleChange(index, key, value);
              } });
            break;
          default:
            item = _react2.default.createElement(_antd.Input, { value: row[fieldName], className: 'member-list-disabled', disabled: disabled, onChange: function onChange(e) {
                return _this2.handleChange(index, key, e.target.value);
              } });
            if (!disabled && readonly) item = _react2.default.createElement(
              'span',
              { className: 'm-title' },
              row[fieldName]
            );
            break;
        }

        items.push(item);
      });
      return items;
    }
  }, {
    key: 'renderRows',
    value: function renderRows(rows) {
      var _this3 = this;

      var iCols = this.props.meta.iCols;

      var controlWidth = 100 / (iCols || 2);
      var className = 'width-percent-' + controlWidth.toFixed(0);
      return rows.map(function (row, index) {
        return _react2.default.createElement(
          'div',
          { className: className },
          _this3.renderRow(row, index)
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          rows = _state2.rows,
          classname = _state2.classname;

      if (!rows || !rows.length) return null;
      return _react2.default.createElement(
        'div',
        { className: 'member-list ' + (classname || '') },
        this.renderRows(rows)
      );
    }
  }]);

  return FlatRowContainer;
}(_react.Component);

exports.default = FlatRowContainer;