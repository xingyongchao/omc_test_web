import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import Container from '../meta/Container';
import TitleTips from '../meta/TitleTips';
import Toolbar from '../meta/Toolbar';

import * as ModalIndex from '../modal';
import * as ExternalModal from '../../../../common/components/modal';

import * as dynamicModalActions from '../../redux/dynamicModal';

const ModalMap = {};
Object.assign(ModalMap, ModalIndex);
Object.assign(ModalMap, ExternalModal);

class DynamicModal extends Component {
  close() {
    const { dynamicModalActions } = this.props;
    dynamicModalActions.closeModal();
  }
  handleOk(viewModel, groupCode) {
    viewModel.promiseExecute('afterOkClick', { key: groupCode }, () => {
      this.close();
    });
  }
  handleSave = () => {
    const { dynamicModal, dynamicModalActions } = this.props;
    const viewModel = dynamicModal.content.vm;
    const beforeSave = (beforeActData, callback) => {
      beforeActData.close = function () {
        dynamicModalActions.closeModal();
      };
      viewModel.promiseExecute('beforeSave', beforeActData, callback);
    };
    const afterSave = (afterActData, callback) => {
      viewModel.promiseExecute('afterSave', afterActData, function () {
        callback && callback(afterActData);
      });
    };
    viewModel.biz.action().save(viewModel.getParams().billNo, viewModel, null, beforeSave, function (afterSaveData) {
      afterSave(afterSaveData, function () {
        if (afterSaveData.err) {
          cb.utils.alert(afterSaveData.err.message, 'error');
          return;
        }
        dynamicModalActions.closeModal();
        const parentViewModel = viewModel.getCache('parentViewModel');
        if (parentViewModel)
          parentViewModel.execute('back');
      });
    });
  }
  render() {
    const { dynamicModal } = this.props;
    if (!dynamicModal.showModal)
      return null;
    const { groupCode, viewModel, title, content } = dynamicModal;
    if (groupCode) {
      const meta = viewModel.getViewMeta(groupCode);
      const containerType = meta.cControlType && meta.cControlType.trim().toLocaleLowerCase();
      if (containerType === 'modal') {
        const container = Object.assign({}, meta, { cControlType: 'div' });
        const width = 800;
        return (
          <Modal className='Table' visible title={meta.cName} width={846} onOk={() => this.handleOk(viewModel, groupCode)} onCancel={() => this.close()} width={width} maskClosable={false}>
            <Container className='modal-container' meta={container} viewModel={viewModel} width={width} parents='Modal' />
          </Modal>
        );
      }
      return null;
    }
    if (content) {
      const { iWidth, containers } = content.metaData.view;
      const toolbarIndex = containers.findIndex(item => {
        return item.cControlType && item.cControlType.trim().toLocaleLowerCase() === 'toolbar';
      });
      let cStyle = containers[0].cStyle;
      let config = [];
      let modelclassname;
      if (cStyle) {
        try {
          cStyle = JSON.parse(cStyle);
          config = cStyle.config || [];
          modelclassname = cStyle.modelclassname;
        } catch (e) {
          config = []
        }
      }
      let extraConfig = {
        visible: true,
        maskClosable: false,
        width: iWidth
      }
      if (modelclassname) {
        extraConfig.className = modelclassname
      }
      if (toolbarIndex > -1) {
        extraConfig.footer = <Toolbar controls={containers[toolbarIndex].controls} model={content.vm} />
        containers.splice(toolbarIndex, 1);
      } else {
        extraConfig.onOk = this.handleSave
      }
      return (
        <Modal {...extraConfig} title={<div>{title}{config.length ? <TitleTips config={config} /> : null}</div>} onCancel={() => this.close()}>
          <Container meta={content.metaData.view} viewModel={content.vm} width={iWidth} parents='Modal' />
        </Modal>
      );
    }
    const ComName = ModalMap[dynamicModal.key];
    if (!ComName)
      return null;
    return <ComName {...dynamicModal.data} close={() => this.close()} />;
  }
}

function mapStateToProps(state) {
  return {
    dynamicModal: state.dynamicModal.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dynamicModalActions: bindActionCreators(dynamicModalActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicModal);
