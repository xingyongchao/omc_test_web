import React, { Component } from 'react';
import { SwipeAction, Icon } from 'antd-mobile';
import StepperSelf from '../common/Stepper'
import { getPredicateValue, getRoundValue } from 'yxyweb/common/helpers/util';
import SvgIcon from 'SvgIcon';
import PropTypes from 'prop-types';
import ScanBar from '../BasicComponents/scan'
require('src/mobile/styles/globalCss/vouchDetail.css');

export default class VoucherDetail extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    let pathList = window.location.pathname.split('/');
    let pathname = pathList[pathList.length - 1];
    if (pathname === 'MYH04') {
      cb.utils.setStatusBarStyle("dark");
    } else {
      cb.utils.setStatusBarStyle("light");
    }
    this.meta = props.meta;
    this.vm = props.model;
    let { cStyle, containers, childrenField } = this.meta;
    this.model = this.vm.get(childrenField);
    var columns = {};
    if (!cStyle || cStyle == '') {
      cStyle = null;
    } else {
      try {
        this.cStyle = JSON.parse(cStyle);
        if (containers) {
          containers.map(container => {
            if (container.controls) {
              columns[container.cGroupCode] = {};
              container.controls.forEach(column => {
                columns[[container.cGroupCode]][column.cItemName] = column;
              });
            }
          });
        }
      } catch (e) {
        cb.utils.alert('格式化字段，预制错误！', 'error');
      }
      this.state = {
        dataSource: [],
        columns: columns,
        referField: "productsku_cCode",
        hgtNum: 0,
        disabledScan: true
      };
    }
  }

  componentDidMount() {
    if (this.model)
      this.model.addListener(this);

  }

  componentWillMount() {
    if (this.model) {
      this.model.removeListener(this);
    }
  }
  setListenerState(params) {
    let columns = this.state.columns;
    if (params.columnMode === 'local' && columns) {
      for (var attr in columns)
        Object.assign(columns[attr], params.columns[attr]);
      params.columns = columns;
    }
    if (params.rows && params.rows.length) this.setDataSource(params.rows);
    this.setState({ columns: params.columns, readOnly: params.readOnly });
  }
  setDataSource(data) {
    let hgtNum = 0;
    if (data.length > 3) {
      hgtNum = 3;
    } else {
      hgtNum = data.length;
    }
    this.setState({ dataSource: data, hgtNum });
  }
  setReadOnly(readOnly) {
    this.setState({ readOnly });
  }
  //单元格数据改变事件
  setCellValue = (data) => {
    let dataSource = this.state.dataSource;
    if (dataSource[data.rowIndex]) {
      dataSource[data.rowIndex][data.cellName] = data.value;
      this.setState({ dataSource });
    }
  }
  getBaseControl = (columns, rowData, showCaption, index) => {
    let controls = [];
    for (var key in columns) {
      let { cShowCaption, iAlign, cStyle, cItemName } = columns[key];
      let className = 'cell', colControls = [], align = '';
      let itemValue = this.getFormatValue(columns[key], rowData[cItemName], rowData, index);

      if (showCaption && !cb.utils.isEmpty(cShowCaption)) {
        colControls.push(<span className="name">{cShowCaption}</span>);
        colControls.push(<span className="value">{itemValue}</span>);
      } else {
        colControls.push(<span className="value">{itemValue}</span>);
      }

      try {
        if (cStyle == null || cStyle == "") {
          cStyle = null;
        } else {
          cStyle = JSON.parse(cStyle);
        }
      } catch (e) {
        cb.utils.alert('格式化字段，预制错误！', 'error');
      }
      if (cStyle) {
        if (cStyle.className)
          className = className + ' ' + cStyle.className;
      }
      if (iAlign) {
        if (iAlign == 1) align = 'textAlignLeft';
        if (iAlign == 2) align = 'textAlignCenter';
        if (iAlign == 3) align = 'textAlignRight';
      } else {
        align = 'textAlignLeft'
      }
      className = className + ' ' + align;
      controls.push(
        <div className={className}>{colControls}</div>
      )
    }
    return controls
  }
  getFormatValue = (col, value, rowData, rowIndex) => {
    const cControlType = col.cControlType && col.cControlType.trim().toLocaleLowerCase();
    let cStyle = col.cStyle;
    try {
      if (!cStyle || cStyle == '') {
        cStyle = {};
      } else {
        cStyle = JSON.parse(cStyle);
      }
    } catch (e) {
      cb.utils.alert('cStyle，预制错误！', 'error');
    }
    let rangeValue = cStyle.rangeValue;
    switch (cControlType) {
      case 'select':
        if (value == null || value == '')
          return '';
        return typeof value === 'object' ? value.text : value;
      case 'inputnumber':
      case 'money':
      case 'price':
      case 'stepper':
        if (cb.utils.isEmpty(value)) return '';
        if (isNaN(value)) return value;

        if (cControlType == 'stepper' && !this.state.readOnly)
          return <StepperSelf value={parseFloat(value)} min={1} showNumber onChange={(val) => this.onStepChange(val, col.cItemName, rowIndex)} />;
        /*谓词变量支持系统参数*/
        let cFormatData = col.cFormatData;
        try {
          if (!cFormatData || cFormatData == '') {
            cFormatData = {};
          } else {
            cFormatData = JSON.parse(cFormatData);
          }
        } catch (e) {
          cb.utils.alert('数量/金额/单价，预制错误！', 'error');
        }
        let iNumPoint = col.iNumPoint;
        let decimal = cFormatData.decimal ? getPredicateValue(cFormatData.decimal) : null;
        if (cControlType === 'money') {
          if (decimal)
            iNumPoint = decimal;
          else
            iNumPoint = cb.rest.AppContext.option.amountofdecimal;
        }
        else if (cControlType === 'price') {
          if (decimal)
            iNumPoint = decimal;
          else
            iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
        } else {
          if (decimal)
            iNumPoint = decimal;
          else
            if (iNumPoint == null || iNumPoint == '') iNumPoint = null;
        }

        if (!isNaN(iNumPoint) && iNumPoint != null) {
          value = parseFloat(value);
          value = getRoundValue(value, iNumPoint);
        }

        if (cFormatData.after) value = value + cFormatData.after;

        if (cFormatData.prefix) {
          if (cControlType === 'price' || cControlType === 'money')
            value = <div className="moneyText"><span className="prefix">{cFormatData.prefix}</span>{value}</div>
          else
            value = cFormatData.prefix + value;
        }
        return value;
      case 'composite':
        if (rangeValue) {
          rangeValue = rangeValue.split(',');
          value = "";
          rangeValue.map(item => {
            if (!cb.utils.isEmpty(rowData[item]))
              value = value + " " + rowData[item]
          });
        }
        return value
      case "icontext":
        // return <div className={cStyle.className}><Icon type={cStyle.icon} />{value}</div>;
        return <div className={cStyle.className}><SvgIcon type='ying' />{value}</div>
      case "picture":
        if (rangeValue) {
          rangeValue = rangeValue.split(',');
          value = "";
          rangeValue.map(item => {
            if (!cb.utils.isEmpty(rowData[item])) {
              value = value + rowData[item]
            }
          });
          value = "http://7xr7bp.com1.z0.glb.clouddn.com" + value;
        }
        return value != "http://7xr7bp.com1.z0.glb.clouddn.com" ? <img src={value} /> : <div className="default-pic"> <Icon type="icon-morentupiancopy" /></div>
      default:
        return value;
    }
  }
  onStepChange = (val, columnKey, index) => {
    this.model.setCellValue(index, columnKey, val, true);
  }
  loopRow = (rows, columns, rowData, index) => {
    if (!rows) return null;
    let rowControls = [], className = "row";
    rows.map(row => {
      let control;
      if (row.cols)
        control = this.loopCol(row.cols, columns, rowData, index);
      else
        control = this.getBaseControl(columns[row.key], rowData, false, index);
      if (row.className)
        className = 'row  ' + row.className;
      else
        className = 'row  ' + row.key;
      rowControls.push(
        <div className={className}>{control}</div>
      )
    });
    return rowControls;
  }
  loopCol = (cols, columns, rowData, index) => {
    if (!cols) return null;
    let controls = [];
    cols.map(col => {
      let control, className = 'col';
      if (col.rows) {
        control = this.loopRow(col.rows, columns, rowData, index);
      } else {
        control = this.getBaseControl(columns[col.key], rowData, false, index);
      }
      if (col.className)
        className = 'col  ' + col.className;
      else
        className = 'col  ' + col.key;
      controls.push(
        <div className={className}>{control}</div>
      )
    });
    return controls;
  }

  getRowTools = (index) => {
    let toolBars = [{
      text: ' ',
      onPress: () => this.onClick(index, 'edit'),
      style: { backgroundColor: '#ddd', color: 'white' },
      className: "inrow-action-edit"
    }];
    let { cStyle, containers, childrenField } = this.meta;
    containers.map((item) => {
      if (item.cGroupCode === 'DetailRowToolbar_m') {
        item.controls && item.controls.map((citem) => {
          toolBars.push({
            text: ' ',
            onPress: () => this.btnAction(citem, index),
            style: { backgroundColor: '#ddd', color: 'white' },
            className: "inrow-action-" + (citem.icon || 'delete')
          });
        });
      }
    })
    return toolBars;
  }

  btnAction = (item, index) => {
    if (item.cItemName === 'scan') {
      this.setState({ disabledScan: false });
      return;
    }
    let params = { index: index, cItemName: item.cItemName }
    if (item.cItemName === 'addProduct') {
      let pathList = window.location.pathname.split('/');
      let pathname = pathList[pathList.length - 1];
      this.context.router.history.push(`/voucherRefer/${pathname}/${this.state.referField}/${this.meta.childrenField}`);
      this.model.appendRow({});
    } else {
      this.props.model.get(item.cItemName).fireEvent('click', params)
    }
  }

  getTools(hasData) {
    let tools = [];
    let { dataSource } = this.state;
    let { cStyle, containers, childrenField } = this.meta;
    containers.map((item) => {
      if (item.cGroupCode === 'DetailToolbar_m') {
        item.controls && item.controls.map((citem) => {
          tools.push(
            hasData ?
              <div className="DetailToolbar_m">
                <SvgIcon type={citem.icon ? citem.icon : "review"} style={{ width: '0.42rem', height: '0.42rem' }}
                  onClick={() => this.btnAction(citem, dataSource && dataSource.length)}
                />
              </div>
              :
              <div className="DetailToolbar_m title_button">
                <SvgIcon type={citem.icon ? citem.icon : "review"} style={{ width: '0.42rem', height: '0.42rem' }}
                  onClick={() => this.btnAction(citem, dataSource && dataSource.length)}
                />
                <span>{citem.cShowCaption}</span>
              </div>
          )
        });
      } else {

      }
    })
    return tools;
  }

  scanBarBtn = (controls) => {
    let buttons = [], models = [];
    if (this.headerToolbar) {
      this.headerToolbar.map(control => {
        let model = this.props.viewModel.get(control.cItemName);
        models.push(model);
        buttons.push({
          icon: <Button model={model} icon={<SvgIcon type={control.icon ? control.icon : "review"} />} onVisibleChange={visible => this.handleHeaderVisibleChange(control.cItemName, visible)} />,
          title: control.cShowCaption,
        } // <Button model={model} onVisibleChange={visible => this.handleHeaderVisibleChange(control.cItemName, visible)} />
          // <span className='print_cls' onClick={() => { model.fireEvent('click') }}>{control.cShowCaption}</span>
        )
      });
    }
    ActionSheet.showShareActionSheetWithOptions({
      options: buttons,
    },
      (buttonIndex) => {
        if (models[buttonIndex])
          models[buttonIndex].fireEvent('click');
      });
  }

  getRowControl = (rowData, columns, index) => {
    let controls = [];
    let mode = this.props.model && this.props.model.getParams().mode;
    if (!this.cStyle) {
      for (var key in columns) {
        controls.push(
          <div className="row">
            <span className="value">{rowData[key]}</span>
          </div>
        )
      }
    } else {
      this.cStyle.map(row => {
        let rowControl = [];
        if (row.cols) {
          rowControl = this.loopCol(row.cols, columns, rowData, index);
        } else {
          rowControl = this.getBaseControl(columns[row.key], rowData, true, index);
        }
        controls.push(<div className="row">{rowControl}</div>);
      });
    }
    return (
      <div onClick={() => { this.state.readOnly ? this.onClick(index) : '' }} className="voucherdetail-row" style={{ height: "2.2rem" }}>
        {mode !== 'browse' ?
          <SwipeAction style={{ backgroundColor: 'gray' }}
            autoClose
            right={this.getRowTools(index)}>{controls}</SwipeAction> : controls
        }
      </div>
    )
  }

  onClick = (index, action, item) => {
    if (this.props.model.getParams().mode === 'edit' && action !== 'edit') {
      return;
    }
    this.model.setFocusedRowIndex(index);
    let pathList = window.location.pathname.split('/');
    let pathname = pathList[pathList.length - 1];
    if (action) {
      this.context.router.history.push({ pathname: `/itemInfo/${index}/${pathname}`, state: { action, item } });
    } else {
      this.context.router.history.push(`/itemInfo/${index}/${pathname}`);
    }
  }

  getDetailControl = () => {
    const { dataSource, columns } = this.state;
    let controls = [];
    dataSource.map((data, index) => {
      let control = this.getRowControl(data, columns, index);
      controls.push(control);
    });
    return controls;
  }
  onCloseScan = () => {
    this.setState({ disabledScan: true });
  }

  render() {
    const { disabledScan } = this.state;
    let control = this.getDetailControl();
    let hgtNum = parseInt(this.state.hgtNum);
    let hasData = hgtNum > 0 ? true : false;
    let mode = this.props.model && this.props.model.getParams().mode;
    return (
      <div className="voucher-body-mobile">
        <div className="VoucherDetail" style={{ height: (hgtNum * 2.2) + 'rem' }}>
          {
            mode !== 'browse' &&
            <div className="voucherDetail-title">
              {hasData ? this.meta.cName : null}
              <div className={hasData ? 'right-button' : 'center-button'}>
                {this.getTools(hasData)}
              </div>
            </div>
          }
          {control}
        </div>
        <div className="more" style={{ display: (control.length > 3 ? 'block' : 'none') }} onClick={() => { this.setState({ hgtNum: (hgtNum === control.length ? 3 : control.length) }) }}>
          <p>{hgtNum === control.length ? (
            <span>收起<i className="icon icon-shouqi"></i></span>
          ) : (
              <span>展开剩余{control.length - 3}件商品<i className="icon icon-zhakai"></i></span>
            )} </p>
        </div>
        {!disabledScan && <ScanBar vm={this.vm} close={this.onCloseScan} />}
      </div>
    )
  }

}
