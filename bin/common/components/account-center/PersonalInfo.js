'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../../../yxyweb/common/components/basic');

var _UpLoadFace = require('./UpLoadFace');

var _UpLoadFace2 = _interopRequireDefault(_UpLoadFace);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _cookiesJs = require('cookies-js');

var _cookiesJs2 = _interopRequireDefault(_cookiesJs);

var _user = require('../../redux/modules/user');

var accountactions = _interopRequireWildcard(_user);

var _tabs = require('../../../yxyweb/common/redux/tabs');

var tabsactions = _interopRequireWildcard(_tabs);

var _forget = require('../../redux/modules/forget');

var forgetactions = _interopRequireWildcard(_forget);

var _AccountModal = require('./AccountModal');

var _AccountModal2 = _interopRequireDefault(_AccountModal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _antd.Form.Item;

var PersonalInfoControl = function (_Component) {
  _inherits(PersonalInfoControl, _Component);

  function PersonalInfoControl(props) {
    _classCallCheck(this, PersonalInfoControl);

    var _this = _possibleConstructorReturn(this, (PersonalInfoControl.__proto__ || Object.getPrototypeOf(PersonalInfoControl)).call(this, props));

    _this.saveFormValues = function (data) {
      var proxy = cb.rest.DynamicProxy.create({
        save: {
          url: '/user/save',
          method: 'POST',
          options: { token: true }
        }
      });
      proxy.save(data, function (err, result) {
        if (err) {
          console.error(err.message);
          cb.utils.alert(err.message, 'error');
          return;
        }
        cb.utils.alert('保存成功！', 'success');
        // const user = JSON.parse(Cookies.get('user'));
        // user.avatar = data.avatar;
        // user.name = data.name;
        // const expires = new Date(Date.now() + 24 * 3600 * 1000)
        // Cookies.set('user', JSON.stringify(user), {
        //   path: '/',
        //   expires
        // });
      });
    };

    _this.splitTel = function (tel) {
      var telArr = tel.split('-');
      return telArr;
    };

    _this.combineTel = function (masterLandLine, landLine) {
      return masterLandLine + '-' + landLine;
    };

    var forget = _this.props.forget;

    _this.state = {
      dataSource: {},
      newKey: 0
    };
    // this.formValue={};
    _this.handleInputBlur = _this.handleInputBlur.bind(_this);
    return _this;
  }

  _createClass(PersonalInfoControl, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      //清除store中的数据
      var _props = this.props,
          forgetactions = _props.forgetactions,
          accountactions = _props.accountactions;
      // accountactions.setAccountMsg({ accountImgUrl: '' })

      forgetactions.unMount();
    }
  }, {
    key: 'handleSaveClick',
    value: function handleSaveClick() {
      var _props2 = this.props,
          account = _props2.account,
          accountactions = _props2.accountactions,
          forget = _props2.forget;

      this.state.dataSource.id = account.id;
      this.state.dataSource.mobile = forget.resetPhone ? forget.resetPhone : this.state.dataSource.mobile;
      this.state.dataSource.avatar = account.accountImgUrl ? account.accountImgUrl : this.state.dataSource.avatar;
      this.state.dataSource.tel = this.state.dataSource.masterLandLine ? this.combineTel(this.state.dataSource.masterLandLine, this.state.dataSource.landLine) : this.state.dataSource.landLine;
      for (var key in this.state.dataSource) {
        if (this.state.dataSource[key] === "") this.state.dataSource[key] = null;
      }
      if (!this.state.dataSource.name) {
        cb.utils.alert('存在必填数据！请检查！', 'warning');
      } else {
        //需要的数据存进store并发送服务
        accountactions.setAccountMsg({ avatar: account.accountImgUrl, name: this.state.dataSource.name }); //重新更改user.avatar
        this.saveFormValues(this.state.dataSource);
      }
    }
  }, {
    key: 'handleInputBlur',
    value: function handleInputBlur(flag, value) {
      var forgetactions = this.props.forgetactions;

      var dataSource = this.state.dataSource;
      dataSource[flag] = value;
      if (flag == 'name') {
        if (value) {
          forgetactions.setMsg({ nameMsg: false });
        } else {
          forgetactions.setMsg({ nameMsg: true });
        }
      }
      this.setState({ dataSource: dataSource });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props3 = this.props,
          account = _props3.account,
          accountactions = _props3.accountactions;

      var id = account.id;
      var proxy = cb.rest.DynamicProxy.create({
        find: {
          url: '/user/find',
          method: 'GET',
          options: { token: true }
        }
      });
      proxy.config.find.url = proxy.config.find.url;
      proxy.find({}, function (err, result) {
        if (err) {
          console.error(err.message);
          return;
        } else {
          var dataSource = {};
          if (result.avatar) {
            accountactions.setAccountMsg({ accountImgUrl: result.avatar });
            dataSource.avatar = result.avatar;
          }
          dataSource.userType = result.userType;
          dataSource.name = result.name || '';
          dataSource.avatar = result.avatar || '';
          dataSource.nickName = result.nickName || '';
          dataSource.position = result.position || '';
          dataSource.mobile = result.mobile || '';
          dataSource.email = result.email || '';
          dataSource.qq = result.qq || '';
          dataSource.wechat = result.wechat || '';
          dataSource.department_name = result.department_name || '';
          dataSource.department = result.department;
          dataSource.masterLandLine = result.tel ? this.splitTel(result.tel)[0] : '';
          dataSource.landLine = result.tel ? this.splitTel(result.tel)[1] : '';
          this.setState({ dataSource: dataSource });
        }
      }, this);
    }
  }, {
    key: 'mapValueChange',
    value: function mapValueChange(value) {
      // this.state.dataSource.department = value[0].id;
      var dataSource = this.state.dataSource;
      dataSource.department_name = value[0].name;
      dataSource.department = value[0].id;
      this.setState({ dataSource: dataSource });
    }
  }, {
    key: 'handleCancelClick',
    value: function handleCancelClick() {
      var _props4 = this.props,
          tabsactions = _props4.tabsactions,
          accountactions = _props4.accountactions;

      accountactions.setAccountMsg({ accountImgUrl: '' });
      tabsactions.deleteItem('accountCenter');
    }
  }, {
    key: 'handleChangePhone',
    value: function handleChangePhone() {
      var forgetactions = this.props.forgetactions;

      forgetactions.setMsg({ visible: true });
      this.setState({ newKey: new Date().getTime() });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props5 = this.props,
          form = _props5.form,
          account = _props5.account,
          forget = _props5.forget;
      var getFieldDecorator = form.getFieldDecorator;

      var formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 }
        }
      };
      // const defaultNameValue='王俊凯';
      var handleUserType = function handleUserType(value) {
        switch (value) {
          case 0:
            return '超级管理员';
          case 1:
            return '公司员工';
          case 2:
            return '服务商管理员';
          case 3:
            return '服务商员工';
          default:
            return '尚未配置字段';
        }
      };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_AccountModal2.default, { key: this.state.newKey }),
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
                _react2.default.createElement(_UpLoadFace2.default, { class_name: 'face-img basic-avatar-portrait', imgUrl: this.state.dataSource.avatar })
              ),
              _react2.default.createElement(
                'div',
                { className: 'viewSetting viewCell width-percent-100' },
                _react2.default.createElement(_basic.Input, { err: forget.nameMsg ? 'has-error' : null, ref: 'accountName', onBlur: function onBlur(value) {
                    return _this2.handleInputBlur('name', value);
                  }, defaultValue: this.state.dataSource.name, cShowCaption: '\u59D3\u540D', bIsNull: false })
              ),
              _react2.default.createElement(
                'div',
                { className: 'viewSetting viewCell width-percent-100' },
                _react2.default.createElement(_basic.Input, { onBlur: function onBlur(value) {
                    return _this2.handleInputBlur('nickName', value);
                  }, defaultValue: this.state.dataSource.nickName, placeholder: '\u60A8\u7684\u4E13\u5C5E\u6635\u79F0', cShowCaption: '\u6635\u79F0', bIsNull: true })
              ),
              _react2.default.createElement(
                'div',
                { className: 'viewSetting viewCell width-percent-100' },
                _react2.default.createElement(_basic.Input, { disabled: true, defaultValue: handleUserType(this.state.dataSource.userType), cShowCaption: '\u89D2\u8272', bIsNull: true })
              ),
              _react2.default.createElement(
                'div',
                { className: 'viewSetting viewCell width-percent-100' },
                _react2.default.createElement(_basic.TreeRefer, { cShowCaption: '\u90E8\u95E8', ref: 'department', cRefType: 'aa_department', value: this.state.dataSource.department_name, afterOkClick: function afterOkClick(value) {
                    return _this2.mapValueChange(value);
                  }, placeholder: '\u90E8\u95E8\u540D\u79F0' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'viewSetting viewCell width-percent-100' },
                _react2.default.createElement(_basic.Input, { onBlur: function onBlur(value) {
                    return _this2.handleInputBlur('position', value);
                  }, defaultValue: this.state.dataSource.position, placeholder: '\u804C\u4F4D\u540D\u79F0', cShowCaption: '\u804C\u4F4D', bIsNull: true })
              ),
              _react2.default.createElement(
                'div',
                { className: 'viewSetting viewCell width-percent-100' },
                _react2.default.createElement(_basic.Input, { disabled: true, defaultValue: forget.resetPhone ? forget.resetPhone : this.state.dataSource.mobile, cShowCaption: '\u624B\u673A', bIsNull: true }),
                _react2.default.createElement(
                  'a',
                  { className: 'infor-phone', onClick: function onClick() {
                      return _this2.handleChangePhone();
                    } },
                  '\u4FEE\u6539\u624B\u673A'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'viewSetting viewCell width-percent-100' },
                _react2.default.createElement(
                  _basic.Row,
                  null,
                  _react2.default.createElement(
                    _basic.Col,
                    { className: 'label-control', span: 4 },
                    _react2.default.createElement(
                      'label',
                      null,
                      '\u5EA7\u673A'
                    )
                  ),
                  _react2.default.createElement(
                    _basic.Col,
                    { className: 'input-control', span: 16 },
                    _react2.default.createElement(
                      'div',
                      { className: 'infor-input-extension' },
                      _react2.default.createElement(
                        'div',
                        { className: 'extension' },
                        _react2.default.createElement(_basic.Input, { onBlur: function onBlur(value) {
                            return _this2.handleInputBlur('masterLandLine', value);
                          }, defaultValue: this.state.dataSource.masterLandLine, placeholder: '\u4E3B\u673A\u53F7', bIsNull: true })
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'extension-num' },
                        _react2.default.createElement(
                          'p',
                          { className: 'line-split' },
                          _react2.default.createElement(
                            'span',
                            null,
                            '\u2014\u2014'
                          )
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'extension' },
                        _react2.default.createElement(_basic.Input, { onBlur: function onBlur(value) {
                            return _this2.handleInputBlur('landLine', value);
                          }, defaultValue: this.state.dataSource.landLine, placeholder: '\u5206\u673A\u53F7', bIsNull: true })
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'viewSetting viewCell width-percent-100' },
                _react2.default.createElement(_basic.Input, { onBlur: function onBlur(value) {
                    return _this2.handleInputBlur('email', value);
                  }, defaultValue: this.state.dataSource.email, placeholder: '\u7ED1\u5B9A\u90AE\u7BB1\u4EE5\u4FBF\u63A5\u53D7\u901A\u77E5\u548C\u56DE\u590D\u5DE5\u5355', cShowCaption: '\u90AE\u7BB1', bIsNull: true })
              ),
              _react2.default.createElement(
                'div',
                { className: 'viewSetting viewCell width-percent-100' },
                _react2.default.createElement(_basic.Input, { onBlur: function onBlur(value) {
                    return _this2.handleInputBlur('wechat', value);
                  }, defaultValue: this.state.dataSource.wechat, placeholder: '\u5FAE\u4FE1\u8D26\u53F7', cShowCaption: '\u5FAE\u4FE1', bIsNull: true })
              ),
              _react2.default.createElement(
                'div',
                { className: 'viewSetting viewCell width-percent-100' },
                _react2.default.createElement(_basic.Input, { onBlur: function onBlur(value) {
                    return _this2.handleInputBlur('qq', value);
                  }, defaultValue: this.state.dataSource.qq, placeholder: 'QQ\u8D26\u53F7', cShowCaption: 'QQ', bIsNull: true })
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
  }]);

  return PersonalInfoControl;
}(_react.Component);

var PersonalInfo = _antd.Form.create({})(PersonalInfoControl);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    account: state.user.toJS(),
    tabs: state.tabs.toJS(),
    forget: state.forget.toJS()
  };
};

function mapDispatchToProps(dispatch) {
  return {
    accountactions: (0, _redux.bindActionCreators)(accountactions, dispatch),
    tabsactions: (0, _redux.bindActionCreators)(tabsactions, dispatch),
    forgetactions: (0, _redux.bindActionCreators)(forgetactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PersonalInfo);