import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EmployeeSearchActions from '../actions/EmployeeSearchActions';
import config from './../common/config';

var Loader = require('react-loader');
var commonFunctions = require('./../common/commonFunctions.js');

class EmployeeSearch extends Component {
	constructor(props){
		super(props);
		this.state={
		}
        this.requestPayload = {
            "tenantId":1,
            "entityIds":[1],
            "currDate":"01/12/2017" //commonFunctions.getCurrentDate()
        }
	};

	componentWillMount(){
        var payload = {"url":config.shiftMappingUrl , "authorization":"Basic RUtBUlQ2OkVLQVJUNg==",successHandler:this.props.actions.redirectAfterDataLoad};
        this.props.actions.fetchShiftMappingData(payload);
	}

	render(){
         if(this.props.EmployeeSearchReducer.loaded == true){
             window.location.href = "/oneView";
         }
         return (
        		<div className="adminDashboard">
        			<Loader loaded={this.props.EmployeeSearchReducer.loaded}>
        				    <div>Add Search Options</div>
        			</Loader>
        		</div>
        );
	}
}

function mapStateToProps(state, props) {
    return {
        EmployeeSearchReducer: state.EmployeeSearchReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(EmployeeSearchActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSearch);