import React from 'react';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import './Registration.css';

class Registration extends React.Component {
    constructor() {
        super();
            this.state = {
                name: '',
                description: '',
                logo: 'myLogo', 
                ownerEmail: '',
                ownerPassword: '',
                orderValue: 100,
                imageQuality: 'medium',
                language: 'English',
                active: true
            };
    this.validator = this.validator.bind(this);
    }

validator() {
    let company = Object.assign({}, this.state);
    let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    try {
        if (company.name.length <= 3) throw new Error('Company name must be at least 3 characters');
        if (company.description.length < 16) throw new Error('Company description must be at least 16 characters');
        if (!emailRegex.test(company.ownerEmail)) throw new Error('Email is invalid');
        if (company.ownerPassword.length < 6) throw new Error('Password must be at least 6 characters');
        if (isNaN(company.orderValue)) throw new Error('Report value is invalid. Must be a number');
        fetch("http://web.bidon-tech.com:65059/company",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    name: this.state.name,
                    ownerEmail: this.state.ownerEmail,
                    ownerPassword: this.state.ownerPassword,
                    description: this.state.description,
                    logo: "myLogo",
                    imageQuality: this.state.imageQuality,
                    orderValue: this.state.orderValue,
                    active: true,
                    language: this.state.language
                })
            })
            .then((response) => response.json())
            .then((res) => {
                if (res.error) {
                    toast.error(res.message);
                    
                } else {
                    toast.success("Success");
                    // this.props.history.push('/')
                }
            });
    }
    catch (e) {
        toast.error(e.message);
    }
}

render() {
    return (
        <div className="reg-main-container">
            <div className="registration-container">
                <div className="reg-logo-container">
                    <img className="bon-logo" src={require("../img/bon-logo.png")} alt="Company logo"/>
                    <h2>Bon Appetit</h2>
                </div>
                <form>
                        <TextField
                            floatingLabelStyle={{color:"grey"}}                            
                            hintText="You company name"
                            floatingLabelText="Company name"
                            value={this.state.name}
                            onChange={(e)=>this.setState({name:e.target.value})}
                        /> 
                            <br/>
                        <TextField
                            floatingLabelStyle={{color:"grey"}}                            
                            hintText="A few words about you company"
                            floatingLabelText="Company description"
                            multiLine={true}
                            rows={2}
                            rowsMax={4}
                            value={this.state.description}
                            onChange={(e)=>this.setState({description:e.target.value})}
                        /> 
                            <br/>
                        <TextField
                            floatingLabelStyle={{color:"grey"}}                            
                            hintText="You email"
                            floatingLabelText="Email"
                            value={this.state.ownerEmail}
                            onChange={(e)=>this.setState({ownerEmail:e.target.value})}
                        />
                            <br/>
                        <TextField
                            type="password"
                            floatingLabelStyle={{color:"grey"}}                            
                            hintText="You password"
                            floatingLabelText="Password"
                            value={this.state.ownerPassword}
                            onChange={(e)=>this.setState({ownerPassword:e.target.value})}
                        /> 
                            <br/>
                        <TextField
                            inputStyle={{color:"#fff"}}
                            floatingLabelStyle={{color:"grey"}}
                            defaultValue="100"
                            floatingLabelText="Report value"
                            value={this.state.orderValue}
                            onChange={(e)=>this.setState({orderValue:e.target.value})}
                        /> 
                            <br/>
                        <SelectField
                            floatingLabelStyle={{color:"grey"}}
                            labelStyle={{color:"#fff"}}                            
                            floatingLabelText="Photo resolution"
                            value={this.state.imageQuality}
                            onChange={(e, i, value)=>this.setState({imageQuality:value})}
                        >                   
                            <MenuItem value="low" primaryText="Low" />
                            <MenuItem value="medium" primaryText="Medium" />
                            <MenuItem value="hight" primaryText="Hight" />
                        </SelectField> 
                            <br/>
                        <SelectField
                            floatingLabelStyle={{color:"grey"}}
                            labelStyle={{color:"#fff"}}                            
                            floatingLabelText="Language"
                            value={this.state.language}
                            onChange={(e, i, value)=>this.setState({language:value})}
                        >                   
                            <MenuItem value="English" primaryText="English" />
                            <MenuItem disabled value="Русский" primaryText="Русский" />
                        </SelectField> 
                            <br/>
                        <FlatButton onClick={this.validator} style={{color:"#fff"}} label="SIGN UP" fullWidth={true}/>
                </form>
                <ToastContainer autoClose={5000} />
            </div>
        </div>
    );
  }
}

export default Registration;
