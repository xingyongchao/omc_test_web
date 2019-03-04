'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _myHeader = require('../../../../mobile/styles/default/images/my-header.png');

var _myHeader2 = _interopRequireDefault(_myHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CarHeaderControl = function (_Component) {
  _inherits(CarHeaderControl, _Component);

  function CarHeaderControl(props) {
    _classCallCheck(this, CarHeaderControl);

    var _this = _possibleConstructorReturn(this, (CarHeaderControl.__proto__ || Object.getPrototypeOf(CarHeaderControl)).call(this, props));

    _this.key = props.key;
    _this.meta = props.meta;
    _this.model = props.model;
    return _this;
  }

  _createClass(CarHeaderControl, [{
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
      this.meta.containers.map(function (item, index) {
        var control = _this2.getControl(item, index);
        if (control) controls.push(_react2.default.createElement(
          _antdMobile.Flex,
          null,
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
      var ctrlType = item.cControlType.trim().toLocaleLowerCase();
      var model = this.props.model;

      switch (ctrlType) {
        case "member":
          if (!model.get('iMemberid').getValue() || model.get('iMemberid').getValue() === 0) {
            return null;
          }
          return _react2.default.createElement(
            'div',
            { className: 'detail_tab_bar_v detail_tab_ba_status', style: { marginTop: "0" } },
            _react2.default.createElement(
              'div',
              { className: 'message', style: { lineHeight: '0.3rem' } },
              _react2.default.createElement(
                'ul',
                { className: 'message_header' },
                _react2.default.createElement(
                  'li',
                  null,
                  !cb.utils.isEmpty(model.get('avatar')) ? _react2.default.createElement('img', { src: model.get('avatar').getValue() }) : _react2.default.createElement('div', { className: 'default-avatar' })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'span',
                    null,
                    model.get('iMemberid_name').getValue()
                  )
                )
              ),
              _react2.default.createElement(
                'ul',
                { className: 'number_dk' },
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'span',
                    null,
                    model.get('fPointPay').getValue()
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  '\u62B5\u6263\u79EF\u5206'
                )
              ),
              _react2.default.createElement(
                'ul',
                { className: 'number_bd' },
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'span',
                    null,
                    model.get('fPointCurrent').getValue()
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  '\u672C\u5355\u79EF\u5206'
                )
              )
            )
          );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this._renderComponents();
      if (control.length === 0) {
        return _react2.default.createElement('div', null);
      }
      return _react2.default.createElement(
        'div',
        { className: 'billing_top_margin' },
        control
      );
    }
  }]);

  return CarHeaderControl;
}(_react.Component);

exports.default = CarHeaderControl;