import React from 'react';
import * as BasicComponents from '../BasicComponents';
import * as MetaComponents from './index';
import env from 'yxyweb/common/helpers/env';

const { ControlTypesByChildrenField } = env;

const Row = BasicComponents.Row, Col = BasicComponents.Col;

const BasicComponentsMap = {};
for (var attr in BasicComponents)
  BasicComponentsMap[attr.toLocaleLowerCase()] = BasicComponents[attr];

export const parseContainer = (container, viewModel, width, height, index, hasTree) => {
  const containerType = container.cControlType && container.cControlType.trim().toLocaleLowerCase();
  const key = container.groupId;
  const config = {};
  if (container.cStyle) {
    try {
      Object.assign(config, JSON.parse(container.cStyle));
    } catch (e) {

    }
  }
  switch (containerType) {
    case 'listheader':
      return <h1>{containerType}</h1>
      return <MetaComponents.ListHeader key={key} meta={container} model={viewModel} hasTree={hasTree} />
    case 'cardheader':
      if (env.INTERACTIVE_MODE === 'touch')
        return null;
      return <MetaComponents.CardHeader key={key} meta={container} model={viewModel} />
    case 'highlight':
    case 'tophighlight':
      let hType;
      if (containerType == 'tophighlight') hType = 'tophighlight';
      return <MetaComponents.HighLight hType={hType} key={key} meta={container} model={viewModel} />
    case 'voucherdetail':
    case 'voucherdetail_sum':
      let bSum = false;
      if (containerType == 'voucherdetail_sum') bSum = true;
      return <MetaComponents.VoucherDetail bSum={bSum} key={key} meta={container} model={viewModel} />
    case 'card':
      return <MetaComponents.Card key={key} meta={container} model={viewModel} />
    case 'detailheader':
      return <MetaComponents.DetailHeader key={key} meta={container} model={viewModel} />
    case 'div':
      if (container.cGroupCode === 'footertoolbar_m')
        return <MetaComponents.Footer key={key} meta={container} viewModel={viewModel} />
      return null;
    case 'toolbar':
      return <MetaComponents.Toolbar key={key} align={container.cAlign} config={container.cStyle} delay={container.childrenField ? false : true} controls={container.controls} model={viewModel} />
    case 'table':
      return <h1>{containerType}</h1>
      return <MetaComponents.TableContainer key={key} meta={container} width={width} height={height} viewModel={viewModel} />;
    case 'tablecontrol':
      return <MetaComponents.TableControl key={key} meta={container} width={width} viewModel={viewModel} />;
    case 'rpttable':/*报表*/
      return <MetaComponents.RptTableContainer key={key} meta={container} width={width} viewModel={viewModel} />;
    case 'total':
      return <MetaComponents.TotalContainer key={key} meta={container} viewModel={viewModel} />;
    case 'searchtree':
      return <MetaComponents.SearchTree key={key} config={container.cStyle} model={viewModel.get(container.cCode)} height={height} />
    case 'tabpage':
    case 'tab_h':
      return <h1>{containerType}</h1>
      return <MetaComponents.CardTabs key={key} meta={container} viewModel={viewModel} width={width} index={index} />
    case 'linetabs':
      return <MetaComponents.LineTabs containers={container.containers} viewModel={viewModel} width={width} />
    case 'groupcontainer':
      return <h1>{containerType}</h1>
      return <MetaComponents.GroupContainer config={container.cStyle} containers={container.containers} viewModel={viewModel} width={width} index={index} />
    case 'title':
      return <MetaComponents.Title key={key} meta={container} viewModel={viewModel} />
    case 'footer':
      if (env.INTERACTIVE_MODE === 'touch')
        return null;
      return <MetaComponents.Footer key={key} meta={container} viewModel={viewModel} />
    case 'fileupload':
      return <MetaComponents.FileUpload key={key} />
    case 'modal':
      return null;
    case 'convenientquery':
      return <MetaComponents.ConvenientQuery model={viewModel} cols={3} config={config} autoExpand={false} />
    default: {
      const leftComs = [], otherComs = [];
      if (container.containers) {
        container.containers.forEach(item => {
          const subContainerWidthPercent = getSubContainerWidthPercent(container, item);
          let subContainerWidth, widthClass;
          if (subContainerWidthPercent !== 100) {
            subContainerWidth = width * subContainerWidthPercent / 100;
            widthClass = `viewCell width-percent-${subContainerWidthPercent.toFixed(0)}`;
          }
          const component = parseContainer(item, viewModel, subContainerWidth || width, height, index, hasTree);
          switch (item.cAlign && item.cAlign.trim().toLocaleLowerCase()) {
            case 'left':
              leftComs.push(component);
              break;
            default:
              if (component && (Array.isArray(component) || component.type))
                otherComs.push(widthClass ? <div className={widthClass}>{component}</div> : component);
              break;
          }
        });
      } else if (container.controls) {
        const component = parseControls(container, viewModel, width);
        otherComs.push(component);
      } else {
        return null;
      }
      const className = getContainerClassName(container);
      if (leftComs.length)
        return (
          <Row style={{ display: 'table', height: '100%' }} className={className}>
            <div className="form-left">{leftComs}</div>
            <div className="form-base">{otherComs}</div>
          </Row>
        );
      if (!className)
        return otherComs;
      return (
        <Row className={className}>
          {otherComs}
        </Row>
      );
    }
  }
}

