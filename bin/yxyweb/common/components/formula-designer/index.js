'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _MainContent = require('./MainContent');

var _MainContent2 = _interopRequireDefault(_MainContent);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _formula = require('../../redux/formula');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormulaDesigner = function (_Component) {
  _inherits(FormulaDesigner, _Component);

  function FormulaDesigner() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FormulaDesigner);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormulaDesigner.__proto__ || Object.getPrototypeOf(FormulaDesigner)).call.apply(_ref, [this].concat(args))), _this), _this.handleOk = function () {
      var formulaData = _this.props.formula;
      _this.props.onOk(formulaData);
    }, _this.handleCancel = function () {
      _this.props.close();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FormulaDesigner, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _antd.Modal,
        { key: this.props.modalKey, className: 'FormulaDesigner', visible: this.props.formula.visible, title: '\u516C\u5F0F\u7F16\u8F91\u5668', width: 800, maskClosable: false, footer: _react2.default.createElement(_Footer2.default, { onOk: this.handleOk }), onCancel: this.handleCancel },
        _react2.default.createElement(_MainContent2.default, null)
      );
    }
  }]);

  return FormulaDesigner;
}(_react.Component);

function mapStateToProps(state) {
  return {
    formula: state.formula.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    close: (0, _redux.bindActionCreators)(_formula.close, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FormulaDesigner);