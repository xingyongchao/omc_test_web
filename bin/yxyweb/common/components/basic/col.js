'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *** 参数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** span multi 列宽度
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * span为百分比字符串时，列宽度是父控件的对应百分比
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * span为带有单位的字符串时，列宽度是固定宽度
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * span为数字或者数字字符串时，如果父控件是Row，则span代表占有的列数，0代表宽度为0px
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * span为"all"，控件会占据剩余列
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * span为"line"，控件会占据一整行
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * span为"auto"，控件宽度自行调整
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** offset multi 左侧间隔距离
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * offset为百分比字符串时，间隔距离是父控件的对应百分比
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * offset为带有单位的字符串时，间隔距离是固定宽度
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * offset为数字或者数字字符串时，如果父控件是Row，则offset代表控件左侧空出的列数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** className string 外联样式
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** style object 内联样式
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** 2016-12-13 zhangmyh
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 使用自定义CSS，支持自适应宽度
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** 2016-11-25 zhangmyh
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 支持gutter、flex
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** 2016-11-22 zhangmyh
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 建立文件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Col = function (_React$Component) {
  _inherits(Col, _React$Component);

  function Col() {
    _classCallCheck(this, Col);

    return _possibleConstructorReturn(this, (Col.__proto__ || Object.getPrototypeOf(Col)).apply(this, arguments));
  }

  _createClass(Col, [{
    key: 'getWidth',
    value: function getWidth(widthStr, colWidth) {
      var width = '';
      if (isNaN(widthStr) && widthStr != "") {
        //if (width.lastIndexOf('%') > -1)
        width = widthStr;
      } else {
        if (widthStr != 0) {
          width = parseInt(widthStr);
          if (!colWidth) colWidth = 100 / 24;
          width *= colWidth;
          if (width > 100) width = 100;
          width = width + "%";
        }
      }
      return width;
    }
  }, {
    key: 'widthConvert',
    value: function widthConvert(widthStr, colWidth) {
      var width = '',
          className = '',
          flag = false;

      if (!widthStr) {
        if (isNaN(widthStr) && colWidth && colWidth > 0) widthStr = 1;else if (widthStr == 0) {
          className = 'col-none';
          flag = true;
        } else {
          className = 'col-all'; //0暂时认为是无效值
          flag = true;
        }
      }

      if (!flag) {
        flag = true;
        if (widthStr == "auto") className = 'col-auto';else if (widthStr == "all") className = 'col-all';else if (widthStr == "line") className = 'col-line';else flag = false;
      }

      if (!flag) {
        width = this.getWidth(widthStr, colWidth);
        if (widthStr == 0) className = 'col-none';else className = 'col-float';
      }

      return [width, className];
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          colWidth = _props.colWidth,
          span = _props.span,
          offset = _props.offset,
          style = _props.style,
          others = _objectWithoutProperties(_props, ['children', 'className', 'colWidth', 'span', 'offset', 'style']);

      var styleObj = {},
          classArr = [];
      var comWidth = '',
          comLeft = '',
          classStr = '';

      //width

      //offset
      var _widthConvert = this.widthConvert(span, colWidth);

      var _widthConvert2 = _slicedToArray(_widthConvert, 2);

      comWidth = _widthConvert2[0];
      classStr = _widthConvert2[1];
      comLeft = this.getWidth(offset, colWidth);

      //style
      if (comWidth) styleObj.width = comWidth;
      if (comLeft) styleObj.marginLeft = comLeft;
      if (style) styleObj = (0, _lodash.assignIn)(styleObj, style);

      //className
      if (className) classArr = className.split(' ');
      if (classStr) classArr.unshift(classStr);

      return _react2.default.createElement(
        'div',
        _extends({ className: classArr.join(' '), style: styleObj }, others),
        children
      );
    }
  }]);

  return Col;
}(_react2.default.Component);

exports.default = Col;