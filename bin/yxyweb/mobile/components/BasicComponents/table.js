'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _paymode = require('../../../../common/redux/modules/billing/paymode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = _antdMobile.List.Item;

var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.setListenerState = function (params) {
      _this.setState(params);
    };

    _this.setDataSource = function (dataSource) {
      _this.setState({ dataSource: dataSource });
    };

    _this.getControl = function () {
      var _this$state = _this.state,
          columns = _this$state.columns,
          dataSource = _this$state.dataSource;

      var viewMeta = _this.props.viewMeta || [];
      var rows = [];
      dataSource.map(function (row, index) {
        var cols = [];
        for (var key in columns) {
          var iAlign = 1;
          viewMeta.map(function (view) {
            if (view.cItemName == key) iAlign = view.iAlign;
          });
          var className = "textAlignRight";
          if (iAlign == 1) className = "textAlignLeft";
          if (iAlign == 2) className = "textAlignCenter";
          var vals = row[key];
          if (columns[key].cControlType === 'money' && vals) {
            vals = (0, _paymode.getFixedNumber)(vals);
          }
          cols.push(_react2.default.createElement(
            _antdMobile.Flex.Item,
            { className: className },
            vals
          ));
        }
        rows.push(_react2.default.createElement(
          _antdMobile.Flex,
          null,
          cols
        ));
      });
      return _react2.default.createElement(
        'div',
        { className: 'flex-container' },
        rows
      );
    };

    _this.state = {
      columns: {},
      dataSource: []
    };
    return _this;
  }

  _createClass(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getControl();
      return _react2.default.createElement(
        _antdMobile.List,
        { className: 'payTable' },
        _react2.default.createElement(
          Item,
          { extra: control },
          this.props.title
        )
      );
    }
  }]);

  return Table;
}(_react2.default.Component);

exports.default = Table;