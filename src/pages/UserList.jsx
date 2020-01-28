import React, { Component } from 'react';

import axios from 'axios';

// MDH: because we're using proxy setting as well no need to use REACT_APP_API
//      however, for deployment we DO need it!!!
const transport=axios.create({'baseURL': process.env.REACT_APP_API,'withCredentials':true});

export class UserList extends Component{

    state={
        users:[],
        error:null,
    }

    componentDidMount(){
        // load the list of all users
        transport.get('/users')
            .then(({data})=>{this.setState({error:null,users:data});})
            .catch((error)=>{this.setState({users:null,error:error.message});});
    }

    render(){
        return(<div>
            {
                this.state.error
                    ?
                        <p>Some error occurred: {this.state.error}</p>
                    :
                        <ul>
                            {
                                this.state.users.map((user)=><li>user.name</li>)
                            }
                        </ul>
            }
        </div>);
    }
}

export default UserList;
