import React from 'react';
import {connect} from "react-redux";
import './reports.css';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import * as filter from '../../Actions/ActionFilter';

class Filter extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                id: 'all',
                dateFrom: null,
                dateTo: null
            }
    this.searchReports = this.searchReports.bind(this)
    this.defaultInfo = this.defaultInfo.bind(this)
}

async componentDidMount() {
    await filter.reportFilter(this.props.report)
}

searchReports() {
    if (this.props.reportFilter.user_id === "all") {
        filter.reportFilter(this.props.report);
    } else {
        let rList = this.props.report.filter((val) => {
            return val.user_id === this.props.reportFilter.user_id;
        });
        filter.reportFilter(rList);
    }
}

clear() {
    this.setState({id: "all", dateFrom: null, dateTo: null});
    filter.reportFilter([]);
}

handleChange = (event, index, value) => this.setState({id:value});

userName(user_id) {
    let user = this.props.users.find(value => {
        return value._id === user_id
    });
    if (user === undefined) {
        return null;
    } else {
        return user.fullName;
    }
}

userEmail(user_id) {
    let user = this.props.users.find(value => {
        return value._id === user_id
    });
    if (user === undefined) {
        return null;
    } else {
        return user.email;
    }
}

defaultInfo(){
    filter.defaultInfo();
    filter.reportFilter(this.props.report);
}

selectedUser(event, key, user) {
    filter.user(user)
}

async onExport(type){
    await filter.onExport(type);
}

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
                value={this.props.reportFilter.user_id}                
                fullWidth
                onChange={this.selectedUser.bind(this)}            
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
            <div className="filters">
                <FlatButton 
                    label="EXPORT TO XLS" 
                    fullWidth
                    primary={true}
                    icon={<i className="material-icons">file_download</i>}
                    onClick={this.onExport.bind(this, 'xls')}
                />
                <FlatButton 
                    label="EXPORT TO CSV" 
                    fullWidth
                    primary={true}
                    icon={<i className="material-icons">file_download</i>} 
                    onClick={this.onExport.bind(this, 'csv')}
                />
            </div>
        </div>
        
    )
}     
}

export default connect(store => ({store: store, report: store.infoReport, users: store.infoUser, reportFilter: store.filter}))(Filter)
