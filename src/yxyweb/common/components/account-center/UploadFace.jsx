import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { Label, Row, Col } from 'yxyweb/common/components/basic';

export default class UpLoadFace extends Component {
  constructor(props) {
    super(props);
    this.url;
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
        this.url = result;
    }, this);
  }
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg' || 'image/png';
    if (!isJPG) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('图片大小要小于 1MB!');
    }
    return isJPG && isLt1M;
  }

  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // this.getBase64(info.file.originFileObj, imageUrl => accountactions.setAccountMsg({accountImgUrl:imageUrl}));
      if (info.file.response.code == 200) {
        if (this.props.imageChange) this.props.imageChange(this.url + info.file.response.data)
      }
    }
  }
  getFaceUploadControl = () => {
    let imageUrl = this.props.imgUrl;
    let context = cb.rest.AppContext;
    let action = '/upload?token=' + context.token;
    let toolClass = this.props.toolClass;
    return (
        <Upload
          className="avatar-uploader"
          showUploadList={false}
          action={action}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          accept="image/jpeg,image/png"
        >
          {
            imageUrl ?
              <div className={toolClass}>
                  <img src={imageUrl} alt="" />
                <div className='info-person-mask'><Icon type='uploadimg' /><p>点击上传</p></div>
              </div> :
              <div className={toolClass}>
                <div className='info-person-mask'><Icon type='uploadimg' /><p>点击上传</p></div>
              </div>
          }
        </Upload>
    )
  }
  render() {
    let control = this.getFaceUploadControl();
    return <div className={`uploadFace_component ${this.props.class_name}`}>
        {control}
    </div>
  }

}
