import React, { Component } from 'react';
import Keyboard from '../keyboard';
import '../keyboard/Keyboard.css';
import { Input } from 'antd';

export default class keyboardInput extends Component {
  render() {
    return (
      <div className="keyboard-box">
        {this.props.prefix}
        <Keyboard
          enabled
          required
          type={this.props.type}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          name={this.props.name}
          id={this.props.id}
          disabled={this.props.disabled}
          inputClassName={this.props.inputClassName}
          keyboardClassName={this.props.keyboardClassName}
          placeholder={this.props.placeholder}
          defaultKeyboard='us'
          isFirstLetterUppercase={false}
          isDraggable={false} // optional, default is `true`
          readOnly={this.props.readOnly} // optional
          opacity={1} // optional
        />
      </div>
    );
  }
}

export class KeyboardInput1 extends Component {
  handleFocus = (e) => {
    if (this.props.onFocus)
      this.props.onFocus(e);
    if (this.oskOpen) return;
    this.oskOpen = true;
    cb.electron.sendOrder('oskOpen');
  }
  handleBlur = (e) => {
    if (this.props.onBlur)
      this.props.onBlur(e);
    this.oskOpen = false;
    cb.electron.sendOrder('oskClose');
  }
  render() {
    const props = { ...this.props };
    props.onFocus = this.handleFocus;
    props.onBlur = this.handleBlur;
    return <Input {...props} />
  }
}
