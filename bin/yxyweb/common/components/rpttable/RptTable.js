'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _antd = require('antd');

var _basic = require('../basic');

var _formatDate = require('../../helpers/formatDate');

var format = _interopRequireWildcard(_formatDate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RptTable = function (_React$Component) {
    _inherits(RptTable, _React$Component);

    function RptTable(props) {
        _classCallCheck(this, RptTable);

        var _this = _possibleConstructorReturn(this, (RptTable.__proto__ || Object.getPrototypeOf(RptTable)).call(this, props));

        _this.onFooterScroll = function (e) {
            var bodyDom = cb.dom((0, _reactDom.findDOMNode)(_this.refs.rptTable)).find('.ant-table-body')[0];

            bodyDom.scrollLeft = e.target.scrollLeft;
        };

        _this.setListenerState = function (params) {
            if (params.columnMode === 'local' && _this.props.columns) {
                // for (var attr in params.columns)
                //     Object.assign(params.columns[attr], this.props.columns[attr]);
                params.columns = _this.props.columns;
                _this.setColumns(params.columns);
            }
            var i = 0;
            for (var key in params.columns) {
                _this.colIndex[key] = i;
                ++i;
            }
            var columns = _this.RemodelingColumn(params.columns);
            _this.showAggregates = params.showAggregates;
            _this.setState({
                columns: columns,
                pageInfo: params.pageInfo,
                showPagination: params.pagination,
                readOnly: params.readOnly,
                showColumnSetting: params.showColumnSetting
            });
        };

        _this.RemodelingColumn = function (columns) {
            var col = [];
            for (var key in columns) {
                var item = columns[key]; //栏目属性对象
                var fixed = false; //是否固定
                if (item.children) {
                    var children = _this.loopChildren(item);
                    col.push({
                        title: item.cShowCaption,
                        children: children
                    });
                } else {
                    (function () {
                        var width = item.iColWidth ? item.iColWidth : 150; //栏目宽度
                        var itemName = key; //
                        _this.mergeCol.push([]);
                        if (_this.state.bMergeCol) {
                            col.push({
                                title: item.cShowCaption, dataIndex: key, key: key, width: width,
                                onCellClick: _this.onCellClick, fixed: fixed,
                                render: function render(text, record, index) {
                                    return _this.columnRender(text, record, index, itemName);
                                }
                            });
                        } else {
                            col.push({
                                title: item.cShowCaption, dataIndex: key, key: key, width: width,
                                onCellClick: _this.onCellClick, fixed: fixed,
                                // sorter: true,
                                render: function render(text, record, index) {
                                    return _this.columnRender(text, record, index, itemName);
                                }
                            });
                        }
                    })();
                }
            }
            return col;
        };

        _this.loopChildren = function (item, children) {
            if (!children) children = [];
            var width = item.iColWidth ? item.iColWidth : 150; //栏目宽度
            var k = item.cItemName ? item.cItemName : item.cFieldName;
            var bChildren = false,
                index = 0;
            children.forEach(function (ele, i) {
                if (ele.key == k) {
                    bChildren = true;
                    index = i;
                }
            }, _this);
            item.children.forEach(function (ele) {
                var _this2 = this;

                var key = ele.cItemName ? ele.cItemName : ele.cFieldName;
                if (ele.children) {
                    children.push({ title: ele.cShowCaption, key: key, children: [] });
                    children = this.loopChildren(ele, children);
                } else {
                    var childControl = {};
                    if (this.state.bMergeCol) {
                        childControl = {
                            title: ele.cShowCaption, dataIndex: key, key: key, width: width,
                            onCellClick: this.onCellClick, fixed: false,
                            render: function render(text, record, index) {
                                return _this2.columnRender(text, record, index, key);
                            }
                        };
                    } else {
                        childControl = {
                            title: ele.cShowCaption, dataIndex: key, key: key, width: width,
                            onCellClick: this.onCellClick, fixed: false,
                            // sorter: true,
                            render: function render(text, record, index) {
                                return _this2.columnRender(text, record, index, key);
                            }
                        };
                    }
                    if (bChildren) {
                        children[index].children.push(childControl);
                    } else {
                        children.push(childControl);
                    }
                }
            }, _this);

            return children;
        };

        _this.loopColumn = function (data, cols, item, child) {
            if (!data.parent) {
                if (!cols[data.cFieldName]) {
                    cols[data.cFieldName] = data;
                    cols[data.cFieldName].children = [];
                }
                if (child && child.parent) delete child.parent;
                var colsChild = cols[data.cFieldName].children;
                var existChild = false,
                    existIndex = 0;
                colsChild.forEach(function (ele, index) {
                    if (ele.cFieldName == item.cFieldName) {
                        existIndex = index;
                        existChild = true;
                    }
                }, _this);

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
                _this.loopColumn(data.parent, cols, data, item);
            }
            // return cols;
        };

        _this.RemodelingMergeColumn = function (columnData) {
            var cols = {};
            var columns = cb.utils.extend(true, {}, columnData);
            for (var key in columns) {
                var item = columns[key]; //栏目属性对象
                if (!item.parent) {
                    cols[item.cItemName] = item;
                } else {
                    _this.loopColumn(item.parent, cols, item);
                }
            }
            return _this.RemodelingColumn(cols);
        };

        _this.columnRender = function (text, row, index, itemName) {
            var data = _this.state.dataSource;
            var len = data.length - index;
            var nextText = "",
                preText = "",
                colIndex = 0,
                rowSpan = 0,
                isLastRow = false;
            var obj = { children: text, props: {} };

            /*处理数据格式化*/
            var column = _this.columndata[itemName];

            var controlType = column ? column.cControlType : 'empty';

            switch (controlType && controlType.trim().toLocaleLowerCase()) {
                case 'inputnumber':
                case 'money':
                case 'price':
                    if (!isNaN(text)) {
                        text = Number(text);
                        var iNumPoint = column.iNumPoint;
                        if (controlType === 'money') iNumPoint = cb.rest.AppContext.option.amountofdecimal;else if (controlType === 'price') iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
                        if (!isNaN(iNumPoint)) {
                            text = text.toFixed(iNumPoint);
                        }
                        obj.children = text;
                    }
                    break;
                case 'datepicker':
                    if (text) {
                        var fmt = 'YYYY-MM-dd HH:mm:ss';
                        if (column.cFormatData && column.cFormatData != '') {
                            fmt = column.cFormatData;
                        }
                        text = format.dateFormat(new Date(text), fmt);
                    }
                    obj.children = text;
                    break;
                case 'empty':
                    obj.children = '';
                    break;
            }

            colIndex = _this.colIndex[itemName]; /*当前列index*/
            if (!_this.state.bMergeCol || !_this.mergeCol[colIndex]) return obj;
            if (len == 1) isLastRow = true; /*最后一行*/
            if (colIndex == 0) {
                /*第一列*/
                if (index == 0) {
                    /*第一行*/
                    var rs = 0;
                    for (var i = index; i < len; i++) {
                        if (text != data[i][itemName]) break;
                        rs++;
                    }
                    obj.props.rowSpan = rs;
                    _this.mergeCol[colIndex][index] = rs;
                } else {
                    preText = data[index - 1][itemName];
                    nextText = isLastRow ? "" : data[index + 1][itemName];
                    if (text == preText) {
                        obj.props.rowSpan = 0;
                        _this.mergeCol[colIndex][index] = 0;
                    } else if (text == nextText && !isLastRow) {
                        var _rs = 0;
                        for (var i = index; i < data.length; i++) {
                            if (text != data[i][itemName]) break;
                            _rs++;
                        }
                        obj.props.rowSpan = _rs;
                        _this.mergeCol[colIndex][index] = _rs;
                    } else {
                        _this.mergeCol[colIndex][index] = 1;
                    }
                }
            } else {
                var preColRs = _this.mergeCol[colIndex - 1][index]; /*当前行前一列rowSpan*/
                if (preColRs == undefined || preColRs == null) return;
                if (preColRs == 1) {
                    /*前一列不合并*/
                    _this.mergeCol[colIndex][index] = 1;
                } else if (preColRs > 1) {
                    /*前一列为起始合并列*/
                    var _rs2 = 0;
                    for (var i = index; i < preColRs + index; i++) {
                        if (text != data[i][itemName]) break;
                        _rs2++;
                    }
                    if (index == 0 && _rs2 == 0) _rs2 = 1;
                    obj.props.rowSpan = _rs2;
                    _this.mergeCol[colIndex][index] = _rs2;
                } else {
                    /*前一列为合并列*/
                    var preRowRs = _this.mergeCol[colIndex][index - 1]; /*当前列前一行rowSpan*/
                    preText = data[index - 1][itemName];
                    nextText = isLastRow ? "" : data[index + 1][itemName];
                    if (preRowRs == 1) {
                        /*当前列前一行-未合并*/
                        var _rs3 = 0;
                        var l1 = preColRs == 0 ? data.length : preColRs + index;
                        for (var i = index; i < l1; i++) {
                            var precr = _this.mergeCol[colIndex - 1];
                            if (precr ? precr[i] : 0 != 0) break;

                            if (text != data[i][itemName]) break;
                            _rs3++;
                        }
                        obj.props.rowSpan = _rs3 > 0 ? _rs3 : 1;
                        _this.mergeCol[colIndex][index] = _rs3 > 0 ? _rs3 : 1;
                    } else if (preRowRs > 1) {
                        /*当前列前一行-起始合并列*/
                        if (text == preText) {
                            obj.props.rowSpan = 0;
                            _this.mergeCol[colIndex][index] = 0;
                        } else if (text == nextText && !isLastRow) {
                            var _rs4 = 0;
                            for (var i = index; i < len; i++) {
                                if (text != data[i][itemName]) break;
                                _rs4++;
                            }
                            obj.props.rowSpan = _rs4;
                            _this.mergeCol[colIndex][index] = _rs4;
                        } else {
                            _this.mergeCol[colIndex][index] = 1;
                        }
                    } else {
                        /*当前列前一行-合并列*/
                        if (text == preText) {
                            obj.props.rowSpan = 0;
                            _this.mergeCol[colIndex][index] = 0;
                        } else if (text == nextText && !isLastRow) {
                            var _rs5 = 0;
                            for (var i = index; i < data.length; i++) {
                                var _precr = _this.mergeCol[colIndex - 1];
                                if (_precr ? _precr[i] : 0 != 0) break;
                                if (text != data[i][itemName]) break;
                                _rs5++;
                            }
                            obj.props.rowSpan = _rs5;
                            _this.mergeCol[colIndex][index] = _rs5;
                        } else {
                            _this.mergeCol[colIndex][index] = 1;
                        }
                    }
                }
            }
            return obj;
        };

        _this.setPageInfo = function (paginationlist) {
            var pageinfo = _this.state.pagination;
            pageinfo.total = paginationlist.recordCount;
            pageinfo.current = paginationlist.pageIndex;
            pageinfo.pageSize = paginationlist.pageSize;
            _this.setState({
                pagination: pageinfo
            });
        };

        _this.onSorter = function (a, b, item) {
            var attr = item.cItemName;
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
        };

        _this.onTableChange = function (pagination, filters, sorter) {
            var itemName = sorter.columnKey;
            var order = sorter.order;
            var data = cb.utils.extend(true, [], _this.state.dataSource);

            data.sort(function (indexA, indexB) {
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
            _this.setDataSource(data);
        };

        _this.onCellClick = function (record, event) {};

        _this.onRowClick = function (record, index, event) {};

        _this.onRowDoubleClick = function (record, index, event) {};

        _this.onRowMouseEnter = function (record, index, event) {};

        _this.onRowMouseLeave = function (record, index, event) {};

        _this.setRowClassName = function (record, index) {};

        _this.setPage = function (pagination, isPage) {
            if (isPage && pagination.total !== 0) {
                var sumData = _this.state.sumData;
                var columns = _this.columns;
                var showSums = [];
                if (sumData && sumData.length > 0) {
                    for (var key in sumData[0]) {
                        if (!columns[key]) continue;
                        if (sumData[0][key] == 0) continue;
                        showSums.push(_react2.default.createElement(
                            _basic.Col,
                            { span: 1, style: { fontSize: '18px' } },
                            columns[key].cCaption,
                            '\uFF1A',
                            sumData[0][key]
                        ));
                        if (showSums.length > 2) {
                            break;
                        }
                    }
                }
                var selectOptions = [{ "value": 10, "text": 10 }, { "value": 20, "text": 20 }, { "value": 30, "text": 30 }, { "value": 40, "text": 40 }, { "value": 50, "text": 50 }];
                var selectOptionsControl = selectOptions.map(function (item, index) {
                    return _react2.default.createElement(
                        _antd.Select.Option,
                        { key: item.value, text: item.text },
                        item.text
                    );
                });
                // let pageCount = Math.ceil(pagination.total / pagination.pageSize);
                // if (pageCount == 1) return ''
                return _react2.default.createElement(
                    'div',
                    { className: 'pagination-new' },
                    _react2.default.createElement(_antd.Pagination, { showQuickJumper: true, showSizeChanger: true, pageSizeOptions: ['10', '20', '30', '50', '80', '100'], showTotal: function showTotal(total) {
                            return '\u5171' + total + '\u6761';
                        }, size: 'small', total: pagination.total, current: pagination.current, pageSize: pagination.pageSize, onShowSizeChange: _this.onShowSizeChange, onChange: _this._PaginChange })
                );
            }
        };

        _this._PaginChange = function (page) {
            if (_this.props.model) _this.props.model.setPageIndex(page);
        };

        _this.onShowSizeChange = function (current, size) {
            if (_this.props.model) _this.props.model.setPageSize(size);
        };

        _this.getColumnSetting = function () {
            var hasSetting = _this.state.showColumnSetting;
            if (hasSetting) {
                var settingContent = _this.getSettingContent();
                var popFlag = _this.state.popFlag;
                return _react2.default.createElement(
                    'div',
                    { className: 'columnSetting' },
                    _react2.default.createElement(
                        _antd.Popover,
                        { overlayStyle: { width: "200px" }, placement: "bottomRight", content: settingContent, trigger: "click", visible: popFlag },
                        _react2.default.createElement(_antd.Button, { className: 'SettingBtn', type: "ghost", size: 'small', icon: 'ellipsis', onClick: function onClick() {
                                return _this.columnSetting();
                            } })
                    )
                );
            } else {
                return '';
            }
        };

        _this.getFooter = function (currentPageData) {
            if (currentPageData.length == 0) return;
            var controls = [];
            var _this$state = _this.state,
                sumData = _this$state.sumData,
                columns = _this$state.columns;

            var first = true;
            for (var key in columns) {
                var item = columns[key];
                var width = item.width ? item.width : 150;
                var col = _this.columndata[item.key];
                if (first) width = width - 65;
                first = false;
                width = width + "px";
                sumData = sumData ? sumData : [];
                var sum = sumData[item.key] != undefined && sumData[item.key] != null ? sumData[item.key] : "";

                if (col) {
                    var controlType = col.cControlType;
                    switch (controlType && controlType.trim().toLocaleLowerCase()) {
                        case 'inputnumber':
                        case 'money':
                        case 'price':
                            var iNumPoint = col ? col.iNumPoint : 2;
                            if (controlType === 'money') iNumPoint = cb.rest.AppContext.option.amountofdecimal;else if (controlType === 'price') iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
                            if (!isNaN(iNumPoint)) {
                                sum = sum && sum != '' ? sum.toFixed(iNumPoint) : '';
                            }
                            break;
                    }
                }
                controls.push(_react2.default.createElement(
                    'div',
                    { key: item.key, style: { width: width, float: 'left', height: '32px', padding: '0 8px' } },
                    sum
                ));
            }
            var footerWidth = _this.state.tableWidth + "px";
            return _react2.default.createElement(
                'div',
                { style: { height: '32px', width: footerWidth } },
                _react2.default.createElement(
                    'div',
                    { style: { width: "65px", float: 'left', height: '32px', padding: '0 8px' } },
                    '\u5408\u8BA1'
                ),
                controls
            );
        };

        _this.getEmptyData = function () {
            var data = _this.state.dataSource;
            if (data.length) return;
            var text = _this.state.showSearch ? '搜索无结果' : '暂时没有数据哦~';
            return _react2.default.createElement(
                'div',
                { className: 'table-nodata' },
                _react2.default.createElement(_antd.Icon, { type: 'nodata' }),
                text
            );
        };

        _this.state = {
            isLoading: true, /*加载状态*/
            pagination: { total: 0, current: 0, pageSize: 0 },
            showPagination: false,
            sumData: [], /*合计数据*/
            columns: [], /*服务返回栏目信息*/
            dataSource: [], /*服务返回数据信息*/
            selectedRowKeys: [], /*选中行key集合*/
            tableWidth: 0, /*报表宽度*/
            titleList: [], /*栏目设置数据*/
            popFlag: false,
            bMergeCol: false /*是否合并*/
        };
        _this.colIndex = {}; /*栏目位置对照*/
        _this.mergeCol = []; /*栏目合并数据*/
        return _this;
    }

    _createClass(RptTable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // this.bodyDom = cb.dom(findDOMNode(this.refs.rptTable)).find('.ant-table-body')[0];
            this.footerDom = cb.dom((0, _reactDom.findDOMNode)(this.refs.rptTable)).find('.ant-table-footer')[0];
            this.footerDom.addEventListener("scroll", this.onFooterScroll);
            if (this.props.model) this.props.model.addListener(this);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.model) this.props.model.removeListener(this);
            this.footerDom.removeEventListener('scroll', this.handleBodyClick);
        }
        /*设置table的props*/

    }, {
        key: 'setTitle',

        /*栏目设置数据*/
        value: function setTitle(titleList) {
            this.setState({
                titleList: titleList
            });
        }
        /*组织table所需columns数据*/

        /*处理合并*/

    }, {
        key: 'setColumns',

        /*栏目*/
        value: function setColumns(columndata) {
            this.colIndex = {};
            this.mergeCol = [];
            var tableWidth = 0,
                sameWidth = true,
                firstCol = null;
            var i = 0,
                preWidth = void 0;
            for (var key in columndata) {
                firstCol = key;
                var width = columndata[key].iColWidth ? columndata[key].iColWidth : 150;
                if (preWidth && preWidth != width) sameWidth = false;
                tableWidth += width;
                this.colIndex[key] = i;
                ++i;
            }
            // if (sameWidth && columndata[firstCol]) columndata[firstCol].iColWidth = columndata[firstCol].iColWidth ? (columndata[firstCol].iColWidth + 5) : 155;
            var col = cb.utils.extend(true, {}, columndata);
            if (tableWidth < this.props.width) {
                col.emptycol = { "cFieldName": "emptycol", "cItemName": "emptycol", "cCaption": "", "cShowCaption": "", "iColWidth": tableWidth - this.props.width, "bNeedSum": false, "bShowIt": true, "cControlType": "empty" };
            }
            this.columndata = col;
            var columns = this.RemodelingMergeColumn(col);
            this.setState({ columns: columns, tableWidth: tableWidth });
        }
        /**/

    }, {
        key: 'setColumnByTtile',
        value: function setColumnByTtile(columns) {
            var columnset = this.RemodelingColumn(columns);
            this.setState({
                columns: columnset
            });
        }
        /*合计数据*/

    }, {
        key: 'setSum',
        value: function setSum(sumData) {
            this.setState({ sumData: sumData[0] });
        }
        /*报表数据源*/

    }, {
        key: 'setDataSource',
        value: function setDataSource(data) {
            this.setState({ dataSource: data, isLoading: false });
            var col = cb.utils.extend(true, {}, this.columndata);
            var columns = this.RemodelingMergeColumn(col);
            this.setState({ columns: columns });
        }
        //设置分页


        /*排序*/

        /*单元格点击事件*/

        /*行点击事件*/

        /*行双击事件*/

        /*鼠标划入*/

        /*鼠标离开*/

        /*设置行className*/

    }, {
        key: 'getEmptyData',

        /*无数据状态表格样式*/
        value: function getEmptyData() {
            var data = this.state.dataSource;
            if (data.length == 0) return _react2.default.createElement(
                'div',
                { className: 'table-nodata' },
                _react2.default.createElement(_antd.Icon, { type: 'nodata' }),
                '\u6682\u65F6\u6CA1\u6709\u6570\u636E\u54E6~'
            );
        }
        //分页改变事件

        /*页大小改变*/

        // /*选中列*/
        // getRowSelection = () => {
        //     return ({});
        // }
        /*栏目设置*/

    }, {
        key: 'getSettingContent',
        value: function getSettingContent() {
            var _this4 = this;

            var titleList = this.state.titleList;
            var titileItem = [];
            titleList.forEach(function (element, index) {
                var _this3 = this;

                var item = void 0;
                var bShowPop = element.bShowPop ? element.bShowPop : false;
                if (!element.bHidden) {
                    var showIt = false;
                    if (element.bShowIt == 1) {
                        showIt = true;
                    }
                    item = bShowPop ? _react2.default.createElement(
                        _basic.Row,
                        { style: { minHeight: "25px" }, onMouseEnter: function onMouseEnter(e) {
                                return _this3.onMouseEnter(e, index);
                            }, onMouseLeave: function onMouseLeave(e) {
                                return _this3.onMouseLeave(e, index);
                            } },
                        _react2.default.createElement(
                            'div',
                            { className: 'pull-left' },
                            _react2.default.createElement(
                                _antd.Checkbox,
                                { checked: showIt, onChange: function onChange(e) {
                                        return _this3.onChecked(e, element, index);
                                    } },
                                element.cShowCaption
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'pull-right' },
                            _react2.default.createElement(_antd.Button, { style: { borderWidth: 0 }, icon: 'arrow-up', onClick: function onClick() {
                                    return _this3.sortClick('up', index);
                                } }),
                            _react2.default.createElement(_antd.Button, { style: { borderWidth: 0 }, icon: 'arrow-down', onClick: function onClick() {
                                    return _this3.sortClick('down', index);
                                } })
                        )
                    ) : _react2.default.createElement(
                        _basic.Row,
                        { colCount: 2, style: { minHeight: "25px" }, onMouseEnter: function onMouseEnter(e) {
                                return _this3.onMouseEnter(e, index);
                            }, onMouseLeave: function onMouseLeave(e) {
                                return _this3.onMouseLeave(e, index);
                            } },
                        _react2.default.createElement(
                            'div',
                            { className: 'pull-left' },
                            _react2.default.createElement(
                                _antd.Checkbox,
                                { checked: showIt, onChange: function onChange(e) {
                                        return _this3.onChecked(e, element, index);
                                    } },
                                element.cShowCaption
                            )
                        ),
                        _react2.default.createElement('div', { className: 'pull-right' })
                    );
                    titileItem.push(item);
                }
            }, this);
            var buttonClass = 'filter-btn-fixed';

            var settingContent = _react2.default.createElement(
                'div',
                { className: buttonClass, style: { overflow: "auto", height: "250px" } },
                _react2.default.createElement(
                    'div',
                    { className: 'filter-txt' },
                    titileItem
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'filter-btn-1' },
                    _react2.default.createElement(
                        _antd.Button,
                        { type: "primary", size: 'small', onClick: function onClick() {
                                return _this4.buttonClick('save');
                            } },
                        '\u4FDD\u5B58'
                    ),
                    _react2.default.createElement(
                        _antd.Button,
                        { type: "default", size: 'small', onClick: function onClick() {
                                return _this4.buttonClick('cancel');
                            } },
                        '\u53D6\u6D88'
                    )
                )
            );
            return settingContent;
        }
    }, {
        key: 'onChecked',
        value: function onChecked(e, element, index) {
            var checked = e.target.checked;
            var id = element.id;
            var titleList = this.state.titleList;
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
                titleList: titleList
            });
        }
    }, {
        key: 'buttonClick',
        value: function buttonClick(type) {
            if (type == 'save') {
                this.props.model.setTitleData(this.state.titleList);
            }
            this.setState({
                popFlag: false
            });
        }
    }, {
        key: 'onMouseEnter',
        value: function onMouseEnter(e, index) {
            var titleList = this.state.titleList;
            titleList[index].bShowPop = true;
            this.setState({
                titleList: titleList
            });
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave(e, index) {
            var titleList = this.state.titleList;
            titleList.forEach(function (ele, i) {
                ele.bShowPop = false;
            });
            this.sort = "";
            this.setState({
                titleList: titleList
            });
        }
        //排序

    }, {
        key: 'sortClick',
        value: function sortClick(type, index) {
            var titleList = this.state.titleList;
            var pre = cb.utils.extend(true, {}, titleList[index - 1]);
            var next = cb.utils.extend(true, {}, titleList[index + 1]);
            var now = cb.utils.extend(true, {}, titleList[index]);
            if (type == 'up') {
                this.sort = "up";
                var preOrder = now.iOrder - 1;
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
                var nextOrder = now.iOrder + 1;
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
                titleList: titleList
            });
        }
    }, {
        key: 'columnSetting',
        value: function columnSetting() {
            // this.props.model.getTitleData(this.props.code);
            this.setState({
                popFlag: !this.state.popFlag
            });
            this.props.model.columnSetting(this.props.code);
        }
        /*获取footer*/

    }, {
        key: 'render',
        value: function render() {
            var _React$createElement;

            var columnSetting = this.getColumnSetting();
            // let emptyData = this.getEmptyData();
            var pagination = this.setPage(this.state.pagination, this.state.showPagination);
            var scrollx = this.state.tableWidth;
            if (this.state.dataSource.length > 10) {
                scrollx += 8;
            }
            if (scrollx < this.props.width - 40) {
                scrollx = this.props.width - 40;
            }
            var className = 'rpt-table';
            if (this.state.dataSource.length > 10) {
                className = 'rpt-table rpttable-padding-header';
            }
            var local = {};
            local.emptyText = this.getEmptyData();
            return _react2.default.createElement(
                'div',
                { ref: 'rptTable', className: className, style: { width: this.props.width } },
                _react2.default.createElement(
                    _basic.Row,
                    null,
                    columnSetting,
                    _react2.default.createElement(_antd.Table, (_React$createElement = { dataSource: this.state.dataSource, key: 'retTable',
                        locale: local,
                        rowKey: function rowKey(record, index) {
                            return record.key;
                        },
                        onChange: this.onTableChange,
                        columns: this.state.columns, rowClassName: this.setRowClassName,
                        onRowClick: this.onRowClick, onRowDoubleClick: this.onRowDoubleClick, bordered: true,
                        onRowMouseEnter: this.onRowMouseEnter, onRowMouseLeave: this.onRowMouseLeave,
                        pagination: false }, _defineProperty(_React$createElement, 'bordered', false), _defineProperty(_React$createElement, 'showHeader', true), _defineProperty(_React$createElement, 'bordered', true), _defineProperty(_React$createElement, 'footer', this.getFooter), _defineProperty(_React$createElement, 'scroll', { x: scrollx, y: 400 }), _React$createElement))
                ),
                _react2.default.createElement(
                    _basic.Row,
                    null,
                    pagination
                )
            );
        }
    }]);

    return RptTable;
}(_react2.default.Component);

exports.default = RptTable;