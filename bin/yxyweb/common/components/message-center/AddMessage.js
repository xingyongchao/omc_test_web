'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _antd = require('antd');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('../../helpers/util');

var _env = require('../../helpers/env');

var _env2 = _interopRequireDefault(_env);

var _Sider = require('../../../../../node_modules/antd/lib/layout/Sider');

var _Sider2 = _interopRequireDefault(_Sider);

var _addMessage = require('../../redux/addMessage');

var addActions = _interopRequireWildcard(_addMessage);

var _label = require('../basic/label');

var _label2 = _interopRequireDefault(_label);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _LeftContent = require('./LeftContent');

var _LeftContent2 = _interopRequireDefault(_LeftContent);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Operator = function (_Component) {
    _inherits(Operator, _Component);

    function Operator() {
        _classCallCheck(this, Operator);

        return _possibleConstructorReturn(this, (Operator.__proto__ || Object.getPrototypeOf(Operator)).apply(this, arguments));
    }

    _createClass(Operator, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var dataSource = this.props.dataSource;

            if (!dataSource || !dataSource.length) return null;
            var items = [];
            dataSource.forEach(function (item) {
                var key = item.key,
                    value = item.value;

                items.push(_react2.default.createElement(
                    _antd.Tag,
                    { key: key, onClick: function onClick() {
                            return _this2.props.onClick(key);
                        } },
                    value
                ));
            });
            return _react2.default.createElement(
                'div',
                null,
                items
            );
        }
    }]);

    return Operator;
}(_react.Component);

var SubscribeRadio = function (_Component2) {
    _inherits(SubscribeRadio, _Component2);

    function SubscribeRadio() {
        _classCallCheck(this, SubscribeRadio);

        return _possibleConstructorReturn(this, (SubscribeRadio.__proto__ || Object.getPrototypeOf(SubscribeRadio)).apply(this, arguments));
    }

    _createClass(SubscribeRadio, [{
        key: 'render',
        value: function render() {
            var RadioGroup = _antd.Radio.Group;
            return _react2.default.createElement(
                RadioGroup,
                { value: this.props.stopstatus, onChange: this.props.onChange },
                _react2.default.createElement(
                    _antd.Radio,
                    { value: 0 },
                    '\u542F\u7528'
                ),
                _react2.default.createElement(
                    _antd.Radio,
                    { value: 1 },
                    '\u505C\u7528'
                )
            );
        }
    }]);

    return SubscribeRadio;
}(_react.Component);

var SubscribeCycle = function (_Component3) {
    _inherits(SubscribeCycle, _Component3);

    function SubscribeCycle() {
        _classCallCheck(this, SubscribeCycle);

        return _possibleConstructorReturn(this, (SubscribeCycle.__proto__ || Object.getPrototypeOf(SubscribeCycle)).apply(this, arguments));
    }

    _createClass(SubscribeCycle, [{
        key: 'render',
        value: function render() {
            var RangePicker = _antd.DatePicker.RangePicker;
            var _props = this.props,
                startTime = _props.startTime,
                endTime = _props.endTime;

            var format = "YYYY-MM-DD";
            return _react2.default.createElement(RangePicker, { value: [startTime, endTime],
                format: format, onChange: this.props.onChange });
        }
    }]);

    return SubscribeCycle;
}(_react.Component);

