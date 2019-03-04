'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _paymode = require('../../../../common/redux/modules/billing/paymode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { List, InputItem } from 'antd-mobile';


var InputNumberControl = function (_React$Component) {
  _inherits(InputNumberControl, _React$Component);

  function InputNumberControl(props) {
    _classCallCheck(this, InputNumberControl);

    var _this = _possibleConstructorReturn(this, (InputNumberControl.__proto__ || Object.getPrototypeOf(InputNumberControl)).call(this, props));

    _this.state = {};
    return _this;
  }
  /**componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  setListenerState = (params) => {
    let cFormatData = params.cFormatData;
    try {
      if (!cFormatData || cFormatData == '') {
        cFormatData = {};
      } else {
        cFormatData = JSON.parse(cFormatData);
      }
    } catch (e) {
      cb.utils.alert('格式化字段预制错误！', 'error');
    }
    params.cFormatData = cFormatData;
    this.setState(params);
  }
  onInputChange = (val) => {
    this.setState({ value: val });
  }
  onInputBlur = (val) => {
    if (this.props.model)
      this.props.model.setValue(val, true);
  }**/


  _createClass(InputNumberControl, [{
    key: 'render',
    value: function render() {

      return _react2.default.createElement(_input2.default, _extends({ type: 'number' }, this.props));

      /***
      let { value, bCanModify, iMaxLength, cFormatData, cShowCaption, cControlType, readOnly, disabled } = this.state;
      let prefix = (cFormatData && cFormatData.prefix) ? cFormatData.prefix : "";
      let originalValue = value;
      if (cControlType === "money" && value) {
        if (value < 0) {
          value = Math.abs(value);
        }
        value = getFixedNumber(value);
      }
      if (cb.utils.isEmpty(value)) value = "";
      let showValue = prefix + value;
      if (originalValue < 0) {
        showValue = "-" + prefix + value;
      }
      if (cb.utils.isEmpty(showValue)) showValue = "";
      let className = "textAlignRight";
      if (this.props.viewMeta && this.props.viewMeta.iAlign == 1) className = "textAlignLeft";
      if (this.props.viewMeta && this.props.viewMeta.iAlign == 2) className = "textAlignCenter";
      if (this.props.viewMeta && this.props.viewMeta.iAlign == 3) className = "textAlignRight";
      if (cShowCaption && !this.props.noTitle) {
        if(bCanModify)
            return <List>
              <InputItem className={className} readOnly={readOnly} disabled={disabled} maxLength={iMaxLength} onBlur={this.onInputBlur} onChange={this.onInputChange} placeholder="请输入" value={showValue}>{cShowCaption}</InputItem>
            </List>
        else
          return <List>
            <InputItem className={className} disabled={this.state.readOnly} editable={bCanModify} maxLength={iMaxLength} onBlur={this.onInputBlur} onChange={this.onInputChange} placeholder="请输入" value={showValue}>{cShowCaption}</InputItem>
          </List>
      } else {
        if(bCanModify)
          return (
            <List>
              <InputItem className={'noTitle'} readOnly={readOnly} disabled={disabled} maxLength={iMaxLength} onBlur={this.onInputBlur} onChange={this.onInputChange} placeholder="请输入" value={showValue}></InputItem>
            </List>
          );
        else
          return (
            <List>
              <List.Item className="noTitle" >{showValue}</List.Item>
            </List>
          );
      }
      ***/
    }
  }]);

  return InputNumberControl;
}(_react2.default.Component);

exports.default = InputNumberControl;