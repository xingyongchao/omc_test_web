'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _checkbox = require('../basic/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _label = require('../basic/label');

var _label2 = _interopRequireDefault(_label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxContainer = function (_Component) {
  _inherits(CheckboxContainer, _Component);

  function CheckboxContainer() {
    _classCallCheck(this, CheckboxContainer);

    return _possibleConstructorReturn(this, (CheckboxContainer.__proto__ || Object.getPrototypeOf(CheckboxContainer)).apply(this, arguments));
  }

  _createClass(CheckboxContainer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          meta = _props.meta,
          viewModel = _props.viewModel;
      var controls = meta.controls,
          cName = meta.cName,
          childrenField = meta.childrenField;

      var checkboxes = (controls || []).map(function (control) {
        var modelKey = control.cItemName;
        var controlModel = childrenField && viewModel.get(childrenField) && viewModel.get(childrenField).getEditRowModel && viewModel.get(childrenField).getEditRowModel().get(modelKey);
        if (!controlModel) controlModel = viewModel.get(modelKey);
        return _react2.default.createElement(_checkbox2.default, _extends({ model: controlModel }, control, { type: 'simple' }));
      });
      return _react2.default.createElement(
        'div',
        { className: 'meta-checkbox-container' },
        _react2.default.createElement(_label2.default, { control: checkboxes, title: cName || '' })
      );
    }
  }]);

  return CheckboxContainer;
}(_react.Component);

exports.default = CheckboxContainer;