import React from 'react';

import { Link } from 'react-router-dom';

// ok, general idea to be able to chat immediately with the given lend a hander on a chat page
const LendAHander=
    (props)=>{
        let localtimestamp=new Date(props.timestamp).toLocaleString();
        return(<div className='lend-a-hander'>
                <Link to={"/chat/"+props.name}>{props.name}</Link>
                <span> at distance: {props.distance} registered at: {localtimestamp}.</span>
            </div>)
    };

export default LendAHander;
