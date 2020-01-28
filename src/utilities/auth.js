// auth functions
import axios from 'axios';
import qs from 'qs';

// MDH@27JAN2020: main purpose is to communicate with the backend for signing up and logging in 
//                withCredentials:true NOT needed when stringifying what you send
//                                     NEEDED when you send an object (jsonified along the way)
// baseUrl uses "" when REACT_APP_API is NOT defined, in which case (as Jurgen told me it should use proxy instead!!!!)
const transport=axios.create(
                    {
                        baseURL: process.env.REACT_APP_API||"",
                        headers: {'content-type': 'application/x-www-form-urlencoded'},
                    }
                ); // withCredentials actually means with CORS (i.e. telling the browser to not prevent a cross-domain URL request)

const signup=function(name,password){
    let user={'name':name,'password':password};
    console.log("Signing up",name);
    return transport({
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
    return transport({
        "method":"POST",
        "url":"auth/login",
        "data":qs.stringify(user),
        // "headers":{
        //     "content-type":"application/x-www-form-urlencoded"
        // }
    });
};

const logout=function(name){
    let user={name:name};
    console.log("Logging out",user);
    return transport({
        "method":"POST",
        "url":"auth/logout",
        "data":qs.stringify(user),
    });
}

const getprofile=function(member_id){
    return transport({
        "method":"GET",
        "url":"auth/profile",
        "data":qs.stringify(member_id),
    });
};

export {signup,login,logout,getprofile};