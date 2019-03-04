'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _PortalTabItem = require('./PortalTabItem');

var _PortalTabItem2 = _interopRequireDefault(_PortalTabItem);

var _DynamicModal = require('./DynamicModal');

var _DynamicModal2 = _interopRequireDefault(_DynamicModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DynamicView = function (_Component) {
  _inherits(DynamicView, _Component);

  function DynamicView(props) {
    _classCallCheck(this, DynamicView);

    var _this = _possibleConstructorReturn(this, (DynamicView.__proto__ || Object.getPrototypeOf(DynamicView)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(DynamicView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.loadingCount = 0;
      cb.utils.loadingControl = {
        start: function start() {
          cb.utils.loading(true);
          _this2.loadingCount++;
          if (_this2.loadingCount === 1) _this2.setState({ loading: true });
        },
        end: function end() {
          cb.utils.loading(false);
          if (_this2.loadingCount > 0) _this2.loadingCount--;
          if (_this2.loadingCount === 0) _this2.setState({ loading: false });
        }
      };
      var _props = this.props,
          match = _props.match,
          params = _props.params;

      var _ref = match && match.params || params,
          menuurl = _ref.menuurl,
          billtype = _ref.billtype,
          billno = _ref.billno,
          billid = _ref.billid;

      if (menuurl) {
        this.setState({ content: { type: 'platform', url: menuurl } });
        return;
      }
      var data = { billtype: billtype, billno: billno };
      if (billid) data.params = billid === 'add' ? { mode: 'add' } : { mode: 'edit', id: billid };else data.params = { query: cb.rest.AppContext.query };
      cb.loader.runCommandLine('bill', data, null, function (vm, viewmeta) {
        var content = { vm: vm, metaData: viewmeta };
        _this2.setState({ content: content });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.content) return _react2.default.createElement(_antd.Spin, { className: 'portal-spin', size: 'large', tip: '\u52A0\u8F7D\u4E2D...' });
      var loadingControl = null;
      if (this.state.loading) loadingControl = _react2.default.createElement(_antd.Spin, { className: 'portal-spin', size: 'large', tip: '\u52A0\u8F7D\u4E2D...' });
      var _props2 = this.props,
          match = _props2.match,
          params = _props2.params;

      var _ref2 = match && match.params || params,
          menuurl = _ref2.menuurl,
          billno = _ref2.billno;

      return _react2.default.createElement(
        'div',
        { className: 'meta-dynamic-view 222' },
        _react2.default.createElement(_PortalTabItem2.default, { index: menuurl || billno, content: this.state.content, width: document.body.clientWidth }),
        _react2.default.createElement(_DynamicModal2.default, null),
        loadingControl
      );
    }
  }]);

  return DynamicView;
}(_react.Component);

exports.default = DynamicView;