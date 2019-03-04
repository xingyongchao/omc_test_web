'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectControl = function (_Component) {
    _inherits(SelectControl, _Component);

    function SelectControl(props) {
        _classCallCheck(this, SelectControl);

        return _possibleConstructorReturn(this, (SelectControl.__proto__ || Object.getPrototypeOf(SelectControl)).call(this, props));
    }

    _createClass(SelectControl, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.model) {
                this.props.model.addListener(this);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.model) {
                this.props.model.removeListener(this);
            }
        }
    }, {
        key: 'handClick',
        value: function handClick(item) {
            if (this.props.model) {
                var val = this.props.model.getValue();
                var chooseVal = item.value;
                if (val === item.value) {
                    chooseVal = "";
                }
                this.setState({ selectValue: chooseVal });
                this.props.model.setValue(chooseVal, true);
            }
        }
    }, {
        key: 'getControls',
        value: function getControls() {
            var _this2 = this;

            if (!this.state) {
                return '';
            }
            var _state = this.state,
                dataSource = _state.dataSource,
                selectValue = _state.selectValue;

            var val = this.props.model.getValue();
            var controls = [];
            dataSource.map(function (item) {
                if (val === item.value) {
                    controls.push(_react2.default.createElement(
                        'div',
                        { onClick: _this2.handClick.bind(_this2, item), className: 'inline sidebar-btn-select', style: { border: '1px #f1e3e8 solid', padding: '0.1rem 0.3rem', marginRight: '0.3rem' } },
                        item.text
                    ));
                } else {
                    controls.push(_react2.default.createElement(
                        'div',
                        { onClick: _this2.handClick.bind(_this2, item), className: 'inline', style: { border: '1px #000 solid', padding: '0.1rem 0.3rem', marginRight: '0.3rem' } },
                        item.text
                    ));
                }
            });
            return _react2.default.createElement(
                _antdMobile.Flex,
                { wrap: 'wrap' },
                controls
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _antdMobile.List.Item,
                { style: { display: 'flex', flexFlow: 'row' } },
                _react2.default.createElement(
                    'span',
                    null,
                    this.props.title
                ),
                this.getControls()
            );
        }
    }]);

    return SelectControl;
}(_react.Component);

exports.default = SelectControl;