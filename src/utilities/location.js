import axios from 'axios';
import qs from 'qs';

// MDH@27JAN2020: main purpose is to communicate with the backend for handling location data

// baseUrl uses "" when REACT_APP_API is NOT defined, in which case (as Jurgen told me it should use proxy instead!!!!)

// MDH@29JAN2020: TODO we're NOT receiving the actual geolocationPosition here
//                     that way we abstract from how the location is obtained
const save=(latitude,longitude,altitude,accuracy,timestamp,visibility)=>{
    let location={latitude,longitude,altitude,accuracy,timestamp,visibility};
    console.log("Saving location",location);
    return axios({
        "method":"POST",
        "url":"/location",
        "data":qs.stringify(location),
        "headers":{
            "content-type":"application/x-www-form-urlencoded"
        }
    });
};

// TODO when are we loading locations?????
const load=(distance,visibility)=>{

}

export {save,load};