// auth functions
import axios from 'axios';
import qs from 'qs';

// MDH@27JAN2020: main purpose is to communicate with the backend for signing up and logging in 
//                withCredentials:true NOT needed when stringifying what you send
//                                     NEEDED when you send an object (jsonified along the way)
// baseUrl uses "" when REACT_APP_API is NOT defined, in which case (as Jurgen told me it should use proxy instead!!!!)

const signup=function(name,password){
    let user={'name':name,'password':password};
    console.log("Signing up",name);
    return axios({
        "method":"POST",
        "url":"auth/signup",
        "data":qs.stringify(user),
        // "headers":{
        //     "content-type":"application/x-www-form-urlencoded"
        // }
    });
};

const login=function(name,password){
    let user={'name':name,'password':password};
    return axios({
        "method":"POST",
        "url": "auth/login",
        data: qs.stringify(user),
        headers: { 'content-type': 'application/x-www-form-urlencoded' },

    });
};

const logout=function(name){
    let user={name:name};
    console.log("Logging out",user);
    return axios({
        "method":"POST",
        "url":"auth/logout",
        "data":qs.stringify(user),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}

const getprofile=function(member_id){
    return axios({
        "method":"GET",
        "url":"auth/profile",
        "data":qs.stringify({_id:member_id}),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
};

export {signup,login,logout,getprofile};