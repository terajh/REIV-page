import React from 'react';
import './style.css'
import {connect} from 'react-redux'
import MainOne from './mainOne';
import MainTwo from './mainTwo';
import Comment from './comments';

class Left_section extends React.Component {

    constructor(props){
        super(props);
        this.check_mod = this.check_mod.bind(this);
    }

    check_mod = () => {
        if(this.props.mod === 0){
            return <div id="left_body"><MainOne></MainOne></div>
        }
        else {
            return <div id="left_body">
                <MainTwo></MainTwo>
                <Comment></Comment>  
            </div>
        }
    }
    render(){
        return (
            this.check_mod()
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mod: state.maps[4]
    }
}
export default connect(mapStateToProps, null)(Left_section);