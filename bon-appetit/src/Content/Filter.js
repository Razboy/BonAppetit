import React from 'react';
import {connect} from "react-redux";
import './reports.css';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Filter extends React.Component {
    state = {
        value: 1
    }

handleChange = (event, index, value) => this.setState({value});

render() {
    let filter = this.props.users.map((value, index) => {
        return (
            <MenuItem key={index} value={value._id} primaryText={value.fullName}/>
        )
    }
) 
    return (
        <div className="filter-bar">
                <h2>Filters</h2>
                <SelectField
                    floatingLabelText="User"
                    value={this.state.value}
                    fullWidth
                    onChange={this.handleChange}                
                >
                    <MenuItem value={1} primaryText="All users" />
                    {filter}
                </SelectField>
            </div>
    )
}     
}

export default connect(store => ({store: store, report: store.infoReport, users: store.infoUser}))(Filter)
