import React from 'react';

import './Help.css';

import DefaultLayout from '../layouts/Default.jsx';

const Help=()=>{
    return(<DefaultLayout className='help'>
            <h2>Contact us!</h2>
            <p>Post a request to <a href='/request?to=us'>us</a>!</p>
            <h2>About</h2>
            <p>Lend-a-hand.nl is not an organization or a brand, but an initiative. Although many alternatives exist, we strive constantly to make Lend-a-hand as easy to use as possible.</p>
            <h2>Member benefits</h2>
            <p>Bla bla bla</p>
            <h2>FAQs</h2>
            <p>What's in a name?</p>
        </DefaultLayout>);
}

export default Help;
