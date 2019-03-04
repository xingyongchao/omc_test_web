'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _env = require('../../helpers/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { parseContainer } from './util';


var parseContainer = null;

var Container = function (_Component) {
  _inherits(Container, _Component);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    parseContainer = require('./util').parseContainer;
    _this.calcWidth(props.width);
    return _this;
  }

  _createClass(Container, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.width === this.props.width) return;
      this.calcWidth(nextProps.width);
    }
  }, {
    key: 'calcWidth',
    value: function calcWidth(width) {
      var _this2 = this;

      this.hasTree = false;
      this.width = width;
      // let minWidth = 1192;
      /*modify  by jinzh1  最小宽度问题  */
      var minWidth = 1130;
      var _props = this.props,
          meta = _props.meta,
          parents = _props.parents;
      // if (parents === 'LineTabs') {
      //   this.width -= 60;
      //   minWidth -= 60;
      // }

      if (meta.containers) {
        meta.containers.forEach(function (item) {
          if (item.cAlign && item.cAlign.trim().toLocaleLowerCase() !== 'left') return;
          _this2.hasTree = true;
          _this2.width -= 240;
          minWidth -= 240;
        });
      }
      if (parents === 'Modal') return;
      if (this.width < minWidth && _env2.default.INTERACTIVE_MODE !== 'touch') this.width = minWidth;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          meta = _props2.meta,
          viewModel = _props2.viewModel,
          height = _props2.height,
          index = _props2.index,
          className = _props2.className;

      var container = parseContainer(meta, viewModel, this.width, height, index, this.hasTree);
      return _react2.default.createElement(
        'div',
        { className: className },
        container
      );
    }
  }]);

  return Container;
}(_react.Component);

exports.default = Container;