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

var TaskList = function (_Component) {
    _inherits(TaskList, _Component);

    function TaskList(props) {
        _classCallCheck(this, TaskList);

        var _this = _possibleConstructorReturn(this, (TaskList.__proto__ || Object.getPrototypeOf(TaskList)).call(this, props));

        _this.onAddressChange = function (val) {
            var _this$props$home = _this.props.home,
                taskListBegin = _this$props$home.taskListBegin,
                taskListEnd = _this$props$home.taskListEnd,
                taskListCompareBegin = _this$props$home.taskListCompareBegin,
                taskListCompareEnd = _this$props$home.taskListCompareEnd;

            _this.props.homeActions.setOptions({ taskListStore: val });
            _this.props.homeActions.getTaskListData({ beginDate: taskListBegin, endDate: taskListEnd, compareBeginDate: taskListCompareBegin, compareEndDate: taskListCompareEnd, store_id: val });
        };

        _this.getDom = function (type) {
            var _ref = _this.props.home.taskListData || {},
                billNum = _ref.billNum,
                billNumGrowth = _ref.billNumGrowth,
                moneyTotal = _ref.moneyTotal,
                moneyTotalGrowth = _ref.moneyTotalGrowth,
                billAvgMoney = _ref.billAvgMoney,
                billAvgMoneyGrowth = _ref.billAvgMoneyGrowth,
                memberNum = _ref.memberNum,
                memberNumGrowth = _ref.memberNumGrowth;

            var roleObj = { billNum: billNum, moneyTotal: moneyTotal, billAvgMoney: billAvgMoney, memberNum: memberNum };
            var numAccuracy = cb.rest.AppContext.option.quantitydecimal;
            var moneyAccuracy = cb.rest.AppContext.option.amountofdecimal;
            var priceAccuracy = cb.rest.AppContext.option.monovalentdecimal;
            var zero = 0;
            var title = void 0,
                upDown = void 0,
                currentKey = void 0,
                currentValue = void 0;
            if (type === 'billNum') {
                title = '成交笔数';
                upDown = _this.getTopOrDown(billNumGrowth);
                currentValue = Math.abs(billNumGrowth).toFixed(2);
                currentKey = billNum ? billNum.toFixed(0) : zero.toFixed(0);
            }
            if (type === 'moneyTotal') {
                title = '销售金额(元)';
                upDown = _this.getTopOrDown(moneyTotalGrowth);
                currentValue = Math.abs(moneyTotalGrowth).toFixed(2);
                currentKey = moneyTotal ? moneyTotal.toFixed(moneyAccuracy) : zero.toFixed(moneyAccuracy);
            }
            if (type === 'billAvgMoney') {
                title = '客单价(元)';
                upDown = _this.getTopOrDown(billAvgMoneyGrowth);
                currentValue = Math.abs(billAvgMoneyGrowth).toFixed(2);
                currentKey = billAvgMoney ? billAvgMoney.toFixed(priceAccuracy) : zero.toFixed(priceAccuracy);
            }
            if (type === 'memberNum') {
                title = '新增会员';
                upDown = _this.getTopOrDown(memberNumGrowth);
                currentValue = !memberNumGrowth ? '--' : Math.abs(memberNumGrowth).toFixed(2);
                currentKey = memberNum;
            }
            return roleObj[type] !== undefined ? _react2.default.createElement(
                _basic.Col,
                { className: 'col', span: 6 },
                _react2.default.createElement(
                    'div',
                    { className: 'home-panel-2' },
                    _react2.default.createElement(
                        'h5',
                        null,
                        title
                    ),
                    _react2.default.createElement(
                        'b',
                        null,
                        currentKey,
                        _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement(_SvgIcon2.default, { type: upDown === 'up' ? "jiantoushang" : "jiantouxia" })
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        '\u8F83\u524D\u671F',
                        _react2.default.createElement(
                            'span',
                            { className: upDown === 'up' ? "red-txt" : "green-txt" },
                            '' + (currentValue === '--' ? '' : upDown === 'up' ? "+" : "-") + currentValue + '%'
                        )
                    )
                )
            ) : _react2.default.createElement(
                _basic.Col,
                { className: 'col', span: 6 },
                _react2.default.createElement(
                    'div',
                    { className: 'home-panel-2' },
                    _react2.default.createElement(
                        'h5',
                        null,
                        title
                    ),
                    _react2.default.createElement(
                        'b',
                        null,
                        currentKey
                    )
                )
            );
        };

        _this.state = {
            dateSource: { agentmoney: 0, settlemoney: 0, icount: 0 }
        };
        _this.onDateChange = _this.onDateChange.bind(_this);
        _this.startTime;
        _this.endTime;
        _this.type = 'week';
        // this.getsrvcomp({ "dprebegin": common.getDate('lastweek', '0'), "dpreend": common.getDate('lastweek', '1'), "dbegin": common.getDate('week', '0'), "dend": common.getDate('week', '1') });
        return _this;
    }

    _createClass(TaskList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.homeActions.getTaskListData({});
        }
    }, {
        key: 'onDateChange',
        value: function onDateChange(date, type) {
            var taskListStore = this.props.home.taskListStore;

            if (type === 'more') {
                var activeKey = 'SJ0101';
                var selectedNode = { "level": 2, "tenant": 516379152306432, "isShopRelated": false, "name": "销售分析", "code": "SJ0101", "isEnd": true, "authCode": "rm_saleanalysislist", "parentCode": "SJ01", "_walkStatus": "Allow", "metaKey": "rm_saleanalysis", "id": 0, "subId": "SJ", "disabled": false, "authLevel": 3, "metaType": "voucherlist", "viewType": "meta" };
                this.props.moreButtonHandler(activeKey, selectedNode, null);
            } else {
                this.props.homeActions.setOptions({ taskListBegin: date[1], taskListEnd: date[0], taskListCompareBegin: date[3], taskListCompareEnd: date[2] });
                this.props.homeActions.getTaskListData({ beginDate: date[1], endDate: date[0], compareBeginDate: date[3], compareEndDate: date[2], store_id: taskListStore });
            }
        }
    }, {
        key: 'getTopOrDown',


        // getContent(){
        //     let { taskListData } = this.props.home;
        //     let arr = [];
        //     let numAccuracy = cb.rest.AppContext.option.quantitydecimal;
        //     let moneyAccuracy = cb.rest.AppContext.option.amountofdecimal;
        //     let zero = 0;
        //     for(let attr in taskListData){
        //         if(attr === 'billnum')
        //             arr.push(<Col className='col' span={8}><div className='home-panel-2'><h5>成交笔数</h5><b>{taskListData[attr].toFixed(numAccuracy)}</b></div></Col>)
        //         if(attr === 'billnum' && taskListData[attr] == 0){
        //             arr.push(<Col className='col' span={8}><div className='home-panel-2'><h5>客单价(元)</h5><b>{zero.toFixed(moneyAccuracy)}</b></div></Col>)
        //             arr.push(<Col className='col' span={8}><div className='home-panel-2'><h5>销售金额(元)</h5><b>{zero.toFixed(moneyAccuracy)}</b></div></Col>)
        //         }
        //         if(attr === 'fBillAvgMoney')
        //             arr.push(<Col className='col' span={8}><div className='home-panel-2'><h5>客单价(元)</h5><b>{taskListData[attr].toFixed(moneyAccuracy)}</b></div></Col>)
        //         if(attr === 'fMoneySumTotal')
        //             arr.push(<Col className='col' span={8}><div className='home-panel-2'><h5>销售金额(元)</h5><b>{taskListData[attr].toFixed(moneyAccuracy)}</b></div></Col>)
        //     }
        //     return arr;
        // }

        value: function getTopOrDown(element) {
            if (element < 0) return 'down';else return 'up';
        }
    }, {
        key: 'getContent',
        value: function getContent() {
            var arr = ['billNum', 'moneyTotal', 'billAvgMoney', 'memberNum'];
            var DomArr = [];
            var _fun = this.getDom;
            arr.forEach(function (ele) {
                DomArr.push(_fun(ele));
            });
            return DomArr;
        }
    }, {
        key: 'render',
        value: function render() {
            var content = this.getContent();
            return _react2.default.createElement(
                'div',
                { className: 'home-panel home-overview' },
                _react2.default.createElement(_HomeTitle2.default, { defaultStore: this.props.user.showStore === false ? '' : this.props.user.storeId, dataSource: this.props.user.showStore === false ? null : this.props.user.userStores, onAddressChange: this.onAddressChange, haveAddress: true, onDateChange: this.onDateChange, title: '\u7ECF\u8425\u6982\u51B5' }),
                _react2.default.createElement(
                    'div',
                    { className: 'home-list' },
                    _react2.default.createElement(
                        _basic.Row,
                        { className: 'home-panel-21' },
                        content
                    )
                )
            );
        }
    }]);

    return TaskList;
}(_react.Component);

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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TaskList);