export const parseControls = (container, viewModel, width) => {
  const components = [];
  const containerCols = container.iCols || 1;
  container.controls.forEach(control => {
    components.push(parseControl(control, viewModel, containerCols, container.childrenField, width));
  });
  return (
    <Row key={container.groupId}>
      <Col span={24}>{components}</Col>
    </Row>
  );
}

const getContainerClassName = container => {
  if (!container.cStyle) return;
  let config = null;
  try {
    config = JSON.parse(container.cStyle);
  } catch (e) {
    config = {};
  }
  if (!config.classname) return;
  return config.classname;
}

const getSubContainerWidthPercent = (container, item) => {
  const containerCols = container.iCols || 1;
  if (containerCols === 1)
    return 100;
  let subContainerWidth = 100 / containerCols;
  if (item.cStyle) {
    let config = null;
    try {
      config = JSON.parse(item.cStyle);
    } catch (e) {
      config = {};
    }
    const subContainerCols = config.iColWidth || 1;
    if (subContainerCols > containerCols)
      subContainerWidth = 100;
    else if (subContainerCols > 1)
      subContainerWidth *= subContainerCols;
  }
  return subContainerWidth;
}

const parseControl = (control, viewModel, containerCols, childrenField, width) => {
  let controlWidth = 100 / containerCols;
  const controlCols = control.iColWidth || 1;
  if (controlCols > containerCols)
    controlWidth = 100;
  else if (controlCols > 1)
    controlWidth *= controlCols;
  const controlType = control.cControlType.trim().toLocaleLowerCase();
  const modelKey = control.cItemName;
  let controlModel = null;
  if (ControlTypesByChildrenField.indexOf(controlType) > -1) {
    controlModel = childrenField && viewModel.get(childrenField);
  } else {
    controlModel = childrenField && viewModel.get(childrenField) && viewModel.get(childrenField).getEditRowModel().get(modelKey);
    if (!controlModel)
      controlModel = viewModel.get(modelKey);
  }
  const ComName = BasicComponentsMap[controlType];
  const component = ComName ? <ComName model={controlModel} {...control} /> : <h1>{controlType}</h1>;
  const className = `viewSetting viewCell width-percent-${controlWidth.toFixed(0)}`;
  return (
    <div key={modelKey} className={className} id={`${viewModel.getParams() && viewModel.getParams().billNo}|${modelKey}`}>
      {component}
    </div>
  );
}
