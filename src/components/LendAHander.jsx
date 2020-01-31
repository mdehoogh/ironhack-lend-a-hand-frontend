import React from 'react';

import { Link } from 'react-router-dom';

// ok, general idea to be able to chat immediately with the given lend a hander on a chat page
const LendAHander=(props)=>{return(<Link to={"/chat/"+props.name}>{props.name}</Link>)};

export default LendAHander;
