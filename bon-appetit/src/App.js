import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import Registration from './Components/Login/Registration';
import Dashboard from './Components/Content/Dashboard';
import Panel from './Components/Panel/Panel';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import Info from './Redusers/Company';
import logger from 'redux-logger';

import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

export const store = createStore(
    Info,
    applyMiddleware(logger)
)

class App extends React.Component {
    render() {
        return(
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
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