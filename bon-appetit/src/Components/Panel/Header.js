import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { StyleSheet, css } from 'aphrodite';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as Info from '../../Actions/Action';

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
        if (this.state.ownerPassword.length >=1 && this.state.ownerPassword.length < 6) throw new Error('Password must be at least 6 characters');        
        if (isNaN(this.state.orderValue)) throw new Error('Report value is invalid. Must be a number');

        let company = {...this.state};
        Info.changeCompany(company);
        toast.success("Company data has been changed");
        this.setState({open: false});
    }
    catch (e) {
        toast.error(e.message);
    }
}

handleOpen = () => {
    let info = this.props.company;
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
        <div className={css(styles.header)}>
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
                    fullWidth
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
                    <MenuItem value='Русский' disabled primaryText="Русский"/>
                </SelectField>
            </Dialog>

            <ul className={css(styles.headerBar)}>
                <li className={css(styles.item)}>
                    <div className={css(styles.itemArea)} onClick={() => this.handleOpen()}>
                        <span className={css(styles.name)}>
                            {this.props.company.name}
                        </span>
                        <i className="material-icons">settings</i>
                    </div>
                </li>
                <li className={css(styles.item)}>
                    <div className={css(styles.itemArea)} onClick={() => this.logout()}>
                        <i className="material-icons">exit_to_app</i>
                    </div>
                </li>
            </ul>
            <ToastContainer/>
        </div>
    )
}
}

const styles = StyleSheet.create({
    header: {
        background: '#313339',
        height: 50,
        width: 800
    },
    headerBar: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        listStyle: 'none',
        margin: 0 
    },
    item: {
        display: 'block',
        alignItems: 'center'
    },
    itemArea: {
        display: 'flex',
        alignItems: 'center',
        height: 20,
        padding: 15,
        color: '#98999C',
        textDecoration: 'none',
        ':hover': {
            background: '#3c3f46',
            color: '#58d4c2',
            cursor: 'pointer'
        }
    },
    name: {
        marginRight: 10
    }
})

export default connect(store => ({store: store, company: store.infoCompany}))(withRouter(Header))


