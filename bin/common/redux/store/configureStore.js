'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configureStore = require('./configureStore.dev');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _configureStore3 = require('./configureStore.prod');

var _configureStore4 = _interopRequireDefault(_configureStore3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = process.env.NODE_ENV === 'production' ? _configureStore4.default : _configureStore2.default;
exports.default = store;