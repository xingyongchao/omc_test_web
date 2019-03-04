import React from 'react';
import { Popover, Icon, message, Menu, Popconfirm } from 'antd';
import { Row, Col, CheckBox, Button, Input } from '../basic';
import Filter from './filter';
import addEventListener from 'rc-util/lib/Dom/addEventListener';

export default class ConvenientQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData: [],
      filterDetail: [],
      schemeData: [],
      isShowList: false,
      current: '',
      isVisible: false,
      schemeName: '',
      showFields: new Array(),
      showFieldsValue: {}
    };

    this.showFields = new Array();
    this.vm = cb.loader.initMetaCommonViewModel(
      'FilterViewModel',
      'filterViewModel',
      { filterId: this.props.model.getParams().filterId },
      this.props.model,
      ['filterClick']
    );
    this._isVisible = false;
    this.onDocumentClick = this.onDocumentClick.bind(this);
  }

  componentDidMount() {
    if (this.vm)
      this.vm.addListener(this);
  }

  onDocumentClick(event) {
    if (this._isVisible !== false) return;
    var parent = cb.dom(event.target).parents('div[data-reactroot]');
    if (parent.hasClass('ant-row') || parent.children('.bill-maker-modal').length)
      this.setState({ isVisible: this._isVisible });
  }

  hide() {
    if (!this.state.isVisible) return;
    this.setState({ isVisible: false });
  }

  removeEventListener() {
    if (this.clickOutsideHandler) {
      this.clickOutsideHandler.remove();
      this.clickOutsideHandler = null;
    }
  }

  componentDidUpdate() {
    if (this.vm)
      this.vm.fireEvent('itemChange', { solutionid: this.state.current });
    if (this.state.isVisible) {
      if (!this.clickOutsideHandler)
        this.clickOutsideHandler = addEventListener(document, 'mousedown', this.onDocumentClick);
      return;
    }
    this.removeEventListener();
  }

  componentWillUnmount() {
    this.removeEventListener();
  }

  initFilterFields(args) {
    let self = this;
    this.showFields = new Array();

    if (args.filterDetail.CommonModel.length) {
      args.filterDetail.CommonModel.forEach(function (item) {
        if (self.showFields.indexOf(item.itemName) < 0)
          self.showFields.push(item.itemName);
        self.state.showFieldsValue[item.itemName] = {
          value1: item.value1 ? item.value1 : '',
          value2: item.value2 ? item.value2 : ''
        };
      });
    }

    this.setState({
      schemeData: args.schemeData,
      current: args.current,
      schemeName: args.schemeName,
      filterDetail: args.filterDetail,
      showFieldsValue: self.state.showFieldsValue
    });
  }

  onSchemeListClick() {
    this.setState({ isShowList: !this.state.isShowList });
  }

  handleMenuClick(e) {
    if (e.domEvent.target.tagName == 'I') return false;
    let schemeItem = this.state.schemeData.filter(function (item) {
      return item.id == e.key;
    })[0];
    for (let i = 0; i < this.showFields.length; i++) {
      this.vm && this.vm.removeProperty(this.showFields[i]);
    }

    if (this.vm)
      this.vm.execute('loadScheme', e.key);
  }

  handleVisibleChange(val) {
    // this.setState({ isVisible: val });
    this._isVisible = val;
  }

  SaveSchemeEvent(e) {
    this.setState({ isVisible: false });
    if (this.vm)
      this.vm.get('save').fireEvent('click', { schemeId: this.state.current });
  }

  SearchEvent(e) {
    this.setState({ isVisible: false });
    if (this.vm) {
      this.vm.fireEvent('searchEvent', { model: this.props.model, solutionid: this.state.current });
      this.vm.get('search').fireEvent('click', { model: this.props.model, solutionid: this.state.current });
    }
  }

  deleteFields(field) {
    let index = this.showFields.indexOf(field);
    if (index >= 0) {
      this.showFields.splice(index, 1);
      this.vm && this.vm.removeProperty(field);
    }
    this.setState({ showFields: this.showFields });
  }

  addMoreFields() {
    let self = this;
    let addFields = this.state.filterDetail.AllFilterModel && this.state.filterDetail.AllFilterModel.filter(function (item) {
      return (self.showFields.indexOf(item.itemName) < 0);
    });

    if (addFields.length && this.showFields.indexOf(addFields[0].itemName) < 0) {
      this.showFields.push(addFields[0].itemName);
      this.setState({ showFields: this.showFields });
    }
    else
      message.info('没有更多的可用的查询条件了...');
  }

  onFilterChange(oldVal, newField) {
    if (this.showFields.indexOf(oldVal) >= 0) {
      this.showFields.splice(this.showFields.indexOf(oldVal), 1, newField.itemName);
      this.vm && this.vm.removeProperty(oldVal);

      let filterVMField = new cb.models.FilterModel(newField);
      this.vm && this.vm.addProperty(newField.itemName, filterVMField);

      this.setState({ showFields: this.showFields });
    }
  }

  addNewScheme() {
    let newField = this.state.filterDetail.AllFilterModel && this.state.filterDetail.AllFilterModel[0];
    if (!newField) return;

    for (let i = this.showFields.length - 1; i >= 0; i--) {
      this.vm && this.vm.removeProperty(this.showFields[i]);
      this.showFields.splice(i, 1);
    }
    if (this.vm) {
      this.vm.addProperty(newField.itemName, new cb.models.FilterModel(newField));
      this.vm.get('schemeName').setValue('');
    }
    if (this.showFields.indexOf(newField.itemName) < 0)
      this.showFields.push(newField.itemName);

    this.setState({ showFields: this.showFields, current: -1 });
  }

  showPopOver() {
    this.setState({ isVisible: !this.state.isVisible });
  }

  filterCommonModelFields(target) {
    let arr = this.state.filterDetail.AllFilterModel;
    let newArr = new Array();
    for (let i = 0; i < arr.length; i++) {
      if (this.showFields.indexOf(arr[i].itemName) >= 0 && arr[i].itemName != target)
        continue;
      newArr.push(arr[i]);
    }
    return newArr;
  }

  handleDeleteQueryScheme(schemeId) {
    if (this.vm && schemeId)
      this.vm.get('schemeMenu').execute('deleteScheme', schemeId);
  }

  getfilterDetail() {
    let self = this;
    let schemeDetail = new Array();

    let schemeNameControl = this.state.isShowList ? (<Row><Col span={20} offset={1}><Input defaultValue={this.state.schemeName} placeholder="请输入方案名称" model={self.vm.get('schemeName')} /></Col></Row>) :
      (<Row>
        <Col span={20} offset={1}><Input placeholder="请输入方案名称" defaultValue={this.state.schemeName} model={self.vm.get('schemeName')} /></Col>
        <Col span={2} offset={1}><Button type="primary" icon="right" onClick={e => this.onSchemeListClick(e)} className="btn-onoff btn-left" /></Col>
      </Row>);
    schemeDetail.push(schemeNameControl);

    for (let i = 0; i < self.showFields.length; i++) {
      let modelField = this.state.filterDetail.AllFilterModel && this.state.filterDetail.AllFilterModel.filter(function (item) {
        return item.itemName == self.showFields[i];
      });

      if (modelField && modelField.length) {
        if (!self.vm.get(modelField[0].itemName)) {
          let initData = cb.utils.extend(true, {}, modelField[0]);
          if (self.state.showFieldsValue[initData.itemName]) {
            initData.value1 = self.state.showFieldsValue[initData.itemName].value1;
            initData.value2 = self.state.showFieldsValue[initData.itemName].value2;
          }

          let filterVMField = new cb.models.FilterModel(initData);
          self.vm.addProperty(initData.itemName, filterVMField);
        }

        let rowItem = (<Row>
          <Col span={20} offset={1}>
            <Filter onChange={(a, b) => self.onFilterChange(a, b)} dataSource={this.filterCommonModelFields(modelField[0].itemName)} selectedValue={modelField[0].itemName} compareLogic={modelField[0].compareLogic} model={self.vm.get(modelField[0].itemName)} />
          </Col>
          <Col span={2}>
            <Button type="ghost" shape="circle-outline" icon="minus-circle" className="no-border" onClick={e => self.deleteFields(modelField[0].itemName)} />
          </Col>
        </Row>);

        schemeDetail.push(rowItem);
      }
    }

    schemeDetail.push(<Row>
      <Col span={20} offset={1}>
        <Button type="ghost" icon="plus" className="no-border" onClick={e => this.addMoreFields()}>添加更多查询条件</Button>
      </Col>
    </Row>);

    return schemeDetail;
  }

  getSchemeList() {
    let self = this;
    let schemeList = new Array();
    schemeList.push(
      <Row>
        <Col span={2}><Button type="default" icon="left" onClick={e => this.onSchemeListClick(e)} className="btn-onoff btn-right" /></Col>
        <Col span={20} offset={2}><Button type="ghost" icon="plus" className="no-border" onClick={e => this.addNewScheme(e)}>新增查询方案</Button></Col>
      </Row>
    );

    let menuItemArray = new Array();
    this.state.schemeData.length && this.state.schemeData.forEach(function (item) {
      let menuItem;
      if (self.state.current && self.state.current == item.id) {
        menuItem = (
          <Menu.Item key={item.id}>
            <Icon type="check" />{item.solutionName}
            <Popconfirm title="是否确定要删除？" onConfirm={e => self.handleDeleteQueryScheme(item.id)} okText="是" cancelText="否" placement='right'>
              <Button type="ghost" shape="circle" icon="delete" className="no-border" />
            </Popconfirm>
          </Menu.Item>
        );
      }
      else {
        menuItem = (
          <Menu.Item key={item.id}>
            <Icon />{item.solutionName}
            <Popconfirm title="是否确定要删除？" onConfirm={e => self.handleDeleteQueryScheme(item.id)} okText="是" cancelText="否" placement='right'>
              <Button type="ghost" shape="circle" icon="delete" className="no-border" />
            </Popconfirm>
          </Menu.Item>
        );
      }
      menuItemArray.push(menuItem);
    });
    let menuControl = (<Menu onClick={e => this.handleMenuClick(e)} selectedKeys={[this.state.current]} mode="vertical" model={self.vm.get('schemeMenu')}>{menuItemArray}</Menu>);
    schemeList.push(
      <Row>
        <Col style={{ overflow: 'hidden' }}>{menuControl}</Col>
      </Row>
    );
    return schemeList;
  }

  getControl() {
    let schemeDetail = this.getfilterDetail();
    let schemeList = this.getSchemeList();
    let schemeTitle = schemeDetail.splice(0, 1);

    let content = this.state.isShowList ? (
      <div style={{ width: 670 }} className="common-query-popover">
        <Row>
          <Col span={18}>
            {schemeTitle}
            <Row>
              <Col span={'all'} className="schemeContent">{schemeDetail}</Col>
            </Row>
          </Col>
          <Col span={6}>{schemeList}</Col>
        </Row>
        <Row>
          <Col span={8} offset={1} className="checkbox">
            <CheckBox dataSource={{ text: '设置为默认查询方案' }} model={this.vm.get('isDefault')} />
          </Col>
          <Col span={10} offset={2}>
            <Button type="ghost" onClick={e => this.SaveSchemeEvent(e)} value="保存为常用方案" >保存为常用方案</Button>
            <Button type="primary" onClick={e => this.SearchEvent(e)} value="查询">查询</Button>
          </Col>
        </Row>
      </div>
    ) : (
        <div style={{ width: 480 }} className="common-query-popover">
          <Row>
            <Col span={'all'}>
              {schemeTitle}
              <Row>
                <Col className="schemeContent">{schemeDetail}</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={8} offset={1} className="checkbox">
              <CheckBox dataSource={{ text: '设置为默认查询方案' }} model={this.vm.get('isDefault')} />
            </Col>
            <Col span={10} offset={2}>
              <Button type="ghost" onClick={e => this.SaveSchemeEvent(e)} value="保存为常用方案" >保存为常用方案</Button>
              <Button type="primary" onClick={e => this.SearchEvent(e)} value="查询" >查询</Button>
            </Col>
          </Row>
        </div>
      );

    let control = (
      <Popover onVisibleChange={e => this.handleVisibleChange(e)} placement="bottomLeft" content={content} trigger="click" className="common-query-popover" visible={this.state.isVisible}>
        <Button type="ghost" className="no-border schemeTitle" onClick={e => this.showPopOver()}>{this.state.schemeName}<Icon type='down' /></Button>
      </Popover>
    );
    return control;
  }

  render() {
    let control = this.getControl();
    return (
      <div>
        {control}
      </div>
    );
  }
};
