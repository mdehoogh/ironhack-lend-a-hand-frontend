import React, { Component } from 'react';

export class UserList extends Component {

    state={
        users:[]
    }

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_API}/users`)
        .then(({data})=>{
            this.setState({
                users:data
            });
        })
        .catch((error)=>{

        });
    }

    render(){
        return(
            <div>
                {this.state.users.map((user)=>{
                <li>{user.name}</li>
                })}
            </div>
        );
    }
}

export default UserList;
