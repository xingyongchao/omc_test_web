import React, { Component } from 'react';
import { render } from 'react-dom';
import {Toast} from 'antd-mobile';
import NavBar from '../NavBar';

export default class Scan extends Component{
    constructor(props){
      super(props);
    }

    componentDidMount(){
        if(this.props.model)
            this.props.model.addListener(this);
        this.initPureScanBar();
    }

    initPureScanBar() {
        if (!window.plus || !window.plus.barcode) {
            //测试barcode方法,
            this.barcode = {
            start: () => {
            },
            cancel: () => {
            },
            close: () => {
            },
            setFlash: () => {
            }
            }
            return;
        }
        var styles = {frameColor: "#29E52C", PureScanBarColor: "#29E52C", background: "#222222"};
        var filters = [window.plus.barcode.QR, window.plus.barcode.EAN13, window.plus.barcode.EAN8, window.plus.barcode.ITF];
        this.barcode = new window.plus.barcode.Barcode('barcodepanel', filters, styles);
        this.barcode.onmarked = this.onmarked;
        this.barcode.onerror = this.onerror;
        this.lazyStart();
    }

    onmarked = (type, code, file) => {
        this.setState({barCode: code});
        if(this.props.vm){
            this.props.vm.set("barcode",code);
            this.props.vm.get("barcode").fireEvent('enter');
            this.goBack();
        }
        // console.log(code + '  ' + type + '  ' + file);
        // this.saveCode();
        // this.lazyStart(true);
    }

    onerror = (error) => {
        Toast.fail('操作出错', 1);
        console.log(error);
        this.lazyStart(true);
    }

    lazyStart(bl) {
        if (bl) {
            let calTime = setTimeout(function () {
            clearTimeout(calTime);
            this.barcode.start();
            }.bind(this), 1000);
        } else {
            this.barcode.start();
        }

    }

    //释放
    close() {
        if(this.barcode && this.barcode.cancel){
            this.barcode.cancel();
        }
        if(this.close && this.barcode.close){
            this.barcode.close();
        }
    }

      //闪光灯
  setFlash() {
    let blopen = !this.state.open;
    this.setState({open: blopen});
    this.barcode.setFlash(blopen);
  }

  changeInput(value) {
    this.setState({barCode: value});
  }

  saveCode = () => {
    if (typeof this.props.resolve === 'function') {
      this.props.resolve({
        fulfilled: true,
        value: this.state.barCode
      })
    }
  }
      
    componentWillUnmount(){
        if(this.props.model)
            this.props.model.removeListener(this);
        this.close()
    }

    componentDidUpdate() {
        if (this.props.model)
            this.props.model.addListener(this);
    }

    goBack=()=>{
        if(this.props.close)
            this.props.close();
    }

    render(){
        let originDpr = 1;
        const  hgt = window.screen.height - 185 * originDpr;
        return <div className="barcode_view" style={{ top: 0, left: 0, width: '100%',position: 'fixed',zIndex: '1000', height: window.screen.height+'px', textAlign: 'center', backgroundColor: '#000' }}>
            <div style={{color: '#fff',textAlign:'left',padding:'0.2rem'}}><i onClick={()=>this.goBack()} className="icon icon-fanhui"></i></div>
            <div id='barcodepanel' style={{height: hgt+'px'}}></div>
        </div>
      
    }

}