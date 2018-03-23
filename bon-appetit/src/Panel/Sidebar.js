import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import './Panelstyle.css';

import Dashboard from '../Content/Dashboard';
import Report from '../Content/Reports';
import Users from '../Content/Users';

class Sidebar extends React.Component {

    render() {
        console.log(localStorage.getItem("token"));
        return (
            <div className="sidebar-container">
                <div className="title-container">
                    <h2>Bon Appetit<sup>Beta</sup></h2>
                </div>
                    <ul className="nav-item">
                        <li>
                            <NavLink to="Dashboard">
                                <i className="material-icons">dashboard</i> 
                                Dashboard
                            </NavLink></li>
                        <li>
                            <NavLink to="Users">
                                <i className="material-icons">group</i> 
                                Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="Reports">
                                <i className="material-icons">inbox</i> 
                                Reports
                            </NavLink>
                        </li>
                    </ul>
            </div>
        );
    }
}

export default (withRouter(connect(store => ({store: store}))(Sidebar)))

