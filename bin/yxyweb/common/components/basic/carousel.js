'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _util = require('../../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               按钮单选框
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               参数        说明            类型          可选值       默认值
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               onChange    选项变化时的回调函数    Function(e:Event) 无         无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               value     用于设置当前选中的值    String        无         无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               defaultValue  默认选中的值        String        无         无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               size      大小，只对按钮样式生效 String        large default small default
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


process.env.__CLIENT__ && require('./carousel.less');

var CarouselControl = function (_React$Component) {
  _inherits(CarouselControl, _React$Component);

  function CarouselControl(props) {
    _classCallCheck(this, CarouselControl);

    var _this = _possibleConstructorReturn(this, (CarouselControl.__proto__ || Object.getPrototypeOf(CarouselControl)).call(this, props));

    _this.onafterChange = function (index) {
      _this.setState({ index: index });
    };

    _this.baseControl = function () {
      var _this$state = _this.state,
          dataSource = _this$state.dataSource,
          index = _this$state.index;

      var _baseControl = dataSource.length ? _react2.default.createElement(
        'div',
        { className: 'carousel', onMouseOver: _this.handleMouseOver, onMouseLeave: _this.handleMouseLeave },
        _react2.default.createElement(
          'div',
          { className: 'carousel-tab' },
          dataSource.map(function (value, i) {
            return _react2.default.createElement(
              'span',
              { className: index == i ? 'on' : '', onClick: function onClick() {
                  return _this.handleTabClick(i);
                }, key: 'tab' + i },
              value.value
            );
          })
        ),
        _react2.default.createElement(
          _antd.Carousel,
          { afterChange: _this.onafterChange, ref: 'swipeBigPic' },
          dataSource.map(function (value, i) {
            return _react2.default.createElement('div', { className: value.icon + ' carousel-content', key: 'img' + i });
          })
        )
      ) : null;
      return _baseControl;
    };

    var _this$props$config = _this.props.config,
        enumCode = _this$props$config.enumCode,
        title = _this$props$config.title;

    _this.state = {
      index: 0,
      stop: true,
      title: title,
      dataSource: [],
      size: 'default'
    };
    _this.handleMouseOver = _this.handleMouseOver.bind(_this);
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
    _this.getSourceData(enumCode);
    return _this;
  }

  _createClass(CarouselControl, [{
    key: 'getSourceData',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(enumCode) {
        var config, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = {
                  url: 'enum/getEnumStrFetch',
                  method: 'GET',
                  params: {
                    enumtype: enumCode
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
                json.data && this.setState({ dataSource: JSON.parse(json.data) });

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getSourceData(_x) {
        return _ref.apply(this, arguments);
      }

      return getSourceData;
    }()
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.timer = setInterval(function () {
        return _this2.change();
      }, 3000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.timer && clearTimeout(this.timer);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {}
  }, {
    key: 'change',
    value: function change() {
      var _state = this.state,
          stop = _state.stop,
          index = _state.index,
          dataSource = _state.dataSource;

      if (stop) {
        index = dataSource.length && (index + 1) % dataSource.length;
        this.goto(index);
      } else {
        return false;
      }
    }
  }, {
    key: 'handleTabClick',
    value: function handleTabClick(index) {
      this.setState({ index: index });
      this.goto(index);
    }
  }, {
    key: 'handleMouseOver',
    value: function handleMouseOver() {
      this.setState({ stop: false });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({ stop: true });
    }
  }, {
    key: 'goto',
    value: function goto(index) {
      this.refs.swipeBigPic && this.refs.swipeBigPic.refs.slick.innerSlider.slickGoTo(index);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.baseControl();
    }
  }]);

  return CarouselControl;
}(_react2.default.Component);

exports.default = CarouselControl;