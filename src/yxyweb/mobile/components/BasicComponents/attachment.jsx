import React, { Component } from 'react';
import { render } from 'react-dom';
import { List, Button,Modal,Icon,Grid,ActionSheet,Toast } from 'antd-mobile';
import _ from 'lodash';
let fileAttach=[],types=[];
export default class Attachment extends Component{
    
    constructor(props){
        super(props);
        this.state = {
          attachs:[],
          colCount: props.colCount || 8,
          fileType: props.fileType || 'file',
          fileList: [],
          showUploadList: props.showUploadList || true,
          multiple: true,
          accept: '',
          mode: props.mode || 'edit',
          readOnly: false,
          config:{},
          imageSize:0,
          pics:'',
          showSVG: props.showSVG || '',
          showTitle: props.showTitle || '',
          chsphoto:false
        };
    
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
        this.setImageAttr(params);
      }
      setValue(value) {
        if (!value) value = [];
        this.setState({ fileList: this.transferBill2Refer(value, this.state.bill2ReferKeyFieldMap) });
      }
      setImageAttr(params){
        let config = null, imageSize = '720*400', pics = null;
        if (params.cStyle) {
          try {
            config = JSON.parse(params.cStyle);
            if (config.imageSize)
              imageSize = config.imageSize;
            if (config.pics)
              pics = JSON.stringify(config.pics);
          } catch (e) {
    
          }
        }
        params.imageSize = imageSize;
        params.pics = pics;
        params.config=config;
        this.setState(params);
      }
      transferBill2Refer = (value, bill2ReferKeyFieldMap) => {
        var newValue = [];
        value.forEach((item, index) => {
          var referItem = {};
          for (var billKey in bill2ReferKeyFieldMap)
            referItem[bill2ReferKeyFieldMap[billKey]] = item[billKey];
          /*排序字段*/
          if (this.state.sortField) referItem[this.state.sortField] = item[this.state.sortField];
          newValue.push(referItem);
        });
        return newValue;
      };
      setServerUrl(url) {
        this.DocumentServerAddress = url;
      }

    componentDidUpdate(){
        if(this.props.model)
            this.props.model.addListener(this);
    }

    changeStatus(bl) {
        this.setState({ chsphoto: bl })
    }

    chooseImage=()=>{
        ActionSheet.showShareActionSheetWithOptions({
            options:[
                {
                    icon: <i className="icon icon-review"></i>,
                    title: "拍照"
                },{
                    icon: <i className="icon icon-review"></i>,
                    title: "相册"
                }
            ],
        },
        (buttonIndex) => {
            this.takeNewPic(buttonIndex===0?'carema':'album');
        });
    }

    /*唤起相机或相册*/
  takeNewPic = (type) => {
    this.changeStatus(false);
    if (!window.plus || !window.plus.uploader) return;
    let { fileList,attachs } = this.state,uploadData = { },_self = this;
    let url = cb.rest.AppContext.serviceUrl + "/upload?token=" + cb.rest.AppContext.token;
    var task = window.plus.uploader.createUpload(url, { method: 'POST' }, (upload, status) => {
      Toast.hide();
      if (status == 200 && upload.state == 4) {
        let responseData = JSON.parse(upload.responseText).data;
        uploadData.address = this.DocumentServerAddress + responseData;
        uploadData.size = upload.uploadedSize;
        uploadData.type = 'image/' + uploadData.name.split('.')[1];
        // mineAction.modifyMineInfo(mine.get('user').set('avatar', uploadData.url));
        // _self.setState({ attr:uploadData });
        if(uploadData.size>4*1024*1024){
            cb.utils.Toast('超出上传限制，请删除后重新上传！', 'fail');
            return;
        }
        if(types.indexOf(uploadData.name.split('.')[1].toLocaleLowerCase())<0){
            cb.utils.Toast('选择文件格式不正确，请重新选择！', 'fail');
            return;
        }
        if (this.props.model){
            attachs.push(uploadData);
            fileList.splice(fileList.length-1,0,uploadData);
            _self.setState({fileList,attachs});
            this.props.model.setValue(fileList, true);
        }
      } else {
        cb.utils.Toast('上传失败' + JSON.parse(upload.responseText), 'fail');
      }
    });
    if (type == 'album') {/*相册*/
      plus.gallery.pick(function (path) {
        window.plus.io.resolveLocalFileSystemURL(path, entry => {
          /* 将本地URL路径转换成平台绝对路径 */
            var url = entry.toLocalURL();
            uploadData.name = entry.name;
            task.addFile(url, { key: 'file' });
            task.addData('name', entry.name);
            Toast.loading('上传中...', 10);
            task.start();
            
        });
      }, function (e) {
        console.log("取消选择图片");
      }, { filter: "image" });
    } else {/*拍照*/
      var cmr = plus.camera.getCamera();
      cmr.captureImage(function (path) {
        window.plus.io.resolveLocalFileSystemURL(path, function (entry) {
          /* 将本地URL路径转换成平台绝对路径 */
          var url = entry.toLocalURL();
          uploadData.name = entry.name;
          task.addFile(url, { key: 'file' });
          task.addData('name', entry.name);
          Toast.loading('上传中...', 10);
          task.start();
        });
      }, function (error) {
        //  cb.utils.Toast("Capture image failed: " + error.message,'fail');
        //  Toast.fail("Capture image failed: " + error.message,1);
      });
    }

  }

