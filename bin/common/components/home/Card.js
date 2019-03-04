'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../../../yxyweb/common/components/basic');

var _HomeCommon = require('./HomeCommon');

var common = _interopRequireWildcard(_HomeCommon);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _formatDate = require('../../../yxyweb/common/helpers/formatDate');

var format = _interopRequireWildcard(_formatDate);

var _tabs = require('../../../yxyweb/common/redux/tabs');

var tabsactions = _interopRequireWildcard(_tabs);

var _portal = require('../../../yxyweb/common/redux/portal');

var portalactions = _interopRequireWildcard(_portal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardControl = exports.CardControl = function (_React$Component) {
  _inherits(CardControl, _React$Component);

  function CardControl(props) {
    _classCallCheck(this, CardControl);

    var _this = _possibleConstructorReturn(this, (CardControl.__proto__ || Object.getPrototypeOf(CardControl)).call(this, props));

    _this.state = {
      title: props.title || "通知公告",
      extra: props.extra || _react2.default.createElement(
        'a',
        { onClick: function onClick(e) {
            return _this.onClick(e, 'more');
          } },
        '\u66F4\u591A'
      ),
      dataSource: props.dataSource || [],
      style: props.style
    };
    // this.getData(props.type);

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  _createClass(CardControl, [{
    key: 'onClick',
    value: function onClick(e) {
      // let activeKey = (this.props.type == 'notice') ? "AABS07" : "KL02";
      // var _props = this.props,
      //   tabsactions = _props.tabsactions,
      //   portalactions = _props.portalactions,
      //   tabs = _props.tabs,
      //   portal = _props.portal;
      // var index = tabs.panes.findIndex(function (pane) {
      //   return pane.key === activeKey;
      // });
      // if (index > -1) {
      //   tabsactions.activateItem(activeKey);
      //   var current = portal.tabs[activeKey];
      //   if (!current || !current.panes.length || current.panes.length === 1) return;
      //   var currentPanes = current.panes;
      //   var activeContent = currentPanes[currentPanes.length - 1].content;
      //   if (activeContent.vm) {
      //     activeContent.vm.promiseExecute('return', '返回', function () {
      //       portalactions.firstItem(activeKey);
      //     });
      //   } else if (activeContent.type && activeContent.url) {
      //     if (activeContent.checkReturn) {
      //       portalactions.refreshItem(activeKey, '返回', function () {
      //         portalactions.firstItem(activeKey);
      //       });
      //     } else {
      //       portalactions.firstItem(activeKey);
      //     }
      //   }
      //   return;
      // }
      // var params = {};
      // if (this.props.type == 'notice')
      //   params = { "level": 1, "name": "公告列表", "code": "AABS07", "isEnd": true, "parentCode": "AABS", "metaKey": "aa_noticelist", "id": 827, "subId": "AA", "authLevel": 1, "metaType": "voucherlist", "viewType": "meta", "userClick": true, "menuId": "AABS07" };
      // if (this.props.type == 'knowledge')
      //   params = { "level": 1, "name": "知识库", "code": "KL02", "isEnd": true, "parentCode": "KLB", "metaKey": "aa_informationlist", "id": 818, "subId": "KL", "authLevel": 3, "metaType": "voucherlist", "viewType": "meta", "userClick": true, "menuId": "KL02" };

      // cb.loader.runCommandLine('menu', params, null, tabsactions.addItem);
    }
  }, {
    key: 'onRowClick',
    value: function onRowClick(e, data) {}
    // let activeKey = (this.props.type == 'notice') ? "AABS07" : "KL02";
    // let title = (this.props.type == 'notice') ? "公告详情" : "文档详情";
    // let type = this.props.type;
    // var _props = this.props,
    //   tabsactions = _props.tabsactions,
    //   portalactions = _props.portalactions,
    //   tabs = _props.tabs,
    //   portal = _props.portal;
    // var index = tabs.panes.findIndex(function (pane) {
    //   return pane.key === activeKey;
    // });
    // if (index > -1) {
    //   tabsactions.activateItem(activeKey);
    //   let content = { title: title, type: 'platform', url: 'knowledgeBase/browseKnowledge', data: { params: { mode: 'browse', dataSource: data }, parentViewModel: tabs.panes[index].content.vm } };
    //   if (type == 'notice') content.url = 'noticeBase/browseNotice';
    //   portalactions.addItem(activeKey, { title: title, content: content });
    // } else {
    //   var callback = function (callbackData) {
    //     tabsactions.addItem(callbackData);
    //     let content = { title: title, type: 'platform', url: 'knowledgeBase/browseKnowledge', data: { params: { mode: 'browse', dataSource: data }, parentViewModel: callbackData.content.vm } };
    //     if (type == 'notice') content.url = 'noticeBase/browseNotice';
    //     portalactions.addItem(activeKey, { title: title, content: content });
    //   }
    //   var params = {};
    //   if (type == 'notice')
    //     params = { "level": 1, "name": "公告列表", "code": "AABS07", "isEnd": true, "parentCode": "AABS", "metaKey": "aa_noticelist", "id": 827, "subId": "AA", "authLevel": 1, "metaType": "voucherlist", "viewType": "meta", "userClick": true, "menuId": "AABS07" };
    //   if (type == 'knowledge')
    //     params = { "level": 1, "name": "知识库", "code": "KL02", "isEnd": true, "parentCode": "KLB", "metaKey": "aa_informationlist", "id": 818, "subId": "KL", "authLevel": 3, "metaType": "voucherlist", "viewType": "meta", "userClick": true, "menuId": "KL02" };

    //   cb.loader.runCommandLine('menu', params, null, callback);
    // }

    // getData(type) {
    //   let renderData = {};
    //   var proxy = cb.rest.DynamicProxy.create({
    //     getlist: { url: 'bill/list.do', method: 'POST', options: { token: true } }
    //   });
    //   if (type == 'knowledge')
    //     renderData = { "page": { "pageSize": 8, "pageIndex": 1 }, "condition": { "commonVOs": [{ "itemName": "schemeName", "value1": "AA_aa_informationlist" }], "filtersId": "241490", "solutionId": 612 }, "billnum": "aa_informationlist" };
    //   if (type == 'notice')
    //     renderData = { "page": { "pageSize": 8, "pageIndex": 1 }, "condition": { "commonVOs": [{ "itemName": "schemeName", "value1": "AA_aa_noticelist" }], "filtersId": "248647", "solutionId": 640 }, "billnum": "aa_noticelist" };
    //   proxy.getlist(renderData, function (err, result) {
    //     if (err) {
    //       console.error(err.message);
    //       return;
    //     }
    //     if (!result) return
    //     this.setState({ dataSource: result.recordList });
    //   }, this);
    // }

  }, {
    key: 'getCardContent',
    value: function getCardContent() {
      var _this2 = this;

      var dataSource = this.state.dataSource;
      var cardControl = [];
      dataSource.forEach(function (data) {
        var date = data.createTime;
        date = common.Format(new Date(date), 'MM-dd');
        cardControl.push(_react2.default.createElement(
          _basic.Row,
          { key: data.id },
          _react2.default.createElement(
            _basic.Col,
            { className: 'textCol', span: 20 },
            _react2.default.createElement(
              'a',
              { onClick: function onClick(e) {
                  return _this2.onRowClick(e, data);
                }, title: data.name },
              '[ \u516C\u544A ]',
              data.name
            )
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 4, style: { textAlign: 'right', color: '#999' } },
            date
          )
        ));
      }, this);
      return _react2.default.createElement(
        'div',
        null,
        cardControl
      );
    }
  }, {
    key: 'render',
    value: function render() {
      // let content = this.getCardContent();
      var date = format.Format(new Date(), 'MM-dd');
      return _react2.default.createElement(
        'div',
        { className: 'home-panel-5 home-notice' },
        _react2.default.createElement(
          _antd.Card,
          { title: this.state.title, bordered: false, extra: this.state.extra, style: this.state.style },
          _react2.default.createElement(
            _basic.Row,
            { key: '1' },
            _react2.default.createElement(
              _basic.Col,
              { className: 'textCol', span: 24 },
              _react2.default.createElement(
                'a',
                null,
                '[\u516C\u544A] \u5173\u4E8E\u5341\u4E00\u4FC3\u9500\u6D3B\u52A8\u7684\u8BF4\u660E'
              ),
              _react2.default.createElement(
                'div',
                null,
                date
              )
            )
          ),
          _react2.default.createElement(
            _basic.Row,
            { key: '2' },
            _react2.default.createElement(
              _basic.Col,
              { className: 'textCol', span: 24 },
              _react2.default.createElement(
                'a',
                null,
                '[\u516C\u544A] \u5173\u4E8E\u95E8\u5E97\u7F8E\u89C2\u9648\u8BBE\u7684\u8BF4\u660E'
              ),
              _react2.default.createElement(
                'div',
                null,
                date
              )
            )
          ),
          _react2.default.createElement(
            _basic.Row,
            { key: '3' },
            _react2.default.createElement(
              _basic.Col,
              { className: 'textCol', span: 24 },
              _react2.default.createElement(
                'a',
                null,
                '[\u516C\u544A] \u95E8\u5E97\u65B0\u5458\u5DE5\u57F9\u8BAD\u5B66\u4E60'
              ),
              _react2.default.createElement(
                'div',
                null,
                date
              )
            )
          ),
          _react2.default.createElement(
            _basic.Row,
            { key: '4' },
            _react2.default.createElement(
              _basic.Col,
              { className: 'textCol', span: 24 },
              _react2.default.createElement(
                'a',
                null,
                '[\u516C\u544A] \u95E8\u5E97\u9500\u552E\u4E1A\u7EE9\u5927PK\u7684\u8BF4\u660E'
              ),
              _react2.default.createElement(
                'div',
                null,
                date
              )
            )
          )
        )
      );
    }
  }]);

  return CardControl;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    tabs: state.tabs.toJS(),
    portal: state.portal.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tabsactions: (0, _redux.bindActionCreators)(tabsactions, dispatch),
    portalactions: (0, _redux.bindActionCreators)(portalactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CardControl);