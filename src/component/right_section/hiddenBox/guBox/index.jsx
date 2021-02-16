import React from 'react';
import './style.css'
import axios from 'axios';
// import { Container, Row, Col } from "react-bootstrap";
export default class HiddenBox extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <li>
                <strong>시/군/구 선택</strong>
                <div className="Inner" id="sigungu">
                    <div className="scroll-wrapper scrollbar-inner button_area scrollbar_block">
                        <div className="scrollbar-inner button_area scrollbar_block scroll-content scroll-scrolly_visible" id="sigungu_buttons" >
                            {this.props.gulist.map((x, i) => {
                                return (<span type="button" className="" key={i} onClick={this.props.getdong}>{x}</span>);
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