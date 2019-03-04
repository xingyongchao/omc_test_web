'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (process.env.__CLIENT__ === true) {
  require('./PictureBook.less');
}

var PictureBook = function (_React$Component) {
  _inherits(PictureBook, _React$Component);

  function PictureBook(props) {
    _classCallCheck(this, PictureBook);

    var _this = _possibleConstructorReturn(this, (PictureBook.__proto__ || Object.getPrototypeOf(PictureBook)).call(this, props));

    _this.transferBill2Refer = function (value, bill2ReferKeyFieldMap) {
      if (!value) return [];
      var fileList = _this.state.fileList;
      var newValue = [];
      value.forEach(function (item, index) {
        var referItem = {};
        for (var billKey in bill2ReferKeyFieldMap) {
          referItem[bill2ReferKeyFieldMap[billKey]] = item[billKey];
        }if (fileList[index]) {
          if (fileList[index].name == referItem.name && fileList[index].size == referItem.size) {
            referItem.id = fileList[index].id;
          } else {
            var i = _lodash2.default.findIndex(fileList, { "name": referItem.name, "size": referItem.size });
            referItem.id = fileList[i].id;
          }
        }
        newValue.push(referItem);
      });
      return newValue;
    };

    _this._fielUploadOnChange = function (info) {
      var _this$state = _this.state,
          fileList = _this$state.fileList,
          replaceIndex = _this$state.replaceIndex,
          onReplace = _this$state.onReplace,
          bill2ReferKeyFieldMap = _this$state.bill2ReferKeyFieldMap;

      var num = _lodash2.default.findIndex(fileList, { 'id': info.file.uid });
      /*上传中状态*/
      if (info.file.status === 'uploading') {
        /*更新上传文件进度*/
        if (!info.file.percent) {
          cb.utils.loadingControl.end();
          _this.uploading = false;
          fileList[num].percent = 100;
        } else {
          fileList[num].percent = info.file.percent;
        }
        fileList[num].size = info.file.size;
        _this.setState({
          fileList: fileList,
          percent: info.file.percent
        });
      }
      /*上传完成状态*/
      if (info.file.status === 'done') {
        if (info.file.response.code == 200) {
          /*上传完成，更新上传文件信息*/
          fileList[num].address = _this.DocumentServerAddress + info.file.response.data;
          _this.setState({
            fileList: fileList,
            percent: 0
          });

          // cb.utils.alert(`${info.file.name} 上传成功！`, 'success');
          cb.utils.loadingControl.end();
          _this.uploading = false;
          if (onReplace) {
            if (_this.props.model) {
              var cellValues = [];
              for (var key in bill2ReferKeyFieldMap) {
                var newKey = bill2ReferKeyFieldMap[key];
                cellValues.push({
                  index: replaceIndex,
                  cellName: key,
                  cellValue: fileList[replaceIndex][newKey]
                });
              }
              if (_this.props.model) _this.props.model.setCellValues(cellValues);
            }
            _this.setState({
              onReplace: false
            });
          } else {
            if (_this.props.model) _this.props.model.setValue(fileList, true);
          }
        } else {
          /*上传失败删除上传文件*/
          cb.utils.loadingControl.end();
          _this.uploading = false;
          fileList.pop();
          _this.setState({
            fileList: fileList,
            percent: 0
          });
          cb.utils.alert(info.file.name + ' \u4E0A\u4F20\u5931\u8D25\uFF01' + info.file.response.code + ' : ' + info.file.response.message, 'error');
        }
      }
      /*上传出错状态*/
      if (info.file.status === 'error') {
        cb.utils.alert(info.file.name + ' \u4E0A\u4F20\u5931\u8D25\uFF01' + info.file.response.code + ' : ' + info.file.response.message, 'error');
      }
    };

    _this._fileListControl = function (fileType) {
      if (_this.state.fileList.length == 0 && _this.state.readOnly) {
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
      return _react2.default.createElement(FileList, { arrowImg: _this._arrowImg, DelFile: _this._DelFile, colCount: _this.state.colCount, fileType: fileType, fileList: _this.state.fileList, readOnly: _this.state.readOnly, mode: _this.state.mode });
    };

    _this._DelFile = function (index) {
      if (_this.props.model) _this.props.model.deleteItem(index);
    };

    _this._beforeUpload = function (file, uploadFileList) {
      cb.utils.loadingControl.start();
      if (file.size > 1048576) {
        cb.utils.alert('上传大小超出限制，请重新上传！', 'error');
        _this.uploading = false;
        cb.utils.loadingControl.end();
        return false;
      }
      var accept = "png,jpg,jpeg,bmp";
      accept = accept.split(',');
      var inAccept = false;
      accept.map(function (item) {
        if (file.name && file.name.split(item).length > 1) inAccept = true;
      });
      if (!inAccept) {
        cb.utils.alert('选择文件格式不正确，请重新选择！', 'error');
        _this.uploading = false;
        cb.utils.loadingControl.end();
        return false;
      }
      if (!_this.uploading) {
        _this.uploading = true;
        // cb.utils.alert('上传中~请稍后！', 'success');
      }
      var _this$state2 = _this.state,
          fileList = _this$state2.fileList,
          onReplace = _this$state2.onReplace,
          replaceIndex = _this$state2.replaceIndex;

      if (onReplace) fileList[replaceIndex].id = file.uid;else fileList.push({ 'percent': file.percent, 'name': file.name, 'id': file.uid, 'type': file.type });
      _this.setState({ fileList: fileList });
    };

    _this.onOk = function () {
      _this.setState({ showModal: false });
    };

    _this.onCancel = function () {
      _this.setState({ showModal: false });
    };

    _this.onBigCancel = function () {
      _this.setState({ showDetailModal: false, picIndex: 0 });
    };

    _this.showPicModel = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.onClick();
      _this.setState({
        showModal: true
      });
    };

    _this.onOpenDetail = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.setState({ showDetailModal: true });
    };

    _this.onDelete = function (e) {
      _this.onClick();
      e.preventDefault();
      e.stopPropagation();
      var fileList = _this.state.fileList;
      var indexes = [];
      fileList.map(function (file, index) {
        indexes.push(index);
      });
      if (_this.props.model) {
        _this.props.model.deleteItems(indexes);
      } else {
        if (_this.props.onDelete) _this.props.onDelete(indexes);
      }
    };

    _this.onPicDelete = function (e, index) {
      if (_this.props.model) _this.props.model.deleteItem(index);
    };

    _this.onReplace = function (e, index) {
      _this.setState({
        onReplace: true,
        replaceIndex: index
      });
    };

    _this.onClick = function () {
      if (_this.props.onClick) _this.props.onClick();
    };

    _this.onLeftClick = function () {
      if (_this.state.picIndex == 0) return;
      _this.setState({
        picIndex: _this.state.picIndex - 1
      });
    };

    _this.onRightClick = function () {
      if (_this.state.picIndex == _this.state.fileList.length - 1) return;
      _this.setState({
        picIndex: _this.state.picIndex + 1
      });
    };

    _this._getControl = function () {
      var fileList = _this.state.fileList;

      var readOnly = false,
          count = fileList.length;
      if (_this.state.mode == 'browse' || _this.state.readOnly) readOnly = true;
      var control = null,
          style = {};
      if (count == 0) {
        /*无数据*/
        if (readOnly) {
          control = _react2.default.createElement(
            _antd.Badge,
            { count: count },
            _react2.default.createElement(
              'div',
              { className: 'pictureBook readOnly' },
              _react2.default.createElement(_SvgIcon2.default, { type: 'zanwushangpinxiangcetupian' }),
              _react2.default.createElement('div', { className: 'pictureRow' })
            )
          );
        } else {
          var tempControl = _react2.default.createElement(
            'div',
            { className: 'pictureBook ', onClick: _this.showPicModel },
            _react2.default.createElement('div', { className: 'pictureRow' }),
            _react2.default.createElement(_SvgIcon2.default, { type: 'shangchuantupian' }),
            _react2.default.createElement(
              'p',
              null,
              '\u4E0A\u4F20\u56FE\u7247'
            )
          );
          control = tempControl;
          // control = this.getUploadControl(tempControl);
        }
      } else {
        /*存在上传数据*/
        if (readOnly) {
          control = _react2.default.createElement(
            _antd.Badge,
            { count: count },
            _react2.default.createElement(
              'div',
              { className: 'pictureBook ', onClick: _this.onClick },
              _react2.default.createElement('div', { className: 'pictureRow' }),
              _react2.default.createElement(
                'div',
                { className: 'pictureImg' },
                _react2.default.createElement('img', { src: _this.state.fileList[0].address })
              ),
              _react2.default.createElement(
                'div',
                { className: 'fileBtn' },
                _react2.default.createElement(
                  'a',
                  { onClick: _this.onOpenDetail, className: 'search' },
                  _react2.default.createElement(_antd.Icon, { type: 'search' })
                )
              )
            )
          );
        } else {
          var _tempControl = _react2.default.createElement(
            _antd.Badge,
            { count: count },
            _react2.default.createElement(
              'div',
              { className: 'pictureBook ', onClick: _this.onClick },
              _react2.default.createElement('div', { className: 'pictureRow' }),
              _react2.default.createElement(
                'div',
                { className: 'pictureImg' },
                _react2.default.createElement('img', { onClick: _this.showPicModel, src: _this.state.fileList[0].address })
              ),
              _react2.default.createElement(
                'div',
                { className: 'fileBtn' },
                _react2.default.createElement(
                  'a',
                  { className: 'upload' },
                  _react2.default.createElement(_antd.Icon, { type: 'uploadImg' })
                ),
                _react2.default.createElement(
                  'a',
                  { onClick: _this.onOpenDetail, className: 'search' },
                  _react2.default.createElement(_antd.Icon, { type: 'search' })
                ),
                _react2.default.createElement(
                  'a',
                  { onClick: _this.onDelete, className: 'delete' },
                  _react2.default.createElement(_antd.Icon, { type: 'delete' })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'Progress' },
                _this.state.percent && _this.state.percent != 100 ? _react2.default.createElement(_antd.Progress, { percent: _this.state.percent, strokeWidth: 5 }) : null
              )
            )
          );
          control = _this.getUploadControl(_tempControl);
        }
      }
      return control;
    };

    _this.getModalControl = function () {
      var _this$state3 = _this.state,
          fileList = _this$state3.fileList,
          bPaginationChange = _this$state3.bPaginationChange;

      var control = [];
      var len = fileList.length;

      var _loop = function _loop() {
        var j = i;
        var buttonControl = _react2.default.createElement(
          'a',
          { onClick: function onClick(e) {
              return _this.onReplace(e, j);
            }, className: 'replace' },
          '\u66FF\u6362'
        );
        var tempControl = _this.getUploadControl(buttonControl);
        control.push(_react2.default.createElement(
          'div',
          { className: 'list-col' },
          _react2.default.createElement(
            'div',
            { className: 'pictureBook' },
            _react2.default.createElement(
              'div',
              { className: 'pictureImg' },
              _react2.default.createElement('img', { src: fileList[i].address })
            ),
            _react2.default.createElement(
              'div',
              { className: 'fileBtn' },
              tempControl,
              _react2.default.createElement(
                'a',
                { onClick: function onClick(e) {
                    return _this.onPicDelete(e, j);
                  }, className: 'delete' },
                _react2.default.createElement(_antd.Icon, { type: 'delete' })
              )
            )
          )
        ));
      };

      for (var i = 0; i < len; i++) {
        _loop();
      }
      return _react2.default.createElement(
        'div',
        { className: 'pictureBook-list' },
        _react2.default.createElement(
          'div',
          { className: 'pictureBook-list-title' },
          '\uFF08\u6700\u59271M\uFF0C\u652F\u6301\u683C\u5F0F\uFF1Ajpg\u3001bmp\u3001png\u3001jpeg\uFF0C700*700 \u4EE5\u4E0A\u7684\u56FE\u7247\u53EF\u4EE5\u5728\u5546\u54C1\u8BE6\u60C5\u9875\u4E3B\u56FE\u63D0\u4F9B\u56FE\u7247\u653E\u5927\u529F\u80FD\uFF09'
        ),
        _react2.default.createElement(
          'div',
          { className: 'list-row' },
          control
        )
      );
    };

    _this.getBigModalControl = function () {
      var _this$state4 = _this.state,
          fileList = _this$state4.fileList,
          picIndex = _this$state4.picIndex;

      var len = fileList.length - 1;
      return _react2.default.createElement(
        'div',
        { className: 'picture-big' },
        _react2.default.createElement(
          'a',
          { className: picIndex == 0 ? "pic-left pic-left-disabled" : "pic-left",
            onClick: _this.onLeftClick },
          _react2.default.createElement(_antd.Icon, { type: 'left' })
        ),
        fileList[picIndex] ? _react2.default.createElement('img', { src: fileList[picIndex].address }) : null,
        _react2.default.createElement(
          'a',
          { className: picIndex == len ? "pic-right pic-right-disabled" : "pic-right",
            onClick: _this.onRightClick },
          _react2.default.createElement(_antd.Icon, { type: 'right' })
        )
      );
    };

    _this.getUploadControl = function (control) {
      var action = '/upload?token=' + cb.rest.AppContext.token;
      var accept = '';
      if (_this.state.fileType == 'img') accept = 'image/jpeg,image/png,image/x-ms-bmp';
      return _react2.default.createElement(
        _antd.Upload,
        {
          showUploadList: false,
          action: action,
          onChange: _this._fielUploadOnChange,
          multiple: true,
          accept: accept,
          beforeUpload: _this._beforeUpload
        },
        control
      );
    };

    if (props.cStyle) {
      try {
        config = JSON.parse(props.cStyle);
      } catch (e) {}
    }
    _this.state = {
      fileList: [],
      fileType: props.fileType || 'img',
      bill2ReferKeyFieldMap: props.bill2ReferKeyFieldMap || {},
      readOnly: props.readOnly,
      percent: 0,
      showModal: false,
      picIndex: 0
    };
    _this.DocumentServerAddress = 'https://oivs4lxfc.bkt.clouddn.com';
    _this.uploading = false;
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

  _createClass(PictureBook, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.model) {
        if (!this.props.model) {
          nextProps.model.addListener(this);
          this.setValue(nextProps.model.getValue());
        } else {
          return;
        }
      } else {
        var bill2ReferKeyFieldMap = nextProps.bill2ReferKeyFieldMap || this.state.bill2ReferKeyFieldMap;
        var fileList = [];
        if (this.props.model) {
          this.props.model.removeListener(this);
          if (nextProps.dataSource) fileList = this.transferBill2Refer(nextProps.dataSource, bill2ReferKeyFieldMap);
          this.setState({
            fileList: fileList,
            bill2ReferKeyFieldMap: bill2ReferKeyFieldMap
          });
        } else {
          if (nextProps.dataSource) fileList = this.transferBill2Refer(nextProps.dataSource, bill2ReferKeyFieldMap);
          this.setState({
            fileList: fileList,
            bill2ReferKeyFieldMap: bill2ReferKeyFieldMap,
            readOnly: nextProps.readOnly
          });
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);else {
        var _props = this.props,
            dataSource = _props.dataSource,
            bill2ReferKeyFieldMap = _props.bill2ReferKeyFieldMap,
            readOnly = _props.readOnly;

        if (dataSource && bill2ReferKeyFieldMap) {
          var fileList = this.transferBill2Refer(dataSource, bill2ReferKeyFieldMap);
          this.setState({ fileList: fileList, bill2ReferKeyFieldMap: bill2ReferKeyFieldMap, readOnly: readOnly });
        }
      }
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
      var fileList = this.transferBill2Refer(value, this.state.bill2ReferKeyFieldMap);
      this.setState({ fileList: fileList });
    }
    /*上传改变事件*/

    /*显示已上传文件/图片的列表*/

    /*删除已上传文件*/

    /*上传前事件*/

  }, {
    key: 'render',
    value: function render() {
      var control = this._getControl();
      var modalControl = this.getModalControl();
      var bigModalControl = this.getBigModalControl();
      var buttonControl = _react2.default.createElement(
        _antd.Button,
        { key: 'upload', onClick: this.handleModify },
        _react2.default.createElement(_SvgIcon2.default, { className: 'plus-copy', type: 'export' }),
        '\u4E0A\u4F20\u56FE\u7247'
      );
      var uploadControl = this.getUploadControl(buttonControl);
      var title = _react2.default.createElement(
        'div',
        { className: 'model-header' },
        _react2.default.createElement(
          'div',
          { className: 'modelTitle' },
          '\u56FE\u518C'
        ),
        this.state.readOnly ? "" : uploadControl
      );
      return _react2.default.createElement(
        'div',
        { className: 'upload-picture-book clearfix' },
        control,
        _react2.default.createElement(
          _antd.Modal,
          { title: title, width: 750, visible: this.state.showModal, className: 'picture-book-modal',
            onOk: this.onOk, onCancel: this.onCancel, okText: '\u786E\u8BA4', cancelText: '\u53D6\u6D88', maskClosable: false
          },
          modalControl
        ),
        _react2.default.createElement(
          _antd.Modal,
          { width: 600, visible: this.state.showDetailModal, className: 'picture-big-modal',
            footer: null, maskClosable: false, onCancel: this.onBigCancel
          },
          bigModalControl
        )
      );
    }
  }]);

  return PictureBook;
}(_react2.default.Component);

exports.default = PictureBook;