import React from 'react';

const User = (props) => {
    return (
        <div>
            {props.children }
            <Sidebar />
        </div>
    );
}

export default User;
