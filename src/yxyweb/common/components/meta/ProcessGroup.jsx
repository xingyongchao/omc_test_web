/**
 * 每个node表示一个进程节点
 *title:节点标题
 *order：顺序，返回的集合已排序，可直接按集合顺序显示
 *value：节点完成百分比，0-100整数，用于绘制圆圈
 *statusStyle：节点圆圈内部的显示样式，image=显示图片，text=显示文字，percent=显示百分比（文字和百分比类型前端可不处理，直接显示status值即可，）
 *status：节点圆圈内部的显示内容，statusStyle=image时，status=图片资源名称，statusStyle=text时，status=文本内容，statusStyle=percent时，status=value+’%'
 *actionStyle：节点动作的显示样式，button=按钮（可执行操作），text=显示文字（不执行操作）
 *actionText：节点动作的按钮文本或静态文本
 *command：仅当actionStyle=button时有效，指定button的命令名称
 *summary：摘要信息，显示为节点浮动提示。
 */
import React, { Component } from 'react';
import { Progress, Icon, Popover } from 'antd';
import { Row, Col, Button } from '../basic';

export default class ProcessGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }
  getData() {
    const { billNo, id } = this.props.viewModel.getParams();
    if (!id) return;
    const proxy = cb.rest.DynamicProxy.create({
      getData: {
        url: '/process/' + billNo + '/' + id,
        method: 'GET',
        options: {
          uniform: false
        }
      }
    })
    proxy.getData((err, data) => {
      if (err) {
        cb.utils.alert(err.message, 'error');
        return;
      }
      if (data && data.nodes && data.nodes.length)
        this.bindcontrol(data.nodes);
    })
  }
  componentDidMount() {
    this.props.viewModel.on('afterLoadData', data => {
      this.getData();
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.value === this.state.value) return;
    this.props.viewModel.execute('afterRenderComponent');
  }
  bindcontrol(nodes) {
    nodes.map((node, index) => {
      if (node.actionStyle == 'button') {
        let key = node.nodeKey;
        if (!viewmodel.get(key)) {
          node.needClear = false;
          let model = new cb.models.SimpleModel(node);
          viewmodel.addProperty(key, model);
        }
      }
    });
    this.setState({
      value: nodes
    })
  }
  format(option) {
    if (option.statusStyle == 'image') {
      // 暂时先用actionText，后面应该用value
      // const suffix = option.actionText ? '_hover' : '';
      const suffix = option.value && option.value !== '0' ? '_hover' : '';
      const href = '#icon-' + option.status + suffix;
      return <svg className="icon" aria-hidden="true"><use href={href}></use></svg>
    } else {
      return option.status;
    }
  }
  getCircle(option, content) {
    return <div className='process-icon'>{this.format(option)}</div>
    let circle = <Progress type="circle" percent={option.value} format={() => this.format(option)} width={60} status="active" />
    if (content) {
      return <Popover content={content} placement="right" trigger="hover">
        {circle}
      </Popover>
    } else {
      return circle;
    }
  }
  getText(option) {
    let text,
      self = this;
    if (option.actionStyle == 'button') {
      let viewmodel = this.props.model;
      let key = option.nodeKey
      let model = viewmodel.get(key);
      let callback = (params) => {
        let action = viewmodel.allActions.find((x) => {
          return x.cCommand == option.command
        });
        if (action) {
          var args = cb.utils.extend(true, {}, action, {
            key: key
          });
          viewmodel.biz.do(action.cAction, viewmodel, args);
        }
      }
      text = <div><Button onClick={callback} type="ghost" size="small" model={model} className="manageButton" value={option.actionText} /></div>;
    } else {
      const actionText = option.actionText ? new Date(option.actionText).format('yyyy-MM-dd hh:mm') : null;
      text = <div>{actionText}</div>
    }
    return (
      <div className="process-tipContent">
        <div className="title">{option.title}</div>
        {text}
      </div>
    );
  }
  getIcon(index, length) {
    if (index + 1 < length) {
      return <Icon type="right" className="process-rightIcon" />;
    }
  }
  getContent(option) {
    if (option.summary) {
      return (<div>{option.summary}</div>);
    }
  }
  getControl() {
    let options = this.state.value;
    return options.map((option, index) => {
      let content = this.getContent(option);
      let circle = this.getCircle(option, content);
      let text = this.getText(option);
      let nextIcon = this.getIcon(index, options.length);
      return (
        <div key={option.id} className="m-t-10">
          {circle}
          {text}
          {nextIcon}
        </div>
      );
    })
  }
  render() {
    let control = this.getControl();
    return (
      <Row>
        <Col span={'all'} className="processContent">{control}</Col>
      </Row>
    );
  }
}
