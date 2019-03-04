'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../basic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PortalComponents = [{ title: '营业概览', order: 0 }, { title: '销售排行', order: 1 }, { title: '门店销售趋势', order: 2 }];

var PortalSetting = function (_Component) {
  _inherits(PortalSetting, _Component);

  function PortalSetting(props) {
    _classCallCheck(this, PortalSetting);

    var _this = _possibleConstructorReturn(this, (PortalSetting.__proto__ || Object.getPrototypeOf(PortalSetting)).call(this, props));

    _this.state = {
      dataSource: props.dataSource || PortalComponents
    };
    _this.originalData = cb.utils.extend(true, [], _this.state.dataSource);
    return _this;
  }

  _createClass(PortalSetting, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.dataSource || nextProps.dataSource === this.state.dataSource) return;
      this.setState({ dataSource: nextProps.dataSource });
      this.originalData = cb.utils.extend(true, [], this.state.dataSource);
    }
  }, {
    key: 'getData',
    value: function getData() {
      var dataSource = this.state.dataSource;

      var flag = true;
      for (var i = 0, len = dataSource.length; i < len; i++) {
        var currentItem = dataSource[i];
        var originalItem = this.originalData[i];
        if (!originalItem) {
          return cb.utils.extend(true, [], PortalComponents);
        }
        if (currentItem.order === originalItem.order && currentItem.visible === originalItem.visible) continue;
        flag = false;
      }
      if (flag) return null;
      return cb.utils.extend(true, [], this.state.dataSource);
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter(index) {
      var dataSource = this.state.dataSource;

      var currentItem = dataSource.find(function (item) {
        return item.order === index;
      });
      currentItem.showIcon = true;
      this.setState({ dataSource: dataSource });
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave(index) {
      var dataSource = this.state.dataSource;

      dataSource.forEach(function (item) {
        item.showIcon = false;
      });
      this.setState({ dataSource: dataSource });
    }
  }, {
    key: 'sortClick',
    value: function sortClick(type, index) {
      var dataSource = this.state.dataSource;

      var swapIndex = type === 'up' ? index - 1 : index + 1;
      var currentItem = dataSource.find(function (item) {
        return item.order === index;
      });
      var swapItem = dataSource.find(function (item) {
        return item.order === swapIndex;
      });
      currentItem.order = swapIndex;
      swapItem.order = index;
      this.setState({ dataSource: dataSource });
    }
  }, {
    key: 'onChecked',
    value: function onChecked(index, checked) {
      var dataSource = this.state.dataSource;

      var currentItem = dataSource.find(function (item) {
        return item.order === index;
      });
      currentItem.visible = checked;
      this.setState({ dataSource: dataSource });
    }
  }, {
    key: 'renderItem',
    value: function renderItem(element, index, totalCount) {
      var _this2 = this;

      var showIcon = element.showIcon,
          visible = element.visible;

      var upDisabled = index === 0 ? true : false;
      var downDisabled = index === totalCount - 1 ? true : false;
      var rightIcons = showIcon ? _react2.default.createElement(
        'div',
        { className: 'pull-right' },
        _react2.default.createElement(_antd.Button, { disabled: upDisabled, style: { borderWidth: 0 }, icon: 'arrow-up', onClick: function onClick() {
            return _this2.sortClick('up', index);
          } }),
        _react2.default.createElement(_antd.Button, { disabled: downDisabled, style: { borderWidth: 0 }, icon: 'arrow-down', onClick: function onClick() {
            return _this2.sortClick('down', index);
          } })
      ) : null;
      return _react2.default.createElement(
        _basic.Row,
        { style: { minHeight: "25px" }, onMouseEnter: function onMouseEnter() {
            return _this2.onMouseEnter(index);
          }, onMouseLeave: function onMouseLeave() {
            return _this2.onMouseLeave(index);
          } },
        _react2.default.createElement(
          'div',
          { className: 'pull-left' },
          _react2.default.createElement(
            _antd.Checkbox,
            { checked: visible, onChange: function onChange(e) {
                return _this2.onChecked(index, e.target.checked);
              } },
            element.title
          )
        ),
        rightIcons
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var dataSource = this.state.dataSource;

      if (!dataSource || !dataSource.length) return null;
      var orderedData = Object.assign([], dataSource).sort(function (a, b) {
        return a.order > b.order;
      });
      var totalCount = orderedData.length;
      var components = [];
      orderedData.forEach(function (element, index) {
        var component = _this3.renderItem(element, index, totalCount);
        components.push(component);
      });
      return _react2.default.createElement(
        'div',
        { className: 'filter-txt' },
        components
      );
    }
  }]);

  return PortalSetting;
}(_react.Component);

exports.default = PortalSetting;