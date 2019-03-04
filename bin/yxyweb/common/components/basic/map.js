'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Map = function (_Component) {
  _inherits(Map, _Component);

  function Map(props) {
    _classCallCheck(this, Map);

    var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this, props));

    _this.state = {
      bIsNull: props.bIsNull,
      value: '',
      position: _this.props.position || '用友软件园',
      locationX: _this.props.locationX || '',
      locationY: _this.props.locationY || '',
      big: false,
      styles: {
        width: _this.props.samllWidth || '280px',
        height: _this.props.smallHeight || '160px',
        position: 'relative'
      },
      boxStyles: {
        width: _this.props.samllWidth || '280px',
        height: _this.props.smallHeight || '160px'
      },
      mapChangeBigStyle: { marginTop: '10px' }
    };
    _this.handleClick = _this.handleClick.bind(_this);

    _this.first = true;
    _this.lastPosition = null;
    return _this;
  }

  _createClass(Map, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.model) this.props.model.addListener(this);
      // if(!this.map)
      // var self = this;
      cb.requireInner(['http://api.map.baidu.com/getscript?v=2.0&ak=Xc0b88CMj1YgLa1rTLvLungBPKmIaoMo'], function () {
        _this2.map = new BMap.Map(_this2.refs.allmap);
        _this2.setState({ flag: true });
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.flag === this.state.flag) return;
      this.props.model.getParent().execute('afterRenderComponent');
    }
  }, {
    key: 'isValueEqual',
    value: function isValueEqual(longitude, latitude, address) {
      var _state = this.state,
          locationX = _state.locationX,
          locationY = _state.locationY,
          position = _state.position;

      return longitude === locationX && latitude === locationY && address === position;
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      //value格式：{ longitude: 'id', latitude: 'name', address: 'remote' }
      if (this.isValueEqual(value.longitude, value.latitude, value.address)) return;
      var locationX = value.longitude;
      var locationY = value.latitude;
      var position = value.address;
      var value = position;

      // if (this.state.locationX != locationX || this.state.locationY != locationY || this.state.position != position)
      this.setState({ locationX: locationX, locationY: locationY, position: position, value: value });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.position || this.props.position === nextProps.position) return;
      this.setState({
        position: nextProps.position
      });
    }
  }, {
    key: 'getmap',
    value: function getmap() {
      if (!this.map) {
        return _react2.default.createElement('div', { ref: 'allmap' });
      } else {
        if (this.state.position != '') {
          if (this.state.position !== this.lastPosition) {
            this.lastPosition = this.state.position;
            var self = this;
            // 创建地址解析器实例
            var myGeo = new BMap.Geocoder();
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(this.state.position, function (point) {

              if (point) {
                self.map.centerAndZoom(point, 16);
                self.map.addOverlay(new BMap.Marker(point));
                self.map.enableScrollWheelZoom(true);

                if (self.props.model) {
                  //地址解析成坐标
                  var localSearch = new BMap.LocalSearch(self.map);
                  localSearch.enableAutoViewport(); //允许自动调节窗体大小
                  var keyword = self.state.position;
                  localSearch.setSearchCompleteCallback(function (searchResult) {
                    if (self.first) {
                      self.first = false;
                      return;
                    }
                    var poi = searchResult.getPoi(0);
                    if (self.isValueEqual(poi.point.lng, poi.point.lat, self.state.position)) return;
                    var value = {};
                    value.longitude = poi.point.lng;
                    value.latitude = poi.point.lat;
                    value.address = self.state.position;
                    self.props.model.setValue(value, true);
                  });
                  localSearch.search(keyword);
                }
              } else {
                var myFun = function myFun(result) {
                  var cityName = result.name;
                  self.map.setCenter(cityName);
                };

                var myCity = new BMap.LocalCity();
                myCity.get(myFun);
                cb.utils.alert('您输入的地址有误，请填写正确的地址', 'warning');
              }
            }, "北京市");
          };
        }
        if (this.state.position == '' && this.state.locationX != '' && this.state.locationY != '') {
          this.map.clearOverlays();
          var new_point = new BMap.Point(this.state.locationX, this.state.locationY);
          this.map.centerAndZoom(new_point, 16);
          this.map.enableScrollWheelZoom(true);
          var marker = new BMap.Marker(new_point); // 创建标注
          this.map.addOverlay(marker); // 将标注添加到地图中
          this.map.panTo(new_point);
        }
        return _react2.default.createElement(
          'div',
          { style: this.state.mapChangeBigStyle },
          _react2.default.createElement(
            'div',
            { style: this.state.boxStyles },
            _react2.default.createElement('div', { style: this.state.styles, ref: 'allmap' }),
            _react2.default.createElement(
              'button',
              { style: { position: 'absolute', top: '0', right: '0', zIndex: '99' }, onClick: this.handleClick },
              this.state.big ? '缩小' : '展开'
            )
          )
        );
      }
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _this3 = this;

      var _state2 = this.state,
          value = _state2.value,
          position = _state2.position;

      if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') value = position;
      return _react2.default.createElement(
        _row2.default,
        null,
        this.state.readOnly ? (0, _text2.default)(value) : _react2.default.createElement(_antd.Input, { value: value,
          onChange: function onChange(e) {
            return _this3.handleInputChange(e);
          },
          onPressEnter: function onPressEnter(e) {
            return _this3.onPressEnter(e);
          },
          onBlur: function onBlur(e) {
            return _this3.handleInputBlur(e);
          } }),
        this.getmap()
      );
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(e) {
      this.setState({
        value: e.target.value
      });
    }
  }, {
    key: 'onPressEnter',
    value: function onPressEnter(e) {
      var value = e.target.value;
      this.setState({
        position: value
      });
    }
  }, {
    key: 'handleInputBlur',
    value: function handleInputBlur(e) {
      var value = e.target.value;
      if (value === this.state.position) return;
      this.setState({
        position: value
      });
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var cShowCaption = this.props.cShowCaption;

      var title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(Icon, { type: 'star' }),
        cShowCaption
      ) : _react2.default.createElement(
        'label',
        null,
        cShowCaption
      );
      var control = cShowCaption ? _react2.default.createElement(_label2.default, { control: this.baseControl(), title: title }) : this.baseControl();
      return control;
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getControl();
      return _react2.default.createElement(
        'div',
        { className: 'map' },
        control
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var self = this;
      if (this.state.big == false) {
        self.setState({
          styles: { width: self.props.bigWidth || '100%', height: self.props.bigHeight || '800px' },
          boxStyles: { width: self.props.bigWidth || '800px', height: self.props.bigHeight || '800px' },
          mapChangeBigStyle: { width: document.body.clientWidth - 342 - 67, marginTop: '10px' },
          big: true
        });
      };
      if (this.state.big == true) {
        self.setState({
          styles: { width: self.props.smallWidth || '280px', height: self.props.smallHeight || '160px' },
          boxStyles: { width: self.props.smallWidth || '280px', height: self.props.smallHeight || '160px' },
          mapChangeBigStyle: { marginTop: '10px' },
          big: false
        });
      }
    }
  }]);

  return Map;
}(_react.Component);

exports.default = Map;