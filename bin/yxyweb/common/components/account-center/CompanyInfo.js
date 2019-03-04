'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _basic = require('../basic');

var _antd = require('antd');

var _cookiesJs = require('cookies-js');

var _cookiesJs2 = _interopRequireDefault(_cookiesJs);

var _UploadFace = require('./UploadFace');

var _UploadFace2 = _interopRequireDefault(_UploadFace);

var _systemSetting = require('../../redux/systemSetting');

var systemSettingactions = _interopRequireWildcard(_systemSetting);

var _tabs = require('../../redux/tabs');

var tabsactions = _interopRequireWildcard(_tabs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompanyInfoControl = function (_Component) {
    _inherits(CompanyInfoControl, _Component);

    function CompanyInfoControl(props) {
        _classCallCheck(this, CompanyInfoControl);

        var _this = _possibleConstructorReturn(this, (CompanyInfoControl.__proto__ || Object.getPrototypeOf(CompanyInfoControl)).call(this, props));

        _this.state = {
            dataSource: {},
            oldName: ''
        };
        _this.treeModel = new cb.models.TreeModel({ dataSourceMode: 'a', keyField: 'id', titleField: 'name' });
        _this.industryOptions = [];
        return _this;
    }

    _createClass(CompanyInfoControl, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var proxy = cb.rest.DynamicProxy.create({
                getDetail: {
                    url: '/tenant/find.do',
                    method: 'GET',
                    options: { token: true }
                },
                getIndustry: {
                    url: 'enum/getEnumMap',
                    method: 'GET',
                    options: { token: true }
                }
            });
            proxy.getIndustry({ enumtype: 'aa_tradetype' }, function (err, result) {
                if (err) {
                    console.error(err.message);
                    cb.utils.alert(err.message, 'error');
                    return;
                }
                this.getIndustryOptions(result);
                proxy.getDetail({}, function (err, result) {
                    if (err) {
                        console.error(err.message);
                        cb.utils.alert(err.message, 'error');
                        return;
                    }
                    this.props.systemSettingactions.companyInfoMerge({ hasOpenUdh: result.isOpenUdh });
                    this.setState({ dataSource: result, oldName: result.name });
                    this.treeModel.setDataSource({ url: '/region/getAllregion', method: 'POST' });
                    this.treeModel.on('afterSetDataSource', function (data) {
                        var rCode = self.state.dataSource.regionCode;
                        var value = [];
                        var value2 = [];
                        while (rCode != undefined && rCode != "") {
                            value.push(rCode);
                            var nodes = self.treeModel.getNodesByKeys(rCode);;
                            if (nodes != undefined && nodes.length > 0) {
                                rCode = nodes[0].parent;
                            } else {
                                rCode = "";
                            }
                        }
                        if (value.length > 0) {
                            for (var i = 1; i <= value.length; i++) {
                                value2.push(value[value.length - i]);
                            }
                        }
                        self.treeModel.setValue(value2);
                    }, self = this);
                }, this);
            }, this);
        }
    }, {
        key: 'getIndustryOptions',
        value: function getIndustryOptions(data) {
            var arr = [];
            for (var attr in data) {
                arr.push(_react2.default.createElement(
                    _antd.Select.Option,
                    { key: attr },
                    data[attr]
                ));
            }
            this.industryOptions = arr;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var systemSettingactions = this.props.systemSettingactions;

            systemSettingactions.unMount();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var systemSetting = this.props.systemSetting;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'info-content' },
                    _react2.default.createElement(
                        _basic.Row,
                        null,
                        _react2.default.createElement(
                            _basic.Col,
                            { span: 24 },
                            _react2.default.createElement(
                                'div',
                                { className: 'viewSetting viewCell width-percent-100' },
                                _react2.default.createElement(
                                    _basic.Row,
                                    null,
                                    _react2.default.createElement(
                                        _basic.Col,
                                        { className: 'label-control logo-face-label', span: 4 },
                                        _react2.default.createElement(
                                            'label',
                                            null,
                                            '\u4F01\u4E1ALOGO'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        _basic.Col,
                                        { className: 'input-control', span: 16 },
                                        _react2.default.createElement(
                                            _basic.Row,
                                            { className: 'face-img companyInfo-logo-img' },
                                            _react2.default.createElement(_UploadFace2.default, {
                                                class_name: 'face-img companyInfo-logo-img',
                                                toolClass: 'info-person',
                                                imgUrl: systemSetting.logo ? systemSetting.logo : this.state.dataSource.logo,
                                                imageChange: function imageChange(url) {
                                                    return _this2.logoChange(url, 'logo');
                                                }
                                            }),
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                '\u4EC5\u652F\u6301JPG\u3001JPEG\u3001BMP\u3001PNG\u683C\u5F0F\uFF0C\u6587\u4EF6\u5C0F\u4E8E1M\uFF08\u5EFA\u8BAE\u6700\u4F73\u5C3A\u5BF8144*60px\uFF09'
                                            )
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'viewSetting viewCell width-percent-100' },
                                _react2.default.createElement(_basic.Input, { ref: 'err', err: systemSetting.nameErrMsg ? 'has-error' : null, defaultValue: this.state.dataSource.name, onBlur: function onBlur(value) {
                                        return _this2.handleInputBlur("name", value, true);
                                    }, onChange: function onChange(value) {
                                        return _this2.onTaxChange(value);
                                    }, placeholder: '\u8BF7\u8F93\u5165\u516C\u53F8\u540D\u79F0', cShowCaption: '\u516C\u53F8\u540D\u79F0', bIsNull: false })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'viewSetting viewCell width-percent-100' },
                                _react2.default.createElement(_basic.Input, { defaultValue: systemSetting.taxId ? systemSetting.taxId : this.state.dataSource.taxId, onBlur: function onBlur(value) {
                                        return _this2.handleInputBlur("taxId", value);
                                    }, placeholder: '\u8BF7\u8F93\u5165\u7EB3\u7A0E\u4EBA\u8BC6\u522B\u53F7', cShowCaption: '\u7EB3\u7A0E\u4EBA\u8BC6\u522B\u53F7' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'viewSetting viewCell width-percent-100' },
                                _react2.default.createElement(_basic.Input, { ref: 'err', err: systemSetting.nameErrMsg ? 'has-error' : null, defaultValue: this.state.dataSource.alias, onBlur: function onBlur(value) {
                                        return _this2.handleInputBlur("alias", value, true);
                                    }, placeholder: '\u8BF7\u8F93\u5165\u522B\u540D\u4EE3\u7801', cShowCaption: '\u522B\u540D\u4EE3\u7801', disabled: true, bIsNull: false })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'viewSetting viewCell width-percent-100' },
                                _react2.default.createElement(_basic.Input, { ref: 'err', err: systemSetting.phoneErrMsg ? 'has-error' : null, defaultValue: this.state.dataSource.phone, onBlur: function onBlur(value) {
                                        return _this2.handleInputBlur("phone", value, true);
                                    }, bIsNull: false, placeholder: '\u8BF7\u8F93\u5165\u8054\u7CFB\u4EBA\u7535\u8BDD', cShowCaption: '\u8054\u7CFB\u4EBA\u7535\u8BDD' }),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'err-info' },
                                    systemSetting.phoneErrMsg ? '请填写正确的电话号码' : ''
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'viewSetting viewCell width-percent-100' },
                                _react2.default.createElement(_basic.Input, { ref: 'err', err: systemSetting.emailErrMsg ? 'has-error' : null, defaultValue: this.state.dataSource.email, onBlur: function onBlur(value) {
                                        return _this2.handleInputBlur("email", value, true);
                                    }, placeholder: '\u8BF7\u8F93\u5165\u516C\u53F8\u90AE\u7BB1', cShowCaption: '\u516C\u53F8\u90AE\u7BB1', bIsNull: false }),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'err-info' },
                                    systemSetting.emailErrMsg ? '请填写正确的邮箱号' : ''
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'viewSetting viewCell width-percent-100' },
                                _react2.default.createElement(_basic.Input, { defaultValue: this.state.dataSource.fax, onBlur: function onBlur(value) {
                                        return _this2.handleInputBlur("fax", value);
                                    }, placeholder: '\u8BF7\u8F93\u5165\u516C\u53F8\u4F20\u771F', cShowCaption: '\u516C\u53F8\u4F20\u771F' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'viewSetting viewCell width-percent-100' },
                                _react2.default.createElement(_basic.Input, { defaultValue: this.state.dataSource.website, onBlur: function onBlur(value) {
                                        return _this2.handleInputBlur("website", value);
                                    }, placeholder: '\u8BF7\u8F93\u5165\u516C\u53F8\u7F51\u5740', cShowCaption: '\u516C\u53F8\u7F51\u5740' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'viewSetting viewCell width-percent-100' },
                                _react2.default.createElement(_basic.Label, { control: _react2.default.createElement(
                                        _antd.Select,
                                        { disabled: true, value: this.state.dataSource.industry != undefined ? this.state.dataSource.industry.toString() : '', onChange: function onChange(key) {
                                                return _this2.handleIndustryChange(key);
                                            }, placeholder: '\u8BF7\u8F93\u5165\u884C\u4E1A', cShowCaption: '\u6240\u5C5E\u884C\u4E1A' },
                                        this.industryOptions ? this.industryOptions : null
                                    ), title: '\u6240\u5C5E\u884C\u4E1A' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'viewSetting viewCell width-percent-100' },
                                _react2.default.createElement(_basic.Cascader, { cShowCaption: '\u6240\u5728\u5730\u533A', ref: 'regionCode', model: this.treeModel })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'viewSetting viewCell width-percent-100' },
                                _react2.default.createElement(_basic.Input, { cStyle: '{"type":"textarea","rows":3}', defaultValue: this.state.dataSource.address, onBlur: function onBlur(value) {
                                        return _this2.handleInputBlur("address", value, false);
                                    }, placeholder: '\u8BF7\u8F93\u5165\u8BE6\u7EC6\u5730\u5740', cShowCaption: '\u8BE6\u7EC6\u5730\u5740' })
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'ant-row-flex ant-row-flex-start btn-toolbar-bottom btn-group-bottom bottom-toolbar' },
                    _react2.default.createElement(
                        _basic.Row,
                        { colCount: 12 },
                        _react2.default.createElement(
                            _antd.Button,
                            { type: 'primary', className: 'm-l-148', onClick: function onClick() {
                                    return _this2.handleSaveClick();
                                } },
                            '\u4FDD\u5B58'
                        ),
                        _react2.default.createElement(
                            _antd.Button,
                            { type: 'default', className: 'm-l-10', onClick: function onClick() {
                                    return _this2.handleCancelClick();
                                } },
                            '\u53D6\u6D88'
                        )
                    )
                )
            );
        }
    }, {
        key: 'logoChange',
        value: function logoChange(url, type) {
            var systemSettingactions = this.props.systemSettingactions;

            var obj = {};
            obj[type] = url;
            systemSettingactions.companyInfoMerge(obj);
        }
    }, {
        key: 'onTaxChange',
        value: function onTaxChange(value) {
            var dataSource = this.state.dataSource;

            this.props.systemSettingactions.companyInfoMerge({ taxId: '' });
            dataSource.taxId = '';
            dataSource.name = value;
            this.setState({ dataSource: dataSource });
        }
    }, {
        key: 'handleIndustryChange',
        value: function handleIndustryChange(key) {
            var dataSource = this.state.dataSource;
            dataSource.industry = key;
            this.setState(dataSource);
        }
    }, {
        key: 'mapValueChange',
        value: function mapValueChange(type, value) {
            var referDataSource = this.state.dataSource;
            referDataSource[type] = value[0].id;
            this.setState(referDataSource);
        }
    }, {
        key: 'handleInputBlur',
        value: function handleInputBlur(flag, value, isStar) {
            var _props = this.props,
                systemSettingactions = _props.systemSettingactions,
                systemSetting = _props.systemSetting;

            var pattern = /^1[3|4|5|7|8][0-9]{9}$/;
            var dataSource = this.state.dataSource;
            var flagErrMsg = flag + 'ErrMsg';
            var middle = {};
            dataSource[flag] = value;
            if (isStar === true) {
                if (value) {
                    middle[flagErrMsg] = false;
                    systemSettingactions.companyInfoMerge(middle);
                } else {
                    middle[flagErrMsg] = true;
                    systemSettingactions.companyInfoMerge(middle); //发送错误标志的信息
                    // cb.utils.alert('该选型为必填项，请填写！', 'warning');
                }
            }
            if (flag == 'phone') {
                if (value) {
                    if (pattern.test(value)) {
                        middle[flagErrMsg] = false;
                        systemSettingactions.companyInfoMerge(middle);
                    } else {
                        middle[flagErrMsg] = true;
                        systemSettingactions.companyInfoMerge(middle); //发送错误标志的信息
                        // cb.utils.alert('请填写正确的电话号码！', 'warning');
                    }
                }
            }
            if (flag === 'email') {
                if (value) {
                    if (/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)) {
                        middle[flagErrMsg] = false;
                        systemSettingactions.companyInfoMerge(middle);
                    } else {
                        middle[flagErrMsg] = true;
                        systemSettingactions.companyInfoMerge(middle); //发送错误标志的信息
                        // cb.utils.alert('请填写正确的邮箱！', 'warning');
                    }
                }
            }
            if (flag === 'name') {
                if (this.state.oldName === value) return; //避免重复查
                this.props.systemSettingactions.getTaxNo(value);
                this.setState({ oldName: value });
            }
            this.setState({ dataSource: dataSource });
        }
    }, {
        key: 'handleCancelClick',
        value: function handleCancelClick() {
            this.props.tabsactions.deleteItem('AA0001');
        }
    }, {
        key: 'handleSaveClick',
        value: function handleSaveClick() {
            var systemSetting = this.props.systemSetting;

            var isOpen = true;
            var dataSource = this.state.dataSource;
            var mustOptions = [dataSource.alias, dataSource.name, dataSource.phone, dataSource.email];
            var regionValue = this.treeModel.getValue();
            //错误标记
            mustOptions.forEach(function (value) {
                if (value === null || value === '') {
                    isOpen = false;
                }
            });
            if (!isOpen) {
                cb.utils.alert('存在为必填项，请填写！', 'error');
                return;
            }
            if (systemSetting.logo) this.state.dataSource.logo = systemSetting.logo;
            if (systemSetting.bizLogo) this.state.dataSource.bizLogo = systemSetting.bizLogo;
            if (systemSetting.taxId) this.state.dataSource.taxId = systemSetting.taxId;
            this.state.dataSource.pubts = null;
            if (regionValue) this.state.dataSource.regionCode = regionValue[regionValue.length - 1];
            this.saveData(this.state.dataSource);
        }
    }, {
        key: 'saveData',
        value: function saveData(data) {
            var saveLogo = this.state.dataSource.logo,
                saveBizLogo = this.state.dataSource.bizLogo;
            var _props2 = this.props,
                systemSettingactions = _props2.systemSettingactions,
                systemSetting = _props2.systemSetting;

            var proxy = cb.rest.DynamicProxy.create({
                save: {
                    url: '/tenant/save.do',
                    method: 'POST',
                    options: { token: true }
                }
            });
            proxy.save(data, function (err, result) {
                if (err) {
                    console.error(err.message);
                    cb.utils.alert('存在为必填项，请填写！', 'error');
                    return;
                }
                cb.utils.alert('保存成功！', 'success');
                // const user = JSON.parse(Cookies.get('user'));
                // user.logo = data.logo;
                // const expires = new Date(Date.now() + 24 * 3600 * 1000)
                // Cookies.set('user', JSON.stringify(user), {
                //     path: '/',
                //     expires
                // });
                systemSettingactions.passLogo({ logo: saveLogo, bizLogo: saveBizLogo });
            });
        }
    }]);

    return CompanyInfoControl;
}(_react.Component);

function mapStateToProps(state) {
    return {
        systemSetting: state.systemSetting.toJS()
    };
}

function mapDispatchToProps(dispatch) {
    return {
        systemSettingactions: (0, _redux.bindActionCreators)(systemSettingactions, dispatch),
        tabsactions: (0, _redux.bindActionCreators)(tabsactions, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CompanyInfoControl);