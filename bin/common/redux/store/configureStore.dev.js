'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _lodash = require('lodash');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducerMap = {
  index: _reducers2.default
};

function configureStore(entryPoint, initialState) {
  var middlewares = [_reduxThunk2.default];

  if (process.env.__CLIENT__) {
    var stateTransformer = function stateTransformer(states) {
      var finalStates = {};
      for (var key in states) {
        if (!states.hasOwnProperty(key)) continue;

        var state = states[key];

        if (_immutable2.default.Iterable.prototype.isPrototypeOf(state) && (0, _lodash.isFunction)(state.toObject)) {
          finalStates[key] = state.toObject();
        } else if ((0, _lodash.isPlainObject)(state)) {
          finalStates[key] = key === 'routing' ? states : stateTransformer(state);
        }
      }
      return finalStates;
    };
    var args = {
      stateTransformer: stateTransformer,
      collapsed: true,
      colors: {
        title: function title() {
          return 'red';
        },
        prevState: function prevState() {
          return 'blue';
        },
        action: function action() {
          return 'orange';
        },
        nextState: function nextState() {
          return 'green';
        },
        error: function error() {
          return '#F20404';
        }
      }
    };

    middlewares.push((0, _reduxLogger.createLogger)(args));
  }
  console.log(reducerMap);
  console.log(entryPoint);
  console.log(reducerMap[entryPoint]);
  var store = (0, _redux.createStore)(reducerMap[entryPoint], initialState, (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middlewares), process.env.__CLIENT__ && window.devToolsExtension ? window.devToolsExtension() : function (f) {
    return f;
  }));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', function () {
      var nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}