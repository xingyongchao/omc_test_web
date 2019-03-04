import {ActivityIndicator} from 'antd-mobile'
import React, {Component} from "react"
import {connect} from 'react-redux'

function Toasting(props) {
  return  <ActivityIndicator toast text="加载中..." animating={props.loading}/>
}

export default connect(state=>{
  return {
    loading: state.loading
  }
})(Toasting)
