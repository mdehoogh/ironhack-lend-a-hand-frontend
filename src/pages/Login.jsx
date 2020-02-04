import React, { Component } from 'react';

// MDH@27JAN2020: we'll either be logging in or signing up
import './Login.css';

import {login,signup} from '../utilities/auth.js';

import {Redirect} from 'react-router-dom';
import LendAHandInfo from '../components/LendAHandInfo';

export class Login extends Component{

    constructor(props){
        super(props);
        this.firstTimeCheckBoxRef=React.createRef();
        this.respondToInputChange=this.respondToInputChange.bind(this);
        this.submitForm=this.submitForm.bind(this);
        this.cancelForm=this.cancelForm.bind(this);
        // as soon as the member logged in we set the loggedin flag
        this.state={
            name:"",
            password:"",
            password2:"",
            loggedin:false,
        };
    }

    respondToInputChange(event){
        // we could make a copy of the state first, and then check whether or not it is consistent
        // let newstate={...this.state};
        // update the state with what changed
        this.setState({[event.target.name]:event.target.value});
    }

    cancelForm(){
        this.props.history.goBack(); // NOTE history is available as long as you use this component as component in the Route
    }

    submitForm(){
        // the checkbox determines whether or not to sign up or log in, but first check the input fields
        // for now no restrictions on length as long as it has any
        if(this.state.name.trim().length===0)return alert("Please enter a name!");
        if(this.state.password.trim().length===0)return alert("Please enter a password!");
        let firstTime=(this.state.password2.trim().length>0);
        if(firstTime)if(this.state.password.trim()!==this.state.password2.trim())return alert("The passwords should match!");
        // I suppose if we fail it's up to the user???????
        if(firstTime){
            signup(this.state.name,this.state.password.trim())
                .then((response)=>{
                    if(response.status>=200&&response.status<300){
                        window.sessionStorage.user=JSON.stringify(response.data); // OOPS store as String bro'
                        document.title+=' - '+window.sessionStorage.user.name;
                        try{this.setState({loggedin:true});}catch(err){}
                        alert("Sign up successful!");
                        // replacing: alert(response.data.user.name+" successfully registered.");
                    }else
                        alert("Sign up failed (response status: "+response.status+").");
                })
                .catch((error)=>{
                    if(error.response){
                        alert("Sign up failed (response status: "+error.response.status+").");
                        console.log("Signup error response",error.response);
                        // console.log("Sign up error response data",error.response.data);
                        // console.log("Sign up error response status",error.response.status);
                        // console.log("Sign up error response headers",error.response.headers);
                    }else
                        alert("Sign up failed for unknown reasons.");
                });
        }else{
            login(this.state.name.trim(),this.state.password.trim())
                .then((response)=>{
                    debugger
                    if(response.status>=200&&response.status<300){
                        // response.data should contain the _id and name of the logged in user!!!
                        window.sessionStorage.user=JSON.stringify(response.data);
                        console.log("User recognized. See sessionStorage.user!");
                        document.title+=' - '+window.sessionStorage.user.name;
                        try{this.setState({loggedin:true});}catch(err){}
                        alert("Log in successful!");
                        // replacing: alert(response.data.user.name+" successfully logged in!");
                    }else
                        alert("Log in failed (response status: "+response.status+").");
                })
                .catch((error)=>{
                    if (error.response){
                        alert("Log in failed (response status: "+error.response.status+").");
                        console.log("Login error response",error.response);
                        // console.log(error.response.data);
                        // console.log(error.response.status);
                        // console.log(error.response.headers);
                    }else
                        alert("Log in failed for unknown reasons!");
                });
        }
    }

    // MDH@29JAN2020: redirect the user to its dashboard when successful!!!!
    render(){
        if(this.state.loggedin)return <Redirect to='/dashboard'/>;
        return(
            <div className='login'>
                <LendAHandInfo/>
                <div class="field">
                    <label class="label">Member name</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-success" type="text" name='name' placeholder="Your member name" onChange={this.respondToInputChange}/>
                        <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
                        <span class="icon is-small is-right"><i class="fas fa-check"></i></span>
                    </div>
                    {/* <p class="help is-success">This username is available</p> */}
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input class="input" type="password" name='password' placeholder="Your password" onChange={this.respondToInputChange}/>
                    </div>
                </div>
                {/* <label class="checkbox">
                    <input ref={this.firstTimeCheckBoxRef} type="checkbox" defaultChecked={this.state.password2.trim().length>0}/>First time
                </label> */}
                <div class="field">
                    <div class="control">
                        <input class="input" type="password" name='password2' placeholder="Repeat your password" onChange={this.respondToInputChange}/>
                    </div>
                </div>
                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" onClick={this.submitForm}>Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light" onClick={this.cancelForm}>Cancel</button>
                    </div>
                </div>
                <h2>Help</h2><p>To become a new member, repeat the password!</p><p>Remember: leading and trailing whitespace will be removed!</p>
            </div>
        );
    }
}

export default Login;
