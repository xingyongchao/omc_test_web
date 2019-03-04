'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('../BasicComponents/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../../../../mobile/styles/globalCss/footer.css');

var CarHeaderControl = function (_Component) {
  _inherits(CarHeaderControl, _Component);

  function CarHeaderControl(props) {
    _classCallCheck(this, CarHeaderControl);

    var _this = _possibleConstructorReturn(this, (CarHeaderControl.__proto__ || Object.getPrototypeOf(CarHeaderControl)).call(this, props));

    _initialiseProps.call(_this);

    _this.key = props.key;
    _this.viewmodel = props.model;
    var controls = _this.props.controls;
    _this.visibleMap = {};
    controls && controls.map(function (item) {
      _this.visibleMap[item.cItemName] = true;
    });
    return _this;
  }

  _createClass(CarHeaderControl, [{
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
    key: 'handleVisibleChange',
    value: function handleVisibleChange(controlKey, visible) {
      var _this2 = this;

      this.visibleMap[controlKey] = visible;
      var hideCount = 0;
      var controls = this.props.controls;

      controls && controls.forEach(function (item) {
        var cItemName = item.cItemName;

        if (_this2.visibleMap[cItemName]) return;
        hideCount++;
      });
      var hide = !controls || hideCount === controls.length;
      if (this.props.onVisibleChange) this.props.onVisibleChange(!hide);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.controls) return null;
      var control = this.getFooterControl(this.props.controls);
      return _react2.default.createElement(
        'div',
        { className: 'footer_cls' },
        control
      );
    }
  }]);

  return CarHeaderControl;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.getFooterControl = function (controls) {
    var buttons = [];
    if (controls) {
      controls.map(function (control) {
        var model = _this3.viewmodel.get(control.cItemName);
        buttons.push(_react2.default.createElement(_button2.default, { model: model, onVisibleChange: function onVisibleChange(visible) {
            return _this3.handleVisibleChange(control.cItemName, visible);
          } })
        // <span className='print_cls' onClick={() => { model.fireEvent('click') }}>{control.cShowCaption}</span>
        );
      });
    }
    return buttons;
  };
};

exports.default = CarHeaderControl;