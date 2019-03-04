/*
规则备注：
  1 、smooth 跟着series关键字走
*/

export const demoConfig = {

  // isDemoConfig: false,//测试环境，从代码中读取配置文件和数据
  // isDemoData: false,//测试环境，从代码中读取配置文件和数据
  // isTestPanelDesign: false,
  isShowAllMargin: false,
  // isTestSaveAnother: false,
  isTestCarousel: false,
  isTestCarousel3: false,
  // isTestPreView: false,
  // getMapFromLocal: false,

  // demoGroupSchemaId: 4494,
  // demoDisplayType: 3,
  // demoLayOutConfig: 11
};

// export function getlayOutConfig() {
//   /*
//   1 上图下表
//   2 上表下图
//   3 左图右表
//   4 左表右图
//   5 上表下多图
//   6 左表右图，右图多行
//   8 存在次维度的假数据
//   9  单图*/
//   let layoutType = demoConfig.demoLayOutConfig;
//   let layout;
//   if (layoutType == "1")
//     layout = {
//       rows: [
//         [
//           {
//             colspan: 12,
//             widgetType: "chart",
//             widgetValue: "chart4"
//           }
//         ],
//         [
//           {
//             colspan: 12,
//             widgetType: "rpt"
//           }
//         ]
//       ]
//     };
//   else if (layoutType == "2")
//     layout = {
//       rows: [
//         [
//           {
//             colspan: 12,
//             widgetType: "rpt"
//           }
//         ],
//         [
//           {
//             colspan: 12,
//             widgetType: "chart",
//             widgetValue: "chart2"
//           }
//         ]
//       ]
//     };
//   else if (layoutType == "3")
//     layout = {
//       rows: [
//         [
//           {
//             colspan: 6,
//             widgetType: "chart",
//             widgetValue: "chart1"
//           },
//           {
//             colspan: 6,
//             widgetType: "rpt"
//           }
//         ]
//       ]
//     };
//   else if (layoutType == "4")
//     layout = {
//       rows: [
//         [
//           {
//             colspan: 6,
//             widgetType: "rpt"
//           },
//           {
//             colspan: 6,
//             widgetType: "chart",
//             widgetValue: "chart1"
//           }
//         ]
//       ]
//     };
//   else if (layoutType == "5")
//     layout = {
//       rows: [
//         [
//           {
//             colspan: 12,
//             widgetType: "rpt"
//           }
//         ],
//         [
//           {
//             colspan: 4,
//             widgetType: "chart",
//             widgetValue: "chart1"
//           },
//           {
//             colspan: 4,
//             widgetType: "chart",
//             widgetValue: "chart2"
//           },
//           {
//             colspan: 4,
//             widgetType: "chart",
//             widgetValue: "chart3"
//           }
//         ]
//       ]
//     };
//   else if (layoutType == "6")
//     layout = {
//       rows: [
//         [
//           {
//             colspan: 6,
//             widgetType: "rpt"
//           }
//           ,
//           {
//             colspan: 6,
//             widgetType: "rows",
//             widgetValue:
//               [
//                 [
//                   {
//                     colspan: 12,
//                     widgetType: "chart",
//                     widgetValue: "chart3"
//                   }
//                 ]
//                 ,
//                 [
//                   {
//                     colspan: 6,
//                     widgetType: "chart",
//                     widgetValue: "chart1"
//                   },
//                   {
//                     colspan: 6,
//                     widgetType: "chart",
//                     widgetValue: "chart2"
//                   }
//                 ]
//               ]
//           }
//         ]
//       ]
//     };
//   else if (layoutType == "8")
//     layout = {
//       rows: [
//         [
//           {
//             colspan: 12,
//             widgetType: "rpt"
//           }
//         ],
//         [
//           {
//             colspan: 12,
//             widgetType: "chart",
//             widgetValue: "chart4"
//           }
//         ]
//       ]
//     };
//   else if (layoutType == "9")
//     layout = {
//       rows: [
//         [
//           {
//             colspan: 12,
//             widgetType: "chart",
//             widgetValue: "chart4"
//           }
//         ]
//       ]
//     };
//   else if (layoutType == "10")
//     layout = {
//       rows: [
//         [
//           {
//             colspan: 12,
//             widgetType: "chart",
//             widgetValue: "chart5"
//           }
//         ]
//       ]
//     }; else if (layoutType == "11")
//     layout = {
//       rows: [
//         [
//           {
//             colspan: 12,
//             widgetType: "chart",
//             widgetValue: "chart6"
//           }
//         ]
//       ]
//     };
//   return layout;
// }


