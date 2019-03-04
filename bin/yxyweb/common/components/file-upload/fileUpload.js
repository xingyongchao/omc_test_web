'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _label = require('../basic/label');

var _label2 = _interopRequireDefault(_label);

var _row = require('../basic/row');

var _row2 = _interopRequireDefault(_row);

var _fileList = require('./fileList');

var _fileList2 = _interopRequireDefault(_fileList);

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (process.env.__CLIENT__ === true) {
  require('./fileList.less');
}
var ContentTypeContrast = {
  ".gif": "image/gif", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".bmp": "image/x-ms-bmp", ".pdf": "application/pdf", ".txt": "text/plain",
  ".doc": "application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".p12": "application/x-pkcs12", ".pfx": "", /*特殊处理pfx文件类型*/
  ".zip": "application/x-zip-compressed", ".rar": ""
};

var fileUpload = function (_React$Component) {
  _inherits(fileUpload, _React$Component);

  function fileUpload(props) {
    _classCallCheck(this, fileUpload);

    var _this = _possibleConstructorReturn(this, (fileUpload.__proto__ || Object.getPrototypeOf(fileUpload)).call(this, props));

    _initialiseProps.call(_this);

    var config = null,
        imageSize = '720*400',
        pics = null;
    if (props.cStyle) {
      try {
        config = JSON.parse(props.cStyle);
        if (config.imageSize) imageSize = config.imageSize;
        if (config.pics) pics = JSON.stringify(config.pics);
      } catch (e) {}
    }
    _this.state = {
      colCount: props.colCount || 8,
      fileType: props.fileType || 'file',
      fileList: [],
      showUploadList: props.showUploadList || true,
      multiple: true,
      accept: '',
      mode: props.mode || 'edit',
      readOnly: false,
      config: config,
      imageSize: imageSize,
      pics: pics,
      showSVG: props.showSVG || '',
      showTitle: props.showTitle || ''
    };
    _this.uploading = false;
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

  _createClass(fileUpload, [{
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
      this.setState(params);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (!value) value = [];
      this.setState({ fileList: this.transferBill2Refer(value, this.state.bill2ReferKeyFieldMap) });
    }
  }, {
    key: 'setServerUrl',
    value: function setServerUrl(url) {
      this.DocumentServerAddress = url;
    }
    /*上传改变事件*/

    /*显示已上传文件/图片的列表*/

    /*删除已上传文件*/

    /*移动已上传文件位置*/

    /*上传前事件-未用*/

    /*下载全部*/

  }, {
    key: 'render',
    value: function render() {
      var control = this._getControl();
      return _react2.default.createElement(
        'div',
        { className: 'upload-content clearfix' },
        control
      );
    }
  }]);

  return fileUpload;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.transferBill2Refer = function (value, bill2ReferKeyFieldMap) {
    var newValue = [];
    var fileList = _this2.state.fileList;
    value.forEach(function (item, index) {
      var referItem = {};
      for (var billKey in bill2ReferKeyFieldMap) {
        referItem[bill2ReferKeyFieldMap[billKey]] = item[billKey];
      }if (fileList[index]) {
        if (fileList[index].name == referItem.name && fileList[index].size == referItem.size) {
          referItem.id = fileList[index].id;
        } else {
          var i = _lodash2.default.findIndex(fileList, { "name": referItem.name, "size": referItem.size });
          if (i != -1) referItem.id = fileList[i].id;
        }
      }
      /*排序字段*/
      if (_this2.state.sortField) referItem[_this2.state.sortField] = item[_this2.state.sortField];
      newValue.push(referItem);
    });
    return newValue;
  };

  this._fielUploadOnChange = function (info) {
    var _state = _this2.state,
        fileList = _state.fileList,
        config = _state.config;

    var num = _lodash2.default.findIndex(fileList, { 'id': info.file.uid });
    /*上传中状态*/
    if (info.file.status === 'uploading') {
      /*更新上传文件进度*/
      if (!info.file.percent) {
        cb.utils.loadingControl.end();
        _this2.uploading = false;
        fileList[num].percent = 100;
      } else {
        fileList[num].percent = info.file.percent;
      }
      fileList[num].size = info.file.size;
      _this2.setState({
        fileList: fileList,
        percent: info.file.percent
      });
    }
    /*上传完成状态*/
    if (info.file.status === 'done') {
      if (info.file.response.code == 200) {
        /*上传完成，更新上传文件信息*/
        if (config && config.uploadType == 'local') {
          fileList[num].address = info.file.response.data;
        } else {
          fileList[num].address = _this2.DocumentServerAddress + info.file.response.data;
        }
        _this2.setState({
          fileList: fileList
        });

        cb.utils.alert(info.file.name + ' \u4E0A\u4F20\u6210\u529F\uFF01', 'success');
        cb.utils.loadingControl.end();
        _this2.uploading = false;
        if (_this2.props.model) {
          var bSet = true;
          fileList.map(function (item) {
            if (cb.utils.isEmpty(item.address)) bSet = false;
          });
          if (bSet) _this2.props.model.setValue(fileList, true);
        }
        if (_this2.props.doUpload) _this2.props.doUpload(fileList);
      } else {
        /*上传失败删除上传文件*/
        cb.utils.loadingControl.end();
        _this2.uploading = false;
        fileList.pop();
        _this2.setState({
          fileList: fileList
        });
        cb.utils.alert(info.file.name + ' \u4E0A\u4F20\u5931\u8D25\uFF01' + info.file.response.code + ' : ' + info.file.response.message, 'error');
      }
    }
    /*上传出错状态*/
    if (info.file.status === 'error') {
      cb.utils.alert(info.file.name + ' \u4E0A\u4F20\u5931\u8D25\uFF01' + info.file.response.code + ' : ' + info.file.response.message, 'error');
    }
  };

  this._fileListControl = function (fileType) {
    if (_this2.state.fileList.length == 0 && _this2.state.readOnly) {
      return _react2.default.createElement(
        'div',
        { className: 'upload-nodata' },
        _react2.default.createElement(_antd.Icon, { type: fileType == "file" ? "noFile" : "noPic" }),
        _react2.default.createElement(
          'span',
          null,
          fileType == "file" ? "暂无附件~" : "暂无图片~"
        )
      );
    }
    var config = _this2.state.config;
    var isDownLoadable = true;
    if (config && config.isDownLoadable != undefined) {
      isDownLoadable = config.isDownLoadable;
    }
    return _react2.default.createElement(_fileList2.default, { isDownLoadable: isDownLoadable, model: _this2.props.model, arrowImg: _this2._arrowImg, DelFile: _this2._DelFile, colCount: _this2.state.colCount, fileType: fileType, fileList: _this2.state.fileList, readOnly: _this2.state.readOnly, sortField: _this2.state.sortField, columns: _this2.state.columns, mode: _this2.state.mode });
  };

  this._DelFile = function (index) {
    if (_this2.props.model) _this2.props.model.deleteItem(index);
  };

  this._arrowImg = function (arrow, index) {}
  // let fileList = this.state.fileList;
  // let len = fileList.length;
  // let index = 0;
  // for (var i = 0; i < len; i++) {
  //   if (fileList[i].id == id) {
  //     index = i;
  //   }
  // }
  // if (arrow == 'left') {
  //   if (index == 0) return
  //   fileList[index] = fileList.splice(index - 1, 1, fileList[index])[0];
  // } else if (arrow == 'right') {
  //   if (index == len - 1) return
  //   fileList[index] = fileList.splice(index + 1, 1, fileList[index])[0];
  // } else {
  //   return
  // }
  // this.setState({
  //   fileList
  // });
  ;

  this._beforeUpload = function (file, uploadFileList) {
    cb.utils.loadingControl.start();
    var _state2 = _this2.state,
        fileList = _state2.fileList,
        config = _state2.config;

    var maxSize = 20971520,
        nowSize = 0;
    if (config && config.maxSize) maxSize = config.maxSize * 1024 * 1024;
    fileList && fileList.map(function (item) {
      nowSize += parseFloat(item.size);
    });
    nowSize += file.size;
    if (nowSize > maxSize) {
      cb.utils.alert('总附件大小超出控制！', 'error');
      _this2.uploading = false;
      cb.utils.loadingControl.end();
      return false;
    }
    var _state3 = _this2.state,
        fileType = _state3.fileType,
        accept = _state3.accept;

    if (config && config.uploadType && config.uploadType == 'local') {
      // accept = ".p12,.P12";
      if (fileList.length > 0 || uploadFileList.length > 1) {
        cb.utils.alert('当前只允许上传一个附件，请删除后重新上传！', 'error');
        _this2.uploading = false;
        cb.utils.loadingControl.end();
        return false;
      }
    }
    if (config) {
      if (config.fileType) fileType = config.fileType;
      if (config.accept) accept = config.accept;
    }
    if (accept == '') {
      if (fileType == 'file') accept = "pdf,doc,xls,txt,jpg,png,bmp,gif";else accept = "png,jpg,jpeg,bmp";
    }
    accept = accept.split(',');
    var inAccept = false;
    accept.map(function (item) {
      if (file.name && file.name.split(item).length > 1) inAccept = true;
    });
    if (!inAccept) {
      cb.utils.alert('选择文件格式不正确，请重新选择！', 'error');
      _this2.uploading = false;
      cb.utils.loadingControl.end();
      return false;
    }

    if (config && config.maxQuantity) {
      if (fileList.length >= config.maxQuantity) {
        cb.utils.alert('超出上传限制，请删除后重新上传！', 'error');
        _this2.uploading = false;
        cb.utils.loadingControl.end();
        return false;
      }
      if (uploadFileList.length > config.maxQuantity) {
        cb.utils.alert('选择数量超过上传限制，请重新上传！', 'error');
        _this2.uploading = false;
        cb.utils.loadingControl.end();
        return false;
      }
    }
    if (!_this2.uploading) {
      _this2.uploading = true;
      // cb.utils.alert('上传中~请稍后！', 'success');
    }
    fileList.push({ 'percent': file.percent, 'name': file.name, 'id': file.uid, 'type': file.type });
    _this2.setState({ fileList: fileList });
  };

  this.downLoadAll = function () {
    var fileList = _this2.state.fileList;
    if (fileList.length > 0) {
      fileList.forEach(function (element) {
        window.open(element.address);
      }, _this2);
    }
  };

  this.getUploadData = function (file) {
    var config = _this2.state.config;
    if (!config || !config.folderName) return file;
    file.folderName = config.folderName;
    return file;
  };

  this.renderBaseUpload = function (action, showName, fileListControl, accept, showUpLoad) {
    var config = _this2.state.config,
        fileType = null,
        maxQuantity = void 0;
    if (!config || !config.fileType) {
      fileType = _this2.state.fileType;
    } else {
      fileType = config.fileType;
    }
    if (config) maxQuantity = config.maxQuantity ? config.maxQuantity : -1;
    var str = maxQuantity !== -1 ? '不超过' + maxQuantity + '张' : '不限';
    if (showUpLoad) {
      var uploadTips = "";
      if (fileType == 'file') {
        if (config && config.uploadTips) uploadTips = _react2.default.createElement(
          'span',
          { className: 'fileupload-txt' },
          '（' + config.uploadTips + '）'
        );else uploadTips = _react2.default.createElement(
          'span',
          { className: 'fileupload-txt' },
          '\uFF08\u5168\u90E8\u9644\u4EF6\u5927\u5C0F\u4E0D\u53EF\u8D85\u8FC7',
          _react2.default.createElement(
            'em',
            null,
            '20M'
          ),
          '\uFF0C\u652F\u6301\u683C\u5F0F\uFF1APDF\u3001Word\u3001Excel\u3001Txt\u3001JPG\u3001PNG\u3001BMP\u3001GIF\uFF09'
        );
      }
      // else {
      //   uploadTips = (
      //     <span className='fileupload-txt'>
      //       （建议尺寸：{this.state.imageSize} 格式：png、jpg、jpeg、bmp 总附件大小：不超过<em>20M</em> 总张数：{str}）
      //       </span>
      //   );
      // }
      if (config && config.uploadType == 'local') {
        uploadTips = _react2.default.createElement(
          'span',
          { className: 'fileupload-txt' },
          '\uFF08\u5168\u90E8\u9644\u4EF6\u5927\u5C0F\u4E0D\u53EF\u8D85\u8FC7',
          _react2.default.createElement(
            'em',
            null,
            '20M'
          ),
          '\uFF0C\u652F\u6301\u683C\u5F0F\uFF1AP12\uFF09'
        );
      }
      return _react2.default.createElement(
        _row2.default,
        null,
        _react2.default.createElement(
          'div',
          { title: _this2.state.showTitle },
          _react2.default.createElement(
            _antd.Upload,
            {
              showUploadList: false,
              data: _this2.getUploadData,
              action: action,
              onChange: _this2._fielUploadOnChange,
              multiple: _this2.state.multiple,
              accept: accept,
              beforeUpload: _this2._beforeUpload,
              disabled: !showUpLoad
            },
            _react2.default.createElement(
              'a',
              { style: { color: _this2.props.showNameColor ? _this2.props.showNameColor : undefined }, className: 'btn-gray' },
              _this2.state.showSVG ? _react2.default.createElement(_SvgIcon2.default, { type: _this2.state.showSVG }) : _react2.default.createElement(_antd.Icon, { type: 'paper-clip' }),
              showName
            )
          ),
          _this2.props.hideDesc ? "" : fileType == 'file' ? _react2.default.createElement(
            'span',
            { className: 'fileupload-txt' },
            uploadTips
          ) : _react2.default.createElement(
            'span',
            { className: 'fileupload-txt' },
            uploadTips
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          fileListControl
        )
      );
    } else {
      return _react2.default.createElement(
        _row2.default,
        null,
        _react2.default.createElement(
          'div',
          null,
          fileListControl
        )
      );
    }
  };

  this.renderUpload = function (action, showName, fileListControl, accept, showUpLoad) {
    var cShowCaption = _this2.props.cShowCaption;

    var control = _this2.renderBaseUpload(action, showName, fileListControl, accept, showUpLoad);
    var caption = cShowCaption;
    // if (this.state.fileList.length == 0 && this.state.readOnly) readOnlyOnData = true;
    return caption ? _react2.default.createElement(_label2.default, { control: control, title: caption }) : control;
  };

  this._getControl = function () {
    var context = cb.rest.AppContext;
    var action = '/upload?token=' + context.token;
    var pics = _this2.state.pics;

    if (pics) action += '&pics=' + pics;
    var accept = '',
        showName = '',
        fileType = '',
        config = _this2.state.config;
    if (!config || !config.fileType) {
      fileType = _this2.state.fileType;
    } else {
      fileType = config.fileType;
    }
    if (config && config.uploadType) {
      if (config.uploadType == 'local') action = '/upload2Local?token=' + context.token;
    }
    if (fileType == 'file') {
      // accept = 'application/msword,application/pdf,	application/vnd.ms-excel,text/plain,image/gif,image/jpeg,image/png,image/x-ms-bmp';
      // .xlsx   application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      accept = '';
      showName = '上传附件';
    } else {
      accept = 'image/gif,image/jpeg,image/png,image/x-ms-bmp';
      showName = _this2.props.bShowName ? _this2.props.showName : '添加图片';
    }
    if (config && config.accept) {
      var acceptList = config.accept.split(',');
      // ContentTypeContrast
      accept = '';
      acceptList.map(function (item) {
        if (ContentTypeContrast[item] && ContentTypeContrast[item] !== '') accept = accept + ',' + ContentTypeContrast[item];
      });
    }
    var showUpLoad = true;
    if (_this2.state.mode == 'browse' || _this2.state.readOnly) {
      showUpLoad = false;
    }
    var showCaption = _react2.default.createElement(
      'span',
      null,
      '[',
      _react2.default.createElement(
        'a',
        { onClick: function onClick() {
            return _this2.downLoadAll();
          } },
        '\u4E0B\u8F7D\u5168\u90E8'
      ),
      ']'
    );
    var fileListControl = _this2.state.showUploadList ? _this2._fileListControl(fileType) : '';
    if (_this2.state.fileList.length == 0) showCaption = _react2.default.createElement('span', null);
    return _this2.renderUpload(action, showName, fileListControl, accept, showUpLoad);
    // return (
    //   showUpLoad ?
    //     this.renderUpload(action, showName, fileListControl, accept)
    //     :
    //     <div>
    //       <div className='upload-list'>附件<em>{this.state.fileList.length}</em>个{showCaption}</div>
    //       <div>{fileListControl}</div>
    //     </div>
    // )
  };
};

exports.default = fileUpload;