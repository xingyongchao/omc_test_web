// import React, { Component } from 'react';
// import { Popover, Input, Modal, Icon, Button, Checkbox, Radio, Transfer, Select } from 'antd';
// import { Format } from '../../../helpers/formatDate';
// import Row from '../../basic/row';
// import Col from '../../basic/col';
// const RadioGroup = Radio.Group;
// 
// export default class eChartPanelSetColType extends React.Component {
//   constructor(props) {
//     super(props);
//     // self.props.selectedColKey
//     // self.props.colEle
//     this.state = {
//       info: {
//         curOperateType: "setImageText",
//         // <Radio value={"0"}>标题</Radio>
//         // <Radio value={"1"}>图表</Radio>
//         // <Radio value={"2"}>汇总区</Radio>
//       }
//     };
//   }

//   render() {
//     // const { groupConditionState, groupConditionRedux } = this.props;
//     let self = this;
//     let content = self.getCardContent();
//     let visible = self.props.selectedColKey == self.props.colEle.colKey && self.props.curOperateType == "selectColType";

//     return <div>
//       <Popover
//         content={content}
//         trigger={"click"}
//         visible={visible}
//         onVisibleChange={(visible2) => self.showContent(visible2, 1)}
//       >
//         <Button onClick={() => self.showContent(true, 2)}>选择控件</Button>
//       </Popover>
//     </div>;

//   }
//   showContent(visible, type) {
//     if (visible == true && type == 2) {
//       this.props.showContent(true, this.props.colEle.colKey);
//     }
//     if (visible == false && type == 1) {
//       this.props.showContent(false);
//     }

//   }
//   setStateInfoValue(name, value) {
//     let self = this;
//     let info = self.state.info;
//     info[name] = value;
//     self.setState({ info });
//   }
//   getCardContent() {
//     let self = this;
//     let info = self.state.info;
//     let content = <div>
//       <div>设置显示内容</div >
//       <div>
//         <RadioGroup
//           value={info.curOperateType}
//           onChange={(e) => self.setStateInfoValue("curOperateType", e.target.value)}
//         >
//           <Radio value={"setImageText"}>标题</Radio>
//           <Radio value={"setChart"}>图表</Radio>
//           <Radio value={"setSum"}>汇总区</Radio>
//         </RadioGroup>
//       </div>
//       <div >
//         <Button type={"default"} onClick={() => self.doFunc(false)}>取消</Button>
//         <Button type={"primary"} onClick={() => self.doFunc(true)}>确定</Button>
//       </div>
//     </div >;
//     return content;
//   }
//   doFunc(bOK) {
//     let info = this.state.info;
//     // info.colKey = this.props.colEle.colKey;
//     this.props.doFunc(bOK, info);
//   }
// }
