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

var _fileUpload = require('../../file-upload');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _SvgIcon = require('../../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _eChartUpLoad = require('../eChartUpLoad');

var _eChartUpLoad2 = _interopRequireDefault(_eChartUpLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioGroup = _antd.Radio.Group;

var eChartPanelSetImageText = function (_React$Component) {
  _inherits(eChartPanelSetImageText, _React$Component);

  function eChartPanelSetImageText(props) {
    _classCallCheck(this, eChartPanelSetImageText);

    // curOperateType == "setImageText"
    var _this = _possibleConstructorReturn(this, (eChartPanelSetImageText.__proto__ || Object.getPrototypeOf(eChartPanelSetImageText)).call(this, props));

    var self = _this;
    var colEle = self.props.colEle;
    var info = void 0;
    if (colEle.widgetType == "imagetext") {
      info = colEle.panelImageTextConfig;
    } else {
      info = {
        subType: "title", //title  logo
        title: colEle.panelImageTextConfig ? colEle.panelImageTextConfig.title : "默认图文示例",
        height: '100%',
        width: '100%',
        fontSize: 24,
        color: '#333',
        textAlign: 'center',
        fontFamily: 'STKaiti', // STSong = 华文宋体 // LiSu = 隶书 // YouYuan = 幼圆 // STXihei = 华文细黑 // STKaiti = 华文楷体 // STZhongsong = 华文中宋 // STFangsong = 华文仿宋 // FZShuTi = 方正舒体 // FZYaoti = 方正姚体 // STCaiyun = 华文彩云 // STHupo = 华文琥珀 // STLiti = 华文隶书 // STXingkai = 华文行楷 // STXinwei = 华文新魏
        // position: "absolute"
        alignItems: "center",
        display: "flex",
        logoImg: "",
        logoPosition: { horizontal: "left", vertical: "top" }, //horizontal：left center right   vertical：top middle bottom
        logoStretch: false

      };
    }
    _this.state = { info: info };
    return _this;
  }

  _createClass(eChartPanelSetImageText, [{
    key: 'render',
    value: function render() {
      // const { groupConditionState, groupConditionRedux } = this.props;
      var self = this;
      var content = self.getCardContent();

      return _react2.default.createElement(
        _antd.Modal,
        {
          className: 'eChartPanelDesign_SetImageText',
          title: '\u6DFB\u52A0\u56FE\u6587',
          onOk: function onOk(e) {
            return self.doFunc(true);
          },
          onCancel: function onCancel(e) {
            return self.doFunc(false);
          },
          visible: true
        },
        content
      );
    }
  }, {
    key: 'setSubType',
    value: function setSubType(value) {
      this.state.info.subType = value;
      this.setState();
    }
  }, {
    key: 'getCardSubContent',
    value: function getCardSubContent() {
      var self = this;
      var subType = self.state.info.subType;
      var content = void 0;
      if (subType == "title") {
        content = _react2.default.createElement(
          'div',
          { className: 'tw' },
          _react2.default.createElement(
            _row2.default,
            null,
            _react2.default.createElement(
              'span',
              null,
              '\u6807\u9898\u540D\u79F0'
            ),
            _react2.default.createElement(_antd.Input, { defaultValue: self.state.info.title, onChange: function onChange(e) {
                return self.setStateInfoValue("title", e.target.value);
              } })
          ),
          _react2.default.createElement(
            _row2.default,
            { className: 'fontSize' },
            _react2.default.createElement(
              'span',
              null,
              '\u5B57\u4F53\u5927\u5C0F'
            ),
            _react2.default.createElement(_antd.Input, { defaultValue: self.state.info.fontSize, onChange: function onChange(e) {
                return self.setStateInfoValue("fontSize", e.target.value);
              } })
          )
        );
      } else if (subType == "logo") {
        content = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _row2.default,
            null,
            _react2.default.createElement(
              'span',
              null,
              'LOGO'
            ),
            _react2.default.createElement(_eChartUpLoad2.default, {
              doUpload: function doUpload(logoImg) {
                return self.doUpload(logoImg);
              },
              logoImg: self.state.info.logoImg
            })
          ),
          _react2.default.createElement(
            _row2.default,
            null,
            _react2.default.createElement(
              'span',
              null,
              '\u5BF9\u9F50\u65B9\u5F0F'
            ),
            _react2.default.createElement(
              'div',
              { className: 'fl clearfix' },
              _react2.default.createElement(
                _col2.default,
                { title: '\u5C45\u5DE6', className: self.state.info.logoPosition.horizontal == "left" ? "selected" : "unselected", onClick: function onClick() {
                    return self.setLogoPosition("horizontal", "left");
                  } },
                _react2.default.createElement(_SvgIcon2.default, { type: 'zuoce' })
              ),
              _react2.default.createElement(
                _col2.default,
                { title: '\u5C45\u4E2D', className: self.state.info.logoPosition.horizontal == "center" ? "selected" : "unselected", onClick: function onClick() {
                    return self.setLogoPosition("horizontal", "center");
                  } },
                _react2.default.createElement(_SvgIcon2.default, { type: 'zhongjian' })
              ),
              _react2.default.createElement(
                _col2.default,
                { title: '\u5C45\u53F3', className: self.state.info.logoPosition.horizontal == "right" ? "selected" : "unselected", onClick: function onClick() {
                    return self.setLogoPosition("horizontal", "right");
                  } },
                _react2.default.createElement(_SvgIcon2.default, { type: 'youce' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'fl clearfix' },
              _react2.default.createElement(
                _col2.default,
                { title: '\u5C45\u4E0A', className: self.state.info.logoPosition.vertical == "top" ? "selected" : "unselected", onClick: function onClick() {
                    return self.setLogoPosition("vertical", "top");
                  } },
                _react2.default.createElement(_SvgIcon2.default, { type: 'dingbu' })
              ),
              _react2.default.createElement(
                _col2.default,
                { title: '\u5C45\u4E2D', className: self.state.info.logoPosition.vertical == "middle" ? "selected" : "unselected", onClick: function onClick() {
                    return self.setLogoPosition("vertical", "middle");
                  } },
                _react2.default.createElement(_SvgIcon2.default, { type: 'zhongjian' })
              ),
              _react2.default.createElement(
                _col2.default,
                { title: '\u5C45\u4E0B', className: self.state.info.logoPosition.vertical == "bottom" ? "selected" : "unselected", onClick: function onClick() {
                    return self.setLogoPosition("vertical", "bottom");
                  } },
                _react2.default.createElement(_SvgIcon2.default, { type: 'dibu' })
              )
            )
          )
        );
      }
      return content;
    }
  }, {
    key: 'doUpload',
    value: function doUpload(logoImg) {
      this.state.info.logoImg = logoImg;
      this.setState();
      // address:"http://ov62qgheo.bkt.clouddn.com/09d05aa4-ca45-4012-b5a9-e6e81052af4f.jpg"
      // id:"rc-upload-1528874271995-7"
      // name:"Tulips.jpg"
      // percent:100
      // size:620888
      // type:"image/jpeg"
    }
  }, {
    key: 'setLogoPosition',
    value: function setLogoPosition(type, value) {
      var logoPosition = this.state.info.logoPosition;
      logoPosition[type] = value;
      this.setState();
    }
  }, {
    key: 'getCardContent',
    value: function getCardContent() {
      var self = this;
      var info = self.state.info;
      var subContent = self.getCardSubContent();
      var content = _react2.default.createElement(
        'div',
        { className: 'tuwen-xs' },
        _react2.default.createElement(
          'span',
          { className: 'tw' },
          '\u56FE\u6587\u5F62\u5F0F'
        ),
        _react2.default.createElement(
          RadioGroup,
          {
            onChange: function onChange(e) {
              return self.setSubType(e.target.value);
            },
            value: self.state.info.subType },
          _react2.default.createElement(
            _antd.Radio,
            { value: "title" },
            '\u6807\u9898'
          ),
          _react2.default.createElement(
            _antd.Radio,
            { value: "logo" },
            'LOGO'
          )
        ),
        subContent
      );
      return content;
    }
  }, {
    key: 'setStateInfoValue',
    value: function setStateInfoValue(name, value) {
      var self = this;
      var info = self.state.info;
      info[name] = value;
      self.setState({ info: info });
    }
  }, {
    key: 'doFunc',
    value: function doFunc(bOK) {
      if (bOK) {
        var info = this.state.info;
        // if (info.title == "") {
        //   cb.utils.alert('请设置标题', 'error');
        // }
        if (info.subType == "title") {
          if (info.fontSize == "") {
            cb.utils.alert('请设置字体大小', 'error');
          } else {
            this.props.doFunc(bOK, info);
          }
        } else if (info.subType == "logo") {
          if (info.logoImg == "") {
            cb.utils.alert('请设置背景图片', 'error');
          } else {
            this.props.doFunc(bOK, info);
          }
        }
      } else {
        this.props.doFunc(bOK);
      }
    }
  }]);

  return eChartPanelSetImageText;
}(_react2.default.Component);

exports.default = eChartPanelSetImageText;