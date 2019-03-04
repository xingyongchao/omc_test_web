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

var _row = require('../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../basic/col');

var _col2 = _interopRequireDefault(_col);

var _table = require('../basic/table');

var _table2 = _interopRequireDefault(_table);

var _PortalSetting = require('./PortalSetting');

var _PortalSetting2 = _interopRequireDefault(_PortalSetting);

var _button = require('../basic/button');

var _button2 = _interopRequireDefault(_button);

var _portal = require('../../redux/portal');

var portalactions = _interopRequireWildcard(_portal);

var _getServiceAndButton = require('./getServiceAndButton');

var _getServiceAndButton2 = _interopRequireDefault(_getServiceAndButton);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioGroup = _antd.Radio.Group;
var PermissionButtons = null;
if (process.env.__CLIENT__ === true) {
  require('./role.less');
  PermissionButtons = require('u8c-components/dist').PermissionButtons;
}

var Role = function (_React$Component) {
  _inherits(Role, _React$Component);

  function Role(props) {
    _classCallCheck(this, Role);

    var _this = _possibleConstructorReturn(this, (Role.__proto__ || Object.getPrototypeOf(Role)).call(this, props));

    _this.getRef = function (childRef) {
      debugger;
      _this.setState({
        childRef: childRef
      });
    };

    _this.onSysChange = function (val, option) {
      _this.setState({ 'systemCode': val });
    };

    _this.onTabsChange = function (activeKey) {
      _this.setState({ activeKey: activeKey });
    };

    _this.onRadioChange = function (e, item) {
      var sensRoleMap = _this.state.sensRoleMap;
      sensRoleMap[item.code] = e.target.value;
      _this.setState({ sensRoleMap: sensRoleMap });
    };

    _this.setIndeterminate = function (authList) {
      authList.forEach(function (ele) {
        var second = ele.children;
        if (second) {
          var secondLen = second.length,
              checkedLen1 = 0,
              indet1 = 0;
          second.forEach(function (ele1) {
            var last = ele1.children;
            if (last) {
              var lastLen = last.length,
                  checkedLen2 = 0;
              last.forEach(function (ele2) {
                if (ele2.checked) checkedLen2 += 1;
              });
              if (lastLen > checkedLen2 && checkedLen2 != 0) {
                ele1.indeterminate = true;
                ele1.checked = false;
              } else {
                if (lastLen == checkedLen2 && lastLen != 0) ele1.checked = true;
                ele1.indeterminate = false;
              }
            }
            if (ele1.checked) checkedLen1 += 1;
            if (ele1.indeterminate) indet1 += 1;
          });
          if (secondLen > checkedLen1 && (checkedLen1 != 0 || indet1 != 0)) {
            ele.indeterminate = true;
            ele.checked = false;
          } else {
            if (secondLen == checkedLen1) ele.checked = true;
            ele.indeterminate = false;
          }
        }
      });
      return authList;
    };

    _this.state = {
      InputValues: { name: "", desc: "", code: "" },
      activeKey: 'default',
      sysList: [],
      dataObj: {},
      sensRoleMap: {}, /*敏感数据权限对照*/
      systemCode: '',
      childRef: null
    };
    _this.viewModel = cb.loader.initMetaCommonViewModel('RoleViewModel', 'roleViewModel', _this.props.data.params, _this.props.data.parentViewModel, ['refresh']);
    return _this;
  }

  _createClass(Role, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.viewModel) this.viewModel.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.viewModel) this.viewModel.removeListener(this);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.callback || nextProps.callback === this.props.callback) return;
      cb.utils.confirm('\u786E\u5B9A\u8981' + nextProps.caption + '\u4E48', function () {
        nextProps.callback();
      });
    }
    //TODO 按钮权限

  }, {
    key: 'initRole',
    value: function initRole(data) {
      var authList = data.authList,
          sysList = data.sysList,
          sensDataList = data.sensDataList;

      var sensRoleMap = this.state.sensRoleMap;
      var dataObj = {};
      for (var key in authList) {
        var authes = authList[key].authes,
            kbList = authList[key].kanbans;
        if (authes && authes.length > 0) {
          authes.forEach(function (ele) {
            ele.checked = false;
            if (!ele.children) return;
            ele.children.forEach(function (ele1) {
              ele1.checked = false;
              if (!ele1.children) return;
              ele1.children.forEach(function (ele2) {
                ele2.checked = false;
              });
            });
          });
        } else {
          authes = [];
        }
        if (kbList && kbList.length > 0) {
          kbList = [{ name: "看板", children: kbList }];
          kbList.forEach(function (ele) {
            ele.checked = false;
            if (!ele.children) return;
            ele.children.forEach(function (ele1) {
              ele1.checked = false;
              if (!ele1.children) return;
              ele1.children.forEach(function (ele2) {
                ele2.checked = false;
              });
            });
          });
        } else {
          kbList = [];
        }
        if (sensDataList && sensDataList.length > 0) {
          sensDataList.forEach(function (ele) {
            sensRoleMap[ele.code] = -1;
            if (!ele.children) return;
            ele.children.forEach(function (ele1) {
              sensRoleMap[ele1.code] = -1;
              if (!ele1.children) return;
              ele1.children.forEach(function (ele2) {
                sensRoleMap[ele2.code] = -1;
              });
            });
          });
        } else {
          sensDataList = [];
        }

        dataObj[key] = { 'authList': authes, 'kbList': kbList, sensRoleMap: sensRoleMap };
      }
      this.setState({ dataObj: dataObj, sysList: sysList, sensDataList: sensDataList, "systemCode": sysList[0].systemCode });
    }
  }, {
    key: 'initRoleData',
    value: function initRoleData(roleData) {
      var _this2 = this;

      var roleportals = roleData.roleportals,
          auths = roleData.auths,
          rolekanbans = roleData.rolekanbans,
          rolesensdatas = roleData.rolesensdatas;

      var dataObj = this.state.dataObj;
      var settingDataSource = roleportals && roleportals.length ? JSON.parse(roleportals[0]) : null;
      var InputValues = this.state.InputValues;
      InputValues.name = roleData.name;
      InputValues.code = roleData.code;
      InputValues.desc = roleData.note;

      if (!auths) auths = {};
      if (!rolekanbans) rolekanbans = {};

      var _loop = function _loop() {
        var authsList = auths[key];
        var authList = cb.utils.extend(true, [], dataObj[key] ? dataObj[key].authList : []);
        authsList.forEach(function (ele) {
          var checkedAuth = ele.auth;
          var isFind = false;
          authList.forEach(function (ele) {
            if (!isFind) {
              /*已匹配*/
              if (ele.code == checkedAuth) {
                ele.checked = true;
                isFind = true;
              } else {
                if (ele.children) {
                  ele.children.forEach(function (ele1) {
                    if (ele1.code == checkedAuth) {
                      ele1.checked = true;
                      isFind = true;
                    } else {
                      if (ele1.children) {
                        ele1.children.forEach(function (ele2) {
                          if (ele2.code == checkedAuth) {
                            ele2.checked = true;
                            isFind = true;
                          }
                        });
                      }
                    }
                  });
                }
              }
            }
          });
        }, _this2);
        authList = _this2.setIndeterminate(authList);
        dataObj[key].authList = authList;
      };

      for (var key in auths) {
        _loop();
      }

      var _loop2 = function _loop2() {
        var kanbanList = rolekanbans[key];
        var kbList = cb.utils.extend(true, [], dataObj[key] ? dataObj[key].kbList : []);
        kanbanList.forEach(function (ele) {
          var checkedAuth = ele.kanban;
          var isFind = false;
          kbList.forEach(function (ele1) {
            if (!isFind) {
              /*已匹配*/
              if (ele1.children) {
                ele1.children.forEach(function (ele2) {
                  if (ele2.children) {
                    ele2.children.forEach(function (ele3) {
                      if (ele3.id == checkedAuth) {
                        ele3.checked = true;
                        isFind = true;
                      }
                    });
                  }
                });
              }
            }
          });
        }, _this2);
        kbList = _this2.setIndeterminate(kbList);
        dataObj[key].kbList = kbList;
      };

      for (var key in rolekanbans) {
        _loop2();
      }
      var sensRoleMap = this.state.sensRoleMap;
      rolesensdatas && rolesensdatas.map(function (data) {
        sensRoleMap[data.sensDataAuth] = data.authLevel;
      });
      this.setState({ InputValues: InputValues, settingDataSource: settingDataSource, dataObj: dataObj, sensRoleMap: sensRoleMap });
    }
  }, {
    key: 'rollBackClick',
    value: function rollBackClick(e) {
      var _props = this.props,
          portalactions = _props.portalactions,
          index = _props.index;

      portalactions.delItem(index);
      this.viewModel.execute('refresh');
    }
  }, {
    key: 'getBodyControl',
    value: function getBodyControl() {
      var _this3 = this;

      var _state = this.state,
          InputValues = _state.InputValues,
          activeKey = _state.activeKey,
          errCode = _state.errCode,
          errName = _state.errName,
          sysList = _state.sysList,
          systemCode = _state.systemCode;

      var values = InputValues;
      var bodyControl = [];
      bodyControl.push(_react2.default.createElement(
        _row2.default,
        { colCount: 12, className: 'roleRow' },
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement(_antd.Icon, { type: 'star' }),
          '\u89D2\u8272\u7F16\u7801'
        ),
        _react2.default.createElement(
          _col2.default,
          { span: 5, className: errCode ? "width-400 err" : "width-400" },
          _react2.default.createElement(_antd.Input, { onChange: function onChange(e) {
              return _this3.onInputChange(e, "code");
            }, value: values.code, type: 'text', placeholder: '\u8BF7\u8F93\u5165\u89D2\u8272\u7F16\u7801' })
        ),
        _react2.default.createElement(
          _col2.default,
          { span: 4 },
          errCode ? _react2.default.createElement(
            'div',
            { className: 'errInfo' },
            '\u4E0D\u80FD\u4E3A\u7A7A'
          ) : ""
        )
      ));
      bodyControl.push(_react2.default.createElement(
        _row2.default,
        { colCount: 12, className: 'roleRow' },
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement(_antd.Icon, { type: 'star' }),
          '\u89D2\u8272\u540D\u79F0'
        ),
        _react2.default.createElement(
          _col2.default,
          { span: 5, className: errName ? "width-400 err" : "width-400" },
          _react2.default.createElement(_antd.Input, { onChange: function onChange(e) {
              return _this3.onInputChange(e, "name");
            }, value: values.name, type: 'text', placeholder: '\u8BF7\u8F93\u5165\u89D2\u8272\u540D\u79F0' })
        ),
        _react2.default.createElement(
          _col2.default,
          { span: 4 },
          errCode ? _react2.default.createElement(
            'div',
            { className: 'errInfo' },
            '\u4E0D\u80FD\u4E3A\u7A7A'
          ) : ""
        )
      ));
      bodyControl.push(_react2.default.createElement(
        _row2.default,
        { colCount: 12, className: 'roleRow p-b-0' },
        _react2.default.createElement(
          'label',
          null,
          '\u89D2\u8272\u63CF\u8FF0'
        ),
        _react2.default.createElement(
          _col2.default,
          { span: 5, className: 'width-400' },
          _react2.default.createElement(_antd.Input, { onChange: function onChange(e) {
              return _this3.onInputChange(e, "desc");
            }, value: values.desc, type: 'textarea', placeholder: '\u8BF7\u8F93\u5165\u5BF9\u89D2\u8272\u7684\u7B80\u5355\u63CF\u8FF0' }),
          _react2.default.createElement(
            'span',
            { style: { float: "right", color: "#e6e6e6" } },
            '100\u5B57\u4EE5\u5185'
          )
        ),
        _react2.default.createElement(_col2.default, { span: 4 })
      ));
      if (cb.rest.toolbarHotfix) bodyControl.push(_react2.default.createElement(
        _row2.default,
        { colCount: 12, className: 'roleRow' },
        _react2.default.createElement(
          'label',
          null,
          '\u95E8\u6237\u63A7\u4EF6'
        ),
        _react2.default.createElement(
          _col2.default,
          { className: 'role-select', span: 2 },
          _react2.default.createElement(_PortalSetting2.default, { ref: 'setting', dataSource: this.state.settingDataSource })
        )
      ));
      var authControl = this.getAuthControl();
      var sysOptions = [];
      sysList && sysList.map(function (sys) {
        sysOptions.push(_react2.default.createElement(
          _antd.Select.Option,
          { value: sys.systemCode, sys: sys },
          sys.systemName
        ));
      });
      bodyControl.push(_react2.default.createElement(
        _row2.default,
        { colCount: 12, className: 'roleRow function-limit' },
        _react2.default.createElement(
          'label',
          null,
          '\u6743\u9650'
        ),
        _react2.default.createElement(
          _col2.default,
          { className: 'width-400', span: 5 },
          _react2.default.createElement(
            _antd.Select,
            { value: systemCode, style: { width: 120 },
              onSelect: this.onSysChange
            },
            sysOptions
          )
        ),
        _react2.default.createElement(
          _col2.default,
          { className: 'role-select', span: 10 },
          _react2.default.createElement(
            'div',
            { className: 'role-tabs clearfix' },
            _react2.default.createElement(
              'div',
              { className: 'tabs-control' },
              _react2.default.createElement(
                'div',
                { className: activeKey == 'default' ? 'role-tab-active' : '', onClick: function onClick() {
                    return _this3.onTabsChange('default');
                  } },
                '\u529F\u80FD\u6743\u9650'
              ),
              cb.rest.toolbarHotfix && _react2.default.createElement(
                'div',
                { className: activeKey == 'discount' ? 'role-tab-active' : '', onClick: function onClick() {
                    return _this3.onTabsChange('discount');
                  } },
                '\u73B0\u573A\u6298\u6263\u6743\u9650'
              ),
              _react2.default.createElement(
                'div',
                { className: activeKey == 'kanban' ? 'role-tab-active' : '', onClick: function onClick() {
                    return _this3.onTabsChange('kanban');
                  } },
                '\u770B\u677F\u6743\u9650'
              ),
              _react2.default.createElement(
                'div',
                { className: activeKey == 'sens' ? 'role-tab-active' : '', onClick: function onClick() {
                    return _this3.onTabsChange('sens');
                  } },
                '\u654F\u611F\u6570\u636E\u6743\u9650'
              )
            )
          ),
          authControl
        )
      ));
      return bodyControl;
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(e, type) {
      var InputValues = this.state.InputValues;
      var value = e.target.value;
      if (type == 'desc' && value.length > 100) {
        cb.utils.alert("最多支持100字哦！", 'warning');
        return;
      }
      InputValues[type] = value;
      this.setState({ InputValues: InputValues });
    }
  }, {
    key: 'getAuthControl',
    value: function getAuthControl() {
      var _state2 = this.state,
          activeKey = _state2.activeKey,
          systemCode = _state2.systemCode,
          dataObj = _state2.dataObj,
          sensDataList = _state2.sensDataList,
          sensRoleMap = _state2.sensRoleMap;

      var authList = dataObj[systemCode] ? dataObj[systemCode].authList : [];
      var kbList = dataObj[systemCode] ? dataObj[systemCode].kbList : [];

      var authControl = [];
      if (activeKey == 'default') {
        /*功能权限*/
        /* authList.forEach(function (ele) {
           let options = [], lastAuth = [];
           let second = ele.children ? ele.children : [];
           second.forEach(function (item) {
             let last = item.children ? item.children : [];
             lastAuth = [];
             last.forEach(function (item1) {
               lastAuth.push(
                 <Checkbox checked={item1.checked} onChange={(e) => this.onChecked(e, item1.code, 'last', item1.parent)}>
                   {item1.name}
                 </Checkbox>
               );
             }, this);
             options.push(
               <Row >
                 <div className='second-auth'>
                   <Checkbox checked={item.checked} indeterminate={item.indeterminate} onChange={(e) => this.onChecked(e, item.code, 'second', item.parent)}>
                     {item.name}
                   </Checkbox>
                 </div>
                 <div className='last-auth'>{lastAuth}</div>
               </Row>
             );
           }, this);
           authControl.push(
             <Row className='roleRow-2'>
               <div >
                 <Checkbox checked={ele.checked} indeterminate={ele.indeterminate} onChange={(e) => this.onGroupChecked(e, ele.code)}><h4>{ele.name}</h4></Checkbox>
               </div>
               <div >{options}</div>
             </Row>
           );
         }, this);*/
        authControl.push(_react2.default.createElement(PermissionButtons, { applications: _getServiceAndButton2.default, getRef: this.getRef }));
      } else if (activeKey == 'kanban') {
        /*看板权限*/
        kbList.forEach(function (ele) {
          var _this6 = this;

          var options = [],
              lastAuth = [];
          var second = ele.children ? ele.children : [];
          second.forEach(function (item) {
            var _this5 = this;

            var last = item.children ? item.children : [];
            lastAuth = [];
            last.forEach(function (item1) {
              var _this4 = this;

              lastAuth.push(_react2.default.createElement(
                _antd.Checkbox,
                { checked: item1.checked, onChange: function onChange(e) {
                    return _this4.onChecked(e, item1.id, 'last', item1.parent, "kanban");
                  } },
                item1.name
              ));
            }, this);
            options.push(_react2.default.createElement(
              _row2.default,
              null,
              _react2.default.createElement(
                'div',
                { className: 'second-auth' },
                _react2.default.createElement(
                  _antd.Checkbox,
                  { checked: item.checked, indeterminate: item.indeterminate, onChange: function onChange(e) {
                      return _this5.onChecked(e, item.type, 'second', item.parent, "kanban");
                    } },
                  item.name || item.typeName
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'last-auth' },
                lastAuth
              )
            ));
          }, this);
          authControl.push(_react2.default.createElement(
            _row2.default,
            { className: 'roleRow-2' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _antd.Checkbox,
                { checked: ele.checked, indeterminate: ele.indeterminate, onChange: function onChange(e) {
                    return _this6.onGroupChecked(e, ele.code, "kanban");
                  } },
                _react2.default.createElement(
                  'h4',
                  null,
                  ele.name || ele.typeName
                )
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              options
            )
          ));
        }, this);
      } else if (activeKey == 'sens') {
        sensDataList[0] && sensDataList[0].children.forEach(function (ele) {
          var _this8 = this;

          var options = [];
          var second = ele.children ? ele.children : [];
          var radioVal = void 0;
          second.forEach(function (item) {
            var _this7 = this;

            radioVal = sensRoleMap[item.code];
            if (cb.utils.isEmpty(radioVal) || radioVal == -1) radioVal = 0;
            options.push(_react2.default.createElement(
              _row2.default,
              null,
              _react2.default.createElement(
                'div',
                { className: 'second-auth' },
                _react2.default.createElement(
                  'span',
                  { className: 'sensRole-name' },
                  item.name || item.typeName
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'last-auth' },
                _react2.default.createElement(
                  RadioGroup,
                  { onChange: function onChange(e) {
                      return _this7.onRadioChange(e, item);
                    }, value: radioVal },
                  _react2.default.createElement(
                    _antd.Radio,
                    { value: 0 },
                    '\u65E0\u6743'
                  ),
                  _react2.default.createElement(
                    _antd.Radio,
                    { value: 1 },
                    '\u53EA\u8BFB'
                  ),
                  _react2.default.createElement(
                    _antd.Radio,
                    { value: 2 },
                    '\u8BFB\u5199'
                  )
                )
              )
            ));
          }, this);
          if (options.length == 0) {
            radioVal = sensRoleMap[ele.code];
            if (cb.utils.isEmpty(radioVal) || radioVal == -1) radioVal = 0;
            options.push(_react2.default.createElement(
              _row2.default,
              null,
              _react2.default.createElement(
                'div',
                { className: 'second-auth' },
                _react2.default.createElement('span', { className: 'sensRole-name' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'last-auth' },
                _react2.default.createElement(
                  RadioGroup,
                  { onChange: function onChange(e) {
                      return _this8.onRadioChange(e, ele);
                    }, value: radioVal },
                  _react2.default.createElement(
                    _antd.Radio,
                    { value: 0 },
                    '\u65E0\u6743'
                  ),
                  _react2.default.createElement(
                    _antd.Radio,
                    { value: 1 },
                    '\u53EA\u8BFB'
                  ),
                  _react2.default.createElement(
                    _antd.Radio,
                    { value: 2 },
                    '\u8BFB\u5199'
                  )
                )
              )
            ));
          }
          authControl.push(_react2.default.createElement(
            _row2.default,
            { className: 'roleRow-2 sensRole' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'span',
                { className: 'firstRole' },
                ele.name || ele.typeName
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              options
            )
          ));
        }, this);
      }
      return authControl;
    }
  }, {
    key: 'onGroupChecked',
    value: function onGroupChecked(e, code, type) {
      var _state3 = this.state,
          dataObj = _state3.dataObj,
          systemCode = _state3.systemCode;

      var authList = dataObj[systemCode] ? dataObj[systemCode].authList : [];
      var kbList = dataObj[systemCode] ? dataObj[systemCode].kbList : [];

      var list = authList;
      if (type == 'kanban') list = kbList;
      var checked = e.target.checked;
      list.forEach(function (ele) {
        if (ele.code == code) {
          ele.checked = checked;
          if (checked) ele.indeterminate = false;
          var second = ele.children ? ele.children : [];
          second.forEach(function (ele1) {
            ele1.checked = checked;
            var last = ele1.children ? ele1.children : [];
            last.forEach(function (ele2) {
              ele2.checked = checked;
            });
          });
        }
      });
      list = this.setIndeterminate(list);
      if (type == 'kanban') dataObj[systemCode].kbList = list;else dataObj[systemCode].authList = list;
      this.setState({ dataObj: dataObj });
    }
  }, {
    key: 'onChecked',
    value: function onChecked(e, code, level, parent, type) {
      var _state4 = this.state,
          dataObj = _state4.dataObj,
          systemCode = _state4.systemCode;

      var authList = dataObj[systemCode] ? dataObj[systemCode].authList : [];
      var kbList = dataObj[systemCode] ? dataObj[systemCode].kbList : [];

      var list = authList;
      if (type == 'kanban') list = kbList;
      var checked = e.target.checked;
      if (level == 'last') {
        list.forEach(function (ele) {
          var second = ele.children;
          if (second) {
            second.forEach(function (ele1) {
              var last = ele1.children;
              if (last) {
                last.forEach(function (ele2) {
                  if (type == 'kanban') {
                    if (code == ele2.id) {
                      ele2.checked = checked;
                    }
                  } else {
                    if (code == ele2.code) {
                      ele2.checked = checked;
                    }
                  }
                  if (!checked) ele1.checked = false;
                });
              } else {
                if (type == 'kanban') {
                  if (ele1.id == code) ele1.checked = checked;
                } else {
                  if (ele1.code == code) ele1.checked = checked;
                }
                if (!checked) ele.checked = false;
              }
            });
          } else {
            if (type == 'kanban') {
              if (ele.id == code) ele.checked = checked;
            } else {
              if (ele.code == code) ele.checked = checked;
            }
          }
        });
      } else {
        list.forEach(function (ele) {
          var second = ele.children;
          if (second) {
            second.forEach(function (ele1) {
              var isEqual = false;
              if (type == 'kanban') {
                if (ele1.type == code) isEqual = true;
              } else {
                if (ele1.code == code) isEqual = true;
              }
              if (isEqual) {
                ele1.checked = checked;
                if (!checked) ele.checked = false;
                var last = ele1.children;
                if (last) {
                  last.forEach(function (ele2) {
                    ele2.checked = checked;
                  });
                }
              }
            });
          } else {
            if (type == 'kanban') {
              if (ele.type == code) ele.checked = checked;
            } else {
              if (ele.code == code) ele.checked = checked;
            }
          }
        });
      }
      list = this.setIndeterminate(list);
      if (type == 'kanban') dataObj[systemCode].kbList = list;else dataObj[systemCode].authList = list;
      this.setState({ dataObj: dataObj });
    }
  }, {
    key: 'getFooterControl',
    value: function getFooterControl() {
      var _this9 = this;

      var footerControl = this.props.data.params.mode != 'add' ? _react2.default.createElement(
        _row2.default,
        { colCount: 12, className: 'bottom-toolbar' },
        _react2.default.createElement(
          _button2.default,
          { type: 'primary', onClick: function onClick(e) {
              return _this9.buttonClick(e, 'save');
            } },
          '\u4FDD\u5B58'
        ),
        _react2.default.createElement(
          _button2.default,
          { type: 'default', onClick: function onClick(e) {
              return _this9.buttonClick(e, 'cancel');
            } },
          '\u53D6\u6D88'
        )
      ) : _react2.default.createElement(
        _row2.default,
        { colCount: 12, className: 'bottom-toolbar' },
        _react2.default.createElement(
          _button2.default,
          { type: 'primary', onClick: function onClick(e) {
              return _this9.buttonClick(e, 'save');
            } },
          '\u4FDD\u5B58'
        ),
        _react2.default.createElement(
          _button2.default,
          { type: 'primary', className: 'gray', onClick: function onClick(e) {
              return _this9.buttonClick(e, 'saveAndAdd');
            } },
          '\u4FDD\u5B58\u5E76\u65B0\u589E'
        ),
        _react2.default.createElement(
          _button2.default,
          { type: 'default', onClick: function onClick(e) {
              return _this9.buttonClick(e, 'cancel');
            } },
          '\u53D6\u6D88'
        )
      );
      return footerControl;
    }
  }, {
    key: 'buttonClick',
    value: function buttonClick(e, type) {
      if (type == 'cancel') {
        this.rollBackClick();
        return;
      }
      var InputValues = this.state.InputValues;
      if (InputValues.name == "" || InputValues.code == "") {
        var errCode = false,
            errName = false;
        if (InputValues.name == "") errName = true;
        if (InputValues.code == "") errCode = true;
        this.setState({ errCode: errCode, errName: errName });
        return;
      }
      var args = { "name": InputValues.name, "code": InputValues.code, "note": InputValues.desc, "auths": [], "rolekanbans": [], "rolesensdatas": [] };
      if (this.props.data.params.mode != 'add') {
        args.id = this.props.data.params.id;
      }
      this.getSaveAuths(args);

      var setting = this.refs.setting && this.refs.setting.getData();
      if (setting) args.layouts = [{ layout: JSON.stringify(setting) }];
      this.viewModel.get('save').fireEvent('click', { type: type, args: args });
      this.setState({
        InputValues: { name: "", desc: "", code: "" },
        settingDataSource: [{ "title": "营业概览", "order": 0, "showIcon": false }, { "title": "销售排行", "order": 1, "showIcon": false }, { "title": "门店销售趋势", "order": 2, "showIcon": false }]
      });
    }
  }, {
    key: 'getSaveAuths',
    value: function getSaveAuths(args) {
      var _state5 = this.state,
          dataObj = _state5.dataObj,
          sensRoleMap = _state5.sensRoleMap;

      for (var key in dataObj) {
        var _authList = dataObj[key] ? dataObj[key].authList : [];
        var _kbList = dataObj[key] ? dataObj[key].kbList : [];
        _authList.forEach(function (ele) {
          if (ele.children) {
            /*存在二级权限*/
            if (ele.checked) {
              /*一级权限为选中态*/
              ele.children.forEach(function (ele1) {
                if (ele1.children) {
                  /*存在三级权限*/
                  ele1.children.forEach(function (ele2) {
                    args.auths.push({ 'auth': ele2.code, 'subId': ele2.subId });
                  });
                } else {
                  /*不存在三级权限*/
                  if (ele1.checked) args.auths.push({ 'auth': ele1.code, 'subId': ele1.subId });
                }
              });
            } else if (ele.indeterminate) {
              /*一级权限为半选中态*/
              ele.children.forEach(function (ele1) {
                if (ele1.checked) {
                  /*二级权限为选中态*/
                  if (ele1.children) {
                    /*存在三级权限*/
                    ele1.children.forEach(function (ele2) {
                      args.auths.push({ 'auth': ele2.code, 'subId': ele2.subId });
                    });
                  } else {
                    /*不存在三级权限*/
                    if (ele1.checked) args.auths.push({ 'auth': ele1.code, 'subId': ele1.subId });
                  }
                } else if (ele1.indeterminate) {
                  /*二级权限为半选中态*/
                  if (ele1.children) {
                    /*存在三级权限*/
                    ele1.children.forEach(function (ele2) {
                      if (ele2.checked) args.auths.push({ 'auth': ele2.code, 'subId': ele2.subId });
                    });
                  } else {
                    /*不存在三级权限*/
                    if (ele1.checked) args.auths.push({ 'auth': ele1.code, 'subId': ele1.subId });
                  }
                }
              });
            }
          } else {
            /*不存在二级权限*/
            if (ele.checked) args.auths.push({ 'auth': ele.code, 'subId': ele.subId });
          }
        }, this);
        _kbList.forEach(function (ele) {
          if (ele.children) {
            /*存在二级权限*/
            if (ele.checked) {
              /*一级权限为选中态*/
              ele.children.forEach(function (ele1) {
                if (ele1.children) {
                  /*存在三级权限*/
                  ele1.children.forEach(function (ele2) {
                    args.rolekanbans.push({ 'kanban': ele2.id, 'subId': ele2.subId });
                  });
                }
              });
            } else if (ele.indeterminate) {
              /*一级权限为半选中态*/
              ele.children.forEach(function (ele1) {
                if (ele1.checked) {
                  /*二级权限为选中态*/
                  if (ele1.children) {
                    /*存在三级权限*/
                    ele1.children.forEach(function (ele2) {
                      args.rolekanbans.push({ 'kanban': ele2.id, 'subId': ele2.subId });
                    });
                  }
                } else if (ele1.indeterminate) {
                  /*二级权限为半选中态*/
                  if (ele1.children) {
                    /*存在三级权限*/
                    ele1.children.forEach(function (ele2) {
                      if (ele2.checked) args.rolekanbans.push({ 'kanban': ele2.id, 'subId': ele2.subId });
                    });
                  }
                }
              });
            }
          }
        }, this);
      }
      for (var id in sensRoleMap) {
        if (sensRoleMap[id] != -1) args.rolesensdatas.push({
          "sensDataAuth": id,
          "authLevel": sensRoleMap[id]
        });
      }
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var body = this.getBodyControl();
      var footer = this.getFooterControl();
      return _react2.default.createElement(
        'div',
        { className: 'roleControl footerFixed' },
        _react2.default.createElement(
          'div',
          { className: 'roleBody', ref: 'roleAuth' },
          body
        ),
        _react2.default.createElement(
          'div',
          { className: '' },
          footer
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getControl();
      return control;
    }
  }]);

  return Role;
}(_react2.default.Component);

;

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    portalactions: (0, _redux.bindActionCreators)(portalactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Role);