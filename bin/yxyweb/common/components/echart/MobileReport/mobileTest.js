'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = _antdMobile.List.Item;
var Brief = Item.Brief;

var mobileTest = function (_React$Component) {
  _inherits(mobileTest, _React$Component);

  function mobileTest() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, mobileTest);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = mobileTest.__proto__ || Object.getPrototypeOf(mobileTest)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      disabled: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(mobileTest, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'select',
        { defaultValue: '1' },
        _react2.default.createElement(
          'option',
          { value: '1' },
          'Html select element'
        ),
        _react2.default.createElement(
          'option',
          { value: '2', disabled: true },
          'Unable to select'
        ),
        _react2.default.createElement(
          'option',
          { value: '3' },
          'option 3'
        )
      );
      // return (<div>

      //   <List renderHeader={() => 'Subtitle'} className="my-list">
      //     <Item onClick={() => { }}>
      //       Title
      //     </Item>
      //     <Item onClick={() => { }}>
      //       Title2
      //     </Item>

      //     <Item  >
      //       看见阿斯蒂芬
      //     </Item>
      //     <Item
      //       arrow="horizontal"
      //       multipleLine
      //       onClick={() => { }}
      //       platform="android"
      //     >
      //     </Item>
      //     <Item
      //       arrow="horizontal"
      //       thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
      //       multipleLine
      //       onClick={() => { }}
      //     >
      //       Title <Brief>subtitle</Brief>
      //     </Item>
      //   </List>
      //   <List renderHeader={() => 'Customized Right Side（Empty Content / Text / Image）'} className="my-list">
      //     <Item>Title</Item>
      //     <Item arrow="horizontal" onClick={() => { }}>Title</Item>
      //     <Item extra="extra content" arrow="horizontal" onClick={() => { }}>Title</Item>
      //     <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
      //       Title <Brief>subtitle</Brief>
      //     </Item>
      //   </List>
      //   <List renderHeader={() => 'Align Vertical Center'} className="my-list">
      //     <Item multipleLine extra="extra content">
      //       Title <Brief>subtitle</Brief>
      //     </Item>
      //   </List>
      //   <List renderHeader={() => 'Icon in the left'}>
      //     <Item
      //       thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
      //       arrow="horizontal"
      //       onClick={() => { }}
      //     >My wallet</Item>
      //     <Item
      //       thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
      //       onClick={() => { }}
      //       arrow="horizontal"
      //     >
      //       My Cost Ratio
      //     </Item>
      //   </List>
      //   <List renderHeader={() => 'Text Wrapping'} className="my-list">
      //     <Item data-seed="logId">Single line，long text will be hidden with ellipsis；</Item>
      //     <Item wrap>Multiple line，long text will wrap；Long Text Long Text Long Text Long Text Long Text Long Text</Item>
      //     <Item extra="extra content" multipleLine align="top" wrap>
      //       Multiple line and long text will wrap. Long Text Long Text Long Text
      //     </Item>
      //     <Item extra="no arrow" arrow="empty" className="spe" wrap>
      //       In rare cases, the text of right side will wrap in the single line with long text. long text long text long text
      //     </Item>
      //   </List>
      //   <List renderHeader={() => 'Other'} className="my-list">
      //     <Item disabled={this.state.disabled} extra="" onClick={() => { console.log('click', this.state.disabled); this.setState({ disabled: true }); }}>Click to disable</Item>
      //     <Item>
      //       <select defaultValue="1">
      //         <option value="1">Html select element</option>
      //         <option value="2" disabled>Unable to select</option>
      //         <option value="3">option 3</option>
      //       </select>
      //     </Item>
      //   </List>
      // </div>);
    }
  }]);

  return mobileTest;
}(_react2.default.Component);

exports.default = mobileTest;