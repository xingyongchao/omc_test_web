'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _antd.Select.Option;
var Search = _antd.Input.Search;

var ListRefer = function (_Component) {
    _inherits(ListRefer, _Component);

    function ListRefer(props) {
        _classCallCheck(this, ListRefer);

        var _this = _possibleConstructorReturn(this, (ListRefer.__proto__ || Object.getPrototypeOf(ListRefer)).call(this, props));

        _this.getModel = function () {
            return _this.props.model || _this.model;
        };

        _this.open = function (e) {
            _this.referViewModel = e.vm;
            _this.gridModel = e.vm.get('table');
            _this.gridModel.addListener(_this);
            if (typeof _this.props.afterOkClick === 'function') _this.referViewModel.on('afterOkClick', _this.props.afterOkClick);
        };

        _this.setValue = function (value) {
            _this.setState({ value: value });
        };

        _this.setDataSource = function (dataSource) {
            _this.setState({ dataSource: dataSource });
            var dataStatus = _this.state.dataStatus;
            if (_this.state.multiple) {
                if (!dataStatus || dataStatus == {}) {
                    dataSource.map(function (ele, index) {
                        dataStatus[ele.id] = { name: ele.name, checked: false, index: index };
                    });
                } else {
                    dataSource.map(function (ele, index) {
                        if (!dataStatus[ele.id]) {
                            dataStatus[ele.id] = { name: ele.name, checked: false, index: index };
                        }
                    });
                }
                _this.setState({ dataStatus: dataStatus });
            }
        };

        _this.handleClick = function () {
            if (_this.hasClicked) return;
            _this.hasClicked = true;
            _this.onClick();
        };

        _this.onClick = function () {
            var model = _this.getModel();
            if (!model && _this.props.cRefType) {
                _this.model = new cb.models.ReferModel({ cRefType: _this.props.cRefType, multiple: _this.props.multiple, isList: _this.props.isList ? true : false, value: _this.props.value });
                _this.model.addListener(_this);
            }
            model = _this.getModel();
            if (model && model.browse) model.browse(true);
        };

        _this.handleJointQuery = function () {
            var model = _this.getModel();
            if (!model && _this.props.cRefType) {
                _this.model = new cb.models.ReferModel({ cRefType: _this.props.cRefType, multiple: _this.props.multiple, isList: _this.props.isList ? true : false, value: _this.props.value });
                _this.model.addListener(_this);
            }
            model = _this.getModel();
            if (model) model.fireEvent('jointQuery');
        };

        _this.onChange = function (e, value) {
            var titleField = _this.state.textField || 'name';
            var index = _this.state.dataSource.findIndex(function (item) {
                return item[titleField] === value;
            });
            var referValue = void 0;
            if (value == null) {
                referValue = value;
            } else {
                _this.gridModel.select([index]);
                referValue = _this.gridModel.getSelectedRows();
            }
            _this.referViewModel.execute('afterOkClick', referValue);
            _this.setState({ showPop: false });
        };

        _this.onButtonClick = function (e, type) {
            var _this$state = _this.state,
                checkedKeys = _this$state.checkedKeys,
                dataSource = _this$state.dataSource;

            var rows = [];
            if (type == 'submit') {
                checkedKeys.map(function (ele) {
                    rows.push(dataSource[ele]);
                }, _this);
                _this.referViewModel.execute('afterOkClick', rows);
            }
            _this.setState({ showPop: false });
            var model = _this.getModel();
            model.execute('blur');
        };

        _this.onChecked = function (e, id) {
            var _this$state2 = _this.state,
                dataStatus = _this$state2.dataStatus,
                checkedKeys = _this$state2.checkedKeys;

            var checked = e.target.checked;
            dataStatus[id].checked = checked;
            if (checked) {
                checkedKeys.push(dataStatus[id].index);
            } else {
                checkedKeys = [];
                for (var key in dataStatus) {
                    if (dataStatus[key].checked) {
                        checkedKeys.push(dataStatus[key].index);
                    }
                }
            }
            _this.setState({ dataStatus: dataStatus, checkedKeys: checkedKeys });
        };

        _this.onPopClick = function () {
            var disabled = _this.state.disabled;
            if (disabled) return;
            _this.setState({ showPop: !_this.state.showPop });
        };

        _this.onVisibleChange = function (visible) {
            var disabled = _this.state.disabled;
            if (disabled) return;
            _this.setState({ showPop: visible });
            if (!visible) {
                var model = _this.getModel();
                model.execute('blur');
            }
        };

        _this.onSearchChange = function (e) {
            var value = e.target.value;
            _this.setState({ searchValue: value });
        };

        _this.getPopContent = function (data) {
            var _this$state3 = _this.state,
                multiple = _this$state3.multiple,
                disabled = _this$state3.disabled,
                value = _this$state3.value,
                showPop = _this$state3.showPop,
                dataStatus = _this$state3.dataStatus,
                searchValue = _this$state3.searchValue,
                checkedKeys = _this$state3.checkedKeys;

            var controls = [];
            var loopData = data;
            if (searchValue != '') {
                loopData = [];
                data.map(function (ele) {
                    if (ele.name.indexOf(searchValue) > -1) {
                        loopData.push(ele);
                    }
                });
            }
            if (loopData.length <= 0) {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(Search, { value: searchValue, onChange: _this.onSearchChange }),
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u554A\u54E6~\u6CA1\u6709\u641C\u7D22\u5230~'
                    )
                );
            }
            loopData.map(function (ele) {
                var _this2 = this;

                if (!multiple) {
                    controls.push(_react2.default.createElement(
                        'li',
                        { onClick: function onClick(e) {
                                return _this2.onChange(e, ele.name);
                            } },
                        ele.name
                    ));
                } else {
                    var checked = dataStatus[ele.id] ? dataStatus[ele.id].checked : false;
                    controls.push(_react2.default.createElement(
                        _antd.Checkbox,
                        { checked: checked, key: ele.id, onChange: function onChange(e) {
                                return _this2.onChecked(e, ele.id);
                            } },
                        ele.name
                    ));
                }
            }, _this);
            if (!multiple) {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(Search, { value: searchValue, onChange: _this.onSearchChange }),
                    _react2.default.createElement(
                        'ul',
                        null,
                        controls
                    )
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    { className: 'listRefer' },
                    _react2.default.createElement(Search, { value: searchValue, onChange: _this.onSearchChange }),
                    controls,
                    _react2.default.createElement(
                        'div',
                        { className: 'filter-btn-1' },
                        _react2.default.createElement(
                            _antd.Button,
                            { className: 'ant-btn-sm', type: 'primary', onClick: function onClick(e) {
                                    return _this.onButtonClick(e, 'submit');
                                } },
                            '\u786E\u5B9A'
                        ),
                        _react2.default.createElement(
                            _antd.Button,
                            { className: 'ant-btn-sm', type: 'default', onClick: function onClick(e) {
                                    return _this.onButtonClick(e, 'cancel');
                                } },
                            '\u53D6\u6D88'
                        )
                    )
                );
            }
        };

        _this.getListRefer = function () {
            var _this$state4 = _this.state,
                multiple = _this$state4.multiple,
                disabled = _this$state4.disabled,
                value = _this$state4.value,
                showPop = _this$state4.showPop;

            var contentClass = "",
                showClear = false,
                selectionControl = null;
            if (value && value != "") {
                selectionControl = _react2.default.createElement(
                    'span',
                    { className: 'ant-select-selection-selected-value' },
                    value
                );
                showClear = true;
            } else {
                selectionControl = _react2.default.createElement('span', { className: 'ant-select-selection__placeholder' });
            }
            if (disabled) {
                contentClass = "ant-select ant-select-disabled  ant-select-allow-clear";
            } else {
                contentClass = "ant-select ant-select-enabled ant-select-allow-clear";
            }
            if (showPop) contentClass = contentClass + '  ant-select-open ant-select-focused';
            return _react2.default.createElement(
                'span',
                { onClick: _this.onClick, className: contentClass },
                _react2.default.createElement(
                    'span',
                    { className: 'uretail-treerefer-selection ant-select-selection ant-select-selection--single', role: 'combobox', 'aria-autocomplete': 'list', 'aria-haspopup': 'true', tabindex: '0', 'aria-expanded': 'false' },
                    _react2.default.createElement(
                        'span',
                        { className: 'ant-select-selection__rendered' },
                        selectionControl
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'ant-select-arrow', style: { outline: 'none' } },
                        _react2.default.createElement('b', null)
                    )
                )
            );
        };

        _this.baseControl = function () {
            var baseControl = null;
            if (_this.state.readOnly) {
                baseControl = (0, _text2.default)(_this.state.value);
            } else {
                var dataSource = _this.state.dataSource || [];
                var _this$state5 = _this.state,
                    titleField = _this$state5.titleField,
                    keyField = _this$state5.keyField,
                    multiple = _this$state5.multiple,
                    disabled = _this$state5.disabled,
                    showPop = _this$state5.showPop;


                var index = dataSource.findIndex(function (item) {
                    return item[titleField] === _this.state.value;
                });
                // if (index === -1) {
                //     value = this.state.value;
                // } else {
                //     value = value.toString();
                // }
                // const loop = data => data.map((item, index) => {
                //     return <Option value={index.toString()}>{item[titleField]}</Option>
                // });
                // const optionNodes = loop(dataSource);
                var popContent = _this.getPopContent(dataSource);
                var control = _this.getListRefer();
                baseControl =
                // <Select
                //     onFocus={() => this.handleClick()}
                //     value={value}
                //     allowClear
                //     onChange={value => this.onChange(value)}
                // >{optionNodes}</Select>
                _react2.default.createElement(
                    _antd.Popover,
                    { visible: showPop, overlayClassName: 'uretail-pop', content: popContent,
                        trigger: 'click', placement: 'bottom',
                        onClick: _this.onPopClick, onVisibleChange: _this.onVisibleChange },
                    control
                );
            }
            return baseControl;
        };

        _this.state = {
            bIsNull: props.bIsNull,
            showPop: false,
            dataStatus: {},
            checkedKeys: [],
            searchValue: ''
        };
        return _this;
    }

    _createClass(ListRefer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.model) this.props.model.addListener(this);
            if (this.props.focus) this.refs.input.refs.input.focus();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var model = this.getModel();
            if (model) model.removeListener(this);
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
                if (this.props.model) {
                    this.props.model.removeListener(this);
                }
            }
        }
        /*multiple下选中事件*/

        /*pop点击事件*/

        /*pop状态改变*/

        /*搜索框改变*/


        /*组织pop数据*/

    }, {
        key: 'getControl',
        value: function getControl() {
            var _this3 = this;

            var _props = this.props,
                bJointQuery = _props.bJointQuery,
                cShowCaption = _props.cShowCaption;

            var title = bJointQuery ? _react2.default.createElement(
                'a',
                { onClick: function onClick(e) {
                        return _this3.handleJointQuery(e);
                    } },
                cShowCaption
            ) : cShowCaption;
            title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement(_antd.Icon, { type: 'star' }),
                title
            ) : _react2.default.createElement(
                'label',
                null,
                title
            );
            var control = cShowCaption ? _react2.default.createElement(_label2.default, { control: this.baseControl(), title: title }) : this.baseControl();
            return control;
        }
    }, {
        key: 'render',
        value: function render() {
            var control = this.getControl();
            return control;
        }
    }]);

    return ListRefer;
}(_react.Component);

exports.default = ListRefer;