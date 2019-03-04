'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _Iframe = require('./Iframe');

var _Iframe2 = _interopRequireDefault(_Iframe);

var _portal = require('../../redux/portal');

var portalactions = _interopRequireWildcard(_portal);

var _env = require('../../helpers/env');

var _env2 = _interopRequireDefault(_env);

var _userDefineArchives = require('../user-define-archives');

var UserDefineArchives = _interopRequireWildcard(_userDefineArchives);

var _role = require('../role');

var Role = _interopRequireWildcard(_role);

var _printDesign = require('../print-design');

var PrintDesign = _interopRequireWildcard(_printDesign);

var _billDesign = require('../bill-design');

var BillDesign = _interopRequireWildcard(_billDesign);

var _platformManagement = require('../platform-management');

var PlatformManagement = _interopRequireWildcard(_platformManagement);

var _echart = require('../echart');

var Echart = _interopRequireWildcard(_echart);

var _dataauthSet = require('../dataauth-set');

var SensDataRole = _interopRequireWildcard(_dataauthSet);

var _authority = require('../authority');

var Authority = _interopRequireWildcard(_authority);

var _portal2 = require('../../../../common/components/portal');

var _portal3 = _interopRequireDefault(_portal2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _antd.Tabs.TabPane;
var Meta = null;

var PlatformComponents = {
  'user-define-archives': UserDefineArchives,
  'role': Role,
  'print-design': PrintDesign,
  'bill-design': BillDesign,
  'platform-management': PlatformManagement,
  'echart': Echart,
  'dataauth-set': SensDataRole
};
Object.assign(PlatformComponents, _portal3.default);

var PortalTabItem = function (_Component) {
  _inherits(PortalTabItem, _Component);

  function PortalTabItem(props) {
    _classCallCheck(this, PortalTabItem);

    var _this = _possibleConstructorReturn(this, (PortalTabItem.__proto__ || Object.getPrototypeOf(PortalTabItem)).call(this, props));

    Meta = _env2.default.INTERACTIVE_MODE === 'touch' ? require('meta-touch').default : require('../meta-runner').default;
    _this.list = [];
    return _this;
  }

  _createClass(PortalTabItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          needInit = _props.needInit,
          portalactions = _props.portalactions,
          index = _props.index,
          title = _props.title,
          content = _props.content,
          params = _props.params;

      if (needInit === false) return;
      portalactions.metaInit(index, { title: title, content: content, params: params });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _props2 = this.props,
          portalactions = _props2.portalactions,
          index = _props2.index;

      portalactions.destroy(index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          portal = _props3.portal,
          index = _props3.index,
          width = _props3.width,
          height = _props3.height;

      var current = portal.tabs[index];
      if (!current || !current.panes.length) return null;
      var length = current.panes.length;
      var i = void 0;
      for (i = 0; i < length; i++) {
        var pane = current.panes[i];
        var tabContent = void 0;
        if (pane.content.vm) {
          tabContent = _react2.default.createElement(Meta, {
            index: index,
            width: width,
            height: height,
            title: pane.title,
            viewModel: pane.content.vm,
            metaData: pane.content.metaData,
            id: pane.key });
        } else if (pane.content.type && pane.content.url) {
          var url = pane.content.url;

          var search = null;
          var queryStringIndex = url.indexOf('?');
          if (queryStringIndex > -1) {
            search = url.substr(queryStringIndex);
            url = url.substr(0, queryStringIndex);
          }
          var extraProps = {};
          if (search) Object.assign(extraProps, new cb.utils.queryString(search).query);
          var items = url.split('/');
          var indexCom = void 0,
              ComName = void 0;
          try {
            if (pane.content.type === 'platform') {
              indexCom = PlatformComponents[items[0]];
              ComName = items.length === 2 ? indexCom[items[1]] : indexCom.default;
              tabContent = _react2.default.createElement(ComName, _extends({ index: index, width: width, height: height, data: pane.content.data, caption: pane.caption, callback: pane.callback }, extraProps));
            } else if (pane.content.type === 'iframe') {
              tabContent = _react2.default.createElement(_Iframe2.default, { index: index, url: pane.content.url, width: width, height: height });
            }
          } catch (e) {
            console.error(e.message);
          }
        }
        if (tabContent) {
          if (this.list[i]) {
            this.list[i] = _react2.default.createElement(
              TabPane,
              { key: pane.key },
              tabContent
            );
          } else {
            this.list.push(_react2.default.createElement(
              TabPane,
              { key: pane.key },
              tabContent
            ));
          }
        }
      }
      if (this.list[i]) this.list.splice(i, 1);
      return _react2.default.createElement(
        _antd.Tabs,
        { className: 'meta-container height-100', hideAdd: true, activeKey: current.activeKey, type: 'editable-card', animated: false },
        this.list
      );
    }
  }]);

  return PortalTabItem;
}(_react.Component);

function mapStateToProps(state) {
  return {
    portal: state.portal.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    portalactions: (0, _redux.bindActionCreators)(portalactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PortalTabItem);