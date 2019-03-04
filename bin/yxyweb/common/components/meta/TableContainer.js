'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _env = require('../../helpers/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { Table } from '../basic';

var Table = null;

var TableContainer = function (_Component) {
  _inherits(TableContainer, _Component);

  function TableContainer(props) {
    _classCallCheck(this, TableContainer);

    var _this = _possibleConstructorReturn(this, (TableContainer.__proto__ || Object.getPrototypeOf(TableContainer)).call(this, props));

    Table = _env2.default.INTERACTIVE_MODE === 'touch' ? require('../grid-touch').default : require('../basic/table').default;
    var meta = props.meta,
        viewModel = props.viewModel;
    var controls = meta.controls,
        cGroupCode = meta.cGroupCode,
        containers = meta.containers,
        childrenField = meta.childrenField,
        cCode = meta.cCode;

    var actions = containers && containers.length ? containers[0] : null;
    if (actions && actions.controls) {
      actions.controls.forEach(function (item) {
        if (!item.cParameter) return;
        try {
          var config = JSON.parse(item.cParameter);
          config.model = viewModel.get(item.cItemName);
          Object.assign(item, config);
        } catch (e) {}
      });
    }
    var columns = {};
    if (controls) {
      var _viewModel$getParams = viewModel.getParams(),
          billNo = _viewModel$getParams.billNo;

      controls.forEach(function (column) {
        var cItemName = column.cItemName,
            cStyle = column.cStyle;

        column.index = billNo + '|' + cGroupCode + '|' + cItemName;
        columns[cItemName] = column;
        if (!cStyle || !actions || !actions.controls) return;
        try {
          var _JSON$parse = JSON.parse(cStyle),
              related = _JSON$parse.related;

          if (!related) return;
          var relatedActions = [];
          if (cb.utils.isArray(related)) {
            related.forEach(function (field) {
              var actionIndex = actions.controls.findIndex(function (item) {
                return item.cItemName === field;
              });
              if (actionIndex === -1) return;
              relatedActions.push(actions.controls[actionIndex]);
              actions.controls.splice(actionIndex, 1);
            });
          } else {
            var actionIndex = actions.controls.findIndex(function (item) {
              return item.cItemName === related;
            });
            if (actionIndex === -1) return;
            relatedActions.push(actions.controls[actionIndex]);
            actions.controls.splice(actionIndex, 1);
          }
          column.relatedActions = relatedActions;
        } catch (e) {}
      });
    }
    var controlModel = viewModel.get(childrenField || cCode);
    if (controlModel) {
      controlModel.setCache('actions', actions && actions.controls || []);
      controlModel.setCache('groupCode', cGroupCode);
    } else {
      cb.utils.alert('元数据配置有误', 'error');
    }
    _this.state = {
      listHeaderHeight: 0,
      controlModel: controlModel,
      columns: columns,
      actions: actions,
      height: props.height
    };
    return _this;
  }

  _createClass(TableContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.props.viewModel.on('listHeaderHeightUpdate', function (height) {
        _this2.setState({ height: _this2.props.height - height, listHeaderHeight: height });
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.height != nextProps.height) {
        this.setState({ height: nextProps.height - this.state.listHeaderHeight });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          meta = _props.meta,
          width = _props.width;

      var style = meta.cStyle ? JSON.parse(meta.cStyle) : {};
      var tableWidth = style.width || width;
      var _state = this.state,
          controlModel = _state.controlModel,
          columns = _state.columns,
          actions = _state.actions,
          height = _state.height,
          listHeaderHeight = _state.listHeaderHeight;

      return _react2.default.createElement(Table, {
        width: tableWidth,
        height: height,
        listHeaderHeight: listHeaderHeight,
        code: meta.cGroupCode,
        action: actions,
        columns: columns,
        style: style,
        model: controlModel });
    }
  }]);

  return TableContainer;
}(_react.Component);

exports.default = TableContainer;