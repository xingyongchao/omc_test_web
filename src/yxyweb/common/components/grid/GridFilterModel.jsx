import React from 'react';
import { Input, Popover, Icon } from 'antd';
import { Button } from '../basic';
import SvgIcon from 'SvgIcon';
const SearchBox = Input.Search;

export default class GridFilterModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSort: false,
      lookUp_visible: false,
      showLookUp: false,
      lookUpValue: "",
      bSort: false,
      bLookUp: false,
    };
    this.sorttext = '';
  }
  componentWillReceiveProps(nextProps) {
    let { Column, sortColumn, lookUpKey } = nextProps;
    let bSort = sortColumn == Column.cItemName ? true : false;
    let bLookUp = lookUpKey == Column.cItemName ? true : false;
    this.setState({ bSort, bLookUp });
  }
  onMouseEnter(e) {
    let fixedtableState = this.props.fixedtable ? this.props.fixedtable.state : null;
    if (fixedtableState && fixedtableState.isColumnResizing) return
    this.setState({
      showSort: true, showLookUp: true
    });
  }
  onMouseLeave(e) {
    let fixedtableState = this.props.fixedtable ? this.props.fixedtable.state : null;
    if (fixedtableState && fixedtableState.isColumnResizing) return
    let obj = { showSort: this.state.showSort, showLookUp: this.state.showLookUp };
    if (!this.state.bSort) obj.showSort = false;
    if (!this.state.bLookUp && !this.state.lookUp_visible) obj.showLookUp = false;
    this.setState(obj);
  }
  //表头排序点击事件
  filterClick(key) {
    if(!this.props.readOnly) return;
    var filterdata = { sort: '', key, search: '', filter: [] };
    var cItemName = this.props.Column.cItemName;
    if (key === 'ASC') {
      this.sorttext = 'DESC';
      filterdata.sort = 'DESC';
    } else if (key == 'DESC') {
      this.sorttext = 'ASC';
      filterdata.sort = 'ASC';
    } else {
      if (this.sorttext == 'DESC') {
        this.sorttext = 'ASC';
        filterdata.sort = 'ASC';
      } else if (this.sorttext == '' || this.sorttext == 'init') {
        this.sorttext = 'DESC';
        filterdata.sort = 'DESC';
      } else {/*恢复*/
        this.sorttext = 'init';
        filterdata.sort = 'init';
        cItemName = "";
      }
    }
    this.props.onSortChange(cItemName);
    // this.setState({
    //   showSort: false
    // });
    this.props.model.setFilter(this.props.attr, this.props.Column, filterdata);
  }
  //表头 升序 降序 无序 组织
  Sort() {
    if (!this.props.readOnly) return null;
    let upClass = '', downClass = '';
    if (this.sorttext == 'DESC') {
      upClass = 'ant-btn-icon-active';
    }
    if (this.sorttext == 'ASC') {
      downClass = 'ant-btn-icon-active';
    }
    if (this.state.bSort || this.state.showSort)
      return (
        <div className='btn-caret'>
          <Button className={upClass} style={{ borderWidth: 0 }} type="ghost" icon="caret-up" onClick={() => this.filterClick('ASC')} />
          <Button className={downClass} style={{ borderWidth: 0 }} type="ghost" icon="caret-down" onClick={() => this.filterClick('DESC')} />
        </div>
      )
    else
      return <div className='btn-caret'></div>
  }
  getStringLength = (str) => {
    if (!str) str = '';
    let realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) {
        realLength += 1;
      } else {
        realLength += 2;
      }
    }
    return realLength
  }
  onChange = (e) => {
    this.setState({ "lookUpValue": e.target.value });
  }
  onSearch = (value, type) => {
    let { data, attr, lookUpRow } = this.props;
    if (cb.utils.isEmpty(value)) value = null;
    let indexes = [];
    if (!data || data.length == 0) return
    for (var i = 0; i < data.length; i++) {
      let row = data[i];
      let val = row[attr];
      let text = val;
      if (typeof val == 'object') {
        text = val.text;
      }
      if (!cb.utils.isEmpty(text)) {
        if (text.toString().indexOf(value) != -1) {
          indexes.push(i);
        }
      }
    }
    if (indexes.length == 0) {
      this.props.moveLookUpRow([], -1, '');
      cb.utils.alert('未搜索到匹配的行！', 'error');
      return;
    }
    let index = indexes.indexOf(lookUpRow);
    if (index == -1) {
      lookUpRow = indexes[0];
      index = 0;
    }
    if (type == 'up' && index != 0)
      lookUpRow = indexes[index - 1];
    if (type == 'down' && index != indexes.length - 1)
      lookUpRow = indexes[index + 1];
    var cItemName = this.props.Column.cItemName;
    this.props.moveLookUpRow(indexes, lookUpRow, cItemName);
  }
  onVisibleChange = (visible) => {
    let obj = { "lookUp_visible": visible };
    if (!visible) {
      obj.showSort = false;
      if (cb.utils.isEmpty(this.state.lookUpValue)) {
        this.props.moveLookUpRow([], -1);
        obj.showLookUp = false;
      }
    }
    this.setState(obj);
  }
  getLookUpControl = () => {
    const content = (
      <div className="grid-header-">
        <SearchBox value={this.state.lookUpValue} onChange={this.onChange} placeholder="请输入定位内容" onSearch={this.onSearch} />
        <SvgIcon type="shangyitiao-copy" onClick={() => this.onSearch(this.state.lookUpValue, 'up')} />
        <SvgIcon type="xiayitiao-copy" onClick={() => this.onSearch(this.state.lookUpValue, 'down')} />
        <SvgIcon type="guanbi1" onClick={() => this.onVisibleChange(false)} />
      </div>
    );
    return (
      <Popover overlayClassName="lookup-pop" onVisibleChange={this.onVisibleChange} trigger={'click'}
        visible={this.state.lookUp_visible} content={content} placement="top" arrowPointAtCenter={true}>
        <SvgIcon type={this.state.bLookUp ? "shaixuan1-copy" : "shaixuan1"} />
      </Popover>
    )
  }
  render() {
    let control, Column = this.props.Column;
    var Sort = (this.props.multiSort && this.props.tableClass != 'rptTable') ? this.Sort() : null;
    var lookUpControl = this.state.showLookUp ? this.getLookUpControl() : null;
    let bIsNull = Column.bIsNull;
    const id = Column.index;
    let textColWidth = this.props.width - 25;
    let nameLen = this.getStringLength(this.props.name);
    if (textColWidth > nameLen * 6.5) {
      textColWidth = nameLen * 6.5;
      if (bIsNull == false && !this.props.readOnly) textColWidth += 9;
    }
    let headerName = this.props.name;
    if (!bIsNull && this.props.readOnly != true) {
      headerName = <div><span className="headerNameTips">* </span>{this.props.name}</div>;
    }
    control = (
      <div style={{ textAlign: 'left', width: this.props.width, display: "flex" }} onMouseEnter={(e) => this.onMouseEnter(e)} onMouseLeave={(e) => this.onMouseLeave(e)} id={id}>
        <span onClick={() => this.filterClick('')} className="textCol table-header-name sort-header">{headerName}</span>
        {Sort}
        {lookUpControl}
      </div>
    );
    return control;
  }
}
