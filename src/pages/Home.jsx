import React from 'react';

import DefaultLayout from "../layouts/DefaultLayout.jsx";

// MDH@27JAN2020: at the top level use a layout (that we can reuse over routes this way)

// Home page explains what the app is used for with some help

const Home=()=>{
    return(<DefaultLayout>
            <h2>Why?</h2>
            <p>Lend-a-hand helps you to get or give help quickly.</p>
            <h2>How?</h2>
            <p><a href='/login?new'>Register</a> first to join the lend-a-hand community.</p>
            <p>As a registered member you are allowed to post requests.</p>
            <p>All members in the provided vicinity will be prompted to respond to the request immediately.</p>
            <p>For further information, use the Help option from the main menu.</p>
            <h2>Where?</h2>
            <p>Lend-a-hand can be used anywhere, anytime.</p>
            <h2>Disclaimer</h2>
            <p>Lend-a-hand is a platform that organizes getting or giving help quickly and efficiently.</p>
            <p>However, the success of Lend-a-hand depends greatly on its active members.</p>
            <p>Although Lend-a-hand will try its utmost to ascertain that all members are trustworthy, and provides services to do so, 
            Lend-a-hand cannot be held accountable for any damage resulting from the communication and/or meetings between its members.
            We encourage any Lend-a-hander to file in a complaint immediately when treated badly by another Lend-a-hander.</p>
        </DefaultLayout>);
}

export default Home;
