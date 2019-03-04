import React from 'react';
import * as BasicComponents from '../basic';
import * as ExternalBasic from '../../../../common/components/basic';
import * as MetaComponents from './index';
import * as ExternalMeta from '../../../../common/components/meta';
import env from '../../helpers/env';

const { ControlTypesByChildrenField } = env;

const Row = BasicComponents.Row, Col = BasicComponents.Col;

const BasicComponentsMap = {};
for (var attr in BasicComponents)
  BasicComponentsMap[attr.toLocaleLowerCase()] = BasicComponents[attr];
for (var attr in ExternalBasic)
  BasicComponentsMap[attr.toLocaleLowerCase()] = ExternalBasic[attr];
const MetaComponentsMap = {};
for (var attr in ExternalMeta)
  MetaComponentsMap[attr.toLocaleLowerCase()] = ExternalMeta[attr];

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
  const ComName = MetaComponentsMap[containerType];
  if (ComName)
    return <ComName key={key} meta={container} viewModel={viewModel} />
  switch (containerType) {
    case 'listheader':
      return <MetaComponents.ListHeader key={key} meta={container} model={viewModel} hasTree={hasTree} />
    case 'cardheader':
      if (env.INTERACTIVE_MODE === 'touch')
        return null;
      return <MetaComponents.CardHeader key={key} meta={container} model={viewModel} />
    case 'toolbar':
      return <MetaComponents.Toolbar key={key} align={container.cAlign} config={container.cStyle} delay={container.childrenField ? false : true} controls={container.controls} model={viewModel} />
    case 'table':
      return <MetaComponents.TableContainer key={key} meta={container} width={width} height={height} viewModel={viewModel} />;
    case 'flatrowcontainer':
      return <MetaComponents.FlatRowContainer key={key} meta={container} viewModel={viewModel} />;
    case 'checkboxcontainer':
      return <MetaComponents.CheckboxContainer key={key} meta={container} viewModel={viewModel} />
    case 'treetable':
      return <MetaComponents.TreeTableContainer key={key} meta={container} width={width} height={height} viewModel={viewModel} />
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
      return <MetaComponents.CardTabs key={key} meta={container} viewModel={viewModel} width={width} height={height} index={index} />
    case 'linetabs':
      return <MetaComponents.LineTabs containers={container.containers} viewModel={viewModel} width={width} height={height} config={config} />
    case 'groupcontainer':
      return <MetaComponents.GroupContainer config={container.cStyle} meta={container} viewModel={viewModel} width={width} index={index} />
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
      let flag = false;
      if (container.containers) {
        container.containers.forEach(item => {
          const subContainerWidthPercent = getSubContainerWidthPercent(container, item);
          let subContainerWidth, widthClass;
          if (subContainerWidthPercent !== 100) {
            subContainerWidth = width * subContainerWidthPercent / 100;
            widthClass = `viewContainer width-percent-${subContainerWidthPercent.toFixed(0)}`;
            flag = true;
          }
          const component = parseContainer(item, viewModel, subContainerWidth || width, height, index, hasTree);
          switch (item.cAlign && item.cAlign.trim().toLocaleLowerCase()) {
            case 'left':
              leftComs.push(component);
              break;
            default:
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
          <Row style={{ display: 'flex', height: '100%' }} className={className}>
            <div className="form-left Manual-calculation-left">{leftComs}</div>
            <div className="form-base  Manual-calculation">{otherComs}</div>
          </Row>
        );
      if (!className)
        return flag ? <Row className='clearfix'>{otherComs}</Row> : otherComs;
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
  const relatedFields = [], relatedControls = {}, controls = [];
  container.controls.forEach(control => {
    if (!control.cStyle) return;
    try {
      const related = JSON.parse(control.cStyle).related;
      if (!related) return;
      if (!control.related)
        control.related = related;
      if (cb.utils.isArray(related)) {
        related.forEach(item => {
          relatedFields.push(item);
        });
      } else {
        relatedFields.push(related);
      }
    } catch (e) {

    }
  });
  container.controls.forEach(control => {
    if (relatedFields.indexOf(control.cItemName) > -1) {
      relatedControls[control.cItemName] = parseControl(control, viewModel, 1, container.childrenField, width);
    } else {
      controls.push(control);
    }
  });
  controls.forEach(control => {
    const { related } = control;
    const relatedControl = [];
    if (related) {
      if (cb.utils.isArray(related)) {
        related.forEach(item => {
          relatedControl.push(relatedControls[item]);
        });
      } else {
        relatedControl.push(relatedControls[related]);
      }
    }
    components.push(parseControl(control, viewModel, containerCols, container.childrenField, width, relatedControl.length ? relatedControl : null));
  });
  let title;
  if (container.cStyle) {
    let config = null;
    try {
      config = JSON.parse(container.cStyle);
    } catch (e) {
      config = {};
    }
    if (config.title)
      title = <Col span={24}><h3>{container.cName}</h3></Col>
  }
  return (
    <Row key={container.groupId}>
      {title}
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

const parseControl = (control, viewModel, containerCols, childrenField, width, relatedControl) => {
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
    controlModel = childrenField && viewModel.get(childrenField) && viewModel.get(childrenField).getEditRowModel && viewModel.get(childrenField).getEditRowModel().get(modelKey);
    if (!controlModel)
      controlModel = viewModel.get(modelKey);
  }
  const ComName = BasicComponentsMap[controlType];
  const component = ComName ? <ComName model={controlModel} {...control} relatedControl={relatedControl} /> : <h1>{controlType}</h1>;
  const className = `viewSetting viewCell width-percent-${controlWidth.toFixed(0)}`;
  return (
    <div key={modelKey} className={className} id={`${viewModel.getParams() && viewModel.getParams().billNo}|${modelKey}`}>
      {component}
    </div>
  );
}
