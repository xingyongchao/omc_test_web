'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatusBar = function (_Component) {
  _inherits(StatusBar, _Component);

  function StatusBar(props) {
    _classCallCheck(this, StatusBar);

    var _this = _possibleConstructorReturn(this, (StatusBar.__proto__ || Object.getPrototypeOf(StatusBar)).call(this, props));

    _this.state = {
      dataList: []
    };
    var proxy = cb.rest.DynamicProxy.create({
      getCusDigest: {
        url: 'cus/getCusDigest',
        method: 'POST',
        options: {
          token: true
        }
      }
    });
    proxy.getCusDigest({ cusid: _this.props.viewModel.getParams().id }, function (err, result) {
      if (err) {
        console.error(err.message);
        return;
      }
      this.setState({ dataList: result });
    }, _this);
    return _this;
  }

  _createClass(StatusBar, [{
    key: 'statusClick',
    value: function statusClick(e, type) {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var dataSource = this.state.dataList;
      if (!dataSource.length) return null;
      // [{ cShowCaption: '安装工单', unit: '个', count: '16', type: 'aa' },
      // { cShowCaption: '服务工单', unit: '个', count: '24', type: 'aa' },
      // { cShowCaption: '400客服', unit: '个', count: '0', type: 'aa' },
      // { cShowCaption: '服务商', unit: '个', count: '3', type: 'aa' },
      // { cShowCaption: '未付款工单', unit: '个', count: '6', type: 'aa' },
      // { cShowCaption: '需支付费用', unit: '元', count: '7654321', type: 'price' }
      // ];
      var controls = [];
      dataSource.forEach(function (item) {
        if (item.unit == '元') item.value = (item.value * 1).formatMoney(2, '');
        controls.push(_react2.default.createElement(
          'li',
          { key: item.title, onClick: function onClick(e) {
              return _this2.statusClick(e, item.title, item.status);
            } },
          _react2.default.createElement(
            'h1',
            null,
            item.title
          ),
          _react2.default.createElement(
            'h3',
            null,
            item.value,
            _react2.default.createElement(
              'em',
              null,
              item.unit
            )
          )
        ));
      });
      return _react2.default.createElement(
        'ul',
        { className: 'list' },
        controls
      );
    }
  }]);

  return StatusBar;
}(_react.Component);

exports.default = StatusBar;