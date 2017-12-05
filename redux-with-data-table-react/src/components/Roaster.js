import React, { Component } from 'react';
import './../css/AdminDashboard.css';
import './../css/merchantList.css';
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from './DataTable.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RoasterActions from '../actions/RoasterActions';
import ActionList from '../actions/ActionList';

var Loader = require('react-loader');
var config = require('./../common/config.js');
var roasterList = require('../testJson/roasterData.js');
var fetchRoasterUrl = config.config().fetchRoasterUrl;
var roasterData = roasterList.getRoasterData();

function onRowSelect(){

}

function onCellClick(cell){
	console.log(cell);
}

const columnWidth = {

};

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
        let payload = {authorization:authorization,urlWithParams:fetchRoasterUrl,nextAction: this.props.actions.RoasterActions};
        this.props.actions.RoasterActions({type:ActionList.FETCH_WEEKLY_ROASTER_DATA,payload:payload});
	}

	//Called When Component is Destroyed
	componentWillUnmount(){
		console.log("destroyed roaster");
	}

	filterResponseToCreateColumns(response){
        let columns = {"employeeName":"Employee"};
        if(response[0] != undefined){
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
		//console.log(data);
	}

	render(){
	    return (
			<div className="adminDashboard">
				<Loader loaded={this.props.RoasterActionsReducer.loaded}>
					<div className="pagination-div">
						<a id="next" className="pagination-button pull-right" href="#" onClick= {(e) => this.fetchData(e,"nextData")} >»</a>
						<a id="prev" className="pagination-button pull-right" href="#" onClick= {(e) => this.fetchData(e,"prevData")} >«</a>
					</div>
					<DataTable dashboardData={this.props.RoasterActionsReducer.dashboardData} column={this.props.RoasterActionsReducer.columns} keyIndex="1" colClickHandler= {onCellClick} clickAction={onRowSelect} columnWidth={columnWidth} showExportOption ={false} ></DataTable>
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