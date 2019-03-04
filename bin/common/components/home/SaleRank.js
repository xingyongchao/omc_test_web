'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _basic = require('../../../yxyweb/common/components/basic');

var _antd = require('antd');

var _HomeTitle = require('./HomeTitle');

var _HomeTitle2 = _interopRequireDefault(_HomeTitle);

var _HomeCommon = require('./HomeCommon');

var common = _interopRequireWildcard(_HomeCommon);

var _SvgIcon = require('../../../yxyweb/common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _home = require('../../redux/modules/home');

var homeActions = _interopRequireWildcard(_home);

var _tree = require('../../../yxyweb/common/redux/tree');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import ReactEcharts from 'echarts-for-react';


var CompleteOrderControl = function (_React$Component) {
    _inherits(CompleteOrderControl, _React$Component);

    function CompleteOrderControl(props) {
        _classCallCheck(this, CompleteOrderControl);

        var _this = _possibleConstructorReturn(this, (CompleteOrderControl.__proto__ || Object.getPrototypeOf(CompleteOrderControl)).call(this, props));

        _this.onAddressChange = function (val) {
            var _this$props$home = _this.props.home,
                saleRankBegin = _this$props$home.saleRankBegin,
                saleRankEnd = _this$props$home.saleRankEnd;

            _this.props.homeActions.setOptions({ saleRankStore: val });
            _this.props.homeActions.getSaleRankData({ beginDate: saleRankBegin, endDate: saleRankEnd, store_id: val });
        };

        _this.state = {
            title: props.title || '销售排名',
            cControlType: props.cControlType || '',
            data: [{ name: '三里屯店', value: 99999 }, { name: '西单店', value: 88888 }, { name: '西直门店', value: 77777 }, { name: '昌平店', value: 66666 }, { name: '同马店', value: 55555 }, { name: '西二旗店', value: 44444 }, { name: '王府井店', value: 33333 }, { name: '回龙观店', value: 22222 }]
        };
        _this.onDateChange = _this.onDateChange.bind(_this);
        _this.props.homeActions.getSaleRankData({});
        return _this;
    }

    _createClass(CompleteOrderControl, [{
        key: 'onDateChange',
        value: function onDateChange(date, type) {
            var saleRankStore = this.props.home.saleRankStore;

            if (type === 'more') {
                var activeKey = 'SJ0103';
                var selectedNode = { "level": 2, "tenant": 516379152306432, "isShopRelated": false, "name": "销售排名", "code": "SJ0103", "isEnd": true, "authCode": "rm_salerankinglist", "parentCode": "SJ01", "_walkStatus": "Allow", "metaKey": "rm_saleranking", "id": 0, "subId": "SJ", "disabled": false, "authLevel": 3, "metaType": "voucherlist", "viewType": "meta" };
                this.props.moreButtonHandler(activeKey, selectedNode, null);
            } else {
                this.props.homeActions.setOptions({ saleRankBegin: date[1], saleRankEnd: date[0] });
                this.props.homeActions.getSaleRankData({ beginDate: date[1], endDate: date[0], store_id: saleRankStore });
            }
        }
    }, {
        key: 'getrank',
        value: function getrank(data, type) {
            if (!data) return null;
            var progressColor = void 0,
                currentName = void 0,
                currentValue = void 0,
                accuracy = void 0;
            if (type === '门店') {
                progressColor = '6196FF';
                currentName = "store_name";
                currentValue = "fMoneySumTotal";
                accuracy = cb.rest.AppContext.option.amountofdecimal; //金额
            }
            if (type === '店员') {
                progressColor = '11D5A0';
                currentName = "iEmployeeid_name";
                currentValue = "fMoneyTotal";
                accuracy = cb.rest.AppContext.option.amountofdecimal; //金额
            }
            if (type === '商品') {
                progressColor = 'FFA768';
                currentName = "product_cName";
                currentValue = "fQuantityTotal";
                accuracy = cb.rest.AppContext.option.quantitydecimal; //数量
            }
            var maxValue = 0,
                okData = void 0;
            var rankArr = [];
            if (data && data.length < 7) okData = data;
            if (data && data.length >= 7) okData = data.slice(0, 6);
            okData.forEach(function (ele) {
                if (Math.abs(ele[currentValue]) > maxValue) maxValue = Math.abs(ele[currentValue]);
            });
            okData.forEach(function (element, index) {
                var ele = void 0;
                var rank = element.num;
                var percent = Math.ceil(Math.abs(element[currentValue]) / maxValue * 100);
                var isCurrentStore = element.isCurrentStore;
                var slef_name = element.isCurrentStore ? type === '门店' ? '(本门店)' : '(我自己)' : '';
                ele = _react2.default.createElement(
                    'li',
                    { key: rank },
                    _react2.default.createElement(
                        'div',
                        { className: isCurrentStore ? 'saleRank_self' : '' },
                        _react2.default.createElement(
                            'span',
                            { title: '' + element[currentName] + slef_name, className: 'saleRank_name' },
                            rank + '.' + element[currentName]
                        ),
                        _react2.default.createElement(
                            'span',
                            { title: parseFloat(element[currentValue]).toFixed(accuracy), className: 'saleRank_value' },
                            parseFloat(element[currentValue]).toFixed(accuracy)
                        )
                    ),
                    _react2.default.createElement(_antd.Progress, { percent: percent, showInfo: false })
                );
                rankArr.push(ele);
            }, this);
            if (rankArr.length == 0) rankArr.push(_react2.default.createElement(
                'li',
                { className: 'saleRank_nodata' },
                _react2.default.createElement(_antd.Icon, { type: 'anticon anticon-nodata' }),
                '\u6682\u65E0\u6570\u636E\u54E6~'
            ));
            return rankArr;
        }
    }, {
        key: 'getContent',
        value: function getContent() {
            var _ref = this.props.home.saleRankData || {},
                storeBizObjects = _ref.storeBizObjects,
                employeeBizObjects = _ref.employeeBizObjects,
                productBizObjects = _ref.productBizObjects;

            return _react2.default.createElement(
                'div',
                { className: 'home-rank clearfix' },
                _react2.default.createElement(
                    _basic.Col,
                    { span: 8 },
                    _react2.default.createElement(
                        'div',
                        { className: 'title' },
                        _react2.default.createElement(_SvgIcon2.default, { type: 'shouye' }),
                        '\u95E8\u5E97'
                    ),
                    _react2.default.createElement(
                        'ul',
                        null,
                        this.getrank(storeBizObjects, '门店')
                    )
                ),
                _react2.default.createElement(
                    _basic.Col,
                    { span: 8 },
                    _react2.default.createElement(
                        'div',
                        { className: 'title' },
                        _react2.default.createElement(_SvgIcon2.default, { type: 'huiyuanguanli' }),
                        '\u8425\u4E1A\u5458'
                    ),
                    _react2.default.createElement(
                        'ul',
                        null,
                        this.getrank(employeeBizObjects, '店员')
                    )
                ),
                _react2.default.createElement(
                    _basic.Col,
                    { span: 8 },
                    _react2.default.createElement(
                        'div',
                        { className: 'title' },
                        _react2.default.createElement(_SvgIcon2.default, { type: 'lingshouguanli1' }),
                        '\u5546\u54C1'
                    ),
                    _react2.default.createElement(
                        'ul',
                        null,
                        this.getrank(productBizObjects, '商品')
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var content = this.getContent();
            return _react2.default.createElement(
                'div',
                { className: 'home-panel home-overview' },
                _react2.default.createElement(
                    _basic.Row,
                    null,
                    _react2.default.createElement(_HomeTitle2.default, { defaultStore: this.props.user.showStore === false ? '' : this.props.user.storeId, dataSource: this.props.user.showStore === false ? null : this.props.user.userStores, haveAddress: true, title: this.state.title, onDateChange: this.onDateChange, onAddressChange: this.onAddressChange })
                ),
                _react2.default.createElement(
                    _basic.Row,
                    null,
                    content
                )
            );
        }
    }]);

    return CompleteOrderControl;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {
        home: state.home.toJS(),
        user: state.user.toJS()
    };
}

function mapDispatchToProps(dispatch) {
    return {
        homeActions: (0, _redux.bindActionCreators)(homeActions, dispatch),
        moreButtonHandler: (0, _redux.bindActionCreators)(_tree.moreButtonHandler, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CompleteOrderControl);