    getItemControls=(item)=>{
        const { fileList,bCanModify,readOnly,config } = this.state;
        let controls=[],maxQuantity=0,index=_.indexOf(fileAttach,item);
        if(index===(fileAttach.length-1) && bCanModify && !readOnly){
            if (config) maxQuantity = config.maxQuantity ? config.maxQuantity : -1;
            controls.push(<div style={{ display:'flex',flexDirection:'column'}} onClick={() => { this.changeStatus(true) }}>
                <Icon  type='icon-tianjiatupian' style={{height:'1.1rem',width:'1.1rem'}} />
                {fileAttach.length-1}/{maxQuantity}
                </div>);
        }else{
            controls.push(<div style={{ padding: '5px' }}>
                    <img src={item.address} style={{ width: '100%', height: '100%' }} alt="" />
                    {(bCanModify && !readOnly) && <i className={'attach_icon_del'} onClick={()=>{this.deleteAttachItem(index)}}>×</i>}
            </div>);
            
        }
        return controls;
    }

    deleteAttachItem=(index)=>{
        let { fileList } = this.state;
        if (this.props.model){
            fileList.splice(index,1);
            this.setState({fileList});
            this.props.model.deleteItem(index);
        }
    }

    renderBaseUpload = () => {
        const { fileList,bCanModify,readOnly,config } = this.state;
        let fileType = null, maxQuantity,uploadTips='';
        if (!config || !config.fileType) {
          fileType = this.state.fileType;
        } else {
          fileType = config.fileType;
        }
        if (config) maxQuantity = config.maxQuantity ? config.maxQuantity : -1;
        let str = (maxQuantity !== -1) ? '不超过' + maxQuantity + '张' : '不限';
        if (bCanModify && !readOnly) {
          if (fileType == 'file') {
            if (config && config.uploadTips)
              uploadTips = (
                <span className='fileupload-txt'>
                  {'（' + config.uploadTips + '）'}
                </span>
              );
            else
              types=['pdf','word','excel','txt','jpg','png','bmp','gif'];
              uploadTips = (
                <span className='fileupload-txt'>
                  全部附件大小不可超过<em>4M</em>，支持格式：PDF、Word、Excel、Txt、JPG、PNG、BMP、GIF
                </span>
              );
          } else {
            types=['png','jpg','jpeg','bmp'];
            uploadTips = (
              <span className='fileupload-txt'>
                建议尺寸：{this.state.imageSize} 格式：png、jpg、jpeg、bmp 总附件大小：不超过<em>4M</em> <List.Item.Brief>总张数：{str}</List.Item.Brief>
                </span>
            );
          }
        }
        return uploadTips;
    }

    render(){
        const { fileList,bCanModify,readOnly,chsphoto } = this.state;
        let controls= <span></span>,uploadTips = this.renderBaseUpload();
        if(fileList && fileList.length>=1){
          fileAttach = fileList.slice(0,fileList.length);
          if(_.findIndex(fileAttach,(o)=>{return o.btn==="";})<0 && bCanModify && !readOnly){
             fileAttach.push({btn:''});
          }
          controls = <List style={{ margin: '5px 0', backgroundColor: 'white' }}>
                        <Grid data={fileAttach} activeStyle={false} columnNum={3} square={false} hasLine={false} itemStyle={{ height: '120px', background: '#fff' }} renderItem={dataItem =>this.getItemControls(dataItem)}/>
                       </List>
        }else if(bCanModify && !readOnly){
          controls = <div style={{display:'flex'}} onClick={() => { this.changeStatus(true) }} >
                          <div className='tianjiatupian_cls'><Icon type='icon-tianjiatupian' />
                          <div className='tianjiatupian-name'>添加图片</div>
                          </div>
                          <div className='tianjiatupian_desc_cls'>{ uploadTips }</div>
                       </div>
        }

        return <div>
            {controls}
            <div className='choose_panel' style={{ display: chsphoto ? '' : 'none' }} >
                <div className='choose_panel_empty' onClick={() => { this.changeStatus(false) }}></div>
                <div className='choose_btn'>
                    <Button style={{ borderRadius: 0 + 'px', borderBottom: '#f7f6f6 solid 0.02rem', fontSize: '0.3rem' }} onClick={() => { this.takeNewPic("album") }} >打开相册</Button>
                    <Button style={{ borderRadius: 0 + 'px', fontSize: '0.3rem' }} onClick={() => { this.takeNewPic("carema") }} >拍照选图</Button>
                    <div className='info_bg'>&nbsp;</div>
                    <Button style={{ fontSize: '0.34rem' }} onClick={() => { this.changeStatus(false) }} >取消</Button>
                </div>
            </div>
        </div>

    }
} 