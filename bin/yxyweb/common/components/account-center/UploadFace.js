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

var UpLoadFace = function (_Component) {
  _inherits(UpLoadFace, _Component);

  function UpLoadFace(props) {
    _classCallCheck(this, UpLoadFace);

    var _this = _possibleConstructorReturn(this, (UpLoadFace.__proto__ || Object.getPrototypeOf(UpLoadFace)).call(this, props));

    _this.getBase64 = function (img, callback) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        return callback(reader.result);
      });
      reader.readAsDataURL(img);
    };

    _this.beforeUpload = function (file) {
      var isJPG = file.type === 'image/jpeg' || 'image/png';
      if (!isJPG) {
        _antd.message.error('You can only upload JPG/PNG file!');
      }
      var isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        _antd.message.error('图片大小要小于 1MB!');
      }
      return isJPG && isLt1M;
    };

    _this.handleChange = function (info) {
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        // this.getBase64(info.file.originFileObj, imageUrl => accountactions.setAccountMsg({accountImgUrl:imageUrl}));
        if (info.file.response.code == 200) {
          if (_this.props.imageChange) _this.props.imageChange(_this.url + info.file.response.data);
        }
      }
    };

    _this.getFaceUploadControl = function () {
      var imageUrl = _this.props.imgUrl;
      var context = cb.rest.AppContext;
      var action = '/upload?token=' + context.token;
      var toolClass = _this.props.toolClass;
      return _react2.default.createElement(
        _antd.Upload,
        {
          className: 'avatar-uploader',
          showUploadList: false,
          action: action,
          beforeUpload: _this.beforeUpload,
          onChange: _this.handleChange,
          accept: 'image/jpeg,image/png'
        },
        imageUrl ? _react2.default.createElement(
          'div',
          { className: toolClass },
          _react2.default.createElement('img', { src: imageUrl, alt: '' }),
          _react2.default.createElement(
            'div',
            { className: 'info-person-mask' },
            _react2.default.createElement(_antd.Icon, { type: 'uploadimg' }),
            _react2.default.createElement(
              'p',
              null,
              '\u70B9\u51FB\u4E0A\u4F20'
            )
          )
        ) : _react2.default.createElement(
          'div',
          { className: toolClass },
          _react2.default.createElement(
            'div',
            { className: 'info-person-mask' },
            _react2.default.createElement(_antd.Icon, { type: 'uploadimg' }),
            _react2.default.createElement(
              'p',
              null,
              '\u70B9\u51FB\u4E0A\u4F20'
            )
          )
        )
      );
    };

    _this.url;
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
      if (!err) this.url = result;
    }, _this);
    return _this;
  }

  _createClass(UpLoadFace, [{
    key: 'render',
    value: function render() {
      var control = this.getFaceUploadControl();
      return _react2.default.createElement(
        'div',
        { className: 'uploadFace_component ' + this.props.class_name },
        control
      );
    }
  }]);

  return UpLoadFace;
}(_react.Component);

exports.default = UpLoadFace;