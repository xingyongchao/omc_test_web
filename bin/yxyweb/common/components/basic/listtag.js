'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = _antd.Input.Search;

var ListTag = function (_Component) {
  _inherits(ListTag, _Component);

  function ListTag(props) {
    _classCallCheck(this, ListTag);

    var _this = _possibleConstructorReturn(this, (ListTag.__proto__ || Object.getPrototypeOf(ListTag)).call(this, props));

    _this.onChange = function (e, value) {
      var titleField = _this.state.textField || 'name';
      var index = _this.state.dataSource.findIndex(function (item) {
        return item[titleField] === value;
      });
      var referValue = void 0;
      if (value == null) {
        referValue = value;
      } else {
        _this.gridModel.select([index]);
        referValue = _this.gridModel.getSelectedRows();
      }
      _this.referViewModel.execute('afterOkClick', referValue);
      _this.props.closePop();
    };

    _this.onButtonClick = function (e, type) {
      var _this$state = _this.state,
          checkedKeys = _this$state.checkedKeys,
          dataSource = _this$state.dataSource;

      var rows = [];
      if (type == 'submit') {
        checkedKeys.map(function (ele) {
          rows.push(dataSource[ele]);
        }, _this);
        _this.referViewModel.execute('afterOkClick', rows);
      }
      _this.props.closePop();
    };

    _this.onChecked = function (e, id) {
      var _this$state2 = _this.state,
          dataStatus = _this$state2.dataStatus,
          checkedKeys = _this$state2.checkedKeys;

      var checked = e.target.checked;
      dataStatus[id].checked = checked;
      if (checked) {
        checkedKeys.push(dataStatus[id].index);
      } else {
        checkedKeys = [];
        for (var key in dataStatus) {
          if (dataStatus[key].checked) {
            checkedKeys.push(dataStatus[key].index);
          }
        }
      }
      _this.setState({ dataStatus: dataStatus, checkedKeys: checkedKeys });
    };

    _this.onSearchChange = function (e) {
      var value = e.target.value;
      _this.setState({ searchValue: value });
    };

    _this.state = {
      multiple: props.multiple,
      dataStatus: {},
      checkedKeys: [],
      searchValue: ''
    };
    return _this;
  }

  _createClass(ListTag, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.referViewModel = this.props.viewModel;
      this.gridModel = this.referViewModel.get('table');
      this.gridModel.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.gridModel.removeListener(this);
    }
  }, {
    key: 'setDataSource',
    value: function setDataSource(dataSource) {
      this.setState({ dataSource: dataSource });
      var dataStatus = this.state.dataStatus;
      if (this.state.multiple) {
        if (!dataStatus || dataStatus == {}) {
          dataSource.map(function (ele, index) {
            dataStatus[ele.id] = { name: ele.name, checked: false, index: index };
          });
        } else {
          dataSource.map(function (ele, index) {
            if (!dataStatus[ele.id]) {
              dataStatus[ele.id] = { name: ele.name, checked: false, index: index };
            }
          });
        }
        this.setState({ dataStatus: dataStatus });
      }
    }
    /*multiple下选中事件*/

  }, {
    key: 'getPopContent',
    value: function getPopContent(data) {
      var _this3 = this;

      var _state = this.state,
          multiple = _state.multiple,
          disabled = _state.disabled,
          value = _state.value,
          dataStatus = _state.dataStatus,
          searchValue = _state.searchValue,
          checkedKeys = _state.checkedKeys;

      var controls = [];
      var loopData = data;
      if (searchValue != '') {
        loopData = [];
        data.map(function (ele) {
          if (ele.name.indexOf(searchValue) > -1) {
            loopData.push(ele);
          }
        });
      }
      if (loopData.length <= 0) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(Search, { value: searchValue, onChange: this.onSearchChange }),
          _react2.default.createElement(
            'span',
            null,
            '\u554A\u54E6~\u6CA1\u6709\u641C\u7D22\u5230~'
          )
        );
      }
      loopData.map(function (ele) {
        var _this2 = this;

        if (!multiple) {
          controls.push(_react2.default.createElement(
            'li',
            { onClick: function onClick(e) {
                return _this2.onChange(e, ele.name);
              } },
            ele.name
          ));
        } else {
          var checked = dataStatus[ele.id] ? dataStatus[ele.id].checked : false;
          controls.push(_react2.default.createElement(
            _antd.Checkbox,
            { checked: checked, key: ele.id, onChange: function onChange(e) {
                return _this2.onChecked(e, ele.id);
              } },
            ele.name
          ));
        }
      }, this);
      if (!multiple) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(Search, { value: searchValue, onChange: this.onSearchChange }),
          _react2.default.createElement(
            'ul',
            null,
            controls
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'listRefer' },
          _react2.default.createElement(Search, { value: searchValue, onChange: this.onSearchChange }),
          _react2.default.createElement(
            'div',
            { className: 'listRefer-content', style: { "max-height": "210px" } },
            controls
          ),
          _react2.default.createElement(
            'div',
            { className: 'filter-btn-1' },
            _react2.default.createElement(
              _antd.Button,
              { className: 'ant-btn-sm', type: 'primary', onClick: function onClick(e) {
                  return _this3.onButtonClick(e, 'submit');
                } },
              '\u786E\u5B9A'
            ),
            _react2.default.createElement(
              _antd.Button,
              { className: 'ant-btn-sm', type: 'default', onClick: function onClick(e) {
                  return _this3.onButtonClick(e, 'cancel');
                } },
              '\u53D6\u6D88'
            )
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var dataSource = this.state.dataSource || [];
      return this.getPopContent(dataSource);
    }
  }]);

  return ListTag;
}(_react.Component);

exports.default = ListTag;