import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Button, Col, Select } from 'antd';
import SvgIcon from 'SvgIcon';
import { openDB, IDB_searchData, IDB_saveData,IDB_deleteOneData } from 'src/yxyweb/common/redux/indexedDB'
import _ from 'lodash'
// let sortDraftdata = [];
export default class Draftbutton extends React.Component {
    constructor(props) {
        super(props);
        this.openIndexdb();
        let controls = this.props.controls
        this.viewModel = props.model.getParent();
        const status = this.viewModel.getParams().mode
        let userId = cb.rest.AppContext.user.id;
        let billNo = this.viewModel.getParams().billNo;
        this.state = {
            status: status,
            bEnder: false,
            key:null,
            userId:userId,
            billNo:billNo,
            controls: controls,
            sortDraftdata:[],
        }
    }
    componentDidMount() {
        this.props.model.addListener(this);
        let _self = this;
        this.viewModel.on('afterSave', function (args){
            if(args.err == null){
                let {key} = _self.state;
                // let key = this.viewModel.getCache('draftInfo');
                // let keyValue = key.attrKey
                _self.deleteDraft(key)
            }
        });
    }
    componentWillUnmount() {
        this.props.model.removeListener(this);
    }
    saveDraftdata(){
        
    }
    setVisible(visible) {
        this.setState({ visible });
        if (this.props.onVisibleChange)
          this.props.onVisibleChange(visible);
      }
    render() {
        let draftTag = null;
        let value = this.props.value;
        let {status ,sortDraftdata} = this.state;
        console.log(status)
        let menuItem = this.menurender();
        const menu = (<Menu overlayClassName="draft_menu" >{menuItem}</Menu>
        );
        if (status == "add") { 
            if(sortDraftdata &&sortDraftdata.length >0 ){
            draftTag = <Button className="draft_header"><SvgIcon type='caogaoxiang'></SvgIcon>{value}</Button>;
            }
            else{ draftTag = null}
        }
        if (status == "browse") { draftTag = <Button className="draf_button  no-border-radius m-l-10 ">{value} <Icon type="down" /></Button>; }
        if (!draftTag) return null;
        return ( <Dropdown overlayClassName="drop_menu" onVisibleChange={()=>this.visibleChange()} overlay={menu} trigger={['click']}>{draftTag}</Dropdown>);
    }
    visibleChange(){
        this.openIndexdb();
    }
    compare(property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value2 - value1;
        }
    }
    gainbillNodata() {
        let options = { dbTableName: 'billNodata' };
        IDB_searchData(options).then(dbData => {this.renderData(dbData);})
        .catch(e => { console.error(e.message); return null; })
    }
    openIndexdb() {
        return openDB('off-lineDB', 2, ['billNodata']).then(result => {
            if (result) {this.gainbillNodata();}
            else cb.utils.alert('打开数据库失败，缓存功能不可用！', 'error')
        }).catch(e => {console.error(e)})
    }
    renderData(data) {
        let {sortDraftdata,userId,billNo} = this.state;
        console.log('userId',userId)
        console.log('billNo',billNo)
        let selectValue = userId+'_'+billNo;
        let selectData = [];
        data.forEach(function(ele,index){
            if(ele.checkKey === selectValue){
            selectData.push(ele)
            }
        })
        let sortData = selectData.sort(this.compare('copyTime'))
        sortDraftdata = _.slice(sortData,0,15)
        this.setState({sortDraftdata:sortDraftdata})
    }
    menurender(){
        let menuItem = [];
        let self = this;
        let {sortDraftdata} = this.state;
        if (sortDraftdata && sortDraftdata.length > 0) {
            sortDraftdata.forEach(function (ele, index) {
            let enterShow = ele.isMouseEnter ? <span onClick={() => this.deleteDraft(ele.attrKey)} className="draft_font">删除</span> : <span></span>;
            let Item = (<Menu.Item className={"draft_menuItem" +' '+ (ele.isMouseEnter?"draft_menuItem_selected":"")} key={ele.copyTime} 
                        onMouseEnter={(e) => self.IsEnterSchemeitem(true, ele.copyTime, sortDraftdata,e)}
                        onMouseLeave={(e) => self.IsEnterSchemeitem(false, ele.copyTime, sortDraftdata,e)}>
                        {<input className="draft_itemName" readOnly style={{border:'0',background: 'transparent'}} onClick={()=>this.enterDetails(ele)} value={ele.draftName} />}
                        {enterShow}
                        </Menu.Item>)
            menuItem.push(Item);
            },this)
        }
        else{ menuItem = (<Menu.Item className="draft_menuItem"> 暂无数据</Menu.Item>)}
        return menuItem;
    }
    enterDetails(ele){
        this.viewModel.setCache('draftInfo', {attrKey:ele.attrKey})
        this.viewModel.getParams().mode = 'edit'
        this.viewModel.biz.do('load', this.viewModel, {
            data: ele
          });
        this.setState({status:"edit",key:ele.attrKey})
    }
    deleteDraft(key) {
        let options={id:key,dbTableName: 'billNodata'}
        IDB_deleteOneData(options).then(result => {console.log('result',result);cb.utils.alert('删除草稿成功', 'success')}).catch(e => { cb.utils.alert('删除草稿失败！', 'error');console.error(e.message); return null; })
        this.setState({bEnder:true})
    }
    IsEnterSchemeitem(bEnder, copyTime, sortData,e) {
        let seft = this
        sortData.forEach(function (ele, index) {
            if (ele.copyTime == copyTime) {
                ele.isMouseEnter = bEnder
               seft.setState({ bEnder: bEnder })
            }
        })
    }
}