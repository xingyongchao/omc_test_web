import React from 'react';
import { message, Button, Icon, Progress } from 'antd';
import Col from '../basic/col';
import Row from '../basic/row';

export default class fileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colCount: props.colCount || 4,
      fileType: props.fileType || 'image',
      fileList: props.fileList || [],
      showCover: true
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      fileList: nextProps.fileList
    });
  }
  /*转化上传的文件大小为适当单位*/
  _getSizeString = (size) => {
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
    return sizeString
  }
  /*删除已上传文件/图片*/
  _DeleteFile = (e, index) => {
    if (this.props.DelFile)
      this.props.DelFile(index);
  }
  /*移动已上传图片位置*/
  _arrowImg = (e, arrow, index) => {
    if (this.props.arrowImg)
      this.props.arrowImg(arrow, index);
  }
  /*下载*/
  _DownloadFile = (e, address) => {
    if (this.props.isDownLoadable == false) {
      cb.utils.alert('当前文件不允许下载！');
    } else {
      window.open(address);
    }
  }
  _onSort = (e, index, type) => {
    let fileList = this.state.fileList;
    let sortField = this.props.sortField;
    let pre = cb.utils.extend(true, {}, fileList[index - 1]);
    let next = cb.utils.extend(true, {}, fileList[index + 1]);
    let now = cb.utils.extend(true, {}, fileList[index]);
    let preSort = pre[sortField];
    let nextSort = next[sortField];
    let nowSort = now[sortField];
    let newData = [];
    if (type == 'left') {
      if (index == 0) return;
      newData = [
        { "index": index, "cellName": sortField, "cellValue": preSort },
        { "index": index - 1, "cellName": sortField, "cellValue": nowSort }
      ];
    } else {
      if (index == fileList.length - 1) return
      newData = [
        { "index": index, "cellName": sortField, "cellValue": nextSort },
        { "index": index + 1, "cellName": sortField, "cellValue": nowSort }
      ];
    }
    this.props.model.setCellValues(newData);
  }
  onMouseEnter = () => {
    this.setState({ showCover: false });
  }
  onMouseLeave = () => {
    this.setState({ showCover: true });
  }
  // getCover = () => {
  //   const { columns, sortField } = this.props;
  //   let column = columns[sortField];
  //   if (!column) return '封面';
  //   return column.cShowCaption;
  // }
  /*上传附件列表*/
  _getFileControl = () => {
    let self = this;
    let fileList = this.state.fileList;
    let isDownLoadable = this.props.isDownLoadable;
    let control = [], file, fileBtn, mode = this.props.mode;
    let colPrecent = 100 / this.state.colCount;
    colPrecent = colPrecent.toString() + '%';
    if (fileList.length > 0) {
      fileList.map(function (files, index) {
        var percent = Math.round(files.percent);
        if (percent != 100 && !isNaN(percent)) {
          file = (

            <div className='pull-left'>
              <div className='fileImg'><Icon type='pdf' /></div>
              <Row style={{ 'marginBottom': '5px' }}>{files.name}</Row>
              <div style={{}}><Progress percent={percent} strokeWidth={5} status="active" /></div>
            </div>
          );
        } else {
          let size = self._getSizeString(files.size);
          let address = files.address;
          let control = null;
          let icon = '#icon-';
          switch (files.type) {
            case 'application/pdf':
              icon += 'PDF';
              control = <svg className="icon" aria-hidden="true"><use href={icon}></use></svg>
              break;
            case 'text/plain':
              icon += 'Txt';
              control = <svg className="icon" aria-hidden="true"><use href={icon}></use></svg>
              break;
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
              icon += 'Word';
              control = <svg className="icon" aria-hidden="true"><use href={icon}></use></svg>
              break;
            case 'application/vnd.ms-excel':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
              icon += 'Excel';
              control = <svg className="icon" aria-hidden="true"><use href={icon}></use></svg>
              break;
            case 'application/x-pkcs12':
              if (files.address && files.address.split('.pfx').length == 2)
                icon += 'PFX';
              else
                icon += 'P12';
              control = <svg className="icon" aria-hidden="true"><use href={icon}></use></svg>
              break;
            case 'application/x-zip-compressed':
            case '':
              let name = files.name, isZip = false;
              name = name ? name.trim().toLocaleLowerCase() : '';
              if (name.indexOf('.rar') != -1 || name.indexOf('.zip') != -1) {
                icon += 'ZIP';
                control = <svg className="icon" aria-hidden="true"><use href={icon}></use></svg>
              } else {
                control = <img src={files.address} />
              }
              break;
            default:
              control = <img src={files.address} />
              break;
          }
          if (mode == 'browse' || self.props.readOnly) {/*浏览态不能删除*/
            fileBtn = (
              <div className='fileBtn'>
                <a style={{ width: '100%' }} onClick={(e) => self._DownloadFile(e, address)} className={'download'}><Icon type="download" /></a>
              </div>
            );
          } else {
            if (self.props.sortField) {
              if (index == 0 && self.state.showCover) {
                // let cover = self.getCover();
                fileBtn = (
                  <div className='fileBtn fileBtn-sort showCover' onMouseEnter={self.onMouseEnter}>
                    <a className={'cover'}>
                      {'封面'}
                    </a>
                  </div>
                );
              } else {
                fileBtn = (
                  <div className='fileBtn fileBtn-sort' onMouseLeave={self.onMouseLeave} >
                    <a onClick={(e) => self._onSort(e, index, 'left')} className={'sort-left'}>
                      <Icon type="arrow-left" />
                    </a>
                    <a onClick={(e) => self._onSort(e, index, 'right')} className={'sort-right'}>
                      <Icon type="arrow-right" />
                    </a>
                    <a className={'close'} onClick={(e) => self._DeleteFile(e, index)}>
                      <Icon type="delete" />
                    </a>
                  </div>
                );
              }
            } else {
              fileBtn = (
                isDownLoadable ?
                  <div className='fileBtn'>
                    <a onClick={(e) => self._DownloadFile(e, address)} className={'download'}><Icon type="download" /></a>
                    <a className={'close'} onClick={(e) => self._DeleteFile(e, index)}><Icon type="delete" /></a>
                  </div>
                  :
                  <div className='fileBtn'>
                    <a className={'onlyClose'} onClick={(e) => self._DeleteFile(e, index)}><Icon type="delete" /></a>
                  </div>
              );
            }
          }
          file = (
            <div key={index} className='pull-left'>
              <div className={'fileList'}>
                <div className='fileImg'>
                  {control}
                  {fileBtn}
                </div>
                <div title={files.name} className={'fileName'}>{files.name}</div>
                <span className={'fileSize'}>{size}</span>
              </div>
            </div>
          );
        }
        control.push(file);
      });
    }
    return control;
  }
  /*上传图片列表*/
  _getImgControl = () => {
    let self = this;
    let fileList = this.state.fileList;
    let control = [];
    let file;
    let colPrecent = 100 / this.state.colCount;
    colPrecent = colPrecent.toString() + '%';
    if (fileList.length > 0) {
      fileList.map(function (files, index) {
        var percent = Math.round(files.percent);
        if (percent != 100 && !isNaN(percent)) {
          file = (
            <Col key={index} span={colPrecent}>
              <div className='Progress'>
                <Progress percent={percent} strokeWidth={5} type="circle" />
              </div>
            </Col>
          );
        } else {
          file = (
            <Col key={index} span={colPrecent}>
              <div className='imageList'>
                <img title={files.name} className={'imageName'} src={files.address} />
                <div className={'imageDiv'}>
                  <div className={'arrowleft iconBefore'} onClick={(e) => self._arrowImg(e, 'left', index)}></div>
                  <div className={'arrowright iconBefore'} onClick={(e) => self._arrowImg(e, 'right', index)}></div>
                  <div className={'delete iconBefore'} onClick={(e) => self._DeleteFile(e, index)}></div>
                </div>
              </div>
            </Col>
          );
        }
        control.push(file);
      });
    }
    return control;
  }
  render() {
    let fileList;
    if (this.state.fileType == 'file') {
      fileList = this._getFileControl();
    } else if (this.state.fileType == 'image') {
      // fileList = this._getImgControl();
      fileList = this._getFileControl();
    } else {
      return null;
    }
    return (
      <Row gutter={10}>{fileList}</Row>
    )
  }
};
