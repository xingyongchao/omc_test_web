import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { Label, Row, Col } from 'yxyweb/common/components/basic';


export default class eChartUpLoad extends Component {
  constructor(props) {
    super(props);
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

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg' || 'image/png';
    if (!isJPG) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('Image must smaller than 1MB!');
    }
    return isJPG && isLt1M;
  }

  handleChange = (info) => {
    if (info.file.status === 'done') {
      if (info.file.response.code == 200) {
        if (this.props.doUpload) {
          let tmp = this.DocumentServerAddress + info.file.response.data;
          this.props.doUpload(tmp);
        }
      }
      else {
        eChartCommon.LogChartInfo("上传图片：调用服务出错  info.file.response ", JSON.stringify(info.file.response), 999);
      }
    }
  }

  render() {

    let { logoImg } = this.props;
    let context = cb.rest.AppContext;
    let action = '/upload?token=' + context.token;
    return <div className="logo-sc">
      <Upload
        showUploadList={false}
        action={action}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
        accept="image/jpeg,image/png"
      >
        <div className={'info-person dj-sc ' + (logoImg ? "eChartUpLoad_HasImg" : "eChartUpLoad_NoImg")}>
          {logoImg ? <img src={logoImg} /> : ""}
          <div className={'info-person-mask '}>
            <Icon type='uploadimg' />
            <p>点击上传</p>
          </div>
        </div>

      </Upload>
      <div className="tips">仅支持JPG、JPEG、BMP、PNG格式，文件小于2M</div>
    </div>;
  }

}
