'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseControls = exports.parseContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basic = require('../basic');

var BasicComponents = _interopRequireWildcard(_basic);

var _basic2 = require('../../../../common/components/basic');

var ExternalBasic = _interopRequireWildcard(_basic2);

var _index = require('./index');

var MetaComponents = _interopRequireWildcard(_index);

var _meta = require('../../../../common/components/meta');

var ExternalMeta = _interopRequireWildcard(_meta);

var _env = require('../../helpers/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ControlTypesByChildrenField = _env2.default.ControlTypesByChildrenField;


var Row = BasicComponents.Row,
    Col = BasicComponents.Col;

var BasicComponentsMap = {};
for (var attr in BasicComponents) {
  BasicComponentsMap[attr.toLocaleLowerCase()] = BasicComponents[attr];
}for (var attr in ExternalBasic) {
  BasicComponentsMap[attr.toLocaleLowerCase()] = ExternalBasic[attr];
}var MetaComponentsMap = {};
for (var attr in ExternalMeta) {
  MetaComponentsMap[attr.toLocaleLowerCase()] = ExternalMeta[attr];
}var parseContainer = exports.parseContainer = function parseContainer(container, viewModel, width, height, index, hasTree) {
  var containerType = container.cControlType && container.cControlType.trim().toLocaleLowerCase();
  var key = container.groupId;
  var config = {};
  if (container.cStyle) {
    try {
      Object.assign(config, JSON.parse(container.cStyle));
    } catch (e) {}
  }
  var ComName = MetaComponentsMap[containerType];
  if (ComName) return _react2.default.createElement(ComName, { key: key, meta: container, viewModel: viewModel });
  switch (containerType) {
    case 'listheader':
      return _react2.default.createElement(MetaComponents.ListHeader, { key: key, meta: container, model: viewModel, hasTree: hasTree });
    case 'cardheader':
      if (_env2.default.INTERACTIVE_MODE === 'touch') return null;
      return _react2.default.createElement(MetaComponents.CardHeader, { key: key, meta: container, model: viewModel });
    case 'toolbar':
      return _react2.default.createElement(MetaComponents.Toolbar, { key: key, align: container.cAlign, config: container.cStyle, delay: container.childrenField ? false : true, controls: container.controls, model: viewModel });
    case 'table':
      return _react2.default.createElement(MetaComponents.TableContainer, { key: key, meta: container, width: width, height: height, viewModel: viewModel });
    case 'flatrowcontainer':
      return _react2.default.createElement(MetaComponents.FlatRowContainer, { key: key, meta: container, viewModel: viewModel });
    case 'checkboxcontainer':
      return _react2.default.createElement(MetaComponents.CheckboxContainer, { key: key, meta: container, viewModel: viewModel });
    case 'treetable':
      return _react2.default.createElement(MetaComponents.TreeTableContainer, { key: key, meta: container, width: width, height: height, viewModel: viewModel });
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
      return _react2.default.createElement(MetaComponents.CardTabs, { key: key, meta: container, viewModel: viewModel, width: width, height: height, index: index });
    case 'linetabs':
      return _react2.default.createElement(MetaComponents.LineTabs, { containers: container.containers, viewModel: viewModel, width: width, height: height, config: config });
    case 'groupcontainer':
      return _react2.default.createElement(MetaComponents.GroupContainer, { config: container.cStyle, meta: container, viewModel: viewModel, width: width, index: index });
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
        var flag = false;
        if (container.containers) {
          container.containers.forEach(function (item) {
            var subContainerWidthPercent = getSubContainerWidthPercent(container, item);
            var subContainerWidth = void 0,
                widthClass = void 0;
            if (subContainerWidthPercent !== 100) {
              subContainerWidth = width * subContainerWidthPercent / 100;
              widthClass = 'viewContainer width-percent-' + subContainerWidthPercent.toFixed(0);
              flag = true;
            }
            var component = parseContainer(item, viewModel, subContainerWidth || width, height, index, hasTree);
            switch (item.cAlign && item.cAlign.trim().toLocaleLowerCase()) {
              case 'left':
                leftComs.push(component);
                break;
              default:
                otherComs.push(widthClass ? _react2.default.createElement(
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
          { style: { display: 'flex', height: '100%' }, className: className },
          _react2.default.createElement(
            'div',
            { className: 'form-left Manual-calculation-left' },
            leftComs
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-base  Manual-calculation' },
            otherComs
          )
        );
        if (!className) return flag ? _react2.default.createElement(
          Row,
          { className: 'clearfix' },
          otherComs
        ) : otherComs;
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
  var relatedFields = [],
      relatedControls = {},
      controls = [];
  container.controls.forEach(function (control) {
    if (!control.cStyle) return;
    try {
      var related = JSON.parse(control.cStyle).related;
      if (!related) return;
      if (!control.related) control.related = related;
      if (cb.utils.isArray(related)) {
        related.forEach(function (item) {
          relatedFields.push(item);
        });
      } else {
        relatedFields.push(related);
      }
    } catch (e) {}
  });
  container.controls.forEach(function (control) {
    if (relatedFields.indexOf(control.cItemName) > -1) {
      relatedControls[control.cItemName] = parseControl(control, viewModel, 1, container.childrenField, width);
    } else {
      controls.push(control);
    }
  });
  controls.forEach(function (control) {
    var related = control.related;

    var relatedControl = [];
    if (related) {
      if (cb.utils.isArray(related)) {
        related.forEach(function (item) {
          relatedControl.push(relatedControls[item]);
        });
      } else {
        relatedControl.push(relatedControls[related]);
      }
    }
    components.push(parseControl(control, viewModel, containerCols, container.childrenField, width, relatedControl.length ? relatedControl : null));
  });
  var title = void 0;
  if (container.cStyle) {
    var config = null;
    try {
      config = JSON.parse(container.cStyle);
    } catch (e) {
      config = {};
    }
    if (config.title) title = _react2.default.createElement(
      Col,
      { span: 24 },
      _react2.default.createElement(
        'h3',
        null,
        container.cName
      )
    );
  }
  return _react2.default.createElement(
    Row,
    { key: container.groupId },
    title,
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

var parseControl = function parseControl(control, viewModel, containerCols, childrenField, width, relatedControl) {
  var controlWidth = 100 / containerCols;
  var controlCols = control.iColWidth || 1;
  if (controlCols > containerCols) controlWidth = 100;else if (controlCols > 1) controlWidth *= controlCols;
  var controlType = control.cControlType.trim().toLocaleLowerCase();
  var modelKey = control.cItemName;
  var controlModel = null;
  if (ControlTypesByChildrenField.indexOf(controlType) > -1) {
    controlModel = childrenField && viewModel.get(childrenField);
  } else {
    controlModel = childrenField && viewModel.get(childrenField) && viewModel.get(childrenField).getEditRowModel && viewModel.get(childrenField).getEditRowModel().get(modelKey);
    if (!controlModel) controlModel = viewModel.get(modelKey);
  }
  var ComName = BasicComponentsMap[controlType];
  var component = ComName ? _react2.default.createElement(ComName, _extends({ model: controlModel }, control, { relatedControl: relatedControl })) : _react2.default.createElement(
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