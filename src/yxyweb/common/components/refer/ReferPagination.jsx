import React, { Component } from 'react';
import { Icon } from 'antd';

export default class ReferPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        total: 1,
        current: 1,
        pageSize: 1,
      }
    };
    this.totalPage = 1;
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  //设置分页
  setPageInfo = (paginationlist) => {
    var pageinfo = this.state.pagination;
    pageinfo.total = paginationlist.recordCount
    pageinfo.current = paginationlist.pageIndex;
    pageinfo.pageSize = paginationlist.pageSize;
    this.totalPage = Math.ceil(pageinfo.total / pageinfo.pageSize);
    this.setState({
      pagination: pageinfo
    });
  }
  onPaginationClick = (e, type) => {
    let pageIndex = this.state.pagination.current;
    if (type == 'first') pageIndex = 1;
    if (type == 'pre') pageIndex = pageIndex - 1;
    if (type == 'next') pageIndex = pageIndex + 1;
    if (type == 'last') pageIndex = this.totalPage;
    this.props.model.setPageIndex(pageIndex);
  }
  render() {
    const { current, total } = this.state.pagination;
    let preStyle = {}, nextStyle = {};
    if (total == 0) return null;
    if (current == 1)
      preStyle.pointerEvents = 'none';
    if (current == this.totalPage)
      nextStyle.pointerEvents = 'none';
    return (
      <div className="refer-pagination">
        <span className={current == 1 ? "first disabled" : "first"} style={preStyle}
          onClick={e => this.onPaginationClick(e, 'first')}>
          <Icon type="double-left" />
        </span>
        <span className={current == 1 ? "pre disabled" : "pre"} style={preStyle}
          onClick={e => this.onPaginationClick(e, 'pre')}>
          <Icon type="left" />
        </ span>
        <span className="info">
          {current}/{this.totalPage}
        </span>
        <span className={current == this.totalPage ? "next disabled" : "next"} style={nextStyle}
          onClick={e => this.onPaginationClick(e, 'next')}>
          <Icon type="right" />
        </ span>
        <span className={current == this.totalPage ? "last disabled" : "last"} style={nextStyle}
          onClick={e => this.onPaginationClick(e, 'last')}>
          <Icon type="double-right" />
        </ span>
      </div>
    )
  }
}
