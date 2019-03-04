'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _antdMobile = require('antd-mobile');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fileAttach = [],
    types = [];

var Attachment = function (_Component) {
  _inherits(Attachment, _Component);

  function Attachment(props) {
    _classCallCheck(this, Attachment);

    var _this = _possibleConstructorReturn(this, (Attachment.__proto__ || Object.getPrototypeOf(Attachment)).call(this, props));

    _this.transferBill2Refer = function (value, bill2ReferKeyFieldMap) {
      var newValue = [];
      value.forEach(function (item, index) {
        var referItem = {};
        for (var billKey in bill2ReferKeyFieldMap) {
          referItem[bill2ReferKeyFieldMap[billKey]] = item[billKey];
        } /*排序字段*/
        if (_this.state.sortField) referItem[_this.state.sortField] = item[_this.state.sortField];
        newValue.push(referItem);
      });
      return newValue;
    };

    _this.chooseImage = function () {
      _antdMobile.ActionSheet.showShareActionSheetWithOptions({
        options: [{
          icon: _react2.default.createElement('i', { className: 'icon icon-review' }),
          title: "拍照"
        }, {
          icon: _react2.default.createElement('i', { className: 'icon icon-review' }),
          title: "相册"
        }]
      }, function (buttonIndex) {
        _this.takeNewPic(buttonIndex === 0 ? 'carema' : 'album');
      });
    };

    _this.takeNewPic = function (type) {
      _this.changeStatus(false);
      if (!window.plus || !window.plus.uploader) return;
      var _this$state = _this.state,
          fileList = _this$state.fileList,
          attachs = _this$state.attachs,
          uploadData = {},
          _self = _this;

      var url = cb.rest.AppContext.serviceUrl + "/upload?token=" + cb.rest.AppContext.token;
      var task = window.plus.uploader.createUpload(url, { method: 'POST' }, function (upload, status) {
        _antdMobile.Toast.hide();
        if (status == 200 && upload.state == 4) {
          var responseData = JSON.parse(upload.responseText).data;
          uploadData.address = _this.DocumentServerAddress + responseData;
          uploadData.size = upload.uploadedSize;
          uploadData.type = 'image/' + uploadData.name.split('.')[1];
          // mineAction.modifyMineInfo(mine.get('user').set('avatar', uploadData.url));
          // _self.setState({ attr:uploadData });
          if (uploadData.size > 4 * 1024 * 1024) {
            cb.utils.Toast('超出上传限制，请删除后重新上传！', 'fail');
            return;
          }
          if (types.indexOf(uploadData.name.split('.')[1].toLocaleLowerCase()) < 0) {
            cb.utils.Toast('选择文件格式不正确，请重新选择！', 'fail');
            return;
          }
          if (_this.props.model) {
            attachs.push(uploadData);
            fileList.splice(fileList.length - 1, 0, uploadData);
            _self.setState({ fileList: fileList, attachs: attachs });
            _this.props.model.setValue(fileList, true);
          }
        } else {
          cb.utils.Toast('上传失败' + JSON.parse(upload.responseText), 'fail');
        }
      });
      if (type == 'album') {
        /*相册*/
        plus.gallery.pick(function (path) {
          window.plus.io.resolveLocalFileSystemURL(path, function (entry) {
            /* 将本地URL路径转换成平台绝对路径 */
            var url = entry.toLocalURL();
            uploadData.name = entry.name;
            task.addFile(url, { key: 'file' });
            task.addData('name', entry.name);
            _antdMobile.Toast.loading('上传中...', 10);
            task.start();
          });
        }, function (e) {
          console.log("取消选择图片");
        }, { filter: "image" });
      } else {
        /*拍照*/
        var cmr = plus.camera.getCamera();
        cmr.captureImage(function (path) {
          window.plus.io.resolveLocalFileSystemURL(path, function (entry) {
            /* 将本地URL路径转换成平台绝对路径 */
            var url = entry.toLocalURL();
            uploadData.name = entry.name;
            task.addFile(url, { key: 'file' });
            task.addData('name', entry.name);
            _antdMobile.Toast.loading('上传中...', 10);
            task.start();
          });
        }, function (error) {
          //  cb.utils.Toast("Capture image failed: " + error.message,'fail');
          //  Toast.fail("Capture image failed: " + error.message,1);
        });
      }
    };

    _this.getItemControls = function (item) {
      var _this$state2 = _this.state,
          fileList = _this$state2.fileList,
          bCanModify = _this$state2.bCanModify,
          readOnly = _this$state2.readOnly,
          config = _this$state2.config;

      var controls = [],
          maxQuantity = 0,
          index = _lodash2.default.indexOf(fileAttach, item);
      if (index === fileAttach.length - 1 && bCanModify && !readOnly) {
        if (config) maxQuantity = config.maxQuantity ? config.maxQuantity : -1;
        controls.push(_react2.default.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'column' }, onClick: function onClick() {
              _this.changeStatus(true);
            } },
          _react2.default.createElement(_antdMobile.Icon, { type: 'icon-tianjiatupian', style: { height: '1.1rem', width: '1.1rem' } }),
          fileAttach.length - 1,
          '/',
          maxQuantity
        ));
      } else {
        controls.push(_react2.default.createElement(
          'div',
          { style: { padding: '5px' } },
          _react2.default.createElement('img', { src: item.address, style: { width: '100%', height: '100%' }, alt: '' }),
          bCanModify && !readOnly && _react2.default.createElement(
            'i',
            { className: 'attach_icon_del', onClick: function onClick() {
                _this.deleteAttachItem(index);
              } },
            '\xD7'
          )
        ));
      }
      return controls;
    };

    _this.deleteAttachItem = function (index) {
      var fileList = _this.state.fileList;

      if (_this.props.model) {
        fileList.splice(index, 1);
        _this.setState({ fileList: fileList });
        _this.props.model.deleteItem(index);
      }
    };

    _this.renderBaseUpload = function () {
      var _this$state3 = _this.state,
          fileList = _this$state3.fileList,
          bCanModify = _this$state3.bCanModify,
          readOnly = _this$state3.readOnly,
          config = _this$state3.config;

      var fileType = null,
          maxQuantity = void 0,
          uploadTips = '';
      if (!config || !config.fileType) {
        fileType = _this.state.fileType;
      } else {
        fileType = config.fileType;
      }
      if (config) maxQuantity = config.maxQuantity ? config.maxQuantity : -1;
      var str = maxQuantity !== -1 ? '不超过' + maxQuantity + '张' : '不限';
      if (bCanModify && !readOnly) {
        if (fileType == 'file') {
          if (config && config.uploadTips) uploadTips = _react2.default.createElement(
            'span',
            { className: 'fileupload-txt' },
            '（' + config.uploadTips + '）'
          );else types = ['pdf', 'word', 'excel', 'txt', 'jpg', 'png', 'bmp', 'gif'];
          uploadTips = _react2.default.createElement(
            'span',
            { className: 'fileupload-txt' },
            '\u5168\u90E8\u9644\u4EF6\u5927\u5C0F\u4E0D\u53EF\u8D85\u8FC7',
            _react2.default.createElement(
              'em',
              null,
              '4M'
            ),
            '\uFF0C\u652F\u6301\u683C\u5F0F\uFF1APDF\u3001Word\u3001Excel\u3001Txt\u3001JPG\u3001PNG\u3001BMP\u3001GIF'
          );
        } else {
          types = ['png', 'jpg', 'jpeg', 'bmp'];
          uploadTips = _react2.default.createElement(
            'span',
            { className: 'fileupload-txt' },
            '\u5EFA\u8BAE\u5C3A\u5BF8\uFF1A',
            _this.state.imageSize,
            ' \u683C\u5F0F\uFF1Apng\u3001jpg\u3001jpeg\u3001bmp \u603B\u9644\u4EF6\u5927\u5C0F\uFF1A\u4E0D\u8D85\u8FC7',
            _react2.default.createElement(
              'em',
              null,
              '4M'
            ),
            ' ',
            _react2.default.createElement(
              _antdMobile.List.Item.Brief,
              null,
              '\u603B\u5F20\u6570\uFF1A',
              str
            )
          );
        }
      }
      return uploadTips;
    };

    _this.state = {
      attachs: [],
      colCount: props.colCount || 8,
      fileType: props.fileType || 'file',
      fileList: [],
      showUploadList: props.showUploadList || true,
      multiple: true,
      accept: '',
      mode: props.mode || 'edit',
      readOnly: false,
      config: {},
      imageSize: 0,
      pics: '',
      showSVG: props.showSVG || '',
      showTitle: props.showTitle || '',
      chsphoto: false
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

  _createClass(Attachment, [{
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
    key: 'setListenerState',
    value: function setListenerState(params, propertyName) {
      var showValue = params.showValue;
      if (showValue && showValue.length > 0) {
        params.fileList = this.transferBill2Refer(showValue, params.bill2ReferKeyFieldMap);
      }
      this.setImageAttr(params);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (!value) value = [];
      this.setState({ fileList: this.transferBill2Refer(value, this.state.bill2ReferKeyFieldMap) });
    }
  }, {
    key: 'setImageAttr',
    value: function setImageAttr(params) {
      var config = null,
          imageSize = '720*400',
          pics = null;
      if (params.cStyle) {
        try {
          config = JSON.parse(params.cStyle);
          if (config.imageSize) imageSize = config.imageSize;
          if (config.pics) pics = JSON.stringify(config.pics);
        } catch (e) {}
      }
      params.imageSize = imageSize;
      params.pics = pics;
      params.config = config;
      this.setState(params);
    }
  }, {
    key: 'setServerUrl',
    value: function setServerUrl(url) {
      this.DocumentServerAddress = url;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'changeStatus',
    value: function changeStatus(bl) {
      this.setState({ chsphoto: bl });
    }

    /*唤起相机或相册*/

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          fileList = _state.fileList,
          bCanModify = _state.bCanModify,
          readOnly = _state.readOnly,
          chsphoto = _state.chsphoto;

      var controls = _react2.default.createElement('span', null),
          uploadTips = this.renderBaseUpload();
      if (fileList && fileList.length >= 1) {
        fileAttach = fileList.slice(0, fileList.length);
        if (_lodash2.default.findIndex(fileAttach, function (o) {
          return o.btn === "";
        }) < 0 && bCanModify && !readOnly) {
          fileAttach.push({ btn: '' });
        }
        controls = _react2.default.createElement(
          _antdMobile.List,
          { style: { margin: '5px 0', backgroundColor: 'white' } },
          _react2.default.createElement(_antdMobile.Grid, { data: fileAttach, activeStyle: false, columnNum: 3, square: false, hasLine: false, itemStyle: { height: '120px', background: '#fff' }, renderItem: function renderItem(dataItem) {
              return _this2.getItemControls(dataItem);
            } })
        );
      } else if (bCanModify && !readOnly) {
        controls = _react2.default.createElement(
          'div',
          { style: { display: 'flex' }, onClick: function onClick() {
              _this2.changeStatus(true);
            } },
          _react2.default.createElement(
            'div',
            { className: 'tianjiatupian_cls' },
            _react2.default.createElement(_antdMobile.Icon, { type: 'icon-tianjiatupian' }),
            _react2.default.createElement(
              'div',
              { className: 'tianjiatupian-name' },
              '\u6DFB\u52A0\u56FE\u7247'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'tianjiatupian_desc_cls' },
            uploadTips
          )
        );
      }

      return _react2.default.createElement(
        'div',
        null,
        controls,
        _react2.default.createElement(
          'div',
          { className: 'choose_panel', style: { display: chsphoto ? '' : 'none' } },
          _react2.default.createElement('div', { className: 'choose_panel_empty', onClick: function onClick() {
              _this2.changeStatus(false);
            } }),
          _react2.default.createElement(
            'div',
            { className: 'choose_btn' },
            _react2.default.createElement(
              _antdMobile.Button,
              { style: { borderRadius: 0 + 'px', borderBottom: '#f7f6f6 solid 0.02rem', fontSize: '0.3rem' }, onClick: function onClick() {
                  _this2.takeNewPic("album");
                } },
              '\u6253\u5F00\u76F8\u518C'
            ),
            _react2.default.createElement(
              _antdMobile.Button,
              { style: { borderRadius: 0 + 'px', fontSize: '0.3rem' }, onClick: function onClick() {
                  _this2.takeNewPic("carema");
                } },
              '\u62CD\u7167\u9009\u56FE'
            ),
            _react2.default.createElement(
              'div',
              { className: 'info_bg' },
              '\xA0'
            ),
            _react2.default.createElement(
              _antdMobile.Button,
              { style: { fontSize: '0.34rem' }, onClick: function onClick() {
                  _this2.changeStatus(false);
                } },
              '\u53D6\u6D88'
            )
          )
        )
      );
    }
  }]);

  return Attachment;
}(_react.Component);

exports.default = Attachment;