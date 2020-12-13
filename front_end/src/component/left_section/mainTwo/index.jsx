import React from 'react';
import './style.css'
import axios from 'axios';
import {connect} from 'react-redux'
import {updatePniInfo, setLike} from '../../../actions/state';
import {getHost} from '../../../lib/host'
import Star from './star';

axios.default.withCredentials = true;

class MainTwo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            road_address : '',
            address_name : '',
            name:'',
            arealist:[],
            loglist:[],
            this_area:0
        }
        this.updateThisArea = this.updateThisArea.bind(this);
        this.removeList = this.removeList.bind(this);
        this.insertList = this.insertList.bind(this);
    }

    componentDidMount() {
        document.querySelector('.wrap-loading').setAttribute('class', 'wrap-loading');
        axios.get(getHost() + '/api/get_extra/' + this.props.pnu[3], { withCredentials: true })
            .then(response => {
                let data = response.data;

                axios.post(getHost() + '/api/get_log', {
                    pnu: this.props.pnu[3],
                    area: data.items[0].area
                }, { withCredentials: true })
                    .then(res => {
                        document.querySelector('.wrap-loading').setAttribute('class', 'wrap-loading display-none');

                        this.setState({
                            road_address: data.roadAddress,
                            address_name: data.address,
                            name: data.name,
                            arealist: data.items,
                            loglist: res.data.loglist,
                            this_area: data.items[0].area
                        })
                        this.props.updatePniInfo(data.xLoc, data.yLoc, data.description);

                    })
                    .catch(err => {
                        console.log(err);
                    })

            })
            .catch(error => {
                console.log(error);
            })

        
    }
    parseprice(number) {
        number *= 1; 
        var auk = parseInt(number/100000000);
        var manwow = parseInt((number%100000000)/10000);

        return auk +'억 '+ manwow+'만'
    }
    updateThisArea = (e) => {
        e.preventDefault();
        var itemSelect = document.getElementById('list_pyeong');
        var itemValue = itemSelect.options[itemSelect.selectedIndex].value;
        document.querySelector('.wrap-loading').setAttribute('class', 'wrap-loading');

        axios.post(getHost()+'/api/get_log',{
            pnu: this.props.pnu[3],
            area: itemValue
        }, { withCredentials: true })
        .then(res => {
            document.querySelector('.wrap-loading').setAttribute('class', 'wrap-loading display-none');
            this.setState({
                loglist: res.data.loglist,
                this_area: itemValue
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    insertList() {
        document.querySelector('.wrap-loading').setAttribute('class', 'wrap-loading');
        axios.put(getHost()+'/api/putLike',{
            pnu: this.props.pnu[3]
        }, { withCredentials: true })
        .then(res => {
            document.querySelector('.wrap-loading').setAttribute('class', 'wrap-loading display-none');
            // this.props.pnu[8].push(this.props.pnu[3]);
            this.props.setLike(res.data.pnu);
            this.forceUpdate();

        })
        .catch(err => {
            console.log(err);
        })
    }
    removeList() {
        document.querySelector('.wrap-loading').setAttribute('class', 'wrap-loading');
        axios.delete(getHost()+'/api/removeLike/'+this.props.pnu[3],{ withCredentials: true })
        .then(res => {
            document.querySelector('.wrap-loading').setAttribute('class', 'wrap-loading display-none');
            this.props.setLike(this.props.pnu[8].filter((x)=>x.pnu!==this.props.pnu[3]));
            this.forceUpdate();
        })
        .catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <>
                <div className="marker_info vis">
                    <div className="marker_info_txt">
                        <strong className="marker_title" id="view_danzi">{this.state.name}</strong>
                        <Star removeList={this.removeList} insertList={this.insertList}></Star>
                        <span className="marker_address" id="view_addr">{this.state.address_name}</span><br />
                        <div className="marker_address_number">
                            <em>도로명  </em>
                            <span id="view_roadaddr">{this.state.road_address}</span>
                        </div>
                    </div>

                    <div id="expected_price_layer">
                        <div className="price_box">
                            <div className="price_box_title" id="year_price">2020년도 공시가격</div>
                            <div id="expected_price_list">
                                {this.state.arealist.map((item, i) => {
                                    return (
                                        <dl key={i} className="">
                                            <dt>{parseInt(item.area*0.3025)}평 / 전용 {item.area}m²</dt>
                                            <dd>{this.parseprice(item.price.min)} ~ {this.parseprice(item.price.max)}</dd>
                                        </dl>
                                    )
                                })}
                                
                            </div>
                        </div>
                    </div>

                    <div id="actual_price_graph" className="actual_price_graph">
                        <span className="tit_txt" id="sameprcwords">실거래가 변동<em>(최근 3년)</em></span>
                        <div className="selectarea">
                            <div className="selectBox select_line default">
                                <select name="" id="list_pyeong" onChange={this.updateThisArea}>
                                    {this.state.arealist.map((item, i) => {
                                        return (
                                            <option key={i} value={item.area} >{parseInt(item.area*0.3025)}평({item.area}m²)</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="dealings_list">
                            <div className="table_style_box" >
                                <table className="table_style" id="table_test">
                                    <colgroup>
                                        <col className="col_st01" />
                                        <col className="col_st02" />
                                        <col className="col_st03" />
                                        <col className="col_st04" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>계약일</th>
                                            <th>실거래가</th>
                                            <th>전용면적</th>
                                            <th>층</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(this.state.loglist.length === 0) 
                                        ? <tr>
                                            <td colSpan="4">이력이 없습니다.</td>
                                        </tr>
                                        : this.state.loglist.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.update.split('T')[0]}</td>
                                                    <td><strong>{this.parseprice(item.price)}</strong></td>
                                                    <td>{item.area}m²</td><td>{item.floor}층</td>
                                                </tr>
                                            )
                                        })}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        pnu : state.maps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePniInfo: function(x,y, description){
            dispatch(updatePniInfo(x,y, description));
        },
        setLike : function(list){
            dispatch(setLike(list));
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainTwo);