import React, { Component } from 'react';
import { Popover, Input, Modal, Icon, Button, Checkbox, Radio, Transfer, Select } from 'antd';
import Row from '../basic/row';
import Col from '../basic/col';
import Input2 from '../basic/input';
import InputSearch from '../common/InputSearch';
import SvgIcon from 'SvgIcon';
import { proxy } from '../../helpers/util';

const RadioGroup = Radio.Group;

class DimensionSetting extends Component {
  constructor(props) {
    super(props);
    const { viewModel } = props;
    const { billNo } = viewModel.getParams();
    this.initDimensionListValue(billNo);
    this.state = {
      billnum: billNo,
      bShowCard: false,
      bShowList: false,
      textMouseEnterId: -1,
      currentName: '',
      currentId: '',
      dimensionList: [{ name: "方案001", id: 132, isDefault: true }, { name: "方案002", id: 323 }, { name: "方案003", id: 545 }, { name: "方案004", id: 676 }],
      editDimension: {
        bEdit: false,
        name: "",
        isDefault: false,
      }
    }
  }

  async initDimensionListValue(billNo) {
    const config = {
      url: 'report/getDimensions',
      method: 'GET',
      params: {
        billnum: billNo,
      }
    }
    const json = await proxy(config);
    if (json.code !== 200) {
      cb.utils.alert('获取维度列表失败！' + json.message, 'error');
      return;
    }
    // this.setState({dimensionList:json.data,})
  }

  ShowList = () => {
    this.setState({ bShowList: !this.state.bShowList })
  }

  handleCancel = (e) => {
    this.setState({ bShowCard: false })
  }

  getDimensionCardRender() {
    let editDimension = this.state.editDimension;
    let bEdit = editDimension.bEdit;
    let content;
    if (this.state.bShowCard == true) {
      let card;
      card = this.getInnerRender();
      content =
        <Modal className='crossGroupingModal'
          title={bEdit ? "编辑" : "新增维度导航方案"}
          onOk={(e) => this.handleOk(e)}
          onCancel={(e) => this.handleCancel(e)}
          visible={true}
        >
          {card}
        </Modal>;
    }
    return content;
  }

  onTextMouseEnter(bEnter, id) {

  }

  onMouseEnter(bEnter, e, id) {
    let dimensionList = this.state.dimensionList;
    if (dimensionList && dimensionList.length > 0) {
      dimensionList.forEach(function (ele, index) {
        if (ele.id == id)
          ele.isMouseEnter = bEnter;
      });
    }
    this.setState({ dimensionList: dimensionList })
  }

  editDimension_SetValue = (fieldName, fieldValue) => {
    const{editDimension}=this.state;
    editDimension[fieldName]=fieldValue;
    this.setState({editDimension:editDimension})
  }

  getInnerRender() {
    const { editDimension } = this.state;
    let leftContentCheckBoxs = [];
    leftContentCheckBoxs.push(
      <Row>
        <Checkbox
          // disabled={bDisabled}
          >
          test1
        </Checkbox>
      </Row> ,<Row>
        <Checkbox
          // disabled={bDisabled}
          >
          test2
        </Checkbox>
      </Row>);
    return <div>
      <br />
      <Row colCount={12} className="crosstype">
        <Col span={1} className="crosstypeName crosstypeline"><i className="anticon anticon-star nametitlemarginstar"></i>名称</Col>
        <Col span={1} />
        <Col span={4} className="crosstypeNameList crossinput"><Input defaultValue={editDimension.name} onChange={(e)=>this.editDimension_SetValue("name", e.target.value)}/> </Col>
        <Col span={1} />
        <Col span={5} className="crosscheckbox"><Checkbox checked={editDimension.isDefault} onChange={(e) => this.editDimension_SetValue("isDefault", e.target.checked)}>设为默认</Checkbox></Col>
      </Row>
      <br />
      <Row colCount={12}>
        <Col span={5} className="crossadddata">
          <div>
            <Row className="crossaddnamemargin">添加数据项</Row>
            <div className="crossselectborder">
              <InputSearch placeholder="请输入关键字"
              />
              <Row className="crossadddatalist">{leftContentCheckBoxs}</Row>
            </div>
          </div>
        </Col>
        <Col span={2} className="crossbtncount">
          <Button className={"icon-right-enabled"}></Button>
          <Button className={"icon-left-enabled"}></Button>
        </Col>
        <Col span={5} className="selecteddata">
          <div>
            <Row className="crossaddnamemargin">已选数据项</Row>
            <div className="groupCondition-SelectedItem">
              <div className="groupCondition-SelectedItem-Row2">
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  }

  setDefaultDimension(id) {
    let { dimensionList } = this.state;
    dimensionList.forEach(function (element, index) {

    })

  }

