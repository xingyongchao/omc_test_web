'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _indexedDB = require('../../redux/indexedDB');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SavedraftMessage = function (_Component) {
    _inherits(SavedraftMessage, _Component);

    function SavedraftMessage(props) {
        _classCallCheck(this, SavedraftMessage);

        var timeData = (0, _moment2.default)();
        var InpuTime = (0, _moment2.default)(timeData).format('YYYY-MM-DD HHmmss');
        var _timeData = (0, _moment2.default)(timeData).valueOf();

        var _this = _possibleConstructorReturn(this, (SavedraftMessage.__proto__ || Object.getPrototypeOf(SavedraftMessage)).call(this, props));

        _initialiseProps.call(_this);

        var model = _this.props.model;

        var data = model.collectData();
        var userId = cb.rest.AppContext.user.id;
        var billNo = model.getParams().billNo;
        var caption = model.getParams().caption;
        var keyValue = model.getCache('draftInfo');
        var status = model.getParams().mode;
        var draftName = caption + '草稿' + '    ' + InpuTime;
        _this.state = {
            showName: false,
            data: data,
            userId: userId,
            billNo: billNo,
            caption: caption,
            cacheData: [],
            copyTime: _timeData,
            keyValue: keyValue,
            draftName: draftName,
            status: status
        };
        return _this;
    }

    _createClass(SavedraftMessage, [{
        key: 'render',
        value: function render() {
            var _state = this.state,
                draftName = _state.draftName,
                showName = _state.showName;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _antd.Modal,
                    { className: 'savedraft_modal', title: '\u4FDD\u5B58\u8349\u7A3F', visible: true, onOk: this.onok, onCancel: this.onCancel, maskClosable: false, okText: '\u786E\u5B9A', cancelText: '\u53D6\u6D88' },
                    _react2.default.createElement(
                        _antd.Row,
                        null,
                        _react2.default.createElement(
                            _antd.Col,
                            { span: 1, className: "savedraft_title" },
                            '\u8349\u7A3F\u540D\u79F0'
                        ),
                        _react2.default.createElement(
                            _antd.Col,
                            { span: 4 },
                            _react2.default.createElement(_antd.Input, { type: 'text', className: "savedraft_name", value: draftName, onChange: this.InputValue })
                        )
                    ),
                    _react2.default.createElement(
                        _antd.Row,
                        null,
                        _react2.default.createElement(
                            'span',
                            { style: { display: showName == true ? 'inline' : 'none' }, className: 'draft_name' },
                            '\u4E0D\u80FD\u4E3A\u7A7A'
                        )
                    )
                )
            );
        }
    }]);

    return SavedraftMessage;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.InputValue = function (e) {
        var changeName = "";
        changeName = e.target.value;
        console.log(' changeName', changeName);
        _this2.setState({ draftName: changeName });
    };

    this.saveBillnodata = function () {
        var self = _this2;
        var putDraftname = _this2.state.draftName;
        if (putDraftname) {
            var options = { dbTableName: 'billNodata' };
            (0, _indexedDB.IDB_searchData)(options).then(function (dbData) {
                _this2.viewmodel = self.props.model;
                var _state2 = _this2.state,
                    data = _state2.data,
                    userId = _state2.userId,
                    billNo = _state2.billNo,
                    status = _state2.status,
                    copyTime = _state2.copyTime,
                    keyValue = _state2.keyValue,
                    draftName = _state2.draftName;

                var draftKey = userId + '_' + billNo + '_' + copyTime;
                var checkKey = userId + '_' + billNo;

                var condition = { draftName: draftName, attrKey: draftKey, copyTime: copyTime, checkKey: checkKey, savedraftstate: status };
                var cacheObj = Object.assign(data, condition);
                if (keyValue) {
                    var _index = _lodash2.default.findIndex(dbData, function (obj) {
                        return obj.attrKey === keyValue.attrKey;
                    });
                    if (_index > -1) {
                        var key = dbData[_index].attrKey;
                        var _options = { id: key, dbTableName: 'billNodata' };
                        (0, _indexedDB.IDB_deleteOneData)(_options).then(function (result) {
                            (0, _indexedDB.IDB_saveData)(cacheObj, 'billNodata').then(function (result) {
                                cb.utils.alert('保存成功', 'success');_this2.viewmodel.communication({ type: 'return' });
                            }).catch(function (e) {
                                cb.utils.alert('缓存数据失败！', 'error');
                            });
                        });
                    }
                } else {
                    (0, _indexedDB.IDB_saveData)(cacheObj, 'billNodata').then(function (result) {
                        cb.utils.alert('保存成功', 'success');_this2.viewmodel.communication({ type: 'return' });
                    }).catch(function (e) {
                        cb.utils.alert('缓存数据失败！', 'error');
                    });
                }
                _this2.props.close();
            }).catch(function (e) {
                return console.error(e.message);
            });
        } else {
            _this2.setState({ showName: true });
        }
    };

    this.onok = function (e) {
        return (0, _indexedDB.openDB)('off-lineDB', 2, ['billNodata']).then(function (result) {
            if (result) _this2.saveBillnodata();else cb.utils.alert('打开数据库失败，缓存功能不可用！', 'error');
        }).catch(function (e) {
            console.error(e);
        });
    };

    this.onCancel = function (e) {
        _this2.props.close();
    };
};

exports.default = SavedraftMessage;