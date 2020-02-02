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

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at https://www.geodatasource.com                         :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: https://www.geodatasource.com                       :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2018            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

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

export {save,load};