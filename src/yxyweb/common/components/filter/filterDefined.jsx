import React, { Component } from 'react';
import { Popover, Col, Modal, Icon, Button, Checkbox, Radio, Transfer, Select, Row, Input, Tag } from 'antd';
import { proxy } from '../../helpers/util';
import Adddefineditem from './addDefineditem'
let Table = null;
export default class FilterDefined extends React.Component{
    constructor(props) {
        super(props);
        // let {filterId} = this.props;
        Table = require('../basic/table').default;
        this.viewmodel = this.props.model
        this.state = {
           visible:true,
           addVisible:false,
           gridModel: null,
           dataSource:[],
        }  
        // this.getSourceData(filterId)  
        // console.log('dataSource',this.state.dataSource)
    }
    // async getSourceData(filterId){
    //   const config = {
    //     url: 'filterDesign/getCustMetaFilterItems',
    //     method: 'GET',
    //     params: {
    //       filtersId: filterId
    //     }
    //   };
    //   const json = await proxy(config);
    //   if(json.code!==200) return 
    //   json.data && this.setState({dataSource:json.data})
    // }
    componentDidMount(){
      let {filterId} = this.props;
      this.showGridmodel(filterId)
    }
    async  showGridmodel(filterId){
      let {dataSource} = this.state
      console.log('dataSource',dataSource)
      const config = {
        url: 'filterDesign/getCustMetaFilterItems',
        method: 'GET',
        params: {
          filtersId: filterId
        }
      };
      const json = await proxy(config);
      if(json.code!==200) return 
      // json.data && this.setState({dataSource:json.data})
      let columns = {
        cCaption: { cItemName: 'name', cShowCaption: '过滤项名称', iColWidth: 150, bHidden: false, bShowIt: true, bCanModify: false, cControlType: 'Input', bMustSelect: true },
        cCycle: { cItemName: 'cycle', cShowCaption: '比较符', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: false, cControlType: 'Input', bMustSelect: true },
        cStart: { cItemName: 'isStart', cShowCaption: '过滤类型', iColWidth: 150, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'CheckRadio', bMustSelect: true },
      };
      let gridModel = new cb.models.GridModel({
        columns: columns,
        independent: true,
        readOnly: false,
        showRowNo: true,
        showCheckBox: false,
        showAggregates: false,
        // pagination: true,
        isDirty: true,
        showColumnSetting: false,
  
      });
      json.data && this.setState({dataSource:json.data,gridModel})
      console.log('dataSource',json.data)
      gridModel.setDataSource([{'name':'123','cycle':'12','isStart':1}]);
    }
    render(){
      let addFilteritem = this.addFilteritem();
      let {addVisible} = this.state;
      let addFilterdefined = addVisible ? <Adddefineditem model = {this.props.model}/> : '';
        return (
            <div className="defined_modal">
              <Modal title="自定义过滤条件列表"  visible={this.state.visible} width="820px" className="filter_defined_list"
                onOk={()=>this.onCancel()} onCancel={()=>this.onCancel()} okText="确定" cancelText="取消" maskClosable={false}
              >
              <div>{addFilteritem}</div>
              {addFilterdefined}
              </Modal>
            </div>
          );
    }
    onCancel = (e) => {
       this.setState({visible:!this.state.visible})
      }
    addFilteritem(){
      console.log('aaaa')
      const action = {
        "cControlType": "Toolbar",
        "cStyle":"{\"fixedwidth\":150}",  
        "controls":
          [
            {
              "cItemName": "btnEditRow", "cCaption": "编辑", "iOrder": 34, "cShowCaption": "编辑", "iStyle": 0,
              "cControlType": "button", "icon": "shanchu1", "childrenField": "purInRecords", "key": "3876626"
            },
            {
              "cItemName": "btnDeleteRow", "cCaption": "删除", "iOrder": 34, "cShowCaption": "删除", "iStyle": 0,
              "cControlType": "button", "icon": "shanchu1", "childrenField": "purInRecords", "key": "3876626"
            }
          ]
      }
      return(<div>
        <div className="filterdefined_addbutton" style={{width:50,marginLeft:720,marginTop:-50}}>
          <div className="add_button">
            <Button type='primary' onClick={()=>this.definedItem()}>新增</Button>
          </div>
        </div>
        <Table action={action} noViewModel={true} width={800} height={441} model={this.state.gridModel} />
      </div>)
    }
    definedItem(){
      this.setState({addVisible:true,visible:false})
    }

}