  getDimensionListRender() {
    let dimensionList = this.state.dimensionList;
    let currentId = this.state.currentId;
    let renderList = [];
    let bAuthAdd = this.state.bAuthAdd;
    let bAuthEdit = this.state.bAuthEdit;
    let bAuthDel = this.state.bAuthDel;
    if (this.state.bIgnoreAuth === true) {
      bAuthAdd = true;
      bAuthEdit = true;
      bAuthDel = true;
    }

    if (dimensionList && dimensionList.length > 0) {
      dimensionList.forEach(function (element, index) {
        let item;
        let isChecked = element.id == currentId ? true : false;
        let itemChecked = isChecked ? <span className="groupCondition-Checked"><i className="anticon icon-xuanzhong1" checked={isChecked}></i>  </span > : <span className="groupCondition-Checked">  </span >;
        let isDefault = element.isDefault ? element.isDefault : false;
        let itemDefault = isDefault ? <span className="groupCondition-Default"> <span className="crossdefault-btn">默认</span>  </span> : <span className="groupCondition-Default">  </span>;
        let isMouseEnter = element.isMouseEnter ? element.isMouseEnter : false;
        let itemEnter = isMouseEnter ?
          <span className="groupCondition-MouseEnter">
            {isDefault ? null : <span
              // onMouseEnter={() => this.onTextMouseEnter(true, 1)}
              // onMouseLeave={() => this.onTextMouseEnter(false, 1)}
              onClick={() => this.setDefaultDimension(element.id)}>设为默认</span>
            }
            <span
              onMouseEnter={() => this.onTextMouseEnter(true, 2)}
              onMouseLeave={() => this.onTextMouseEnter(false, 2)}
              onClick={() => this.editConditionInfo(element.id)}
            // style={{ display: bAuthEdit == true ? "" : 'none' }}
            >设置</span>
            <span
              onMouseEnter={() => this.onTextMouseEnter(true, 3)}
              onMouseLeave={() => this.onTextMouseEnter(false, 3)}
              onClick={() => this.deleteCondition(element.id)}
            // style={{ display: bAuthDel == true ? "" : 'none' }}
            >删除</span>

          </span> : <span className="groupCondition-MouseEnter"> </span  >;

        item = (
          <Row style={{ minHeight: "25px" }}
            onMouseEnter={(e) => this.onMouseEnter(true, e, element.id)}
            onMouseLeave={(e) => this.onMouseEnter(false, e, element.id)}
          >
            {itemChecked}
            <span style={{ cursor: "pointer" }} onClick={() => this.chooseDimension(element.id, element.name)}> {element.name}</span>
            {itemDefault}
            {itemEnter}
          </Row>
        )
        renderList.push(item);
      }, this);
    }
    if (renderList.length < 1 && bAuthAdd == false)
      this.noGroupAndAuth = true;
    else
      this.noGroupAndAuth = false;



    return (
      <div className={"group-add-grouping-count " + (bAuthAdd == false ? "group-add-grouping-count-noauth" : "")}>
        <div style={{ overflow: "auto", maxHeight: "258px", paddingBottom: "2px" }} >{renderList}</div>
        <div className="group-add-grouping">
          <div
            onClick={() => this.addDimensionInfo()}
          ><SvgIcon type="plus" />新增维度导航方案</div>
        </div>
      </div>
    );
  }

  addDimensionInfo() {
    this.setState({ bShowCard: true, bShowList: false })
  }

  chooseDimension(id, name) {
    this.setState({ currentName: name, currentId: id })
  }

  render() {
    let bNeedClose = this.state.textMouseEnterId == 4 && this.state.currentName != "" ? true : false;
    let type = this.state.bShowList ? "up" : "down";
    let button = <div>
      {bNeedClose ? <Icon
        // onClick={() => this.chooseCondition()}
        type={"close-circle"}
      // onMouseEnter={() => this.onTextMouseEnter(true, 4)}
      // onMouseLeave={() => this.onTextMouseEnter(false, 4)}
      /> : null}
      <Icon
        // onClick={() => this.ShowList()}
        type={type}
      // onMouseEnter={() => this.onTextMouseEnter(true, 4)}
      // onMouseLeave={() => this.onTextMouseEnter(false, 4)}
      />
    </div>;
    let dimensionList = null;
    dimensionList = this.getDimensionListRender();
    let dimensionPop = (
      <div>
        <div className="Grouping-condition-left">维度导航方案</div>
        <Popover
          overlayStyle={{ width: "236px" }}
          content={dimensionList}
          trigger={"click"}
          visible={this.state.bShowList}>
          <div className="Grouping-condition">
            <div className="Grouping-condition-input">
              <span className="Grouping-condition-span"
                // onMouseEnter={() => this.onTextMouseEnter(true, 4)}
                // onMouseLeave={() => this.onTextMouseEnter(false, 4)}
                style={{ cursor: "pointer" }}
                onClick={() => this.ShowList()}
                overlayStyle={{ width: "100px" }}>
                {this.state.currentName}
              </span>
              {button}
            </div>
          </div>
        </Popover>
      </div>
    );
    let dimensionCard = this.getDimensionCardRender();

    return <div className="groupCondition">
      {dimensionPop}
      {dimensionCard}
    </div>;

  }

}

export default DimensionSetting;
