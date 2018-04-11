import React from 'react';
import {Link} from 'react-router-dom';

import {  toast } from 'react-toastify';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import {host} from '../../Actions/Host';
import './Login.css';

class Login extends React.Component {
    constructor() {
        super();
            this.state = {
                ownerEmail: '',
                ownerPassword: ''
            }
    this.onSubmit = this.onSubmit.bind(this);
    }

componentDidMount(){
    if(localStorage.getItem('token')!==null){
        this.props.history.push('/Panel')
    }
}

onSubmit() {
    fetch(host+"/company/login",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    ownerEmail: this.state.ownerEmail,
                    ownerPassword: this.state.ownerPassword,
                })
            })
            .then((response) => response.json())
            .then((res) => {
                if (res.error) {
                    toast.error(res.message);
                    
                } else {
                    localStorage.setItem("token",res.message.token)
                    console.log(localStorage.getItem("token"))
                    this.props.history.push('/Panel')
                }
            });
}

render() {
    return (
        <div className="login-main-container">
            <div className="login-container">
                <div className="login-logo-container">
                    <img className="bon-logo" src={require("../../img/bon-logo.png")} alt="Company logo"/>
                    <h2>Bon Appetit</h2>
                </div>    
                <form>
                    <TextField
                        floatingLabelStyle={{color:"grey"}}                            
                        hintText="Enter you email"
                        floatingLabelText="Email"
                        value={this.state.ownerEmail}
                        onChange={(e)=>this.setState({ownerEmail:e.target.value})}
                    /> <br/>
                    <TextField
                        type='password'
                        floatingLabelStyle={{color:"grey"}}
                        hintText="Enter you password"
                        floatingLabelText="Password"
                        value={this.state.ownerPassword}
                        onChange={(e)=>this.setState({ownerPassword:e.target.value})}
                    /> <br/>
                    <FlatButton onClick={this.onSubmit} style={{color:"#fff"}} label="SIGN IN" fullWidth={true}/>
                </form>
                <p style={{fontSize:"10px", color:"#5d5e62"}}>You don't have an account?
                    <Link style={{color:"#58d4c2"}} to="/Registration"> Sign up </Link>  
                    your company   
                </p>
            </div>
        </div>
    );
  }
}

export default Login;
