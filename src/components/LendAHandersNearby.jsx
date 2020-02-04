import React, { Component } from 'react';

import LendAHandersNearbyFilter from './LendAHandersNearbyFilter.jsx';
import LendAHander from './LendAHander.jsx';

import './LendAHandersNearby.css';
import { lendahandersnearby } from '../utilities/location.js';

export class LendAHandersNearby extends Component{

    constructor(props){
        super(props);
        this.updateLendAHandersNearby=this.updateLendAHandersNearby.bind(this);
        this.state={
            onVisibilityChange:this.props.onVisibilityChange,
            visibility:this.props.visibility,
            lendahanders:[]
        };
    }

    /**
     * updates the lendahanders by asking for the recentlocations
     */
    updateLendAHandersNearby(){
        lendahandersnearby()
            .then((response)=>{
                if(response.status>=200&&response.status<300){
                    let lendAHandersNearby=response.data;
                    console.log("Number of lend-a-handers nearby: "+(lendAHandersNearby?lendAHandersNearby.length:0)+".");
                    this.setState({
                        lendahanders:(lendAHandersNearby||[])
                    });
                }
            })
            .catch((err)=>{
                alert("ERROR: Failed to upate the lend-a-handers nearby (error: "+JSON.stringify(err)+").");
            });
    }

    componentDidMount(){
        this.updateLendAHandersNearby();
    }

    render(){
        return(<div className='lend-a-handers-nearby'>
                    <div className='button-bar'>
                        <input type='checkbox' id='checkbox' checked></input>
                        <label for='checkbox'>Update automatically</label>
                        <button type='button' onClick={this.updateLendAHandersNearby}>Update</button>
                    </div>
                    <LendAHandersNearbyFilter/>
                    {/* showing the list of lend-a-handers */}
                    <ul>
                        {
                            this.state.lendahanders.map((lendahander)=>{
                                return(<LendAHander name={lendahander.name} distance={lendahander.distance} timestamp={lendahander.timestamp}/>)
                                })
                        }
                    </ul>
            </div>);
    }
}

export default LendAHandersNearby;