var SubscribeFrequency = function (_Component4) {
    _inherits(SubscribeFrequency, _Component4);

    function SubscribeFrequency() {
        _classCallCheck(this, SubscribeFrequency);

        return _possibleConstructorReturn(this, (SubscribeFrequency.__proto__ || Object.getPrototypeOf(SubscribeFrequency)).apply(this, arguments));
    }

    _createClass(SubscribeFrequency, [{
        key: 'render',
        value: function render() {
            var month = [];
            for (var i = 1; i < 29; i++) {
                month.push(_react2.default.createElement(
                    Option,
                    { value: i.toString() },
                    i,
                    '\u53F7'
                ));
            }
            var intervalDay = [];
            for (var _i = 0; _i < 8; _i++) {
                intervalDay.push(_react2.default.createElement(
                    Option,
                    { value: _i },
                    _i
                ));
            }
            var intervalWeek = [];
            for (var _i2 = 0; _i2 < 5; _i2++) {
                intervalWeek.push(_react2.default.createElement(
                    Option,
                    { value: _i2 },
                    _i2
                ));
            }
            var intervalMonth = [];
            for (var _i3 = 0; _i3 < 13; _i3++) {
                intervalMonth.push(_react2.default.createElement(
                    Option,
                    { value: _i3 },
                    _i3
                ));
            }
            var RadioButton = _antd.Radio.Button;
            var RadioGroup = _antd.Radio.Group;
            return _react2.default.createElement(
                'div',
                { className: 'subscribe_cycle_radio' },
                _react2.default.createElement(
                    RadioGroup,
                    { value: this.props.value, onChange: this.props.onChange },
                    _react2.default.createElement(
                        RadioButton,
                        { value: 1 },
                        '\u5929'
                    ),
                    _react2.default.createElement(
                        RadioButton,
                        { value: 2 },
                        '\u5468'
                    ),
                    _react2.default.createElement(
                        RadioButton,
                        { value: 3 },
                        '\u6708'
                    )
                ),
                ' \xA0\xA0\xA0\xA0\xA0',
                this.props.value === 1 ? _react2.default.createElement(
                    'span',
                    { className: 'subscribe_cycle_select' },
                    '\u95F4\u9694',
                    _react2.default.createElement(
                        _antd.Select,
                        { value: this.props.interval, onChange: this.props.onIntervalChange, style: { width: 100 } },
                        intervalDay
                    ),
                    '\u5929\u89E6\u53D1\u4E00\u6B21 '
                ) : null,
                this.props.value === 2 ? _react2.default.createElement(
                    'span',
                    { className: 'subscribe_cycle_select' },
                    '\u95F4\u9694',
                    _react2.default.createElement(
                        _antd.Select,
                        { value: this.props.interval, onChange: this.props.onIntervalChange, style: { width: 100 } },
                        intervalWeek
                    ),
                    '\u5468\u89E6\u53D1\u4E00\u6B21'
                ) : null,
                this.props.value === 3 ? _react2.default.createElement(
                    'span',
                    { className: 'subscribe_cycle_select' },
                    '\u95F4\u9694',
                    _react2.default.createElement(
                        _antd.Select,
                        { value: this.props.interval, onChange: this.props.onIntervalChange, style: { width: 100 } },
                        intervalMonth
                    ),
                    '\u6708\u89E6\u53D1\u4E00\u6B21'
                ) : null,
                _react2.default.createElement('br', null),
                this.props.value === 2 ? _react2.default.createElement(
                    _antd.Select,
                    { mode: 'tags', value: this.props.day, onChange: this.props.onWeekOrMonthChange, className: this.props.className || 'subscribe_cycle_week_or_month' },
                    _react2.default.createElement(
                        Option,
                        { value: '2' },
                        '\u661F\u671F\u4E00'
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '3' },
                        '\u661F\u671F\u4E8C'
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '4' },
                        '\u661F\u671F\u4E09'
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '5' },
                        '\u661F\u671F\u56DB'
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '6' },
                        '\u661F\u671F\u4E94'
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '7' },
                        '\u661F\u671F\u516D'
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: '1' },
                        '\u661F\u671F\u65E5'
                    )
                ) : null,
                this.props.value === 3 ? _react2.default.createElement(
                    _antd.Select,
                    { mode: 'tags', value: this.props.day, onChange: this.props.onWeekOrMonthChange, className: this.props.className || 'subscribe_cycle_week_or_month' },
                    month
                ) : null
            );
        }
    }]);

    return SubscribeFrequency;
}(_react.Component);

