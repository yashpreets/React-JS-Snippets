import React, {Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import GetApp from 'material-ui/svg-icons/action/get-app';

const exportButtonStyle = {
    marginLeft:'25px',
}

class DataTable extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		let showActionButton = (this.props.showActionButton == undefined)?0:this.props.showActionButton;
        let showExportOption = (this.props.showExportOption == undefined || this.props.showExportOption == 0 )?false:true;
        let sizePerPage = (this.props.sizePerPage == undefined || this.props.sizePerPage == 0 )?10:this.props.sizePerPage;
        let sortingOrder = (this.props.sortingOrder == undefined || this.props.sortingOrder == "desc")?"desc":"asc";
        this.colClickHandler = function(){}
        this.rowClickHandler = function(){}
        this.rowActionButtonFunction = function(){}
        if(this.props.clickAction){
            this.rowActionButtonFunction = this.props.clickAction;
        }
        if(this.props.rowClickHandler){
            this.rowClickHandler = this.props.rowClickHandler;
        }
        if(this.props.colClickHandler){
        	this.colClickHandler = this.props.colClickHandler;
        }
	}
	
	componentWillReceiveProps(newProps){
    }
    buttonFormatter(cell, row){
        return (<label>
            <button type="button"
                    onClick={() => {this.rowActionButtonFunction(row)}}
                    className="bbtn btn-primary btn-sm">
                View/Edit
            </button>
        </label>) ;
    }

    createCustomExportCSVButton = (onClick) => {
        return (
        <MuiThemeProvider>
       <RaisedButton label="Export CSV"  icon={<GetApp />} style = {exportButtonStyle} primary={true} onClick={ onClick }  />
        </MuiThemeProvider>
        );
     }

    colClick(cell, row){
        return (
            <label onClick={() => {this.colClickHandler(cell)}} className="pointer">
                {cell}
        </label>) ;
    }

    render(){
    	const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [ {
                text: '10', value: 10
            } ], // you can change the dropdown list for size per page
            sizePerPage: this.sizePerPage,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            prePageTitle: 'Go to previous',
            nextPageTitle: 'Go to next', 
            firstPageTitle: 'Go to first', 
            lastPageTitle: 'Go to Last', 
            paginationShowsTotal: this.renderShowsTotal, 
            paginationPosition: 'bottom',  
            clearSearch: true,
            alwaysShowAllBtns: true,
            withFirstAndLast: true,
            exportCSVBtn: this.createCustomExportCSVButton,
            defaultSortName: this.props.defaultSortColumn,
            defaultSortOrder: this.sortingOrder,
            //onRowClick: this.rowClickHandler,
        };
    	if(this.props.dashboardData == undefined || this.props.dashboardData == '' || this.props.dashboardData.length == 0){
            return (<div>Unable to fetch</div>);
        }
        let columnList = [];
        let cnt = 0;
    	for(var key in this.props.column){
            let hidden = false;
            if(this.props.hiddenColumn == key){
                hidden = true;
            }
            let width = "100";
            if(this.props.width != undefined && this.props.width[key] != undefined){
                 width = this.props.width[key];
            }
            if(this.props.keyIndex == cnt) {
                columnList.push(<TableHeaderColumn  thStyle={ { whiteSpace: 'normal' } } dataFormat={this.colClick.bind(this)} width={width} dataSort={ this.props.dataSort } hidden = {hidden} dataField={key} isKey key={cnt}>{this.props.column[key]}</TableHeaderColumn>);
            }else{
                columnList.push(<TableHeaderColumn  thStyle={ { whiteSpace: 'normal' } } dataFormat={this.colClick.bind(this)} width={width} dataSort={ this.props.dataSort } hidden = {hidden} dataField={key} key={cnt}>{this.props.column[key]}</TableHeaderColumn>);
            }
            cnt++;
        }
        if(this.props.showActionButton == 1){
            columnList.push(<TableHeaderColumn width={'22'} dataField= "button" key="buttonClick" dataFormat={this.buttonFormatter.bind(this)} >Action</TableHeaderColumn>);
        }
    	return (
    			<BootstrapTable data={ this.props.dashboardData }  pagination={ true } options={ options } search exportCSV = {this.props.showExportOption}>
                	{columnList}
        		</BootstrapTable>
        );
    }
}

export default DataTable;
