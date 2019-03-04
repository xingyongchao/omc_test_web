'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _SvgIcon = require('../../../yxyweb/common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('../../../yxyweb/common/helpers/util');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = _antd.Collapse.Panel;
var RadioButton = _antd.Radio.Button;
var RadioGroup = _antd.Radio.Group;
var AnchorLink = _antd.Anchor.Link;
var platform = [{
  name: '桌面版',
  icon: 'diannao',
  terminalType: '1'
}, {
  name: '触屏版',
  icon: 'zhinengPOS',
  terminalType: '2'
}, {
  name: '移动版',
  icon: 'shouji',
  terminalType: '3'
}];

var tyeText = {
  'add': '新增功能',
  'update': '更新功能'
};

var detailsCache = {};

var UpdateLog = function (_Component) {
  _inherits(UpdateLog, _Component);

  function UpdateLog(props) {
    _classCallCheck(this, UpdateLog);

    var _this = _possibleConstructorReturn(this, (UpdateLog.__proto__ || Object.getPrototypeOf(UpdateLog)).call(this, props));

    _this.state = {
      logArr: null,
      loading: true,
      currentType: "1",
      onDetail: false,
      activeSpread: {
        '1': '0',
        '2': '0',
        '3': '0'
      },
      detail: {
        iterativeTime: '20180615',
        i: 0
      }
    };

    _this.onChange = function (e) {
      var currentType = e.target.value;
      _this.setState({
        currentType: currentType
      });
    };

    _this.renderRadio = function (platform) {
      var currentType = _this.state.currentType;
      return _react2.default.createElement(
        RadioGroup,
        { onChange: _this.onChange, value: currentType },
        _lodash2.default.map(platform, function (p) {
          return _react2.default.createElement(
            RadioButton,
            { value: p.terminalType, key: p.terminalType },
            _react2.default.createElement(_SvgIcon2.default, { type: p.icon + (p.terminalType == currentType ? '-active' : '') }),
            p.name
          );
        })
      );
    };

    _this.renderPaneHeader = function (log, i) {

      return _react2.default.createElement(
        'p',
        { onClick: function onClick() {
            var _this$state = _this.state,
                currentType = _this$state.currentType,
                activeSpread = _this$state.activeSpread;


            _this.setState({
              activeSpread: _lodash2.default.assign({}, activeSpread, _defineProperty({}, currentType, i))
            });
          } },
        _react2.default.createElement(
          'a',
          { onClick: function onClick(e) {
              e.stopPropagation();
              _this.handleClick(log, i);
            } },
          log.iterativeTime.replace(/(\d{4})(\d{2})(\d{2})/, '$1年$2月$3日')
        ),
        _react2.default.createElement(
          'span',
          { onClick: function onClick(e) {
              e.stopPropagation();
              _this.handleClick(log, i);
            }, className: 'uretail-update-log-more' },
          '\u8BE6\u60C5'
        )
      );
    };

    _this.getDetail = function (id) {
      return (0, _util.proxy)({
        url: 'iterativeUpdate/itemList',
        params: {
          id: id
        }

      });
    };

    _this.handleClick = function (log, i) {

      if (detailsCache[log.id]) {
        _this.setState({
          detail: detailsCache[log.id],
          onDetail: true
        });
      } else {
        _this.getDetail(log.id).then(function (detailJson) {
          if (detailJson.code == 200) {
            detailsCache[log.id] = _extends({
              data: detailJson.data
            }, log, {
              i: i
            });
            _this.setState({
              detail: _extends({
                data: detailJson.data
              }, log, {
                i: i
              }),
              onDetail: true
            });
          } else {
            cb.utils.alert(detailJson.message, 'error');
          }
        });
      }
    };

    return _this;
  }

  _createClass(UpdateLog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      (0, _util.proxy)({
        url: 'iterativeUpdate/list'
      }).then(function (json) {

        // todo
        /*json = {
          "code": 200, "message": "操作成功", "data": [
            {
              "comments": "limytest0",
              "iterativeTime": "20180517",
              "id": 709822906142976,
              "pubts": "2018-06-08 15:46:25",
              "items": [{"item": "test1", "itemType": "add"}, {"item": "test2", "itemType": "add"}],
              "version": "v1.0",
              "terminalType": "1"
            },
            {
              "comments": "limytest1",
              "iterativeTime": "20180519",
              "id": 709822906142979,
              "pubts": "2018-06-08 15:46:25",
              "items": [{"item": "test1", "itemType": "add"}, {
                "item": "test2",
                "itemType": "add"
              }, {"item": "updatetest1", "itemType": "update"}, {"item": "updatetest2", "itemType": "update"}],
              "version": "v1.0",
              "terminalType": "1"
            },
            {
              "comments": "limytest2",
              "iterativeTime": "20180516",
              "id": 709822906142978,
              "pubts": "2018-06-07 15:46:25",
              "items": [{"item": "test1", "itemType": "add"}, {"item": "test2", "itemType": "add"}],
              "version": "v1.0",
              "terminalType": "2"
            },
          ]
        }*/

        if (json.code == 200) {
          _this2.setState({
            logArr: json.data,
            loading: false
          });
        } else {
          cb.utils.alert(json.message, 'error');
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          currentType = _state.currentType,
          logArr = _state.logArr,
          onDetail = _state.onDetail,
          detail = _state.detail,
          activeSpread = _state.activeSpread;

      var currentLogArr = _lodash2.default.filter(logArr, function (logCollect) {
        return logCollect.terminalType == currentType;
      });
      var isEmpty = _lodash2.default.isEmpty(currentLogArr);

      var prev = currentLogArr[detail.i - 1];
      var next = currentLogArr[detail.i + 1];

      return _react2.default.createElement(
        'div',
        { className: 'pc_logo_height' },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)({
              'hide': !onDetail
            }, 'pc_log_details'),
            style: {
              position: 'relative'
            }
          },
          _react2.default.createElement(
            'div',
            { className: 'log_top_title' },
            _react2.default.createElement(
              _antd.Button,
              { onClick: function onClick() {
                  _this3.setState({
                    onDetail: false
                  });
                } },
              _react2.default.createElement(_SvgIcon2.default, { type: 'rollback' }),
              '\u8FD4\u56DE'
            ),
            _react2.default.createElement(
              'div',
              { className: 'log_page' },
              _react2.default.createElement(
                _antd.Button,
                { className: 'no-border-radius m-l-10',

                  disabled: !prev,
                  onClick: function onClick() {

                    prev && _this3.handleClick(prev, detail.i - 1);
                  } },
                _react2.default.createElement(_SvgIcon2.default, { type: 'left' })
              ),
              _react2.default.createElement(
                _antd.Button,
                { className: 'no-border-radius m-l-10',
                  disabled: !next,
                  onClick: function onClick() {
                    next && _this3.handleClick(next, detail.i + 1);
                  } },
                _react2.default.createElement(_SvgIcon2.default, { type: 'right' })
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'log_margin_count' },
            _react2.default.createElement(
              'div',
              { className: 'log_left_count', id: 'uretail-update-log-detail-wrap' },
              _react2.default.createElement(
                'div',
                { className: 'uretail-update-log-collect-wrap' },
                _react2.default.createElement(
                  'h1',
                  null,
                  detail.iterativeTime.replace(/(\d{4})(\d{2})(\d{2})/, '$1年$2月$3日')
                ),
                _lodash2.default.map(detail.data, function (item, i) {
                  return _react2.default.createElement(
                    'div',
                    { id: item.id, key: item.id },
                    _react2.default.createElement(
                      'h2',
                      null,
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                          'span',
                          null,
                          i + 1,
                          '.'
                        ),
                        '\xA0\xA0',
                        item.items
                      )
                    ),
                    _react2.default.createElement('div', { dangerouslySetInnerHTML: {
                        __html: item.itemDetail
                      } })
                  );
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'log_right_bar' },
              _react2.default.createElement(
                'div',
                { className: 'ant-anchor-headertitle' },
                '\u5185\u5BB9'
              ),
              !_lodash2.default.isEmpty(detail.data) && _react2.default.createElement(AnchorWrap, {
                show: onDetail,
                data: detail.data })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('uretial-update-log', {
              'hide': onDetail
            }) },
          this.renderRadio(platform),
          _react2.default.createElement(
            'div',
            { className: 'uretail-update-log-collapse' },
            _react2.default.createElement(
              _antd.Collapse,
              { defaultActiveKey: ['0'] },
              isEmpty ? _react2.default.createElement(
                'div',
                { className: 'uretial-no-date' },
                _react2.default.createElement('i', null),
                '\u6682\u65E0\u6570\u636E'
              ) : _lodash2.default.map(currentLogArr, function (log, i) {
                return _react2.default.createElement(
                  Panel,
                  {
                    className: (0, _classnames2.default)({
                      'uretail-update-log-activeLog': i == activeSpread[currentType]
                    }),
                    showArrow: false, header: _this3.renderPaneHeader(log, i), key: i },
                  _react2.default.createElement(
                    'div',
                    { className: 'clear' },
                    _lodash2.default.map(_lodash2.default.groupBy(log.items, 'itemType'), function (arr, updateType) {
                      return _react2.default.createElement(
                        'div',
                        { key: updateType, className: (0, _classnames2.default)("uretail-update-log-" + updateType) },
                        _react2.default.createElement(
                          'div',
                          { className: 'add-update-btn' },
                          tyeText[updateType]
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'add-update-count' },
                          _lodash2.default.map(arr, function (leaf, i) {
                            return _react2.default.createElement(
                              'p',
                              { key: i },
                              leaf.item
                            );
                          })
                        )
                      );
                    })
                  )
                );
              })
            )
          )
        )
      );
    }
  }]);

  return UpdateLog;
}(_react.Component);

var AnchorWrap = function (_Component2) {
  _inherits(AnchorWrap, _Component2);

  function AnchorWrap(props) {
    _classCallCheck(this, AnchorWrap);

    return _possibleConstructorReturn(this, (AnchorWrap.__proto__ || Object.getPrototypeOf(AnchorWrap)).call(this, props));
  }

  _createClass(AnchorWrap, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.show;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.anchor.handleScroll();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var data = this.props.data;
      return _react2.default.createElement(
        _antd.Anchor,
        {
          ref: function ref(anchor) {
            return _this5.anchor = anchor;
          },
          offsetTop: 178,
          target: function target() {
            return document.getElementById('uretail-update-log-detail-wrap');
          } },
        _lodash2.default.map(data, function (item, i) {
          return _react2.default.createElement(AnchorLink, { key: item.id, href: '#' + item.id,
            title: _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                'span',
                null,
                i + 1,
                '.'
              ),
              item.items
            ) });
        })
      );
    }
  }]);

  return AnchorWrap;
}(_react.Component);

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
}

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(UpdateLog);