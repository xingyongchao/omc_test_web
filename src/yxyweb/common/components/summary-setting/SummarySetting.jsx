import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Popover, Input, Modal, Icon, Button, Checkbox, Radio, Transfer, Select, Switch } from 'antd';
import { proxy } from '../../helpers/util';
import SvgIcon from 'SvgIcon';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
class SummarySetting extends Component {
  constructor(props) {
    super(props);
    this.enumArr = [];
    this.cEnumString = {};
    this.getEnum();
    this.state = {
      mode:"明细",
      showCardFieldName: "",
      bOnlyShowSelected: true,
      bShowList: false,
      showCardEle: {},
      popData: []
    }
  }

  async getEnum() {
    const config = {
      url: 'enum/getEnumStrFetch',
      method: 'GET',
      params: {
        enumtype: 'pb_sumType'
      }
    };
    const json = await proxy(config);
    if (json.code !== 200) {
      cb.utils.alert('获取枚举失败' + json.message, 'error');
      return;
    }
    this.enumArr = JSON.parse(json.data);
    this.enumArr && this.enumArr.map(item => {
      this.cEnumString[item.key] = item.value;
    });
  }

  componentDidMount() {
  }

  async getPopData(billNo, tplid, groupCode) {
    const config = {
      url: 'billmeta/getSummarySet',
      method: 'GET',
      params: {
        billno: billNo,
        tplid: tplid,
        groupcode: groupCode
      }
    }
    const json = await proxy(config);
    if (json.code !== 200) {
      cb.utils.alert('获取数据失败！' + json.message, 'error');
      return;
    }
    this.setState({ popData: json.data, })
  }


  handleRadioChange = (value) => {
    let { showCardEle } = this.state;
    let popData = this.state.popData;
    showCardEle.cSumType = value;
    let tmp = _.find(popData, (o) => { return o.cFieldName == this.state.showCardFieldName });
    tmp.cSumType = showCardEle.cSumType;
    tmp.cShowCaption = showCardEle.cShowCaption;
    this.setState({ popData, showCardFieldName: "" });
  }

  getCardContent = () => {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    let cardContent;
    let cardContentInner = [];
    let ele = this.state.showCardEle;
    this.enumArr.forEach(function (ele, index) {
      cardContentInner.push(<Radio style={radioStyle} value={ele.key}>{ele.value}</Radio>)
    })
    if (ele) {
      cardContent = <div>
        <div>
          <RadioGroup value={ele.cSumType ? ele.cSumType : "sum"} onChange={(e) => this.handleRadioChange(e.target.value)}>
            {cardContentInner}
          </RadioGroup>
        </div>
      </div>
      return cardContent;
    }
  }

  onCardVisibleChange(visible) {
    if (visible == false) {
      this.setState({ showCardFieldName: "" });
    }
  }

  onChecked(e, element, index) {
    let checked = e.target.checked;
    let popData = this.state.popData;
    if (checked && _.filter(popData, (o)=>{ return o.selected == 1; }).length >= 5) {
      cb.utils.alert("最多选择5个汇总项。");
      this.setState({});
    }
    else {
      popData[index].selected = checked ? 1 : 0;
      this.setState({ popData });
    }
  }

  getListContent = () => {
    if (_.isEmpty(this.state.popData)) {
      return null;
    }
    else {
      let listContent = [];
      let listContentInner = [];
      let bOnlyShowSelected = this.state.bOnlyShowSelected ? true : false;
      listContent.push(
        <div className="sumarea_list_caption">
          <span className="sumareaset-left">汇总设置</span>
          <Checkbox
            title={"只显示已选"}
            checked={bOnlyShowSelected}
            onChange={(e) => { this.setState({ bOnlyShowSelected: !bOnlyShowSelected }) }}>
            {"只显示已选"}
          </Checkbox>
        </div>
      );
      let cardContent;
      let summaryItems = this.state.popData;
      summaryItems.forEach(function (ele, index) {
        let item;
        let selected = ele.selected == 1 ? 1 : 0;
        cardContent = null;
        if (this.state.showCardEle.cFieldName == ele.cFieldName) {
          cardContent = this.getCardContent();
        }
        let showCurrent = (this.state.showCardFieldName == ele.cFieldName ? true : false);
        if (selected || bOnlyShowSelected == false) {
        item =
          <div className="sumarea_list_item">
            <div className="sumarea_list_item_1" >
              <Checkbox title={ele.cShowCaption} checked={selected == 1 ? true : false} onChange={(e) => this.onChecked(e, ele, index)}>
                {ele.cShowCaption?ele.cShowCaption:ele.cCaption}
              </Checkbox>
            </div>
            <Popover
              placement="bottom"
              overlayClassName="sumareasetting_card"
              content={cardContent}
              trigger={"click"}
              visible={showCurrent}
              onVisibleChange={(visible) => this.onCardVisibleChange(visible)}
            >
              <div className="summary_select_all">
                <Button
                  className={"sumarea_list_itemarrow_" + (showCurrent ? "1" : "0")}
                  disabled={!selected}
                  onClick={() => this.showCard(ele)}
                >
                  {this.cEnumString[ele.cSumType ? ele.cSumType : "sum"]}
                </Button>
                <Icon
                  type={showCurrent ? "up" : "down"}
                />
              </div>
            </Popover>
          </div>;
        listContentInner.push(item);
        }
      }, this);
      listContent.push(<div className="sumarea_list_items">{listContentInner}</div>);
      return (
        <div>
          <div>{listContent}</div>
          <div className="footer-btn">
            <Button type={"primary"} onClick={() => this.handleOk()}>确定</Button>
            <Button type={"default"} onClick={() => this.handleCancel()}>取消</Button>
            <div className="sumarea_list_8">
              <span className="sumarea_list_8_1" >最多选择</span>
              <span className="sumarea_list_8_2" >5</span>
              <span className="sumarea_list_8_3" >个汇总项</span>
            </div>
          </div>
        </div>
      );
    }
  }

