'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducerMap = {
  index: _reducers2.default
};

function configureStore(entryPoint, initialState) {
  return (0, _redux.createStore)(reducerMap[entryPoint], initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default));
}