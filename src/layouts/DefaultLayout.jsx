import React from 'react';

import LendAHandInfo from "../components/LendAHandInfo";
import Navbar from "../components/Navbar";
import UserLocationTracker from "../components/UserLocationTracker";

// replacing the Hook component: import GPSLocation from '../components/GPSLocation';

// MDH@02FEB2020: we can still show the location but not allow saving it (unless their a registered user!!!)
import './DefaultLayout.css';

const DefaultLayout=(props)=>{
    console.log("Rendering default layout props",props);
    return(
        <div className='default-layout'>
            <fieldset><legend>Info</legend><LendAHandInfo/></fieldset>
            <Navbar/>
            <fieldset><legend> Your location </legend><UserLocationTracker onLocationChange={props.onLocationChange} locationSaveCount={props.locationSaveCount}/></fieldset>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default DefaultLayout;
