'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Avatar = function (_Component) {
  _inherits(Avatar, _Component);

  function Avatar(props) {
    _classCallCheck(this, Avatar);

    var _this = _possibleConstructorReturn(this, (Avatar.__proto__ || Object.getPrototypeOf(Avatar)).call(this, props));

    _this.handleChange = function (info) {
      if (info.file.status === 'done') {
        if (info.file.response.code == 200) {
          var value = _this.DocumentServerAddress + info.file.response.data;
          if (_this.props.model) _this.props.model.setValue(value, true);
          cb.utils.alert(info.file.name + ' \u4E0A\u4F20\u6210\u529F\uFF01', 'success');
        } else {
          cb.utils.alert(info.file.name + ' \u4E0A\u4F20\u5931\u8D25\uFF01' + info.file.response.code + ' : ' + info.file.response.message, 'error');
        }
      } else if (info.file.status === 'error') {
        cb.utils.alert(info.file.name + ' \u4E0A\u4F20\u5931\u8D25\uFF01' + info.file.response.code + ' : ' + info.file.response.message, 'error');
      }
    };

    var cStyle = props.cStyle;

    var config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }
    _this.state = Object.assign({
      displaymode: 'default',
      bIsNull: props.bIsNull,
      visible: !props.bHidden,
      caption: props.cShowCaption,
      err: '',
      msg: ''
    }, config);
    _this.DocumentServerAddress = 'https://oivs4lxfc.bkt.clouddn.com';
    var proxy = cb.rest.DynamicProxy.create({ getFileServerUrl: { url: '/pub/fileupload/getFileServerUrl.do', method: 'GET' } });
    proxy.getFileServerUrl(function (err, result) {
      if (result) _this.DocumentServerAddress = result;
    });
    return _this;
  }

  _createClass(Avatar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'beforeUpload',
    value: function beforeUpload(file) {
      var isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJPGOrPNG) cb.utils.alert('图片仅支持JPG、PNG格式', 'error');
      var isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) cb.utils.alert('文件必须小于2M', 'error');
      return isJPGOrPNG && isLt2M;
    }
  }, {
    key: 'validate',
    value: function validate(val) {
      this.setState({
        err: 'has-' + val.type,
        msg: val.message
      });
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _state = this.state,
          readOnly = _state.readOnly,
          value = _state.value,
          tooltip = _state.tooltip,
          displaymode = _state.displaymode;

      var className = 'basic-avatar-' + displaymode;
      if (readOnly) return value && value != '' ? _react2.default.createElement('img', { className: className, src: value, alt: '' }) : _react2.default.createElement('div', { className: 'no-avatar-man ' + className });
      var action = '/upload?token=' + cb.rest.AppContext.token;
      return _react2.default.createElement(
        _index.Row,
        { className: 'face-img ' + className },
        _react2.default.createElement(
          _antd.Upload,
          {
            className: 'avatar-uploader',
            showUploadList: false,
            action: action,
            beforeUpload: this.beforeUpload,
            onChange: this.handleChange,
            accept: 'image/gif,image/jpeg,image/png,image/x-ms-bmp'
          },
          value ? _react2.default.createElement(
            'div',
            { className: 'info-person info-person-01' },
            _react2.default.createElement('img', { src: value, alt: '' }),
            _react2.default.createElement(
              'div',
              { className: 'info-person-mask' },
              _react2.default.createElement(_antd.Icon, { type: 'uploadimg' }),
              _react2.default.createElement(
                'p',
                null,
                '\u4FEE\u6539\u56FE\u7247'
              )
            )
          ) : _react2.default.createElement(
            'div',
            { className: 'info-person info-person-01' },
            _react2.default.createElement(
              'span',
              null,
              'ICON'
            ),
            _react2.default.createElement(_antd.Icon, { type: 'plus', className: 'avatar-uploader-trigger' }),
            _react2.default.createElement(
              'div',
              { className: 'info-person-mask' },
              _react2.default.createElement(_antd.Icon, { type: 'uploadimg' }),
              _react2.default.createElement(
                'p',
                null,
                '\u4E0A\u4F20\u56FE\u7247'
              )
            )
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'avatar-n' },
          tooltip || '仅支持JPG、PNG格式，文件小于2M'
        )
      );
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var _state2 = this.state,
          readOnly = _state2.readOnly,
          bIsNull = _state2.bIsNull,
          caption = _state2.caption;

      var title = !readOnly && bIsNull === false && caption ? _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(_antd.Icon, { type: 'star' }),
        caption
      ) : _react2.default.createElement(
        'label',
        null,
        caption
      );
      var control = caption ? _react2.default.createElement(_index.Label, { titleClassName: 'logo-face-label', control: this.baseControl(), title: title }) : this.baseControl();
      return control;
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getControl();
      var style = this.state.visible ? {} : { display: "none" };
      var errClass = 'has-feedback ' + this.state.err;
      return _react2.default.createElement(
        'div',
        { style: style, className: errClass },
        control,
        _react2.default.createElement(
          'div',
          { className: 'ant-form-explain' },
          this.state.msg
        )
      );
    }
  }]);

  return Avatar;
}(_react.Component);

exports.default = Avatar;