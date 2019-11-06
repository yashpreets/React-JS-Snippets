import React, { Component } from 'react';
import './../css/AdminDashboard.css';
import './../css/merchantList.css';
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from './DataTable.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RoasterActions from '../actions/RoasterActions';
import config from './../common/config';
var Loader = require('react-loader');
var fetchRoasterUrl = config.fetchRoasterUrl;

const selectRowProp = {
    mode: 'checkbox',
    'background-color': '#eee'
}

function onRowSelect(){

}

function onCellClick(cell,colheader){

	console.log("rr",cell,colheader);
}


class Roaster extends Component {
	constructor(props){
  		super(props);
  		this.state={

		}
 	};

 	//Called After Rendering
	componentDidMount(){

	}

	//Called before Rendering
	componentWillMount(){
	    let authorization = "Basic RUtBUlQ2OkVLQVJUNg==";
	    let actions = this.props.actions;
        let payload = {authorization:authorization,urlWithParams:fetchRoasterUrl,successHandler:actions.weeklyRoasterSuccess,failureHandler:actions.weeklyRoasterFailed,requestPayload:this.props.requestPayload};
        actions.fetchWeeklyRoasterData(payload);
	}

	//Called When Component is Destroyed
	componentWillUnmount(){
        this.props.actions.unsetRoasterState();
	}

	filterResponseToCreateColumns(response){
        let columns = {"employeeName":"Employee"};
        if(response[0] !== undefined){
            let target = response[0];
            for(var i in target){
                if (target.hasOwnProperty(i)) {
                    let key = i;
                    columns[key] = key;
                }
            }
        }
        return columns;
	}

	fetchData(e,data){
		alert("write code to fetch "+ data);
	}

	render(){
	    return (
			<div className="adminDashboard ">
				<Loader loaded={this.props.RoasterActionsReducer.loaded}>
					<div className="pagination-div">
						<a id="next" className="pagination-button pull-right a.pagination-button" href="#" onClick= {(e) => this.fetchData(e,"nextData")} >»</a>
						<a id="prev" className="pagination-button pull-right a.pagination-button" href="#" onClick= {(e) => this.fetchData(e,"prevData")} >«</a>
					</div>
                    <div class="text-uppercase tr-bg1">
                    <DataTable dashboardData={this.props.RoasterActionsReducer.dashboardData} column={this.props.RoasterActionsReducer.columns} keyIndex="0" colClickHandler= {onCellClick} clickAction={onRowSelect}
                    ></DataTable>
                        </div>
				</Loader>
			</div>);
	}
};

function mapStateToProps(state, props) {
	return {
        RoasterActionsReducer: state.RoasterActionsReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(RoasterActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Roaster);