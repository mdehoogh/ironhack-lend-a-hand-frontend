import React, { Component } from 'react';

import './Navbar.css';

export default class Navbar extends Component{
    render(){
        // kinda funny if the following works!!!
        return(
            <div class='navbar'>
                {window.sessionStorage.user
                    ?
                        <ul>
                            <li><a href='/leave'>Leave</a></li>
                            <li><a href='/profile'>Profile</a></li>
                            <li><a href='/request'>Request</a></li>
                            <li><a href='/help'>Help</a></li>
                        </ul>
                    :
                        <ul>
                            <li><a href='/enter'>Enter</a></li>
                            <li><a href='/help'>Help</a></li>
                        </ul>
                }
            </div>
        );
    }
}
