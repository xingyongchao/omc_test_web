import React, { Component } from 'react';
import { Row, Checkbox, Button, Popover, Tag, Icon,Input } from 'antd';
import FileUpload from '../file-upload';
import PictureBook from '../picturebook';
const Search = Input.Search;

export default class TagGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord:'',
      popKeyField: 'id',
      popDataSource:[],
      bAllCheck:true // 预设全选
    };
    this.popVisible = {};
    this.checkboxValue = {};
    this.popCheckboxValue = {};
    this.focusedIndex = null;
  }
  componentDidMount() {
    this.props.model.addListener(this);
  }
  componentWillUnmount() {
    this.props.model.removeListener(this);
  }
  open = (e) => {
    this.referViewModel = e.vm;
    this.gridModel = e.vm.get('table');
    this.gridModel.addListener(this);
  }
  setDataSource(dataSource) {
    this.setState({ popDataSource: dataSource });
  }
  setListenerState(params, propertyName) {
    if (propertyName === 'table') return;
    const { keyField, checkField, childrenField, refer2BillKeyFieldMap, value } = params;
    delete params.keyField;
    delete params.value;
    this.setState(params);
    this.state.keyField = keyField;
    this.state.checkField = checkField;
    this.state.childrenField = childrenField;
    this.state.billKeyField = refer2BillKeyFieldMap[this.state.popKeyField];
    this.setValue(value || []);
  }
  setValue(data) {
    if (!data) return;
    const { keyField, checkField, billKeyField } = this.state;
    const value = {};
    this.popCheckboxValue = {};
    data.forEach((element, index) => {
      element.index = index;
      const key = element[keyField];
      if (!value[key])
        value[key] = { children: [] };
      this.checkboxValue[key] = element[checkField];
      value[key].children.push(element);
      this.popCheckboxValue[element[billKeyField]] = true;
    });
    this.setState({ value });
  }
  handleOkClick(key) {
    const { popDataSource, checkField, popKeyField } = this.state;
    const rows = [];
    popDataSource.forEach(item => {
      if (!this.popCheckboxValue[item[popKeyField]]) return;
      const row = {};
      row[checkField] = this.checkboxValue[key];
      rows.push(Object.assign(row, item));
    });
    this.props.model.setValue(rows, true);
    this.handleCancelClick(key);
  }
  handleCancelClick(key) {
    this.popVisible[key] = false;
    this.setState({ popVisible: false});
  }
  onVisibleChange = (key, visible) => {
    this.popVisible[key] = visible;
    this.setState({ popVisible: visible });
  }
  handleAddClick(key) {
    const { keyField, bill2ReferKeyFieldMap } = this.state;
    const referKeyField = bill2ReferKeyFieldMap[keyField];
    this.props.model.setFilter({ isExtend: true, simpleVOs: [{ field: referKeyField, op: 'eq', value1: key }] });
    this.props.model.browse(true);
    this.popVisible[key] = true;
    this.setState({ popVisible: true,searchWord:''});
  }
  onClose(e, index) {
    e.preventDefault();
    this.props.model.deleteItem(index);
  }
  checkboxChange(key, checked) {
    const { checkField, value } = this.state;
    const tagValue = value[key];
    if (tagValue) {
      const { children } = tagValue;
      if (children.length) {
        children.forEach(item => {
          this.props.model.setCellValue(item.index, checkField, checked);
        });
        return;
      }
    }
    this.checkboxValue[key] = checked;
    this.setState({ popVisible: true });
  }
  handlePopCheckbox(key, checked) {
    this.popCheckboxValue[key] = checked;
    this.setState({ popVisible: true });
  }
  setFocused(index) {
    this.props.model.setFocusedRowIndex(index);
    this.focusedIndex = index;
    this.setState({ popVisible: true });
  }
  onDelete = (indexes, index) => {
    this.props.model.setFocusedRowIndex(index);
    this.focusedIndex = index;
    this.setState({ popVisible: true });
    const { childrenField } = this.state;
    const model = this.props.model.getEditRowModel().get(childrenField);
    model.deleteItems(indexes);
  }
  clearSearchWord(){
    this.setState({searchWord:''})
  }
  renderImg(element) {
    const { index } = element;
    const { childrenField } = this.state;
    const model = this.props.model.getEditRowModel().get(childrenField);
    if (index === this.focusedIndex) {
      return (
        <PictureBook modelIndex={index} model={model} />
      );
    }
    return (
      <PictureBook modelIndex={index} onDelete={(indexes) => this.onDelete(indexes, index)} readOnly={this.state.readOnly} bill2ReferKeyFieldMap={model.get('bill2ReferKeyFieldMap')} dataSource={element[childrenField]} onClick={() => this.setFocused(index)} />
    );
  }
  onAllCheckChange(checked){
    const { popDataSource, popKeyField} = this.state;
    popDataSource.forEach((item, index) => {
      const popKey = item[popKeyField];
      this.handlePopCheckbox(popKey,checked)
    });
  }
  renderTagItem(value, checked) {
    const { textField } = this.state;
    if (!value || !value.length)
      return null;
    const items = [];
    value.forEach(element => {
      items.push(<div className='pic-book-list'>
        <Tag closable={!this.state.readOnly} onClose={(e) => this.onClose(e, element.index)}>{element[textField]}</Tag>
        {checked ? this.renderImg(element) : null}
      </div>);
    });
    return items;
  }
  handleSearch(value){
    this.setState({searchWord:value})
  }
  handleChange(e){
    this.setState({searchWord:e.target.value})
  }
  getPopControl(key) {
    let { popDataSource, popKeyField,bAllCheck,searchWord} = this.state;
    if (!popDataSource || !popDataSource.length)
      return null;
    const items = [];
    let _popDataSource=[];
    if(!searchWord){
      _popDataSource = popDataSource;
    }else if(searchWord && popDataSource.length){
      popDataSource.forEach(v=>{
        if(v.name.indexOf(searchWord)>=0){
          _popDataSource.push(v)
        }
      })
    }
    if(_popDataSource.length){
      _popDataSource.forEach((item, index) => {
        const popKey = item[popKeyField];
        const checked = this.popCheckboxValue[popKey];
        bAllCheck = bAllCheck && checked
        items.push(<li><Checkbox checked={checked} onChange={(e) => this.handlePopCheckbox(popKey, e.target.checked)}>{item.name}</Checkbox></li>)
      });
    }else{
      items.push(<li className='no-item'>没有规格值</li>)
    }
    return <div className='ant-popover-filter-list'>
      <div className='filter-list-search'>
        <Search
          value={searchWord}
          onSearch={value=>this.handleSearch(value)}
          onChange={e=>this.handleChange(e)}
          onPressEnter={e=>this.handleChange(e)}
        />
        {
          searchWord.length ? 
          <span onClick={()=>this.clearSearchWord()} className='filter-list-search-delete'>
            <i className='anticon anticon-cross-circle ant-cascader-picker-clear'></i>
          </span> : null
        }
      </div>
      <div className='filter-list'>
        <ul className='filter-list-content'>{items}</ul>
      </div>
      <div className="filter-btn-1" style={{position:"static"}}>
        <Checkbox checked={bAllCheck} onChange={(e) => this.onAllCheckChange(e.target.checked)}>全选</Checkbox>
        <Button type="primary" onClick={() => this.handleOkClick(key)}>保存</Button>
        <Button type="default" onClick={() => this.handleCancelClick(key)}>取消</Button>
      </div>
    </div>
  }
  renderTag(item) {
    const { value, text } = item;
    const data = this.state.value[value] || {};
    const checked = this.checkboxValue[value];
    return (
      <Row>
        <Checkbox checked={checked} disabled ={this.state.readOnly} onChange={(e) => this.checkboxChange(value, e.target.checked)}>图片</Checkbox>
        <div className="pic-book-title"><span>{text}</span></div>
        {this.renderTagItem(data.children, checked)}
        {
          this.state.readOnly ?
            ""
            :
            <Popover arrowPointAtCenter autoAdjustOverflow placement = 'bottom' visible={this.popVisible[value]} content={this.getPopControl(value)} trigger='click' onClick={this.onPopClick} onVisibleChange={(visible) => this.onVisibleChange(value, visible)}>
              <Button className="btn-add" onClick={() => this.handleAddClick(value)}><Icon type="jia" />添加规格值</Button>
            </Popover>
        }
      </Row>
    );
  }
  render() {
    const { dataSource } = this.state;
    if (!dataSource || !dataSource.length)
      return null;
    const items = [];
    dataSource.forEach(item => {
      items.push(this.renderTag(item));
    });
    return (
      <div className='pic-book'>
        {items}
      </div>
    );
  }
}
