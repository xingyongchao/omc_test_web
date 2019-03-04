'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _basic = require('../../../yxyweb/common/components/basic');

var _antd = require('antd');

var _HomeCommon = require('./HomeCommon');

var common = _interopRequireWildcard(_HomeCommon);

var _SvgIcon = require('../../../yxyweb/common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _tree = require('../../../yxyweb/common/redux/tree');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommonFunctions = function (_Component) {
  _inherits(CommonFunctions, _Component);

  function CommonFunctions(props) {
    _classCallCheck(this, CommonFunctions);

    var _this = _possibleConstructorReturn(this, (CommonFunctions.__proto__ || Object.getPrototypeOf(CommonFunctions)).call(this, props));

    _this.state = {
      dataSource: [],
      title: props.title || '常用功能',
      style: _this.props.style || {}
    };
    return _this;
  }

  _createClass(CommonFunctions, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var proxy = cb.rest.DynamicProxy.create({ getCommon: { url: 'commonfuctions/list', method: 'GET' } });
      proxy.getCommon(function (err, result) {
        if (result) _this2.setState({ dataSource: result });
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(menuCode) {
      var execHandler = this.props.execHandler;

      execHandler(menuCode);
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var _this3 = this;

      var dataSource = this.state.dataSource;

      if (!dataSource.length) return null;
      var items = [];
      dataSource.forEach(function (item, index) {
        var extraProps = {};
        if (index === 0) extraProps.color = 'red';
        items.push(_react2.default.createElement(
          _basic.Col,
          { span: 6 },
          _react2.default.createElement(
            _antd.Tag,
            _extends({}, extraProps, { onClick: function onClick() {
                return _this3.handleClick(item.code);
              } }),
            item.name
          )
        ));
      });
      return _react2.default.createElement(
        _basic.Row,
        null,
        items
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getControl();
      return _react2.default.createElement(
        'div',
        { className: 'home-panel-5 home-panel-6' },
        _react2.default.createElement(
          _antd.Card,
          { title: this.state.title, bordered: false, style: this.state.style },
          control
        )
      );
    }
  }]);

  return CommonFunctions;
}(_react.Component);

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    execHandler: (0, _redux.bindActionCreators)(_tree.execHandler, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CommonFunctions);