'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _antdMobile = require('antd-mobile');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SwitchControl = function (_React$Component) {
    _inherits(SwitchControl, _React$Component);

    function SwitchControl(props) {
        _classCallCheck(this, SwitchControl);

        var _this = _possibleConstructorReturn(this, (SwitchControl.__proto__ || Object.getPrototypeOf(SwitchControl)).call(this, props));

        _this.setListenerState = function (params) {};

        _this.state = {};
        return _this;
    }

    _createClass(SwitchControl, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.model) this.props.model.addListener(this);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.model) this.props.model.removeListener(this);
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                cShowCaption = _state.cShowCaption,
                value = _state.value,
                bCanModify = _state.bCanModify,
                iMaxLength = _state.iMaxLength,
                cFormatData = _state.cFormatData,
                cControlType = _state.cControlType,
                readOnly = _state.readOnly,
                disabled = _state.disabled;

            if (bCanModify) return _react2.default.createElement(
                _antdMobile.List,
                null,
                _react2.default.createElement(
                    _antdMobile.List.Item,
                    { extra: _react2.default.createElement(_antdMobile.Switch, _extends({ readOnly: readOnly, disabled: disabled, checked: value }, getFieldProps('Switch1', { initialValue: true, valuePropName: 'checked' }), { onClick: function onClick(checked) {
                                console.log(checked);
                            } }))
                    },
                    cShowCaption
                )
            );else return _react2.default.createElement(
                _antdMobile.List,
                null,
                _react2.default.createElement(
                    _antdMobile.List.Item,
                    { extra: _react2.default.createElement(_antdMobile.Switch, _extends({ readOnly: readOnly, disabled: disabled, checked: value }, getFieldProps('Switch1', { initialValue: true, valuePropName: 'checked' }), { onClick: function onClick(checked) {
                                console.log(checked);
                            } }))
                    },
                    cShowCaption
                )
            );
        }
    }]);

    return SwitchControl;
}(_react2.default.Component);

exports.default = SwitchControl;