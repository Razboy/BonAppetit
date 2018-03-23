import React from 'react';
import {Link} from 'react-router-dom';
import './users.css';

import {NavLink, withRouter} from 'react-router-dom';
import {connect} from "react-redux";

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class Users extends React.Component {
    
render() {
    return (
        <div className="users-container">
            <div className="add-user">
                <RaisedButton className="raised-button" label="+ ADD NEW USER" primary={true} />
                <TextField 
                    className="users-filter" 
                    hintText="Search"
                    hintStyle={{color: "grey"}}  
                    inputStyle={{color: "#fff"}}                          
                />
            </div>
            <div className="users-table-container">
                <TableRow>
                    <TableRowColumn>Full name</TableRowColumn>
                    <TableRowColumn>Email</TableRowColumn>
                    <TableRowColumn>Status</TableRowColumn>
                    <TableRowColumn>Actions</TableRowColumn>
                </TableRow>
            </div>
        </div>
    );
}
}

export default Users;
