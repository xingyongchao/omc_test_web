import React from 'react';
import { findDOMNode } from 'react-dom';
import { Table, Checkbox, Pagination, Popover, Select, Button, Message, Notification, Icon } from 'antd';
import { Row, Col } from '../basic';
import * as format from '../../helpers/formatDate';

export default class RptTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,/*加载状态*/
            pagination: { total: 0, current: 0, pageSize: 0 },
            showPagination: false,
            sumData: [],/*合计数据*/
            columns: [],/*服务返回栏目信息*/
            dataSource: [],/*服务返回数据信息*/
            selectedRowKeys: [],/*选中行key集合*/
            tableWidth: 0,/*报表宽度*/
            titleList: [],/*栏目设置数据*/
            popFlag: false,
            bMergeCol: false,/*是否合并*/
        };
        this.colIndex = {};/*栏目位置对照*/
        this.mergeCol = [];/*栏目合并数据*/
    }
    componentDidMount() {
        // this.bodyDom = cb.dom(findDOMNode(this.refs.rptTable)).find('.ant-table-body')[0];
        this.footerDom = cb.dom(findDOMNode(this.refs.rptTable)).find('.ant-table-footer')[0];
        this.footerDom.addEventListener("scroll", this.onFooterScroll)
        if (this.props.model)
            this.props.model.addListener(this);
    }
    componentWillUnmount() {
        if (this.props.model)
            this.props.model.removeListener(this);
        this.footerDom.removeEventListener('scroll', this.handleBodyClick);
    }
    onFooterScroll = (e) => {
        let bodyDom = cb.dom(findDOMNode(this.refs.rptTable)).find('.ant-table-body')[0];

        bodyDom.scrollLeft = e.target.scrollLeft;
    }
    /*设置table的props*/
    setListenerState = (params) => {
        if (params.columnMode === 'local' && this.props.columns) {
            // for (var attr in params.columns)
            //     Object.assign(params.columns[attr], this.props.columns[attr]);
            params.columns = this.props.columns;
            this.setColumns(params.columns);
        }
        let i = 0;
        for (var key in params.columns) {
            this.colIndex[key] = i;
            ++i;
        }
        let columns = this.RemodelingColumn(params.columns);
        this.showAggregates = params.showAggregates;
        this.setState({
            columns: columns,
            pageInfo: params.pageInfo,
            showPagination: params.pagination,
            readOnly: params.readOnly,
            showColumnSetting: params.showColumnSetting
        });
    }
    /*栏目设置数据*/
    setTitle(titleList) {
        this.setState({
            titleList
        });
    }
    /*组织table所需columns数据*/
    RemodelingColumn = (columns) => {
        let col = [];
        for (var key in columns) {
            let item = columns[key];//栏目属性对象
            let fixed = false;//是否固定
            if (item.children) {
                let children = this.loopChildren(item);
                col.push({
                    title: item.cShowCaption,
                    children: children
                });
            } else {
                let width = item.iColWidth ? item.iColWidth : 150;//栏目宽度
                let itemName = key;//
                this.mergeCol.push([]);
                if (this.state.bMergeCol) {
                    col.push({
                        title: item.cShowCaption, dataIndex: key, key: key, width: width,
                        onCellClick: this.onCellClick, fixed: fixed,
                        render: (text, record, index) => this.columnRender(text, record, index, itemName)
                    });
                } else {
                    col.push({
                        title: item.cShowCaption, dataIndex: key, key: key, width: width,
                        onCellClick: this.onCellClick, fixed: fixed,
                        // sorter: true,
                        render: (text, record, index) => this.columnRender(text, record, index, itemName)
                    });
                }
            }
        }
        return col;
    }
    loopChildren = (item, children) => {
        if (!children) children = [];
        let width = item.iColWidth ? item.iColWidth : 150;//栏目宽度
        let k = item.cItemName ? item.cItemName : item.cFieldName;
        let bChildren = false, index = 0;
        children.forEach(function (ele, i) {
            if (ele.key == k) {
                bChildren = true;
                index = i;
            }
        }, this);
        item.children.forEach(function (ele) {
            let key = ele.cItemName ? ele.cItemName : ele.cFieldName;
            if (ele.children) {
                children.push({ title: ele.cShowCaption, key: key, children: [] });
                children = this.loopChildren(ele, children);
            } else {
                let childControl = {};
                if (this.state.bMergeCol) {
                    childControl = {
                        title: ele.cShowCaption, dataIndex: key, key: key, width: width,
                        onCellClick: this.onCellClick, fixed: false,
                        render: (text, record, index) => this.columnRender(text, record, index, key)
                    };
                } else {
                    childControl = {
                        title: ele.cShowCaption, dataIndex: key, key: key, width: width,
                        onCellClick: this.onCellClick, fixed: false,
                        // sorter: true,
                        render: (text, record, index) => this.columnRender(text, record, index, key)
                    };
                }
                if (bChildren) {
                    children[index].children.push(childControl);
                } else {
                    children.push(childControl);
                }
            }
        }, this);

        return children;
    }
    loopColumn = (data, cols, item, child) => {
        if (!data.parent) {
            if (!cols[data.cFieldName]) {
                cols[data.cFieldName] = data;
                cols[data.cFieldName].children = [];
            }
            if (child && child.parent) delete child.parent;
            let colsChild = cols[data.cFieldName].children;
            let existChild = false, existIndex = 0;
            colsChild.forEach(function (ele, index) {
                if (ele.cFieldName == item.cFieldName) {
                    existIndex = index;
                    existChild = true;
                }
            }, this);

            if (existChild) {
                cols[data.cFieldName].children[existIndex].children.push(child);
            } else {
                if (child) {
                    item.children = [child];
                }
                if (item.parent) delete item.parent;
                cols[data.cFieldName].children.push(item);
            }
        } else {
            this.loopColumn(data.parent, cols, data, item);
        }
        // return cols;
    }
    RemodelingMergeColumn = (columnData) => {
        let cols = {};
        let columns = cb.utils.extend(true, {}, columnData);
        for (var key in columns) {
            let item = columns[key];//栏目属性对象
            if (!item.parent) {
                cols[item.cItemName] = item;
            } else {
                this.loopColumn(item.parent, cols, item);
            }
        }
        return this.RemodelingColumn(cols);
    }
    /*处理合并*/
    columnRender = (text, row, index, itemName) => {
        let data = this.state.dataSource;
        let len = data.length - index;
        let nextText = "", preText = "", colIndex = 0, rowSpan = 0, isLastRow = false;
        let obj = { children: text, props: {} };

        /*处理数据格式化*/
        let column = this.columndata[itemName];

        let controlType = column ? column.cControlType : 'empty';

        switch (controlType && controlType.trim().toLocaleLowerCase()) {
            case 'inputnumber':
            case 'money':
            case 'price':
                if (!isNaN(text)) {
                    text = Number(text);
                    let iNumPoint = column.iNumPoint;
                    if (controlType === 'money')
                        iNumPoint = cb.rest.AppContext.option.amountofdecimal;
                    else if (controlType === 'price')
                        iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
                    if (!isNaN(iNumPoint)) {
                        text = text.toFixed(iNumPoint);
                    }
                    obj.children = text;
                }
                break;
            case 'datepicker':
                if (text) {
                    let fmt = 'YYYY-MM-dd HH:mm:ss';
                    if (column.cFormatData && column.cFormatData != '') {
                        fmt = column.cFormatData;
                    }
                    text = format.dateFormat(new Date(text), fmt)
                }
                obj.children = text;
                break;
            case 'empty':
                obj.children = '';
                break;
        }

        colIndex = this.colIndex[itemName];/*当前列index*/
        if (!this.state.bMergeCol || !this.mergeCol[colIndex]) return obj;
        if (len == 1) isLastRow = true;/*最后一行*/
        if (colIndex == 0) {/*第一列*/
            if (index == 0) {/*第一行*/
                let rs = 0;
                for (var i = index; i < len; i++) {
                    if (text != data[i][itemName]) break;
                    rs++;
                }
                obj.props.rowSpan = rs;
                this.mergeCol[colIndex][index] = rs;
            } else {
                preText = data[index - 1][itemName];
                nextText = isLastRow ? "" : data[index + 1][itemName];
                if (text == preText) {
                    obj.props.rowSpan = 0;
                    this.mergeCol[colIndex][index] = 0;
                } else if (text == nextText && !isLastRow) {
                    let rs = 0;
                    for (var i = index; i < data.length; i++) {
                        if (text != data[i][itemName]) break;
                        rs++;
                    }
                    obj.props.rowSpan = rs;
                    this.mergeCol[colIndex][index] = rs;
                } else {
                    this.mergeCol[colIndex][index] = 1;
                }
            }
        } else {
            let preColRs = this.mergeCol[colIndex - 1][index];/*当前行前一列rowSpan*/
            if (preColRs == undefined || preColRs == null) return;
            if (preColRs == 1) {/*前一列不合并*/
                this.mergeCol[colIndex][index] = 1;
            } else if (preColRs > 1) {/*前一列为起始合并列*/
                let rs = 0;
                for (var i = index; i < preColRs + index; i++) {
                    if (text != data[i][itemName]) break;
                    rs++;
                }
                if (index == 0 && rs == 0) rs = 1;
                obj.props.rowSpan = rs;
                this.mergeCol[colIndex][index] = rs;
            } else {/*前一列为合并列*/
                let preRowRs = this.mergeCol[colIndex][index - 1];/*当前列前一行rowSpan*/
                preText = data[index - 1][itemName];
                nextText = isLastRow ? "" : data[index + 1][itemName];
                if (preRowRs == 1) {/*当前列前一行-未合并*/
                    let rs = 0;
                    let l1 = preColRs == 0 ? data.length : preColRs + index;
                    for (var i = index; i < l1; i++) {
                        let precr = this.mergeCol[colIndex - 1];
                        if (precr ? precr[i] : 0 != 0) break;

                        if (text != data[i][itemName]) break;
                        rs++;
                    }
                    obj.props.rowSpan = rs > 0 ? rs : 1;
                    this.mergeCol[colIndex][index] = rs > 0 ? rs : 1;
                } else if (preRowRs > 1) {/*当前列前一行-起始合并列*/
                    if (text == preText) {
                        obj.props.rowSpan = 0;
                        this.mergeCol[colIndex][index] = 0;
                    } else if (text == nextText && !isLastRow) {
                        let rs = 0;
                        for (var i = index; i < len; i++) {
                            if (text != data[i][itemName]) break;
                            rs++;
                        }
                        obj.props.rowSpan = rs;
                        this.mergeCol[colIndex][index] = rs;
                    } else {
                        this.mergeCol[colIndex][index] = 1;
                    }
                } else {/*当前列前一行-合并列*/
                    if (text == preText) {
                        obj.props.rowSpan = 0;
                        this.mergeCol[colIndex][index] = 0;
                    } else if (text == nextText && !isLastRow) {
                        let rs = 0;
                        for (var i = index; i < data.length; i++) {
                            let precr = this.mergeCol[colIndex - 1];
                            if (precr ? precr[i] : 0 != 0) break;
                            if (text != data[i][itemName]) break;
                            rs++;
                        }
                        obj.props.rowSpan = rs;
                        this.mergeCol[colIndex][index] = rs;
                    } else {
                        this.mergeCol[colIndex][index] = 1;
                    }
                }
            }
        }
        return obj;
    }
    /*栏目*/
    setColumns(columndata) {
        this.colIndex = {};
        this.mergeCol = [];
        let tableWidth = 0, sameWidth = true, firstCol = null;
        let i = 0, preWidth;
        for (var key in columndata) {
            firstCol = key;
            let width = columndata[key].iColWidth ? columndata[key].iColWidth : 150;
            if (preWidth && preWidth != width) sameWidth = false;
            tableWidth += width;
            this.colIndex[key] = i;
            ++i;
        }
        // if (sameWidth && columndata[firstCol]) columndata[firstCol].iColWidth = columndata[firstCol].iColWidth ? (columndata[firstCol].iColWidth + 5) : 155;
        let col = cb.utils.extend(true, {}, columndata);
        if (tableWidth < this.props.width) {
            col.emptycol = { "cFieldName": "emptycol", "cItemName": "emptycol", "cCaption": "", "cShowCaption": "", "iColWidth": tableWidth - this.props.width, "bNeedSum": false, "bShowIt": true, "cControlType": "empty" };
        }
        this.columndata = col;
        let columns = this.RemodelingMergeColumn(col);
        this.setState({ columns, tableWidth });
    }
    /**/
    setColumnByTtile(columns) {
        let columnset = this.RemodelingColumn(columns);
        this.setState({
            columns: columnset
        });
    }
    /*合计数据*/
    setSum(sumData) {
        this.setState({ sumData: sumData[0] });
    }
    /*报表数据源*/
    setDataSource(data) {
        this.setState({ dataSource: data, isLoading: false });
        let col = cb.utils.extend(true, {}, this.columndata);
        let columns = this.RemodelingMergeColumn(col);
        this.setState({ columns });
    }
    //设置分页
    setPageInfo = (paginationlist) => {
        var pageinfo = this.state.pagination;
        pageinfo.total = paginationlist.recordCount
        pageinfo.current = paginationlist.pageIndex;
        pageinfo.pageSize = paginationlist.pageSize;
        this.setState({
            pagination: pageinfo
        });
    }

    /*排序*/
    onSorter = (a, b, item) => {
        let attr = item.cItemName;
        var valueA = typeof a[attr] === 'undefined' ? '' : a[attr];
        var valueB = typeof b[attr] === 'undefined' ? '' : b[attr];
        var sortVal = 0;
        if (params.sort === 'ASC') {
            if (valueA > valueB) {
                sortVal = 1;
            }
            if (valueA < valueB) {
                sortVal = -1;
            }
        } else {
            if (valueA > valueB) {
                sortVal = -1;
            }
            if (valueA < valueB) {
                sortVal = 1;
            }
        }

        return sortVal;
    }
    onTableChange = (pagination, filters, sorter) => {
        let itemName = sorter.columnKey;
        let order = sorter.order;
        let data = cb.utils.extend(true, [], this.state.dataSource);

        data.sort((indexA, indexB) => {
            var valueA = typeof indexA[itemName] === 'undefined' ? '' : indexA[itemName];
            var valueB = typeof indexB[itemName] === 'undefined' ? '' : indexB[itemName];
            var sortVal = 0;
            if (order === 'ascend') {
                if (valueA > valueB) {
                    sortVal = 1;
                }
                if (valueA < valueB) {
                    sortVal = -1;
                }
            } else {
                if (valueA > valueB) {
                    sortVal = -1;
                }
                if (valueA < valueB) {
                    sortVal = 1;
                }
            }

            return sortVal;
        });
        this.setDataSource(data);
    }
    /*单元格点击事件*/
    onCellClick = (record, event) => {

    }
    /*行点击事件*/
    onRowClick = (record, index, event) => {

    }
    /*行双击事件*/
    onRowDoubleClick = (record, index, event) => {

    }
    /*鼠标划入*/
    onRowMouseEnter = (record, index, event) => {

    }
    /*鼠标离开*/
    onRowMouseLeave = (record, index, event) => {

    }
    /*设置行className*/
    setRowClassName = (record, index) => {

    }
    /*无数据状态表格样式*/
    getEmptyData() {
        let data = this.state.dataSource;
        if (data.length == 0)
            return <div className='table-nodata'><Icon type='nodata' />暂时没有数据哦~</div>
    }
    setPage = (pagination, isPage) => {
        if (isPage && pagination.total !== 0) {
            let sumData = this.state.sumData;
            let columns = this.columns;
            let showSums = [];
            if (sumData && sumData.length > 0) {
                for (var key in sumData[0]) {
                    if (!columns[key]) continue;
                    if (sumData[0][key] == 0) continue;
                    showSums.push(
                        <Col span={1} style={{ fontSize: '18px' }}>
                            {columns[key].cCaption}：{sumData[0][key]}
                        </Col>
                    )
                    if (showSums.length > 2) {
                        break;
                    }
                }
            }
            let selectOptions = [{ "value": 10, "text": 10 }, { "value": 20, "text": 20 }, { "value": 30, "text": 30 }, { "value": 40, "text": 40 }, { "value": 50, "text": 50 }];
            let selectOptionsControl = selectOptions.map((item, index) => {
                return <Select.Option key={item.value} text={item.text}>{item.text}</Select.Option>
            });
            // let pageCount = Math.ceil(pagination.total / pagination.pageSize);
            // if (pageCount == 1) return ''
            return (
                <div className='pagination-new'>
                    <Pagination showQuickJumper showSizeChanger pageSizeOptions={['10', '20', '30', '50', '80', '100']} showTotal={total => `共${total}条`} size="small" total={pagination.total} current={pagination.current} pageSize={pagination.pageSize} onShowSizeChange={this.onShowSizeChange} onChange={this._PaginChange} />
                    {/* <span>共<i>{pageCount}</i>页</span> */}
                </div>
            );
        }
    }
    //分页改变事件
    _PaginChange = (page) => {
        if (this.props.model)
            this.props.model.setPageIndex(page);
    }
    /*页大小改变*/
    onShowSizeChange = (current, size) => {
        if (this.props.model)
            this.props.model.setPageSize(size);
    }
    // /*选中列*/
    // getRowSelection = () => {
    //     return ({});
    // }
    /*栏目设置*/
    getColumnSetting = () => {
        let hasSetting = this.state.showColumnSetting;
        if (hasSetting) {
            let settingContent = this.getSettingContent();
            let popFlag = this.state.popFlag;
            return (
                <div className="columnSetting" >
                    <Popover overlayStyle={{ width: "200px" }} placement={"bottomRight"} content={settingContent} trigger={"click"} visible={popFlag} >
                        <Button className="SettingBtn" type={"ghost"} size="small" icon='ellipsis' onClick={() => this.columnSetting()}></Button>
                    </Popover>
                </div>
            );
        } else {
            return ''
        }
    }
    getSettingContent() {
        let titleList = this.state.titleList;
        let titileItem = [];
        titleList.forEach(function (element, index) {
            let item;
            let bShowPop = element.bShowPop ? element.bShowPop : false;
            if (!element.bHidden) {
                let showIt = false;
                if (element.bShowIt == 1) {
                    showIt = true;
                }
                item = (
                    bShowPop ?
                        <Row style={{ minHeight: "25px" }} onMouseEnter={(e) => this.onMouseEnter(e, index)} onMouseLeave={(e) => this.onMouseLeave(e, index)}>
                            <div className='pull-left'>
                                <Checkbox checked={showIt} onChange={(e) => this.onChecked(e, element, index)}>{element.cShowCaption}</Checkbox>
                            </div>
                            <div className='pull-right'>
                                <Button style={{ borderWidth: 0 }} icon="arrow-up" onClick={() => this.sortClick('up', index)}></Button>
                                <Button style={{ borderWidth: 0 }} icon="arrow-down" onClick={() => this.sortClick('down', index)}></Button>
                            </div>
                        </Row>
                        :
                        <Row colCount={2} style={{ minHeight: "25px" }} onMouseEnter={(e) => this.onMouseEnter(e, index)} onMouseLeave={(e) => this.onMouseLeave(e, index)}>
                            <div className='pull-left'>
                                <Checkbox checked={showIt} onChange={(e) => this.onChecked(e, element, index)}>{element.cShowCaption}</Checkbox>
                            </div>
                            <div className='pull-right'></div>
                        </Row>
                )
                titileItem.push(item);
            }
        }, this);
        let buttonClass = 'filter-btn-fixed';

        let settingContent = (
            <div className={buttonClass} style={{ overflow: "auto", height: "250px" }}>
                <div className='filter-txt'>{titileItem}</div>
                <div className='filter-btn-1'>
                    <Button type={"primary"} size="small" onClick={() => this.buttonClick('save')}>保存</Button>
                    <Button type={"default"} size="small" onClick={() => this.buttonClick('cancel')}>取消</Button>
                </div>
            </div>
        );
        return settingContent;
    }
    onChecked(e, element, index) {
        let checked = e.target.checked;
        let id = element.id;
        let titleList = this.state.titleList;
        if (titleList[index].bJointQuery) {
            cb.utils.alert('关联字段不允许修改！', 'warning');
        } else {
            if (checked) {
                titleList[index].bShowIt = 1;
            } else {
                titleList[index].bShowIt = 0;
            }
        }
        this.setState({
            titleList
        });
    }
    buttonClick(type) {
        if (type == 'save') {
            this.props.model.setTitleData(this.state.titleList);
        }
        this.setState({
            popFlag: false
        });
    }
    onMouseEnter(e, index) {
        let titleList = this.state.titleList;
        titleList[index].bShowPop = true;
        this.setState({
            titleList
        });
    }
    onMouseLeave(e, index) {
        let titleList = this.state.titleList;
        titleList.forEach(function (ele, i) {
            ele.bShowPop = false;
        });
        this.sort = "";
        this.setState({
            titleList
        });
    }
    //排序
    sortClick(type, index) {
        let titleList = this.state.titleList;
        let pre = cb.utils.extend(true, {}, titleList[index - 1]);
        let next = cb.utils.extend(true, {}, titleList[index + 1]);
        let now = cb.utils.extend(true, {}, titleList[index]);
        if (type == 'up') {
            this.sort = "up";
            let preOrder = now.iOrder - 1;
            if (pre.iOrder == preOrder) {
                pre.iOrder = preOrder + 1;
            } else {
                titleList.forEach(function (ele) {
                    if (preOrder == ele.iOrder) {
                        ele.iOrder = preOrder + 1;
                        return;
                    }
                });
            }
            now.iOrder = preOrder;
            titleList[index] = pre;
            titleList[index - 1] = now;
        } else {
            this.sort = "down";
            let nextOrder = now.iOrder + 1;
            if (next.iOrder == nextOrder) {
                next.iOrder = nextOrder - 1;
            } else {
                titleList.forEach(function (ele) {
                    if (nextOrder == ele.iOrder) {
                        ele.iOrder = nextOrder - 1;
                        return;
                    }
                });
            }
            now.iOrder == nextOrder;
            titleList[index] = next;
            titleList[index + 1] = now;
        }
        this.setState({
            titleList
        });
    }


    columnSetting() {
        // this.props.model.getTitleData(this.props.code);
        this.setState({
            popFlag: !this.state.popFlag
        })
        this.props.model.columnSetting(this.props.code);
    }
    /*获取footer*/
    getFooter = (currentPageData) => {
        if (currentPageData.length == 0) return
        let controls = [];
        let { sumData, columns } = this.state;
        let first = true;
        for (var key in columns) {
            let item = columns[key];
            let width = item.width ? item.width : 150;
            let col = this.columndata[item.key];
            if (first) width = width - 65;
            first = false;
            width = width + "px";
            sumData = sumData ? sumData : [];
            let sum = (sumData[item.key] != undefined && sumData[item.key] != null) ? sumData[item.key] : "";

            if (col) {
                let controlType = col.cControlType;
                switch (controlType && controlType.trim().toLocaleLowerCase()) {
                    case 'inputnumber':
                    case 'money':
                    case 'price':
                        let iNumPoint = col ? col.iNumPoint : 2;
                        if (controlType === 'money')
                            iNumPoint = cb.rest.AppContext.option.amountofdecimal;
                        else if (controlType === 'price')
                            iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
                        if (!isNaN(iNumPoint)) {
                            sum = (sum && sum != '') ? sum.toFixed(iNumPoint) : '';
                        }
                        break;
                }
            }
            controls.push(
                <div key={item.key} style={{ width: width, float: 'left', height: '32px', padding: '0 8px' }}>{sum}</div>
            )
        }
        let footerWidth = this.state.tableWidth + "px";
        return (
            <div style={{ height: '32px', width: footerWidth }}>
                <div style={{ width: "65px", float: 'left', height: '32px', padding: '0 8px' }}>合计</div>
                {controls}
            </div>
        )
    }
    getEmptyData = () => {
        let data = this.state.dataSource;
        if (data.length) return;
        const text = this.state.showSearch ? '搜索无结果' : '暂时没有数据哦~';
        return <div className='table-nodata'><Icon type='nodata' />{text}</div>
    }
    render() {
        let columnSetting = this.getColumnSetting();
        // let emptyData = this.getEmptyData();
        let pagination = this.setPage(this.state.pagination, this.state.showPagination);
        let scrollx = this.state.tableWidth;
        if (this.state.dataSource.length > 10) {
            scrollx += 8;
        }
        if (scrollx < (this.props.width - 40)) {
            scrollx = this.props.width - 40;
        }
        let className = 'rpt-table';
        if (this.state.dataSource.length > 10) {
            className = 'rpt-table rpttable-padding-header';
        }
        let local = {};
        local.emptyText = this.getEmptyData();
        return (
            <div ref='rptTable' className={className} style={{ width: this.props.width }}>
                <Row>
                    {columnSetting}
                    <Table dataSource={this.state.dataSource} key="retTable"
                        locale={local}
                        rowKey={(record, index) => { return record.key }}
                        onChange={this.onTableChange}
                        columns={this.state.columns} rowClassName={this.setRowClassName}
                        onRowClick={this.onRowClick} onRowDoubleClick={this.onRowDoubleClick} bordered={true}
                        onRowMouseEnter={this.onRowMouseEnter} onRowMouseLeave={this.onRowMouseLeave}
                        pagination={false} bordered={false} showHeader={true} bordered footer={this.getFooter} scroll={{ x: scrollx, y: 400 }}
                    />

                </Row>
                <Row>
                    {pagination}
                </Row>
            </div>
        );
    }
}



