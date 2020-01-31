import React, { Component } from 'react';

import LendAHandersNearbyFilter from './LendAHandersNearbyFilter.jsx';
import LendAHander from './LendAHander.jsx';

import './LendAHandersNearby.css';

export class LendAHandersNearby extends Component{

    constructor(props){
        super(props);
        this.state={
            onVisibilityChange:this.props.onVisibilityChange,
            visibility:this.props.visibility,
            lendahanders:[]
        };
    }
    render() {
        return(<div className='lend-a-handers-nearby'>
                    <LendAHandersNearbyFilter/>
                    {/* showing the list of lend-a-handers */}
                    <ul>{
                        this.state.lendahanders.map((lendahander)=>{
                            return(<LendAHander name={lendahander.name}/>)
                        })
                    }</ul>
                })}
            </div>);
    }
}

export default LendAHandersNearby;
