"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *** 参数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** colCount number 下分的列数，如有此参数，会传导给子控件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 如果没有colCount参数，相当于将控件分为24列
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** gutter number 子控件的间隔宽度，单位是px
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** flex string 使用flex布局
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * flex可接受值是 top middle bottom start end center space-around space-between
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * flex可以包含多个值，用空格分隔
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** className string 外联样式
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** style object 内联样式
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** 2016-11-25 zhangmyh
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 支持gutter、flex
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** 2016-11-22 zhangmyh
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 建立文件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


//import { assignIn } from 'lodash';

var Row = function (_React$Component) {
  _inherits(Row, _React$Component);

  function Row() {
    _classCallCheck(this, Row);

    return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
  }

  _createClass(Row, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          children = _props.children,
          colCount = _props.colCount,
          className = _props.className,
          gutter = _props.gutter,
          flex = _props.flex,
          style = _props.style,
          others = _objectWithoutProperties(_props, ["children", "colCount", "className", "gutter", "flex", "style"]); //style


      var editFlag = false,
          gut = 0,
          newchildren = void 0;

      //判断是否需要植入参数到子控件的props
      if (colCount || gutter) editFlag = true;
      var classStr = "ant-row";
      //flex
      if (flex) {
        var flexstr = "";
        flex.split(' ').forEach(function (f) {
          flexstr += " ant-row-flex-" + f;
        });
        classStr += "-flex" + flexstr;
      }
      //className
      if (className) classStr += " " + className;
      //gutter
      if (gutter) {
        gut = gutter % 2 != 0 ? (gutter - 1) / 2 : gutter / 2;
        if (!style) style = {};
        style.marginLeft = style.marginRight = 0 - gut;
      }

      //将参数植入到子控件的props中
      if (editFlag) {
        var config = { key: 0 };
        if (colCount && !isNaN(colCount) && colCount > 0)
          //config.colWidth = parseFloat((100/colCount).toFixed(2));
          config.colWidth = 100 / colCount;
        if (gut) {
          config.style = {
            paddingLeft: gut,
            paddingRight: gut
          };
        }

        if (children.map) {
          newchildren = children.map(function (child, i) {
            if (typeof child.type === 'string') return child;
            if (child) {
              config.key = i;
              return _react2.default.cloneElement(child, config);
            }
            return null;
          });
        } else {
          newchildren = _react2.default.cloneElement(children, config);
        }
      }

      return _react2.default.createElement(
        "div",
        _extends({ className: classStr, style: style }, others),
        editFlag ? newchildren : children
      );
    }
  }]);

  return Row;
}(_react2.default.Component);

exports.default = Row;