import React from 'react';
import './style.css'
import Toolbar from './toolbar';
import Map from './map';

class Right_section extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div id="right_body">
                <Map></Map>
                <Toolbar></Toolbar>
            </div>
        )
    }
}
export default Right_section;