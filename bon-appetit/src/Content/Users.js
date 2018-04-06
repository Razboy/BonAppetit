import React from 'react';
import { toast } from 'react-toastify';
import './users.css';

import { withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import * as Info from '../Actions/User';

import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableHeader, TableRow, TableRowColumn } from 'material-ui/Table';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const defaultState = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    active: true,
    _id: null,
    open: false,
    edit: false,
}

class Users extends React.Component {
    constructor() {
        super();
        this.state = {
            ...defaultState,
            search: ""
        }
    this.validator = this.validator.bind(this);
    }

componentDidMount() {
    Info.infoUser();
}  

validator() { 
    try {
    if(this.state.fullName.lenght < 3) throw new Error('Full name must be at least 3 characters');
    if(!emailRegex.test(this.state.email)) throw new Error('Email is invalid')
    if (this.state._id) {
      if (this.state.password.length !== 0 && this.state.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      } 
    } else {
      if(this.state.password.length < 6) throw new Error('Password must be at least 6 characters');
    }
    if(this.state.password !== this.state.confirmPassword) throw new Error('Passwords is invalid')
        
        this.state.edit ?    
        Info.changeUser(this.state._id, this.state.fullName, this.state.email, this.state.password, this.state.active) :
        Info.addUser(this.state.fullName, this.state.email, this.state.password);
            this.setState({open: false});
            this.setState(defaultState);
    }
    catch (e) {
        toast.error(e.message);
    }
}

handleOpen = () => {
    this.setState({open: true});
}

editOpen = (value) => {
    value.confirmPassword = "";
    value.password = "";
    this.setState({...value, edit: true, open: true});
}

handleClose = () => {
    this.setState({...defaultState});
}

userSearch (){
    let searchList = this.props.store.infoUser.filter((value) => {
        let title = value.fullName;
        return title.indexOf(this.state.search) !== -1;
    });
    return searchList
}

toggle = (value) => {
    value.active = !value.active;
    Info.changeUser(value._id, value.fullName, value.email, value.password, value.active);
    toast.success('User has been updated successfully');
}

render() {
    let searchUser = this.state.search.length === 0? this.props.store.infoUser:this.userSearch();
    let userCount = searchUser.length;
    let users = searchUser.map((value, index) => {
        return (
            <TableRow key={index}>
                    <TableRowColumn className="table-subitem">{value.fullName}</TableRowColumn>
                    <TableRowColumn className="table-subitem">{value.email}</TableRowColumn>
                    <TableRowColumn className="table-subitem">
                        <Toggle
                            toggled={value.active}
                            onToggle={() => this.toggle(value)}
                        />
                    </TableRowColumn>
                    <TableRowColumn className="table-subitem">
                        <IconButton
                            children={<i className="material-icons mode-edit">mode_edit</i>} 
                            onClick={() => this.editOpen(value)}
                        />
                    </TableRowColumn>                                                            
            </TableRow>    
        )
    })
    return (
        <div className="users-container">
            <div className="add-user">
                <Dialog
                    title={this.state.edit ? "Edit user" : "Add new user"}
                    actions={[
                        <FlatButton
                            label="Close"
                            onClick={this.handleClose}
                        />,
                        <FlatButton
                            label="Save"
                            onClick={this.validator}
                        />
                    ]}
                    modal={true}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                >
                    <TextField
                        hintText="Enter user full name"
                        floatingLabelText="Full name"
                        fullWidth
                        value={this.state.fullName}
                        onChange={(e) => this.setState({ fullName: e.target.value })}
                    />
                    <TextField
                        hintText="Enter user email"
                        floatingLabelText="Email"
                        fullWidth
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    <TextField
                        hintText="Enter user password"
                        floatingLabelText="Password"
                        type="password"
                        fullWidth
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                    <TextField
                        hintText="Enter user password confirm"
                        floatingLabelText="Confirm password"
                        type="password"
                        fullWidth
                        value={this.state.confirmPassword}
                        onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                    />
                </Dialog>
                <RaisedButton onClick={this.handleOpen} className="raised-button" label="+ ADD NEW USER" primary={true} />
                <TextField 
                    className="users-filter" 
                    value={this.state.search}
                    onChange={(e) => this.setState({search: e.target.value})}
                    hintText="Search"
                    hintStyle={{color: "grey"}}  
                    inputStyle={{color: "#fff"}}                          
                />
            </div>
            <div>
                <Table selectable={false} className="users-table-container">
                    <TableHeader 
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableRowColumn className="table-item">Full name</TableRowColumn>
                            <TableRowColumn className="table-item">Email</TableRowColumn>
                            <TableRowColumn className="table-item">Status</TableRowColumn>
                            <TableRowColumn className="table-item">Actions</TableRowColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {users}
                    </TableBody>
                </Table>
            </div>
            <h4>All {userCount} users are listed</h4>
        </div>
    );
}
}

export default connect(store => ({store: store}))(withRouter(Users))