  handleCancel = () => {
    this.setState({ bShowList: false, showCardFieldName: "", bOnlyShowSelected: true });
  }

  onVisibleChange = (visible) => {
    if (visible == false && this.state.showCardFieldName == "") {
      this.setState({ bShowList: false, showCardFieldName: "", bOnlyShowSelected: true });
    }
  }

  showList = () => {
    let bShowList = !this.state.bShowList;
    const { billNo, tplid } = this.props.viewModel.getParams();
    const { childrenField } = this.props.meta;
    const groupCode = this.props.viewModel.get(childrenField).getCache('groupCode');
    if (bShowList == true) {
      this.setState({ bShowList, popData: [], showCardFieldName: "", bOnlyShowSelected: true })
      this.getPopData(billNo, tplid, groupCode);
    }
  }

  showCard(ele) {
    let showCardEle = _.cloneDeep(ele);
    this.setState({ showCardEle: showCardEle, showCardFieldName: ele.cFieldName });
  }

  handleOk = () => {
	  const { billNo} = this.props.viewModel.getParams();
    const { childrenField } = this.props.meta;
    let popData = this.state.popData;
    let selectList = _.filter(popData,  (o) =>{ return o.selected == 1; });
    let params = {"billno":billNo,"childrenField":childrenField,"items":[]};
    selectList.forEach((ele) => {
      if (!ele.cSumType){
        ele.cSumType = "sum";}
        params["items"].push({iBillId:ele.iBillId,iBillEntityid:ele.iBillEntityId,cSumType:ele.cSumType,cShowCaption:ele.cShowCaption,cName:ele.cName,cCaption:ele.cCaption})
    });
    this.onSave(params)
  }

  async onSave(params) {
    const config = {
      url: 'billmeta/updateSummarySet',
      method: 'POST',
      params: params,
    }
    ;
    const json = await proxy(config);
    if (json.code === 200) {
      cb.utils.alert('设置成功！', 'success');
      this.setState({ bShowList: false, showCardFieldName: "", bOnlyShowSelected: true });
    }
    if (json.code !== 200) {
      cb.utils.alert("保存汇总区设置失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString(),'error');
      // this.setState({ bShowList: false });
    }
  }

  handleSwitch = () => {
    const{mode}=this.state;
    const switchMode=mode=="明细"?"汇总":"明细";
    this.setState({mode:switchMode});
    let bool;
    bool= switchMode=="明细"?false:true;
    this.props.viewModel.biz.do('refresh', this.props.viewModel, {isSum:bool})
  }

  render() {
    let type = this.state.bShowList ? "up" : "down";
    let listContent2 = this.getListContent();
    let className = "m-l-10";
    const IconType=this.state.mode=="明细"?'mingxi':'huizong1';
    return (
      <div style={{ float: 'left' }} className={className}>
        {/* <RadioGroup className="sum_switch" value={this.state.mode} onChange={(e) => this.handleSwitch(e.target.value)}>
          <RadioButton value="汇总">汇总</RadioButton>
          <RadioButton value="明细">明细</RadioButton>
        </RadioGroup> */}
            <Button className="switch_button" onClick={this.handleSwitch}><SvgIcon type={IconType}></SvgIcon>{this.state.mode}</Button>
         <Popover
          placement="bottomRight"
          overlayClassName="sumareasetting_list summarysetting"
          content={listContent2}
          trigger={"click"}
          visible={this.state.bShowList && _.isEmpty(listContent2) == false}
          onVisibleChange={(visible) => this.onVisibleChange(visible)}
        >
          <Button onClick={() => this.showList()} type={type} className="m-l-10">
            <span>汇总设置</span>
          </Button>
        </Popover>
      </div>)
  }
}
export default SummarySetting;
