'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _basic = require('../basic');

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

// import Row from './row';
// import Col from './col';
// import Refer from "./refer";
// import * as tabsactions from '../../redux/modules/tabs';
// import * as modalactions from '../../redux/modules/modal';
var CheckableTag = _antd.Tag.CheckableTag;
// const tagsFromServer = ['Movie', 'Books', 'Music'];

var Tag2 = function (_Component) {
  _inherits(Tag2, _Component);

  function Tag2(props) {
    _classCallCheck(this, Tag2);

    var _this = _possibleConstructorReturn(this, (Tag2.__proto__ || Object.getPrototypeOf(Tag2)).call(this, props));

    _this.CanMultSel = _this.props.TagCanMultSel;
    _this.Title = _this.props.TagTitle;
    _this.state = { selectedTags: [] };
    return _this;
  }

  _createClass(Tag2, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(params) {
      if (params.value) {
        this.setValue(params.value);
        delete params.value;
        if (this.props.TagClicked) this.props.TagClicked();
      }
      this.setState(params);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(tag, checked) {
      if (this.CanMultSel != undefined && this.CanMultSel == false) this.state.selectedTags = [];
      var selectedTags = this.state.selectedTags;

      var nextSelectedTags = checked ? [].concat(_toConsumableArray(selectedTags), [tag]) : selectedTags.filter(function (t) {
        return t !== tag;
      });
      // console.log('You are interested in: ', nextSelectedTags);
      if (this.props.model) {
        this.props.model.setValue(nextSelectedTags, true);
      }
      if (this.props.TagClicked) this.props.TagClicked();
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var selectedTags = [];
      value.forEach(function (item) {
        selectedTags.push(item.value);
      });
      this.setState({ selectedTags: selectedTags });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      //this.data={[{ key: '全部Key', name: '全部' }, { key: '待派工Key', name: '待派工' }, { key: '已派工Key', name: '已派工' }, { key: '已完工Key', name: '已完工' }, { key: '待回访Key', name: '待回访' }, { key: '已回访Key', name: '已回访' }, { key: '已取消Key', name: '已取消' }]}
      //Data={"common": "普通采购",  "asset": "固定资产"}"
      var _state = this.state,
          dataSource = _state.dataSource,
          valueField = _state.valueField,
          textField = _state.textField,
          selectedTags = _state.selectedTags;

      if (!dataSource || !dataSource.length) return null;
      var CheckableTagList = [];
      dataSource.forEach(function (item) {
        var value = item[valueField],
            text = item[textField];
        CheckableTagList.push(_react2.default.createElement(
          CheckableTag,
          {
            key: value,
            checked: selectedTags.indexOf(value) > -1,
            onChange: function onChange(checked) {
              return _this2.handleChange(value, checked);
            } },
          text
        ));
      });
      return _react2.default.createElement(
        'div',
        { className: 'tag-group' },
        _react2.default.createElement(
          _basic.Row,
          { colCount: 6 },
          _react2.default.createElement(
            _basic.Col,
            { className: 'label-control' },
            this.Title
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 4 },
            '   ',
            CheckableTagList,
            ' '
          )
        )
      );
    }
  }]);

  return Tag2;
}(_react.Component);

exports.default = Tag2;