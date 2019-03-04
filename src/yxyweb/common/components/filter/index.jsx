
import React from 'react';
import { Popover, Icon, message, Menu, Checkbox } from 'antd';
// import { Row, Col, Button, Input, Label, DatePicker, Refer, TreeRefer, Tag2 } from '../basic';
import * as BasicComponents from '../basic';
import FilterScheme from './FilterScheme';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import _ from 'lodash'
// 过滤控件
const Row = BasicComponents.Row,
  Col = BasicComponents.Col,
  Button = BasicComponents.Button,
  Label = BasicComponents.Label,
  Tag2 = BasicComponents.Tag2;

const BasicComponentsMap = {};
for (var attr in BasicComponents)
  BasicComponentsMap[attr.toLocaleLowerCase()] = BasicComponents[attr];

export default class ConvenientQuery extends React.Component {
  constructor(props) {
    super(props);
    var params = props.model.getParams();
    const filterId = props.config && props.config.filterid || params.filterId;
    const cardKey = params.cardKey;
    const Id = props.model.id
    console.log(filterId)
    this.state = {
      filterId: filterId,
      cardKey: cardKey,
      modelId: Id,
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

    this.state.isInPanel = params.isInPanel ? params.isInPanel : false;
    this.state.isInDesign = params.isInDesign ? params.isInDesign : false;
    this.state.panelType = params.panelType || 0;
    // debugger;
    this.vm = cb.loader.initMetaCommonViewModel(
      'FilterViewModel',
      'filterViewModel',
      {
        filterId: filterId,
        condition: params.condition,
        cardKey: cardKey,
        isInPanel: this.state.isInPanel,
        isInDesign: this.state.isInDesign,
        solutionId: params.solutionId,
        viewid: _.get(props.model.getParams(), 'query.viewid'),
        bHasNullDate: props.model.getParams().bHasNullDate || false
      },
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


    this.props.model.on('eChartPanel_GetCondition', () => {
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

  SaveSchemeEvent(e) {
    this.state.popFlag = false;
    // this.state.filterModel = this.filterModel_Tmp;
    if (this.vm) {
      let args = {};
      args.schemeId = this.state.current;
      args.filterModel = this.filterModel_Tmp;
      args.filterId = this.vm.getParams().filterId;
      args.isDefault = 0;
      args.isPublic = 0;
      args.solutionName = this.state.schemeName;
      this.vm.get('save').fireEvent('click', args);
    }
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
    }
    else {//
      let showMore = false;
      if (type == 'more') showMore = true;
      this.setState({
        showMore: showMore
      });
    }
  }
  showPopClick() {

    this.filterModel_Tmp = _.cloneDeep(this.state.filterModel);
    this.setState({
      popFlag: !this.state.popFlag
    });
  }
  onMouseEnter(e, index) {

    this.filterModel_Tmp[index].bShowUpDown = true;
    this.setState({
      popFlag: this.state.popFlag
    });
  }
  onMouseLeave(e, index) {
    this.filterModel_Tmp.forEach(function (ele) {
      ele.bShowUpDown = false;
    });
    this.setState({
      popFlag: this.state.popFlag
    });
  }


  onChecked(e, element, index) {
    let checked = e.target.checked;
    let num = 0;
    if (checked == false) {
      this.filterModel_Tmp.forEach(function (element, index) {
        if (element.isCommon == true) {
          num = num + 1;
        }
      });
      if (num > 1)
        this.filterModel_Tmp[index].isCommon = checked;
    }
    else {
      this.filterModel_Tmp[index].isCommon = checked;
    }
  }

  sortClick(type, index) {
    let maxLen = this.filterModel_Tmp.length - 1;
    let pre = cb.utils.extend(true, {}, this.filterModel_Tmp[index - 1]);
    let next = cb.utils.extend(true, {}, this.filterModel_Tmp[index + 1]);
    let now = cb.utils.extend(true, {}, this.filterModel_Tmp[index]);
    if (type == 'up') {
      if (index != 0) {
        let orderId = pre.orderId;
        pre.orderId = now.orderId;
        now.orderId = orderId;
        this.filterModel_Tmp[index] = pre;
        this.filterModel_Tmp[index - 1] = now;
      }
    } else {
      if (index < maxLen) {
        let orderId = next.orderId;
        next.orderId = now.orderId;
        now.orderId = orderId;
        this.filterModel_Tmp[index] = next;
        this.filterModel_Tmp[index + 1] = now;
      }
    }
    this.setState();
  }
  cancelClick(type) {
    this.setState({
      popFlag: false
    })
  }

  getFilterContent() {
    let filterContent = [];
    this.filterModel_Tmp.forEach(function (element, index) {
      let item;
      let bShowUpDown = element.bShowUpDown ? element.bShowUpDown : false;
      let isCommon = element.isCommon;
      item = (
        bShowUpDown ?
          <Row style={{ minHeight: "25px" }} onMouseEnter={(e) => this.onMouseEnter(e, index)} onMouseLeave={(e) => this.onMouseLeave(e, index)}>
            <div className='pull-left' title={element.cShowCaption}>
              <Checkbox checked={isCommon} onChange={(e) => this.onChecked(e, element, index)}>{element.cShowCaption}</Checkbox>
            </div>
            <div className='pull-right'>
              <Button style={{ borderWidth: 0 }} icon="arrow-up" onClick={() => this.sortClick('up', index)}></Button>
              <Button style={{ borderWidth: 0 }} icon="arrow-down" onClick={() => this.sortClick('down', index)}></Button>
            </div>
          </Row>
          :
          <Row style={{ minHeight: "25px" }} onMouseEnter={(e) => this.onMouseEnter(e, index)} onMouseLeave={(e) => this.onMouseLeave(e, index)}>
            <div className='pull-left' title={element.cShowCaption}>
              <Checkbox checked={isCommon} onChange={(e) => this.onChecked(e, element, index)}>{element.cShowCaption}</Checkbox>
            </div>
            <div className='pull-right'></div>
          </Row>
      )
      filterContent.push(item);
    }, this);
    let buttonClass = 'filter-btn-fixed';
    return (
      <div className={buttonClass} style={{ overflow: "auto", height: "250px" }}>
        <div className='filter-txt'>{filterContent}</div>
        <div className='filter-btn-1'>
          <Button type={"primary"} onClick={() => this.SaveSchemeEvent('save')}>保存</Button>
          <Button type={"default"} onClick={() => this.cancelClick('cancel')}>取消</Button>
        </div>
      </div>
    );
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

  handleSchemeChange = (solutionId) => {
    this.vm.fireEvent('loadScheme', solutionId);
  }
  handleSchemeListChange = (solutionList) => {
    this.vm.setCache('schemeList', solutionList);
  }

  render() {
    this.checkTagAndFilterInfo();
    let tag2FilterCount = this.state.tag2FilterCount;
    let commonFilterCount = this.state.commonFilterCount;
    let tags;
    let controls = [];
    let content = null;
    let showMore = this.state.showMore;

    if (commonFilterCount > 0 || tag2FilterCount > 0) {
      let tmpShowMoreStr = (showMore ?
        (<Button style={{ borderWidth: 0 }} className="showMore" type="ghost" size="small" onClick={(e) => this.buttonClick(e, '')}><Icon type="up-circle" /></Button>)
        :
        (<Button style={{ borderWidth: 0 }} className="showMore" type="ghost" size="small" onClick={(e) => this.buttonClick(e, 'more')}><Icon type="down-circle" /></Button>)
      );
      controls = this.getControls(tmpShowMoreStr);
    }
    if (this.filterModel_Tmp && this.filterModel_Tmp.length > 0) {
      content = this.getFilterContent();
    }
    let filterAreaCount = this.state.filterAreaCount;
    let showMoreStr;
    let rowNum = this.props.cols ? this.props.cols : 3;

    if (filterAreaCount > rowNum && !this.props.autoExpand) {//&& this.state.isInPanel == false
      showMoreStr = (showMore ?
        (<Button style={{ borderWidth: 0 }} className="showMore" type="ghost" size="small" onClick={(e) => this.buttonClick(e, '')}><Icon type="up-circle" /></Button>)
        :
        (<Button style={{ borderWidth: 0 }} className="showMore" type="ghost" size="small" onClick={(e) => this.buttonClick(e, 'more')}><Icon type="down-circle" /></Button>)
      );
    }
    else {
      showMoreStr = (<span style={{ paddingLeft: 5 }}></span>);
    }
    // if (this.state.panelType == 3) {
    //   controls.push(showMoreStr);
    // }
    let showSearchStr;
    if (this.state.tag2InFirstRow == false || (commonFilterCount > 0 && showMore) || this.props.autoExpand) {
      if (this.state.isInDesign == false) {
        showSearchStr = (<Button delay type="ghost" style={{ float: "right" }} className="up-search" onClick={(e) => this.buttonClick(e, 'search')}>搜索</Button>);
      }
    }
    else {
      showSearchStr = (<span style={{ paddingLeft: 5 }}></span>);
    }
    let showFilterSetting;

    if (this.state.filterModel.length > rowNum && !this.props.autoExpand && this.state.isInPanel == false && this.state.isInDesign == false) {

      showFilterSetting = (
        <Popover overlayStyle={{ width: "200px" }} placement={"bottomRight"} content={content} trigger={"click"} visible={this.state.popFlag}>
          <div className="ant-popover-open-count">
            <Button className="filterSetting" style={{ borderWidth: 1 }} onClick={() => this.showPopClick()} type={"ghost"} size="small" >设置</Button>

          </div>
        </Popover>);

    }
    else {
      showFilterSetting = (<span style={{ paddingLeft: 5 }}></span>);
    }
    return (
      <Row className={`${this.props.config && this.props.config.classname} ${this.props.autoExpand === false && 'voucher-filter'}`}>
        <FilterScheme filterId={this.state.filterId} Id={this.state.modelId} cardKey={this.state.cardKey} schemeChange={this.handleSchemeChange} schemeListChange={this.handleSchemeListChange} model={this.props.model}/>
        <Col className='filter-controls'>
          <div>
            <Row colCount={rowNum}>
              {controls}
            </Row>
          </div>
        </Col>
        <Col className="up-show" >
          {this.state.panelType == 3 ? "" : showMoreStr}
          {showFilterSetting}
          {showSearchStr}
        </Col>
      </Row >
    );
  }
  // handleSolutionChange=(solutionId)=>{
  //   this.vm.fireEvent();
  // solutionChange={this.handleSolutionChange}
  // }
  getControls(tmpShowMoreStr) {
    let controls = [];
    let control, filterVMField;
    let tmp_FilterAreaCount = 0
    let cur_FilterAreaCount = 0
    let cur_Tag2InFirstRow = false;
    let rowNum = this.props.cols ? this.props.cols : 3;
    this.state.filterModel.forEach(function (ele, index) {
      const ctrlType = ele.ctrlType.trim().toLocaleLowerCase();
      if (ele.isCommon == 1 || ele.isCommon == true) {
        control = undefined;
        let config = null;
        try {
          config = JSON.parse(ele.extendField);
        } catch (e) {
          config = {};
        }
        // delete ele.extendField;
        if (ctrlType === 'tagbutton') {
          if (ele.autoFlt == true) {
            cur_FilterAreaCount = config.cols || rowNum;
            tmp_FilterAreaCount = tmp_FilterAreaCount + cur_FilterAreaCount;
            if (tmp_FilterAreaCount === rowNum) { cur_Tag2InFirstRow = true; }
            // let filterVMField;
            // if (!this.vm.get(ele.itemName)) {
            //   let initData = cb.utils.extend(true, {}, ele);
            //   initData.value1 = ele.value1;
            //   filterVMField = new cb.models.FilterModel(initData);
            //   this.vm.addProperty(initData.itemName, filterVMField);
            // }
            // else {
            filterVMField = this.vm.get(ele.itemName);
            // }
            let fromModel = filterVMField.getFromModel();
            control = (
              <Row key={ele.itemName}>
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
        }
        else if (ctrlType === 'predicatedatepicker') {
          cur_FilterAreaCount = rowNum;
          tmp_FilterAreaCount += cur_FilterAreaCount;
          const ComName = BasicComponentsMap[ctrlType];
          const model = this.vm.get(ele.itemName).getFromModel();
          control = (
            <Row key={ele.itemName} >
              <ComName
                model={model}
                isInPanel={this.state.isInPanel}
                panelType={this.state.panelType}
                cShowCaption={ele.cShowCaption}
                isInFilterJSX={true}
              />
            </Row>
          );
        }
        else {
          cur_FilterAreaCount = 1;
          tmp_FilterAreaCount = tmp_FilterAreaCount + cur_FilterAreaCount;
          // if (!this.vm.get(ele.itemName)) {
          //   let initData = cb.utils.extend(true, {}, ele);
          //   initData.value1 = ele.value1;
          //   initData.value2 = ele.value2;
          //   filterVMField = new cb.models.FilterModel(initData);
          //   this.vm.addProperty(initData.itemName, filterVMField);
          // }
          // else {
          filterVMField = this.vm.get(ele.itemName);
          // }
          if (!!filterVMField)
            control = this.getControl(ele, filterVMField, config);


        }
        if (control) {

          let tmpClassName = "";
          let tmp;
          if (this.state.panelType == 3 && controls.length == 0) {
            tmpClassName = "UpDown_Location";
            tmp = tmpShowMoreStr;
          }

          if (this.state.showMore || this.props.autoExpand) {
            controls.push(<Col key={ele.itemName} span={cur_FilterAreaCount} className={tmpClassName} >{control}{tmp}</Col>);
          }
          else {
            if (tmp_FilterAreaCount <= rowNum) {
              controls.push(<Col key={ele.itemName} span={cur_FilterAreaCount} className={tmpClassName}  >{control}{tmp}</Col>);
            }
          }
        }
      }
    }, this);
    this.state.filterAreaCount = tmp_FilterAreaCount;
    this.state.tag2InFirstRow = cur_Tag2InFirstRow;
    return controls;
    // return (<div  ><Row colCount={rowNum}>{controls}</Row></div>);
    // return (<div  ><Row colCount={tmp_FilterAreaCount < 3 ? 3 : 3}>{controls}</Row></div>);
    // return (<div  ><Row colCount={tmp_FilterAreaCount < 3 ? tmp_FilterAreaCount : 3}>{controls}</Row></div>);
  }
  getComponent(ComName, model, config, ctrlType, cShowCaption) {
    return ComName ? <ComName model={model} title={cShowCaption} isInFilterJSX={true} {...config} /> : <h1>{ctrlType}</h1>;
  }
  getControl(ele, filterVMField, config) {
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
    return (<div className='filter-hide'><Label isInFilterJSX={true} control={control} title={ele.cShowCaption} /></div>);
  }
};

