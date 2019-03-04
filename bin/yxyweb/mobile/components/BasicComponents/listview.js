'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _util = require('../../../common/helpers/util');

var _formatDate = require('../../../common/helpers/formatDate');

var format = _interopRequireWildcard(_formatDate);

var _SvgIcon = require('../../../common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../../../../mobile/styles/globalCss/listview.css');

var CheckboxItem = _antdMobile.Checkbox.CheckboxItem;

var ListViewControl = function (_Component) {
  _inherits(ListViewControl, _Component);

  function ListViewControl(props) {
    _classCallCheck(this, ListViewControl);

    var _this = _possibleConstructorReturn(this, (ListViewControl.__proto__ || Object.getPrototypeOf(ListViewControl)).call(this, props));

    _this.initListData = function (data) {
      if (!data) data = _this.props.dataSource;
      data.map(function (item, index) {
        _this.dataIndex.push('row-' + index);
      });
      _this.setState({
        dataSource: _this.listViewDataSource.cloneWithRows(_this.dataIndex),
        refreshing: false
      });
    };

    _this.onEndReached = function (event) {
      _this.props.loadMore();
    };

    _this.onRefresh = function () {
      _this.props.refreshList();
    };

    _this.onRowClick = function (e, rowID) {
      _this.props.onRowClick(e, rowID);
    };

    _this.loopRow = function (rows, columns, rowData) {
      if (!rows) return null;
      var rowControls = [];
      rows.map(function (row) {
        var cols = [];
        if (row.cols) cols = _this.loopCol(row.cols, columns, dataSource[rowID]);
        rowControls.push(_react2.default.createElement(
          'div',
          { className: 'row' },
          cols
        ));
      });
      return rowControls;
    };

    _this.loopCol = function (cols, columns, rowData) {
      if (!cols) return null;
      var controls = [];
      cols.map(function (col) {
        var className = col.className,
            cItemName = col.cItemName,
            showCaption = col.showCaption,
            span = col.span,
            rows = col.rows,
            float = col.float;

        var colClass = (className ? className : '') + ' col',
            control = void 0,
            column = columns[cItemName];
        if (span != 0) colClass = colClass + ' span-' + span;
        if (float == 'left') colClass = colClass + ' floatLeft';else colClass = colClass + ' floatRight';
        if (rows) {
          control = _this.loopRow(rows, columns, rowData);
        } else {
          if (showCaption) {
            control = [];
            control.push(_react2.default.createElement(
              'span',
              { className: 'name' },
              column.cShowCaption
            ));
            control.push(_react2.default.createElement(
              'span',
              { className: 'value' },
              rowData[cItemName]
            ));
          } else {
            control = _react2.default.createElement(
              'span',
              { className: 'value' },
              rowData[cItemName]
            );
          }
        }
        controls.push(_react2.default.createElement(
          'div',
          { className: colClass },
          control
        ));
      });
      return controls;
    };

    _this.getRow = function (columns, rowData) {
      var controls = [];
      for (var key in columns) {
        var _columns$key = columns[key],
            cShowCaption = _columns$key.cShowCaption,
            iAlign = _columns$key.iAlign,
            cStyle = _columns$key.cStyle,
            cItemName = _columns$key.cItemName;

        var colClass = 'col',
            colControls = [],
            align = '';
        var itemValue = _this.getFormatValue(columns[key], rowData[cItemName]);

        if (cb.utils.isEmpty(cShowCaption)) {
          colControls.push(_react2.default.createElement(
            'span',
            { className: 'value' },
            itemValue
          ));
        } else {
          colControls.push(_react2.default.createElement(
            'span',
            { className: 'name' },
            cShowCaption + ":  "
          ));
          colControls.push(_react2.default.createElement(
            'span',
            { className: 'value' },
            itemValue
          ));
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
          if (cStyle.className) colClass = colClass + ' ' + cStyle.className;
        }
        if (iAlign) {
          if (iAlign == 1) align = 'textAlignLeft';
          if (iAlign == 2) align = 'textAlignCenter';
          if (iAlign == 3) align = 'textAlignRight';
        } else {
          align = 'textAlignLeft';
        }
        colClass = colClass + ' ' + align;
        controls.push(_react2.default.createElement(
          'div',
          { className: colClass },
          colControls
        ));
      }
      return controls;
    };

    _this.getFormatValue = function (col, value) {
      var cControlType = col.cControlType && col.cControlType.trim().toLocaleLowerCase();
      switch (cControlType) {
        case 'select':
          if (cb.utils.isEmpty(value)) return '';
          var formatText = null;
          if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') formatText = value;else if (value.nameType === 'icontext') formatText = _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_antdMobile.Icon, { type: value.icon }),
            value.text
          );else if (value.nameType === 'icon') formatText = value.icon ? _react2.default.createElement(_antdMobile.Icon, { type: value.icon }) : '';else formatText = value.text;
          return formatText;
        case 'inputnumber':
        case 'money':
        case 'price':
          if (cb.utils.isEmpty(value)) return '';
          if (isNaN(value)) return value;

          /*谓词变量支持系统参数*/
          var cFormatData = col.cFormatData;
          try {
            if (!cFormatData || cFormatData == '') {
              cFormatData = {};
            } else {
              cFormatData = JSON.parse(cFormatData);
            }
          } catch (e) {
            cb.utils.alert('数量/金额/单价，预制错误！', 'error');
          }
          var iNumPoint = col.iNumPoint;
          var decimal = cFormatData.decimal ? (0, _util.getPredicateValue)(cFormatData.decimal) : null;
          if (cControlType === 'money') {
            if (decimal) iNumPoint = decimal;else iNumPoint = cb.rest.AppContext.option.amountofdecimal;
          } else if (cControlType === 'price') {
            if (decimal) iNumPoint = decimal;else iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
          } else {
            if (decimal) iNumPoint = decimal;else if (cb.utils.isEmpty(iNumPoint)) iNumPoint = null;
          }

          if (!isNaN(iNumPoint) && iNumPoint != null) {
            value = parseFloat(value);
            value = (0, _util.getRoundValue)(value, iNumPoint);
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
            var fmt = 'YYYY-MM-dd';
            if (col.cFormatData) fmt = col.cFormatData;
            if (fmt == 'YSTD_TD_H_M') {
              value = format.formatByNowDate(new Date(value));
            } else {
              value = format.dateFormat(new Date(value), fmt);
            }
          }
          return value;
        default:
          return value;
      }
    };

    _this.getReferRow = function (dataSource, columns, fields, rowID) {
      var colLen = fields.length;
      var controls = [];
      var className = 'listview-row';
      if (colLen == 1) className = className + ' row-1';else if (colLen == 2) className = className + ' row-2';

      var selectIndexes = _this.props.selectIndexes;
      var selected = false;
      selectIndexes && selectIndexes.map(function (index) {
        if (index == rowID) selected = true;
      });

      if (_this.props.cRefType == 'aa_operator_mobile' || _this.props.cRefType == 'aa_operator' || _this.props.cRefType == "aa_userref_mobile") {
        className = 'listview-row row-operator';
        var url = dataSource[rowID].cHeadPicUrl;
        var name = dataSource[rowID].name;
        var code = dataSource[rowID].code;;
        var colorIndex = (parseFloat(rowID) + 1) % 5;
        var color = "";
        if (!url) {
          var first = "";
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
          url = _react2.default.createElement(
            'span',
            { className: color },
            first
          );
        } else {
          url = _react2.default.createElement('img', { src: dataSource[rowID].cHeadPicUrl });
        }
        return _react2.default.createElement(
          'div',
          { className: className, onClick: function onClick(e) {
              return _this.onRowClick(e, rowID);
            } },
          _react2.default.createElement(
            'div',
            { className: 'operator-img' },
            url
          ),
          _react2.default.createElement(
            'div',
            { className: 'operator-rows' },
            _react2.default.createElement(
              'div',
              { className: 'operator-row-name' },
              name
            ),
            _react2.default.createElement(
              'div',
              { className: 'operator-row-code' },
              code
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row-select' },
            _react2.default.createElement(_antdMobile.Icon, { type: selected ? "icon-xuanzhong1" : "icon-kexuan" })
          )
        );
      } else if (colLen < 3) {
        fields.map(function (field, index) {
          /*谓词变量支持系统参数*/
          var cFormatData = columns[field].cFormatData;
          try {
            if (!cFormatData || cFormatData == '') {
              cFormatData = {};
            } else {
              cFormatData = JSON.parse(cFormatData);
            }
          } catch (e) {
            cb.utils.alert('cFormatData，预制错误！', 'error');
          }
          if (cFormatData.composite) {} else {
            if (index == 0) controls.push(_react2.default.createElement(
              'div',
              { className: 'row main' },
              _react2.default.createElement(
                'span',
                { className: 'value' },
                dataSource[rowID][field]
              )
            ));else controls.push(_react2.default.createElement(
              'div',
              { className: 'row child' },
              _react2.default.createElement(
                'span',
                { className: 'value' },
                dataSource[rowID][field]
              )
            ));
          }
        });
      } else {
        for (var key in columns) {
          if (columns[key].cShowCaption) {
            controls.push(_react2.default.createElement(
              'div',
              { className: 'row row-mul-col' },
              _react2.default.createElement(
                'span',
                { className: 'name' },
                columns[key].cShowCaption
              ),
              _react2.default.createElement(
                'span',
                { className: 'value' },
                _this.getObjectText(dataSource[rowID][key])
              )
            ));
          } else {
            controls.push(_react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'span',
                { className: 'value' },
                _this.getObjectText(dataSource[rowID][key])
              )
            ));
          }
        }
      }
      var clsssName2 = "";
      // if (this.props.cRefType == "aa_businesstype"
      //   || this.props.cRefType == "aa_productsku"
      //   || this.props.cRefType == "aa_nomalproduct"
      //   || this.props.cRefType == "aa_salespromotion"
      //   || this.props.cRefType == "aa_user"
      //   || this.props.cRefType == "aa_store")
      clsssName2 = "row-businesstype";
      return _react2.default.createElement(
        'div',
        { className: className + " " + clsssName2, onClick: function onClick(e) {
            return _this.onRowClick(e, rowID);
          } },
        controls,
        _react2.default.createElement(
          'div',
          { className: 'row-select' },
          _react2.default.createElement(_antdMobile.Icon, { type: selected ? "icon-xuanzhong1" : "icon-kexuan" })
        )
      );
    };

    _this.renderRow = function (rowData, sectionID, rowID) {
      var _this$props = _this.props,
          dataSource = _this$props.dataSource,
          cStyle = _this$props.cStyle,
          columns = _this$props.columns,
          fields = _this$props.fields;

      var controls = [];
      if (!dataSource[rowID]) return null;
      if (_this.props.listType == 'refer') /*参照特殊处理*/
        return _this.getReferRow(dataSource, columns, fields, rowID);

      if (!cStyle) {
        for (var key in columns) {
          if (columns[key].cShowCaption) {
            controls.push(_react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'span',
                { className: 'name' },
                columns[key].cShowCaption
              ),
              _react2.default.createElement(
                'span',
                { className: 'value' },
                _this.getObjectText(dataSource[rowID][key])
              )
            ));
          } else {
            controls.push(_react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'span',
                { className: 'value' },
                _this.getObjectText(dataSource[rowID][key])
              )
            ));
          }
        }
      } else {
        cStyle.map(function (row) {
          var rowControl = [];
          if (row.cols) {
            rowControl = _this.loopCol(row.cols, columns, dataSource[rowID]);
          } else {
            rowControl = _this.getRow(columns[row.key], dataSource[rowID]);
          }
          controls.push(_react2.default.createElement(
            'div',
            { className: 'row' },
            rowControl
          ));
        });
      }
      if (_this.props.isEdit) {
        var selectIndexes = _this.props.selectIndexes;
        var checked = selectIndexes.indexOf(Number(rowID)) > -1;
        return _react2.default.createElement(
          'div',
          { className: 'edit-row' },
          _react2.default.createElement(CheckboxItem, { checked: checked, onChange: function onChange(e) {
              return _this.onRowCheck(e, rowID);
            } }),
          _react2.default.createElement(
            'div',
            { className: 'listview-row', onClick: function onClick(e) {
                return _this.onRowClick(e, rowID);
              } },
            controls
          )
        );
      } else {
        if (_this.props.inRowToolbarMeta) {
          return _react2.default.createElement(
            'div',
            { className: 'edit-row' },
            _react2.default.createElement(
              'div',
              { className: 'row-toolbar', onClick: function onClick() {
                  return _this.showRowActions(rowID);
                } },
              _react2.default.createElement('i', { className: 'icon icon-gengduo' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'listview-row', onClick: function onClick(e) {
                  return _this.onRowClick(e, rowID);
                } },
              controls
            )
          );
        } else {
          return _react2.default.createElement(
            'div',
            { className: 'listview-row', onClick: function onClick(e) {
                return _this.onRowClick(e, rowID);
              } },
            controls
          );
        }
      }
    };

    _this.onRowCheck = function (e, rowID) {
      var checked = e.target.checked;
      if (_this.props.onRowSelect) _this.props.onRowSelect(checked, rowID);
    };

    _this.showRowActions = function (rowID) {
      var rowToobarMeta = _this.props.inRowToolbarMeta;
      var actionState = _this.props.actionState;
      var _id = _this.props.dataSource[rowID]._id;
      var controls = rowToobarMeta.controls;
      var data = [];
      controls.map(function (control) {
        if (actionState[_id] && actionState[_id][control.cItemName] && actionState[_id][control.cItemName].visible) data.push({
          icon: _react2.default.createElement(_SvgIcon2.default, { type: control.icon }),
          title: control.cShowCaption
        });
      });
      _antdMobile.ActionSheet.showShareActionSheetWithOptions({
        options: data
      }, function (buttonIndex, rowIndex) {
        if (buttonIndex !== -1) {
          var action = controls[buttonIndex];
          _this.props.onRowActionClick(action.cItemName, rowID);
        }
      });
    };

    _this.renderSeparator = function (sectionID, rowID) {
      _react2.default.createElement('div', {
        key: rowID,
        style: {
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED'
        }
      });
    };

    _this.renderFooter = function () {
      var _this$props2 = _this.props,
          isLoading = _this$props2.isLoading,
          pageInfo = _this$props2.pageInfo;

      var content = '';
      if (isLoading) {
        content = '加载中...';
      } else {
        if (pageInfo) {
          if (pageInfo.pageIndex == pageInfo.pageCount) {
            content = '没有更多数据了~';
          }
          if (pageInfo.pageCount > pageInfo.pageIndex) {
            return _react2.default.createElement(
              'div',
              { onClick: _this.onEndReached.bind(_this), style: { padding: 10, textAlign: 'center' } },
              '上拉加载更多'
            );
          }
        } else {
          content = '上拉加载更多';
        }
      }
      return _react2.default.createElement(
        'div',
        { style: { padding: 15, textAlign: 'center' } },
        content
      );
    };

    _this.listViewDataSource = new _antdMobile.ListView.DataSource({
      rowHasChanged: function rowHasChanged(row1, row2) {
        return row1 !== row2;
      }
    });
    _this.dataIndex = [];
    _this.state = {
      dataSource: _this.listViewDataSource.cloneWithRows(_this.dataIndex),
      isShowRTop: false,
      refreshing: _this.props.refreshing
    };
    return _this;
  }

  _createClass(ListViewControl, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          isLoading = _props.isLoading,
          refreshing = _props.refreshing,
          isEdit = _props.isEdit;

      var nextIsLoading = nextProps.isLoading;
      var nextEdit = nextProps.isEdit;
      var nextDataSource = nextProps.dataSource;
      var nextRefresing = nextProps.refreshing;
      var selectIndexes = JSON.stringify(this.props.selectIndexes);
      var nextSelectIndexes = JSON.stringify(nextProps.selectIndexes);
      if (isLoading != nextIsLoading || refreshing != nextRefresing || selectIndexes != nextSelectIndexes || isEdit != nextEdit) {
        this.initListData(nextDataSource);
        return true;
      }
    }
    /*初始化ListView 需要dataSource*/

    /*上拉加载*/

    /*下拉刷新*/

  }, {
    key: 'getObjectText',
    value: function getObjectText(obj) {
      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == "object") return obj.text;else return obj;
    }
  }, {
    key: 'scrollListener',


    //滚动事件监听
    value: function scrollListener(e) {
      var y = e.target.scrollTop;
      var height = document.documentElement.offsetHeight - window.__fontUnit * 1.28 + 22;
      if (parseInt(y) >= height) {
        if (this.props.showRTop) this.props.showRTop();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var refreshing = this.state.refreshing;
      var _props2 = this.props,
          dataSource = _props2.dataSource,
          isFirstLoading = _props2.isFirstLoading,
          listType = _props2.listType;

      if (isFirstLoading) {
        return _react2.default.createElement('div', { className: 'list-loading-noData' });
      }
      if (dataSource && dataSource.length == 0) {
        return _react2.default.createElement('div', { className: 'refer_no_date' });
      }
      return _react2.default.createElement(_antdMobile.ListView, {
        ref: function ref(el) {
          return _this2.lv = el;
        },
        key: "listview",
        initialListSize: 20,
        dataSource: this.state.dataSource,
        renderFooter: this.renderFooter,
        renderRow: this.renderRow,
        renderSeparator: this.renderSeparator,
        useBodyScroll: false,
        style: { height: this.props.height },
        pullToRefresh: _react2.default.createElement(_antdMobile.PullToRefresh, {
          refreshing: refreshing,
          onRefresh: this.onRefresh
        }),
        onScroll: function onScroll(e) {
          _this2.scrollListener(e);
        },
        scrollRenderAheadDistance: 500,
        scrollEventThrottle: 1000,
        onEndReached: this.onEndReached,
        onEndReachedThreshold: 100,
        pageSize: 20
      });
    }
  }]);

  return ListViewControl;
}(_react.Component);

exports.default = ListViewControl;