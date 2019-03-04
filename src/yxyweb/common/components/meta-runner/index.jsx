import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button } from 'antd';
import { Container } from '../meta';
import ModalLight from '../common/ModalLight';

import * as tabsactions from '../../redux/tabs';
import * as portalactions from '../../redux/portal';
import * as modalactions from '../../redux/dynamicModal';
import { execHandler } from '../../redux/tree';

import env from '../../helpers/env';

const VoucherListBillTypes = {
  'VoucherList': 'voucher-list',
  'ArchiveList': 'voucher-list',
  'TreeList': 'voucher-list',
  'Option': 'meta-option'
};

class Meta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMode: env.VOUCHER_STATE_BROWSE,
      greaterHeight: true
    };
  }
  componentDidMount() {
    this.props.viewModel.addListener(this);
    this.props.viewModel.on('modeChange', mode => {
      this.setState({ currentMode: mode });
    });
    this.props.viewModel.on('afterRenderComponent', () => {
      const greaterHeight = this.refs.container.clientHeight <= this.props.height ? false : true;
      this.setState({ greaterHeight });
    });
    if (this.refs.container.clientHeight <= this.props.height)
      this.setState({ greaterHeight: false });
  }
  componentWillUnmount() {
    this.props.viewModel.removeListener(this);
    this.props.viewModel.execute('destroy');
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.id !== this.props.id ||
      nextState.currentMode !== this.state.currentMode ||
      nextState.greaterHeight !== this.state.greaterHeight ||
      nextProps.width !== this.props.width;
  }
  communication(action) {
    // action.type, action.payload
    let { portalactions, index, modalactions, execHandler, viewModel } = this.props;
    if (action.type === 'close')
      return this.handleClose();
    if (action.type === 'return')
      return this.handleReturn(action.payload);
    if (action.type === 'modal') {
      if (action.payload.mode === 'html') {
        ModalLight({ content: <div dangerouslySetInnerHTML={{ __html: action.payload.html }}></div> });
        return;
      }
      if (action.payload.mode === 'inner') {
        modalactions.openMetaModal(action.payload.groupCode, action.payload.viewModel);
        return;
      }
      return action.payload.data === false
        ? modalactions.closeModal()
        : modalactions.openModal(action.payload.key, action.payload.data);
    }
    if (action.type === 'menu')
      return execHandler(action.payload.menuCode, action.payload.carryData);
    const { title, params, metaData } = action.payload;
    delete action.payload.title;
    delete action.payload.params;
    if (metaData) {
      const metaTemplate = metaData.view;
      const templateType = metaTemplate.templateType && metaTemplate.templateType.trim().toLocaleLowerCase();
      if (templateType === 'modal') {
        modalactions.openMetaRunnerModal(title, action.payload);
        return;
      }
    }
    portalactions.addItem(index, { title, content: action.payload, params: params || action.payload, parent: viewModel });
  }
  handleReturn(payload) {
    const { portalactions, index, viewModel } = this.props;
    portalactions.delItem(index);
    const parentViewModel = viewModel.getCache('parentViewModel');
    if (parentViewModel)
      parentViewModel.execute('back', payload);
  }
  handleClose() {
    const { tabsactions, index } = this.props;
    tabsactions.deleteItem(index);
  }
  render() {
    const { metaData, viewModel, width, height, index } = this.props;
    const className = metaData && VoucherListBillTypes[metaData.cBillType] || '';
    let component = null;
    if (metaData)
      component = <Container className='height-100' meta={metaData.view} viewModel={viewModel} width={width} height={height} index={index} />
    const { currentMode, greaterHeight } = this.state;
    const classNames = [className];
    classNames.push('container-' + (currentMode === env.VOUCHER_STATE_BROWSE ? 'browse' : 'edit') + '-mode');
    classNames.push('container-' + (greaterHeight ? 'greater' : 'less') + '-height');
    return (
      <div ref='container' className={classNames.join(' ')}>
        {component}
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    tabsactions: bindActionCreators(tabsactions, dispatch),
    portalactions: bindActionCreators(portalactions, dispatch),
    modalactions: bindActionCreators(modalactions, dispatch),
    execHandler: bindActionCreators(execHandler, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meta);
