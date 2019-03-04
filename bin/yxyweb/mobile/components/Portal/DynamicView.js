'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _PortalTabItem = require('./PortalTabItem');

var _PortalTabItem2 = _interopRequireDefault(_PortalTabItem);

var _portal = require('../../../common/redux/portal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DynamicView = function (_Component) {
  _inherits(DynamicView, _Component);

  function DynamicView(props) {
    _classCallCheck(this, DynamicView);

    var _this = _possibleConstructorReturn(this, (DynamicView.__proto__ || Object.getPrototypeOf(DynamicView)).call(this, props));

    var match = props.match,
        params = props.params;

    var _ref = match && match.params || params,
        menuurl = _ref.menuurl,
        billtype = _ref.billtype,
        billno = _ref.billno,
        billid = _ref.billid;

    _this.state = {
      index: menuurl || billno,
      menuurl: menuurl,
      billtype: billtype,
      billno: billno,
      billid: billid
    };
    return _this;
  }

  _createClass(DynamicView, [{
    key: 'pushCallback',
    value: function pushCallback(index, content) {
      var _props = this.props,
          metaInit = _props.metaInit,
          push = _props.push;

      this.props.metaInit(index, { content: content });
      this.props.push('/meta/' + index);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _state = this.state,
          index = _state.index,
          menuurl = _state.menuurl,
          billtype = _state.billtype,
          billno = _state.billno,
          billid = _state.billid;

      if (menuurl) {
        this.pushCallback(index, { type: 'platform', url: menuurl });
        return;
      }
      var data = { billtype: billtype, billno: billno };
      if (billid) data.params = billid === 'add' ? { mode: 'add' } : { mode: 'edit', id: billid };else data.params = { query: cb.rest.AppContext.query };
      cb.loader.runCommandLine('bill', data, null, function (vm, viewmeta) {
        _this2.pushCallback(index, { vm: vm, metaData: viewmeta });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'h1',
        null,
        '\u52A0\u8F7D\u4E2D...'
      );
    }
  }]);

  return DynamicView;
}(_react.Component);

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    push: (0, _redux.bindActionCreators)(_reactRouterRedux.push, dispatch),
    metaInit: (0, _redux.bindActionCreators)(_portal.metaInit, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DynamicView);