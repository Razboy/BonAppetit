import React from 'react';
import './reports.css';
import Filter from './Filter';

import { Table, TableBody, TableHeader, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import { ToastContainer, toast } from 'react-toastify';

import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import * as Info from '../../Actions/Report';
import * as InfoUser from '../../Actions/User';
import * as Company from '../../Actions/Action';
import {host} from '../../Actions/Host';
import dateFormat from 'dateformat';

const defaultState = {
    name: '',
    image: '',
    createdAt: '',
    date: '',
    rows: [],
    approved: ''
}

class Reports extends React.Component {
    state = {
        ...defaultState,
        open: false
    }

async componentDidMount() {
    await Info.infoReport();
    InfoUser.infoUser();
    Company.infoCompany();
    if (this.props.location.state !== undefined) {
        let id = this.props.location.state;
        let report = this.props.report.find(value => {
            return value._id === id
        });
        this.setState({...report, open: true});
    }
}

userName(user_id) {
    let user = this.props.store.infoUser.find(value => {
        return value._id === user_id
    });
    if (user === undefined) {
        return null;
    } else {
        return user.fullName;
    }
}

snackbarSelect(selectedRows) {
    if (selectedRows === 'all') {
      this.setState({rows: this.props.report.map(value => value._id)})
    } else if (selectedRows === 'none' || selectedRows.length === 0) {
      this.setState({rows: []})
    } else {
      let reports = this.props.report.filter((report, index) => selectedRows.indexOf(index) > -1)
      this.setState({rows: reports.map(report => report._id)})
    }
}

handleOpen = (id, e = null) => {
    if (e) e.stopPropagation();
    let report = this.props.report.find(report => report._id === id);
    this.setState({...report, open: true, name: this.userName(report.user_id)})
};

handleClose = () => {
    this.setState({open: false});
    this.props.history.push('/Panel/Reports')
};

onPaid(_id, category_id, comment, approved) {
    approved = !approved;
    Info.editReport(_id, category_id, comment, approved );
    this.setState({approved: true});
    Info.infoReport();
    toast.success("Report is paid");
}

render() {
    let text = this.state.rows.length + " reports where selected for the amount of " + this.state.rows.length * this.props.company.orderValue
    let filter = this.props.filter.length === 0 ? this.props.report: this.props.filter
    let reports = filter.map((value, index) => {
        return (
            <TableRow 
                key={index}
                selected={this.state.rows.indexOf(value._id) > -1}>
                    <TableRowColumn style={{width:"110px"}} className="table-subitem">{dateFormat(value.date, "dd.mm.yyyy h:MM")}</TableRowColumn>
                    <TableRowColumn className="table-subitem">{this.userName(value.user_id)}</TableRowColumn>
                    <TableRowColumn className="table-subitem">{value.approved ? "Paid" : "Not paid"}</TableRowColumn>
                    <TableRowColumn className="table-subitem">
                        <FlatButton style={{color: '#fff'}} onClick={this.handleOpen.bind(this,value._id)} label="DETAILS"/>
                    </TableRowColumn>                                                            
            </TableRow>    
        )
    })
    return (
        <div className="reports-main-container">
                <Table 
                    multiSelectable={true} 
                    className="reports-table-container"
                    onRowSelection={this.snackbarSelect.bind(this)}>
                    <TableHeader 
                        displaySelectAll={true}
                        adjustForCheckbox={true}>
                        <TableRow>
                            <TableRowColumn style={{width:"110px"}} className="table-item">Date</TableRowColumn>
                            <TableRowColumn className="table-item">User</TableRowColumn>
                            <TableRowColumn className="table-item">Status</TableRowColumn>
                            <TableRowColumn className="table-item">Details</TableRowColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={true}>
                        {reports}
                    </TableBody>
                </Table>
                <Snackbar
                    open={this.state.rows.length > 0}
                    message={text}
                    action="Paid"
                    onActionClick={() =>this.onPaid(this.state.rows, this.state.category_id, this.state.comment, false)}               
                />

                <Dialog
                    title="Report details"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={false}
                    autoDetectWindowHeight={false}
                    contentClassName="report-dialog"
                    actions={[
                        <FlatButton
                            label="Close"
                            onClick={this.handleClose}
                        />,
                        <FlatButton
                            label="Paid"
                            primary={true}
                            disabled={this.state.approved}
                            keyboardFocused={true}
                            onClick={() => this.onPaid(this.state._id, this.state.category_id, this.state.comment, this.state.approved)}  
                        />
                    ]}>
                    <div className="report-dialog">
                        <img alt='logo' src={host+`/images/${this.state.image}`}/>
                        <List>
                            <Subheader inset={true}>Infomartion</Subheader>
                            <ListItem
                                leftIcon={<i className="material-icons">person</i>}
                                primaryText={this.state.name}
                                secondaryText="User"
                            />
                            <ListItem
                                leftIcon={<i className="material-icons">date_range</i>}
                                primaryText={dateFormat(this.state.date, "yyyy-mm-dd HH:MM")}
                                secondaryText="Was created at"
                            />
                            <ListItem
                                leftIcon={<i className="material-icons">cloud_upload</i>}
                                primaryText={dateFormat(this.state.createdAt, "yyyy-mm-dd HH:MM")}
                                secondaryText="Was loaded at"
                            />
                            <ListItem
                                leftIcon={<i className="material-icons">check</i>}
                                primaryText={this.state.approved ? "Paid" : "Not paid"}
                                secondaryText="Status of report"
                            />
                        </List>
                    </div>  
                </Dialog>
                <Filter />
        </div>
    );
  }
}

export default connect(store => ({
    store: store, 
    report: store.infoReport, 
    company: store.infoCompany, 
    filter: store.list}))(withRouter(Reports))
