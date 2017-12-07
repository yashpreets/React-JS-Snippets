import React, { Component } from 'react';
import Roaster from './Roaster.js';
import Status from './Status.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as oneViewActions from '../actions/oneViewActions';
import './../css/Common.css';

class OneView extends Component {
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
	onTabClick(e,value){
		this.props.actions.showTab(value);
	}

    render() {
        this.tabField = (this.props.oneViewTabChange.oneViewtab === "status") ? <Status requestPayload = {this.requestPayload} /> : <Roaster requestPayload = {this.requestPayload}/>;
        return (<div>
            <div class="col-sm-2 col-xs-7">
                <div class="">
                    <a onClick= {(e) => this.onTabClick(e, "roaster")} className="pointer"> EKART </a> </div>
                </div>

            <div className="sub-navigation2">
            <div className="sub-navigation1">
                <ul>
                    <a onClick= {(e) => this.onTabClick(e, "roaster")} className="pointer" > Roaster </a>
                    <a onClick= {(e) => this.onTabClick(e, "status")} className="pointer" > Status </a>
                </ul>
                </div>
                </div>
            <br/>
            <br/>
            <br/>
				{this.tabField}
        </div>
        );
	}
}
function mapStateToProps(state, props) {
    return {
        oneViewTabChange: state.oneViewTabChange
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(oneViewActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OneView);