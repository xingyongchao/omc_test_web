import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';

import * as formulaActions from '../../redux/formula';

class Footer extends Component {
  handleCancel = () => {
    this.props.formulaActions.close();
  }
  handleCheck = () => {
    this.props.formulaActions.check();
  }
  handleOk = () => {
    const { caption, expression } = this.props.formula;
    if(!caption || caption == "" || !expression || expression == ''){
      cb.utils.alert("栏目名称/公式为必输项！请填写完整后重试！", 'error');
      return
    }
    this.props.onOk();
    this.handleCancel();
  }
  render() {
    const checkPass = this.props.formula.checkPass;
    return (
      <div>
        <Button onClick={this.handleCancel}>取消</Button>
        <Button onClick={this.handleCheck}>校验</Button>
        <Button disabled={!checkPass} onClick={this.handleOk}>确定</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formula: state.formula.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    formulaActions: bindActionCreators(formulaActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
