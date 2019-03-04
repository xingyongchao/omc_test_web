'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _formatDate = require('../../../helpers/formatDate');

var _row = require('../../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../../basic/col');

var _col2 = _interopRequireDefault(_col);

var _SvgIcon = require('../../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { Popover, Input, Button, Radio } from 'antd-mobile';


var RadioGroup = _antd.Radio.Group;

var eChartPanelSplit = function (_React$Component) {
  _inherits(eChartPanelSplit, _React$Component);

  function eChartPanelSplit(props) {
    _classCallCheck(this, eChartPanelSplit);

    var _this = _possibleConstructorReturn(this, (eChartPanelSplit.__proto__ || Object.getPrototypeOf(eChartPanelSplit)).call(this, props));

    _this.state = {
      splitInfo: {
        splitType: "col",
        count: 2,
        num1: 1,
        num2: 1,
        num3: 1,
        bInnerBorder: true,
        bInnerMargin: true,
        bOuterBorder: false,
        bOuterMargin: false
      },
      panelType: props.panelType ? props.panelType : 1
    };
    return _this;
  }

  _createClass(eChartPanelSplit, [{
    key: 'render',
    value: function render() {
      // const { groupConditionState, groupConditionRedux } = this.props;
      var self = this;
      var content = self.getSplitContent();
      var visible = self.props.selectedColKey == self.props.colEle.colKey && self.props.curOperateType == "splitCol";

      return _react2.default.createElement(
        'div',
        { className: "eChartPanelSplit " + (self.props.colEle.backgroundImage ? "eChartPanelSplit_HasImg" : "eChartPanelSplit_NoImg") },
        _react2.default.createElement(
          _antd.Popover,
          {
            content: content,
            trigger: "click",
            visible: visible,
            onVisibleChange: function onVisibleChange(visible2) {
              return self.showContent(visible2, 1);
            }
          },
          _react2.default.createElement(
            _antd.Button,
            {
              className: 'chaifen',
              onClick: function onClick() {
                return self.showContent(true, 2);
              },
              style: { color: self.props.skinConfig ? self.props.skinConfig.designSkin.textColor : undefined },
              title: '\u62C6\u5206' },
            _react2.default.createElement(_SvgIcon2.default, { type: 'chaifen' })
          )
        )
      );
    }
  }, {
    key: 'setStateInfoValue',
    value: function setStateInfoValue(name, value) {
      var self = this;
      var splitInfo = self.state.splitInfo;
      splitInfo[name] = value;
      self.setState({ splitInfo: splitInfo });
    }
  }, {
    key: 'getSplitContent',
    value: function getSplitContent() {
      var self = this;
      var splitInfo = self.state.splitInfo;
      var content = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'eChartPanelSplit_content' },
          _react2.default.createElement(
            'div',
            { className: 'clearfix' },
            _react2.default.createElement(
              _row2.default,
              { className: 'label-title' },
              '\u62C6\u5206\u65B9\u5411'
            ),
            _react2.default.createElement(
              _row2.default,
              { className: 'direction' },
              self.state.panelType == 1 ? _react2.default.createElement(
                _col2.default,
                { className: splitInfo.splitType == "row" ? "selected" : "unselected", onClick: function onClick() {
                    return self.setStateInfoValue("splitType", "row");
                  } },
                _react2.default.createElement(_SvgIcon2.default, { type: 'hang' }),
                ' '
              ) : null,
              _react2.default.createElement(
                _col2.default,
                { className: splitInfo.splitType == "col" ? "selected" : "unselected", onClick: function onClick() {
                    return self.setStateInfoValue("splitType", "col");
                  } },
                _react2.default.createElement(_SvgIcon2.default, { type: 'lie' })
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'clearfix' },
            _react2.default.createElement(
              _row2.default,
              { className: 'label-title' },
              '\u62C6\u5206\u6570\u91CF'
            ),
            _react2.default.createElement(
              _row2.default,
              { className: 'num' },
              _react2.default.createElement(
                _antd.Button,
                { type: splitInfo.count == 2 ? "primary" : "", onClick: function onClick() {
                    return self.setStateInfoValue("count", 2);
                  } },
                '2'
              ),
              _react2.default.createElement(
                _antd.Button,
                { type: splitInfo.count == 3 ? "primary" : "", onClick: function onClick() {
                    return self.setStateInfoValue("count", 3);
                  } },
                '3'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'clearfix' },
            _react2.default.createElement(
              _row2.default,
              { className: 'label-title' },
              '\u62C6\u5206\u6BD4\u4F8B'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bili clearfix' },
              _react2.default.createElement(_antd.Input, { style: { display: "inline" }, value: splitInfo.num1, onChange: function onChange(e) {
                  return self.setStateInfoValue("num1", e.target.value);
                } }),
              _react2.default.createElement(
                'span',
                null,
                ':'
              ),
              _react2.default.createElement(_antd.Input, { style: { display: "inline" }, value: splitInfo.num2, onChange: function onChange(e) {
                  return self.setStateInfoValue("num2", e.target.value);
                } }),
              splitInfo.count == 3 ? _react2.default.createElement(
                'span',
                null,
                ':'
              ) : "",
              splitInfo.count == 3 ? _react2.default.createElement(_antd.Input, { style: { display: "inline" }, value: splitInfo.num3, onChange: function onChange(e) {
                  return self.setStateInfoValue("num3", e.target.value);
                } }) : ""
            )
          ),
          self.state.panelType == 1 ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'clearfix' },
              _react2.default.createElement(
                _row2.default,
                null,
                _react2.default.createElement(
                  'span',
                  { className: 'label-title' },
                  '\u4FDD\u7559\u5185\u5C42\u8FB9\u6846'
                ),
                _react2.default.createElement(
                  RadioGroup,
                  {
                    value: splitInfo.bInnerBorder ? true : false,
                    onChange: function onChange(e) {
                      return self.setStateInfoValue("bInnerBorder", e.target.value);
                    } },
                  _react2.default.createElement(
                    _antd.Radio,
                    { value: true },
                    '\u662F'
                  ),
                  _react2.default.createElement(
                    _antd.Radio,
                    { value: false },
                    '\u5426'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'clearfix' },
              _react2.default.createElement(
                _row2.default,
                null,
                _react2.default.createElement(
                  'span',
                  { className: 'label-title' },
                  '\u4FDD\u7559\u5185\u5C42\u95F4\u8DDD'
                ),
                _react2.default.createElement(
                  RadioGroup,
                  {
                    value: splitInfo.bInnerMargin ? true : false,
                    onChange: function onChange(e) {
                      return self.setStateInfoValue("bInnerMargin", e.target.value);
                    } },
                  _react2.default.createElement(
                    _antd.Radio,
                    { value: true },
                    '\u662F'
                  ),
                  _react2.default.createElement(
                    _antd.Radio,
                    { value: false },
                    '\u5426'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'clearfix' },
              _react2.default.createElement(
                _row2.default,
                null,
                _react2.default.createElement(
                  'span',
                  { className: 'label-title' },
                  '\u4FDD\u7559\u5916\u5C42\u8FB9\u6846'
                ),
                _react2.default.createElement(
                  RadioGroup,
                  {
                    value: splitInfo.bOuterBorder ? true : false,
                    onChange: function onChange(e) {
                      return self.setStateInfoValue("bOuterBorder", e.target.value);
                    } },
                  _react2.default.createElement(
                    _antd.Radio,
                    { value: true },
                    '\u662F'
                  ),
                  _react2.default.createElement(
                    _antd.Radio,
                    { value: false },
                    '\u5426'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'clearfix' },
              _react2.default.createElement(
                _row2.default,
                null,
                _react2.default.createElement(
                  'span',
                  { className: 'label-title' },
                  '\u4FDD\u7559\u5916\u5C42\u95F4\u8DDD'
                ),
                _react2.default.createElement(
                  RadioGroup,
                  {
                    value: splitInfo.bOuterMargin ? true : false,
                    onChange: function onChange(e) {
                      return self.setStateInfoValue("bOuterMargin", e.target.value);
                    } },
                  _react2.default.createElement(
                    _antd.Radio,
                    { value: true },
                    '\u662F'
                  ),
                  _react2.default.createElement(
                    _antd.Radio,
                    { value: false },
                    '\u5426'
                  )
                )
              )
            )
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'eChartPanelSplit_bottom clearfix' },
          _react2.default.createElement(
            _antd.Button,
            { type: "primary", onClick: function onClick() {
                return self.doFunc(true);
              } },
            '\u786E\u5B9A'
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: "default", onClick: function onClick() {
                return self.doFunc(false);
              } },
            '\u53D6\u6D88'
          )
        )
      );
      return content;
    }
  }, {
    key: 'doFunc',
    value: function doFunc(bOK) {
      var splitInfo = this.state.splitInfo;
      // splitInfo.colKey = this.props.colEle.colKey;
      this.props.doFunc(bOK, splitInfo);
    }
  }, {
    key: 'showContent',
    value: function showContent(visible, type) {
      if (visible == true && type == 2) {
        this.props.showContent(true, this.props.colEle.colKey);
      }
      if (visible == false && type == 1) {
        this.props.showContent(false);
      }
    }
  }]);

  return eChartPanelSplit;
}(_react2.default.Component);

exports.default = eChartPanelSplit;