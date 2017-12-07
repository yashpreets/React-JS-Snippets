import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import GetApp from 'material-ui/svg-icons/action/get-app';

const exportButtonStyle = {
    marginLeft:'25px'
}

class DataTable extends Component {

    componentWillMount(){
          this.datatableOptions = {
            page: 1,  // which page you want to show as default
            sizePerPage: 10,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 5,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            prePageTitle: 'Go to previous',
            nextPageTitle: 'Go to next',
            firstPageTitle: 'Go to first',
            lastPageTitle: 'Go to Last',
            paginationPosition: 'bottom',
            clearSearch: true,
            alwaysShowAllBtns: true,
            withFirstAndLast: true,
            exportCSVBtn: this.createCustomExportCSVButton,
            defaultSortName: this.props.defaultSortColumn,
            defaultSortOrder: this.props.sortingOrder,
            hidden: false,
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

    colClick(cell, colheader){
        console.log(cell,colheader);
        return (
            <label onClick={() => {this.props.colClickHandler(cell,colheader)}} className="pointer">
                {cell}
        </label>) ;
    }

    render(){
    	if(this.props.dashboardData === undefined || this.props.dashboardData === '' || this.props.dashboardData.length === 0){
            return (<div>Unable to fetch</div>);
        }
        let columnList = [];
        let cnt = 0;
    	for(var key in this.props.column){

            if(parseInt(this.props.keyIndex,10) === cnt) {
                columnList.push(<TableHeaderColumn  class = {'text-uppercase tr-bg1'} thStyle={{ whiteSpace: 'normal', 'text-transform': 'uppercase', 'text-align': 'center', 'background': '#337ab7', 'color': 'white' }} dataFormat={(e) => this.colClick(e,this.props.column[key])} width={ this.props.width} dataAlign={ this.props.dataAlign} dataSort={ this.props.dataSort } hidden = { this.props.hidden} dataField={key} isKey key={cnt}>{this.props.column[key]}</TableHeaderColumn>);
            }else{
                columnList.push(<TableHeaderColumn  class = {'text-uppercase tr-bg1'} thStyle={{ whiteSpace: 'normal', 'text-transform': 'uppercase', 'text-align': 'center', 'background': '#337ab7','color': 'white' }} dataFormat={(e) => this.colClick(e,this.props.column[key])} width={ this.props.width} dataAlign={ this.props.dataAlign} dataSort={ this.props.dataSort } hidden = { this.props.hidden} dataField={key} key={cnt}>{this.props.column[key]}</TableHeaderColumn>);
            }
            cnt++;
        }
        if(this.props.showActionButton === true){
            columnList.push(<TableHeaderColumn width={'22'} dataField= "button" key="buttonClick" dataFormat={this.buttonFormatter.bind(this)} >Action</TableHeaderColumn>);
        }
    	return (
    			<BootstrapTable data={ this.props.dashboardData }  pagination={ true } ignoreSinglePage={true} options={ this.datatableOptions } search = {this.props.search} exportCSV = {this.props.showExportOption} selectRow={ this.props.selectRowProp }>
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
    colClickHandler:() => {},
    selectRowProp : false,
    search: false,
    width: 100,
    dataAlign: 'center',
    hidden: false
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
