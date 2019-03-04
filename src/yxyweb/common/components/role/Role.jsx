import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Select, Checkbox, Input, Icon, Radio } from 'antd';
import Row from '../basic/row';
import Col from '../basic/col';
import Table from '../basic/table'
import PortalSetting from './PortalSetting';
import Button from '../basic/button'
import * as portalactions from '../../redux/portal';
import getServiceAndButton from './getServiceAndButton'
const RadioGroup = Radio.Group;
let PermissionButtons=null
if (process.env.__CLIENT__ === true) {
  require('./role.less');
  PermissionButtons=require('u8c-components/dist').PermissionButtons
}
class Role extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InputValues: { name: "", desc: "", code: "" },
      activeKey: 'default',
      sysList: [],
      dataObj: {},
      sensRoleMap: {},/*敏感数据权限对照*/
      systemCode: '',
      childRef:null,//接收按钮组件的this对象
      serviceButtonsList:[],//按钮组件的值
    };
    this.viewModel = cb.loader.initMetaCommonViewModel(
      'RoleViewModel',
      'roleViewModel',
      this.props.data.params,
      this.props.data.parentViewModel,
      ['refresh']
    );
  }
  componentWillMount() {
    if (this.viewModel)
      this.viewModel.addListener(this);
  }
  componentWillUnmount() {
    if (this.viewModel)
      this.viewModel.removeListener(this);
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.callback || nextProps.callback === this.props.callback) return;
    cb.utils.confirm(`确定要${nextProps.caption}么`, function () {
      nextProps.callback();
    });
  }
  //TODO 按钮权限
  getRef=(childRef)=>{
    this.setState({
      childRef
    })
  }
  initRole(data) {
    //TODO 按钮权限数据
    const serviceButtonsList=data.labbelVOs;
    this.setState({
      serviceButtonsList
    })
    return;
    let { authList, sysList, sensDataList } = data;
    let sensRoleMap = this.state.sensRoleMap;
    let dataObj = {};
    for (var key in authList) {
      let authes = authList[key].authes, kbList = authList[key].kanbans;
      if (authes && authes.length > 0) {
        authes.forEach(ele => {
          ele.checked = false;
          if (!ele.children) return;
          ele.children.forEach(ele1 => {
            ele1.checked = false;
            if (!ele1.children) return;
            ele1.children.forEach(ele2 => {
              ele2.checked = false;
            })
          })
        });
      } else {
        authes = [];
      }
      if (kbList && kbList.length > 0) {
        kbList = [{ name: "看板", children: kbList }];
        kbList.forEach(ele => {
          ele.checked = false;
          if (!ele.children) return;
          ele.children.forEach(ele1 => {
            ele1.checked = false;
            if (!ele1.children) return;
            ele1.children.forEach(ele2 => {
              ele2.checked = false;
            })
          })
        });
      } else {
        kbList = [];
      }
      if (sensDataList && sensDataList.length > 0) {
        sensDataList.forEach(ele => {
          sensRoleMap[ele.code] = -1;
          if (!ele.children) return;
          ele.children.forEach(ele1 => {
            sensRoleMap[ele1.code] = -1;
            if (!ele1.children) return;
            ele1.children.forEach(ele2 => {
              sensRoleMap[ele2.code] = -1;
            })
          })
        });
      } else {
        sensDataList = [];
      }
      //TODO diwork 融合
      dataObj[key] = { 'authList': authes, 'kbList': kbList, sensRoleMap };
    }
    this.setState({ dataObj, sysList, sensDataList, "systemCode": sysList[0].systemCode });
  }
  initRoleData(roleData) {
    //TODO 按钮权限数据

    return;
    let { roleportals, auths, rolekanbans, rolesensdatas } = roleData;
    let dataObj = this.state.dataObj;
    const settingDataSource = roleportals && roleportals.length ? JSON.parse(roleportals[0]) : null;
    let InputValues = this.state.InputValues;
    InputValues.name = roleData.name;
    InputValues.code = roleData.code;
    InputValues.desc = roleData.note;

    if (!auths) auths = {};
    if (!rolekanbans) rolekanbans = {};
    for (var key in auths) {
      let authsList = auths[key];
      let authList = cb.utils.extend(true, [], dataObj[key] ? dataObj[key].authList : []);
      authsList.forEach(function (ele) {
        const checkedAuth = ele.auth;
        let isFind = false;
        authList.forEach(ele => {
          if (!isFind) {/*已匹配*/
            if (ele.code == checkedAuth) {
              ele.checked = true;
              isFind = true;
            } else {
              if (ele.children) {
                ele.children.forEach(ele1 => {
                  if (ele1.code == checkedAuth) {
                    ele1.checked = true;
                    isFind = true;
                  } else {
                    if (ele1.children) {
                      ele1.children.forEach(ele2 => {
                        if (ele2.code == checkedAuth) {
                          ele2.checked = true;
                          isFind = true;
                        }
                      })
                    }
                  }
                })
              }
            }
          }
        })
      }, this);
      authList = this.setIndeterminate(authList);
      dataObj[key].authList = authList;
    }
    for (var key in rolekanbans) {
      let kanbanList = rolekanbans[key];
      let kbList = cb.utils.extend(true, [], dataObj[key] ? dataObj[key].kbList : []);
      kanbanList.forEach(function (ele) {
        const checkedAuth = ele.kanban;
        let isFind = false;
        kbList.forEach(ele1 => {
          if (!isFind) {/*已匹配*/
            if (ele1.children) {
              ele1.children.forEach(ele2 => {
                if (ele2.children) {
                  ele2.children.forEach(ele3 => {
                    if (ele3.id == checkedAuth) {
                      ele3.checked = true;
                      isFind = true;
                    }
                  })
                }
              })
            }
          }
        })
      }, this);
      kbList = this.setIndeterminate(kbList);
      dataObj[key].kbList = kbList;
    }
    let sensRoleMap = this.state.sensRoleMap;
    rolesensdatas && rolesensdatas.map(data => {
      sensRoleMap[data.sensDataAuth] = data.authLevel;
    })
    this.setState({ InputValues, settingDataSource, dataObj, sensRoleMap });
  }
  onSysChange = (val, option) => {
    this.setState({ 'systemCode': val })
  }
  rollBackClick(e) {
    const { portalactions, index } = this.props;
    portalactions.delItem(index);
    this.viewModel.execute('refresh');
  }
  getBodyControl() {
    let { InputValues, activeKey, errCode, errName, sysList, systemCode } = this.state;
    let values = InputValues;
    let bodyControl = []
    bodyControl.push(
      <Row colCount={12} className="roleRow">
        <label><Icon type='star' />角色编码</label>
        <Col span={5} className={errCode ? "width-400 err" : "width-400"}>
          <Input onChange={(e) => this.onInputChange(e, "code")} value={values.code} type="text" placeholder="请输入角色编码" />
        </Col>
        <Col span={4}>{errCode ? <div className="errInfo">不能为空</div> : ""}</Col>
      </Row>
    )
    bodyControl.push(
      <Row colCount={12} className="roleRow">
        <label><Icon type='star' />角色名称</label>
        <Col span={5} className={errName ? "width-400 err" : "width-400"}>
          <Input onChange={(e) => this.onInputChange(e, "name")} value={values.name} type="text" placeholder="请输入角色名称" />
        </Col>
        <Col span={4}>{errCode ? <div className="errInfo">不能为空</div> : ""}</Col>
      </Row>
    )
    bodyControl.push(
      <Row colCount={12} className="roleRow p-b-0">
        <label>角色描述</label>
        <Col span={5} className="width-400">
          <Input onChange={(e) => this.onInputChange(e, "desc")} value={values.desc} type="textarea" placeholder="请输入对角色的简单描述" />
          <span style={{ float: "right", color: "#e6e6e6" }}>100字以内</span>
        </Col>
        <Col span={4}></Col>
      </Row>
    )
    if (cb.rest.toolbarHotfix)
      bodyControl.push(
        <Row colCount={12} className='roleRow'>
          <label>门户控件</label>
          <Col className='role-select' span={2}>
            <PortalSetting ref='setting' dataSource={this.state.settingDataSource} />
          </Col>
        </Row>
      )
    let authControl = this.getAuthControl();
    let sysOptions = [];
    sysList && sysList.map(sys => {
      sysOptions.push(
        <Select.Option value={sys.systemCode} sys={sys}>{sys.systemName}</Select.Option>
      )
    });
    //TODO diwork 融合权限选择去掉
    /*bodyControl.push(
      <Row colCount={12} className="roleRow function-limit">
        <label>权限</label>
        <Col className="width-400" span={5}>
          <Select value={systemCode} style={{ width: 120 }}
            onSelect={this.onSysChange}
          >{sysOptions}</Select>
        </Col>
        <Col className='role-select' span={10}>
          <div className="role-tabs clearfix">
            <div className="tabs-control">
              <div className={activeKey == 'default' ? 'role-tab-active' : ''} onClick={() => this.onTabsChange('default')}>功能权限</div>
              {cb.rest.toolbarHotfix && <div className={activeKey == 'discount' ? 'role-tab-active' : ''} onClick={() => this.onTabsChange('discount')}>现场折扣权限</div>}
              <div className={activeKey == 'kanban' ? 'role-tab-active' : ''} onClick={() => this.onTabsChange('kanban')}>看板权限</div>
              <div className={activeKey == 'sens' ? 'role-tab-active' : ''} onClick={() => this.onTabsChange('sens')}>敏感数据权限</div>
            </div>
          </div>
          {authControl}
        </Col>
      </Row>
    )*/
    return bodyControl;
  }
  onTabsChange = (activeKey) => {
    this.setState({ activeKey });
  }
  onInputChange(e, type) {
    let InputValues = this.state.InputValues;
    let value = e.target.value;
    if (type == 'desc' && value.length > 100) {
      cb.utils.alert("最多支持100字哦！", 'warning');
      return
    }
    InputValues[type] = value;
    this.setState({ InputValues });
  }
  onRadioChange = (e, item) => {
    let sensRoleMap = this.state.sensRoleMap;
    sensRoleMap[item.code] = e.target.value;
    this.setState({ sensRoleMap });
  }
  getAuthControl() {
    let { serviceButtonsList,activeKey, systemCode, dataObj, sensDataList, sensRoleMap } = this.state;
    let authList = dataObj[systemCode] ? dataObj[systemCode].authList : [];
    let kbList = dataObj[systemCode] ? dataObj[systemCode].kbList : [];

    let authControl = [];
    if (activeKey == 'default') {/*功能权限*/
     /* authList.forEach(function (ele) {
        let options = [], lastAuth = [];
        let second = ele.children ? ele.children : [];
        second.forEach(function (item) {
          let last = item.children ? item.children : [];
          lastAuth = [];
          last.forEach(function (item1) {
            lastAuth.push(
              <Checkbox checked={item1.checked} onChange={(e) => this.onChecked(e, item1.code, 'last', item1.parent)}>
                {item1.name}
              </Checkbox>
            );
          }, this);
          options.push(
            <Row >
              <div className='second-auth'>
                <Checkbox checked={item.checked} indeterminate={item.indeterminate} onChange={(e) => this.onChecked(e, item.code, 'second', item.parent)}>
                  {item.name}
                </Checkbox>
              </div>
              <div className='last-auth'>{lastAuth}</div>
            </Row>
          );
        }, this);
        authControl.push(
          <Row className='roleRow-2'>
            <div >
              <Checkbox checked={ele.checked} indeterminate={ele.indeterminate} onChange={(e) => this.onGroupChecked(e, ele.code)}><h4>{ele.name}</h4></Checkbox>
            </div>
            <div >{options}</div>
          </Row>
        );
      }, this);*/
     authControl.push(

       <PermissionButtons applications={serviceButtonsList} getRef={this.getRef}></PermissionButtons>
     )
    } else if (activeKey == 'kanban') {/*看板权限*/
      kbList.forEach(function (ele) {
        let options = [], lastAuth = [];
        let second = ele.children ? ele.children : [];
        second.forEach(function (item) {
          let last = item.children ? item.children : [];
          lastAuth = [];
          last.forEach(function (item1) {
            lastAuth.push(
              <Checkbox checked={item1.checked} onChange={(e) => this.onChecked(e, item1.id, 'last', item1.parent, "kanban")}>
                {item1.name}
              </Checkbox>
            );
          }, this);
          options.push(
            <Row >
              <div className='second-auth'>
                <Checkbox checked={item.checked} indeterminate={item.indeterminate} onChange={(e) => this.onChecked(e, item.type, 'second', item.parent, "kanban")}>
                  {item.name || item.typeName}
                </Checkbox>
              </div>
              <div className='last-auth'>{lastAuth}</div>
            </Row>
          );
        }, this);
        authControl.push(
          <Row className='roleRow-2'>
            <div >
              <Checkbox checked={ele.checked} indeterminate={ele.indeterminate} onChange={(e) => this.onGroupChecked(e, ele.code, "kanban")}><h4>{ele.name || ele.typeName}</h4></Checkbox>
            </div>
            <div >{options}</div>
          </Row>
        );
      }, this);
    } else if (activeKey == 'sens') {
      sensDataList[0] && sensDataList[0].children.forEach(function (ele) {
        let options = [];
        let second = ele.children ? ele.children : [];
        let radioVal;
        second.forEach(function (item) {
          radioVal = sensRoleMap[item.code];
          if(cb.utils.isEmpty(radioVal) || radioVal == -1) radioVal = 0;
          options.push(
            <Row >
              <div className='second-auth'>
                <span className='sensRole-name'>{item.name || item.typeName}</span>
              </div>
              <div className='last-auth'>
                <RadioGroup onChange={e => this.onRadioChange(e, item)} value={radioVal}>
                  <Radio value={0}>无权</Radio>
                  <Radio value={1}>只读</Radio>
                  <Radio value={2}>读写</Radio>
                </RadioGroup>
              </div>
            </Row>
          );
        }, this);
        if (options.length == 0) {
          radioVal = sensRoleMap[ele.code];
          if(cb.utils.isEmpty(radioVal) || radioVal == -1) radioVal = 0;
          options.push(
            <Row >
              <div className='second-auth'>
                <span className='sensRole-name'></span>
              </div>
              <div className='last-auth'>
                <RadioGroup onChange={e => this.onRadioChange(e, ele)} value={radioVal}>
                  <Radio value={0}>无权</Radio>
                  <Radio value={1}>只读</Radio>
                  <Radio value={2}>读写</Radio>
                </RadioGroup>
              </div>
            </Row>
          )
        }
        authControl.push(
          <Row className='roleRow-2 sensRole'>
            <div ><span className="firstRole">{ele.name || ele.typeName}</span></div>
            <div >{options}</div>
          </Row>
        );
      }, this);
    }
    return authControl;
  }
  onGroupChecked(e, code, type) {
    let { dataObj, systemCode } = this.state;
    let authList = dataObj[systemCode] ? dataObj[systemCode].authList : [];
    let kbList = dataObj[systemCode] ? dataObj[systemCode].kbList : [];

    let list = authList;
    if (type == 'kanban') list = kbList;
    let checked = e.target.checked;
    list.forEach(function (ele) {
      if (ele.code == code) {
        ele.checked = checked;
        if (checked) ele.indeterminate = false;
        let second = ele.children ? ele.children : [];
        second.forEach(function (ele1) {
          ele1.checked = checked;
          let last = ele1.children ? ele1.children : [];
          last.forEach(function (ele2) {
            ele2.checked = checked;
          })
        });
      }
    });
    list = this.setIndeterminate(list);
    if (type == 'kanban')
      dataObj[systemCode].kbList = list;
    else
      dataObj[systemCode].authList = list;
    this.setState({ dataObj });
  }
  onChecked(e, code, level, parent, type) {
    let { dataObj, systemCode } = this.state;
    let authList = dataObj[systemCode] ? dataObj[systemCode].authList : [];
    let kbList = dataObj[systemCode] ? dataObj[systemCode].kbList : [];

    let list = authList;
    if (type == 'kanban') list = kbList;
    let checked = e.target.checked;
    if (level == 'last') {
      list.forEach(ele => {
        let second = ele.children;
        if (second) {
          second.forEach(ele1 => {
            let last = ele1.children;
            if (last) {
              last.forEach(ele2 => {
                if (type == 'kanban') {
                  if (code == ele2.id) { ele2.checked = checked; }
                } else {
                  if (code == ele2.code) { ele2.checked = checked; }
                }
                if (!checked) ele1.checked = false;
              });
            } else {
              if (type == 'kanban') {
                if (ele1.id == code) ele1.checked = checked;
              } else {
                if (ele1.code == code) ele1.checked = checked;
              }
              if (!checked) ele.checked = false;
            }
          });
        } else {
          if (type == 'kanban') {
            if (ele.id == code) ele.checked = checked;
          } else {
            if (ele.code == code) ele.checked = checked;
          }
        }
      });
    } else {
      list.forEach(ele => {
        let second = ele.children;
        if (second) {
          second.forEach(ele1 => {
            let isEqual = false;
            if (type == 'kanban') {
              if (ele1.type == code) isEqual = true;
            } else {
              if (ele1.code == code) isEqual = true;
            }
            if (isEqual) {
              ele1.checked = checked;
              if (!checked) ele.checked = false;
              let last = ele1.children;
              if (last) {
                last.forEach(ele2 => {
                  ele2.checked = checked;
                });
              }
            }
          });
        } else {
          if (type == 'kanban') {
            if (ele.type == code) ele.checked = checked;
          } else {
            if (ele.code == code) ele.checked = checked;
          }
        }
      });
    }
    list = this.setIndeterminate(list);
    if (type == 'kanban')
      dataObj[systemCode].kbList = list;
    else
      dataObj[systemCode].authList = list;
    this.setState({ dataObj });
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
              if (ele2.checked) checkedLen2 += 1;
            });
            if (lastLen > checkedLen2 && checkedLen2 != 0) {
              ele1.indeterminate = true;
              ele1.checked = false;
            } else {
              if (lastLen == checkedLen2 && lastLen != 0) ele1.checked = true;
              ele1.indeterminate = false;
            }
          }
          if (ele1.checked) checkedLen1 += 1;
          if (ele1.indeterminate) indet1 += 1;
        });
        if (secondLen > checkedLen1 && (checkedLen1 != 0 || indet1 != 0)) {
          ele.indeterminate = true;
          ele.checked = false;
        } else {
          if (secondLen == checkedLen1) ele.checked = true;
          ele.indeterminate = false;
        }
      }
    })
    return authList;
  }
  getFooterControl() {
    let footerControl = (
      (this.props.data.params.mode != 'add') ?
        <Row colCount={12} className="bottom-toolbar">
          <Button type="primary" onClick={(e) => this.buttonClick(e, 'save')}>保存</Button>
          <Button type="default" onClick={(e) => this.buttonClick(e, 'cancel')}>取消</Button>
        </Row>
        :
        <Row colCount={12} className="bottom-toolbar">
          <Button type="primary" onClick={(e) => this.buttonClick(e, 'save')}>保存</Button>
          <Button type="primary" className="gray" onClick={(e) => this.buttonClick(e, 'saveAndAdd')}>保存并新增</Button>
          <Button type="default" onClick={(e) => this.buttonClick(e, 'cancel')}>取消</Button>
        </Row>
    );
    return footerControl;
  }
  buttonClick(e, type) {
    if (type == 'cancel') {
      this.rollBackClick();
      return
    }
    let InputValues = this.state.InputValues;
    if (InputValues.name == "" || InputValues.code == "") {
      let errCode = false, errName = false;
      if (InputValues.name == "") errName = true;
      if (InputValues.code == "") errCode = true;
      this.setState({ errCode, errName });
      return
    }
    let args = { "name": InputValues.name, "code": InputValues.code, "note": InputValues.desc, "auths": [], "rolekanbans": [], "rolesensdatas": [] };
    if (this.props.data.params.mode != 'add') {
      args.id = this.props.data.params.id;
    }
    this.getSaveAuths(args);

    const setting = this.refs.setting && this.refs.setting.getData();
    if (setting)
      args.layouts = [{ layout: JSON.stringify(setting) }];
    this.viewModel.get('save').fireEvent('click', { type, args });
    this.setState({
      InputValues: { name: "", desc: "", code: "" },
      settingDataSource: [{ "title": "营业概览", "order": 0, "showIcon": false }, { "title": "销售排行", "order": 1, "showIcon": false }, { "title": "门店销售趋势", "order": 2, "showIcon": false }]
    });
  }
  getSaveAuths(args) {
    let { dataObj, sensRoleMap } = this.state;
    for (var key in dataObj) {
      let authList = dataObj[key] ? dataObj[key].authList : [];
      let kbList = dataObj[key] ? dataObj[key].kbList : [];
      authList.forEach(function (ele) {
        if (ele.children) {/*存在二级权限*/
          if (ele.checked) {/*一级权限为选中态*/
            ele.children.forEach(ele1 => {
              if (ele1.children) {/*存在三级权限*/
                ele1.children.forEach(ele2 => {
                  args.auths.push({ 'auth': ele2.code, 'subId': ele2.subId });
                });
              } else {/*不存在三级权限*/
                if (ele1.checked) args.auths.push({ 'auth': ele1.code, 'subId': ele1.subId });
              }
            });
          } else if (ele.indeterminate) {/*一级权限为半选中态*/
            ele.children.forEach(ele1 => {
              if (ele1.checked) {/*二级权限为选中态*/
                if (ele1.children) {/*存在三级权限*/
                  ele1.children.forEach(ele2 => {
                    args.auths.push({ 'auth': ele2.code, 'subId': ele2.subId });
                  });
                } else {/*不存在三级权限*/
                  if (ele1.checked) args.auths.push({ 'auth': ele1.code, 'subId': ele1.subId });
                }
              } else if (ele1.indeterminate) {/*二级权限为半选中态*/
                if (ele1.children) {/*存在三级权限*/
                  ele1.children.forEach(ele2 => {
                    if (ele2.checked) args.auths.push({ 'auth': ele2.code, 'subId': ele2.subId });
                  });
                } else {/*不存在三级权限*/
                  if (ele1.checked) args.auths.push({ 'auth': ele1.code, 'subId': ele1.subId });
                }
              }
            });
          }
        } else {/*不存在二级权限*/
          if (ele.checked) args.auths.push({ 'auth': ele.code, 'subId': ele.subId });
        }
      }, this);
      kbList.forEach(function (ele) {
        if (ele.children) {/*存在二级权限*/
          if (ele.checked) {/*一级权限为选中态*/
            ele.children.forEach(ele1 => {
              if (ele1.children) {/*存在三级权限*/
                ele1.children.forEach(ele2 => {
                  args.rolekanbans.push({ 'kanban': ele2.id, 'subId': ele2.subId });
                });
              }
            });
          } else if (ele.indeterminate) {/*一级权限为半选中态*/
            ele.children.forEach(ele1 => {
              if (ele1.checked) {/*二级权限为选中态*/
                if (ele1.children) {/*存在三级权限*/
                  ele1.children.forEach(ele2 => {
                    args.rolekanbans.push({ 'kanban': ele2.id, 'subId': ele2.subId });
                  });
                }
              } else if (ele1.indeterminate) {/*二级权限为半选中态*/
                if (ele1.children) {/*存在三级权限*/
                  ele1.children.forEach(ele2 => {
                    if (ele2.checked) args.rolekanbans.push({ 'kanban': ele2.id, 'subId': ele2.subId });
                  });
                }
              }
            });
          }
        }
      }, this);
    }
    for (var id in sensRoleMap) {
      if (sensRoleMap[id] != -1)
        args.rolesensdatas.push({
          "sensDataAuth": id,
          "authLevel": sensRoleMap[id]
        });
    }
  }
  getControl() {
    let body = this.getBodyControl();
    let footer = this.getFooterControl();
    return (
      <div className="roleControl footerFixed">
        {/* <div className="roleHeader">{header}</div> */}
        <div className="roleBody" ref="roleAuth">{body}</div>
        <div className="">{footer}</div>
      </div>
    )
  }
  render() {
    let control = this.getControl();
    return control;
  }
};

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    portalactions: bindActionCreators(portalactions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Role);
