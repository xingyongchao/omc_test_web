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

var _addMessage = require('../../redux/addMessage');

var addActions = _interopRequireWildcard(_addMessage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_Component) {
  _inherits(Footer, _Component);

  function Footer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Footer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Footer.__proto__ || Object.getPrototypeOf(Footer)).call.apply(_ref, [this].concat(args))), _this), _this.handleCancel = function () {
      if (name == '' || context == "" || userId.length == 0 || timepoint == '') {
        _this.props.onNameErrInfoChange('');
        _this.props.onContextErrInfoChange('');
        _this.props.onTimepointErrInfoChange('');
        _this.props.onReceiversErrInfoChange('');
        _this.props.onFrequencyErrInfoChange('');
        _this.props.addActions.close();
        return;
      }
      _this.props.addActions.close();
    }, _this.handleCheck = function () {
      _this.props.addActions.check();
    }, _this.handleOk = function () {
      _this.props.onNameErrInfoChange('');
      _this.props.onContextErrInfoChange('');
      _this.props.onTimepointErrInfoChange('');
      _this.props.onReceiversErrInfoChange('');
      _this.props.onFrequencyErrInfoChange('');
      var _this$props$addMessag = _this.props.addMessage,
          name = _this$props$addMessag.name,
          context = _this$props$addMessag.context,
          timepoint = _this$props$addMessag.timepoint,
          userId = _this$props$addMessag.userId,
          day = _this$props$addMessag.day,
          frequency = _this$props$addMessag.frequency;

      if (name == '' || context == "" || userId.length == 0 || timepoint.length == 0 || (frequency == 2 || frequency == 3) && day.length == 0) {
        if (name == '') {
          _this.props.onNameErrInfoChange('不能为空');
        }

        if (context == "") {
          _this.props.onContextErrInfoChange('不能为空');
        }
        if (timepoint.length == 0) {
          _this.props.onTimepointErrInfoChange('不能为空');
        }
        if (userId.length == 0) {
          _this.props.onReceiversErrInfoChange('不能为空');
        }
        if ((frequency == 2 || frequency == 3) && day.length == 0) {
          _this.props.onFrequencyErrInfoChange('不能为空');
        }
        return;
      }
      _this.props.onOk();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      var checkPass = this.props.addMessage.checkPass;
      var checkState = this.props.addMessage.checkState;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antd.Button,
          { onClick: this.handleCancel },
          '\u53D6\u6D88'
        ),
        _react2.default.createElement(
          _antd.Button,
          { disabled: !checkState, onClick: this.handleCheck },
          '\u6821\u9A8C'
        ),
        _react2.default.createElement(
          _antd.Button,
          { disabled: !checkPass, onClick: this.handleOk },
          '\u786E\u5B9A'
        )
      );
    }
  }]);

  return Footer;
}(_react.Component);

function mapStateToProps(state) {
  return {
    addMessage: state.addMessage.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addActions: (0, _redux.bindActionCreators)(addActions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Footer);