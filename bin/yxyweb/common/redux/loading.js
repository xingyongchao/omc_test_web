'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleLoadingStatus = toggleLoadingStatus;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = false;
var count = 0;
// reducer

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PLATFORM_UI_TOGGLE_LOADING_BAR_STATUS':
      return action.status || count > 0;
    default:
      return state;
  }
};

// 切换加载状态


function toggleLoadingStatus(status) {
  status ? count++ : count--;
  return {
    type: 'PLATFORM_UI_TOGGLE_LOADING_BAR_STATUS',
    status: status
  };
}