'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBoxControl = function (_React$Component) {
    _inherits(SearchBoxControl, _React$Component);

    function SearchBoxControl(props) {
        _classCallCheck(this, SearchBoxControl);

        var _this = _possibleConstructorReturn(this, (SearchBoxControl.__proto__ || Object.getPrototypeOf(SearchBoxControl)).call(this, props));

        _this.onInputChange = function (val) {
            _this.setState({ value: val });
        };

        _this.onCancel = function (obj, type) {
            if (!type) {
                if (obj.props.onCancel) {
                    obj.props.onCancel();
                }
            }
            obj.setState({ value: '' });
            if (!type) {
                obj.searchEvent("1");
            }
        };

        _this.onSearch = function () {
            _this.searchEvent();
        };

        _this.searchEvent = function (cval) {
            var _this$props = _this.props,
                parentModel = _this$props.parentModel,
                model = _this$props.model,
                filterModel = _this$props.filterModel;

            if (model) _this.props.model.setValue(cval ? "" : _this.state.value, true);
            if (parentModel && model && filterModel) filterModel.fireEvent('searchEvent', { model: parentModel, solutionid: _this.state.current });
            filterModel.get('search').fireEvent('click', { model: parentModel, solutionid: _this.state.current });
        };

        _this.goBack = function () {
            _this.context.router.history.goBack();
            if (_this.props.goBack) _this.props.goBack();
        };

        _this.state = {};
        return _this;
    }

    _createClass(SearchBoxControl, [{
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
        key: 'render',
        value: function render() {
            var _this2 = this;

            var value = this.state.value;

            var self = this;
            return _react2.default.createElement(
                _antdMobile.List,
                null,
                _react2.default.createElement(_antdMobile.SearchBar, { ref: 'cusSearchBarRef', value: value, placeholder: this.props.placeholder, onSubmit: this.onSearch, onChange: this.onInputChange, onClear: function onClear() {
                        return _this2.onCancel(self, 'cancel');
                    }, onCancel: function onCancel() {
                        return _this2.onCancel(self);
                    } }),
                this.props.rightContent
            );
        }
    }]);

    return SearchBoxControl;
}(_react2.default.Component);

SearchBoxControl.contextTypes = {
    router: _propTypes2.default.object.isRequired
};
exports.default = SearchBoxControl;