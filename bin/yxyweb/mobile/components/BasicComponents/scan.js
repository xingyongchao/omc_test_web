'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _antdMobile = require('antd-mobile');

var _NavBar = require('../NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scan = function (_Component) {
    _inherits(Scan, _Component);

    function Scan(props) {
        _classCallCheck(this, Scan);

        var _this = _possibleConstructorReturn(this, (Scan.__proto__ || Object.getPrototypeOf(Scan)).call(this, props));

        _this.onmarked = function (type, code, file) {
            _this.setState({ barCode: code });
            if (_this.props.vm) {
                _this.props.vm.set("barcode", code);
                _this.props.vm.get("barcode").fireEvent('enter');
                _this.goBack();
            }
            // console.log(code + '  ' + type + '  ' + file);
            // this.saveCode();
            // this.lazyStart(true);
        };

        _this.onerror = function (error) {
            _antdMobile.Toast.fail('操作出错', 1);
            console.log(error);
            _this.lazyStart(true);
        };

        _this.saveCode = function () {
            if (typeof _this.props.resolve === 'function') {
                _this.props.resolve({
                    fulfilled: true,
                    value: _this.state.barCode
                });
            }
        };

        _this.goBack = function () {
            if (_this.props.close) _this.props.close();
        };

        return _this;
    }

    _createClass(Scan, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.model) this.props.model.addListener(this);
            this.initPureScanBar();
        }
    }, {
        key: 'initPureScanBar',
        value: function initPureScanBar() {
            if (!window.plus || !window.plus.barcode) {
                //测试barcode方法,
                this.barcode = {
                    start: function start() {},
                    cancel: function cancel() {},
                    close: function close() {},
                    setFlash: function setFlash() {}
                };
                return;
            }
            var styles = { frameColor: "#29E52C", PureScanBarColor: "#29E52C", background: "#222222" };
            var filters = [window.plus.barcode.QR, window.plus.barcode.EAN13, window.plus.barcode.EAN8, window.plus.barcode.ITF];
            this.barcode = new window.plus.barcode.Barcode('barcodepanel', filters, styles);
            this.barcode.onmarked = this.onmarked;
            this.barcode.onerror = this.onerror;
            this.lazyStart();
        }
    }, {
        key: 'lazyStart',
        value: function lazyStart(bl) {
            if (bl) {
                var calTime = setTimeout(function () {
                    clearTimeout(calTime);
                    this.barcode.start();
                }.bind(this), 1000);
            } else {
                this.barcode.start();
            }
        }

        //释放

    }, {
        key: 'close',
        value: function close() {
            if (this.barcode && this.barcode.cancel) {
                this.barcode.cancel();
            }
            if (this.close && this.barcode.close) {
                this.barcode.close();
            }
        }

        //闪光灯

    }, {
        key: 'setFlash',
        value: function setFlash() {
            var blopen = !this.state.open;
            this.setState({ open: blopen });
            this.barcode.setFlash(blopen);
        }
    }, {
        key: 'changeInput',
        value: function changeInput(value) {
            this.setState({ barCode: value });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.model) this.props.model.removeListener(this);
            this.close();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.model) this.props.model.addListener(this);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var originDpr = 1;
            var hgt = window.screen.height - 185 * originDpr;
            return _react2.default.createElement(
                'div',
                { className: 'barcode_view', style: { top: 0, left: 0, width: '100%', position: 'fixed', zIndex: '1000', height: window.screen.height + 'px', textAlign: 'center', backgroundColor: '#000' } },
                _react2.default.createElement(
                    'div',
                    { style: { color: '#fff', textAlign: 'left', padding: '0.2rem' } },
                    _react2.default.createElement('i', { onClick: function onClick() {
                            return _this2.goBack();
                        }, className: 'icon icon-fanhui' })
                ),
                _react2.default.createElement('div', { id: 'barcodepanel', style: { height: hgt + 'px' } })
            );
        }
    }]);

    return Scan;
}(_react.Component);

exports.default = Scan;