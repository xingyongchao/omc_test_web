'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeTable = function (_Component) {
  _inherits(TreeTable, _Component);

  function TreeTable(props) {
    _classCallCheck(this, TreeTable);

    var _this = _possibleConstructorReturn(this, (TreeTable.__proto__ || Object.getPrototypeOf(TreeTable)).call(this, props));

    _this.onRowClick = function (record, index) {
      var rowKey = _this.state.rowKey;

      if (_this.props.model) _this.props.model.select(record[rowKey]);
    };

    _this.state = {};
    return _this;
  }

  _createClass(TreeTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.model.addListener(this);
    }
  }, {
    key: 'renderSelect',
    value: function renderSelect(column, text) {
      var keyMap = column.keyMap,
          textField = column.textField;

      if (!keyMap || !textField) return text;
      return keyMap[text] && keyMap[text][textField];
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(data) {
      var _this2 = this;

      if (!data.columns) return;
      var columns = [];
      _lodash2.default.forEach(data.columns, function (column, key) {
        var column1 = {
          title: column.cShowCaption,
          dataIndex: key,
          key: key,
          width: column.iColWidth || 150
        };
        var ctrlType = column.cControlType && column.cControlType.trim().toLocaleLowerCase();
        if (ctrlType === 'select') column1.render = function (text) {
          return _this2.renderSelect(column, text);
        };
        columns.push(column1);
      });
      this.setState({ columns: columns, rowKey: data.keyField });
    }
  }, {
    key: 'setDataSource',
    value: function setDataSource(dataSource) {
      this.setState({ dataSource: dataSource });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          columns = _state.columns,
          rowKey = _state.rowKey,
          dataSource = _state.dataSource;

      if (!columns || !columns.length) return null;
      return _react2.default.createElement(_antd.Table, { columns: columns, rowKey: rowKey, dataSource: dataSource, onRowClick: this.onRowClick });
    }
  }]);

  return TreeTable;
}(_react.Component);

exports.default = TreeTable;


getExpendContrast = function getExpendContrast(data, rowKey, contrast) {
  data.map(function (item) {
    var key = item[rowKey];
    contrast[key] = { "isExpend": false, "level": item.level, "parent": item.parent, "key": key };
    undefined.keyMap[key] = contrast[key];
    if (item.children) contrast[key].children = undefined.getExpendContrast(item.children, rowKey, {});
  });
  return contrast;
};