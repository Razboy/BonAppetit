import React from 'react';
import {Link} from 'react-router-dom';
import './dashboard.css';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import LinearProgress from 'material-ui/LinearProgress';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import dateFormat from 'dateformat';

import {NavLink, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import * as Info from '../Actions/User';

const ChartData = [
    {name: '01.01.18', paid: 15, total: 16},
    {name: '02.01.18', paid: 20, total: 24},
    {name: '03.01.18', paid: 15, total: 16},
    {name: '04.01.18', paid: 1, total: 2},
    {name: '05.01.18', paid: 15, total: 16},
    {name: '06.01.18', paid: 20, total: 24},
    {name: '07.01.18', paid: 15, total: 16},
];

class Dashboard extends React.Component {

componentDidMount() {
    Info.infoDashboard();
    Info.infoUser();
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

render() {
    let totalSpace = this.props.store.companyInfo.totalSpace !== undefined ?
        this.props.store.companyInfo.totalSpace : 0 ;

    let useSpace = this.props.store.companyInfo.useSpace !== undefined ?
        this.props.store.companyInfo.useSpace : 0 ;
    
    let percent = useSpace*100/totalSpace !== undefined ?
        useSpace*100/totalSpace : 0;
    
    let userCount = this.props.store.infoDashboard.userCount;
    
    let reportsCount = this.props.store.infoDashboard.reportCount;

    let reports = this.props.store.infoDashboard.lastFiveReports !== undefined ? 
        this.props.store.infoDashboard.lastFiveReports.map((value, index) =>{
        return(
            <ListItem
                className="list-item"
                key={index}
                primaryText={this.userName(value.user_id) + " at " + dateFormat(value.date, "dd-mm-yyyy, h:MM:ss")}
                rightIcon={<i className="material-icons">inbox</i>}
                leftAvatar={<Avatar src={`http://web.bidon-tech.com:65059/images/${value.image}`} />}
            />    
        )}):null;

    return (
        <div className="dashboard-container">
            <div className="diagram">
                <h2>Overview</h2>
                <AreaChart className="areachart" width={750} height={180} data={ChartData}
                    margin={{top: 15, right: 10, left: 0, bottom: 0}}>
                    <XAxis stroke="#fff" dataKey="name"/>
                    <YAxis stroke="#fff"/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='total' stroke='#98999C' fill='#222325' fillOpacity={0.5}/>
                    <Area type='monotone' dataKey='paid' stroke='#98999C' fill='#58d4c2' fillOpacity={0.5}/>                    
                </AreaChart>
            </div>

            <div className="middle-container">
                <div className="disk-space">
                    <h2>Disk space</h2>
                    <LinearProgress style={{width: "340px", margin: "15px auto 0 auto"}} mode="determinate" value={useSpace} max={totalSpace}/>
                    <div className="use-total">
                        <span>{useSpace.toFixed(1)} Mb</span>
                        <span>{totalSpace} Mb</span>                        
                    </div>
                    <span className="percent">Currently you use {useSpace.toFixed(1)} Mb ({percent.toFixed(2)}%) of {totalSpace} Mb.</span>
                </div>
                
                <div className="users-reports">
                    <div className="users">
                        <h2>Users</h2>
                        <span className="users-count">{userCount}</span>
                        <Link to="Users" className="go-to">Go to users list</Link>
                    </div>
                    <div className="reports">
                        <h2>Reports</h2>
                        <span className="reports-count">{reportsCount}</span>
                        <Link to="Reports" className="go-to">Go to reports lists</Link>
                    </div>
                </div>
            </div>
            
            <div className="bot-container">
                <div className="last-5">
                    <h2>Last 5 reports</h2>
                    <List className="users-list">
                        {reports}
                    </List>
                </div>
                <div className="upgrade">
                    <h2>Upgrade your disk space</h2>
                    <span className="upgrade-cont">
                        <span className="info" style={{marginTop:"40px"}}>
                            <i className="material-icons">info</i> 
                            Get&nbsp;<strong>10Gb</strong>&nbsp;disk space for only&nbsp;<strong>$1.99</strong>
                        </span> <br/>
                        <span style={{marginTop:"15px"}}>
                            Use <span className="this-form">this form</span> to contact us
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}
}

export default connect(store => ({store: store}))(withRouter(Dashboard))
