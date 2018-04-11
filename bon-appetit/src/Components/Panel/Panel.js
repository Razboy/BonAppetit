import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink, withRouter} from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import Header from './Header';
import Sidebar from './Sidebar';

import {connect} from "react-redux";

import Dashboard from '../Content/Dashboard';
import Reports from '../Content/Reports';
import Users from '../Content/Users';

class Panel extends Component {
    constructor(props) {
        super();
    }

render() {
    return ( 
        <div className={css(styles.container)}>
            <div className={css(styles.panel)}>
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

const styles = StyleSheet.create ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    panel: {
        display: 'flex',
        margin: '50px auto'
    }
})

export default Panel;
