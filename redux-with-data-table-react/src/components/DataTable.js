import React, {Component,PropTypes} from 'react';
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
    componentWillMount(){
          this.datatableOptions = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [ {
                text: '10', value: 10
            } ], // you can change the dropdown list for size per page
            sizePerPage: this.props.sizePerPage,  // which size per page you want to locate as default
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
            //paginationShowsTotal: this.renderShowsTotal,
            paginationPosition: 'bottom',
            clearSearch: true,
            alwaysShowAllBtns: true,
            withFirstAndLast: true,
            exportCSVBtn: this.createCustomExportCSVButton,
            defaultSortName: this.props.defaultSortColumn,
            defaultSortOrder: this.props.sortingOrder,
            //onRowClick: this.props.rowClickHandler,
        };
    }
    buttonFormatter(cell, row){
        return (<label>
            <button type="button"
                    onClick={() => {this.props.clickAction(row)}}
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
            <label onClick={() => {this.props.colClickHandler(cell)}} className="pointer">
                {cell}
        </label>) ;
    }

    render(){
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
        if(this.props.showActionButton === true){
            columnList.push(<TableHeaderColumn width={'22'} dataField= "button" key="buttonClick" dataFormat={this.buttonFormatter.bind(this)} >Action</TableHeaderColumn>);
        }
    	return (
    			<BootstrapTable data={ this.props.dashboardData }  pagination={ true } ignoreSinglePage={true} options={ this.datatableOptions } search = {this.props.showSearchBar} exportCSV = {this.props.showExportOption}>
                	{columnList}
        		</BootstrapTable>
        );
    }
}

DataTable.defaultProps = {
    showActionButton : false,
    showExportOption : false,
    sizePerPage: 10,
    sortingOrder: "desc",
    clickAction: () => {},
    rowClickHandler: () => {},
    colClickHandler:() => {}
};

DataTable.propTypes = {
    showActionButton : PropTypes.bool,
    showExportOption : PropTypes.bool,
    sizePerPage: PropTypes.number,
    sortingOrder: PropTypes.string,
    clickAction: PropTypes.func,
    rowClickHandler: PropTypes.func,
    colClickHandler: PropTypes.func
};

export default DataTable;