var SubscribeTime = function (_Component5) {
    _inherits(SubscribeTime, _Component5);

    function SubscribeTime() {
        _classCallCheck(this, SubscribeTime);

        return _possibleConstructorReturn(this, (SubscribeTime.__proto__ || Object.getPrototypeOf(SubscribeTime)).apply(this, arguments));
    }

    _createClass(SubscribeTime, [{
        key: 'render',
        value: function render() {
            var Option = _antd.Select.Option;
            var time = [];
            for (var i = 0; i < 24; i++) {
                time.push(_react2.default.createElement(
                    Option,
                    { value: i.toString() },
                    '每日' + i.toString() + '点'
                ));
            }
            return _react2.default.createElement(
                _antd.Select,
                { className: this.props.className, mode: 'multiple', value: this.props.value, onChange: this.props.onChange },
                time
            );
        }
    }]);

    return SubscribeTime;
}(_react.Component);

var QueryScheme = function (_Component6) {
    _inherits(QueryScheme, _Component6);

    function QueryScheme() {
        _classCallCheck(this, QueryScheme);

        return _possibleConstructorReturn(this, (QueryScheme.__proto__ || Object.getPrototypeOf(QueryScheme)).apply(this, arguments));
    }

    _createClass(QueryScheme, [{
        key: 'render',
        value: function render() {
            var Option = _antd.Select.Option;
            var queryScheme = [];
            this.props.solutionList.forEach(function (item) {
                queryScheme.push(_react2.default.createElement(
                    Option,
                    { value: item.id },
                    _react2.default.createElement(
                        'span',
                        { className: 'solution_name' },
                        item.solutionName
                    )
                ));
            });
            return _react2.default.createElement(
                _antd.Select,
                { value: this.props.value, onChange: this.props.onChange },
                queryScheme
            );
        }
    }]);

    return QueryScheme;
}(_react.Component);

var SubscribeUser = function (_Component7) {
    _inherits(SubscribeUser, _Component7);

    function SubscribeUser() {
        _classCallCheck(this, SubscribeUser);

        return _possibleConstructorReturn(this, (SubscribeUser.__proto__ || Object.getPrototypeOf(SubscribeUser)).apply(this, arguments));
    }

    _createClass(SubscribeUser, [{
        key: 'render',
        value: function render() {
            var Option = _antd.Select.Option;
            var receivers = [];

            // for (let i = 1; i < this.props.receivers.length + 1; i++) {
            //     receivers.push(<Option value={this.props.userId[i - 1]}>{this.props.receivers[i - 1]}</Option>)
            // }
            this.props.receivers.forEach(function (item) {
                receivers.push(_react2.default.createElement(
                    Option,
                    { value: item.value, lable: item.lable },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'span',
                            { className: 'recipient_name' },
                            item.name
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'account_name' },
                            item.account
                        )
                    )
                ));
            });
            return _react2.default.createElement(
                _antd.Select,
                { optionFilterProp: 'children', className: this.props.className,
                    mode: 'multiple', value: this.props.userId, onChange: this.props.onChange, optionLabelProp: 'lable'
                },
                receivers
            );
        }
    }]);

    return SubscribeUser;
}(_react.Component);

