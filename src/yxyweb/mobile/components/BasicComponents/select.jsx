import React,{Component} from 'react'
import { List,Flex } from 'antd-mobile';

export default class SelectControl extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(this.props.model){
            this.props.model.addListener(this);
        }
    }

    componentWillUnmount(){
        if(this.props.model){
            this.props.model.removeListener(this);
        }
    }
    
    handClick(item){
        if(this.props.model){
            let val = this.props.model.getValue();
            let chooseVal=item.value;
            if(val===item.value){
                chooseVal="";
            }
            this.setState({selectValue:chooseVal});
            this.props.model.setValue(chooseVal, true);
        }
    }

    getControls(){
        if(!this.state){
            return '';
        }
        let { dataSource,selectValue } = this.state;
        let val = this.props.model.getValue();
        let controls = [];
        dataSource.map((item)=>{
            if(val===item.value){
                controls.push(<div onClick={this.handClick.bind(this,item)} className="inline sidebar-btn-select" style={{border:'1px #f1e3e8 solid',padding:'0.1rem 0.3rem',marginRight:'0.3rem'}}>{item.text}</div>);
            }else{
                controls.push(<div onClick={this.handClick.bind(this,item)} className="inline" style={{border:'1px #000 solid',padding:'0.1rem 0.3rem',marginRight:'0.3rem'}}>{item.text}</div>);
            }
        });
        return (
            <Flex  wrap="wrap">{controls}</Flex>
        )
    }

    render(){
        return (
            <List.Item style={{display:'flex',flexFlow:'row'}}>
                <span>{this.props.title}</span>
                {this.getControls()}
            </List.Item>
        )
    }

}