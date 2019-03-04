import React, { Component } from 'react';

export default class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: []
    }
    var proxy = cb.rest.DynamicProxy.create({
      getCusDigest: {
        url: 'cus/getCusDigest',
        method: 'POST',
        options: {
          token: true
        }
      }
    });
    proxy.getCusDigest({ cusid: this.props.viewModel.getParams().id }, function (err, result) {
      if (err) {
        console.error(err.message);
        return;
      }
      this.setState({ dataList: result });
    }, this);
  }
  statusClick(e, type) {

  }
  render() {
    let dataSource = this.state.dataList;
    if (!dataSource.length)
      return null;
    // [{ cShowCaption: '安装工单', unit: '个', count: '16', type: 'aa' },
    // { cShowCaption: '服务工单', unit: '个', count: '24', type: 'aa' },
    // { cShowCaption: '400客服', unit: '个', count: '0', type: 'aa' },
    // { cShowCaption: '服务商', unit: '个', count: '3', type: 'aa' },
    // { cShowCaption: '未付款工单', unit: '个', count: '6', type: 'aa' },
    // { cShowCaption: '需支付费用', unit: '元', count: '7654321', type: 'price' }
    // ];
    let controls = [];
    dataSource.forEach(item => {
      if (item.unit == '元')
        item.value = (item.value * 1).formatMoney(2, '');
      controls.push(<li key={item.title} onClick={(e) => this.statusClick(e, item.title, item.status)}><h1>{item.title}</h1><h3>{item.value}<em>{item.unit}</em></h3></li>);
    });
    return (
      <ul className='list'>{controls}</ul>
    );
  }
}
