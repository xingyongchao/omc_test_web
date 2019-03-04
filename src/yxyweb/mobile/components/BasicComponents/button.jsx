import React from 'react';
import { debounce } from 'lodash';
import classnames from 'classnames';

export default class ButtonControl extends React.Component {
  constructor(props) {
    super(props);
    const { cStyle, cParameter } = props;
    let config = null;
    if (cStyle || cParameter) {
      try {
        config = JSON.parse(cStyle || cParameter);
      } catch (e) {
        config = {};
      }
    }
    this.state = Object.assign({
      disabled: this.props.disabled,
      visible: true,
      value: this.props.value,
      type: this.props.type,
      size: 'default',
      icon: this.props.icon,
      shape: this.props.shape,
      className: this.props.className,
      onClick: this.props.onClick
    }, config);
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }

  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  setListenerState(params) {
    this.setState(params);
    if (this.props.onVisibleChange) {
      let visible = params.visible;
      if (visible == null)
        visible = true;
      this.props.onVisibleChange(visible);
    }
  }
  onClick = () => {
    if (this.props.model)
      this.props.model.fireEvent('click');
  }
  setVisible(visible) {
    this.setState({ visible });
    if (this.props.onVisibleChange)
      this.props.onVisibleChange(visible);
  }

  render() {
    let style = this.state.visible ? {} : { display: "none" };
    const onClick = this.props.delay ? debounce(this.onClick, 300) : this.onClick;
    let className = "button-mobile  " + classnames(this.state.className, this.state.classname);
    if (this.state.cControlType == 'primarybutton')
      className = className + ' ' + 'primary-button';
    if (this.state.disabled)
      className = className + ' ' + 'disabled-button';
    return (
      <div style={style} className={className} onClick={onClick}>{this.state.cShowCaption}</div>
    );

  }
}
