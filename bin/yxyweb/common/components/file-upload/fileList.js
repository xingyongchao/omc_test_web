'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _col = require('../basic/col');

var _col2 = _interopRequireDefault(_col);

var _row = require('../basic/row');

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fileList = function (_React$Component) {
  _inherits(fileList, _React$Component);

  function fileList(props) {
    _classCallCheck(this, fileList);

    var _this = _possibleConstructorReturn(this, (fileList.__proto__ || Object.getPrototypeOf(fileList)).call(this, props));

    _this._getSizeString = function (size) {
      var kb = 1024;
      var mb = kb * 1024;
      var gb = mb * 1024;
      var sizeString;
      if (size < kb) {
        sizeString = Math.round(size * Math.pow(10, 1)) / Math.pow(10, 1) + 'B';
      } else if (size >= kb && size <= mb) {
        sizeString = Math.round(size / kb * Math.pow(10, 1)) / Math.pow(10, 1) + 'KB';
      } else if (size >= mb && size <= gb) {
        sizeString = Math.round(size / mb * Math.pow(10, 1)) / Math.pow(10, 1) + 'MB';
      } else {
        sizeString = Math.round(size / gb * Math.pow(10, 1)) / Math.pow(10, 1) + 'GB';
      }
      return sizeString;
    };

    _this._DeleteFile = function (e, index) {
      if (_this.props.DelFile) _this.props.DelFile(index);
    };

    _this._arrowImg = function (e, arrow, index) {
      if (_this.props.arrowImg) _this.props.arrowImg(arrow, index);
    };

    _this._DownloadFile = function (e, address) {
      if (_this.props.isDownLoadable == false) {
        cb.utils.alert('当前文件不允许下载！');
      } else {
        window.open(address);
      }
    };

    _this._onSort = function (e, index, type) {
      var fileList = _this.state.fileList;
      var sortField = _this.props.sortField;
      var pre = cb.utils.extend(true, {}, fileList[index - 1]);
      var next = cb.utils.extend(true, {}, fileList[index + 1]);
      var now = cb.utils.extend(true, {}, fileList[index]);
      var preSort = pre[sortField];
      var nextSort = next[sortField];
      var nowSort = now[sortField];
      var newData = [];
      if (type == 'left') {
        if (index == 0) return;
        newData = [{ "index": index, "cellName": sortField, "cellValue": preSort }, { "index": index - 1, "cellName": sortField, "cellValue": nowSort }];
      } else {
        if (index == fileList.length - 1) return;
        newData = [{ "index": index, "cellName": sortField, "cellValue": nextSort }, { "index": index + 1, "cellName": sortField, "cellValue": nowSort }];
      }
      _this.props.model.setCellValues(newData);
    };

    _this.onMouseEnter = function () {
      _this.setState({ showCover: false });
    };

    _this.onMouseLeave = function () {
      _this.setState({ showCover: true });
    };

    _this._getFileControl = function () {
      var self = _this;
      var fileList = _this.state.fileList;
      var isDownLoadable = _this.props.isDownLoadable;
      var control = [],
          file = void 0,
          fileBtn = void 0,
          mode = _this.props.mode;
      var colPrecent = 100 / _this.state.colCount;
      colPrecent = colPrecent.toString() + '%';
      if (fileList.length > 0) {
        fileList.map(function (files, index) {
          var percent = Math.round(files.percent);
          if (percent != 100 && !isNaN(percent)) {
            file = _react2.default.createElement(
              'div',
              { className: 'pull-left' },
              _react2.default.createElement(
                'div',
                { className: 'fileImg' },
                _react2.default.createElement(_antd.Icon, { type: 'pdf' })
              ),
              _react2.default.createElement(
                _row2.default,
                { style: { 'marginBottom': '5px' } },
                files.name
              ),
              _react2.default.createElement(
                'div',
                { style: {} },
                _react2.default.createElement(_antd.Progress, { percent: percent, strokeWidth: 5, status: 'active' })
              )
            );
          } else {
            var size = self._getSizeString(files.size);
            var address = files.address;
            var _control = null;
            var icon = '#icon-';
            switch (files.type) {
              case 'application/pdf':
                icon += 'PDF';
                _control = _react2.default.createElement(
                  'svg',
                  { className: 'icon', 'aria-hidden': 'true' },
                  _react2.default.createElement('use', { href: icon })
                );
                break;
              case 'text/plain':
                icon += 'Txt';
                _control = _react2.default.createElement(
                  'svg',
                  { className: 'icon', 'aria-hidden': 'true' },
                  _react2.default.createElement('use', { href: icon })
                );
                break;
              case 'application/msword':
              case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                icon += 'Word';
                _control = _react2.default.createElement(
                  'svg',
                  { className: 'icon', 'aria-hidden': 'true' },
                  _react2.default.createElement('use', { href: icon })
                );
                break;
              case 'application/vnd.ms-excel':
              case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                icon += 'Excel';
                _control = _react2.default.createElement(
                  'svg',
                  { className: 'icon', 'aria-hidden': 'true' },
                  _react2.default.createElement('use', { href: icon })
                );
                break;
              case 'application/x-pkcs12':
                if (files.address && files.address.split('.pfx').length == 2) icon += 'PFX';else icon += 'P12';
                _control = _react2.default.createElement(
                  'svg',
                  { className: 'icon', 'aria-hidden': 'true' },
                  _react2.default.createElement('use', { href: icon })
                );
                break;
              case 'application/x-zip-compressed':
              case '':
                var name = files.name,
                    isZip = false;
                name = name ? name.trim().toLocaleLowerCase() : '';
                if (name.indexOf('.rar') != -1 || name.indexOf('.zip') != -1) {
                  icon += 'ZIP';
                  _control = _react2.default.createElement(
                    'svg',
                    { className: 'icon', 'aria-hidden': 'true' },
                    _react2.default.createElement('use', { href: icon })
                  );
                } else {
                  _control = _react2.default.createElement('img', { src: files.address });
                }
                break;
              default:
                _control = _react2.default.createElement('img', { src: files.address });
                break;
            }
            if (mode == 'browse' || self.props.readOnly) {
              /*浏览态不能删除*/
              fileBtn = _react2.default.createElement(
                'div',
                { className: 'fileBtn' },
                _react2.default.createElement(
                  'a',
                  { style: { width: '100%' }, onClick: function onClick(e) {
                      return self._DownloadFile(e, address);
                    }, className: 'download' },
                  _react2.default.createElement(_antd.Icon, { type: 'download' })
                )
              );
            } else {
              if (self.props.sortField) {
                if (index == 0 && self.state.showCover) {
                  // let cover = self.getCover();
                  fileBtn = _react2.default.createElement(
                    'div',
                    { className: 'fileBtn fileBtn-sort showCover', onMouseEnter: self.onMouseEnter },
                    _react2.default.createElement(
                      'a',
                      { className: 'cover' },
                      '封面'
                    )
                  );
                } else {
                  fileBtn = _react2.default.createElement(
                    'div',
                    { className: 'fileBtn fileBtn-sort', onMouseLeave: self.onMouseLeave },
                    _react2.default.createElement(
                      'a',
                      { onClick: function onClick(e) {
                          return self._onSort(e, index, 'left');
                        }, className: 'sort-left' },
                      _react2.default.createElement(_antd.Icon, { type: 'arrow-left' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { onClick: function onClick(e) {
                          return self._onSort(e, index, 'right');
                        }, className: 'sort-right' },
                      _react2.default.createElement(_antd.Icon, { type: 'arrow-right' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { className: 'close', onClick: function onClick(e) {
                          return self._DeleteFile(e, index);
                        } },
                      _react2.default.createElement(_antd.Icon, { type: 'delete' })
                    )
                  );
                }
              } else {
                fileBtn = isDownLoadable ? _react2.default.createElement(
                  'div',
                  { className: 'fileBtn' },
                  _react2.default.createElement(
                    'a',
                    { onClick: function onClick(e) {
                        return self._DownloadFile(e, address);
                      }, className: 'download' },
                    _react2.default.createElement(_antd.Icon, { type: 'download' })
                  ),
                  _react2.default.createElement(
                    'a',
                    { className: 'close', onClick: function onClick(e) {
                        return self._DeleteFile(e, index);
                      } },
                    _react2.default.createElement(_antd.Icon, { type: 'delete' })
                  )
                ) : _react2.default.createElement(
                  'div',
                  { className: 'fileBtn' },
                  _react2.default.createElement(
                    'a',
                    { className: 'onlyClose', onClick: function onClick(e) {
                        return self._DeleteFile(e, index);
                      } },
                    _react2.default.createElement(_antd.Icon, { type: 'delete' })
                  )
                );
              }
            }
            file = _react2.default.createElement(
              'div',
              { key: index, className: 'pull-left' },
              _react2.default.createElement(
                'div',
                { className: 'fileList' },
                _react2.default.createElement(
                  'div',
                  { className: 'fileImg' },
                  _control,
                  fileBtn
                ),
                _react2.default.createElement(
                  'div',
                  { title: files.name, className: 'fileName' },
                  files.name
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'fileSize' },
                  size
                )
              )
            );
          }
          control.push(file);
        });
      }
      return control;
    };

    _this._getImgControl = function () {
      var self = _this;
      var fileList = _this.state.fileList;
      var control = [];
      var file = void 0;
      var colPrecent = 100 / _this.state.colCount;
      colPrecent = colPrecent.toString() + '%';
      if (fileList.length > 0) {
        fileList.map(function (files, index) {
          var percent = Math.round(files.percent);
          if (percent != 100 && !isNaN(percent)) {
            file = _react2.default.createElement(
              _col2.default,
              { key: index, span: colPrecent },
              _react2.default.createElement(
                'div',
                { className: 'Progress' },
                _react2.default.createElement(_antd.Progress, { percent: percent, strokeWidth: 5, type: 'circle' })
              )
            );
          } else {
            file = _react2.default.createElement(
              _col2.default,
              { key: index, span: colPrecent },
              _react2.default.createElement(
                'div',
                { className: 'imageList' },
                _react2.default.createElement('img', { title: files.name, className: 'imageName', src: files.address }),
                _react2.default.createElement(
                  'div',
                  { className: 'imageDiv' },
                  _react2.default.createElement('div', { className: 'arrowleft iconBefore', onClick: function onClick(e) {
                      return self._arrowImg(e, 'left', index);
                    } }),
                  _react2.default.createElement('div', { className: 'arrowright iconBefore', onClick: function onClick(e) {
                      return self._arrowImg(e, 'right', index);
                    } }),
                  _react2.default.createElement('div', { className: 'delete iconBefore', onClick: function onClick(e) {
                      return self._DeleteFile(e, index);
                    } })
                )
              )
            );
          }
          control.push(file);
        });
      }
      return control;
    };

    _this.state = {
      colCount: props.colCount || 4,
      fileType: props.fileType || 'image',
      fileList: props.fileList || [],
      showCover: true
    };
    return _this;
  }

  _createClass(fileList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        fileList: nextProps.fileList
      });
    }
    /*转化上传的文件大小为适当单位*/

    /*删除已上传文件/图片*/

    /*移动已上传图片位置*/

    /*下载*/

    // getCover = () => {
    //   const { columns, sortField } = this.props;
    //   let column = columns[sortField];
    //   if (!column) return '封面';
    //   return column.cShowCaption;
    // }
    /*上传附件列表*/

    /*上传图片列表*/

  }, {
    key: 'render',
    value: function render() {
      var fileList = void 0;
      if (this.state.fileType == 'file') {
        fileList = this._getFileControl();
      } else if (this.state.fileType == 'image') {
        // fileList = this._getImgControl();
        fileList = this._getFileControl();
      } else {
        return null;
      }
      return _react2.default.createElement(
        _row2.default,
        { gutter: 10 },
        fileList
      );
    }
  }]);

  return fileList;
}(_react2.default.Component);

exports.default = fileList;
;