// export function getEChartConfig() {
//   let config = nlll;
//   //现在都使用getEChartConfig_Template
//   return config;
// }

// export function getChartDemoData() {
  // let data =
  //   [
  //     { area_code: "A001", area_name: "中国", store_code: "001", store_name: "稻香村鄂尔多斯店", fRetailMoney: "111.00", fNetMoney: "111.00", fMoney: "111.00", longitudeField: "109.781327", latitudeField: "39.608266" },
  //     { area_code: "A001", area_name: "中国", store_code: "002", store_name: "稻香村招远店", fRetailMoney: "222.00", fNetMoney: "222.00", fMoney: "222.00", longitudeField: "120.38", latitudeField: "37.35" },
  //     { area_code: "A001", area_name: "中国", store_code: "003", store_name: "稻香村舟山店", fRetailMoney: "333.00", fNetMoney: "333.00", fMoney: "333.00", longitudeField: "122.207216", latitudeField: "29.985295" },
  //     { area_code: "A001", area_name: "中国", store_code: "004", store_name: "稻香村齐齐哈尔店", fRetailMoney: "444.00", fNetMoney: "444.00", fMoney: "444.00", longitudeField: "123.97", latitudeField: "47.33" },
  //     { area_code: "A001", area_name: "中国", store_code: "005", store_name: "稻香村盐城店", fRetailMoney: "555.00", fNetMoney: "555.00", fMoney: "555.00", longitudeField: "120.13", latitudeField: "33.38" },
  //     { area_code: "A001", area_name: "中国", store_code: "006", store_name: "稻香村赤峰店", fRetailMoney: "666.00", fNetMoney: "666.00", fMoney: "666.00", longitudeField: "118.87", latitudeField: "42.28" },
  //     { area_code: "A001", area_name: "中国", store_code: "007", store_name: "稻香村芜湖店", fRetailMoney: "777.00", fNetMoney: "777.00", fMoney: "777.00", longitudeField: "118.38", latitudeField: "31.33" },
  //     { area_code: "A001", area_name: "中国", store_code: "008", store_name: "稻香村唐山店", fRetailMoney: "888.00", fNetMoney: "888.00", fMoney: "888.00", longitudeField: "118.02", latitudeField: "39.63" },
  //     { area_code: "A001", area_name: "中国", store_code: "009", store_name: "稻香村平顶山店", fRetailMoney: "986.00", fNetMoney: "986.00", fMoney: "986.00", longitudeField: "113.29", latitudeField: "33.75" },
  //     { area_code: "A001", area_name: "中国", store_code: "010", store_name: "稻香村邢台店", fRetailMoney: "110.00", fNetMoney: "110.00", fMoney: "110.00", longitudeField: "114.48", latitudeField: "37.05" },
  //     { area_code: "A001", area_name: "中国", store_code: "011", store_name: "稻香村招远店", fRetailMoney: "112", fNetMoney: "112", fMoney: "112", longitudeField: "120.38", latitudeField: "37.35" },
  //     { area_code: "A001", area_name: "中国", store_code: "012", store_name: "稻香村青岛店", fRetailMoney: "122", fNetMoney: "118", fMoney: "118", longitudeField: "120.33", latitudeField: "36.07" },
  //     { area_code: "A001", area_name: "中国", store_code: "013", store_name: "稻香村乳山店", fRetailMoney: "133", fNetMoney: "118", fMoney: "118", longitudeField: "121.52", latitudeField: "36.89" },
  //     { area_code: "A001", area_name: "中国", store_code: "014", store_name: "稻香村莱西店", fRetailMoney: "144", fNetMoney: "121", fMoney: "121", longitudeField: "120.53", latitudeField: "36.86" },
  //     { area_code: "A001", area_name: "中国", store_code: "015", store_name: "稻香村日照店", fRetailMoney: "155", fNetMoney: "121", fMoney: "121", longitudeField: "119.46", latitudeField: "35.42" },
  //     { area_code: "A001", area_name: "中国", store_code: "016", store_name: "稻香村胶南店", fRetailMoney: "166", fNetMoney: "122", fMoney: "122", longitudeField: "119.97", latitudeField: "35.88" },
  //     { area_code: "A001", area_name: "中国", store_code: "017", store_name: "稻香村烟台店", fRetailMoney: "177", fNetMoney: "128", fMoney: "128", longitudeField: "121.39", latitudeField: "37.52" },
  //     { area_code: "A001", area_name: "中国", store_code: "018", store_name: "稻香村威海店", fRetailMoney: "188", fNetMoney: "125", fMoney: "125", longitudeField: "122.1", latitudeField: "37.5" },
  //     { area_code: "A001", area_name: "中国", store_code: "019", store_name: "稻香村莱州店", fRetailMoney: "189", fNetMoney: "132", fMoney: "132", longitudeField: "119.942327", latitudeField: "37.177017" }
  // ];
