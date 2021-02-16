import React, { useState, useEffect } from 'react';
import './style.css';

import HiddenBox from '../hiddenBox'
import axios from 'axios';
axios.default.withCredentials = true;

export default class Toolbar extends React.Component {
    // eslint-disable-next-line
    constructor(props){
        super(props);
        this.state = {
            visible:"bottom_city_box",
            city:'시/도 선택',
            gu:'시/군/구 선택',
            dong: '읍/면/동 선택',

            citylist:[ '서울특별시',
            '부산광역시',
            '대구광역시',
            '인천광역시',
            '광주광역시',
            '대전광역시',
            '울산광역시',
            '경기도',
            '강원도',
            '충청북도',
            '충청남도',
            '전라북도',
            '전라남도',
            '경상북도',
            '경상남도',
            '제주특별자치도' ],
            gulist:[],
            donglist:[],
            codelist:[],
            pnulist:[]
        }
        this.clickToolbar = this.clickToolbar.bind(this);
        this.setCity = this.setCity.bind(this);
        this.setGu = this.setGu.bind(this);
        this.setDong = this.setDong.bind(this);
    }


    clickToolbar = (e) => {
        if(this.state.visible === "bottom_city_box"){
            this.setState({
                visible:"bottom_city_box vis"
            })
        }else{
            this.setState({
                visible:"bottom_city_box"
            })
        }
    }
    setCity = (ci, gu_list) => {
        this.setState({
            city:ci,
            gulist:gu_list
        });
    }
    setGu = (gu, dong_list, code_list) => {
        this.setState({
            gu:gu,
            donglist:dong_list,
            codelist:code_list
        })
    }
    setDong = (dong, code=[]) => {
        this.setState({
            codelist:code,
            dong:dong
        })
    }
    render() {
        return (
            <div className={this.state.visible} id="bottom_city_box_id" style={{'height': 10+'%'}}>
                <div className="select_txt" id="select_txt_id" onClick={this.clickToolbar.bind(this)}>
                    <i className="comn_bg ic_location"></i>
                    <span className="select_step01 select_step02" id="view_navi_sido">{this.state.city}</span>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    <span id="view_navi_sigugun">{this.state.gu}</span>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    <span className="" id="view_navi_eupmyeondong"> {this.state.dong} </span>
                </div>
                <HiddenBox setCity={this.setCity} setGu={this.setGu} setDong={this.setDong} prop={this.state}></HiddenBox>

            </div>
        )
    }
}
