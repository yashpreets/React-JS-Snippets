import React, { Component } from 'react';
import './../css/AdminDashboard.css';
import './../css/merchantList.css';
import 'bootstrap/dist/css/bootstrap.css';
import ListTable from './ListTable.js';
import NotificationModal from './NotificationModal';
var config = require('./../common/config.js');
var commonFunctions = require('./../common/commonFunctions.js');
var merchantList = require('../testJson/merchantList.js');
var Loader = require('react-loader');


var serverBaseUrl = config.config().serverUrl;
var getActions = commonFunctions.getActions();
var constants = commonFunctions.constants();
var errorMessages = commonFunctions.errorMessages();
var merchantListData = merchantList.getMerchantList();// make this from server
function onRowSelect(row, isSelected, e) {
    sessionStorage.setItem("merchantId",row['userid']);
    sessionStorage.setItem("merchantName",row['name']);
    window.location.href = "/dashboard";
}
const columnWidth = {
	name:'35',
	userid:'15',
	accessKey:'25',
	CreatedOn:'20'
};
class Dashboard extends Component {
	constructor(props){
  		super(props);
  		this.state={
		  dashboardData:'',
		  loaded:false,
		  showNotification:false,
		  loadCounter:0
		}
        sessionStorage.removeItem("merchantId");
        sessionStorage.removeItem("merchantName");
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
 	formatMerchantList(){
 		let newDashboardData = [];
 		this.state.dashboardData.forEach((element) => {
 			var dd = new Date(element.CreatedOn);
 			var dateString = commonFunctions.getStringTimestamp(dd);
 			element.CreatedOn = dateString;
 			newDashboardData.push(element);
		});
		this.setState({dashboardData:newDashboardData});
 	}
	fetchDashboardData(){
		//add server call instead
		this.stopLoader();
		let serverResponse = merchantListData;
		let merchantList = serverResponse.merchantList;
		this.setState({dashboardData:merchantList});
		if(this.state.dashboardData != undefined && this.state.dashboardData != ''){
			this.formatMerchantList();
		}
	}
	render(){
		let showNotification = this.state.showNotification;
        this.state.showNotification = false;
        let columns = {"name":"Merchant Name","userid":"Merchant Id","accessKey":"Access Key","CreatedOn":"Created Date"};
        if(!this.state.dashboardData && this.state.loadCounter < 5){
        	this.state.loadCounter++;
	    	this.fetchDashboardData();
		}else if(!this.state.dashboardData && this.state.loadCounter >= 5){
			window.location.href = exports.getActions().login;
		}
		return (
			<div className="adminDashboard">
				<Loader loaded={this.state.loaded}>
					<ListTable dashboardData={this.state.dashboardData} column={columns} keyIndex="1" clickAction={onRowSelect} columnWidth={columnWidth} ></ListTable>
				</Loader>
			</div>);
	}
};
export default Dashboard;