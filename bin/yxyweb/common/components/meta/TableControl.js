'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _env = require('../../helpers/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Table from '../grid-touch';


var Table = null;

var TableControl = function (_Component) {
  _inherits(TableControl, _Component);

  function TableControl(props) {
    _classCallCheck(this, TableControl);

    var _this = _possibleConstructorReturn(this, (TableControl.__proto__ || Object.getPrototypeOf(TableControl)).call(this, props));

    Table = _env2.default.INTERACTIVE_MODE === 'touch' ? require('../grid-touch').default : require('../basic/table').default;
    var meta = props.meta,
        viewModel = props.viewModel;

    var columns = {};
    if (meta.controls) {
      var _viewModel$getParams = viewModel.getParams(),
          billNo = _viewModel$getParams.billNo;

      meta.controls.forEach(function (column) {
        column.index = billNo + '|' + meta.cGroupCode + '|' + column.cItemName;
        columns[column.cItemName] = column;
      });
    }
    _this.__isElectronic = window.__isElectronic;
    var controlModel = viewModel.get(meta.childrenField);
    _this.state = {
      icon: meta.cImage,
      caption: meta.cName,
      model: controlModel,
      columns: columns
    };
    return _this;
  }

  _createClass(TableControl, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          icon = _state.icon,
          caption = _state.caption,
          model = _state.model,
          columns = _state.columns;

      var width = this.props.width - 2;
      var iconControl = _react2.default.createElement(_SvgIcon2.default, { type: icon });
      var rowHeight = 45;
      if (this.__isElectronic) rowHeight = 30;
      return _react2.default.createElement(
        _antd.Row,
        null,
        _react2.default.createElement(
          _antd.Row,
          { className: 'caption-title' },
          iconControl,
          _react2.default.createElement(
            'h3',
            null,
            caption
          )
        ),
        _react2.default.createElement(Table, { width: width, model: model, columns: columns, footerHeight: 50, rowHeight: rowHeight, widthMode: 'percent', emptyIcon: 'huanxingtu' })
      );
    }
  }]);

  return TableControl;
}(_react.Component);

exports.default = TableControl;