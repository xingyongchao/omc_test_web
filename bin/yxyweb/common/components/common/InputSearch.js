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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputSearch = function (_Component) {
    _inherits(InputSearch, _Component);

    function InputSearch(props) {
        _classCallCheck(this, InputSearch);

        var _this = _possibleConstructorReturn(this, (InputSearch.__proto__ || Object.getPrototypeOf(InputSearch)).call(this, props));

        _this.componentWillReceiveProps = function (nextProps) {
            if (_this.state.value != nextProps.value || _this.state.disabled != nextProps.disabled) {
                _this.setState({ value: nextProps.value, disabled: nextProps.disabled });
            }
        };

        _this.onFocus = function () {
            _this.setState({ focused: true });
            if (_this.props.onFocus) _this.props.onFocus();
        };

        _this.onBlur = function () {
            if (_this.props.onBlur) _this.props.onBlur();
        };

        _this.handleBodyClick = function (e) {
            if (_this.contains(_this.refs.input_search, e.target)) return;

            if (e.target && cb.dom(e.target).parents('div.inputsearch').length) return;
            document.body.removeEventListener('click', _this.handleBodyClick);
            _this.setState({ focused: false });
        };

        _this.onMouseEnter = function () {
            _this.setState({ mouseEnter: true });
        };

        _this.onMouseLeave = function () {
            _this.setState({ mouseEnter: false });
        };

        _this.onDelete = function (e) {
            if (_this.props.onDelete) _this.props.onDelete(e);
            _this.refs.input_search.focus();
        };

        _this.state = {
            value: props.value || '',
            placeholder: props.placeholder || '',
            type: props.type || 'text',
            size: props.size || 'default',
            disabled: props.disabled || false,
            focused: false,
            mouseEnter: false,
            isBtn: props.isBtn || false,
            showBtn: props.showBtn,
            id: props.id || '',
            btnText: props.btnText || '搜索'
        };
        return _this;
    }

    _createClass(InputSearch, [{
        key: 'contains',
        value: function contains(elem, target) {
            if (!elem) return true;
            if (elem === target) return true;
            if (!elem.children || !elem.children.length) return false;
            for (var i = 0, len = elem.children.length; i < len; i++) {
                if (this.contains(elem.children[i], target)) return true;
            }
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                value = _state.value,
                focused = _state.focused,
                placeholder = _state.placeholder,
                disabled = _state.disabled,
                mouseEnter = _state.mouseEnter,
                isBtn = _state.isBtn,
                btnText = _state.btnText,
                id = _state.id,
                showBtn = _state.showBtn;

            document.body.addEventListener('click', this.handleBodyClick);
            showBtn = showBtn == null || showBtn == undefined ? true : showBtn;
            var btnControl = isBtn ? _react2.default.createElement(
                _antd.Button,
                { onClick: this.props.onSearch, className: value == "" ? "has-btn" : "has-btn has-btn-red" },
                btnText
            ) : _react2.default.createElement('i', { onClick: this.props.onSearch, className: 'anticon anticon-search ant-input-search-icon' });
            return _react2.default.createElement(
                'div',
                { className: 'inputsearch' },
                _react2.default.createElement(
                    'span',
                    { className: 'ant-input-search ant-input-affix-wrapper', onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave },
                    _react2.default.createElement(_antd.Input, { ref: 'input_search', value: value, id: id,
                        onChange: this.props.onChange,
                        onPressEnter: this.props.onPressEnter,
                        placeholder: placeholder, onFocus: this.onFocus, onBlur: this.onBlur, disabled: disabled }),
                    _react2.default.createElement(
                        'span',
                        { className: 'ant-input-suffix' },
                        value && value != '' && (focused || mouseEnter) ? _react2.default.createElement('i', { onClick: this.onDelete, className: 'anticon anticon-shurukuangshanchu' }) : '',
                        showBtn ? btnControl : ""
                    )
                )
            );
        }
    }]);

    return InputSearch;
}(_react.Component);

exports.default = InputSearch;