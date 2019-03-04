'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BasicComponents = require('../BasicComponents');

var BaseComponents = _interopRequireWildcard(_BasicComponents);

var _antdMobile = require('antd-mobile');

var _SvgIcon = require('../../../common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicComponentsMap = {};
for (var attr in BaseComponents) {
  BasicComponentsMap[attr.toLocaleLowerCase()] = BaseComponents[attr];
}
var DetailHeaderControl = function (_Component) {
  _inherits(DetailHeaderControl, _Component);

  function DetailHeaderControl(props) {
    _classCallCheck(this, DetailHeaderControl);

    var _this = _possibleConstructorReturn(this, (DetailHeaderControl.__proto__ || Object.getPrototypeOf(DetailHeaderControl)).call(this, props));

    _this.initMeta = function (meta) {
      if (!meta.containers) return;
      meta.containers.map(function (container) {
        var controls = container.controls;
        if (container.cGroupCode == 'ShowLine') _this.ShowLineMeta = controls;
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
        controls.push(_react2.default.createElement(ComName, { viewMeta: item, model: _this.props.model.get(item.cItemName) }));
      });
      return controls;
    };

    _this.onClick = function () {
      var pathList = window.location.pathname.split('/');
      var pathname = pathList[pathList.length - 1];
      _this.context.router.history.push('/headerInfo/' + pathname);
    };

    _this.getBaseControl = function () {
      var control = void 0,
          mode = void 0;
      if (_this.props.model) mode = _this.props.model.getParams().mode;
      control = _this.getControl(_this.ShowLineMeta);
      return _react2.default.createElement(
        _antdMobile.List,
        { className: 'voucher-header' },
        mode != 'browse' ? _react2.default.createElement(
          _antdMobile.List.Item,
          { extra: _react2.default.createElement(_SvgIcon2.default, { style: { width: '0.42rem', height: '0.42rem' }, type: 'edit', onClick: _this.onClick }) },
          _this.props.meta.cName
        ) : null,
        _react2.default.createElement(
          'div',
          { onClick: mode === 'browse' && _this.onClick },
          control
        )
      );
    };

    _this.state = {};
    _this.viewModel = props.model;
    _this.meta = props.meta;
    _this.ShowLineMeta = null;
    _this.initMeta(props.meta);
    return _this;
  }

  _createClass(DetailHeaderControl, [{
    key: 'render',
    value: function render() {
      var control = this.getBaseControl();
      return control;
    }
  }]);

  return DetailHeaderControl;
}(_react.Component);

DetailHeaderControl.contextTypes = {
  router: _propTypes2.default.object.isRequired
};
exports.default = DetailHeaderControl;