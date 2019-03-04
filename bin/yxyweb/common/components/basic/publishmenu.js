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

var _eChartCommon = require('../echart/eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _eChartProxy = require('../echart/eChartProxy');

var eChartProxy = _interopRequireWildcard(_eChartProxy);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Row from './row';
// import Col from './col';


var RadioGroup = _antd.Radio.Group;

var PublishMenu = function (_React$Component) {
  _inherits(PublishMenu, _React$Component);

  function PublishMenu(props) {
    _classCallCheck(this, PublishMenu);

    var _this = _possibleConstructorReturn(this, (PublishMenu.__proto__ || Object.getPrototypeOf(PublishMenu)).call(this, props));

    _this.canPublishToMobile = function (filterId) {
      var self = _this;
      // filterId = filterId || 14414907;
      var callback = function callback(json) {
        if (json.code === 200 && json.data && json.data.length > 0) {
          self.setState({ canPublishToMobile: true });
        } else {
          self.setState({ canPublishToMobile: false });
          eChartCommon.LogChartInfo("当前报表没有移动过滤方案，不能发布到移动端。filterId ", filterId, 999);
        }
      };
      eChartProxy.doProxy_Options("filterDesign/getSolutionList?terminalType=3", 'POST', { filterId: filterId }, callback, { terminalType: false });
    };

    _this.handleOk = function (e) {

      var self = _this;
      var ele = document.getElementById('publishMenu_Title');
      var arr = document.getElementsByClassName("publishMenu_Mobile");
      var arr2 = document.getElementsByClassName("publishMenu_Pc");
      var isMobile = arr[0].control.checked;
      var isPc = arr2[0].control.checked;
      var name = ele.value;
      if (name == "" || name.length > 16) {
        cb.utils.alert("名称不可为空且长度小于16个字。");
        return;
      }
      var outerparams = { menu_name: name };
      var outercallback = function outercallback(json) {
        if (json.code === 200) {
          if (!!json.data) {
            if (json.data.isSystem == true) {
              cb.utils.alert("新发布的报表名字不可与系统报表重名。");
            } else {
              cb.utils.confirm('已经存在当前菜单，是否覆盖？', function () {
                self.saveMenu(name, json.data.menu_code, isMobile, isPc);
              });
            }
          } else {
            self.saveMenu(name, "", isMobile, isPc);
          }
        }
      };
      eChartProxy.doProxy(eChartProxy.url.menuExists, 'GET', outerparams, outercallback);
    };

    _this.saveMenu = function (name, code, isMobile, isPc) {
      var self = _this;
      var billnum = self.state.params.billnum;
      var filterViewModel = _this.props.viewModel.getCache('FilterViewModel');
      var predicateValue = filterViewModel && filterViewModel.getCache('predicateValue');
      var currentCondition = self.state.params.condition;
      if (predicateValue && currentCondition && currentCondition.commonVOs && currentCondition.commonVOs.length) {
        currentCondition = JSON.parse(JSON.stringify(currentCondition));
        currentCondition.commonVOs.forEach(function (item) {
          if (!predicateValue[item.itemName]) return;
          item.value1 = predicateValue[item.itemName];
          delete item.value2;
        });
      }
      var condition = JSON.stringify(currentCondition);
      var params = { billnum: billnum, name: name, condition: condition, isMobile: isMobile, isPc: isPc };
      if (!!code) params.menu_code = code;
      if (!!self.state.params.groupSchemaId) params.groupSchemaId = self.state.params.groupSchemaId;
      var callback = function callback(json) {
        if (json.code === 200) {
          cb.utils.alert("报表方案已发布。");
          self.setState({ bShowCard: false });
        } else {
          eChartCommon.LogChartInfo("发布报表方案失败。err ", json.message, 999);
          cb.utils.alert(json.message);
          self.setState({ bShowCard: false });
        }
      };
      eChartProxy.doProxy(eChartProxy.url.publishMenu, 'POST', params, callback);
    };

    _this.handleCancel = function (e) {
      _this.setState({ bShowCard: false });
    };

    var viewModel = props.viewModel;

    _this.state = {
      bShowCard: false,
      params: {},
      content: null,
      canPublishToMobile: false
    };
    return _this;
  }

  _createClass(PublishMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      this.props.viewModel.on('setPublishMenuInfo', function (params) {
        self.setState({ params: params });
      });
      this.canPublishToMobile(this.props.viewModel.getParams().filterId);
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      var type = self.state.bShowCard ? "up" : "down";
      var content = self.getPublishMenuCard();
      var className = this.props.className;

      var conditionPop = _react2.default.createElement(
        'div',
        { style: { float: "left" }, className: className },
        _react2.default.createElement(
          _antd.Popover,
          {
            placement: 'bottom',
            overlayClassName: '',
            content: content,
            trigger: "click",
            visible: self.state.bShowCard,
            onVisibleChange: function onVisibleChange(visible) {
              return self.onCardVisibleChange(visible, self);
            }
          },
          _react2.default.createElement(
            _antd.Button,
            {
              onClick: function onClick() {
                return self.ShowCard();
              },
              type: type
            },
            _react2.default.createElement(_SvgIcon2.default, { type: 'fabufangan', className: "icon-fabufangan" }),
            _react2.default.createElement(
              'span',
              null,
              self.props.name ? self.props.name : "发布菜单"
            )
          )
        )
      );
      return conditionPop;
    }
  }, {
    key: 'onCardVisibleChange',
    value: function onCardVisibleChange(visible, self) {

      if (visible == false) {
        self.setState({ bShowCard: false });
      }
    }
  }, {
    key: 'ShowCard',
    value: function ShowCard() {
      var bShowCard = !this.state.bShowCard;
      if (bShowCard) {
        this.setState({ params: {}, content: {}, bShowCard: true });
        this.props.viewModel.execute('getPublishMenuInfo');
      } else {
        this.setState({ params: {}, bShowCard: false });
      }
    }
  }, {
    key: 'getPublishMenuCard',
    value: function getPublishMenuCard() {
      var _this2 = this;

      var self = this;
      var content = self.state.content;
      var params = self.state.params;
      if (self.state.bShowCard == true && _.isEmpty(params) == false) {

        // let name = self.state.params.name;
        // let groupSchemaName = self.state.groupSchemaName;
        var name = params.name;
        var groupSchemaName = params.groupSchemaName ? params.groupSchemaName : "";

        content = _react2.default.createElement(
          'div',
          { className: 'publishMenu', key: "MenuKey_" + params.groupSchemaId ? params.groupSchemaId : "Null" },
          _react2.default.createElement(
            'div',
            { className: 'publishMenu_count' },
            _react2.default.createElement(
              'span',
              null,
              '\u65B9\u6848\u540D\u79F0:'
            ),
            _react2.default.createElement(_antd.Input, {
              id: 'publishMenu_Title',
              placeholder: '\u8BF7\u8F93\u5165',
              defaultValue: name + "_" + groupSchemaName
            }),
            _react2.default.createElement(
              'div',
              { className: 'pc-mobile-show pc-mobile-show-margin' },
              _react2.default.createElement(
                _antd.Checkbox,
                { disabled: !self.state.params.isPc, className: 'publishMenu_Pc', defaultChecked: false },
                'PC\u7AEF\u5C55\u73B0'
              )
            ),
            self.state.canPublishToMobile ? _react2.default.createElement(
              'div',
              { className: 'pc-mobile-show' },
              _react2.default.createElement(
                _antd.Checkbox,
                { disabled: !self.state.params.isMobile, className: 'publishMenu_Mobile', defaultChecked: false },
                '\u79FB\u52A8\u7AEF\u5C55\u73B0'
              )
            ) : _react2.default.createElement('div', null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'footer-btn' },
            _react2.default.createElement(
              _antd.Button,
              { type: "primary", onClick: function onClick() {
                  return _this2.handleOk();
                } },
              '\u786E\u5B9A'
            ),
            _react2.default.createElement(
              _antd.Button,
              { type: "default", onClick: function onClick() {
                  return _this2.handleCancel();
                } },
              '\u53D6\u6D88'
            )
          )
        );
        self.state.content = content;
      }
      return content;
    }
  }]);

  return PublishMenu;
}(_react2.default.Component);

exports.default = PublishMenu;