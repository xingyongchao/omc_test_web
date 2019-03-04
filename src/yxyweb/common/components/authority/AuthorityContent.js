import React from 'react';
import { proxy } from '../../helpers/util';
let Authority=null;
import isOpenRole4AddUserData from './isOpenRole4AddUser.json'
import getRoleUserDataPermissionData from './getRoleUserDataPermission.json'
if (process.env.__CLIENT__ === true) {
  Authority=require('u8c-components/dist').Authority;
  require('./index.less')
}
const proxyFactory=(name,config,data,callback)=>{
    const proxy = cb.rest.DynamicProxy.create({ [name]: config});
    proxy[name](data,(err,result)=>{
      callback(err,result);
    })
}
export default class AuthorityContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 当前页数
      activePage: 1,
      // 用户列表
      userList: {},
      // 角色列表
      roleList: [],
      // 设置角色弹窗开关
      setRoleModal: false,
      // 是否开启角色权限开关
      isOpenRole4AddUser: false,
      // 隔离对象的数据
      partitionData: [],
      // 判断是否打开
      partitionType: false,
      // 点击按钮打开隔离对象传递的参数
      partitionParam: {},
      // refInfo 需要传递给参照组件的
      refInfo: {},
      applications:[],
      childRef:null
    };
  }

  /*==============================业务代码===============================*/
   getUserList=(page,size=10,keyword='')=>{
     return new Promise((resolve,reject)=>{
       proxyFactory('getUserList',
         { url: 'auth/userList', method: 'GET' } ,
         {pageNumber:page,pageSize:size,keyword},
         (err, result) => {
           if(err){
             cb.utils.alert('获取敏感数据列表失败！' + err, 'error');
             resolve({error:err})
           }
           if (result){
             this.setState({ userList: result });
             resolve({payload:result})
           }
         })
     })

  }

  //获取角色
  getRole=()=>{
     return new Promise((resolve,reject)=>{
       proxyFactory('getUserList',
         { url: 'auth/roleList', method: 'GET' },
         null,
         (err, result) => {
           if(err){
             cb.utils.alert('获取角色失败！' + err, 'error');
             resolve({error:err})

           }
           if (result){
             resolve({payload:result});
             this.setState({ roleList: result });
           }
         } )
     })


  }

  //单独用户添加角色
  addRole=(roleIds,userIds)=>{
    return new Promise((resolve,reject)=>{
      proxyFactory('addRole',
        {url:'auth/addRole',method:'POST'},
        { userId:userIds, roleIds },
        (err,result)=>{
          if(err){
            cb.utils.alert('获取角色失败！' + err, 'error');
            resolve({error:err})
          }
          if(result){
            const {userList}=this.state;
            let newList=cb.utils.extend({},userList);
            const {id,roles}=result;
            newList.data=newList.data.map((item) => {
              const {
                id: itemUserId,
              } = item;
              if (itemUserId === id) {
                return {
                  ...item,
                  roles,
                };
              }
              return item;
            });
            debugger;
            this.setState({
              userList: newList
            });
            resolve({payload:result});
          }
        }
      )
    })

  }

  //批量用户添加角色
  setRole=(userIds, roleIds)=>{
     return new Promise((resolve)=>{
       //TODO 数据处理在相看
       proxyFactory('setRole',
         { url: 'auth/addRoles', method: 'POST' },
         { userIds, roleIds },
         (err, result) => {
           if(err){
             cb.utils.alert('获取角色失败！' + err, 'error');
             resolve({error:err})
           }
           if (result){
             resolve({payload:result})
           }

         } )
     })


  }

  //全部添加角色

  addAllUserRoles=(roleIds)=>{
     return new Promise((resolve)=>{
       //TODO 数据处理在相看
       proxyFactory('addAllUserRoles',
         { url: 'user/addAllUserRoles', method: 'POST' },
         {roleIds},
         (err, result) => {
           if(err){
             cb.utils.alert('获取角色失败！' + err, 'error');
             resolve({error:err})
           }
           if (result){
             debugger;
             console.log(result);
             this.setState({ roleList: result });
             resolve({payload:result})
           }

         } )
     })


  }

  //获取是否有能设置角色的权限
  //TODO 这个接口废弃了
  getOpenRole=()=>{
     return new Promise(resolve => {
       proxyFactory('getOpenRole',
         { url: 'user/isOpenRole4AddUser', method: 'GET' },
         null,
         (err, result) => {
           if(err){
             cb.utils.alert('获取角色失败！' + err, 'error');
             //resolve({error:err})
             result=isOpenRole4AddUserData.data;
             this.setState({ isOpenRole4AddUser: result });
             resolve({payload:result})
           }
           if (result)

             this.setState({ isOpenRole4AddUser: result });
           resolve({payload:result})
         } )
     })


  }

  openSetRoleModal=()=>{
    this.setState({
      setRoleModal: true,
    })
  }

  closeSetRoleModal=()=>{
    this.setState({
      setRoleModal: false,
    })
  }

  changePage=(eventKey)=>{
    this.setState({
      activePage: eventKey,
    })
  }

  //查询用户角色下的业务隔离对象
  getPartitionData=(param)=>{
     return new Promise(resolve => {
       proxyFactory('getPartitionData',
         { url: 'serviceIsolate/getRoleUserOrgPermission', method: 'GET' },
         param,
         (err, result) => {
           if(err){
             cb.utils.alert('获取角色失败！' + err, 'error');
             //resolve({error:err})
             result=getRoleUserDataPermissionData.data;
             this.setState({ partitionData: result.serviceIsolate });
             resolve({payload:result})
           }
           if (result)
             this.setState({ partitionData: result.serviceIsolate });
             resolve({payload:result})
         } )
     })


  }

  //删除的api
  deletePartition=(param)=>{
     return new Promise(resolve => {
       //TODO 数据处理在相看
       proxyFactory('deletePartition',
         { url: 'serviceIsolate/deleteRoleUserDataPermission', method: 'POST' },
         param,
         (err, result) => {
           if(err){
             cb.utils.alert('获取角色失败！' + err, 'error');
             resolve({error:err})
           }
           if (result)
             debugger;
           this.setState({ roleList: result });
           resolve({payload:result})
         } )
     })


  }

  //保存用户角色下的业务隔离对象
  savePartition=(param)=>{
     return new Promise(resolve => {
       //TODO 数据处理在相看
       proxyFactory('savePartition',
         { url: 'serviceIsolate/saveRoleUserDataPermission', method: 'POST' },
         param,
         (err, result) => {
           if(err){
             cb.utils.alert('获取角色失败！' + err, 'error');
             resolve({error:err})
           }
           if (result){
             this.setState({ roleList: result });

             resolve({payload:result})
           }
         } )
     })
  }

  openPartitionModal=(payloadVal)=>{
    this.setState({
      partitionType: true,
      partitionParam: payloadVal,
    })
  }

  closePartitionModal=()=>{
    this.setState({
      partitionType: false,
    })
  }

  changePartitionData=( {operation, data } )=>{
    if (operation === 'del') {
      const { id: delId, index } = data;
      const partitionData = [...this.state.partitionData];
      const oldItem = partitionData[index];
      partitionData[index] = {
        ...oldItem,
        resources: oldItem.resources.filter(({ resourceId }) => resourceId !== delId),
      };
      this.setState({
        partitionData
      })

    } else if (operation === 'add') {
      const { isolateId, sels } = data;
      const partitionData = [...this.state.partitionData];
      const index = partitionData.findIndex(({ isolateId: resourcetypecode }) => {
        const result = (resourcetypecode === isolateId);
        return result;
      });
      if (index !== -1) {
        const oldItem = partitionData[index];
        partitionData[index] = {
          ...oldItem,
          resources: sels.map(({ key: resourceId, name: resourceName }) => {
            const obj = {
              resourceId,
              resourceName,
            };
            return obj;
          }),
        };
      }
      this.setState({
        partitionData
      })
    }
  }

  //获取参照
  getRefInfo=(refCode, sysId)=>{
     return new Promise(resolve => {
       proxyFactory('getUserList',
         { url: `${getHost('ref')}/ref/diwork/iref_ctr/refInfo`, method: 'GET' },
         { refCode, sysId },
         (err, result) => {
           if(err){
             cb.utils.alert('获取角色失败！' + err, 'error');
             resolve({error:err})
           }
           if (result){
             resolve({payload:result});
             this.setState({ refInfo:result});

           }
         } )

     })

  }



  getServiceAndButton=()=>{
    return new Promise((resolve,reject)=>{
      proxyFactory('getServiceAndButton',
        { url: 'service/getServiceAndButton', method: 'GET' },
        null,
        (err, result) => {
          if(err){
            cb.utils.alert('按钮权限获取失败！' + err, 'error');
            reject(err);
            const applications=require('./getServiceAndButton').default;
            this.setState({
              applications
            })
          }
          if (result){
            resolve(result);
            debugger;
            console.log(result);
            this.setState({ applications: result });
          }

        } );
    })

    return;
    this.proxFactory('getServiceAndButton',{ url: 'service/getServiceAndButton', method: 'GET' },null,(err,result)=>{
      if(err){
        cb.utils.alert('按钮权限获取失败！' + err, 'error');
        const applications=require('./getServiceAndButton');
        this.setState({
          applications
        })
      }
      if (result)
        debugger;
      console.log(result);
      this.setState({ applications: result });
    });
    return
    const proxy = cb.rest.DynamicProxy.create({ getServiceAndButton: { url: 'service/getServiceAndButton', method: 'GET' } });
    proxy.getServiceAndButton((err, result) => {
      if(err){
        cb.utils.alert('按钮权限获取失败！' + err, 'error');
        const applications=require('./getServiceAndButton');
        this.setState({
          applications
        })
      }
      if (result)
        debugger;
      console.log(result);
      this.setState({ applications: result });
    });
  }
  getRef=(child)=>{
    this.setState({
      childRef:child
    })
  }























  //获取userList
  async getUserList(param) {
    const config = {
      url: 'tenant/queryUserPage',
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
     const  {
       // 当前页数
       activePage,
       // 用户列表
       userList,
       // 角色列表
       roleList,
       // 设置角色弹窗开关
       setRoleModal,
       // 是否开启角色权限开关
       isOpenRole4AddUser,
       // 隔离对象的数据
       partitionData,
       // 判断是否打开
       partitionType,
       // 点击按钮打开隔离对象传递的参数
       partitionParam,
       // refInfo 需要传递给参照组件的
       refInfo,
     }=this.state
    return (
      <div className="authority-page">
        <Authority getUserList={this.getUserList}
                   getRole={this.getRole}
                   setRole={this.setRole}
                   addRole={this.addRole}
                   addAllUserRoles={this.addAllUserRoles}
                   openSetRoleModal={this.openSetRoleModal}
                   closeSetRoleModal={this.closeSetRoleModal}
                   getOpenRole={this.getOpenRole}
                   changePage={this.changePage}
                   getPartitionData={this.getPartitionData}
                   deletePartition={this.deletePartition}
                   savePartition={this.savePartition}
                   openPartitionModal={this.openPartitionModal}
                   closePartitionModal={this.closePartitionModal}
                   changePartitionData={this.changePartitionData}
                   getRefInfo={this.getRefInfo}
                   activePage={activePage}
                   userList={userList}
                   roleList={roleList}
                   setRoleModal={setRoleModal}
                   isOpenRole4AddUser={isOpenRole4AddUser}
                   partitionData={partitionData}
                   partitionType={partitionType}
                   partitionParam={partitionParam}
                   refInfo={refInfo}
        ></Authority>
      </div>
    )
  }
};
