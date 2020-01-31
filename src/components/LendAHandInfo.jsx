import React, { Component } from 'react';

// shows generic lend-a-hand info on every page
import './LendAHandInfo.css';

export class LendAHandInfo extends Component{
    render(){
        return(<div className='lend-a-hand-info'>{window.localStorage.info}</div>);
    }
}

export default LendAHandInfo;
