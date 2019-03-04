import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { NavBar, Icon } from 'antd-mobile';

export default class NavBarControl extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
    }
    if(this.props.color){
      if(this.props.color.indexOf('#fff')>=0){
        cb.utils.setStatusBarStyle("light");
      }else{
        cb.utils.setStatusBarStyle("dark");
      }
    }
  }
  onLeftClick = () => {
    if (this.props.onLeftClick) {
      this.props.onLeftClick();
      return
    }
    //设置状态栏字体白色
    cb.utils.setStatusBarStyle("light");
    this.context.router.history.goBack()
    if (this.props.goBack) this.props.goBack();
  }
  onRightClick = (e) => {
    if (this.props.onRightClick)
      this.props.onRightClick(e);
  }
  getRightContent = (rightContent) => {
    if (!rightContent) return null;
    return (
      <div onClick={this.onRightClick}>{rightContent}</div>
    )
  }
  getFinallyContent() {
    const { mode, icon, leftContent, rightContent, title } = this.props;
    const rightControl = this.getRightContent(rightContent);
    let str = null;
    if (icon === 'kong') {
      str = <NavBar
        mode={mode ? mode : 'dark'}
        leftContent={leftContent ? leftContent : ''}
        rightContent={rightControl ? rightContent : ''}
        onLeftClick={this.onLeftClick}
      >{title ? title : ''}
      </NavBar>
    } else {
      str = <NavBar
        mode={mode ? mode : 'dark'} icon={icon ? (<Icon type={icon} />) : (<i className="icon icon-fanhui"></i>)}
        leftContent={leftContent ? leftContent : ''}
        rightContent={rightControl ? rightContent : ''}
        onLeftClick={this.onLeftClick}
      >{title ? title : ''}
      </NavBar>
    }
    return str
  }
  render() {
    let content = this.getFinallyContent();
    return content
  }
}
