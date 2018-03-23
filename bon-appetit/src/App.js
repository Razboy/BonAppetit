import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Login from './Login/Login';
import Registration from './Login/Registration';
import Dashboard from './Content/Dashboard';
import Panel from './Panel/Panel';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import Info from './Redusers/Company';
import logger from 'redux-logger';

import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const store = createStore(
    Info,
    applyMiddleware(logger)
)

class App extends React.Component {
    render() {
        return(
            <MuiThemeProvider>
                <Provider store={store}>
                    <Router>
                        <Switch>
                            <div>
                                <Route exact path="/" component={Login}/>
                                <Route path="/Registration" component={Registration}/>
                                <Route path="/Panel" component={Panel}/>
                            </div>    
                        </Switch>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        )
    }
}

export default App;