import React, { Component } from 'react';
import Roaster from './Roaster.js';
import Status from './Status.js';
class OneView extends Component {
	constructor(props){
		super(props);
		this.state={
		  tab:"roaster",
		}
	};
	onTabClick(e,value){
		this.setState({tab:value});
	}
	render(){
		this.tabField = (this.state.tab == "status")?<Status/>:<Roaster/>;
		return(<div>
				<ul>
					<a onClick= {(e) => this.onTabClick(e,"roaster")} className="pointer" > Roaster </a>
					<a onClick= {(e) => this.onTabClick(e,"status")} className="pointer" > Status </a>
				</ul>
				<br/><br/><br/>
				{this.tabField}
			</div>
		);
	}
}

export default OneView;