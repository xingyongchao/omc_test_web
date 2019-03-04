'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAmap = require('react-amap');

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

var defaultPosition = ['116.238822', '40.068734'];

var AMap = function (_Component) {
  _inherits(AMap, _Component);

  function AMap(props) {
    _classCallCheck(this, AMap);

    var _this = _possibleConstructorReturn(this, (AMap.__proto__ || Object.getPrototypeOf(AMap)).call(this, props));

    _this.PolyEditorCreated = function (ins) {
      _this.PolyEditorInstance = ins;
      _this.mapInstance.setFitView(_this.mapInstance.getAllOverlays());
    };

    _this.circleEditorCreated = function (ins) {
      _this.circleEditorInstance = ins;
      _this.mapInstance.setFitView(_this.mapInstance.getAllOverlays());
    };

    _this.mapCreated = function (ins) {
      _this.mapInstance = ins;
    };

    _this.PolyEditorClose = function (obj) {
      var currentPathCollect = obj.target.getPath();
      if (_this.props.model && obj.type !== 'end') _this.props.model.execute('polygonPath', currentPathCollect);
    };

    _this.circleEditorClose = function (obj) {
      var currentRadius = obj.target.getRadius();
      if (_this.props.model) _this.props.model.execute('circleRadius', currentRadius);
    };

    _this.addressToLngLat = function (address) {
      if (!address) return;
      var proxy = cb.rest.DynamicProxy.create({
        geocoder: { url: 'geocoder', method: 'GET', options: { token: false, uniform: false } }
      });
      proxy.geocoder({ address: address }, function (err, result) {
        if (err) {
          console.error(err.message);
          return;
        }
        if (!result) return;
        var position = result.geocodes[0].location;
        var lng = position.split(',')[0];
        var lat = position.split(',')[1];
        console.log(lng);
        console.log(lat);
        if (this.props.model) {
          this.props.model.setValue({ longitude: lng, latitude: lat, address: address }, true);
          /* 位置改变，抛出一个默认的以此为中心的栅栏 */
          var path = this.getDefaultPolygonPath();
          var collectPath = path.map(function (ele) {
            return { Q: ele.latitude, N: ele.longitude, lng: ele.longitude, lat: ele.latitude };
          });
          this.props.model.execute('polygonPath', collectPath);
        }
      }, _this);
    };

    _this.locationToAddress = function (location, longitude, latitude) {
      if (!location) return;
      var proxy = cb.rest.DynamicProxy.create({
        geocoder: { url: 'geoaddress', method: 'GET', options: { token: false, uniform: false } }
      });
      proxy.geocoder({ location: location }, function (err, result) {
        if (err) {
          console.error(err.message);
          return;
        }
        this.props.model.setValue({ longitude: longitude, latitude: latitude, address: result.regeocode.formatted_address }, true);
      }, _this);
    };

    _this.mapEvents = function (e) {
      var location = e.lnglat.lng + ',' + e.lnglat.lat;
      _this.locationToAddress(location, e.lnglat.lng, e.lnglat.lat);
    };

    _this.state = {
      bIsNull: props.bIsNull,
      address: '',
      position: props.position || ['116.238822', '40.068734'],
      inputChangeAddress: null,
      isBig: false,
      smallStyles: { position: 'relative', marginTop: '10px', height: '160px' },
      colNumber: props.iColWidth,
      deliveryMethod: '', /* 配送范围：'polygon'：多边形, 'circle': 圆形 */
      circleRadius: 5000 /* 只有deliveryMethod=‘circle’此属性才会生效 */
    };
    _this.editorEvents = {
      created: _this.PolyEditorCreated,
      addnode: _this.PolyEditorClose,
      adjust: _this.PolyEditorClose,
      removenode: _this.PolyEditorClose,
      end: _this.PolyEditorClose
    };
    _this.circleEditorEvents = {
      created: _this.circleEditorCreated,
      addnode: _this.circleEditorClose,
      adjust: _this.circleEditorClose,
      removenode: _this.circleEditorClose,
      end: _this.circleEditorClose
    };
    _this.polygonStyle = {
      fillOpacity: 0.3,
      fillColor: '#588CE9',
      strokeColor: '#588CE9'
      // strokeWeight: 3,
    };

    return _this;
  }
  /* 节点增删改都从新计算 */


  _createClass(AMap, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextState.deliveryMethod === 'circle' && this.state.deliveryMethod === 'polygon') {
        this.PolyEditorInstance && this.PolyEditorInstance.close();
      }
      return true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.flag === this.state.flag) return;
      this.props.model.getParent().execute('afterRenderComponent');
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(params) {
      var value = params.value;

      delete params.value;
      this.setState(params);
      if (value) this.setValue(value);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      //value格式：{ longitude: 'id', latitude: 'name', address: 'remote' }
      if (!value || this.isValueEqual(value.longitude, value.latitude, value.address)) return;
      var locationX = value.longitude || '116.238822';
      var locationY = value.latitude || '40.068734';
      var address = value.address;
      this.setState({ position: [locationX, locationY], address: address });
    }
  }, {
    key: 'isValueEqual',
    value: function isValueEqual(longitude, latitude, address1) {
      var _state = this.state,
          position = _state.position,
          address = _state.address;

      return longitude === position[0] && latitude === position[1] && address1 === address;
    }
  }, {
    key: 'getAmap',
    value: function getAmap() {
      var _this2 = this;

      var position = this.state.position;
      var markerCenter = {
        longitude: position[0],
        latitude: position[1]
      };
      var events = {
        click: this.mapEvents,
        created: this.mapCreated
      };
      var innerContent = this.getInnerAmap(markerCenter);
      return _react2.default.createElement(
        'div',
        { style: this.state.isBig ? this.state.bigStyles : this.state.smallStyles },
        _react2.default.createElement(
          _reactAmap.Map,
          {
            center: markerCenter,
            zoom: 14,
            events: events
          },
          _react2.default.createElement(_reactAmap.Marker, { position: markerCenter }),
          innerContent
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return _this2.handleButtonClick();
            }, style: { position: 'absolute', top: '3px', right: '2px', zIndex: '99' } },
          this.state.isBig ? '缩小' : '展开'
        )
      );
    }
  }, {
    key: 'getInnerAmap',
    value: function getInnerAmap(markerCenter) {
      var defaultPolygonPath = this.getDefaultPolygonPath();
      if (this.state.deliveryMethod === 'polygon') {
        return _react2.default.createElement(
          _reactAmap.Polygon,
          { path: defaultPolygonPath, style: this.polygonStyle },
          _react2.default.createElement(_reactAmap.PolyEditor, { active: true, events: this.editorEvents })
        );
      } else if (this.state.deliveryMethod === 'circle') {
        return _react2.default.createElement(_reactAmap.Circle, { radius: this.state.circleRadius || 5000, center: markerCenter, style: this.polygonStyle, events: this.circleEditorEvents });
      } else {
        return null;
      }
    }
  }, {
    key: 'getDefaultPolygonPath',
    value: function getDefaultPolygonPath() {
      var defaultPosition = this.state.position;
      if (this.state.polygonPath) return this.state.polygonPath;
      return [{ longitude: Number(defaultPosition[0]) - 0.05, latitude: Number(defaultPosition[1]) - 0.04 }, { longitude: Number(defaultPosition[0]) - 0.05, latitude: Number(defaultPosition[1]) + 0.04 }, { longitude: Number(defaultPosition[0]) + 0.05, latitude: Number(defaultPosition[1]) + 0.04 }, { longitude: Number(defaultPosition[0]) + 0.05, latitude: Number(defaultPosition[1]) - 0.04 }];
    }
  }, {
    key: 'handleButtonClick',
    value: function handleButtonClick() {
      this.setState({
        isBig: !this.state.isBig,
        bigStyles: {
          position: 'relative',
          width: this.state.colNumber == 2 ? document.body.clientWidth - 342 - 67 : (document.body.clientWidth - 390) * 0.8 - 204,
          height: this.state.colNumber == 2 ? (document.body.clientWidth - 342 - 67) * 0.5 : ((document.body.clientWidth - 390) * 0.8 - 204) * 0.5,
          marginTop: '10px'
        }
      });
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _this3 = this;

      var _state2 = this.state,
          inputChangeAddress = _state2.inputChangeAddress,
          address = _state2.address;

      return _react2.default.createElement(
        _row2.default,
        null,
        this.state.readOnly ? (0, _text2.default)(address) : _react2.default.createElement(_antd.Input, { value: address,
          onChange: function onChange(e) {
            return _this3.handleInputChange(e);
          },
          onPressEnter: function onPressEnter(e) {
            return _this3.onPressEnter(e);
          },
          onBlur: function onBlur(e) {
            return _this3.handleInputBlur(e);
          } }),
        this.getAmap()
      );
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(e) {
      this.setState({
        address: e.target.value
      });
    }
  }, {
    key: 'onPressEnter',
    value: function onPressEnter(e) {
      var value = e.target.value;
      this.addressToLngLat(value);
    }
  }, {
    key: 'handleInputBlur',
    value: function handleInputBlur(e) {
      var value = e.target.value;
      if (value === this.state.address) return;
      this.addressToLngLat(value);
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
  }]);

  return AMap;
}(_react.Component);

exports.default = AMap;