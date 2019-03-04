import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Popover, Input, Modal, Icon, Button, Checkbox, Radio, Transfer, Select } from 'antd';
import { Row, Col, InputFloat, Cascader } from 'yxyweb/common/components/basic';
//  import InputFloat from 'yxyweb/common/components/basic/inputfloat';
import * as groupConditionRedux from 'yxyweb/common/redux/groupCondition';
import * as  eChartCommon from '../eChartCommon';
import SvgIcon from 'SvgIcon';
const Option = Select.Option;
const RadioGroup = Radio.Group;
//eChartSetting_getRender
class EChartDesign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billnum: props.billnum,
      chartKey: props.chartKey,
      reportFields: props.reportFields,
      bAdd: false,
      chart_Backup: undefined
    };

    this.bSetTreeModel = false;
    if (props.chartKey) {//编辑
      this.state.bAdd = false;
      let config = eChartCommon.subConfig_Get(props.groupConditionState[props.billnum].eChart, props.chartKey);
      this.state.chart_Backup = config;
      eChartCommon.upgradeConfig_ForScatter(config);
      if (_.get(config, "yySetting.type") == "scatter") {
        this.SetTreeModel(config);
      }
    }
    else {//新增
      this.state.bAdd = true;
      this.state.chart_Backup = undefined;
      this.state.chartKey = eChartCommon.getNewSubChartKey();
      this.chooseChart("bar", "1", true);
    }

    eChartCommon.LogChartInfo("设置界面 EChartDesign初始化  state  ", JSON.stringify(this.state), 900)
  }


  trimRegion(data) {
    //删除直辖市下级地区以及地级市下级地区
    let zhixiashi = [110000, 500000, 810000, 910000, 310000, 710000, 120000];//直辖市ID，下级直接删除
    let delRegionIds = [];//特殊需要删除掉的地区的ID
    let childrens = data[0].children;
    childrens.forEach(
      item => {
        if (zhixiashi.indexOf(item.id) >= 0) {
          item.children = undefined;
        }
        else {
          let subChildrens = item.children;
          subChildrens.forEach(
            subItem => {
              subItem.children = undefined;
            }
          )
        }
      }
    );
  }
  SetTreeModel(config) {
    if (this.bSetTreeModel == false) {
      const { groupConditionState, groupConditionRedux } = this.props;
      this.bSetTreeModel = true;
      this.treeModel = new cb.models.TreeModel({ dataSourceMode: 'a', keyField: 'id', titleField: 'name' })
      this.treeModel.on('beforeSetDataSource', function (data) {
        self.trimRegion(data);
      }, self = this);
      this.treeModel.setDataSource({ url: '/region/getAllregion', method: 'POST' });
      this.treeModel.on('afterSetDataSource', function (data) {
        let regionInfo = _.get(config, "yySetting.regionInfo");
        if (regionInfo && regionInfo.regionArr && regionInfo.regionArr.length > 0)
          self.treeModel.setValue(regionInfo.regionArr);
      }, self = this);

      this.treeModel.on('afterSelect', function (args) {
        let config = self.getChart();
        let arg = args[args.length - 1];
        let regionInfo = config.regionInfo || {};
        regionInfo.region = arg.id;
        regionInfo.shortName = arg.shortname;
        regionInfo.parent = arg.parent;
        regionInfo.geoName = arg.shortname + arg.id;
        regionInfo.regionArr = self.treeModel.getValue();
        if (regionInfo.parent == "0" || regionInfo.parent == "100000") {
          //中国地图或者省、直辖市地图
        }
        else {

        }

        groupConditionRedux.eChartSetting_SetEChartConfigValue(this.getBillNum(), this.state.chartKey, "yySetting.regionInfo", regionInfo);

      }, self = this);
    }
  }
  render() {
    let self = this;
    const { groupConditionState, groupConditionRedux } = this.props;
    let leftPanel = this.getChartTypeList();
    let rightPanel = this.getChartSettingPanel();
    return <div className="eChartSetting"   >
      <Row colCount={12} className="eChartSetting_Panel" >
        <Col className="eChartSetting_Left" span={3}>
          {leftPanel}
        </Col>
        <Col className="eChartSetting_Right" span={9}>
          {rightPanel}
        </Col>
      </Row>
      <Row colCount={12} className="eChartSetting_Button">
        <Button type={"default"} onClick={() => self.eChartSettingCancel(false)}>取消</Button>
        <Button type={"primary"} onClick={() => self.eChartSettingOK(true)}>保存</Button>
      </Row>
    </div>
  }




  getChartSettingPanel() {

    let self = this;
    const { groupConditionState, groupConditionRedux } = self.props;

    let config = eChartCommon.subConfig_Get(groupConditionState[this.state.billnum].eChart, this.state.chartKey, this.state.bAdd);
    let errors = groupConditionState[this.state.billnum].eChart.errors ? groupConditionState[this.state.billnum].eChart.errors : {};
    if (config == undefined)
      return <div />;

    let yySetting = config.yySetting;
    let reportFields = this.state.reportFields;
    let type = _.get(config, "yySetting.type");
    let subType = _.get(config, "yySetting.subType");

    let dimensionXFields = eChartCommon.getArrayFields(config, "yySetting.dataField.dimensionX", "nameField");
    let dimensionSubFields = eChartCommon.getArrayFields(config, "yySetting.dataField.dimensionSub", "nameField");
    let measureFields = eChartCommon.getArrayFields(config, "yySetting.dataField.measure", "valueField");
    let measure = _.get(config, "yySetting.dataField.measure");
    let dimensionXContent = [];
    let dimensionSubContent = [];
    let measureContent = [];
    let measureContentRankTable = [];
    let measureContent0 = [];//柱折图使用
    let measureContent1 = [];//柱折图使用
    let orderFieldContent = [];//排序指标
    let iLabelOrder = 0;
    let longitudeArr = [];
    let latitudeArr = [];

    reportFields.forEach(item => {
      iLabelOrder = iLabelOrder + 1;
      item.iLabelOrder = iLabelOrder;
      if (item.groupType == 0) {
        dimensionXContent.push(
          <Checkbox
            checked={dimensionXFields.indexOf(item.fieldname) >= 0 ? true : false}
            disabled={dimensionSubFields.indexOf(item.fieldname) >= 0 ? true : false}
            onChange={(e) => self.dimensionXFieldsChecked(item, e.target.checked, item.iLabelOrder)}>
            {item.caption}
          </Checkbox>
        );
        if (type == "line" || type == "bar") {
          dimensionSubContent.push(
            <Checkbox
              checked={dimensionSubFields.indexOf(item.fieldname) >= 0 ? true : false}
              disabled={dimensionXFields.indexOf(item.fieldname) >= 0 ? true : false}
              onChange={(e) => self.dimensionSubFieldsChecked(item, e.target.checked, item.iLabelOrder)}>
              {item.caption}
            </Checkbox>
          );
        }
      }
      else if (item.groupType == 3) {
        if (type == "ranktable") {
          //  { valueField: "fMoney", caption: "金额", bShowValueNotBar: false, iOrder: 3, bShowValueAfterBar: true },
          let measureEle = _.find(measure, function (o) { return o.valueField == item.fieldname; });
          let bChecked = measureEle ? true : false;
          let bShowValueNotBar = (bChecked && measureEle.bShowValueNotBar) ? true : false;
          let bShowValueAfterBar = (bChecked && (bShowValueNotBar == false) && measureEle.bShowValueAfterBar) ? true : false;
          measureContentRankTable.push(
            <Row>
              <Checkbox
                checked={bChecked}
                // disabled={item.fieldname == _.get(config, "yySetting.orderInfo.orderField") ? true : false}
                disabled={false}
                onChange={(e) => self.measureFieldsChecked(type, item, e.target.checked, item.iLabelOrder)}>
                {item.caption}
              </Checkbox>
              {/*
              <Checkbox
                checked={bShowValueNotBar}
                // disabled={item.fieldname == _.get(config, "yySetting.orderInfo.orderField") ? true : false}
                disabled={!bChecked}
                onChange={(e) => self.measureFieldsValueChanged(type, item.fieldname, "bShowValueNotBar", e.target.checked)}>
                显示数值/条形
              </Checkbox> */}

              <RadioGroup
                onChange={(e) => self.measureFieldsValueChanged(type, item.fieldname, "bShowValueNotBar", e.target.value)}
                value={bShowValueNotBar}>
                <Radio value={true}>显示数值</Radio>
                <Radio value={false}>显示条形</Radio>
              </RadioGroup>



              <Checkbox
                checked={bShowValueAfterBar}
                // disabled={item.fieldname == _.get(config, "yySetting.orderInfo.orderField") ? true : false}
                disabled={!bChecked || bShowValueNotBar}
                onChange={(e) => self.measureFieldsValueChanged(type, item.fieldname, "bShowValueAfterBar", e.target.checked)}>
                条形末端显示数字
              </Checkbox>
            </Row>
          );
        }
        else {
          measureContent.push(
            <Checkbox
              checked={measureFields.indexOf(item.fieldname) >= 0 ? true : false}
              // disabled={item.fieldname == _.get(config, "yySetting.orderInfo.orderField") ? true : false}
              disabled={false}
              onChange={(e) => self.measureFieldsChecked(type, item, e.target.checked, item.iLabelOrder)}>
              {item.caption}
            </Checkbox>
          );
        }
        if (type == "barline") {
          measureContent0.push(
            <Checkbox
              checked={_.find(measure, function (o) { return o.valueField == item.fieldname && o.yAxisIndex === 0; }) ? true : false}
              // disabled={item.fieldname == _.get(config, "yySetting.orderInfo.orderField") ? true : false}
              disabled={_.find(measure, function (o) { return o.valueField == item.fieldname && o.yAxisIndex === 1; }) ? true : false}
              onChange={(e) => self.measureFieldsChecked(type, item, e.target.checked, item.iLabelOrder, 0)
              }>
              {item.caption}
            </Checkbox >
          );
          measureContent1.push(
            <Checkbox
              checked={_.find(measure, function (o) { return o.valueField == item.fieldname && o.yAxisIndex === 1; }) ? true : false}
              // disabled={item.fieldname == _.get(config, "yySetting.orderInfo.orderField") ? true : false}
              disabled={_.find(measure, function (o) { return o.valueField == item.fieldname && o.yAxisIndex === 0; }) ? true : false}
              onChange={(e) => self.measureFieldsChecked(type, item, e.target.checked, item.iLabelOrder, 1)
              }>
              {item.caption}
            </Checkbox >
          );
        }
        orderFieldContent.push(
          <Radio
            checked={item.fieldname == _.get(config, "yySetting.orderInfo.orderField") ? true : false}
            disabled={measureFields.indexOf(item.fieldname) >= 0 ? false : true}
            onChange={(e) => self.setEChartConfigValue("yySetting.orderInfo.orderField", e.target.checked ? item.fieldname : "")}>
            {item.caption}
          </Radio >
        );
        longitudeArr.push(<Option value={item.fieldname}>{item.caption}</Option>);
        latitudeArr.push(<Option value={item.fieldname}>{item.caption}</Option>);
      }
      // {"fieldname":"fOrderQty","groupType":3,"caption":"客单量","sumType":"max"}
    });

    let content = [];
    let textPath = "eChartSetting.title.text";
    if (type == "ranktable") {
      textPath = "yySetting.title.text";
    }
    content.push(
      <Row className="eChartSetting_Content" colCount={12}>
        <Col span={2} className="eChartSetting_ContentCol1"  ><div className="eChartSetright-title"><i className="anticon anticon-star"></i> 标题</div></Col>
        <Col span={10} className="eChartSetting_ContentCol2" >
          <Input
            id="id_Title"
            placeholder="请输入"
            value={_.get(config, textPath)}
            onChange={(e) => self.setEChartConfigValue(textPath, e.target.value)}
          />
        </Col>
      </Row>);
    content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.title) ? "" : <div>{errors.title}</div>} </Row>);
    // if (type != "ranktable") {
    //   content.push(
    //     <Row className="eChartSetting_Content" colCount={12}>
    //       <Col span={2} className="eChartSetting_ContentCol1"  ><div className="eChartSetright-title"><i className="anticon anticon-star"></i> 标题</div></Col>
    //       <Col span={10} className="eChartSetting_ContentCol2" >
    //         <Input
    //           id="id_Title"
    //           placeholder="请输入"
    //           value={_.get(config, "eChartSetting.title.text")}
    //           onChange={(e) => self.setEChartConfigValue("eChartSetting.title.text", e.target.value)}
    //         />
    //       </Col>
    //     </Row>);
    //   content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.title) ? "" : <div>{errors.title}</div>} </Row>);
    // }
    // else {
    //   content.push(
    //     <Row className="eChartSetting_Content" colCount={12}>
    //       <Col span={2} className="eChartSetting_ContentCol1"  ><div className="eChartSetright-title"><i className="anticon anticon-star"></i> 标题</div></Col>
    //       <Col span={10} className="eChartSetting_ContentCol2" >
    //         <Input
    //           id="id_Title"
    //           placeholder="请输入"
    //           value={_.get(config, "yySetting.title.text")}
    //           onChange={(e) => self.setEChartConfigValue("yySetting.title.text", e.target.value)}
    //         />
    //       </Col>
    //     </Row>);
    //   content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.title) ? "" : <div>{errors.title}</div>} </Row>);
    // }

    if (type == "scatter") {
      let arrArr = eChartCommon.getMapProvinceArr();
      let options = [];
      arrArr.forEach((ele) => {
        options.push(<Option value={ele.key}>{ele.caption}</Option>);
      });
      // content.push(
      //   <Row className="eChartSetting_Content" colCount={12}>
      //     <Col span={2} className="eChartSetting_ContentCol1" ><div className="eChartSetright-title"><i className="anticon anticon-star"></i> 地图</div></Col>
      //     <Col span={10} className="eChartSetting_ContentCol2" >
      //       <Select
      //         value={_.get(config, "yySetting.key")}
      //         onSelect={(key) => self.setScatterMapInfo(key)}
      //       >
      //         {options}
      //       </Select>
      //     </Col>
      //   </Row>);

      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" ><div className="eChartSetright-title"><i className="anticon anticon-star"></i> 地图</div></Col>
          <Col span={10} className="eChartSetting_ContentCol2" >
            <Cascader
              cShowCaption=''
              ref='regionCode'
              changeOnSelect={true}
              model={this.treeModel}
            />
          </Col>
        </Row>);

      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.map) ? "" : <div>{errors.map}</div>} </Row>);

      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" ><div className="eChartSetright-title"><i className="anticon anticon-star"></i> 经度</div></Col>
          <Col span={10} className="eChartSetting_ContentCol2" >

            <Select
              value={_.get(config, "yySetting.dataField.LngAndLat.longitude.longitudeField")}
              onSelect={(key) => this.setEChartConfigValue("yySetting.dataField.LngAndLat.longitude.longitudeField", key, false)}
            >
              {longitudeArr}
            </Select>

          </Col>
        </Row>);
      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.longitudeField) ? "" : <div>{errors.longitudeField}</div>} </Row>);

      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" ><div className="eChartSetright-title"><i className="anticon anticon-star"></i>纬度</div></Col>
          <Col span={10} className="eChartSetting_ContentCol2" >

            <Select
              value={_.get(config, "yySetting.dataField.LngAndLat.latitude.latitudeField")}
              onSelect={(key) => this.setEChartConfigValue("yySetting.dataField.LngAndLat.latitude.latitudeField", key, false)}
            >
              {latitudeArr}
            </Select>

          </Col>
        </Row>);
      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.latitudeField) ? "" : <div>{errors.latitudeField}</div>} </Row>);
    }
    if (type == "pie") {
      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" ><div className="eChartSetright-title">内外半径</div></Col>
          <Col span={10} className="eChartSetting_ContentCol2" >
            <div className="eChartSet-mainwnumber">
              <span className="inner_radius">内半径百分比</span>
              <Input
                placeholder="请输入0-99数字"
                value={_.get(config, "yySetting.radius.radiusInner")}
                onChange={(e) => self.setEChartConfigValue("yySetting.radius.radiusInner", e.target.value, true, true)} className="eChartSetinput"
              />
            </div>
            <div className="eChartSet-mainwnumber2">
              <span className="inner_radius">外半径百分比</span>
              <Input
                placeholder="请输入1-100数字"
                value={_.get(config, "yySetting.radius.radiusOuter")}
                onChange={(e) => self.setEChartConfigValue("yySetting.radius.radiusOuter", e.target.value, true, true)} className="eChartSetinput"
              />
            </div>
          </Col>
        </Row>);
      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.radiusInner) ? "" : <div>{errors.radiusInner}</div>} </Row>);

      // content.push(
      //   <Row className="eChartSetting_Content" colCount={12}>
      //     <Col span={2} className="eChartSetting_ContentCol1" >显示样式</Col>
      //     <Col span={10} className="eChartSetting_ContentCol2" >
      //       <Checkbox checked={yySetting.isSingleValue ? true : false} onChange={(e) => this.setEChartConfigValue("yySetting.isSingleValue", e.target.checked ? true : false)}>单数值百分比图</Checkbox>
      //     </Col>
      //   </Row>);
      // content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.isSingleValue) ? "" : <div>{errors.isSingleValue}</div>} </Row>);
    }


    if (type == "ranktable") {

      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" >排名列</Col>
          <Col span={10} className="eChartSetting_ContentCol2" >
            <div className="eChartSet-mainwnumber">
              <Checkbox
                checked={yySetting.indexCol.bAddIndexCol ? true : false}
                onChange={(e) => this.setEChartConfigValue("yySetting.indexCol.bAddIndexCol", e.target.checked ? true : false)}>
                是否增加排名列
            </Checkbox>
            </div>
          </Col>
        </Row>);


      // content.push(
      //   <Row className="eChartSetting_Content" colCount={12}>
      //     <Col span={2} className="eChartSetting_ContentCol1" ><div className="eChartSetright-title">排名列名称</div></Col>
      //     <Col span={10} className="eChartSetting_ContentCol2" >
      //       <Input
      //         placeholder="请输入"
      //         value={_.get(config, "yySetting.indexCol.caption")}
      //         onChange={(e) => this.setEChartConfigValue("yySetting.indexCol.caption", e.target.value, false, false)}
      //       />
      //     </Col>
      //   </Row>);
      // content.push(
      //   <Row className="eChartSetting_Content" colCount={12}>
      //     <Col span={2} className="eChartSetting_ContentCol1" >排名信息</Col>
      //     <Col span={10} className="eChartSetting_ContentCol2" >
      //       <Checkbox
      //         checked={yySetting.orderInfo.includeSelf ? true : false}
      //         onChange={(e) => this.setEChartConfigValue("yySetting.orderInfo.includeSelf", e.target.checked ? true : false)}>
      //         排名是否包括当前店铺/区域
      //       </Checkbox>

      //     </Col>
      //   </Row>);
    }
    content.push(
      <Row className="eChartSetting_Content" colCount={12}>
        <Col span={2} className="eChartSetting_ContentCol1" ><i className="anticon anticon-star"></i> 主维度</Col>
        <Col span={10} className="eChartSetting_ContentCol2" >
          <div className="eChartSetting_ContentCol21">最多<span>3</span>项，勾选多个主维度将用"/"拼接显示</div>
          <div className="eChartSetting_ContentCol22">{dimensionXContent}</div>
        </Col>
      </Row>);
    content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.dimensionX) ? "" : <div>{errors.dimensionX}</div>} </Row>);

    if (type == "line" || type == "bar" || type == "barline") {
      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1"  ><div className="eChartSetright-title">显示角度</div></Col>
          <Col span={10} className="eChartSetting_ContentCol2" >
            <Input
              placeholder="请输入"
              value={_.get(config, "eChartSetting.xAxis.axisLabel.rotate")}
              onChange={(e) => this.setEChartConfigValue("eChartSetting.xAxis.axisLabel.rotate", e.target.value, true, true)}
              className="eChart-set-radioinput"
            />

            {/* <InputFloat
              placeholder={"请输入"}
              numpoint={0}
              disabled={false}
              min={0}
              max={60}
              isIncludeMaxValue={true}
              value={_.get(config, "eChartSetting.xAxis.axisLabel.rotate")}
              onChange={(value) => this.setEChartConfigValue("eChartSetting.xAxis.axisLabel.rotate", value, true)}
              className="eChart-set-radioinput"
            /> */}

          </Col>
        </Row>);
      // content.push(<Row className="eChartSetting_Errors"  ><div> {_.isEmpty(errors.rotate) ? "" : errors.rotate}</div> </Row>);
      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.rotate) ? "" : <div>{errors.rotate}</div>} </Row>);
    }
    if (type == "line" || type == "bar") {

      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" >辅维度</Col>
          <Col span={10} className="eChartSetting_ContentCol2" >
            <div className="eChartSetting_ContentCol21">选项与主维度互斥</div>
            <div className="eChartSetting_ContentCol22">{dimensionSubContent}</div>
          </Col>
        </Row>);
      // content.push(<Row className="eChartSetting_Errors"  ><div> {_.isEmpty(errors.dimensionSub) ? "" : errors.dimensionSub}</div> </Row>);
      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.dimensionSub) ? "" : <div>{errors.dimensionSub}</div>} </Row>);
    }
    if (type == "pie" || type == "bar" || type == "line") {
      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" ><i className="anticon anticon-star"></i> 展示指标</Col>
          <Col span={10} className="eChartSetting_ContentCol2" >
            <div className="eChartSetting_ContentCol21">有辅维度支持单选，无辅维度支持多选，最多选择<span>5</span>项</div>
            <div className="eChartSetting_ContentCol22">{measureContent}</div>
          </Col>
        </Row>);
      // content.push(<Row className="eChartSetting_Errors"  ><div> {_.isEmpty(errors.measure) ? "" : errors.measure}</div> </Row>);
      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.measure) ? "" : <div>{errors.measure}</div>} </Row>);
    }
    else if (type == "scatter") {
      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" ><i className="anticon anticon-star"></i> 展示指标</Col>
          <Col span={10} className="eChartSetting_ContentCol2" >
            <div className="eChartSetting_ContentCol21"> 请选择<span>1</span>项</div>
            <div className="eChartSetting_ContentCol22">{measureContent}</div>
          </Col>
        </Row>);
      // content.push(<Row className="eChartSetting_Errors"  ><div> {_.isEmpty(errors.measure) ? "" : errors.measure}</div> </Row>);
      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.measure) ? "" : <div>{errors.measure}</div>} </Row>);
    }
    else if (type == "ranktable") {
      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" ><i className="anticon anticon-star"></i> 展示指标</Col>
          <Col span={10} className="eChartSetting_ContentCol2" >
            <div className="eChartSetting_ContentCol21">支持多选，最多选择<span>3</span>项</div>
            <div className="eChartSetting_ContentCol22">{measureContentRankTable}</div>
          </Col>
        </Row>);
      // content.push(<Row className="eChartSetting_Errors"  ><div> {_.isEmpty(errors.measure) ? "" : errors.measure}</div> </Row>);
      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.measure) ? "" : <div>{errors.measure}</div>} </Row>);
    }
    else if (type == "barline") {
      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" ><i className="anticon anticon-star"></i>左侧Y轴</Col>
          <Col span={10} className="eChartSetting_ContentCol2" >
            <div className="eChartSetting_ContentCol23" >
              <Radio checked={_.get(config, "yySetting.yAxis.yAxisIndexType0") == "bar" ? true : false} onChange={(e) => this.setEChartConfigValue("yySetting.yAxis.yAxisIndexType0", e.target.checked ? "bar" : "line")}>柱状展现</Radio>
              <Radio checked={_.get(config, "yySetting.yAxis.yAxisIndexType0") == "line" ? true : false} onChange={(e) => this.setEChartConfigValue("yySetting.yAxis.yAxisIndexType0", e.target.checked ? "line" : "bar")}>折线展现</Radio>
            </div>
            <div className="eChartSetting_ContentCol21 margintop5">展示指标支持多选，最多共选择<span>10</span>项</div>
            <div className="eChartSetting_ContentCol22">{measureContent0}</div>
          </Col>
        </Row>);
      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.measure0) ? "" : <div>{errors.measure0}</div>} </Row>);

      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" ><i className="anticon anticon-star"></i>右侧Y轴</Col>
          <Col span={10} className="eChartSetting_ContentCol2" >

            <div className="eChartSetting_ContentCol23" >
              <Radio checked={_.get(config, "yySetting.yAxis.yAxisIndexType1") == "bar" ? true : false} onChange={(e) => this.setEChartConfigValue("yySetting.yAxis.yAxisIndexType1", e.target.checked ? "bar" : "line")}>柱状展现</Radio>
              <Radio checked={_.get(config, "yySetting.yAxis.yAxisIndexType1") == "line" ? true : false} onChange={(e) => this.setEChartConfigValue("yySetting.yAxis.yAxisIndexType1", e.target.checked ? "line" : "bar")}>折线展现</Radio>
            </div>
            <div className="eChartSetting_ContentCol21 margintop5">展示指标支持多选，最多共选择<span>10</span>项</div>
            <div className="eChartSetting_ContentCol22">{measureContent1}</div>
          </Col>
        </Row>);
      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.measure1) ? "" : <div>{errors.measure1}</div>} </Row>);

    }
    if (!(type == "pie" && yySetting.isSingleValue == true)) {
      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" >排序指标</Col>
          <Col span={10} className="eChartSetting_ContentCol2" >{orderFieldContent}</Col>
        </Row>);
      // content.push(<Row className="eChartSetting_Errors"  ><div> {_.isEmpty(errors.orderField) ? "" : errors.orderField}</div> </Row>);
      content.push(<Row className="eChartSetting_Errors eChartSetting_Errors_margin"  >{_.isEmpty(errors.orderField) ? "" : <div>{errors.orderField}</div>} </Row>);
      let orderBy = _.get(config, "yySetting.orderInfo.orderBy");
      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" >排序方式</Col>
          <Col span={10} className="eChartSetting_ContentCol2" >
            <Radio checked={orderBy == "asc" ? true : false} onChange={(e) => this.setEChartConfigValue("yySetting.orderInfo.orderBy", e.target.checked ? "asc" : "desc")}>升序</Radio>
            <Radio checked={orderBy == "desc" ? true : false} onChange={(e) => this.setEChartConfigValue("yySetting.orderInfo.orderBy", e.target.checked ? "desc" : "asc")}>降序</Radio>
          </Col>
        </Row>);
      // content.push(<Row className="eChartSetting_Errors"  ><div> {_.isEmpty(errors.orderBy) ? "" : errors.orderBy}</div> </Row>);
      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.orderBy) ? "" : <div>{errors.orderBy}</div>} </Row>);
    }
    let bUseDimensionXRows = _.get(config, "yySetting.orderInfo.bUseDimensionXRows");
    if (type == "ranktable") {
      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" ><div className="eChartSetright-title">排名行数</div></Col>
          <Col span={10} className="eChartSetting_ContentCol2" >
            <div className="eChartSet-mainwnumber">
              <Input
                disabled={false}
                placeholder="请输入1-999数字"
                value={_.get(config, "yySetting.orderInfo.topNum")}
                onChange={(e) => self.setEChartConfigValue("yySetting.orderInfo.topNum", e.target.value, true, true, 999)} className="eChartSetinput"
              />
            </div>
          </Col>
        </Row>);

      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.topNum) ? "" : <div>{errors.topNum}</div>} </Row>);

    }
    else if (!(type == "pie" && yySetting.isSingleValue == true)) {
      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" ><div className="eChartSetright-title">数据筛选</div></Col>
          <Col span={10} className="eChartSetting_ContentCol2" >
            <div className="eChartSet-mainwnumber">
              <Radio checked={bUseDimensionXRows} onChange={(e) => this.setEChartConfigValue("yySetting.orderInfo.bUseDimensionXRows", e.target.checked ? true : false)}>主维度行数</Radio>
              <Input
                disabled={!bUseDimensionXRows}
                placeholder="请输入1-31数字"
                value={_.get(config, "yySetting.orderInfo.dimensionXRows")}
                onChange={(e) => self.setEChartConfigValue("yySetting.orderInfo.dimensionXRows", e.target.value, true, true)} className="eChartSetinput"
              />
            </div>
            {
              (type == "line") ?
                <div className="eChartSet-mainwnumber2">  <Radio checked={!bUseDimensionXRows} onChange={(e) => this.setEChartConfigValue("yySetting.orderInfo.bUseDimensionXRows", e.target.checked ? false : true)}>辅维度行数</Radio>
                  <Input
                    placeholder="请输入1-99数字"
                    disabled={bUseDimensionXRows}
                    value={_.get(config, "yySetting.orderInfo.dimensionSubRows")}
                    onChange={(e) => self.setEChartConfigValue("yySetting.orderInfo.dimensionSubRows", e.target.value, true, true)} className="eChartSetinput"
                  />
                </div>
                : ""
            }
            {
              (type == "bar") ?
                <div className="eChartSet-mainwnumber2">  <Radio checked={!bUseDimensionXRows} onChange={(e) => this.setEChartConfigValue("yySetting.orderInfo.bUseDimensionXRows", e.target.checked ? false : true)}>辅维度行数</Radio>
                  <Input
                    placeholder="请输入1-5数字"
                    disabled={bUseDimensionXRows}
                    value={_.get(config, "yySetting.orderInfo.dimensionSubRows")}
                    onChange={(e) => self.setEChartConfigValue("yySetting.orderInfo.dimensionSubRows", e.target.value, true, true)} className="eChartSetinput"
                  />
                </div>
                : ""
            }
          </Col>
        </Row>);

      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.dimensionXRows) ? "" : <div>{errors.dimensionXRows}</div>} </Row>);
    }
    if (type == "scatter") {
      let symbolConfig = _.get(config, "yySetting.symbolConfig");
      // bShowSymbolBySize: true,//通过圆圈大小显示不同数量
      // symbolCommonSize: 10,//bShowSymbolBySize=false时的圆圈大小
      // symbolMaxSize: 20,
      // symbolMinSize: 2,
      // bShowSymbolByColor: true,//通过颜色不同显示不同数量
      // bShowEffect: true,//是否用带有涟漪特效动画的气泡（气泡）图将某些想要突出的数据进行视觉突出。
      // effectQty: 3//带有涟漪特效动画的气泡个数

      content.push(
        <Row className="eChartSetting_Content" colCount={12}>
          <Col span={2} className="eChartSetting_ContentCol1" ><i className="anticon anticon-star"></i>地图显示</Col>
          <Col span={10} className="eChartSetting_ContentCol2" >
            <div className="eChartSetting_ContentCol23">
              <Checkbox
                checked={symbolConfig.bShowSymbolBySize}
                // disabled={dimensionSubFields.indexOf(item.fieldname) >= 0 ? true : false}
                onChange={(e) => self.setEChartConfigValue("yySetting.symbolConfig.bShowSymbolBySize", e.target.checked, false)}>
                通过气泡大小显示数量信息
              </Checkbox>
              <Checkbox
                checked={symbolConfig.bShowSymbolByColor}
                // disabled={dimensionSubFields.indexOf(item.fieldname) >= 0 ? true : false}
                onChange={(e) => self.setEChartConfigValue("yySetting.symbolConfig.bShowSymbolByColor", e.target.checked, false)}>
                通过颜色深浅显示数量信息
              </Checkbox>
              <div className="lianyi-Special">
                <Checkbox
                  checked={symbolConfig.bShowEffect}
                  // disabled={dimensionSubFields.indexOf(item.fieldname) >= 0 ? true : false}
                  onChange={(e) => self.setEChartConfigValue("yySetting.symbolConfig.bShowEffect", e.target.checked, false)}>
                  前
              </Checkbox>
                <Input
                  placeholder="请输入涟漪特效个数"
                  disabled={symbolConfig.bShowEffect == false}
                  value={_.get(config, "yySetting.symbolConfig.effectQty")}
                  onChange={(e) => this.setEChartConfigValue("yySetting.symbolConfig.effectQty", e.target.value, true, true)}
                />
                <span>名使用涟漪特效</span>
              </div>
            </div>

          </Col>
        </Row>);

      content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.effectQty) ? "" : <div>{errors.effectQty}</div>} </Row>);

    }
    return content;
  }

  setFocus() {
    setTimeout(() => {
      let input = undefined;
      input = document.getElementById('id_Title');
      if (input) {
        input.focus();
        // input.blur();
      }
    });
  }


  dimensionXFieldsChecked(item, bCheck, iLabelOrder) {
    const { groupConditionState, groupConditionRedux } = this.props;
    let ele = {};
    ele.codeField = item.fieldname;
    ele.nameField = item.fieldname;
    if (bCheck == true) {
      //item  {"fieldname":"fDiscount","groupType":3,"caption":"折扣额","sumType":"sum"}
      ele.bLabel = true;
      ele.iLabelOrder = iLabelOrder;
      ele.caption = item.caption;
      ele.groupType = item.groupType;
      ele.depends = item.depends;
    }
    groupConditionRedux.eChartSetting_DimensionXFieldsChecked(this.getBillNum(), this.state.chartKey, bCheck, ele);
  }

  dimensionSubFieldsChecked(item, bCheck, iLabelOrder) {
    let config = this.getChart();
    let type = _.get(config, "yySetting.type");
    let subType = _.get(config, "yySetting.subType");

    const { groupConditionState, groupConditionRedux } = this.props;
    let ele = {};
    ele.codeField = item.fieldname;
    ele.nameField = item.fieldname;
    if (bCheck == true) {
      //item  {"fieldname":"fDiscount","groupType":3,"caption":"折扣额","sumType":"sum"}
      //ele  codeField: "store_code", nameField: "store_name", caption: "门店", stack: true
      ele.caption = item.caption;
      ele.groupType = item.groupType;
      ele.depends = item.depends;
      if (type == "line" || type == "bar")
        ele.stack = "";
      if (type == "line")
        ele.smooth = true;
    }
    groupConditionRedux.eChartSetting_DimensionSubFieldsChecked(this.getBillNum(), this.state.chartKey, bCheck, ele);

  }
  measureFieldsValueChanged(type, valueField, fieldname, fieldValue) {
    const { groupConditionState, groupConditionRedux } = this.props;
    groupConditionRedux.eChartSetting_MeasureFieldsValueChanged(this.getBillNum(), this.state.chartKey, valueField, fieldname, fieldValue);
    // type, item.fieldname,"bShowValueNotBar", e.target.checked
  }
  measureFieldsChecked(type, item, bCheck, iLabelOrder, yAxisIndex) {
    const { groupConditionState, groupConditionRedux } = this.props;
    let ele = {};
    ele.valueField = item.fieldname;
    ele.groupType = item.groupType;
    ele.depends = item.depends;
    if (type == "ranktable") {
      ele.bShowValueNotBar = true;
      ele.bShowValueAfterBar = false;
    }
    if (type == "barline") {
      if (yAxisIndex === 0 || yAxisIndex === 1) {
        ele.yAxisIndex = yAxisIndex;
      }
    }
    if (bCheck == true) {
      //item  {"fieldname":"fDiscount","groupType":3,"caption":"折扣额","sumType":"sum"}
      //ele  { valueField: "fNetMoney", caption: "销售净额", stack: "累计" },
      ele.caption = item.caption;
      ele.stack = "";
    }
    groupConditionRedux.eChartSetting_MeasureFieldsChecked(this.getBillNum(), this.state.chartKey, bCheck, ele);
  }
  setScatterMapInfo(key) {
    const { groupConditionState, groupConditionRedux } = this.props;
    let ele = eChartCommon.getMapProvinceArr(key);
    // let importKey
    // geoMapKey
    if (ele) {
      groupConditionRedux.eChartSetting_SetEChartConfigValue(this.getBillNum(), this.state.chartKey, "yySetting.key", key);
      groupConditionRedux.eChartSetting_SetEChartConfigValue(this.getBillNum(), this.state.chartKey, "yySetting.importKey", ele.importKey);
      groupConditionRedux.eChartSetting_SetEChartConfigValue(this.getBillNum(), this.state.chartKey, "eChartSetting.geo.map", ele.geoMapKey);
    }
  }
  setEChartConfigValue(fieldPath, fieldValue, bCheckNumber, bInterger, maxVal) {
    const { groupConditionState, groupConditionRedux } = this.props;
    maxVal = maxVal ? maxVal : 100;
    if (bCheckNumber && fieldValue.trim() != "") {
      if (isNaN(fieldValue) == true || Number(fieldValue) < 0 || Number(fieldValue) > maxVal) {
        groupConditionRedux.eChartSetting_ReturnNothing();
        return;
      }
      if (bInterger == true && fieldValue.indexOf(".") >= 0) {
        fieldValue = fieldValue.substring(0, fieldValue.indexOf("."))
        // if (typeof obj === 'number' && obj % 1 === 0)
        // if (fieldValue % 1 !== 0) {
        //   groupConditionRedux.eChartSetting_ReturnNothing();
        //   return;
        // }
      }
    }
    groupConditionRedux.eChartSetting_SetEChartConfigValue(this.getBillNum(), this.state.chartKey, fieldPath, fieldValue);
  }
  getChartTypeList() {
    const { groupConditionState, groupConditionRedux } = this.props;
    let self = this;
    let config = this.getChart();
    let type = _.get(config, "yySetting.type");
    let subType = _.get(config, "yySetting.subType");
    let content = [];

    content.push(<Row style={{ cursor: "pointer" }} className={"eChartSetting_ChartType" + (type == "bar" && subType == "1" ? '_Selected' : '')} onClick={() => self.chooseChart("bar", "1")}> <SvgIcon type="zhuxingtu" className={"icon-zhuxingtu"} /><div>柱形图</div></Row>)
    content.push(<Row style={{ cursor: "pointer" }} className={"eChartSetting_ChartType" + (type == "bar" && subType == "3" ? '_Selected' : '')} onClick={() => self.chooseChart("bar", "3")}> <SvgIcon type="tiaoxingtu" className={"icon-tiaoxingtu"} /><div>条形图</div></Row>)
    content.push(<Row style={{ cursor: "pointer" }} className={"eChartSetting_ChartType" + (type == "line" && subType == "2" ? '_Selected' : '')} onClick={() => self.chooseChart("line", "2")}> <SvgIcon type="quxiantu" className={"icon-quxiantu"} /><div>曲线图</div></Row>)
    content.push(<Row style={{ cursor: "pointer" }} className={"eChartSetting_ChartType" + (type == "line" && subType == "1" ? '_Selected' : '')} onClick={() => self.chooseChart("line", "1")}> <SvgIcon type="zhexiantu" className={"icon-zhexiantu"} /><div>折线图</div></Row>)
    content.push(<Row style={{ cursor: "pointer" }} className={"eChartSetting_ChartType" + (type == "bar" && subType == "2" ? '_Selected' : '')} onClick={() => self.chooseChart("bar", "2")}> <SvgIcon type="duidiezhuxingtu" className={"icon-duidiezhuxingtu"} /><div>堆叠柱形图</div></Row>)
    content.push(<Row style={{ cursor: "pointer" }} className={"eChartSetting_ChartType" + (type == "bar" && subType == "4" ? '_Selected' : '')} onClick={() => self.chooseChart("bar", "4")}> <SvgIcon type="duidietiaoxingtu" className={"icon-duidietiaoxingtu"} /><div>堆叠条形图</div></Row>)
    content.push(<Row style={{ cursor: "pointer" }} className={"eChartSetting_ChartType" + (type == "pie" ? '_Selected' : '')} onClick={() => self.chooseChart("pie", "")}> <SvgIcon type="bingxingtu" className={"icon-bingxingtu"} /><div>饼形图</div></Row>)
    content.push(<Row style={{ cursor: "pointer" }} className={"eChartSetting_ChartType" + (type == "scatter" ? '_Selected' : '')} onClick={() => self.chooseChart("scatter", "")}> <SvgIcon type="sandiantu" className={"icon-sandiantu"} /><div>气泡图</div></Row>)
    content.push(<Row style={{ cursor: "pointer" }} className={"eChartSetting_ChartType" + (type == "barline" ? '_Selected' : '')} onClick={() => self.chooseChart("barline", "")}> <SvgIcon type="zhuzhetu" className={"icon-zhuzhetu"} /><div>柱折图</div></Row>)
    if (groupConditionState[this.state.billnum].editCondition.isMobile === false) {
      content.push(<Row style={{ cursor: "pointer" }} className={"eChartSetting_ChartType" + (type == "ranktable" ? '_Selected' : '')} onClick={() => self.chooseChart("ranktable", "")}> <SvgIcon type="paimingbiao" className={"icon-paimingbiao"} /><div>排名表</div></Row>)
    }
    return content;
  }

  chooseChart(eChartType, eChartSubType, bAddNewToArr) {
    const { groupConditionState, groupConditionRedux } = this.props;
    let configTemplate = eChartCommon.getEChartConfig_Template(eChartType, eChartSubType, this.state.chartKey);
    if (eChartType == "scatter") {
      this.SetTreeModel(configTemplate);
      let reportFields = this.state.reportFields;
      if (_.find(reportFields, function (o) { return o.fieldname == "longitude"; }))
        configTemplate.yySetting.dataField.LngAndLat.longitude.longitudeField = "longitude";
      if (_.find(reportFields, function (o) { return o.fieldname == "latitude"; }))
        configTemplate.yySetting.dataField.LngAndLat.latitude.latitudeField = "latitude";
    }
    groupConditionRedux.eChartSetting_ChooseChart(this.getBillNum(), configTemplate, this.state.chartKey, bAddNewToArr);
    this.setFocus();
  }
  getBillNum() {
    return this.state.billnum;
  }
  getChart() {
    let curChartKey = this.state.chartKey;
    const { groupConditionState, groupConditionRedux } = this.props;
    let config = groupConditionState[this.state.billnum].eChart.eChartConfig;
    if (config && config.subChartConfigArr) {
      let obj = config.subChartConfigArr.find(function (x) {
        return x.chartKey == curChartKey;
      });
      return obj;
    }
    else {
      return groupConditionState[this.state.billnum].eChart.eChartConfig[curChartKey];

    }

  }

  eChartSettingOK = () => {
    const { groupConditionState, groupConditionRedux } = this.props;
    groupConditionRedux.eChartSetting_EChartSettingOK(this.getBillNum(), this.state.chartKey);
  }

  eChartSettingCancel = () => {
    const { groupConditionState, groupConditionRedux } = this.props;
    groupConditionRedux.eChartSetting_CancelChartConfig(this.getBillNum(), this.state.chart_Backup, this.state.chartKey, this.state.bAdd);
  }
  shouldComponentUpdate(nextProps, nextState) {
    let preValue = this.props.groupConditionState[this.state.billnum].bShowEChartSetting;
    let nextValue = nextProps.groupConditionState[this.state.billnum].bShowEChartSetting;
    if (nextValue == false)
      return false;
    else
      return true;
  }

  componentWillReceiveProps(nextProps) {
  }
}

function mapStateToProps(state) {
  return {
    groupConditionState: state.groupCondition.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    groupConditionRedux: bindActionCreators(groupConditionRedux, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EChartDesign);
