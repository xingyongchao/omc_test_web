import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, InputItem } from 'antd-mobile';
import { ReferModel } from '../refer';

export default class ReferControl extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.model) {
      this.props.model.addListener(this);
    }
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }

  open(e) {
    this.setState({ vm: e.vm });
    e.vm.get('table')._set_data('override', false);
    let control;
    control = (
      <ReferModel vm={e.vm} model={this.props.model} okClick={this.okClick} close={this.close.bind(this)} />
    )
    this.props.referStatus(control, true)
  }
  close() {
    if (this.props.referStatus)
    this.props.referStatus(null, false);
    else
      this.context.router.history.goBack();
  }
  handClick() {
    if (this.state.disabled) return;
    let model = this.props.model || this.model;
    if (!model && this.props.cRefType) {
      //当不存在时
    }
    const { rowItem, rowModel } = this.props;
    if (!this.props.referStatus) {
      let pathList = window.location.pathname.split('/');
      let pathname = pathList[pathList.length - 1];
      if(rowModel){
        this.context.router.history.push(`/voucherRefer/${pathname}/${this.state.cItemName}/${rowItem.childrenField}`);
      }else{
        this.context.router.history.push(`/voucherRefer/${pathname}/${this.state.cItemName}`);
      }
      return;
    }
    if (model) {
      model.browse(true);
    }
  }
  setValue = (value) => {
    this.setState({ value });
  }
  okClick = () => {
    this.state.vm.okClick();
    this.close();
  }

  render() {
    if (!this.state) {
      return null;
    }
    let name = '请选择'; let className = "";
    if (this.state && this.state.value && !cb.utils.isEmpty(this.state.value)) {
      className = "uretail_refer"
      name = this.state.value;
    }
    if (this.state.readOnly)
      return <List>
        <InputItem className={className} disabled={true} value={this.state.value}>{this.state.cShowCaption}</InputItem>
      </List>
    return (
      <div className={className}>
        <List>
          <List.Item onClick={this.handClick.bind(this)} className="store-list" arrow="horizontal" extra={name}>{this.props.title || this.state.cShowCaption}</List.Item>
        </List>
      </div>
    )
  }

}
