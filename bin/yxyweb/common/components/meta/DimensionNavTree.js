'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DimensionNavTreeControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _util = require('../../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = _antd.Input.Search;
var TreeNode = _antd.Tree.TreeNode;

var DimensionNavTreeControl = exports.DimensionNavTreeControl = function (_React$Component) {
  _inherits(DimensionNavTreeControl, _React$Component);

  //SearchTree
  function DimensionNavTreeControl(props) {
    _classCallCheck(this, DimensionNavTreeControl);

    var _this = _possibleConstructorReturn(this, (DimensionNavTreeControl.__proto__ || Object.getPrototypeOf(DimensionNavTreeControl)).call(this, props));

    _this.onExpand = function (expandedKeys, e) {
      // this.setState({ expandedKeys: expandedKeys });
      if (e) {
        //通过点击＋或者-触发
        _this.setState({ expandedKeys: expandedKeys, autoExpandParent: false });
      } else {
        //通过搜索触发
        _this.setState({ expandedKeys: expandedKeys, autoExpandParent: true });
      }
    };

    _this.onChange = function (e) {
      var value = e.target.value;
      var expandedKeys = [];
      if (value != "") {
        _this.nodesList.forEach(function (item) {
          if (item.title.indexOf(value) > -1) {
            if (expandedKeys.indexOf(item.parentKey) == -1) expandedKeys.push(item.parentKey);
          }
        });
      }

      _this.setState({
        expandedKeys: expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
    };

    _this.onFilterClick = function (params) {
      if (!params.bFromNav && _this.state.firstQueryDone) {
        _this.state.condition = params.condition;
        _this.getData();
      }
    };

    _this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      treeData: {},
      firstQueryDone: false
    };
    _this.nodesList = [];
    _this.TreeHeadKey = "all";
    return _this;
  }

  _createClass(DimensionNavTreeControl, [{
    key: 'doProxy',
    value: function doProxy(url, method, params, callback, noUniform) {
      var config = { url: url, method: method, params: params };
      if (noUniform) {
        config.options = { uniform: false };
      }
      (0, _util.proxy)(config).then(function (json) {
        callback(json);
      });
    }
  }, {
    key: 'getData',
    value: function getData() {
      var self = this;
      var param = {};
      param.billnum = "rm_saleanalysis"; // self.props.billnum;
      param.condition = self.state.condition;
      param.dimensionId = 30022941;
      // param.groupSchemaId = 669953;
      // param.page = { pageSize: 20, pageIndex: 1 };
      var callback = function callback(json) {
        if (json.code === 200) {
          if (json.data) {
            self.setState({ treeData: json.data, expandedKeys: [] });
          }
        }
      };
      self.doProxy('/report/list', 'POST', param, callback);
    }
  }, {
    key: 'getTitle',
    value: function getTitle(title) {
      var searchValue = this.state.searchValue;
      if (searchValue != "") {
        var index = title.indexOf(searchValue);
        var beforeStr = title.substr(0, index);
        var afterStr = title.substr(index + searchValue.length);
        return index > -1 ? _react2.default.createElement(
          'span',
          null,
          beforeStr,
          _react2.default.createElement(
            'span',
            { style: { color: '#f50' } },
            searchValue
          ),
          afterStr
        ) : _react2.default.createElement(
          'span',
          null,
          title
        );
      }
      return _react2.default.createElement(
        'span',
        null,
        title
      );
    }
  }, {
    key: 'getTreeNodes',
    value: function getTreeNodes(recordList, parentFilter, parentKey) {
      var _this2 = this;

      if (parentKey == this.TreeHeadKey) {
        this.nodesList = [];
      }
      var treeNodes = void 0;
      if (recordList && recordList.length > 0) {
        treeNodes = [];
        recordList.forEach(function (ele) {
          if (!ele.navKey) {
            ele.navKey = "navKey_" + Math.random().toString().replace(".", "");
          }
          var key = ele.navKey;
          var filter = _.cloneDeep(parentFilter);
          ele.field && ele.field.forEach(function (item, index) {
            filter[item] = ele.caption[index];
          });
          var joinedCaption = ele.caption && ele.caption.join("_");
          var title = _this2.getTitle(joinedCaption);
          var childrenNodes = undefined;
          if (ele.children && ele.children.length > 0) {
            childrenNodes = _this2.getTreeNodes(ele.children, filter, key);
          }
          _this2.nodesList.push({ title: joinedCaption, key: key, parentKey: parentKey });
          treeNodes.push(_react2.default.createElement(
            TreeNode,
            {
              title: title,
              key: key,
              filter: filter
            },
            childrenNodes
          ));
          // treeNodes.push(<TreeNode {...node} > {childrenNodes}</TreeNode >);
        });
      }
      return treeNodes;
    }
  }, {
    key: 'onSelect',
    value: function onSelect(selectedKeys, e) {
      console.log("选择点的过滤项目 = " + JSON.stringify(e.node.props.filter));
      var filterViewModel = this.props.viewModel.getCache('FilterViewModel');
      filterViewModel.execute('navClick', e.node && e.node.props.filter || {});
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var treeNodes = this.getTreeNodes(this.state.treeData.recordList, {}, this.TreeHeadKey);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(Search, {
          style: { marginBottom: 5 },
          placeholder: 'Search',
          onChange: this.onChange
        }),
        _react2.default.createElement(
          _antd.Tree,
          {
            onSelect: function onSelect(selectedKeys, e) {
              return _this3.onSelect(selectedKeys, e);
            },
            onExpand: this.onExpand,
            expandedKeys: this.state.expandedKeys,
            autoExpandParent: this.state.autoExpandParent
          },
          _react2.default.createElement(
            TreeNode,
            { title: '\u5168\u90E8\u7C7B\u522B', key: this.TreeHeadKey },
            treeNodes
          )
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      // if (this.props.model)
      //   this.props.model.addListener(this);
      this.props.viewModel.on("filterClick", this.onFilterClick);
      this.props.viewModel.on('firstQueryDone', function (params) {

        self.state.firstQueryDone = params;
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // if (this.props.model)
      //   this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }]);

  return DimensionNavTreeControl;
}(_react2.default.Component);

;
exports.default = DimensionNavTreeControl;