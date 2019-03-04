'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _BasicComponents = require('../BasicComponents');

var BaseComponents = _interopRequireWildcard(_BasicComponents);

var _antdMobile = require('antd-mobile');

var _NavBar = require('../NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicComponentsMap = {};
var cacheRowData = {};
for (var attr in BaseComponents) {
    BasicComponentsMap[attr.toLocaleLowerCase()] = BaseComponents[attr];
}
var DetailItemInfo = function (_Component) {
    _inherits(DetailItemInfo, _Component);

    function DetailItemInfo(props) {
        _classCallCheck(this, DetailItemInfo);

        var _this = _possibleConstructorReturn(this, (DetailItemInfo.__proto__ || Object.getPrototypeOf(DetailItemInfo)).call(this, props));

        _this.initMeta = function () {
            if (!_this.metavm) return;
            if (!_this.metavm.containers) return;
            var itemInfo = null;
            _this.metavm.containers.map(function (container) {
                if (container.cControlType == 'view') {
                    container && container.containers.map(function (item) {
                        if (item.cControlType == 'VoucherDetail') itemInfo = item;
                    });
                }
            });

            itemInfo.containers.map(function (item) {
                var cGroupCode = item.cGroupCode,
                    cControlType = item.cControlType,
                    controls = item.controls,
                    childrenField = item.childrenField;

                _this.rowItem = item;
                if (cGroupCode === 'BaseItem') {
                    _this.baseItemMeta = item;
                    if (cControlType === 'table') {
                        _this.baseControl = controls;
                        _this.gridModel = _this.vm.get(childrenField);
                        _this.readOnly = _this.gridModel.getReadOnly();
                        cacheRowData = _lodash2.default.cloneDeep(_this.gridModel.getRow(_this.state.itemIndex));
                    }
                }
            });
        };

        _this.getControls = function () {
            if (!_this.baseControl || !_this.gridModel) return;
            var controls = [];
            _this.baseControl.map(function (item) {
                var Component = BasicComponentsMap[item.cControlType.toLocaleLowerCase()];
                controls.push(_react2.default.createElement(Component, { viewMeta: item, rowItem: _this.rowItem, rowModel: _this.gridModel.getEditRowModel(), model: _this.gridModel.getEditRowModel().get(item.cItemName) }));
            });
            return controls;
        };

        _this.getContainers = function () {
            if (!_this.baseItemMeta || !_this.baseItemMeta.containers || !Array.isArray(_this.baseItemMeta.containers)) return;
            var controls = [];
            _this.baseItemMeta.containers.map(function (item) {
                if (item.cControlType === 'hiddenContainer' && item.cGroupCode === 'st_demand_photo_m') {
                    console.log(_this.gridModel.getEditRowModel().get(item.cGroupCode));
                    var _Component2 = BasicComponentsMap['attachment'];
                    controls.push(_react2.default.createElement(_Component2, { vmmeta: item, model: _this.gridModel.getEditRowModel().get(item.childrenField) }));
                }
            });
            return controls;
        };

        _this.updateItemInfo = function (type) {
            var itemIndex = _this.state.itemIndex;

            var rowCount = _this.gridModel.getRows().length;
            if (rowCount > 1) {
                itemIndex = parseInt(type === 'prev' ? itemIndex > 0 ? parseInt(itemIndex) - 1 : itemIndex : itemIndex < rowCount ? parseInt(itemIndex) + 1 : itemIndex);
                _this.gridModel.setFocusedRowIndex(itemIndex);
                _this.setState({ itemIndex: itemIndex });
            }
        };

        _this.goBack = function () {
            var state = _this.props.location.state;

            if (state && state.action === 'add') {
                _this.gridModel.deleteRows([parseInt(_this.state.itemIndex)]);
            } else {
                _this.gridModel.updateRow(parseInt(_this.state.itemIndex), cacheRowData);
            }
            _this.context.router.history.goBack();
        };

        _this.onOk = function () {
            _this.context.router.history.goBack();
        };

        cb.utils.setStatusBarStyle("dark");
        var parmas = props.match.params;
        _this.state = {
            itemName: parmas.itemName,
            menuId: parmas.menuId,
            itemIndex: parmas.itemIndex
        };
        var _this$state = _this.state,
            menuId = _this$state.menuId,
            itemName = _this$state.itemName;

        var panes = _this.props.portal.tabs[menuId].panes;
        if (panes && Array.isArray(panes)) {
            _this.vm = panes[panes.length - 1].content.vm;
            _this.metavm = panes[panes.length - 1].content.metaData.view;
        }
        _this.initMeta();
        return _this;
    }

    _createClass(DetailItemInfo, [{
        key: 'rightContent',
        value: function rightContent() {
            var _this2 = this;

            var itemIndex = this.state.itemIndex;
            var dataLen = this.gridModel.getRows().length;
            var preDisabled = false,
                nextDisabled = false;
            if (dataLen == 1) {
                preDisabled = true;
                nextDisabled = true;
            } else if (dataLen == itemIndex + 1) {
                nextDisabled = true;
            } else if (itemIndex == 0) {
                preDisabled = true;
            }
            if (dataLen > 1) return _react2.default.createElement(
                'span',
                null,
                preDisabled ? _react2.default.createElement(_antdMobile.Icon, { className: 'button_disabled', type: 'icon-shangyitiao', style: { width: '0.42rem', height: '0.42rem' } }) : _react2.default.createElement(_antdMobile.Icon, { type: 'icon-shangyitiao', onClick: function onClick() {
                        return _this2.updateItemInfo('prev');
                    }, style: { width: '0.42rem', height: '0.42rem' } }),
                nextDisabled ? _react2.default.createElement(_antdMobile.Icon, { className: 'button_disabled', type: 'icon-xiayitiao', style: { width: '0.42rem', height: '0.42rem', marginLeft: '0.3rem' } }) : _react2.default.createElement(_antdMobile.Icon, { type: 'icon-xiayitiao', onClick: function onClick() {
                        return _this2.updateItemInfo('next');
                    }, style: { width: '0.42rem', height: '0.42rem', marginLeft: '0.3rem' } })
            );else return null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { className: 'voucher-header-info ' + (this.readOnly && 'item-info-browser') },
                _react2.default.createElement(_NavBar2.default, { onLeftClick: function onLeftClick() {
                        return _this3.goBack();
                    }, title: "改行", rightContent: this.rightContent() }),
                _react2.default.createElement(
                    _antdMobile.List,
                    { className: 'voucher-header-info-body' },
                    this.getControls(),
                    this.getContainers()
                ),
                this.readOnly ? null : _react2.default.createElement(
                    'div',
                    { className: 'button-fixed-bottom' },
                    _react2.default.createElement(
                        _antdMobile.Button,
                        { type: 'primary', onClick: this.onOk },
                        '\u786E\u5B9A'
                    )
                )
            );
        }
    }]);

    return DetailItemInfo;
}(_react.Component);

DetailItemInfo.contextTypes = {
    router: _propTypes2.default.object.isRequired
};


function mapPropsToState(state) {
    return {
        portal: state.portal.toJS()
    };
}
exports.default = (0, _reactRedux.connect)(mapPropsToState)(DetailItemInfo);