'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Loading;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Loading(props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return _react2.default.createElement(
        'div',
        null,
        'Loader timed out!'
      );
    } else if (props.pastDelay) {
      return _react2.default.createElement(
        'div',
        null,
        'Loading...'
      );
    } else {
      return null;
    }
  } else if (props.error) {
    return _react2.default.createElement(
      'div',
      null,
      'Error! Component failed to load'
    );
  } else {
    return null;
  }
}