//   let data =
//     [
//       { area_code: "A001", area_name: "中国", store_code: "001", store_name: "稻香村鄂尔多斯店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "109.781327", latitudeField: "39.608266" },
//       { area_code: "A001", area_name: "中国", store_code: "002", store_name: "稻香村平度店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "120.38", latitudeField: "37.35" },
//       { area_code: "A001", area_name: "中国", store_code: "003", store_name: "稻香村舟山店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "122.207216", latitudeField: "29.985295" },
//       { area_code: "A001", area_name: "中国", store_code: "004", store_name: "稻香村齐齐哈尔店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "123.97", latitudeField: "47.33" },
//       { area_code: "A001", area_name: "中国", store_code: "005", store_name: "稻香村盐城店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "120.13", latitudeField: "33.38" },
//       { area_code: "A001", area_name: "中国", store_code: "006", store_name: "稻香村赤峰店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "118.87", latitudeField: "42.28" },
//       { area_code: "A001", area_name: "中国", store_code: "007", store_name: "稻香村芜湖店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "118.38", latitudeField: "31.33" },
//       { area_code: "A001", area_name: "中国", store_code: "008", store_name: "稻香村唐山店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "118.02", latitudeField: "39.63" },
//       { area_code: "A001", area_name: "中国", store_code: "009", store_name: "稻香村平顶山店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "113.29", latitudeField: "33.75" },
//       { area_code: "A001", area_name: "中国", store_code: "010", store_name: "稻香村邢台店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "114.48", latitudeField: "37.05" },
//       { area_code: "A001", area_name: "中国", store_code: "011", store_name: "稻香村招远店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "120.38", latitudeField: "37.35" },
//       { area_code: "A001", area_name: "中国", store_code: "012", store_name: "稻香村青岛店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "120.33", latitudeField: "36.07" },
//       { area_code: "A001", area_name: "中国", store_code: "013", store_name: "稻香村乳山店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "121.52", latitudeField: "36.89" },
//       { area_code: "A001", area_name: "中国", store_code: "014", store_name: "稻香村莱西店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "120.53", latitudeField: "36.86" },
//       { area_code: "A001", area_name: "中国", store_code: "015", store_name: "稻香村日照店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "119.46", latitudeField: "35.42" },
//       { area_code: "A001", area_name: "中国", store_code: "016", store_name: "稻香村胶南店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "119.97", latitudeField: "35.88" },
//       { area_code: "A001", area_name: "中国", store_code: "017", store_name: "稻香村烟台店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "121.39", latitudeField: "37.52" },
//       { area_code: "A001", area_name: "中国", store_code: "018", store_name: "稻香村威海店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "122.1", latitudeField: "37.5" },
//       { area_code: "A001", area_name: "中国", store_code: "019", store_name: "稻香村莱州店", fRetailMoney: Math.floor(Math.random() * 1000), fNetMoney: Math.floor(Math.random() * 1000), fMoney: Math.floor(Math.random() * 10000), longitudeField: "119.942327", latitudeField: "37.177017" }
//     ];
//   // let data = [];//次维度
//   // for (var i = 1; i <= 12; i++) {
//   //   data.push({ month: i.toString() + "月", area_code: "A001", area_name: "海淀区", store_code: "001", store_name: "北京稻香村1店", fMoney: parseInt(Math.random() * 100) });
//   //   data.push({ month: i.toString() + "月", area_code: "A001", area_name: "海淀区", store_code: "002", store_name: "北京稻香村2店", fMoney: parseInt(Math.random() * 100) });
//   //   data.push({ month: i.toString() + "月", area_code: "A002", area_name: "昌平区", store_code: "003", store_name: "北京稻香村3店", fMoney: parseInt(Math.random() * 100) });
//   // }
//   // // console.log(" 假的图形报表数据 data = " + JSON.stringify(data));
//   return data;
// }

