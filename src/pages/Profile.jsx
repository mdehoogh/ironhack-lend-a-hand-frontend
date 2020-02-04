import React, { Component } from 'react';

import {getprofile} from '../utilities/auth.js';

export class Profile extends Component{

    state={
        profile:null,
        error:null,
    }

    componentDidMount(){
        // get the member's id from sessionStorage.user!!!!
        if(window.sessionStorage.user){
            getprofile(window.sessionStorage.user._id)
            .then((profile)=>{this.setState({profile:profile,error:null});})
            .catch((error)=>{this.setState({profile:null,error:JSON.stringify(error)});});
        }else
            this.setState({error:"You need to be logged in to access your profile!"});
    }

    render() {
        return(<div>
            {
                this.state.error
                    ?
                        <p>The following error occurred: {this.state.error}.</p>
                    :
                        <>
                            <p>Here (a form with) profile information would appear</p>
                            <p>{JSON.stringify(this.state.profile)}</p>
                        </>
            }
            </div>);
    }
}

export default Profile;

