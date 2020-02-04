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


function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 === lat2) && (lon1 === lon2)) return 0;
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit==="K") { dist = dist * 1.609344 }
    if (unit==="N") { dist = dist * 0.8684 }
    return dist;
}

// TODO when are we loading locations?????
/**
 * retrieves all recent locations within the given distance from the location identified by @longitude and @latitude
 * @param {*} distance          the maximum distance
 * @param {*} longitude         the longitude of the location of the user
 * @param {*} latitude          the latitude of the location of the user
 * @param {*} member_ids        
 * @param {*} membergroup_ids 
 * @param {*} activitygroup_ids 
 */
const load=(distance,latitude,longitude,member_ids,membergroup_ids,activitygroup_ids)=>{
    let data={distance,latitude,longitude,member_ids,membergroup_ids,activitygroup_ids};
    console.log("Loading all recent locations within distance "+distance+" of ("+latitude+","+longitude+").");
    return axios({
        "method":"POST",
        "url":"/recentlocation",
        "data":qs.stringify(data),
        "headers":{
            "content-type":"application/x-www-form-urlencoded"
        }
    });
}

const lendahandersnearby=()=>{
    let userId={user_id:window.sessionStorage.user._id};
    return axios({
        "method":"POST",
        "url":"/lendahandersnearby",
        "data":qs.stringify(userId),
        "headers":{
            "content-type":"application/x-www-form-urlencoded"
        }
    });
}

export {save,load,lendahandersnearby};