'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseControls = exports.parseContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BasicComponents = require('../BasicComponents');

var BasicComponents = _interopRequireWildcard(_BasicComponents);

var _index = require('./index');

var MetaComponents = _interopRequireWildcard(_index);

var _env = require('../../../common/helpers/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ControlTypesByChildrenField = _env2.default.ControlTypesByChildrenField;


var Row = BasicComponents.Row,
    Col = BasicComponents.Col;

var BasicComponentsMap = {};
for (var attr in BasicComponents) {
  BasicComponentsMap[attr.toLocaleLowerCase()] = BasicComponents[attr];
}var parseContainer = exports.parseContainer = function parseContainer(container, viewModel, width, height, index, hasTree) {
  var containerType = container.cControlType && container.cControlType.trim().toLocaleLowerCase();
  var key = container.groupId;
  var config = {};
  if (container.cStyle) {
    try {
      Object.assign(config, JSON.parse(container.cStyle));
    } catch (e) {}
  }
  switch (containerType) {
    case 'listheader':
      return _react2.default.createElement(
        'h1',
        null,
        containerType
      );
      return _react2.default.createElement(MetaComponents.ListHeader, { key: key, meta: container, model: viewModel, hasTree: hasTree });
    case 'cardheader':
      if (_env2.default.INTERACTIVE_MODE === 'touch') return null;
      return _react2.default.createElement(MetaComponents.CardHeader, { key: key, meta: container, model: viewModel });
    case 'highlight':
    case 'tophighlight':
      var hType = void 0;
      if (containerType == 'tophighlight') hType = 'tophighlight';
      return _react2.default.createElement(MetaComponents.HighLight, { hType: hType, key: key, meta: container, model: viewModel });
    case 'voucherdetail':
    case 'voucherdetail_sum':
      var bSum = false;
      if (containerType == 'voucherdetail_sum') bSum = true;
      return _react2.default.createElement(MetaComponents.VoucherDetail, { bSum: bSum, key: key, meta: container, model: viewModel });
    case 'card':
      return _react2.default.createElement(MetaComponents.Card, { key: key, meta: container, model: viewModel });
    case 'detailheader':
      return _react2.default.createElement(MetaComponents.DetailHeader, { key: key, meta: container, model: viewModel });
    case 'div':
      if (container.cGroupCode === 'footertoolbar_m') return _react2.default.createElement(MetaComponents.Footer, { key: key, meta: container, viewModel: viewModel });
      return null;
    case 'toolbar':
      return _react2.default.createElement(MetaComponents.Toolbar, { key: key, align: container.cAlign, config: container.cStyle, delay: container.childrenField ? false : true, controls: container.controls, model: viewModel });
    case 'table':
      return _react2.default.createElement(
        'h1',
        null,
        containerType
      );
      return _react2.default.createElement(MetaComponents.TableContainer, { key: key, meta: container, width: width, height: height, viewModel: viewModel });
    case 'tablecontrol':
      return _react2.default.createElement(MetaComponents.TableControl, { key: key, meta: container, width: width, viewModel: viewModel });
    case 'rpttable':
      /*报表*/
      return _react2.default.createElement(MetaComponents.RptTableContainer, { key: key, meta: container, width: width, viewModel: viewModel });
    case 'total':
      return _react2.default.createElement(MetaComponents.TotalContainer, { key: key, meta: container, viewModel: viewModel });
    case 'searchtree':
      return _react2.default.createElement(MetaComponents.SearchTree, { key: key, config: container.cStyle, model: viewModel.get(container.cCode), height: height });
    case 'tabpage':
    case 'tab_h':
      return _react2.default.createElement(
        'h1',
        null,
        containerType
      );
      return _react2.default.createElement(MetaComponents.CardTabs, { key: key, meta: container, viewModel: viewModel, width: width, index: index });
    case 'linetabs':
      return _react2.default.createElement(MetaComponents.LineTabs, { containers: container.containers, viewModel: viewModel, width: width });
    case 'groupcontainer':
      return _react2.default.createElement(
        'h1',
        null,
        containerType
      );
      return _react2.default.createElement(MetaComponents.GroupContainer, { config: container.cStyle, containers: container.containers, viewModel: viewModel, width: width, index: index });
    case 'title':
      return _react2.default.createElement(MetaComponents.Title, { key: key, meta: container, viewModel: viewModel });
    case 'footer':
      if (_env2.default.INTERACTIVE_MODE === 'touch') return null;
      return _react2.default.createElement(MetaComponents.Footer, { key: key, meta: container, viewModel: viewModel });
    case 'fileupload':
      return _react2.default.createElement(MetaComponents.FileUpload, { key: key });
    case 'modal':
      return null;
    case 'convenientquery':
      return _react2.default.createElement(MetaComponents.ConvenientQuery, { model: viewModel, cols: 3, config: config, autoExpand: false });
    default:
      {
        var leftComs = [],
            otherComs = [];
        if (container.containers) {
          container.containers.forEach(function (item) {
            var subContainerWidthPercent = getSubContainerWidthPercent(container, item);
            var subContainerWidth = void 0,
                widthClass = void 0;
            if (subContainerWidthPercent !== 100) {
              subContainerWidth = width * subContainerWidthPercent / 100;
              widthClass = 'viewCell width-percent-' + subContainerWidthPercent.toFixed(0);
            }
            var component = parseContainer(item, viewModel, subContainerWidth || width, height, index, hasTree);
            switch (item.cAlign && item.cAlign.trim().toLocaleLowerCase()) {
              case 'left':
                leftComs.push(component);
                break;
              default:
                if (component && (Array.isArray(component) || component.type)) otherComs.push(widthClass ? _react2.default.createElement(
                  'div',
                  { className: widthClass },
                  component
                ) : component);
                break;
            }
          });
        } else if (container.controls) {
          var component = parseControls(container, viewModel, width);
          otherComs.push(component);
        } else {
          return null;
        }
        var className = getContainerClassName(container);
        if (leftComs.length) return _react2.default.createElement(
          Row,
          { style: { display: 'table', height: '100%' }, className: className },
          _react2.default.createElement(
            'div',
            { className: 'form-left' },
            leftComs
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-base' },
            otherComs
          )
        );
        if (!className) return otherComs;
        return _react2.default.createElement(
          Row,
          { className: className },
          otherComs
        );
      }
  }
};

var parseControls = exports.parseControls = function parseControls(container, viewModel, width) {
  var components = [];
  var containerCols = container.iCols || 1;
  container.controls.forEach(function (control) {
    components.push(parseControl(control, viewModel, containerCols, container.childrenField, width));
  });
  return _react2.default.createElement(
    Row,
    { key: container.groupId },
    _react2.default.createElement(
      Col,
      { span: 24 },
      components
    )
  );
};

var getContainerClassName = function getContainerClassName(container) {
  if (!container.cStyle) return;
  var config = null;
  try {
    config = JSON.parse(container.cStyle);
  } catch (e) {
    config = {};
  }
  if (!config.classname) return;
  return config.classname;
};

var getSubContainerWidthPercent = function getSubContainerWidthPercent(container, item) {
  var containerCols = container.iCols || 1;
  if (containerCols === 1) return 100;
  var subContainerWidth = 100 / containerCols;
  if (item.cStyle) {
    var config = null;
    try {
      config = JSON.parse(item.cStyle);
    } catch (e) {
      config = {};
    }
    var subContainerCols = config.iColWidth || 1;
    if (subContainerCols > containerCols) subContainerWidth = 100;else if (subContainerCols > 1) subContainerWidth *= subContainerCols;
  }
  return subContainerWidth;
};

var parseControl = function parseControl(control, viewModel, containerCols, childrenField, width) {
  var controlWidth = 100 / containerCols;
  var controlCols = control.iColWidth || 1;
  if (controlCols > containerCols) controlWidth = 100;else if (controlCols > 1) controlWidth *= controlCols;
  var controlType = control.cControlType.trim().toLocaleLowerCase();
  var modelKey = control.cItemName;
  var controlModel = null;
  if (ControlTypesByChildrenField.indexOf(controlType) > -1) {
    controlModel = childrenField && viewModel.get(childrenField);
  } else {
    controlModel = childrenField && viewModel.get(childrenField) && viewModel.get(childrenField).getEditRowModel().get(modelKey);
    if (!controlModel) controlModel = viewModel.get(modelKey);
  }
  var ComName = BasicComponentsMap[controlType];
  var component = ComName ? _react2.default.createElement(ComName, _extends({ model: controlModel }, control)) : _react2.default.createElement(
    'h1',
    null,
    controlType
  );
  var className = 'viewSetting viewCell width-percent-' + controlWidth.toFixed(0);
  return _react2.default.createElement(
    'div',
    { key: modelKey, className: className, id: (viewModel.getParams() && viewModel.getParams().billNo) + '|' + modelKey },
    component
  );
};