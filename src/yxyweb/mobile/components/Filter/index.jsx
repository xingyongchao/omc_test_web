
import React from 'react';
import { Popover, Icon, message, Menu, Checkbox } from 'antd';
import * as BasicComponents from '../../basic';
import Filter from './filter';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import _ from 'lodash'

const Row = BasicComponents.Row,
  Col = BasicComponents.Col,
  Button = BasicComponents.Button,
  Label = BasicComponents.Label,
  Tag2 = BasicComponents.Tag2;

const BasicComponentsMap = {};
for (var attr in BasicComponents)
  BasicComponentsMap[attr.toLocaleLowerCase()] = BasicComponents[attr];

export default class TouchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schemeData: [],
      current: '',
      schemeName: '',
      showMore: false,
      popFlag: false,
      filterModel: [],
      tag2FilterCount: 0,
      commonFilterCount: 0,
      filterAreaCount: 0,
      tag2InFirstRow: false
    };
    this.showFields = new Array();
    this.filterModel_Tmp = [];
    var params = this.props.model.getParams();
    this.vm = cb.loader.initMetaCommonViewModel(
      'FilterViewModel',
      'filterViewModel',
      { filterId: params.filterId, condition: params.condition, cardKey: params.cardKey },
      this.props.model,
      ['filterClick']
    );
    this._DocumentMouseDown = this._DocumentMouseDown.bind(this);
    this.props.model.on('updateCondition', condition => {
      if (!condition || !condition.commonVOs || !condition.commonVOs.length) return;
      let flag = true;
      this.vm.setCache('condition', condition);
      condition.commonVOs.forEach(a => {
        var attr = a.itemName;
        const itemModel = this.vm.get(attr);
        if (!itemModel) return;
        itemModel.getFromModel().setValue(a.value1);
        const ctrlType = itemModel.getState('ctrlType');
        if (ctrlType && ctrlType.trim().toLocaleLowerCase() === 'tagbutton')
          flag = false;
      });
      if (flag)
        this.SearchEvent();
    });
  }

  componentDidMount() {
    if (this.vm) {
      this.vm.addListener(this);
    }
    this.mousedownHandler = addEventListener(document, 'mousedown', this._DocumentMouseDown);
  }

  componentDidUpdate() {
    this.props.model.execute('filterHeightUpdate');
    if (this.controlNode.clientHeight > document.body.clientHeight - 130) {
      if (this.state.className !== 'filter-greater-height')
        this.setState({ className: 'filter-greater-height' });
    } else {
      if (this.state.className !== 'filter-less-height')
        this.setState({ className: 'filter-less-height' });
    }
  }

  componentWillUnmount() {
    this.vm.removeListener(this);
    this.mousedownHandler.remove();
    this.mousedownHandler = null;
  }
  //鼠标点击事件
  _DocumentMouseDown(e) {
    let p1 = cb.dom(event.target).parents('.filterSetting');
    let p2 = cb.dom(event.target).parents('.ant-popover');
    if (p1.length == 0 && p2.length == 0 && this.state.popFlag) {
      this.setState({
        popFlag: false
      });
    }
  }
  Tag2Clicked = () => {
    this.SearchEvent();
  }

  initFilterFields(args) {
    let self = this;
    let filterModel = [];
    let CommonModel = args.filterDetail.CommonModel;
    let AllFilterModel = args.filterDetail.AllFilterModel;
    AllFilterModel.forEach(function (eleAll) {
      CommonModel.forEach(function (eleCommon) {

        if (eleAll.id && eleCommon.itemId && eleCommon.itemId == eleAll.id) {
          let tmp = {};
          // tmp.itemName = eleCommon.itemName;
          // tmp.orderId = eleCommon.orderId;
          // tmp.isCommon = eleCommon.isCommon;
          // tmp.multSelect = eleCommon.multSelect;
          // tmp.cShowCaption = eleCommon.cShowCaption;
          // tmp.ctrlType = eleCommon.ctrlType;
          // tmp.value1 = eleCommon.value1 ? eleCommon.value1 : '';
          // tmp.value2 = eleCommon.value2 ? eleCommon.value2 : '';
          // tmp.autoFlt = eleAll.autoFlt;
          // tmp.enumString = eleAll.enumString;
          // tmp.compareLogic = eleAll.compareLogic;
          // tmp.bShowUpDown = false;
          Object.assign(tmp, eleAll, eleCommon);
          filterModel.push(tmp);
        }
      }, this);
    }, this);
    this.vm.fireEvent('initFilterViewModel', { filterModel: filterModel });
    this.setState({
      schemeData: args.schemeData,
      current: args.current,
      schemeName: args.schemeName,
      filterModel: filterModel.sort(function (a, b) { return a.orderId - b.orderId }),
    });
  }

  SearchEvent() {
    if (this.vm) {
      this.vm.fireEvent('searchEvent', { model: this.props.model, solutionid: this.state.current });
      this.vm.get('search').fireEvent('click', { model: this.props.model, solutionid: this.state.current });
    }
  }
  buttonClick(e, type) {
    if (type == 'search') {
      this.SearchEvent();
      const { searchClick } = this.props;
      if (searchClick)
        searchClick();
    } else if (type === 'reset') {
      this.vm.get('reset').execute('click');
    }
    else {//
      let showMore = false;
      if (type == 'more') showMore = true;
      this.setState({
        showMore: showMore
      });
    }
  }

  checkTagAndFilterInfo() {
    this.state.tag2FilterCount = 0;
    this.state.commonFilterCount = 0;
    this.state.filterModel.forEach(function (ele, index) {
      if (ele.isCommon == 1 || ele.isCommon == true) {
        if (ele.ctrlType.toLocaleLowerCase() == "tagbutton" && ele.autoFlt == true) {
          this.state.tag2FilterCount = this.state.tag2FilterCount + 1;
        }
        else {
          this.state.commonFilterCount = this.state.commonFilterCount + 1;
        }
      }
    }, this
    )
  }

  render() {
    this.checkTagAndFilterInfo();
    let control = this.getControls();
    let style = {};
    if (this.props.height) style.height = this.props.height;
    const extraProps = {};
    if (this.state.className)
      extraProps.className = this.state.className;
    return (
      <Row colCount={1} style={style} {...extraProps}>
        <Col style={this.props.title ? null : { display: 'none' }}>筛选</Col>
        <Col>{control}</Col>
        <Col>
          <Button className="up-search" onClick={(e) => this.buttonClick(e, 'reset')}>重置</Button>
          <Button delay className="up-search" onClick={(e) => this.buttonClick(e, 'search')}>查询</Button>
        </Col>
      </Row>
    );
  }
  getControls() {
    let controls = [];
    let control, filterVMField;
    let tmp_FilterAreaCount = 0
    let cur_FilterAreaCount = 0
    let cur_Tag2InFirstRow = false;
    let rowNum = this.props.cols ? this.props.cols : 3;
    this.state.filterModel.forEach(function (ele, index) {
      const ctrlType = ele.ctrlType.trim().toLocaleLowerCase();
      if (ele.isCommon == 1 || ele.isCommon == true) {
        if (ctrlType === 'tagbutton') {
          if (ele.autoFlt == true) {
            cur_FilterAreaCount = rowNum;
            tmp_FilterAreaCount = tmp_FilterAreaCount + cur_FilterAreaCount;
            if (tmp_FilterAreaCount <= rowNum) { cur_Tag2InFirstRow = true; }
            filterVMField = this.vm.get(ele.itemName);
            let fromModel = filterVMField.getFromModel();
            control = (
              <Row key={ele.itemName}  >
                <Col  >
                  <Tag2
                    TagTitle={ele.cShowCaption}
                    TagData={ele.enumString}
                    TagCanMultSel={ele.multSelect == 0 ? false : true}
                    TagClicked={this.Tag2Clicked}
                    model={fromModel}              >
                  </Tag2>
                </Col>
              </Row>
            );
          }
        } else if (ctrlType === 'predicatedatepicker') {
          cur_FilterAreaCount = rowNum;
          tmp_FilterAreaCount += cur_FilterAreaCount;
          const ComName = BasicComponentsMap[ctrlType];
          const model = this.vm.get(ele.itemName).getFromModel();
          control = (
            <Row key={ele.itemName}>
              <ComName model={model} cShowCaption={ele.cShowCaption} isInFilterJSX={true} />
            </Row>
          );
        }
        else {
          cur_FilterAreaCount = 1;
          tmp_FilterAreaCount = tmp_FilterAreaCount + cur_FilterAreaCount;
          filterVMField = this.vm.get(ele.itemName);
          control = this.getControl(ele, filterVMField);
        }
        // if (this.state.showMore) {
        controls.push(<Col key={ele.itemName} span={cur_FilterAreaCount}>{control}</Col>);
        // }
        // else {
        //   if (tmp_FilterAreaCount <= rowNum) {
        //     controls.push(<Col key={ele.itemName} span={cur_FilterAreaCount}>{control}</Col>);
        //   }
        // }
      }
    }, this);
    this.state.filterAreaCount = tmp_FilterAreaCount;
    this.state.tag2InFirstRow = cur_Tag2InFirstRow;
    return (<div ref={node => this.controlNode = node}><Row colCount={rowNum}>{controls}</Row></div>);
  }
  getComponent(ComName, model, config, ctrlType, cShowCaption) {
    return ComName ? <ComName model={model} title={cShowCaption} isInFilterJSX={true} {...config} /> : <h1>{ctrlType}</h1>;
  }
  getControl(ele, filterVMField) {
    let config = null;
    try {
      config = JSON.parse(ele.extendField);
    } catch (e) {
      config = {};
    }
    delete ele.extendField;
    let compareLogic = ele.compareLogic;
    let fromModel = filterVMField.getFromDisplayModel() || filterVMField.getFromModel();
    let toModel = filterVMField.getToModel();
    let ctrlType;
    if (ele.ctrlType)
      ctrlType = ele.ctrlType.trim().toLocaleLowerCase();
    else
      ctrlType = "input";
    const ComName = BasicComponentsMap[ctrlType];
    let control;
    if (compareLogic === 'between') {
      control = (
        <div className="Test-time-two">
          <Col span={11}>{this.getComponent(ComName, fromModel, config, ctrlType)}</Col>
          <Col span={2} className="sp-range-txt"><span>至</span></Col>
          <Col span={11}>{this.getComponent(ComName, toModel, config, ctrlType)}</Col>
        </div>
      );
    }
    else {
      control = this.getComponent(ComName, fromModel, config, ctrlType, ele.cShowCaption);
    }
    return (<div className='filter-hide' ><Label isInFilterJSX={true} control={control} title={ele.cShowCaption} /></div>);
  }
};

