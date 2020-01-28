import React,{Component} from 'react';

import Navbar from '../components/Navbar';

import {useLocation} from 'react-router';

const UnknownRoute=(props)=>{
        return(<div>
                <Navbar/>
                <p>Unknown route: {useLocation().pathname}.</p>
            </div>);
    }

export default UnknownRoute;
