import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PortalTabItem from './PortalTabItem';
import { metaInit } from 'yxyweb/common/redux/portal';

class DynamicView extends Component {
  constructor(props) {
    super(props);
    const { match, params } = props;
    const { menuurl, billtype, billno, billid } = match && match.params || params;
    this.state = {
      index: menuurl || billno,
      menuurl,
      billtype,
      billno,
      billid,
    };
  }
  pushCallback(index, content) {
    const { metaInit, push } = this.props;
    this.props.metaInit(index, { content });
    this.props.push(`/meta/${index}`);
  }
  componentDidMount() {
    const { index, menuurl, billtype, billno, billid } = this.state;
    if (menuurl) {
      this.pushCallback(index, { type: 'platform', url: menuurl });
      return;
    }
    const data = { billtype, billno };
    if (billid)
      data.params = billid === 'add' ? { mode: 'add' } : { mode: 'edit', id: billid };
    else
      data.params = { query: cb.rest.AppContext.query };
    cb.loader.runCommandLine('bill', data, null, (vm, viewmeta) => {
      this.pushCallback(index, { vm, metaData: viewmeta });
    });
  }
  render() {
    return <h1>加载中...</h1>
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: bindActionCreators(push, dispatch),
    metaInit: bindActionCreators(metaInit, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DynamicView);
