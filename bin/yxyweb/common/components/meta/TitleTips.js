'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _reactDom = require('react-dom');

var _carousel = require('../basic/carousel');

var _carousel2 = _interopRequireDefault(_carousel);

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TitleTips = function (_Component) {
  _inherits(TitleTips, _Component);

  function TitleTips(props) {
    _classCallCheck(this, TitleTips);

    var _this = _possibleConstructorReturn(this, (TitleTips.__proto__ || Object.getPrototypeOf(TitleTips)).call(this, props));

    _initialiseProps.call(_this);

    var popoverVisible = _this.props.config.length ? _this.props.config.map(function (v) {
      return false;
    }) : [];
    _this.state = {
      showIndex: null, // 那个Model 显示
      popoverVisible: popoverVisible
    };

    return _this;
  }

  _createClass(TitleTips, [{
    key: 'handleEnter',
    value: function handleEnter() {
      this.setState({ "icon": 'wenhaolveguo' });
    }
  }, {
    key: 'handelChange',
    value: function handelChange(visible) {
      if (!visible) {
        this.setState({ "icon": 'wenhaomoren' });
      }
    }
  }, {
    key: 'handelPopoverClick',
    value: function handelPopoverClick(index, e) {
      e.nativeEvent.stopImmediatePropagation();
      e.nativeEvent.stopPropagation();
      var popoverVisible = this.state.popoverVisible;
      popoverVisible[index] = !popoverVisible[index];
      this.state.popoverVisible = popoverVisible;
      this.setState({});
    }
  }, {
    key: 'getPopover',
    value: function getPopover(value, index) {
      var _this2 = this;

      var popoverConfig = {
        placement: 'bottom',
        overlayClassName: value.overlayClassName,
        title: value.title,
        arrowPointAtCenter: true,
        autoAdjustOverflow: false,
        mouseEnterDelay: 0.1
      };
      return value.trigger == 'hover' ? _react2.default.createElement(
        'strong',
        null,
        _react2.default.createElement(
          'span',
          { className: 'title-adds' },
          value.config.title
        ),
        _react2.default.createElement(
          _antd.Popover,
          _extends({}, popoverConfig, {
            content: _react2.default.createElement(_carousel2.default, { config: value.config }),
            onMouseEnter: function onMouseEnter() {
              return _this2.handleEnter(index);
            },
            onVisibleChange: function onVisibleChange() {
              return _this2.handelChange;
            },
            trigger: 'hover'
          }),
          _react2.default.createElement('i', { className: "anticon icon-" + value.icon })
        )
      ) : _react2.default.createElement(
        'strong',
        null,
        _react2.default.createElement(
          _antd.Popover,
          _extends({}, popoverConfig, {
            visible: this.state.popoverVisible[index],
            content: _react2.default.createElement(_carousel2.default, { config: value.config })
          }),
          _react2.default.createElement(
            'span',
            { ref: 'spanelem', className: 'title-adds', onClick: function onClick(e) {
                return _this2.handelPopoverClick(index, e);
              } },
            value.config.title
          )
        ),
        _react2.default.createElement('i', { ref: 'ielem', onClick: function onClick(e) {
            return _this2.handelPopoverClick(index, e);
          }, className: "anticon icon-" + value.icon })
      );
    }
  }, {
    key: 'contains',
    value: function contains(elem, target) {
      if (elem === target) return true;
      if (!elem || !elem.children || !elem.children.length) return false;
      for (var i = 0, len = elem.children.length; i < len; i++) {
        if (this.contains(elem.children[i], target)) return true;
      }
      return false;
    }
  }, {
    key: 'getModel',
    value: function getModel(value, index) {
      var _this3 = this;

      return _react2.default.createElement(
        'span',
        null,
        value.trigger === 'hover' ? _react2.default.createElement(_SvgIcon2.default, { type: value.icon, style: { 'cursor': 'pointer' }, onClick: function onClick() {
            return _this3.showModal(index);
          } }) : _react2.default.createElement(_SvgIcon2.default, { type: value.icon, style: { 'cursor': 'pointer' }, onMouseEnter: function onMouseEnter() {
            return _this3.showModal(index);
          } }),
        _react2.default.createElement(
          _antd.Modal,
          {
            title: 'Basic Modal',
            visible: this.state.showIndex == index,
            onOk: this.handleCancel,
            onCancel: this.handleCancel
          },
          _react2.default.createElement(_carousel2.default, { config: value.config })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      document.body.addEventListener('click', this.handleBodyClick);
      var config = this.props.config;

      if (!config.length) return null;
      return _react2.default.createElement(
        'span',
        { className: 'titleType' },
        config.map(function (value, index) {
          return value.type === 'popover' ? _this4.getPopover(value, index) : _this4.getModel(value, index);
        })
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }]);

  return TitleTips;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.handleCancel = function (e) {
    _this5.setState({ showIndex: -1 });
  };

  this.showModal = function (index) {
    _this5.setState({ showIndex: index });
  };

  this.handleBodyClick = function (e) {
    if (_this5.contains(_this5.refs.spanelem, e.target) || _this5.contains(_this5.refs.ielem, e.target)) return;
    if (e.target && cb.dom((0, _reactDom.findDOMNode)(e.target)).parents('.ant-title-tips-popover').length) return;
    document.body.removeEventListener('click', _this5.handleBodyClick);
    var popoverVisible = _this5.state.popoverVisible;

    popoverVisible = popoverVisible.map(function (v) {
      return false;
    });
    _this5.setState({ popoverVisible: popoverVisible });
  };
};

exports.default = TitleTips;