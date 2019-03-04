'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _BasicComponents = require('../BasicComponents');

var BaseComponents = _interopRequireWildcard(_BasicComponents);

var _antdMobile = require('antd-mobile');

var _SvgIcon = require('../../../common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _NavBar = require('../NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicComponentsMap = {};
var cacheRowData = {};
for (var attr in BaseComponents) {
  BasicComponentsMap[attr.toLocaleLowerCase()] = BaseComponents[attr];
}
var DetailHeaderInfo = function (_Component) {
  _inherits(DetailHeaderInfo, _Component);

  function DetailHeaderInfo(props) {
    _classCallCheck(this, DetailHeaderInfo);

    var _this = _possibleConstructorReturn(this, (DetailHeaderInfo.__proto__ || Object.getPrototypeOf(DetailHeaderInfo)).call(this, props));

    _this.initMeta = function (meta) {
      if (!meta) return;
      if (!meta.containers) return;
      var headerMeta = null;
      meta.containers.map(function (container) {
        if (container.cControlType == 'view') {
          container && container.containers.map(function (item) {
            if (item.cControlType == 'DetailHeader') headerMeta = item;
          });
        }
      });
      cacheRowData = _this.viewModel.getAllData();
      headerMeta && headerMeta.containers.map(function (container) {
        var controls = container.controls;
        if (container.cGroupCode == 'BaseLine') _this.BaseLineMeta = controls;
      });
    };

    _this.getControl = function (meta) {
      if (!meta) return null;
      var controls = [];
      meta.map(function (item) {
        var ctrlType = item.cControlType.trim().toLocaleLowerCase();
        switch (ctrlType) {
          case "money":
          case "inputnumber":
          case "treerefer":
          case "searchbox":
            ctrlType = 'input';
            break;
        }
        var ComName = BasicComponentsMap[ctrlType];
        if (!ComName) return "";
        controls.push(_react2.default.createElement(ComName, { viewMeta: item, model: _this.viewModel.get(item.cItemName) }));
      });
      return controls;
    };

    _this.goBack = function () {
      var state = _this.props.location.state;

      console.log(_this.viewModel);
      _this.viewModel.setData(cacheRowData);
      _this.context.router.history.goBack();
    };

    _this.onOk = function () {
      _this.context.router.history.goBack();
    };

    _this.getBaseControl = function () {
      var isEdit = _this.viewModel.getParams().mode === 'edit';
      var control = _this.getControl(_this.BaseLineMeta);
      return _react2.default.createElement(
        'div',
        { className: 'voucher-header-info ' + (isEdit && 'header-info-browser') },
        _react2.default.createElement(_NavBar2.default, { onLeftClick: function onLeftClick() {
            return _this.goBack();
          }, title: "基本信息" }),
        _react2.default.createElement(
          _antdMobile.List,
          { className: 'voucher-header-info-body' },
          control
        ),
        !isEdit ? null : _react2.default.createElement(
          'div',
          { className: 'button-fixed-bottom' },
          _react2.default.createElement(
            _antdMobile.Button,
            { type: 'primary', onClick: _this.onOk },
            '\u786E\u5B9A'
          )
        )
      );
    };

    var params = props.match ? props.match.params : null;
    var menuId = params ? params.menuId : null;
    var panes = menuId ? props.portal.tabs[menuId].panes : null;
    _this.state = {
      params: params
    };
    _this.viewModel = panes ? panes[panes.length - 1].content.vm : null;
    var metaView = panes ? panes[panes.length - 1].content.metaData.view : null;
    _this.BaseLineMeta = null;
    _this.initMeta(metaView);
    return _this;
  }

  _createClass(DetailHeaderInfo, [{
    key: 'render',
    value: function render() {
      var control = this.getBaseControl();
      return control;
    }
  }]);

  return DetailHeaderInfo;
}(_react.Component);

DetailHeaderInfo.contextTypes = {
  router: _propTypes2.default.object.isRequired
};

function mapStateToProps(state) {
  return {
    portal: state.portal.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DetailHeaderInfo);