'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _createMemoryHistory = require('history/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _configureStore = require('../redux/store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { Router, createMemoryHistory, browserHistory } from 'react-router'

// import { syncHistoryWithStore } from 'react-router-redux'

var Isomorph = function (_Component) {
  _inherits(Isomorph, _Component);

  function Isomorph() {
    _classCallCheck(this, Isomorph);

    return _possibleConstructorReturn(this, (Isomorph.__proto__ || Object.getPrototypeOf(Isomorph)).apply(this, arguments));
  }

  _createClass(Isomorph, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          store = _props.store,
          history = _props.history,
          routes = _props.routes,
          children = _props.children;

      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        children
      );
    }
  }]);

  return Isomorph;
}(_react.Component);

Isomorph.propTypes = {
  store: _propTypes2.default.object.isRequired
  // history: PropTypes.object.isRequired
};

Isomorph.createStore = function (entryPoint, initialState) {
  return (0, _configureStore2.default)(entryPoint, initialState);
};

Isomorph.createHistory = function (store, path) {
  // if (process.env.__CLIENT__)
  //   return syncHistoryWithStore(browserHistory, store)
  // return createMemoryHistory(path)
  if (process.env.__CLIENT__) return (0, _createBrowserHistory2.default)();
  return (0, _createMemoryHistory2.default)({ initialEntries: [path] });
};

exports.default = Isomorph;