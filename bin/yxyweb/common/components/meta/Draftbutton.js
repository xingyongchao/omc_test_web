'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _indexedDB = require('../../redux/indexedDB');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// let sortDraftdata = [];
var Draftbutton = function (_React$Component) {
    _inherits(Draftbutton, _React$Component);

    function Draftbutton(props) {
        _classCallCheck(this, Draftbutton);

        var _this = _possibleConstructorReturn(this, (Draftbutton.__proto__ || Object.getPrototypeOf(Draftbutton)).call(this, props));

        _this.openIndexdb();
        var controls = _this.props.controls;
        _this.viewModel = props.model.getParent();
        var status = _this.viewModel.getParams().mode;
        var userId = cb.rest.AppContext.user.id;
        var billNo = _this.viewModel.getParams().billNo;
        _this.state = {
            status: status,
            bEnder: false,
            key: null,
            userId: userId,
            billNo: billNo,
            controls: controls,
            sortDraftdata: []
        };
        return _this;
    }

    _createClass(Draftbutton, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.model.addListener(this);
            var _self = this;
            this.viewModel.on('afterSave', function (args) {
                if (args.err == null) {
                    var key = _self.state.key;
                    // let key = this.viewModel.getCache('draftInfo');
                    // let keyValue = key.attrKey

                    _self.deleteDraft(key);
                }
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.model.removeListener(this);
        }
    }, {
        key: 'saveDraftdata',
        value: function saveDraftdata() {}
    }, {
        key: 'setVisible',
        value: function setVisible(visible) {
            this.setState({ visible: visible });
            if (this.props.onVisibleChange) this.props.onVisibleChange(visible);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var draftTag = null;
            var value = this.props.value;
            var _state = this.state,
                status = _state.status,
                sortDraftdata = _state.sortDraftdata;

            console.log(status);
            var menuItem = this.menurender();
            var menu = _react2.default.createElement(
                _antd.Menu,
                { overlayClassName: 'draft_menu' },
                menuItem
            );
            if (status == "add") {
                if (sortDraftdata && sortDraftdata.length > 0) {
                    draftTag = _react2.default.createElement(
                        _antd.Button,
                        { className: 'draft_header' },
                        _react2.default.createElement(_SvgIcon2.default, { type: 'caogaoxiang' }),
                        value
                    );
                } else {
                    draftTag = null;
                }
            }
            if (status == "browse") {
                draftTag = _react2.default.createElement(
                    _antd.Button,
                    { className: 'draf_button  no-border-radius m-l-10 ' },
                    value,
                    ' ',
                    _react2.default.createElement(_antd.Icon, { type: 'down' })
                );
            }
            if (!draftTag) return null;
            return _react2.default.createElement(
                _antd.Dropdown,
                { overlayClassName: 'drop_menu', onVisibleChange: function onVisibleChange() {
                        return _this2.visibleChange();
                    }, overlay: menu, trigger: ['click'] },
                draftTag
            );
        }
    }, {
        key: 'visibleChange',
        value: function visibleChange() {
            this.openIndexdb();
        }
    }, {
        key: 'compare',
        value: function compare(property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value2 - value1;
            };
        }
    }, {
        key: 'gainbillNodata',
        value: function gainbillNodata() {
            var _this3 = this;

            var options = { dbTableName: 'billNodata' };
            (0, _indexedDB.IDB_searchData)(options).then(function (dbData) {
                _this3.renderData(dbData);
            }).catch(function (e) {
                console.error(e.message);return null;
            });
        }
    }, {
        key: 'openIndexdb',
        value: function openIndexdb() {
            var _this4 = this;

            return (0, _indexedDB.openDB)('off-lineDB', 2, ['billNodata']).then(function (result) {
                if (result) {
                    _this4.gainbillNodata();
                } else cb.utils.alert('打开数据库失败，缓存功能不可用！', 'error');
            }).catch(function (e) {
                console.error(e);
            });
        }
    }, {
        key: 'renderData',
        value: function renderData(data) {
            var _state2 = this.state,
                sortDraftdata = _state2.sortDraftdata,
                userId = _state2.userId,
                billNo = _state2.billNo;

            console.log('userId', userId);
            console.log('billNo', billNo);
            var selectValue = userId + '_' + billNo;
            var selectData = [];
            data.forEach(function (ele, index) {
                if (ele.checkKey === selectValue) {
                    selectData.push(ele);
                }
            });
            var sortData = selectData.sort(this.compare('copyTime'));
            sortDraftdata = _lodash2.default.slice(sortData, 0, 15);
            this.setState({ sortDraftdata: sortDraftdata });
        }
    }, {
        key: 'menurender',
        value: function menurender() {
            var menuItem = [];
            var self = this;
            var sortDraftdata = this.state.sortDraftdata;

            if (sortDraftdata && sortDraftdata.length > 0) {
                sortDraftdata.forEach(function (ele, index) {
                    var _this5 = this;

                    var enterShow = ele.isMouseEnter ? _react2.default.createElement(
                        'span',
                        { onClick: function onClick() {
                                return _this5.deleteDraft(ele.attrKey);
                            }, className: 'draft_font' },
                        '\u5220\u9664'
                    ) : _react2.default.createElement('span', null);
                    var Item = _react2.default.createElement(
                        _antd.Menu.Item,
                        { className: "draft_menuItem" + ' ' + (ele.isMouseEnter ? "draft_menuItem_selected" : ""), key: ele.copyTime,
                            onMouseEnter: function onMouseEnter(e) {
                                return self.IsEnterSchemeitem(true, ele.copyTime, sortDraftdata, e);
                            },
                            onMouseLeave: function onMouseLeave(e) {
                                return self.IsEnterSchemeitem(false, ele.copyTime, sortDraftdata, e);
                            } },
                        _react2.default.createElement('input', { className: 'draft_itemName', readOnly: true, style: { border: '0', background: 'transparent' }, onClick: function onClick() {
                                return _this5.enterDetails(ele);
                            }, value: ele.draftName }),
                        enterShow
                    );
                    menuItem.push(Item);
                }, this);
            } else {
                menuItem = _react2.default.createElement(
                    _antd.Menu.Item,
                    { className: 'draft_menuItem' },
                    ' \u6682\u65E0\u6570\u636E'
                );
            }
            return menuItem;
        }
    }, {
        key: 'enterDetails',
        value: function enterDetails(ele) {
            this.viewModel.setCache('draftInfo', { attrKey: ele.attrKey });
            this.viewModel.getParams().mode = 'edit';
            this.viewModel.biz.do('load', this.viewModel, {
                data: ele
            });
            this.setState({ status: "edit", key: ele.attrKey });
        }
    }, {
        key: 'deleteDraft',
        value: function deleteDraft(key) {
            var options = { id: key, dbTableName: 'billNodata' };
            (0, _indexedDB.IDB_deleteOneData)(options).then(function (result) {
                console.log('result', result);cb.utils.alert('删除草稿成功', 'success');
            }).catch(function (e) {
                cb.utils.alert('删除草稿失败！', 'error');console.error(e.message);return null;
            });
            this.setState({ bEnder: true });
        }
    }, {
        key: 'IsEnterSchemeitem',
        value: function IsEnterSchemeitem(bEnder, copyTime, sortData, e) {
            var seft = this;
            sortData.forEach(function (ele, index) {
                if (ele.copyTime == copyTime) {
                    ele.isMouseEnter = bEnder;
                    seft.setState({ bEnder: bEnder });
                }
            });
        }
    }]);

    return Draftbutton;
}(_react2.default.Component);

exports.default = Draftbutton;