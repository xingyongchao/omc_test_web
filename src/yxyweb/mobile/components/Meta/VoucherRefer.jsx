import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ReferModel } from '../refer';

class VoucherRefer extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    let params = props.match.params;
    this.state = {
      itemName: params.itemName,
      menuId: params.menuId,
      parentItem: params.parentItem
    }
  }

  componentDidMount() {
    const { location } = this.props;
    const { menuId, itemName, parentItem } = this.state;
    const panes = this.props.portal.tabs[menuId].panes;
    if (panes && panes.length > 0) {
      if (parentItem)
        this.model = panes[panes.length - 1].content.vm.get(parentItem).getEditRowModel().get(itemName);
      else
        this.model = panes[panes.length - 1].content.vm.get(itemName);
      if (this.model) {
        this.model.addListener(this);
        this.model.browse(true);
      }
    }
  }

  open(e) {
    this.setState({ vm: e.vm });
    e.vm.get('table')._set_data('override', false);
    // this.props.referStatus(control, true);
  }

  componentWillUnmount() {
    if (this.model)
      this.model.removeListener(this);
  }

  okClick = () => {
    this.state.vm.okClick();
    this.context.router.history.goBack();
  }
  render() {
    const { vm } = this.state;
    if (!vm || !this.model)
      return null;
    return <div className='Return-reference'><ReferModel vm={vm} model={this.model} okClick={this.okClick} /></div>
  }
}

function mapToPropsState(state) {
  return {
    portal: state.portal.toJS()
  }
}

// function mapToPropsDispatch(dispatch){
//   return {
//   }
// }

export default connect(mapToPropsState)(VoucherRefer)
