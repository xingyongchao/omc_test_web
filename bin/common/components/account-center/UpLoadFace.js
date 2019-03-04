'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _basic = require('../../../yxyweb/common/components/basic');

var _user = require('../../redux/modules/user');

var accountactions = _interopRequireWildcard(_user);

var _systemSetting = require('../../redux/modules/systemSetting');

var systemSettingactions = _interopRequireWildcard(_systemSetting);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
        _antd.message.error('Image must smaller than 1MB!');
      }
      return isJPG && isLt1M;
    };

    _this.handleChange = function (info) {
      var _this$props = _this.props,
          accountactions = _this$props.accountactions,
          systemSettingactions = _this$props.systemSettingactions;

      if (info.file.status === 'done') {
        // Get this url from response in real world.
        // this.getBase64(info.file.originFileObj, imageUrl => accountactions.setAccountMsg({accountImgUrl:imageUrl}));
        if (info.file.response.code == 200) {
          if (_this.props.isLogo === true) {
            systemSettingactions.companyInfoMerge({ logo: _this.url + info.file.response.data });
          } else {
            accountactions.setAccountMsg({ accountImgUrl: _this.url + info.file.response.data });
          }
        }
      }
    };

    _this.getFaceUploadControl = function () {
      var _this$props2 = _this.props,
          account = _this$props2.account,
          systemSetting = _this$props2.systemSetting;

      var imageUrl = void 0;
      if (_this.props.isLogo === true) {
        imageUrl = systemSetting.logo ? systemSetting.logo : _this.props.imgUrl;
      } else {
        imageUrl = account.accountImgUrl ? account.accountImgUrl : _this.props.imgUrl;
      }
      var context = cb.rest.AppContext;
      var action = '/upload?token=' + context.token;
      return _react2.default.createElement(
        _basic.Row,
        { className: _this.props.class_name, colCount: 6 },
        _react2.default.createElement(
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
            { className: 'info-person' },
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
            { className: 'info-person info-person-img' },
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
        ),
        _react2.default.createElement(
          'span',
          null,
          _this.props.isLogo ? '仅支持JPG、JPEG、BMP、PNG格式，文件小于2M（建议使用镂空白色图像，最佳尺寸130*40px）' : '仅支持JPG、JPEG、BMP、PNG格式，文件小于2M'
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
      var label_name = void 0;
      if (this.props.isLogo === true) {
        label_name = '企业logo';
      } else {
        label_name = '头像';
      }
      return _react2.default.createElement(
        _basic.Row,
        null,
        _react2.default.createElement(
          _basic.Col,
          { className: 'label-control logo-face-label', span: 4 },
          _react2.default.createElement(
            'label',
            null,
            label_name
          )
        ),
        _react2.default.createElement(
          _basic.Col,
          { className: 'input-control', span: 16 },
          control
        )
      );
    }
  }]);

  return UpLoadFace;
}(_react.Component);

function mapStateToProps(state) {
  return {
    account: state.user.toJS(),
    systemSetting: state.systemSetting.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    accountactions: (0, _redux.bindActionCreators)(accountactions, dispatch),
    systemSettingactions: (0, _redux.bindActionCreators)(systemSettingactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UpLoadFace);