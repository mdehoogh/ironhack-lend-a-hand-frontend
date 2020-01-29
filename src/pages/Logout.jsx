import React, { Component } from 'react';

import DefaultLayout from '../layouts/Default.jsx';

import {logout} from '../utilities/auth.js';

import {Redirect} from 'react-router-dom';

export class Logout extends Component {

    state={
        loggedOut:(window.localStorage.user?false:true),
        error:"",
    }

    componentDidMount(){
        // force a logout
        if(this.state.loggedOut)return alert("Already logged out!");
        let userName=JSON.parse(window.localStorage.user).name;
        console.log("Attempting to logout ",userName);
        logout(userName)
            .then((response)=>{
                        if(response.status<200||response.status>=300){
                            this.setState({error:response.data.error});
                            console.log("Log out error response",response);
                            // replacing: alert("Failed to log out (error: "+response.data.error+").");
                        }else{ // success
                            window.localStorage.removeItem("user");
                            this.setState({loggedOut:true}); // log me out, Scotty!
                        }
                    })
            .catch((err)=>{
                // show the error
                console.log("Log out error response",err);
                this.setState({error:(!err||!err.message?"Unknown error leaving.":err.message)});
                // replacing: alert("Failed to log out (error: "+err.response.data.error+")!");
            });
    }

    render(){
        // once we're logged out we're done
        if(this.state.loggedOut)return <Redirect to='/'/>;
        // a person can try again I suppose
        return(<DefaultLayout>
                <p>Leaving error: <span color='red'>{this.state.error}</span>.</p>
            </DefaultLayout>);
    }
}

export default Logout;
