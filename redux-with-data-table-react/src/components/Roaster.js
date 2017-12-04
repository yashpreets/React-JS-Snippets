import React, { Component } from 'react';
import './../css/AdminDashboard.css';
import './../css/merchantList.css';
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from './DataTable.js';
import fetch from 'cross-fetch';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RoasterActions from '../actions/RoasterActions';

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

	componentDidMount(){
        let authorization = "Basic RUtBUlQ2OkVLQVJUNg==";
        this.makeFetchcall(authorization,'');
	}

	makeFetchcall(authorization , urlParams){
        let self = this;
        let requestOptions = {
            url: fetchRoasterUrl+urlParams,
            options: {
                METHOD: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': authorization
                }
            }
        }
        // Api call to Backend Server
        fetch(requestOptions.url,requestOptions.options)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server"); // show error message dialog instead of error.
                }
                return response.json();
            }).then(function(data) {
				console.log(data);
				//Currently not using the response from the server,loading required json from file
				let columns = self.filterResponseToCreateColumns(roasterData);
				self.props.actions.RoasterActions({type:'roasterDataLoaded',dashboardData:roasterData,columns:columns,loaded:true});
        });
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