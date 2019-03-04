import React from 'react';
import { Switch, Input } from 'antd';
import { Row, Col, Button } from '../basic';
const SearchBox = Input.Search;

export default class ReferToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (this.props.model) {
      this.props.model.addListener(this);
      this.searchBoxModel = this.props.model.get('searchBox');
      this.searchBoxModel.addListener(this);
    }
  }
  componentWillUnmount() {
    if (this.props.model) {
      this.props.model.removeListener(this);
      this.searchBoxModel = this.props.model.get('searchBox');
      this.searchBoxModel.removeListener(this);
    }
  }
  handleOnChange(args) {
    console.log(args);
    if (this.props.model)
      this.props.model.get('switch').execute('change', args);
  }
  handleOnSearch(value) {
    if (this.props.model)
      this.searchBoxModel.execute('search', value);
  }
  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  }
  handleInputBlur = e => {
    let value = e.target.value === '' ? null : e.target.value;
    if (this.props.model)
      this.searchBoxModel.setValue(value, true);
  }
  render() {
    return (
      <Row className='refer-toolbar'>
        <div style={{ float: 'left', display: this.props.filterId ? 'none' : '' }}>
          <SearchBox value={this.state.value} onChange={this.handleInputChange} onBlur={this.handleInputBlur} placeholder={this.state.placeholder || '请输入'} onSearch={e => this.handleOnSearch(e)} />
        </div>
        <div style={{ float: 'right' }}>
          <Button model={this.props.model.get('reload')} value='显示全部' />
        </div>
      </Row>
    );
    return (
      <Row colCount={24} className='refer-toolbar'>
        <Col span={8}>
          <SearchBox value={this.state.value} onChange={this.handleInputChange} onBlur={this.handleInputBlur} placeholder='请输入' onSearch={e => this.handleOnSearch(e)} />
        </Col>
        <Col span={5} offset={11} style={{ textAlign: 'right' }}>
          {/* <Switch defaultChecked={true} checkedChildren={'全部'} unCheckedChildren={'已选'} onChange={e => this.handleOnChange(e)} className="longSwitch" model={this.props.model.get('switch')} /> */}
          <Button type="ghost" icon="reload" shape='circle-outline' model={this.props.model.get('reload')} className="m-l-10 no-border" />
        </Col>
      </Row>
    );
  }
};
