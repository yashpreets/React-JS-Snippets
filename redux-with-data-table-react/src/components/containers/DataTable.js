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
        let disableActionButton = (this.props.disableActionButton == undefined)?0:this.props.disableActionButton;
        let showExportOption = (this.props.showExportOption == undefined || this.props.showExportOption == 0 )?false:true;
        let sizePerPage = (this.props.sizePerPage == undefined || this.props.sizePerPage == 0 )?10:this.props.sizePerPage;
        let sortingOrder = (this.props.sortingOrder == undefined || this.props.sortingOrder == "desc")?"desc":"asc";
        this.state={
            dashboardData:this.props.dashboardData,
            column:this.props.column,
            keyIndex:this.props.keyIndex,
            hiddenColumn : this.props.hiddenColumn,
            width:this.props.columnWidth,
            disableActionButton:disableActionButton,
            showExportOption:showExportOption,
            defaultSortColumn:this.props.defaultSortColumn,
            sizePerPage:sizePerPage,
            defaultSortOrder:sortingOrder
        }
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
    };
    componentWillReceiveProps(newProps){
        this.setState({dashboardData:newProps.dashboardData,column:newProps.column,keyIndex:newProps.keyIndex});
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

    render() {
        const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [ {
                text: '10', value: 10
            } ], // you can change the dropdown list for size per page
            sizePerPage: this.state.sizePerPage,  // which size per page you want to locate as default
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
            defaultSortName: this.state.defaultSortColumn,
            defaultSortOrder: this.state.defaultSortOrder,
            //onRowClick: this.rowClickHandler,
        };
        let columnList = [];
        let cnt = 0;
        if(this.state.dashboardData == undefined || this.state.dashboardData == '' || this.state.dashboardData.length == 0){
            return (<div>Unable to fetch</div>);
        }
        for(var key in this.state.column){
            let hidden = false;
            if(this.state.hiddenColumn == key){
                hidden = true;
            }
            let width = "100";
            if(this.state.width != undefined && this.state.width[key] != undefined){
                 width = this.state.width[key];
            }
            if(this.state.keyIndex == cnt) {
                columnList.push(<TableHeaderColumn  thStyle={ { whiteSpace: 'normal' } } dataFormat={this.colClick.bind(this)} width={width} dataSort={ true } hidden = {hidden} dataField={key} isKey key={cnt}>{this.state.column[key]}</TableHeaderColumn>);
            }else{
                columnList.push(<TableHeaderColumn  thStyle={ { whiteSpace: 'normal' } } dataFormat={this.colClick.bind(this)} width={width} dataSort={ true } hidden = {hidden} dataField={key} key={cnt}>{this.state.column[key]}</TableHeaderColumn>);
            }
            cnt++;
        }
        if(this.state.disableActionButton != 1){
            columnList.push(<TableHeaderColumn width={'22'} dataField= "button" key="buttonClick" dataFormat={this.buttonFormatter.bind(this)} >Action</TableHeaderColumn>);
        }
        return (
            <BootstrapTable data={ this.state.dashboardData }  pagination={ true } options={ options } search exportCSV = {this.state.showExportOption}>
                {columnList}
            </BootstrapTable>
        );
    }
}

export default DataTable;