import React, { Component } from 'react';
import { Popover, Input, Modal, Icon, Button, Checkbox, Radio, Transfer, Select } from 'antd';
import { Format } from '../../../helpers/formatDate';
import Row from '../../basic/row';
import Col from '../../basic/col';
import FileUpload from '../../file-upload';
import SvgIcon from 'SvgIcon';
import EChartUpLoad from '../eChartUpLoad';
const RadioGroup = Radio.Group;

export default class eChartPanelSetImageText extends React.Component {
  constructor(props) {
    super(props);
    // curOperateType == "setImageText"
    let self = this;
    let colEle = self.props.colEle;
    let info;
    if (colEle.widgetType == "imagetext") {
      info = colEle.panelImageTextConfig;
    }
    else {
      info = {
        subType: "title", //title  logo
        title: colEle.panelImageTextConfig ? colEle.panelImageTextConfig.title : "默认图文示例",
        height: '100%',
        width: '100%',
        fontSize: 24,
        color: '#333',
        textAlign: 'center',
        fontFamily: 'STKaiti',// STSong = 华文宋体 // LiSu = 隶书 // YouYuan = 幼圆 // STXihei = 华文细黑 // STKaiti = 华文楷体 // STZhongsong = 华文中宋 // STFangsong = 华文仿宋 // FZShuTi = 方正舒体 // FZYaoti = 方正姚体 // STCaiyun = 华文彩云 // STHupo = 华文琥珀 // STLiti = 华文隶书 // STXingkai = 华文行楷 // STXinwei = 华文新魏
        // position: "absolute"
        alignItems: "center",
        display: "flex",
        logoImg: "",
        logoPosition: { horizontal: "left", vertical: "top" },//horizontal：left center right   vertical：top middle bottom
        logoStretch: false

      };
    }
    this.state = { info };
  }

  render() {
    // const { groupConditionState, groupConditionRedux } = this.props;
    let self = this;
    let content = self.getCardContent();

    return <Modal
      className="eChartPanelDesign_SetImageText"
      title="添加图文"
      onOk={(e) => self.doFunc(true)}
      onCancel={(e) => self.doFunc(false)}
      visible={true}
    >
      {content}
    </Modal>;
  }
  setSubType(value) {
    this.state.info.subType = value;
    this.setState();
  }
  getCardSubContent() {
    let self = this;
    let subType = self.state.info.subType;
    let content;
    if (subType == "title") {
      content = <div className="tw">
        <Row >
          <span>标题名称</span>
          <Input defaultValue={self.state.info.title} onChange={(e) => self.setStateInfoValue("title", e.target.value)} />
        </Row>
        <Row className="fontSize">
          <span>字体大小</span>
          <Input defaultValue={self.state.info.fontSize} onChange={(e) => self.setStateInfoValue("fontSize", e.target.value)} />
        </Row>
      </div>;
    }
    else if (subType == "logo") {
      content = <div>
        <Row  >
          <span>LOGO</span>
          {/* <div className="eChartPanelDesign_Img" >
            <img src={self.state.info.logoImg} alt="LOGO图片" />
          </div>
         <FileUpload
            doUpload={(fileList) => self.doUpload(fileList)}
            showUploadList={false}
            multiple={false}
            showName={"上传"}
            fileType={"pic"}
            hideDesc={false}
          /> */}
          <EChartUpLoad
            doUpload={(logoImg) => self.doUpload(logoImg)}
            logoImg={self.state.info.logoImg}
          />
        </Row>



        <Row  >
          <span>对齐方式</span>
          {/* <RadioGroup
            onChange={(e) => self.setLogoPosition("horizontal", e.target.value)}
            value={self.state.info.logoPosition.horizontal}>
            <Radio value={"left"}>居左</Radio>
            <Radio value={"center"}>居中</Radio>
            <Radio value={"right"}>居右</Radio>
          </RadioGroup>

          <RadioGroup
            onChange={(e) => self.setLogoPosition("vertical", e.target.value)}
            value={self.state.info.logoPosition.vertical}>
            <Radio value={"top"}>居上</Radio>
            <Radio value={"middle"}>居中</Radio>
            <Radio value={"bottom"}>居下</Radio>
          </RadioGroup> */}
          <div className="fl clearfix">
            <Col title="居左" className={self.state.info.logoPosition.horizontal == "left" ? "selected" : "unselected"} onClick={() => self.setLogoPosition("horizontal", "left")}><SvgIcon type="zuoce" /></Col>
            <Col title="居中" className={self.state.info.logoPosition.horizontal == "center" ? "selected" : "unselected"} onClick={() => self.setLogoPosition("horizontal", "center")}><SvgIcon type="zhongjian" /></Col>
            <Col title="居右" className={self.state.info.logoPosition.horizontal == "right" ? "selected" : "unselected"} onClick={() => self.setLogoPosition("horizontal", "right")}><SvgIcon type="youce" /></Col>
          </div>
          <div className="fl clearfix">
            <Col title="居上" className={self.state.info.logoPosition.vertical == "top" ? "selected" : "unselected"} onClick={() => self.setLogoPosition("vertical", "top")}><SvgIcon type="dingbu" /></Col>
            <Col title="居中" className={self.state.info.logoPosition.vertical == "middle" ? "selected" : "unselected"} onClick={() => self.setLogoPosition("vertical", "middle")}><SvgIcon type="zhongjian" /></Col>
            <Col title="居下" className={self.state.info.logoPosition.vertical == "bottom" ? "selected" : "unselected"} onClick={() => self.setLogoPosition("vertical", "bottom")}><SvgIcon type="dibu" /></Col>
          </div>


        </Row>
      </div >;
    }
    return content;
  }

  doUpload(logoImg) {
    this.state.info.logoImg = logoImg;
    this.setState();
    // address:"http://ov62qgheo.bkt.clouddn.com/09d05aa4-ca45-4012-b5a9-e6e81052af4f.jpg"
    // id:"rc-upload-1528874271995-7"
    // name:"Tulips.jpg"
    // percent:100
    // size:620888
    // type:"image/jpeg"
  }
  setLogoPosition(type, value) {
    let logoPosition = this.state.info.logoPosition;
    logoPosition[type] = value;
    this.setState();
  }
  getCardContent() {
    let self = this;
    let info = self.state.info;
    let subContent = self.getCardSubContent();
    let content = <div className="tuwen-xs">
      <span className="tw">图文形式</span>
      <RadioGroup
        onChange={(e) => self.setSubType(e.target.value)}
        value={self.state.info.subType}>
        <Radio value={"title"}>标题</Radio>
        <Radio value={"logo"}>LOGO</Radio>
      </RadioGroup>
      {subContent}
    </div >;
    return content;
  }

  setStateInfoValue(name, value) {
    let self = this;
    let info = self.state.info;
    info[name] = value;
    self.setState({ info });
  }
  doFunc(bOK) {
    if (bOK) {
      let info = this.state.info;
      // if (info.title == "") {
      //   cb.utils.alert('请设置标题', 'error');
      // }
      if (info.subType == "title") {
        if (info.fontSize == "") {
          cb.utils.alert('请设置字体大小', 'error');
        }
        else {
          this.props.doFunc(bOK, info);
        }
      }
      else if (info.subType == "logo") {
        if (info.logoImg == "") {
          cb.utils.alert('请设置背景图片', 'error');
        }
        else {
          this.props.doFunc(bOK, info);
        }
      }
    }
    else {
      this.props.doFunc(bOK);
    }
  }
}


