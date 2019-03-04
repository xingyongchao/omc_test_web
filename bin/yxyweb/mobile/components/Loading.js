'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _antdMobile = require('antd-mobile');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Toasting(props) {
  return _react2.default.createElement(_antdMobile.ActivityIndicator, { toast: true, text: '\u52A0\u8F7D\u4E2D...', animating: props.loading });
}

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    loading: state.loading
  };
})(Toasting);