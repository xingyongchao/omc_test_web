// import React, { Component } from 'react';
// // import { Popover, Input, Modal, Icon, Button, Checkbox, Radio, Transfer, Select } from 'antd';
// import { Table, Input, Icon, Button, Popconfirm } from 'antd';
// import { Format } from '../../../helpers/formatDate';
// import Row from '../../basic/row';
// import Col from '../../basic/col';
// // const RadioGroup = Radio.Group;

// export default class eChartPanelList extends React.Component {
//   constructor(props) {
//     super(props);
//     let self = this;
//     let colEle = self.props.colEle;
//     this.state = {
//       panelArr: []
//     };
//   }

//   render() {
//     // const { groupConditionState, groupConditionRedux } = this.props;
//     let self = this;
//     let content = self.getCardContent();

//     return <div
//       width={400}
//       height={300}
//     >
//       {content}
//     </div>;
//   }

//   getCardContent() {
//     let self = this;
//     let panelArr = self.state.panelArr;
//     let arr = [];

//     arr.push(
//       <Row colCount={24}>
//         <Col span={6} >
//           名称
//         </Col>
//         <Col span={3} >
//           类型
//         </Col>
//         <Col span={3} >
//           操作
//         </Col>
//         <Col span={3} >
//           操作
//         </Col>
//         <Col span={3} >
//           操作
//         </Col>
//         <Col span={3} >
//           操作
//         </Col>
//         <Col span={3} >
//           <Button onClick={() => self.addPanel()}>增加</Button>
//         </Col>
//       </Row>
//     );
//     panelArr.forEach(ele => {
//       arr.push(
//         <Row colCount={24}>
//           <Col span={6}>
//             {ele.name}
//           </Col>
//           <Col span={3}>
//             {ele.type}
//           </Col>
//           <Col span={3}>
//             <Button onClick={() => self.copyPanel(ele)}>复制</Button>
//           </Col>
//           <Col span={3}>
//             <Button onClick={() => self.browsePanel(ele)}>浏览</Button>
//           </Col>
//           <Col span={3}>
//             <Button onClick={() => self.editPanel(ele)}>编辑</Button>
//           </Col>
//           <Col span={3}>
//             <Button onClick={() => self.deletePanel(ele)}>删除</Button>
//           </Col>
//           <Col span={3}>
//             <Button onClick={() => self.addPanel()}>增加</Button>
//           </Col>
//         </Row>
//       );
//     })
//     return arr;
//   }

//   addPanel(ele) {

//   }
//   copyPanel(ele) {

//   }
//   browsePanel(ele) {

//   }
//   editPanel(ele) {

//   }
//   deletePanel(ele) {

//   }

// }


