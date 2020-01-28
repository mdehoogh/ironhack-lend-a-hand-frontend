import React, { Component } from 'react';

import qs from 'qs';

// MDH@27JAN2020: I guess requests can have predefined fields passed into it using props
export class Request extends Component{

    constructor(props){
        super(props);
        let parameters=qs.parse(this.props.location.search);
        this.state={
            member_id:window.localStorage.user.id,
            to:parameters.to,
            what:parameters.what,
            what_type:parameters.what_type,
            where:parameters.where,
            where_type:parameters.where_type,
            when:parameters.when,
            when_type:parameters.when_type,
            duration:parameters.duration,
            response_filter:parameters.response_filter,
            negotiation_filter:parameters.negotiation_filter,
            reward:parameters.reward_filter,
        }
    }

    render(){
        return(
            <div>
                
            </div>
        );
    }
}

export default Request;
