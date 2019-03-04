import React from 'react';
import { Upload, message, Button, Icon } from 'antd';
import Label from '../basic/label';
import Row from '../basic/row';
import FileList from './fileList';
import SvgIcon from 'SvgIcon';
import _ from 'lodash';
if (process.env.__CLIENT__ === true) {
  require('./fileList.less')
}
const ContentTypeContrast = {
  ".gif": "image/gif", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".bmp": "image/x-ms-bmp", ".pdf": "application/pdf", ".txt": "text/plain",
  ".doc": "application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".p12": "application/x-pkcs12", ".pfx": "",/*特殊处理pfx文件类型*/
  ".zip": "application/x-zip-compressed", ".rar": ""
};
export default class fileUpload extends React.Component {
  constructor(props) {
    super(props);
    let config = null, imageSize = '720*400', pics = null;
    if (props.cStyle) {
      try {
        config = JSON.parse(props.cStyle);
        if (config.imageSize)
          imageSize = config.imageSize;
        if (config.pics)
          pics = JSON.stringify(config.pics);
      } catch (e) {

      }
    }
    this.state = {
      colCount: props.colCount || 8,
      fileType: props.fileType || 'file',
      fileList: [],
      showUploadList: props.showUploadList || true,
      multiple: true,
      accept: '',
      mode: props.mode || 'edit',
      readOnly: false,
      config,
      imageSize,
      pics,
      showSVG: props.showSVG || '',
      showTitle: props.showTitle || '',
    };
    this.uploading = false;
    this.DocumentServerAddress = 'https://oivs4lxfc.bkt.clouddn.com';
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
      if (!err)
        this.DocumentServerAddress = result;
    }, this);
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  setListenerState(params, propertyName) {
    let showValue = params.showValue;
    if (showValue && showValue.length > 0) {
      params.fileList = this.transferBill2Refer(showValue, params.bill2ReferKeyFieldMap);
    }
    this.setState(params);
  }
  setValue(value) {
    if (!value) value = [];
    this.setState({ fileList: this.transferBill2Refer(value, this.state.bill2ReferKeyFieldMap) });
  }
  transferBill2Refer = (value, bill2ReferKeyFieldMap) => {
    var newValue = [];
    let fileList = this.state.fileList;
    value.forEach((item, index) => {
      var referItem = {};
      for (var billKey in bill2ReferKeyFieldMap)
        referItem[bill2ReferKeyFieldMap[billKey]] = item[billKey];
      if (fileList[index]) {
        if (fileList[index].name == referItem.name && fileList[index].size == referItem.size) {
          referItem.id = fileList[index].id;
        } else {
          let i = _.findIndex(fileList, { "name": referItem.name, "size": referItem.size });
          if(i != -1)  referItem.id = fileList[i].id;
        }
      }
      /*排序字段*/
      if (this.state.sortField) referItem[this.state.sortField] = item[this.state.sortField];
      newValue.push(referItem);
    });
    return newValue;
  };
  setServerUrl(url) {
    this.DocumentServerAddress = url;
  }
  /*上传改变事件*/
  _fielUploadOnChange = (info) => {
    let { fileList, config } = this.state;
    let num = _.findIndex(fileList, { 'id': info.file.uid });
    /*上传中状态*/
    if (info.file.status === 'uploading') {
      /*更新上传文件进度*/
      if (!info.file.percent) {
        cb.utils.loadingControl.end();
        this.uploading = false;
        fileList[num].percent = 100;
      } else {
        fileList[num].percent = info.file.percent;
      }
      fileList[num].size = info.file.size;
      this.setState({
        fileList,
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
          fileList[num].address = this.DocumentServerAddress + info.file.response.data;
        }
        this.setState({
          fileList
        });

        cb.utils.alert(`${info.file.name} 上传成功！`, 'success');
        cb.utils.loadingControl.end();
        this.uploading = false;
        if (this.props.model) {
          let bSet = true;
          fileList.map(item => {
            if (cb.utils.isEmpty(item.address)) bSet = false;
          });
          if (bSet) this.props.model.setValue(fileList, true);
        }
        if (this.props.doUpload)
          this.props.doUpload(fileList);

      } else {
        /*上传失败删除上传文件*/
        cb.utils.loadingControl.end();
        this.uploading = false;
        fileList.pop();
        this.setState({
          fileList
        });
        cb.utils.alert(`${info.file.name} 上传失败！${info.file.response.code} : ${info.file.response.message}`, 'error');
      }
    }
    /*上传出错状态*/
    if (info.file.status === 'error') {
      cb.utils.alert(`${info.file.name} 上传失败！${info.file.response.code} : ${info.file.response.message}`, 'error');
    }
  }
  /*显示已上传文件/图片的列表*/
  _fileListControl = (fileType) => {
    if (this.state.fileList.length == 0 && this.state.readOnly) {
      return <div className="upload-nodata"><Icon type={fileType == "file" ? "noFile" : "noPic"} /><span>{fileType == "file" ? "暂无附件~" : "暂无图片~"}</span></div>
    }
    const config = this.state.config;
    let isDownLoadable = true;
    if (config && config.isDownLoadable != undefined) {
      isDownLoadable = config.isDownLoadable;
    }
    return <FileList isDownLoadable={isDownLoadable} model={this.props.model} arrowImg={this._arrowImg} DelFile={this._DelFile} colCount={this.state.colCount} fileType={fileType} fileList={this.state.fileList} readOnly={this.state.readOnly} sortField={this.state.sortField} columns={this.state.columns} mode={this.state.mode} />
  }
  /*删除已上传文件*/
  _DelFile = (index) => {
    if (this.props.model)
      this.props.model.deleteItem(index);
  }
  /*移动已上传文件位置*/
  _arrowImg = (arrow, index) => {
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
  }
  /*上传前事件-未用*/
  _beforeUpload = (file, uploadFileList) => {
    cb.utils.loadingControl.start();
    let { fileList, config } = this.state;
    let maxSize = 20971520, nowSize = 0;
    if (config && config.maxSize) maxSize = config.maxSize * 1024 * 1024;
    fileList && fileList.map(item => {
      nowSize += parseFloat(item.size);
    });
    nowSize += file.size;
    if (nowSize > maxSize) {
      cb.utils.alert('总附件大小超出控制！', 'error');
      this.uploading = false;
      cb.utils.loadingControl.end();
      return false;
    }
    let { fileType, accept } = this.state;
    if (config && config.uploadType && config.uploadType == 'local') {
      // accept = ".p12,.P12";
      if (fileList.length > 0 || uploadFileList.length > 1) {
        cb.utils.alert('当前只允许上传一个附件，请删除后重新上传！', 'error');
        this.uploading = false;
        cb.utils.loadingControl.end();
        return false;
      }
    }
    if (config) {
      if (config.fileType) fileType = config.fileType;
      if (config.accept) accept = config.accept;
    }
    if (accept == '') {
      if (fileType == 'file')
        accept = "pdf,doc,xls,txt,jpg,png,bmp,gif";
      else
        accept = "png,jpg,jpeg,bmp";
    }
    accept = accept.split(',');
    let inAccept = false;
    accept.map(item => {
      if (file.name && file.name.split(item).length > 1)
        inAccept = true;
    });
    if (!inAccept) {
      cb.utils.alert('选择文件格式不正确，请重新选择！', 'error');
      this.uploading = false;
      cb.utils.loadingControl.end();
      return false;
    }

    if (config && config.maxQuantity) {
      if (fileList.length >= config.maxQuantity) {
        cb.utils.alert('超出上传限制，请删除后重新上传！', 'error');
        this.uploading = false;
        cb.utils.loadingControl.end();
        return false;
      }
      if (uploadFileList.length > config.maxQuantity) {
        cb.utils.alert('选择数量超过上传限制，请重新上传！', 'error');
        this.uploading = false;
        cb.utils.loadingControl.end();
        return false;
      }
    }
    if (!this.uploading) {
      this.uploading = true;
      // cb.utils.alert('上传中~请稍后！', 'success');
    }
    fileList.push({ 'percent': file.percent, 'name': file.name, 'id': file.uid, 'type': file.type });
    this.setState({ fileList });
  }
  /*下载全部*/
  downLoadAll = () => {
    let fileList = this.state.fileList;
    if (fileList.length > 0) {
      fileList.forEach(function (element) {
        window.open(element.address);
      }, this);
    }
  }
  getUploadData = (file) => {
    let config = this.state.config;
    if (!config || !config.folderName) return file;
    file.folderName = config.folderName
    return file;
  }
  renderBaseUpload = (action, showName, fileListControl, accept, showUpLoad) => {
    let config = this.state.config, fileType = null, maxQuantity;
    if (!config || !config.fileType) {
      fileType = this.state.fileType;
    } else {
      fileType = config.fileType;
    }
    if (config) maxQuantity = config.maxQuantity ? config.maxQuantity : -1;
    let str = (maxQuantity !== -1) ? '不超过' + maxQuantity + '张' : '不限';
    if (showUpLoad) {
      let uploadTips = "";
      if (fileType == 'file') {
        if (config && config.uploadTips)
          uploadTips = (
            <span className='fileupload-txt'>
              {'（' + config.uploadTips + '）'}
            </span>
          );
        else
          uploadTips = (
            <span className='fileupload-txt'>
              （全部附件大小不可超过<em>20M</em>，支持格式：PDF、Word、Excel、Txt、JPG、PNG、BMP、GIF）
            </span>
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
        uploadTips = (
          <span className='fileupload-txt'>
            （全部附件大小不可超过<em>20M</em>，支持格式：P12）
          </span>
        );
      }
      return <Row>
        {/*<div className='pull-left'>*/}
        <div title={this.state.showTitle}>
          <Upload
            showUploadList={false}
            data={this.getUploadData}
            action={action}
            onChange={this._fielUploadOnChange}
            multiple={this.state.multiple}
            accept={accept}
            beforeUpload={this._beforeUpload}
            disabled={!showUpLoad}
          >
            <a style={{ color: this.props.showNameColor ? this.props.showNameColor : undefined }} className='btn-gray'>{this.state.showSVG ? <SvgIcon type={this.state.showSVG} /> : <Icon type="paper-clip" />}
              {showName}
            </a>
          </Upload >
          {
            this.props.hideDesc ?
              "" : ((fileType == 'file') ?
                <span className='fileupload-txt'>
                  {uploadTips}
                </span>
                :
                <span className='fileupload-txt'>
                  {uploadTips}
                </span>)
          }
        </div>
        <div>{fileListControl}</div>
      </Row>
    } else {
      return <Row>
        <div>{fileListControl}</div>
      </Row>
    }
  }
  renderUpload = (action, showName, fileListControl, accept, showUpLoad) => {
    const { cShowCaption } = this.props;
    const control = this.renderBaseUpload(action, showName, fileListControl, accept, showUpLoad);
    let caption = cShowCaption;
    // if (this.state.fileList.length == 0 && this.state.readOnly) readOnlyOnData = true;
    return caption ? <Label control={control} title={caption} /> : control;
  }
  _getControl = () => {
    let context = cb.rest.AppContext;
    let action = '/upload?token=' + context.token;
    const { pics } = this.state;
    if (pics)
      action += '&pics=' + pics;
    let accept = '', showName = '', fileType = '', config = this.state.config;
    if (!config || !config.fileType) {
      fileType = this.state.fileType;
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
      showName = this.props.bShowName ? this.props.showName : '添加图片';
    }
    if (config && config.accept) {
      let acceptList = config.accept.split(',');
      // ContentTypeContrast
      accept = '';
      acceptList.map(item => {
        if (ContentTypeContrast[item] && ContentTypeContrast[item] !== '')
          accept = accept + ',' + ContentTypeContrast[item];
      });
    }
    let showUpLoad = true;
    if (this.state.mode == 'browse' || this.state.readOnly) {
      showUpLoad = false;
    }
    let showCaption = <span>[<a onClick={() => this.downLoadAll()}>下载全部</a>]</span>;
    let fileListControl = this.state.showUploadList ? this._fileListControl(fileType) : '';
    if (this.state.fileList.length == 0) showCaption = <span></span>;
    return (
      this.renderUpload(action, showName, fileListControl, accept, showUpLoad)
    )
    // return (
    //   showUpLoad ?
    //     this.renderUpload(action, showName, fileListControl, accept)
    //     :
    //     <div>
    //       <div className='upload-list'>附件<em>{this.state.fileList.length}</em>个{showCaption}</div>
    //       <div>{fileListControl}</div>
    //     </div>
    // )
  }
  render() {
    let control = this._getControl();
    return (
      <div className='upload-content clearfix'>{control}</div>
    )
  }
}