var AddMessage = function (_Component8) {
    _inherits(AddMessage, _Component8);

    function AddMessage(props) {
        _classCallCheck(this, AddMessage);

        var _this9 = _possibleConstructorReturn(this, (AddMessage.__proto__ || Object.getPrototypeOf(AddMessage)).call(this, props));

        _this9.onFocus = function () {
            setTimeout(function () {
                var input = (0, _reactDom.findDOMNode)(_this9.input);
                _this9.props.addActions.focus(input.selectionStart);
            }, 0);
        };

        _this9.onChange = function (e) {
            _this9.props.addActions.change(e.target.value, e.target.selectionStart);
        };

        _this9.handleOperatorSelect = function (key) {
            _this9.props.addActions.selectOperator(key);
        };

        _this9.handleOk = function () {
            _this9.props.addActions.onOk();
        };

        _this9.handleCancel = function () {
            _this9.setState({
                nameErrInfo: null,
                contextErrInfo: null,
                timepointErrInfo: null,
                receiversErrInfo: null,
                frequencyErrInfo: null
            });
            _this9.props.addActions.close();
        };

        _this9.onNameChange = function (e) {
            _this9.props.addActions.changeName(e.target.value);
        };

        _this9.onStopstatusChange = function (e) {
            _this9.props.addActions.changeStopstatus(e.target.value);
        };

        _this9.onContextChange = function (e) {
            _this9.props.addActions.changeContext(e.target.value);
        };

        _this9.onFrequencyChange = function (e) {
            _this9.setState({ frequencyErrInfo: null });
            _this9.props.addActions.changeFrequency(e.target.value);
        };

        _this9.onTimepointChange = function (value) {
            _this9.props.addActions.changeTimepoint(value);
        };

        _this9.onItervalChange = function (value) {
            _this9.props.addActions.changeInterval(value);
        };

        _this9.onSolutionChange = function (value) {
            _this9.props.addActions.changeSolution(value);
        };

        _this9.onWeekOrMonthChange = function (value) {
            _this9.props.addActions.changeWeekOrMonth(value);
        };

        _this9.onReceiversChange = function (value) {
            _this9.props.addActions.changeReceivers(value);
        };

        _this9.onCycleChange = function (value) {
            _this9.props.addActions.changeCycle(value);
        };

        _this9.changeNameErrInfo = function (text) {
            _this9.setState({
                nameErrInfo: text
            });
        };

        _this9.changeContextErrInfo = function (text) {
            _this9.setState({
                contextErrInfo: text
            });
        };

        _this9.changeTimepointErrInfo = function (text) {
            _this9.setState({
                timepointErrInfo: text
            });
        };

        _this9.changeReceiversErrInfo = function (text) {
            _this9.setState({
                receiversErrInfo: text
            });
        };

        _this9.changeFrequencyErrInfo = function (text) {
            _this9.setState({
                frequencyErrInfo: text
            });
        };

        _this9.getFormControl = function () {
            var TextArea = _antd.Input.TextArea;

            var classname = 'error_info';
            var _this9$props$addMessa = _this9.props.addMessage,
                name = _this9$props$addMessa.name,
                stopstatus = _this9$props$addMessa.stopstatus,
                startTime = _this9$props$addMessa.startTime,
                endTime = _this9$props$addMessa.endTime,
                receivers = _this9$props$addMessa.receivers,
                userId = _this9$props$addMessa.userId,
                frequency = _this9$props$addMessa.frequency,
                interval = _this9$props$addMessa.interval,
                timepoint = _this9$props$addMessa.timepoint,
                day = _this9$props$addMessa.day,
                operatorData = _this9$props$addMessa.operatorData,
                conditionDesc = _this9$props$addMessa.conditionDesc,
                context = _this9$props$addMessa.context,
                errorInfo = _this9$props$addMessa.errorInfo,
                solutionList = _this9$props$addMessa.solutionList,
                solutionId = _this9$props$addMessa.solutionId;

            var operatorCom = _react2.default.createElement(Operator, { dataSource: operatorData, onClick: _this9.handleOperatorSelect });
            var subscribeName = _react2.default.createElement(_antd.Input, { className: _this9.state.nameErrInfo ? classname : null, value: name, placeholder: '\u8BF7\u8F93\u5165', onChange: _this9.onNameChange });
            var subscribeState = _react2.default.createElement(SubscribeRadio, { stopstatus: stopstatus, onChange: _this9.onStopstatusChange });
            var subscribeCondition = _react2.default.createElement(TextArea, { className: errorInfo ? classname : 'subscribe_condition_inputArea', rows: 3, ref: function ref(node) {
                    return _this9.input = node;
                }, onFocus: _this9.onFocus, onChange: _this9.onChange, value: conditionDesc });
            var subscribeContent = _react2.default.createElement(_antd.Input, { className: _this9.state.contextErrInfo ? classname : null, placeholder: '\u8BF7\u8F93\u5165', value: context, onChange: _this9.onContextChange });
            var subscribeCycle = _react2.default.createElement(SubscribeCycle, { startTime: startTime, endTime: endTime, onChange: _this9.onCycleChange });
            var subscribeFrequency = _react2.default.createElement(SubscribeFrequency, { className: _this9.state.frequencyErrInfo ? 'frequency_error_info' : null, value: frequency, onIntervalChange: _this9.onItervalChange, onWeekOrMonthChange: _this9.onWeekOrMonthChange, onChange: _this9.onFrequencyChange, interval: interval, day: day });
            var subscribeTime = _react2.default.createElement(SubscribeTime, { className: _this9.state.timepointErrInfo ? 'select_error_info' : null, value: timepoint, onChange: _this9.onTimepointChange });
            var subscribeUser = _react2.default.createElement(SubscribeUser, { className: _this9.state.receiversErrInfo ? 'select_error_info' : null, receivers: receivers, userId: userId, onChange: _this9.onReceiversChange });
            var queryScheme = _react2.default.createElement(QueryScheme, { solutionList: solutionList, value: solutionId, onChange: _this9.onSolutionChange });
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'receiver_people' },
                    _this9.getControl(subscribeName, '订阅名称', true),
                    _this9.state.nameErrInfo ? _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        _this9.state.nameErrInfo
                    ) : null
                ),
                _this9.getControl(subscribeState, '订阅状态'),
                _this9.getControl(queryScheme, '查询方案'),
                _react2.default.createElement(
                    'div',
                    { className: 'operator' },
                    _this9.getControl(operatorCom, '运算符')
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'subscribe_condition' },
                    _this9.getControl(subscribeCondition, '订阅条件'),
                    errorInfo ? _react2.default.createElement(
                        'label',
                        { className: 'error' },
                        errorInfo
                    ) : null
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'receiver_people' },
                    _this9.getControl(subscribeContent, '消息内容', true),
                    _this9.state.contextErrInfo ? _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        _this9.state.contextErrInfo
                    ) : null
                ),
                _this9.getControl(subscribeCycle, '订阅周期'),
                _react2.default.createElement(
                    'div',
                    { className: 'receiver_people' },
                    _this9.getControl(subscribeFrequency, '订阅频率', true),
                    (frequency == 2 || frequency == 3) && _this9.state.frequencyErrInfo ? _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        _this9.state.frequencyErrInfo
                    ) : null
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'receiver_people' },
                    _this9.getControl(subscribeTime, '订阅时点', true),
                    _this9.state.timepointErrInfo ? _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        _this9.state.timepointErrInfo
                    ) : null
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'receiver_people' },
                    _this9.getControl(subscribeUser, '接收人', true),
                    _this9.state.receiversErrInfo ? _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        _this9.state.receiversErrInfo
                    ) : null
                )
            );
        };

        _this9.state = {
            nameErrInfo: null,
            contextErrInfo: null,
            timepointErrInfo: null,
            receiversErrInfo: null,
            frequencyErrInfo: null
        };
        return _this9;
    }

    _createClass(AddMessage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.addActions.initOperator();
        }
    }, {
        key: 'getControl',
        value: function getControl(control, caption, required) {
            var title = required ? _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(_antd.Icon, { type: 'star' }),
                caption
            ) : _react2.default.createElement(
                'label',
                null,
                caption
            );
            return _react2.default.createElement(_label2.default, { control: control, title: title });
        }
    }, {
        key: 'render',
        value: function render() {
            var caption = this.props.addMessage.caption;


            return _react2.default.createElement(
                _antd.Modal,
                { title: caption, className: 'FormulaDesigner', maskClosable: false, width: 800, mask: false, visible: this.props.addMessage.visible, onCancel: this.handleCancel, footer: _react2.default.createElement(_Footer2.default, { onOk: this.handleOk,
                        onNameErrInfoChange: this.changeNameErrInfo,
                        onContextErrInfoChange: this.changeContextErrInfo,
                        onTimepointErrInfoChange: this.changeTimepointErrInfo,
                        onReceiversErrInfoChange: this.changeReceiversErrInfo,
                        onFrequencyErrInfoChange: this.changeFrequencyErrInfo
                    }) },
                _react2.default.createElement(
                    'div',
                    { style: { height: '100%' } },
                    _react2.default.createElement(
                        'div',
                        { className: 'LeftContent' },
                        _react2.default.createElement(_LeftContent2.default, null)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'RightContent' },
                        this.getFormControl()
                    )
                )
            );
        }
    }]);

    return AddMessage;
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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AddMessage);