'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basic = require('../basic');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TotalContainerOld = function (_Component) {
  _inherits(TotalContainerOld, _Component);

  function TotalContainerOld() {
    _classCallCheck(this, TotalContainerOld);

    return _possibleConstructorReturn(this, (TotalContainerOld.__proto__ || Object.getPrototypeOf(TotalContainerOld)).apply(this, arguments));
  }

  _createClass(TotalContainerOld, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          meta = _props.meta,
          viewModel = _props.viewModel;

      var controlModel = viewModel.get(meta.cCode);
      return _react2.default.createElement(Total, { code: meta.cGroupCode, model: controlModel });
    }
  }]);

  return TotalContainerOld;
}(_react.Component);

exports.default = TotalContainerOld;

var Total = function (_Component2) {
  _inherits(Total, _Component2);

  function Total(props) {
    _classCallCheck(this, Total);

    var _this2 = _possibleConstructorReturn(this, (Total.__proto__ || Object.getPrototypeOf(Total)).call(this, props));

    _this2.state = {
      controls: []
    };
    return _this2;
  }

  _createClass(Total, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(params) {
      var _this3 = this;

      var code = this.props.code;
      this.totalFields = {};
      var controls = [];
      _lodash2.default.forEach(params.columns, function (item, key) {
        var config = null;
        try {
          config = JSON.parse(item.cStyle);
        } catch (e) {
          config = {};
        }
        if (!config.highlight) return;
        if (config.code && config.code !== code) return;
        var totalField = { caption: item.cShowCaption, value: 0 };
        _this3.totalFields[key] = totalField;
        controls.push(totalField);
      });
      this.setState({ controls: controls });
    }
  }, {
    key: 'setSum',
    value: function setSum(sumData) {
      if (!sumData.length) sumData = [{}];
      var controls = [];
      _lodash2.default.forEach(this.totalFields, function (item, key) {
        controls.push({ caption: item.caption, value: sumData[0][key] || 0 });
      });
      this.setState({ controls: controls });
    }
  }, {
    key: 'render',
    value: function render() {
      var controls = this.state.controls;

      if (!controls.length) return null;
      var itemClassName = 'rpt-zhekou-' + (controls.length === 1 ? 'padding' : 'center');
      var children = [];
      var width = 100 / controls.length;
      controls.forEach(function (item) {
        children.push(_react2.default.createElement(
          'div',
          { className: 'rpt-zhekou-list', style: { float: 'left', width: width + '%' } },
          _react2.default.createElement(
            'div',
            { className: 'zhekou-name' },
            _react2.default.createElement(
              'h3',
              { className: itemClassName },
              item.caption
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'zhekou-number' },
            _react2.default.createElement(
              'h4',
              { className: itemClassName },
              item.value
            )
          )
        ));
      });
      return _react2.default.createElement(
        _basic.Row,
        { className: 'rpt-zhekou' },
        children
      );
    }
  }]);

  return Total;
}(_react.Component);