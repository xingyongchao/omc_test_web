import React from 'react';
import { Select, Checkbox, Input, Icon, Radio } from 'antd';
import { proxy } from '../../helpers/util';
import Row from '../basic/row';
import Col from '../basic/col';
import Button from '../basic/button'
const RadioGroup = Radio.Group;

if (process.env.__CLIENT__ === true) {
  require('./sens.less')
}
export default class SensDataRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensData: [],
    };
    this.getSensData();
  }
  async getSensData() {
    const config = {
      url: 'sensdata/list',
      method: 'GET',
    };
    const json = await proxy(config);
    if (json.code !== 200) {
      cb.utils.alert('获取敏感数据列表失败！' + json.message, 'error');
      return;
    }
    let sensData = json.data || [];
    this.setState({ sensData, 'cacheData': cb.utils.extend(true, [], sensData) })
  }
  onRadioChange = (e, item) => {
    let sensData = this.state.sensData;
    let code = item.code;
    sensData.forEach(data => {
      let children = data.children;
      if (children) {
        children.forEach(data1 => {
          let children1 = data1.children;
          if (children1) {
            children1.forEach(data2 => {
              if (data2.code == code) {
                if (cb.utils.isEmpty(data2.oldAuth)) data2.oldAuth = data2.hasAuth;
                data2.hasAuth = e.target.value;
                if (data2.hasAuth != data2.oldAuth) {
                  data2._status = "Update";
                  if (data1.hasAuth != data1.oldAuth)
                    data1._status = 'Update';
                  if (data.hasAuth != data.oldAuth)
                    data._status = 'Update';
                } else
                  data2._status = "UnChange";
              }
              return
            });
          }
        });
      }
    });
    this.setState({ sensData });
  }
  onChecked(e, code, level) {
    let { sensData } = this.state;
    let isEnable = e.target.checked;
    sensData && sensData.forEach(ele => {
      if (ele.level == level) {
        if (ele.code == code) {
          if (cb.utils.isEmpty(ele.oldAuth)) ele.oldAuth = ele.isEnable;
          ele.isEnable = isEnable;
          if (ele.oldAuth != ele.isEnable)
            ele._status = 'Update';
          else
            ele._status = 'UnChange'
          if (ele.children) this.loopSetEnable(ele.children, isEnable);
          return
        }
      } else {
        let second = ele.children;
        second && second.forEach(ele1 => {
          if (ele1.level == level) {
            if (ele1.code == code) {
              if (cb.utils.isEmpty(ele1.oldAuth)) ele1.oldAuth = ele1.isEnable;
              ele1.isEnable = isEnable;
              if (ele1.oldAuth != ele1.isEnable)
                ele1._status = 'Update';
              else
                ele1._status = 'UnChange'
              if (ele1.children) this.loopSetEnable(ele1.children, isEnable);
              return;
            }
          } else {
            let third = ele1.children;
            third && third.forEach(ele2 => {
              if (ele2.code == code) {
                if (cb.utils.isEmpty(ele2.oldAuth)) ele2.oldAuth = ele2.isEnable;
                ele2.isEnable = isEnable;
                if (ele2.oldAuth != ele2.isEnable)
                  ele2._status = 'Update';
                else
                  ele2._status = 'UnChange'
                return;
              }
            });
          }
        })
      }
    });
    sensData = this.setIndeterminate(sensData);
    this.setState({ sensData });
  }
  loopSetEnable = (data, isEnable) => {
    data.map(item => {
      item.isEnable = isEnable;
      if (item.children) this.loopSetEnable(item.children, isEnable);
    })
  }
  setIndeterminate = (authList) => {
    authList.forEach(ele => {
      let second = ele.children;
      if (second) {
        let secondLen = second.length, checkedLen1 = 0, indet1 = 0;
        second.forEach(ele1 => {
          let last = ele1.children;
          if (last) {
            let lastLen = last.length, checkedLen2 = 0;
            last.forEach(ele2 => {
              if (ele2.isEnable) checkedLen2 += 1;
            });
            if (lastLen > checkedLen2 && checkedLen2 != 0) {
              ele1.indeterminate = true;
              ele1.isEnable = false;
            } else {
              if (lastLen == checkedLen2 && lastLen != 0) ele1.isEnable = true;
              if(checkedLen2 == 0) ele1.isEnable = false;
              ele1.indeterminate = false;
            }
          }
          if (ele1.isEnable) checkedLen1 += 1;
          if (ele1.indeterminate) indet1 += 1;
        });
        if (secondLen > checkedLen1 && (checkedLen1 != 0 || indet1 != 0)) {
          ele.indeterminate = true;
          ele.isEnable = false;
        } else {
          if (secondLen == checkedLen1) ele.isEnable = true;
          ele.indeterminate = false;
        }
      }
    })
    return authList;
  }
  getAuthControl() {
    let { sensData } = this.state;
    let authControl = [];
    sensData.forEach(function (ele) {
      let options = [];
      let second = ele.children ? ele.children : [];
      let secondLen = second.length;
      second.forEach(function (item, index) {
        let third = item.children ? item.children : [];
        let thirdAuth = [], thirdLen = third.length;
        third.forEach(function (item1, index1) {
          let thirdClass = 'third-row';
          if (thirdLen == (index1 + 1)) thirdClass += '  third-row-end'
          thirdAuth.push(
            <Row colCount={12} className={thirdClass}>
              <Col span={3} >
                <Checkbox checked={item1.isEnable} onChange={(e) => this.onChecked(e, item1.code, 3)}>
                  {item1.name}
                </Checkbox>
              </Col>
              <Col span={9} className='last-auth'>
                <RadioGroup onChange={e => this.onRadioChange(e, item1)} value={item1.hasAuth}>
                  <Radio disabled={!item1.isEnable} value={false}>无权</Radio>
                  <Radio disabled={!item1.isEnable} value={true}>有权</Radio>
                </RadioGroup>
              </Col>
            </Row>
          );
        }, this);
        let secondClass = 'second-row';
        if (secondLen == (index + 1)) secondClass += '  second-row-end'
        options.push(
          <Row colCount={12} className={secondClass}>
            <Col span={2} >
              <Checkbox checked={item.isEnable} indeterminate={item.indeterminate} onChange={(e) => this.onChecked(e, item.code, 2)}>
                {item.name}
              </Checkbox>
            </Col>
            <Col span={10}>{thirdAuth}</Col>
          </Row>
        );
      }, this);
      authControl.push(
        <Row colCount={12} className='roleRow-2 sensRole'>
          <Col span={2}>
            <Checkbox className="firstRole" checked={ele.isEnable} indeterminate={ele.indeterminate} onChange={(e) => this.onChecked(e, ele.code, 1)}>
              {ele.name}
            </Checkbox>
          </Col>
          <Col span={10}>{options}</Col>
        </Row>
      );
    }, this);
    return authControl;
  }
  loopTree = (tree, data) => {
    tree.map(item => {
      if (item.children) {
        if (item._status == 'Update') data.push(item);
        this.loopTree(item.children, data);
      } else
        if (item._status == 'Update') data.push(item);
    });
  }
  buttonClick = (e, type) => {
    if (type == 'cancel') {
      this.setState({ sensData: cb.utils.extend(true, [], this.state.cacheData) });
      return;
    }
    let { sensData } = this.state;
    let data = [];
    this.loopTree(sensData, data);
    if (data.length == 0) {
      cb.utils.alert('数据未更改~', 'error');
      return
    }
    var proxy = cb.rest.DynamicProxy.create({
      saveSensData: {
        url: 'sensdata/save',
        method: 'POST',
        options: {
          token: true
        }
      }
    });
    proxy.saveSensData({ data }, function (err, result) {
      if (err)
        cb.utils.alert('保存失败！' + (err ? err.message : ''), 'error');
      else
        cb.utils.alert('保存成功！', 'success');
    }, this);
  }
  getFooterControl() {
    return (
      <Row colCount={12} className="bottom-toolbar">
        <Button type="primary" onClick={e => this.buttonClick(e)}>保存</Button>
        <Button className="m-l-10" onClick={e => this.buttonClick(e, 'cancel')}>取消</Button>
      </Row>
    );
  }
  getBodyControl() {
    let bodyControl = []
    let authControl = this.getAuthControl();
    bodyControl.push(
      <Row colCount={12} className="sensRoleRow">
        <Col className='role-select' span={10}>
          {authControl}
        </Col>
      </Row>
    )
    return bodyControl;
  }
  getControl() {
    let body = this.getBodyControl();
    let footer = this.getFooterControl();
    return (
      <div className="roleControl footerFixed">
        <div className="sensRole-header">启用敏感数据权限控制</div>
        <div className="sensRole-body">{body}</div>
        <div className="">{footer}</div>
      </div>
    )
  }
  render() {
    let control = this.getControl();
    return control;
  }
};
