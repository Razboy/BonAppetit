import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import { StyleSheet, css } from 'aphrodite';
import './Panelstyle.css';

import Dashboard from '../Content/Dashboard';
import Report from '../Content/Reports';
import Users from '../Content/Users';

class Sidebar extends Component {

    render() {
        console.log(localStorage.getItem("token"));
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.title)}>
                    <h2 className={css(styles.h2)}>Bon Appetit<sup>Beta</sup></h2>
                </div>
                    <ul className={css(styles.list)}>
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

const styles = StyleSheet.create ({
    container: {
        background: '#313339',
        display: 'flex',
        flexDirection: 'column',
        width: 250
    },
    title: {
        background: '#3c3f46', 
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    h2: {
        font: '25px Roboto, sans-serif',
        color: '#fff',
        textShadow: '1px 1px #28292E',
        ':nth-child(1n) > sup': {
            fontSize: '11px',
            color: '#58d4c2'
        }
    },
    list: {
        margin: '15px 0',
        padding: 0,
        listStyle: 'none',
        ':nth-child(1n) > li': {
            marginTop: 2,
            ':nth-child(1n) > a': {
                fontSize: 16,
                textDecoration: 'none',
                color: '#98999C',
                padding: '10px 20px',
                borderLeft: '3px solid #313339',
                display: 'block',
                textShadow: '1px 1px #28292e',
                ':nth-child(1n) > i': {
                    fontSize: 22,
                    position: 'relative',
                    top: 5,
                    marginTop: -5,
                    marginRight: 15
                }
                },
                ':nth-child(1n) > a:hover': {
                  color: '#58d4c2',
                  borderLeft: '3px solid #58d4c2',
                },
                ':nth-child(1n) > a.active': {
                  color: '#58d4c2',
                  borderLeft: '3px solid #58d4c2',
                }
        }
    }
})

export default (withRouter(connect(store => ({store: store}))(Sidebar)))

