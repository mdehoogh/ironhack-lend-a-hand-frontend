import React, { Component } from 'react';

import DefaultLayout from '../layouts/DefaultLayout.jsx';
import LendAHandersNearby from '../components/LendAHandersNearby.jsx';

// for saving locations
import {save} from '../utilities/location.js';

import './Dashboard.css';

// here is where the user gets an overview of what's currently going on in Lend-a-hand community

// MDH@31JAN2020: I want to be able to inform the UserLocationTracker the result of saving a location
//                using localStorage for that would seem like an idea except for not getting rendered when we want to

export class Dashboard extends Component{

    constructor(props){
        super(props);
        this.onLocationChange=this.onLocationChange.bind(this);
        this.state={
            location_visibility:"none",
            locationSaveCount:0,
        }
    }

    // handler of a change to the location (effectively storing the data)
    // TODO we should kinda try to 'return' the last saved timestamp somehow!!!!
    onLocationChange(geolocationPosition,locationVisibilityOption,locationUpdateCount){
        save(geolocationPosition.coords.latitude,
                geolocationPosition.coords.longitude,
                geolocationPosition.coords.altitude,
                geolocationPosition.coords.accuracy,
                new Date(geolocationPosition.timestamp).toISOString(),
                locationVisibilityOption)
            .then((location)=>{
                // pass initial update count back
                this.setState({locationSaveCount:locationUpdateCount})
            })
            .catch((err)=>{
                console.log("Location save error: ",err);
                // pass negated update count back
                this.setState({locationSaveCount:-locationUpdateCount})
            });
    }

    render(){
        console.log("Rendering dashboard with locationSaveCount "+this.state.locationSaveCount+".");
        // MDH@31JAN2020: ascertain to get the location saved on every change!!!!
        return(<DefaultLayout className='dashboard' onLocationChange={this.onLocationChange} locationSaveCount={this.state.locationSaveCount}>
                {this.state.location_visibility!=="none"
                    ?             
                        <LendAHandersNearby/>
                    :
                        <div>Change the location visibility to get to see who is around.</div>
                    }
            </DefaultLayout>);
    }
}

export default Dashboard;
