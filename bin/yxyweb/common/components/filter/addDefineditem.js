'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../basic');

var _util = require('../../helpers/util');

var _definedLeftcontent = require('./definedLeftcontent');

var _definedLeftcontent2 = _interopRequireDefault(_definedLeftcontent);

var _Footer = require('../message-center/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = [{ key: 0, value: '=' }, { key: 1, value: '+' }, { key: 2, value: '-' }, { key: 3, value: '*' }, { key: 4, value: '/' }, { key: 5, value: '<=' }];
var markdata = [{ key: 0, value: '等于' }, { key: 1, value: '大于' }, { key: 2, value: '小于' }, { key: 3, value: '包含' }];

var Operator = function (_Component) {
    _inherits(Operator, _Component);

    function Operator(props) {
        _classCallCheck(this, Operator);

        var _this = _possibleConstructorReturn(this, (Operator.__proto__ || Object.getPrototypeOf(Operator)).call(this, props));

        _this.state = {
            showMore: false,
            operatordata: []
        };
        return _this;
    }

    _createClass(Operator, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getOperatorList();
        }
    }, {
        key: 'getOperatorList',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var config, json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                config = {
                                    url: 'enum/getEnumMap',
                                    method: 'GET',
                                    params: {
                                        enumtype: 'conditionType'
                                    }
                                };
                                _context.next = 3;
                                return (0, _util.proxy)(config);

                            case 3:
                                json = _context.sent;

                                if (!(json.code !== 200)) {
                                    _context.next = 6;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 6:
                                json.data && this.setState({ operatordata: json.data });
                                console.log('getOperatorList', json);

                            case 8:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getOperatorList() {
                return _ref.apply(this, arguments);
            }

            return getOperatorList;
        }()
    }, {
        key: 'buttonClick',
        value: function buttonClick(e, type) {
            if (type == 'search') {
                this.SearchEvent();
            } else {
                //
                var showMore = false;
                if (type == 'more') showMore = true;
                this.setState({
                    showMore: showMore
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var operatordata = this.state.operatordata;

            if (!data || !data.length) {
                return null;
            }
            var showMoreStr = void 0;
            var showMore = this.state.showMore;
            if (operatordata.length > 6) {
                showMoreStr = showMore ? _react2.default.createElement(
                    _antd.Button,
                    { style: { borderWidth: 0 }, className: 'showMore', type: 'ghost', size: 'small', onClick: function onClick(e) {
                            return _this2.buttonClick(e, '');
                        } },
                    '\u66F4\u591A',
                    _react2.default.createElement(_antd.Icon, { type: 'up-circle' })
                ) : _react2.default.createElement(
                    _antd.Button,
                    { style: { borderWidth: 0 }, className: 'showMore', type: 'ghost', size: 'small', onClick: function onClick(e) {
                            return _this2.buttonClick(e, 'more');
                        } },
                    '\u66F4\u591A',
                    _react2.default.createElement(_antd.Icon, { type: 'down-circle' })
                );
            } else {
                showMoreStr = _react2.default.createElement('span', { style: { paddingLeft: 5 } });
            }
            var items = [];
            data.forEach(function (item, index) {
                var key = item.key,
                    value = item.value;

                if (_this2.state.showMore) {
                    items.push(_react2.default.createElement(
                        _antd.Tag,
                        { key: key, value: value, onClick: function onClick() {
                                return _this2.props.onClick(value);
                            } },
                        value
                    ));
                } else {
                    if (index < 5) {
                        items.push(_react2.default.createElement(
                            _antd.Tag,
                            { key: key, value: value, onClick: function onClick() {
                                    return _this2.props.onClick(value);
                                } },
                            value
                        ));
                    }
                }
            });
            return _react2.default.createElement(
                'div',
                null,
                items,
                showMoreStr
            );
        }
    }]);

    return Operator;
}(_react.Component);

var Comparemark = function (_Component2) {
    _inherits(Comparemark, _Component2);

    function Comparemark(props) {
        _classCallCheck(this, Comparemark);

        var _this3 = _possibleConstructorReturn(this, (Comparemark.__proto__ || Object.getPrototypeOf(Comparemark)).call(this, props));

        _this3.state = {
            comparemarkdata: []
        };
        return _this3;
    }

    _createClass(Comparemark, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getEnumList();
        }
    }, {
        key: 'getEnumList',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var config, json;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                config = {
                                    url: 'enum/getEnumMap',
                                    method: 'GET',
                                    params: {
                                        enumtype: 'compareLogic'
                                    }
                                };
                                _context2.next = 3;
                                return (0, _util.proxy)(config);

                            case 3:
                                json = _context2.sent;

                                if (!(json.code !== 200)) {
                                    _context2.next = 6;
                                    break;
                                }

                                return _context2.abrupt('return');

                            case 6:
                                json.data && this.setState({ comparemarkdata: json.data });
                                console.log('getEnumList', json);

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getEnumList() {
                return _ref2.apply(this, arguments);
            }

            return getEnumList;
        }()
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var options = [];
            var Option = _antd.Select.Option;
            if (!markdata || !markdata.length) {
                return null;
            }
            markdata.forEach(function (ele, index) {
                var item = _react2.default.createElement(
                    Option,
                    { key: ele.key },
                    ele.value
                );
                options.push(item);
            });
            return _react2.default.createElement(
                _antd.Select,
                { defaultValue: markdata[0].value || null, onChange: function onChange(value) {
                        return _this4.props.onChange(value);
                    } },
                options
            );
        }
    }]);

    return Comparemark;
}(_react.Component);

