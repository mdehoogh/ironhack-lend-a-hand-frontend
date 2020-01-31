import React, { Component } from 'react';

import './UserLocationTracker.css';

import Select from "react-select";

function DMS(degrees){
    let D=Math.trunc(degrees);
    let fracD=Math.abs(D-degrees); // the fractional part
    let M=Math.trunc(60*fracD);
    let S=60*(60*fracD-M);  
    return String(D)+"\xB0 "+(M<10?"0"+String(M):String(M))+"' "+String(S)+'"';
}

const updateFrequencyOptions=[
    {value:'0',label:'As fast as possible'},
    {value:'10000',label:'Every 10 seconds'},
    {value:'30000',label:'Every half minute'},
    {value:'60000',label:'Every minute'},
    {value:'300000',label:'Every 5 minutes'},
];

const locationVisibilityOptions=[
    {value:'none',label:'Nobody'},
    {value:'friend',label:'Friends only'},
    {value:'all',label:'All'},
];

export class UserLocationTracker extends Component{

    // the props should provide the options for the third argument to wachtPosition()
    constructor(props){
        super(props);
        // assuming that whenever a location changes the host wants to be informed!!!!
        this.onLocationChange=this.props.onLocationChange;
        this.successCallback=this.successCallback.bind(this);
        this.errorCallback=this.errorCallback.bind(this);
        this.handleUpdateFrequencyChange=this.handleUpdateFrequencyChange.bind(this);
        this.handleLocationVisibilityChange=this.handleLocationVisibilityChange.bind(this);
        // what we will typically show of the current user location
        this.state={
            checked:(this.onLocationChange?true:false),
            count:0,
            latitude:null,
            longitude:null,
            altitude:null,
            heading:null,
            speed:null,
            timestamp:null,
            accuracy:null,
            altitude_accuracy:null,
            error:null,
            updateFrequencyOption:updateFrequencyOptions[0],
            locationVisibilityOption:locationVisibilityOptions[0],
            watchID:window.navigator.geolocation.watchPosition(this.successCallback,this.errorCallback),
        };
    }

    successCallback(geolocationPosition){
        console.log("Geolocation position",geolocationPosition);
        // passing both the geolocation position as well as the visibility setting up!!!
        let newcount=this.state.count+1;
        if(this.state.checked)
            this.onLocationChange(geolocationPosition,this.state.locationVisibilityOption.value,newcount);
        // TODO are we going to wait for onLocationChange?????
        this.setState({
            count:newcount,
            latitude:geolocationPosition.coords.latitude,
            longitude:geolocationPosition.coords.longitude,
            altitude:geolocationPosition.coords.altitude,
            heading:geolocationPosition.coords.heading,
            speed:geolocationPosition.coords.speed,
            accuracy:geolocationPosition.coords.accuracy,
            altitude_accuracy:geolocationPosition.coords.altitude_accuracy,
            timestamp:new Date(geolocationPosition.timestamp).toLocaleString(),
        });
    }
    errorCallback(geolocationPositionError){
        console.log("Geolocation position error",geolocationPositionError);
        this.setState({
            error:geolocationPositionError.message,
            timestamp:new Date(geolocationPositionError.timestamp).toLocaleString(),
        });
        if(geolocationPositionError.code===1){
            // source: https://www.reddit.com/r/javascript/comments/4monjl/way_to_check_if_user_has_declined_geolocation_and/
            window.navigator.permissions.query({name: 'geolocation'}).then(function(status) {
                console.log(status);
              });
        }
    }

    componentWillUnmount(){
        // if currently watching, clear the watch
        if(this.state.watchID){
            window.navigator.geolocation.clearWatch(this.state.watchID);
            alert("Stopped watching your location!");
        }
    }

    handleUpdateFrequencyChange(selectedUpdateFrequencyOption){
        console.log("Selected update frequency option: ",selectedUpdateFrequencyOption);
        // NOTE setting the maximum age accordingly typically is only available in 'secure context's
        this.setState({
            updateFrequencyOption:selectedUpdateFrequencyOption,
            watchID:window.navigator.geolocation.watchPosition(this.successCallback,this.errorCallback,
                {maximumAge:selectedUpdateFrequencyOption.value}),
        });
    }

    handleLocationVisibilityChange(selectedLocationVisibilityOption){
        this.setState({
            locationVisibilityOption:selectedLocationVisibilityOption
        });
    }

    handleCheckBoxChange(){
        // toggle the checked flag
        this.setState({
            checked:!this.state.checked
        });
    }

    render(){
         return(<div className='user-location-tracker'>
                    {/* if we have an on change handler the user can still determine not to store locations */}
                    {this.onLocationChange && <label><input type='checkbox' value='1' onChange={this.handleCheckboxChange} defaultChecked={this.state.checked}/>Store</label>}
                    {/* update frequency option */}
                    <div className='user-location-info'>
                        <fieldset className='location-frequency'><legend className='text-line'>Update frequency</legend>
                            <div className='column'>
                                <Select onChange={this.handleUpdateFrequencyChange} value={this.state.updateFrequencyOption} options={updateFrequencyOptions} />
                                {/* <select placeholder='Frequency'>
                                    <option value='0'>As fast as possible</option>
                                    <option value='10'>Often</option>
                                    <option value='60'>Every minute</option>
                                    <option value='300'>Every 5 minutes</option>
                                </select> */}
                            </div>                    
                        </fieldset>
                        <fieldset className='location'><legend>Current location {this.props.locationSaveCount>0?(this.props.locationSaveCount===this.state.count?"(saved)":"(saved up to #"+this.props.locationSaveCount):"(not saved)"}</legend>
                            {this.state.error
                                ?<span>{this.state.error}</span>
                                :<div className='column'>
                                        <span className='text-line'>Update #{this.state.count}: {this.state.timestamp?this.state.timestamp.substr(-8):"?"}</span>
                                        <span className='text-line'>Latitude : {(this.state.latitude?DMS(this.state.latitude):"?")+" N"}</span>
                                        <span className='text-line'>Longitude: {(this.state.longitude?DMS(this.state.longitude):"?")+" W"}</span>
                                </div>
                            }
                        </fieldset>
                        <fieldset className='location-visibility'><legend>Visibility</legend>
                            <div className='column right'>
                                <Select onChange={this.handleLocationVisibilityChange} 
                                        value={this.state.locationVisibilityOption} options={locationVisibilityOptions} />
                                {/* <select placeholder='Visibility'>
                                    <option value='none'>None</option>
                                    <option value='friends'>Friends only</option>
                                    <option value='all'>All</option>
                                </select> */}
                            </div>
                        </fieldset>
                    </div>
            </div>);
    }
}

export default UserLocationTracker;

