'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../../../yxyweb/common/components/basic');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _HomeCommon = require('./HomeCommon');

var common = _interopRequireWildcard(_HomeCommon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RangePicker = _antd.DatePicker.RangePicker;

var TabPane = _antd.Tabs.TabPane;

var HomeTitle = function (_React$Component) {
    _inherits(HomeTitle, _React$Component);

    function HomeTitle(props) {
        _classCallCheck(this, HomeTitle);

        var _this = _possibleConstructorReturn(this, (HomeTitle.__proto__ || Object.getPrototypeOf(HomeTitle)).call(this, props));

        _this.state = {
            title: props.title || "我的待办",
            RangePickerValue: [],
            onlyTtile: props.onlyTtile || false,
            haveAddress: props.haveAddress || false, //门店
            haveRankTab: props.haveRankTab || false,
            addressMultiple: props.addressMultiple || false,
            dataSource: props.dataSource || [],
            defaultStore: props.defaultStore || '全部'
        };
        return _this;
    }

    _createClass(HomeTitle, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.dataSource != this.state.dataSource && nextProps.dataSource) this.setState({ dataSource: nextProps.dataSource });
        }
    }, {
        key: 'onTabClick',
        value: function onTabClick(e) {
            var startDate = common.getDate(e, '0');
            var endDate = common.getDate(e, '1');
            var lastStartDate = common.getDate('last' + e, '0');
            var lastEndDate = common.getDate('last' + e, '1');
            var date = [];
            date.push((0, _moment2.default)(startDate, 'YYYY-MM-DD'));
            date.push((0, _moment2.default)(endDate, 'YYYY-MM-DD'));
            if (this.props.onDateChange) {
                this.props.onDateChange([startDate, endDate, lastStartDate, lastEndDate], e);
            }
            this.setState({
                RangePickerValue: date
            });
        }
        // onDateChange(date, dateString) {
        //     let dateValue = [];
        //     if (dateString[0] !== "") {
        //         dateValue.push(moment(dateString[0], 'YYYY-MM-DD'));
        //         dateValue.push(moment(dateString[1], 'YYYY-MM-DD'));
        //     }

        //     if (this.props.onDateChange) {
        //         this.props.onDateChange([dateString[0], dateString[1]]);
        //     }
        //     this.setState({
        //         RangePickerValue: dateValue
        //     });
        // }

    }, {
        key: 'onAddressChange',
        value: function onAddressChange(val) {
            if (this.props.onAddressChange) {
                this.props.onAddressChange(val);
            }
        }
    }, {
        key: 'onRankTabClick',
        value: function onRankTabClick(val) {
            if (val == '店员') {
                this.setState({ haveAddress: true });
            } else {
                this.setState({ haveAddress: false });
            }
            if (this.props.onRankTabClick) {
                this.props.onRankTabClick(val);
            }
        }
    }, {
        key: 'getStores',
        value: function getStores() {
            var storeArr = [];
            this.state.dataSource.unshift({ store: '全部', store_name: '全部' });
            this.state.dataSource.forEach(function (ele) {
                storeArr.push(_react2.default.createElement(
                    _antd.Select.Option,
                    { value: ele.store },
                    ele.store_name
                ));
            });
            return storeArr;
        }
    }, {
        key: 'getContent',
        value: function getContent() {
            var _this2 = this,
                _React$createElement;

            var title = this.state.title;
            var value = this.state.RangePickerValue;
            if (value.length <= 0) {
                var startDate = common.getDate('week', 0);
                var endDate = common.getDate('week', 1);
                value.push((0, _moment2.default)(startDate, 'YYYY-MM-DD'));
                value.push((0, _moment2.default)(endDate, 'YYYY-MM-DD'));
            }
            if (this.state.onlyTtile) {
                return _react2.default.createElement(
                    'div',
                    { className: 'home-title' },
                    _react2.default.createElement(
                        'div',
                        { className: 'home-title-left' },
                        title
                    )
                );
            }
            var storeContent = this.getStores();
            return _react2.default.createElement(
                'div',
                { className: 'home-title' },
                _react2.default.createElement(
                    'div',
                    { className: 'home-title-left' },
                    title
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'home-title-right' },
                    _react2.default.createElement(
                        'div',
                        { style: { float: 'left' } },
                        this.state.haveRankTab ? _react2.default.createElement(
                            _antd.Tabs,
                            { style: { float: 'left' }, onTabClick: function onTabClick(e) {
                                    return _this2.onRankTabClick(e);
                                }, defaultActiveKey: '\u95E8\u5E97', size: 'small' },
                            _react2.default.createElement(TabPane, { tab: '\u95E8\u5E97', key: '\u95E8\u5E97' }),
                            _react2.default.createElement(TabPane, { tab: '\u5E97\u5458', key: '\u5E97\u5458' }),
                            _react2.default.createElement(TabPane, { tab: '\u5546\u54C1', key: '\u5546\u54C1' })
                        ) : '',
                        this.state.haveAddress ? _react2.default.createElement(
                            _antd.Select,
                            (_React$createElement = { multiple: this.state.addressMultiple ? true : false, style: { float: 'left' }, defaultValue: this.state.defaultStore }, _defineProperty(_React$createElement, 'style', { width: 120 }), _defineProperty(_React$createElement, 'onChange', function onChange(val) {
                                return _this2.onAddressChange(val);
                            }), _React$createElement),
                            storeContent
                        ) : ''
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'home-title-date' },
                        this.state.addressMultiple ? _react2.default.createElement(
                            _antd.Tabs,
                            { onTabClick: function onTabClick(e) {
                                    return _this2.onTabClick(e);
                                }, defaultActiveKey: 'seven', size: 'small' },
                            _react2.default.createElement(TabPane, { tab: '\u8FD17\u5929', key: 'seven' }),
                            _react2.default.createElement(TabPane, { tab: '\u8FD130\u5929', key: 'thirty' }),
                            _react2.default.createElement(TabPane, { tab: '\u8FD190\u5929', key: 'ninety' })
                        ) : _react2.default.createElement(
                            _antd.Tabs,
                            { onTabClick: function onTabClick(e) {
                                    return _this2.onTabClick(e);
                                }, defaultActiveKey: 'yesterday', size: 'small' },
                            _react2.default.createElement(TabPane, { tab: '\u6628\u5929', key: 'yesterday' }),
                            _react2.default.createElement(TabPane, { tab: '\u8FD17\u5929', key: 'seven' }),
                            _react2.default.createElement(TabPane, { tab: '\u8FD130\u5929', key: 'thirty' }),
                            _react2.default.createElement(TabPane, { tab: '\u66F4\u591A', key: 'more' })
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var content = this.getContent();
            return _react2.default.createElement(
                'div',
                null,
                content
            );
        }
    }]);

    return HomeTitle;
}(_react2.default.Component);

exports.default = HomeTitle;