'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagGroup = exports.CheckboxEnum = exports.ColorPicker = exports.TreeTable = exports.Password = exports.CheckRadio = exports.InputFloat = exports.TextImport = exports.Avatar = exports.ListRefer = exports.SwitchLabel = exports.Attachment = exports.Span = exports.TreeRefer = exports.PredicateDatePicker = exports.Tag2 = exports.Map = exports.Menu = exports.RichText = exports.Tree = exports.Tag = exports.Table = exports.Switch = exports.Select = exports.Row = exports.Refer = exports.Radio = exports.Text = exports.Label = exports.Price = exports.Money = exports.InputNumber = exports.Input = exports.Dropdown = exports.DropdownButton = exports.RangePicker = exports.TimeRangePicker = exports.TimePicker = exports.DatePicker = exports.Col = exports.CheckboxGroup = exports.CheckBox = exports.Cascader = exports.Button = undefined;

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _cascader = require('./cascader');

var _cascader2 = _interopRequireDefault(_cascader);

var _checkbox = require('./checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _checkboxgroup = require('./checkboxgroup');

var _checkboxgroup2 = _interopRequireDefault(_checkboxgroup);

var _col = require('./col');

var _col2 = _interopRequireDefault(_col);

var _datepicker = require('./datepicker');

var _datepicker2 = _interopRequireDefault(_datepicker);

var _timepicker = require('./timepicker');

var _timepicker2 = _interopRequireDefault(_timepicker);

var _timerangepicker = require('./timerangepicker');

var _timerangepicker2 = _interopRequireDefault(_timerangepicker);

var _rangepicker = require('./rangepicker');

var _rangepicker2 = _interopRequireDefault(_rangepicker);

var _dropdownbutton = require('./dropdownbutton');

var _dropdownbutton2 = _interopRequireDefault(_dropdownbutton);

var _dropdown = require('./dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _inputnumber = require('./inputnumber');

var _inputnumber2 = _interopRequireDefault(_inputnumber);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _radio = require('./radio');

var _radio2 = _interopRequireDefault(_radio);

var _refer = require('./refer');

var _refer2 = _interopRequireDefault(_refer);

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _select = require('./select');

var _select2 = _interopRequireDefault(_select);

var _switch = require('./switch');

var _switch2 = _interopRequireDefault(_switch);

var _table = require('./table');

var _table2 = _interopRequireDefault(_table);

var _tag = require('./tag');

var _tag2 = _interopRequireDefault(_tag);

var _tree = require('./tree');

var _tree2 = _interopRequireDefault(_tree);

var _richtext = require('./richtext');

var _richtext2 = _interopRequireDefault(_richtext);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _amap = require('./amap');

var _amap2 = _interopRequireDefault(_amap);

var _tag3 = require('./tag2');

var _tag4 = _interopRequireDefault(_tag3);

var _predicatedatepicker = require('./predicatedatepicker');

var _predicatedatepicker2 = _interopRequireDefault(_predicatedatepicker);

var _treerefer = require('./treerefer');

var _treerefer2 = _interopRequireDefault(_treerefer);

var _span = require('./span');

var _span2 = _interopRequireDefault(_span);

var _fileUpload = require('../file-upload');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _switchlabel = require('./switchlabel');

var _switchlabel2 = _interopRequireDefault(_switchlabel);

var _listrefer = require('./listrefer');

var _listrefer2 = _interopRequireDefault(_listrefer);

var _avatar = require('./avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _textimport = require('./textimport');

var _textimport2 = _interopRequireDefault(_textimport);

var _inputfloat = require('./inputfloat');

var _inputfloat2 = _interopRequireDefault(_inputfloat);

var _checkradio = require('./checkradio');

var _checkradio2 = _interopRequireDefault(_checkradio);

var _password = require('./password');

var _password2 = _interopRequireDefault(_password);

var _treetable = require('./treetable');

var _treetable2 = _interopRequireDefault(_treetable);

var _colorpicker = require('./colorpicker');

var _colorpicker2 = _interopRequireDefault(_colorpicker);

var _checkboxenum = require('./checkboxenum');

var _checkboxenum2 = _interopRequireDefault(_checkboxenum);

var _taggroup = require('./taggroup');

var _taggroup2 = _interopRequireDefault(_taggroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Button = _button2.default; // export Alert from './alert'

exports.Cascader = _cascader2.default;
exports.CheckBox = _checkbox2.default;
exports.CheckboxGroup = _checkboxgroup2.default;
exports.Col = _col2.default;
exports.DatePicker = _datepicker2.default;
exports.TimePicker = _timepicker2.default;
exports.TimeRangePicker = _timerangepicker2.default;
exports.RangePicker = _rangepicker2.default;
exports.DropdownButton = _dropdownbutton2.default;
exports.Dropdown = _dropdown2.default;
exports.Input = _input2.default;
exports.InputNumber = _inputnumber2.default;
exports.Money = _inputnumber2.default;
exports.Price = _inputnumber2.default;
exports.Label = _label2.default;
exports.Text = _text2.default;
// export Progress from "./progress"

exports.Radio = _radio2.default;
// export Rate from "./rate"

exports.Refer = _refer2.default;
exports.Row = _row2.default;
exports.Select = _select2.default;
// export Steps from "./steps"

exports.Switch = _switch2.default;
exports.Table = _table2.default;
exports.Tag = _tag2.default;
// export Tooltip from "./tooltip"
// export Transfer from "./transfer"

exports.Tree = _tree2.default;
exports.RichText = _richtext2.default;
// export Selectgroup from '../Contacts/selectgroup'
// export GroupBlock from './groupblock'

exports.Menu = _menu2.default;
// export QuickTag from './quickTab'
// export NewTabs from '../NewTabs'
// export Map from './map'

exports.Map = _amap2.default;
exports.Tag2 = _tag4.default;
exports.PredicateDatePicker = _predicatedatepicker2.default;
exports.TreeRefer = _treerefer2.default;
exports.Span = _span2.default;
exports.Attachment = _fileUpload2.default;
exports.SwitchLabel = _switchlabel2.default;
exports.ListRefer = _listrefer2.default;
exports.Avatar = _avatar2.default;
// export BInputNum from './binputnum'

exports.TextImport = _textimport2.default;
exports.InputFloat = _inputfloat2.default;
exports.CheckRadio = _checkradio2.default;
exports.Password = _password2.default;
exports.TreeTable = _treetable2.default;
exports.ColorPicker = _colorpicker2.default;
exports.CheckboxEnum = _checkboxenum2.default;
exports.TagGroup = _taggroup2.default;