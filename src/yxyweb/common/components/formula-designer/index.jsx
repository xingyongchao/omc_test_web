import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import MainContent from './MainContent';
import Footer from './Footer';

import { close } from '../../redux/formula';

class FormulaDesigner extends Component {
  handleOk = () => {
    const formulaData = this.props.formula;
    this.props.onOk(formulaData);
  }
  handleCancel = () => {
    this.props.close();
  }
  render() {
    return (
      <Modal key={this.props.modalKey} className='FormulaDesigner' visible={this.props.formula.visible} title='公式编辑器' width={800} maskClosable={false} footer={<Footer onOk={this.handleOk} />} onCancel={this.handleCancel}>
        <MainContent />
      </Modal>
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
    close: bindActionCreators(close, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormulaDesigner);
