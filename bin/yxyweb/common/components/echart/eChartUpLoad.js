'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../basic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eChartUpLoad = function (_Component) {
  _inherits(eChartUpLoad, _Component);

  function eChartUpLoad(props) {
    _classCallCheck(this, eChartUpLoad);

    var _this = _possibleConstructorReturn(this, (eChartUpLoad.__proto__ || Object.getPrototypeOf(eChartUpLoad)).call(this, props));

    _this.beforeUpload = function (file) {
      var isJPG = file.type === 'image/jpeg' || 'image/png';
      if (!isJPG) {
        _antd.message.error('You can only upload JPG/PNG file!');
      }
      var isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        _antd.message.error('Image must smaller than 1MB!');
      }
      return isJPG && isLt1M;
    };

    _this.handleChange = function (info) {
      if (info.file.status === 'done') {
        if (info.file.response.code == 200) {
          if (_this.props.doUpload) {
            var tmp = _this.DocumentServerAddress + info.file.response.data;
            _this.props.doUpload(tmp);
          }
        } else {
          eChartCommon.LogChartInfo("上传图片：调用服务出错  info.file.response ", JSON.stringify(info.file.response), 999);
        }
      }
    };

    _this.DocumentServerAddress = 'https://oivs4lxfc.bkt.clouddn.com';
    var proxy = cb.rest.DynamicProxy.create({
      getFileServerUrl: {
        url: '/pub/fileupload/getFileServerUrl',
        method: 'GET',
        options: {
          token: true
        }
      }
    });
    proxy.getFileServerUrl({}, function (err, result) {
      if (!err) this.DocumentServerAddress = result;
    }, _this);
    return _this;
  }

  _createClass(eChartUpLoad, [{
    key: 'render',
    value: function render() {
      var logoImg = this.props.logoImg;

      var context = cb.rest.AppContext;
      var action = '/upload?token=' + context.token;
      return _react2.default.createElement(
        'div',
        { className: 'logo-sc' },
        _react2.default.createElement(
          _antd.Upload,
          {
            showUploadList: false,
            action: action,
            beforeUpload: this.beforeUpload,
            onChange: this.handleChange,
            accept: 'image/jpeg,image/png'
          },
          _react2.default.createElement(
            'div',
            { className: 'info-person dj-sc ' + (logoImg ? "eChartUpLoad_HasImg" : "eChartUpLoad_NoImg") },
            logoImg ? _react2.default.createElement('img', { src: logoImg }) : "",
            _react2.default.createElement(
              'div',
              { className: 'info-person-mask ' },
              _react2.default.createElement(_antd.Icon, { type: 'uploadimg' }),
              _react2.default.createElement(
                'p',
                null,
                '\u70B9\u51FB\u4E0A\u4F20'
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'tips' },
          '\u4EC5\u652F\u6301JPG\u3001JPEG\u3001BMP\u3001PNG\u683C\u5F0F\uFF0C\u6587\u4EF6\u5C0F\u4E8E2M'
        )
      );
    }
  }]);

  return eChartUpLoad;
}(_react.Component);

exports.default = eChartUpLoad;