import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { Button } from 'antd-mobile';
import { VoucherList, Voucher } from '../Meta';
// import ModalLight from '../common/ModalLight';

// import * as tabsactions from '../../redux/modules/tabs';
import * as portalactions from 'yxyweb/common/redux/portal';
// import * as modalactions from '../../redux/modules/dynamicModal';
// import { execHandler } from '../../redux/modules/tree';
import { MobileReport } from 'yxyweb/common/components/echart/MobileReport';

import env from 'yxyweb/common/helpers/env';

const VoucherListBillTypes = {
  'VoucherList': 'voucher-list',
  'ArchiveList': 'voucher-list',
  'TreeList': 'voucher-list',
  'Option': 'meta-option'
};

const BillTypeComponents = {
  'voucherlist': VoucherList,
  'archivelist': VoucherList,
  'treelist': VoucherList,
  'report': MobileReport
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
    // if (this.refs.container.clientHeight <= this.props.height)
    //   this.setState({ greaterHeight: false });
  }
  componentWillUnmount() {
    this.props.viewModel.removeListener(this);
    this.props.viewModel.execute('destroy');
  }
  componentWillReceiveProps(nextProps) {
    let nextMode = nextProps.viewModel.getParams().mode;
    if (nextMode && nextMode != this.state.currentMode)
      this.setState({ currentMode: nextMode });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.id !== this.props.id ||
      nextState.currentMode !== this.state.currentMode ||
      nextState.greaterHeight !== this.state.greaterHeight;
  }
  communication(action) {
    // action.type, action.payload
    let { portalactions, index, modalactions, execHandler, viewModel } = this.props;
    if (action.type === 'close')
      return this.handleClose();
    if (action.type === 'return')
      return this.handleReturn(action.refresh);
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
  handleReturn = () => {
    const { portal, portalactions, index, viewModel } = this.props;
    const current = portal.tabs[index];
    if (!current) return;
    const currentPanes = current.panes;
    if (!currentPanes || !currentPanes.length) return;
    const { mode } = viewModel.getParams();
    if (mode && mode !== env.VOUCHER_STATE_BROWSE && viewModel.getDirtyData(false)) {
      cb.utils.confirm('确定要返回么', () => {
        this._return(currentPanes, portalactions, index, viewModel);
      });
    } else {
      this._return(currentPanes, portalactions, index, viewModel);
    }
  }
  _return(currentPanes, portalactions, index, viewModel) {
    if (currentPanes.length === 1) {
      this._home();
    } else {
      portalactions.delItem(index);
      const parentViewModel = viewModel.getCache('parentViewModel');
      if (parentViewModel)
        parentViewModel.execute('back');
    }
  }
  _home() {
    this.props.dispatch(goBack());
  }
  handleClose() {
    const { tabsactions, index } = this.props;
    tabsactions.deleteItem(index);
  }
  render() {
    const { metaData, viewModel, width, height, index } = this.props;
    const metaTemplate = metaData.view, billType = metaData.cBillType && metaData.cBillType.trim().toLocaleLowerCase();
    const ComName = BillTypeComponents[billType];
    if (ComName)
      return <ComName meta={metaTemplate} viewModel={viewModel} width={width} height={height} index={index} returnCallback={this.handleReturn} homeCallback={this.goHome} />
    const className = VoucherListBillTypes[metaData.cBillType] || '';
    const { currentMode, greaterHeight } = this.state;
    const classNames = [className];
    classNames.push('container-' + (currentMode === env.VOUCHER_STATE_BROWSE ? 'browse' : 'edit') + '-mode');
    classNames.push('container-' + (greaterHeight ? 'greater' : 'less') + '-height');
    return (
      <div ref='container' className={classNames.join(' ')}>
        <Voucher meta={metaTemplate} viewModel={viewModel} width={width} height={height} index={index} returnCallback={this.handleReturn} homeCallback={this.goHome} />
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    portal: state.portal.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // tabsactions: bindActionCreators(tabsactions, dispatch),
    portalactions: bindActionCreators(portalactions, dispatch),
    // modalactions: bindActionCreators(modalactions, dispatch),
    // execHandler: bindActionCreators(execHandler, dispatch)
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meta);
