/*
按钮单选框
参数        说明            类型          可选值       默认值
onChange    选项变化时的回调函数    Function(e:Event) 无         无
value     用于设置当前选中的值    String        无         无
defaultValue  默认选中的值        String        无         无
size      大小，只对按钮样式生效 String        large default small default
 */
import React from 'react';
import { Carousel } from 'antd';
process.env.__CLIENT__ && require('./carousel.less');
import { proxy } from '../../helpers/util';
export default class CarouselControl extends React.Component {
  constructor(props) {
    super(props);
    let {enumCode,title} = this.props.config
    this.state = {
      index:0,
      stop:true,
      title:title,
      dataSource:[],
      size: 'default'
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.getSourceData(enumCode)
  }
  async getSourceData(enumCode){
    const config = {
      url: 'enum/getEnumStrFetch',
      method: 'GET',
      params: {
        enumtype: enumCode
      }
    };
    const json = await proxy(config);
    if(json.code!==200) return 
    json.data && this.setState({dataSource:JSON.parse(json.data)})
  }
  componentDidMount() {
    this.timer = setInterval(() => this.change(), 3000 );
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  componentDidUpdate() {}
  change() {
    let  {stop,index,dataSource}  = this.state;
    if(stop) {
      index = dataSource.length &&  (index+1) % dataSource.length
      this.goto(index)
     }else {
       return false;
     }
  }
  handleTabClick(index){
    this.setState({index})
    this.goto(index)
  }
  handleMouseOver(){
    this.setState({stop:false})
  }
  handleMouseLeave(){
    this.setState({stop:true})
  }
  goto(index){
    this.refs.swipeBigPic && this.refs.swipeBigPic.refs.slick.innerSlider.slickGoTo(index);
  }
  onafterChange=(index)=>{
    this.setState({index});
  }
  baseControl = () => {
    let {  dataSource,index} = this.state;
    let _baseControl =dataSource.length ? 
      <div className='carousel' onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
        {/*<div className='carousel-title'>{this.state.title}</div>*/}
        <div className='carousel-tab'>
          {dataSource.map((value,i)=>{
            return <span className={index==i?'on':''} onClick={()=>this.handleTabClick(i)} key={'tab'+i}>{value.value}</span>
          })}
        </div>
        <Carousel afterChange={this.onafterChange} ref="swipeBigPic">
          {dataSource.map((value,i)=>{
            return <div className={value.icon+' carousel-content'}  key={'img'+i}></div>
          })}
        </Carousel>
      </div>
    :null;
    return _baseControl
  }
  render() {
    return this.baseControl();
  }
}
