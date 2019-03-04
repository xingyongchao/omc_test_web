'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckRadio = function (_React$Component) {
    _inherits(CheckRadio, _React$Component);

    function CheckRadio(props) {
        _classCallCheck(this, CheckRadio);

        var _this = _possibleConstructorReturn(this, (CheckRadio.__proto__ || Object.getPrototypeOf(CheckRadio)).call(this, props));

        _this.onChange = function (e) {
            if (_this.state.readOnly) return;
            if (_this.props.model) {
                var value = _this.props.model.getValue();
                _this.props.model.setValue(!value, true);
            } else {
                if (_this.props.onChange) _this.props.onChange(!_this.state.value);
            }
        };

        _this.handleBodyClick = function (e) {
            if (_this.contains(_this.refs.div, e.target)) return;
            document.body.removeEventListener('click', _this.handleBodyClick);
            _this.setState({
                focus: false
            });
            if (_this.props.model) _this.props.model.execute('blur');
        };

        _this.contains = function (elem, target) {
            if (elem === target) return true;
            if (!elem || !elem.children.length) return false;
            for (var i = 0, len = elem.children.length; i < len; i++) {
                if (_this.contains(elem.children[i], target)) return true;
            }
            return false;
        };

        _this.setVisible = function (value) {
            _this.setState({
                visible: value
            });
        };

        _this.baseControl = function () {
            var value = _this.state.value;
            var control = void 0;
            if (_this.state.readOnly) {
                if (!value) control = _react2.default.createElement('div', { className: 'checkradio-unchecked-readonly' });else control = _react2.default.createElement('div', { className: 'checkradio-checked-readonly' });
            } else {
                if (!value) control = _react2.default.createElement('div', { className: 'checkradio-unchecked', onClick: _this.onChange });else control = _react2.default.createElement('div', { className: 'checkradio-checked', onClick: _this.onChange });
            }
            return _react2.default.createElement(
                'div',
                { ref: 'div', className: 'checkradio-container' },
                control
            );
        };

        _this.state = {
            bIsNull: props.bIsNull,
            value: props.checked || false,
            defaultChecked: false,
            focus: props.focus,
            visible: !props.bHidden,
            readOnly: props.readOnly,
            style: {},
            className: props.className || ''
        };
        return _this;
    }

    _createClass(CheckRadio, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.model) this.props.model.addListener(this);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.model) this.props.model.addListener(this);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.model) this.props.model.removeListener(this);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.model) {
                if (!this.props.model) {
                    nextProps.model.addListener(this);
                } else {
                    return;
                }
            } else {
                var checked = false;
                if (this.props.model) {
                    this.props.model.removeListener(this);
                    if (this.props.checked) this.setState({
                        value: this.props.checked
                    });
                } else {
                    this.setState({
                        value: nextProps.checked
                    });
                }
            }
            this.setState({
                readOnly: nextProps.readOnly,
                focus: nextProps.focus,
                className: nextProps.className
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var control = this.baseControl();
            var classname = this.state.className;
            var style = this.state.visible ? {} : { display: "none" };
            if (this.state.focus) document.body.addEventListener('click', this.handleBodyClick);
            return _react2.default.createElement(
                'div',
                { className: classname, style: style },
                control
            );
        }
    }]);

    return CheckRadio;
}(_react2.default.Component);

exports.default = CheckRadio;