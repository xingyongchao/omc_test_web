'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _util = require('../../helpers/util');

var _row = require('../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../basic/col');

var _col2 = _interopRequireDefault(_col);

var _button = require('../basic/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioGroup = _antd.Radio.Group;

if (process.env.__CLIENT__ === true) {
  require('./sens.less');
}

var SensDataRole = function (_React$Component) {
  _inherits(SensDataRole, _React$Component);

  function SensDataRole(props) {
    _classCallCheck(this, SensDataRole);

    var _this = _possibleConstructorReturn(this, (SensDataRole.__proto__ || Object.getPrototypeOf(SensDataRole)).call(this, props));

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
      sensData: []
    };
    _this.getSensData();
    return _this;
  }

  _createClass(SensDataRole, [{
    key: 'getSensData',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var config, json, sensData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = {
                  url: 'sensdata/list',
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

      function getSensData() {
        return _ref.apply(this, arguments);
      }

      return getSensData;
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
              _row2.default,
              { colCount: 12, className: thirdClass },
              _react2.default.createElement(
                _col2.default,
                { span: 3 },
                _react2.default.createElement(
                  _antd.Checkbox,
                  { checked: item1.isEnable, onChange: function onChange(e) {
                      return _this3.onChecked(e, item1.code, 3);
                    } },
                  item1.name
                )
              ),
              _react2.default.createElement(
                _col2.default,
                { span: 9, className: 'last-auth' },
                _react2.default.createElement(
                  RadioGroup,
                  { onChange: function onChange(e) {
                      return _this3.onRadioChange(e, item1);
                    }, value: item1.hasAuth },
                  _react2.default.createElement(
                    _antd.Radio,
                    { disabled: !item1.isEnable, value: false },
                    '\u65E0\u6743'
                  ),
                  _react2.default.createElement(
                    _antd.Radio,
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
            _row2.default,
            { colCount: 12, className: secondClass },
            _react2.default.createElement(
              _col2.default,
              { span: 2 },
              _react2.default.createElement(
                _antd.Checkbox,
                { checked: item.isEnable, indeterminate: item.indeterminate, onChange: function onChange(e) {
                    return _this4.onChecked(e, item.code, 2);
                  } },
                item.name
              )
            ),
            _react2.default.createElement(
              _col2.default,
              { span: 10 },
              thirdAuth
            )
          ));
        }, this);
        authControl.push(_react2.default.createElement(
          _row2.default,
          { colCount: 12, className: 'roleRow-2 sensRole' },
          _react2.default.createElement(
            _col2.default,
            { span: 2 },
            _react2.default.createElement(
              _antd.Checkbox,
              { className: 'firstRole', checked: ele.isEnable, indeterminate: ele.indeterminate, onChange: function onChange(e) {
                  return _this5.onChecked(e, ele.code, 1);
                } },
              ele.name
            )
          ),
          _react2.default.createElement(
            _col2.default,
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
        _row2.default,
        { colCount: 12, className: 'bottom-toolbar' },
        _react2.default.createElement(
          _button2.default,
          { type: 'primary', onClick: function onClick(e) {
              return _this6.buttonClick(e);
            } },
          '\u4FDD\u5B58'
        ),
        _react2.default.createElement(
          _button2.default,
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
        _row2.default,
        { colCount: 12, className: 'sensRoleRow' },
        _react2.default.createElement(
          _col2.default,
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
      var control = this.getControl();
      return control;
    }
  }]);

  return SensDataRole;
}(_react2.default.Component);

exports.default = SensDataRole;
;