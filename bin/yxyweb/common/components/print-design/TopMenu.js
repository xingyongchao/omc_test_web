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

var _basic = require('../basic');

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _print = require('../../redux/print');

var printactions = _interopRequireWildcard(_print);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopMenu = function (_Component) {
    _inherits(TopMenu, _Component);

    function TopMenu(props) {
        _classCallCheck(this, TopMenu);

        var _this = _possibleConstructorReturn(this, (TopMenu.__proto__ || Object.getPrototypeOf(TopMenu)).call(this, props));

        _this.addNewTemplate = function () {
            var selectType = _this.props.print.selectType;

            _this.actions.addTemplate({ "billno": selectType });
        };

        _this.onOk = function (e) {
            var _this$props$print = _this.props.print,
                selectType = _this$props$print.selectType,
                templatecode = _this$props$print.templatecode,
                templatename = _this$props$print.templatename;


            var renderData = { templatecode: templatecode, templatename: templatename, billno: selectType };
            _this.actions.addTemplate(renderData);
            _this.actions.setData({ showModal: false, templatecode: '', templatename: '' });
        };

        _this.onCancel = function (e) {
            _this.actions.setData({ showModal: false });
        };

        _this.getTypeControl = function () {
            var templateData = _this.props.print.templateData;

            if (!templateData) return '';
            var control = [];
            templateData.forEach(function (element) {
                control.push(_react2.default.createElement(
                    _antd.Select.Option,
                    { key: element.bo_code },
                    element.bo_name
                ));
            }, _this);
            return control;
        };

        _this.actions = props.printactions;
        return _this;
    }
    /*新增模板*/

    /*关闭modal*/


    _createClass(TopMenu, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props$print = this.props.print,
                showModal = _props$print.showModal,
                selectType = _props$print.selectType,
                templatecode = _props$print.templatecode,
                templatename = _props$print.templatename;

            var typeControl = this.getTypeControl();
            return _react2.default.createElement(
                _basic.Row,
                { className: 'uretail-print-topmenu' },
                _react2.default.createElement(
                    _antd.Button,
                    { className: 'no-border-radius m-l-10', type: 'primary', onClick: function onClick() {
                            return _this2.addNewTemplate();
                        } },
                    _react2.default.createElement(_SvgIcon2.default, { type: 'plus-copy' }),
                    '\u65B0\u589E\u6A21\u677F'
                )
            );
        }
    }]);

    return TopMenu;
}(_react.Component);

function mapStateToProps(state) {
    return {
        print: state.print.toJS()
    };
}

function mapDispatchToProps(dispatch) {
    return {
        printactions: (0, _redux.bindActionCreators)(printactions, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TopMenu);