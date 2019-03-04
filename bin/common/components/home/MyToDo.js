'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mytodo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _SvgIcon = require('../../../yxyweb/common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _tree = require('../../../yxyweb/common/redux/tree');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mytodo = exports.Mytodo = function (_Component) {
  _inherits(Mytodo, _Component);

  function Mytodo() {
    _classCallCheck(this, Mytodo);

    return _possibleConstructorReturn(this, (Mytodo.__proto__ || Object.getPrototypeOf(Mytodo)).apply(this, arguments));
  }

  _createClass(Mytodo, [{
    key: 'getMytodo',
    value: function getMytodo() {
      var _this2 = this;

      var todoList = this.props.home.todoList;

      if (!todoList) return null;
      var todos = [];
      todoList.forEach(function (item) {
        var caption = item.caption,
            icon = item.icon,
            menuCode = item.menuCode,
            condition = item.condition,
            count = item.count;

        todos.push(_react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'div',
            { onClick: function onClick() {
                return _this2.handleClick(menuCode, condition);
              }, className: 'home-my-con' },
            _react2.default.createElement(
              'i',
              null,
              _react2.default.createElement(_SvgIcon2.default, { type: icon })
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h4',
                null,
                caption
              ),
              _react2.default.createElement(
                'p',
                null,
                count
              )
            )
          )
        ));
      });
      return _react2.default.createElement(
        'div',
        { className: 'home-panel home-my-panel' },
        _react2.default.createElement(
          'ul',
          { className: 'home-panel-1', style: { 'cursor': 'pointer' } },
          todos
        )
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick(menuCode, condition) {
      this.props.execHandler(menuCode, { condition: condition });
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getMytodo();
      return control;
    }
  }]);

  return Mytodo;
}(_react.Component);

function mapStateToProps(state) {
  return {
    home: state.home.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    execHandler: (0, _redux.bindActionCreators)(_tree.execHandler, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Mytodo);