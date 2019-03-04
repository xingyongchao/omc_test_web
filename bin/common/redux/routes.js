'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _containers = require('../containers');

var Pages = _interopRequireWildcard(_containers);

var _components = require('../components');

var Components = _interopRequireWildcard(_components);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = exports.Router = function (_Component) {
  _inherits(Router, _Component);

  function Router() {
    _classCallCheck(this, Router);

    return _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).apply(this, arguments));
  }

  _createClass(Router, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRouterRedux.ConnectedRouter,
        { history: this.props.history },
        _react2.default.createElement(
          _reactRouter.Switch,
          null,
          _react2.default.createElement(_reactRouter.Route, { path: '/login', component: Pages.LoginPage }),
          _react2.default.createElement(_reactRouter.Route, { path: '/register', component: Pages.RegisterPage }),
          _react2.default.createElement(_reactRouter.Route, { path: '/wechat', component: Pages.WeChatPage }),
          _react2.default.createElement(_reactRouter.Route, { path: '/forget', component: Pages.ForgetPage }),
          _react2.default.createElement(_reactRouter.Route, { path: '/expire', component: Pages.ExpirePage }),
          _react2.default.createElement(_reactRouter.Route, { path: '/portal', component: Pages.DefaultPage }),
          _react2.default.createElement(_reactRouter.Route, { path: '/test', component: Pages.TestPage }),
          _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/platform/:menuurl', component: Components.DynamicView }),
          _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/meta/:billtype/:billno', component: Components.DynamicView }),
          _react2.default.createElement(_reactRouter.Route, { path: '/meta/:billtype/:billno/:billid', component: Components.DynamicView }),
          _react2.default.createElement(_reactRouter.Route, { path: '/echartcarousel', component: Pages.EChartCarousel }),
          _react2.default.createElement(_reactRouter.Route, { path: '*', component: Pages.ErrorNotFoundPage })
        )
      );
    }
  }]);

  return Router;
}(_react.Component);