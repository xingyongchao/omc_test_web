'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BasicComponents = require('../BasicComponents');

var BaseComponents = _interopRequireWildcard(_BasicComponents);

var _antdMobile = require('antd-mobile');

var _env = require('../../../common/helpers/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../../../../mobile/styles/globalCss/card.css');

var BasicComponentsMap = {};
for (var attr in BaseComponents) {
  BasicComponentsMap[attr.toLocaleLowerCase()] = BaseComponents[attr];
}
var CardControl = function (_Component) {
  _inherits(CardControl, _Component);

  function CardControl(props) {
    _classCallCheck(this, CardControl);

    var _this = _possibleConstructorReturn(this, (CardControl.__proto__ || Object.getPrototypeOf(CardControl)).call(this, props));

    _this.recursiveContainer = function (containers) {
      var controls = [],
          control = null;
      containers.map(function (container) {
        if (container.cControlType == 'table1') {
          var Table = BasicComponentsMap.table;
          control = _react2.default.createElement(
            _antdMobile.Flex,
            { key: container.childrenField },
            _react2.default.createElement(
              _antdMobile.Flex.Item,
              null,
              _react2.default.createElement(Table, { viewMeta: container.controls, title: container.cName, model: _this.model.get(container.childrenField) })
            )
          );
          controls.push(control);
        } else {
          if (container.controls) {
            control = _this.recursiveControl(container.controls, container.cControlType);
            controls.push(control);
          }
        }
      });
      return controls;
    };

    _this.recursiveControl = function (controls, cControlType) {
      var list = [];
      controls.map(function (item, index) {
        var control = _this.getControl(item);
        list.push(_react2.default.createElement(
          _antdMobile.Flex,
          { key: index },
          _react2.default.createElement(
            _antdMobile.Flex.Item,
            null,
            control
          )
        ));
      });
      return list;
    };

    _this.key = props.key;
    _this.meta = props.meta;
    _this.model = props.model;
    _this.cStyle = null;
    if (_this.meta.cStyle) {
      try {
        _this.cStyle = JSON.parse(_this.meta.cStyle);
      } catch (e) {
        cb.utils.alert('格式化字段，预制错误！', 'error');
      }
    }
    return _this;
  }

  _createClass(CardControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) {
        this.props.model.addListener(this);
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.model) {
        this.props.model.removeListener(this);
      }
    }
  }, {
    key: '_renderComponent',
    value: function _renderComponent() {
      if (!this.meta) return "";
      var control = void 0;
      if (this.meta.controls) control = this.recursiveControl(this.meta.controls);
      if (this.meta.containers) control = this.recursiveContainer(this.meta.containers);
      return _react2.default.createElement(
        'div',
        null,
        control
      );
    }
  }, {
    key: 'getControl',
    value: function getControl(item) {
      var ctrlType = item.cControlType.trim().toLocaleLowerCase();
      switch (ctrlType) {
        case "money":
        case "inputnumber":
          ctrlType = 'input';
          break;
      }
      var ComName = BasicComponentsMap[ctrlType];
      if (!ComName) return "";
      return _react2.default.createElement(ComName, { viewMeta: item, model: this.model.get(item.cItemName) });
    }
  }, {
    key: 'render',
    value: function render() {
      var mode = this.props.model && this.props.model.getParams().mode;
      if (mode != _env2.default.VOUCHER_STATE_BROWSE) return null;
      var controls = this._renderComponent();
      return _react2.default.createElement(
        'div',
        { className: 'card_contains' },
        controls
      );
    }
  }]);

  return CardControl;
}(_react.Component);

exports.default = CardControl;