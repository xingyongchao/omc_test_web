'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactLoadable = require('react-loadable');

var _reactLoadable2 = _interopRequireDefault(_reactLoadable);

var _Loading = require('../Loading');

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AsyncEchartsForReact = (0, _reactLoadable2.default)({
  loader: function loader() {
    return import( /* webpackChunkName: "echarts-for-react" */'echarts-for-react');
  },
  loading: _Loading2.default
});
exports.default = AsyncEchartsForReact;