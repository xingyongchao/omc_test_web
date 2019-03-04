import React, { Component } from 'react';

export default class Sign extends Component {
  constructor(props) {
    super(props);
    if (!props.controls || props.controls.length !== 1) return;
    this.state = {

    };
    this.model = props.viewModel.get(props.controls[0].cItemName);
  }
  componentDidMount() {
    this.model.addListener(this);
  }
  setListenerState(params) {
    this.setValue(params.value);
  }
  setValue(value) {
    if (value && value.icon)
      this.setState({ image: value.icon });
  }
  render() {
    const { controls } = this.props;
    if (!controls || controls.length !== 1)
      return null;
    const { image } = this.state;
    if (!image)
      return null;
    return (
      <span className={`sign-status-${image}`} />
    );
  }
}
