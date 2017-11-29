import React, { Component } from 'react';
import './../css/AdminDashboard.css';
import './../css/merchantList.css';
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from './containers/DataTable2.js';
var config = require('./../common/config.js');
var commonFunctions = require('./../common/commonFunctions.js');
var merchantList = require('../testJson/merchantList.js');
var roasterList = require('../testJson/roasterData.js');
var Loader = require('react-loader');


var serverBaseUrl = config.config().serverUrl;
var getActions = commonFunctions.getActions();
var constants = commonFunctions.constants();
var errorMessages = commonFunctions.errorMessages();
var roasterData = roasterList.getStatusData();

function onRowSelect(){

}
function onCellClick(cell){
	console.log(cell);
}

const columnWidth = {
	name:'35',
	userid:'15',
	accessKey:'25',
	CreatedOn:'20'
};
class Status extends Component {
	constructor(props){
  		super(props);
  		this.state={
		  dashboardData:'',
		  loaded:false,
		  showNotification:false,
		  loadCounter:0
		}
        this.alertOptions = commonFunctions.alertOptionsObject();
 	};

 	startLoader(){
 		this.state.loaded = false;
	};
	stopLoader(){
		this.state.loaded = true;
	};
	showAlert(message){
 		this.setState({notificationMessage:message,showNotification:true});
 	};

	fetchDashboardData(){
		//add server call instead
		this.stopLoader();
		let serverResponse = roasterData;
		this.setState({dashboardData:serverResponse});
	}

	componentDidMount(){
		this.stopLoader();
		let serverResponse = roasterData;
		this.setState({dashboardData:serverResponse});
	}

	render(){
		let columns = {"employeeName":"Employee"};
		if(this.state.dashboardData[0] != undefined){
			let target = this.state.dashboardData[0];
			for(var i in target){
				if (target.hasOwnProperty(i)) {
					let key = i;
					columns[key] = key;
				}
			}
			return (
				<div className="adminDashboard">
					<Loader loaded={this.state.loaded}>
						<DataTable dashboardData={this.state.dashboardData} column={columns} keyIndex="1" colClickHandler= {onCellClick} clickAction={onRowSelect} columnWidth={columnWidth} showExportOption ={true} ></DataTable>
					</Loader>
				</div>);
		}
		return (<div>No Data To Display</div>);
	}
};
export default Status;