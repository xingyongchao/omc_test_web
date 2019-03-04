'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basic = require('../basic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReportSelect = function (_Component) {
  _inherits(ReportSelect, _Component);

  function ReportSelect(props) {
    _classCallCheck(this, ReportSelect);

    var _this = _possibleConstructorReturn(this, (ReportSelect.__proto__ || Object.getPrototypeOf(ReportSelect)).call(this, props));

    var viewModel = props.viewModel;

    var _viewModel$getParams = viewModel.getParams(),
        billNo = _viewModel$getParams.billNo;

    var valueField = 'id';
    _this.groupSchemasMeta = {
      cControlType: 'Select',
      modelType: 'ListModel',
      cShowCaption: '分组方案',
      cItemName: 'groupSchemas',
      valueField: valueField,
      textField: 'name',
      dataSourceMode: 'remote',
      bNotModify: false,
      bIsNull: true,
      cAction: 'switchGroupSchema'
    };
    var key = _this.groupSchemasMeta.cItemName;
    viewModel.addProperty(key, new cb.models[_this.groupSchemasMeta.modelType](_this.groupSchemasMeta));
    viewModel.get(key).setDataSource({
      url: 'report/getGroupSchema',
      method: 'GET'
    }, { billnum: billNo });
    viewModel.get(key).on('afterSetDataSource', function (data) {
      var defaultValue = data.find(function (item) {
        return item.isDefault;
      });
      if (!defaultValue) return;
      this.setValue(defaultValue[valueField], true);
    });
    viewModel.get(key).on('afterValueChange', function (args) {
      viewModel.biz.do(_this.groupSchemasMeta.cAction, viewModel, args.value ? args.value[valueField] : null);
    });
    return _this;
  }

  _createClass(ReportSelect, [{
    key: 'render',
    value: function render() {
      var viewModel = this.props.viewModel;

      var model = viewModel.get(this.groupSchemasMeta.cItemName);
      return _react2.default.createElement(_basic.Select, _extends({ className: 'rpt-table-team-select', model: model }, this.groupSchemasMeta));
    }
  }]);

  return ReportSelect;
}(_react.Component);

exports.default = ReportSelect;