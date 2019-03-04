import React,{Component} from 'react'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as BaseComponents from '../BasicComponents'
import { List, InputItem, Button, DatePicker, TextareaItem, Modal,Icon } from 'antd-mobile';
import NavBar from '../NavBar';
import _ from 'lodash'
import Container from './Container';

const BasicComponentsMap = {};
let cacheRowData={};
for (var attr in BaseComponents)
  BasicComponentsMap[attr.toLocaleLowerCase()] = BaseComponents[attr];

class DetailItemInfo extends Component{
    static contextTypes={
        router:PropTypes.object.isRequired
    }
    constructor(props){
        super(props);
        cb.utils.setStatusBarStyle("dark");
        let parmas = props.match.params;
        this.state = {
            itemName: parmas.itemName,
            menuId: parmas.menuId,
            itemIndex:parmas.itemIndex
        }
        const { menuId, itemName } = this.state;
        const panes = this.props.portal.tabs[menuId].panes;
        if(panes && Array.isArray(panes)){
            this.vm = panes[panes.length-1].content.vm;
            this.metavm = panes[panes.length-1].content.metaData.view;
        }
        this.initMeta();
    }

    initMeta = () => {
        if (!this.metavm) return;
        if (!this.metavm.containers) return;
        var itemInfo = null;
        this.metavm.containers.map(container => {
            if (container.cControlType == 'view') {
                container && container.containers.map(item => {
                    if (item.cControlType == 'VoucherDetail')  
                        itemInfo = item;
                });
            }
        });

        itemInfo.containers.map((item)=>{
            const {cGroupCode,cControlType, controls, childrenField} = item;
            this.rowItem=item;
            if(cGroupCode==='BaseItem'){
                this.baseItemMeta = item;
                if(cControlType==='table'){
                    this.baseControl = controls;
                    this.gridModel = this.vm.get(childrenField);
                    this.readOnly = this.gridModel.getReadOnly();
                    cacheRowData = _.cloneDeep(this.gridModel.getRow(this.state.itemIndex));
                }
            }
        })
    }

    getControls=()=>{
        if(!this.baseControl || !this.gridModel)
            return;
        let controls=[];
        this.baseControl.map((item)=>{
          let Component = BasicComponentsMap[item.cControlType.toLocaleLowerCase()];
          controls.push(<Component viewMeta={item} rowItem={this.rowItem} rowModel={this.gridModel.getEditRowModel()} model={this.gridModel.getEditRowModel().get(item.cItemName)}></Component>);
        })
        return controls;
    }

    getContainers=()=>{
        if(!this.baseItemMeta || !this.baseItemMeta.containers || !Array.isArray(this.baseItemMeta.containers))
            return;
        let controls=[]; 
        this.baseItemMeta.containers.map((item)=>{
            if(item.cControlType==='hiddenContainer' && item.cGroupCode==='st_demand_photo_m'){
                console.log(this.gridModel.getEditRowModel().get(item.cGroupCode));
                let Component = BasicComponentsMap['attachment'];
                controls.push(<Component vmmeta={item} model={this.gridModel.getEditRowModel().get(item.childrenField)}></Component>);
            }
        })
        return controls;
    }

    rightContent(){
        let itemIndex = this.state.itemIndex;
        let dataLen = this.gridModel.getRows().length;
        let preDisabled = false, nextDisabled = false;
        if (dataLen == 1) {
            preDisabled = true;
            nextDisabled = true;
        } else if (dataLen == (itemIndex + 1)) {
            nextDisabled = true;
        } else if (itemIndex == 0) {
            preDisabled = true;
        }
        if (dataLen > 1)
            return (
                <span>
                {
                    preDisabled ?
                    <Icon className="button_disabled" type='icon-shangyitiao' style={{ width: '0.42rem', height: '0.42rem' }} />
                    :
                    <Icon type='icon-shangyitiao' onClick={() => this.updateItemInfo('prev')} style={{ width: '0.42rem', height: '0.42rem' }} />
                }
                {
                    nextDisabled ?
                    <Icon className="button_disabled" type='icon-xiayitiao' style={{ width: '0.42rem', height: '0.42rem', marginLeft: '0.3rem' }} />
                    :
                    <Icon type='icon-xiayitiao' onClick={() => this.updateItemInfo('next')} style={{ width: '0.42rem', height: '0.42rem', marginLeft: '0.3rem' }} />
                }
                </span>
            )
        else
            return null;
    }

    updateItemInfo=(type)=>{
        let { itemIndex } = this.state;
        const rowCount = this.gridModel.getRows().length;
        if(rowCount>1){
            itemIndex = parseInt(type==='prev'?(itemIndex>0?(parseInt(itemIndex)-1):itemIndex):(itemIndex<rowCount?(parseInt(itemIndex)+1):itemIndex));
            this.gridModel.setFocusedRowIndex(itemIndex);
            this.setState({itemIndex});
        }
    }

    goBack=()=>{
        let { state } = this.props.location;
        if(state && state.action==='add'){
            this.gridModel.deleteRows([parseInt(this.state.itemIndex)]);
        }else{
            this.gridModel.updateRow(parseInt(this.state.itemIndex),cacheRowData);
        }
        this.context.router.history.goBack();
    }

    onOk=()=>{
        this.context.router.history.goBack();
    }

    render(){
        return (
            <div className={`voucher-header-info ${this.readOnly && 'item-info-browser'}`}>
              <NavBar onLeftClick={()=>this.goBack()} title={"改行"} rightContent={this.rightContent()}/>
              <List className="voucher-header-info-body">
                 {this.getControls()}
                 {this.getContainers()}
              </List>
                {
                    this.readOnly ? null :
                    <div className="button-fixed-bottom">
                    <Button type="primary" onClick={this.onOk}>确定</Button>
                    </div>
                }
            </div>
          )
    }
}

function mapPropsToState(state){
    return {
        portal:state.portal.toJS()
    }
}
export default connect(mapPropsToState)(DetailItemInfo)