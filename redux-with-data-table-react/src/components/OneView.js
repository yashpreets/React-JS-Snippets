import React, { Component } from 'react';
import Roaster from './Roaster.js';
import Status from './Status.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as oneViewActions from '../actions/oneViewActions';

class OneView extends Component {
	constructor(props){
		super(props);
		this.state={
		}
	};
	onTabClick(e,value){
		this.props.actions.showTab(value);
	}
	render(){
		this.tabField = (this.props.oneViewTabChange.oneViewtab == "status")?<Status/>:<Roaster/>;
		return(<div>
				<ul>
					<a onClick= {(e) => this.onTabClick(e,"roaster")} className="pointer" > Roaster </a>
					<a onClick= {(e) => this.onTabClick(e,"status")} className="pointer" > Status </a>
                    <a onClick= {(e) => this.onTabClick(e,"dummy")} className="pointer" > Dummy </a>
                </ul>
				<br/><br/><br/>
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