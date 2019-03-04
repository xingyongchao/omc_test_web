import React, { Component } from 'react';
import LeftContent from './LeftContent';
import RightContent from './RightContent';

export default class MainContent extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <div className="LeftContent">
          <LeftContent />
        </div>
        <div className="RightContent">
          <RightContent />
        </div>
      </div>
    );
  }
}
