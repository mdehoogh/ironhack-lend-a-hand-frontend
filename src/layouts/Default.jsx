import React from 'react';
import Navbar from "../components/Navbar";

// import UserLocationTracker from "../components/UserLocationTracker";
// replacing the Hook component: import GPSLocation from '../components/GPSLocation';

import './Default.css';

const Default=(props)=>{
    return(
        <div className='default-layout'>
            <Navbar/>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default Default;
