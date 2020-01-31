import React, { Component } from 'react';

import './LendAHandersNearbyFilter.css';

export class LendAHandersNearbyFilter extends Component{

    constructor(props){
        super(props);
        // props should give us the on change handler that is to be called with the new maximum count, distance and allowed member categories
        // NOTE if no categories are selected, all is implied
        this.state={
            onChange:this.props.onChange,
            maximumCount:this.props.maximumCount,
            maximumDistance:this.props.maximumDistance,
            allowedMemberCategories:[]
        }
    }

    render(){
        return(<div className='lend-a-handers-nearby-filter'>
                <p>Filter for limiting the number of nearby lend-a-handers to show</p>
            </div>);
    }
}

export default LendAHandersNearbyFilter;
