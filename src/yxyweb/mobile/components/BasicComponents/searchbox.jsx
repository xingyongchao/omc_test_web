import React, { Component } from 'react';
import { List, SearchBar,Icon } from 'antd-mobile';
import PropTypes from 'prop-types';

export default class SearchBoxControl extends React.Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        if (this.props.model)
            this.props.model.addListener(this);
    }
    componentWillUnmount() {
        if (this.props.model)
            this.props.model.removeListener(this);
    }

    onInputChange = (val) => {
        this.setState({ value: val });
    }

    onCancel=(obj,type)=>{
        if(!type){
            if(obj.props.onCancel){
                obj.props.onCancel();
            }
        }
        obj.setState({ value: '' });
        if(!type){
            obj.searchEvent("1");
        }
    }

    onSearch=()=>{
        this.searchEvent();
    }

    searchEvent=(cval)=>{
        const { parentModel, model,filterModel} = this.props;
        if(model)
            this.props.model.setValue(cval?"":this.state.value, true);
        if (parentModel && model && filterModel)
            filterModel.fireEvent('searchEvent', { model: parentModel, solutionid: this.state.current });
            filterModel.get('search').fireEvent('click', { model: parentModel, solutionid: this.state.current });
    }

    goBack = () => {
        this.context.router.history.goBack()
        if(this.props.goBack) this.props.goBack();
    }

    render() {
        const { value } = this.state;
        const self=this;
        return (
            <List>
                {/* <i onClick={this.goBack} className="icon icon-fanhui"></i> */}
                <SearchBar ref={'cusSearchBarRef'}  value={value} placeholder={this.props.placeholder} onSubmit={this.onSearch } onChange={this.onInputChange} onClear={()=>this.onCancel(self,'cancel')} onCancel={()=>this.onCancel(self)}/>
                {this.props.rightContent}
            </List>
        );
    }
}
