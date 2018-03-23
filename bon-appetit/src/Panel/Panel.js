import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink, withRouter} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

import {connect} from "react-redux";

import Dashboard from '../Content/Dashboard';
import Reports from '../Content/Reports';
import Users from '../Content/Users';

class Panel extends React.Component {
    constructor(props) {
        super();
    }

render() {
    return ( 
        <div className="panel-container">
            <div className="panel-subcontainer">
                <Sidebar />
                    <div>
                        <Header/>
                                <Switch>
                                    <Redirect exact from="/Panel" to="/Panel/Dashboard"/>
                                    <Route path="/Panel/Dashboard" component={Dashboard}/>
                                    <Route path="/Panel/Users" component={Users}/>
                                    <Route path="/Panel/Reports" component={Reports}/>
                                </Switch>
                    </div>
            </div>
        </div>
    )
}
}

export default Panel;
