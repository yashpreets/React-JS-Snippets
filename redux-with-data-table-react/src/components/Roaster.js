import React, { Component } from 'react';
import './../css/AdminDashboard.css';
import './../css/merchantList.css';
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from './containers/DataTable2.js';
import fetch from 'cross-fetch';

var Loader = require('react-loader');
var config = require('./../common/config.js');
var commonFunctions = require('./../common/commonFunctions.js');
var roasterList = require('../testJson/roasterData.js');
var fetchRoasterUrl = config.config().fetchRoasterUrl;
var constants = commonFunctions.constants();
var errorMessages = commonFunctions.errorMessages();
var roasterData = roasterList.getRoasterData();

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

class Roaster extends Component {
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

	componentDidMount(){
		let self = this;
		let authorization = "RUtBUlQ2OkVLQVJUNg==";
		let requestOptions = {
            url: fetchRoasterUrl,
            options: {
                METHOD: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'Basic RUtBUlQ2OkVLQVJUNg==',
                }
            }
        }
		fetch(requestOptions.url,requestOptions.options)
			.then(function(response) {
			    if (response.status >= 400) {
			       throw new Error("Bad response from server");
			    }
		    	return response.json();
		    }).then(function(data) {
		    	self.stopLoader();
     			console.log(data);
            	self.setState({dashboardData:roasterData});
  			});
	}

	fetchData(e,data){
		alert("write code to fetch "+ data);
		//console.log(data);
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
		}
		return (
			<div className="adminDashboard">
				<Loader loaded={this.state.loaded}>
					<div className="pagination-div">
						<a id="next" className="pagination-button pull-right" href="#" onClick= {(e) => this.fetchData(e,"nextData")} >»</a>
						<a id="prev" className="pagination-button pull-right" href="#" onClick= {(e) => this.fetchData(e,"prevData")} >«</a>
					</div>
					<DataTable dashboardData={this.state.dashboardData} column={columns} keyIndex="1" colClickHandler= {onCellClick} clickAction={onRowSelect} columnWidth={columnWidth} showExportOption ={false} ></DataTable>
				</Loader>
			</div>);
	}
};
export default Roaster;