'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _util = require('../../helpers/util');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeNode = _antd.Tree.TreeNode;

var Search = _antd.Input.Search;
var dataList = [];

var definedLeftcontent = function (_React$Component) {
  _inherits(definedLeftcontent, _React$Component);

  function definedLeftcontent(props) {
    _classCallCheck(this, definedLeftcontent);

    var _this = _possibleConstructorReturn(this, (definedLeftcontent.__proto__ || Object.getPrototypeOf(definedLeftcontent)).call(this, props));

    _this.getParentKey = function (key, tree) {
      var parentKey = void 0;
      for (var i = 0; i < tree.length; i++) {
        var node = tree[i];
        if (node.children) {
          if (node.children.some(function (item) {
            return item.name === key;
          })) {
            parentKey = node.name;
          } else if (getParentKey(key, node.children)) {
            parentKey = getParentKey(key, node.children);
          }
        }
      }
      return parentKey;
    };

    _this.onExpand = function (expandedKeys) {
      _this.setState({
        expandedKeys: expandedKeys,
        autoExpandParent: false
      });
    };

    _this.onChange = function (e) {
      var billNodata = _this.state.billNodata;

      var value = e.target.value;
      var expandedKeys = dataList.map(function (item) {
        if (item.title.indexOf(value) > -1) {
          return _this.getParentKey(item.key, billNodata);
        }
        return null;
      }).filter(function (item, i, self) {
        return item && self.indexOf(item) === i;
      });
      _this.setState({
        expandedKeys: expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
    };

    _this.loadData = function (treeNode) {
      console.log('treeNode', treeNode);
      var self = _this;
      self.getLoadData(treeNode);
      // return new Promise();
    };

    var billNo = _this.props.model.getParams().billNo;
    _this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      selectedKeys: [],
      selectName: '',
      billNo: billNo,
      billNodata: []
    };
    return _this;
  }

  _createClass(definedLeftcontent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var billNo = this.state.billNo;

      this.getdataSource(billNo);
    }
  }, {
    key: 'getdataSource',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(billNo) {
        var config, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = {
                  url: 'report/getEntityInfoByBillNo.do',
                  method: 'GET',
                  params: {
                    billno: billNo
                  }
                };
                _context.next = 3;
                return (0, _util.proxy)(config);

              case 3:
                json = _context.sent;

                if (!(json.code !== 200)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return');

              case 6:
                json.data && this.setState({ billNodata: json.data });

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getdataSource(_x) {
        return _ref.apply(this, arguments);
      }

      return getdataSource;
    }()
  }, {
    key: 'generateList',
    value: function generateList(data) {
      var _this2 = this;

      // for (let i = 0; i < data.length; i++) {
      //   const node = data[i];
      //   const key = node.key;
      //   dataList.push({ key, title: node.title });
      //   if (node.children) {
      //     this.generateList(node.children, node.key);
      //   }
      // }
      data.forEach(function (item) {
        var key = item.name;
        var title = item.title;
        dataList.push({ key: key, title: title });
        if (item.children) {
          _this2.generateList(item.children, item.name);
        }
      });
    }
    // generateList(gData);

  }, {
    key: 'onTreeselect',
    value: function onTreeselect(selectedKeys, e) {
      var billNodata = this.state.billNodata;

      if (!selectedKeys.length) {
        selectedKeys = this.state.selectedKeys;
      }
      this.setState({ selectName: e.selectedNodes, selectedKeys: selectedKeys });
      this.props.onSelect(selectedKeys[0], billNodata);
      console.log('e', e.selectedNodes);
      console.log(e);
    }
  }, {
    key: 'getLoadData',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(treeNode) {
        var billNodata, key, _index, entityName, config, json;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log('treeNode', treeNode);
                console.log(this.state.billNodata);
                billNodata = this.state.billNodata;
                key = treeNode.props.eventKey;
                _index = _lodash2.default.findIndex(billNodata, function (obj) {
                  return obj.name === key;
                });
                entityName = billNodata[_index].entityName;
                config = {
                  url: ' report/getEntityInfoByName.do',
                  method: 'GET',
                  params: { entityName: entityName }
                };
                _context2.next = 9;
                return (0, _util.proxy)(config);

              case 9:
                json = _context2.sent;

                if (!(json.code !== 200)) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt('return');

              case 12:
                // json.data && this.setState({billNodata:json.data})
                console.log('entity', json.data);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getLoadData(_x2) {
        return _ref2.apply(this, arguments);
      }

      return getLoadData;
    }()
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          searchValue = _state.searchValue,
          expandedKeys = _state.expandedKeys,
          autoExpandParent = _state.autoExpandParent,
          selectName = _state.selectName,
          billNodata = _state.billNodata;
      // this.generateData(billNodata);

      this.generateList(billNodata);
      var loop = function loop(data) {
        return data.map(function (item) {
          var index = item.title.indexOf(searchValue);
          var beforeStr = item.title.substr(0, index);
          var afterStr = item.title.substr(index + searchValue.length);
          var title = index > -1 ? _react2.default.createElement(
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
            item.title
          );
          var isExpand = item.isExpand ? item.isExpand : false;
          if (isExpand) {
            return _react2.default.createElement(
              TreeNode,
              { key: item.name, title: title },
              loop([])
            );
          }
          return _react2.default.createElement(TreeNode, { key: item.name, title: title, isLeaf: true });
        });
      };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(Search, { style: { marginBottom: 8 }, placeholder: 'Search', onChange: this.onChange }),
        _react2.default.createElement(
          _antd.Tree,
          {
            selectedKeys: this.state.selectedKeys,
            onSelect: function onSelect(selectedKeys, e) {
              return _this3.onTreeselect(selectedKeys, e);
            },
            onExpand: this.onExpand,
            expandedKeys: expandedKeys,
            autoExpandParent: autoExpandParent,
            loadData: this.loadData
          },
          loop(billNodata)
        )
      );
    }
  }]);

  return definedLeftcontent;
}(_react2.default.Component);

exports.default = definedLeftcontent;