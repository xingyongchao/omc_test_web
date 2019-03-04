'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _BasicComponents = require('../BasicComponents');

var BaseComponents = _interopRequireWildcard(_BasicComponents);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicComponentsMap = {};
for (var attr in BaseComponents) {
  BasicComponentsMap[attr.toLocaleLowerCase()] = BaseComponents[attr];
}
var HighLight = function (_Component) {
  _inherits(HighLight, _Component);

  function HighLight(props) {
    _classCallCheck(this, HighLight);

    var _this = _possibleConstructorReturn(this, (HighLight.__proto__ || Object.getPrototypeOf(HighLight)).call(this, props));

    _this.key = props.key;
    _this.meta = props.meta;
    _this.model = props.model;
    return _this;
  }

  _createClass(HighLight, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.model) this.model.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.model) this.model.removeListener(this);
    }
  }, {
    key: '_renderComponents',
    value: function _renderComponents() {
      var _this2 = this;

      if (!this.meta) return "";
      var controls = [];
      this.meta.controls.map(function (item, index) {
        var control = _this2.getControl(item, index);
        controls.push(_react2.default.createElement(
          _antdMobile.Flex,
          { key: index },
          _react2.default.createElement(
            _antdMobile.Flex.Item,
            null,
            control
          )
        ));
      });
      return controls;
    }
  }, {
    key: 'getControl',
    value: function getControl(item, index) {
      var ctrlType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
      switch (ctrlType) {
        case "money":
          ctrlType = 'input';
          break;
      }
      var ComName = BasicComponentsMap[ctrlType];
      return _react2.default.createElement(ComName, { noTitle: true, viewMeta: item, model: this.model.get(item.cItemName) });
    }
  }, {
    key: 'render',
    value: function render() {
      var constrol = this._renderComponents();
      var className = "card_contains card-highlight";
      if (this.props.hType == 'tophighlight') className = "card_contains card-tophighlight";
      return _react2.default.createElement(
        'div',
        { className: className },
        constrol
      );
    }
  }]);

  return HighLight;
}(_react.Component);

exports.default = HighLight;