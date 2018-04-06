import React from 'react';
import {connect} from "react-redux";
import './reports.css';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import * as filter from '../Actions/ActionFilter';

class Filter extends React.Component {
    state = {
        id: 'all',
        dateFrom: null,
        dateTo: null
    }

async componentDidMount() {
    await filter.reportFilter(this.props.report)
}

searchReports() {
    if (this.state.id === "all") {
        filter.reportFilter(this.props.report);
    } else {
        let rList = this.props.report.filter((val) => {
            return val.user_id === this.state.id;
        });
        filter.reportFilter(rList);
    }
}

clear() {
    this.setState({id: "all", dateFrom: null, dateTo: null});
    filter.reportFilter([]);
}

handleChange = (event, index, value) => this.setState({id:value});

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
                value={this.state.id}
                fullWidth
                onChange={this.handleChange}                
            >
                <MenuItem value={'all'} primaryText="All users" />
                {filter}
            </SelectField>
            <div>
                <DatePicker 
                    hintText="Date from" 
                    floatingLabelText="Date from"
                    onChange={(a,date) => this.setState({dateFrom:date})}
                    value={this.state.dateFrom}
                    mode="landscape" 
                    fullWidth
                />
                <DatePicker 
                    hintText="Date to"
                    floatingLabelText="Date to" 
                    onChange={(a,date) => this.setState({dateTo:date})}
                    value={this.state.dateTo}
                    mode="landscape"
                    fullWidth 
                />
            </div>
            <div className="buttons">
                <RaisedButton 
                    label="REFRESH" 
                    fullWidth
                    primary={true}
                    onClick={() => this.searchReports()}
                />
                <FlatButton 
                    label="CLEAR"
                    fullWidth
                    onClick={() => this.clear()}
                />
            </div>
        </div>
        
    )
}     
}

export default connect(store => ({store: store, report: store.infoReport, users: store.infoUser, filter: store.filter}))(Filter)