var ReferInput = function (_Component3) {
    _inherits(ReferInput, _Component3);

    function ReferInput(props) {
        _classCallCheck(this, ReferInput);

        var _this5 = _possibleConstructorReturn(this, (ReferInput.__proto__ || Object.getPrototypeOf(ReferInput)).call(this, props));

        _this5.referModel = new cb.models.ReferModel({ cRefType: 'pub_refList', refReturn: 'code', displayname: 'name' });
        return _this5;
    }

    _createClass(ReferInput, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var codeValue = "";
            this.referModel.on('afterValueChange', function () {
                codeValue = this.getValue();
            });
            this.props.getValue(codeValue);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_basic.Refer, { model: this.referModel });
        }
    }]);

    return ReferInput;
}(_react.Component);

var FilterType = function (_Component4) {
    _inherits(FilterType, _Component4);

    function FilterType() {
        _classCallCheck(this, FilterType);

        return _possibleConstructorReturn(this, (FilterType.__proto__ || Object.getPrototypeOf(FilterType)).apply(this, arguments));
    }

    _createClass(FilterType, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getFiltertypeList();
        }
    }, {
        key: 'getFiltertypeList',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var config, json;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                config = {
                                    url: 'enum/getEnumMap',
                                    method: 'GET',
                                    params: {
                                        enumtype: 'aa_itemType'
                                    }
                                };
                                _context3.next = 3;
                                return (0, _util.proxy)(config);

                            case 3:
                                json = _context3.sent;

                                if (!(json.code !== 200)) {
                                    _context3.next = 6;
                                    break;
                                }

                                return _context3.abrupt('return');

                            case 6:
                                console.log('getFiltertypeList', json);

                            case 7:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getFiltertypeList() {
                return _ref3.apply(this, arguments);
            }

            return getFiltertypeList;
        }()
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            var options = [];
            var Option = _antd.Select.Option;
            if (!markdata || !markdata.length) {
                return null;
            }
            markdata.forEach(function (ele, index) {
                var item = _react2.default.createElement(
                    Option,
                    { key: ele.key },
                    ele.value
                );
                options.push(item);
            });
            return _react2.default.createElement(
                _antd.Select,
                { defaultValue: markdata[0].value || null, onChange: function onChange(value) {
                        return _this7.props.onChange(value);
                    } },
                options
            );
        }
    }]);

    return FilterType;
}(_react.Component);

