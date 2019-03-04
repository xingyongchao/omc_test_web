import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as BaseComponents from '../BasicComponents'
import { List, InputItem, Button, DatePicker, TextareaItem, Modal } from 'antd-mobile';
import SvgIcon from 'SvgIcon';
import NavBar from '../NavBar';
const BasicComponentsMap = {};
let cacheRowData={}; 
for (var attr in BaseComponents)
  BasicComponentsMap[attr.toLocaleLowerCase()] = BaseComponents[attr];

class DetailHeaderInfo extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    var params = props.match ? props.match.params : null;
    var menuId = params ? params.menuId : null;
    var panes = menuId ? props.portal.tabs[menuId].panes : null;
    this.state = {
      params: params,
    };
    this.viewModel = panes ? panes[panes.length - 1].content.vm : null;
    var metaView = panes ? panes[panes.length - 1].content.metaData.view : null;
    this.BaseLineMeta = null;
    this.initMeta(metaView);
  }
  initMeta = (meta) => {
    if (!meta) return;
    if (!meta.containers) return;
    var headerMeta = null;
    meta.containers.map(container => {
      if (container.cControlType == 'view') {
        container && container.containers.map(item => {
          if (item.cControlType == 'DetailHeader')
            headerMeta = item;
        });
      }
    });
    cacheRowData = this.viewModel.getAllData();
    headerMeta && headerMeta.containers.map(container => {
      let controls = container.controls;
      if (container.cGroupCode == 'BaseLine')
        this.BaseLineMeta = controls;
    });
  }
  getControl = (meta) => {
    if (!meta) return null;
    let controls = [];
    meta.map(item => {
      let ctrlType = item.cControlType.trim().toLocaleLowerCase();
      switch (ctrlType) {
        case "money":
        case "inputnumber":
        case "treerefer":
        case "searchbox":
          ctrlType = 'input';
          break;
      }
      let ComName = BasicComponentsMap[ctrlType];
      if (!ComName) return "";
      controls.push(
        <ComName viewMeta={item} model={this.viewModel.get(item.cItemName)}></ComName>
      );
    })
    return controls;
  }

  goBack=()=>{
    let { state } = this.props.location;
    console.log(this.viewModel);
    this.viewModel.setData(cacheRowData);
    this.context.router.history.goBack();
  }

  onOk=()=>{
    this.context.router.history.goBack();
  }

  getBaseControl = () => {
    let isEdit = this.viewModel.getParams().mode==='edit';
    let control = this.getControl(this.BaseLineMeta);
    return (
      <div className={`voucher-header-info ${isEdit && 'header-info-browser'}`}>
        <NavBar onLeftClick={()=>this.goBack()} title={"基本信息"} />
        <List className="voucher-header-info-body">
          {control}
        </List>
        {
          !isEdit ? null :
          <div className="button-fixed-bottom">
            <Button type="primary" onClick={this.onOk}>确定</Button>
          </div>
        }
      </div>
    )
  }
  render() {
    const control = this.getBaseControl();
    return control;
  }

}
function mapStateToProps(state) {
  return {
    portal: state.portal.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailHeaderInfo);
