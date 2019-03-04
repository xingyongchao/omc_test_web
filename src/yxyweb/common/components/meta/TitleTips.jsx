import React, { Component } from 'react';
import {Popover,Modal,Button} from 'antd'
import { findDOMNode } from 'react-dom';
import CarouselControl from '../basic/carousel'
import SvgIcon from 'SvgIcon'
export default class TitleTips extends Component {
  constructor(props) {
    super(props);
    let popoverVisible = this.props.config.length ? this.props.config.map(v=>false) : []
    this.state = {
      showIndex:null,// 那个Model 显示
      popoverVisible:popoverVisible
    };

  }
  handleEnter(){
    this.setState({"icon":'wenhaolveguo'})
  }
  handelChange(visible){
    if(!visible){
      this.setState({"icon":'wenhaomoren'})
    }
  }
  handelPopoverClick(index,e){
    e.nativeEvent.stopImmediatePropagation();
    e.nativeEvent.stopPropagation();
    let popoverVisible = this.state.popoverVisible;
    popoverVisible[index] = !popoverVisible[index];
    this.state.popoverVisible = popoverVisible;
    this.setState({})
  }
  getPopover(value,index){
    let popoverConfig = {
      placement:'bottom',
      overlayClassName:value.overlayClassName,
      title:value.title,
      arrowPointAtCenter:true,
      autoAdjustOverflow:false,
      mouseEnterDelay:0.1
    }
    return value.trigger=='hover' ?
      <strong>
        <span className='title-adds'>{value.config.title}</span>
        <Popover 
          {...popoverConfig} 
          content={<CarouselControl config={value.config}/>} 
          onMouseEnter ={()=>this.handleEnter(index)} 
          onVisibleChange={()=>this.handelChange}
          trigger='hover'
        >
          <i className={"anticon icon-"+value.icon}></i> 
        </Popover>
      </strong> : 
      <strong>
        <Popover 
          {...popoverConfig} 
          visible={this.state.popoverVisible[index]} 
          content={<CarouselControl config={value.config}/>}
        >
          <span ref='spanelem' className='title-adds' onClick={(e)=>this.handelPopoverClick(index,e)}>{value.config.title}</span>
        </Popover>
        <i ref='ielem' onClick={(e)=>this.handelPopoverClick(index,e)} className={"anticon icon-"+value.icon}></i> 
      </strong> 
  }
  handleCancel = (e) => {
    this.setState({showIndex:-1 }); 
  }
  showModal = (index) => {
    this.setState({showIndex:index }); 
  }
  handleBodyClick=(e)=>{
    if (this.contains(this.refs.spanelem, e.target)||this.contains(this.refs.ielem, e.target)) return;
    if (e.target && cb.dom(findDOMNode(e.target)).parents('.ant-title-tips-popover').length) return;
    document.body.removeEventListener('click', this.handleBodyClick);
    let {popoverVisible} = this.state;
    popoverVisible = popoverVisible.map(v=>false)
    this.setState({popoverVisible})
  }

  contains(elem, target) {
    if (elem === target)
      return true;
    if (!elem || !elem.children || !elem.children.length)
      return false;
    for (var i = 0, len = elem.children.length; i < len; i++) {
      if (this.contains(elem.children[i], target))
        return true;
    }
    return false;
  }

  getModel(value,index){
    return (
      <span>
        {
          value.trigger==='hover' ?
          <SvgIcon type={value.icon} style={{'cursor':'pointer'}} onClick={()=>this.showModal(index)}/> 
          :
          <SvgIcon type={value.icon} style={{'cursor':'pointer'}} onMouseEnter={()=>this.showModal(index)}/>
        }
        <Modal
          title="Basic Modal"
          visible={this.state.showIndex==index}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
        >
         <CarouselControl config={value.config}/>
        </Modal>
      </span>
    )
  }
  render() {
    document.body.addEventListener('click', this.handleBodyClick);
    let {config} = this.props;
    if(!config.length) return null
    return (<span className='titleType'>
      {
        config.map((value,index)=>{
         return value.type==='popover'? this.getPopover(value,index) : this.getModel(value,index)
        })
      }
    </span>
    );
  }
  componentDidMount() {
  }
}