var addDefineditem = function (_React$Component) {
    _inherits(addDefineditem, _React$Component);

    function addDefineditem(props) {
        _classCallCheck(this, addDefineditem);

        var _this8 = _possibleConstructorReturn(this, (addDefineditem.__proto__ || Object.getPrototypeOf(addDefineditem)).call(this, props));

        _this8.changeNameErrInfo = function (text) {
            _this8.setState({
                nameErrInfo: text
            });
        };

        _this8.state = {
            nameErrInfo: null,
            filterName: "",
            visible: true,
            changeStatus: 0,
            errorInfo: true,
            operatorValue: '',
            isShow: false
        };
        return _this8;
    }

    _createClass(addDefineditem, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            var _this9 = this;

            return _react2.default.createElement(
                'div',
                { className: 'adddefined_modal' },
                _react2.default.createElement(
                    _antd.Modal,
                    { title: '\u65B0\u589E\u8FC7\u6EE4\u9879', visible: this.state.visible, className: 'addfilter_content', width: 820,
                        onCancel: function onCancel() {
                            return _this9.onCancel();
                        }, maskClosable: false
                        // footer={<Footer onNameErrInfoChange={this.changeNameErrInfo}/>}
                    },
                    _react2.default.createElement(
                        'div',
                        { style: { height: 480 } },
                        _react2.default.createElement(
                            'div',
                            { className: 'LeftContent', style: { width: 232, float: 'left', height: 494, overflowy: 'auto', marginRight: 26 } },
                            _react2.default.createElement(_definedLeftcontent2.default, { onSelect: function onSelect(selectedKeys, billNodata) {
                                    return _this9.onSelect(selectedKeys, billNodata);
                                }, model: this.props.model })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'RightContent', style: { width: 514, float: ' left', marginleft: 34, paddingtop: 20, height: 494, overflowy: 'auto' } },
                            this.getFilterControl()
                        )
                    )
                )
            );
        }
    }, {
        key: 'onCancel',
        value: function onCancel() {
            this.setState({ visible: !this.state.visible });
        }
    }, {
        key: 'onSelect',
        value: function onSelect(selectedKeys, billNodata) {
            var self = this;
            var operatorValue = self.state.operatorValue;

            var _index = _.findIndex(billNodata, function (obj) {
                return obj.name === selectedKeys;
            });
            var title = billNodata[_index].title;
            operatorValue += '[' + title + ']';
            self.setState({ operatorValue: operatorValue });
            console.log('onSelect', selectedKeys);
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
            return _react2.default.createElement(_basic.Label, { control: control, title: title, className: 'rightcontent_item' });
        }
    }, {
        key: 'onNameChange',
        value: function onNameChange(e) {
            this.setState({ filterName: e.target.value });
        }
        // onChangestatus(e){
        //     console.log(e)
        //     // this.setState({changeStatus:e.target.value})

        // }

    }, {
        key: 'handleOperatorSelect',
        value: function handleOperatorSelect(e) {
            var operatorValue = this.state.operatorValue;

            console.log(e);
            operatorValue += e;
            this.setState({ operatorValue: operatorValue });
        }
    }, {
        key: 'onChangearea',
        value: function onChangearea(e) {
            console.log(e.target.value);
            this.setState({ operatorValue: e.target.value });
        }
    }, {
        key: 'handChange',
        value: function handChange(value) {
            console.log(value);
        }
    }, {
        key: 'changeFiltertype',
        value: function changeFiltertype(value) {
            console.log(value);
            console.log(this.fromModel);
            switch (value) {
                case '1':
                    this.setState({ isShow: true });
                    break;
            }
        }
    }, {
        key: 'getValue',
        value: function getValue(Value) {
            console.log('value', Value);
        }
    }, {
        key: 'getFilterControl',
        value: function getFilterControl() {
            var _this10 = this;

            var TextArea = _antd.Input.TextArea;

            var classname = 'error_info';
            var _state = this.state,
                filterName = _state.filterName,
                changeStatus = _state.changeStatus,
                errorInfo = _state.errorInfo,
                operatorValue = _state.operatorValue,
                isShow = _state.isShow;
            // let ChooseRadio = this.chooseRadio();

            var addDefinedName = _react2.default.createElement(_antd.Input, { className: this.state.nameErrInfo ? classname : null, value: filterName, placeholder: '\u8BF7\u8F93\u5165', onChange: function onChange(e) {
                    return _this10.onNameChange(e);
                } });
            var operatorCom = _react2.default.createElement(Operator, { onClick: function onClick(e) {
                    return _this10.handleOperatorSelect(e);
                } });
            // const controlRadio = <SelectRadio stopstatus={changeStatus} onChange={(e)=>this.onChangestatus(e)}/>
            var addDefinedCondition = _react2.default.createElement(TextArea, { className: errorInfo ? classname : 'subscribe_condition_inputArea', rows: 3, onChange: function onChange(e) {
                    return _this10.onChangearea(e);
                }, value: operatorValue });
            var compareMark = _react2.default.createElement(Comparemark, { onChange: function onChange(value) {
                    return _this10.handChange(value);
                } });
            var filterType = _react2.default.createElement(FilterType, { onChange: function onChange(value) {
                    return _this10.changeFiltertype(value);
                } });
            var referInput = _react2.default.createElement(ReferInput, { model: this.fromModel, getValue: function getValue(Value) {
                    return _this10.getValue(Value);
                } });
            var referId = isShow ? _react2.default.createElement(
                'div',
                { className: 'referInput_id' },
                this.getControl(referInput, '参照ID', true),
                this.state.nameErrInfo ? _react2.default.createElement(
                    'div',
                    { className: 'error' },
                    this.state.nameErrInfo
                ) : null
            ) : null;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'add_definedname' },
                    this.getControl(addDefinedName, '订阅名称', true),
                    this.state.nameErrInfo ? _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        this.state.nameErrInfo
                    ) : null
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'operator' },
                    this.getControl(operatorCom, '运算符')
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'subscribe_condition' },
                    this.getControl(addDefinedCondition, '过滤表达式', true),
                    errorInfo ? _react2.default.createElement(
                        'label',
                        { className: 'error' },
                        errorInfo
                    ) : null
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'compareMark' },
                    this.getControl(compareMark, '比较符', true)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'filterType' },
                    this.getControl(filterType, '过滤类型', true)
                ),
                referId
            );
        }
    }]);

    return addDefineditem;
}(_react2.default.Component);

exports.default = addDefineditem;