'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../basic');

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _addEventListener = require('rc-util/lib/Dom/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConvenientQuery = function (_React$Component) {
  _inherits(ConvenientQuery, _React$Component);

  function ConvenientQuery(props) {
    _classCallCheck(this, ConvenientQuery);

    var _this = _possibleConstructorReturn(this, (ConvenientQuery.__proto__ || Object.getPrototypeOf(ConvenientQuery)).call(this, props));

    _this.state = {
      menuData: [],
      filterDetail: [],
      schemeData: [],
      isShowList: false,
      current: '',
      isVisible: false,
      schemeName: '',
      showFields: new Array(),
      showFieldsValue: {}
    };

    _this.showFields = new Array();
    _this.vm = cb.loader.initMetaCommonViewModel('FilterViewModel', 'filterViewModel', { filterId: _this.props.model.getParams().filterId }, _this.props.model, ['filterClick']);
    _this._isVisible = false;
    _this.onDocumentClick = _this.onDocumentClick.bind(_this);
    return _this;
  }

  _createClass(ConvenientQuery, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.vm) this.vm.addListener(this);
    }
  }, {
    key: 'onDocumentClick',
    value: function onDocumentClick(event) {
      if (this._isVisible !== false) return;
      var parent = cb.dom(event.target).parents('div[data-reactroot]');
      if (parent.hasClass('ant-row') || parent.children('.bill-maker-modal').length) this.setState({ isVisible: this._isVisible });
    }
  }, {
    key: 'hide',
    value: function hide() {
      if (!this.state.isVisible) return;
      this.setState({ isVisible: false });
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener() {
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.clickOutsideHandler = null;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.vm) this.vm.fireEvent('itemChange', { solutionid: this.state.current });
      if (this.state.isVisible) {
        if (!this.clickOutsideHandler) this.clickOutsideHandler = (0, _addEventListener2.default)(document, 'mousedown', this.onDocumentClick);
        return;
      }
      this.removeEventListener();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeEventListener();
    }
  }, {
    key: 'initFilterFields',
    value: function initFilterFields(args) {
      var self = this;
      this.showFields = new Array();

      if (args.filterDetail.CommonModel.length) {
        args.filterDetail.CommonModel.forEach(function (item) {
          if (self.showFields.indexOf(item.itemName) < 0) self.showFields.push(item.itemName);
          self.state.showFieldsValue[item.itemName] = {
            value1: item.value1 ? item.value1 : '',
            value2: item.value2 ? item.value2 : ''
          };
        });
      }

      this.setState({
        schemeData: args.schemeData,
        current: args.current,
        schemeName: args.schemeName,
        filterDetail: args.filterDetail,
        showFieldsValue: self.state.showFieldsValue
      });
    }
  }, {
    key: 'onSchemeListClick',
    value: function onSchemeListClick() {
      this.setState({ isShowList: !this.state.isShowList });
    }
  }, {
    key: 'handleMenuClick',
    value: function handleMenuClick(e) {
      if (e.domEvent.target.tagName == 'I') return false;
      var schemeItem = this.state.schemeData.filter(function (item) {
        return item.id == e.key;
      })[0];
      for (var i = 0; i < this.showFields.length; i++) {
        this.vm && this.vm.removeProperty(this.showFields[i]);
      }

      if (this.vm) this.vm.execute('loadScheme', e.key);
    }
  }, {
    key: 'handleVisibleChange',
    value: function handleVisibleChange(val) {
      // this.setState({ isVisible: val });
      this._isVisible = val;
    }
  }, {
    key: 'SaveSchemeEvent',
    value: function SaveSchemeEvent(e) {
      this.setState({ isVisible: false });
      if (this.vm) this.vm.get('save').fireEvent('click', { schemeId: this.state.current });
    }
  }, {
    key: 'SearchEvent',
    value: function SearchEvent(e) {
      this.setState({ isVisible: false });
      if (this.vm) {
        this.vm.fireEvent('searchEvent', { model: this.props.model, solutionid: this.state.current });
        this.vm.get('search').fireEvent('click', { model: this.props.model, solutionid: this.state.current });
      }
    }
  }, {
    key: 'deleteFields',
    value: function deleteFields(field) {
      var index = this.showFields.indexOf(field);
      if (index >= 0) {
        this.showFields.splice(index, 1);
        this.vm && this.vm.removeProperty(field);
      }
      this.setState({ showFields: this.showFields });
    }
  }, {
    key: 'addMoreFields',
    value: function addMoreFields() {
      var self = this;
      var addFields = this.state.filterDetail.AllFilterModel && this.state.filterDetail.AllFilterModel.filter(function (item) {
        return self.showFields.indexOf(item.itemName) < 0;
      });

      if (addFields.length && this.showFields.indexOf(addFields[0].itemName) < 0) {
        this.showFields.push(addFields[0].itemName);
        this.setState({ showFields: this.showFields });
      } else _antd.message.info('没有更多的可用的查询条件了...');
    }
  }, {
    key: 'onFilterChange',
    value: function onFilterChange(oldVal, newField) {
      if (this.showFields.indexOf(oldVal) >= 0) {
        this.showFields.splice(this.showFields.indexOf(oldVal), 1, newField.itemName);
        this.vm && this.vm.removeProperty(oldVal);

        var filterVMField = new cb.models.FilterModel(newField);
        this.vm && this.vm.addProperty(newField.itemName, filterVMField);

        this.setState({ showFields: this.showFields });
      }
    }
  }, {
    key: 'addNewScheme',
    value: function addNewScheme() {
      var newField = this.state.filterDetail.AllFilterModel && this.state.filterDetail.AllFilterModel[0];
      if (!newField) return;

      for (var i = this.showFields.length - 1; i >= 0; i--) {
        this.vm && this.vm.removeProperty(this.showFields[i]);
        this.showFields.splice(i, 1);
      }
      if (this.vm) {
        this.vm.addProperty(newField.itemName, new cb.models.FilterModel(newField));
        this.vm.get('schemeName').setValue('');
      }
      if (this.showFields.indexOf(newField.itemName) < 0) this.showFields.push(newField.itemName);

      this.setState({ showFields: this.showFields, current: -1 });
    }
  }, {
    key: 'showPopOver',
    value: function showPopOver() {
      this.setState({ isVisible: !this.state.isVisible });
    }
  }, {
    key: 'filterCommonModelFields',
    value: function filterCommonModelFields(target) {
      var arr = this.state.filterDetail.AllFilterModel;
      var newArr = new Array();
      for (var i = 0; i < arr.length; i++) {
        if (this.showFields.indexOf(arr[i].itemName) >= 0 && arr[i].itemName != target) continue;
        newArr.push(arr[i]);
      }
      return newArr;
    }
  }, {
    key: 'handleDeleteQueryScheme',
    value: function handleDeleteQueryScheme(schemeId) {
      if (this.vm && schemeId) this.vm.get('schemeMenu').execute('deleteScheme', schemeId);
    }
  }, {
    key: 'getfilterDetail',
    value: function getfilterDetail() {
      var _this2 = this;

      var self = this;
      var schemeDetail = new Array();

      var schemeNameControl = this.state.isShowList ? _react2.default.createElement(
        _basic.Row,
        null,
        _react2.default.createElement(
          _basic.Col,
          { span: 20, offset: 1 },
          _react2.default.createElement(_basic.Input, { defaultValue: this.state.schemeName, placeholder: '\u8BF7\u8F93\u5165\u65B9\u6848\u540D\u79F0', model: self.vm.get('schemeName') })
        )
      ) : _react2.default.createElement(
        _basic.Row,
        null,
        _react2.default.createElement(
          _basic.Col,
          { span: 20, offset: 1 },
          _react2.default.createElement(_basic.Input, { placeholder: '\u8BF7\u8F93\u5165\u65B9\u6848\u540D\u79F0', defaultValue: this.state.schemeName, model: self.vm.get('schemeName') })
        ),
        _react2.default.createElement(
          _basic.Col,
          { span: 2, offset: 1 },
          _react2.default.createElement(_basic.Button, { type: 'primary', icon: 'right', onClick: function onClick(e) {
              return _this2.onSchemeListClick(e);
            }, className: 'btn-onoff btn-left' })
        )
      );
      schemeDetail.push(schemeNameControl);

      var _loop = function _loop(i) {
        var modelField = _this2.state.filterDetail.AllFilterModel && _this2.state.filterDetail.AllFilterModel.filter(function (item) {
          return item.itemName == self.showFields[i];
        });

        if (modelField && modelField.length) {
          if (!self.vm.get(modelField[0].itemName)) {
            var initData = cb.utils.extend(true, {}, modelField[0]);
            if (self.state.showFieldsValue[initData.itemName]) {
              initData.value1 = self.state.showFieldsValue[initData.itemName].value1;
              initData.value2 = self.state.showFieldsValue[initData.itemName].value2;
            }

            var filterVMField = new cb.models.FilterModel(initData);
            self.vm.addProperty(initData.itemName, filterVMField);
          }

          var rowItem = _react2.default.createElement(
            _basic.Row,
            null,
            _react2.default.createElement(
              _basic.Col,
              { span: 20, offset: 1 },
              _react2.default.createElement(_filter2.default, { onChange: function onChange(a, b) {
                  return self.onFilterChange(a, b);
                }, dataSource: _this2.filterCommonModelFields(modelField[0].itemName), selectedValue: modelField[0].itemName, compareLogic: modelField[0].compareLogic, model: self.vm.get(modelField[0].itemName) })
            ),
            _react2.default.createElement(
              _basic.Col,
              { span: 2 },
              _react2.default.createElement(_basic.Button, { type: 'ghost', shape: 'circle-outline', icon: 'minus-circle', className: 'no-border', onClick: function onClick(e) {
                  return self.deleteFields(modelField[0].itemName);
                } })
            )
          );

          schemeDetail.push(rowItem);
        }
      };

      for (var i = 0; i < self.showFields.length; i++) {
        _loop(i);
      }

      schemeDetail.push(_react2.default.createElement(
        _basic.Row,
        null,
        _react2.default.createElement(
          _basic.Col,
          { span: 20, offset: 1 },
          _react2.default.createElement(
            _basic.Button,
            { type: 'ghost', icon: 'plus', className: 'no-border', onClick: function onClick(e) {
                return _this2.addMoreFields();
              } },
            '\u6DFB\u52A0\u66F4\u591A\u67E5\u8BE2\u6761\u4EF6'
          )
        )
      ));

      return schemeDetail;
    }
  }, {
    key: 'getSchemeList',
    value: function getSchemeList() {
      var _this3 = this;

      var self = this;
      var schemeList = new Array();
      schemeList.push(_react2.default.createElement(
        _basic.Row,
        null,
        _react2.default.createElement(
          _basic.Col,
          { span: 2 },
          _react2.default.createElement(_basic.Button, { type: 'default', icon: 'left', onClick: function onClick(e) {
              return _this3.onSchemeListClick(e);
            }, className: 'btn-onoff btn-right' })
        ),
        _react2.default.createElement(
          _basic.Col,
          { span: 20, offset: 2 },
          _react2.default.createElement(
            _basic.Button,
            { type: 'ghost', icon: 'plus', className: 'no-border', onClick: function onClick(e) {
                return _this3.addNewScheme(e);
              } },
            '\u65B0\u589E\u67E5\u8BE2\u65B9\u6848'
          )
        )
      ));

      var menuItemArray = new Array();
      this.state.schemeData.length && this.state.schemeData.forEach(function (item) {
        var menuItem = void 0;
        if (self.state.current && self.state.current == item.id) {
          menuItem = _react2.default.createElement(
            _antd.Menu.Item,
            { key: item.id },
            _react2.default.createElement(_antd.Icon, { type: 'check' }),
            item.solutionName,
            _react2.default.createElement(
              _antd.Popconfirm,
              { title: '\u662F\u5426\u786E\u5B9A\u8981\u5220\u9664\uFF1F', onConfirm: function onConfirm(e) {
                  return self.handleDeleteQueryScheme(item.id);
                }, okText: '\u662F', cancelText: '\u5426', placement: 'right' },
              _react2.default.createElement(_basic.Button, { type: 'ghost', shape: 'circle', icon: 'delete', className: 'no-border' })
            )
          );
        } else {
          menuItem = _react2.default.createElement(
            _antd.Menu.Item,
            { key: item.id },
            _react2.default.createElement(_antd.Icon, null),
            item.solutionName,
            _react2.default.createElement(
              _antd.Popconfirm,
              { title: '\u662F\u5426\u786E\u5B9A\u8981\u5220\u9664\uFF1F', onConfirm: function onConfirm(e) {
                  return self.handleDeleteQueryScheme(item.id);
                }, okText: '\u662F', cancelText: '\u5426', placement: 'right' },
              _react2.default.createElement(_basic.Button, { type: 'ghost', shape: 'circle', icon: 'delete', className: 'no-border' })
            )
          );
        }
        menuItemArray.push(menuItem);
      });
      var menuControl = _react2.default.createElement(
        _antd.Menu,
        { onClick: function onClick(e) {
            return _this3.handleMenuClick(e);
          }, selectedKeys: [this.state.current], mode: 'vertical', model: self.vm.get('schemeMenu') },
        menuItemArray
      );
      schemeList.push(_react2.default.createElement(
        _basic.Row,
        null,
        _react2.default.createElement(
          _basic.Col,
          { style: { overflow: 'hidden' } },
          menuControl
        )
      ));
      return schemeList;
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var _this4 = this;

      var schemeDetail = this.getfilterDetail();
      var schemeList = this.getSchemeList();
      var schemeTitle = schemeDetail.splice(0, 1);

      var content = this.state.isShowList ? _react2.default.createElement(
        'div',
        { style: { width: 670 }, className: 'common-query-popover' },
        _react2.default.createElement(
          _basic.Row,
          null,
          _react2.default.createElement(
            _basic.Col,
            { span: 18 },
            schemeTitle,
            _react2.default.createElement(
              _basic.Row,
              null,
              _react2.default.createElement(
                _basic.Col,
                { span: 'all', className: 'schemeContent' },
                schemeDetail
              )
            )
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 6 },
            schemeList
          )
        ),
        _react2.default.createElement(
          _basic.Row,
          null,
          _react2.default.createElement(
            _basic.Col,
            { span: 8, offset: 1, className: 'checkbox' },
            _react2.default.createElement(_basic.CheckBox, { dataSource: { text: '设置为默认查询方案' }, model: this.vm.get('isDefault') })
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, offset: 2 },
            _react2.default.createElement(
              _basic.Button,
              { type: 'ghost', onClick: function onClick(e) {
                  return _this4.SaveSchemeEvent(e);
                }, value: '\u4FDD\u5B58\u4E3A\u5E38\u7528\u65B9\u6848' },
              '\u4FDD\u5B58\u4E3A\u5E38\u7528\u65B9\u6848'
            ),
            _react2.default.createElement(
              _basic.Button,
              { type: 'primary', onClick: function onClick(e) {
                  return _this4.SearchEvent(e);
                }, value: '\u67E5\u8BE2' },
              '\u67E5\u8BE2'
            )
          )
        )
      ) : _react2.default.createElement(
        'div',
        { style: { width: 480 }, className: 'common-query-popover' },
        _react2.default.createElement(
          _basic.Row,
          null,
          _react2.default.createElement(
            _basic.Col,
            { span: 'all' },
            schemeTitle,
            _react2.default.createElement(
              _basic.Row,
              null,
              _react2.default.createElement(
                _basic.Col,
                { className: 'schemeContent' },
                schemeDetail
              )
            )
          )
        ),
        _react2.default.createElement(
          _basic.Row,
          null,
          _react2.default.createElement(
            _basic.Col,
            { span: 8, offset: 1, className: 'checkbox' },
            _react2.default.createElement(_basic.CheckBox, { dataSource: { text: '设置为默认查询方案' }, model: this.vm.get('isDefault') })
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, offset: 2 },
            _react2.default.createElement(
              _basic.Button,
              { type: 'ghost', onClick: function onClick(e) {
                  return _this4.SaveSchemeEvent(e);
                }, value: '\u4FDD\u5B58\u4E3A\u5E38\u7528\u65B9\u6848' },
              '\u4FDD\u5B58\u4E3A\u5E38\u7528\u65B9\u6848'
            ),
            _react2.default.createElement(
              _basic.Button,
              { type: 'primary', onClick: function onClick(e) {
                  return _this4.SearchEvent(e);
                }, value: '\u67E5\u8BE2' },
              '\u67E5\u8BE2'
            )
          )
        )
      );

      var control = _react2.default.createElement(
        _antd.Popover,
        { onVisibleChange: function onVisibleChange(e) {
            return _this4.handleVisibleChange(e);
          }, placement: 'bottomLeft', content: content, trigger: 'click', className: 'common-query-popover', visible: this.state.isVisible },
        _react2.default.createElement(
          _basic.Button,
          { type: 'ghost', className: 'no-border schemeTitle', onClick: function onClick(e) {
              return _this4.showPopOver();
            } },
          this.state.schemeName,
          _react2.default.createElement(_antd.Icon, { type: 'down' })
        )
      );
      return control;
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getControl();
      return _react2.default.createElement(
        'div',
        null,
        control
      );
    }
  }]);

  return ConvenientQuery;
}(_react2.default.Component);

exports.default = ConvenientQuery;
;