import React, { Component } from 'react';

import './Navbar.css';

export default class Navbar extends Component{
    render(){
        // kinda funny if the following works!!!
        return(
            <div class='navbar'>
                {window.localStorage.user
                    ?
                        <ul>
                            <li><a href='/logout'>Log out</a></li>
                            <li><a href='/profile'>Profile</a></li>
                            <li><a href='/request'>Request</a></li>
                            <li><a href='/help'>Help</a></li>
                        </ul>
                    :
                        <ul>
                            <li><a href='/login'>Log in</a></li>
                            <li><a href='/help'>Help</a></li>
                        </ul>
                }
            </div>
        );
    }
}
