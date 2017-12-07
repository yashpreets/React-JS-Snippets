import React, { Component } from 'react';
import './../css/AdminDashboard.css';
import './../css/merchantList.css';
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from './DataTable.js';
var roasterList = require('../testJson/roasterData.js');
var Loader = require('react-loader');
var roasterData = roasterList.getStatusData();

function onRowSelect(){

}

function onCellClick(cell){
	console.log(cell);
}

class Status extends Component {
	constructor(props){
  		super(props);
  		this.state={
		  dashboardData:'',
		  loaded:true,
		  showNotification:false,
		  loadCounter:0
		}
 	};

	showAlert(message){
 		this.setState({notificationMessage:message,showNotification:true});
 	};

    fetchData(e,data){
        alert("write code to fetch "+ data);
    }
	fetchDashboardData(){
		//add server call instead
		let serverResponse = roasterData;
		this.setState({dashboardData:serverResponse});
	}

	componentDidMount(){
		let serverResponse = roasterData;
		this.setState({dashboardData:serverResponse});
	}

	render(){
		let columns = {"employeeName":"Employee"};
		if(this.state.dashboardData[0] !== undefined){
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
                            <div className="pagination-div">
                                <a id="next" className="pagination-button pull-right " href="#" onClick= {(e) => this.fetchData(e,"nextData")} >»</a>
                                <a id="prev" className="pagination-button pull-right black" href="#" onClick= {(e) => this.fetchData(e,"prevData")} >«</a>
                            </div>

                            <DataTable dashboardData={this.state.dashboardData} column={columns} keyIndex="0" colClickHandler= {onCellClick} clickAction={onRowSelect} ></DataTable>
					</Loader>
				</div>);
		}
		return (<div>No Data To Display</div>);
	}
};
export default Status;