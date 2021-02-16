import React from 'react';
import './style.css'
import axios from 'axios';
// import { Container, Row, Col } from "react-bootstrap";
export default class CityBox extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <li>
                <strong>시/도 선택</strong>
                <div className="Inner" id="sido">
                    <div className="scroll-wrapper scrollbar-inner button_area scrollbar_block">
                        <div className="scrollbar-inner button_area scrollbar_block scroll-content scroll-scrolly_visible" id="sido_buttons" >
                            {this.props.citylist.map((x, i) => {
                                return (<span type="button" className="cigudong" key={i} onClick={this.props.getgu}>{x}</span>);
                            })}
                        </div>
                        <div className="scroll-element scroll-x scroll-scrolly_visible">
                            <div className="scroll-element_outer">
                                <div className="scroll-element_size"></div>
                                <div className="scroll-element_track"></div>
                                <div className="scroll-bar"></div>
                            </div>
                        </div>
                        <div className="scroll-element scroll-y scroll-scrolly_visible">
                            <div className="scroll-element_outer">
                                <div className="scroll-element_size"></div>
                                <div className="scroll-element_track"></div>
                                <div className="scroll-bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
                    
        )
    }
}