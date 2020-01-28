import React, { Component } from 'react';

export class UserLocationTracker extends Component{

    // the props should provide the options for the third argument to wachtPosition()
    constructor(props){
        super(props);
        this.successCallback=this.successCallback.bind(this);
        this.errorCallback=this.errorCallback.bind(this);
        // what we will typically show of the current user location
        this.state={
            count:0,
            options:this.props,
            latitude:null,
            longitude:null,
            altitude:null,
            heading:null,
            speed:null,
            timestamp:null,
            accuracy:null,
            altitude_accuracy:null,
            error:null,
        };
    }

    successCallback(geolocationPosition){
        console.log("Geolocation position",geolocationPosition);
        this.setState({
            count:this.state.count+1,
            latitude:geolocationPosition.coords.latitude,
            longitude:geolocationPosition.coords.longitude,
            altitude:geolocationPosition.coords.altitude,
            heading:geolocationPosition.coords.heading,
            speed:geolocationPosition.coords.speed,
            accuracy:geolocationPosition.coords.accuracy,
            altitude_accuracy:geolocationPosition.coords.altitude_accuracy,
            timestamp:geolocationPosition.timestamp,
        });
    }
    errorCallback(geolocationPositionError){
        console.log("Geolocation position error",geolocationPositionError);
        this.setState({
            error:geolocationPositionError.error,
            timestamp:geolocationPositionError.timestamp,
        });
    }

    componentDidMount(){
        window.navigator.geolocation.watchPosition(this.successCallback,this.errorCallback,this.state.options);
    }

    render(){
        return(<div className='user-location-tracker'>
                <p>Count    : {this.state.count}</p>
                <p>Latitude : {this.state.latitude}</p>
                <p>Longitude: {this.state.longitude}</p>
                <p>Altitude : {this.state.altitude}</p>
                <p>Timestamp: {this.state.timestamp}</p>
                <p>Speed    : {this.state.speed}</p>
                <p>Heading  : {this.state.heading}</p>
                <p>Accuracy : {this.state.accurary}</p>
                <p>Alt accuracy: {this.state.altitude_accuracy}</p>
                <p>Error    : {this.state.error}</p>
                {/* <p>{this.state.options}</p> */}
            </div>);
    }
}

export default UserLocationTracker;

