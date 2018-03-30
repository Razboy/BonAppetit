import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Panelstyle.css';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as Info from '../Actions/Action';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    this.handleOpen = this.handleOpen.bind(this);
    this.validator = this.validator.bind(this);
    }

componentDidMount() {
    Info.infoCompany()
}

validator() {
    try {
        if (this.state.name.length <= 3) throw new Error('Company name must be at least 3 characters');
        if (this.state.description.length < 16) throw new Error('Company description must be at least 16 characters');
        if (!emailRegex.test(this.state.ownerEmail)) throw new Error('Email is invalid');
        if (this.state.ownerPassword.length < 6) throw new Error('Password must be at least 6 characters');
        if (isNaN(this.state.orderValue)) throw new Error('Report value is invalid. Must be a number');

        let company = {...this.state};
        Info.changeCompany(company);
        this.setState({open: false});
    }
    catch (e) {
        toast.error(e.message);
    }
}

handleOpen = () => {
    let info = this.props.store.companyInfo;
    info.ownerPassword = "";
    this.setState({...info, open: true});
};

handleClose = () => {
    this.setState({
        open:false
    });
};

logout() {
    localStorage.clear();
    this.props.history.push('/');
}

render() {
    return (
        <div className="header-container">
            <Dialog
                title="Settings"
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
                    hintText="Your company name"
                    floatingLabelText="Company name"
                    fullWidth
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                />

                <TextField
                    hintText="A few words about your company"
                    floatingLabelText="Company description"
                    multiLine={true}
                    multiLine={true}
                    rows={2}
                    rowsMax={4}
                    value={this.state.description}
                    onChange={e => this.setState({ description: e.target.value })}
                />

                <TextField
                    hintText="Your email"
                    floatingLabelText="E-mail"
                    fullWidth
                    value={this.state.ownerEmail}
                    onChange={e => this.setState({ ownerEmail: e.target.value })}
                />

                <TextField
                    hintText="Your password"
                    floatingLabelText="Password"
                    fullWidth
                    type="password"
                    value={this.state.ownerPassword}
                    onChange={e => this.setState({ ownerPassword: e.target.value })}
                />

                <TextField
                    hintText="Yours value per report"
                    floatingLabelText="Report value"
                    fullWidth
                    value={this.state.orderValue}
                    onChange={e => this.setState({ orderValue: e.target.value })}
                />

                <SelectField
                    fullWidth
                    floatingLabelText="Photo resolution"
                    value={this.state.imageQuality}
                    onChange={(event, index, value) => this.setState({ imageQuality: value })}
                >
                    <MenuItem value='low' primaryText="Low"/>
                    <MenuItem value='medium' primaryText="Medium"/>
                    <MenuItem value='high' primaryText="High"/>
                </SelectField>

                <SelectField
                    fullWidth
                    floatingLabelText="Language"
                    value={this.state.language}
                    onChange={(event, index, value) => this.setState({language: value})}
                    >
                    <MenuItem value='Enaglish' primaryText="English"/>
                    <MenuItem value='Русский' disabled primaryText="Русский" disabled />
                </SelectField>
            </Dialog>

            <ul className="header-bar">
                <li>
                    <div onClick={() => this.handleOpen()}>
                        <span>
                            {this.props.store.infoCompany.name}
                        </span>
                        <i className="material-icons">settings</i>
                    </div>
                </li>
                <li>
                    <div onClick={() => this.logout()}>
                        <i className="material-icons">exit_to_app</i>
                    </div>
                </li>
            </ul>
            <ToastContainer/>
        </div>
    )
}
}

export default connect(store => ({store: store}))(withRouter(Header))


