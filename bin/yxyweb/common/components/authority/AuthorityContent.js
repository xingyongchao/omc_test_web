'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../../helpers/util');

var _queryUserPage = require('./queryUserPage.json');

var _queryUserPage2 = _interopRequireDefault(_queryUserPage);

var _getRole = require('./getRole.json');

var _getRole2 = _interopRequireDefault(_getRole);

var _isOpenRole4AddUser = require('./isOpenRole4AddUser.json');

var _isOpenRole4AddUser2 = _interopRequireDefault(_isOpenRole4AddUser);

var _getRoleUserDataPermission = require('./getRoleUserDataPermission.json');

var _getRoleUserDataPermission2 = _interopRequireDefault(_getRoleUserDataPermission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Authority = null;

if (process.env.__CLIENT__ === true) {
  Authority = require('u8c-components/dist').Authority;
}
var proxyFactory = function proxyFactory(name, config, data, callback) {
  var proxy = cb.rest.DynamicProxy.create(_defineProperty({}, name, config));
  proxy[name](data, function (err, result) {
    callback(err, result);
  });
};

var AuthorityContent = function (_React$Component) {
  _inherits(AuthorityContent, _React$Component);

  function AuthorityContent(props) {
    _classCallCheck(this, AuthorityContent);

    var _this = _possibleConstructorReturn(this, (AuthorityContent.__proto__ || Object.getPrototypeOf(AuthorityContent)).call(this, props));

    _this.getUserList = function (page) {
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
      var keyword = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      return new Promise(function (resolve, reject) {
        proxyFactory('getUserList', { url: 'tenant/queryUserPage', method: 'GET' }, { page: page, size: size, keyword: keyword }, function (err, result) {
          if (err) {
            cb.utils.alert('获取敏感数据列表失败！' + err, 'error');

            //resolve({error:err})
            result = _queryUserPage2.default.data;
            console.log(result);
            _this.setState({ userList: result });
            resolve({ payload: result });
          }
          if (result) {
            _this.setState({ userList: result });
            resolve({ payload: result });
          }
        });
      });
    };

    _this.getRole = function () {
      return new Promise(function (resolve, reject) {
        proxyFactory('getUserList', { url: 'tenant/getRole', method: 'GET' }, null, function (err, result) {
          if (err) {
            cb.utils.alert('获取角色失败！' + err, 'error');
            //resolve({error:err})
            result = _getRole2.default.data;
            resolve({ payload: result });
            _this.setState({ roleList: result });
          }
          if (result) {
            resolve({ payload: result });
            _this.setState({ roleList: result });
          }
        });
      });
    };

    _this.addRole = function (roleIds, userIds) {
      return new Promise(function (resolve, reject) {
        proxyFactory('addRole', { url: '', method: 'POST' }, { userIds: userIds, roleIds: roleIds }, function (err, result) {
          if (err) {
            cb.utils.alert('获取角色失败！' + err, 'error');
            resolve({ error: err });
          }
          if (result) {
            var userList = _this.state.userList;

            var newList = cb.utils.extend({}, userList);
            var userId = result.userId,
                roles = result.roles;

            newList.content = newList.content.map(function (item) {
              var itemUserId = item.userId;

              if (itemUserId === userId) {
                return _extends({}, item, {
                  roles: roles
                });
              }
              return item;
            });
            _this.setState({
              userList: newList
            });
            resolve({ payload: result });
          }
        });
      });
    };

    _this.setRole = function (userIds, roleIds) {
      return new Promise(function (resolve) {
        //TODO 数据处理在相看
        proxyFactory('setRole', { url: 'user/addRoles', method: 'POST' }, { userIds: userIds, roleIds: roleIds }, function (err, result) {
          if (err) {
            cb.utils.alert('获取角色失败！' + err, 'error');
            resolve({ error: err });
          }
          if (result) {
            _this.setState({ roleList: result });
          }
        });
      });
    };

    _this.addAllUserRoles = function (roleIds) {
      return new Promise(function (resolve) {
        //TODO 数据处理在相看
        proxyFactory('addAllUserRoles', { url: 'user/addAllUserRoles', method: 'POST' }, { roleIds: roleIds }, function (err, result) {
          if (err) {
            cb.utils.alert('获取角色失败！' + err, 'error');
            resolve({ error: err });
          }
          if (result) {
            debugger;
            console.log(result);
            _this.setState({ roleList: result });
            resolve({ payload: result });
          }
        });
      });
    };

    _this.getOpenRole = function () {
      return new Promise(function (resolve) {
        proxyFactory('getOpenRole', { url: 'user/isOpenRole4AddUser', method: 'GET' }, null, function (err, result) {
          if (err) {
            cb.utils.alert('获取角色失败！' + err, 'error');
            //resolve({error:err})
            result = _isOpenRole4AddUser2.default.data;
            _this.setState({ isOpenRole4AddUser: result });
            resolve({ payload: result });
          }
          if (result) _this.setState({ isOpenRole4AddUser: result });
          resolve({ payload: result });
        });
      });
    };

    _this.openSetRoleModal = function () {
      _this.setState({
        setRoleModal: true
      });
    };

    _this.closeSetRoleModal = function () {
      _this.setState({
        setRoleModal: false
      });
    };

    _this.changePage = function (eventKey) {
      _this.setState({
        activePage: eventKey
      });
    };

    _this.getPartitionData = function (param) {
      return new Promise(function (resolve) {
        proxyFactory('getPartitionData', { url: 'serviceIsolate/getRoleUserDataPermission', method: 'GET' }, param, function (err, result) {
          if (err) {
            cb.utils.alert('获取角色失败！' + err, 'error');
            //resolve({error:err})
            result = _getRoleUserDataPermission2.default.data;
            _this.setState({ partitionData: result.serviceIsolate });
            resolve({ payload: result });
          }
          if (result) _this.setState({ partitionData: result.serviceIsolate });
          resolve({ payload: result });
        });
      });
    };

    _this.deletePartition = function (param) {
      return new Promise(function (resolve) {
        //TODO 数据处理在相看
        proxyFactory('deletePartition', { url: 'serviceIsolate/deleteRoleUserDataPermission', method: 'POST' }, param, function (err, result) {
          if (err) {
            cb.utils.alert('获取角色失败！' + err, 'error');
            resolve({ error: err });
          }
          if (result) debugger;
          _this.setState({ roleList: result });
          resolve({ payload: result });
        });
      });
    };

    _this.savePartition = function (param) {
      return new Promise(function (resolve) {
        //TODO 数据处理在相看
        proxyFactory('savePartition', { url: 'serviceIsolate/saveRoleUserDataPermission', method: 'POST' }, param, function (err, result) {
          if (err) {
            cb.utils.alert('获取角色失败！' + err, 'error');
            resolve({ error: err });
          }
          if (result) {
            _this.setState({ roleList: result });

            resolve({ payload: result });
          }
        });
      });
    };

    _this.openPartitionModal = function (payloadVal) {
      _this.setState({
        partitionType: true,
        partitionParam: payloadVal
      });
    };

    _this.closePartitionModal = function () {
      _this.setState({
        partitionType: false
      });
    };

    _this.changePartitionData = function (_ref) {
      var operation = _ref.operation,
          data = _ref.data;

      if (operation === 'del') {
        var delId = data.id,
            index = data.index;

        var partitionData = [].concat(_toConsumableArray(_this.state.partitionData));
        var oldItem = partitionData[index];
        partitionData[index] = _extends({}, oldItem, {
          resources: oldItem.resources.filter(function (_ref2) {
            var resourceId = _ref2.resourceId;
            return resourceId !== delId;
          })
        });
        _this.setState({
          partitionData: partitionData
        });
      } else if (operation === 'add') {
        var isolateId = data.isolateId,
            sels = data.sels;

        var _partitionData = [].concat(_toConsumableArray(_this.state.partitionData));
        var _index = _partitionData.findIndex(function (_ref3) {
          var resourcetypecode = _ref3.isolateId;

          var result = resourcetypecode === isolateId;
          return result;
        });
        if (_index !== -1) {
          var _oldItem = _partitionData[_index];
          _partitionData[_index] = _extends({}, _oldItem, {
            resources: sels.map(function (_ref4) {
              var resourceId = _ref4.key,
                  resourceName = _ref4.name;

              var obj = {
                resourceId: resourceId,
                resourceName: resourceName
              };
              return obj;
            })
          });
        }
        _this.setState({
          partitionData: _partitionData
        });
      }
    };

    _this.getRefInfo = function (refCode, sysId) {
      return new Promise(function (resolve) {
        proxyFactory('getUserList', { url: getHost('ref') + '/ref/diwork/iref_ctr/refInfo', method: 'GET' }, { refCode: refCode, sysId: sysId }, function (err, result) {
          if (err) {
            cb.utils.alert('获取角色失败！' + err, 'error');
            resolve({ error: err });
          }
          if (result) {
            resolve({ payload: result });
            _this.setState({ refInfo: result });
          }
        });
      });
    };

    _this.getServiceAndButton = function () {
      return new Promise(function (resolve, reject) {
        proxyFactory('getServiceAndButton', { url: 'service/getServiceAndButton', method: 'GET' }, null, function (err, result) {
          if (err) {
            cb.utils.alert('按钮权限获取失败！' + err, 'error');
            reject(err);
            var applications = require('./getServiceAndButton').default;
            _this.setState({
              applications: applications
            });
          }
          if (result) {
            resolve(result);
            debugger;
            console.log(result);
            _this.setState({ applications: result });
          }
        });
      });

      return;
      _this.proxFactory('getServiceAndButton', { url: 'service/getServiceAndButton', method: 'GET' }, null, function (err, result) {
        if (err) {
          cb.utils.alert('按钮权限获取失败！' + err, 'error');
          var applications = require('./getServiceAndButton');
          _this.setState({
            applications: applications
          });
        }
        if (result) debugger;
        console.log(result);
        _this.setState({ applications: result });
      });
      return;
      var proxy = cb.rest.DynamicProxy.create({ getServiceAndButton: { url: 'service/getServiceAndButton', method: 'GET' } });
      proxy.getServiceAndButton(function (err, result) {
        if (err) {
          cb.utils.alert('按钮权限获取失败！' + err, 'error');
          var applications = require('./getServiceAndButton');
          _this.setState({
            applications: applications
          });
        }
        if (result) debugger;
        console.log(result);
        _this.setState({ applications: result });
      });
    };

    _this.getRef = function (child) {
      _this.setState({
        childRef: child
      });
    };

    _this.onRadioChange = function (e, item) {
      var sensData = _this.state.sensData;
      var code = item.code;
      sensData.forEach(function (data) {
        var children = data.children;
        if (children) {
          children.forEach(function (data1) {
            var children1 = data1.children;
            if (children1) {
              children1.forEach(function (data2) {
                if (data2.code == code) {
                  if (cb.utils.isEmpty(data2.oldAuth)) data2.oldAuth = data2.hasAuth;
                  data2.hasAuth = e.target.value;
                  if (data2.hasAuth != data2.oldAuth) {
                    data2._status = "Update";
                    if (data1.hasAuth != data1.oldAuth) data1._status = 'Update';
                    if (data.hasAuth != data.oldAuth) data._status = 'Update';
                  } else data2._status = "UnChange";
                }
                return;
              });
            }
          });
        }
      });
      _this.setState({ sensData: sensData });
    };

    _this.loopSetEnable = function (data, isEnable) {
      data.map(function (item) {
        item.isEnable = isEnable;
        if (item.children) _this.loopSetEnable(item.children, isEnable);
      });
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
                if (ele2.isEnable) checkedLen2 += 1;
              });
              if (lastLen > checkedLen2 && checkedLen2 != 0) {
                ele1.indeterminate = true;
                ele1.isEnable = false;
              } else {
                if (lastLen == checkedLen2 && lastLen != 0) ele1.isEnable = true;
                if (checkedLen2 == 0) ele1.isEnable = false;
                ele1.indeterminate = false;
              }
            }
            if (ele1.isEnable) checkedLen1 += 1;
            if (ele1.indeterminate) indet1 += 1;
          });
          if (secondLen > checkedLen1 && (checkedLen1 != 0 || indet1 != 0)) {
            ele.indeterminate = true;
            ele.isEnable = false;
          } else {
            if (secondLen == checkedLen1) ele.isEnable = true;
            ele.indeterminate = false;
          }
        }
      });
      return authList;
    };

    _this.loopTree = function (tree, data) {
      tree.map(function (item) {
        if (item.children) {
          if (item._status == 'Update') data.push(item);
          _this.loopTree(item.children, data);
        } else if (item._status == 'Update') data.push(item);
      });
    };

    _this.buttonClick = function (e, type) {
      if (type == 'cancel') {
        _this.setState({ sensData: cb.utils.extend(true, [], _this.state.cacheData) });
        return;
      }
      var sensData = _this.state.sensData;

      var data = [];
      _this.loopTree(sensData, data);
      if (data.length == 0) {
        cb.utils.alert('数据未更改~', 'error');
        return;
      }
      var proxy = cb.rest.DynamicProxy.create({
        saveSensData: {
          url: 'sensdata/save',
          method: 'POST',
          options: {
            token: true
          }
        }
      });
      proxy.saveSensData({ data: data }, function (err, result) {
        if (err) cb.utils.alert('保存失败！' + (err ? err.message : ''), 'error');else cb.utils.alert('保存成功！', 'success');
      }, _this);
    };

    _this.state = {
      // 当前页数
      activePage: 1,
      // 用户列表
      userList: {},
      // 角色列表
      roleList: [],
      // 设置角色弹窗开关
      setRoleModal: false,
      // 是否开启角色权限开关
      isOpenRole4AddUser: false,
      // 隔离对象的数据
      partitionData: [],
      // 判断是否打开
      partitionType: false,
      // 点击按钮打开隔离对象传递的参数
      partitionParam: {},
      // refInfo 需要传递给参照组件的
      refInfo: {},
      applications: [],
      childRef: null
    };
    _this.getServiceAndButton().then(function (result) {
      console.log('+++++++++++++++++');
      console.log(result);
    }).catch(function (err) {
      return console.log(err);
    });
    return _this;
  }

  /*==============================业务代码===============================*/


  //获取角色


  //单独用户添加角色


  //批量用户添加角色


  //全部添加角色


  //获取是否有能设置角色的权限


  //获取隔离对象数据


  //删除的api


  //获取角色


  //获取参照


  _createClass(AuthorityContent, [{
    key: 'getUserList',


    //获取userList
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(param) {
        var config, json, sensData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = {
                  url: 'tenant/queryUserPage',
                  method: 'GET'
                };
                _context.next = 3;
                return (0, _util.proxy)(config);

              case 3:
                json = _context.sent;

                if (!(json.code !== 200)) {
                  _context.next = 7;
                  break;
                }

                cb.utils.alert('获取敏感数据列表失败！' + json.message, 'error');
                return _context.abrupt('return');

              case 7:
                sensData = json.data || [];

                this.setState({ sensData: sensData, 'cacheData': cb.utils.extend(true, [], sensData) });

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getUserList(_x3) {
        return _ref5.apply(this, arguments);
      }

      return getUserList;
    }()
  }, {
    key: 'onChecked',
    value: function onChecked(e, code, level) {
      var _this2 = this;

      var sensData = this.state.sensData;

      var isEnable = e.target.checked;
      sensData && sensData.forEach(function (ele) {
        if (ele.level == level) {
          if (ele.code == code) {
            if (cb.utils.isEmpty(ele.oldAuth)) ele.oldAuth = ele.isEnable;
            ele.isEnable = isEnable;
            if (ele.oldAuth != ele.isEnable) ele._status = 'Update';else ele._status = 'UnChange';
            if (ele.children) _this2.loopSetEnable(ele.children, isEnable);
            return;
          }
        } else {
          var second = ele.children;
          second && second.forEach(function (ele1) {
            if (ele1.level == level) {
              if (ele1.code == code) {
                if (cb.utils.isEmpty(ele1.oldAuth)) ele1.oldAuth = ele1.isEnable;
                ele1.isEnable = isEnable;
                if (ele1.oldAuth != ele1.isEnable) ele1._status = 'Update';else ele1._status = 'UnChange';
                if (ele1.children) _this2.loopSetEnable(ele1.children, isEnable);
                return;
              }
            } else {
              var third = ele1.children;
              third && third.forEach(function (ele2) {
                if (ele2.code == code) {
                  if (cb.utils.isEmpty(ele2.oldAuth)) ele2.oldAuth = ele2.isEnable;
                  ele2.isEnable = isEnable;
                  if (ele2.oldAuth != ele2.isEnable) ele2._status = 'Update';else ele2._status = 'UnChange';
                  return;
                }
              });
            }
          });
        }
      });
      sensData = this.setIndeterminate(sensData);
      this.setState({ sensData: sensData });
    }
  }, {
    key: 'getAuthControl',
    value: function getAuthControl() {
      var sensData = this.state.sensData;

      var authControl = [];
      sensData.forEach(function (ele) {
        var _this5 = this;

        var options = [];
        var second = ele.children ? ele.children : [];
        var secondLen = second.length;
        second.forEach(function (item, index) {
          var _this4 = this;

          var third = item.children ? item.children : [];
          var thirdAuth = [],
              thirdLen = third.length;
          third.forEach(function (item1, index1) {
            var _this3 = this;

            var thirdClass = 'third-row';
            if (thirdLen == index1 + 1) thirdClass += '  third-row-end';
            thirdAuth.push(_react2.default.createElement(
              Row,
              { colCount: 12, className: thirdClass },
              _react2.default.createElement(
                Col,
                { span: 3 },
                _react2.default.createElement(
                  Checkbox,
                  { checked: item1.isEnable, onChange: function onChange(e) {
                      return _this3.onChecked(e, item1.code, 3);
                    } },
                  item1.name
                )
              ),
              _react2.default.createElement(
                Col,
                { span: 9, className: 'last-auth' },
                _react2.default.createElement(
                  RadioGroup,
                  { onChange: function onChange(e) {
                      return _this3.onRadioChange(e, item1);
                    }, value: item1.hasAuth },
                  _react2.default.createElement(
                    Radio,
                    { disabled: !item1.isEnable, value: false },
                    '\u65E0\u6743'
                  ),
                  _react2.default.createElement(
                    Radio,
                    { disabled: !item1.isEnable, value: true },
                    '\u6709\u6743'
                  )
                )
              )
            ));
          }, this);
          var secondClass = 'second-row';
          if (secondLen == index + 1) secondClass += '  second-row-end';
          options.push(_react2.default.createElement(
            Row,
            { colCount: 12, className: secondClass },
            _react2.default.createElement(
              Col,
              { span: 2 },
              _react2.default.createElement(
                Checkbox,
                { checked: item.isEnable, indeterminate: item.indeterminate, onChange: function onChange(e) {
                    return _this4.onChecked(e, item.code, 2);
                  } },
                item.name
              )
            ),
            _react2.default.createElement(
              Col,
              { span: 10 },
              thirdAuth
            )
          ));
        }, this);
        authControl.push(_react2.default.createElement(
          Row,
          { colCount: 12, className: 'roleRow-2 sensRole' },
          _react2.default.createElement(
            Col,
            { span: 2 },
            _react2.default.createElement(
              Checkbox,
              { className: 'firstRole', checked: ele.isEnable, indeterminate: ele.indeterminate, onChange: function onChange(e) {
                  return _this5.onChecked(e, ele.code, 1);
                } },
              ele.name
            )
          ),
          _react2.default.createElement(
            Col,
            { span: 10 },
            options
          )
        ));
      }, this);
      return authControl;
    }
  }, {
    key: 'getFooterControl',
    value: function getFooterControl() {
      var _this6 = this;

      return _react2.default.createElement(
        Row,
        { colCount: 12, className: 'bottom-toolbar' },
        _react2.default.createElement(
          Button,
          { type: 'primary', onClick: function onClick(e) {
              return _this6.buttonClick(e);
            } },
          '\u4FDD\u5B58'
        ),
        _react2.default.createElement(
          Button,
          { className: 'm-l-10', onClick: function onClick(e) {
              return _this6.buttonClick(e, 'cancel');
            } },
          '\u53D6\u6D88'
        )
      );
    }
  }, {
    key: 'getBodyControl',
    value: function getBodyControl() {
      var bodyControl = [];
      var authControl = this.getAuthControl();
      bodyControl.push(_react2.default.createElement(
        Row,
        { colCount: 12, className: 'sensRoleRow' },
        _react2.default.createElement(
          Col,
          { className: 'role-select', span: 10 },
          authControl
        )
      ));
      return bodyControl;
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
          { className: 'sensRole-header' },
          '\u542F\u7528\u654F\u611F\u6570\u636E\u6743\u9650\u63A7\u5236'
        ),
        _react2.default.createElement(
          'div',
          { className: 'sensRole-body' },
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
      var _state = this.state,
          activePage = _state.activePage,
          userList = _state.userList,
          roleList = _state.roleList,
          setRoleModal = _state.setRoleModal,
          isOpenRole4AddUser = _state.isOpenRole4AddUser,
          partitionData = _state.partitionData,
          partitionType = _state.partitionType,
          partitionParam = _state.partitionParam,
          refInfo = _state.refInfo;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(Authority, { getUserList: this.getUserList,
          getRole: this.getRole,
          setRole: this.setRole,
          addRole: this.addRole,
          addAllUserRoles: this.addAllUserRoles,
          openSetRoleModal: this.openSetRoleModal,
          closeSetRoleModal: this.closeSetRoleModal,
          getOpenRole: this.getOpenRole,
          changePage: this.changePage,
          getPartitionData: this.getPartitionData,
          deletePartition: this.deletePartition,
          savePartition: this.savePartition,
          openPartitionModal: this.openPartitionModal,
          closePartitionModal: this.closePartitionModal,
          changePartitionData: this.changePartitionData,
          getRefInfo: this.getRefInfo,
          activePage: activePage,
          userList: userList,
          roleList: roleList,
          setRoleModal: setRoleModal,
          isOpenRole4AddUser: isOpenRole4AddUser,
          partitionData: partitionData,
          partitionType: partitionType,
          partitionParam: partitionParam,
          refInfo: refInfo
        })
      );
    }
  }]);

  return AuthorityContent;
}(_react2.default.Component);

exports.default = AuthorityContent;
;