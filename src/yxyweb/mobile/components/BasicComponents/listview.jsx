import React, { Component } from 'react';
import { ListView, PullToRefresh, Icon, Checkbox, ActionSheet } from 'antd-mobile';
import { getPredicateValue, getRoundValue } from 'yxyweb/common/helpers/util';
import * as format from '../../../common/helpers/formatDate';
require('src/mobile/styles/globalCss/listview.css');
import SvgIcon from 'SvgIcon';
const CheckboxItem = Checkbox.CheckboxItem;

export default class ListViewControl extends Component {
  constructor(props) {
    super(props);
    this.listViewDataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.dataIndex = [];
    this.state = {
      dataSource: this.listViewDataSource.cloneWithRows(this.dataIndex),
      isShowRTop: false,
      refreshing: this.props.refreshing,
    }
  }
  componentWillReceiveProps(nextProps) {
    const { isLoading, refreshing, isEdit } = this.props;
    const nextIsLoading = nextProps.isLoading;
    const nextEdit = nextProps.isEdit;
    const nextDataSource = nextProps.dataSource;
    const nextRefresing = nextProps.refreshing;
    const selectIndexes = JSON.stringify(this.props.selectIndexes);
    const nextSelectIndexes = JSON.stringify(nextProps.selectIndexes);
    if (isLoading != nextIsLoading || refreshing != nextRefresing || selectIndexes != nextSelectIndexes
      || isEdit != nextEdit) {
      this.initListData(nextDataSource);
      return true;
    }
  }
  /*初始化ListView 需要dataSource*/
  initListData = (data) => {
    if (!data)
      data = this.props.dataSource;
    data.map((item, index) => {
      this.dataIndex.push(`row-${index}`);
    });
    this.setState({
      dataSource: this.listViewDataSource.cloneWithRows(this.dataIndex),
      refreshing: false
    })
  }
  /*上拉加载*/
  onEndReached = (event) => {
    this.props.loadMore();
  }
  /*下拉刷新*/
  onRefresh = () => {
    this.props.refreshList();
  }
  onRowClick = (e, rowID) => {
    this.props.onRowClick(e, rowID)
  }
  loopRow = (rows, columns, rowData) => {
    if (!rows) return null;
    let rowControls = [];
    rows.map(row => {
      let cols = [];
      if (row.cols) cols = this.loopCol(row.cols, columns, dataSource[rowID]);
      rowControls.push(
        <div className="row">{cols}</div>
      )
    });
    return rowControls;
  }
  loopCol = (cols, columns, rowData) => {
    if (!cols) return null;
    let controls = [];
    cols.map(col => {
      let { className, cItemName, showCaption, span, rows, float } = col;
      let colClass = (className ? className : '') + ' col', control, column = columns[cItemName];
      if (span != 0) colClass = colClass + ' span-' + span;
      if (float == 'left')
        colClass = colClass + ' floatLeft';
      else
        colClass = colClass + ' floatRight';
      if (rows) {
        control = this.loopRow(rows, columns, rowData);
      } else {
        if (showCaption) {
          control = [];
          control.push(<span className="name">{column.cShowCaption}</span>);
          control.push(<span className="value">{rowData[cItemName]}</span>);
        } else {
          control = <span className="value">{rowData[cItemName]}</span>;
        }
      }
      controls.push(
        <div className={colClass}>{control}</div>
      )
    });
    return controls;
  }
  getRow = (columns, rowData) => {
    let controls = [];
    for (var key in columns) {
      let { cShowCaption, iAlign, cStyle, cItemName } = columns[key];
      let colClass = 'col', colControls = [], align = '';
      let itemValue = this.getFormatValue(columns[key], rowData[cItemName]);

      if (cb.utils.isEmpty(cShowCaption)) {
        colControls.push(<span className="value">{itemValue}</span>);
      } else {
        colControls.push(<span className="name">{cShowCaption + ":  "}</span>);
        colControls.push(<span className="value">{itemValue}</span>);
      }
      try {
        if (cb.utils.isEmpty(cStyle)) {
          cStyle = null;
        } else {
          cStyle = JSON.parse(cStyle);
        }
      } catch (e) {
        cb.utils.alert('格式化字段，预制错误！', 'error');
      }
      if (cStyle) {
        if (cStyle.className)
          colClass = colClass + ' ' + cStyle.className;
      }
      if (iAlign) {
        if (iAlign == 1) align = 'textAlignLeft';
        if (iAlign == 2) align = 'textAlignCenter';
        if (iAlign == 3) align = 'textAlignRight';
      } else {
        align = 'textAlignLeft'
      }
      colClass = colClass + ' ' + align;
      controls.push(
        <div className={colClass}>{colControls}</div>
      )
    }
    return controls
  }
  getFormatValue = (col, value) => {
    const cControlType = col.cControlType && col.cControlType.trim().toLocaleLowerCase()
    switch (cControlType) {
      case 'select':
        if (cb.utils.isEmpty(value))
          return '';
        let formatText = null;
        if (typeof value !== 'object')
          formatText = value;
        else if (value.nameType === 'icontext')
          formatText = <span><Icon type={value.icon} />{value.text}</span>
        else if (value.nameType === 'icon')
          formatText = value.icon ? <Icon type={value.icon} /> : '';
        else
          formatText = value.text;
        return formatText;
      case 'inputnumber':
      case 'money':
      case 'price':
        if (cb.utils.isEmpty(value)) return '';
        if (isNaN(value)) return value;

        /*谓词变量支持系统参数*/
        let cFormatData = col.cFormatData;
        try {
          if (!cFormatData || cFormatData == '') {
            cFormatData = {};
          } else {
            cFormatData = JSON.parse(cFormatData);
          }
        } catch (e) {
          cb.utils.alert('数量/金额/单价，预制错误！', 'error');
        }
        let iNumPoint = col.iNumPoint;
        let decimal = cFormatData.decimal ? getPredicateValue(cFormatData.decimal) : null;
        if (cControlType === 'money') {
          if (decimal)
            iNumPoint = decimal;
          else
            iNumPoint = cb.rest.AppContext.option.amountofdecimal;
        }
        else if (cControlType === 'price') {
          if (decimal)
            iNumPoint = decimal;
          else
            iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
        } else {
          if (decimal)
            iNumPoint = decimal;
          else
            if (cb.utils.isEmpty(iNumPoint)) iNumPoint = null;
        }

        if (!isNaN(iNumPoint) && iNumPoint != null) {
          value = parseFloat(value);
          value = getRoundValue(value, iNumPoint);
        }

        if (cFormatData.after) value = value + cFormatData.after;
        if (cControlType === 'price' || cControlType === 'money') {
          if (value < 0) {
            value = "-￥" + Math.abs(value);
          } else {
            value = "￥" + value;
          }
        }
        return value;
      case 'datepicker':
        if (value) {
          let fmt = 'YYYY-MM-dd';
          if (col.cFormatData) 
            fmt = col.cFormatData;
          if (fmt == 'YSTD_TD_H_M') {
            value = format.formatByNowDate(new Date(value));
          } else {
            value = format.dateFormat(new Date(value), fmt)
          }
        }
        return value;
      default:
        return value;
    }
  }
  getReferRow = (dataSource, columns, fields, rowID) => {
    let colLen = fields.length;
    let controls = [];
    let className = 'listview-row';
    if (colLen == 1)
      className = className + ' row-1';
    else if (colLen == 2)
      className = className + ' row-2';

    let selectIndexes = this.props.selectIndexes;
    let selected = false;
    selectIndexes && selectIndexes.map(index => {
      if (index == rowID) selected = true;
    });

    if (this.props.cRefType == 'aa_operator_mobile' || this.props.cRefType == 'aa_operator' || this.props.cRefType == "aa_userref_mobile") {
      className = 'listview-row row-operator';
      let url = dataSource[rowID].cHeadPicUrl;
      let name = dataSource[rowID].name;
      let code = dataSource[rowID].code;;
      let colorIndex = (parseFloat(rowID) + 1) % 5;
      let color = "";
      if (!url) {
        let first = "";
        switch (colorIndex) {
          case 1:
            color = 'blue';
            break;
          case 2:
            color = 'red';
            break;
          case 3:
            color = 'green';
            break;
          case 4:
            color = 'yellow';
            break;
          case 0:
            color = 'purple';
            break;
        }
        if (typeof title == 'number') title = title.toString();
        name = name.replace(/^\s+|\s+$/g, "");
        first = name[0].toLocaleUpperCase();
        url = <span className={color} >{first}</span>
      } else {
        url = <img src={dataSource[rowID].cHeadPicUrl} />
      }
      return (
        <div className={className} onClick={e => this.onRowClick(e, rowID)}>
          <div className="operator-img">{url}</div>
          <div className="operator-rows">
            <div className="operator-row-name">{name}</div>
            <div className="operator-row-code">{code}</div>
          </div>
          <div className="row-select">
            <Icon type={selected ? "icon-xuanzhong1" : "icon-kexuan"} />
          </div>
        </div>
      )
    } else if (colLen < 3) {
      fields.map((field, index) => {
        /*谓词变量支持系统参数*/
        let cFormatData = columns[field].cFormatData;
        try {
          if (!cFormatData || cFormatData == '') {
            cFormatData = {};
          } else {
            cFormatData = JSON.parse(cFormatData);
          }
        } catch (e) {
          cb.utils.alert('cFormatData，预制错误！', 'error');
        }
        if (cFormatData.composite) {

        } else {
          if (index == 0)
            controls.push(
              <div className="row main">
                <span className="value">{dataSource[rowID][field]}</span>
              </div>
            )
          else
            controls.push(
              <div className="row child">
                <span className="value">{dataSource[rowID][field]}</span>
              </div>
            )
        }
      });
    } else {
      for (var key in columns) {
        if (columns[key].cShowCaption) {
          controls.push(
            <div className="row row-mul-col">
              <span className="name">{columns[key].cShowCaption}</span>
              <span className="value">{this.getObjectText(dataSource[rowID][key])}</span>
            </div>
          )
        } else {
          controls.push(
            <div className="row">
              <span className="value">{this.getObjectText(dataSource[rowID][key])}</span>
            </div>
          )
        }
      }
    }
    let clsssName2 = "";
    // if (this.props.cRefType == "aa_businesstype"
    //   || this.props.cRefType == "aa_productsku"
    //   || this.props.cRefType == "aa_nomalproduct"
    //   || this.props.cRefType == "aa_salespromotion"
    //   || this.props.cRefType == "aa_user"
    //   || this.props.cRefType == "aa_store")
    clsssName2 = "row-businesstype";
    return (
      <div className={className + " " + clsssName2} onClick={e => this.onRowClick(e, rowID)}>
        {controls}
        <div className="row-select">
          <Icon type={selected ? "icon-xuanzhong1" : "icon-kexuan"} />
        </div>
      </div>
    )
  }
  getObjectText(obj) {
    if (typeof (obj) == "object")
      return obj.text;
    else
      return obj;
  }
  renderRow = (rowData, sectionID, rowID) => {
    const { dataSource, cStyle, columns, fields } = this.props;
    let controls = [];
    if (!dataSource[rowID]) return null;
    if (this.props.listType == 'refer')/*参照特殊处理*/
      return this.getReferRow(dataSource, columns, fields, rowID);

    if (!cStyle) {
      for (var key in columns) {
        if (columns[key].cShowCaption) {
          controls.push(
            <div className="row">
              <span className="name">{columns[key].cShowCaption}</span>
              <span className="value">{this.getObjectText(dataSource[rowID][key])}</span>
            </div>
          )
        } else {
          controls.push(
            <div className="row">
              <span className="value">{this.getObjectText(dataSource[rowID][key])}</span>
            </div>
          )
        }
      }

    } else {
      cStyle.map(row => {
        let rowControl = [];
        if (row.cols) {
          rowControl = this.loopCol(row.cols, columns, dataSource[rowID]);
        } else {
          rowControl = this.getRow(columns[row.key], dataSource[rowID]);
        }
        controls.push(
          <div className="row">
            {rowControl}
          </div>
        );
      });
    }
    if (this.props.isEdit) {
      let selectIndexes = this.props.selectIndexes;
      let checked = selectIndexes.indexOf(Number(rowID)) > -1;
      return (
        <div className="edit-row">
          <CheckboxItem checked={checked} onChange={e => this.onRowCheck(e, rowID)} />
          <div className="listview-row" onClick={e => this.onRowClick(e, rowID)}>
            {controls}
          </div>
        </div>
      )
    } else {
      if (this.props.inRowToolbarMeta) {
        return (
          <div className="edit-row">
            <div className="row-toolbar" onClick={() => this.showRowActions(rowID)}>
              <i className="icon icon-gengduo"></i>
            </div>
            <div className="listview-row" onClick={e => this.onRowClick(e, rowID)}>
              {controls}
            </div>
          </div>
        )
      } else {
        return (
          <div className="listview-row" onClick={e => this.onRowClick(e, rowID)}>
            {controls}
          </div>
        )
      }
    }
  }
  onRowCheck = (e, rowID) => {
    let checked = e.target.checked;
    if (this.props.onRowSelect)
      this.props.onRowSelect(checked, rowID);
  }
  showRowActions = (rowID) => {
    const rowToobarMeta = this.props.inRowToolbarMeta;
    const actionState = this.props.actionState;
    const _id = this.props.dataSource[rowID]._id;
    const controls = rowToobarMeta.controls;
    let data = [];
    controls.map(control => {
      if (actionState[_id] && actionState[_id][control.cItemName] && actionState[_id][control.cItemName].visible)
        data.push({
          icon: <SvgIcon type={control.icon} />,
          title: control.cShowCaption,
        });
    });
    ActionSheet.showShareActionSheetWithOptions({
      options: data
    }, (buttonIndex, rowIndex) => {
      if (buttonIndex !== -1) {
        let action = controls[buttonIndex];
        this.props.onRowActionClick(action.cItemName, rowID);
      }
    })
  }
  renderSeparator = (sectionID, rowID) => {
    <div
      key={rowID}
      style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }}
    />
  }
  renderFooter = () => {
    let { isLoading, pageInfo } = this.props;
    let content = '';
    if (isLoading) {
      content = '加载中...';
    } else {
      if (pageInfo) {
        if (pageInfo.pageIndex == pageInfo.pageCount) {
          content = '没有更多数据了~';
        }
        if (pageInfo.pageCount > pageInfo.pageIndex) {
          return (
            <div onClick={this.onEndReached.bind(this)} style={{ padding: 10, textAlign: 'center' }}>
              {'上拉加载更多'}
            </div>
          )
        }
      } else {
        content = '上拉加载更多';
      }
    }
    return (
      <div style={{ padding: 15, textAlign: 'center' }}>
        {content}
      </div>
    )
  }

  //滚动事件监听
  scrollListener(e) {
    let y = e.target.scrollTop;
    let height = document.documentElement.offsetHeight - (window.__fontUnit * 1.28) + 22;
    if (parseInt(y) >= height) {
      if (this.props.showRTop) this.props.showRTop();
    }
  }

  render() {
    let { refreshing } = this.state;
    let { dataSource, isFirstLoading, listType } = this.props;
    if (isFirstLoading) {
      return <div className="list-loading-noData"></div>
    }
    if (dataSource && dataSource.length == 0) {
      return <div className="refer_no_date"></div>
    }
    return (
      <ListView
        ref={el => this.lv = el}
        key={"listview"}
        initialListSize={20}
        dataSource={this.state.dataSource}
        renderFooter={this.renderFooter}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        useBodyScroll={false}
        style={{ height: this.props.height }}
        pullToRefresh={<PullToRefresh
          refreshing={refreshing}
          onRefresh={this.onRefresh}
        />}
        onScroll={(e) => { this.scrollListener(e) }}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={1000}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={100}
        pageSize={20}
      />
    )
  }
}
