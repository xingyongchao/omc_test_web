import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';


export default class InputSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
            placeholder: props.placeholder || '',
            type: props.type || 'text',
            size: props.size || 'default',
            disabled: props.disabled || false,
            focused: false,
            mouseEnter: false,
            isBtn: props.isBtn || false,
            showBtn: props.showBtn,
            id: props.id || '',
            btnText: props.btnText || '搜索',
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if (this.state.value != nextProps.value || this.state.disabled != nextProps.disabled) {
            this.setState({ value: nextProps.value, disabled: nextProps.disabled });
        }
    }
    onFocus = () => {
        this.setState({ focused: true });
        if (this.props.onFocus)
            this.props.onFocus();
    }
    onBlur = () => {
        if (this.props.onBlur)
            this.props.onBlur();
    }
    handleBodyClick = (e) => {
        if (this.contains(this.refs.input_search, e.target)) return;

        if (e.target && cb.dom(e.target).parents('div.inputsearch').length) return;
        document.body.removeEventListener('click', this.handleBodyClick);
        this.setState({ focused: false });
    }
    onMouseEnter = () => {
        this.setState({ mouseEnter: true });
    }
    onMouseLeave = () => {
        this.setState({ mouseEnter: false });
    }
    contains(elem, target) {
        if (!elem) return true;
        if (elem === target)
            return true;
        if (!elem.children || !elem.children.length)
            return false;
        for (var i = 0, len = elem.children.length; i < len; i++) {
            if (this.contains(elem.children[i], target))
                return true;
        }
        return false;
    }
    onDelete = (e) => {
        if (this.props.onDelete) this.props.onDelete(e);
        this.refs.input_search.focus();
    }
    render() {
        let { value, focused, placeholder, disabled, mouseEnter, isBtn, btnText, id, showBtn } = this.state;
        document.body.addEventListener('click', this.handleBodyClick);
        showBtn = (showBtn == null || showBtn == undefined) ? true : showBtn;
        let btnControl = (
            isBtn ?
                <Button onClick={this.props.onSearch} className={value == "" ? "has-btn" : "has-btn has-btn-red"}>{btnText}</Button>
                :
                <i onClick={this.props.onSearch} className="anticon anticon-search ant-input-search-icon"></i>
        )
        return (
            < div className="inputsearch">
                <span className="ant-input-search ant-input-affix-wrapper" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} >
                    <Input ref='input_search' value={value} id={id}
                        onChange={this.props.onChange}
                        onPressEnter={this.props.onPressEnter}
                        placeholder={placeholder} onFocus={this.onFocus} onBlur={this.onBlur} disabled={disabled} />
                    <span className="ant-input-suffix">

                        {
                            value && value != '' && (focused || mouseEnter) ?
                                <i onClick={this.onDelete} className="anticon anticon-shurukuangshanchu"></i>
                                :
                                ''
                        }
                        {
                            showBtn ?
                                btnControl
                                :
                                ""
                        }
                    </span>
                </span>
            </div>

        );
    }
}
